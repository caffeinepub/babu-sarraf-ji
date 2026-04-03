import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { isValidHexColor } from '../../lib/color';
import { getStoredExamType, getExamAccentColor } from '../../hooks/useOnboardingPoll';

type SessionType = 'focus' | 'break';

const DEFAULT_TIMER_COLOR = '#ef4444';

function getInitialTimerColor(): string {
  // If user has manually set a timer color, use it
  const stored = localStorage.getItem('timerColor');
  if (stored && isValidHexColor(stored)) {
    return stored;
  }
  // Fall back to exam accent color if available
  const examType = getStoredExamType();
  const examColor = getExamAccentColor(examType);
  if (examColor) return examColor;
  return DEFAULT_TIMER_COLOR;
}

export function usePomodoroTimer() {
  const [focusDuration, setFocusDuration] = useLocalStorageState('focusDuration', 25);
  const [breakDuration, setBreakDuration] = useLocalStorageState('breakDuration', 5);
  const [storedTimerColor, setStoredTimerColor] = useLocalStorageState(
    'timerColor',
    getInitialTimerColor()
  );
  const [tickingEnabled, setTickingEnabled] = useLocalStorageState('tickingEnabled', false);

  // Validate and sanitize timer color
  const timerColor = isValidHexColor(storedTimerColor) ? storedTimerColor : DEFAULT_TIMER_COLOR;

  const setTimerColor = useCallback(
    (color: string) => {
      if (isValidHexColor(color)) {
        // Persists manual selection — overrides exam accent on next load
        setStoredTimerColor(color);
      }
    },
    [setStoredTimerColor]
  );

  const [sessionType, setSessionType] = useState<SessionType>('focus');
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Wake Lock state
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const [wakeLockFailed, setWakeLockFailed] = useState(false);

  // Tree progress: 0–100, only advances during focus sessions while running
  // Resets to 0 on reset; freezes on pause; does not advance during breaks
  const [treeProgress, setTreeProgress] = useState(0);
  // Track the "session start" timeLeft so we can compute progress correctly
  const sessionTotalRef = useRef(focusDuration * 60);

  // Acquire or release wake lock based on isRunning
  useEffect(() => {
    const acquireWakeLock = async () => {
      if (!('wakeLock' in navigator)) {
        setWakeLockFailed(true);
        return;
      }
      try {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
        setWakeLockFailed(false);
        wakeLockRef.current.addEventListener('release', () => {
          wakeLockRef.current = null;
        });
      } catch {
        setWakeLockFailed(true);
        wakeLockRef.current = null;
      }
    };

    const releaseWakeLock = async () => {
      if (wakeLockRef.current) {
        try {
          await wakeLockRef.current.release();
        } catch {
          // Ignore release errors
        }
        wakeLockRef.current = null;
      }
    };

    if (isRunning) {
      acquireWakeLock();
    } else {
      releaseWakeLock();
      setWakeLockFailed(false);
    }

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
      }
    };
  }, [isRunning]);

  // Re-acquire wake lock when page becomes visible again
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && isRunning && !wakeLockRef.current) {
        if (!('wakeLock' in navigator)) return;
        try {
          wakeLockRef.current = await navigator.wakeLock.request('screen');
          setWakeLockFailed(false);
        } catch {
          setWakeLockFailed(true);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isRunning]);

  // Update timeLeft when durations change and timer is not running
  useEffect(() => {
    if (!isRunning) {
      const newTotal = sessionType === 'focus' ? focusDuration * 60 : breakDuration * 60;
      setTimeLeft(newTotal);
      sessionTotalRef.current = newTotal;
    }
  }, [focusDuration, breakDuration, sessionType, isRunning]);

  // Timer countdown logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setSessionType((current) => (current === 'focus' ? 'break' : 'focus'));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  // Auto-start next session after completion
  useEffect(() => {
    if (timeLeft === 0 && !isRunning) {
      const nextDuration = sessionType === 'focus' ? focusDuration : breakDuration;
      const nextTotal = nextDuration * 60;
      setTimeLeft(nextTotal);
      sessionTotalRef.current = nextTotal;
    }
  }, [timeLeft, isRunning, sessionType, focusDuration, breakDuration]);

  // Update tree progress in real time — only during focus sessions while running
  useEffect(() => {
    if (sessionType !== 'focus') return;
    const total = sessionTotalRef.current;
    if (total <= 0) return;
    const elapsed = total - timeLeft;
    const pct = Math.max(0, Math.min(100, (elapsed / total) * 100));
    setTreeProgress(pct);
  }, [timeLeft, sessionType]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
    // treeProgress is NOT reset on pause — it freezes
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    const duration = sessionType === 'focus' ? focusDuration : breakDuration;
    const total = duration * 60;
    setTimeLeft(total);
    sessionTotalRef.current = total;
    // Reset tree to seed on explicit reset
    setTreeProgress(0);
  }, [sessionType, focusDuration, breakDuration]);

  const skip = useCallback(() => {
    setIsRunning(false);
    const nextSession = sessionType === 'focus' ? 'break' : 'focus';
    setSessionType(nextSession);
    const nextDuration = nextSession === 'focus' ? focusDuration : breakDuration;
    const nextTotal = nextDuration * 60;
    setTimeLeft(nextTotal);
    sessionTotalRef.current = nextTotal;
    // Reset tree when skipping
    setTreeProgress(0);
  }, [sessionType, focusDuration, breakDuration]);

  return {
    timeLeft,
    isRunning,
    sessionType,
    focusDuration,
    breakDuration,
    timerColor,
    tickingEnabled,
    wakeLockFailed,
    treeProgress,
    start,
    pause,
    reset,
    skip,
    setFocusDuration,
    setBreakDuration,
    setTimerColor,
    setTickingEnabled,
  };
}

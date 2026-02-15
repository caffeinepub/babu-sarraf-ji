import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { isValidHexColor } from '../../lib/color';

type SessionType = 'focus' | 'break';

const DEFAULT_TIMER_COLOR = '#ef4444';

export function usePomodoroTimer() {
  const [focusDuration, setFocusDuration] = useLocalStorageState('focusDuration', 25);
  const [breakDuration, setBreakDuration] = useLocalStorageState('breakDuration', 5);
  const [storedTimerColor, setStoredTimerColor] = useLocalStorageState('timerColor', DEFAULT_TIMER_COLOR);
  const [tickingEnabled, setTickingEnabled] = useLocalStorageState('tickingEnabled', false);

  // Validate and sanitize timer color
  const timerColor = isValidHexColor(storedTimerColor) ? storedTimerColor : DEFAULT_TIMER_COLOR;

  const setTimerColor = useCallback((color: string) => {
    if (isValidHexColor(color)) {
      setStoredTimerColor(color);
    }
  }, [setStoredTimerColor]);

  const [sessionType, setSessionType] = useState<SessionType>('focus');
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Update timeLeft when durations change and timer is not running
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(sessionType === 'focus' ? focusDuration * 60 : breakDuration * 60);
    }
  }, [focusDuration, breakDuration, sessionType, isRunning]);

  // Timer countdown logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            // Auto-switch to next session
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
      setTimeLeft(nextDuration * 60);
    }
  }, [timeLeft, isRunning, sessionType, focusDuration, breakDuration]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    const duration = sessionType === 'focus' ? focusDuration : breakDuration;
    setTimeLeft(duration * 60);
  }, [sessionType, focusDuration, breakDuration]);

  const skip = useCallback(() => {
    setIsRunning(false);
    const nextSession = sessionType === 'focus' ? 'break' : 'focus';
    setSessionType(nextSession);
    const nextDuration = nextSession === 'focus' ? focusDuration : breakDuration;
    setTimeLeft(nextDuration * 60);
  }, [sessionType, focusDuration, breakDuration]);

  return {
    timeLeft,
    isRunning,
    sessionType,
    focusDuration,
    breakDuration,
    timerColor,
    tickingEnabled,
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

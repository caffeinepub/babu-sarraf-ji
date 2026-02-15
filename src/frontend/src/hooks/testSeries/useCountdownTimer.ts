import { useState, useEffect, useRef } from 'react';

export function useCountdownTimer(initialSeconds: number) {
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = (seconds?: number) => {
    stopTimer();
    setTimeRemaining(seconds ?? initialSeconds);
  };

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            stopTimer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining]);

  return {
    timeRemaining,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
  };
}

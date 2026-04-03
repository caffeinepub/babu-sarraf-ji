import { useState, useEffect, useCallback } from 'react';

interface StudyModeState {
  isStudyModeActive: boolean;
  enterStudyMode: () => Promise<void>;
  exitStudyMode: () => Promise<void>;
}

export function useStudyMode(): StudyModeState {
  const [isStudyModeActive, setIsStudyModeActive] = useState(false);

  // Listen for fullscreen changes (e.g., user presses Escape)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      if (!isFullscreen && isStudyModeActive) {
        setIsStudyModeActive(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isStudyModeActive]);

  const enterStudyMode = useCallback(async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
      setIsStudyModeActive(true);
    } catch (err) {
      // Fullscreen may be denied (e.g., in iframes), still activate study mode UI
      setIsStudyModeActive(true);
    }
  }, []);

  const exitStudyMode = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (err) {
      // Ignore errors when exiting fullscreen
    }
    setIsStudyModeActive(false);
  }, []);

  return { isStudyModeActive, enterStudyMode, exitStudyMode };
}

import { useState } from 'react';
import PomodoroTimer from '../components/PomodoroTimer/PomodoroTimer';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

export default function TimerPage() {
  const [streamerMode, setStreamerMode] = useLocalStorageState('streamerMode', false);
  const [transparentBackground, setTransparentBackground] = useLocalStorageState(
    'transparentBackground',
    false
  );

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        transparentBackground && streamerMode ? 'bg-transparent' : ''
      }`}
      data-streamer-mode={streamerMode}
    >
      <PomodoroTimer
        streamerMode={streamerMode}
        transparentBackground={transparentBackground}
        onStreamerModeChange={setStreamerMode}
        onTransparentBackgroundChange={setTransparentBackground}
      />
    </div>
  );
}

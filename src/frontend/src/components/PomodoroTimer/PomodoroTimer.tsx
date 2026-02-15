import { useEffect, useState } from 'react';
import { usePomodoroTimer } from './usePomodoroTimer';
import ProgressRing from './ProgressRing';
import DurationControls from './DurationControls';
import ColorControls from './ColorControls';
import SoundControls from './SoundControls';
import MusicControls from './MusicControls';
import MetricsPanel from './MetricsPanel';
import { useAudio } from '../../hooks/useAudio';
import { getRandomQuote } from '../../lib/quotes';
import { incrementDailySession, getMetrics } from '../../lib/studyMetrics';
import { generateTextShadow } from '../../lib/color';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

interface PomodoroTimerProps {
  streamerMode: boolean;
  transparentBackground: boolean;
  onStreamerModeChange?: (value: boolean) => void;
  onTransparentBackgroundChange?: (value: boolean) => void;
}

export default function PomodoroTimer({
  streamerMode,
  transparentBackground,
  onStreamerModeChange,
  onTransparentBackgroundChange,
}: PomodoroTimerProps) {
  const {
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
  } = usePomodoroTimer();

  const [quote, setQuote] = useState<string>('');
  const [showQuote, setShowQuote] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const tickAudio = useAudio('/assets/audio/tick.mp3', true);
  const bellAudio = useAudio('/assets/audio/bell.mp3', false);

  // Handle ticking sound
  useEffect(() => {
    if (isRunning && tickingEnabled) {
      tickAudio.play();
    } else {
      tickAudio.pause();
    }
  }, [isRunning, tickingEnabled]);

  // Handle session completion
  useEffect(() => {
    if (timeLeft === 0 && !sessionCompleted) {
      setSessionCompleted(true);
      bellAudio.play();
      
      // Increment metrics only for completed focus sessions
      if (sessionType === 'focus') {
        incrementDailySession();
      }
      
      setShowQuote(false);
    } else if (timeLeft > 0) {
      setSessionCompleted(false);
    }
  }, [timeLeft, sessionCompleted, sessionType]);

  const handleStart = () => {
    if (!isRunning) {
      setQuote(getRandomQuote());
      setShowQuote(true);
    }
    start();
  };

  const handlePause = () => {
    pause();
  };

  const handleReset = () => {
    reset();
    setShowQuote(false);
  };

  const handleSkip = () => {
    skip();
    setShowQuote(false);
  };

  const totalDuration = sessionType === 'focus' ? focusDuration : breakDuration;
  const progress = ((totalDuration * 60 - timeLeft) / (totalDuration * 60)) * 100;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        {/* Timer Display */}
        <div className="flex-1 flex flex-col items-center gap-6 w-full">
          <div className="relative">
            <ProgressRing
              progress={progress}
              size={280}
              strokeWidth={12}
              color={timerColor}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div 
                className="text-6xl sm:text-7xl font-bold tabular-nums tracking-tight"
                style={{
                  color: timerColor,
                  textShadow: generateTextShadow(timerColor),
                }}
              >
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground mt-2 uppercase tracking-widest">
                {sessionType === 'focus' ? 'Focus Time' : 'Break Time'}
              </div>
            </div>
          </div>

          {/* Quote Display */}
          {showQuote && !streamerMode && quote && (
            <div className="text-center max-w-md px-4 animate-in fade-in duration-500">
              <p className="text-lg italic text-muted-foreground">"{quote}"</p>
            </div>
          )}

          {/* Timer Controls */}
          {!streamerMode && (
            <div className="flex gap-3">
              {!isRunning ? (
                <button
                  onClick={handleStart}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
                >
                  <Play className="w-5 h-5" />
                  <span className="font-medium">Start</span>
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
                >
                  <Pause className="w-5 h-5" />
                  <span className="font-medium">Pause</span>
                </button>
              )}
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                <span className="font-medium">Reset</span>
              </button>
              <button
                onClick={handleSkip}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all"
              >
                <SkipForward className="w-5 h-5" />
                <span className="font-medium">Skip</span>
              </button>
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {!streamerMode && (
          <div className="w-full lg:w-80 space-y-6">
            <DurationControls
              focusDuration={focusDuration}
              breakDuration={breakDuration}
              onFocusDurationChange={setFocusDuration}
              onBreakDurationChange={setBreakDuration}
            />
            <ColorControls color={timerColor} onColorChange={setTimerColor} />
            <SoundControls tickingEnabled={tickingEnabled} onTickingChange={setTickingEnabled} />
            <MusicControls />
            <MetricsPanel />
          </div>
        )}

        {/* Streamer Mode Controls (only on /timer page) */}
        {onStreamerModeChange && onTransparentBackgroundChange && (
          <div className="fixed top-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 space-y-3 shadow-lg">
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-medium">Streamer Mode</label>
              <button
                onClick={() => onStreamerModeChange(!streamerMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  streamerMode ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                    streamerMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-medium">Transparent BG</label>
              <button
                onClick={() => onTransparentBackgroundChange(!transparentBackground)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  transparentBackground ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                    transparentBackground ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

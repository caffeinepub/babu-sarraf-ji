import { useEffect, useState, useRef } from 'react';
import { usePomodoroTimer } from './usePomodoroTimer';
import ProgressRing, { SizeVariant } from './ProgressRing';
import DurationControls from './DurationControls';
import ColorControls from './ColorControls';
import SoundControls from './SoundControls';
import MusicControls from './MusicControls';
import MetricsPanel from './MetricsPanel';
import FocusTree from './FocusTree';
import ForestMode from './ForestMode';
import DeepFocusSessionPanel from '../studyMode/DeepFocusSessionPanel';
import ExitFocusModeButton from '../studyMode/ExitFocusModeButton';
import OnboardingPollModal from '../onboarding/OnboardingPollModal';
import { useAudio } from '../../hooks/useAudio';
import { getRandomQuote } from '../../lib/quotes';
import { incrementDailySession } from '../../lib/studyMetrics';
import { incrementTreeCount } from '../../lib/forestMetrics';
import { generateTextShadow, hexToRgba, generateIntenseGlow } from '../../lib/color';
import { useOnboardingPoll, getExamAccentColor } from '../../hooks/useOnboardingPoll';
import type { ExamType } from '../../hooks/useOnboardingPoll';
import { Play, Pause, RotateCcw, SkipForward, RefreshCw } from 'lucide-react';

interface PomodoroTimerProps {
  streamerMode: boolean;
  transparentBackground: boolean;
  onStreamerModeChange?: (value: boolean) => void;
  onTransparentBackgroundChange?: (value: boolean) => void;
  isStudyModeActive?: boolean;
  onExitStudyMode?: () => void;
  sizeVariant?: SizeVariant;
  /** When true, renders the ForestMode section below the timer */
  showForestMode?: boolean;
}

// Dashboard timer constants — 50% larger than original 280px
const DASHBOARD_VIEWBOX = 420;
const DASHBOARD_STROKE = 18;
const DASHBOARD_RADIUS = (DASHBOARD_VIEWBOX - DASHBOARD_STROKE) / 2;
const DASHBOARD_CIRCUMFERENCE = 2 * Math.PI * DASHBOARD_RADIUS;

export default function PomodoroTimer({
  streamerMode,
  transparentBackground,
  onStreamerModeChange,
  onTransparentBackgroundChange,
  isStudyModeActive = false,
  onExitStudyMode,
  sizeVariant = 'default',
  showForestMode = false,
}: PomodoroTimerProps) {
  const {
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
  } = usePomodoroTimer();

  const {
    isModalOpen,
    openAtStep,
    userName,
    examType,
    handleSubmit: handleOnboardingSubmit,
    handleSkip: handleOnboardingSkip,
    handleChangeExam,
  } = useOnboardingPoll();

  const [quote, setQuote] = useState<string>('');
  const [showQuote, setShowQuote] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationFading, setCelebrationFading] = useState(false);
  const [tickKey, setTickKey] = useState(0);
  // Signal to ForestMode to refresh its count
  const [forestSignal, setForestSignal] = useState(0);
  const prevTimeLeft = useRef(timeLeft);

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

  // Tick animation: trigger on each second while running
  useEffect(() => {
    if (isRunning && timeLeft !== prevTimeLeft.current) {
      setTickKey((k) => k + 1);
    }
    prevTimeLeft.current = timeLeft;
  }, [timeLeft, isRunning]);

  // Handle session completion
  useEffect(() => {
    if (timeLeft === 0 && !sessionCompleted) {
      setSessionCompleted(true);
      bellAudio.play();

      if (sessionType === 'focus') {
        incrementDailySession();
        // Increment forest tree count for completed focus session
        incrementTreeCount();
        setForestSignal((s) => s + 1);

        if (!streamerMode) {
          setShowCelebration(true);
          setCelebrationFading(false);
          setTimeout(() => {
            setCelebrationFading(true);
            setTimeout(() => {
              setShowCelebration(false);
              setCelebrationFading(false);
            }, 380);
          }, 1600);
        }
      }

      setShowQuote(false);
    } else if (timeLeft > 0) {
      setSessionCompleted(false);
    }
  }, [timeLeft, sessionCompleted, sessionType, streamerMode]);

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

  // When user changes exam via modal, also update timer color to new exam accent
  const handleOnboardingSubmitWithColorUpdate = (name: string, exam: ExamType) => {
    handleOnboardingSubmit(name, exam);
    const newColor = getExamAccentColor(exam);
    if (newColor) {
      setTimerColor(newColor);
    }
  };

  const totalDuration = sessionType === 'focus' ? focusDuration : breakDuration;
  const progress = ((totalDuration * 60 - timeLeft) / (totalDuration * 60)) * 100;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const glowBgColor = hexToRgba(timerColor, 0.22);
  const isDefaultSize = sizeVariant !== 'streamer';
  const dashboardOffset = DASHBOARD_CIRCUMFERENCE - (progress / 100) * DASHBOARD_CIRCUMFERENCE;

  // Tree is only shown in default (dashboard) mode, not streamer or study mode
  const showTree = isDefaultSize && !isStudyModeActive && !streamerMode;

  // Study Mode: minimal distraction-free layout
  if (isStudyModeActive) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-screen bg-[#040810]">
        <ExitFocusModeButton />
        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full timer-glow-bg pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${glowBgColor} 0%, transparent 70%)`,
                transform: 'scale(1.3)',
              }}
            />
            <ProgressRing
              progress={progress}
              size={300}
              strokeWidth={14}
              color={timerColor}
              sizeVariant="streamer"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                key={tickKey}
                className={`font-display tabular-nums tracking-tight ${isRunning ? 'tick-animate' : ''}`}
                style={{
                  fontSize: 'clamp(3.5rem, 10vw, 5rem)',
                  fontWeight: 700,
                  color: timerColor,
                  textShadow: generateTextShadow(timerColor),
                  letterSpacing: '-0.02em',
                }}
              >
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className="text-sm text-white/40 mt-2 uppercase tracking-widest">
                {sessionType === 'focus' ? 'Focus Time' : 'Break Time'}
              </div>
            </div>
          </div>

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

          <DeepFocusSessionPanel />
        </div>
      </div>
    );
  }

  // Normal mode layout
  return (
    <>
      <div className="w-full max-w-6xl mx-auto relative">
        {/* Session Completed Celebration */}
        {showCelebration && !streamerMode && (
          <div
            className={`fixed top-1/2 left-1/2 z-50 pointer-events-none select-none ${
              celebrationFading ? 'celebration-fade' : 'celebration-pop'
            }`}
            style={{ transform: 'translate(-50%, -50%)' }}
            aria-live="polite"
          >
            <div
              className="px-8 py-5 rounded-2xl text-center"
              style={{
                background: 'rgba(10, 14, 30, 0.92)',
                border: '1px solid rgba(100, 120, 255, 0.3)',
                boxShadow: '0 0 40px rgba(80, 100, 255, 0.25), 0 8px 32px rgba(0,0,0,0.5)',
              }}
            >
              <div className="text-3xl font-display font-bold text-white tracking-tight">
                Session Completed 🔥
              </div>
              <div className="text-sm text-white/50 mt-1 tracking-widest uppercase">
                Keep going. Stay locked in.
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
          {/* Timer Display */}
          <div className="flex-1 flex flex-col items-center gap-8 w-full">
            {/* Timer Ring with glow blob */}
            <div className="relative flex items-center justify-center">
              <div
                className="absolute rounded-full timer-glow-bg pointer-events-none"
                style={{
                  width: isDefaultSize ? '520px' : '340px',
                  height: isDefaultSize ? '520px' : '340px',
                  background: `radial-gradient(circle, ${glowBgColor} 0%, transparent 70%)`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) scale(1)',
                }}
              />

              <div
                className={
                  isDefaultSize
                    ? 'w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px]'
                    : ''
                }
                style={isDefaultSize ? { position: 'relative' } : undefined}
              >
                {isDefaultSize ? (
                  <svg
                    viewBox={`0 0 ${DASHBOARD_VIEWBOX} ${DASHBOARD_VIEWBOX}`}
                    className="-rotate-90 w-full h-full"
                    style={{ display: 'block' }}
                  >
                    <circle
                      cx={DASHBOARD_VIEWBOX / 2}
                      cy={DASHBOARD_VIEWBOX / 2}
                      r={DASHBOARD_RADIUS}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={DASHBOARD_STROKE}
                      className="text-border/30"
                    />
                    <circle
                      cx={DASHBOARD_VIEWBOX / 2}
                      cy={DASHBOARD_VIEWBOX / 2}
                      r={DASHBOARD_RADIUS}
                      fill="none"
                      stroke={timerColor}
                      strokeWidth={DASHBOARD_STROKE + 2}
                      strokeDasharray={DASHBOARD_CIRCUMFERENCE}
                      strokeDashoffset={dashboardOffset}
                      strokeLinecap="round"
                      className="transition-all duration-300 ease-linear"
                      style={{
                        filter: generateIntenseGlow(timerColor),
                      }}
                    />
                  </svg>
                ) : (
                  <ProgressRing
                    progress={progress}
                    size={280}
                    strokeWidth={12}
                    color={timerColor}
                    sizeVariant="streamer"
                  />
                )}

                {/* Focus Tree — layered inside the ring, behind text */}
                {showTree && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      // Inset so the tree stays well within the ring stroke
                      inset: '14%',
                      zIndex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FocusTree progress={treeProgress} />
                  </div>
                )}
              </div>

              {/* Centered text overlay — z-index above tree */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ zIndex: 2 }}
              >
                <div
                  key={tickKey}
                  className={`font-display tabular-nums tracking-tight ${isRunning ? 'tick-animate' : ''}`}
                  style={{
                    fontSize: isDefaultSize
                      ? 'clamp(3rem, 9vw, 6.5rem)'
                      : 'clamp(3rem, 9vw, 4.5rem)',
                    fontWeight: 800,
                    color: timerColor,
                    textShadow: generateTextShadow(timerColor),
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <div
                  className="uppercase tracking-widest mt-3 font-semibold"
                  style={{
                    fontSize: isDefaultSize
                      ? 'clamp(0.7rem, 1.8vw, 1.1rem)'
                      : '0.875rem',
                    color: 'rgba(160, 170, 210, 0.65)',
                    letterSpacing: '0.2em',
                  }}
                >
                  {sessionType === 'focus' ? 'Focus Time' : 'Break Time'}
                </div>
              </div>
            </div>

            {/* Wake Lock failure message */}
            {isRunning && wakeLockFailed && !streamerMode && (
              <div className="text-center -mt-4">
                <p className="text-xs text-muted-foreground/60 tracking-wide">
                  ⚠ Please disable screen sleep manually.
                </p>
              </div>
            )}

            {/* Motivational line */}
            {!streamerMode && (
              <div className="text-center -mt-2">
                <p
                  className="text-xs font-display uppercase tracking-[0.25em] font-medium"
                  style={{ color: 'rgba(160, 170, 210, 0.55)' }}
                >
                  Stay Locked In.
                </p>
              </div>
            )}

            {/* Follow text under timer */}
            {!streamerMode && (
              <div className="text-center px-4 -mt-4">
                <p className="text-sm text-muted-foreground">
                  Follow for daily study motivation – @babu_sarraf_ji
                </p>
              </div>
            )}

            {/* Quote Display */}
            {showQuote && !streamerMode && quote && (
              <div className="text-center max-w-md px-4 animate-in fade-in duration-500 -mt-2">
                <p className="text-base italic text-muted-foreground">"{quote}"</p>
              </div>
            )}

            {/* Timer Controls */}
            {!streamerMode && (
              <div className="flex gap-3 flex-wrap justify-center">
                {!isRunning ? (
                  <button
                    onClick={handleStart}
                    className="flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl font-medium"
                  >
                    <Play className="w-5 h-5" />
                    <span>Start</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePause}
                    className="flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl font-medium"
                  >
                    <Pause className="w-5 h-5" />
                    <span>Pause</span>
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all font-medium"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={handleSkip}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all font-medium"
                >
                  <SkipForward className="w-5 h-5" />
                  <span>Skip</span>
                </button>
              </div>
            )}

            {/* Forest Mode — only on dashboard, not streamer/study mode */}
            {showForestMode && !streamerMode && !isStudyModeActive && (
              <div className="w-full flex justify-center mt-2">
                <ForestMode sessionCompletedSignal={forestSignal} />
              </div>
            )}
          </div>

          {/* Settings Panel */}
          {!streamerMode && (
            <div className="w-full lg:w-80 space-y-5">
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

              {/* Exam Settings — hidden in study mode */}
              {!isStudyModeActive && (
                <div className="bg-card border border-border rounded-xl p-5 card-soft-shadow">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Exam Settings
                  </h3>
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {examType ? examType.toUpperCase() : 'Not set'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {userName ? `Hi, ${userName}` : 'Set your exam for a personalized theme'}
                      </p>
                    </div>
                    <button
                      onClick={handleChangeExam}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all text-xs font-medium shrink-0"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Change
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Onboarding Poll Modal — use `initialStep` (correct prop name) */}
      {isModalOpen && (
        <OnboardingPollModal
          isOpen={isModalOpen}
          initialStep={openAtStep}
          onSubmit={handleOnboardingSubmitWithColorUpdate}
          onSkip={handleOnboardingSkip}
        />
      )}
    </>
  );
}

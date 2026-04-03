import { useState, useEffect, useRef } from 'react';
import type { ExamType } from '../../hooks/useOnboardingPoll';

interface OnboardingPollModalProps {
  isOpen: boolean;
  initialStep?: 1 | 2;
  prefillName?: string | null;
  onSubmit: (userName: string, examType: ExamType) => void;
  onSkip: () => void;
}

const EXAM_OPTIONS: { value: ExamType; label: string; emoji: string; desc: string }[] = [
  { value: 'NEET', label: 'NEET', emoji: '🩺', desc: 'Medical Entrance' },
  { value: 'JEE', label: 'JEE', emoji: '⚙️', desc: 'Engineering Entrance' },
  { value: 'SCHOOL', label: 'SCHOOL', emoji: '📚', desc: 'School Exams' },
  { value: 'OTHER', label: 'OTHER EXAM', emoji: '🎯', desc: 'Other Competitive' },
];

const EXAM_GLOW: Record<ExamType, string> = {
  NEET: '#22c55e',
  JEE: '#3b82f6',
  SCHOOL: '#eab308',
  OTHER: '#a855f7',
};

function getWelcomeMessage(name: string, exam: ExamType): string {
  switch (exam) {
    case 'JEE': return `Stay focused, ${name} – JEE warrior 💪`;
    case 'NEET': return `Welcome, ${name}! Let's crack your NEET 🔥`;
    case 'SCHOOL': return `Welcome, ${name}! Let's crush your School exams 🔥`;
    case 'OTHER': return `Welcome, ${name}! Let's crush your exam 🔥`;
  }
}

function hexToRgbParts(hex: string): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

type ModalStep = 1 | 2 | 'welcome';

export default function OnboardingPollModal({
  isOpen,
  initialStep = 1,
  prefillName,
  onSubmit,
  onSkip,
}: OnboardingPollModalProps) {
  const [step, setStep] = useState<ModalStep>(initialStep);
  const [name, setName] = useState(prefillName || '');
  const [selectedExam, setSelectedExam] = useState<ExamType | null>(null);
  const [animating, setAnimating] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
      setName(prefillName || '');
      setSelectedExam(null);
      setAnimating(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialStep, prefillName]);

  // Focus name input when step 1 is shown
  useEffect(() => {
    if (isOpen && step === 1) {
      const t = setTimeout(() => nameInputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [isOpen, step]);

  const goToStep2 = () => {
    if (!name.trim()) return;
    setAnimating(true);
    setTimeout(() => {
      setStep(2);
      setAnimating(false);
    }, 260);
  };

  const handleSubmit = () => {
    if (!selectedExam) return;
    setAnimating(true);
    setTimeout(() => {
      setStep('welcome');
      setAnimating(false);
      // Auto-dismiss after 1.8s
      setTimeout(() => {
        onSubmit(name.trim(), selectedExam);
      }, 1800);
    }, 260);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step === 1) goToStep2();
  };

  if (!isOpen) return null;

  const accentColor = selectedExam ? EXAM_GLOW[selectedExam] : 'oklch(0.62 0.16 270)';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(2, 5, 16, 0.93)', backdropFilter: 'blur(10px)' }}
      aria-modal="true"
      role="dialog"
      aria-label="Welcome onboarding poll"
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #0d1225 0%, #0a0e1e 100%)',
          border: '1px solid rgba(100, 120, 255, 0.18)',
          boxShadow: '0 0 60px rgba(80, 100, 255, 0.12), 0 24px 64px rgba(0,0,0,0.75)',
        }}
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          }}
        />

        <div className="p-7 sm:p-8">
          {/* Step progress indicator */}
          {step !== 'welcome' && (
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: step === 1 ? '50%' : '100%',
                    background: 'oklch(0.62 0.16 270)',
                    boxShadow: '0 0 8px oklch(0.62 0.16 270 / 0.5)',
                  }}
                />
              </div>
              <span className="text-xs text-white/30 shrink-0">
                {step === 1 ? '1 / 2' : '2 / 2'}
              </span>
            </div>
          )}

          {/* Animated content area */}
          <div
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateX(-20px)' : 'translateX(0)',
              transition: 'opacity 0.26s ease, transform 0.26s ease',
            }}
          >
            {/* ── STEP 1: Name ── */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-4xl mb-3">👋</div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    What's your name?
                  </h2>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    Let's personalize your focus journey
                  </p>
                </div>

                <div className="space-y-3">
                  <input
                    ref={nameInputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your name"
                    maxLength={40}
                    className="w-full px-4 py-3.5 rounded-xl text-white text-base outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: name.trim()
                        ? '1.5px solid rgba(100, 120, 255, 0.6)'
                        : '1.5px solid rgba(255,255,255,0.1)',
                      boxShadow: name.trim()
                        ? '0 0 14px rgba(100, 120, 255, 0.18)'
                        : 'none',
                      color: '#fff',
                    }}
                    aria-label="Your name"
                    required
                  />

                  <button
                    onClick={goToStep2}
                    disabled={!name.trim()}
                    className="w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-200 text-white"
                    style={{
                      background: name.trim()
                        ? 'linear-gradient(135deg, oklch(0.62 0.16 270), oklch(0.55 0.18 260))'
                        : 'rgba(255,255,255,0.06)',
                      color: name.trim() ? '#fff' : 'rgba(255,255,255,0.22)',
                      boxShadow: name.trim()
                        ? '0 0 22px oklch(0.62 0.16 270 / 0.35)'
                        : 'none',
                      cursor: name.trim() ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Next →
                  </button>
                </div>

                <div className="text-center pt-1">
                  <button
                    onClick={onSkip}
                    className="text-xs transition-colors underline underline-offset-2"
                    style={{ color: 'rgba(255,255,255,0.22)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}
                  >
                    Skip for now
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: Exam Selection ── */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-4xl mb-3">🎯</div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Which exam are you preparing for?
                  </h2>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    We'll personalize your dashboard for you
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {EXAM_OPTIONS.map((opt) => {
                    const isSelected = selectedExam === opt.value;
                    const glowColor = EXAM_GLOW[opt.value];
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setSelectedExam(opt.value)}
                        className="relative flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl transition-all duration-200 text-center"
                        style={{
                          background: isSelected
                            ? `rgba(${hexToRgbParts(glowColor)}, 0.12)`
                            : 'rgba(255,255,255,0.04)',
                          border: isSelected
                            ? `2px solid ${glowColor}`
                            : '2px solid rgba(255,255,255,0.08)',
                          boxShadow: isSelected
                            ? `0 0 20px ${glowColor}55, 0 0 40px ${glowColor}22`
                            : 'none',
                          transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                        }}
                        aria-pressed={isSelected}
                        aria-label={`Select ${opt.label}`}
                      >
                        <span className="text-2xl">{opt.emoji}</span>
                        <span
                          className="font-bold text-sm tracking-wide"
                          style={{ color: isSelected ? glowColor : 'rgba(255,255,255,0.75)' }}
                        >
                          {opt.label}
                        </span>
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {opt.desc}
                        </span>
                        {isSelected && (
                          <div
                            className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ background: glowColor }}
                          >
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path
                                d="M1 4L3.5 6.5L9 1"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedExam}
                    className="w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-200"
                    style={{
                      background: selectedExam
                        ? `linear-gradient(135deg, ${EXAM_GLOW[selectedExam]}, ${EXAM_GLOW[selectedExam]}cc)`
                        : 'rgba(255,255,255,0.06)',
                      color: selectedExam ? '#fff' : 'rgba(255,255,255,0.22)',
                      boxShadow: selectedExam
                        ? `0 0 24px ${EXAM_GLOW[selectedExam]}55`
                        : 'none',
                      cursor: selectedExam ? 'pointer' : 'not-allowed',
                    }}
                  >
                    🚀 Start My Focus Journey
                  </button>

                  <div className="text-center">
                    <button
                      onClick={onSkip}
                      className="text-xs transition-colors underline underline-offset-2"
                      style={{ color: 'rgba(255,255,255,0.22)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}
                    >
                      Skip for now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── WELCOME MESSAGE ── */}
            {step === 'welcome' && selectedExam && (
              <div
                className="py-8 text-center space-y-4"
                style={{ animation: 'onboarding-fade-in 0.5s ease forwards' }}
              >
                <div className="text-5xl mb-4">
                  {selectedExam === 'NEET'
                    ? '🩺'
                    : selectedExam === 'JEE'
                    ? '⚙️'
                    : selectedExam === 'SCHOOL'
                    ? '📚'
                    : '🎯'}
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-bold leading-tight"
                  style={{
                    color: EXAM_GLOW[selectedExam],
                    textShadow: `0 0 24px ${EXAM_GLOW[selectedExam]}88`,
                  }}
                >
                  {getWelcomeMessage(name, selectedExam)}
                </h2>
                <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  Your personalized dashboard is ready ✨
                </p>
                <div className="flex justify-center mt-4 gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: EXAM_GLOW[selectedExam],
                        animation: `onboarding-dot-pulse 1s ease ${i * 0.2}s infinite`,
                        opacity: 0.7,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

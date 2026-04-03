import { useState, useEffect, useRef } from 'react';
import { getRandomQuote } from '../../lib/quotes';
import { Flame } from 'lucide-react';

const TOTAL_SECONDS = 3 * 60 * 60; // 3 hours

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [
    String(h).padStart(2, '0'),
    String(m).padStart(2, '0'),
    String(s).padStart(2, '0'),
  ].join(':');
}

export default function DeepFocusSessionPanel() {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [quote] = useState(() => getRandomQuote());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const progress = ((TOTAL_SECONDS - secondsLeft) / TOTAL_SECONDS) * 100;
  const isComplete = secondsLeft === 0;

  return (
    <div className="w-full max-w-sm mx-auto mt-6 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-4 h-4 text-orange-400" />
        <span className="text-white/70 text-xs font-semibold uppercase tracking-widest">
          3-Hour Deep Focus Session
        </span>
      </div>

      {/* Countdown */}
      <div className="text-center mb-4">
        <div
          className={`text-4xl font-bold tabular-nums tracking-tight ${
            isComplete ? 'text-green-400' : 'text-white'
          }`}
        >
          {formatTime(secondsLeft)}
        </div>
        {isComplete && (
          <p className="text-green-400 text-sm mt-1 font-medium">
            🎉 Session Complete!
          </p>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Motivational Quote */}
      <div className="border-t border-white/10 pt-4">
        <p className="text-white/50 text-xs italic text-center leading-relaxed">
          "{quote}"
        </p>
      </div>
    </div>
  );
}

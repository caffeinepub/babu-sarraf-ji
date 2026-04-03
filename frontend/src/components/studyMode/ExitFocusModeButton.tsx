import { X } from 'lucide-react';
import { useStudyMode } from '../../hooks/useStudyMode';

export default function ExitFocusModeButton() {
  const { exitStudyMode } = useStudyMode();

  return (
    <button
      onClick={exitStudyMode}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white/90 border border-white/10 hover:border-white/20 transition-all text-xs font-medium backdrop-blur-sm"
      aria-label="Exit Focus Mode"
    >
      <X className="w-3.5 h-3.5" />
      <span>Exit Focus Mode</span>
    </button>
  );
}

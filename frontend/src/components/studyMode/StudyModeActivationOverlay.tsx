import { useEffect } from 'react';
import { X, BellOff, Smartphone, Monitor } from 'lucide-react';

interface StudyModeActivationOverlayProps {
  onClose: () => void;
  onStartDeepFocus: () => void;
}

export default function StudyModeActivationOverlay({
  onClose,
  onStartDeepFocus,
}: StudyModeActivationOverlayProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleStartDeepFocus = () => {
    onClose();
    onStartDeepFocus();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-white/40 hover:text-white/80 hover:bg-white/10 transition-all"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            Activate Focus Mode Now 🔥
          </h2>
          <p className="text-white/50 text-sm mt-2">
            Prepare your environment for deep work
          </p>
        </div>

        {/* Instructions */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/8">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-orange-500/20 flex items-center justify-center">
              <BellOff className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Turn on Do Not Disturb</p>
              <p className="text-white/40 text-xs mt-0.5">Silence all notifications</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/8">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Enable Focus Mode on your phone</p>
              <p className="text-white/40 text-xs mt-0.5">Block distracting apps</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/8">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center">
              <Monitor className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Keep only Focus Babu open</p>
              <p className="text-white/40 text-xs mt-0.5">Close all other tabs and apps</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleStartDeepFocus}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg hover:from-orange-400 hover:to-red-400 transition-all shadow-lg hover:shadow-orange-500/25 active:scale-[0.98]"
        >
          Start Deep Focus
        </button>

        <p className="text-center text-white/30 text-xs mt-4">
          Press Escape to cancel
        </p>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { getRandomWelcomeMessage } from '../lib/welcomeMotivationMessages';

export default function WelcomeMotivationOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [message] = useState(() => getRandomWelcomeMessage());

  useEffect(() => {
    // Start fade-out animation after 700ms (visible for ~1s total with animations)
    const fadeOutTimer = setTimeout(() => {
      setIsAnimatingOut(true);
    }, 700);

    // Remove from DOM after fade-out completes
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300 ${
        isAnimatingOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ pointerEvents: 'none' }}
    >
      {/* Dark transparent backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* Message content */}
      <div className="relative z-10 px-8 py-6 text-center">
        <p className="text-2xl md:text-3xl font-semibold text-white tracking-wide">
          {message}
        </p>
      </div>
    </div>
  );
}

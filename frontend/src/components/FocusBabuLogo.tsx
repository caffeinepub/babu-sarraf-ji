import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

interface FocusBabuLogoProps {
  variant?: 'navbar' | 'centered';
  className?: string;
}

export default function FocusBabuLogo({ variant = 'navbar', className = '' }: FocusBabuLogoProps) {
  const navigate = useNavigate();
  const [streamerMode, setStreamerMode] = useState(false);

  useEffect(() => {
    const checkStreamerMode = () => {
      try {
        const val = localStorage.getItem('streamerMode');
        setStreamerMode(val === 'true');
      } catch {
        setStreamerMode(false);
      }
    };

    checkStreamerMode();

    // Listen for storage changes (e.g., toggled in another component)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'streamerMode') {
        setStreamerMode(e.newValue === 'true');
      }
    };

    // Also poll for same-tab changes via a custom event
    const handleCustom = () => checkStreamerMode();

    window.addEventListener('storage', handleStorage);
    window.addEventListener('streamerModeChange', handleCustom);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('streamerModeChange', handleCustom);
    };
  }, []);

  if (streamerMode) return null;

  const handleClick = () => {
    navigate({ to: '/' });
  };

  const sizeClasses =
    variant === 'navbar'
      ? 'h-8 sm:h-10 w-auto max-w-[140px] sm:max-w-[180px]'
      : 'h-20 sm:h-28 w-auto max-w-[120px] sm:max-w-[160px]';

  return (
    <button
      onClick={handleClick}
      className={`
        cursor-pointer
        transition-transform
        duration-200
        ease-out
        hover:scale-[1.07]
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
        focus-visible:ring-offset-2
        p-1
        ${className}
      `}
      aria-label="Go to homepage"
    >
      <img
        src="/assets/generated/focus-babu-logo.dim_512x512.png"
        alt="Focus Babu"
        className={`
          ${sizeClasses}
          object-contain
          transition-all
          duration-200
          dark:drop-shadow-[0_0_10px_rgba(251,146,60,0.35)]
          dark:hover:drop-shadow-[0_0_16px_rgba(251,146,60,0.55)]
        `}
      />
    </button>
  );
}

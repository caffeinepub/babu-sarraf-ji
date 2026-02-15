import { useNavigate } from '@tanstack/react-router';

interface FocusBabuLogoProps {
  variant?: 'navbar' | 'centered';
  className?: string;
}

export default function FocusBabuLogo({ variant = 'navbar', className = '' }: FocusBabuLogoProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: '/' });
  };

  const sizeClasses = variant === 'navbar' 
    ? 'h-8 sm:h-10 w-auto' 
    : 'h-20 sm:h-24 w-auto';

  return (
    <button
      onClick={handleClick}
      className={`
        cursor-pointer 
        transition-all 
        duration-300 
        hover:scale-105 
        hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]
        focus:outline-none 
        focus-visible:ring-2 
        focus-visible:ring-primary 
        focus-visible:ring-offset-2
        ${className}
      `}
      aria-label="Go to homepage"
    >
      <img
        src="/assets/generated/logo-focus-babu.dim_512x256.png"
        alt="Focus Babu"
        className={`${sizeClasses} object-contain`}
      />
    </button>
  );
}

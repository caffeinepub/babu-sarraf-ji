import { SiInstagram, SiX } from 'react-icons/si';

interface SocialLinksProps {
  variant?: 'header' | 'footer';
  className?: string;
}

export default function SocialLinks({ variant = 'footer', className = '' }: SocialLinksProps) {
  const iconSize = variant === 'header' ? 'w-5 h-5' : 'w-4 h-4';
  const gapSize = variant === 'header' ? 'gap-3' : 'gap-4';

  return (
    <div className={`flex items-center ${gapSize} ${className}`} data-social-links>
      <a
        href="https://instagram.com/babu_sarraf_ji"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon-link"
        aria-label="Follow on Instagram"
      >
        <SiInstagram className={iconSize} />
      </a>
      <a
        href="https://x.com/babu_sarraf_ji"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon-link"
        aria-label="Follow on X (Twitter)"
      >
        <SiX className={iconSize} />
      </a>
    </div>
  );
}

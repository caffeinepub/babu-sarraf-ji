import { generateGlow } from '../../lib/color';

export type SizeVariant = 'default' | 'streamer';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  sizeVariant?: SizeVariant;
}

// Original (streamer) dimensions — unchanged
const STREAMER_SIZE = 280;
const STREAMER_STROKE = 12;

// Enlarged dashboard dimensions (~50% larger than original 280px)
const DEFAULT_SIZE = 420;
const DEFAULT_STROKE = 18;

export default function ProgressRing({
  progress,
  size: sizeProp,
  strokeWidth: strokeWidthProp,
  color,
  sizeVariant = 'default',
}: ProgressRingProps) {
  // Resolve size based on sizeVariant (explicit props override variant)
  const size = sizeProp ?? (sizeVariant === 'streamer' ? STREAMER_SIZE : DEFAULT_SIZE);
  const strokeWidth =
    strokeWidthProp ?? (sizeVariant === 'streamer' ? STREAMER_STROKE : DEFAULT_STROKE);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="-rotate-90"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-border/30"
      />
      {/* Progress circle with intense neon glow */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth + 2}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-300 ease-linear"
        style={{
          filter: generateGlow(color),
        }}
      />
    </svg>
  );
}

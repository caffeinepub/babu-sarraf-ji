import React, { useMemo } from 'react';

interface FocusTreeProps {
  /** 0–100: how far through the current focus session */
  progress: number;
}

/**
 * Minimal aesthetic SVG focus tree that grows through 5 stages as the
 * focus session progresses. Uses only CSS transitions — no heavy libs.
 *
 * Stages:
 *  0%   → seed / tiny sprout
 *  25%  → small plant
 *  50%  → medium plant
 *  75%  → branched tree
 *  100% → fully grown glowing tree
 */
export default function FocusTree({ progress }: FocusTreeProps) {
  const p = Math.max(0, Math.min(100, progress));

  // Interpolate a value between two numbers based on progress within a range
  const lerp = (from: number, to: number, t: number) => from + (to - from) * Math.max(0, Math.min(1, t));

  // Normalised progress within each stage (0→1)
  const stage1 = Math.min(1, p / 25);          // 0–25%
  const stage2 = Math.min(1, Math.max(0, (p - 25) / 25));  // 25–50%
  const stage3 = Math.min(1, Math.max(0, (p - 50) / 25));  // 50–75%
  const stage4 = Math.min(1, Math.max(0, (p - 75) / 25));  // 75–100%

  // ── Trunk ──────────────────────────────────────────────────────────────
  // Trunk grows from a tiny nub to full height
  const trunkHeight = lerp(4, 52, stage1 + stage2 * 0.5 + stage3 * 0.3 + stage4 * 0.2);
  const trunkWidth  = lerp(2, 5,  stage1 + stage2 * 0.5 + stage3 * 0.3 + stage4 * 0.2);
  const trunkY      = 90; // base Y (bottom of trunk)
  const trunkTopY   = trunkY - trunkHeight;

  // ── Foliage layers ─────────────────────────────────────────────────────
  // Each layer is an ellipse that scales in
  const layer1Scale = lerp(0, 1, stage1);
  const layer2Scale = lerp(0, 1, stage2);
  const layer3Scale = lerp(0, 1, stage3);
  const layer4Scale = lerp(0, 1, stage4);

  // Foliage sizes (rx, ry) at full scale
  const foliage = [
    { cx: 50, cy: 72, rx: 14, ry: 10, scale: layer1Scale },  // bottom layer
    { cx: 50, cy: 58, rx: 18, ry: 13, scale: layer2Scale },  // mid layer
    { cx: 50, cy: 44, rx: 16, ry: 12, scale: layer3Scale },  // upper layer
    { cx: 50, cy: 32, rx: 12, ry: 10, scale: layer4Scale },  // top canopy
  ];

  // ── Branches ───────────────────────────────────────────────────────────
  const branchOpacity = lerp(0, 1, stage3);
  const branchScale   = lerp(0, 1, stage3);

  // ── Glow intensity ─────────────────────────────────────────────────────
  const glowBlur    = lerp(2, 12, p / 100);
  const glowOpacity = lerp(0.3, 0.9, p / 100);
  const glowSpread  = p >= 100 ? 18 : lerp(4, 10, p / 100);

  // ── Seed / sprout (visible only at very low progress) ──────────────────
  const seedOpacity = lerp(1, 0, stage1);
  const sproutOpacity = stage1;

  const treeFilter = `drop-shadow(0 0 ${glowBlur}px rgba(74, 222, 128, ${glowOpacity})) drop-shadow(0 0 ${glowSpread}px rgba(34, 197, 94, ${glowOpacity * 0.5}))`;

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
      style={{
        transition: 'filter 0.8s ease',
        filter: treeFilter,
        overflow: 'visible',
      }}
    >
      <defs>
        {/* Radial gradient for foliage — dark center to bright edge */}
        <radialGradient id="foliageGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%"   stopColor="#16a34a" stopOpacity="0.85" />
          <stop offset="60%"  stopColor="#22c55e" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#4ade80" stopOpacity="0.7" />
        </radialGradient>
        {/* Trunk gradient */}
        <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#14532d" />
          <stop offset="50%"  stopColor="#166534" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
      </defs>

      {/* ── Seed (0–5%) ── */}
      {p < 8 && (
        <ellipse
          cx="50"
          cy="88"
          rx="3"
          ry="2"
          fill="#22c55e"
          opacity={seedOpacity * 0.9}
          style={{ transition: 'opacity 0.6s ease' }}
        />
      )}

      {/* ── Sprout leaves (0–25%) ── */}
      {p < 30 && (
        <g
          style={{
            opacity: sproutOpacity,
            transition: 'opacity 0.6s ease',
            transformOrigin: '50px 86px',
            transform: `scale(${lerp(0.3, 1, stage1)})`,
          }}
        >
          {/* Left leaf */}
          <ellipse
            cx="46"
            cy="84"
            rx="4"
            ry="2.5"
            fill="#4ade80"
            opacity="0.85"
            transform="rotate(-30 46 84)"
          />
          {/* Right leaf */}
          <ellipse
            cx="54"
            cy="84"
            rx="4"
            ry="2.5"
            fill="#4ade80"
            opacity="0.85"
            transform="rotate(30 54 84)"
          />
        </g>
      )}

      {/* ── Trunk ── */}
      {trunkHeight > 2 && (
        <rect
          x={50 - trunkWidth / 2}
          y={trunkTopY}
          width={trunkWidth}
          height={trunkHeight}
          rx={trunkWidth / 2}
          fill="url(#trunkGrad)"
          style={{ transition: 'all 0.8s ease' }}
        />
      )}

      {/* ── Branches (visible from 50%) ── */}
      {stage3 > 0 && (
        <g
          style={{
            opacity: branchOpacity,
            transition: 'opacity 0.8s ease',
          }}
        >
          {/* Left branch */}
          <line
            x1="50"
            y1={trunkTopY + 8}
            x2={50 - 12 * branchScale}
            y2={trunkTopY + 2}
            stroke="#166534"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Right branch */}
          <line
            x1="50"
            y1={trunkTopY + 8}
            x2={50 + 12 * branchScale}
            y2={trunkTopY + 2}
            stroke="#166534"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Upper left branch */}
          {stage4 > 0 && (
            <line
              x1="50"
              y1={trunkTopY + 4}
              x2={50 - 8 * layer4Scale}
              y2={trunkTopY - 4 * layer4Scale}
              stroke="#166534"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={layer4Scale}
            />
          )}
          {/* Upper right branch */}
          {stage4 > 0 && (
            <line
              x1="50"
              y1={trunkTopY + 4}
              x2={50 + 8 * layer4Scale}
              y2={trunkTopY - 4 * layer4Scale}
              stroke="#166534"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={layer4Scale}
            />
          )}
        </g>
      )}

      {/* ── Foliage layers ── */}
      {foliage.map((f, i) => (
        f.scale > 0.01 && (
          <ellipse
            key={i}
            cx={f.cx}
            cy={f.cy}
            rx={f.rx * f.scale}
            ry={f.ry * f.scale}
            fill="url(#foliageGrad)"
            style={{ transition: 'all 0.8s ease' }}
          />
        )
      ))}

      {/* ── Full-bloom sparkle dots at 100% ── */}
      {p >= 95 && (
        <g opacity={lerp(0, 1, (p - 95) / 5)}>
          <circle cx="38" cy="28" r="1.2" fill="#86efac" />
          <circle cx="62" cy="26" r="1"   fill="#86efac" />
          <circle cx="44" cy="20" r="0.8" fill="#bbf7d0" />
          <circle cx="56" cy="22" r="1"   fill="#86efac" />
          <circle cx="50" cy="18" r="1.2" fill="#bbf7d0" />
        </g>
      )}
    </svg>
  );
}

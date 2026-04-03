/**
 * Color utility functions for the Focus Babu timer.
 * Provides neon glow generation, text shadow, and hex/rgba conversion.
 */

/**
 * Validates a hex color string (3 or 6 digit, with or without #).
 */
export function isValidHexColor(color: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color);
}

/**
 * Converts a hex color to rgba string.
 */
export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean;
  const r = parseInt(full.substring(0, 2), 16);
  const g = parseInt(full.substring(2, 4), 16);
  const b = parseInt(full.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Generates a multi-layer neon glow CSS filter string for SVG drop-shadow.
 * Produces a sharp, intense outer glow effect suitable for the progress arc.
 */
export function generateGlow(color: string): string {
  return [
    `drop-shadow(0 0 3px ${color})`,
    `drop-shadow(0 0 8px ${color})`,
    `drop-shadow(0 0 16px ${color})`,
    `drop-shadow(0 0 28px ${color})`,
    `drop-shadow(0 0 40px ${color})`,
  ].join(' ');
}

/**
 * Generates an intense neon glow for the enlarged dashboard timer arc.
 * More layers and higher spread for a striking study-vibe effect.
 */
export function generateIntenseGlow(color: string): string {
  return [
    `drop-shadow(0 0 4px ${color})`,
    `drop-shadow(0 0 10px ${color})`,
    `drop-shadow(0 0 20px ${color})`,
    `drop-shadow(0 0 35px ${color})`,
    `drop-shadow(0 0 55px ${color})`,
    `drop-shadow(0 0 70px ${color})`,
  ].join(' ');
}

/**
 * Generates a CSS text-shadow string for the countdown digits.
 */
export function generateTextShadow(color: string): string {
  return [
    `0 0 8px ${color}`,
    `0 0 20px ${color}`,
    `0 0 40px ${color}`,
    `0 0 60px ${hexToRgba(color, 0.6)}`,
  ].join(', ');
}

/**
 * Alias kept for backward compatibility.
 */
export const hexToGlowStyle = generateGlow;

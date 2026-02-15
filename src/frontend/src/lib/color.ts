/**
 * Color utility functions for timer styling
 */

/**
 * Converts a hex color to rgba format with specified alpha
 */
export function hexToRgba(hex: string, alpha: number): string {
  // Remove # if present
  const cleanHex = hex.replace('#', '');
  
  // Parse hex to RGB
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Generates a glow effect (drop-shadow) for the given color
 * Optimized for visibility on dark navy/black backgrounds
 */
export function generateGlow(color: string): string {
  const glow1 = hexToRgba(color, 0.5);
  const glow2 = hexToRgba(color, 0.3);
  const glow3 = hexToRgba(color, 0.15);
  return `drop-shadow(0 0 6px ${glow1}) drop-shadow(0 0 12px ${glow2}) drop-shadow(0 0 20px ${glow3})`;
}

/**
 * Generates a text shadow for the given color
 * Creates a glowing effect around text optimized for dark backgrounds
 */
export function generateTextShadow(color: string): string {
  const shadow1 = hexToRgba(color, 0.7);
  const shadow2 = hexToRgba(color, 0.4);
  const shadow3 = hexToRgba(color, 0.2);
  return `0 0 15px ${shadow1}, 0 0 30px ${shadow2}, 0 0 50px ${shadow3}`;
}

/**
 * Validates if a string is a valid hex color
 */
export function isValidHexColor(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color);
}

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
 * Optimized for visibility in dark mode
 */
export function generateGlow(color: string): string {
  const glow1 = hexToRgba(color, 0.4);
  const glow2 = hexToRgba(color, 0.2);
  return `drop-shadow(0 0 8px ${glow1}) drop-shadow(0 0 16px ${glow2})`;
}

/**
 * Generates a text shadow for the given color
 * Creates a glowing effect around text
 */
export function generateTextShadow(color: string): string {
  const shadow1 = hexToRgba(color, 0.6);
  const shadow2 = hexToRgba(color, 0.3);
  const shadow3 = hexToRgba(color, 0.2);
  return `0 0 20px ${shadow1}, 0 0 40px ${shadow2}, 0 0 60px ${shadow3}`;
}

/**
 * Validates if a string is a valid hex color
 */
export function isValidHexColor(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color);
}

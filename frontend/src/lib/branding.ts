// Centralized branding constants for the Focus Babu application
export const SITE_NAME = 'Focus Babu';
export const SITE_TAGLINE = 'Focus. Study. Repeat.';
export const APP_IDENTIFIER = 'focus-babu';

export function getCopyrightText(year: number): string {
  return `© ${year} ${SITE_NAME}. All rights reserved.`;
}

export function getAppIdentifier(): string {
  if (typeof window !== 'undefined') {
    return encodeURIComponent(window.location.hostname);
  }
  return APP_IDENTIFIER;
}

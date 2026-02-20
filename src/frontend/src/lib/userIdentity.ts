import type { UserProfile } from '../backend';

/**
 * Resolves a display name from a user profile with deterministic fallback.
 * Fallback order: displayName → email → short principal
 */
export function resolveDisplayName(
  profile: UserProfile | null | undefined,
  principalString: string
): string {
  // First priority: displayName from profile
  if (profile?.displayName && profile.displayName.trim()) {
    return profile.displayName.trim();
  }

  // Second priority: email from profile
  if (profile?.email && profile.email.trim()) {
    return profile.email.trim();
  }

  // Final fallback: short principal
  if (principalString) {
    return `${principalString.slice(0, 8)}...${principalString.slice(-4)}`;
  }

  return 'User';
}

/**
 * Derives stable initials from a display name for avatar fallback.
 * Returns up to 2 uppercase characters.
 */
export function deriveInitials(displayName: string): string {
  if (!displayName || !displayName.trim()) {
    return 'U';
  }

  const trimmed = displayName.trim();
  const words = trimmed.split(/\s+/);

  if (words.length >= 2) {
    // Take first letter of first two words
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  // Single word: take first two characters or just first
  if (trimmed.length >= 2) {
    return trimmed.slice(0, 2).toUpperCase();
  }

  return trimmed[0].toUpperCase();
}

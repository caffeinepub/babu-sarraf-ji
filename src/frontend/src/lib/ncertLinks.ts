// NCERT PDF link utilities

const ALLOWED_NCERT_DOMAINS = ['ncert.nic.in'];

/**
 * Validates if a URL is from an official NCERT domain
 */
export function isValidNcertUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const urlObj = new URL(url);
    return ALLOWED_NCERT_DOMAINS.some((domain) => urlObj.hostname === domain);
  } catch {
    return false;
  }
}

/**
 * Encodes a PDF URL for safe use in navigation parameters
 */
export function encodePdfUrl(url: string): string {
  return encodeURIComponent(url);
}

/**
 * Decodes a PDF URL from navigation parameters
 * Handles both encoded and already-decoded strings safely
 */
export function decodePdfUrl(encodedUrl: string): string {
  if (!encodedUrl) return '';
  
  try {
    // Check if already decoded by trying to parse as URL
    const testUrl = new URL(encodedUrl);
    // If it parses successfully, it's already decoded
    return encodedUrl;
  } catch {
    // Not a valid URL, try decoding
    try {
      return decodeURIComponent(encodedUrl);
    } catch {
      // If decode fails, return as-is
      return encodedUrl;
    }
  }
}

/**
 * Gets a user-friendly error message for invalid NCERT URLs
 */
export function getInvalidUrlMessage(): string {
  return 'This PDF link is not from the official NCERT website. Only ncert.nic.in links are allowed.';
}

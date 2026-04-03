/**
 * Forest Mode metrics utility.
 * Persists daily tree count in localStorage with a date key.
 * Auto-resets to 0 on a new calendar day.
 */

function getTodayKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `forest-${y}-${m}-${d}`;
}

export function getTodayTreeCount(): number {
  const key = getTodayKey();
  const stored = localStorage.getItem(key);
  if (stored === null) return 0;
  const parsed = parseInt(stored, 10);
  return isNaN(parsed) ? 0 : parsed;
}

export function incrementTreeCount(): number {
  const key = getTodayKey();
  const current = getTodayTreeCount();
  const next = current + 1;
  localStorage.setItem(key, String(next));
  return next;
}

export function resetTreeCount(): void {
  const key = getTodayKey();
  localStorage.setItem(key, '0');
}

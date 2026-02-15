interface Metrics {
  dailySessions: number;
  streak: number;
  lastSessionDate: string;
}

const STORAGE_KEY = 'studyMetrics';

function getTodayString(): string {
  return new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format
}

function getMetricsFromStorage(): Metrics {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Error loading metrics:', error);
  }
  return { dailySessions: 0, streak: 0, lastSessionDate: '' };
}

function saveMetrics(metrics: Metrics): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics));
  } catch (error) {
    console.warn('Error saving metrics:', error);
  }
}

export function incrementDailySession(): void {
  const metrics = getMetricsFromStorage();
  const today = getTodayString();

  if (metrics.lastSessionDate === today) {
    // Same day, just increment sessions
    metrics.dailySessions += 1;
  } else {
    // New day
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toLocaleDateString('en-CA');

    if (metrics.lastSessionDate === yesterdayString) {
      // Consecutive day, increment streak
      metrics.streak += 1;
    } else if (metrics.lastSessionDate === '') {
      // First ever session
      metrics.streak = 1;
    } else {
      // Streak broken, reset to 1
      metrics.streak = 1;
    }

    metrics.dailySessions = 1;
    metrics.lastSessionDate = today;
  }

  saveMetrics(metrics);
}

export function getMetrics(): { dailySessions: number; streak: number } {
  const metrics = getMetricsFromStorage();
  const today = getTodayString();

  // Reset daily sessions if it's a new day
  if (metrics.lastSessionDate !== today && metrics.lastSessionDate !== '') {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toLocaleDateString('en-CA');

    // Check if streak should be reset
    if (metrics.lastSessionDate !== yesterdayString) {
      metrics.streak = 0;
    }
    metrics.dailySessions = 0;
  }

  return {
    dailySessions: metrics.dailySessions,
    streak: metrics.streak,
  };
}

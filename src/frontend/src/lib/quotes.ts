const QUOTES = [
  'Discipline beats motivation.',
  'Focus is the gateway to thinking clearly.',
  'Small progress is still progress.',
  'Success is the sum of small efforts repeated day in and day out.',
  'The secret of getting ahead is getting started.',
  'Don\'t watch the clock; do what it does. Keep going.',
  'Study while others are sleeping; work while others are loafing.',
  'The expert in anything was once a beginner.',
  'Your limitation—it\'s only your imagination.',
  'Great things never come from comfort zones.',
];

export function getRandomQuote(): string {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

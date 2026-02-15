/**
 * Welcome motivation messages and random selection helper
 */

const WELCOME_MESSAGES = [
  'Welcome Champion 🔥 Stay Focused.',
  'Success Starts With Discipline.',
  'Focus. Study. Repeat.',
  'Your Dream Rank Is Waiting.',
];

/**
 * Selects a random welcome message from the predefined list
 */
export function getRandomWelcomeMessage(): string {
  const randomIndex = Math.floor(Math.random() * WELCOME_MESSAGES.length);
  return WELCOME_MESSAGES[randomIndex];
}

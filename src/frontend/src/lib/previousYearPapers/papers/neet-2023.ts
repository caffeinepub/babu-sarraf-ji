import type { PYPPaperMetadata } from '../types';

export const neet2023: PYPPaperMetadata = {
  id: 'neet-2023',
  exam: 'NEET',
  year: 2023,
  title: 'NEET 2023',
  durationSeconds: 12000,
  sections: [
    {
      name: 'Physics',
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        prompt: `NEET 2023 Physics Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: i % 4
      }))
    },
    {
      name: 'Chemistry',
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 11,
        prompt: `NEET 2023 Chemistry Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: i % 4
      }))
    },
    {
      name: 'Botany',
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 21,
        prompt: `NEET 2023 Botany Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: i % 4
      }))
    },
    {
      name: 'Zoology',
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 31,
        prompt: `NEET 2023 Zoology Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: i % 4
      }))
    }
  ]
};

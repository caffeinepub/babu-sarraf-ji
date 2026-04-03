import type { PYPPaperMetadata } from '../types';

export const neet2022: PYPPaperMetadata = {
  id: 'neet-2022',
  exam: 'NEET',
  year: 2022,
  title: 'NEET 2022',
  durationSeconds: 12000,
  sections: [
    {
      name: 'Physics',
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        prompt: `NEET 2022 Physics Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: i % 4
      }))
    },
    {
      name: 'Chemistry',
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 11,
        prompt: `NEET 2022 Chemistry Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: i % 4
      }))
    },
    {
      name: 'Botany',
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 21,
        prompt: `NEET 2022 Botany Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: i % 4
      }))
    },
    {
      name: 'Zoology',
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 31,
        prompt: `NEET 2022 Zoology Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: i % 4
      }))
    }
  ]
};

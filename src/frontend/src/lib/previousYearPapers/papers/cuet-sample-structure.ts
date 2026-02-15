import type { PYPPaperMetadata } from '../types';

export const cuet2024: PYPPaperMetadata = {
  id: 'cuet-2024',
  exam: 'CUET',
  year: 2024,
  title: 'CUET 2024',
  durationSeconds: 10800, // 3 hours
  sections: [
    {
      name: 'Section IA - Languages',
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        prompt: `CUET 2024 Language Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: i % 4
      }))
    },
    {
      name: 'Section II - Domain Subjects',
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 11,
        prompt: `CUET 2024 Domain Subject Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: i % 4
      }))
    },
    {
      name: 'Section III - General Test',
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 21,
        prompt: `CUET 2024 General Test Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: i % 4
      }))
    }
  ]
};

export const cuet2023: PYPPaperMetadata = {
  id: 'cuet-2023',
  exam: 'CUET',
  year: 2023,
  title: 'CUET 2023',
  durationSeconds: 10800,
  sections: [
    {
      name: 'Section IA - Languages',
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        prompt: `CUET 2023 Language Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: i % 4
      }))
    },
    {
      name: 'Section II - Domain Subjects',
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 11,
        prompt: `CUET 2023 Domain Subject Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: i % 4
      }))
    },
    {
      name: 'Section III - General Test',
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 21,
        prompt: `CUET 2023 General Test Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: i % 4
      }))
    }
  ]
};

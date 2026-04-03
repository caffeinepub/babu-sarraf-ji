export type ExamType = 'JEE' | 'NEET' | 'CUET';
export type CategoryType = '5 Years PYQ' | 'Chapter-wise' | 'Full Mock';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface TestConfig {
  exam: ExamType;
  category: CategoryType;
  duration: number; // in seconds
  questions: Question[];
}

// Sample questions for demo purposes
const sampleJEEQuestions: Question[] = [
  {
    id: 1,
    question: 'What is the derivative of sin(x)?',
    options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: 'What is the value of π (pi) approximately?',
    options: ['3.14', '2.71', '1.41', '1.73'],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: 'Which of the following is a prime number?',
    options: ['15', '17', '18', '20'],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: 'What is the integral of 1/x?',
    options: ['ln(x) + C', 'x² + C', '1/x² + C', 'e^x + C'],
    correctAnswer: 0,
  },
  {
    id: 5,
    question: 'What is the quadratic formula?',
    options: ['x = -b ± √(b²-4ac) / 2a', 'x = b ± √(b²+4ac) / 2a', 'x = -b / 2a', 'x = √(b²-4ac)'],
    correctAnswer: 0,
  },
];

const sampleNEETQuestions: Question[] = [
  {
    id: 1,
    question: 'What is the powerhouse of the cell?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'What is the chemical formula for water?',
    options: ['H2O', 'CO2', 'O2', 'H2O2'],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: 'Which organ pumps blood throughout the body?',
    options: ['Liver', 'Kidney', 'Heart', 'Lungs'],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: 'What is the basic unit of life?',
    options: ['Tissue', 'Organ', 'Cell', 'Atom'],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: 'What is the pH of pure water?',
    options: ['5', '7', '9', '14'],
    correctAnswer: 1,
  },
];

const sampleCUETQuestions: Question[] = [
  {
    id: 1,
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: 'In which year did India gain independence?',
    options: ['1945', '1947', '1950', '1952'],
    correctAnswer: 1,
  },
];

export function isValidExam(exam: string): exam is ExamType {
  return exam === 'JEE' || exam === 'NEET' || exam === 'CUET';
}

export function isValidCategory(category: string): category is CategoryType {
  return category === '5 Years PYQ' || category === 'Chapter-wise' || category === 'Full Mock';
}

export function getTestQuestions(exam: string, category: string): Question[] {
  // Default to JEE if invalid exam type
  const validExam = isValidExam(exam) ? exam : 'JEE';
  
  switch (validExam) {
    case 'JEE':
      return sampleJEEQuestions;
    case 'NEET':
      return sampleNEETQuestions;
    case 'CUET':
      return sampleCUETQuestions;
    default:
      return sampleJEEQuestions;
  }
}

export function getTestDuration(exam: string, category: string): number {
  // Duration in seconds
  if (category === 'Full Mock') {
    return 3600; // 60 minutes
  } else if (category === '5 Years PYQ') {
    return 1800; // 30 minutes
  } else {
    return 900; // 15 minutes
  }
}

export function getTestConfig(exam: string, category: string): TestConfig {
  // Validate and convert to proper types
  const validExam = isValidExam(exam) ? exam : 'JEE';
  const validCategory = isValidCategory(category) ? category : '5 Years PYQ';
  
  return {
    exam: validExam,
    category: validCategory,
    duration: getTestDuration(exam, category),
    questions: getTestQuestions(exam, category),
  };
}

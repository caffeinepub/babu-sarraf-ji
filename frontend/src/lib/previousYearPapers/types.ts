// Types for Previous Year Real Papers

export interface PYPQuestion {
  id: number;
  prompt: string;
  options: string[];
  correctAnswer: number;
  solution?: string; // Optional detailed solution/explanation
}

export interface PYPSection {
  name: string; // e.g., "Physics", "Chemistry", "Mathematics", "Botany", "Zoology"
  questions: PYPQuestion[];
}

export interface PYPPaperMetadata {
  id: string; // Unique identifier for the paper
  exam: 'JEE Main' | 'NEET' | 'CUET';
  year: number;
  shift?: string; // Optional shift identifier (e.g., "Shift 1", "All Shifts")
  title: string; // Display title
  durationSeconds: number; // Real exam duration
  sections: PYPSection[];
}

export interface PYPCatalogEntry {
  id: string;
  exam: 'JEE Main' | 'NEET' | 'CUET';
  year: number;
  shift?: string;
  title: string;
}

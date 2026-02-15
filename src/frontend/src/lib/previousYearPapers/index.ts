import type { PYPPaperMetadata, PYPCatalogEntry } from './types';
import { previousYearPapersCatalog } from './catalog';
import { jeeMain2024AllShifts } from './papers/jee-main-2024-all-shifts';
import { jeeMain2023AllShifts } from './papers/jee-main-2023-all-shifts';
import { jeeMain2022 } from './papers/jee-main-2022';
import { jeeMain2021 } from './papers/jee-main-2021';
import { neet2024 } from './papers/neet-2024';
import { neet2023 } from './papers/neet-2023';
import { neet2022 } from './papers/neet-2022';
import { neet2021 } from './papers/neet-2021';
import { cuet2024, cuet2023 } from './papers/cuet-sample-structure';

// Export types
export type { PYPPaperMetadata, PYPCatalogEntry, PYPQuestion, PYPSection } from './types';

// Export catalog
export { previousYearPapersCatalog };

// Paper registry
const paperRegistry: Record<string, PYPPaperMetadata> = {
  'jee-main-2024-all-shifts': jeeMain2024AllShifts,
  'jee-main-2023-all-shifts': jeeMain2023AllShifts,
  'jee-main-2022': jeeMain2022,
  'jee-main-2021': jeeMain2021,
  'neet-2024': neet2024,
  'neet-2023': neet2023,
  'neet-2022': neet2022,
  'neet-2021': neet2021,
  'cuet-2024': cuet2024,
  'cuet-2023': cuet2023
};

/**
 * Get a previous year paper by its ID
 */
export function getPreviousYearPaper(paperId: string): PYPPaperMetadata | null {
  return paperRegistry[paperId] || null;
}

/**
 * Get all catalog entries for a specific exam
 */
export function getPapersByExam(exam: 'JEE Main' | 'NEET' | 'CUET'): PYPCatalogEntry[] {
  return previousYearPapersCatalog.filter(entry => entry.exam === exam);
}

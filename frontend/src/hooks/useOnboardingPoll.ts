import { useState, useEffect, useCallback } from 'react';

export type ExamType = 'NEET' | 'JEE' | 'SCHOOL' | 'OTHER';

const STORAGE_KEY_NAME = 'focusBabu_userName';
const STORAGE_KEY_EXAM = 'focusBabu_examType';
const SESSION_SKIP_KEY = 'focusBabu_pollSkipped';

export function getStoredUserName(): string | null {
  return localStorage.getItem(STORAGE_KEY_NAME);
}

export function getStoredExamType(): ExamType | null {
  const val = localStorage.getItem(STORAGE_KEY_EXAM);
  if (val === 'NEET' || val === 'JEE' || val === 'SCHOOL' || val === 'OTHER') return val;
  return null;
}

export function getExamAccentColor(examType: ExamType | null): string | null {
  switch (examType) {
    case 'NEET': return '#22c55e';
    case 'JEE': return '#3b82f6';
    case 'SCHOOL': return '#eab308';
    case 'OTHER': return '#a855f7';
    default: return null;
  }
}

export function useOnboardingPoll() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAtStep, setOpenAtStep] = useState<1 | 2>(1);
  const [userName, setUserName] = useState<string | null>(getStoredUserName);
  const [examType, setExamType] = useState<ExamType | null>(getStoredExamType);

  // Determine if we should show the modal on first visit
  useEffect(() => {
    const skipped = sessionStorage.getItem(SESSION_SKIP_KEY) === 'true';
    const hasName = !!localStorage.getItem(STORAGE_KEY_NAME);
    const hasExam = !!localStorage.getItem(STORAGE_KEY_EXAM);

    if (!skipped && (!hasName || !hasExam)) {
      setIsModalOpen(true);
      setOpenAtStep(1);
    }
  }, []);

  const handleSubmit = useCallback((name: string, exam: ExamType) => {
    localStorage.setItem(STORAGE_KEY_NAME, name);
    localStorage.setItem(STORAGE_KEY_EXAM, exam);
    setUserName(name);
    setExamType(exam);
    setIsModalOpen(false);
  }, []);

  const handleSkip = useCallback(() => {
    sessionStorage.setItem(SESSION_SKIP_KEY, 'true');
    setIsModalOpen(false);
  }, []);

  const handleChangeExam = useCallback(() => {
    // Remove only exam type so modal opens at step 2
    localStorage.removeItem(STORAGE_KEY_EXAM);
    setExamType(null);
    setOpenAtStep(2);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openAtStep,
    userName,
    examType,
    handleSubmit,
    handleSkip,
    handleChangeExam,
    closeModal,
  };
}

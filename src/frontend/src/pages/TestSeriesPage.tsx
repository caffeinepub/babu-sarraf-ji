import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Target } from 'lucide-react';
import SiteNav from '../components/SiteNav';
import ExamSession from '../components/testSeries/ExamSession';
import TestResults from '../components/testSeries/TestResults';
import TestHistory from '../components/testSeries/TestHistory';
import { getTestQuestions } from '../lib/testSeriesData';
import { getCopyrightText, getAppIdentifier, SITE_NAME } from '../lib/branding';
import { useAuthState } from '../hooks/useAuthState';
import { useSaveTestResult } from '../hooks/testSeries/useTestHistory';
import type { TestResult } from '../backend';

type ViewState = 
  | { type: 'list' }
  | { type: 'exam'; exam: string; category: string }
  | { type: 'results'; result: TestResult; userAnswers: Record<number, number> };

export default function TestSeriesPage() {
  const [viewState, setViewState] = useState<ViewState>({ type: 'list' });
  const { isAuthenticated } = useAuthState();
  const saveTestResult = useSaveTestResult();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error' | 'signin-required'>('idle');

  const handleStartTest = (exam: string, category: string) => {
    setViewState({ type: 'exam', exam, category });
    setSaveStatus('idle');
  };

  const handleTestSubmit = async (
    exam: string,
    category: string,
    userAnswers: Record<number, number>,
    timeSpent: number
  ) => {
    const questions = getTestQuestions(exam, category);
    let correctCount = 0;
    let incorrectCount = 0;

    questions.forEach((q, idx) => {
      const userAnswer = userAnswers[idx];
      if (userAnswer !== undefined) {
        if (userAnswer === q.correctAnswer) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      } else {
        incorrectCount++;
      }
    });

    const totalQuestions = questions.length;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const score = correctCount;

    const result: TestResult = {
      exam,
      category,
      timestamp: BigInt(Date.now() * 1000000),
      totalQuestions: BigInt(totalQuestions),
      correctCount: BigInt(correctCount),
      incorrectCount: BigInt(incorrectCount),
      score: BigInt(score),
      accuracy: BigInt(accuracy),
    };

    setViewState({ type: 'results', result, userAnswers });

    // Save to backend if authenticated
    if (isAuthenticated) {
      setSaveStatus('saving');
      try {
        await saveTestResult.mutateAsync(result);
        setSaveStatus('success');
      } catch (error) {
        console.error('Failed to save test result:', error);
        setSaveStatus('error');
      }
    } else {
      setSaveStatus('signin-required');
    }
  };

  const handleBackToList = () => {
    setViewState({ type: 'list' });
    setSaveStatus('idle');
  };

  if (viewState.type === 'exam') {
    return (
      <div className="min-h-screen bg-background">
        <SiteNav />
        <ExamSession
          exam={viewState.exam}
          category={viewState.category}
          onSubmit={handleTestSubmit}
          onExit={handleBackToList}
        />
      </div>
    );
  }

  if (viewState.type === 'results') {
    return (
      <div className="min-h-screen bg-background">
        <SiteNav />
        <TestResults
          result={viewState.result}
          userAnswers={viewState.userAnswers}
          saveStatus={saveStatus}
          onBackToList={handleBackToList}
        />
        <footer className="border-t border-border bg-card/40 backdrop-blur-sm py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>{getCopyrightText(new Date().getFullYear())}</p>
            <p className="mt-1">
              Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${getAppIdentifier()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Test Series</h1>
          <p className="text-muted-foreground">Practice with timed tests and track your progress</p>
        </div>

        {/* Test History Section */}
        <TestHistory />

        {/* JEE Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            JEE Test Series
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TestCategoryCard
              title="5 Years PYQ Tests"
              description="Previous Year Questions from last 5 years"
              icon={<FileText className="h-5 w-5" />}
              onClick={() => handleStartTest('JEE', '5 Years PYQ')}
            />
            <TestCategoryCard
              title="Chapter-wise Tests"
              description="Practice specific chapters in depth"
              icon={<BookOpen className="h-5 w-5" />}
              onClick={() => handleStartTest('JEE', 'Chapter-wise')}
            />
            <TestCategoryCard
              title="Full Syllabus Mock Test"
              description="Complete exam simulation"
              icon={<Target className="h-5 w-5" />}
              onClick={() => handleStartTest('JEE', 'Full Mock')}
            />
          </div>
        </section>

        {/* NEET Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            NEET Test Series
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TestCategoryCard
              title="5 Years PYQ Tests"
              description="Previous Year Questions from last 5 years"
              icon={<FileText className="h-5 w-5" />}
              onClick={() => handleStartTest('NEET', '5 Years PYQ')}
            />
            <TestCategoryCard
              title="Chapter-wise Tests"
              description="Practice specific chapters in depth"
              icon={<BookOpen className="h-5 w-5" />}
              onClick={() => handleStartTest('NEET', 'Chapter-wise')}
            />
            <TestCategoryCard
              title="Full Syllabus Mock Test"
              description="Complete exam simulation"
              icon={<Target className="h-5 w-5" />}
              onClick={() => handleStartTest('NEET', 'Full Mock')}
            />
          </div>
        </section>

        {/* CUET Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            CUET Test Series
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TestCategoryCard
              title="5 Years PYQ Tests"
              description="Previous Year Questions from last 5 years"
              icon={<FileText className="h-5 w-5" />}
              onClick={() => handleStartTest('CUET', '5 Years PYQ')}
            />
            <TestCategoryCard
              title="Chapter-wise Tests"
              description="Practice specific chapters in depth"
              icon={<BookOpen className="h-5 w-5" />}
              onClick={() => handleStartTest('CUET', 'Chapter-wise')}
            />
            <TestCategoryCard
              title="Full Syllabus Mock Test"
              description="Complete exam simulation"
              icon={<Target className="h-5 w-5" />}
              onClick={() => handleStartTest('CUET', 'Full Mock')}
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card/40 backdrop-blur-sm py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>{getCopyrightText(new Date().getFullYear())}</p>
          <p className="mt-1">
            Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${getAppIdentifier()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

interface TestCategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function TestCategoryCard({ title, description, icon, onClick }: TestCategoryCardProps) {
  return (
    <Card className="hover:border-primary transition-colors cursor-pointer" onClick={onClick}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full">Start Test</Button>
      </CardContent>
    </Card>
  );
}

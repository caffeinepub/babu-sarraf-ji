import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ChevronLeft, ChevronRight, Clock, X } from 'lucide-react';
import { getTestConfig } from '../../lib/testSeriesData';
import { useCountdownTimer } from '../../hooks/testSeries/useCountdownTimer';

interface ExamSessionProps {
  exam: string;
  category: string;
  onSubmit: (exam: string, category: string, answers: Record<number, number>, timeSpent: number) => void;
  onExit: () => void;
}

export default function ExamSession({ exam, category, onSubmit, onExit }: ExamSessionProps) {
  const testConfig = getTestConfig(exam, category);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);

  const { timeRemaining, isRunning, startTimer, stopTimer } = useCountdownTimer(testConfig.duration);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  useEffect(() => {
    if (timeRemaining === 0 && isRunning) {
      handleSubmit();
    }
  }, [timeRemaining, isRunning]);

  const currentQuestion = testConfig.questions[currentQuestionIndex];
  const totalQuestions = testConfig.questions.length;

  const handleOptionSelect = (optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    stopTimer();
    const timeSpent = testConfig.duration - timeRemaining;
    onSubmit(exam, category, userAnswers, timeSpent);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{exam} - {category}</h1>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {totalQuestions} • Answered: {answeredCount}/{totalQuestions}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="h-5 w-5 text-primary" />
              <span className={timeRemaining < 60 ? 'text-destructive' : ''}>{formatTime(timeRemaining)}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowExitDialog(true)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">Question {currentQuestionIndex + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">{currentQuestion.question}</p>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    userAnswers[currentQuestionIndex] === index
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        userAnswers[currentQuestionIndex] === index
                          ? 'border-primary bg-primary'
                          : 'border-border'
                      }`}
                    >
                      {userAnswers[currentQuestionIndex] === index && (
                        <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentQuestionIndex === totalQuestions - 1 ? (
            <Button onClick={() => setShowSubmitDialog(true)} className="gap-2">
              Submit Test
            </Button>
          ) : (
            <Button onClick={handleNext} className="gap-2">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Question Navigator */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Question Navigator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {testConfig.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`aspect-square rounded-lg border-2 font-semibold transition-all ${
                    index === currentQuestionIndex
                      ? 'border-primary bg-primary text-primary-foreground'
                      : userAnswers[index] !== undefined
                      ? 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              You have answered {answeredCount} out of {totalQuestions} questions.
              {answeredCount < totalQuestions && (
                <span className="block mt-2 text-destructive font-medium">
                  {totalQuestions - answeredCount} question(s) remain unanswered.
                </span>
              )}
              <span className="block mt-2">Are you sure you want to submit?</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be lost if you exit now. Are you sure you want to exit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onExit} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Exit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

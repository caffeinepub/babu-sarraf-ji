import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, ChevronRight, Clock, X, Flag } from 'lucide-react';
import { useCountdownTimer } from '../../../hooks/testSeries/useCountdownTimer';
import type { PYPPaperMetadata, PYPQuestion } from '../../../lib/previousYearPapers';

interface PreviousYearExamSessionProps {
  paper: PYPPaperMetadata;
  onSubmit: (answers: Record<number, number>, markedForReview: Set<number>) => void;
  onExit: () => void;
}

export default function PreviousYearExamSession({ paper, onSubmit, onExit }: PreviousYearExamSessionProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndexInSection, setCurrentQuestionIndexInSection] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);

  const { timeRemaining, isRunning, startTimer, stopTimer } = useCountdownTimer(paper.durationSeconds);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  useEffect(() => {
    if (timeRemaining === 0 && isRunning) {
      handleAutoSubmit();
    }
  }, [timeRemaining, isRunning]);

  // Flatten all questions with global indices
  const allQuestions: Array<{ question: PYPQuestion; sectionIndex: number; globalIndex: number }> = [];
  let globalIndex = 0;
  paper.sections.forEach((section, sectionIndex) => {
    section.questions.forEach(question => {
      allQuestions.push({ question, sectionIndex, globalIndex });
      globalIndex++;
    });
  });

  const currentSection = paper.sections[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndexInSection];
  const currentGlobalIndex = allQuestions.find(
    q => q.sectionIndex === currentSectionIndex && q.question.id === currentQuestion.id
  )?.globalIndex ?? 0;

  const handleOptionSelect = (optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentGlobalIndex]: optionIndex
    }));
  };

  const handleMarkForReview = (checked: boolean) => {
    setMarkedForReview(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(currentGlobalIndex);
      } else {
        newSet.delete(currentGlobalIndex);
      }
      return newSet;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndexInSection < currentSection.questions.length - 1) {
      setCurrentQuestionIndexInSection(prev => prev + 1);
    } else if (currentSectionIndex < paper.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      setCurrentQuestionIndexInSection(0);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndexInSection > 0) {
      setCurrentQuestionIndexInSection(prev => prev - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      setCurrentQuestionIndexInSection(paper.sections[currentSectionIndex - 1].questions.length - 1);
    }
  };

  const handleJumpToQuestion = (sectionIndex: number, questionIndexInSection: number) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentQuestionIndexInSection(questionIndexInSection);
  };

  const handleAutoSubmit = () => {
    stopTimer();
    onSubmit(userAnswers, markedForReview);
  };

  const handleManualSubmit = () => {
    stopTimer();
    setShowSubmitDialog(false);
    onSubmit(userAnswers, markedForReview);
  };

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const totalQuestions = allQuestions.length;

  const getQuestionStatus = (globalIdx: number): 'answered' | 'marked' | 'unanswered' => {
    const isAnswered = userAnswers[globalIdx] !== undefined;
    const isMarked = markedForReview.has(globalIdx);
    if (isAnswered && isMarked) return 'marked';
    if (isAnswered) return 'answered';
    return 'unanswered';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/40 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{paper.title}</h1>
              <p className="text-sm text-muted-foreground">
                {currentSection.name} • Question {currentQuestionIndexInSection + 1} of {currentSection.questions.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Clock className="h-5 w-5 text-primary" />
                <span className={timeRemaining < 300 ? 'text-destructive' : ''}>{formatTime(timeRemaining)}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowExitDialog(true)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-2">
            {/* Section Tabs */}
            <Tabs value={currentSectionIndex.toString()} onValueChange={(v) => {
              setCurrentSectionIndex(parseInt(v));
              setCurrentQuestionIndexInSection(0);
            }} className="mb-4">
              <TabsList className="w-full justify-start overflow-x-auto">
                {paper.sections.map((section, idx) => (
                  <TabsTrigger key={idx} value={idx.toString()}>
                    {section.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Question Card */}
            <Card className="mb-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Question {currentQuestionIndexInSection + 1}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="mark-review"
                      checked={markedForReview.has(currentGlobalIndex)}
                      onCheckedChange={handleMarkForReview}
                    />
                    <label htmlFor="mark-review" className="text-sm font-medium cursor-pointer flex items-center gap-1">
                      <Flag className="h-4 w-4" />
                      Mark for Review
                    </label>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base leading-relaxed">{currentQuestion.prompt}</p>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = userAnswers[currentGlobalIndex] === index;
                    return (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50 hover:bg-accent'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-semibold text-muted-foreground min-w-[24px]">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <span className="flex-1">{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSectionIndex === 0 && currentQuestionIndexInSection === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button variant="destructive" onClick={() => setShowSubmitDialog(true)}>
                Submit Test
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  currentSectionIndex === paper.sections.length - 1 &&
                  currentQuestionIndexInSection === currentSection.questions.length - 1
                }
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Question Palette */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-base">Question Palette</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Answered: {answeredCount}/{totalQuestions}
                </p>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  {paper.sections.map((section, sectionIdx) => (
                    <div key={sectionIdx} className="mb-6">
                      <h4 className="text-sm font-semibold mb-3">{section.name}</h4>
                      <div className="grid grid-cols-5 gap-2">
                        {section.questions.map((q, qIdx) => {
                          const globalIdx = allQuestions.find(
                            item => item.sectionIndex === sectionIdx && item.question.id === q.id
                          )?.globalIndex ?? 0;
                          const status = getQuestionStatus(globalIdx);
                          const isCurrent = sectionIdx === currentSectionIndex && qIdx === currentQuestionIndexInSection;

                          return (
                            <Button
                              key={q.id}
                              size="sm"
                              variant={isCurrent ? 'default' : 'outline'}
                              className={`h-10 ${
                                status === 'answered' && !isCurrent
                                  ? 'bg-green-500/20 border-green-500 hover:bg-green-500/30'
                                  : status === 'marked' && !isCurrent
                                  ? 'bg-yellow-500/20 border-yellow-500 hover:bg-yellow-500/30'
                                  : ''
                              }`}
                              onClick={() => handleJumpToQuestion(sectionIdx, qIdx)}
                            >
                              {qIdx + 1}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </ScrollArea>

                {/* Legend */}
                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="bg-green-500/20 border-green-500">1</Badge>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="bg-yellow-500/20 border-yellow-500">1</Badge>
                    <span>Marked for Review</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline">1</Badge>
                    <span>Not Answered</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
              <span className="block mt-2">
                Are you sure you want to submit? This action cannot be undone.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleManualSubmit}>
              Submit
            </AlertDialogAction>
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
            <AlertDialogAction onClick={onExit} className="bg-destructive hover:bg-destructive/90">
              Exit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, XCircle, TrendingUp, Award, AlertCircle, LogIn } from 'lucide-react';
import type { PYPPaperMetadata, PYPQuestion } from '../../../lib/previousYearPapers';

interface PreviousYearTestResultsProps {
  paper: PYPPaperMetadata;
  userAnswers: Record<number, number>;
  markedForReview: Set<number>;
  saveStatus: 'idle' | 'saving' | 'success' | 'error' | 'signin-required';
  onBackToList: () => void;
}

export default function PreviousYearTestResults({
  paper,
  userAnswers,
  markedForReview,
  saveStatus,
  onBackToList
}: PreviousYearTestResultsProps) {
  // Flatten all questions with global indices
  const allQuestions: Array<{ question: PYPQuestion; sectionName: string; globalIndex: number }> = [];
  let globalIndex = 0;
  paper.sections.forEach(section => {
    section.questions.forEach(question => {
      allQuestions.push({ question, sectionName: section.name, globalIndex });
      globalIndex++;
    });
  });

  let correctCount = 0;
  let incorrectCount = 0;

  allQuestions.forEach(({ globalIndex }) => {
    const userAnswer = userAnswers[globalIndex];
    const correctAnswer = allQuestions[globalIndex].question.correctAnswer;
    if (userAnswer !== undefined) {
      if (userAnswer === correctAnswer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    } else {
      incorrectCount++;
    }
  });

  const totalQuestions = allQuestions.length;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const score = correctCount;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Test Completed!</h1>
        <p className="text-muted-foreground">{paper.title}</p>
      </div>

      {/* Save Status Messages */}
      {saveStatus === 'success' && (
        <Alert className="mb-6 border-green-500 bg-green-500/10">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-700 dark:text-green-300">
            Test result saved successfully!
          </AlertDescription>
        </Alert>
      )}

      {saveStatus === 'signin-required' && (
        <Alert className="mb-6 border-blue-500 bg-blue-500/10">
          <LogIn className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription className="text-blue-700 dark:text-blue-300">
            Sign in to save your test history and track your progress over time.
          </AlertDescription>
        </Alert>
      )}

      {saveStatus === 'error' && (
        <Alert className="mb-6 border-destructive bg-destructive/10">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            Failed to save test result. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{score}/{totalQuestions}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{accuracy}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Correct</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">{correctCount}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Incorrect</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">{incorrectCount}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Results by Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Detailed Results</CardTitle>
        </CardHeader>
        <CardContent>
          {paper.sections.map((section, sectionIdx) => {
            const sectionQuestions = allQuestions.filter(q => q.sectionName === section.name);
            
            return (
              <div key={sectionIdx} className="mb-8 last:mb-0">
                <h3 className="text-lg font-semibold mb-4">{section.name}</h3>
                <div className="space-y-6">
                  {sectionQuestions.map(({ question, globalIndex }) => {
                    const userAnswer = userAnswers[globalIndex];
                    const isCorrect = userAnswer === question.correctAnswer;
                    const wasAnswered = userAnswer !== undefined;

                    return (
                      <div key={question.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                        <div className="flex items-start gap-3 mb-3">
                          {isCorrect ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium mb-3">{question.prompt}</p>
                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => {
                                const isUserAnswer = userAnswer === optionIndex;
                                const isCorrectAnswer = question.correctAnswer === optionIndex;

                                return (
                                  <div
                                    key={optionIndex}
                                    className={`p-3 rounded-lg border-2 ${
                                      isCorrectAnswer
                                        ? 'border-green-500 bg-green-500/10'
                                        : isUserAnswer
                                        ? 'border-red-500 bg-red-500/10'
                                        : 'border-border'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span>
                                      <span>{option}</span>
                                      {isCorrectAnswer && (
                                        <span className="ml-auto text-xs font-semibold text-green-600 dark:text-green-400">
                                          Correct Answer
                                        </span>
                                      )}
                                      {isUserAnswer && !isCorrectAnswer && (
                                        <span className="ml-auto text-xs font-semibold text-red-600 dark:text-red-400">
                                          Your Answer
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            {!wasAnswered && (
                              <p className="text-sm text-muted-foreground mt-2">Not answered</p>
                            )}
                            {question.solution && (
                              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                                <p className="text-sm font-semibold mb-2">Solution:</p>
                                <p className="text-sm text-muted-foreground">{question.solution}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {sectionIdx < paper.sections.length - 1 && <Separator className="mt-8" />}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center">
        <Button onClick={onBackToList} size="lg">
          Back to Test Series
        </Button>
      </div>
    </main>
  );
}

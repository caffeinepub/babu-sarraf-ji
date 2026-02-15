import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, TrendingUp, Award, AlertCircle, LogIn } from 'lucide-react';
import { getTestQuestions } from '../../lib/testSeriesData';
import type { TestResult } from '../../backend';

interface TestResultsProps {
  result: TestResult;
  userAnswers: Record<number, number>;
  saveStatus: 'idle' | 'saving' | 'success' | 'error' | 'signin-required';
  onBackToList: () => void;
}

export default function TestResults({ result, userAnswers, saveStatus, onBackToList }: TestResultsProps) {
  // Extract category string for display and question lookup
  const categoryString = result.subCategory || 'Mock Test';
  
  const questions = getTestQuestions(result.exam, categoryString);
  const correctCount = Number(result.correctCount);
  const incorrectCount = Number(result.incorrectCount);
  const totalQuestions = Number(result.totalQuestions);
  const accuracy = Number(result.accuracy);
  const score = Number(result.score);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Test Completed!</h1>
        <p className="text-muted-foreground">
          {result.exam} - {categoryString}
        </p>
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

      {/* Detailed Results */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Detailed Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
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
                    <p className="font-medium mb-2">
                      Question {index + 1}: {question.question}
                    </p>
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
                  </div>
                </div>
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

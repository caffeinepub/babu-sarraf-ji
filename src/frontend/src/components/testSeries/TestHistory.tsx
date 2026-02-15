import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { History, LogIn, Loader2 } from 'lucide-react';
import { useGetTestHistory } from '../../hooks/testSeries/useTestHistory';
import { useAuthState } from '../../hooks/useAuthState';

export default function TestHistory() {
  const { isAuthenticated } = useAuthState();
  const { data: history, isLoading, error } = useGetTestHistory();

  if (!isAuthenticated) {
    return (
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Test History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-blue-500 bg-blue-500/10">
            <LogIn className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-700 dark:text-blue-300">
              Sign in to view your test history and track your progress over time.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Test History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Test History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-destructive bg-destructive/10">
            <AlertDescription className="text-destructive">
              Failed to load test history. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!history || history.length === 0) {
    return (
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Test History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No test history yet. Complete a test to see your results here.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Sort history by timestamp (newest first)
  const sortedHistory = [...history].sort((a, b) => Number(b.timestamp - a.timestamp));

  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Test History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-right">Accuracy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedHistory.map((result, index) => {
                const timestamp = Number(result.timestamp) / 1000000; // Convert nanoseconds to milliseconds
                const date = new Date(timestamp);
                const formattedDate = date.toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                });
                const formattedTime = date.toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{formattedDate}</span>
                        <span className="text-xs text-muted-foreground">{formattedTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{result.exam}</TableCell>
                    <TableCell>{result.category}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {Number(result.score)}/{Number(result.totalQuestions)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`font-semibold ${
                          Number(result.accuracy) >= 80
                            ? 'text-green-600 dark:text-green-400'
                            : Number(result.accuracy) >= 60
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {Number(result.accuracy)}%
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

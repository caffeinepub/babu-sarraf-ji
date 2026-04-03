import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { History, LogIn, Loader2 } from 'lucide-react';
import { useGetTestHistory } from '../../hooks/testSeries/useTestHistory';
import { useAuthState } from '../../hooks/useAuthState';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { resolveDisplayName } from '@/lib/userIdentity';
import UserAvatar from '../user/UserAvatar';

export default function TestHistory() {
  const { isAuthenticated, principalString } = useAuthState();
  const { data: history, isLoading, error } = useGetTestHistory();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();

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

  if (isLoading || profileLoading) {
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

  const displayName = resolveDisplayName(userProfile, principalString);

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
          <div className="mb-4 flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
            <UserAvatar displayName={displayName} photoUrl={userProfile?.photoUrl} size="sm" />
            <span className="text-sm font-medium">{displayName}</span>
          </div>
          <p className="text-sm text-muted-foreground text-center py-8">
            No test history yet. Complete a test to see your results here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Test History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
          <UserAvatar displayName={displayName} photoUrl={userProfile?.photoUrl} size="sm" />
          <span className="text-sm font-medium">{displayName}</span>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-right">Accuracy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((result, index) => {
                const timestamp = new Date(Number(result.timestamp) / 1000000);
                const categoryLabel =
                  result.category.__kind__ === 'mockTest'
                    ? 'Mock Test'
                    : `${result.category.previousYearPaperYear}`;
                const subCategoryLabel = result.subCategory || '';

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{result.exam}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline" className="w-fit">
                          {categoryLabel}
                        </Badge>
                        {subCategoryLabel && (
                          <span className="text-xs text-muted-foreground">{subCategoryLabel}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {timestamp.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {Number(result.score)}/{Number(result.totalQuestions)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={Number(result.accuracy) >= 70 ? 'default' : 'secondary'}
                        className={
                          Number(result.accuracy) >= 70
                            ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                            : ''
                        }
                      >
                        {Number(result.accuracy)}%
                      </Badge>
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

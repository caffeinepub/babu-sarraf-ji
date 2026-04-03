import { useState } from 'react';
import { Target, Plus, RotateCcw } from 'lucide-react';
import SiteNav from '../components/SiteNav';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Progress } from '../components/ui/progress';
import { useAuthState } from '../hooks/useAuthState';
import LoginButton from '../components/LoginButton';
import FocusBabuLogo from '../components/FocusBabuLogo';
import { getCopyrightText, getAppIdentifier } from '../lib/branding';
import { useDailyTasks, useAddTask, useUpdateTask, useDeleteTask, useResetTasks } from '../hooks/dailyTarget/useDailyTarget';
import DailyTaskItem from '../components/dailyTarget/DailyTaskItem';
import ErrorBanner from '../components/community/ErrorBanner';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Info } from 'lucide-react';

export default function DailyTargetPage() {
  const { isAuthenticated } = useAuthState();
  const { data: tasks = [], isLoading } = useDailyTasks();
  const addTaskMutation = useAddTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();
  const resetTasksMutation = useResetTasks();

  const [newTaskText, setNewTaskText] = useState('');
  const [error, setError] = useState('');
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  const currentYear = new Date().getFullYear();
  const appIdentifier = getAppIdentifier();

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleAddTask = async () => {
    if (!isAuthenticated) {
      setShowSignInPrompt(true);
      return;
    }

    if (!newTaskText.trim()) {
      setError('Please enter a task');
      return;
    }

    try {
      await addTaskMutation.mutateAsync(newTaskText.trim());
      setNewTaskText('');
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to add task');
    }
  };

  const handleToggleTask = async (taskId: string, completed: boolean) => {
    if (!isAuthenticated) {
      setShowSignInPrompt(true);
      return;
    }

    try {
      await updateTaskMutation.mutateAsync({ taskId, completed });
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    }
  };

  const handleEditTask = async (taskId: string, text: string) => {
    if (!isAuthenticated) {
      setShowSignInPrompt(true);
      return;
    }

    try {
      await updateTaskMutation.mutateAsync({ taskId, text });
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!isAuthenticated) {
      setShowSignInPrompt(true);
      return;
    }

    try {
      await deleteTaskMutation.mutateAsync(taskId);
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
    }
  };

  const handleReset = async () => {
    if (!isAuthenticated) {
      setShowSignInPrompt(true);
      return;
    }

    if (tasks.length === 0) {
      return;
    }

    if (window.confirm('Are you sure you want to reset all tasks? This will clear your current list.')) {
      try {
        await resetTasksMutation.mutateAsync();
      } catch (err: any) {
        setError(err.message || 'Failed to reset tasks');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Target className="h-8 w-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-display font-bold">Daily Target</h1>
          </div>
          <p className="text-lg text-muted-foreground font-medium mt-2">Plan Today. Win Tomorrow.</p>
        </div>

        {/* Sign-in prompt for unauthenticated users */}
        {!isAuthenticated && (
          <Card className="mb-6 p-8 text-center bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex flex-col items-center gap-4">
              <FocusBabuLogo variant="centered" />
              <p className="text-muted-foreground">Sign in to create and manage your daily tasks</p>
              <LoginButton />
            </div>
          </Card>
        )}

        {/* Sign-in prompt after attempting action */}
        {showSignInPrompt && !isAuthenticated && (
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Please sign in to manage your daily tasks</span>
              <Button variant="ghost" size="sm" onClick={() => setShowSignInPrompt(false)}>
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Error banner */}
        {error && <ErrorBanner message={error} onDismiss={() => setError('')} />}

        {/* Main content */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          {/* Stats */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{totalTasks}</p>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{completedTasks}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{progressPercentage}%</p>
              <p className="text-sm text-muted-foreground">Progress</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <Progress value={progressPercentage} className="h-3" />
          </div>

          {/* Add task input */}
          <div className="mb-6 flex gap-2">
            <Input
              type="text"
              placeholder="Add a new task..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddTask();
                }
              }}
              className="flex-1"
              disabled={addTaskMutation.isPending}
            />
            <Button
              onClick={handleAddTask}
              disabled={addTaskMutation.isPending || !newTaskText.trim()}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>

          {/* Reset button */}
          {isAuthenticated && tasks.length > 0 && (
            <div className="mb-6 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={resetTasksMutation.isPending}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset for Next Day
              </Button>
            </div>
          )}

          {/* Task list */}
          <div className="space-y-2">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading tasks...</div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No tasks yet. Add your first task to get started!
              </div>
            ) : (
              tasks.map((task) => (
                <DailyTaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  isUpdating={updateTaskMutation.isPending}
                  isDeleting={deleteTaskMutation.isPending}
                />
              ))
            )}
          </div>
        </Card>
      </main>

      <footer className="w-full py-6 px-4 sm:px-6 lg:px-8 border-t border-border/50 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-sm text-muted-foreground">{getCopyrightText(currentYear)}</p>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

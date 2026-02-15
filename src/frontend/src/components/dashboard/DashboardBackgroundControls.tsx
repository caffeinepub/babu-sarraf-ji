import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Upload, RotateCcw, Loader2 } from 'lucide-react';
import { useAuthState } from '../../hooks/useAuthState';
import { useSaveDashboardBackground, useClearDashboardBackground } from '../../hooks/useDashboardBackground';
import ErrorBanner from '../community/ErrorBanner';
import { Alert, AlertDescription } from '../ui/alert';
import { Info } from 'lucide-react';

export default function DashboardBackgroundControls() {
  const { isAuthenticated } = useAuthState();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  const saveMutation = useSaveDashboardBackground();
  const clearMutation = useClearDashboardBackground();

  const handleChangeBackground = () => {
    if (!isAuthenticated) {
      setShowSignInPrompt(true);
      return;
    }
    setError(null);
    setShowSignInPrompt(false);
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPEG, PNG, etc.)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB');
      return;
    }

    setError(null);

    try {
      await saveMutation.mutateAsync(file);
    } catch (err: any) {
      setError(err.message || 'Failed to save background. Please try again.');
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleResetToDefault = async () => {
    if (!isAuthenticated) {
      setShowSignInPrompt(true);
      return;
    }
    setError(null);
    setShowSignInPrompt(false);

    try {
      await clearMutation.mutateAsync();
    } catch (err: any) {
      setError(err.message || 'Failed to reset background. Please try again.');
    }
  };

  const isLoading = saveMutation.isPending || clearMutation.isPending;

  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-foreground">Customize Background</h3>
        
        {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}
        
        {showSignInPrompt && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Please sign in to save your Dashboard background preferences.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleChangeBackground}
            disabled={isLoading}
            size="sm"
            variant="default"
            className="gap-2"
          >
            {saveMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Change Background
          </Button>

          <Button
            onClick={handleResetToDefault}
            disabled={isLoading}
            size="sm"
            variant="outline"
            className="gap-2"
          >
            {clearMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RotateCcw className="h-4 w-4" />
            )}
            Reset to Default
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </Card>
  );
}

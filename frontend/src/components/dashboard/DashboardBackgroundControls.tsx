import { useRef, useState, useCallback } from 'react';
import { Button } from '../ui/button';
import { Upload, RotateCcw, Loader2, Info, CheckCircle2 } from 'lucide-react';
import { useAuthState } from '../../hooks/useAuthState';
import { useSaveDashboardBackground, useClearDashboardBackground } from '../../hooks/useDashboardBackground';
import { Alert, AlertDescription } from '../ui/alert';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export default function DashboardBackgroundControls() {
  const { isAuthenticated } = useAuthState();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const saveMutation = useSaveDashboardBackground();
  const clearMutation = useClearDashboardBackground();

  const showSuccess = useCallback((msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  }, []);

  const handleChangeBackground = () => {
    if (!isAuthenticated) {
      setError('Please sign in to customize your dashboard background.');
      return;
    }
    setError(null);
    setSuccessMessage(null);
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset input so same file can be re-selected
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Invalid file type. Please upload a JPG, PNG, or WEBP image.');
      return;
    }

    // Validate file size
    if (file.size > MAX_SIZE_BYTES) {
      setError('File too large. Maximum size is 5MB.');
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setUploadProgress(0);

    try {
      await saveMutation.mutateAsync({
        file,
        onProgress: (pct) => setUploadProgress(pct),
      });
      setUploadProgress(null);
      showSuccess('Background Updated Successfully');
    } catch (err: any) {
      setUploadProgress(null);
      const msg = err?.message || String(err);
      if (msg.includes('sign in') || msg.includes('Unauthorized')) {
        setError('Please sign in to customize your dashboard background.');
      } else {
        setError('Failed to save background. Please try again.');
      }
    }
  };

  const handleResetToDefault = async () => {
    if (!isAuthenticated) {
      setError('Please sign in to customize your dashboard background.');
      return;
    }
    setError(null);
    setSuccessMessage(null);

    try {
      await clearMutation.mutateAsync();
      showSuccess('Background reset to default.');
    } catch (err: any) {
      const msg = err?.message || String(err);
      if (msg.includes('sign in') || msg.includes('Unauthorized')) {
        setError('Please sign in to customize your dashboard background.');
      } else {
        setError('Failed to reset background. Please try again.');
      }
    }
  };

  const isLoading = saveMutation.isPending || clearMutation.isPending;

  return (
    <div className="bg-card border border-border rounded-xl p-5 card-soft-shadow">
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Customize Background
        </h3>

        {/* Error message */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription className="flex items-center justify-between gap-2">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-xs underline opacity-70 hover:opacity-100 shrink-0"
              >
                Dismiss
              </button>
            </AlertDescription>
          </Alert>
        )}

        {/* Success message */}
        {successMessage && (
          <Alert className="border-green-500/40 bg-green-500/10">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-300">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Upload progress */}
        {uploadProgress !== null && (
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                Uploading…
              </span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Sign-in hint when not authenticated */}
        {!isAuthenticated && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Please sign in to customize your dashboard background.
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
            disabled={isLoading || !isAuthenticated}
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

        <p className="text-xs text-muted-foreground/60">
          Supports JPG, PNG, WEBP · Max 5 MB
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}

import { Download, Eye, FileX, AlertCircle } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import type { Chapter } from '../../lib/ncertData';
import { isValidNcertUrl, encodePdfUrl } from '../../lib/ncertLinks';

interface ChapterListProps {
  chapters: Chapter[];
}

export default function ChapterList({ chapters }: ChapterListProps) {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleView = (chapter: Chapter) => {
    try {
      if (!chapter.pdfUrl || !isValidNcertUrl(chapter.pdfUrl)) {
        setError('Invalid PDF URL. Please try again or contact support.');
        return;
      }
      setError(null);
      navigate({
        to: '/pdf-viewer',
        search: { file: encodePdfUrl(chapter.pdfUrl) },
      });
    } catch (err) {
      setError('Failed to open PDF viewer. Please try again.');
      console.error('View error:', err);
    }
  };

  const handleDownload = (pdfUrl: string, chapterTitle: string) => {
    try {
      if (!pdfUrl || !isValidNcertUrl(pdfUrl)) {
        setError('Invalid PDF URL. Cannot download.');
        return;
      }
      setError(null);
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${chapterTitle}.pdf`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError('Download failed. Try opening in a new tab instead.');
      console.error('Download error:', err);
    }
  };

  return (
    <div className="space-y-3">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {chapters.map((chapter) => (
        <div
          key={chapter.id}
          className="flex items-center justify-between p-3 rounded-lg border border-border/30 hover:border-border/60 hover:bg-accent/5 transition-colors gap-3"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-sm font-medium text-muted-foreground shrink-0 w-12">
              Ch {chapter.id}
            </span>
            <span className="text-sm truncate flex-1">{chapter.title}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {chapter.pdfUrl ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleView(chapter)}
                  className="gap-1.5"
                  title="View PDF"
                >
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">View</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(chapter.pdfUrl!, chapter.title)}
                  className="gap-1.5"
                  title="Download PDF"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs px-3 py-1.5">
                <FileX className="h-4 w-4" />
                <span className="hidden sm:inline">PDF not available</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

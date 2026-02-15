import { Download, Eye, FileX } from 'lucide-react';
import { Button } from '../ui/button';
import type { Chapter } from '../../lib/ncertData';

interface ChapterListProps {
  chapters: Chapter[];
}

export default function ChapterList({ chapters }: ChapterListProps) {
  const handleView = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = (pdfUrl: string, chapterTitle: string) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${chapterTitle}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-2">
      {chapters.map((chapter) => (
        <div
          key={chapter.id}
          className="flex items-center justify-between p-3 rounded-lg border border-border/30 hover:border-border/60 hover:bg-accent/5 transition-colors"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-sm font-medium text-muted-foreground shrink-0">
              Ch {chapter.id}
            </span>
            <span className="text-sm truncate">{chapter.title}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {chapter.pdfUrl ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleView(chapter.pdfUrl!)}
                  className="gap-1.5"
                >
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">View</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(chapter.pdfUrl!, chapter.title)}
                  className="gap-1.5"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs px-3 py-1.5">
                <FileX className="h-4 w-4" />
                <span>PDF not available</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

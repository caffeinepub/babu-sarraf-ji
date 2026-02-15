import { useNavigate, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { isValidNcertUrl, encodePdfUrl } from '../lib/ncertLinks';

export default function NcertPdfViewerPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: '/ncert/viewer' }) as { url?: string; title?: string };

  useEffect(() => {
    const pdfUrl = search.url || '';
    
    // Redirect to new PDF viewer route
    if (pdfUrl && isValidNcertUrl(pdfUrl)) {
      navigate({
        to: '/pdf-viewer',
        search: { file: encodePdfUrl(pdfUrl) },
        replace: true,
      });
    } else {
      // If invalid or missing, redirect to NCERT page
      navigate({ to: '/ncert', replace: true });
    }
  }, [search.url, navigate]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-4 text-sm text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
}

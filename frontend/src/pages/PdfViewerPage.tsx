import { ArrowLeft, Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { isValidNcertUrl, decodePdfUrl, getInvalidUrlMessage } from '../lib/ncertLinks';
import { useState, useEffect } from 'react';

export default function PdfViewerPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: '/pdf-viewer' }) as { file?: string };
  
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  const encodedFile = search.file || '';
  const pdfUrl = encodedFile ? decodePdfUrl(encodedFile) : '';
  const isValid = pdfUrl && isValidNcertUrl(pdfUrl);

  useEffect(() => {
    if (isValid) {
      setIsLoading(true);
      setLoadError(false);
      // Simulate loading delay for iframe
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [pdfUrl, isValid]);

  const handleBack = () => {
    navigate({ to: '/ncert' });
  };

  const handleDownload = () => {
    if (!isValid) return;
    try {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'ncert-chapter.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // Build PDF URL with page and zoom parameters
  const pdfUrlWithParams = isValid 
    ? `${pdfUrl}#page=${currentPage}&zoom=${zoom}` 
    : '';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Control Bar */}
      <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3 gap-4 flex-wrap">
          {/* Left: Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          {/* Center: Page Navigation & Zoom Controls */}
          {isValid && !loadError && (
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {/* Page Navigation */}
              <div className="flex items-center gap-1 border border-border/50 rounded-lg px-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="h-8 w-8"
                  title="Previous Page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm px-2 min-w-[60px] text-center">
                  Page {currentPage}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextPage}
                  className="h-8 w-8"
                  title="Next Page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 border border-border/50 rounded-lg px-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleZoomOut}
                  disabled={zoom <= 50}
                  className="h-8 w-8"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm px-2 min-w-[50px] text-center">
                  {zoom}%
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleZoomIn}
                  disabled={zoom >= 200}
                  className="h-8 w-8"
                  title="Zoom In"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Right: Download Button */}
          <Button
            variant="default"
            size="sm"
            onClick={handleDownload}
            className="gap-2"
            disabled={!isValid}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Error: Missing or Invalid File Parameter */}
        {!encodedFile && (
          <div className="flex-1 flex items-center justify-center p-4">
            <Alert variant="destructive" className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No PDF file specified. Please return to the NCERT page and select a chapter to view.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Error: Invalid NCERT Domain */}
        {encodedFile && !isValid && (
          <div className="flex-1 flex items-center justify-center p-4">
            <Alert variant="destructive" className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {getInvalidUrlMessage()}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Error: Load Failed */}
        {isValid && loadError && (
          <div className="flex-1 flex items-center justify-center p-4">
            <Alert variant="destructive" className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load PDF. The file may be temporarily unavailable. Try downloading it or returning later.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Loading State */}
        {isValid && isLoading && !loadError && (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading PDF...</p>
            </div>
          </div>
        )}

        {/* PDF Viewer */}
        {isValid && !loadError && (
          <div className="flex-1 relative bg-muted/20">
            <iframe
              src={pdfUrlWithParams}
              className="absolute inset-0 w-full h-full border-0"
              title="PDF Viewer"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setLoadError(true);
                setIsLoading(false);
              }}
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

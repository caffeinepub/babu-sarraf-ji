import { BookOpen } from 'lucide-react';
import SiteNav from '../components/SiteNav';
import ClassSection from '../components/ncert/ClassSection';
import { ncertData } from '../lib/ncertData';
import { getCopyrightText, getAppIdentifier } from '../lib/branding';

export default function NcertPage() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = getAppIdentifier();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />

      {/* Header */}
      <header className="w-full py-8 px-4 sm:px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">NCERT Books</h1>
          </div>
          <p className="text-muted-foreground">
            Access official chapter-wise NCERT books for Class 11 & 12 - Physics, Chemistry, Biology, and Mathematics
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <ClassSection classData={ncertData.class11} />
          <ClassSection classData={ncertData.class12} />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 sm:px-6 lg:px-8 border-t border-border/50 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {getCopyrightText(currentYear)}
          </p>
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

import PomodoroTimer from '../components/PomodoroTimer/PomodoroTimer';
import SocialLinks from '../components/SocialLinks';

export default function LandingPage() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'babu-sarraf-ji'
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-3">
          {/* Social icons in top-right */}
          <div className="absolute top-6 right-4 sm:right-6 lg:right-8">
            <SocialLinks variant="header" />
          </div>
          
          <img
            src="/assets/generated/logo-babu-sarraf-ji.dim_512x256.png"
            alt="Babu Sarraf Ji"
            className="h-16 sm:h-20 w-auto"
          />
          <p className="text-muted-foreground text-sm sm:text-base tracking-wide font-light">
            Focus. Study. Repeat.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <PomodoroTimer streamerMode={false} transparentBackground={false} />
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Babu Sarraf Ji. All rights reserved.
          </p>
          <SocialLinks variant="footer" />
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

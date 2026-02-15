import PomodoroTimer from '../components/PomodoroTimer/PomodoroTimer';
import SocialLinks from '../components/SocialLinks';
import SiteNav from '../components/SiteNav';
import DashboardBackgroundControls from '../components/dashboard/DashboardBackgroundControls';
import { SITE_NAME, SITE_TAGLINE, getCopyrightText, getAppIdentifier } from '../lib/branding';
import { useGetDashboardBackground } from '../hooks/useDashboardBackground';
import { useAuthState } from '../hooks/useAuthState';

export default function LandingPage() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = getAppIdentifier();
  const { isAuthenticated } = useAuthState();
  const { backgroundUrl, isLoading: backgroundLoading } = useGetDashboardBackground();

  // Only show custom background when authenticated and background exists
  const showCustomBackground = isAuthenticated && backgroundUrl && !backgroundLoading;

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Custom Background Layer (only on Dashboard) */}
      {showCustomBackground && (
        <>
          {/* Background Image */}
          <div
            className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundUrl})`,
            }}
          />
          {/* Dark Overlay for readability */}
          <div className="fixed inset-0 z-0 bg-black/50" />
        </>
      )}

      {/* Content Layer */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <SiteNav />

        {/* Header */}
        <header className="w-full py-6 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-3">
            {/* Social icons in top-right */}
            <div className="absolute top-6 right-4 sm:right-6 lg:right-8">
              <SocialLinks variant="header" />
            </div>
            
            <img
              src="/assets/generated/logo-focus-babu.dim_512x256.png"
              alt={SITE_NAME}
              className="h-16 sm:h-20 w-auto"
            />
            <p className="text-muted-foreground text-sm sm:text-base tracking-wide font-light">
              {SITE_TAGLINE}
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-6">
          <PomodoroTimer streamerMode={false} transparentBackground={false} />
          
          {/* Background Controls */}
          <div className="w-full max-w-md">
            <DashboardBackgroundControls />
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-6 px-4 sm:px-6 lg:px-8 border-t border-border/50">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {getCopyrightText(currentYear)}
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
    </div>
  );
}

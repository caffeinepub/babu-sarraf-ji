import { useMemo } from 'react';
import PomodoroTimer from '../components/PomodoroTimer/PomodoroTimer';
import SocialLinks from '../components/SocialLinks';
import SiteNav from '../components/SiteNav';
import DashboardBackgroundControls from '../components/dashboard/DashboardBackgroundControls';
import { SITE_NAME, SITE_TAGLINE, getCopyrightText, getAppIdentifier } from '../lib/branding';
import { useGetDashboardBackground } from '../hooks/useDashboardBackground';
import { useAuthState } from '../hooks/useAuthState';
import { useStudyMode } from '../hooks/useStudyMode';

// Deterministic particle config generated once per mount
const PARTICLE_COUNT = 28;

interface ParticleConfig {
  id: number;
  left: string;
  top: string;
  width: number;
  height: number;
  animationName: string;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
  background: string;
}

function generateParticles(): ParticleConfig[] {
  const animations = ['float-up-1', 'float-up-2', 'float-up-3', 'float-up-4'];
  const colors = [
    'rgba(100,120,255,0.5)',
    'rgba(80,100,220,0.4)',
    'rgba(120,140,255,0.35)',
    'rgba(60,80,200,0.45)',
    'rgba(140,160,255,0.3)',
  ];
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const seed = (i * 137.508 + 42) % 100;
    const size = 1.5 + (seed % 3);
    return {
      id: i,
      left: `${(seed * 3.7 + i * 3.3) % 100}%`,
      top: `${(seed * 2.1 + i * 7.1) % 100}%`,
      width: size,
      height: size,
      animationName: animations[i % animations.length],
      animationDuration: `${12 + (seed % 14)}s`,
      animationDelay: `${(i * 1.3) % 15}s`,
      opacity: 0.15 + (seed % 30) / 100,
      background: colors[i % colors.length],
    };
  });
}

export default function LandingPage() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = getAppIdentifier();
  const { isAuthenticated } = useAuthState();
  const { backgroundUrl, isLoading: backgroundLoading } = useGetDashboardBackground();
  const { isStudyModeActive, enterStudyMode, exitStudyMode } = useStudyMode();

  // Only show custom background when authenticated and a background URL exists
  const showCustomBackground = isAuthenticated && !!backgroundUrl && !backgroundLoading;

  const particles = useMemo(() => generateParticles(), []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Default deep dark blue-black gradient background */}
      {!showCustomBackground && (
        <div className="fixed inset-0 z-0 dashboard-dark-bg" />
      )}

      {/* Custom Background Layer — only on Dashboard ('/' route), only when authenticated */}
      {showCustomBackground && (
        <>
          {/* Background image: cover, center, no-repeat, full viewport */}
          <div
            className="fixed inset-0 z-0"
            style={{
              backgroundImage: `url(${backgroundUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Dark overlay 60% opacity for text readability */}
          <div className="fixed inset-0 z-[1] bg-black/60" />
        </>
      )}

      {/* Floating Particles (hidden in Study Mode) */}
      {!isStudyModeActive && (
        <div className="fixed inset-0 z-[2] overflow-hidden pointer-events-none" aria-hidden="true">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: p.left,
                top: p.top,
                width: `${p.width}px`,
                height: `${p.height}px`,
                background: p.background,
                animationName: p.animationName,
                animationDuration: p.animationDuration,
                animationDelay: p.animationDelay,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationFillMode: 'both',
              }}
            />
          ))}
        </div>
      )}

      {/* Content Layer — above background, overlay, and particles */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hide navbar in Study Mode */}
        {!isStudyModeActive && (
          <SiteNav onEnterStudyMode={enterStudyMode} />
        )}

        {/* Header - hidden in Study Mode */}
        {!isStudyModeActive && (
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
        )}

        {/* Main Content */}
        <main className={`flex-1 flex flex-col items-center justify-center px-4 gap-10 ${isStudyModeActive ? 'py-4' : 'py-10'}`}>
          {/* PomodoroTimer with Forest Mode enabled on dashboard */}
          <PomodoroTimer
            streamerMode={false}
            transparentBackground={false}
            isStudyModeActive={isStudyModeActive}
            onExitStudyMode={exitStudyMode}
            showForestMode={!isStudyModeActive}
          />

          {/* Background Controls - hidden in Study Mode */}
          {!isStudyModeActive && (
            <div className="w-full max-w-md">
              <DashboardBackgroundControls />
            </div>
          )}
        </main>

        {/* Footer - hidden in Study Mode */}
        {!isStudyModeActive && (
          <footer className="w-full py-6 px-4 sm:px-6 lg:px-8 border-t border-border/30">
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
        )}
      </div>
    </div>
  );
}

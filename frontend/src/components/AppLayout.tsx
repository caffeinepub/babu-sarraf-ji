import { Outlet, useRouterState } from '@tanstack/react-router';
import ThemeToggleButton from './ThemeToggleButton';
import WelcomeMotivationOverlay from './WelcomeMotivationOverlay';
import AuthProfileBootstrapper from './user/AuthProfileBootstrapper';
import InstallAppBanner from './pwa/InstallAppBanner';
import OnboardingPollModal from './onboarding/OnboardingPollModal';
import { useTheme } from '../hooks/useTheme';
import { useOnboardingPoll } from '../hooks/useOnboardingPoll';
import { useEffect, useState } from 'react';

export default function AppLayout() {
  const { theme } = useTheme();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [showWelcome, setShowWelcome] = useState(true);

  const {
    isModalOpen,
    openAtStep,
    userName,
    handleSubmit,
    handleSkip,
  } = useOnboardingPoll();

  // Hide theme toggle on PDF viewer for minimal UI
  const isPdfViewerRoute = currentPath === '/pdf-viewer';

  // Check if we should hide welcome overlay (on /timer with streamer mode)
  const shouldHideWelcome =
    currentPath === '/timer' &&
    typeof window !== 'undefined' &&
    localStorage.getItem('streamerMode') === 'true';

  // Hide install banner on /timer when streamer mode is active
  const isStreamerModeOnTimer =
    currentPath === '/timer' &&
    typeof window !== 'undefined' &&
    localStorage.getItem('streamerMode') === 'true';

  // Never show onboarding on /timer route
  const isTimerRoute = currentPath === '/timer';

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  // Hide welcome overlay after it's been shown once
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[SW] Registered:', registration.scope);
        })
        .catch((err) => {
          console.warn('[SW] Registration failed:', err);
        });
    }
  }, []);

  return (
    <div className="min-h-screen">
      {!isPdfViewerRoute && <ThemeToggleButton />}
      {showWelcome && !shouldHideWelcome && <WelcomeMotivationOverlay />}
      <AuthProfileBootstrapper />
      <Outlet />
      {!isStreamerModeOnTimer && <InstallAppBanner />}
      {/* Onboarding Poll Modal — never shown on /timer route */}
      {!isTimerRoute && (
        <OnboardingPollModal
          isOpen={isModalOpen}
          initialStep={openAtStep}
          prefillName={userName}
          onSubmit={handleSubmit}
          onSkip={handleSkip}
        />
      )}
    </div>
  );
}

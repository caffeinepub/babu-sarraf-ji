import { Outlet, useRouterState } from '@tanstack/react-router';
import ThemeToggleButton from './ThemeToggleButton';
import WelcomeMotivationOverlay from './WelcomeMotivationOverlay';
import AuthProfileBootstrapper from './user/AuthProfileBootstrapper';
import { useTheme } from '../hooks/useTheme';
import { useEffect, useState } from 'react';

export default function AppLayout() {
  const { theme } = useTheme();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [showWelcome, setShowWelcome] = useState(true);

  // Hide theme toggle on PDF viewer for minimal UI
  const isPdfViewerRoute = currentPath === '/pdf-viewer';

  // Check if we should hide welcome overlay (on /timer with streamer mode)
  const shouldHideWelcome = currentPath === '/timer' && 
    typeof window !== 'undefined' && 
    localStorage.getItem('streamerMode') === 'true';

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

  return (
    <div className="min-h-screen">
      {!isPdfViewerRoute && <ThemeToggleButton />}
      {showWelcome && !shouldHideWelcome && <WelcomeMotivationOverlay />}
      <AuthProfileBootstrapper />
      <Outlet />
    </div>
  );
}

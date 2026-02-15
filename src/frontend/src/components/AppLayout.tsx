import { Outlet } from '@tanstack/react-router';
import ThemeToggleButton from './ThemeToggleButton';
import { useTheme } from '../hooks/useTheme';
import { useEffect } from 'react';

export default function AppLayout() {
  const { theme } = useTheme();

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

  return (
    <div className="min-h-screen">
      <ThemeToggleButton />
      <Outlet />
    </div>
  );
}

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Button } from './ui/button';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 rounded-full bg-card/90 backdrop-blur-sm border border-border hover:bg-accent transition-all duration-300"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Moon className="h-5 w-5 text-foreground" />
      ) : (
        <Sun className="h-5 w-5 text-foreground" />
      )}
    </Button>
  );
}

import { useLocalStorageState } from './useLocalStorageState';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useLocalStorageState<Theme>('theme', 'dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return { theme, setTheme, toggleTheme };
}

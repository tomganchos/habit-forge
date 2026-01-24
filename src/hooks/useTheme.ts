import { useEffect, useCallback } from 'react';
import { useApp } from '@/store/context';
import type { Settings } from '@/types';

type Theme = Settings['theme'];

/**
 * Hook to manage theme state and apply it to the document.
 * Returns the current theme setting and a function to update it.
 */
export function useTheme(): {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
} {
  const { state, updateSettings } = useApp();
  const theme = state.settings.theme;

  // Determine the actual resolved theme (accounting for system preference)
  const getResolvedTheme = useCallback((): 'light' | 'dark' => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'system') {
      // Remove explicit theme attribute, let CSS media queries handle it
      root.removeAttribute('data-theme');
    } else {
      // Set explicit theme attribute
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  // Listen for system theme changes when in "system" mode
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (): void => {
      // The CSS handles the actual styling via media queries,
      // but we can trigger a re-render if needed
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      updateSettings({ theme: newTheme });
    },
    [updateSettings]
  );

  return {
    theme,
    setTheme,
    resolvedTheme: getResolvedTheme(),
  };
}

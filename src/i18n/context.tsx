import { createContext, useContext, type ReactNode } from 'react';
import { useApp } from '@/store/context';
import { translations, type Translations } from './translations';
import type { Language } from '@/types';

interface I18nContextType {
  t: Translations;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const { state, updateSettings } = useApp();
  const language = state.settings.language;

  const t = translations[language];

  const setLanguage = (lang: Language) => {
    updateSettings({ language: lang });
  };

  return (
    <I18nContext.Provider value={{ t, language, setLanguage }}>{children}</I18nContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTranslation(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}

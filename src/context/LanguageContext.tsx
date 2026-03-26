'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import fr from '@/i18n/fr';
import ar from '@/i18n/ar';

type Language = 'fr' | 'ar';
type Translations = typeof fr;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'fr',
  setLanguage: () => {},
  t: fr,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
    localStorage.setItem('tazira-lang', lang);
  };

  useEffect(() => {
    const saved = localStorage.getItem('tazira-lang') as Language | null;
    if (saved && (saved === 'fr' || saved === 'ar')) {
      setLanguage(saved);
    }
  }, []);

  const t = language === 'ar' ? ar : fr;
  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

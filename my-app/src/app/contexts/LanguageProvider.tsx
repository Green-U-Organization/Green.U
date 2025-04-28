'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  translations: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// Cache en mémoire
const translationsCache: Record<string, Record<string, string>> = {};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState('en'); // Valeur par défaut
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale && ['en', 'fr'].includes(storedLocale)) {
      setLocale(storedLocale);
    } else {
      setLocale('en'); // Valeur par défaut
    }
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      //Si le fichier de traduction est déjà dans le cache on le récupère
      if (translationsCache[locale]) {
        setTranslations(translationsCache[locale]);
        return;
      }
      try {
        //Sinon on le charge
        const response = await fetch(`/locales/${locale}.json`);
        if (!response.ok) throw new Error('Loading error');
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Error loading translations :', error);
      }
    };

    loadTranslations();
    localStorage.setItem('locale', locale);
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

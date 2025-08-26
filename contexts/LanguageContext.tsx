import React, { createContext, useState, useContext, useCallback, FC, ReactNode, useEffect } from 'react';

type Language = 'en' | 'vi';
type TranslationData = { [key: string]: string };
type AllTranslations = { [key in Language]?: TranslationData };

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('vi');
  const [translations, setTranslations] = useState<AllTranslations>({});

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const [enResponse, viResponse] = await Promise.all([
          fetch('/locales/en.json'),
          fetch('/locales/vi.json')
        ]);
        const enData = await enResponse.json();
        const viData = await viResponse.json();
        setTranslations({ en: enData, vi: viData });
      } catch (error) {
        console.error("Failed to load translations:", error);
      }
    };
    fetchTranslations();
  }, []);

  const t = useCallback((key: string, replacements?: { [key: string]: string | number }) => {
    const langTranslations = translations[language];
    if (!langTranslations) return key; 

    let translation = langTranslations[key] || key;
    
    if (replacements) {
        Object.keys(replacements).forEach(placeholder => {
            translation = translation.replace(`{${placeholder}}`, String(replacements[placeholder]));
        });
    }
    return translation;
  }, [language, translations]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
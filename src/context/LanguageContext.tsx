"use client"
import { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('tr');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export const skills = {
  programmingLanguages: [
    {
      name: "C++",
      level: 80, // yüzdelik
      icon: "/icons/cpp.svg"
    },
    {
      name: "C#",
      level: 85,
      icon: "/icons/csharp.svg"
    }
  ],
  gameEngines: [
    {
      name: "Unreal Engine",
      level: 70,
      icon: "/icons/unreal.svg"
    },
    {
      name: "Unity",
      level: 75,
      icon: "/icons/unity.svg"
    }
  ],
  tools: [
    {
      name: "Git",
      level: 75,
      icon: "/icons/git.svg"
    }
  ]
}; 
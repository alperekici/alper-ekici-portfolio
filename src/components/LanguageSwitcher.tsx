'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {language === 'tr' ? 'EN' : 'TR'}
      </button>
    </div>
  )
} 
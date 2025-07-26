'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'


const content = {
  title: {
    tr: "Merhaba, Ben Alper Ekici",
    en: "Hi, I'm Alper Ekici"
  },
  subtitle: {
    tr: "Oyun Geliştirici & Bilgisayar Bilimci",
    en: "Game Developer & Computer Scientist"
  },
  description: {
    tr: "Karabük Üniversitesi'nde Bilgisayar Mühendisliği öğrencisiyim. Unreal Engine ve Unity ile oyun geliştirme üzerine çalışıyorum.",
    en: "I'm a Computer Engineering student at Karabük University, focusing on game development with Unreal Engine and Unity."
  },
  cv: {
    tr: "CV'mi İndir",
    en: "Download CV"
  }
}

export default function Hero() {
  const { language } = useLanguage()

  return (
    <section className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-16"
      >
        <h1 className="text-5xl font-bold mb-4 text-blue-400">
          {content.title[language]}
        </h1>
        <h2 className="text-2xl mb-6 text-gray-300">
          {content.subtitle[language]}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-400">
          {content.description[language]}
        </p>
        
        <div className="mt-8 space-x-4">
          <a
            href="https://github.com/alperekici"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            GitHub
          </a>
          <a
            href="#contact"
            className="bg-transparent border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg transition-colors"
          >
            {language === 'tr' ? 'İletişime Geç' : 'Contact Me'}
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            {content.cv[language]}
          </a>
        </div>
      </motion.div>
    </section>
  )
} 
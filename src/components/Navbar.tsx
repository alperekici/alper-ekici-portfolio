'use client'
import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { motion } from 'framer-motion'

const content = {
  nav: {
    tr: {
      about: "Hakkımda",
      skills: "Yetenekler",
      projects: "Projeler",
      blog: "Blog",
      testimonials: "Referanslar",
      contact: "İletişim"
    },
    en: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      blog: "Blog",
      testimonials: "Testimonials",
      contact: "Contact"
    }
  }
}

export default function Navbar() {
  const { language, setLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <a 
            href="#" 
            onClick={scrollToTop}
            className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors"
          >
            AE
          </a>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8">
              {Object.entries(content.nav[language]).map(([key, value]) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {value}
                </a>
              ))}
            </div>
            
            <button
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {language === 'tr' ? 'EN' : 'TR'}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
} 
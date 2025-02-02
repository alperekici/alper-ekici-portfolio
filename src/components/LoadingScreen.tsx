'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

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

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const { language } = useLanguage()

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-blue-400 mb-4">AE</h1>
        <div className="flex space-x-4">
          {Object.values(content.nav[language]).map((item, index) => (
            <span key={index} className="text-gray-400">{item}</span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
'use client'
import { useState, useEffect } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  // Local storage'a tema tercihini kaydet
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  // Sayfa yüklendiğinde local storage'dan tema tercihini al
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
  }, [])

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsDark(!isDark)}
      className="fixed top-4 left-4 p-3 bg-white dark:bg-gray-800 text-yellow-500 dark:text-blue-400 rounded-full z-50 shadow-lg"
    >
      {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
    </motion.button>
  )
} 
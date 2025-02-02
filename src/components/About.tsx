'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const content = {
  title: {
    tr: "Hakkımda",
    en: "About Me"
  },
  description: {
    tr: `Karabük Üniversitesi Bilgisayar Mühendisliği 3. sınıf öğrencisiyim. 
        Oyun geliştirme konusunda tutkulu ve sürekli öğrenmeye açık biriyim. 
        C++ ve C# dillerinde deneyimim var ve bu dilleri Unreal Engine ve Unity 
        platformlarında aktif olarak kullanıyorum.`,
    en: `I'm a 3rd year Computer Engineering student at Karabük University. 
        I'm passionate about game development and always eager to learn. 
        I have experience in C++ and C#, actively using these languages 
        in Unreal Engine and Unity platforms.`
  },
  education: {
    title: {
      tr: "Eğitim",
      en: "Education"
    },
    details: {
      tr: "Bilgisayar Mühendisliği - Karabük Üniversitesi",
      en: "Computer Engineering - Karabük University"
    },
    year: "2021-2025"
  }
}

export default function About() {
  const { language } = useLanguage()

  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-blue-400">
          {content.title[language]}
        </h2>
        
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <p className="text-lg mb-8 text-gray-300 leading-relaxed">
            {content.description[language]}
          </p>
          
          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">
              {content.education.title[language]}
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg text-gray-300">
                  {content.education.details[language]}
                </p>
              </div>
              <span className="text-gray-400">
                {content.education.year}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
} 
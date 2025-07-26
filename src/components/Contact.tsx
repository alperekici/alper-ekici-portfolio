'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const content = {
  title: {
    tr: "İletişim",
    en: "Contact"
  },
  description: {
    tr: "Benimle iletişime geçmek için aşağıdaki kanalları kullanabilirsiniz.",
    en: "You can reach out to me through the following channels."
  },
  email: {
    tr: "E-posta ile iletişime geç",
    en: "Get in touch via email"
  },
  social: {
    tr: "Sosyal Medya",
    en: "Social Media"
  }
}

const contactInfo = {
  email: "m.alperekici@gmail.com", //
  github: "https://github.com/alperekici", // GitHub profilinizi ekleyin
  linkedin: "https://www.linkedin.com/in/mehmet-alper-ekici-746683220" // LinkedIn 
}

export default function Contact() {
  const { language } = useLanguage()

  return (
    <section id="contact" className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-blue-400">
            {content.title[language]}
          </h2>
          <p className="text-gray-400">
            {content.description[language]}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Email Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-200">
              {content.email[language]}
            </h3>
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
            >
              <FaEnvelope className="text-2xl" />
              <span>{contactInfo.email}</span>
            </a>
          </motion.div>

          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-200">
              {content.social[language]}
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
              >
                <FaGithub className="text-2xl" />
                <span>GitHub</span>
              </a>
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
              >
                <FaLinkedin className="text-2xl" />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12 text-gray-500"
        >
          <p>© 2024 Alper Ekici. {language === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}</p>
        </motion.div>
      </div>
    </section>
  )
} 
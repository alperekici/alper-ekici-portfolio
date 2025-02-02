'use client'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { FaQuoteLeft } from 'react-icons/fa'

const content = {
  title: {
    tr: "Referanslar",
    en: "Testimonials"
  }
}

const testimonials = [
  {
    name: "John Doe",
    title: {
      tr: "Oyun Geliştirici",
      en: "Game Developer"
    },
    company: "Game Studio X",
    text: {
      tr: "Alper ile birlikte çalışmak büyük bir zevkti. Teknik becerileri ve problem çözme yeteneği etkileyici.",
      en: "Working with Alper was a great pleasure. His technical skills and problem-solving abilities are impressive."
    },
    image: "/testimonials/john-doe.jpg" // Referans fotoğrafı ekleyin
  },
  // Diğer referansları ekleyebilirsiniz
]

export default function Testimonials() {
  const { language } = useLanguage()

  return (
    <section id="testimonials" className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-blue-400"
        >
          {content.title[language]}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 p-6 rounded-lg relative"
            >
              <FaQuoteLeft className="text-blue-400 text-4xl mb-4" />
              <p className="text-gray-300 mb-6 italic">
                {testimonial.text[language]}
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-gray-200 font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400">
                    {testimonial.title[language]} - {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 
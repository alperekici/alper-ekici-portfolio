'use client'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import Link from 'next/link'

const content = {
  title: {
    tr: "Blog",
    en: "Blog"
  },
  readMore: {
    tr: "Devamını Oku",
    en: "Read More"
  }
}

const blogPosts = [
  {
    title: {
      tr: "Unreal Engine ile Oyun Geliştirme",
      en: "Game Development with Unreal Engine"
    },
    excerpt: {
      tr: "Unreal Engine kullanarak oyun geliştirme sürecindeki deneyimlerimi paylaşıyorum...",
      en: "Sharing my experiences in game development using Unreal Engine..."
    },
    date: "2024-03-20",
    slug: "unreal-engine-game-development"
  },
  // Diğer blog yazılarını ekleyebilirsiniz
]

export default function Blog() {
  const { language } = useLanguage()

  return (
    <section id="blog" className="min-h-screen bg-gray-900 p-4">
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
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-gray-200">
                  {post.title[language]}
                </h3>
                <p className="text-gray-400 mb-4">
                  {post.excerpt[language]}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">
                    {new Date(post.date).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {content.readMore[language]}
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
} 
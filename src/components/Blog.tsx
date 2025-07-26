'use client'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const content = {
  title: {
    tr: "Blog",
    en: "Blog"
  },
  readMore: {
    tr: "Devamını Oku",
    en: "Read More"
  },
  loading: {
    tr: "Blog yazıları yükleniyor...",
    en: "Loading blog posts..."
  },
  error: {
    tr: "Blog yazıları yüklenirken hata oluştu",
    en: "Error loading blog posts"
  },
  noPosts: {
    tr: "Henüz blog yazısı eklenmemiş.",
    en: "No blog posts yet."
  }
}

interface BlogPost {
  _id: string
  title: {
    tr: string
    en: string
  }
  excerpt: {
    tr: string
    en: string
  }
  featuredImageUrl?: string
  slug: string
  publishedAt: string
  tags?: string[]
  order: number
  featured: boolean
}

export default function Blog() {
  const { language } = useLanguage()
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog')
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts')
        }
        const data = await response.json()
        setBlogPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  if (loading) {
    return (
      <section id="blog" className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">{content.loading[language]}</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="blog" className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{content.error[language]}</p>
          <p className="text-gray-400">{error}</p>
        </div>
      </section>
    )
  }

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

        {blogPosts.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>{content.noPosts[language]}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                {post.featuredImageUrl && (
                  <div className="relative h-48 bg-gray-700">
                    <img
                      src={post.featuredImageUrl}
                      alt={post.title[language]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-200">
                    {post.title[language]}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {post.excerpt[language]}
                  </p>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString(
                        language === 'tr' ? 'tr-TR' : 'en-US'
                      )}
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
        )}
      </div>
    </section>
  )
} 
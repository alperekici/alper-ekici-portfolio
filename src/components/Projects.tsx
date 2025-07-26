'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const content = {
  title: {
    tr: "Projeler",
    en: "Projects"
  },
  viewProject: {
    tr: "Projeyi Görüntüle",
    en: "View Project"
  },
  sourceCode: {
    tr: "Kaynak Kod",
    en: "Source Code"
  },
  loading: {
    tr: "Projeler yükleniyor...",
    en: "Loading projects..."
  },
  error: {
    tr: "Projeler yüklenirken hata oluştu",
    en: "Error loading projects"
  }
}

interface Project {
  _id: string
  title: {
    tr: string
    en: string
  }
  description: {
    tr: string
    en: string
  }
  imageUrl: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  order: number
  featured: boolean
}

export default function Projects() {
  const { language } = useLanguage()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects')
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        const data = await response.json()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">{content.loading[language]}</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{content.error[language]}</p>
          <p className="text-gray-400">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-blue-400"
        >
          {content.title[language]}
        </motion.h2>

        {projects.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>Henüz proje eklenmemiş.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <div className="relative h-48 bg-gray-700">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title[language]}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-blue-600 opacity-20"></div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-200">
                    {project.title[language]}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {project.description[language]}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
                      >
                        <FaGithub />
                        {content.sourceCode[language]}
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
                      >
                        <FaExternalLinkAlt />
                        {content.viewProject[language]}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
} 
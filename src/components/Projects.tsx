'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

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
  }
}

const projects = [
  {
    title: {
      tr: "Unreal Engine Projesi",
      en: "Unreal Engine Project"
    },
    description: {
      tr: "Unreal Engine ile geliştirilmiş bir oyun projesi. [Projenizin kısa açıklaması]",
      en: "A game project developed with Unreal Engine. [Your project description]"
    },
    image: "/project1.jpg", // Proje görseli ekleyin
    technologies: ["Unreal Engine", "C++"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: {
      tr: "Unity Projesi",
      en: "Unity Project"
    },
    description: {
      tr: "Unity ile geliştirilmiş bir oyun projesi. [Projenizin kısa açıklaması]",
      en: "A game project developed with Unity. [Your project description]"
    },
    image: "/project2.jpg", // Proje görseli ekleyin
    technologies: ["Unity", "C#"],
    githubUrl: "#",
    liveUrl: "#"
  },
  // Diğer projelerinizi ekleyebilirsiniz
]

export default function Projects() {
  const { language } = useLanguage()

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

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="relative h-48 bg-gray-700">
                {/* Proje görseli eklenecek */}
                <div className="absolute inset-0 bg-blue-600 opacity-20"></div>
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
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <FaGithub />
                    {content.sourceCode[language]}
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <FaExternalLinkAlt />
                    {content.viewProject[language]}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 
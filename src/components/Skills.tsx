'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { FaCode, FaGamepad, FaTools } from 'react-icons/fa'

const content = {
  title: {
    tr: "Yetenekler",
    en: "Skills"
  },
  categories: {
    programmingLanguages: {
      tr: "Programlama Dilleri",
      en: "Programming Languages"
    },
    gameEngines: {
      tr: "Oyun Motorları",
      en: "Game Engines"
    },
    tools: {
      tr: "Araçlar",
      en: "Tools"
    }
  }
}

const skills = {
  programmingLanguages: [
    { name: "C++", level: 80 },
    { name: "C#", level: 85 },
  ],
  gameEngines: [
    { name: "Unreal Engine", level: 75 },
    { name: "Unity", level: 70 },
  ],
  tools: [
    { name: "Git", level: 75 },
    { name: "Visual Studio", level: 80 },
  ]
}

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-1">
      <span className="text-gray-300">{name}</span>
      <span className="text-gray-400">{level}%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-blue-500 h-2.5 rounded-full"
      />
    </div>
  </div>
)

export default function Skills() {
  const { language } = useLanguage()

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="max-w-4xl w-full mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-blue-400"
        >
          {content.title[language]}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Programming Languages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <div className="flex items-center mb-6">
              <FaCode className="text-2xl text-blue-400 mr-2" />
              <h3 className="text-xl font-semibold text-gray-200">
                {content.categories.programmingLanguages[language]}
              </h3>
            </div>
            {skills.programmingLanguages.map((skill) => (
              <SkillBar key={skill.name} {...skill} />
            ))}
          </motion.div>

          {/* Game Engines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <div className="flex items-center mb-6">
              <FaGamepad className="text-2xl text-blue-400 mr-2" />
              <h3 className="text-xl font-semibold text-gray-200">
                {content.categories.gameEngines[language]}
              </h3>
            </div>
            {skills.gameEngines.map((skill) => (
              <SkillBar key={skill.name} {...skill} />
            ))}
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <div className="flex items-center mb-6">
              <FaTools className="text-2xl text-blue-400 mr-2" />
              <h3 className="text-xl font-semibold text-gray-200">
                {content.categories.tools[language]}
              </h3>
            </div>
            {skills.tools.map((skill) => (
              <SkillBar key={skill.name} {...skill} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 
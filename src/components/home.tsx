'use client'

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaReact, FaPython, FaGithub, FaLinkedin, FaWhatsapp, FaGoogle } from "react-icons/fa"
import { SiJavascript, SiCss3, SiNextdotjs, SiSolidity } from "react-icons/si"
import Image from 'next/image'
import Link from 'next/link'
import { IconType } from 'react-icons'

interface Language {
  name: string
  icon: IconType
  color: string
  code: string
}

const languages: Language[] = [
  { name: "React", icon: FaReact, color: "#61DAFB", code: "const [state, setState] = useState(initialState);" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", code: "export default function Page() { return <h1>Hello, Next.js!</h1> }" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", code: 'console.log("Hello, World!");' },
  { name: "CSS", icon: SiCss3, color: "#1572B6", code: "body { font-family: sans-serif; color: #333; }" },
  { name: "Python", icon: FaPython, color: "#3776AB", code: 'print("Hello, World!")' },
  { name: "Solidity", icon: SiSolidity, color: "#363636", code: 'contract HelloWorld { string public greeting = "Hello, World!"; }' },
]

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  image: string
  href: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Soraya y Leonardo Tours",
    description: "A web app built with PHP with Wordpress.",
    technologies: ["PHP", "Wordpress", "Html", "Css", "Javascript"],
    image: "/sorayatours.png",
    href: "https://sorayayleonardotours.com",
  },
  {
    id: 2,
    title: "ACMDH",
    description: "A web app built in Next.js with typescript.",
    technologies: ["Next.js", "Typescript", "Tailwind"],
    image: "/acmdh.png",
    href: "https://www.asociaciondominicohaitiana.com/",
  },
  {
    id: 3,
    title: "Web3 Presale",
    description: "A web3 app built in Next.js and Smartcontrats integrations.",
    technologies: ["Next.js", "Typescript", "MongoDB", "Solidity"],
    image: "/duff.png",
    href: "#",
  },
]

export default function Component() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [typedCode, setTypedCode] = useState("")
  const codeSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleLanguageClick = (language: Language) => {
    setSelectedLanguage(language)
    setIsTyping(true)
    setTypedCode("")
    typeCode(language.code)

    codeSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const typeCode = (code: string) => {
    let i = 0
    const typing = setInterval(() => {
      setTypedCode((prev) => prev + code[i])
      i++
      if (i === code.length) {
        clearInterval(typing)
        setIsTyping(false)
      }
    }, 50)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <motion.div
          className="w-16 h-16 border-t-4 border-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 relative">
      <motion.header
        className="mb-12 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/profile.jpg?height=120&width=160"
          width={160}
          height={120}
          alt="Your profile"
          className="w-40 h-30 border-4 rounded-full border-white"
        />
        <div>
          <h1 className="text-4xl font-bold mb-2">Peter&apos;s Portfolio</h1>
          <p className="text-xl">Backend and Frontend Developer</p>
          <p>3rd Year Student of Software Engineer at Universidad Abierta para Adultos (UAPA), Dominican Republic</p>
        </div>
      </motion.header>

      <Link
        href="https://wa.me/18099622259"
        className="absolute top-4 right-4 bg-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-400 transition"
      >
        LET&apos;S WORK
      </Link>

      <motion.section
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p>
          I am a responsible 20-year-old developer with a passion for building dynamic web applications.
          With expertise in modern technologies like React, Next.js, and Solidity, I thrive on solving complex problems through code.
          I am committed to giving my all in every project I participate in, staying punctual and paying close attention to every detail.
        </p>
      </motion.section>

      <motion.section
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <motion.div
              key={lang.name}
              className="flex items-center space-x-2 p-2 rounded border border-white/10 cursor-pointer"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLanguageClick(lang)}
            >
              <lang.icon size={24} color={lang.color} />
              <span>{lang.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div ref={codeSectionRef}>
        <AnimatePresence>
          {selectedLanguage && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <h3 className="text-xl font-semibold mb-2">
                {selectedLanguage.name} Code:
              </h3>
              <div className="bg-gray-800 p-4 rounded-md">
                <code className="font-mono text-sm">
                  {isTyping ? typedCode : selectedLanguage.code}
                </code>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <motion.section
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  width={400}
                  height={225}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                <p className="text-blue-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="mb-12 p-6 rounded-lg bg-gradient-to-r from-blue-900 via-black to-gray-800 shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">
          Contact Me
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <Link
              href="https://github.com/ItachiRD26"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub size={36} />
              <span className="text-lg">GitHub</span>
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-4 text-center">
            <Link
              href="https://www.linkedin.com/in/jetergarcia/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-500 hover:text-blue-300 transition-colors"
            >
              <FaLinkedin size={36} />
              <span className="text-lg">LinkedIn</span>
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-4 text-center">
            <Link
              href="https://wa.me/18099622259"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <FaWhatsapp size={36} />
              <span className="text-lg">WhatsApp</span>
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-4 text-center">
            <Link
              href="mailto:garciajeter9@gmail.com"
              className="flex items-center space-x-2 text-lg text-blue-400 hover:text-blue-300 transition-colors"
            >
              <FaGoogle size={24} />
              <span>garciajeter9@gmail.com</span>
            </Link>
          </div>
        </div>
      </motion.section>

      <footer className="text-center text-sm text-gray-500 mt-12">
        &copy; {new Date().getFullYear()} Peter. All rights reserved.
      </footer>
    </div>
  )
}
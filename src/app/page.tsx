import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Blog from '../components/Blog'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blog />
        <Testimonials />
        <Contact />
      </main>
      <ScrollToTop />
    </>
  )
}

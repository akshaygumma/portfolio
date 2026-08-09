import { ThemeProvider } from '@/components/theme-provider'
import { Background } from '@/components/background/Background'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Footer } from '@/components/sections/Footer'

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen text-foreground">
        <Background />
        <Nav />
        <main>
          <Hero />
          <Projects />
          <Skills />
          <Experience />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App

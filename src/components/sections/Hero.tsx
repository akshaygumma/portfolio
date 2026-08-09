import { ArrowRight, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { ACCENTS } from '@/data/projects'
import { cn } from '@/lib/utils'

const highlights = [
  { label: 'Agentic LLM pipelines', accent: ACCENTS.violet },
  { label: 'RAG & vector search', accent: ACCENTS.cyan },
  { label: 'Real-time game systems', accent: ACCENTS.indigo },
  { label: 'MLOps', accent: ACCENTS.amber },
]

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pb-24 pt-24 sm:pt-32">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="size-3.5" />
        Bangalore, India
      </div>

      <p className="mt-6 font-mono text-sm text-primary">Hi, I'm</p>
      <h1 className="mt-2 bg-gradient-to-br from-foreground via-foreground to-primary bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-7xl">
        Akshay Gumma
      </h1>
      <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">
        AI Engineer — Agentic Systems &amp; LLM Applications
      </p>

      <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
        3 years of production software experience, now focused on agentic LLM systems. I design and
        build multi-agent platforms that turn natural-language prompts into working, compiling
        software — LangGraph orchestration, RAG over vector databases, schema-constrained LLM
        outputs, and self-repairing feedback loops.
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {highlights.map((h) => (
          <span
            key={h.label}
            className="rounded-full px-3 py-1.5 text-xs font-medium"
            style={{
              color: h.accent,
              background: `color-mix(in oklch, ${h.accent} 12%, transparent)`,
              border: `1px solid color-mix(in oklch, ${h.accent} 26%, transparent)`,
            }}
          >
            {h.label}
          </span>
        ))}
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <a href="#projects" className={cn(buttonVariants({ size: 'lg' }))}>
          See my work
          <ArrowRight className="size-4" />
        </a>
        <a
          href="https://github.com/akshaygumma"
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'glass')}
        >
          <GithubIcon className="size-4" />
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/akshaygumma"
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'glass')}
        >
          <LinkedinIcon className="size-4" />
          LinkedIn
        </a>
      </div>
    </section>
  )
}

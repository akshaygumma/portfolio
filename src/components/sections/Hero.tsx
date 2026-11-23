import { Gamepad2, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { ACCENTS } from '@/data/projects'
import { cn } from '@/lib/utils'

const highlights = [
  { label: 'Gameplay systems', accent: ACCENTS.indigo },
  { label: 'Game AI & NPC behaviour', accent: ACCENTS.emerald },
  { label: 'Real-time multiplayer', accent: ACCENTS.cyan },
  { label: 'Performance & optimization', accent: ACCENTS.amber },
  { label: 'Unity tooling', accent: ACCENTS.violet },
]

const stats = [
  { value: '3+', label: 'Years exp.' },
  { value: '4', label: 'Titles' },
  { value: 'PC/Mobile', label: 'Platforms' },
]

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pb-24 pt-24 sm:pt-32">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="size-3.5" />
        Bangalore, India
      </div>

      <p className="mt-6 font-mono text-sm text-primary">Player 1 — Hi, I'm</p>
      <h1 className="mt-2 bg-gradient-to-br from-foreground via-foreground to-primary bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-7xl">
        Akshay Gumma
      </h1>
      <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">
        Game Developer — Unity &amp; C#
      </p>

      <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
        3 years building games at Juego Studios — from a PvP creature auto-battler on Steam to
        mobile simulations. I build the systems underneath the fun: gameplay and progression,
        human-like game AI, real-time multiplayer, and the performance work that keeps it all
        running smoothly on PC and mobile.
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
        <a href="#games" className={cn(buttonVariants({ size: 'lg' }))}>
          <Gamepad2 className="size-4" />
          Press start
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

      <dl className="glass mt-12 grid max-w-2xl grid-cols-3 divide-x divide-border rounded-lg border border-border">
        {stats.map((s) => (
          <div key={s.label} className="px-4 py-3">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {s.label}
            </dt>
            <dd className="mt-1 font-mono text-base font-semibold sm:text-lg text-foreground">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data/projects'
import { FlagshipProject } from '@/components/sections/FlagshipProject'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { SectionHeading } from '@/components/SectionHeading'

function SubHeading({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <>
      <h4 className="mt-16 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        {children}
      </h4>
      {note && <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{note}</p>}
    </>
  )
}

export function Projects() {
  const flagship = projects.find((p) => p.kind === 'flagship')
  const games = projects.filter((p) => p.kind === 'game')
  const tools = projects.filter((p) => p.kind === 'tool')
  const other = projects.filter((p) => p.kind === 'other')

  return (
    <section id="games" className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading index="01" eyebrow="What I've shipped" title="Games" />

      {flagship && (
        <div className="mt-10">
          <FlagshipProject project={flagship} />
        </div>
      )}

      <SubHeading note="Mobile titles and multiplayer projects built at Juego Studios.">
        More games
      </SubHeading>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {games.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {tools.length > 0 && (
        <>
          <SubHeading note="Tooling that speeds up how Unity games get made.">
            Game AI &amp; Tools
          </SubHeading>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {tools.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </>
      )}

      {other.length > 0 && (
        <>
          <SubHeading>Other work</SubHeading>
          <ul className="mt-6 divide-y divide-border rounded-lg border border-border">
            {other.map((p) => {
              const link = p.links[0]
              return (
                <li key={p.slug} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 p-4">
                  <span
                    className="h-2 w-2 shrink-0 self-center rounded-full"
                    style={{ background: p.accent }}
                  />
                  <span className="text-sm font-medium text-foreground">{p.name}</span>
                  <span className="text-xs text-muted-foreground">{p.tagline}</span>
                  <span className="hidden font-mono text-[11px] text-muted-foreground sm:ml-auto sm:inline">
                    {p.tech.join(' · ')}
                  </span>
                  {link && (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.name} — ${link.label}`}
                      className="ml-auto text-muted-foreground transition-colors hover:text-foreground sm:ml-0"
                    >
                      <ArrowUpRight className="size-4" />
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </>
      )}
    </section>
  )
}

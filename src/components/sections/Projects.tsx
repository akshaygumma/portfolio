import { projects } from '@/data/projects'
import { FlagshipProject } from '@/components/sections/FlagshipProject'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { SectionHeading } from '@/components/SectionHeading'

export function Projects() {
  const flagship = projects.find((p) => p.kind === 'flagship')
  const ml = projects.filter((p) => p.kind === 'ml')
  const games = projects.filter((p) => p.kind === 'game')

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading index="01" eyebrow="What I've built" title="Projects" />

      {flagship && (
        <div className="mt-10">
          <FlagshipProject project={flagship} />
        </div>
      )}

      <h4 className="mt-16 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        AI &amp; Machine Learning
      </h4>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {ml.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <h4 className="mt-16 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Shipped Games
      </h4>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Production titles built at Juego Studios — where the real-time systems, agent-behaviour and
        performance work behind the AI projects above comes from.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {games.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  )
}

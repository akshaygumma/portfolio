import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/data/projects'
import { ProjectCover } from '@/components/ProjectCover'
import { SpotlightCard } from '@/components/ui/spotlight-card'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard accent={project.accent} className="h-full">
      <div className="flex h-full flex-col">
        <ProjectCover
          art={project.art}
          accent={project.accent}
          image={project.image}
          alt={`${project.name} cover`}
          className="aspect-[16/7]"
        />

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-lg font-semibold leading-none tracking-tight">
                  {project.name}
                </h4>
                {project.status && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide"
                    style={{
                      color: project.accent,
                      background: `color-mix(in oklch, ${project.accent} 16%, transparent)`,
                    }}
                  >
                    {project.status}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{project.tagline}</p>
            </div>
            {project.links[0] && (
              <a
                href={project.links[0].href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} — ${project.links[0].label}`}
                className="shrink-0 text-muted-foreground transition-colors hover:text-(--spot-accent)"
              >
                <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <ul className="mt-4 space-y-1.5">
            {project.bullets.slice(0, 2).map((b) => (
              <li key={b} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                <span
                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                  style={{ background: project.accent }}
                />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground"
                style={{ borderColor: `color-mix(in oklch, ${project.accent} 28%, transparent)` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SpotlightCard>
  )
}

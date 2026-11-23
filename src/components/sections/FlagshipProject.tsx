import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/data/projects'
import { ProjectCover } from '@/components/ProjectCover'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function FlagshipProject({ project }: { project: Project }) {
  return (
    <SpotlightCard accent={project.accent} tilt={0} className="border-primary/25">
      <div
        className="flex items-center justify-between border-b border-border px-6 py-3"
        style={{ background: `color-mix(in oklch, ${project.accent} 12%, transparent)` }}
      >
        <span
          className="font-mono text-xs font-medium uppercase tracking-wider"
          style={{ color: project.accent }}
        >
          ★ Featured title
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Shipped
        </span>
      </div>

      <ProjectCover
        art={project.art}
        accent={project.accent}
        image={project.image}
        alt={`${project.name} cover`}
        className="aspect-[21/6]"
      />

      <div className="p-6 sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{project.name}</h3>
            <p className="mt-1 text-muted-foreground">{project.tagline}</p>
          </div>
          <div className="flex gap-2">
            {project.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: i === 0 ? 'default' : 'outline', size: 'sm' }),
                )}
              >
                {l.label}
                <ArrowUpRight className="size-3.5" />
              </a>
            ))}
          </div>
        </div>

        {project.stats && (
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
            {project.stats.map((s) => (
              <div key={s.label} className="bg-card-solid px-4 py-3">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </dt>
                <dd
                  className="mt-1 font-mono text-xl font-semibold tabular-nums"
                  style={{ color: project.accent }}
                >
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {project.description}
        </p>

        {project.loop && (
          <div className="mt-8 rounded-lg border border-border bg-muted/40 p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Core loop
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {project.loop.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="whitespace-nowrap rounded-md bg-card-solid px-3 py-1.5 font-mono text-xs shadow-sm">
                    {step}
                  </span>
                  <span style={{ color: project.accent }} aria-hidden="true">
                    {i < project.loop!.length - 1 ? '→' : '↻'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <h4 className="mt-8 text-sm font-medium text-foreground">What I built</h4>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full"
                style={{ background: project.accent }}
              />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground"
              style={{ borderColor: `color-mix(in oklch, ${project.accent} 30%, transparent)` }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </SpotlightCard>
  )
}

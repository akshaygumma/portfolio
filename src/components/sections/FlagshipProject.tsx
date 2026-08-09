import { ArrowUpRight, CheckCircle2, CircleDashed, XCircle } from 'lucide-react'
import type { Project } from '@/data/projects'
import { ProjectCover } from '@/components/ProjectCover'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const status = [
  {
    icon: CheckCircle2,
    label: 'Proven end-to-end',
    tone: 'text-emerald-500',
    detail:
      'Full pipeline (plan → generate → assemble → compile → repair), Roslyn gate ~2s vs ~2min in-editor, repair loop 11 errors → 0, green WebGL builds in CI.',
  },
  {
    icon: CircleDashed,
    label: 'Built, not yet battle-tested',
    tone: 'text-amber-500',
    detail:
      'The composition-manifest system that wires generated/library components together in the scene.',
  },
  {
    icon: XCircle,
    label: 'Not built yet',
    tone: 'text-muted-foreground',
    detail:
      'Play-in-browser on the live site, targeted feedback-driven revisions, hosting the pipeline backend publicly.',
  },
]

const pipeline = [
  'Chat & requirements',
  'Plan architecture',
  'Task breakdown',
  'Generate (RAG)',
  'Compose scene',
  'Compile gate',
  'Self-repair',
]

export function FlagshipProject({ project }: { project: Project }) {
  return (
    <SpotlightCard accent={project.accent} tilt={0} className="border-primary/25">
      <div
        className="border-b border-border px-6 py-3"
        style={{ background: `color-mix(in oklch, ${project.accent} 12%, transparent)` }}
      >
        <span
          className="font-mono text-xs font-medium uppercase tracking-wider"
          style={{ color: project.accent }}
        >
          Flagship project
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
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({
                    variant: l.label === 'Live site' ? 'default' : 'outline',
                    size: 'sm',
                  }),
                )}
              >
                {l.label}
                <ArrowUpRight className="size-3.5" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-muted/40 p-4">
          {pipeline.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="whitespace-nowrap rounded-md bg-card-solid px-3 py-1.5 font-mono text-xs shadow-sm">
                {step}
              </span>
              {i < pipeline.length - 1 && (
                <span style={{ color: project.accent }} aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>

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

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
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

        <div className="mt-10 grid gap-4 border-t border-border pt-8 sm:grid-cols-3">
          {status.map((s) => (
            <div key={s.label} className="flex gap-3">
              <s.icon className={cn('mt-0.5 size-4 shrink-0', s.tone)} />
              <div>
                <p className="text-sm font-medium text-foreground">{s.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SpotlightCard>
  )
}

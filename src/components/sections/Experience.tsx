import { experience, achievements, ACCENTS } from '@/data/projects'
import { SectionHeading } from '@/components/SectionHeading'
import { SpotlightCard } from '@/components/ui/spotlight-card'

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading index="03" eyebrow="Career log" title="Experience" />

      <SpotlightCard accent={ACCENTS.indigo} tilt={0} className="mt-10 p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h4 className="text-lg font-semibold text-foreground">
            {experience.role} · {experience.company}
          </h4>
          <span className="font-mono text-sm text-muted-foreground">{experience.period}</span>
        </div>
        <ul className="mt-5 space-y-2.5">
          {experience.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
              {b}
            </li>
          ))}
        </ul>
      </SpotlightCard>

      <div className="mt-6 flex flex-wrap gap-2">
        {achievements.map((a) => (
          <span
            key={a}
            className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
          >
            {a}
          </span>
        ))}
      </div>
    </section>
  )
}

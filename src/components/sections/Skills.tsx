import { skills } from '@/data/projects'
import { SectionHeading } from '@/components/SectionHeading'
import { SpotlightCard } from '@/components/ui/spotlight-card'

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading index="02" eyebrow="What I work with" title="Skills" />

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {skills.map((group) => (
          <SpotlightCard key={group.category} accent={group.accent} tilt={2} className="p-6">
            <div className="flex items-center gap-2.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: group.accent, boxShadow: `0 0 12px ${group.accent}` }}
              />
              <h4 className="text-sm font-semibold text-foreground">{group.category}</h4>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full px-2.5 py-1 text-xs text-muted-foreground transition-colors"
                  style={{
                    background: `color-mix(in oklch, ${group.accent} 10%, transparent)`,
                    border: `1px solid color-mix(in oklch, ${group.accent} 22%, transparent)`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  )
}

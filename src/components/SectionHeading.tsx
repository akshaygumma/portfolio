export function SectionHeading({
  index,
  eyebrow,
  title,
}: {
  index: string
  eyebrow: string
  title: string
}) {
  return (
    <div>
      <p className="font-mono text-sm text-primary">
        {index} · {eyebrow}
      </p>
      <h3 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h3>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-primary to-transparent" />
    </div>
  )
}

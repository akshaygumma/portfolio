import { Aurora } from '@/components/background/Aurora'
import { ParticleField } from '@/components/background/ParticleField'

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Aurora />
      {/* Dot grid, faded out toward the edges so it reads as texture. */}
      <div className="bg-dot-grid absolute inset-0 opacity-[0.5] dark:opacity-[0.35]" />
      <div className="absolute inset-0">
        <ParticleField />
      </div>
      {/* Vignette keeps text legible over the brightest parts of the aurora. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_100%)] opacity-70" />
    </div>
  )
}

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * A surface that tracks the cursor within its own bounds: a soft radial
 * highlight follows the pointer and the card tilts slightly toward it.
 * Values are written to CSS custom properties on the element itself, so
 * pointer movement never causes a React render.
 */
export function SpotlightCard({
  children,
  className,
  accent,
  tilt = 4,
}: {
  children: ReactNode
  className?: string
  /** CSS colour used for the highlight; falls back to the theme accent. */
  accent?: string
  /** Maximum tilt in degrees. Set to 0 to disable. */
  tilt?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    node.style.setProperty('--mx', `${x}px`)
    node.style.setProperty('--my', `${y}px`)

    if (tilt > 0) {
      const px = (x / rect.width) * 2 - 1
      const py = (y / rect.height) * 2 - 1
      node.style.setProperty('--ry', `${(px * tilt).toFixed(2)}deg`)
      node.style.setProperty('--rx', `${(-py * tilt).toFixed(2)}deg`)
    }
  }

  const onPointerLeave = () => {
    const node = ref.current
    if (!node) return
    node.style.setProperty('--ry', '0deg')
    node.style.setProperty('--rx', '0deg')
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        'group/spot glass relative overflow-hidden rounded-xl border border-border',
        'transition-[transform,border-color,box-shadow] duration-300 ease-out',
        'hover:border-(--spot-accent)/40 hover:shadow-lg',
        className,
      )}
      style={
        {
          '--spot-accent': accent ?? 'var(--primary)',
          transform:
            'perspective(1200px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
          transformStyle: 'preserve-3d',
        } as React.CSSProperties
      }
    >
      {/* Cursor highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            'radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(--spot-accent) 22%, transparent), transparent 70%)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

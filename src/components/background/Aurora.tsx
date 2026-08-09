import { useEffect, useRef } from 'react'
import { usePointer } from '@/hooks/usePointer'

/**
 * Large, heavily-blurred colour fields that drift on their own and shift
 * slightly with the pointer. This is what keeps the page from reading as a
 * single flat colour. Parallax is applied straight to the DOM node inside a
 * rAF loop — going through React state here would re-render on every mouse
 * move for no benefit.
 */
const BLOBS = [
  {
    className: 'left-[-12%] top-[-14%] h-[46rem] w-[46rem]',
    color: 'var(--aurora-1)',
    depth: 34,
    animation: 'aurora-drift-a 26s ease-in-out infinite',
  },
  {
    className: 'right-[-16%] top-[6%] h-[40rem] w-[40rem]',
    color: 'var(--aurora-2)',
    depth: -26,
    animation: 'aurora-drift-b 32s ease-in-out infinite',
  },
  {
    className: 'left-[22%] top-[52%] h-[42rem] w-[42rem]',
    color: 'var(--aurora-3)',
    depth: 20,
    animation: 'aurora-drift-c 38s ease-in-out infinite',
  },
  {
    className: 'right-[4%] bottom-[-16%] h-[36rem] w-[36rem]',
    color: 'var(--aurora-4)',
    depth: -16,
    animation: 'aurora-drift-b 30s ease-in-out infinite reverse',
  },
]

export function Aurora() {
  const pointer = usePointer()
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const current = { x: 0, y: 0 }

    const tick = () => {
      current.x += (pointer.current.x - current.x) * 0.04
      current.y += (pointer.current.y - current.y) * 0.04

      for (let i = 0; i < BLOBS.length; i++) {
        const node = refs.current[i]
        if (!node) continue
        const { depth } = BLOBS[i]
        node.style.setProperty('--px', `${(current.x * depth).toFixed(2)}px`)
        node.style.setProperty('--py', `${(current.y * depth).toFixed(2)}px`)
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [pointer])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {BLOBS.map((blob, i) => (
        <div
          key={blob.className}
          ref={(node) => {
            refs.current[i] = node
          }}
          className={`absolute rounded-full blur-[100px] ${blob.className}`}
          style={{
            background: blob.color,
            animation: blob.animation,
            translate: 'var(--px, 0) var(--py, 0)',
          }}
        />
      ))}
    </div>
  )
}

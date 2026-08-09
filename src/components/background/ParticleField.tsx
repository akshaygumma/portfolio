import { useEffect, useRef } from 'react'
import { usePointer } from '@/hooks/usePointer'
import { useTheme } from '@/components/theme-provider'

const COUNT = 90
/** Camera focal length — larger values flatten the perspective. */
const FOCAL = 620
/** Half-width of the cube the points live in. */
const SPREAD = 520
/** Max on-screen distance (px) at which two points get connected. */
const LINK_DIST = 132

type Rgb = [number, number, number]

const PALETTE: Record<'light' | 'dark', { near: Rgb; far: Rgb; link: Rgb; alpha: number }> = {
  dark: {
    near: [186, 150, 255],
    far: [72, 160, 255],
    link: [140, 130, 255],
    alpha: 1,
  },
  light: {
    near: [120, 72, 226],
    far: [26, 118, 210],
    link: [110, 96, 210],
    alpha: 0.72,
  },
}

const mix = (a: Rgb, b: Rgb, t: number): Rgb => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
]

const rgba = (c: Rgb, a: number) =>
  `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a.toFixed(3)})`

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointer = usePointer()
  const { theme } = useTheme()
  // Keep the latest theme readable from inside the animation loop without
  // tearing down and rebuilding the whole simulation on every toggle.
  const themeRef = useRef(theme)
  themeRef.current = theme

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0

    /**
     * Re-sync the backing buffer whenever the element's box changes. Run from
     * inside the render loop rather than a ResizeObserver: observer callbacks
     * are delivered as part of the rendering lifecycle, so a canvas first laid
     * out at zero size (hidden tab, deferred layout) would otherwise stay
     * stuck at its initial dimensions. Checking here makes it self-healing.
     */
    const syncSize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w === width && h === height) return
      width = w
      height = h
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    syncSize()

    const rand = (n: number) => (Math.random() - 0.5) * n
    const points = Array.from({ length: COUNT }, () => ({
      x: rand(SPREAD * 2),
      y: rand(SPREAD * 2),
      z: rand(SPREAD * 2),
      vx: rand(0.34),
      vy: rand(0.34),
      vz: rand(0.34),
    }))

    const projected = Array.from({ length: COUNT }, () => ({
      x: 0,
      y: 0,
      depth: 0,
      visible: false,
    }))

    let yaw = 0
    let pitch = 0
    let drift = 0
    let frame = 0

    const render = () => {
      syncSize()
      const palette = PALETTE[themeRef.current]
      drift += 0.0016

      // Ease the rotation toward the pointer so motion feels weighted
      // rather than snapping to the cursor.
      const targetYaw = pointer.current.x * 0.5 + drift
      const targetPitch = pointer.current.y * 0.34
      yaw += (targetYaw - yaw) * 0.045
      pitch += (targetPitch - pitch) * 0.045

      const cosY = Math.cos(yaw)
      const sinY = Math.sin(yaw)
      const cosP = Math.cos(pitch)
      const sinP = Math.sin(pitch)
      const cx = width / 2
      const cy = height / 2

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < COUNT; i++) {
        const p = points[i]

        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          p.z += p.vz
          if (p.x > SPREAD || p.x < -SPREAD) p.vx *= -1
          if (p.y > SPREAD || p.y < -SPREAD) p.vy *= -1
          if (p.z > SPREAD || p.z < -SPREAD) p.vz *= -1
        }

        // Rotate around Y, then around X.
        const x1 = p.x * cosY - p.z * sinY
        const z1 = p.x * sinY + p.z * cosY
        const y2 = p.y * cosP - z1 * sinP
        const z2 = p.y * sinP + z1 * cosP

        // Perspective divide. Shifting z by SPREAD keeps the whole cube in
        // front of the camera so nothing inverts through the focal point.
        const scale = FOCAL / (FOCAL + z2 + SPREAD)
        const out = projected[i]
        out.x = cx + x1 * scale
        out.y = cy + y2 * scale
        out.depth = scale
        out.visible = scale > 0.12
      }

      // Connections first, so dots sit on top of the lines.
      for (let i = 0; i < COUNT; i++) {
        const a = projected[i]
        if (!a.visible) continue
        for (let j = i + 1; j < COUNT; j++) {
          const b = projected[j]
          if (!b.visible) continue
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distSq = dx * dx + dy * dy
          if (distSq > LINK_DIST * LINK_DIST) continue

          const dist = Math.sqrt(distSq)
          const closeness = 1 - dist / LINK_DIST
          const depth = Math.min(a.depth, b.depth)
          const alpha = closeness * 0.34 * depth * palette.alpha
          if (alpha < 0.004) continue

          ctx.strokeStyle = rgba(palette.link, alpha)
          ctx.lineWidth = Math.max(0.4, depth * 0.9)
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      for (let i = 0; i < COUNT; i++) {
        const p = projected[i]
        if (!p.visible) continue
        // depth runs roughly 0.4 (far) .. 1.4 (near); normalize for the mix.
        const t = Math.min(1, Math.max(0, (p.depth - 0.4) / 1))
        const color = mix(palette.far, palette.near, t)
        const radius = Math.max(0.5, p.depth * 1.9)
        ctx.fillStyle = rgba(color, Math.min(0.85, p.depth * 0.62) * palette.alpha)
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      frame = requestAnimationFrame(render)
    }

    // Paint one frame synchronously so the field is already there on first
    // paint; render() schedules its own successor from then on.
    render()

    // Stop burning frames while the tab is in the background.
    const onVisibility = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden) render()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [pointer])

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
}

import type { ArtKind } from '@/data/projects'
import { cn } from '@/lib/utils'

/**
 * Cover visual for a project. If a real screenshot is supplied it wins;
 * otherwise a generated, project-specific piece of line art is drawn so
 * every card reads as designed rather than as an empty placeholder.
 * Drop a file in `public/covers/` and set `image` on the project to swap.
 */
export function ProjectCover({
  art,
  accent,
  image,
  alt,
  className,
}: {
  art: ArtKind
  accent: string
  image?: string
  alt: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden border-b border-border bg-black/[0.02] dark:bg-white/[0.02]',
        className,
      )}
    >
      {image ? (
        <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 90% at 18% 10%, color-mix(in oklch, ${accent} 26%, transparent), transparent 62%)`,
            }}
          />
          <Art kind={art} accent={accent} />
        </>
      )}
    </div>
  )
}

function Art({ kind, accent }: { kind: ArtKind; accent: string }) {
  const dim = 'color-mix(in oklch, currentColor 22%, transparent)'
  const common = {
    viewBox: '0 0 400 200',
    className: 'relative h-full w-full text-foreground',
    preserveAspectRatio: 'xMidYMid slice',
  } as const

  switch (kind) {
    /* Gaeon — the generate → compile → repair pipeline with its feedback loop. */
    case 'pipeline':
      return (
        <svg {...common}>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect
                x={26 + i * 92}
                y={62}
                width={64}
                height={34}
                rx={8}
                fill="none"
                stroke={i === 3 ? accent : dim}
                strokeWidth={1.6}
              />
              <rect x={36 + i * 92} y={73} width={30} height={4} rx={2} fill={dim} />
              <rect x={36 + i * 92} y={82} width={18} height={4} rx={2} fill={dim} />
              {i < 3 && (
                <path
                  d={`M${94 + i * 92} 79 h18`}
                  stroke={accent}
                  strokeWidth={1.6}
                  markerEnd=""
                />
              )}
            </g>
          ))}
          {/* repair loop */}
          <path
            d="M334 100 v22 q0 12 -12 12 H70 q-12 0 -12 -12 v-22"
            fill="none"
            stroke={accent}
            strokeWidth={1.6}
            strokeDasharray="5 5"
            opacity={0.85}
          />
          <circle cx={58} cy={100} r={3.5} fill={accent} />
          <text
            x={200}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            fill={accent}
            opacity={0.9}
          >
            compile → repair → recompile
          </text>
        </svg>
      )

    /* Layered neural network. */
    case 'neural': {
      const layers = [4, 6, 5, 2]
      const nodes = layers.map((count, li) =>
        Array.from({ length: count }, (_, ni) => ({
          x: 60 + li * 94,
          y: 100 + (ni - (count - 1) / 2) * 26,
        })),
      )
      return (
        <svg {...common}>
          {nodes.slice(0, -1).map((layer, li) =>
            layer.map((a, ai) =>
              nodes[li + 1].map((b, bi) => (
                <line
                  key={`${li}-${ai}-${bi}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={dim}
                  strokeWidth={0.7}
                />
              )),
            ),
          )}
          {nodes.map((layer, li) =>
            layer.map((n, ni) => (
              <circle
                key={`${li}-${ni}`}
                cx={n.x}
                cy={n.y}
                r={5.5}
                fill="var(--background)"
                stroke={li === nodes.length - 1 ? accent : dim}
                strokeWidth={1.6}
              />
            )),
          )}
        </svg>
      )
    }

    /* Metrics: bars plus a tracked trend line. */
    case 'chart': {
      const bars = [28, 46, 38, 62, 72, 58, 88, 96]
      return (
        <svg {...common}>
          <line x1={40} y1={160} x2={366} y2={160} stroke={dim} strokeWidth={1.2} />
          <line x1={40} y1={30} x2={40} y2={160} stroke={dim} strokeWidth={1.2} />
          {bars.map((h, i) => (
            <rect
              key={i}
              x={56 + i * 38}
              y={160 - h}
              width={20}
              height={h}
              rx={3}
              fill={accent}
              opacity={0.2 + (i / bars.length) * 0.55}
            />
          ))}
          <polyline
            points={bars.map((h, i) => `${66 + i * 38},${160 - h - 12}`).join(' ')}
            fill="none"
            stroke={accent}
            strokeWidth={2}
            strokeDasharray="4 4"
          />
          {bars.map((h, i) => (
            <circle key={i} cx={66 + i * 38} cy={160 - h - 12} r={2.6} fill={accent} />
          ))}
        </svg>
      )
    }

    /* Computer vision: a tiled dataset with one detection. */
    case 'vision':
      return (
        <svg {...common}>
          {Array.from({ length: 12 }, (_, i) => {
            const col = i % 4
            const row = Math.floor(i / 4)
            const active = i === 5
            return (
              <g key={i}>
                <rect
                  x={78 + col * 62}
                  y={26 + row * 52}
                  width={54}
                  height={44}
                  rx={5}
                  fill={active ? `color-mix(in oklch, ${accent} 16%, transparent)` : 'none'}
                  stroke={active ? accent : dim}
                  strokeWidth={active ? 1.8 : 1}
                />
                {active && (
                  <>
                    {[
                      [78, 26],
                      [132, 26],
                      [78, 70],
                      [132, 70],
                    ].map(([cx, cy], k) => (
                      <rect
                        key={k}
                        x={cx + col * 62 - 2.5}
                        y={cy + row * 52 - 2.5}
                        width={5}
                        height={5}
                        fill={accent}
                      />
                    ))}
                    <text
                      x={78 + col * 62}
                      y={26 + row * 52 - 6}
                      fontSize="9"
                      fontFamily="ui-monospace, monospace"
                      fill={accent}
                    >
                      0.94
                    </text>
                  </>
                )}
              </g>
            )
          })}
        </svg>
      )

    /* Low-poly isometric terrain — a world. */
    case 'terrain': {
      const tiles: { x: number; y: number; h: number }[] = []
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          tiles.push({
            x: 200 + (c - r) * 34,
            y: 60 + (c + r) * 17,
            h: 6 + ((r * 7 + c * 5) % 4) * 9,
          })
        }
      }
      return (
        <svg {...common}>
          {tiles.map((t, i) => (
            <g key={i}>
              <path
                d={`M${t.x} ${t.y - t.h} l34 17 l-34 17 l-34 -17 Z`}
                fill={`color-mix(in oklch, ${accent} ${16 + (t.h / 40) * 40}%, transparent)`}
                stroke={accent}
                strokeWidth={0.8}
                strokeOpacity={0.6}
              />
              <path
                d={`M${t.x - 34} ${t.y} l34 17 l0 ${t.h} l-34 -17 Z`}
                fill="currentColor"
                opacity={0.08}
              />
              <path
                d={`M${t.x + 34} ${t.y} l-34 17 l0 ${t.h} l34 -17 Z`}
                fill="currentColor"
                opacity={0.14}
              />
            </g>
          ))}
        </svg>
      )
    }

    /* Pool: table, balls and a computed bank shot. */
    case 'pool':
      return (
        <svg {...common}>
          <rect
            x={38}
            y={30}
            width={324}
            height={140}
            rx={12}
            fill={`color-mix(in oklch, ${accent} 12%, transparent)`}
            stroke={accent}
            strokeWidth={1.6}
          />
          {[
            [48, 40],
            [200, 38],
            [352, 40],
            [48, 160],
            [200, 162],
            [352, 160],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={7} fill="currentColor" opacity={0.22} />
          ))}
          {/* bank shot path */}
          <path
            d="M96 132 L286 52 L340 92"
            fill="none"
            stroke={accent}
            strokeWidth={1.8}
            strokeDasharray="5 5"
          />
          <circle cx={96} cy={132} r={9} fill="var(--background)" stroke={accent} strokeWidth={2} />
          <circle cx={286} cy={52} r={8} fill={accent} opacity={0.85} />
          <circle cx={168} cy={92} r={8} fill="currentColor" opacity={0.25} />
          <circle cx={232} cy={124} r={8} fill="currentColor" opacity={0.25} />
        </svg>
      )

    /* Isometric management/sim: stacked building blocks. */
    case 'iso': {
      const blocks = [
        { x: 140, y: 118, h: 46 },
        { x: 200, y: 148, h: 30 },
        { x: 260, y: 118, h: 58 },
        { x: 200, y: 88, h: 40 },
      ]
      return (
        <svg {...common}>
          {blocks.map((b, i) => (
            <g key={i}>
              <path
                d={`M${b.x} ${b.y - b.h} l30 15 l-30 15 l-30 -15 Z`}
                fill={`color-mix(in oklch, ${accent} 40%, transparent)`}
                stroke={accent}
                strokeWidth={1.2}
              />
              <path
                d={`M${b.x - 30} ${b.y} l30 15 l0 ${b.h} l-30 -15 Z`}
                fill="currentColor"
                opacity={0.1}
                stroke={accent}
                strokeOpacity={0.4}
                strokeWidth={1}
              />
              <path
                d={`M${b.x + 30} ${b.y} l-30 15 l0 ${b.h} l30 -15 Z`}
                fill="currentColor"
                opacity={0.18}
                stroke={accent}
                strokeOpacity={0.4}
                strokeWidth={1}
              />
            </g>
          ))}
        </svg>
      )
    }

    /* Sustainability: a declining footprint with a leaf. */
    case 'eco': {
      const bars = [92, 78, 64, 46, 34, 22]
      return (
        <svg {...common}>
          {bars.map((h, i) => (
            <rect
              key={i}
              x={54 + i * 40}
              y={162 - h}
              width={22}
              height={h}
              rx={4}
              fill={accent}
              opacity={0.65 - i * 0.07}
            />
          ))}
          <path
            d="M300 116 q42 -6 56 -48 q-58 -6 -70 30 q-6 20 14 18 Z"
            fill={`color-mix(in oklch, ${accent} 45%, transparent)`}
            stroke={accent}
            strokeWidth={1.4}
          />
          <path d="M356 68 q-34 24 -50 54" fill="none" stroke={accent} strokeWidth={1.4} />
        </svg>
      )
    }
  }
}

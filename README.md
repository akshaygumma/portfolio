# akshaygumma.dev — portfolio

Personal portfolio site. React + Vite + Tailwind CSS v4, with shadcn-style
components owned in-repo (`src/components/ui`) rather than pulled from a package.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
```

## Structure

```
src/
  data/projects.ts          ← all site content lives here (projects, skills, experience)
  components/
    background/             ← the animated background
      ParticleField.tsx     ← 3D point cloud, rotates toward the cursor
      Aurora.tsx            ← drifting colour fields with pointer parallax
      Background.tsx        ← composes both + dot grid + vignette
    sections/               ← Hero, Projects, Skills, Experience, Footer
    ui/                     ← Button, Card, Badge, SpotlightCard
    ProjectCover.tsx        ← generated per-project cover art
```

**Content edits go in `src/data/projects.ts`** — nothing else needs touching to
add a project, change a bullet, or reorder sections.

## Swapping in real screenshots

Every project renders generated SVG line art as its cover. To use a real image
instead, drop the file in `public/covers/` and set `image` on that project:

```ts
{
  slug: 'faeterra',
  image: '/covers/faeterra.png',   // ← overrides the generated art
  ...
}
```

Covers display at `16:7` on cards and `21:6` on the flagship, so roughly
**1200×525** and **1260×360** respectively. Anything larger is fine — they're
rendered with `object-fit: cover`.

## Adding a project

Append to `projects` in `src/data/projects.ts`:

- `kind` — `'flagship' | 'game' | 'tool' | 'other'`, decides which section it lands in
- `stats` / `loop` — flagship only: HUD stat row and core-loop strip
- `art` — which generated cover to draw (`pipeline`, `neural`, `chart`,
  `vision`, `terrain`, `pool`, `iso`, `eco`)
- `accent` — pick from `ACCENTS`; drives the cover, glow, badges and hover state
- `status` — optional pill, e.g. `'In development'`

## Notes

- The particle field and aurora both honour `prefers-reduced-motion` and pause
  while the tab is hidden.
- Theme is stored in `localStorage` and falls back to the OS preference.

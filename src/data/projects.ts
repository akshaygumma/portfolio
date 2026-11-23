export type ArtKind =
  | 'pipeline'
  | 'neural'
  | 'chart'
  | 'vision'
  | 'terrain'
  | 'battler'
  | 'pool'
  | 'iso'
  | 'eco'

/**
 * - `flagship` — the big featured card at the top
 * - `game`     — shipped / in-development games
 * - `tool`     — game AI & tooling projects
 * - `other`    — non-game work, shown compactly at the bottom
 */
export type ProjectKind = 'flagship' | 'game' | 'tool' | 'other'

export interface Project {
  slug: string
  name: string
  tagline: string
  description: string
  tech: string[]
  bullets: string[]
  links: { label: string; href: string }[]
  kind: ProjectKind
  /** Drives the generated cover art. */
  art: ArtKind
  /** Hex/CSS colour used for the cover, glow and badges. */
  accent: string
  /** Optional real screenshot — drop a file in `public/covers/` and set the
   *  path here (e.g. '/covers/faeterra.png') to replace the generated art. */
  image?: string
  /** Optional status pill, e.g. 'In development'. */
  status?: string
  /** Flagship only: headline numbers shown as a HUD-style stat row. */
  stats?: { value: string; label: string }[]
  /** Flagship only: the core gameplay loop, drawn as a step strip. */
  loop?: string[]
}

export const ACCENTS = {
  violet: '#8b5cf6',
  cyan: '#06b6d4',
  blue: '#3b82f6',
  rose: '#f43f5e',
  indigo: '#6366f1',
  emerald: '#10b981',
  amber: '#f59e0b',
  teal: '#14b8a6',
} as const

export const projects: Project[] = [
  /* ---------------- Flagship ---------------- */
  {
    slug: 'faeterra',
    name: 'FaeTerra',
    tagline: 'PvP creature-collecting auto-battler · Steam',
    description:
      'A free-to-play PvP auto-battler on Steam: players collect and evolve 121 creatures across 13 elemental types, build a team, and battle asynchronously in ranked and casual matches. Released May 2025. Contributed as part of the outsourced team at Juego Studios.',
    tech: ['Unity', 'C#', 'PC / Steam', 'Async multiplayer'],
    bullets: [
      'Built core gameplay systems — creature collection and evolution, team composition, and elemental matchup resolution.',
      'Implemented asynchronous PvP and its supporting backend: matchmaking, ranked progression and state synchronization.',
      'Developed player-facing UI across collection, deck building and match flow, plus internal tooling used by the team.',
      'Optimized runtime performance and memory for target PC hardware through to release.',
    ],
    links: [{ label: 'Play on Steam', href: 'https://store.steampowered.com/app/3011470/FaeTerra/' }],
    kind: 'flagship',
    art: 'battler',
    accent: ACCENTS.indigo,
    stats: [
      { value: '121', label: 'Creatures' },
      { value: '13', label: 'Elemental types' },
      { value: 'PvP', label: 'Ranked & casual' },
      { value: 'May 2025', label: 'Released' },
    ],
    loop: ['Collect', 'Evolve', 'Build team', 'Battle', 'Climb ranks'],
  },

  /* ---------------- Games ----------------
   * TODO: add store links where they exist —
   * { label: 'Google Play', href: '...' }
   */
  {
    slug: 'multiplayer-pool',
    name: 'AI-Driven Multiplayer Pool',
    tagline: 'Adaptive shot-analysis AI + real-time multiplayer',
    description:
      'A multiplayer pool game with an AI opponent that evaluates direct, indirect, kick, and bank shots, tuned by difficulty to simulate human-like play.',
    tech: ['Unity', 'C#', 'Firebase', 'Agora SDK', 'Unity Sentis', 'Unity ML-Agents'],
    bullets: [
      'Built adaptive shot-analysis AI (direct / indirect / kick / bank evaluation) with difficulty-based behavioural tuning to simulate human-like play.',
      'Designed real-time multiplayer synchronization and voice/video communication for concurrent players.',
    ],
    links: [],
    kind: 'game',
    art: 'pool',
    accent: ACCENTS.emerald,
    status: 'In development',
  },
  {
    slug: 'ultimate-cafe-franchise',
    name: 'Ultimate Cafe Franchise',
    tagline: 'Mobile management simulation',
    description:
      'A released mobile management simulation where players build and expand a cafe business. Developed at Juego Studios.',
    tech: ['Unity', 'C#', 'Mobile'],
    bullets: [
      'Developed gameplay and progression systems on a modular, pattern-based architecture.',
      'Optimized runtime performance and memory for a broad range of mobile devices.',
    ],
    links: [],
    kind: 'game',
    art: 'iso',
    accent: ACCENTS.amber,
    status: 'Released',
  },
  {
    slug: 'lifestyle-vs-carbon-footprints',
    name: 'Lifestyle vs Carbon Footprints',
    tagline: 'Mobile game on sustainability',
    description:
      'A released mobile game that models how everyday lifestyle choices translate into carbon footprint outcomes. Developed at Juego Studios.',
    tech: ['Unity', 'C#', 'Mobile'],
    bullets: [
      'Implemented the simulation and scoring systems mapping player choices to footprint outcomes.',
      'Built the UI and data presentation layer for the mobile release.',
    ],
    links: [],
    kind: 'game',
    art: 'eco',
    accent: ACCENTS.teal,
    status: 'Released',
  },

  /* ---------------- Game AI & tools ---------------- */
  {
    slug: 'gaeon-ai',
    name: 'Gaeon AI',
    tagline: 'AI game-generation platform for Unity',
    description:
      'An autonomous multi-agent platform that turns a plain-English game idea into a compiling Unity project — planning the architecture, generating C# scripts, wiring the scene and self-repairing compile errors, then shipping WebGL builds through CI.',
    tech: ['Unity 6', 'C#', 'Roslyn / .NET', 'Python', 'LangGraph', 'pgvector', 'GameCI'],
    bullets: [
      'Built a Roslyn compile gate that validates generated C# against Unity assemblies in ~2s, versus ~2 minutes for a full Unity Editor round-trip, with a self-repair loop proven on a real project: 11 compile errors to 0.',
      'Designed a composition-manifest system so scene wiring is executed by a real Unity Editor script instead of LLM-authored code; solved headless Unity 6 CI licensing to ship automated WebGL builds via GitHub Actions + GameCI.',
      'Architected a multi-agent LangGraph pipeline — elicit → plan → task-decompose → generate → compose → compile → repair — backed by RAG over a curated Unity component library.',
    ],
    links: [
      { label: 'Live site', href: 'https://gaeon.in' },
      { label: 'GitHub', href: 'https://github.com/akshaygumma/gamedev-ai-assistant' },
    ],
    kind: 'tool',
    art: 'pipeline',
    accent: ACCENTS.violet,
  },

  /* ---------------- Other work (AI / ML) ---------------- */
  {
    slug: 'ml-pipeline',
    name: 'Reproducible ML Pipeline',
    tagline: 'DVC + MLflow, end to end',
    description:
      'A fully reproducible ML pipeline — preprocess, train, evaluate — orchestrated as DVC stages and re-runnable with a single command.',
    tech: ['Python', 'scikit-learn', 'DVC', 'MLflow'],
    bullets: [],
    links: [{ label: 'GitHub', href: 'https://github.com/akshaygumma/diabetes-mlops-pipeline' }],
    kind: 'other',
    art: 'chart',
    accent: ACCENTS.cyan,
  },
  {
    slug: 'ann-regression',
    name: 'ANN Regression',
    tagline: 'MLflow registry, serving & Docker',
    description:
      'A Keras ANN for regression with Hyperopt-tuned hyperparameters, an MLflow model registry, and a containerized REST serving endpoint.',
    tech: ['Python', 'Keras', 'MLflow', 'Docker'],
    bullets: [],
    links: [{ label: 'GitHub', href: 'https://github.com/akshaygumma/mlflow-deep-learning' }],
    kind: 'other',
    art: 'neural',
    accent: ACCENTS.blue,
  },
  {
    slug: 'snake-bite-classification',
    name: 'Snake-Bite Classification',
    tagline: 'MobileNetV2 transfer learning',
    description:
      'A transfer-learning classifier over snake bite-mark images. Awarded KSCST government research funding (2022–23).',
    tech: ['TensorFlow', 'Keras', 'Computer Vision'],
    bullets: [],
    links: [],
    kind: 'other',
    art: 'vision',
    accent: ACCENTS.rose,
  },
]

export const skills = [
  {
    category: 'Engine & Gameplay',
    accent: ACCENTS.indigo,
    items: [
      'Unity',
      'C#',
      'C++',
      'Gameplay systems',
      'Progression & economy',
      'Game UI',
      'Editor tooling',
    ],
  },
  {
    category: 'Game AI',
    accent: ACCENTS.emerald,
    items: [
      'State machines',
      'Rule-based AI',
      'NPC decision-making',
      'Unity ML-Agents',
      'Unity Sentis',
      'Difficulty tuning',
    ],
  },
  {
    category: 'Multiplayer & Backend',
    accent: ACCENTS.cyan,
    items: ['Async PvP', 'Matchmaking', 'Real-time sync', 'Firebase', 'Agora (voice/video)'],
  },
  {
    category: 'Architecture',
    accent: ACCENTS.amber,
    items: ['MVC', 'State', 'Strategy', 'Factory', 'Modular systems', 'Performance & memory'],
  },
  {
    category: 'Platforms & Build',
    accent: ACCENTS.blue,
    items: ['PC / Steam', 'Android / iOS', 'WebGL', 'GameCI', 'GitHub Actions'],
  },
  {
    category: 'AI-Assisted Dev',
    accent: ACCENTS.violet,
    items: ['Roslyn', 'Python', 'LangGraph', 'RAG', 'LLM tooling', 'FastAPI'],
  },
]

export const experience = {
  role: 'Game Developer (Software Engineer)',
  company: 'Juego Studios Pvt Ltd',
  period: 'Aug 2023 — Present',
  bullets: [
    'Own end-to-end feature development — architecture, implementation, optimization, deployment — for Unity games on mobile and PC, including the Steam release of FaeTerra.',
    'Built intelligent agent-behaviour systems (state machines, rule-based AI, Unity ML-Agents) for human-like NPC decision-making.',
    'Engineered real-time networking, sync, and voice/video (Firebase, Agora) for multiplayer experiences reaching 1000 users.',
    'Designed modular, pattern-based architectures (MVC, Strategy, Factory, State) for extensible gameplay systems.',
    'Optimized runtime performance and memory across a broad range of mobile and PC hardware.',
    'Prototyped AI-assisted workflows with Unity Sentis (on-device neural inference) and generative-AI tooling.',
  ],
}

export const achievements = [
  'Shipped on Steam — FaeTerra (2025)',
  '100xEngineers Generative AI Hackathon (2024)',
  'KSCST government research funding (2022–23)',
]

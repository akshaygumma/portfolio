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

export type ProjectKind = 'flagship' | 'ml' | 'game'

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
   *  path here (e.g. '/covers/gaeon.png') to replace the generated art. */
  image?: string
  /** Optional status pill, e.g. 'In development'. */
  status?: string
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
  {
    slug: 'gaeon-ai',
    name: 'Gaeon AI',
    tagline: 'Agentic game-generation platform',
    description:
      'An autonomous agent that plans, decomposes, generates, compiles, and self-repairs software from a plain-English prompt, targeting Unity as the runtime. The platform acts as an AI technical lead; the LLM is the senior engineer it manages.',
    tech: [
      'Python',
      'LangGraph',
      'FastAPI',
      'pgvector',
      'Groq / Gemini',
      'Roslyn / .NET',
      'Unity 6',
      'GitHub Actions',
    ],
    bullets: [
      'Architected a multi-agent LangGraph pipeline — elicit → plan → task-decompose → generate → compose → compile → repair — with resumable, checkpointed state.',
      'Built a dual-RAG layer over a pgvector store: the project’s own generated code and a shared, curated Unity component library, so later agents extend prior work instead of regenerating it.',
      'Engineered provider-agnostic, schema-constrained LLM output (Groq/Gemini/OpenRouter) with JSON-mode + a repair-tolerant parser, eliminating a class of malformed-output failures.',
      'Built a Roslyn compile gate that validates generated C# against Unity assemblies in ~2s, versus ~2 minutes for a full Unity Editor round-trip.',
      'Implemented a self-repair loop that feeds compiler errors back to the model, regenerates only the broken file, and recompiles — proven on a real project: 11 compile errors to 0.',
      'Solved headless Unity 6 CI licensing — no documented path exists for entitlement licensing — by driving Unity.Licensing.Client directly, then shipped automated, green WebGL builds via GitHub Actions + GameCI.',
      'Designed a composition-manifest system so scene wiring is executed by a real Unity Editor script instead of LLM-authored code, structurally eliminating hallucinated API calls for that task class.',
    ],
    links: [
      { label: 'Live site', href: 'https://gaeon.in' },
      { label: 'GitHub', href: 'https://github.com/akshaygumma/gamedev-ai-assistant' },
    ],
    kind: 'flagship',
    art: 'pipeline',
    accent: ACCENTS.violet,
  },

  /* ---------------- AI / ML ---------------- */
  {
    slug: 'ml-pipeline',
    name: 'Reproducible ML Pipeline',
    tagline: 'DVC + MLflow, end to end',
    description:
      'A fully reproducible ML pipeline — preprocess, train, evaluate — orchestrated as DVC stages and re-runnable with a single command.',
    tech: ['Python', 'scikit-learn', 'DVC', 'MLflow', 'DagsHub'],
    bullets: [
      'Versioned datasets, models, and pipelines with DVC; tracked parameters, metrics, and artifacts in MLflow.',
      'Collaborated via DagsHub remote storage and a hosted MLflow UI.',
      'Trained and evaluated a Random Forest classifier with tracked hyperparameters, applying MLOps best practices for reproducibility.',
    ],
    links: [
      { label: 'DagsHub', href: 'https://dagshub.com/akshaygumma/ml-pipeline' },
      { label: 'GitHub', href: 'https://github.com/akshaygumma/diabetes-mlops-pipeline' },
    ],
    kind: 'ml',
    art: 'chart',
    accent: ACCENTS.cyan,
  },
  {
    slug: 'ann-regression',
    name: 'ANN Regression',
    tagline: 'MLflow registry, serving & Docker',
    description:
      'A Keras ANN for regression with tuned hyperparameters, tracked experiments, and a containerized production-style serving endpoint.',
    tech: ['Python', 'Keras', 'scikit-learn', 'MLflow', 'Hyperopt', 'Docker'],
    bullets: [
      'Tuned learning rate and momentum via Hyperopt (TPE); tracked experiments in MLflow.',
      'Registered the best model to the MLflow Model Registry and served it as a REST API.',
      'Containerized the serving endpoint with Docker for scalable, production-style deployment.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/akshaygumma/mlflow-deep-learning' }],
    kind: 'ml',
    art: 'neural',
    accent: ACCENTS.blue,
  },
  {
    slug: 'snake-bite-classification',
    name: 'Snake-Bite Classification',
    tagline: 'MobileNetV2 transfer learning',
    description:
      'A transfer-learning classifier over snake bite-mark images, built with a preprocessing and augmentation pipeline. Awarded KSCST government research funding.',
    tech: ['TensorFlow', 'Keras', 'CNN', 'Computer Vision'],
    bullets: [
      'Built a transfer-learning classifier over bite-mark images with preprocessing and augmentation.',
      'Awarded KSCST government research funding (2022–23).',
    ],
    links: [],
    kind: 'ml',
    art: 'vision',
    accent: ACCENTS.rose,
  },

  /* ---------------- Shipped games ----------------
   * NOTE: the copy below is deliberately minimal — it only states what is
   * known for certain. Replace each `description`/`bullets` with the real
   * genre, your specific role, platform and any launch numbers, and add
   * store links where they exist.
   */
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
    links: [{ label: 'Steam', href: 'https://store.steampowered.com/app/3011470/FaeTerra/' }],
    kind: 'game',
    art: 'battler',
    accent: ACCENTS.indigo,
  },
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
    // TODO: add the store link — { label: 'Google Play', href: '...' }
    links: [],
    kind: 'game',
    art: 'iso',
    accent: ACCENTS.amber,
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
    // TODO: add the store link — { label: 'Google Play', href: '...' }
    links: [],
    kind: 'game',
    art: 'eco',
    accent: ACCENTS.teal,
  },
]

export const skills = [
  {
    category: 'Agentic AI & LLMs',
    accent: ACCENTS.violet,
    items: [
      'LangGraph',
      'Multi-agent orchestration',
      'RAG',
      'Prompt engineering',
      'Structured outputs / tool use',
      'LLM evals',
      'Groq',
      'Gemini',
      'OpenAI APIs',
    ],
  },
  {
    category: 'Retrieval & Data',
    accent: ACCENTS.cyan,
    items: ['pgvector', 'sentence-transformers', 'PostgreSQL', 'Supabase', 'Semantic search'],
  },
  {
    category: 'Backend & Infra',
    accent: ACCENTS.blue,
    items: ['Python', 'FastAPI', 'REST APIs', 'Async', 'Docker', 'GitHub Actions (CI/CD)'],
  },
  {
    category: 'Languages',
    accent: ACCENTS.emerald,
    items: ['Python', 'C#', 'C++', 'SQL'],
  },
  {
    category: 'MLOps',
    accent: ACCENTS.amber,
    items: ['MLflow', 'DVC', 'DagsHub', 'Hyperopt', 'Experiment tracking', 'Model versioning'],
  },
  {
    category: 'Game & Realtime',
    accent: ACCENTS.indigo,
    items: ['Unity', 'Unity ML-Agents', 'Unity Sentis', 'Firebase', 'Agora', 'Multiplayer sync'],
  },
]

export const experience = {
  role: 'Software Engineer',
  company: 'Juego Studios Pvt Ltd',
  period: 'Aug 2023 — Present',
  bullets: [
    'Own end-to-end feature development — architecture, implementation, optimization, deployment — for real-time apps on mobile and PC (C#, Unity).',
    'Built intelligent agent-behavior systems (state machines, rule-based AI, Unity ML-Agents) for human-like NPC decision-making.',
    'Prototyped AI-assisted workflows with Unity Sentis (on-device neural inference) and generative-AI tooling for rapid experimentation.',
    'Designed modular, pattern-based architectures (MVC, Strategy, Factory, State) for extensible systems.',
    'Engineered real-time networking, sync, and voice/video (Firebase, Agora) for multiplayer experiences reaching 1000 users.',
    'Optimized runtime performance and memory across platforms.',
  ],
}

export const achievements = [
  'KSCST government research funding — Snake-Bite Classification (2022–23)',
  '100xEngineers Generative AI Hackathon (2024)',
]

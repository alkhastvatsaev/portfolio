/**
 * Single source of truth for every number shown on the home page.
 *
 * Measured on 2026-11-21 with the GitHub API (all non-empty product repos,
 * archives / backups excluded) and an HTTP check of every live URL.
 * Update this file when the numbers change — nothing else hardcodes them.
 *
 *   commits      → GET /repos/:repo/commits (paginated), summed
 *   liveApps     → homepage URLs answering HTTP 200
 *   testFiles    → files matching *.test.* / *.spec.* / test_*.py
 *   e2eSuites    → Playwright spec files under e2e/ or playwright/
 *   ciWorkflows  → files under .github/workflows
 *   linesOfCode  → TS/TSX/JS/Swift/Python/SQL/CSS, dependencies excluded
 *   activeDays   → distinct days with at least one commit
 *   medianDays   → median active days per project (33 projects)
 */
export const measuredOn = "2026-11-21";

export const metrics = {
  commits: 2278,
  projects: 33,
  liveApps: 23,
  testFiles: 783,
  e2eSuites: 38,
  ciWorkflows: 34,
  linesOfCode: 566_000,
  months: 10,
  activeDays: 119,
  commitsPerActiveDay: 19,
  medianDaysToShip: 2,
  jewelryMonths: 20,
} as const;

export type MonthActivity = {
  month: string; // YYYY-MM
  commits: number;
  topProject: string;
};

export const commitsByMonth: readonly MonthActivity[] = [
  { month: "2026-02", commits: 159, topProject: "Hopla" },
  { month: "2026-03", commits: 67, topProject: "Serrurerie" },
  { month: "2026-04", commits: 378, topProject: "Waynakh" },
  { month: "2026-05", commits: 104, topProject: "NOTA" },
  { month: "2026-06", commits: 539, topProject: "NOTA" },
  { month: "2026-07", commits: 358, topProject: "NOTA" },
  { month: "2026-08", commits: 300, topProject: "Tilmidh" },
  { month: "2026-09", commits: 3, topProject: "Meridian" },
  { month: "2026-10", commits: 142, topProject: "Alkhast Homes" },
  { month: "2026-11", commits: 228, topProject: "SHMOT" },
];

export type ShowcaseCategory = "ai" | "saas" | "mobile" | "3d" | "web";

export type ShowcaseProject = {
  id: string;
  name: string;
  categories: readonly ShowcaseCategory[];
  tagline: { en: string; fr: string };
  commits: number;
  activeDays: number;
  testFiles: number;
  stack: readonly string[];
  live?: string;
  source?: string;
  /** Existing case-study slug under /projects and /fr/projets. */
  caseStudy?: string;
  image?: string;
  isPrivate?: boolean;
};

export const showcase: readonly ShowcaseProject[] = [
  {
    id: "nota",
    name: "NOTA",
    categories: ["saas", "ai", "mobile"],
    tagline: {
      en: "Field-service SaaS: dispatch map, technician app, billing, 9 AI modules.",
      fr: "SaaS d'interventions terrain : carte de dispatch, appli technicien, facturation, 9 modules IA.",
    },
    commits: 819,
    activeDays: 39,
    testFiles: 630,
    stack: ["Next.js", "Firebase", "Stripe", "Mapbox", "OpenAI", "Capacitor"],
    live: "https://heynota.app",
    caseStudy: "nota-crm",
    image: "/cards/nota.jpg",
  },
  {
    id: "shmot",
    name: "SHMOT",
    categories: ["mobile", "ai", "saas"],
    tagline: {
      en: "Video-first fashion resale: native iPhone app, recommendation engine, image AI.",
      fr: "Revente de mode « vidéo d'abord » : appli iPhone native, moteur de recommandation, IA d'images.",
    },
    commits: 226,
    activeDays: 10,
    testFiles: 49,
    stack: ["Swift", "Next.js", "PostgreSQL", "pgvector", "Python"],
    live: "https://shmot-chi.vercel.app",
    image: "/cards/shmot.jpg",
    isPrivate: true,
  },
  {
    id: "luxefinder",
    name: "LuxeFinder",
    categories: ["ai", "web"],
    tagline: {
      en: "Photo of a luxury bag + budget → matching sellers and offers.",
      fr: "Photo d'un sac de luxe + budget → vendeurs et offres correspondants.",
    },
    commits: 78,
    activeDays: 5,
    testFiles: 0,
    stack: ["Next.js", "TypeScript", "Vision AI", "SEO"],
    live: "https://luxefinder.app",
    source: "https://github.com/alkhastvatsaev/luxefinder",
    image: "/cards/luxefinder.jpg",
  },
  {
    id: "aurelia",
    name: "Atelier Aurelia",
    categories: ["3d", "web"],
    tagline: {
      en: "3D ring configurator: metal, stone, carat, engraving, PNG export.",
      fr: "Configurateur de bague 3D : métal, pierre, carats, gravure, export PNG.",
    },
    commits: 20,
    activeDays: 3,
    testFiles: 4,
    stack: ["React", "Three.js", "React Three Fiber"],
    live: "https://atelier-aurelia-ring.vercel.app",
    source: "https://github.com/alkhastvatsaev/atelier-aurelia-ring",
    caseStudy: "atelier-aurelia",
    image: "/cards/aurelia.jpg",
  },
  {
    id: "seo-copilot",
    name: "SEO Copilot",
    categories: ["ai", "saas"],
    tagline: {
      en: "Technical homepage audit with AI-generated fixes.",
      fr: "Audit technique de page d'accueil avec corrections générées par IA.",
    },
    commits: 13,
    activeDays: 2,
    testFiles: 12,
    stack: ["Next.js", "Vercel AI SDK"],
    live: "https://seo-copilot-lovat.vercel.app",
    source: "https://github.com/alkhastvatsaev/seo-copilot",
    image: "/cards/seo-copilot.jpg",
  },
  {
    id: "call-coach",
    name: "Call Coach",
    categories: ["ai", "saas"],
    tagline: {
      en: "Cold-call analysis SaaS: instant AI feedback for solo sales reps.",
      fr: "SaaS d'analyse d'appels de prospection : retour IA immédiat.",
    },
    commits: 8,
    activeDays: 2,
    testFiles: 11,
    stack: ["Next.js", "Vercel AI SDK", "Resend"],
    live: "https://call-coach-phi.vercel.app",
    image: "/cards/call-coach.jpg",
    isPrivate: true,
  },
  {
    id: "alkhast-homes",
    name: "Alkhast Homes",
    categories: ["ai", "mobile"],
    tagline: {
      en: "Real-estate agent toolkit: Telegram engine, bot, Mini App and Mac app.",
      fr: "Outils d'agent immobilier : moteur Telegram, bot, Mini App et appli Mac.",
    },
    commits: 142,
    activeDays: 9,
    testFiles: 18,
    stack: ["Python", "Telegram", "Swift"],
    isPrivate: true,
  },
  {
    id: "waynakh",
    name: "Waynakh",
    categories: ["web"],
    tagline: {
      en: "Diaspora map and directory, mobile-first, with Leaflet maps.",
      fr: "Carte et annuaire de diaspora, pensé mobile, avec cartes Leaflet.",
    },
    commits: 166,
    activeDays: 7,
    testFiles: 8,
    stack: ["Next.js", "Firebase", "Leaflet"],
    live: "https://waynakh.vercel.app",
    source: "https://github.com/alkhastvatsaev/ChechenDiaspora",
    image: "/cards/waynakh.jpg",
  },
  {
    id: "tilmidh",
    name: "Tilmidh",
    categories: ["ai", "web"],
    tagline: {
      en: "Word-by-word Quran recitation trainer: the microphone checks each word.",
      fr: "Entraîneur de récitation mot à mot : le micro vérifie chaque mot.",
    },
    commits: 191,
    activeDays: 12,
    testFiles: 0,
    stack: ["JavaScript", "Speech API", "PWA"],
    live: "https://tajwid-app-vatsaev.vercel.app",
    source: "https://github.com/alkhastvatsaev/tilmidh",
    image: "/cards/tilmidh.jpg",
  },
  {
    id: "reach",
    name: "Reach Logistics",
    categories: ["saas", "mobile"],
    tagline: {
      en: "Logistics PWA: supplier quotes, QC, payments, PDF proposals, tracking.",
      fr: "PWA logistique : devis fournisseurs, contrôle qualité, paiements, PDF, suivi.",
    },
    commits: 119,
    activeDays: 7,
    testFiles: 5,
    stack: ["Next.js", "TypeScript", "PWA"],
    live: "https://reach-logistics.vercel.app",
    source: "https://github.com/alkhastvatsaev/logistic",
    caseStudy: "logis-2030",
  },
  {
    id: "hopla",
    name: "Hopla",
    categories: ["saas", "mobile"],
    tagline: {
      en: "Neighbourhood delivery marketplace with Stripe payments.",
      fr: "Marketplace de livraison de quartier avec paiements Stripe.",
    },
    commits: 71,
    activeDays: 8,
    testFiles: 1,
    stack: ["Next.js", "Firebase", "Stripe"],
    live: "https://hopla-one.vercel.app",
    source: "https://github.com/alkhastvatsaev/hopla",
    caseStudy: "hopla",
    image: "/cards/hopla.jpg",
  },
  {
    id: "serrure",
    name: "Serrurerie Ops",
    categories: ["saas"],
    tagline: {
      en: "Locksmith operations dashboard: jobs, technicians, follow-up.",
      fr: "Tableau de bord pour serrurerie : interventions, techniciens, suivi.",
    },
    commits: 50,
    activeDays: 8,
    testFiles: 7,
    stack: ["Next.js", "Firebase", "Zustand"],
    live: "https://serrure.vercel.app",
    source: "https://github.com/alkhastvatsaev/Serrurerie-Alsacienne",
    caseStudy: "serrurerie-pro",
    image: "/cards/serrure.jpg",
  },
  {
    id: "sadaqah",
    name: "Sadaqah",
    categories: ["saas"],
    tagline: {
      en: "Mosque donation app with Stripe Connect and e-mail receipts.",
      fr: "Appli de dons pour mosquée avec Stripe Connect et reçus par e-mail.",
    },
    commits: 50,
    activeDays: 6,
    testFiles: 1,
    stack: ["Next.js", "Stripe Connect", "Resend"],
    live: "https://sadaqah-mosque-ruddy.vercel.app",
    source: "https://github.com/alkhastvatsaev/sadaqah",
    image: "/cards/sadaqah.jpg",
  },
  {
    id: "drhoney",
    name: "Dr Honey",
    categories: ["web"],
    tagline: {
      en: "Multilingual, SEO-first storefront for a honey business in Amman.",
      fr: "Vitrine multilingue optimisée SEO pour un vendeur de miel à Amman.",
    },
    commits: 51,
    activeDays: 7,
    testFiles: 11,
    stack: ["HTML", "SEO", "i18n"],
    live: "https://drhoney.vercel.app",
    source: "https://github.com/alkhastvatsaev/drhoney",
    image: "/cards/drhoney.jpg",
  },
  {
    id: "dua",
    name: "DUA",
    categories: ["mobile", "web"],
    tagline: {
      en: "Installable app of authentic duas, built and shipped in 2 days.",
      fr: "Appli installable de duas authentiques, construite et en ligne en 2 jours.",
    },
    commits: 10,
    activeDays: 2,
    testFiles: 5,
    stack: ["Next.js", "PWA"],
    live: "https://dua-pi.vercel.app",
    source: "https://github.com/alkhastvatsaev/DUA",
    image: "/cards/dua.jpg",
  },
  {
    id: "moon",
    name: "Moon",
    categories: ["ai", "3d"],
    tagline: {
      en: "Open-source macOS screen recorder: webcam bubble, MediaPipe blur, MP4 export.",
      fr: "Enregistreur d'écran macOS open source : bulle webcam, flou MediaPipe, export MP4.",
    },
    commits: 1,
    activeDays: 1,
    testFiles: 0,
    stack: ["Electron", "React", "MediaPipe"],
    source: "https://github.com/alkhastvatsaev/moon",
  },
];

/** Screenshots used by the scanner card stream (real live apps). */
export const scannerCards = showcase
  .filter((project) => project.image)
  .map((project) => ({ src: project.image as string, label: project.name }));

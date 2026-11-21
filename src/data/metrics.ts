/**
 * Single source of truth for every number on the site.
 *
 * Measured on 2026-11-21 with the GitHub API (all non-empty product repos,
 * archives / backups excluded) and an HTTP check of every live URL.
 *
 *   commits      → GET /repos/:repo/commits (paginated), summed
 *   liveApps     → homepage URLs answering HTTP 200
 *   testFiles    → files matching *.test.* / *.spec.* / test_*.py
 *   e2eSuites    → Playwright spec files
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
  recordDay: 122,
  medianDaysToShip: 2,
  jewelryMonths: 20,
  languages: 3,
} as const;

export type Localized = { fr: string; en: string };
export type LocalizedList = { fr: readonly string[]; en: readonly string[] };

export type MonthActivity = { month: string; commits: number; topProject: string };

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

export type Category = "ai" | "saas" | "mobile" | "3d" | "web";

export type Project = {
  slug: string;
  name: string;
  year: string;
  categories: readonly Category[];
  tagline: Localized;
  details: LocalizedList;
  commits: number;
  activeDays: number;
  testFiles: number;
  /** First → last commit, ISO dates. */
  period: readonly [string, string];
  stack: readonly string[];
  live?: string;
  source?: string;
  image?: string;
  isPrivate?: boolean;
  featured?: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: "nota",
    name: "NOTA",
    year: "2026",
    featured: true,
    categories: ["saas", "ai", "mobile"],
    tagline: {
      fr: "SaaS d'interventions terrain : carte de dispatch, appli technicien, facturation, 9 modules IA.",
      en: "Field-service SaaS: dispatch map, technician app, invoicing, 9 AI modules.",
    },
    details: {
      fr: [
        "Carte des interventions en temps réel (Mapbox), appli technicien hors ligne, facturation Stripe liée aux interventions terminées.",
        "9 modules IA : chatbot client avec vision et voix, clôture d'intervention par transcription audio, dispatch assisté, création d'intervention depuis un e-mail.",
        "3 applis mobiles (technicien, client, admin) pour iOS et Android, interface en 4 langues (FR, EN, NL, RU).",
        "630 fichiers de tests, 26 suites Playwright et 17 workflows d'intégration continue qui bloquent toute mise en ligne cassée.",
      ],
      en: [
        "Live job map (Mapbox), offline technician app, Stripe invoicing tied to completed jobs.",
        "9 AI modules: customer chatbot with vision and voice, job closing by audio transcription, assisted dispatch, job creation from an e-mail.",
        "3 mobile apps (technician, client, admin) for iOS and Android, UI in 4 languages (FR, EN, NL, RU).",
        "630 test files, 26 Playwright suites and 17 CI workflows that block any broken release.",
      ],
    },
    commits: 819,
    activeDays: 39,
    testFiles: 630,
    period: ["2026-05-11", "2026-08-08"],
    stack: ["Next.js", "TypeScript", "Firebase", "Stripe", "Mapbox", "OpenAI", "Capacitor", "Playwright"],
    live: "https://heynota.app",
    image: "/cards/nota.jpg",
  },
  {
    slug: "shmot",
    name: "SHMOT",
    year: "2026",
    featured: true,
    categories: ["mobile", "ai", "saas"],
    tagline: {
      fr: "Revente de mode « vidéo d'abord » : appli iPhone native, moteur de recommandation, IA d'images.",
      en: "Video-first fashion resale: native iPhone app, recommendation engine, image AI.",
    },
    details: {
      fr: [
        "Appli iPhone native en Swift (844 fichiers, ≈ 57 000 lignes) et appli web installable.",
        "Moteur de recommandation qui apprend le style de chaque utilisateur à partir de ses actions.",
        "Service d'IA d'images (Python) pour la recherche visuelle, base PostgreSQL avec recherche vectorielle.",
        "Interface en russe, kazakh et anglais. 226 commits en 10 jours de travail.",
      ],
      en: [
        "Native iPhone app in Swift (844 files, ≈ 57,000 lines) plus an installable web app.",
        "Recommendation engine that learns each user's style from their actions.",
        "Image-AI service (Python) for visual search, PostgreSQL with vector search.",
        "UI in Russian, Kazakh and English. 226 commits in 10 working days.",
      ],
    },
    commits: 226,
    activeDays: 10,
    testFiles: 49,
    period: ["2026-11-04", "2026-11-20"],
    stack: ["Swift", "Next.js", "PostgreSQL", "pgvector", "Python"],
    live: "https://shmot-chi.vercel.app",
    image: "/cards/shmot.jpg",
    isPrivate: true,
  },
  {
    slug: "luxefinder",
    name: "LuxeFinder",
    year: "2026",
    featured: true,
    categories: ["ai", "web"],
    tagline: {
      fr: "Photo d'un sac de luxe + budget → vendeurs et offres correspondants.",
      en: "Photo of a luxury bag + budget → matching sellers and offers.",
    },
    details: {
      fr: [
        "Reconnaissance du modèle à partir d'une photo : vision par ordinateur, recadrages automatiques et base de modèles de luxe.",
        "Architecture SEO complète sur le même domaine : guides, pages marques et modèles, sitemap, llms.txt.",
        "78 commits en 5 jours de travail.",
      ],
      en: [
        "Model recognition from a photo: computer vision, automatic crops and a luxury model knowledge base.",
        "Full SEO architecture on one domain: guides, brand and model hubs, sitemap, llms.txt.",
        "78 commits in 5 working days.",
      ],
    },
    commits: 78,
    activeDays: 5,
    testFiles: 0,
    period: ["2026-08-05", "2026-08-10"],
    stack: ["Next.js", "TypeScript", "Google Vision", "SEO"],
    live: "https://luxefinder.app",
    source: "https://github.com/alkhastvatsaev/luxefinder",
    image: "/cards/luxefinder.jpg",
  },
  {
    slug: "atelier-aurelia",
    name: "Atelier Aurelia",
    year: "2026",
    featured: true,
    categories: ["3d", "web"],
    tagline: {
      fr: "Configurateur de bague 3D : métal, pierre, carats, gravure, export PNG.",
      en: "3D ring configurator: metal, stone, carat, engraving, PNG export.",
    },
    details: {
      fr: [
        "Le pont entre mes 20 mois en haute joaillerie et le code : une bague 3D configurable dans le navigateur.",
        "Choix du métal, de la pierre, de la taille et des carats, gravure, estimation, sauvegarde, partage et export PNG.",
        "Construit et mis en ligne en 3 jours de travail.",
      ],
      en: [
        "The bridge between my 20 months in high jewelry and code: a configurable 3D ring in the browser.",
        "Metal, stone, size and carat choice, engraving, estimate, save, share and PNG export.",
        "Built and shipped in 3 working days.",
      ],
    },
    commits: 20,
    activeDays: 3,
    testFiles: 4,
    period: ["2026-07-16", "2026-07-18"],
    stack: ["React", "Three.js", "React Three Fiber", "TypeScript"],
    live: "https://atelier-aurelia-ring.vercel.app",
    source: "https://github.com/alkhastvatsaev/atelier-aurelia-ring",
    image: "/cards/aurelia.jpg",
  },
  {
    slug: "call-coach",
    name: "Call Coach",
    year: "2026",
    categories: ["ai", "saas"],
    tagline: {
      fr: "SaaS d'analyse d'appels de prospection : transcription, métriques et coaching IA.",
      en: "Cold-call analysis SaaS: transcript, metrics and AI coaching.",
    },
    details: {
      fr: [
        "Enregistrement au micro ou envoi d'un fichier → transcription, métriques et conseils générés par IA.",
        "Comptes utilisateurs, tâches en arrière-plan, stockage des fichiers audio, base PostgreSQL.",
        "Construit en 2 jours de travail.",
      ],
      en: [
        "Record from the mic or upload a file → transcript, metrics and AI-generated coaching.",
        "User accounts, background jobs, audio storage, PostgreSQL.",
        "Built in 2 working days.",
      ],
    },
    commits: 8,
    activeDays: 2,
    testFiles: 11,
    period: ["2026-07-29", "2026-07-30"],
    stack: ["Next.js", "Vercel AI SDK", "PostgreSQL", "Drizzle", "Inngest"],
    live: "https://call-coach-phi.vercel.app",
    image: "/cards/call-coach.jpg",
    isPrivate: true,
  },
  {
    slug: "seo-copilot",
    name: "SEO Copilot",
    year: "2026",
    categories: ["ai", "saas"],
    tagline: {
      fr: "Audit technique d'une page d'accueil avec corrections générées par IA.",
      en: "Technical homepage audit with AI-generated fixes.",
    },
    details: {
      fr: [
        "On colle une adresse, l'outil analyse la page et propose des corrections concrètes.",
        "12 fichiers de tests, construit en 2 jours de travail.",
      ],
      en: [
        "Paste a URL, the tool audits the page and suggests concrete fixes.",
        "12 test files, built in 2 working days.",
      ],
    },
    commits: 13,
    activeDays: 2,
    testFiles: 12,
    period: ["2026-07-29", "2026-07-30"],
    stack: ["Next.js", "Vercel AI SDK", "TypeScript"],
    live: "https://seo-copilot-lovat.vercel.app",
    source: "https://github.com/alkhastvatsaev/seo-copilot",
    image: "/cards/seo-copilot.jpg",
  },
  {
    slug: "alkhast-homes",
    name: "Alkhast Homes",
    year: "2026",
    categories: ["ai", "mobile"],
    tagline: {
      fr: "Outils d'agent immobilier : moteur Telegram, bot, Mini App et appli Mac.",
      en: "Real-estate agent toolkit: Telegram engine, bot, Mini App and Mac app.",
    },
    details: {
      fr: [
        "Un moteur qui surveille les annonces et les envoie sur Telegram, avec un bot et une Mini App.",
        "Une appli Mac pour suivre les biens. 142 commits et 18 fichiers de tests en 9 jours de travail.",
      ],
      en: [
        "An engine that watches listings and pushes them to Telegram, with a bot and a Mini App.",
        "A Mac app to track properties. 142 commits and 18 test files in 9 working days.",
      ],
    },
    commits: 142,
    activeDays: 9,
    testFiles: 18,
    period: ["2026-10-17", "2026-10-29"],
    stack: ["Python", "Telegram", "Swift"],
    isPrivate: true,
  },
  {
    slug: "waynakh",
    name: "Waynakh",
    year: "2026",
    categories: ["web"],
    tagline: {
      fr: "Carte et annuaire de diaspora, pensé pour le téléphone.",
      en: "Mobile-first diaspora map and directory.",
    },
    details: {
      fr: [
        "Carte interactive (Leaflet) et annuaire, comptes et données sur Firebase.",
        "166 commits, 8 fichiers de tests dont 3 suites de bout en bout.",
      ],
      en: [
        "Interactive map (Leaflet) and directory, accounts and data on Firebase.",
        "166 commits, 8 test files including 3 end-to-end suites.",
      ],
    },
    commits: 166,
    activeDays: 7,
    testFiles: 8,
    period: ["2026-04-06", "2026-07-18"],
    stack: ["Next.js", "TypeScript", "Firebase", "Leaflet"],
    live: "https://waynakh.vercel.app",
    source: "https://github.com/alkhastvatsaev/ChechenDiaspora",
    image: "/cards/waynakh.jpg",
  },
  {
    slug: "tilmidh",
    name: "Tilmidh",
    year: "2026",
    categories: ["ai", "web"],
    tagline: {
      fr: "Entraîneur de récitation mot à mot : le micro vérifie chaque mot.",
      en: "Word-by-word recitation trainer: the microphone checks each word.",
    },
    details: {
      fr: [
        "Reconnaissance vocale dans le navigateur pour valider chaque mot récité.",
        "191 commits en 12 jours de travail.",
      ],
      en: [
        "In-browser speech recognition validates each recited word.",
        "191 commits in 12 working days.",
      ],
    },
    commits: 191,
    activeDays: 12,
    testFiles: 0,
    period: ["2026-02-19", "2026-08-19"],
    stack: ["JavaScript", "Speech API", "PWA"],
    live: "https://tajwid-app-vatsaev.vercel.app",
    source: "https://github.com/alkhastvatsaev/tilmidh",
    image: "/cards/tilmidh.jpg",
  },
  {
    slug: "reach-logistics",
    name: "Reach Logistics",
    year: "2026",
    categories: ["saas", "mobile"],
    tagline: {
      fr: "Appli logistique : devis fournisseurs, contrôle qualité, paiements, PDF, suivi.",
      en: "Logistics app: supplier quotes, QC, payments, PDF proposals, tracking.",
    },
    details: {
      fr: [
        "Devis fournisseurs, contrôle qualité, paiements, propositions PDF, partage par QR code et suivi des envois.",
        "119 commits en 7 jours de travail.",
      ],
      en: [
        "Supplier quotes, quality control, payments, PDF proposals, QR sharing and shipment tracking.",
        "119 commits in 7 working days.",
      ],
    },
    commits: 119,
    activeDays: 7,
    testFiles: 5,
    period: ["2026-04-21", "2026-07-18"],
    stack: ["Next.js", "TypeScript", "PWA"],
    live: "https://reach-logistics.vercel.app",
    source: "https://github.com/alkhastvatsaev/logistic",
  },
  {
    slug: "hopla",
    name: "Hopla",
    year: "2026",
    categories: ["saas", "mobile"],
    tagline: {
      fr: "Marketplace de livraison de quartier avec paiements Stripe.",
      en: "Neighbourhood delivery marketplace with Stripe payments.",
    },
    details: {
      fr: ["Commande, paiement Stripe et suivi, pensé pour le téléphone.", "71 commits en 8 jours de travail."],
      en: ["Ordering, Stripe payment and tracking, built mobile-first.", "71 commits in 8 working days."],
    },
    commits: 71,
    activeDays: 8,
    testFiles: 1,
    period: ["2026-02-16", "2026-07-18"],
    stack: ["Next.js", "Firebase", "Stripe"],
    live: "https://hopla-one.vercel.app",
    source: "https://github.com/alkhastvatsaev/hopla",
    image: "/cards/hopla.jpg",
  },
  {
    slug: "serrurerie",
    name: "Serrurerie Ops",
    year: "2026",
    categories: ["saas"],
    tagline: {
      fr: "Tableau de bord pour serrurerie : interventions, techniciens, suivi.",
      en: "Locksmith operations dashboard: jobs, technicians, follow-up.",
    },
    details: {
      fr: ["Le premier pas vers NOTA : gestion des interventions et des techniciens.", "50 commits, 7 fichiers de tests."],
      en: ["The first step toward NOTA: managing jobs and technicians.", "50 commits, 7 test files."],
    },
    commits: 50,
    activeDays: 8,
    testFiles: 7,
    period: ["2026-02-21", "2026-07-18"],
    stack: ["Next.js", "Firebase", "Zustand"],
    live: "https://serrure.vercel.app",
    source: "https://github.com/alkhastvatsaev/Serrurerie-Alsacienne",
    image: "/cards/serrure.jpg",
  },
  {
    slug: "sadaqah",
    name: "Sadaqah",
    year: "2026",
    categories: ["saas"],
    tagline: {
      fr: "Appli de dons pour mosquée avec Stripe Connect et reçus par e-mail.",
      en: "Mosque donation app with Stripe Connect and e-mail receipts.",
    },
    details: {
      fr: ["Paiements Stripe Connect et reçus envoyés automatiquement par e-mail.", "50 commits en 6 jours de travail."],
      en: ["Stripe Connect payments and automatic e-mail receipts.", "50 commits in 6 working days."],
    },
    commits: 50,
    activeDays: 6,
    testFiles: 1,
    period: ["2026-02-16", "2026-07-18"],
    stack: ["Next.js", "Stripe Connect", "Resend"],
    live: "https://sadaqah-mosque-ruddy.vercel.app",
    source: "https://github.com/alkhastvatsaev/sadaqah",
    image: "/cards/sadaqah.jpg",
  },
  {
    slug: "dr-honey",
    name: "Dr Honey",
    year: "2026",
    categories: ["web"],
    tagline: {
      fr: "Vitrine multilingue optimisée SEO pour un vendeur de miel à Amman.",
      en: "Multilingual, SEO-first storefront for a honey business in Amman.",
    },
    details: {
      fr: ["Site en plusieurs langues, pensé pour Google.", "51 commits, 11 fichiers de tests."],
      en: ["Multi-language site built for search engines.", "51 commits, 11 test files."],
    },
    commits: 51,
    activeDays: 7,
    testFiles: 11,
    period: ["2026-07-14", "2026-07-23"],
    stack: ["HTML", "SEO", "i18n"],
    live: "https://drhoney.vercel.app",
    source: "https://github.com/alkhastvatsaev/drhoney",
    image: "/cards/drhoney.jpg",
  },
  {
    slug: "dua",
    name: "DUA",
    year: "2026",
    categories: ["mobile", "web"],
    tagline: {
      fr: "Appli installable de duas authentiques, en ligne en 2 jours.",
      en: "Installable app of authentic duas, shipped in 2 days.",
    },
    details: {
      fr: ["Appli web installable sur le téléphone, fonctionne hors ligne.", "Construite et mise en ligne en 2 jours de travail."],
      en: ["Web app installable on the phone, works offline.", "Built and shipped in 2 working days."],
    },
    commits: 10,
    activeDays: 2,
    testFiles: 5,
    period: ["2026-07-30", "2026-07-31"],
    stack: ["Next.js", "PWA"],
    live: "https://dua-pi.vercel.app",
    source: "https://github.com/alkhastvatsaev/DUA",
    image: "/cards/dua.jpg",
  },
  {
    slug: "moon",
    name: "Moon",
    year: "2026",
    categories: ["ai"],
    tagline: {
      fr: "Enregistreur d'écran macOS open source : bulle webcam, flou par IA, export MP4.",
      en: "Open-source macOS screen recorder: webcam bubble, AI blur, MP4 export.",
    },
    details: {
      fr: ["Bulle webcam, flou d'arrière-plan en temps réel (MediaPipe), export MP4, tout en local.", "Appli de bureau Electron + React, code public."],
      en: ["Webcam bubble, real-time background blur (MediaPipe), MP4 export, fully local.", "Electron + React desktop app, open source."],
    },
    commits: 1,
    activeDays: 1,
    testFiles: 0,
    period: ["2026-07-22", "2026-07-22"],
    stack: ["Electron", "React", "MediaPipe"],
    source: "https://github.com/alkhastvatsaev/moon",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Screenshots used by the scanner card stream (real live apps). */
export const scannerCards = projects
  .filter((project) => project.image)
  .map((project) => ({ src: project.image as string, label: project.name }));

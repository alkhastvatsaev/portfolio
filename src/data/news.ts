export type NewsLink = {
  label: string;
  href: string;
};

export type NewsItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  locale: "fr" | "en";
  tags: readonly string[];
  links?: readonly NewsLink[];
  body: readonly { heading?: string; paragraphs: readonly string[] }[];
};

export const newsFr: readonly NewsItem[] = [
  {
    slug: "moon-v2-open-source",
    title: "Moon v2 — open source avec bulle webcam et contrôles Dynamic Island",
    description:
      "Mon screen recorder macOS perso passe en open source : flou MediaPipe, bulle déplaçable, export MP4, contrôles premium. Code sur GitHub.",
    date: "2026-07-22",
    locale: "fr",
    tags: ["Moon", "open source", "Electron", "macOS"],
    links: [
      {
        label: "Article détaillé",
        href: "/fr/articles/moon-mises-a-jour-open-source",
      },
      {
        label: "Code GitHub",
        href: "https://github.com/alkhastvatsaev/moon",
      },
    ],
    body: [
      {
        paragraphs: [
          "Moon, mon alternative perso à Loom pour macOS, vient de passer en v2 open source.",
          "Nouveautés : bulle webcam avec flou d’arrière-plan (MediaPipe), Dynamic Island avec pause / valider / supprimer / toggle flou, bulle visible dès le countdown et déplaçable, export MP4 auto, logo Moon dans la barre de menu.",
        ],
      },
      {
        heading: "Liens",
        paragraphs: [
          "GitHub : https://github.com/alkhastvatsaev/moon — article complet : /fr/articles/moon-mises-a-jour-open-source",
        ],
      },
    ],
  },
  {
    slug: "moon-screen-recorder-v1",
    title: "Moon — screen recorder macOS shippé en une journée",
    description:
      "Outil perso type Loom, local-first : Electron + React + TypeScript, capture écran/fenêtre, bulle webcam, micro, .webm.",
    date: "2026-07-21",
    locale: "fr",
    tags: ["Moon", "Electron", "macOS"],
    links: [
      {
        label: "Article détaillé",
        href: "/fr/articles/moon-screen-recorder-macos-electron",
      },
    ],
    body: [
      {
        paragraphs: [
          "Problème : je voulais un enregistreur d’écran macOS sans cloud ni UI imposée — fichiers locaux, contrôle total.",
          "Ce que j’ai shippé : Moon v1, app barre de menu. Capture plein écran ou fenêtre, bulle webcam live, micro, countdown 0/3/5s, sauvegarde .webm, contrôles type Dynamic Island (timer, pause, stop).",
        ],
      },
      {
        heading: "Stack",
        paragraphs: [
          "Electron · React · TypeScript · electron-vite · desktopCapturer · MediaRecorder · DMG (electron-builder).",
        ],
      },
      {
        heading: "Suite",
        paragraphs: [
          "v1 utilisable en local. Pas de SaaS, pas d’App Store. Suite possible : ⌘⇧R, MP4, historique. Détail dans l’article.",
        ],
      },
    ],
  },
  {
    slug: "preuve-42lab-validateur-saas-ia",
    title: "Preuve #1 — validateur fit 42Lab (48h)",
    description:
      "Au lieu d’envoyer un CV à froid, j’ai shipé un outil de qualification leads pour 42Lab.co : pitch vocal, diagnostic IA et CTA Calendly.",
    date: "2026-07-20",
    locale: "fr",
    tags: ["42Lab", "Next.js", "preuve produit", "SaaS IA"],
    links: [
      {
        label: "Démo live",
        href: "https://validateur-saas-42lab.vercel.app",
      },
      {
        label: "Code GitHub",
        href: "https://github.com/alkhastvatsaev/validateur-saas-42lab",
      },
    ],
    body: [
      {
        paragraphs: [
          "Ma méthode de candidature : repérer une friction concrète sur une boîte qui m’intéresse, shipper une feature en 48h, postuler avec la démo — pas seulement un CV.",
          "Première cible : 42Lab.co, studio qui aide les entrepreneurs à lancer un SaaS IA en 42 jours.",
        ],
      },
      {
        heading: "Le problème repéré",
        paragraphs: [
          "Sur 42lab.co, un entrepreneur peut réserver un audit stratégique gratuit — mais avant l’appel, il ne sait pas si son idée rentre dans le sprint 42 jours, quel budget prévoir (15–25 k€), ou quoi préparer pour les 15 minutes.",
          "Résultat probable : des abandons ou des calls peu qualifiés.",
        ],
      },
      {
        heading: "Ce que j’ai livré",
        paragraphs: [
          "Un validateur fit 42Lab : pitch vocal ou texte → pré-score algorithmique → diagnostic IA (délai, budget, scope MVP) → CTA vers l’audit Calendly.",
          "Ce n’est pas un produit officiel 42Lab — c’est une preuve produit qui montre comment j’aborderais leur conversion.",
        ],
      },
      {
        heading: "Stack",
        paragraphs: [
          "Next.js 15 · TypeScript · Tailwind 4 · OpenAI gpt-4o-mini · Vercel · rate limiting · export PDF.",
        ],
      },
      {
        heading: "Suite",
        paragraphs: [
          "Email envoyé à hello@42lab.co. Prochaine preuve cette semaine (Daisy ou Pixel Systems).",
          "Si tu recrutes un Fullstack junior qui shippe avant de postuler : alkhastvatsaev@icloud.com",
        ],
      },
    ],
  },
];

export const newsEn: readonly NewsItem[] = [
  {
    slug: "moon-v2-open-source",
    title: "Moon v2 — open source with webcam bubble and Dynamic Island controls",
    description:
      "My personal macOS screen recorder goes open source: MediaPipe blur, draggable bubble, MP4 export, premium controls. Code on GitHub.",
    date: "2026-07-22",
    locale: "en",
    tags: ["Moon", "open source", "Electron", "macOS"],
    links: [
      {
        label: "Full article",
        href: "/articles/moon-updates-open-source",
      },
      {
        label: "GitHub repo",
        href: "https://github.com/alkhastvatsaev/moon",
      },
    ],
    body: [
      {
        paragraphs: [
          "Moon, my personal Loom alternative for macOS, just hit v2 as open source.",
          "New: webcam bubble with background blur (MediaPipe), Dynamic Island with pause / save / discard / blur toggle, bubble visible from countdown and draggable, auto MP4 export, Moon logo in the menu bar.",
        ],
      },
      {
        heading: "Links",
        paragraphs: [
          "GitHub: https://github.com/alkhastvatsaev/moon — full article: /articles/moon-updates-open-source",
        ],
      },
    ],
  },
  {
    slug: "moon-screen-recorder-v1",
    title: "Moon — macOS screen recorder shipped in a day",
    description:
      "Personal Loom-like tool, local-first: Electron + React + TypeScript, screen/window capture, webcam bubble, mic, .webm.",
    date: "2026-07-21",
    locale: "en",
    tags: ["Moon", "Electron", "macOS"],
    links: [
      {
        label: "Full article",
        href: "/articles/moon-macos-screen-recorder-electron",
      },
    ],
    body: [
      {
        paragraphs: [
          "Problem: I wanted a macOS screen recorder without cloud lock-in or someone else’s UI — local files, full control.",
          "What I shipped: Moon v1, menu-bar app. Full screen or window capture, live webcam bubble, mic, countdown 0/3/5s, .webm save, Dynamic Island-style controls (timer, pause, stop).",
        ],
      },
      {
        heading: "Stack",
        paragraphs: [
          "Electron · React · TypeScript · electron-vite · desktopCapturer · MediaRecorder · DMG (electron-builder).",
        ],
      },
      {
        heading: "Next",
        paragraphs: [
          "v1 usable locally. Not a SaaS, not on the App Store. Possible next: ⌘⇧R, MP4, history. Details in the article.",
        ],
      },
    ],
  },
  {
    slug: "preuve-42lab-validateur-saas-ia",
    title: "Proof #1 — 42Lab fit validator (48h)",
    description:
      "Instead of cold CVs, I shipped a lead-qualification tool for 42Lab.co: voice pitch, AI diagnostic and Calendly CTA.",
    date: "2026-07-20",
    locale: "en",
    tags: ["42Lab", "Next.js", "product proof", "AI SaaS"],
    links: [
      {
        label: "Live demo",
        href: "https://validateur-saas-42lab.vercel.app",
      },
      {
        label: "GitHub repo",
        href: "https://github.com/alkhastvatsaev/validateur-saas-42lab",
      },
    ],
    body: [
      {
        paragraphs: [
          "My job-search method: spot one concrete friction at a company I care about, ship a feature in 48h, apply with the demo — not just a resume.",
          "First target: 42Lab.co, a studio that helps founders launch an AI SaaS in 42 days.",
        ],
      },
      {
        heading: "The friction",
        paragraphs: [
          "On 42lab.co, founders can book a free strategy audit — but before the call they don't know if their idea fits a 42-day sprint, what budget to expect (€15–25k), or how to prepare for the 15-minute call.",
          "Likely outcome: drop-offs or unqualified calls.",
        ],
      },
      {
        heading: "What I shipped",
        paragraphs: [
          "A 42Lab fit validator: voice or text pitch → algorithmic pre-score → AI diagnostic (timeline, budget, MVP scope) → Calendly audit CTA.",
          "This is not an official 42Lab product — it's a product proof showing how I'd approach their conversion.",
        ],
      },
      {
        heading: "Stack",
        paragraphs: [
          "Next.js 15 · TypeScript · Tailwind 4 · OpenAI gpt-4o-mini · Vercel · rate limiting · PDF export.",
        ],
      },
      {
        heading: "Next",
        paragraphs: [
          "Email sent to hello@42lab.co. Next proof this week (Daisy or Pixel Systems).",
          "Hiring a junior fullstack who ships before applying? alkhastvatsaev@icloud.com",
        ],
      },
    ],
  },
];

export function getNewsItem(
  slug: string,
  locale: "fr" | "en",
): NewsItem | undefined {
  return (locale === "fr" ? newsFr : newsEn).find((item) => item.slug === slug);
}

export function allNews(): readonly NewsItem[] {
  return [...newsFr, ...newsEn];
}

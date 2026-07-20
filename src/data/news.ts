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

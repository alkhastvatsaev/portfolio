export type Project = {
  name: string;
  label: string;
  summary: string;
  detail: string;
  stack: readonly string[];
  source: string;
  live: string;
};

export const projects: readonly Project[] = [
  {
    name: "Serrurerie Pro",
    label: "Field operations platform",
    summary:
      "A full-stack operations workspace for locksmith teams, spanning customer, intervention and technician workflows.",
    detail:
      "The repository includes role-specific dashboards, mapping, pricing, PDF exports, payments, communications integrations and automated tests.",
    stack: ["Next.js", "TypeScript", "Firebase", "Stripe", "Vitest"],
    source: "https://github.com/alkhastvatsaev/Serrurerie-Alsacienne",
    live: "https://serrure.vercel.app",
  },
  {
    name: "LOGIS. 2030",
    label: "Logistics workflow",
    summary:
      "A logistics interface for turning incoming requests into structured, trackable quote workflows.",
    detail:
      "It connects request intake, enrichment, review, quote pages, tracking links and PDF generation in one responsive Next.js application.",
    stack: ["Next.js", "TypeScript", "Firebase", "Vitest", "Playwright"],
    source: "https://github.com/alkhastvatsaev/logistic",
    live: "https://reach-logistics.vercel.app",
  },
  {
    name: "Hopla",
    label: "Neighbourhood delivery app",
    summary:
      "A two-sided grocery delivery experience for creating shopping lists and accepting nearby delivery jobs.",
    detail:
      "The application covers authentication, maps, job chat, checkout, delivery tracking, proof of delivery and support flows.",
    stack: ["Next.js", "React", "Firebase", "Stripe", "Leaflet"],
    source: "https://github.com/alkhastvatsaev/hopla",
    live: "https://hopla-one.vercel.app",
  },
  {
    name: "Atelier Aurelia",
    label: "Interactive 3D configurator",
    summary:
      "An open-source ring configurator with procedural 3D rendering and immediate visual feedback.",
    detail:
      "Users can choose materials, stones, sizes and engraving, then save or share a configuration and export the result as an image.",
    stack: ["React", "TypeScript", "Three.js", "React Three Fiber", "Vite"],
    source: "https://github.com/alkhastvatsaev/atelier-aurelia-ring",
    live: "https://atelier-aurelia-ring.vercel.app",
  },
];

export const projectsFr: readonly Project[] = [
  {
    name: "Serrurerie Pro",
    label: "Plateforme d’opérations terrain",
    summary:
      "Un espace de gestion fullstack pour les équipes de serrurerie, couvrant les parcours client, intervention et technicien.",
    detail:
      "Le dépôt comprend des tableaux de bord par rôle, la cartographie, la tarification, les exports PDF, les paiements, les intégrations de communication et des tests automatisés.",
    stack: ["Next.js", "TypeScript", "Firebase", "Stripe", "Vitest"],
    source: "https://github.com/alkhastvatsaev/Serrurerie-Alsacienne",
    live: "https://serrure.vercel.app",
  },
  {
    name: "LOGIS. 2030",
    label: "Workflow logistique",
    summary:
      "Une interface logistique qui transforme les demandes entrantes en parcours de devis structurés et traçables.",
    detail:
      "L’application réunit la saisie des demandes, l’enrichissement, la validation, les devis, le suivi et la génération de PDF dans une interface Next.js responsive.",
    stack: ["Next.js", "TypeScript", "Firebase", "Vitest", "Playwright"],
    source: "https://github.com/alkhastvatsaev/logistic",
    live: "https://reach-logistics.vercel.app",
  },
  {
    name: "Hopla",
    label: "Application de livraison locale",
    summary:
      "Une expérience de livraison à deux interfaces pour créer une liste de courses et accepter des missions à proximité.",
    detail:
      "L’application couvre l’authentification, les cartes, la messagerie, le paiement, le suivi, la preuve de livraison et l’assistance.",
    stack: ["Next.js", "React", "Firebase", "Stripe", "Leaflet"],
    source: "https://github.com/alkhastvatsaev/hopla",
    live: "https://hopla-one.vercel.app",
  },
  {
    name: "Atelier Aurelia",
    label: "Configurateur 3D interactif",
    summary:
      "Un configurateur de bague open source avec rendu 3D procédural et retour visuel immédiat.",
    detail:
      "Les utilisateurs choisissent les matériaux, pierres, tailles et gravures, puis enregistrent ou partagent leur configuration et exportent le résultat.",
    stack: ["React", "TypeScript", "Three.js", "React Three Fiber", "Vite"],
    source: "https://github.com/alkhastvatsaev/atelier-aurelia-ring",
    live: "https://atelier-aurelia-ring.vercel.app",
  },
];

export const provenStack = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Firebase",
  "Stripe",
  "Three.js",
  "Vitest",
  "Playwright",
] as const;

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

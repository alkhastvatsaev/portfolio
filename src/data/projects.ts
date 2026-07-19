export type Project = {
  slug: string;
  name: string;
  label: string;
  summary: string;
  detail: string;
  stack: readonly string[];
  source: string;
  live: string;
  /** Optional paragraph shown after the case-study intro. */
  story?: string;
  problem: string;
  approach: string;
  outcome: string;
  highlights: readonly string[];
};

export const projects: readonly Project[] = [
  {
    slug: "crmslot",
    name: "CRM Slot",
    label: "Field-service CRM & ops PWA",
    summary:
      "The flagship product: a full operations CRM for locksmith / field teams — dispatch, map, technicians, clients, billing and mobile (admin + terrain).",
    detail:
      "Next.js App Router product with Firebase Auth/Firestore, Mapbox, offline PWA paths, Stripe subscriptions, multilanguage UI (FR/NL/EN/RU), Jest + Playwright coverage and GitHub Actions CI.",
    stack: [
      "Next.js",
      "TypeScript",
      "Firebase",
      "Mapbox",
      "Stripe",
      "Playwright",
    ],
    source: "https://github.com/alkhastvatsaev/crmslot",
    live: "https://crmslot.vercel.app",
    story:
      "This is the most complete product I have shipped: not a landing page, but an operations platform used as a real CRM/slots workspace for field interventions — desktop admin shell, technician flows, client follow-up and subscriptions.",
    problem:
      "Field-service businesses juggle maps, WhatsApp threads, spreadsheets and invoices — with no single source of truth for jobs, technicians and clients.",
    approach:
      "I built a modular Next.js + Firebase CRM: role-aware dashboards, Mapbox interventions, dispatch/performance, offline-aware mobile shells, billing hubs, communications and automated tests so the depth is verifiable.",
    outcome:
      "A live production deploy (crmslot.vercel.app), a public GitHub repository, pricing surface, and the deepest proof of fullstack + product ownership in this portfolio.",
    highlights: [
      "Admin + technician + client operational paths",
      "Mapbox dispatch and intervention workflows",
      "PWA / mobile shells with offline considerations",
      "Stripe subscriptions + multilanguage product UI",
      "Jest, Playwright and CI on GitHub Actions",
    ],
  },
  {
    slug: "serrurerie-pro",
    name: "Serrurerie Pro",
    label: "Field operations platform",
    summary:
      "A full-stack operations workspace for locksmith teams, spanning customer, intervention and technician workflows.",
    detail:
      "The repository includes role-specific dashboards, mapping, pricing, PDF exports, payments, communications integrations and automated tests.",
    stack: ["Next.js", "TypeScript", "Firebase", "Stripe", "Vitest"],
    source: "https://github.com/alkhastvatsaev/Serrurerie-Alsacienne",
    live: "https://serrure.vercel.app",
    problem:
      "Field service teams need one place to take requests, assign technicians, price jobs and keep customers informed — without juggling disconnected tools.",
    approach:
      "I built a Next.js and TypeScript operations PWA with role-specific dashboards, maps, Stripe payments, messaging integrations and automated tests so recruiters can verify end-to-end delivery.",
    outcome:
      "A live demo with documented setup, CI checks and a public repository that shows fullstack ownership from UI to integrations.",
    highlights: [
      "Role-based operational dashboards",
      "Maps, pricing and PDF exports",
      "Stripe + communications integrations",
      "Automated unit and component tests",
    ],
  },
  {
    slug: "atelier-aurelia",
    name: "Atelier Aurelia",
    label: "Interactive 3D configurator",
    summary:
      "An open-source ring configurator with procedural 3D rendering — built with atelier product craft from Place Vendôme production work.",
    detail:
      "Users can choose materials, stones, sizes and engraving, then save or share a configuration and export the result as an image.",
    stack: ["React", "TypeScript", "Three.js", "React Three Fiber", "Vite"],
    source: "https://github.com/alkhastvatsaev/atelier-aurelia-ring",
    live: "https://atelier-aurelia-ring.vercel.app",
    story:
      "Before writing code, I worked in atelier production (software tools) at Atelier de l'Objet — including Cartier and Van Cleef & Arpels. Atelier Aurelia brings both worlds together: a ring configurator built by someone who knows real product finish — procedural 3D, faithful materials, and the craft this industry expects.",
    problem:
      "Product customization is hard to trust when buyers cannot see options update in real time.",
    approach:
      "I built a browser-based 3D configurator with React Three Fiber so material, stone, size and engraving choices update immediately, with shareable state and image export.",
    outcome:
      "An open-source demo that proves frontend craft, 3D literacy and product UX without a heavy backend.",
    highlights: [
      "Procedural Three.js rendering",
      "Live configuration feedback",
      "Shareable configuration state",
      "MIT-licensed public demo",
    ],
  },
  {
    slug: "logis-2030",
    name: "LOGIS. 2030",
    label: "Logistics workflow",
    summary:
      "A logistics interface for turning incoming requests into structured, trackable quote workflows.",
    detail:
      "It connects request intake, enrichment, review, quote pages, tracking links and PDF generation in one responsive Next.js application.",
    stack: ["Next.js", "TypeScript", "Firebase", "Vitest", "Playwright"],
    source: "https://github.com/alkhastvatsaev/logistic",
    live: "https://reach-logistics.vercel.app",
    problem:
      "Logistics teams receive messy inbound requests and need a reliable path from intake to quote, review and tracking.",
    approach:
      "I designed a Firebase-backed Next.js workflow with enrichment, review states, shareable quote pages, tracking links, PDF generation and Playwright coverage.",
    outcome:
      "A verifiable B2B-style product flow that demonstrates state management, APIs and test discipline.",
    highlights: [
      "Request → quote → review workflow",
      "Tracking links and PDF generation",
      "Vitest + Playwright coverage",
      "Responsive operations UI",
    ],
  },
  {
    slug: "hopla",
    name: "Hopla",
    label: "Neighbourhood delivery app",
    summary:
      "A two-sided grocery delivery experience for creating shopping lists and accepting nearby delivery jobs.",
    detail:
      "The application covers authentication, maps, job chat, checkout, delivery tracking, proof of delivery and support flows.",
    stack: ["Next.js", "React", "Firebase", "Stripe", "Leaflet"],
    source: "https://github.com/alkhastvatsaev/hopla",
    live: "https://hopla-one.vercel.app",
    problem:
      "Local delivery needs two products at once: a shopper experience and a courier job board, with payments and proof of delivery.",
    approach:
      "I shipped a two-sided Next.js app with auth, maps, chat, Stripe checkout, tracking and support flows — focused on realistic product paths rather than a marketing landing page.",
    outcome:
      "A Strasbourg-oriented delivery prototype that shows marketplace thinking and fullstack integration depth.",
    highlights: [
      "Customer and courier modes",
      "Maps, chat and tracking",
      "Stripe checkout path",
      "Proof of delivery and support",
    ],
  },
];

export const projectsFr: readonly Project[] = [
  {
    slug: "crmslot",
    name: "CRM Slot",
    label: "CRM terrain & PWA d’opérations",
    summary:
      "Le produit phare : un CRM d’opérations pour équipes de serrurerie / terrain — dispatch, carte, techniciens, clients, facturation et apps mobile (admin + terrain).",
    detail:
      "Produit Next.js App Router avec Firebase Auth/Firestore, Mapbox, parcours PWA offline, abonnements Stripe, UI multilingue (FR/NL/EN/RU), couverture Jest + Playwright et CI GitHub Actions.",
    stack: [
      "Next.js",
      "TypeScript",
      "Firebase",
      "Mapbox",
      "Stripe",
      "Playwright",
    ],
    source: "https://github.com/alkhastvatsaev/crmslot",
    live: "https://crmslot.vercel.app",
    story:
      "C’est le produit le plus abouti que j’ai livré : pas une landing, une plateforme d’exploitation utilisée comme CRM / slots pour les interventions terrain — shell admin desktop, parcours technicien, suivi client et abonnements.",
    problem:
      "Les entreprises de service terrain jonglent entre cartes, fils WhatsApp, tableurs et factures — sans source unique de vérité pour les chantiers, techniciens et clients.",
    approach:
      "J’ai construit un CRM Next.js + Firebase modulaire : dashboards par rôle, interventions Mapbox, dispatch/performance, shells mobile offline-aware, hubs de facturation, communications et tests automatisés pour rendre la profondeur vérifiable.",
    outcome:
      "Un déploiement live (crmslot.vercel.app), un dépôt GitHub public, une page pricing, et la preuve fullstack + produit la plus profonde de ce portfolio.",
    highlights: [
      "Parcours admin + technicien + client",
      "Dispatch Mapbox et workflows d’intervention",
      "Shells PWA / mobile avec contraintes offline",
      "Abonnements Stripe + UI produit multilingue",
      "Jest, Playwright et CI GitHub Actions",
    ],
  },
  {
    slug: "serrurerie-pro",
    name: "Serrurerie Pro",
    label: "Plateforme d’opérations terrain",
    summary:
      "Un espace de gestion fullstack pour les équipes de serrurerie, couvrant les parcours client, intervention et technicien.",
    detail:
      "Le dépôt comprend des tableaux de bord par rôle, la cartographie, la tarification, les exports PDF, les paiements, les intégrations de communication et des tests automatisés.",
    stack: ["Next.js", "TypeScript", "Firebase", "Stripe", "Vitest"],
    source: "https://github.com/alkhastvatsaev/Serrurerie-Alsacienne",
    live: "https://serrure.vercel.app",
    problem:
      "Les équipes terrain ont besoin d’un seul outil pour prendre les demandes, assigner les techniciens, tarifer et informer le client — sans multiplier les outils.",
    approach:
      "J’ai construit une PWA d’opérations Next.js/TypeScript avec tableaux de bord par rôle, cartes, paiements Stripe, communications et tests automatisés, pour montrer une livraison de bout en bout.",
    outcome:
      "Une démo en ligne, un dépôt public documenté et des contrôles CI qui prouvent la maîtrise fullstack.",
    highlights: [
      "Tableaux de bord opérationnels par rôle",
      "Cartes, tarification et exports PDF",
      "Stripe et intégrations de communication",
      "Tests unitaires et composants",
    ],
  },
  {
    slug: "atelier-aurelia",
    name: "Atelier Aurelia",
    label: "Configurateur 3D interactif",
    summary:
      "Un configurateur de bague open source avec rendu 3D procédural — nourri d’une culture produit atelier venue de la production Place Vendôme.",
    detail:
      "Les utilisateurs choisissent les matériaux, pierres, tailles et gravures, puis enregistrent ou partagent leur configuration et exportent le résultat.",
    stack: ["React", "TypeScript", "Three.js", "React Three Fiber", "Vite"],
    source: "https://github.com/alkhastvatsaev/atelier-aurelia-ring",
    live: "https://atelier-aurelia-ring.vercel.app",
    story:
      "Avant d'écrire du code, j’ai travaillé en production atelier (logiciels métier) à l’Atelier de l’Objet — maisons dont Cartier et Van Cleef & Arpels. Atelier Aurelia réunit ces deux mondes : un configurateur de bague pensé avec l’exigence de finition du secteur — 3D procédurale, matériaux fidèles, craft produit.",
    problem:
      "La personnalisation produit manque de confiance quand l’acheteur ne voit pas les options se mettre à jour en temps réel.",
    approach:
      "J’ai construit un configurateur 3D navigateur avec React Three Fiber : matériaux, pierres, tailles et gravure se mettent à jour immédiatement, avec état partageable et export image.",
    outcome:
      "Une démo open source qui prouve le craft frontend, la 3D et l’UX produit sans backend lourd.",
    highlights: [
      "Rendu Three.js procédural",
      "Retour visuel immédiat",
      "Configuration partageable",
      "Démo publique sous licence MIT",
    ],
  },
  {
    slug: "logis-2030",
    name: "LOGIS. 2030",
    label: "Workflow logistique",
    summary:
      "Une interface logistique qui transforme les demandes entrantes en parcours de devis structurés et traçables.",
    detail:
      "L’application réunit la saisie des demandes, l’enrichissement, la validation, les devis, le suivi et la génération de PDF dans une interface Next.js responsive.",
    stack: ["Next.js", "TypeScript", "Firebase", "Vitest", "Playwright"],
    source: "https://github.com/alkhastvatsaev/logistic",
    live: "https://reach-logistics.vercel.app",
    problem:
      "Les équipes logistiques reçoivent des demandes hétérogènes et doivent passer de façon fiable de l’intake au devis, à la validation et au suivi.",
    approach:
      "J’ai conçu un workflow Next.js + Firebase avec enrichissement, états de revue, pages de devis partageables, liens de suivi, PDF et couverture Playwright.",
    outcome:
      "Un parcours produit B2B vérifiable qui montre gestion d’état, API et discipline de tests.",
    highlights: [
      "Parcours demande → devis → validation",
      "Liens de suivi et génération PDF",
      "Couverture Vitest + Playwright",
      "UI opérations responsive",
    ],
  },
  {
    slug: "hopla",
    name: "Hopla",
    label: "Application de livraison locale",
    summary:
      "Une expérience de livraison à deux interfaces pour créer une liste de courses et accepter des missions à proximité.",
    detail:
      "L’application couvre l’authentification, les cartes, la messagerie, le paiement, le suivi, la preuve de livraison et l’assistance.",
    stack: ["Next.js", "React", "Firebase", "Stripe", "Leaflet"],
    source: "https://github.com/alkhastvatsaev/hopla",
    live: "https://hopla-one.vercel.app",
    problem:
      "La livraison locale exige deux produits : l’expérience client et le tableau de missions coursier, avec paiement et preuve de livraison.",
    approach:
      "J’ai livré une app Next.js à deux faces : auth, cartes, chat, checkout Stripe, suivi et support — centrée sur des parcours produit réalistes.",
    outcome:
      "Un prototype orienté Strasbourg qui montre la pensée marketplace et la profondeur d’intégration fullstack.",
    highlights: [
      "Modes client et coursier",
      "Cartes, chat et suivi",
      "Parcours checkout Stripe",
      "Preuve de livraison et support",
    ],
  },
];

export function getProjectBySlug(
  slug: string,
  locale: "en" | "fr" = "en",
): Project | undefined {
  return (locale === "fr" ? projectsFr : projects).find((p) => p.slug === slug);
}

export const provenStack = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Firebase",
  "Stripe",
  "Mapbox",
  "Three.js",
  "Vitest",
  "Playwright",
];

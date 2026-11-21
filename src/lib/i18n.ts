export type Locale = "fr" | "en";

export const site = {
  url: "https://alkhastvatsaev.dev",
  name: "Alkhast Vatsaev",
  email: "alkhastvatsaev@icloud.com",
  github: "https://github.com/alkhastvatsaev",
  linkedin: "https://www.linkedin.com/in/alkhast-vatsaev/",
  source: "https://github.com/alkhastvatsaev/portfolio",
} as const;

export const localeOf = (pathname: string): Locale =>
  pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";

/** One page per language: "/" (FR) and "/en" (EN). */
export const switchLocalePath = (pathname: string): string =>
  localeOf(pathname) === "en" ? "/" : "/en";

/** Panel ids, in order. */
export const sections = ["top", "preuves", "nota", "shmot", "moon", "alkhast-homes", "stack", "methode", "contact"] as const;

/**
 * Real commit messages from the NOTA repository (git log, July–August 2026),
 * copied as written. Shown as-is: they are proof that the work is real.
 */
export const notaCommits: readonly (readonly [string, string])[] = [
  ["2026-07-27", "fix(auth): débloquer « Ouvrir Nota » en prod (join-default + overlay)"],
  ["2026-07-28", "fix(ops): domains:ensure ré-alias toujours le dernier deploy prod"],
  ["2026-07-29", "fix(ios): inclure GoogleService-Info.plist dans le bundle"],
  ["2026-08-08", "fix(marketing): NOTA hero sans faux espace (SVG Safari)"],
];

export type Proof = {
  id: string;
  label: string;
  title: string;
  paragraphs: readonly string[];
  figures: readonly (readonly [string, string])[];
  image: string;
  link?: { href: string; label: string };
};

export const dict = {
  fr: {
    skip: "Aller au contenu",
    nav: { contact: "Contact", prev: "Précédent", next: "Suivant", hint: "La suite est à droite" },
    labels: ["Accueil", "Projets", "NOTA", "SHMOT", "Moon", "Alkhast Homes", "Outils", "Méthode", "Contact"],
    intro: "Alkhast Vatsaev, développeur full-stack TypeScript. Avant le code, 20 mois de 3D en haute joaillerie (Cartier, Van Cleef & Arpels). Disponible tout de suite, en CDI.",
    title: "Je développe des outils IA pour les équipes de support et leurs clients.",
    lead: "Depuis février 2026, j'ai mis 23 applications en production. La plus grosse, NOTA, gère des interventions de techniciens chez les clients : 819 commits, 630 fichiers de tests.",
    stats: [
      ["23", "applications en production"],
      ["783", "fichiers de tests automatisés"],
      ["2", "jours de travail par projet, en médiane"],
    ],
    verify: "Chiffres relevés sur mon GitHub le 21 novembre 2026.",
    verifyLink: "Voir le GitHub",
    scannerTitle: "Quatre projets que je peux vous montrer en direct.",
    scannerText: "Attrapez une carte pour la faire défiler plus vite.",
    proofs: [
      {
        id: "nota",
        label: "NOTA · mai à août 2026",
        title: "Un logiciel d'interventions terrain, construit seul.",
        paragraphs: [
          "Les entreprises qui envoient des techniciens chez leurs clients gèrent souvent tout entre WhatsApp, Excel et des factures éparpillées.",
          "NOTA regroupe tout : la carte des interventions pour le bureau, une appli hors ligne pour les techniciens, la facturation à la clôture. Applis iOS et Android, interface en 4 langues.",
          "9 modules IA : le technicien dicte son compte rendu et l'intervention se clôt, un e-mail client devient un ticket. gpt-4o-mini par défaut, gpt-4o pour les cas difficiles.",
        ],
        figures: [
          ["819", "commits"],
          ["630", "fichiers de tests"],
          ["26", "suites Playwright"],
          ["17", "workflows CI"],
        ],
        image: "/cards/nota-app.jpg",
        link: { href: "https://heynota.app", label: "heynota.app" },
      },
      {
        id: "shmot",
        label: "SHMOT · novembre 2026",
        title: "Une marketplace de mode avec une appli iPhone native, en 10 jours.",
        paragraphs: [
          "Revente de vêtements « vidéo d'abord » pour la Gen Z au Kazakhstan. Une appli iPhone en Swift, un site web, et un moteur de recommandation qui apprend le style de chacun à partir de ce qu'il regarde.",
          "Sous le capot : monorepo pnpm, Next.js et une API Hono, PostgreSQL avec pgvector, et un service Python (FastAPI) qui calcule des embeddings d'images pour la recherche visuelle. Interface en russe, kazakh et anglais.",
        ],
        figures: [
          ["226", "commits en 10 jours de travail"],
          ["844", "fichiers Swift"],
          ["≈ 57 000", "lignes de Swift"],
          ["49", "fichiers de tests"],
        ],
        image: "/cards/shmot-app.jpg",
        link: { href: "https://shmot-chi.vercel.app", label: "Version web (le code est privé)" },
      },
      {
        id: "moon",
        label: "Moon · open source",
        title: "Un enregistreur d'écran pour Mac, qui ne passe par aucun cloud.",
        paragraphs: [
          "Une alternative personnelle à Loom : icône dans la barre des menus, compte à rebours, bulle webcam déplaçable, et une petite « Dynamic Island » pour mettre en pause ou valider.",
          "Le fond de la webcam est flouté en temps réel par MediaPipe, directement sur la machine. La vidéo est convertie en MP4 avec ffmpeg et rangée dans Téléchargements.",
        ],
        figures: [
          ["Electron", "+ React + TypeScript"],
          ["100 %", "local, rien n'est envoyé"],
          ["MIT", "code public"],
        ],
        image: "/cards/moon-app.jpg",
        link: { href: "https://github.com/alkhastvatsaev/moon", label: "Code sur GitHub" },
      },
      {
        id: "alkhast-homes",
        label: "Alkhast Homes · octobre 2026",
        title: "Les outils de mon activité d'agent immobilier à Strasbourg.",
        paragraphs: [
          "Un moteur Python tourne 24 h/24 sur mon Mac (8 services launchd) et prépare le travail du jour. Je valide tout depuis une appli Mac native en SwiftUI, avec des commandes Siri, ou depuis un bot Telegram.",
          "Les clients passent par une Mini App Telegram : biens, demande de visite, dépôt de dossier. Chaque appel à l'API vérifie la signature Telegram (HMAC), et les documents vont dans un stockage privé, accessibles par lien signé.",
        ],
        figures: [
          ["142", "commits en 9 jours de travail"],
          ["≈ 15 800", "lignes de Python"],
          ["≈ 4 100", "lignes de Swift"],
          ["18", "fichiers de tests"],
        ],
        image: "/cards/alkhast-homes-app.jpg",
        link: { href: "https://adam-rieltor.vercel.app", label: "La Mini App (le code est privé)" },
      },
    ] satisfies readonly Proof[],
    commitsTitle: "Extrait du journal Git de NOTA, tel quel",
    stackTitle: ["Ce que j'utilise ", "tous les jours", "."],
    methodLabel: "Ma façon de travailler",
    methodTitle: "Ce que j'ai retenu de 10 mois de production.",
    principles: [
      ["Commencer par le besoin du client", "Avant de choisir une techno, je regarde qui va utiliser l'outil et ce qui le bloque. Souvent, la solution la plus simple suffit."],
      ["Rien ne part en production sans tests", "783 fichiers de tests et 34 chaînes d'intégration continue. Si un test casse, la mise en ligne s'arrête."],
      ["Cloisonner les accès et les données", "Dans NOTA, l'administrateur, le technicien et le client ne voient pas les mêmes choses. Chaque rôle a ses droits."],
      ["Automatiser ce qui revient trois fois", "Un compte rendu dicté qui clôt l'intervention, un e-mail qui devient un ticket : c'est du temps rendu aux équipes."],
      ["Documenter pour l'équipe qui suit", "NOTA a sa carte du code et un dossier d'exploitation. Le prochain développeur ne part pas de zéro."],
    ],
    honesty: "Je viens du développement. L'infrastructure (Windows Server, virtualisation, réseau), je l'apprends au contact de ceux qui la maîtrisent.",
    contactTitle: "Le plus simple, c'est un e-mail.",
    contactText: "Je suis disponible tout de suite, en hybride ou sur site.",
    copy: "Copier l'adresse",
    copied: "Adresse copiée",
    footer: "Le code de ce site est public",
  },
  en: {
    skip: "Skip to content",
    nav: { contact: "Contact", prev: "Previous", next: "Next", hint: "More to the right" },
    labels: ["Home", "Projects", "NOTA", "SHMOT", "Moon", "Alkhast Homes", "Tools", "Method", "Contact"],
    intro: "Alkhast Vatsaev, full-stack TypeScript developer. Before code, 20 months of 3D in high jewelry (Cartier, Van Cleef & Arpels). Available now, full-time.",
    title: "I build AI tools for support teams and their clients.",
    lead: "Since February 2026 I've put 23 applications into production. The largest, NOTA, handles technician jobs at client sites: 819 commits, 630 test files.",
    stats: [
      ["23", "applications in production"],
      ["783", "automated test files"],
      ["2", "working days per project, median"],
    ],
    verify: "Numbers taken from my GitHub on 21 November 2026.",
    verifyLink: "Open GitHub",
    scannerTitle: "Four projects I can show you live.",
    scannerText: "Grab a card to make it move faster.",
    proofs: [
      {
        id: "nota",
        label: "NOTA · May to August 2026",
        title: "A field-service app, built on my own.",
        paragraphs: [
          "Companies that send technicians to client sites often run everything through WhatsApp, Excel and scattered invoices.",
          "NOTA puts it in one place: a job map for the office, an offline app for technicians, invoicing when the job closes. iOS and Android apps, interface in 4 languages.",
          "9 AI modules: the technician dictates the report and the job closes, a client e-mail becomes a ticket. gpt-4o-mini by default, gpt-4o for the hard cases.",
        ],
        figures: [
          ["819", "commits"],
          ["630", "test files"],
          ["26", "Playwright suites"],
          ["17", "CI workflows"],
        ],
        image: "/cards/nota-app.jpg",
        link: { href: "https://heynota.app", label: "heynota.app" },
      },
      {
        id: "shmot",
        label: "SHMOT · November 2026",
        title: "A fashion marketplace with a native iPhone app, in 10 days.",
        paragraphs: [
          "Video-first clothing resale for Gen Z in Kazakhstan. An iPhone app in Swift, a website, and a recommendation engine that learns each person's style from what they watch.",
          "Under the hood: a pnpm monorepo, Next.js with a Hono API, PostgreSQL with pgvector, and a Python service (FastAPI) that computes image embeddings for visual search. Interface in Russian, Kazakh and English.",
        ],
        figures: [
          ["226", "commits in 10 working days"],
          ["844", "Swift files"],
          ["≈ 57,000", "lines of Swift"],
          ["49", "test files"],
        ],
        image: "/cards/shmot-app.jpg",
        link: { href: "https://shmot-chi.vercel.app", label: "Web version (code is private)" },
      },
      {
        id: "moon",
        label: "Moon · open source",
        title: "A Mac screen recorder that never touches the cloud.",
        paragraphs: [
          "My own alternative to Loom: a menu-bar icon, a countdown, a draggable webcam bubble, and a small \u201cDynamic Island\u201d to pause or confirm.",
          "The webcam background is blurred in real time by MediaPipe, on the machine itself. The video is converted to MP4 with ffmpeg and saved to Downloads.",
        ],
        figures: [
          ["Electron", "+ React + TypeScript"],
          ["100%", "local, nothing is uploaded"],
          ["MIT", "public code"],
        ],
        image: "/cards/moon-app.jpg",
        link: { href: "https://github.com/alkhastvatsaev/moon", label: "Code on GitHub" },
      },
      {
        id: "alkhast-homes",
        label: "Alkhast Homes · October 2026",
        title: "The tools behind my real-estate agent work in Strasbourg.",
        paragraphs: [
          "A Python engine runs 24/7 on my Mac (8 launchd services) and prepares the day's work. I approve everything from a native SwiftUI Mac app, with Siri commands, or from a Telegram bot.",
          "Clients use a Telegram Mini App: listings, visit requests, document upload. Every API call checks the Telegram signature (HMAC), and documents go to private storage, reachable only through signed links.",
        ],
        figures: [
          ["142", "commits in 9 working days"],
          ["≈ 15,800", "lines of Python"],
          ["≈ 4,100", "lines of Swift"],
          ["18", "test files"],
        ],
        image: "/cards/alkhast-homes-app.jpg",
        link: { href: "https://adam-rieltor.vercel.app", label: "The Mini App (code is private)" },
      },
    ] satisfies readonly Proof[],
    commitsTitle: "From NOTA's Git log, as written",
    stackTitle: ["What I use ", "every day", "."],
    methodLabel: "How I work",
    methodTitle: "What 10 months in production taught me.",
    principles: [
      ["Start from the client's need", "Before picking a tool, I look at who will use it and what blocks them. Often the simplest solution is enough."],
      ["Nothing reaches production without tests", "783 test files and 34 CI pipelines. If a test breaks, the release stops."],
      ["Keep access and data separated", "In NOTA, the admin, the technician and the client don't see the same things. Each role has its own rights."],
      ["Automate what comes back three times", "A dictated report that closes the job, an e-mail that becomes a ticket: time given back to the team."],
      ["Document for the team that follows", "NOTA has a code map and an operations folder. The next developer doesn't start from scratch."],
    ],
    honesty: "I come from development. Infrastructure (Windows Server, virtualisation, networking) is something I'm learning from people who master it.",
    contactTitle: "The simplest is an e-mail.",
    contactText: "I'm available now, hybrid or on site.",
    copy: "Copy address",
    copied: "Address copied",
    footer: "This site's code is public",
  },
} as const;

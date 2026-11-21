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
    labels: ["Accueil", "En direct", "NOTA", "SHMOT", "Moon", "Alkhast Homes", "Outils", "Garanties", "Contact"],
    intro: "Alkhast Vatsaev · développeur full-stack TypeScript & IA · Strasbourg",
    availability: "Disponible tout de suite, en CDI · hybride ou sur site",
    title: "Des outils IA qui rendent du temps à vos équipes de support et à leurs clients.",
    lead: "Moins de saisie et de tâches répétitives. Des applications testées avant chaque mise en ligne. Un premier prototype visible en quelques jours.",
    stats: [
      ["23", "applications déjà en production"],
      ["783", "tests automatiques qui protègent chaque mise en ligne"],
      ["2", "jours de travail, en médiane, pour un premier produit en ligne"],
    ],
    verify: "Chiffres vérifiables sur GitHub, relevés le 21 novembre 2026.",
    verifyLink: "Ouvrir le GitHub",
    scannerTitle: "Quatre applications à voir tourner aujourd'hui.",
    scannerText: "Attrapez une carte pour la faire défiler plus vite.",
    proofs: [
      {
        id: "nota",
        label: "NOTA · logiciel d'interventions terrain",
        title: "Techniciens, interventions et factures au même endroit.",
        paragraphs: [
          "Le bureau voit toutes les interventions sur une carte. Les techniciens ont une appli qui fonctionne même sans réseau. La facture part dès la clôture.",
          "Un compte rendu dicté devient un rapport, un e-mail client devient un ticket : 9 modules IA suppriment la saisie manuelle.",
          "gpt-4o-mini par défaut, gpt-4o seulement pour les cas difficiles : un coût d'IA maîtrisé. Applis iOS et Android, 4 langues.",
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
        label: "SHMOT · marketplace de mode",
        title: "Une appli iPhone native et son site web, livrés en 10 jours.",
        paragraphs: [
          "Fil vidéo, recherche par photo, recommandations qui apprennent les goûts de chaque utilisateur, paiement et livraison intégrés.",
          "Swift, Next.js, PostgreSQL avec pgvector, et un service Python d'IA d'images. Trois langues : russe, kazakh, anglais.",
        ],
        figures: [
          ["226", "commits en 10 jours de travail"],
          ["844", "fichiers Swift"],
          ["≈ 57 000", "lignes de Swift"],
          ["49", "fichiers de tests"],
        ],
        image: "/cards/shmot-app.jpg",
        link: { href: "https://shmot-chi.vercel.app", label: "Version web (code privé)" },
      },
      {
        id: "moon",
        label: "Moon · enregistreur d'écran pour Mac",
        title: "Des vidéos d'écran dont les données ne quittent jamais la machine.",
        paragraphs: [
          "Bulle webcam déplaçable avec flou d'arrière-plan calculé en local, barre de contrôle discrète, export MP4 direct dans Téléchargements.",
          "Code public sous licence MIT : chaque ligne peut être vérifiée.",
        ],
        figures: [
          ["0", "donnée envoyée en ligne"],
          ["Electron", "+ React + TypeScript"],
          ["MIT", "code public"],
        ],
        image: "/cards/moon-app.jpg",
        link: { href: "https://github.com/alkhastvatsaev/moon", label: "Code sur GitHub" },
      },
      {
        id: "alkhast-homes",
        label: "Alkhast Homes · outils d'un agent immobilier à Strasbourg",
        title: "Un assistant qui prépare la journée et protège les données des clients.",
        paragraphs: [
          "Un moteur tourne 24 h/24 et ne présente que les décisions à prendre : sur une appli Mac native, avec Siri, ou dans Telegram.",
          "Côté clients, chaque échange est vérifié par signature (HMAC) et chaque document reste dans un stockage privé, accessible par lien signé.",
        ],
        figures: [
          ["142", "commits en 9 jours de travail"],
          ["≈ 15 800", "lignes de Python"],
          ["≈ 4 100", "lignes de Swift"],
          ["18", "fichiers de tests"],
        ],
        image: "/cards/alkhast-homes-app.jpg",
        link: { href: "https://adam-rieltor.vercel.app", label: "La Mini App (code privé)" },
      },
    ] satisfies readonly Proof[],
    commitsTitle: "Extrait du journal Git de NOTA, tel quel",
    stackTitle: ["Des outils ", "éprouvés en production", "."],
    methodLabel: "Garanties",
    methodTitle: "Ce que chaque projet vous apporte.",
    principles: [
      ["Une solution à la taille du besoin", "Les utilisateurs passent avant la technologie. Souvent, la solution la plus simple suffit, et elle coûte moins cher."],
      ["Des mises en ligne sans mauvaise surprise", "783 tests automatiques et 34 chaînes d'intégration continue : si un test casse, rien ne part en production."],
      ["Des données cloisonnées", "Chaque rôle voit uniquement ce qui le concerne : administrateur, technicien, client."],
      ["Moins de tâches répétitives", "Ce qui revient trois fois est automatisé : comptes rendus dictés, e-mails transformés en tickets."],
      ["Un code que votre équipe peut reprendre", "Carte du code, documentation d'exploitation et tests : la personne suivante ne part pas de zéro."],
    ],
    honesty: "Spécialité : développement et IA appliquée. L'infrastructure (Windows Server, virtualisation, réseau) est en cours d'apprentissage.",
    contactTitle: "Une équipe à épauler ? Un e-mail suffit.",
    contactText: "Disponible tout de suite, en CDI, en hybride ou sur site.",
    copy: "Copier l'adresse",
    copied: "Adresse copiée",
    footer: "Le code de ce site est public",
  },
  en: {
    skip: "Skip to content",
    nav: { contact: "Contact", prev: "Previous", next: "Next", hint: "More to the right" },
    labels: ["Home", "Live", "NOTA", "SHMOT", "Moon", "Alkhast Homes", "Tools", "Guarantees", "Contact"],
    intro: "Alkhast Vatsaev · full-stack TypeScript & AI developer · Strasbourg",
    availability: "Available now, full-time · hybrid or on site",
    title: "AI tools that give time back to your support teams and their clients.",
    lead: "Less data entry and fewer repetitive tasks. Apps tested before every release. A first prototype you can see within days.",
    stats: [
      ["23", "applications already in production"],
      ["783", "automated tests guarding every release"],
      ["2", "working days, median, to a first live product"],
    ],
    verify: "Numbers you can check on GitHub, taken on 21 November 2026.",
    verifyLink: "Open GitHub",
    scannerTitle: "Four apps you can see running today.",
    scannerText: "Grab a card to make it move faster.",
    proofs: [
      {
        id: "nota",
        label: "NOTA · field-service software",
        title: "Technicians, jobs and invoices in one place.",
        paragraphs: [
          "The office sees every job on a map. Technicians get an app that works even offline. The invoice goes out as soon as the job closes.",
          "A dictated note becomes a report, a client e-mail becomes a ticket: 9 AI modules remove manual data entry.",
          "gpt-4o-mini by default, gpt-4o only for the hard cases: AI costs under control. iOS and Android apps, 4 languages.",
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
        label: "SHMOT · fashion marketplace",
        title: "A native iPhone app and its website, delivered in 10 days.",
        paragraphs: [
          "Video feed, search by photo, recommendations that learn each user's taste, payment and delivery built in.",
          "Swift, Next.js, PostgreSQL with pgvector, and a Python image-AI service. Three languages: Russian, Kazakh, English.",
        ],
        figures: [
          ["226", "commits in 10 working days"],
          ["844", "Swift files"],
          ["≈ 57,000", "lines of Swift"],
          ["49", "test files"],
        ],
        image: "/cards/shmot-app.jpg",
        link: { href: "https://shmot-chi.vercel.app", label: "Web version (private code)" },
      },
      {
        id: "moon",
        label: "Moon · screen recorder for Mac",
        title: "Screen videos whose data never leaves the machine.",
        paragraphs: [
          "A draggable webcam bubble with background blur computed locally, a discreet control bar, MP4 export straight to Downloads.",
          "Public code under the MIT licence: every line can be checked.",
        ],
        figures: [
          ["0", "data sent online"],
          ["Electron", "+ React + TypeScript"],
          ["MIT", "public code"],
        ],
        image: "/cards/moon-app.jpg",
        link: { href: "https://github.com/alkhastvatsaev/moon", label: "Code on GitHub" },
      },
      {
        id: "alkhast-homes",
        label: "Alkhast Homes · tools for a real-estate agent in Strasbourg",
        title: "An assistant that prepares the day and protects client data.",
        paragraphs: [
          "An engine runs 24/7 and only shows the decisions to make: in a native Mac app, with Siri, or in Telegram.",
          "On the client side, every exchange is checked by signature (HMAC) and every document stays in private storage, reachable through signed links.",
        ],
        figures: [
          ["142", "commits in 9 working days"],
          ["≈ 15,800", "lines of Python"],
          ["≈ 4,100", "lines of Swift"],
          ["18", "test files"],
        ],
        image: "/cards/alkhast-homes-app.jpg",
        link: { href: "https://adam-rieltor.vercel.app", label: "The Mini App (private code)" },
      },
    ] satisfies readonly Proof[],
    commitsTitle: "From NOTA's Git log, as written",
    stackTitle: ["Tools ", "proven in production", "."],
    methodLabel: "Guarantees",
    methodTitle: "What every project brings you.",
    principles: [
      ["A solution sized to the need", "Users come before technology. Often the simplest solution is enough, and it costs less."],
      ["Releases without bad surprises", "783 automated tests and 34 CI pipelines: if a test breaks, nothing reaches production."],
      ["Separated data", "Each role only sees what concerns it: admin, technician, client."],
      ["Fewer repetitive tasks", "Whatever comes back three times gets automated: dictated reports, e-mails turned into tickets."],
      ["Code your team can take over", "A code map, operations docs and tests: whoever comes next doesn't start from scratch."],
    ],
    honesty: "Speciality: development and applied AI. Infrastructure (Windows Server, virtualisation, networking) is being learned.",
    contactTitle: "A team to support? One e-mail is enough.",
    contactText: "Available now, full-time, hybrid or on site.",
    copy: "Copy address",
    copied: "Address copied",
    footer: "This site's code is public",
  },
} as const;

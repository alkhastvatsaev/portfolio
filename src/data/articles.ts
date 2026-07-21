export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  locale: "fr" | "en";
  tags: readonly string[];
  body: readonly { heading?: string; paragraphs: readonly string[] }[];
};

export const articlesFr: readonly Article[] = [
  {
    slug: "moon-screen-recorder-macos-electron",
    title: "Moon : un screen recorder macOS shippé en une journée",
    description:
      "Comment j’ai construit Moon, un enregistreur d’écran macOS local (Electron + React + TypeScript) : capture, webcam, micro, .webm et contrôles type Dynamic Island — sans cloud.",
    date: "2026-07-21",
    locale: "fr",
    tags: [
      "Moon",
      "Electron",
      "React",
      "macOS",
      "screen recorder",
      "TypeScript",
    ],
    body: [
      {
        paragraphs: [
          "Aujourd’hui j’ai shippé Moon, un screen recorder macOS perso — le genre d’outil que Loom rend bien, mais que je voulais contrôler de bout en bout : fichiers locaux, UI que je décide, zéro lock-in cloud.",
          "Je suis Alkhast Vatsaev, développeur Full Stack junior à Paris. Ce n’est pas un SaaS, pas un produit App Store, pas une startup : c’est un outil local que j’utilise, construit en une journée pour prouver que je peux livrer une app desktop réelle, pas seulement une landing.",
        ],
      },
      {
        heading: "Ce que Moon fait (v1)",
        paragraphs: [
          "Capture plein écran ou fenêtre, bulle webcam live en bas à gauche, micro, compte à rebours 0 / 3 / 5 secondes, sauvegarde locale en .webm, et une barre de contrôles pendant l’enregistrement (timer, pause, stop) façon Dynamic Island. Permissions macOS pour caméra, micro et partage d’écran — sans ça, rien n’enregistre.",
          "L’app vit dans la barre de menu : tray Electron, pas une fenêtre principale permanente. On lance, on choisit la source, on enregistre, on récupère le fichier sur le disque.",
        ],
      },
      {
        heading: "Stack et architecture",
        paragraphs: [
          "Electron + React + TypeScript via electron-vite. Processus main pour le tray, les fenêtres overlay et desktopCapturer ; preload pour exposer une API sûre au renderer ; renderer React pour le picker de sources, le setup et les contrôles.",
          "Côté capture : desktopCapturer pour lister écrans/fenêtres, canvas + MediaRecorder pour l’écran et le micro. La webcam est une overlay Electron séparée (toujours visible pendant l’enregistrement) : elle entre dans le .webm via la capture d’écran, sans être redessinée une seconde fois dans le canvas — sinon on se retrouve avec une double bulle.",
          "Packaging macOS en DMG via electron-builder. Permissions TCC caméra / micro / screen recording obligatoires.",
        ],
      },
      {
        heading: "Ce que j’ai appris en shippant du desktop en un jour",
        paragraphs: [
          "Les permissions macOS ne sont pas un détail UX : sans TCC caméra / micro / screen recording, l’app « marche » en apparence et produit du noir. Les black frames apparaissent aussi quand le process qui compose la vidéo est throttlé (fenêtre cachée / background) — d’où un tray app qui doit rester vivant pendant l’enregistrement.",
          "Le ratio d’aspect de la source compte pour le fichier final : forcer du 16:9 sur un écran Retina déforme tout. Et une overlay live + une composition canvas en parallèle, c’est deux bulles dans la vidéo : un seul canal pour la webcam, pas les deux.",
        ],
      },
      {
        heading: "Statut et suite",
        paragraphs: [
          "v1 est utilisable localement chez moi. Pas de cloud, pas d’utilisateurs, pas de revenue — juste un outil qui enregistre et sauvegarde. Suite possible : raccourci ⌘⇧R, export MP4, historique des captures.",
          "Si vous recrutez un Full Stack junior qui shippe aussi hors du navigateur (Electron, permissions native, packaging), le portfolio et le contact sont ici : https://alkhastvatsaev.dev — alkhastvatsaev@icloud.com",
        ],
      },
    ],
  },
  {
    slug: "developpeur-full-stack-junior-france",
    title: "Développeur Full Stack junior en France : ce que je montre vraiment",
    description:
      "Comment un développeur Full Stack junior peut se démarquer en France avec des preuves : démos, tests, stack React/Next.js et portfolio vérifiable.",
    date: "2026-07-18",
    locale: "fr",
    tags: [
      "développeur full stack junior",
      "France",
      "React",
      "Next.js",
      "portfolio",
    ],
    body: [
      {
        paragraphs: [
          "Les recherches « développeur full stack », « développeur fullstack junior » ou « développeur JavaScript France » renvoient surtout vers des job boards. Un site personnel ne gagne pas cette bataille en copiant des mots-clés : il gagne en devenant la meilleure preuve pour un profil précis.",
          "Je suis Alkhast Vatsaev, développeur Full Stack basé à Paris, disponible en France (hybride ou remote). Ce texte explique ce que je livre concrètement, et pourquoi mon portfolio est conçu pour les recruteurs techniques.",
        ],
      },
      {
        heading: "Ce qu’un recruteur devrait pouvoir vérifier en 10 minutes",
        paragraphs: [
          "Une démo en ligne qui marche. Un dépôt GitHub lisible. Une stack cohérente (React, Next.js, TypeScript, Firebase, Node.js). Des tests ou une CI. Un CV clair. Un moyen de contact immédiat.",
          "Sur alkhastvatsaev.dev, chaque projet flagship expose ces éléments. Les études de cas détaillent le problème, l’approche et le résultat — pas seulement une capture d’écran marketing.",
        ],
      },
      {
        heading: "Full Stack junior : frontend, backend et livraison",
        paragraphs: [
          "Full Stack ne signifie pas « expert de tout ». Pour un junior, cela signifie pouvoir construire une interface, brancher des données, gérer l’auth, intégrer un paiement ou une API, tester et déployer.",
          "Mes projets couvrent des opérations terrain, de la logistique, une marketplace de livraison locale et un configurateur 3D. La variété montre la capacité à apprendre un domaine produit, pas seulement à suivre un tutoriel.",
        ],
      },
      {
        heading: "Disponible en France, pas seulement à Paris",
        paragraphs: [
          "Je candidate sur des postes à Paris, en Île-de-France, et en remote/hybride partout en France. Une page identité France + des landings métropoles ciblées (pas une page par commune) : preuves d’abord, SEO ensuite.",
          "Si vous recrutez un développeur Full Stack JavaScript/TypeScript, commencez par le portfolio, le CV, GitHub et LinkedIn — tous pointent vers le même profil.",
        ],
      },
    ],
  },
  {
    slug: "comment-verifier-le-travail-dun-developpeur-junior",
    title: "Comment vérifier le travail d’un développeur junior (checklist recruteur)",
    description:
      "Checklist concrète pour évaluer un portfolio de développeur junior : démo, repo, tests, README, déploiement et signaux d’alerte.",
    date: "2026-07-18",
    locale: "fr",
    tags: [
      "recruteur",
      "portfolio développeur",
      "junior",
      "évaluation technique",
    ],
    body: [
      {
        paragraphs: [
          "Recruter un junior, c’est réduire le risque. Voici la checklist que j’applique à mon propre portfolio — et que je recommande aux recruteurs qui évaluent des candidats Full Stack JavaScript/TypeScript.",
        ],
      },
      {
        heading: "1. La démo s’ouvre-t-elle vraiment ?",
        paragraphs: [
          "Cliquez le lien live. Si la page est en 404, expirée ou demande des secrets impossibles à obtenir, le signal est faible. Une démo accessible avec un mode demo ou des données d’exemple est un bon signe.",
        ],
      },
      {
        heading: "2. Le dépôt est-il le produit, ou un dump ?",
        paragraphs: [
          "Cherchez un README en anglais clair, une structure de dossiers sensée, l’absence de secrets, et des instructions pour lancer le projet. Un repo « case study » doit pouvoir être lu sans l’auteur dans la pièce.",
        ],
      },
      {
        heading: "3. Y a-t-il des tests ou une CI ?",
        paragraphs: [
          "Même une couverture partielle (Vitest, Playwright, GitHub Actions) montre que le candidat sait que le code doit survivre au changement. L’absence totale n’est pas éliminatoire, mais c’est un différenciateur junior fort.",
        ],
      },
      {
        heading: "4. La stack est-elle cohérente avec le discours ?",
        paragraphs: [
          "Si le CV dit Full Stack React/Next.js, le portfolio doit le montrer de bout en bout : UI, données, auth ou paiements, déploiement. Méfiez-vous des landings HTML vendues comme « apps ».",
        ],
      },
      {
        heading: "Appliquez cette checklist à mon profil",
        paragraphs: [
          "Portfolio : https://alkhastvatsaev.dev — page recruteurs, études de cas, CV, GitHub et LinkedIn sont reliés. Mon objectif est que vous puissiez valider ou écarter le profil rapidement, avec des preuves.",
        ],
      },
    ],
  },
  {
    slug: "projet-nextjs-firebase-fullstack",
    title: "Construire un projet Full Stack avec Next.js et Firebase",
    description:
      "Retour d’expérience sur des apps Next.js + Firebase : auth, données, démo recruteur et limites assumées.",
    date: "2026-07-18",
    locale: "fr",
    tags: ["Next.js", "Firebase", "TypeScript", "full stack"],
    body: [
      {
        paragraphs: [
          "Next.js et Firebase forment une combinaison fréquente pour un développeur Full Stack : rendu web moderne, auth, base de données et hébergement rapide. Voici comment je l’utilise dans mes projets portfolio.",
        ],
      },
      {
        heading: "Pourquoi cette stack",
        paragraphs: [
          "Elle permet de livrer vite une interface React/TypeScript, des règles de données, et une démo déployée. Pour un recruteur, le critère n’est pas « Firebase forever », c’est « sait-il connecter UI, état, backend et déploiement ? ».",
        ],
      },
      {
        heading: "Ce que je montre concrètement",
        paragraphs: [
          "Sur CRM Slot, Serrurerie Pro, LOGIS. 2030 et Hopla : parcours métier, intégrations (Stripe, cartes, messaging), et documentation. Les études de cas sur ce site détaillent problème → approche → résultat.",
          "Je documente aussi les limites (règles de sécurité, modes démo, dettes techniques). Un junior crédible assume ce qui n’est pas encore production-grade.",
        ],
      },
      {
        heading: "Pour aller plus loin",
        paragraphs: [
          "Parcourez les études de cas, lancez les démos, lisez les README GitHub, puis écrivez-moi si vous cherchez un développeur Full Stack en France.",
        ],
      },
    ],
  },
];

export const articlesEn: readonly Article[] = [
  {
    slug: "moon-macos-screen-recorder-electron",
    title: "Moon: a macOS screen recorder shipped in one day",
    description:
      "How I built Moon, a local-first macOS screen recorder (Electron + React + TypeScript): capture, webcam bubble, mic, .webm save and Dynamic Island-style controls — no cloud.",
    date: "2026-07-21",
    locale: "en",
    tags: [
      "Moon",
      "Electron",
      "React",
      "macOS",
      "screen recorder",
      "TypeScript",
    ],
    body: [
      {
        paragraphs: [
          "Today I shipped Moon, a personal macOS screen recorder — the kind of tool Loom does well, but that I wanted to own end to end: local files, UI I decide, zero cloud lock-in.",
          "I’m Alkhast Vatsaev, a junior fullstack developer in Paris. This is not a SaaS, not an App Store product, not a startup: it’s a local tool I use, built in one day to show I can ship a real desktop app — not just a landing page.",
        ],
      },
      {
        heading: "What Moon does (v1)",
        paragraphs: [
          "Full screen or window capture, a live webcam bubble bottom-left, mic, countdown 0 / 3 / 5 seconds, local .webm save, and an in-recording control bar (timer, pause, stop) in a Dynamic Island style. macOS permissions for camera, mic and screen sharing — without them, nothing records.",
          "The app lives in the menu bar: Electron tray, no permanent main window. Launch, pick a source, record, get the file on disk.",
        ],
      },
      {
        heading: "Stack and architecture",
        paragraphs: [
          "Electron + React + TypeScript via electron-vite. Main process for the tray, overlay windows and desktopCapturer; preload to expose a safe API to the renderer; React renderer for the source picker, setup and controls.",
          "On the capture side: desktopCapturer to list screens/windows, canvas + MediaRecorder for screen and mic. The webcam is a separate Electron overlay (always visible while recording): it lands in the .webm through screen capture, without being drawn a second time on the canvas — otherwise you get a double bubble.",
          "macOS packaging as a DMG via electron-builder. Camera / mic / screen-recording TCC permissions are mandatory.",
        ],
      },
      {
        heading: "What I learned shipping desktop in a day",
        paragraphs: [
          "macOS permissions are not a UX detail: without camera / mic / screen-recording TCC, the app looks fine and produces black frames. Black frames also show up when the process composing the video is throttled (hidden / background window) — so a tray app has to stay alive during recording.",
          "Source aspect ratio matters for the final file: forcing 16:9 onto a Retina display warps everything. And a live overlay plus a parallel canvas composite means two bubbles in the video: one webcam channel, not both.",
        ],
      },
      {
        heading: "Status and next steps",
        paragraphs: [
          "v1 is usable locally on my machine. No cloud, no users, no revenue — just a tool that records and saves. Possible next: ⌘⇧R shortcut, MP4 export, capture history.",
          "If you’re hiring a junior fullstack who also ships outside the browser (Electron, native permissions, packaging), portfolio and contact are here: https://alkhastvatsaev.dev — alkhastvatsaev@icloud.com",
        ],
      },
    ],
  },
  {
    slug: "junior-fullstack-developer-portfolio",
    title: "What a junior fullstack developer portfolio should prove",
    description:
      "How I structure a fullstack JavaScript/TypeScript portfolio around demos, repos, tests and recruiter-ready proof.",
    date: "2026-07-18",
    locale: "en",
    tags: ["junior fullstack", "portfolio", "React", "Next.js"],
    body: [
      {
        paragraphs: [
          "A personal site will not outrank major job boards for generic “fullstack developer” queries overnight. It can become the best evidence package for one candidate: demos, repositories, stack clarity and a direct contact path.",
          "I’m Alkhast Vatsaev, a fullstack developer based in Paris and open to roles across France (hybrid or remote). This article explains what my portfolio is designed to prove.",
        ],
      },
      {
        heading: "Proof over titles",
        paragraphs: [
          "Recruiters should find a working demo, a readable GitHub repo, a coherent React/Next.js/TypeScript stack, tests or CI, and a one-page resume. Each flagship project on this site is built around those signals.",
        ],
      },
      {
        heading: "End-to-end delivery",
        paragraphs: [
          "Junior fullstack means shipping UI, data, auth or payments, tests and deployment — not claiming mastery of every layer. My case studies cover CRM Slot (field-service ops), logistics, local delivery and a 3D configurator.",
        ],
      },
    ],
  },
  {
    slug: "recruiter-checklist-junior-developer",
    title: "Recruiter checklist: verifying a junior developer’s work",
    description:
      "A practical checklist to evaluate junior developer portfolios: live demos, repos, tests, README quality and red flags.",
    date: "2026-07-18",
    locale: "en",
    tags: ["recruiting", "junior developer", "portfolio review"],
    body: [
      {
        paragraphs: [
          "Hiring juniors is risk management. Use this checklist on any JavaScript/TypeScript fullstack candidate — including me.",
        ],
      },
      {
        heading: "Live demo, readable repo, tests, coherent stack",
        paragraphs: [
          "Open the demo. Read the README. Look for CI or tests. Check that the claimed stack matches the product depth. Thin HTML landings sold as “apps” are a common red flag.",
          "Apply it here: alkhastvatsaev.dev links case studies, resume, GitHub and LinkedIn in one identity graph.",
        ],
      },
    ],
  },
];

export function getArticle(
  slug: string,
  locale: "fr" | "en",
): Article | undefined {
  return (locale === "fr" ? articlesFr : articlesEn).find((a) => a.slug === slug);
}

export function allArticles(): readonly Article[] {
  return [...articlesFr, ...articlesEn];
}

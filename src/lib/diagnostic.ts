/**
 * "Diagnostic IA pour PME": a transparent rule engine, no AI call, no data sent.
 * Every estimate shows its assumptions so a client can challenge them.
 */

export type Task =
  | "emails"
  | "reunions"
  | "devis"
  | "support"
  | "reporting"
  | "terrain"
  | "documents";

export type Sensitive = "sante" | "rh" | "clients" | "aucune";

export type Answers = {
  employees: number; // people who use a computer every day
  suite: "m365" | "google" | "mixte" | "autre";
  copilot: "aucune" | "test" | "deploye";
  tasks: Task[];
  sensitive: Sensitive[];
  sharepointOrdre: "oui" | "non" | "nsp"; // file permissions reviewed recently?
  mfa: "oui" | "non" | "nsp";
};

export type UseCase = {
  id: Task;
  title: string;
  tool: string;
  how: string;
  /** Minutes saved per concerned person per week (conservative assumption). */
  minutesPerWeek: number;
  /** Share of the staff concerned by this task. */
  share: number;
  effort: "faible" | "moyen";
};

export const useCases: Record<Task, UseCase> = {
  emails: {
    id: "emails",
    title: "Trier, résumer et rédiger les e-mails",
    tool: "Copilot dans Outlook",
    how: "Résumé des longs fils, brouillons de réponse, relances préparées.",
    minutesPerWeek: 60,
    share: 0.8,
    effort: "faible",
  },
  reunions: {
    id: "reunions",
    title: "Comptes rendus de réunion automatiques",
    tool: "Copilot dans Teams",
    how: "Synthèse, décisions et actions envoyées aux participants à la fin de la réunion.",
    minutesPerWeek: 45,
    share: 0.5,
    effort: "faible",
  },
  devis: {
    id: "devis",
    title: "Devis et factures préparés automatiquement",
    tool: "Power Automate + modèles Word / Excel",
    how: "Les données de la demande remplissent le modèle ; la personne relit et envoie.",
    minutesPerWeek: 120,
    share: 0.15,
    effort: "moyen",
  },
  support: {
    id: "support",
    title: "Tri et première réponse aux demandes clients",
    tool: "Copilot Studio + Power Automate",
    how: "Chaque demande est classée, résumée et reçoit une réponse proposée à valider.",
    minutesPerWeek: 180,
    share: 0.15,
    effort: "moyen",
  },
  reporting: {
    id: "reporting",
    title: "Tableaux de bord sans copier-coller",
    tool: "Copilot dans Excel + Power BI",
    how: "Les chiffres se mettent à jour seuls ; l'analyse se demande en français.",
    minutesPerWeek: 90,
    share: 0.2,
    effort: "moyen",
  },
  terrain: {
    id: "terrain",
    title: "Rapports d'intervention dictés sur le terrain",
    tool: "Power Apps + dictée vocale",
    how: "Le technicien parle, le rapport se remplit, le client le reçoit à la clôture.",
    minutesPerWeek: 120,
    share: 0.3,
    effort: "moyen",
  },
  documents: {
    id: "documents",
    title: "Retrouver une information dans les documents internes",
    tool: "Copilot + SharePoint",
    how: "Une question en français, la réponse avec le lien vers le bon document.",
    minutesPerWeek: 40,
    share: 0.7,
    effort: "faible",
  },
};

export const taskLabels: Record<Task, string> = {
  emails: "Beaucoup d'e-mails à lire et à écrire",
  reunions: "Réunions et comptes rendus",
  devis: "Devis, bons de commande, factures",
  support: "Demandes clients ou support",
  reporting: "Reporting Excel, tableaux de bord",
  terrain: "Rapports d'intervention ou de visite",
  documents: "Recherche dans les documents internes",
};

const WEEKS_PER_MONTH = 4.33;

export type RankedUseCase = UseCase & { people: number; hoursPerMonth: number };

export function hoursPerMonth(useCase: UseCase, employees: number) {
  const people = Math.max(1, Math.round(employees * useCase.share));
  return { people, hours: Math.round((people * useCase.minutesPerWeek * WEEKS_PER_MONTH) / 60) };
}

export type Precaution = { title: string; why: string; priority: "avant" | "pendant" };

export type Result = {
  top: RankedUseCase[];
  totalHoursPerMonth: number;
  fteEquivalent: number;
  readiness: number; // 0–100
  readinessLabel: string;
  precautions: Precaution[];
  notM365: boolean;
};

export function diagnose(a: Answers): Result {
  const employees = Math.max(1, Math.min(5000, Math.round(a.employees || 1)));
  const tasks: Task[] = a.tasks.length ? a.tasks : ["emails", "documents"];

  const ranked = tasks
    .map((id) => {
      const uc = useCases[id];
      const { people, hours } = hoursPerMonth(uc, employees);
      return { ...uc, people, hoursPerMonth: hours };
    })
    .sort((x, y) => y.hoursPerMonth - x.hoursPerMonth);
  const top = ranked.slice(0, 3);
  const totalHoursPerMonth = top.reduce((sum, u) => sum + u.hoursPerMonth, 0);

  // Readiness: what is already in place for an AI rollout that stays safe.
  let readiness = 20;
  if (a.suite === "m365") readiness += 25;
  else if (a.suite === "mixte") readiness += 12;
  if (a.copilot === "test") readiness += 10;
  if (a.copilot === "deploye") readiness += 15;
  if (a.mfa === "oui") readiness += 20;
  if (a.sharepointOrdre === "oui") readiness += 20;
  readiness = Math.min(100, readiness);
  const readinessLabel =
    readiness >= 75 ? "Prête à déployer" : readiness >= 50 ? "Quelques préalables" : "Préparer le terrain d'abord";

  const precautions: Precaution[] = [];
  if (a.sharepointOrdre !== "oui")
    precautions.push({
      title: "Revoir les droits d'accès aux fichiers avant d'activer Copilot",
      why: "Copilot montre à chacun tout ce que ses droits lui permettent de voir. Un dossier partagé trop largement devient visible en une question.",
      priority: "avant",
    });
  if (a.mfa !== "oui")
    precautions.push({
      title: "Activer la double authentification pour tous les comptes",
      why: "Un compte volé avec Copilot actif donne un accès rapide à toute l'information de l'entreprise.",
      priority: "avant",
    });
  if (a.sensitive.includes("sante"))
    precautions.push({
      title: "Données de santé : hébergement HDS et étiquettes de confidentialité",
      why: "Les données de santé exigent un hébergeur certifié HDS et un marquage qui limite leur usage par l'IA.",
      priority: "avant",
    });
  if (a.sensitive.includes("rh"))
    precautions.push({
      title: "Isoler les dossiers RH",
      why: "Salaires et évaluations ne doivent remonter dans aucune réponse d'un collègue.",
      priority: "avant",
    });
  if (a.sensitive.includes("clients"))
    precautions.push({
      title: "Règles de prévention des fuites (DLP) sur les données clients",
      why: "Empêche qu'un brouillon généré envoie par erreur des informations client à l'extérieur.",
      priority: "pendant",
    });
  precautions.push({
    title: "Former les équipes à relire ce que l'IA produit",
    why: "L'IA propose, la personne valide. Une heure de formation évite la plupart des erreurs.",
    priority: "pendant",
  });

  return {
    top,
    totalHoursPerMonth,
    fteEquivalent: Math.round((totalHoursPerMonth / 151.67) * 10) / 10,
    readiness,
    readinessLabel,
    precautions,
    notM365: a.suite === "google" || a.suite === "autre",
  };
}

/* ---------- share link: answers <-> URL hash ---------- */

export function encodeAnswers(a: Answers): string {
  const p = new URLSearchParams({
    e: String(a.employees),
    s: a.suite,
    c: a.copilot,
    t: a.tasks.join(","),
    d: a.sensitive.join(","),
    p: a.sharepointOrdre,
    m: a.mfa,
  });
  return p.toString();
}

export function decodeAnswers(hash: string): Answers | null {
  const p = new URLSearchParams(hash.replace(/^#/, ""));
  if (!p.get("e")) return null;
  const list = <T extends string>(v: string | null, allowed: readonly T[]) =>
    (v ?? "").split(",").filter((x): x is T => (allowed as readonly string[]).includes(x));
  const pick = <T extends string>(v: string | null, allowed: readonly T[], fallback: T) =>
    (allowed as readonly string[]).includes(v ?? "") ? (v as T) : fallback;
  return {
    employees: Number(p.get("e")) || 10,
    suite: pick(p.get("s"), ["m365", "google", "mixte", "autre"] as const, "m365"),
    copilot: pick(p.get("c"), ["aucune", "test", "deploye"] as const, "aucune"),
    tasks: list(p.get("t"), Object.keys(useCases) as Task[]),
    sensitive: list(p.get("d"), ["sante", "rh", "clients", "aucune"] as const),
    sharepointOrdre: pick(p.get("p"), ["oui", "non", "nsp"] as const, "nsp"),
    mfa: pick(p.get("m"), ["oui", "non", "nsp"] as const, "nsp"),
  };
}

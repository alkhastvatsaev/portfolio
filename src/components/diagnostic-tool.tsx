"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Link2, Printer, RotateCcw } from "lucide-react";

import {
  decodeAnswers,
  diagnose,
  encodeAnswers,
  taskLabels,
  type Answers,
  type Sensitive,
  type Task,
} from "@/lib/diagnostic";
import { cn } from "@/lib/utils";

const empty: Answers = {
  employees: 20,
  suite: "m365",
  copilot: "aucune",
  tasks: [],
  sensitive: [],
  sharepointOrdre: "nsp",
  mfa: "nsp",
};

type Option<T extends string> = { value: T; label: string; hint?: string };

function Choice<T extends string>({
  options,
  value,
  onChange,
  multi = false,
}: {
  options: Option<T>[];
  value: T | T[];
  onChange: (v: T) => void;
  multi?: boolean;
}) {
  const selected = (v: T) => (Array.isArray(value) ? value.includes(v) : value === v);
  return (
    <div className="grid gap-2 sm:grid-cols-2" role={multi ? "group" : "radiogroup"}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role={multi ? "checkbox" : "radio"}
          aria-checked={selected(o.value)}
          onClick={() => onChange(o.value)}
          className={cn(
            "flex items-start gap-3 border px-4 py-3 text-left text-[15px] transition-colors",
            selected(o.value) ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "mt-0.5 grid size-4 shrink-0 place-items-center border",
              multi ? "" : "rounded-full",
              selected(o.value) ? "border-background" : "border-muted-foreground",
            )}
          >
            {selected(o.value) ? <Check className="size-3" /> : null}
          </span>
          <span>
            {o.label}
            {o.hint ? <span className={cn("block text-xs", selected(o.value) ? "text-background/70" : "text-muted-foreground")}>{o.hint}</span> : null}
          </span>
        </button>
      ))}
    </div>
  );
}

export function DiagnosticTool() {
  const [answers, setAnswers] = useState<Answers>(empty);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState<{ email?: string; org?: string }>({});

  // Restore a shared result (#e=…) and the optional contact (?contact=…&org=…).
  useEffect(() => {
    const restored = decodeAnswers(window.location.hash);
    const params = new URLSearchParams(window.location.search);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the URL once on mount
    setContact({ email: params.get("contact") ?? undefined, org: params.get("org") ?? undefined });
    if (restored) {
      setAnswers(restored);
      setDone(true);
    }
    // A shared result opened while the tool is already on screen only changes the hash.
    const onHash = () => {
      const next = decodeAnswers(window.location.hash);
      if (next) {
        setAnswers(next);
        setDone(true);
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const result = useMemo(() => diagnose(answers), [answers]);
  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => setAnswers((a) => ({ ...a, [key]: value }));
  const toggle = <T extends string>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const steps = [
    {
      title: "Combien de personnes travaillent sur ordinateur chaque jour ?",
      body: (
        <div>
          <input
            type="range"
            min={1}
            max={250}
            value={answers.employees}
            onChange={(e) => set("employees", Number(e.target.value))}
            className="w-full accent-[var(--primary)]"
            aria-label="Nombre de personnes"
          />
          <p className="mt-3 text-4xl font-semibold tabular-nums">{answers.employees === 250 ? "250 et plus" : answers.employees}</p>
        </div>
      ),
      valid: true,
    },
    {
      title: "Quelle suite bureautique utilisez-vous ?",
      body: (
        <Choice
          value={answers.suite}
          onChange={(v) => set("suite", v)}
          options={[
            { value: "m365", label: "Microsoft 365", hint: "Outlook, Teams, SharePoint" },
            { value: "google", label: "Google Workspace", hint: "Gmail, Drive, Meet" },
            { value: "mixte", label: "Un peu des deux" },
            { value: "autre", label: "Autre ou je ne sais pas" },
          ]}
        />
      ),
      valid: true,
    },
    {
      title: "Où en êtes-vous avec Copilot ?",
      body: (
        <Choice
          value={answers.copilot}
          onChange={(v) => set("copilot", v)}
          options={[
            { value: "aucune", label: "Pas encore de licence" },
            { value: "test", label: "Quelques licences en test" },
            { value: "deploye", label: "Déployé dans plusieurs équipes" },
          ]}
        />
      ),
      valid: true,
    },
    {
      title: "Qu'est-ce qui prend le plus de temps à vos équipes ?",
      hint: "Plusieurs réponses possibles.",
      body: (
        <Choice<Task>
          multi
          value={answers.tasks}
          onChange={(v) => set("tasks", toggle(answers.tasks, v))}
          options={(Object.keys(taskLabels) as Task[]).map((t) => ({ value: t, label: taskLabels[t] }))}
        />
      ),
      valid: answers.tasks.length > 0,
    },
    {
      title: "Manipulez-vous des données sensibles ?",
      hint: "Plusieurs réponses possibles.",
      body: (
        <Choice<Sensitive>
          multi
          value={answers.sensitive}
          onChange={(v) =>
            set("sensitive", v === "aucune" ? ["aucune"] : toggle(answers.sensitive.filter((x) => x !== "aucune"), v))
          }
          options={[
            { value: "sante", label: "Données de santé" },
            { value: "rh", label: "Données RH (salaires, évaluations)" },
            { value: "clients", label: "Données clients confidentielles" },
            { value: "aucune", label: "Rien de particulier" },
          ]}
        />
      ),
      valid: answers.sensitive.length > 0,
    },
    {
      title: "Les droits d'accès aux dossiers partagés ont-ils été revus cette année ?",
      hint: "Qui peut voir quoi dans SharePoint, Teams ou le Drive.",
      body: (
        <Choice
          value={answers.sharepointOrdre}
          onChange={(v) => set("sharepointOrdre", v)}
          options={[
            { value: "oui", label: "Oui" },
            { value: "non", label: "Non" },
            { value: "nsp", label: "Je ne sais pas" },
          ]}
        />
      ),
      valid: true,
    },
    {
      title: "La double authentification est-elle activée pour tout le monde ?",
      body: (
        <Choice
          value={answers.mfa}
          onChange={(v) => set("mfa", v)}
          options={[
            { value: "oui", label: "Oui, pour tous les comptes" },
            { value: "non", label: "Non, ou pas pour tout le monde" },
            { value: "nsp", label: "Je ne sais pas" },
          ]}
        />
      ),
      valid: true,
    },
  ];

  const current = steps[step];
  const finish = () => {
    setDone(true);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${encodeAnswers(answers)}`);
    window.scrollTo({ top: 0 });
  };
  const restart = () => {
    setAnswers(empty);
    setStep(0);
    setDone(false);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  };

  if (!done) {
    return (
      <section aria-labelledby="question" className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="tabular-nums">
            {step + 1} / {steps.length}
          </span>
          <span className="h-px flex-1 bg-border">
            <span className="block h-px bg-foreground transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </span>
        </div>
        <h2 id="question" className="mt-6 text-2xl leading-snug font-semibold md:text-3xl">
          {current.title}
        </h2>
        {"hint" in current && current.hint ? <p className="mt-2 text-sm text-muted-foreground">{current.hint}</p> : null}
        <div className="mt-6">{current.body}</div>
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-sm disabled:opacity-30"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Précédent
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!current.valid}
              className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-sm font-medium text-background disabled:opacity-30"
            >
              Suivant <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          ) : (
            <button type="button" onClick={finish} className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-sm font-medium text-background">
              Voir le diagnostic <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </section>
    );
  }

  const expert = contact.org ? `Parler à un expert ${contact.org}` : "Parler à un expert";
  const mailto = contact.email
    ? `mailto:${contact.email}?subject=${encodeURIComponent("Diagnostic IA : en parler")}&body=${encodeURIComponent(
        `Bonjour,\n\nVoici notre diagnostic : ${typeof window !== "undefined" ? window.location.href : ""}\n\nPouvons-nous en parler ?`,
      )}`
    : null;

  return (
    <section aria-labelledby="resultat" className="mx-auto max-w-3xl">
      <p className="text-sm text-primary">Votre diagnostic</p>
      <h2 id="resultat" className="mt-2 text-3xl leading-tight font-semibold md:text-5xl">
        ≈ {result.totalHoursPerMonth.toLocaleString("fr-FR")} heures par mois à récupérer
      </h2>
      <p className="mt-3 text-neutral-700">
        Soit environ <strong>{result.fteEquivalent.toLocaleString("fr-FR")} équivalent temps plein</strong>, sur les 3 usages les plus
        rentables pour vos {answers.employees} personnes.
      </p>

      <ol className="mt-10 border-t border-foreground">
        {result.top.map((u, i) => (
          <li key={u.id} className="grid gap-2 border-b border-border py-6 md:grid-cols-[1fr_auto] md:gap-8">
            <div>
              <p className="text-xs text-muted-foreground">
                {i + 1} · {u.tool} · effort {u.effort}
              </p>
              <h3 className="mt-1 text-xl font-semibold">{u.title}</h3>
              <p className="mt-1 text-[15px] text-neutral-700">{u.how}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Hypothèse : {u.people} personne{u.people > 1 ? "s" : ""} concernée{u.people > 1 ? "s" : ""} × {u.minutesPerWeek} min gagnées par
                semaine.
              </p>
            </div>
            <p className="text-3xl font-semibold tabular-nums md:text-right">
              {u.hoursPerMonth} h<span className="block text-xs font-normal text-muted-foreground">par mois</span>
            </p>
          </li>
        ))}
      </ol>

      {result.notM365 ? (
        <p className="mt-6 border-l-2 border-primary pl-4 text-sm text-neutral-700">
          Ces usages existent aussi hors Microsoft (Gemini dans Google Workspace, ou des automatisations sur mesure). Les gains estimés restent du
          même ordre.
        </p>
      ) : null}

      <div className="mt-12 grid gap-10 md:grid-cols-[220px_1fr]">
        <div>
          <p className="text-sm text-muted-foreground">Préparation à l’IA</p>
          <p className="mt-1 text-6xl font-semibold tabular-nums">{result.readiness}</p>
          <p className="text-sm text-muted-foreground">sur 100 · {result.readinessLabel}</p>
        </div>
        <div>
          <h3 className="font-semibold">Avant et pendant le déploiement</h3>
          <ul className="mt-3">
            {result.precautions.map((p) => (
              <li key={p.title} className="border-t border-border py-3">
                <p className="font-medium">
                  <span className="mr-2 text-xs text-primary uppercase">{p.priority}</span>
                  {p.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{p.why}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="no-print mt-12 flex flex-wrap items-center gap-3">
        {mailto ? (
          <a href={mailto} className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-sm font-medium text-background">
            {expert} <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        ) : null}
        <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 border border-foreground px-5 py-3 text-sm font-medium">
          <Printer className="size-4" aria-hidden="true" /> Imprimer ou PDF
        </button>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(window.location.href).catch(() => {});
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          }}
          className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm"
        >
          <Link2 className="size-4" aria-hidden="true" /> {copied ? "Lien copié" : "Copier le lien du résultat"}
        </button>
        <button type="button" onClick={restart} className="inline-flex items-center gap-2 px-2 py-3 text-sm text-muted-foreground">
          <RotateCcw className="size-4" aria-hidden="true" /> Recommencer
        </button>
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        Estimations prudentes, calculées dans votre navigateur : aucune réponse n’est envoyée ni enregistrée. Les gains réels dépendent de
        l’organisation de chaque équipe.
      </p>
    </section>
  );
}

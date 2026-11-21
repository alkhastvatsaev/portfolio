import Link from "next/link";

import { DiagnosticTool } from "@/components/diagnostic-tool";
import { site } from "@/lib/i18n";

export const metadata = {
  title: "Diagnostic IA gratuit pour PME · Microsoft 365 et Copilot",
  description:
    "7 questions, 2 minutes : les 3 usages de l'IA qui feront gagner le plus d'heures à votre équipe, les heures récupérables par mois et les précautions de sécurité. Gratuit, sans inscription.",
  alternates: { canonical: "/diagnostic-ia" },
  openGraph: { url: "/diagnostic-ia", title: "Diagnostic IA gratuit pour PME", type: "website" },
};

export default function Page() {
  return (
    <main id="main" className="min-h-dvh px-6 pt-28 pb-20 md:px-10">
      <header className="mx-auto max-w-2xl">
        <p className="text-sm text-primary">Outil gratuit · 2 minutes · sans inscription</p>
        <h1 className="mt-3 text-3xl leading-tight font-semibold tracking-[-0.02em] md:text-5xl">
          Combien d’heures l’IA peut-elle rendre à votre équipe ?
        </h1>
        <p className="mt-4 text-lg text-neutral-700">
          7 questions. En sortie : les 3 usages les plus rentables pour votre entreprise, les heures récupérables chaque mois, et ce qu’il faut
          sécuriser avant de déployer Copilot.
        </p>
      </header>
      <div className="mt-12">
        <DiagnosticTool />
      </div>
      <footer className="no-print mx-auto mt-20 max-w-3xl border-t border-border pt-6 text-xs text-muted-foreground">
        Outil gratuit construit par{" "}
        <Link href="/" className="underline underline-offset-4 hover:text-foreground">
          {site.name}
        </Link>
        , développeur full-stack TypeScript et IA à Strasbourg.
      </footer>
    </main>
  );
}

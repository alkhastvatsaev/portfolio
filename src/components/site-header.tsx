"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function twinPath(pathname: string, toFrench: boolean): string {
  const pairs: Array<[string, string]> = [
    ["/", "/fr"],
    ["/resume", "/fr/resume"],
    ["/projects", "/fr/projets"],
    ["/articles", "/fr/articles"],
    ["/for-recruiters", "/fr/pour-recruteurs"],
    ["/profiles", "/fr/profils"],
  ];

  for (const [en, fr] of pairs) {
    if (pathname === en || pathname === fr) {
      return toFrench ? fr : en;
    }
  }

  const projectMatch = pathname.match(/^\/(projects|fr\/projets)\/([^/]+)$/);
  if (projectMatch) {
    return toFrench
      ? `/fr/projets/${projectMatch[2]}`
      : `/projects/${projectMatch[2]}`;
  }

  const articleFr = pathname.match(/^\/fr\/articles\/([^/]+)$/);
  if (articleFr) {
    return toFrench ? pathname : "/articles";
  }
  const articleEn = pathname.match(/^\/articles\/([^/]+)$/);
  if (articleEn) {
    return toFrench ? "/fr/articles" : pathname;
  }

  if (pathname === "/fr/developpeur-full-stack") {
    return toFrench ? pathname : "/";
  }

  if (pathname.startsWith("/fr")) {
    return toFrench ? pathname : "/";
  }
  return toFrench ? "/fr" : pathname || "/";
}

export function SiteHeader() {
  const pathname = usePathname();
  const isFrench = pathname === "/fr" || pathname.startsWith("/fr/");

  const homeHref = isFrench ? "/fr" : "/";
  const projectsHref = isFrench ? "/fr/projets" : "/projects";
  const articlesHref = isFrench ? "/fr/articles" : "/articles";
  const recruitersHref = isFrench ? "/fr/pour-recruteurs" : "/for-recruiters";
  const resumeHref = isFrench ? "/fr/resume" : "/resume";
  const englishHref = twinPath(pathname, false);
  const frenchHref = twinPath(pathname, true);

  return (
    <header className="site-header">
      <Link
        className="wordmark"
        href={homeHref}
        aria-label={isFrench ? "Accueil, Alkhast Vatsaev" : "Alkhast Vatsaev, home"}
      >
        ALKHAST VATSAEV
      </Link>
      <div className="header-actions">
        <nav aria-label={isFrench ? "Navigation principale" : "Primary navigation"}>
          <Link href={projectsHref}>{isFrench ? "Projets" : "Work"}</Link>
          <Link href={articlesHref}>{isFrench ? "Articles" : "Articles"}</Link>
          <Link href={recruitersHref}>
            {isFrench ? "Recruteurs" : "Recruiters"}
          </Link>
          <Link href={resumeHref}>{isFrench ? "CV" : "Resume"}</Link>
          <a href="mailto:alkhastvatsaev@icloud.com">Email</a>
        </nav>
        <div
          className="language-switch"
          aria-label={isFrench ? "Choisir la langue" : "Choose language"}
        >
          <Link
            className={isFrench ? "active" : undefined}
            href={frenchHref}
            hrefLang="fr"
            aria-current={isFrench ? "page" : undefined}
          >
            Français
          </Link>
          <Link
            className={!isFrench ? "active" : undefined}
            href={englishHref}
            hrefLang="en"
            aria-current={!isFrench ? "page" : undefined}
          >
            English
          </Link>
        </div>
      </div>
    </header>
  );
}

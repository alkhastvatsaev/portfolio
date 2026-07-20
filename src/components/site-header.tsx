"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isFrenchPath, twinPath } from "@/lib/locale-path";

export function SiteHeader() {
  const pathname = usePathname();
  const isFrench = isFrenchPath(pathname);

  const homeHref = isFrench ? "/fr" : "/";
  const newsHref = isFrench ? "/fr/news" : "/news";
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
          <Link href={newsHref}>News</Link>
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

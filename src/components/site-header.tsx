"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isFrench = pathname === "/fr" || pathname.startsWith("/fr/");
  const isResume = pathname === "/resume" || pathname.endsWith("/resume");
  const isSeoLanding = pathname === "/fr/developpeur-full-stack";

  const homeHref = isFrench ? "/fr" : "/";
  const resumeHref = isFrench ? "/fr/resume" : "/resume";
  const englishHref = isResume ? "/resume" : "/";
  const frenchHref = isResume
    ? "/fr/resume"
    : isSeoLanding
      ? "/fr/developpeur-full-stack"
      : "/fr";

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
          <Link href={`${homeHref}#work`}>{isFrench ? "Projets" : "Work"}</Link>
          <Link href={`${homeHref}#stack`}>Stack</Link>
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

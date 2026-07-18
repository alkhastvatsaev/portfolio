const localePairs: ReadonlyArray<readonly [string, string]> = [
  ["/", "/fr"],
  ["/resume", "/fr/resume"],
  ["/projects", "/fr/projets"],
  ["/articles", "/fr/articles"],
  ["/for-recruiters", "/fr/pour-recruteurs"],
  ["/profiles", "/fr/profils"],
];

/** Map a pathname to its English or French twin for the language switcher. */
export function twinPath(pathname: string, toFrench: boolean): string {
  for (const [en, fr] of localePairs) {
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

export function isFrenchPath(pathname: string): boolean {
  return pathname === "/fr" || pathname.startsWith("/fr/");
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { dict, localeOf, site, switchLocalePath } from "@/lib/i18n";

export function SiteHeader() {
  const pathname = usePathname();
  const locale = localeOf(pathname);
  const t = dict[locale];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        {t.skip}
      </a>
      <header className="fixed inset-x-0 top-0 z-50 bg-background/90">
        <div className="flex h-16 items-center justify-between gap-4 px-4 text-sm md:px-8">
          <a href="#top" className="font-semibold">
            {site.name}
          </a>
          <nav className="flex items-center gap-6" aria-label={locale === "fr" ? "Liens" : "Links"}>
            <a href="#contact" className="underline decoration-1 underline-offset-4 hover:text-primary">
              {t.nav.contact}
            </a>
            <Link
              href={switchLocalePath(pathname)}
              hrefLang={locale === "fr" ? "en" : "fr"}
              className="text-muted-foreground hover:text-foreground"
              aria-label={locale === "fr" ? "English version" : "Version française"}
            >
              {locale === "fr" ? "English" : "Français"}
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

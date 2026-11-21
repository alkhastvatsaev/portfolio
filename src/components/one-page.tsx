import Image from "next/image";

import { CopyEmail, FitToScreen, ScannerCardStreamClient } from "@/components/fx";
import { HorizontalDeck } from "@/components/horizontal-deck";
import { LogoCloud } from "@/components/ui/logo-cloud-2";
import { dict, notaCommits, sections, site, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const link = "underline decoration-1 underline-offset-4 hover:text-primary";
const button =
  "inline-flex items-center gap-2 border border-foreground px-5 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background";

/** A full-screen panel. Content scrolls vertically inside only on small screens. */
function Panel({
  id,
  label,
  className,
  inner = true,
  children,
}: {
  id: string;
  label: string;
  className?: string;
  inner?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-label={label} className={cn("relative h-dvh w-screen shrink-0 snap-start snap-always overflow-hidden", className)}>
      {inner ? (
        <div className="absolute inset-x-0 top-16 bottom-16 md:bottom-20">
          <FitToScreen>
            <div className="mx-auto w-full max-w-[1080px] px-6 py-4 md:px-10">{children}</div>
          </FitToScreen>
        </div>
      ) : (
        children
      )}
    </section>
  );
}

export function OnePage({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const proofImages = t.proofs.map((p) => p.image);

  return (
    <main id="main" className="h-dvh overflow-hidden">
      <HorizontalDeck ids={sections} labels={t.labels} hint={t.nav.hint} prevLabel={t.nav.prev} nextLabel={t.nav.next}>
        {/* 1 · Intro ---------------------------------------------------- */}
        <Panel id="top" label={t.labels[0]}>
          <div className="grid items-end gap-10 md:grid-cols-[1fr_220px]">
            <div>
              {/* SEO: the name + role is the page's H1; the big benefit line stays the visual headline. */}
              <h1 className="text-sm font-medium text-foreground">{t.intro}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{t.availability}</p>
              <p className="mt-5 max-w-3xl text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-balance">
                {t.title}
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-700">{t.lead}</p>
            </div>
            <Image
              src="/profile.png"
              alt={site.name}
              width={460}
              height={460}
              priority
              className="hidden aspect-[4/5] w-full object-cover md:block"
            />
          </div>

          <dl className="mt-12 grid grid-cols-3 border-t border-foreground">
            {t.stats.map(([value, label], i) => (
              <div key={label} className={cn("flex flex-col-reverse gap-1 pt-5 pr-4", i > 0 && "border-l border-border pl-4 md:pl-6")}>
                <dt className="text-xs leading-snug text-muted-foreground md:text-sm">{label}</dt>
                <dd className="text-4xl font-semibold tracking-tight tabular-nums md:text-5xl">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-muted-foreground">
            {t.verify}{" "}
            <a href={site.github} target="_blank" rel="noreferrer" className={link}>
              {t.verifyLink}
            </a>
          </p>
        </Panel>

        {/* 2 · Scanner (pasted component) ------------------------------- */}
        <Panel id="preuves" label={t.labels[1]} inner={false} className="bg-black text-white">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 mx-auto max-w-[1080px] px-6 pt-24 md:px-10">
            <h2 className="max-w-md text-2xl leading-snug font-semibold md:text-[2rem]">{t.scannerTitle}</h2>
            <p className="mt-2 text-sm text-white/55">{t.scannerText}</p>
          </div>
          <ScannerCardStreamClient cardImages={proofImages} repeat={6} />
        </Panel>

        {/* 3-6 · Projects ----------------------------------------------- */}
        {t.proofs.map((p, i) => (
          <Panel key={p.id} id={p.id} label={t.labels[2 + i]}>
            <div className="grid items-start gap-10 md:grid-cols-[1fr_1.1fr] md:gap-14">
              <div>
                <p className="text-sm text-primary">{p.label}</p>
                <h2 className="mt-3 text-3xl leading-tight font-semibold tracking-[-0.02em] text-balance md:text-[2.6rem]">{p.title}</h2>
                {p.paragraphs.map((para, j) => (
                  <p key={para} className={cn("mt-4 leading-relaxed text-neutral-700", j > 0 && "hidden md:block [@media(max-height:760px)]:!hidden")}>
                    {para}
                  </p>
                ))}
                <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-4">
                  {p.figures.map(([value, label], j) => (
                    <div key={label} className={cn("flex flex-col-reverse", j > 1 && "max-md:[@media(max-height:760px)]:hidden")}>
                      <dt className="text-xs text-muted-foreground">{label}</dt>
                      <dd className="text-2xl font-semibold tabular-nums">{value}</dd>
                    </div>
                  ))}
                </dl>
                {p.link ? (
                  <p className="mt-5 text-sm">
                    <a href={p.link.href} target="_blank" rel="noreferrer" className={link}>
                      {p.link.label}
                    </a>
                  </p>
                ) : null}
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={`${p.label} : ${p.title}`} width={1600} height={1000} loading="lazy" decoding="async" className="aspect-[16/10] h-auto w-full border border-border object-cover object-top" />
                {p.id === "nota" ? (
                  <figure className="mt-5 hidden md:block [@media(max-height:820px)]:!hidden">
                    <figcaption className="text-xs text-muted-foreground">{t.commitsTitle}</figcaption>
                    <pre className="mt-2 overflow-x-auto bg-surface p-4 font-mono text-[11.5px] leading-6 text-neutral-800">
                      {notaCommits.map(([date, msg]) => `${date}  ${msg}`).join("\n")}
                    </pre>
                  </figure>
                ) : null}
              </div>
            </div>
          </Panel>
        ))}

        {/* 6 · Tools (pasted logo cloud, demo layout) ------------------- */}
        <Panel id="stack" label={t.labels[6]}>
          <section className="relative mx-auto grid w-full max-w-3xl">
            <h2 className="mb-6 text-center font-medium text-lg text-muted-foreground tracking-tight md:text-2xl">
              {t.stackTitle[0]}
              <span className="font-semibold text-primary">{t.stackTitle[1]}</span>
              {t.stackTitle[2]}
            </h2>

            <LogoCloud />
          </section>
        </Panel>

        {/* 7 · How I work ----------------------------------------------- */}
        <Panel id="methode" label={t.labels[7]} className="bg-surface">
          <p className="text-sm text-primary">{t.methodLabel}</p>
          <h2 className="mt-3 max-w-2xl text-3xl leading-tight font-semibold tracking-[-0.02em] md:text-[2.6rem]">{t.methodTitle}</h2>
          <dl className="mt-8 grid gap-x-12 md:grid-cols-2">
            {t.principles.map(([title, text]) => (
              <div key={title} className="border-t border-border py-4">
                <dt className="font-semibold">{title}</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-neutral-700 [@media(max-height:700px)]:hidden">{text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground max-md:hidden [@media(max-height:760px)]:hidden">{t.honesty}</p>
        </Panel>

        {/* 8 · Contact -------------------------------------------------- */}
        <Panel id="contact" label={t.labels[8]}>
          <div className="max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-[-0.02em] md:text-5xl">{t.contactTitle}</h2>
            <p className="mt-6 text-2xl md:text-3xl">
              <a href={`mailto:${site.email}`} className={link}>
                {site.email}
              </a>
            </p>
            <p className="mt-4 text-neutral-700">{t.contactText}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <CopyEmail locale={locale} className={button} />
              <a href={site.linkedin} target="_blank" rel="me noreferrer" className={link}>
                LinkedIn
              </a>
              <a href={site.github} target="_blank" rel="me noreferrer" className={link}>
                GitHub
              </a>
            </div>
            <p className="mt-16 text-xs text-muted-foreground">
              {t.footer} :{" "}
              <a href={site.source} target="_blank" rel="noreferrer" className={link}>
                github.com/alkhastvatsaev/portfolio
              </a>
            </p>
          </div>
        </Panel>
      </HorizontalDeck>
    </main>
  );
}

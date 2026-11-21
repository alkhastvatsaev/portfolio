"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  FlaskConical,
  GitCommitHorizontal,
  Globe,
  Lock,
  Mail,
  Timer,
} from "lucide-react";

import { LogoCloud } from "@/components/ui/logo-cloud-2";
import { ScannerCardStream } from "@/components/ui/scanner-card-stream";
import {
  commitsByMonth,
  metrics,
  scannerCards,
  showcase,
  type ShowcaseCategory,
} from "@/data/metrics";
import { cn } from "@/lib/utils";

import { homeCopy, type Locale } from "./home-copy";

const EMAIL = "alkhastvatsaev@icloud.com";
const GITHUB = "https://github.com/alkhastvatsaev";
const LINKEDIN = "https://www.linkedin.com/in/alkhast-vatsaev/";

/* ------------------------------------------------------------------ */
/* Count-up number                                                     */
/* ------------------------------------------------------------------ */

function CountUp({
  value,
  locale,
  prefix = "",
  duration = 1400,
}: {
  value: number;
  locale: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(Math.max((now - start) / duration, 0), 1);
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(Math.round(value * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setDisplay(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString(locale)}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300/80">
      {children}
    </p>
  );
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-white md:text-5xl"
    >
      {children}
    </h2>
  );
}

const container = "mx-auto w-full max-w-[1240px] px-4 sm:px-6";

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function HomeView({ locale }: { locale: Locale }) {
  const t = homeCopy[locale];
  const nf = t.numberLocale;

  const [filter, setFilter] = useState<"all" | ShowcaseCategory>("all");
  const [activeMonth, setActiveMonth] = useState<number | null>(null);

  const visibleProjects =
    filter === "all"
      ? showcase
      : showcase.filter((project) => project.categories.includes(filter));

  const maxCommits = Math.max(...commitsByMonth.map((m) => m.commits));
  const monthLabel = (month: string) =>
    new Date(`${month}-01T12:00:00Z`).toLocaleDateString(nf, { month: "short" });

  const heroStats = [
    { icon: GitCommitHorizontal, value: metrics.commits, label: t.heroStats.commits },
    { icon: Globe, value: metrics.liveApps, label: t.heroStats.liveApps },
    { icon: FlaskConical, value: metrics.testFiles, label: t.heroStats.testFiles },
    { icon: Timer, value: metrics.medianDaysToShip, label: t.heroStats.medianDays },
  ];

  const bento = [
    { value: metrics.projects, label: t.numbers.projects },
    { value: metrics.activeDays, label: t.numbers.activeDays },
    { value: metrics.commitsPerActiveDay, prefix: "≈ ", label: t.numbers.perDay },
    { value: metrics.e2eSuites, label: t.numbers.e2e },
    { value: metrics.ciWorkflows, label: t.numbers.ci },
    { value: metrics.linesOfCode, prefix: "≈ ", label: t.numbers.loc },
    { value: 3, label: t.numbers.languages },
    { value: metrics.jewelryMonths, label: t.numbers.jewelry },
  ];

  return (
    <main id="main-content" className="home-v2 bg-background font-sans text-foreground">
      {/* ============================ HERO ============================ */}
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden border-b border-border"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]"
        />

        <div className={cn(container, "relative pt-14 pb-12 md:pt-20 md:pb-16")}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {t.status}
            </span>
          </div>

          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="font-mono text-sm text-muted-foreground">
                Alkhast Vatsaev — {t.role}
              </p>
              <h1
                id="hero-title"
                className="mt-4 max-w-4xl text-4xl leading-[1.02] font-semibold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl"
              >
                {t.titleStart}
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
                  {t.titleStrong}
                </span>
                {t.titleEnd}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-neutral-300 md:text-lg">
                {t.lead}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://heynota.app"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black no-underline transition hover:bg-violet-200"
                >
                  {t.ctaPrimary} <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-5 py-3 text-sm font-semibold text-white no-underline transition hover:border-violet-400/60"
                >
                  {t.ctaWork} <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-neutral-300 no-underline transition hover:text-white"
                >
                  <Mail className="size-4" aria-hidden="true" /> {t.ctaContact}
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-violet-500/50 via-fuchsia-500/20 to-transparent blur-md" />
              <Image
                className="relative size-56 rounded-[24px] border border-white/10 object-cover grayscale-[20%]"
                src="/profile.png"
                alt="Alkhast Vatsaev"
                width={460}
                height={460}
                priority
              />
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
            {heroStats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col gap-2 bg-background/90 p-5 md:p-6">
                <dt className="order-2 flex items-start gap-2 text-sm leading-snug text-muted-foreground">
                  <Icon className="mt-0.5 size-4 shrink-0 text-violet-300" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="order-1 m-0 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                  <CountUp value={value} locale={nf} />
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 font-mono text-[11px] text-muted-foreground">{t.measured}</p>
        </div>
      </section>

      {/* ============================ SCANNER ============================ */}
      <section aria-labelledby="scanner-title" className="border-b border-border py-14 md:py-20">
        <div className={container}>
          <Eyebrow>{t.scannerEyebrow}</Eyebrow>
          <SectionTitle id="scanner-title">{t.scannerTitle}</SectionTitle>
          <p className="mt-4 max-w-xl text-neutral-400">{t.scannerText}</p>
        </div>
        <ScannerCardStream className="mt-6" cards={scannerCards} />
      </section>

      {/* ============================ NUMBERS ============================ */}
      <section aria-labelledby="numbers-title" className="border-b border-border py-16 md:py-24">
        <div className={container}>
          <Eyebrow>{t.numbersEyebrow}</Eyebrow>
          <SectionTitle id="numbers-title">{t.numbersTitle}</SectionTitle>

          <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {bento.map((item, index) => (
              <li
                key={item.label}
                className={cn(
                  "group rounded-2xl border border-border bg-secondary/60 p-5 transition hover:-translate-y-0.5 hover:border-violet-400/50 md:p-6",
                  index === 5 && "bg-gradient-to-br from-violet-500/15 to-transparent",
                )}
              >
                <p className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  <CountUp value={item.value} locale={nf} prefix={item.prefix} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
              </li>
            ))}
          </ul>

          <figure className="mt-6 rounded-2xl border border-border bg-secondary/40 p-5 md:p-8">
            <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-semibold text-white">{t.chartTitle}</span>
              <span className="text-xs text-muted-foreground">{t.chartHint}</span>
            </figcaption>
            <div
              className="mt-8 flex h-56 items-end gap-1.5 sm:gap-3"
              onMouseLeave={() => setActiveMonth(null)}
            >
              {commitsByMonth.map((m, index) => {
                const active = activeMonth === index;
                return (
                  <button
                    key={m.month}
                    type="button"
                    aria-label={`${monthLabel(m.month)} 2026 : ${m.commits} commits — ${m.topProject}`}
                    onMouseEnter={() => setActiveMonth(index)}
                    onFocus={() => setActiveMonth(index)}
                    onBlur={() => setActiveMonth(null)}
                    className="group relative flex h-full flex-1 flex-col items-center justify-end"
                  >
                    <span
                      className={cn(
                        "pointer-events-none absolute z-10 -translate-y-2 rounded-lg border border-border bg-black px-2.5 py-1.5 text-left text-[11px] whitespace-nowrap text-white shadow-xl transition-opacity",
                        active ? "opacity-100" : "opacity-0",
                      )}
                      style={{ bottom: `${(m.commits / maxCommits) * 100}%` }}
                    >
                      <strong className="block font-mono text-sm">{m.commits}</strong>
                      {m.topProject}
                    </span>
                    <span
                      className={cn(
                        "w-full rounded-t-md bg-gradient-to-t from-violet-700/60 to-violet-400 transition-all duration-300",
                        active ? "brightness-125" : activeMonth !== null && "opacity-40",
                      )}
                      style={{ height: `${Math.max((m.commits / maxCommits) * 100, 1.5)}%` }}
                    />
                  </button>
                );
              })}
            </div>
            <div className="mt-2 flex gap-1.5 sm:gap-3" aria-hidden="true">
              {commitsByMonth.map((m) => (
                <span
                  key={m.month}
                  className="flex-1 text-center font-mono text-[10px] text-muted-foreground uppercase"
                >
                  {monthLabel(m.month)}
                </span>
              ))}
            </div>
          </figure>
        </div>
      </section>

      {/* ============================ FLAGSHIP ============================ */}
      <section aria-labelledby="flagship-title" className="border-b border-border py-16 md:py-24">
        <div className={cn(container, "grid gap-6 lg:grid-cols-[1.4fr_1fr]")}>
          <article className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-violet-500/15 via-secondary/60 to-secondary/30 p-6 md:p-10">
            <Eyebrow>{t.flagshipEyebrow}</Eyebrow>
            <h2
              id="flagship-title"
              className="mt-3 text-2xl font-semibold tracking-tight text-balance text-white md:text-4xl"
            >
              {t.flagshipTitle}
            </h2>
            <p className="mt-4 max-w-xl text-neutral-300">{t.flagshipText}</p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {t.flagshipStats.map(([value, label]) => (
                <div key={label} className="flex flex-col-reverse">
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="text-2xl font-semibold text-white md:text-3xl">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://heynota.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black no-underline"
              >
                heynota.app <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <Link
                href={t.caseHref("nota-crm")}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-white no-underline hover:border-violet-400/60"
              >
                {t.caseStudy} <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </article>

          <article className="flex flex-col overflow-hidden rounded-3xl border border-border bg-secondary/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/cards/shmot.jpg"
              alt="SHMOT"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover object-top"
            />
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <h3 className="text-xl font-semibold text-white md:text-2xl">{t.secondTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">{t.secondText}</p>
              <a
                href="https://shmot-chi.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-violet-300 no-underline hover:text-violet-200"
              >
                shmot · {t.live} <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* ============================ PROJECTS ============================ */}
      <section id="work" aria-labelledby="work-title" className="scroll-mt-6 border-b border-border py-16 md:py-24">
        <div className={container}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>{t.projectsEyebrow}</Eyebrow>
              <SectionTitle id="work-title">{t.projectsTitle}</SectionTitle>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter">
              {(Object.keys(t.filters) as Array<keyof typeof t.filters>).map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={filter === key}
                  onClick={() => setFilter(key)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm transition",
                    filter === key
                      ? "border-white bg-white text-black"
                      : "border-border text-neutral-300 hover:border-violet-400/60",
                  )}
                >
                  {t.filters[key]}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <li
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-secondary/40 transition hover:-translate-y-1 hover:border-violet-400/50"
              >
                {project.image ? (
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/9] items-center justify-center border-b border-border bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.25),transparent_60%)] font-mono text-2xl text-white/80">
                    {project.name}
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                    {project.isPrivate ? (
                      <Lock className="size-4 text-muted-foreground" aria-label="Private" />
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {project.tagline[locale]}
                  </p>
                  <dl className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-border bg-background/60 p-3 text-center">
                    <div className="flex flex-col-reverse">
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.statCommits}</dt>
                      <dd className="font-mono text-base text-white">{project.commits}</dd>
                    </div>
                    <div className="flex flex-col-reverse">
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.statDays}</dt>
                      <dd className="font-mono text-base text-white">{project.activeDays}</dd>
                    </div>
                    <div className="flex flex-col-reverse">
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.statTests}</dt>
                      <dd className="font-mono text-base text-white">{project.testFiles}</dd>
                    </div>
                  </dl>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-neutral-400"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-5 text-sm font-semibold">
                    {project.live ? (
                      <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-violet-300 no-underline hover:text-violet-200">
                        {t.live} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    ) : null}
                    {project.source ? (
                      <a href={project.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-neutral-300 no-underline hover:text-white">
                        {t.source} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    ) : null}
                    {project.caseStudy ? (
                      <Link href={t.caseHref(project.caseStudy)} className="inline-flex items-center gap-1 text-neutral-300 no-underline hover:text-white">
                        {t.caseStudy} <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    ) : null}
                    {project.isPrivate && !project.source ? (
                      <span className="text-xs font-normal text-muted-foreground">{t.privateCode}</span>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ STACK ============================ */}
      <section aria-labelledby="stack-title" className="border-b border-border py-16 md:py-24">
        <div className={container}>
          <Eyebrow>{t.stackEyebrow}</Eyebrow>
          <SectionTitle id="stack-title">{t.stackTitle}</SectionTitle>
          <LogoCloud className="mt-10" />
        </div>
      </section>

      {/* ============================ PATH + METHOD ============================ */}
      <section aria-labelledby="path-title" className="border-b border-border py-16 md:py-24">
        <div className={cn(container, "grid gap-14 lg:grid-cols-2")}>
          <div>
            <Eyebrow>{t.pathEyebrow}</Eyebrow>
            <SectionTitle id="path-title">{t.pathTitle}</SectionTitle>
            <ol className="relative mt-10 border-l border-border pl-6">
              {t.timeline.map(([date, title, text], index) => (
                <li key={title} className="relative pb-8 last:pb-0">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-1.5 -left-[29px] size-2.5 rounded-full border border-violet-300",
                      index === t.timeline.length - 1 ? "bg-violet-400 shadow-[0_0_12px_#a78bfa]" : "bg-background",
                    )}
                  />
                  <p className="font-mono text-xs text-violet-300">{date}</p>
                  <h3 className="mt-1 font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-sm text-neutral-400">{text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <Eyebrow>{t.methodEyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-white md:text-5xl">
              {t.methodTitle}
            </h2>
            <ol className="mt-10 grid gap-3 sm:grid-cols-2">
              {t.method.map(([title, text], index) => (
                <li key={title} className="rounded-2xl border border-border bg-secondary/40 p-5">
                  <span className="font-mono text-xs text-violet-300">0{index + 1}</span>
                  <h3 className="mt-2 font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-sm text-neutral-400">{text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-2xl border border-dashed border-violet-400/30 p-5 text-sm leading-relaxed text-neutral-300">
              {t.methodNote}
            </p>
          </div>
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section aria-labelledby="contact-title" className="relative overflow-hidden py-20 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 h-[360px] w-[800px] -translate-x-1/2 translate-y-1/2 rounded-full bg-violet-600/25 blur-[120px]"
        />
        <div className={cn(container, "relative text-center")}>
          <h2
            id="contact-title"
            className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-balance text-white md:text-6xl"
          >
            {t.contactTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-400">{t.contactText}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black no-underline hover:bg-violet-200"
            >
              <Mail className="size-4" aria-hidden="true" /> {EMAIL}
            </a>
            <Link
              href={t.resumeHref}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-5 py-3 text-sm font-semibold text-white no-underline hover:border-violet-400/60"
            >
              <FileText className="size-4" aria-hidden="true" /> {t.resume}
            </Link>
            <a href={LINKEDIN} target="_blank" rel="me noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-white no-underline hover:border-violet-400/60">
              LinkedIn <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a href={GITHUB} target="_blank" rel="me noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-white no-underline hover:border-violet-400/60">
              GitHub <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

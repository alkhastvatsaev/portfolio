"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

import { dict, site, type Locale } from "@/lib/i18n";

/**
 * The pasted scanner component, client-only: it uses Math.random during
 * render, so server HTML would never match.
 */
export const ScannerCardStreamClient = dynamic(
  () => import("@/components/ui/scanner-card-stream").then((m) => m.ScannerCardStream),
  { ssr: false, loading: () => <div className="h-full w-full" /> },
);

export function CopyEmail({ locale, className }: { locale: Locale; className?: string }) {
  const t = dict[locale];
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(site.email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          window.location.href = `mailto:${site.email}`;
        }
      }}
    >
      {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? t.copied : t.copy}</span>
    </button>
  );
}

/**
 * Shrinks its content (never enlarges it) so it always fits the box: the page
 * never needs a vertical scroll, whatever the screen height.
 */
export function FitToScreen({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const fit = () => {
      const available = outer.clientHeight;
      const needed = inner.offsetHeight;
      const scale = needed > available && needed > 0 ? available / needed : 1;
      inner.style.transform = scale < 1 ? `scale(${scale})` : "";
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(outer);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={outerRef} className="flex h-full w-full items-center justify-center overflow-hidden">
      <div ref={innerRef} data-fit className="w-full origin-center">
        {children}
      </div>
    </div>
  );
}

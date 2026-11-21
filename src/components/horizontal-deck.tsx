"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  /** Panel ids, in order (each child <section> must carry the same id). */
  ids: readonly string[];
  labels: readonly string[];
  hint: string;
  prevLabel: string;
  nextLabel: string;
  children: React.ReactNode;
};

/**
 * One page that scrolls horizontally: full-screen panels side by side.
 * - mouse wheel / trackpad (vertical) → one panel left or right
 * - arrow keys, Page Up/Down, Home/End, space
 * - touch: native horizontal swipe with snap
 * - panels never scroll vertically (content is scaled to fit, see FitToScreen)
 * - anchors (#contact) keep working
 */
export function HorizontalDeck({ ids, labels, hint, prevLabel, nextLabel, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  /** Panel we are going to (the scroll position lags behind during the smooth slide). */
  const targetRef = useRef(0);
  const movingUntilRef = useRef(0);

  const goTo = useCallback(
    (i: number) => {
      const el = ref.current;
      if (!el) return;
      const target = Math.max(0, Math.min(ids.length - 1, i));
      targetRef.current = target;
      movingUntilRef.current = performance.now() + 600;
      el.scrollTo({ left: target * el.clientWidth, behavior: "smooth" });
    },
    [ids.length],
  );

  /** Where a relative move should start from: the target while sliding, else the real position. */
  const currentIndex = useCallback(() => {
    const el = ref.current;
    if (!el) return 0;
    if (performance.now() < movingUntilRef.current) return targetRef.current;
    return Math.round(el.scrollLeft / el.clientWidth);
  }, []);

  // Track current panel + progress.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setIndex(i);
      if (performance.now() >= movingUntilRef.current) targetRef.current = i;
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    // Keep the current panel perfectly framed when the window is resized or zoomed.
    let lastWidth = el.clientWidth;
    const resizeObserver = new ResizeObserver(() => {
      if (el.clientWidth === lastWidth) return;
      lastWidth = el.clientWidth;
      el.scrollTo({ left: targetRef.current * el.clientWidth, behavior: "instant" });
    });
    resizeObserver.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
    };
  }, []);

  // Wheel: one gesture = one panel.
  // A Mac trackpad swipe sends dozens of wheel events for 1-2 s (momentum).
  // A gesture ends only after a short silence, so the whole swipe moves one panel.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let fired = false;
    let accumulated = 0;
    let lastAbs = 0;
    let lastFire = 0;
    let quietTimer = 0;
    const onWheel = (e: WheelEvent) => {
      // Any wheel event keeps the current gesture alive (momentum included).
      window.clearTimeout(quietTimer);
      quietTimer = window.setTimeout(() => {
        fired = false;
        accumulated = 0;
        lastAbs = 0;
      }, 160);

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const abs = Math.abs(delta);
      const now = performance.now();

      if (fired) {
        // A new finger swipe during the previous momentum: the deltas jump back up.
        const restarted = abs > 25 && abs > lastAbs * 2.5 && now - lastFire > 450;
        lastAbs = abs;
        if (!restarted) {
          // Leftover momentum after a panel change must not scroll the new panel.
          e.preventDefault();
          return;
        }
        fired = false;
        accumulated = 0;
      }
      lastAbs = abs;

      e.preventDefault();

      accumulated += delta;
      if (Math.abs(accumulated) < 24) return;
      fired = true;
      lastFire = now;
      goTo(currentIndex() + (accumulated > 0 ? 1 : -1));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(quietTimer);
    };
  }, [goTo, currentIndex]);

  // Keyboard.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const el = ref.current;
      if (!el) return;
      const current = currentIndex();
      const next = ["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)
        ? current + 1
        : ["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)
          ? current - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? ids.length - 1
              : null;
      if (next === null) return;
      e.preventDefault();
      goTo(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, ids.length, currentIndex]);

  // In-page anchors (#contact, #preuves…) → slide to that panel.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const i = ids.indexOf(a.getAttribute("href")!.slice(1));
      if (i < 0) return;
      e.preventDefault();
      goTo(i);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [goTo, ids]);

  return (
    <>
      <div
        ref={ref}
        className="flex h-dvh w-screen snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {/* navigation: plain counter + arrows */}
      <nav
        aria-label="Sections"
        className="fixed right-4 bottom-4 left-4 z-50 flex items-center justify-between gap-4 text-sm md:right-8 md:bottom-6 md:left-8"
      >
        <p className="bg-background/90 px-2 py-1 tabular-nums" aria-live="polite">
          <span className="font-semibold">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-muted-foreground"> / {String(ids.length).padStart(2, "0")} · {labels[index]}</span>
        </p>
        <span className={cn("hidden text-xs text-muted-foreground transition-opacity md:block", index === 0 ? "opacity-100" : "opacity-0")} aria-hidden="true">
          {hint}
        </span>
        <div className="flex">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label={prevLabel}
            className="grid size-10 place-items-center border border-foreground bg-background transition-colors hover:bg-foreground hover:text-background disabled:opacity-25"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === ids.length - 1}
            aria-label={nextLabel}
            className="-ml-px grid size-10 place-items-center border border-foreground bg-foreground text-background transition-colors hover:bg-background hover:text-foreground disabled:opacity-25"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </>
  );
}

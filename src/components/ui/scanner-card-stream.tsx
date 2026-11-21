"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

/*
 * Adapted from the 21st.dev "scanner card stream":
 * - fixed the broken newline literal in generateCode
 * - ASCII is generated client-side only (no SSR hydration mismatch)
 * - sizes follow the container, not window.innerWidth
 * - real drag / horizontal-wheel handling, full cleanup on unmount
 * - pauses off-screen, respects prefers-reduced-motion
 * - no per-frame React state updates
 */

export type ScannerCard = {
  src: string;
  label?: string;
};

const defaultCards: ScannerCard[] = [
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=70",
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=70",
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=70",
  },
];

const ASCII_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";

const generateCode = (width: number, height: number): string => {
  const lines: string[] = [];
  for (let row = 0; row < height; row++) {
    let line = "";
    for (let col = 0; col < width; col++) {
      line += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
    }
    lines.push(line);
  }
  return lines.join("\n");
};

type ScannerParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  life: number;
  decay: number;
};

export type ScannerCardStreamProps = {
  cards?: ScannerCard[];
  initialSpeed?: number;
  direction?: -1 | 1;
  repeat?: number;
  cardGap?: number;
  friction?: number;
  scanEffect?: "clip" | "scramble";
  className?: string;
};

export function ScannerCardStream({
  cards: cardInput = defaultCards,
  initialSpeed = 120,
  direction = -1,
  repeat = 2,
  cardGap = 48,
  friction = 0.95,
  scanEffect = "scramble",
  className,
}: ScannerCardStreamProps) {
  const [size, setSize] = useState({ width: 400, height: 250 });
  const [isScanning, setIsScanning] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardLineRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null);

  const cards = Array.from({ length: cardInput.length * repeat }, (_, i) => ({
    id: i,
    ...cardInput[i % cardInput.length],
  }));

  // Smaller cards on phones.
  useEffect(() => {
    const update = () => {
      const small = window.innerWidth < 640;
      setSize(small ? { width: 280, height: 175 } : { width: 400, height: 250 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const cardLine = cardLineRef.current;
    const particleCanvas = particleCanvasRef.current;
    const scannerCanvas = scannerCanvasRef.current;
    if (!container || !cardLine || !particleCanvas || !scannerCanvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const cardWidth = size.width;
    const cardHeight = size.height;
    const asciiCols = Math.floor(cardWidth / 6.5);
    const asciiRows = Math.floor(cardHeight / 13);
    const scannerHeight = cardHeight + 50;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = container.clientWidth;
    const intervals = new Set<number>();
    const originalAscii = new Map<number, string>();

    // Fill ASCII layers (client only).
    cardLine.querySelectorAll<HTMLPreElement>("pre[data-card]").forEach((pre) => {
      const id = Number(pre.dataset.card);
      const code = generateCode(asciiCols, asciiRows);
      originalAscii.set(id, code);
      pre.textContent = code;
    });

    const state = {
      position: 0,
      velocity: reducedMotion ? 0 : initialSpeed,
      direction: direction as number,
      isDragging: false,
      lastPointerX: 0,
      lastPointerTime: 0,
      lastTime: performance.now(),
      lineWidth: (cardWidth + cardGap) * cards.length,
      minVelocity: reducedMotion ? 0 : 30,
      visible: true,
      scanning: false,
    };

    // --- Three.js ambient particles ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      cardHeight / 2,
      -cardHeight / 2,
      1,
      1000,
    );
    camera.position.z = 100;
    const renderer = new THREE.WebGLRenderer({
      canvas: particleCanvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, cardHeight, false);
    renderer.setClearColor(0x000000, 0);

    const particleCount = reducedMotion ? 0 : 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);

    const texCanvas = document.createElement("canvas");
    texCanvas.width = 100;
    texCanvas.height = 100;
    const texCtx = texCanvas.getContext("2d")!;
    const gradient = texCtx.createRadialGradient(50, 50, 0, 50, 50, 50);
    gradient.addColorStop(0.025, "#fff");
    gradient.addColorStop(0.1, "hsl(258, 70%, 45%)");
    gradient.addColorStop(0.25, "hsl(258, 64%, 8%)");
    gradient.addColorStop(1, "transparent");
    texCtx.fillStyle = gradient;
    texCtx.arc(50, 50, 50, 0, Math.PI * 2);
    texCtx.fill();
    const texture = new THREE.CanvasTexture(texCanvas);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * width * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * cardHeight;
      velocities[i] = Math.random() * 60 + 30;
      alphas[i] = (Math.random() * 8 + 2) / 10;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
    const material = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: texture } },
      vertexShader:
        "attribute float alpha; varying float vAlpha; void main() { vAlpha = alpha; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = 15.0; gl_Position = projectionMatrix * mvPosition; }",
      fragmentShader:
        "uniform sampler2D pointTexture; varying float vAlpha; void main() { gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha) * texture2D(pointTexture, gl_PointCoord); }",
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- 2D scanner sparks ---
    const ctx = scannerCanvas.getContext("2d")!;
    const sizeScannerCanvas = () => {
      scannerCanvas.width = width * dpr;
      scannerCanvas.height = scannerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeScannerCanvas();

    const baseMax = reducedMotion ? 0 : 600;
    const scanMax = reducedMotion ? 0 : 1800;
    let currentMax = baseMax;
    const createSpark = (): ScannerParticle => ({
      x: width / 2 + (Math.random() - 0.5) * 3,
      y: Math.random() * scannerHeight,
      vx: Math.random() * 0.8 + 0.2,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 0.6 + 0.4,
      alpha: Math.random() * 0.4 + 0.6,
      life: 1,
      decay: Math.random() * 0.02 + 0.005,
    });
    const sparks: ScannerParticle[] = Array.from({ length: baseMax }, createSpark);

    const scramble = (pre: HTMLElement, id: number) => {
      if (pre.dataset.scrambling === "true") return;
      pre.dataset.scrambling = "true";
      let count = 0;
      const interval = window.setInterval(() => {
        pre.textContent = generateCode(asciiCols, asciiRows);
        count++;
        if (count >= 10) {
          window.clearInterval(interval);
          intervals.delete(interval);
          pre.textContent = originalAscii.get(id) ?? "";
          delete pre.dataset.scrambling;
        }
      }, 30);
      intervals.add(interval);
    };

    const wrappers = Array.from(
      cardLine.querySelectorAll<HTMLElement>(".card-wrapper"),
    );

    const updateCardEffects = () => {
      const containerRect = container.getBoundingClientRect();
      const scannerX = containerRect.left + width / 2;
      const scannerLeft = scannerX - 4;
      const scannerRight = scannerX + 4;
      let anyScanning = false;

      wrappers.forEach((wrapper, index) => {
        const rect = wrapper.getBoundingClientRect();
        const normal = wrapper.querySelector<HTMLElement>(".card-normal")!;
        const ascii = wrapper.querySelector<HTMLElement>(".card-ascii")!;
        const pre = ascii.querySelector<HTMLElement>("pre")!;

        if (rect.left < scannerRight && rect.right > scannerLeft) {
          anyScanning = true;
          if (scanEffect === "scramble" && wrapper.dataset.scanned !== "true") {
            scramble(pre, index);
          }
          wrapper.dataset.scanned = "true";
          const intersectLeft = Math.max(scannerLeft - rect.left, 0);
          const intersectRight = Math.min(scannerRight - rect.left, rect.width);
          normal.style.setProperty(
            "--clip-right",
            `${(intersectLeft / rect.width) * 100}%`,
          );
          ascii.style.setProperty(
            "--clip-left",
            `${(intersectRight / rect.width) * 100}%`,
          );
        } else {
          delete wrapper.dataset.scanned;
          if (rect.right < scannerLeft) {
            normal.style.setProperty("--clip-right", "100%");
            ascii.style.setProperty("--clip-left", "100%");
          } else {
            normal.style.setProperty("--clip-right", "0%");
            ascii.style.setProperty("--clip-left", "0%");
          }
        }
      });

      if (anyScanning !== state.scanning) {
        state.scanning = anyScanning;
        setIsScanning(anyScanning);
      }
    };

    // --- Interaction ---
    const pointerX = (e: MouseEvent | TouchEvent) =>
      "touches" in e ? (e.touches[0]?.clientX ?? state.lastPointerX) : e.clientX;

    const onDown = (e: MouseEvent | TouchEvent) => {
      state.isDragging = true;
      state.lastPointerX = pointerX(e);
      state.lastPointerTime = performance.now();
      state.velocity = 0;
      cardLine.style.cursor = "grabbing";
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!state.isDragging) return;
      const x = pointerX(e);
      const now = performance.now();
      const dx = x - state.lastPointerX;
      const dt = Math.max((now - state.lastPointerTime) / 1000, 0.001);
      state.position += dx;
      if (dx !== 0) {
        state.direction = dx > 0 ? 1 : -1;
        state.velocity = Math.min(Math.abs(dx / dt), 3000);
      }
      state.lastPointerX = x;
      state.lastPointerTime = now;
    };
    const onUp = () => {
      if (!state.isDragging) return;
      state.isDragging = false;
      cardLine.style.cursor = "grab";
      if (reducedMotion) state.velocity = 0;
    };
    const onWheel = (e: WheelEvent) => {
      // Only hijack horizontal scrolling; vertical wheel keeps scrolling the page.
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      state.position -= e.deltaX;
      state.direction = e.deltaX > 0 ? -1 : 1;
      state.velocity = Math.min(Math.abs(e.deltaX) * 20, 2000);
    };

    cardLine.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    cardLine.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    cardLine.addEventListener("wheel", onWheel, { passive: false });

    const onResize = () => {
      width = container.clientWidth;
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, cardHeight, false);
      sizeScannerCanvas();
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    const visibility = new IntersectionObserver(
      ([entry]) => {
        state.visible = entry.isIntersecting;
        state.lastTime = performance.now();
      },
      { rootMargin: "100px" },
    );
    visibility.observe(container);

    let frame = 0;
    const animate = (now: number) => {
      frame = requestAnimationFrame(animate);
      if (!state.visible) return;

      const dt = Math.min((now - state.lastTime) / 1000, 0.05);
      state.lastTime = now;

      if (!state.isDragging) {
        if (state.velocity > state.minVelocity) {
          state.velocity *= friction;
          if (state.velocity < state.minVelocity) state.velocity = state.minVelocity;
        }
        state.position += state.velocity * state.direction * dt;
      }

      if (state.position < -state.lineWidth) state.position = width;
      else if (state.position > width) state.position = -state.lineWidth;
      cardLine.style.transform = `translate3d(${state.position}px,0,0)`;
      updateCardEffects();

      const time = now * 0.001;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i] * 0.016;
        if (positions[i * 3] > width / 2 + 100) positions[i * 3] = -width / 2 - 100;
        positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;
        alphas[i] = Math.max(0.1, Math.min(1, alphas[i] + (Math.random() - 0.5) * 0.05));
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.alpha.needsUpdate = true;
      renderer.render(scene, camera);

      ctx.clearRect(0, 0, width, scannerHeight);
      const target = state.scanning ? scanMax : baseMax;
      currentMax += (target - currentMax) * 0.05;
      while (sparks.length < currentMax) sparks.push(createSpark());
      while (sparks.length > currentMax) sparks.pop();
      ctx.fillStyle = "white";
      for (const p of sparks) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0 || p.x > width) Object.assign(p, createSpark());
        ctx.globalAlpha = p.alpha * p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      intervals.forEach((id) => window.clearInterval(id));
      resizeObserver.disconnect();
      visibility.disconnect();
      cardLine.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      cardLine.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
      cardLine.removeEventListener("wheel", onWheel);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
    // cards.length is enough: card content is static per mount.
  }, [size, cards.length, cardGap, friction, scanEffect, initialSpeed, direction]);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex w-full items-center overflow-hidden", className)}
      style={{ height: size.height + 70 }}
    >
      <canvas
        ref={particleCanvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 z-0 w-full -translate-y-1/2"
        style={{ height: size.height }}
      />
      <canvas
        ref={scannerCanvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 z-10 w-full -translate-y-1/2"
        style={{ height: size.height + 50 }}
      />

      <div
        aria-hidden="true"
        className={cn(
          "animate-scan-pulse pointer-events-none absolute top-1/2 left-1/2 z-20 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-violet-500 to-transparent transition-opacity duration-300",
          isScanning ? "opacity-100" : "opacity-0",
        )}
        style={{
          height: size.height + 30,
          boxShadow:
            "0 0 10px #a78bfa, 0 0 20px #a78bfa, 0 0 30px #8b5cf6, 0 0 50px #6366f1",
        }}
      />

      <div className="absolute flex w-full items-center" style={{ height: size.height }}>
        <div
          ref={cardLineRef}
          className="flex cursor-grab items-center whitespace-nowrap select-none will-change-transform"
          style={{ gap: `${cardGap}px` }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="card-wrapper relative shrink-0"
              style={{ width: size.width, height: size.height }}
            >
              <div className="card-normal absolute inset-0 z-[2] overflow-hidden rounded-[15px] border border-white/10 bg-neutral-900 shadow-[0_15px_40px_rgba(0,0,0,0.5)] [clip-path:inset(0_0_0_var(--clip-right,0%))]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt={card.label ?? ""}
                  draggable={false}
                  loading="lazy"
                  className="h-full w-full object-cover object-top brightness-105 contrast-105"
                />
                {card.label ? (
                  <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/70 px-3 py-1 font-mono text-[11px] tracking-wide text-white backdrop-blur">
                    {card.label}
                  </span>
                ) : null}
              </div>
              <div className="card-ascii absolute inset-0 z-[1] overflow-hidden rounded-[15px] [clip-path:inset(0_calc(100%-var(--clip-left,0%))_0_0)]">
                <pre
                  data-card={card.id}
                  className="animate-glitch absolute inset-0 m-0 overflow-hidden p-0 text-left align-top font-mono text-[11px] leading-[13px] whitespace-pre text-violet-200/60 [mask-image:linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(0,0,0,0.8)_30%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.4)_80%,rgba(0,0,0,0.2)_100%)]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// components/ScannerCardStream.tsx
// Component pasted as given (21st.dev "scanner-card-stream").
// Minimal fixes only, marked "FIX": broken newline literal, the drag / wheel
// handlers and cleanup that were left as "/* ... */", and <main> → <div>
// (the page already has its own <main>).

'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import * as THREE from 'three';

// --- Default Images (used if no cardImages prop is provided) ---
const defaultCardImages = [
  "https://cdn.21st.dev/assets/mirror/cc/cccd26411c3961f0580866608ca10525bc100d36d60b00d439da67123860e5b3.png",
  "https://cdn.21st.dev/assets/mirror/39/3989b198f5af613fd45d5b37bb893cf76b8286fe0615a51343b16a3f9a44fe60.png",
  "https://cdn.21st.dev/assets/mirror/7a/7a27e9dafc45d10870073cb64440dabeb2e5972118fd9375958fb40afb088028.png",
  "https://cdn.21st.dev/assets/mirror/8b/8bd2f1455818bd7c15824695de33d5d77b28dec91589221409d61b25e3c36994.png",
  "https://cdn.21st.dev/assets/mirror/e4/e4cb1e5ee85993bc30b089641c817ce87f4f7fabfe204fd628a9cbc969d38f34.png",
];

// --- Helper function to generate ASCII-like code ---
const ASCII_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";
const generateCode = (width: number, height: number): string => {
  let text = "";
  for (let i = 0; i < width * height; i++) {
    text += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
  }
  let out = "";
  for (let i = 0; i < height; i++) {
    out += text.substring(i * width, (i + 1) * width) + "\n"; // FIX: newline literal
  }
  return out;
};

// --- Component Props Type Definition ---
type ScannerCardStreamProps = {
  showControls?: boolean;
  showSpeed?: boolean;
  initialSpeed?: number;
  direction?: -1 | 1;
  cardImages?: string[];
  repeat?: number;
  cardGap?: number;
  friction?: number;
  scanEffect?: 'clip' | 'scramble';
};

// --- The Main Component ---
const ScannerCardStream = ({
  showControls = false,
  showSpeed = false,
  initialSpeed = 150,
  direction = -1,
  cardImages = defaultCardImages,
  repeat = 6,
  cardGap = 60,
  friction = 0.95,
  scanEffect = 'scramble',
}: ScannerCardStreamProps) => {

  const [speed, setSpeed] = useState(initialSpeed);
  const [isPaused, setIsPaused] = useState(false);
  const [isScanning, setIsScanning] = useState(false); // New state for scanner visibility

  const cards = useMemo(() => {
    const totalCards = cardImages.length * repeat;
    return Array.from({ length: totalCards }, (_, i) => ({
      id: i,
      image: cardImages[i % cardImages.length],
      ascii: generateCode(Math.floor(400 / 6.5), Math.floor(250 / 13)),
    }))
  }, [cardImages, repeat]);

  const rootRef = useRef<HTMLDivElement>(null); // FIX: measure the component itself, not the window
  const cardLineRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null);
  const originalAscii = useRef(new Map<number, string>());

  const cardStreamState = useRef({
    position: 0, velocity: initialSpeed, direction: direction, isDragging: false,
    // eslint-disable-next-line react-hooks/purity -- original code, client-only component
    lastMouseX: 0, lastTime: performance.now(), cardLineWidth: (400 + cardGap) * cards.length,
    friction: friction, minVelocity: 30,
  });

  const scannerState = useRef({ isScanning: false });

  const toggleAnimation = useCallback(() => setIsPaused(prev => !prev), []);
  const resetPosition = useCallback(() => {
    if (cardLineRef.current) {
        cardStreamState.current.position = cardLineRef.current.parentElement?.offsetWidth || 0;
        cardStreamState.current.velocity = initialSpeed;
        cardStreamState.current.direction = direction;
        setIsPaused(false);
    }
  }, [initialSpeed, direction]);
  const changeDirection = useCallback(() => { cardStreamState.current.direction *= -1; }, []);

  useEffect(() => {
    const cardLine = cardLineRef.current;
    const particleCanvas = particleCanvasRef.current;
    const scannerCanvas = scannerCanvasRef.current;

    const root = rootRef.current;
    if (!root || !cardLine || !particleCanvas || !scannerCanvas) return;

    // FIX: every size is read from the component's own box and updated on
    // resize / zoom. The original read window.innerWidth once, so the particles
    // drifted away from the scanner line as soon as the window changed size.
    let W = root.clientWidth || window.innerWidth;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    cards.forEach(card => originalAscii.current.set(card.id, card.ascii));
    let animationFrameId: number;

    // --- (SETUP LOGIC for Three.js, Canvas, etc. - no changes here) ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-W / 2, W / 2, 125, -125, 1, 1000);
    camera.position.z = 100;
    const renderer = new THREE.WebGLRenderer({ canvas: particleCanvas, alpha: true, antialias: true });
    renderer.setPixelRatio(dpr);
    renderer.setSize(W, 250, false); // FIX: keep the CSS width (100%) instead of a fixed inline px width
    renderer.setClearColor(0x000000, 0);
    const particleCount = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);
    const texCanvas = document.createElement("canvas");
    texCanvas.width = 100; texCanvas.height = 100;
    const texCtx = texCanvas.getContext("2d")!;
    const half = 50;
    const gradient = texCtx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0.025, "#fff");
    gradient.addColorStop(0.1, `hsl(217, 61%, 33%)`);
    gradient.addColorStop(0.25, `hsl(217, 64%, 6%)`);
    gradient.addColorStop(1, "transparent");
    texCtx.fillStyle = gradient;
    texCtx.arc(half, half, half, 0, Math.PI * 2);
    texCtx.fill();
    const texture = new THREE.CanvasTexture(texCanvas);
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * W * 2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
        velocities[i] = Math.random() * 60 + 30;
        alphas[i] = (Math.random() * 8 + 2) / 10;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
    const material = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: texture } },
      vertexShader: `attribute float alpha; varying float vAlpha; void main() { vAlpha = alpha; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = 15.0; gl_Position = projectionMatrix * mvPosition; }`,
      fragmentShader: `uniform sampler2D pointTexture; varying float vAlpha; void main() { gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha) * texture2D(pointTexture, gl_PointCoord); }`,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, vertexColors: false,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    const ctx = scannerCanvas.getContext('2d')!;
    const sizeScannerCanvas = () => {
      scannerCanvas.width = Math.round(W * dpr);
      scannerCanvas.height = Math.round(300 * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeScannerCanvas();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let scannerParticles: any[] = [];
    const baseMaxParticles = 800;
    let currentMaxParticles = baseMaxParticles;
    const scanTargetMaxParticles = 2500;
    const createScannerParticle = () => ({
      x: W / 2 + (Math.random() - 0.5) * 3, y: Math.random() * 300, vx: Math.random() * 0.8 + 0.2, vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 0.6 + 0.4, alpha: Math.random() * 0.4 + 0.6, life: 1.0, decay: Math.random() * 0.02 + 0.005,
    });
    for (let i = 0; i < baseMaxParticles; i++) scannerParticles.push(createScannerParticle());

    const intervals = new Set<ReturnType<typeof setInterval>>(); // FIX: tracked for cleanup
    const runScrambleEffect = (element: HTMLElement, cardId: number) => {
        if (element.dataset.scrambling === 'true') return;
        element.dataset.scrambling = 'true';
        const originalText = originalAscii.current.get(cardId) || '';
        let scrambleCount = 0;
        const maxScrambles = 10;
        const interval = setInterval(() => {
            element.textContent = generateCode(Math.floor(400 / 6.5), Math.floor(250 / 13));
            scrambleCount++;
            if (scrambleCount >= maxScrambles) {
                clearInterval(interval);
                intervals.delete(interval);
                element.textContent = originalText;
                delete element.dataset.scrambling;
            }
        }, 30);
        intervals.add(interval);
    };

    const updateCardEffects = () => {
      const rootRect = root.getBoundingClientRect();
      const scannerX = rootRect.left + rootRect.width / 2; // FIX: centre of the component, where the line is drawn
      const scannerWidth = 8;
      const scannerLeft = scannerX - scannerWidth / 2;
      const scannerRight = scannerX + scannerWidth / 2;
      let anyCardIsScanning = false;
      cardLine.querySelectorAll<HTMLElement>(".card-wrapper").forEach((wrapper, index) => {
        const rect = wrapper.getBoundingClientRect();
        const normalCard = wrapper.querySelector<HTMLElement>(".card-normal")!;
        const asciiCard = wrapper.querySelector<HTMLElement>(".card-ascii")!;
        const asciiContent = asciiCard.querySelector<HTMLElement>('pre')!;
        if (rect.left < scannerRight && rect.right > scannerLeft) {
          anyCardIsScanning = true;
          if (scanEffect === 'scramble' && wrapper.dataset.scanned !== 'true') {
              runScrambleEffect(asciiContent, index);
          }
          wrapper.dataset.scanned = 'true';
          const intersectLeft = Math.max(scannerLeft - rect.left, 0);
          const intersectRight = Math.min(scannerRight - rect.left, rect.width);
          normalCard.style.setProperty("--clip-right", `${(intersectLeft / rect.width) * 100}%`);
          asciiCard.style.setProperty("--clip-left", `${(intersectRight / rect.width) * 100}%`);
        } else {
          delete wrapper.dataset.scanned;
          if (rect.right < scannerLeft) {
            normalCard.style.setProperty("--clip-right", "100%");
            asciiCard.style.setProperty("--clip-left", "100%");
          } else {
            normalCard.style.setProperty("--clip-right", "0%");
            asciiCard.style.setProperty("--clip-left", "0%");
          }
        }
      });
      // Update state for scanner visibility
      setIsScanning(anyCardIsScanning);
      scannerState.current.isScanning = anyCardIsScanning;
    };

    // FIX: the original left these handlers empty ("/* ... */").
    const pointerX = (e: MouseEvent | TouchEvent) =>
      'touches' in e ? (e.touches[0]?.clientX ?? cardStreamState.current.lastMouseX) : e.clientX;
    // FIX: velocity is measured in px/s over the last ~80 ms of the drag,
    // so a flick throws the cards and a slow release just lets them go.
    let samples: { x: number; t: number }[] = [];
    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      // FIX: stop the browser from grabbing the <img> (native drag ghost) and selecting text.
      if (!('touches' in e)) {
        if (e.button !== 0) return;
        e.preventDefault();
      }
      cardStreamState.current.isDragging = true;
      cardStreamState.current.lastMouseX = pointerX(e);
      samples = [{ x: pointerX(e), t: performance.now() }];
      cardLine.style.cursor = 'grabbing';
    };
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const s = cardStreamState.current;
      if (!s.isDragging) return;
      const x = pointerX(e);
      const delta = x - s.lastMouseX;
      s.position += delta;
      s.lastMouseX = x;
      const now = performance.now();
      samples.push({ x, t: now });
      while (samples.length > 2 && now - samples[0].t > 80) samples.shift();
    };
    const handleMouseUp = () => {
      const s = cardStreamState.current;
      if (!s.isDragging) return;
      s.isDragging = false;
      cardLine.style.cursor = 'grab';
      const first = samples[0];
      const last = samples[samples.length - 1];
      const dt = last && first ? (last.t - first.t) / 1000 : 0;
      if (dt > 0) {
        const v = (last.x - first.x) / dt;
        if (Math.abs(v) > 1) s.direction = v > 0 ? 1 : -1;
        s.velocity = Math.min(Math.abs(v), 3000);
      } else {
        s.velocity = s.minVelocity; // released without moving: resume the gentle drift
      }
      s.lastTime = performance.now();
    };
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // keep vertical page scroll
      e.preventDefault();
      e.stopPropagation(); // FIX: a horizontal swipe on the cards must not also flip the page
      const s = cardStreamState.current;
      s.position -= e.deltaX;
      s.direction = e.deltaX > 0 ? -1 : 1;
      s.velocity = Math.min(Math.abs(e.deltaX) * 20, 2000);
    };
    cardLine.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    cardLine.addEventListener("touchstart", handleMouseDown, { passive: true });
    window.addEventListener("touchmove", handleMouseMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);
    cardLine.addEventListener("wheel", handleWheel, { passive: false });

    // FIX: follow window resizes and browser zoom.
    const resizeObserver = new ResizeObserver(() => {
      const next = root.clientWidth;
      if (!next || next === W) return;
      W = next;
      camera.left = -W / 2;
      camera.right = W / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(W, 250, false);
      sizeScannerCanvas();
      scannerParticles.forEach((p) => Object.assign(p, createScannerParticle()));
    });
    resizeObserver.observe(root);

    const animate = (currentTime: number) => {
      // --- (ANIMATION LOOP LOGIC - no changes here) ---
      const deltaTime = (currentTime - cardStreamState.current.lastTime) / 1000;
      cardStreamState.current.lastTime = currentTime;
      if (!isPaused && !cardStreamState.current.isDragging) {
        if (cardStreamState.current.velocity > cardStreamState.current.minVelocity) {
            cardStreamState.current.velocity *= cardStreamState.current.friction;
        }
        cardStreamState.current.position += cardStreamState.current.velocity * cardStreamState.current.direction * deltaTime;
        setSpeed(Math.round(cardStreamState.current.velocity));
      }
      const { position, cardLineWidth } = cardStreamState.current;
      const containerWidth = cardLine.parentElement?.offsetWidth || 0;
      if (position < -cardLineWidth) cardStreamState.current.position = containerWidth;
      else if (position > containerWidth) cardStreamState.current.position = -cardLineWidth;
      cardLine.style.transform = `translateX(${cardStreamState.current.position}px)`;
      updateCardEffects();
      const time = currentTime * 0.001;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i] * 0.016;
        if (positions[i * 3] > W / 2 + 100) positions[i * 3] = -W / 2 - 100;
        positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;
        alphas[i] = Math.max(0.1, Math.min(1, alphas[i] + (Math.random() - 0.5) * 0.05));
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.alpha.needsUpdate = true;
      renderer.render(scene, camera);
      ctx.clearRect(0, 0, W, 300);
      const targetCount = scannerState.current.isScanning ? scanTargetMaxParticles : baseMaxParticles;
      currentMaxParticles += (targetCount - currentMaxParticles) * 0.05;
      while (scannerParticles.length < currentMaxParticles) scannerParticles.push(createScannerParticle());
      while (scannerParticles.length > currentMaxParticles) scannerParticles.pop();
      scannerParticles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (p.life <= 0 || p.x > W) Object.assign(p, createScannerParticle());
        ctx.globalAlpha = p.alpha * p.life; ctx.fillStyle = "white";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    // FIX: the original cleanup was empty.
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intervals.forEach(clearInterval);
      cardLine.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      cardLine.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      cardLine.removeEventListener("wheel", handleWheel);
      geometry.dispose(); material.dispose(); texture.dispose(); renderer.dispose();
      scannerParticles = [];
    };
  }, [isPaused, cards, cardGap, friction, scanEffect]);

  return (
    <div ref={rootRef} className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <style jsx global>{`
        @keyframes glitch { 0%, 16%, 50%, 100% { opacity: 1; } 15%, 99% { opacity: 0.9; } 49% { opacity: 0.8; } }
        .animate-glitch { animation: glitch 0.1s infinite linear alternate-reverse; }

        /* New pulse animation for the scanner line */
        @keyframes scanPulse {
          0% { opacity: 0.75; transform: scaleY(1); }
          100% { opacity: 1; transform: scaleY(1.03); }
        }
        .animate-scan-pulse {
          animation: scanPulse 1.5s infinite alternate ease-in-out;
        }
      `}</style>

      {/* --- (Controls and Speed Indicator JSX - no changes here) --- */}
      {showControls || showSpeed ? (
        <div className="absolute top-6 left-6 z-30 flex gap-2 font-mono text-xs text-white/70">
          {showSpeed ? <span>{speed} px/s</span> : null}
          {showControls ? (
            <>
              <button type="button" onClick={toggleAnimation}>{isPaused ? 'Play' : 'Pause'}</button>
              <button type="button" onClick={resetPosition}>Reset</button>
              <button type="button" onClick={changeDirection}>Direction</button>
            </>
          ) : null}
        </div>
      ) : null}

      <canvas ref={particleCanvasRef} className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[250px] z-0 pointer-events-none" />
      <canvas ref={scannerCanvasRef} className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[300px] z-10 pointer-events-none" />


      <div
        className={`
          scanner-line absolute top-1/2 left-1/2 h-[280px] w-0.5 -translate-x-1/2 -translate-y-1/2
          bg-gradient-to-b from-transparent via-violet-500 to-transparent rounded-full
          transition-opacity duration-300 z-20 pointer-events-none animate-scan-pulse
          ${isScanning ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          boxShadow: `
            0 0 10px #a78bfa, 0 0 20px #a78bfa,
            0 0 30px #8b5cf6, 0 0 50px #6366f1`
        }}
      />
      {/* ==================================================================== */}

      <div className="absolute left-0 w-full h-[250px] flex items-center">
        <div ref={cardLineRef} className="flex items-center whitespace-nowrap cursor-grab select-none will-change-transform" style={{ gap: `${cardGap}px`, touchAction: 'pan-y' /* FIX: a finger on the cards moves the cards, not the page */ }}>
          {cards.map(card => (
            <div key={card.id} className="card-wrapper relative w-[400px] h-[250px] shrink-0">
              <div className="card-normal card absolute top-0 left-0 w-full h-full rounded-[15px] overflow-hidden bg-transparent shadow-[0_15px_40px_rgba(0,0,0,0.4)] z-[2] [clip-path:inset(0_0_0_var(--clip-right,0%))]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.image} alt="Card" draggable={false} onDragStart={(e) => e.preventDefault()} className="pointer-events-none w-full h-full object-cover rounded-[15px] transition-all duration-300 ease-in-out brightness-110 contrast-110 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] hover:brightness-125 hover:contrast-125" />
              </div>
              <div className="card-ascii card absolute top-0 left-0 w-full h-full rounded-[15px] overflow-hidden bg-transparent z-[1] [clip-path:inset(0_calc(100%-var(--clip-left,0%))_0_0)]">
                <pre className="ascii-content absolute top-0 left-0 w-full h-full text-[rgba(220,210,255,0.6)] font-mono text-[11px] leading-[13px] overflow-hidden whitespace-pre m-0 p-0 text-left align-top box-border [mask-image:linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(0,0,0,0.8)_30%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.4)_80%,rgba(0,0,0,0.2)_100%)] animate-glitch">
                  {card.ascii}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export {ScannerCardStream};

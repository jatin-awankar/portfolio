"use client";

import { useEffect, useRef } from "react";

type Density = "subtle" | "medium" | "heavy";

type SmokeFlowProps = {
  density?: Density;
  intensity?: number;
  paused?: boolean;
  speed?: number;
  maxFps?: number;
  qualityScale?: number;
};

const DENSITY_MULTIPLIER: Record<Density, number> = {
  subtle: 0.9,
  medium: 1.15,
  heavy: 1.4,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function hash2(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function valueNoise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const tx = x - xi;
  const ty = y - yi;

  const sx = smoothstep(tx);
  const sy = smoothstep(ty);

  const n00 = hash2(xi, yi);
  const n10 = hash2(xi + 1, yi);
  const n01 = hash2(xi, yi + 1);
  const n11 = hash2(xi + 1, yi + 1);

  const ix0 = n00 + (n10 - n00) * sx;
  const ix1 = n01 + (n11 - n01) * sx;

  return ix0 + (ix1 - ix0) * sy;
}

function fbm(x: number, y: number, octaves = 4) {
  let total = 0;
  let amplitude = 0.55;
  let frequency = 1;
  let norm = 0;

  for (let i = 0; i < octaves; i += 1) {
    total += valueNoise(x * frequency, y * frequency) * amplitude;
    norm += amplitude;
    amplitude *= 0.5;
    frequency *= 2.03;
  }

  return total / norm;
}

function parseRgbVar() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--smoke-color-rgb")
    .trim();
  const values = raw
    .replaceAll(",", " ")
    .split(/\s+/)
    .map((n) => Number(n))
    .filter((n) => Number.isFinite(n))
    .slice(0, 3);

  if (values.length !== 3) return [122, 132, 145] as const;
  return values.map((n) => clamp(Math.round(n), 0, 255)) as [
    number,
    number,
    number,
  ];
}

export default function SmokeFlow({
  density = "subtle",
  intensity = 1,
  paused = false,
  speed = 1,
  maxFps = 30,
  qualityScale = 1,
}: SmokeFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const stopRef = useRef(false);
  const lastTimeRef = useRef(0);
  const lastComputeRef = useRef(0);
  const visibleRef = useRef(true);
  const reducedMotionRef = useRef(false);

  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const lowRef = useRef<{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    imageData: ImageData;
    data: Uint8ClampedArray;
    lw: number;
    lh: number;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    stopRef.current = false;

    let smokeRgb = parseRgbVar();
    const observerClass = new MutationObserver(() => {
      smokeRgb = parseRgbVar();
    });
    observerClass.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onReduced = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
    };
    mq.addEventListener("change", onReduced);

    const onVisibility = () => {
      visibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();

    const setupBuffers = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = clamp(window.devicePixelRatio || 1, 1, 1.8);
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));

      if (
        w === sizeRef.current.w &&
        h === sizeRef.current.h &&
        dpr === sizeRef.current.dpr &&
        lowRef.current
      ) {
        return;
      }

      sizeRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const quality = w * h > 1800000 ? 0.22 : 0.28;
      const scale = clamp(qualityScale, 0.5, 1);
      const lw = Math.max(96, Math.floor(w * quality * scale));
      const lh = Math.max(72, Math.floor(h * quality * scale));
      const lowCanvas = document.createElement("canvas");
      lowCanvas.width = lw;
      lowCanvas.height = lh;
      const lowCtx = lowCanvas.getContext("2d", { willReadFrequently: true });
      if (!lowCtx) return;
      const imageData = lowCtx.createImageData(lw, lh);

      lowRef.current = {
        canvas: lowCanvas,
        ctx: lowCtx,
        imageData,
        data: imageData.data,
        lw,
        lh,
      };
    };

    const resizeObserver = new ResizeObserver(setupBuffers);
    resizeObserver.observe(canvas);
    setupBuffers();

    const draw = (time: number) => {
      if (stopRef.current) return;
      rafRef.current = window.requestAnimationFrame(draw);
      if (!visibleRef.current || paused) return;
      if (document.documentElement.classList.contains("theme-transitioning")) {
        return;
      }

      const low = lowRef.current;
      const { w, h } = sizeRef.current;
      if (!low || !w || !h) return;

      const reduced = reducedMotionRef.current;
      const dt = clamp((time - lastTimeRef.current) / 16.667, 0.2, 2.2);
      lastTimeRef.current = time;
      const frameInterval = 1000 / clamp(maxFps, 12, 60);
      const shouldRecompute =
        reduced || time - lastComputeRef.current >= frameInterval;

      const motion = reduced ? 0.08 : speed;
      const densityBoost = DENSITY_MULTIPLIER[density] * clamp(intensity, 0.5, 1.8);

      if (shouldRecompute) {
        const t1 = time * 0.000075 * motion;
        const t2 = time * 0.000052 * motion;
        const windX = Math.sin(time * 0.00013) * 0.55;
        const windY = Math.cos(time * 0.00011) * 0.34;

        const { data, imageData, lw, lh } = low;
        const [r, g, b] = smokeRgb;

        let p = 0;
        for (let y = 0; y < lh; y += 1) {
          const ny = y / lh;
          const verticalMask = 0.45 + Math.sin(ny * Math.PI * 1.15) * 0.35;

          for (let x = 0; x < lw; x += 1) {
            const nx = x / lw;
            const sx = nx * 2.5 + t1 + windX;
            const sy = ny * 2.1 + t2 + windY;

            const nA = fbm(sx, sy, 4);
            const nB = fbm(sx * 1.7 + 19.2, sy * 1.4 - 7.6, 3);
            const n = nA * 0.72 + nB * 0.28;

            const threshold = 0.47 - (densityBoost - 1) * 0.06;
            const cloud = clamp((n - threshold) * 2.55, 0, 1);
            const alpha = clamp(
              cloud * verticalMask * 170 * densityBoost,
              0,
              190,
            );

            data[p] = r;
            data[p + 1] = g;
            data[p + 2] = b;
            data[p + 3] = alpha;
            p += 4;
          }
        }
        low.ctx.putImageData(imageData, 0, 0);
        lastComputeRef.current = time;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.imageSmoothingEnabled = true;
      ctx.filter = reduced ? "blur(6px)" : "blur(10px)";

      ctx.globalAlpha = reduced ? 0.38 : 0.52;
      ctx.drawImage(low.canvas, 0, 0, w, h);

      const driftX = (Math.sin(time * 0.00008) * 24 + 24) * motion * 0.42;
      const driftY = (Math.cos(time * 0.00006) * 16 + 16) * motion * 0.42;
      ctx.globalAlpha = reduced ? 0.2 : 0.28;
      ctx.drawImage(low.canvas, -driftX, -driftY, w + driftX, h + driftY);

      ctx.restore();

      void dt;
    };

    rafRef.current = window.requestAnimationFrame((t) => {
      lastTimeRef.current = t;
      draw(t);
    });

    return () => {
      stopRef.current = true;
      observerClass.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mq.removeEventListener("change", onReduced);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [density, intensity, paused, speed, maxFps, qualityScale]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="smoke-canvas pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

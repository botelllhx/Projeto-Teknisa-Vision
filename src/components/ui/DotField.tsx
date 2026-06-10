import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Campo de pontos VIVO (§6 Spotlight de IA) — a assinatura visual da IA, em chave clara.
 *
 * Full-bleed (cobre a seção toda, atrás do conteúdo). Grade densa de pontos **azul-tinta/
 * navy sobre claro** (halftone, **sem glow**) com:
 *  - **movimento ambiente** contínuo (onda/ruído lento) — respira mesmo sem mouse;
 *  - **pulse** sutil por ponto (tamanho/opacidade);
 *  - **máscara radial** de densidade/opacidade: denso e opaco numa "zona de energia"
 *    perto do foco (centro/título), esvaindo para as bordas — sem cantos vazios;
 *  - **cursor**: repulsão de raio generoso + retorno por mola; perto do ponteiro os pontos
 *    **crescem e escurecem** (lente de atenção). Vivacidade no espírito do "dot distortion",
 *    mas adaptada ao claro (densidade + movimento + tinta, não brilho).
 *
 * A11y/perf: `prefers-reduced-motion` → estático; touch (sem cursor) → só ambiente, sem
 * repulsão; pausa fora da viewport e com aba oculta; `devicePixelRatio` capado; pontos de
 * opacidade ~0 são pulados (cull). Cores: escala `teknisa` (700 `#2a26ab`, 900 `#070652`).
 */
export function DotField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const GAP = 26; // densidade
    const REPEL = 150; // raio do cursor
    const REPEL2 = REPEL * REPEL;
    const FORCE = 4.2;
    const SPRING = 0.06;
    const DAMP = 0.84;

    type Dot = {
      ox: number;
      oy: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      mask: number; // 0..1 (radial: 1 = foco)
      phase: number; // fase do pulse/ambiente
    };
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const build = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const fx = width * 0.5;
      const fy = height * 0.34; // zona de energia perto do título
      const maxDist = Math.hypot(width, height) * 0.55;
      const cols = Math.ceil(width / GAP) + 1;
      const rows = Math.ceil(height / GAP) + 1;
      const offsetX = (width - (cols - 1) * GAP) / 2;
      const offsetY = (height - (rows - 1) * GAP) / 2;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = offsetX + c * GAP;
          const oy = offsetY + r * GAP;
          const d = Math.hypot(ox - fx, oy - fy);
          const mask = Math.max(0, 1 - d / maxDist); // 1 no foco → 0 nas bordas
          dots.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0, mask, phase: (c * 13 + r * 7) % 100 });
        }
      }
    };

    const paint = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const animate = !reduce;
      for (const d of dots) {
        // ambiente (deriva lenta) + pulse
        let breath = 0;
        if (animate) {
          const drift = 2.6 * d.mask;
          const ax = Math.sin(t * 0.0006 + d.ox * 0.02 + d.oy * 0.018) * drift;
          const ay = Math.cos(t * 0.0007 + d.oy * 0.022) * drift;
          // mola em direção a (origem + ambiente)
          d.vx += (d.ox + ax - d.x) * SPRING;
          d.vy += (d.oy + ay - d.y) * SPRING;
          breath = Math.sin(t * 0.002 + d.phase) * 0.5 + 0.5; // 0..1
        } else {
          d.x = d.ox;
          d.y = d.oy;
        }

        // cursor (lente de atenção)
        let near = 0;
        if (animate && finePointer && mouse.active) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < REPEL2 && dist2 > 0.01) {
            const dist = Math.sqrt(dist2);
            near = 1 - dist / REPEL;
            const f = near * FORCE;
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
          }
        }

        if (animate) {
          d.vx *= DAMP;
          d.vy *= DAMP;
          d.x += d.vx;
          d.y += d.vy;
        }

        const disp = Math.min(Math.hypot(d.x - d.ox, d.y - d.oy) / REPEL, 1);
        const energy = Math.max(near, disp);
        const radius = (1.4 + d.mask * 0.8) * (1 + breath * 0.18) + energy * 2.1;
        const baseAlpha = 0.12 + d.mask * 0.34 + breath * 0.05 * d.mask;
        const alpha = Math.min(baseAlpha + energy * 0.4, 0.72);
        if (alpha < 0.05) continue; // cull bordas
        ctx.fillStyle =
          energy > 0.4 ? `rgba(7, 6, 82, ${alpha})` : `rgba(42, 38, 171, ${alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    let visible = true;
    const loop = (t: number) => {
      paint(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce) return;
      if (visible && !document.hidden && !raf) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    build();
    if (reduce) paint(0);
    else start();

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };
    if (finePointer && !reduce) {
      parent.addEventListener("pointermove", onMove);
      parent.addEventListener("pointerleave", onLeave);
    }

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) paint(0);
    });
    ro.observe(parent);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(parent);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden className={cn("absolute inset-0 h-full w-full", className)} />
  );
}

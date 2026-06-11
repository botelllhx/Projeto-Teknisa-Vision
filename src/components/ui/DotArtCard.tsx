import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { DOT_BLUE, DOT_CHARCOAL, type DotDraw } from "@/lib/dotDraws";

/**
 * Halftone de pontos (dot-art) das capacidades do §6 (TeknisAI).
 *
 * Amostra a forma (DotDraw) numa grade e desenha um **círculo azul por célula**, com raio
 * proporcional à cobertura da forma = halftone. Acento (`sinal no ruído`) em azul mais claro.
 * Lazy (inicia ao entrar na viewport), estático por padrão; **respira só quando `active`**
 * (hover/foco) fora de reduced-motion. Decorativo (`aria-hidden`); rótulo/foco no card pai.
 *
 * Nota: a lib asciify (vídeo→ASCII em tela cheia) renderizava em branco neste uso por card;
 * trocada por este renderizador de pontos focado, recolorido nos tons da marca (azul/charcoal).
 */
const DOT_ACCENT = "#9aa6ff"; // azul mais claro (família teknisa) para os pontos de destaque
const CELL = 9; // px por ponto

export function DotArtCard({
  draw,
  active = false,
  fit = "square",
  dotColor = DOT_BLUE,
  accentColor = DOT_ACCENT,
  className,
}: {
  draw: DotDraw;
  active?: boolean;
  /** "square": desenha a forma num quadrado central (proporcional, não estica). "fill": usa o card todo. */
  fit?: "square" | "fill";
  /** Cor dos pontos (adapta ao fundo do card). */
  dotColor?: string;
  accentColor?: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderRef = useRef<((t: number) => void) | null>(null);
  const [ready, setReady] = useState(false);

  // init lazy + render estático
  useEffect(() => {
    const out = canvasRef.current;
    if (!out) return;

    const start = () => {
      const r = out.getBoundingClientRect();
      const W = Math.max(2, Math.round(r.width));
      const H = Math.max(2, Math.round(r.height));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      out.width = Math.round(W * dpr);
      out.height = Math.round(H * dpr);
      const octx = out.getContext("2d");
      if (!octx) return;
      octx.scale(dpr, dpr);

      const cols = Math.ceil(W / CELL);
      const rows = Math.ceil(H / CELL);
      const src = document.createElement("canvas");
      src.width = cols;
      src.height = rows;
      const sctx = src.getContext("2d", { willReadFrequently: true });
      if (!sctx) return;

      renderRef.current = (t: number) => {
        sctx.fillStyle = DOT_CHARCOAL;
        sctx.fillRect(0, 0, cols, rows);
        if (fit === "fill") {
          draw(sctx, cols, rows, t);
        } else {
          // desenha a forma num quadrado central → proporcional (não estica em cards largos/altos)
          const sq = Math.min(cols, rows);
          sctx.save();
          sctx.translate((cols - sq) / 2, (rows - sq) / 2);
          draw(sctx, sq, sq, t);
          sctx.restore();
        }
        const d = sctx.getImageData(0, 0, cols, rows).data;
        octx.clearRect(0, 0, W, H); // fundo transparente: compõe sobre o card
        for (let cy = 0; cy < rows; cy++) {
          for (let cx = 0; cx < cols; cx++) {
            const i = (cy * cols + cx) * 4;
            // quão "azul/forma" é a célula (forma azul sobre charcoal)
            const v = (d[i + 2] - 40) / 215 - d[i] * 0.0008;
            if (v > 0.08) {
              const rad = Math.min(CELL * 0.46, CELL * 0.5 * Math.min(1, v * 1.25));
              octx.fillStyle = (cx * 7 + cy * 13) % 31 === 0 ? accentColor : dotColor;
              octx.beginPath();
              octx.arc(cx * CELL + CELL / 2, cy * CELL + CELL / 2, rad, 0, Math.PI * 2);
              octx.fill();
            }
          }
        }
      };
      renderRef.current(0);
      setReady(true);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(out);
    return () => io.disconnect();
  }, [draw, fit, dotColor, accentColor]);

  // respiração: rAF só enquanto `active` e fora de reduced-motion
  useEffect(() => {
    if (!ready || !active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let stop = false;
    const loop = (t: number) => {
      renderRef.current?.(t);
      if (!stop) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      stop = true;
      cancelAnimationFrame(raf);
    };
  }, [ready, active]);

  return <canvas ref={canvasRef} aria-hidden className={cn(className)} />;
}

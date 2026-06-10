import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

/**
 * Assinatura de movimento da Teknisa IA (§6) — a animação que EXPLICA o produto sem texto.
 *
 * Pontos de dados entram pelas bordas e **fluem por caminhos curvos suaves** (estilo
 * editorial/Flow) que **convergem e se resolvem numa "decisão"** no ponto focal central.
 * Narra a copy: "a IA lê milhões de pontos da operação e devolve decisão, antes do
 * problema". Mesma curva de ease do projeto (EASE) — é a assinatura repetida nos cards.
 *
 * Escalável (SVG viewBox; pontos movidos por rAF via getPointAtLength). reduced-motion →
 * diagrama **estático mas composto** (pontos distribuídos + nó de decisão). Pausa fora da
 * viewport e com aba oculta. Cores: escala teknisa (sem cor nova). Conteúdo da decisão é
 * placeholder abstrato — // TODO: exemplo real (marketing), sem número/claim inventado.
 */

const VW = 720;
const VH = 300;

// 6 caminhos suaves convergindo ao centro (360,150).
const PATHS = [
  "M14,54 C150,60 250,110 360,150",
  "M6,150 C150,128 250,172 360,150",
  "M22,250 C160,244 256,188 360,150",
  "M706,54 C570,60 470,110 360,150",
  "M714,150 C570,128 470,172 360,150",
  "M698,250 C560,244 464,188 360,150",
];
const DOTS_PER_PATH = 3;
// (pathIndex, phase) por ponto
const DOTS = PATHS.flatMap((_, p) =>
  Array.from({ length: DOTS_PER_PATH }, (_, k) => ({ p, phase: k / DOTS_PER_PATH })),
);

const smoothstep = (x: number) => x * x * (3 - 2 * x);

export function SignatureFlow({ className }: { className?: string }) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const paths = pathRefs.current;
    const circles = dotRefs.current;
    if (!paths.length || !circles.length) return;
    const lengths = paths.map((p) => (p ? p.getTotalLength() : 0));

    const place = (pe: number, i: number) => {
      const { p } = DOTS[i];
      const path = paths[p];
      const c = circles[i];
      if (!path || !c) return;
      const pt = path.getPointAtLength(pe * lengths[p]);
      const fadeIn = Math.min(pe / 0.12, 1);
      const fadeOut = 1 - Math.min(Math.max((pe - 0.8) / 0.2, 0), 1);
      c.setAttribute("cx", pt.x.toFixed(2));
      c.setAttribute("cy", pt.y.toFixed(2));
      c.setAttribute("opacity", (fadeIn * fadeOut * 0.9).toFixed(3));
    };

    if (reduce) {
      // diagrama estático: pontos distribuídos ao longo dos caminhos
      DOTS.forEach((d, i) => place(0.32 + d.phase * 0.42, i));
      return;
    }

    let raf = 0;
    let visible = true;
    const SPEED = 0.00009;
    const loop = (t: number) => {
      for (let i = 0; i < DOTS.length; i++) {
        const prog = (t * SPEED + DOTS[i].phase) % 1;
        place(smoothstep(prog), i);
      }
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (visible && !document.hidden && !raf) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    start();

    const el = pathRefs.current[0]?.ownerSVGElement?.parentElement;
    const io = el
      ? new IntersectionObserver(
          ([e]) => {
            visible = e.isIntersecting;
            if (visible) start();
            else stop();
          },
          { threshold: 0 },
        )
      : null;
    if (el) io?.observe(el);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce]);

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden
      >
        {/* trilhas suaves (faint) */}
        {PATHS.map((d, i) => (
          <path
            key={i}
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            d={d}
            stroke="hsl(var(--primary))"
            strokeOpacity={0.12}
            strokeWidth={1.5}
          />
        ))}
        {/* origens dos dados (pontos faint) */}
        {PATHS.map((d, i) => {
          const m = d.match(/^M([\d.]+),([\d.]+)/);
          const x = m ? Number(m[1]) : 0;
          const y = m ? Number(m[2]) : 0;
          return <circle key={`o-${i}`} cx={x} cy={y} r={2} fill="hsl(var(--primary))" opacity={0.18} />;
        })}
        {/* pontos de dados em fluxo */}
        {DOTS.map((_, i) => (
          <circle
            key={`d-${i}`}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            r={2.4}
            fill="hsl(var(--primary))"
            opacity={0}
          />
        ))}
      </svg>

      {/* anel pulsante no foco (cadência da "decisão") */}
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30"
          animate={{ scale: [0.8, 1.25], opacity: [0.4, 0] }}
          transition={{ duration: 2.4, ease: EASE, repeat: Infinity }}
        />
      )}

      {/* nó de decisão — card no sistema de design (rounded-2xl, sombra, ring) */}
      <div className="absolute left-1/2 top-1/2 w-44 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="rounded-2xl bg-white/95 p-4 shadow-lg ring-1 ring-border backdrop-blur"
        >
          {/* TODO: exemplo real de decisão (marketing) — sem número/claim inventado */}
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-xs font-semibold text-primary">Decisão</span>
          </div>
          <div className="mt-3 space-y-1.5" aria-hidden>
            <div className="h-2 w-28 rounded-full bg-secondary" />
            <div className="h-2 w-20 rounded-full bg-secondary" />
          </div>
          <span className="mt-3 inline-flex rounded-full bg-primary/10 px-2 py-1 text-[11px] font-semibold text-primary">
            recomendação
          </span>
        </motion.div>
      </div>
    </div>
  );
}

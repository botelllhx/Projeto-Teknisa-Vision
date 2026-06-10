import { GrainGradient } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DotField } from "@/components/ui/DotField";
import { AiBento } from "@/components/ui/AiBento";
import { EASE } from "@/lib/motion";

/**
 * §6 · Spotlight de IA — seção CLARA (anti-dark), com identidade própria ("Teknisa IA").
 *
 * Camadas (uma linguagem): (1) FUNDO = grain gradient azul sutil (Paper Shaders), base
 * quieta e dialável; (2) ASSINATURA = DotField full-bleed VIVO (ambiente + cursor +
 * máscara radial), o herói visual; (3) CONTEÚDO centralizado = badge "Teknisa IA" +
 * eyebrow + H2 + subhead + CTAs, seguido do **bento de capacidades de IA**.
 *
 * Hierarquia anti-salada: gradiente discreto; o dot field é o único que reage ao cursor.
 * Copy em registro de BENEFÍCIO. Só azul/navy/ink/neutros (sem cor nova). A11y: vinheta
 * clara atrás do texto (AA); reduced-motion/touch tratados no DotField/AiBento.
 */

/** Gradiente de base — quieto, dialável. `enabled:false` → fundo chapado (fecha só com o dot field). */
const GRADIENT = {
  enabled: true,
  colorBack: "#ffffff",
  colors: ["#eef1ff", "#c6ccff", "#7c7ff9"], // teknisa 50 / 200 / 400 (claros)
  softness: 1,
  intensity: 0.28,
  noise: 0.12,
  speed: 0.25,
  shape: "wave" as const,
};

/** Dot-motif (3×3) do lockup "Teknisa IA". */
function DotMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden fill="currentColor">
      {[3, 8, 13].flatMap((y) => [3, 8, 13].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r={1.3} />))}
    </svg>
  );
}

export function AISection() {
  return (
    <section
      id="ia"
      aria-label="Inteligência artificial aplicada"
      className="relative scroll-mt-24 overflow-hidden bg-background"
    >
      {/* (1) fundo — grain gradient azul, base quieta */}
      {GRADIENT.enabled && (
        <div className="absolute inset-0 z-0" aria-hidden>
          <GrainGradient
            style={{ width: "100%", height: "100%" }}
            colorBack={GRADIENT.colorBack}
            colors={GRADIENT.colors}
            softness={GRADIENT.softness}
            intensity={GRADIENT.intensity}
            noise={GRADIENT.noise}
            speed={GRADIENT.speed}
            shape={GRADIENT.shape}
          />
          <div className="absolute inset-0 bg-background/55" />
        </div>
      )}

      {/* (2) assinatura — dot field full-bleed, vivo */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <DotField className="pointer-events-none" />
      </div>

      {/* (3) conteúdo */}
      <div className="section-container relative z-10 py-24 lg:py-32">
        {/* header centralizado */}
        <div className="relative mx-auto max-w-2xl text-center">
          {/* vinheta clara atrás do texto (legibilidade AA, sem matar os pontos ao redor) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-16 -inset-y-10 -z-10 [background:radial-gradient(ellipse_62%_72%_at_50%_42%,hsl(var(--background))_0%,hsl(var(--background)/0.72)_46%,transparent_78%)]"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-3.5 py-1.5 text-sm font-semibold text-primary shadow-sm backdrop-blur">
              <DotMark className="h-3.5 w-3.5" />
              Teknisa IA
            </span>

            <span className="mt-6 block text-sm font-semibold text-primary">
              Inteligência aplicada à operação
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              A operação que <span className="text-primary">se antecipa</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A IA da Teknisa lê os milhões de pontos da sua operação e devolve decisão: o que
              produzir, o que comprar e onde cortar desperdício, antes de o problema aparecer.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contato"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"
              >
                Ver a IA em ação
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contato"
                className="inline-flex h-11 items-center rounded-full border border-border bg-white/70 px-6 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-white"
              >
                Falar com especialista
              </a>
            </div>
          </motion.div>
        </div>

        {/* bento de capacidades */}
        <div className="mx-auto mt-14 max-w-5xl lg:mt-16">
          <AiBento />
        </div>
      </div>
    </section>
  );
}

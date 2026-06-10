import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SignatureFlow } from "@/components/ui/SignatureFlow";
import { AiBento } from "@/components/ui/AiBento";
import { EASE } from "@/lib/motion";

/**
 * §6 · Spotlight de IA — refeita como EXPERIÊNCIA, no sistema de design da Teknisa.
 *
 * Princípios do "Flow" traduzidos (não copiados): calma editorial, restrição, e uma
 * **animação que explica o produto** (data → decisão) como assinatura de movimento. Tudo
 * com os MESMOS tokens/componentes do resto (card `Shell` do §3, escala `teknisa`, EASE,
 * radius/sombra) — mesma família, não um app à parte. Fundo claro com profundidade via
 * tokens (sem WebGL). Copy em registro de BENEFÍCIO; só azul/navy/ink/neutros.
 */

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
      {/* foco claro (token) — profundidade calma atrás da assinatura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_56%_50%_at_50%_42%,hsl(var(--secondary))_0%,transparent_72%)]"
      />

      <div className="section-container relative py-24 lg:py-32">
        {/* header centralizado */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-3.5 py-1.5 text-sm font-semibold text-primary shadow-sm backdrop-blur">
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
              className="inline-flex h-11 items-center rounded-full border border-border bg-white/80 px-6 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-white"
            >
              Falar com especialista
            </a>
          </div>
        </motion.div>

        {/* assinatura de movimento: data → decisão (explica o produto sem texto) */}
        <SignatureFlow className="mx-auto mt-14 aspect-[12/5] w-full max-w-3xl lg:mt-16" />

        {/* capacidades — bento no sistema de design */}
        <div className="mx-auto mt-12 max-w-5xl lg:mt-16">
          <AiBento />
        </div>
      </div>
    </section>
  );
}

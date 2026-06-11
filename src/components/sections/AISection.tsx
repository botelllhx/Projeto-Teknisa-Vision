import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { DotArtCard } from "@/components/ui/DotArtCard";
import { cn } from "@/lib/utils";
import { EASE_EXPO } from "@/lib/motion";
import {
  AI_BRAND_AREA,
  AI_BRAND_LINE,
  AI_DEFAULT_HINT,
  AI_EYEBROW,
  AI_INTRO,
  AI_MOTIF,
  AI_STATEMENT,
  CAPABILITIES,
  DOT_DRAWS,
  type Capability,
} from "@/data/aiSection";

/**
 * §6 · Spotlight de IA — micro-narrativa "Apresentando → TeknisAI" + bento de dot-art.
 *
 * Showcase clara. **Texto à esquerda** (wordmark TeknisAI + intro + subtexto que muda no
 * hover/foco), **bento alinhado à direita** (grid 4×4, navbar-safe no 100vh). Variedade de
 * cards: só-texto, azul de acento, hero, arte, statement, coluna de motivo e assinatura.
 * Dot-art halftone azul (`DotArtCard`, proporcional via `fit`). Só azul + charcoal + branco.
 * Beats sem pressa. Snap gentil via Lenis (desktop). Reduced-motion/mobile: final imediato,
 * dot-art estático, sem snap.
 */
const CARD_BASE =
  "group relative overflow-hidden rounded-3xl text-left ring-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:min-h-0";

function TypingBubble() {
  const reduced = useReducedMotion();
  return (
    <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-secondary px-5 py-4">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2.5 w-2.5 rounded-full bg-foreground/55"
          animate={reduced ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.16, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function AiCard({
  cap,
  active,
  onActivate,
  onDeactivate,
}: {
  cap: Capability;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const handlers = {
    onMouseEnter: onActivate,
    onMouseLeave: onDeactivate,
    onFocus: onActivate,
    onBlur: onDeactivate,
  };
  const wide = cap.variant === "split" || cap.variant === "text";
  const cls = cn(CARD_BASE, cap.area, wide && "sm:col-span-2");
  const art = (extra?: string) => (
    <DotArtCard draw={DOT_DRAWS[cap.draw]} active={active} className={cn("absolute inset-0 h-full w-full", extra)} />
  );

  if (cap.variant === "text") {
    // só-texto (sem arte)
    return (
      <button type="button" {...handlers} aria-label={`${cap.title}. ${cap.body}`} className={cn(cls, "flex min-h-[180px] flex-col justify-center bg-[#15151b] p-7 ring-white/10 hover:ring-white/25")}>
        <h3 className="font-display text-xl font-semibold text-white">{cap.title}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">{cap.body}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#9aa6ff]">
          Conhecer
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </button>
    );
  }

  if (cap.variant === "split") {
    // hero (arte em cima + texto embaixo)
    return (
      <button type="button" {...handlers} aria-label={`${cap.title}. ${cap.body}`} className={cn(cls, "flex min-h-[300px] flex-col bg-[#15151b] ring-white/10 hover:ring-white/25")}>
        <div className="relative min-h-0 flex-1">{art()}</div>
        <div className="relative border-t border-white/10 p-6">
          <h3 className="font-display text-xl font-semibold text-white">{cap.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">{cap.body}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#9aa6ff]">
            Conhecer
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </button>
    );
  }

  if (cap.variant === "blue") {
    return (
      <button type="button" {...handlers} aria-label={`${cap.title}. ${cap.body}`} className={cn(cls, "flex min-h-[180px] flex-col justify-end bg-primary ring-white/15 hover:ring-white/30")}>
        {art("opacity-85")}
        <div className="relative bg-gradient-to-t from-primary via-primary/85 to-transparent p-5 pt-12">
          <h3 className="font-display text-base font-semibold text-white">{cap.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-white/75">{cap.lead}</p>
        </div>
      </button>
    );
  }

  // "art": arte + rótulo
  return (
    <button type="button" {...handlers} aria-label={`${cap.title}. ${cap.body}`} className={cn(cls, "min-h-[180px] bg-[#15151b] ring-white/10 hover:ring-white/25")}>
      {art()}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#15151b] via-[#15151b]/85 to-transparent p-5 pt-12">
        <h3 className="font-display text-base font-semibold text-white">{cap.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-white/55">{cap.lead}</p>
      </div>
    </button>
  );
}

function StatementCard() {
  return (
    <div className={cn(CARD_BASE, AI_STATEMENT.area, "flex min-h-[160px] flex-col justify-center bg-[#15151b] p-7 ring-white/10 sm:col-span-2")}>
      <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-white lg:text-3xl">
        Do dado à <span className="text-[#9aa6ff]">decisão</span>, antes do problema aparecer.
      </p>
    </div>
  );
}

function MotifCard() {
  return (
    <div className={cn(CARD_BASE, AI_MOTIF.area, "hidden ring-white/10 lg:block lg:bg-[#15151b]")}>
      <DotArtCard draw={DOT_DRAWS[AI_MOTIF.draw]} fit="fill" className="absolute inset-0 h-full w-full" />
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-white/40">
        {AI_MOTIF.caption}
      </span>
    </div>
  );
}

function BrandCard() {
  return (
    <div className={cn(CARD_BASE, AI_BRAND_AREA, "flex min-h-[150px] flex-col justify-between bg-[#15151b] p-6 ring-white/10")}>
      <span className="font-wordmark text-2xl text-white">TeknisAI</span>
      <p className="text-sm leading-relaxed text-white/55">{AI_BRAND_LINE}</p>
    </div>
  );
}

export function AISection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0); // 0 intro · 1 revela TeknisAI · 2 layout final
  const [activeCap, setActiveCap] = useState<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setPhase(2);
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 1500);
    const t2 = setTimeout(() => setPhase(2), 3100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView, reduced]);

  const hint = activeCap === null ? AI_DEFAULT_HINT : CAPABILITIES[activeCap].lead;

  return (
    <section
      id="ia"
      ref={ref}
      data-snap-start
      aria-label="Inteligência artificial aplicada"
      className="relative min-h-screen scroll-mt-24 overflow-hidden bg-background pt-28 pb-16 lg:pt-36 lg:pb-20"
    >
      <div className="section-container grid w-full items-center gap-10 lg:grid-cols-[30%_70%] lg:gap-12 xl:gap-16">
        {/* ESQUERDA — narrativa (texto sempre à esquerda) */}
        <div className="relative min-h-[220px] lg:min-h-[300px]">
          {/* intro: Apresentando + balão (some no layout final) */}
          <AnimatePresence>
            {phase < 2 && (
              <motion.div
                key="intro"
                exit={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(12px)", y: -14 }}
                transition={{ duration: 0.6, ease: EASE_EXPO }}
                className="absolute inset-x-0 top-0"
              >
                <Reveal show={phase >= 0}>
                  <p className="font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
                    Apresentando
                  </p>
                </Reveal>
                <Reveal show={phase >= 0} delay={0.4} className="mt-7">
                  <TypingBubble />
                </Reveal>
                <motion.div
                  initial={false}
                  animate={
                    reduced
                      ? { opacity: phase >= 1 ? 1 : 0 }
                      : {
                          opacity: phase >= 1 ? 1 : 0,
                          filter: phase >= 1 ? "blur(0px)" : "blur(16px)",
                          scale: phase >= 1 ? 1 : 0.92,
                        }
                  }
                  transition={{ duration: 1, ease: EASE_EXPO }}
                  className="mt-7 origin-left"
                >
                  <span className="font-wordmark text-6xl text-foreground sm:text-7xl">TeknisAI</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* layout final */}
          {phase === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_EXPO }}
            >
              <span className="text-sm font-semibold text-primary">{AI_EYEBROW}</span>
              <h2 className="mt-2 font-wordmark text-6xl leading-[0.92] text-foreground sm:text-7xl xl:text-8xl">
                TeknisAI
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">{AI_INTRO}</p>
              <div className="mt-6 border-t border-border pt-4">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={hint}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.28 }}
                    className="flex items-center gap-2 text-sm font-semibold text-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {hint}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>

        {/* DIREITA — bento alinhado 4×4 */}
        <Reveal show={phase === 2}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:h-[calc(100svh-14rem)] lg:min-h-[40rem] lg:grid-cols-4 lg:grid-rows-4">
            {CAPABILITIES.map((c, i) => (
              <AiCard
                key={c.slug}
                cap={c}
                active={activeCap === i}
                onActivate={() => setActiveCap(i)}
                onDeactivate={() => setActiveCap(null)}
              />
            ))}
            <StatementCard />
            <BrandCard />
            <MotifCard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { DotArtCard } from "@/components/ui/DotArtCard";
import { cn } from "@/lib/utils";
import { EASE_EXPO } from "@/lib/motion";
import {
  AI_DEFAULT_HINT,
  AI_EYEBROW,
  AI_INTRO,
  CAPABILITIES,
  DOT_DRAWS,
  type CardTone,
  type Capability,
} from "@/data/aiSection";

/**
 * §6 · Spotlight de IA — micro-narrativa "Apresentando → TeknisAI" + bento de dot-art.
 *
 * Showcase clara: **texto à esquerda** (wordmark TeknisAI + intro + detalhe que muda no
 * hover/foco dos cards), **bento variado à direita**. Variedade real: 1 card **hero** com
 * arte grande + 5 **panels**, em **4 cores** (charcoal/azul vivo/navy/claro). Beats com
 * **blur**: "Apresentando" + balão → TeknisAI → cards entram em blur-stagger. Dot-art
 * halftone (`DotArtCard`), recolorido por tom. Navbar-safe no 100vh, sem clipar.
 */
const CARD_BASE =
  "group relative overflow-hidden rounded-3xl text-left transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:min-h-0";

const TONE: Record<
  CardTone,
  { card: string; text: string; sub: string; icon: string; dot: string; accent: string }
> = {
  charcoal: { card: "bg-[#15151b] ring-1 ring-white/10 hover:ring-white/25", text: "text-white", sub: "text-white/55", icon: "text-teknisa-300", dot: "#6175ff", accent: "#9aa6ff" },
  blue: { card: "bg-teknisa-600 ring-1 ring-white/15 hover:ring-white/30", text: "text-white", sub: "text-white/75", icon: "text-white", dot: "#c6ccff", accent: "#ffffff" },
  blue2: { card: "bg-teknisa-500 ring-1 ring-white/15 hover:ring-white/30", text: "text-white", sub: "text-white/80", icon: "text-white", dot: "#dfe2ff", accent: "#ffffff" },
  navy: { card: "bg-primary ring-1 ring-white/15 hover:ring-white/30", text: "text-white", sub: "text-white/65", icon: "text-teknisa-300", dot: "#9aa6ff", accent: "#c6ccff" },
  light: { card: "bg-secondary ring-1 ring-border hover:ring-primary/40", text: "text-foreground", sub: "text-muted-foreground", icon: "text-primary", dot: "#040486", accent: "#5a59ef" },
};

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
  variants,
  onActivate,
  onDeactivate,
}: {
  cap: Capability;
  active: boolean;
  variants: Variants;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const t = TONE[cap.tone];
  const Icon = cap.icon;
  const handlers = { onMouseEnter: onActivate, onMouseLeave: onDeactivate, onFocus: onActivate, onBlur: onDeactivate };

  const label = (big: boolean) => (
    <div className="flex items-center gap-2">
      <Icon className={cn("shrink-0", big ? "h-5 w-5" : "h-4 w-4", t.icon)} aria-hidden />
      <span className={cn("font-semibold", big ? "text-xs" : "text-[11px]", t.sub)}>{cap.name}</span>
    </div>
  );

  // só-texto (sem arte): ícone + nome + frase + detalhe
  if (cap.layout === "text") {
    return (
      <motion.button
        type="button"
        variants={variants}
        {...handlers}
        aria-label={`${cap.name}. ${cap.hover}`}
        className={cn(CARD_BASE, cap.area, "flex flex-col justify-center p-6", t.card)}
      >
        {label(true)}
        <p className={cn("mt-4 font-display text-2xl font-bold leading-tight tracking-tight lg:text-3xl", t.text)}>
          {cap.cardLine}
        </p>
      </motion.button>
    );
  }

  if (cap.layout === "hero") {
    return (
      <motion.button
        type="button"
        variants={variants}
        {...handlers}
        aria-label={`${cap.name}. ${cap.hover}`}
        className={cn(CARD_BASE, cap.area, "flex min-h-[300px] flex-col sm:col-span-2", t.card)}
      >
        <div className="relative min-h-0 flex-1">
          <DotArtCard draw={DOT_DRAWS[cap.draw]} fit="fill" active={active} dotColor={t.dot} accentColor={t.accent} className="absolute inset-0 h-full w-full" />
        </div>
        <div className="relative p-6">
          {label(true)}
          <p className={cn("mt-1.5 font-display text-xl font-semibold leading-snug tracking-tight", t.text)}>
            {cap.cardLine}
          </p>
        </div>
      </motion.button>
    );
  }

  // panel: rótulo (com ícone) em cima, arte preenchendo embaixo
  return (
    <motion.button
      type="button"
      variants={variants}
      {...handlers}
      aria-label={`${cap.name}. ${cap.hover}`}
      className={cn(CARD_BASE, cap.area, "flex min-h-[170px] flex-col", t.card)}
    >
      <div className="p-5 pb-1.5">
        {label(false)}
        <p className={cn("mt-1 font-display text-base font-semibold leading-snug tracking-tight", t.text)}>
          {cap.cardLine}
        </p>
      </div>
      <div className="relative min-h-0 flex-1">
        <DotArtCard draw={DOT_DRAWS[cap.draw]} fit="square" active={active} dotColor={t.dot} accentColor={t.accent} className="absolute inset-0 h-full w-full" />
      </div>
    </motion.button>
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
    const t2 = setTimeout(() => setPhase(2), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView, reduced]);

  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
  const item: Variants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, filter: "blur(16px)", y: 22 },
        show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.65, ease: EASE_EXPO } },
      };

  return (
    <section
      id="ia"
      ref={ref}
      data-snap-start
      aria-label="Inteligência artificial aplicada"
      className="relative min-h-screen scroll-mt-24 bg-background pt-28 pb-16 lg:pt-32 lg:pb-16"
    >
      <div className="section-container grid w-full items-center gap-10 lg:grid-cols-[30%_70%] lg:gap-12 xl:gap-16">
        {/* ESQUERDA — narrativa */}
        <div className="relative min-h-[240px] lg:min-h-[320px]">
          <AnimatePresence>
            {phase < 2 && (
              <motion.div
                key="intro"
                exit={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(14px)", y: -16 }}
                transition={{ duration: 0.7, ease: EASE_EXPO }}
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
                      : { opacity: phase >= 1 ? 1 : 0, filter: phase >= 1 ? "blur(0px)" : "blur(18px)", scale: phase >= 1 ? 1 : 0.92 }
                  }
                  transition={{ duration: 1, ease: EASE_EXPO }}
                  className="mt-7 origin-left"
                >
                  <span className="font-wordmark text-6xl text-foreground sm:text-7xl">TeknisAI</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {phase === 2 && (
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(10px)", y: 14 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.8, ease: EASE_EXPO }}
            >
              <span className="text-sm font-semibold text-primary">{AI_EYEBROW}</span>
              <h2 className="mt-2 font-wordmark text-6xl leading-[0.92] text-foreground sm:text-7xl xl:text-8xl">
                TeknisAI
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">{AI_INTRO}</p>
              <div className="mt-6 min-h-[5.5rem] border-t border-border pt-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCap ?? "default"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28 }}
                  >
                    {activeCap === null ? (
                      <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {AI_DEFAULT_HINT}
                      </p>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-primary">{CAPABILITIES[activeCap].name}</p>
                        <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
                          {CAPABILITIES[activeCap].hover}
                        </p>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>

        {/* DIREITA — bento variado (blur-stagger) */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={phase === 2 ? "show" : "hidden"}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:h-[calc(100svh-12rem)] lg:min-h-[30rem] lg:grid-cols-12 lg:grid-rows-2"
        >
          {CAPABILITIES.map((c, i) => (
            <AiCard
              key={c.slug}
              cap={c}
              active={activeCap === i}
              variants={item}
              onActivate={() => setActiveCap(i)}
              onDeactivate={() => setActiveCap(null)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

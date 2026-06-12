import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EVENTS } from "@/data/events";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * §10 · Onde nos encontrar — **slider de eventos**. Topo branco (eyebrow + título), depois uma
 * **imagem full-width com halftone** (parallax: cresce no scroll) e uma **faixa com a cor da marca
 * do evento** (logo + texto + seta). É um **slider** entre eventos (auto-avança + setas, pausa no
 * hover): cada evento tem `theme` (Fispal = faixa branca, Food Service Show = faixa navy) e a troca
 * **escurece** a área na transição (os slides dão crossfade sobre uma base escura). `Reveal` na
 * entrada. `prefers-reduced-motion`: sem auto-avanço/parallax/blur (troca instantânea, setas). Halftone
 * aplicado no código; textos `// TODO`.
 */
const AUTO_MS = 6500;

export function EventsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const n = EVENTS.length;
  const go = (i: number) => setIndex(((i % n) + n) % n);

  useEffect(() => {
    if (reduced || paused || n < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % n), AUTO_MS);
    return () => clearTimeout(t);
  }, [index, paused, reduced, n]);

  // parallax: a imagem cresce conforme a seção passa pela viewport
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.18]);

  const ev = EVENTS[index];
  const dark = ev.theme === "dark";

  return (
    <section id="eventos" ref={ref} aria-label="Onde nos encontrar" className="scroll-mt-24 bg-background">
      {/* topo branco: eyebrow + título */}
      <div className="section-container pb-10 pt-20 lg:pt-28">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
        >
          <span className="text-sm font-semibold text-primary">Nossos Eventos &amp; Participações</span>
          <h2 className="mt-2 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[4rem]">
            Onde nos encontrar
          </h2>
        </motion.div>
      </div>

      {/* slider full-width sobre base escura (dá o escurecimento na troca) */}
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.985 }}
        animate={inView ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.8, ease: EASE_EXPO }}
        className="relative w-full overflow-hidden bg-[#070b1c]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        role="group"
        aria-roledescription="carrossel"
        aria-label="Eventos e participações da Teknisa"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={ev.id}
            initial={reduced ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, transition: { duration: 0.4, ease: EASE_EXPO } }}
            transition={{ duration: 0.65, ease: EASE_EXPO }}
            aria-roledescription="slide"
            aria-label={`${ev.name} (${index + 1} de ${n})`}
          >
            {/* imagem com halftone (parallax) */}
            <div className="relative h-[40vh] overflow-hidden sm:h-[48vh] lg:h-[56vh]">
              <motion.img
                src={ev.image}
                alt={ev.imageAlt}
                style={{ scale: reduced ? 1 : imgScale }}
                className="evt-halftone h-full w-full object-cover"
              />
              <div className="evt-dots" />
            </div>

            {/* faixa com a cor da marca do evento */}
            <div className={cn("transition-colors", dark ? "bg-[#0a1340] text-white" : "bg-white text-foreground")}>
              <div className="section-container grid items-center gap-7 pb-20 pt-10 lg:grid-cols-[auto_1fr] lg:gap-14 lg:pb-24 lg:pt-12">
                <div className="flex items-center">
                  <img src={ev.logo} alt={ev.logoAlt} className={cn("w-auto", ev.logoClass)} />
                </div>
                <div className="max-w-2xl lg:justify-self-end lg:text-right">
                  <p className={cn("text-lg leading-relaxed lg:text-xl", dark ? "text-white/80" : "text-foreground/70")}>
                    {ev.text}
                  </p>
                  {ev.cta && (
                    <a
                      href={ev.cta.url}
                      className={cn(
                        "mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                        dark
                          ? "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 focus-visible:ring-white focus-visible:ring-offset-[#0a1340]"
                          : "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary",
                      )}
                    >
                      {ev.cta.label}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* controles: dots + setas (a seta → aponta para o próximo, como no rascunho) */}
        <div className="section-container pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-between lg:bottom-8">
          <div className="pointer-events-auto flex items-center gap-2">
            {EVENTS.map((e, i) => (
              <button
                key={e.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ir para ${e.name}`}
                aria-current={i === index}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index ? "w-7" : "w-2",
                  dark
                    ? i === index
                      ? "bg-white"
                      : "bg-white/40 hover:bg-white/70"
                    : i === index
                      ? "bg-primary"
                      : "bg-foreground/25 hover:bg-foreground/50",
                )}
              />
            ))}
          </div>
          <div className="pointer-events-auto flex items-center gap-2">
            {[
              { Icon: ArrowLeft, fn: () => go(index - 1), label: "Evento anterior" },
              { Icon: ArrowRight, fn: () => go(index + 1), label: "Próximo evento" },
            ].map(({ Icon, fn, label }) => (
              <button
                key={label}
                type="button"
                onClick={fn}
                aria-label={label}
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-full backdrop-blur transition-colors focus-visible:outline-none focus-visible:ring-2",
                  dark
                    ? "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 focus-visible:ring-white"
                    : "bg-foreground/5 text-foreground ring-1 ring-foreground/15 hover:bg-foreground/10 focus-visible:ring-primary",
                )}
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

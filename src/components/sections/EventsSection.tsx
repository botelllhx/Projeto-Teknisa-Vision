import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EVENTS } from "@/data/events";
import { EASE_EXPO } from "@/lib/motion";
import { useHalftone } from "@/lib/halftone";
import { cn } from "@/lib/utils";

/**
 * §10 · Onde nos encontrar — **slider de eventos**. Topo branco (eyebrow + título), imagem
 * full-width com **halftone real** (canvas, `useHalftone`) e **parallax** (cresce no scroll), e
 * uma **faixa com a cor da marca do evento** (logo + texto bold à direita + seta). É um slider
 * (auto-avança + seta + dots, pausa no hover/foco): a troca **escurece** a área (a transição
 * mergulha no escuro via `brightness` + base navy). Food Service Show = faixa **azul da marca**
 * (`primary`), Fispal = faixa **branca**. `prefers-reduced-motion` → instantâneo; mobile empilha.
 */
const AUTO_MS = 7000;

function Slide({ index, scaleMV, reduced }: { index: number; scaleMV: MotionValue<number>; reduced: boolean }) {
  const ev = EVENTS[index];
  const dark = ev.theme === "dark";
  const halftone = useHalftone(ev.image);

  return (
    <motion.div
      key={ev.id}
      initial={reduced ? { opacity: 0 } : { opacity: 0, filter: "brightness(0.2)", scale: 1.04 }}
      animate={
        reduced
          ? { opacity: 1 }
          : { opacity: 1, filter: "brightness(1)", scale: 1, transition: { duration: 0.85, ease: EASE_EXPO } }
      }
      exit={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, filter: "brightness(0.2)", scale: 1.01, transition: { duration: 0.5, ease: EASE_EXPO } }
      }
    >
      {/* imagem halftone (parallax) */}
      <div className="relative h-[44vh] overflow-hidden bg-[#05060f] sm:h-[50vh] lg:h-[56vh]">
        {halftone && (
          <motion.img
            src={halftone}
            alt={ev.imageAlt}
            style={{ scale: reduced ? 1 : scaleMV }}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* faixa com a cor da marca */}
      <div className={dark ? "bg-primary text-white" : "bg-white text-foreground"}>
        <div className="section-container grid items-center gap-8 pb-24 pt-12 lg:grid-cols-[auto_1fr] lg:gap-20 lg:pb-28 lg:pt-14">
          <div className="flex items-center">
            <img src={ev.logo} alt={ev.logoAlt} className={cn("w-auto", ev.logoClass)} />
          </div>
          <p
            className={cn(
              "max-w-2xl font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl lg:justify-self-end lg:text-right lg:text-[1.7rem]",
              dark ? "text-white" : "text-primary",
            )}
          >
            {ev.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

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

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.2]);

  const ev = EVENTS[index];
  const dark = ev.theme === "dark";

  return (
    <section id="eventos" ref={ref} aria-label="Onde nos encontrar" className="scroll-mt-24 bg-background">
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

      {/* slider — base navy escura dá o "escurecimento" na transição */}
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.99 }}
        animate={inView ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.8, ease: EASE_EXPO }}
        className="relative w-full overflow-hidden bg-[#04052a]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        role="group"
        aria-roledescription="carrossel"
        aria-label="Eventos e participações da Teknisa"
      >
        <AnimatePresence mode="wait">
          <Slide key={ev.id} index={index} scaleMV={imgScale} reduced={!!reduced} />
        </AnimatePresence>

        {/* controles: dots (esq) + seta → simples, sem círculo (dir) */}
        <div className="section-container absolute inset-x-0 bottom-7 flex items-center justify-between lg:bottom-10">
          <div className="flex items-center gap-2">
            {EVENTS.map((e, i) => (
              <button
                key={e.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ir para ${e.name}`}
                aria-current={i === index}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  i === index ? "w-8" : "w-2",
                  dark
                    ? cn(i === index ? "bg-white" : "bg-white/40 hover:bg-white/70", "focus-visible:ring-white focus-visible:ring-offset-primary")
                    : cn(i === index ? "bg-primary" : "bg-foreground/25 hover:bg-foreground/50", "focus-visible:ring-primary focus-visible:ring-offset-white"),
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Próximo evento"
            className={cn(
              "group/arrow -mr-1 rounded-md p-1 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              dark ? "text-white focus-visible:ring-white focus-visible:ring-offset-primary" : "text-primary focus-visible:ring-primary focus-visible:ring-offset-white",
            )}
          >
            <ArrowRight className="h-9 w-9 transition-transform duration-300 group-hover/arrow:translate-x-1 lg:h-11 lg:w-11" strokeWidth={2.25} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}

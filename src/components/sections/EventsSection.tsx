import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EVENTS, type EventSlide } from "@/data/events";
import { EASE_EXPO } from "@/lib/motion";
import { useHalftone } from "@/lib/halftone";
import { cn } from "@/lib/utils";

/**
 * §10 · Onde nos encontrar — **slider de eventos**. Topo branco (eyebrow + título), imagem
 * full-width com **halftone real** (canvas) + **parallax** (cresce no scroll), e uma **faixa com a
 * cor da marca** (logo grande + texto bold à direita + seta simples). Slider auto-avança + seta +
 * dots (pausa no hover/foco). Transição **suave**: os slides ficam **empilhados** e dão crossfade
 * de opacidade (sem `mode="wait"`, sem travar), e um **véu escuro pulsa de leve** na troca
 * (escurecimento gentil, sem filtros pesados). Food Service Show = faixa **azul da marca**
 * (`primary`), Fispal = **branca**. `prefers-reduced-motion` → instantâneo; mobile empilha.
 */
const AUTO_MS = 7000;

function Slide({
  ev,
  active,
  scaleMV,
  reduced,
}: {
  ev: EventSlide;
  active: boolean;
  scaleMV: MotionValue<number>;
  reduced: boolean;
}) {
  const dark = ev.theme === "dark";
  const halftone = useHalftone(ev.image);

  return (
    <motion.div
      className="col-start-1 row-start-1 flex flex-col"
      animate={{ opacity: active ? 1 : 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.9, ease: "easeInOut" }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      aria-hidden={!active}
    >
      {/* imagem halftone (parallax) */}
      <div className="relative h-[44vh] shrink-0 overflow-hidden bg-[#05060f] sm:h-[50vh] lg:h-[56vh]">
        {halftone && (
          <motion.img
            src={halftone}
            alt={ev.imageAlt}
            style={{ scale: reduced ? 1 : scaleMV }}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* faixa com a cor da marca — flex-1 preenche a altura (sem buraco escuro), conteúdo centrado */}
      <div className={cn("flex flex-1 items-center", dark ? "bg-primary text-white" : "bg-white text-foreground")}>
        <div className="section-container grid w-full items-center gap-8 pb-24 pt-10 lg:grid-cols-[auto_1fr] lg:gap-20 lg:pb-28 lg:pt-12">
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
  const inView = useInView(ref, { once: false, amount: 0.25 });
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const n = EVENTS.length;
  const go = (i: number) => setIndex(((i % n) + n) % n);

  useEffect(() => {
    if (reduced || paused || n < 2 || !inView) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % n), AUTO_MS);
    return () => clearTimeout(t);
  }, [index, paused, reduced, n, inView]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.18]);

  const dark = EVENTS[index].theme === "dark";

  return (
    <section id="eventos" ref={ref} aria-label="Onde nos encontrar" className="scroll-mt-24 bg-background">
      <div className="section-container pb-10 pt-20 lg:pt-28">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
        >
          <span className="text-sm font-semibold text-primary">Nossos Eventos &amp; Participações</span>
          <h2 className="mt-2 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[4rem]">
            Onde nos encontrar
          </h2>
        </motion.div>
      </div>

      {/* slider — base navy escura por trás (o véu escuro pulsa nela na troca) */}
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.99 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
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
        {/* slides empilhados (crossfade suave) */}
        <div className="grid">
          {EVENTS.map((ev, i) => (
            <Slide key={ev.id} ev={ev} active={i === index} scaleMV={imgScale} reduced={!!reduced} />
          ))}
        </div>

        {/* véu de escurecimento: pulsa de leve (0 → 0.5 → 0) a cada troca, sincronizado com o
            crossfade, dando o "escurecer e revelar" suave (key = index força o replay) */}
        {!reduced && (
          <motion.div
            key={index}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-[#02021c]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 1.0, ease: "easeInOut", times: [0, 0.42, 1] }}
          />
        )}

        {/* controles: dots (esq) + seta simples sem círculo (dir) */}
        <div className="section-container absolute inset-x-0 bottom-7 z-20 flex items-center justify-between lg:bottom-10">
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
              "group/arrow -mr-1 rounded-md p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
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

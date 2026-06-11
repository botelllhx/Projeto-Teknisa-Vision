import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { VideoCard } from "@/components/ui/VideoCard";
import { TextCard } from "@/components/ui/TextCard";
import { TESTIMONIALS, type Testimonial } from "@/data/cases";
import { cn } from "@/lib/utils";
import { EASE_EXPO } from "@/lib/motion";

/**
 * §8 · Cases — **carrossel horizontal infinito** (marquee) misturando cards de **vídeo**
 * (autoplay mudo, play com som no clique) + cards **textuais coloridos** (paleta). Cards grandes,
 * full-bleed. **Blur-reveal** ao entrar na viewport. Pausa no hover e quando um vídeo está com som.
 * `prefers-reduced-motion`: sem marquee (scroll manual) e sem blur. Conteúdo placeholder (`// TODO`).
 */
// margem à direita por card (espaçamento uniforme p/ o loop -50% fechar sem emenda)
const CARD_SIZE = "mr-5 h-[28rem] w-[20rem] sm:mr-6 sm:h-[30rem] sm:w-[22rem] lg:h-[34rem] lg:w-[26rem]";

export function CasesSection() {
  const [soundId, setSoundId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();

  const renderCard = (item: Testimonial, key: string) =>
    item.kind === "video" ? (
      <VideoCard
        key={key}
        data={item}
        className={CARD_SIZE}
        hasSound={soundId === item.id}
        anySound={soundId !== null}
        onActivateSound={() => setSoundId((cur) => (cur === item.id ? null : item.id))}
      />
    ) : (
      <TextCard key={key} data={item} className={CARD_SIZE} />
    );

  // track = dois conjuntos idênticos; o marquee desliza -50% (= 1 conjunto) sem emenda
  const track = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="cases" aria-label="Cases de sucesso" className="scroll-mt-24 overflow-hidden bg-background py-20 lg:py-28">
      <div className="section-container">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-primary">Histórias reais</span>
          <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[4rem]">
            Quem move a alimentação roda na Teknisa.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Grandes operações do food service rodam todo dia na plataforma. Dê o play e ouça quem vive
            a rotina.
          </p>
        </div>
      </div>

      {/* carrossel full-bleed, blur-reveal ao entrar */}
      <motion.div
        ref={ref}
        initial={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(22px)" }}
        animate={
          inView
            ? reduced
              ? { opacity: 1 }
              : { opacity: 1, filter: "blur(0px)" }
            : undefined
        }
        transition={{ duration: 0.9, ease: EASE_EXPO }}
        className="mt-12 lg:mt-16"
      >
        <div
          className="group relative w-full overflow-hidden motion-reduce:overflow-x-auto"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          }}
        >
          <div
            className={cn(
              "flex w-max",
              "motion-safe:animate-marquee group-hover:[animation-play-state:paused]",
              soundId !== null && "[animation-play-state:paused]",
            )}
          >
            {track.map((item, i) => renderCard(item, `${item.id}-${i}`))}
          </div>
        </div>
      </motion.div>

      <div className="section-container">
        <div className="mt-12 flex justify-center lg:mt-16">
          <a
            href="#contato"
            className="group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Ver todos os cases
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

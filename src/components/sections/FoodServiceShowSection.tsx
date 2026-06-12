import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { byType, STATUS_LABEL, type EventItem } from "@/data/events";
import { EASE_EXPO } from "@/lib/motion";

/**
 * §10 · Food Service Show & Feiras ("Onde nos encontrar") — **momento-assinatura ESCURO**.
 * Exceção de paleta escopada (navy + azul + **ciano** da identidade do FSS; o ciano só vive aqui).
 *
 * **Fundo 100% em código** (5 camadas: base · glow · horizonte · beams · grão + dot-motif sutil,
 * classes `.fss-*` no index.css). **Scroll-darken:** a atmosfera revela conforme a seção entra
 * (`useScroll`). **Entrada showcase** com timings exatos (blur/reveal, linguagem da §6 IA) +
 * **scroll-snap suave** (`[data-snap-start]`). **Sem mapa**: eventos em **cards** (não lista), com
 * toggle Food Service Show/Feiras (switch da §3). `prefers-reduced-motion`: instantâneo, sem snap.
 */
const FSS_LOGO = "/assets/teknisa/events/Food-Service-Show.svg";
const CYAN = "#7fd4ff"; // token de acento ESCOPADO ao FSS (não usar fora daqui)
const TABS = [
  { id: "turne", label: "Food Service Show" },
  { id: "feira", label: "Feiras" },
];

function FssWordmark() {
  return (
    <div className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
      <span className="text-white">Food Service </span>
      <span className="bg-gradient-to-r from-[#5b8cff] to-[#3ec6ff] bg-clip-text text-transparent">
        Show
      </span>
    </div>
  );
}

function EventCard({ ev }: { ev: EventItem }) {
  const open = ev.status === "inscricoes_abertas";
  return (
    <div className="event-card flex h-full flex-col gap-5 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium" style={{ color: CYAN }}>
          {ev.date ?? "Data em breve"}
        </span>
        {ev.status && (
          <span
            className={
              open
                ? "rounded-full bg-[#3ec6ff]/15 px-3 py-1 text-xs font-semibold text-[#cdeeff] ring-1 ring-[#7fd4ff]/40"
                : "rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/55 ring-1 ring-white/15"
            }
          >
            {STATUS_LABEL[ev.status]}
          </span>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-white/55">{ev.name}</p>
        <p className="mt-1 font-display text-2xl font-bold tracking-tight text-white">{ev.city}</p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-1">
        {ev.venue ? (
          <span className="text-sm text-white/50">{ev.venue}</span>
        ) : (
          <span aria-hidden />
        )}
        {ev.cta && (
          <a
            href={ev.cta.url}
            className="group/cta inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fd4ff]"
          >
            {ev.cta.label}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
          </a>
        )}
      </div>
    </div>
  );
}

export function FoodServiceShowSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const [tab, setTab] = useState(0);
  const [logoOk, setLogoOk] = useState(true);
  const [entered, setEntered] = useState(false);

  const show = reduced || inView;
  const items = byType(tab === 0 ? "turne" : "feira");

  // scroll-darken: a atmosfera (camadas) revela conforme a seção sobe na viewport
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start center"] });
  const atmosphere = useTransform(scrollYProgress, [0, 0.45], [0, 1]);

  useEffect(() => {
    if (!show || entered) return;
    const t = setTimeout(() => setEntered(true), 1500);
    return () => clearTimeout(t);
  }, [show, entered]);

  // entrada com timings exatos (linguagem blur/reveal da §6 IA); reduced = instantâneo
  const enter = (init: Record<string, number | string>, duration: number, delay: number) =>
    reduced
      ? { initial: false as const, animate: { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 } }
      : {
          initial: init,
          animate: show ? { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 } : init,
          transition: { duration, delay, ease: EASE_EXPO },
        };

  return (
    <section
      id="eventos"
      ref={ref}
      data-snap-start
      aria-label="Food Service Show e feiras"
      className="relative isolate min-h-[100svh] overflow-hidden scroll-mt-24 bg-[#050b1f] py-24 text-white lg:py-28"
    >
      {/* fundo cinematográfico — 5 camadas em código; revela com o scroll (scroll-darken) */}
      <motion.div
        aria-hidden
        style={{ opacity: reduced ? 1 : atmosphere }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="fss-base" />
        <div className="fss-glow" />
        <div className="fss-horizon" />
        <div className="fss-beams" />
        <div className="fss-grain" />
        <div className="fss-dots" />
      </motion.div>

      <div className="section-container relative">
        {/* showcase */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            {...enter({ opacity: 0, filter: "blur(8px)", y: 12 }, 0.5, 0.1)}
            className="block text-sm font-semibold"
            style={{ color: CYAN }}
          >
            Onde nos encontrar
          </motion.span>

          <motion.div
            {...enter({ opacity: 0, filter: "blur(16px)", scale: 0.96 }, 0.8, 0.25)}
            className="mt-6 flex justify-center"
          >
            {/* TODO: logo recebida do cliente; placeholder = wordmark */}
            {logoOk ? (
              <img
                src={FSS_LOGO}
                onError={() => setLogoOk(false)}
                alt="Food Service Show"
                className="h-28 w-auto sm:h-36 lg:h-44"
              />
            ) : (
              <FssWordmark />
            )}
          </motion.div>

          <motion.p
            {...enter({ opacity: 0, filter: "blur(6px)", y: 10 }, 0.5, 0.5)}
            className="mt-6 text-base leading-relaxed text-white/65 sm:text-lg"
          >
            {/* TODO: copy final */}
            A turnê da Teknisa pelo país e as feiras onde o setor se encontra. Veja as próximas datas e
            marque presença com a gente, pessoalmente.
          </motion.p>
        </div>

        <motion.div
          {...enter({ opacity: 0, y: 8 }, 0.4, 0.65)}
          className="mt-12 flex justify-center lg:mt-14"
        >
          <SegmentedControl
            tabs={TABS}
            active={tab}
            onChange={setTab}
            ariaLabel="Alternar entre Food Service Show e Feiras"
            layoutId="events-switch"
          />
        </motion.div>

        {/* cards (re-stagger ao trocar de aba via key={tab}) */}
        <motion.div
          key={tab}
          initial="hidden"
          animate={show ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: entered ? 0.05 : 0.8 } },
          }}
          className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:gap-5 lg:mt-10 lg:grid-cols-2"
        >
          {items.map((ev) => (
            <motion.div
              key={ev.id}
              variants={
                reduced
                  ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
                  : {
                      hidden: { opacity: 0, filter: "blur(8px)", y: 16 },
                      show: {
                        opacity: 1,
                        filter: "blur(0px)",
                        y: 0,
                        transition: { duration: 0.5, ease: EASE_EXPO },
                      },
                    }
              }
            >
              <EventCard ev={ev} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

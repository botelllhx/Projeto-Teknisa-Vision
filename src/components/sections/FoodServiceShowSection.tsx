import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { byType, STATUS_LABEL, type EventItem } from "@/data/events";
import { EASE_EXPO } from "@/lib/motion";

/**
 * §10 · Food Service Show & Feiras ("Onde nos encontrar"). **Momento-assinatura ESCURO**
 * (exceção de paleta escopada: navy + gradiente azul→ciano do FSS, texto branco). **Fundo 100%
 * em código** (gradiente/halo azul→ciano + grão + curva de horizonte; sem imagem de fundo); só a
 * **logo do FSS** é asset, entrando por cima (placeholder = wordmark até o cliente enviar).
 *
 * **Entrada showcase** (blur/reveal via `Reveal` da §6 IA) + **scroll-snap suave** (`[data-snap-start]`,
 * o mesmo da IA) = "escurece e segura levemente". **Sem mapa**: conteúdo é **lista de datas**
 * (tour dates) com **toggle Food Service Show / Feiras** (switch da §3). `prefers-reduced-motion`:
 * estático (sem snap/blur). Datas/cidades/estandes são `// TODO`.
 */
const FSS_LOGO = "/assets/teknisa/events/food-service-show-logo.svg";
const TABS = [
  { id: "turne", label: "Food Service Show" },
  { id: "feira", label: "Feiras" },
];

function FssWordmark() {
  return (
    <div className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
      <span className="text-white">Food Service </span>
      <span className="bg-gradient-to-r from-[#5b8cff] to-[#22d3ee] bg-clip-text text-transparent">
        Show
      </span>
    </div>
  );
}

function EventRow({ ev }: { ev: EventItem }) {
  const open = ev.status === "inscricoes_abertas";
  return (
    <li className="flex flex-col gap-3 py-5 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="flex items-baseline gap-4 sm:gap-6">
        <span className="shrink-0 text-sm font-medium text-cyan-300 sm:w-44">{ev.date}</span>
        <div className="min-w-0">
          <p className="font-display text-lg font-semibold text-white">
            {ev.name} <span className="text-white/45">·</span> {ev.city}
          </p>
          {ev.venue && <p className="text-sm text-white/50">{ev.venue}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        {ev.status && (
          <span
            className={
              open
                ? "rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200 ring-1 ring-cyan-400/30"
                : "rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/60 ring-1 ring-white/15"
            }
          >
            {STATUS_LABEL[ev.status]}
          </span>
        )}
        {ev.cta && (
          <a
            href={ev.cta.url}
            className="group/cta inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            {ev.cta.label}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
          </a>
        )}
      </div>
    </li>
  );
}

export function FoodServiceShowSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const [tab, setTab] = useState(0);
  const [logoOk, setLogoOk] = useState(true);

  const show = reduced || inView;
  const items = byType(tab === 0 ? "turne" : "feira");

  return (
    <section
      id="eventos"
      ref={ref}
      data-snap-start
      aria-label="Food Service Show e feiras"
      className="relative isolate min-h-screen overflow-hidden scroll-mt-24 bg-[#06063a] py-24 text-white lg:py-28"
    >
      {/* backdrop 100% em código: navy + halo azul→ciano + horizonte + grão */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b52] via-[#06063a] to-[#04041d]" />
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.85 }}
          animate={show ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1, ease: EASE_EXPO }}
          className="absolute left-1/2 top-[-15%] h-[70vh] w-[90vw] max-w-[1100px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(34,211,238,0.30), rgba(40,90,255,0.16) 55%, transparent)",
          }}
        />
        {/* curva de horizonte (faixa de luz suave na base, Terra à noite) */}
        <div
          className="absolute inset-x-0 bottom-0 h-[45vh]"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 130%, rgba(34,211,238,0.22), rgba(40,90,255,0.10) 45%, transparent 65%)",
          }}
        />
        <div className="bg-grain absolute inset-0 opacity-[0.08] mix-blend-soft-light" />
      </div>

      <div className="section-container relative">
        {/* showcase: eyebrow + logo FSS (protagonista) + subhead */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal show={show}>
            <span className="text-sm font-semibold text-cyan-300">Onde nos encontrar</span>
          </Reveal>
          <Reveal show={show} delay={0.12} className="mt-6 flex justify-center">
            {/* TODO: logo real do Food Service Show; placeholder = wordmark */}
            {logoOk ? (
              <img
                src={FSS_LOGO}
                onError={() => setLogoOk(false)}
                alt="Food Service Show"
                className="h-20 w-auto sm:h-24"
              />
            ) : (
              <FssWordmark />
            )}
          </Reveal>
          <Reveal show={show} delay={0.22} className="mt-6">
            {/* TODO: copy final */}
            <p className="text-base leading-relaxed text-white/65 sm:text-lg">
              A turnê da Teknisa pelo país e as feiras onde o setor se encontra. Veja as próximas
              datas e marque presença com a gente, pessoalmente.
            </p>
          </Reveal>
        </div>

        {/* toggle + lista de datas */}
        <Reveal show={show} delay={0.34} className="mt-12 lg:mt-16">
          <div className="flex justify-center">
            <SegmentedControl
              tabs={TABS}
              active={tab}
              onChange={setTab}
              ariaLabel="Alternar entre Food Service Show e Feiras"
              layoutId="events-switch"
            />
          </div>
          <ul className="mx-auto mt-8 max-w-3xl divide-y divide-white/10">
            {items.map((ev) => (
              <EventRow key={ev.id} ev={ev} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

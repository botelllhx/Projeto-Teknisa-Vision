import { motion } from "framer-motion";
import { Bot, Cog, MessageSquare, Sparkles, TrendingUp, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

/**
 * Bento das capacidades de IA da Teknisa (§6). Nomes reais do mega-menu (`menuData.ts`,
 * grupo IA); copy em registro de BENEFÍCIO (placeholders, // TODO marketing — sem número
 * inventado). Cada card tem um micro-visual decorativo (Framer, respeita reduced-motion).
 * Paleta: só azul/navy/ink/neutros (sem cor nova); 1 card navy de acento para ritmo.
 */

// ── micro-visuais (decorativos, sem dado real) ──────────────────────────────

/** Bolha de chat com "digitando" — Agentes de IA. */
function TypingDots() {
  return (
    <div className="inline-flex items-center gap-1 rounded-full rounded-bl-sm bg-white/15 px-3 py-2 ring-1 ring-white/15">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-white/80"
          animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

/** Sparkline que se desenha em loop — IA para gestão financeira. */
function Sparkline() {
  return (
    <svg viewBox="0 0 120 40" className="h-10 w-28 overflow-visible" aria-hidden>
      <motion.path
        d="M2 30 L20 24 L38 27 L56 15 L74 19 L92 8 L118 12"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: [0, 1], opacity: [0.4, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
      />
    </svg>
  );
}

/** Engrenagens girando — Automação operacional. */
function Gears() {
  return (
    <div className="relative flex items-center text-primary/70">
      <motion.span animate={{ rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }}>
        <Cog className="h-7 w-7" strokeWidth={1.6} />
      </motion.span>
      <motion.span
        className="-ml-1.5 mt-3"
        animate={{ rotate: -360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      >
        <Cog className="h-5 w-5" strokeWidth={1.6} />
      </motion.span>
    </div>
  );
}

/** Marcador buscando o ponto ótimo — IA para compras. */
function OptimizeTrack() {
  return (
    <div className="relative h-1.5 w-28 rounded-full bg-primary/15">
      <motion.span
        className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary shadow-sm"
        animate={{ left: ["6%", "72%", "48%"] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
    </div>
  );
}

/** Equalizer de atendimento — IA para atendimento. */
function Equalizer() {
  const bars = [0.5, 0.9, 0.4, 0.75];
  return (
    <div className="flex h-9 items-end gap-1.5">
      {bars.map((peak, i) => (
        <motion.span
          key={i}
          className="w-1.5 origin-bottom rounded-full bg-primary/70"
          style={{ height: "100%" }}
          animate={{ scaleY: [0.3, peak, 0.45, peak * 0.8, 0.3] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
        />
      ))}
    </div>
  );
}

// ── cards ───────────────────────────────────────────────────────────────────

type Capability = {
  icon: LucideIcon;
  title: string;
  desc: string;
  visual: React.ReactNode;
  span: string;
  navy?: boolean;
};

// TODO: copy final (marketing — sem inventar números).
const CAPS: Capability[] = [
  {
    icon: Bot,
    title: "Agentes de IA",
    desc: "Assistentes que executam tarefas e respondem pela operação, no seu lugar.",
    visual: <TypingDots />,
    span: "sm:col-span-2",
    navy: true,
  },
  {
    icon: TrendingUp,
    title: "IA para gestão financeira",
    desc: "Padrões e desvios de margem apontados antes do fechamento, não depois.",
    visual: <Sparkline />,
    span: "sm:col-span-2",
  },
  {
    icon: Zap,
    title: "Automação operacional",
    desc: "Processos repetitivos rodando sem ninguém precisar empurrar.",
    visual: <Gears />,
    span: "sm:col-span-1",
  },
  {
    icon: Sparkles,
    title: "IA para compras",
    desc: "O melhor custo, na hora certa de comprar, sem ficar no achismo.",
    visual: <OptimizeTrack />,
    span: "sm:col-span-1",
  },
  {
    icon: MessageSquare,
    title: "IA para atendimento",
    desc: "Respostas rápidas ao cliente, no tom da sua marca, a qualquer hora.",
    visual: <Equalizer />,
    span: "sm:col-span-2",
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function AiBento() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-4"
    >
      {CAPS.map((c) => {
        const Icon = c.icon;
        return (
          <motion.div
            key={c.title}
            variants={item}
            className={cn(
              "group flex min-h-[180px] flex-col justify-between rounded-3xl p-6 ring-1 transition-[transform,box-shadow] duration-200 hover:-translate-y-1",
              c.span,
              c.navy
                ? "bg-primary text-primary-foreground ring-primary/20 shadow-xl shadow-primary/15 hover:shadow-2xl"
                : "bg-white/80 text-foreground ring-border backdrop-blur-sm hover:shadow-lg",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <span
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-xl",
                  c.navy ? "bg-white/12 text-white" : "bg-primary/10 text-primary",
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div className={cn("shrink-0", c.navy ? "text-white" : "text-primary")}>{c.visual}</div>
            </div>
            <div className="mt-6">
              <h3 className="font-display text-lg font-semibold tracking-tight">{c.title}</h3>
              <p
                className={cn(
                  "mt-1.5 text-sm leading-relaxed",
                  c.navy ? "text-white/70" : "text-muted-foreground",
                )}
              >
                {c.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

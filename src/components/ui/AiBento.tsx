import { motion } from "framer-motion";
import { Bot, MessageSquare, Sparkles, TrendingUp, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import { Shell, type BentoTone } from "@/components/ui/BentoCard";

/**
 * Bento das capacidades de IA da Teknisa (§6). REUTILIZA o card do §3 (`Shell`: mesmo
 * radius/sombra/hover/tons) — mesma família do resto do site. Nomes reais do mega-menu
 * (grupo IA). Cada card traz um **MiniFlow**: a mesma linguagem de motion da assinatura
 * (caminho suave que se desenha até um resultado, curva EASE do projeto), demonstrando
 * a capacidade — não um gráfico genérico. Copy em registro de BENEFÍCIO (// TODO mkt).
 * Paleta só azul/navy/ink/neutros; 1 card navy de acento para profundidade.
 */

/** Micro-fluxo: caminho que se desenha até um resultado (mesma assinatura de movimento). */
function MiniFlow({ d, end, dark }: { d: string; end: [number, number]; dark?: boolean }) {
  const stroke = dark ? "rgba(255,255,255,0.9)" : "hsl(var(--primary))";
  return (
    <svg viewBox="0 0 72 40" className="h-10 w-16 overflow-visible" fill="none" aria-hidden>
      <path
        d={d}
        stroke={stroke}
        strokeOpacity={dark ? 0.25 : 0.16}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d={d}
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1.8, ease: EASE, repeat: Infinity, repeatDelay: 0.5 }}
      />
      <motion.circle
        cx={end[0]}
        cy={end[1]}
        r={3}
        fill={stroke}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 0, 1, 1], opacity: [0, 0, 1, 1] }}
        transition={{ duration: 2.3, ease: EASE, repeat: Infinity, times: [0, 0.7, 0.82, 1] }}
        style={{ transformOrigin: `${end[0]}px ${end[1]}px` }}
      />
    </svg>
  );
}

type Capability = {
  icon: LucideIcon;
  title: string;
  desc: string;
  flow: { d: string; end: [number, number] };
  span: string;
  tone: BentoTone;
};

// TODO: copy final (marketing — sem inventar números).
const CAPS: Capability[] = [
  {
    icon: Bot,
    title: "Agentes de IA",
    desc: "Assistentes que executam tarefas e respondem pela operação, no seu lugar.",
    flow: { d: "M4,30 C20,30 26,12 40,12 L64,12", end: [64, 12] },
    span: "sm:col-span-2",
    tone: "navy",
  },
  {
    icon: TrendingUp,
    title: "IA para gestão financeira",
    desc: "Padrões e desvios de margem apontados antes do fechamento, não depois.",
    flow: { d: "M4,32 L18,26 L30,30 L44,16 L58,20 L68,8", end: [68, 8] },
    span: "sm:col-span-2",
    tone: "neutral",
  },
  {
    icon: Zap,
    title: "Automação operacional",
    desc: "Processos repetitivos que se completam sozinhos, sem ninguém empurrar.",
    flow: { d: "M4,20 L22,20 C32,20 32,30 42,30 L66,30", end: [66, 30] },
    span: "sm:col-span-1",
    tone: "neutral",
  },
  {
    icon: Sparkles,
    title: "IA para compras",
    desc: "O melhor custo, na hora certa de comprar, sem ficar no achismo.",
    flow: { d: "M4,12 C18,12 22,32 36,32 C50,32 52,16 68,16", end: [68, 16] },
    span: "sm:col-span-1",
    tone: "neutral",
  },
  {
    icon: MessageSquare,
    title: "IA para atendimento",
    desc: "Respostas rápidas ao cliente, no tom da sua marca, a qualquer hora.",
    flow: { d: "M4,20 Q14,8 24,20 T44,20 T64,20", end: [64, 20] },
    span: "sm:col-span-2",
    tone: "neutral",
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
        const dark = c.tone === "navy";
        return (
          <motion.div key={c.title} variants={item} className={cn("min-h-[180px]", c.span)}>
            <Shell tone={c.tone}>
              <div className="flex items-start justify-between gap-4">
                <span
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-2xl",
                    dark ? "bg-white/15 text-white" : "bg-primary/10 text-primary",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <MiniFlow d={c.flow.d} end={c.flow.end} dark={dark} />
              </div>
              <div className="mt-auto pt-6">
                <h3 className="font-display text-lg font-semibold tracking-tight">{c.title}</h3>
                <p
                  className={cn(
                    "mt-1.5 text-sm leading-relaxed",
                    dark ? "text-white/70" : "text-muted-foreground",
                  )}
                >
                  {c.desc}
                </p>
              </div>
            </Shell>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

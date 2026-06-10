import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Faixa de impacto / ROI — versão "ponte" (entre o Explorador de segmentos e o
 * Ecossistema de produtos §4). NÃO é dark: base branca + uma faixa azul.
 *
 * 1) Copy curtíssima com algumas palavras que "acendem" para o azul Teknisa
 *    conforme o scroll (scroll-linked color). A palavra final ("ecossistema")
 *    faz a ponte para a §4.
 * 2) Faixa azul que entra da esquerda para a direita (full-bleed à esquerda,
 *    parando na direita do conteúdo) com os números de impacto, grandes, em branco.
 *
 * Respeita prefers-reduced-motion (palavras já acesas, faixa já visível).
 *
 * Números fornecidos pelo cliente (validar com marketing — blueprint §8).
 */
const MUTED = "#a9aebd";
const LIT = "#040486"; // azul Teknisa (--primary)

const PARTS: { t: string; hl?: boolean }[] = [
  { t: "Tecnologia que vira número: " },
  { t: "milhões", hl: true },
  { t: " de refeições, " },
  { t: "milhares", hl: true },
  { t: " de pontos automatizados e " },
  { t: "dezenas", hl: true },
  { t: " de países movidos por um " },
  { t: "ecossistema", hl: true },
  { t: " só." },
];

const STATS = [
  { value: "+30 mil", label: "pontos automatizados no mundo" },
  { value: "97,05%", label: "taxa de retenção média dos clientes Teknisa" },
  { value: "+10", label: "países atendidos pelos sistemas Teknisa" },
  { value: "+20 mi", label: "refeições vendidas diariamente pelos sistemas Teknisa" },
];

function HighlightWord({
  progress,
  start,
  end,
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  children: string;
}) {
  const color = useTransform(progress, [start, end], [MUTED, LIT]);
  return (
    <motion.span style={{ color }} className="font-semibold">
      {children}
    </motion.span>
  );
}

export function ImpactBridge() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: textRef, offset: ["start 0.85", "start 0.4"] });
  // useInView no wrapper (fluxo normal) é mais confiável que whileInView no bg absoluto.
  const bandInView = useInView(bandRef, { once: true, amount: 0.35 });
  const revealed = bandInView || !!reduced;

  const hlCount = PARTS.filter((p) => p.hl).length;
  let hlSeen = 0;

  return (
    <section id="impacto" className="relative overflow-hidden bg-background py-20 lg:py-28">
      <div className="section-container">
        {/* Copy curtíssima com highlight ao scroll — alinhada à direita */}
        <p
          ref={textRef}
          className="ml-auto max-w-4xl text-right font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl lg:text-[2.5rem] lg:leading-[1.18]"
        >
          {PARTS.map((part, i) => {
            if (!part.hl) {
              return (
                <span key={i} style={{ color: MUTED }}>
                  {part.t}
                </span>
              );
            }
            if (reduced) {
              return (
                <span key={i} style={{ color: LIT }} className="font-semibold">
                  {part.t}
                </span>
              );
            }
            const idx = hlSeen++;
            const start = (idx / hlCount) * 0.7;
            return (
              <HighlightWord key={i} progress={scrollYProgress} start={start} end={start + 0.3}>
                {part.t}
              </HighlightWord>
            );
          })}
        </p>

        {/* Faixa azul: reveal suave da esquerda p/ direita (clip-path wipe) com os números */}
        <div ref={bandRef} className="relative mt-12 lg:mt-16">
          <motion.div
            aria-hidden
            initial={false}
            animate={{ clipPath: revealed ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 left-[calc(50%-50vw)] right-0 rounded-r-[2rem] bg-primary"
          />
          <div className="relative grid grid-cols-2 gap-x-8 gap-y-12 py-12 pr-2 sm:gap-x-12 sm:pr-6 md:grid-cols-[repeat(4,auto)] md:justify-between md:gap-x-0 lg:py-16 lg:pr-12">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={false}
                animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 14 }}
                transition={{ duration: 0.5, delay: revealed ? 0.35 + i * 0.18 : 0, ease: EASE }}
              >
                <p className="font-display text-4xl font-bold leading-none tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                  {s.value}
                </p>
                <p className="mt-3 max-w-[13rem] text-sm leading-snug text-white/70">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

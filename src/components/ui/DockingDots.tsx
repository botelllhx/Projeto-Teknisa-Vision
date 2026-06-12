import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DOTS = "/assets/teknisa/brand/teknisa-dots.svg";

/**
 * Cluster de pontos da marca que **doca** no wordmark gigante do rodapé (§rodapé). Fica na sua
 * posição oficial (topo-direito, depois do "A") via CSS (%), responsivo. No desktop (e fora de
 * `prefers-reduced-motion`), um **GSAP ScrollTrigger** (`scrub`) faz os pontos **viajarem** de cima
 * até **encaixar** conforme o rodapé entra na viewport. `prefers-reduced-motion`/mobile: já
 * **encaixados** (marca completa estática, nunca quebrada). Decorativo (`aria-hidden`).
 *
 * DOCK_* = posição/tamanho de encaixe, em % do WORDMARK (o container interno tem a largura da letra).
 * O conjunto (wordmark + pontos) ocupa 100% da largura: o cluster é MAIOR que o wordmark (~135% da
 * altura), fica logo após o "A" alcançando a BORDA DIREITA, e a haste desce parando na metade do A.
 */
const DOCK_WIDTH = "18%"; // largura do cluster (relativa ao wordmark) — maior que a letra
const DOCK_RIGHT = "-10.5%"; // alcança a borda direita do container (lockup ocupa 100% da largura)
const DOCK_TOP = "-86%"; // sobe acima do topo do wordmark p/ a haste (maior) parar na metade do A

export function DockingDots() {
  const ref = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined" || window.matchMedia("(max-width: 767px)").matches) return;
    const el = ref.current;
    const footer = el?.closest("footer");
    if (!el || !footer) return;

    const ctx = gsap.context(() => {
      // os pontos "caem" do topo-direito do rodapé (ref. estado inicial) e docam depois do "A".
      // viagem é quase vertical — ficam na direita o tempo todo (sem deriva horizontal).
      gsap.fromTo(
        el,
        { yPercent: -680, opacity: 0.85 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <img
      ref={ref}
      src={DOTS}
      alt=""
      aria-hidden
      className="pointer-events-none absolute z-10 will-change-transform"
      style={{ width: DOCK_WIDTH, right: DOCK_RIGHT, top: DOCK_TOP }}
    />
  );
}

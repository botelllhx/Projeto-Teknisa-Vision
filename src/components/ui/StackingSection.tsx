import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Painel de **sticky stacking** (estilo theswaddle.com): o painel gruda no topo (`lg:sticky top-0`)
 * e o **próximo painel sobe e o cobre**; enquanto isso, este encolhe (`scale 1→0.94`) e escurece
 * (`brightness 0.86`) de leve, atado ao scroll (GSAP ScrollTrigger `scrub`), dando profundidade de
 * "cards empilhados". Fundo **sólido** + cantos arredondados no topo + sombra superior (card
 * deslizando). O último painel não encolhe (`last`). Em **mobile** e `prefers-reduced-motion` o
 * stacking é **desligado** (fluxo normal, sem scroll-jack). Isolado deste grupo (não mexe no
 * snap da IA nem no slider do FSS).
 */
export function StackingSection({
  children,
  id,
  ariaLabel,
  className,
  last = false,
}: {
  children: ReactNode;
  id?: string;
  ariaLabel?: string;
  className?: string;
  last?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || last) return;
    if (typeof window === "undefined" || window.matchMedia("(max-width: 1023px)").matches) return;
    const el = ref.current;
    const next = el?.nextElementSibling as HTMLElement | null;
    if (!el || !next) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 1, filter: "brightness(1)" },
        {
          scale: 0.94,
          filter: "brightness(0.86)",
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [reduced, last]);

  return (
    <section
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative z-0 origin-top scroll-mt-24 rounded-t-[1.75rem] shadow-[0_-26px_60px_-34px_rgba(4,4,134,0.4)]",
        "lg:sticky lg:top-0 lg:min-h-screen lg:rounded-t-[2.5rem]",
        className,
      )}
    >
      {children}
    </section>
  );
}

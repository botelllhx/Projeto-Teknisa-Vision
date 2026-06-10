import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

/** Altura aproximada do header fixo ao rolar para âncoras (#ia, #eventos, …). */
const ANCHOR_HEADER_OFFSET = 96;

/**
 * Smooth scroll global (Lenis) + scroll para âncoras de hash.
 * Respeita `prefers-reduced-motion`: quando o usuário pede menos movimento,
 * não instancia o Lenis e deixa o scroll nativo do navegador.
 */
export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // OBS: NÃO re-emitir "scroll" na window aqui. O Lenis já escuta o scroll nativo
    // (e o dispara ao rolar a página), então listeners baseados em window.scrollY —
    // como o glass/blur da navbar — funcionam normalmente. Despachar um Event("scroll")
    // criaria recursão infinita (Lenis re-emite → callback → dispatch → ...).

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const raw = location.hash;
    if (!raw || raw.length < 2) return;

    const id = decodeURIComponent(raw.slice(1));
    if (!id) return;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 45;

    const tick = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        const lenis = lenisRef.current;
        if (lenis) {
          lenis.scrollTo(el, { offset: -ANCHOR_HEADER_OFFSET, duration: 1.15 });
        } else {
          // Fallback nativo (reduced-motion): pula direto para o alvo.
          const top = el.getBoundingClientRect().top + window.scrollY - ANCHOR_HEADER_OFFSET;
          window.scrollTo({ top, behavior: "auto" });
        }
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) requestAnimationFrame(tick);
    };

    const id0 = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(id0);
    };
  }, [location.pathname, location.hash]);
}

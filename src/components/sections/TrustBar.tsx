import { LogoMarquee } from "@/components/ui/LogoMarquee";

/**
 * §2 · Barra de confiança — apenas o marquee de logos de clientes, em LARGURA
 * TOTAL da tela (full-bleed, fora do .section-container), colado ao fim do hero.
 *
 * Sem barra de métricas e sem rótulo eyebrow (ver regra de estilo no CLAUDE.md:
 * nada de texto em CAIXA ALTA com letter-spacing).
 */
export function TrustBar() {
  return (
    <section id="confianca" aria-label="Clientes" className="scroll-mt-24 bg-white py-12 lg:py-16">
      <LogoMarquee />
    </section>
  );
}

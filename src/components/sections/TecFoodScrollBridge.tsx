import { ContainerScroll } from "@/components/ui/ContainerScroll";

/**
 * §7 · Ponte TecFood — mockup com **Container Scroll Animation** (tela do produto).
 *
 * Transição (não deep-dive): o frame da tela do TecFood **deita→levanta + cresce** ao rolar.
 * O deep-dive aprofundado migrou para a página de produto do TecFood. Base branca, azul
 * Teknisa, texto preto/azul (só tokens). Mobile/reduced-motion: frame estático em pé.
 */
export function TecFoodScrollBridge() {
  return (
    <section id="tecfood" aria-label="TecFood" className="scroll-mt-24 bg-background py-20 lg:py-28">
      <div className="section-container">
        <ContainerScroll
          header={
            <>
              <span className="text-sm font-semibold text-primary">TecFood</span>
              {/* TODO: copy final (benefício, sem "gestão", sem travessão) */}
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                O <span className="text-primary">TecFood</span> inteiro, numa tela só.
              </h2>
            </>
          }
        >
          {/* TODO: tela final do TecFood (por ora a captura genérica `monitor.webp`) */}
          <img
            src="/assets/teknisa/products/screens/monitor.webp"
            alt="Tela do TecFood: a operação de alimentação coletiva do cardápio ao caixa, numa tela só"
            width={2560}
            height={1440}
            loading="lazy"
            className="block h-auto w-full"
          />
        </ContainerScroll>
      </div>
    </section>
  );
}

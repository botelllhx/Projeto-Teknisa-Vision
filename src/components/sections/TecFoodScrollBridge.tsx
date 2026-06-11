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
              <span className="text-sm font-semibold text-primary">
                Referência em refeições coletivas
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
                O sistema que os nutricionistas pedem pelo nome.
              </h2>
              {/* efeito criativo: brilho varrendo o wordmark (.shine-text) */}
              <p className="shine-text mt-3 font-display text-6xl font-bold tracking-tight sm:text-7xl">
                TecFood
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                É o software onde a refeição corporativa do país já roda todo dia, do
                planejamento do prato ao prato servido.
              </p>
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

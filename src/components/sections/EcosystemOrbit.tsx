import { useEffect, useState } from "react";
import { OrbitingCircles } from "@/components/ui/OrbitingCircles";
import { byRing, type Integration } from "@/data/integrations";

// símbolo da marca (SVG quadrado) no centro do ecossistema
const TEKNISA_MARK = "/assets/teknisa/integrations/Teknisa.svg";

/**
 * §9 · Integrações & ecossistema (momento-assinatura). **Ecossistema Teknisa no centro** (logo +
 * halo azul) e os **logos das integrações orbitando** em anéis concêntricos (base Magic UI —
 * Orbiting Circles). Raios/velocidades/`reverse` diferentes = profundidade. Hover/foco num logo
 * **pausa** a órbita e mostra **tooltip** (acessível por teclado). `prefers-reduced-motion`: anéis
 * estáticos (via `motion-safe` no item). Mobile: menos anéis/raios menores. Só tokens. Placeholder.
 */
const RING_CFG = [
  { duration: 30, reverse: false },
  { duration: 44, reverse: true },
  { duration: 62, reverse: false },
];

export function EcosystemOrbit() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const radii = isMobile ? [82, 138] : [126, 205, 284];
  const iconSize = isMobile ? 46 : 56;
  const boxSize = isMobile ? radii[1] * 2 + iconSize + 8 : radii[2] * 2 + iconSize + 8;

  const badge = (item: Integration) => {
    const Icon = item.icon;
    const active = activeId === item.id;
    return (
      <button
        key={item.id}
        type="button"
        aria-label={`${item.name} (integração)`}
        onMouseEnter={() => setActiveId(item.id)}
        onMouseLeave={() => setActiveId((c) => (c === item.id ? null : c))}
        onFocus={() => setActiveId(item.id)}
        onBlur={() => setActiveId((c) => (c === item.id ? null : c))}
        className="relative grid h-full w-full place-items-center rounded-full bg-card text-primary shadow-sm ring-1 ring-border transition-[box-shadow,transform] duration-200 hover:scale-110 hover:shadow-md hover:ring-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {/* TODO: trocar pelo logo real (item.logo) quando existir */}
        <Icon className="h-1/2 w-1/2" strokeWidth={1.75} aria-hidden />
        {active && (
          <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1 text-xs font-medium text-background shadow-lg">
            {item.name}
          </span>
        )}
      </button>
    );
  };

  const rings = isMobile ? [byRing(1), byRing(2)] : [byRing(1), byRing(2), byRing(3)];

  return (
    <section id="integracoes" aria-label="Integrações e ecossistema" className="scroll-mt-24 overflow-hidden bg-background py-20 lg:py-28">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">Integrações &amp; ecossistema</span>
          {/* TODO: copy final (benefício, sem "gestão", sem travessão) */}
          <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[4rem]">
            Conecta com tudo que sua operação já usa.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Fim do silo e do retrabalho. Seus sistemas trocam dados sozinhos, sem digitação dupla nem
            ilha de informação.
          </p>
        </div>

        {/* órbita */}
        <div
          className="relative mx-auto mt-12 lg:mt-16"
          style={{ height: boxSize, maxWidth: boxSize }}
        >
          {/* centro: ecossistema Teknisa + halo azul */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute left-1/2 top-1/2 -z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" aria-hidden />
            <div className="grid h-28 w-28 place-items-center rounded-full bg-white shadow-xl ring-1 ring-border sm:h-32 sm:w-32">
              <img src={TEKNISA_MARK} alt="Ecossistema Teknisa" className="h-16 w-16 object-contain sm:h-20 sm:w-20" />
            </div>
          </div>

          {rings.map((items, idx) => (
            <OrbitingCircles
              key={idx}
              radius={radii[idx]}
              duration={RING_CFG[idx].duration}
              reverse={RING_CFG[idx].reverse}
              iconSize={iconSize}
              paused={activeId !== null}
            >
              {items.map(badge)}
            </OrbitingCircles>
          ))}
        </div>
      </div>
    </section>
  );
}

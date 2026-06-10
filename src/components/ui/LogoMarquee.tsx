import { Box, Circle, Hexagon, Layers, Octagon, Pentagon, Square, Triangle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Marquee de logos de clientes — largura total da tela, loop infinito (saindo/
 * entrando pelas bordas), monocromático, pausa no hover.
 *
 * TODO: trocar por logos reais de clientes (monocromáticos). Por enquanto usa
 * marcas-placeholder estilo "Logoipsum" (NÃO são clientes reais — não inventar nomes).
 */
const BASE_LOGOS: { icon: LucideIcon; word: string }[] = [
  { icon: Hexagon, word: "Logoipsum" },
  { icon: Triangle, word: "Logoipsum" },
  { icon: Circle, word: "Logoipsum" },
  { icon: Square, word: "Logoipsum" },
  { icon: Pentagon, word: "Logoipsum" },
  { icon: Octagon, word: "Logoipsum" },
  { icon: Layers, word: "Logoipsum" },
  { icon: Box, word: "Logoipsum" },
];

/**
 * Cada "metade" repete a base o suficiente para exceder a largura da viewport,
 * garantindo loop sem emenda mesmo em telas largas/ultrawide. A track tem duas
 * metades idênticas e desliza -50% (= 1 metade) continuamente.
 */
const HALF = [...BASE_LOGOS, ...BASE_LOGOS, ...BASE_LOGOS];

function LogoItem({ icon: Icon, word }: { icon: LucideIcon; word: string }) {
  return (
    <div
      className="flex shrink-0 items-center gap-2 px-8 text-foreground/35 sm:px-10 lg:px-12"
      role="img"
      aria-label="Logo de cliente (placeholder)"
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      <span className="font-display text-lg font-semibold tracking-tight">{word}</span>
    </div>
  );
}

export function LogoMarquee({ className = "" }: { className?: string }) {
  return (
    <div
      className={`group relative w-full overflow-hidden ${className}`}
      // máscara: esmaece as bordas para a entrada/saída suave dos logos
      style={{
        maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div className="flex w-max motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
        {/* Metade A (visível) */}
        <div className="flex">
          {HALF.map((logo, i) => (
            <LogoItem key={`a-${i}`} icon={logo.icon} word={logo.word} />
          ))}
        </div>
        {/* Metade B (duplicata para loop contínuo) */}
        <div className="flex" aria-hidden>
          {HALF.map((logo, i) => (
            <LogoItem key={`b-${i}`} icon={logo.icon} word={logo.word} />
          ))}
        </div>
      </div>
    </div>
  );
}

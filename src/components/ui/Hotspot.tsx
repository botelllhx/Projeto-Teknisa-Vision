import { cn } from "@/lib/utils";
import type { Hotspot as HotspotData } from "@/data/productTour";

/**
 * Marcador interativo sobre a tela do produto (§5 Product Tour).
 * Posicionado por coordenadas % (responsivo). Abre o callout no hover/foco/clique.
 * Acessível: `<button>` focável, `aria-expanded`/`aria-controls`, label descritivo.
 * Pulso só com motion-safe. O callout (popover) só aparece quando `popovers` (desktop,
 * sem reduced-motion); no touch/reduced-motion o conteúdo vem da lista lateral.
 */
export function Hotspot({
  index,
  data,
  isOpen,
  popovers,
  onOpen,
  onToggle,
}: {
  index: number;
  data: HotspotData;
  isOpen: boolean;
  popovers: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  const calloutId = `tour-callout-${index}`;
  const flipLeft = data.x > 58;
  const flipUp = data.y > 70;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${data.x}%`, top: `${data.y}%` }}
    >
      <button
        type="button"
        aria-label={data.title}
        aria-expanded={isOpen}
        aria-controls={popovers ? calloutId : undefined}
        onMouseEnter={onOpen}
        onFocus={onOpen}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={cn(
          "relative grid h-6 w-6 place-items-center rounded-full ring-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teknisa-900",
          isOpen ? "bg-primary ring-white" : "bg-white ring-white/60 hover:scale-110",
        )}
      >
        {!isOpen && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-white/60 motion-safe:animate-ping"
          />
        )}
        <span
          aria-hidden
          className={cn("relative h-2 w-2 rounded-full", isOpen ? "bg-white" : "bg-primary")}
        />
      </button>

      {popovers && isOpen && (
        <div
          id={calloutId}
          role="tooltip"
          className={cn(
            "absolute z-20 w-64 rounded-xl border border-white/10 bg-teknisa-900/95 p-4 shadow-2xl backdrop-blur-md",
            flipLeft ? "right-full mr-3" : "left-full ml-3",
            flipUp ? "bottom-1/2 translate-y-1/2" : "top-1/2 -translate-y-1/2",
          )}
        >
          <h4 className="font-display text-sm font-bold tracking-tight text-white">{data.title}</h4>
          <p className="mt-1 text-xs leading-relaxed text-white/65">{data.desc}</p>
        </div>
      )}
    </div>
  );
}

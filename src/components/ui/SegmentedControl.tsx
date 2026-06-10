import { useRef } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type SegmentedTab = { id: string; label: string; icon?: LucideIcon };

/**
 * Segmented control (track claro + pílula azul ativa via `layoutId`).
 * Fonte única do switch usado na §3 (Explorador de segmentos) e na §5 (Showcase
 * multi-device) — mesma aparência/comportamento, consistência total.
 *
 * Acessível: `role="tablist"`/`tab`, `aria-selected`, navegação por setas/Home/End.
 * O `layoutId` deve ser **único por instância** na página (senão duas pílulas animam
 * entre si). Passe `tabId`/`panelId` para amarrar `id`/`aria-controls` aos painéis.
 */
export function SegmentedControl({
  tabs,
  active,
  onChange,
  ariaLabel,
  layoutId,
  tabId,
  panelId,
  className,
}: {
  tabs: SegmentedTab[];
  active: number;
  onChange: (i: number) => void;
  ariaLabel: string;
  layoutId: string;
  tabId?: (id: string) => string;
  panelId?: (id: string) => string;
  className?: string;
}) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    onChange(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      className={cn(
        "overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <div
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
        className="inline-flex gap-1 rounded-full bg-secondary p-1.5"
      >
        {tabs.map((t, i) => {
          const selected = i === active;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={tabId?.(t.id)}
              aria-selected={selected}
              aria-controls={panelId?.(t.id)}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(i)}
              className={`relative shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary ${
                selected ? "text-white" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-full bg-primary shadow-md"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                {Icon && <Icon className="h-4 w-4" aria-hidden />}
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

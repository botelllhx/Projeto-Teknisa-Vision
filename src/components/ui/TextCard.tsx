import { useState } from "react";
import { cn } from "@/lib/utils";
import type { CardTone, Testimonial } from "@/data/cases";

/**
 * Card de testemunho **textual** (§8 carrossel). Colorido na paleta (tints de azul Teknisa +
 * navy + neutro), com **textura de pontos** no topo, **logo do cliente** (placeholder = wordmark
 * do nome) e **quote + pessoa** embaixo. Minimalista. `className` define o tamanho no carrossel.
 */
const TONE: Record<
  CardTone,
  { bg: string; text: string; sub: string; dots: string; tag: string; logo: string }
> = {
  tint: { bg: "bg-teknisa-100", text: "text-teknisa-900", sub: "text-teknisa-800/60", dots: "text-teknisa-400", tag: "bg-white/70 text-primary", logo: "text-primary" },
  tint2: { bg: "bg-teknisa-200", text: "text-teknisa-900", sub: "text-teknisa-800/60", dots: "text-teknisa-500", tag: "bg-white/70 text-primary", logo: "text-primary" },
  soft: { bg: "bg-secondary", text: "text-foreground", sub: "text-muted-foreground", dots: "text-foreground/25", tag: "bg-white text-primary", logo: "text-foreground/70" },
  navy: { bg: "bg-primary", text: "text-white", sub: "text-white/60", dots: "text-white/25", tag: "bg-white/15 text-white", logo: "text-white" },
};

export function TextCard({ data, className }: { data: Testimonial; className?: string }) {
  const t = TONE[data.tone ?? "tint"];
  const [logoOk, setLogoOk] = useState(Boolean(data.logo));

  return (
    <article className={cn("relative flex shrink-0 flex-col overflow-hidden rounded-3xl p-7 lg:p-8", t.bg, className)}>
      <div className={cn("card-dots pointer-events-none absolute inset-x-0 top-0 h-1/2", t.dots)} aria-hidden />

      <div className="relative flex items-start justify-between gap-3">
        <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", t.tag)}>{data.tag}</span>
      </div>

      {/* logo do cliente (placeholder = wordmark do nome) */}
      <div className="relative mt-10 flex flex-1 items-center justify-center">
        {logoOk && data.logo ? (
          <img
            src={data.logo}
            alt={`Logo ${data.brand}`}
            loading="lazy"
            onError={() => setLogoOk(false)}
            className="max-h-12 w-auto max-w-[75%] object-contain"
          />
        ) : (
          <span className={cn("text-center font-display text-2xl font-bold tracking-tight lg:text-3xl", t.logo)}>
            {data.brand}
          </span>
        )}
      </div>

      <div className="relative mt-auto">
        <p className={cn("font-display text-xl font-semibold leading-snug lg:text-2xl", t.text)}>
          &ldquo;{data.quote}&rdquo;
        </p>
        <p className={cn("mt-4 font-semibold", t.text)}>{data.person}</p>
        <p className={cn("text-sm", t.sub)}>{data.role}</p>
      </div>
    </article>
  );
}

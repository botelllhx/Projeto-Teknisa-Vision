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
      <div className={cn("card-dots pointer-events-none absolute inset-x-0 top-0 h-[56%]", t.dots)} aria-hidden />

      {/* logo do cliente numa zona LIMPA: o retângulo com a cor do card "apaga" os pontinhos
          atrás da logo (detalhe da referência). Placeholder = wordmark do nome. */}
      <div className="relative flex flex-1 items-center justify-center">
        <div className={cn("inline-flex min-w-[58%] items-center justify-center rounded-2xl px-10 py-10", t.bg)}>
          {logoOk && data.logo ? (
            <img
              src={data.logo}
              alt={`Logo ${data.brand}`}
              loading="lazy"
              onError={() => setLogoOk(false)}
              className="max-h-12 w-auto max-w-full object-contain"
            />
          ) : (
            <span className={cn("text-center font-display text-2xl font-bold tracking-tight lg:text-3xl", t.logo)}>
              {data.brand}
            </span>
          )}
        </div>
      </div>

      <div className="relative mt-auto">
        <p className={cn("font-display text-2xl font-semibold leading-snug lg:text-[1.75rem]", t.text)}>
          &ldquo;{data.quote}&rdquo;
        </p>
        <p className={cn("mt-5 text-lg font-semibold", t.text)}>{data.person}</p>
        <p className={cn("text-sm", t.sub)}>{data.role}</p>
      </div>
    </article>
  );
}

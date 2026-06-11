import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Card de logo de cliente (§8, mural). Claro, mostra a **logo real** (`src`) quando existir;
 * enquanto não houver, cai no **wordmark do nome** (placeholder, sem `img` quebrada).
 * TODO: logos reais (svg) em `cases/<id>/logo.svg`.
 */
export function LogoCard({
  brand,
  src,
  className,
}: {
  brand: string;
  src?: string;
  className?: string;
}) {
  const [ok, setOk] = useState(Boolean(src));

  return (
    <div
      className={cn(
        "flex aspect-[16/10] items-center justify-center rounded-2xl bg-secondary p-6 ring-1 ring-border lg:aspect-auto lg:h-full",
        className,
      )}
    >
      {ok && src ? (
        <img
          src={src}
          alt={`Logo ${brand}`}
          loading="lazy"
          onError={() => setOk(false)}
          className="max-h-12 w-auto max-w-[70%] object-contain"
        />
      ) : (
        // placeholder: wordmark do nome (// TODO: logo real)
        <span className="text-center font-display text-xl font-bold tracking-tight text-foreground/70 lg:text-2xl">
          {brand}
        </span>
      )}
    </div>
  );
}

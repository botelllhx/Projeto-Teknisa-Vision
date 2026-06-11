import { useState } from "react";
import { cn } from "@/lib/utils";
import type { DeviceKind, Screen } from "@/data/productShowcase";

/**
 * Conteúdo da tela de um device (§5). Usa a **captura real por TIPO de device** (aspecto
 * certo, sem corte ruim): landscape (browser/desktop/laptop/tablet-landscape) → `monitor`,
 * tablet retrato → `tablet`, vertical (phone/pos/totem) → `mobile`. Imagens WebP em
 * `products/screens/`. Se a imagem faltar/quebrar, cai numa UI fake clara (nunca img quebrada).
 */
const SCREEN_FILE: Record<DeviceKind, "monitor" | "tablet" | "mobile"> = {
  browser: "monitor",
  desktop: "monitor",
  laptop: "monitor",
  "tablet-landscape": "monitor",
  "tablet-portrait": "tablet",
  phone: "mobile",
  pos: "mobile",
  totem: "mobile",
};

export function DeviceScreen({
  screen,
  deviceKind,
  productName,
  label,
}: {
  screen: Screen;
  deviceKind: DeviceKind;
  productName: string;
  label?: string;
}) {
  const [errored, setErrored] = useState(false);
  const src = `/assets/teknisa/products/screens/${SCREEN_FILE[deviceKind]}.webp`;

  if (errored) return <FakeUI productName={productName} label={label} />;
  return (
    <img
      src={src}
      alt={screen.alt}
      loading="lazy"
      onError={() => setErrored(true)}
      className="absolute inset-0 h-full w-full object-cover object-top"
    />
  );
}

/**
 * Placeholder de UI clara e minimalista (skeleton de dashboard SaaS premium) — só
 * rótulos reais + formas neutras e um gráfico de linha suave. Fallback se a imagem faltar.
 */
function FakeUI({ productName, label }: { productName: string; label?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col gap-[4%] bg-white p-[5%]">
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-[3%]">
          <span className="h-[8px] w-[8px] shrink-0 rounded-[2px] bg-primary" />
          <span className="truncate text-[8px] font-semibold leading-none text-foreground">
            {productName}
          </span>
        </div>
        <span className="h-[6px] w-[24px] rounded-full bg-zinc-100" />
      </div>

      {label && (
        <p className="-mt-[2%] truncate text-[7px] font-medium leading-none text-muted-foreground">
          {label}
        </p>
      )}

      <div className="grid grid-cols-3 gap-[4%]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md p-[7%] ring-1 ring-inset ring-zinc-100">
            <div className="h-[4px] w-2/3 rounded-full bg-zinc-100" />
            <div className="mt-[16%] h-[5px] w-1/2 rounded-full bg-foreground/15" />
            <div className={cn("mt-[10%] h-[3px] w-1/3 rounded-full", i === 0 ? "bg-primary/60" : "bg-zinc-100")} />
          </div>
        ))}
      </div>

      <div className="relative flex-1 overflow-hidden rounded-md ring-1 ring-inset ring-zinc-100">
        <svg viewBox="0 0 100 44" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <line x1="0" y1="33" x2="100" y2="33" stroke="#f1f2f4" strokeWidth="0.5" />
          <line x1="0" y1="22" x2="100" y2="22" stroke="#f1f2f4" strokeWidth="0.5" />
          <line x1="0" y1="11" x2="100" y2="11" stroke="#f1f2f4" strokeWidth="0.5" />
          <path d="M0 32 L14 26 L28 29 L42 18 L56 22 L70 11 L84 17 L100 7 L100 44 L0 44 Z" fill="hsl(var(--primary) / 0.06)" />
          <polyline
            points="0,32 14,26 28,29 42,18 56,22 70,11 84,17 100,7"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}

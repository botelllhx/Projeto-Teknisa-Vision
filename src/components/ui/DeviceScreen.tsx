import { useState } from "react";
import { cn } from "@/lib/utils";
import { ShowcaseHotspot } from "@/components/ui/ShowcaseHotspot";
import type { Screen } from "@/data/productShowcase";

/**
 * Conteúdo da tela de um device (§5). Por ora imagem (`screen.type "image"`); quando a
 * tela real chegar, preencher `screen.src`. Enquanto não houver imagem (ou se ela
 * quebrar), cai numa **UI fake** clara de placeholder — nunca `img` quebrada.
 *
 * FUTURO (estrutura pronta): `screen.type "video"` renderiza um <video> em loop.
 *
 * Os hotspots (livres) ficam sobre a tela, por coordenadas %, e só aparecem depois
 * que os devices "pousam" (`hotspotsVisible`).
 */
export function DeviceScreen({
  screen,
  productName,
  label,
  hotspotsVisible,
}: {
  screen: Screen;
  productName: string;
  label?: string;
  hotspotsVisible: boolean;
}) {
  const [errored, setErrored] = useState(false);
  const hasImage = Boolean(screen.src) && !errored;

  return (
    <>
      {screen.type === "video" && screen.src ? (
        <video
          src={screen.src}
          autoPlay
          muted
          loop
          playsInline
          aria-label={screen.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : hasImage ? (
        <img
          src={screen.src}
          alt={screen.alt}
          loading="lazy"
          onError={() => setErrored(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <FakeUI productName={productName} label={label} />
      )}

      {hotspotsVisible &&
        screen.hotspots?.map((h, i) => <ShowcaseHotspot key={`${h.title}-${i}`} data={h} />)}
    </>
  );
}

/**
 * Placeholder de UI clara e minimalista (skeleton de dashboard SaaS premium) — só
 * rótulos reais + formas neutras e um gráfico de linha suave, sem números fake nem
 * barras chunky. Escala por % para ler bem em qualquer device.
 * TODO: substituir pela screenshot/UI real do módulo (ver public/.../products/README.md).
 */
function FakeUI({ productName, label }: { productName: string; label?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col gap-[4%] bg-white p-[5%]">
      {/* topo */}
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

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-[4%]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md p-[7%] ring-1 ring-inset ring-zinc-100">
            <div className="h-[4px] w-2/3 rounded-full bg-zinc-100" />
            <div className="mt-[16%] h-[5px] w-1/2 rounded-full bg-foreground/15" />
            <div className={cn("mt-[10%] h-[3px] w-1/3 rounded-full", i === 0 ? "bg-primary/60" : "bg-zinc-100")} />
          </div>
        ))}
      </div>

      {/* gráfico de linha suave */}
      <div className="relative flex-1 overflow-hidden rounded-md ring-1 ring-inset ring-zinc-100">
        <svg viewBox="0 0 100 44" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <line x1="0" y1="33" x2="100" y2="33" stroke="#f1f2f4" strokeWidth="0.5" />
          <line x1="0" y1="22" x2="100" y2="22" stroke="#f1f2f4" strokeWidth="0.5" />
          <line x1="0" y1="11" x2="100" y2="11" stroke="#f1f2f4" strokeWidth="0.5" />
          <path
            d="M0 32 L14 26 L28 29 L42 18 L56 22 L70 11 L84 17 L100 7 L100 44 L0 44 Z"
            fill="hsl(var(--primary) / 0.06)"
          />
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

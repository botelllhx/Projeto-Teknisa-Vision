import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Peças compartilhadas dos device frames (§5 Showcase multi-device).
 *
 * Frames são desenhados em **SVG** (vetor): proporções e raios de canto escalam
 * perfeitamente em qualquer tamanho — sem cantos "arredondados demais". Estilo claro,
 * minimalista e realista (traço fino, fill branco, sombra macia que segue a silhueta).
 * Só neutros — nenhuma cor de marca nova.
 */
export type DeviceFrameProps = {
  /** A tela (UI) renderizada dentro do frame. */
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * Device em SVG: o chassi é vetor (escala perfeita); a tela (HTML, com hotspots) é
 * sobreposta no retângulo da tela, em % do viewBox. `screenClassName` define só o
 * arredondamento interno da tela (modesto — a silhueta vem do chassi).
 */
export function SvgDevice({
  viewBox,
  screen,
  screenClassName,
  chassis,
  children,
  className,
  style,
  frameShadow = "drop-shadow-[0_26px_50px_rgba(15,23,42,0.16)]",
}: {
  viewBox: [number, number];
  screen: { x: number; y: number; w: number; h: number };
  screenClassName?: string;
  chassis: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  frameShadow?: string;
}) {
  const [vw, vh] = viewBox;
  return (
    <div className={cn("relative w-full", className)} style={style}>
      <svg
        viewBox={`0 0 ${vw} ${vh}`}
        className={cn("block h-auto w-full", frameShadow)}
        aria-hidden
      >
        {chassis}
      </svg>
      <div
        className={cn("absolute overflow-hidden bg-secondary", screenClassName)}
        style={{
          left: `${screen.x}%`,
          top: `${screen.y}%`,
          width: `${screen.w}%`,
          height: `${screen.h}%`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

import { Children, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Orbiting Circles (§9, base **Magic UI**, install manual p/ Vite). Distribui os filhos num anel
 * de raio `radius`, girando com `animate-orbit` (keyframes `orbit` no Tailwind; `--duration`,
 * `--radius`, `--angle` inline por item). Centragem por **margem negativa** (deixa o `transform`
 * livre p/ a órbita). O `transform` inline replica o quadro 0% = **fallback estático**: sob
 * `prefers-reduced-motion` (`motion-safe:` desliga a animação) os ícones ficam parados no anel.
 * `paused` congela a órbita (hover/foco). Anel decorativo (`aria-hidden`); o conteúdo carrega o texto.
 */
export function OrbitingCircles({
  children,
  radius = 160,
  duration = 24,
  reverse = false,
  iconSize = 48,
  paused = false,
  showPath = true,
}: {
  children: ReactNode;
  radius?: number;
  duration?: number;
  reverse?: boolean;
  iconSize?: number;
  paused?: boolean;
  showPath?: boolean;
}) {
  const count = Children.count(children);

  return (
    <>
      {showPath && (
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
          style={{ width: radius * 2, height: radius * 2 }}
        />
      )}
      {Children.map(children, (child, i) => {
        const angle = (360 / count) * i;
        const style: CSSProperties = {
          // @ts-expect-error CSS custom properties
          "--duration": duration,
          "--radius": radius,
          "--angle": angle,
          width: iconSize,
          height: iconSize,
          marginLeft: -iconSize / 2,
          marginTop: -iconSize / 2,
          transform: `rotate(${angle}deg) translateY(${radius}px) rotate(${-angle}deg)`,
          // inline vence o shorthand `animation` do `animate-orbit` (que reseta o play-state)
          animationPlayState: paused ? "paused" : undefined,
        };
        return (
          <div
            style={style}
            className={cn(
              "absolute left-1/2 top-1/2 flex items-center justify-center animate-orbit",
              reverse && "[animation-direction:reverse]",
            )}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Container Scroll Animation (base Aceternity, adaptado a React + Vite + Framer Motion e
 * **recolorido aos tokens** — sem moldura de Mac, sem cor nova). Um **frame de tela** que
 * **deita→levanta** (`rotateX`) e **cresce** (`scale`) conforme o scroll, revelando a imagem.
 *
 * `prefers-reduced-motion` e **mobile** (telas estreitas) → **frame estático em pé** (sem
 * rotateX/scale), só a imagem. O ref de medição fica num wrapper **não-transformado** (evita
 * feedback do scale no `useScroll`).
 */
export function ContainerScroll({
  header,
  children,
  className,
}: {
  header?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  const staticMode = !!reduced || isMobile;

  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "center center"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const headerY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div className={cn("relative", className)}>
      {header && (
        <motion.div
          style={staticMode ? undefined : { y: headerY }}
          className="mx-auto max-w-2xl text-center"
        >
          {header}
        </motion.div>
      )}

      <div ref={wrapRef} className="mt-10 [perspective:1300px] lg:mt-14">
        <motion.div
          style={staticMode ? undefined : { rotateX: rotate, scale }}
          className="mx-auto w-full max-w-5xl will-change-transform"
        >
          {/* moldura clara da tela (bezel) */}
          <div className="rounded-[1.75rem] border border-border bg-white p-2 shadow-2xl shadow-primary/10 lg:p-2.5">
            <div className="overflow-hidden rounded-[1.4rem] border border-border/70 bg-secondary">
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

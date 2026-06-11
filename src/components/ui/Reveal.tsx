import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";

/**
 * Reveal "blur → foco" (desfoca e sobe → assenta). Usado na micro-narrativa do §6.
 * `show` controla o estado; `prefers-reduced-motion` cai para aparição simples (sem blur).
 */
export function Reveal({
  children,
  show = true,
  delay = 0,
  className,
}: {
  children: ReactNode;
  show?: boolean;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(14px)", y: 16 }}
      animate={
        show
          ? { opacity: 1, filter: "blur(0px)", y: 0 }
          : { opacity: 0, filter: "blur(14px)", y: 16 }
      }
      transition={{ duration: 0.75, delay, ease: EASE_EXPO }}
    >
      {children}
    </motion.div>
  );
}

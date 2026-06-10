import { useState } from "react";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  safePolygon,
} from "@floating-ui/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/motion";
import type { Hotspot } from "@/data/productShowcase";

/**
 * Hotspot livre sobre a tela de um device (§5 Showcase multi-device).
 *
 * Cada pin é independente: abre por **hover OU foco OU tap**, em qualquer ordem
 * (sem passo-a-passo guiado). Ancoragem/flip/collision e a11y via @floating-ui/react;
 * pin é `<button>` com `aria-expanded`/`aria-controls` (role dialog), `Esc` fecha,
 * foco visível, funciona por teclado e touch. Pulso só em motion-safe.
 *
 * Posicionado por coordenadas % sobre a tela (responsivo).
 */
export function ShowcaseHotspot({ data }: { data: Hotspot }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "right",
    middleware: [offset(12), flip({ padding: 8 }), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false, handleClose: safePolygon() });
  const focus = useFocus(context);
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "dialog" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    click,
    dismiss,
    role,
  ]);

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${data.x}%`, top: `${data.y}%` }}
    >
      <button
        ref={refs.setReference}
        type="button"
        aria-label={data.title}
        {...getReferenceProps()}
        className="relative grid h-5 w-5 place-items-center rounded-full bg-primary shadow-md shadow-primary/30 outline-none ring-2 ring-white transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {!open && !reduced && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-primary/40 motion-safe:animate-ping"
          />
        )}
        <span aria-hidden className="relative h-1.5 w-1.5 rounded-full bg-white" />
      </button>

      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              initial={reduced ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.16, ease: EASE_SMOOTH }}
              className="z-50 w-56 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-2xl"
            >
              <h4 className="font-display text-sm font-bold tracking-tight text-foreground">
                {data.title}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{data.desc}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  );
}

/**
 * Placeholder de seção da home — apenas marca o lugar e a ordem do blueprint.
 * Substituir cada um pelo componente real conforme as seções forem construídas.
 * Ver `teknisa-redesign-blueprint.md` §5 (fonte de verdade) antes de implementar.
 */
interface SectionPlaceholderProps {
  /** Nº da seção no mapa do blueprint (§5). */
  index: number;
  /** Título da seção. */
  title: string;
  /** id de âncora (ex.: "ia", "eventos") usado pela navbar/links. */
  anchor?: string;
  /** Nota curta de objetivo/craft para orientar a futura implementação. */
  note?: string;
  /** Marca seções dark estratégicas do blueprint. */
  dark?: boolean;
  /** Sinaliza momento-assinatura (★) do blueprint. */
  signature?: boolean;
}

export function SectionPlaceholder({
  index,
  title,
  anchor,
  note,
  dark = false,
  signature = false,
}: SectionPlaceholderProps) {
  return (
    <section
      id={anchor}
      aria-label={title}
      className={
        dark
          ? "scroll-mt-24 border-b border-white/5 bg-foreground text-background"
          : "scroll-mt-24 border-b border-border bg-background text-foreground"
      }
    >
      <div className="section-container flex min-h-[40vh] flex-col items-center justify-center py-20 text-center">
        <span
          className={`mb-3 text-sm font-semibold ${dark ? "text-sky-300" : "text-primary"}`}
        >
          {String(index).padStart(2, "0")} {signature ? "· ★ momento-assinatura" : ""}
        </span>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        {note ? (
          <p
            className={`mt-3 max-w-xl text-sm ${dark ? "text-background/55" : "text-muted-foreground"}`}
          >
            {note}
          </p>
        ) : null}
        <p className={`mt-6 text-xs ${dark ? "text-background/35" : "text-muted-foreground/60"}`}>
          Placeholder · a construir (ver blueprint §5)
        </p>
      </div>
    </section>
  );
}

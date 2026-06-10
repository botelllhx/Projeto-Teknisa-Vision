import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Kit de cards do bento (§3 · Explorador de segmentos).
 *
 * REGRA DE COR: nada de cor nova. A variedade vem só de TONS de azul Teknisa +
 * neutros dos tokens. Cada categoria escolhe seus tons (ver SegmentExplorer) para
 * ter identidade própria sem sair da paleta.
 */
const TONES = {
  navy: "bg-teknisa-900 text-white",
  brand: "bg-primary text-white", // teknisa-800
  blue700: "bg-teknisa-700 text-white",
  blue600: "bg-teknisa-600 text-white",
  tint: "bg-teknisa-200 text-foreground",
  lightBlue: "bg-teknisa-100 text-foreground",
  paleBlue: "bg-teknisa-50 text-foreground",
  neutral: "bg-white text-foreground ring-1 ring-inset ring-border",
  soft: "bg-secondary text-foreground",
} as const;
export type BentoTone = keyof typeof TONES;

const DARK_TONES = new Set<BentoTone>(["navy", "brand", "blue700", "blue600"]);
const isDark = (tone: BentoTone) => DARK_TONES.has(tone);

/** Hover ENXUTO e rápido — só transform/shadow, 180ms. (Antes era transition-all 500ms → parecia travado.) */
const HOVER =
  "transition-[transform,box-shadow] duration-200 ease-out will-change-transform hover:-translate-y-1 hover:shadow-xl";

/** Casca base dos cards não-interativos (div). */
function Shell({
  tone,
  className,
  children,
}: {
  tone: BentoTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("relative flex h-full flex-col overflow-hidden rounded-3xl p-6", TONES[tone], HOVER, className)}>
      {children}
    </div>
  );
}

/* ── photo: foto da operação + scrim + tint azul; fallback gradiente + ícone ── */
export function PhotoCard({
  photo,
  fallbackPhoto,
  title,
  label,
  icon: Icon,
  objectPosition = "center",
  large = false,
  className,
}: {
  photo: string;
  /** Se `photo` falhar, tenta esta antes de cair no gradiente (ex.: 2ª foto → hero). */
  fallbackPhoto?: string;
  title: string;
  label?: string;
  icon: LucideIcon;
  objectPosition?: string;
  /** Card de imagem principal: título bem maior. */
  large?: boolean;
  className?: string;
}) {
  const [src, setSrc] = useState(photo);
  const [failed, setFailed] = useState(false);

  // `photo` muda quando troca de aba (painel remonta, mas garante consistência).
  useEffect(() => {
    setSrc(photo);
    setFailed(false);
  }, [photo]);

  const onError = () => {
    if (fallbackPhoto && src !== fallbackPhoto) setSrc(fallbackPhoto);
    else setFailed(true);
  };

  return (
    <div
      className={cn(
        "group relative flex h-full min-h-[200px] flex-col justify-end overflow-hidden rounded-3xl bg-teknisa-900 shadow-sm",
        HOVER,
        className,
      )}
    >
      {/* Fallback de marca (gradiente + ícone). TODO: 2ª foto opcional por segmento (ver README) */}
      <div className="absolute inset-0 bg-gradient-to-br from-teknisa-700 via-teknisa-800 to-teknisa-900" aria-hidden />
      <Icon className="absolute right-6 top-6 h-14 w-14 text-white/10" aria-hidden />

      {!failed && (
        <img
          src={src}
          alt={`Operação de ${title}`}
          loading="lazy"
          onError={onError}
          style={{ objectPosition }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" aria-hidden />
      <div className="absolute inset-0 bg-primary/0 transition-colors duration-200 group-hover:bg-primary/25" aria-hidden />

      <div className={cn("relative z-10", large ? "p-6 sm:p-7 lg:p-8" : "p-5 sm:p-6")}>
        {label && (
          <p className={cn("mb-1 font-semibold text-white/75", large ? "text-sm" : "text-xs")}>{label}</p>
        )}
        <h3
          className={cn(
            "font-display font-bold leading-[1.02] tracking-tight text-white",
            large ? "text-4xl sm:text-5xl lg:text-6xl" : "text-lg sm:text-xl",
          )}
        >
          {title}
        </h3>
      </div>
    </div>
  );
}

/* ── color: bloco sólido em tom de azul + claim curto (duas ênfases) ──
   `icon` varia por categoria (evita ícone decorativo repetido em todas as seções). */
export function ClaimCard({
  lead,
  strong,
  icon: Icon,
  tone = "lightBlue",
  className,
}: {
  lead: string;
  strong: string;
  icon: LucideIcon;
  tone?: BentoTone;
  className?: string;
}) {
  const dark = isDark(tone);
  return (
    <Shell tone={tone} className={cn("justify-center gap-4", className)}>
      <span
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-xl",
          dark ? "bg-white/15" : "bg-primary/10",
        )}
      >
        <Icon className={cn("h-5 w-5", dark ? "text-white" : "text-primary")} aria-hidden />
      </span>
      <p className="font-display text-2xl font-bold leading-[1.15] tracking-tight sm:text-[1.7rem]">
        <span className={dark ? "text-white/65" : "text-foreground/75"}>{lead} </span>
        <span className={dark ? "text-white" : "text-primary"}>{strong}</span>
      </p>
    </Shell>
  );
}

/* ── icon: ícone premium + feature + 1 linha (foco na DOR resolvida) ── */
export function IconCard({
  icon: Icon,
  title,
  line,
  tone = "neutral",
  className,
}: {
  icon: LucideIcon;
  title: string;
  line: string;
  tone?: BentoTone;
  className?: string;
}) {
  return (
    <Shell tone={tone} className={className}>
      <span className="mb-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
        <Icon className="h-6 w-6 text-primary" aria-hidden />
      </span>
      <div className="mt-5">
        <h3 className="font-display text-base font-bold tracking-tight text-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{line}</p>
      </div>
    </Shell>
  );
}

/* ── stat: indicador grande do SETOR + rótulo + fonte ── */
export function StatCard({
  big,
  label,
  source,
  tone = "brand",
  className,
}: {
  big: string;
  label: string;
  /** Fonte do dado de setor (ex.: "ABERC"). */
  source?: string;
  tone?: BentoTone;
  className?: string;
}) {
  const dark = isDark(tone);
  return (
    <Shell tone={tone} className={cn("justify-center", className)}>
      <p
        className={cn(
          "font-display text-4xl font-bold leading-none tracking-tight sm:text-5xl",
          dark ? "text-white" : "text-primary",
        )}
      >
        {big}
      </p>
      <p className={cn("mt-2 text-sm leading-snug", dark ? "text-white/75" : "text-muted-foreground")}>
        {label}
      </p>
      {source && (
        <p className={cn("mt-2 text-[11px] font-medium", dark ? "text-white/45" : "text-foreground/40")}>
          Fonte: {source}
        </p>
      )}
    </Shell>
  );
}

/* ── text: headline de BENEFÍCIO + CTA "Conhecer →" (card clicável) ── */
export function TextCard({
  headline,
  slug,
  tone = "neutral",
  className,
}: {
  headline: string;
  slug: string;
  tone?: BentoTone;
  className?: string;
}) {
  return (
    <Link
      to={`/segmentos/${slug}`}
      className={cn(
        "group relative flex h-full flex-col justify-between gap-5 overflow-hidden rounded-3xl p-6",
        TONES[tone],
        HOVER,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className,
      )}
    >
      <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl">
        {headline}
      </h3>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Conhecer
        <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/* ── tags: sub-segmentos como chips com ÍCONE (mesma taxonomia do mega-menu) ── */
export function TagsCard({
  title = "Sub-segmentos",
  items,
  tone = "soft",
  className,
}: {
  title?: string;
  items: { name: string; icon: LucideIcon }[];
  tone?: BentoTone;
  className?: string;
}) {
  return (
    <Shell tone={tone} className={className}>
      <p className="mb-3 text-sm font-semibold text-foreground">{title}</p>
      <ul className="flex flex-wrap gap-1.5">
        {items.map(({ name, icon: Icon }) => (
          <li
            key={name}
            className="inline-flex items-center gap-1.5 rounded-full bg-white py-1 pl-1.5 pr-2.5 ring-1 ring-inset ring-border"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
              <Icon className="h-3 w-3 text-primary" aria-hidden />
            </span>
            <span className="text-xs font-medium text-foreground/75">{name}</span>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

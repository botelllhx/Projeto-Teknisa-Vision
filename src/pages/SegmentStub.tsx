import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { segmentGroups } from "@/components/layout/menuData";

/**
 * Landing de segmento — STUB. Rota /segmentos/:slug criada para os links do
 * Roteador de público (§3). A página real será construída depois (blueprint:
 * "Priorizar landings de segmento para SEO após a home").
 */
export function SegmentStub() {
  const { slug } = useParams<{ slug: string }>();
  const group = segmentGroups.find((g) => g.id === slug);

  return (
    <>
      <Navbar />
      <main className="section-container flex min-h-dvh flex-col justify-center py-32">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Segmento
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {group?.title ?? "Segmento"}
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Landing de segmento em construção (stub). Em breve: soluções, sub-segmentos e casos
          específicos desta operação.
        </p>

        {group && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {group.items.map((it) => (
              <li
                key={it.name}
                className="rounded-full border border-border bg-secondary px-3 py-1 text-sm text-foreground/70"
              >
                {it.name}
              </li>
            ))}
          </ul>
        )}

        <Link
          to="/"
          className="mt-10 inline-flex h-11 w-fit items-center gap-2 rounded-xl border-2 border-border px-6 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a home
        </Link>
      </main>
      <Footer />
    </>
  );
}

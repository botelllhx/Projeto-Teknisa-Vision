import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/**
 * Landing de produto — STUB. Rotas /produtos e /produtos/:slug para os links do
 * Ecossistema de produtos (§5). Página real será construída depois.
 */
const NAMES: Record<string, string> = {
  tecfood: "TecFood",
  retail: "Retail",
  erp: "ERP",
  hcm: "Pessoas e RH",
  facilities: "Facilities",
  ia: "IA",
};

export function ProductStub() {
  const { slug } = useParams<{ slug: string }>();
  const name = slug ? (NAMES[slug] ?? slug) : "Produtos";

  return (
    <>
      <Navbar />
      <main className="section-container flex min-h-dvh flex-col justify-center py-32">
        <span className="text-sm font-semibold text-primary">
          {slug ? "Produto" : "Ecossistema"}
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {name}
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          {slug
            ? "Página de produto em construção (stub). Em breve: telas reais, recursos e casos."
            : "Hub de produtos em construção (stub). Em breve: o ecossistema completo."}
        </p>

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

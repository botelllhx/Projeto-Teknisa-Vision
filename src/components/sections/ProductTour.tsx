import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/data/productTour";
import { ProductFrame } from "@/components/ui/ProductFrame";

/**
 * §5 · Ecossistema de produtos — Interactive Product Tour com hotspots.
 *
 * Seção **clara** (base branca). Switcher de logos troca a tela do produto + o conjunto
 * de hotspots (crossfade). Cada hotspot abre um callout explicando um módulo. Touch/
 * reduced-motion: callouts viram lista abaixo da imagem (sem hover/pulse). Texto preto/
 * azul; só tons de azul Teknisa + neutros. Conteúdo em `src/data/productTour.ts` (nada inventado).
 */
export function ProductTour() {
  const [active, setActive] = useState(0); // produto ativo
  const [openHotspot, setOpenHotspot] = useState<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const popovers = !reduced; // popover por hover só fora do reduced-motion

  const product = PRODUCTS[active];

  const selectProduct = (i: number) => {
    setActive(i);
    setOpenHotspot(null);
  };

  // Esc fecha o callout aberto
  useEffect(() => {
    if (openHotspot === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenHotspot(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openHotspot]);

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % PRODUCTS.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + PRODUCTS.length) % PRODUCTS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = PRODUCTS.length - 1;
    else return;
    e.preventDefault();
    selectProduct(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="produtos"
      aria-label="Ecossistema de produtos"
      className="scroll-mt-24 bg-background text-foreground"
    >
      <div className="section-container py-20 lg:py-28">
        {/* Cabeçalho */}
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-primary">O ecossistema por dentro</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Veja a plataforma por dentro
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Cada produto resolve uma operação inteira. Explore os módulos e veja como tudo se conecta
            numa plataforma só.
          </p>
        </div>

        {/* Switcher de produtos (logos) */}
        <div className="mt-8 overflow-x-auto pb-2 lg:mt-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div role="tablist" aria-label="Produtos" onKeyDown={onTabKeyDown} className="flex gap-3">
            {PRODUCTS.map((p, i) => {
              const on = i === active;
              return (
                <button
                  key={p.slug}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  aria-selected={on}
                  aria-controls="tour-stage"
                  tabIndex={on ? 0 : -1}
                  onClick={() => selectProduct(i)}
                  className={cn(
                    "relative shrink-0 rounded-xl px-4 py-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    on ? "bg-white opacity-100 shadow-md ring-2 ring-primary/50" : "bg-secondary opacity-60 hover:opacity-100",
                  )}
                >
                  <img src={p.logo} alt={p.name} className="h-6 w-auto" />
                  {on && (
                    <motion.span
                      layoutId="tourActive"
                      className="absolute -bottom-2 left-3 right-3 h-0.5 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Palco: texto do produto + frame com hotspots */}
        <div className="mt-10 lg:grid lg:grid-cols-[2fr_3fr] lg:items-center lg:gap-12">
          {/* texto do produto ativo */}
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {product.name}
            </h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              {product.valueProp}
            </p>
            <Link
              to={`/produtos/${product.slug}`}
              className="group mt-6 inline-flex items-center gap-2 text-base font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Conhecer
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* stage (crossfade ao trocar de produto) */}
          <motion.div
            id="tour-stage"
            role="tabpanel"
            key={product.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="mt-8 lg:mt-0"
          >
            <ProductFrame
              product={product}
              activeHotspot={openHotspot}
              popovers={popovers}
              onOpen={(i) => setOpenHotspot(i)}
              onToggle={(i) => setOpenHotspot((cur) => (cur === i ? null : i))}
              onBackgroundClick={() => setOpenHotspot(null)}
            />
          </motion.div>
        </div>

        {/* Lista de callouts (touch e reduced-motion) abaixo da imagem */}
        <div className={cn("mt-8", reduced ? "block" : "lg:hidden")}>
          <p className="mb-3 text-sm font-semibold text-muted-foreground">Destaques do produto</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {product.hotspots.map((h, i) => {
              const on = openHotspot === i;
              return (
                <li key={`${product.slug}-list-${i}`}>
                  <button
                    type="button"
                    onClick={() => setOpenHotspot((cur) => (cur === i ? null : i))}
                    aria-expanded={on}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-colors",
                      on ? "border-primary/30 bg-primary/5" : "border-border hover:bg-secondary",
                    )}
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-display text-sm font-bold text-foreground">
                        {h.title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                        {h.desc}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

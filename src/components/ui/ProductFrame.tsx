import { cn } from "@/lib/utils";
import { Hotspot } from "@/components/ui/Hotspot";
import type { Product } from "@/data/productTour";

/**
 * Stage do §5 Product Tour: frame de browser com uma **UI fake** clara do produto
 * (mock de dashboard SaaS light, feito com divs) e o overlay de hotspots por % .
 *
 * Base branca/cinza-claro (id visual: claro). Sem números fake (rótulos reais dos
 * módulos + formas abstratas). Quando houver captura real, `product.screenshot`
 * substitui a UI fake (mesmo enquadramento).
 *
 * TODO: screenshot real do produto (ver public/assets/teknisa/products/README.md).
 */
function FakeUI({ product }: { product: Product }) {
  return (
    <div className="absolute inset-0 flex">
      {/* navegação lateral */}
      <aside className="hidden w-[26%] flex-col border-r border-border bg-white p-3 sm:flex">
        <div className="mb-4 flex items-center gap-2 px-1">
          <span className="h-5 w-5 rounded-md bg-primary" />
          <span className="truncate text-xs font-semibold text-foreground">{product.name}</span>
        </div>
        <nav className="space-y-1">
          {product.modules.map((m, i) => (
            <div
              key={m}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px]",
                i === 1 ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground",
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", i === 1 ? "bg-primary" : "bg-border")} />
              <span className="truncate">{m}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* área principal */}
      <main className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-foreground sm:text-sm">{product.name} · Visão geral</p>
          <div className="flex gap-2">
            <span className="h-6 w-16 rounded-md bg-white ring-1 ring-inset ring-border" />
            <span className="h-6 w-9 rounded-md bg-primary" />
          </div>
        </div>

        {/* cards (rótulos reais + formas abstratas, sem números fake) */}
        <div className="grid grid-cols-3 gap-3">
          {product.modules.slice(0, 3).map((m) => (
            <div key={m} className="rounded-lg bg-white p-3 ring-1 ring-inset ring-border">
              <p className="truncate text-[10px] text-muted-foreground">{m}</p>
              <div className="mt-2 h-1.5 w-full rounded-full bg-secondary" />
              <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-primary/50" />
            </div>
          ))}
        </div>

        {/* painel de gráfico abstrato */}
        <div className="flex-1 rounded-lg bg-white p-4 ring-1 ring-inset ring-border">
          <div className="mb-3 h-2 w-24 rounded-full bg-secondary" />
          <div className="flex h-[55%] items-end gap-1.5">
            {[40, 65, 50, 80, 35, 70, 55, 90, 45, 75, 60, 85].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={cn("flex-1 rounded-t", i % 3 === 0 ? "bg-primary/70" : "bg-teknisa-200")}
              />
            ))}
          </div>
        </div>

        {/* tabela skeleton */}
        <div className="space-y-1.5">
          {[1, 2, 3].map((r) => (
            <div key={r} className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-border" />
              <div className="h-2 flex-1 rounded-full bg-secondary" />
              <div className="h-2 w-12 rounded-full bg-secondary" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export function ProductFrame({
  product,
  activeHotspot,
  onOpen,
  onToggle,
  popovers,
  onBackgroundClick,
}: {
  product: Product;
  activeHotspot: number | null;
  onOpen: (i: number) => void;
  onToggle: (i: number) => void;
  popovers: boolean;
  onBackgroundClick: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
      {/* chrome do browser */}
      <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-border" />
        <span className="h-3 w-3 rounded-full bg-border" />
        <span className="h-3 w-3 rounded-full bg-border" />
        <span className="ml-3 hidden rounded-md bg-white px-3 py-1 text-[11px] text-muted-foreground ring-1 ring-inset ring-border sm:inline">
          app.teknisa.com/{product.slug}
        </span>
      </div>

      {/* tela do produto + hotspots */}
      <div className="relative aspect-[16/10] bg-secondary" onClick={onBackgroundClick}>
        {product.screenshot ? (
          <img
            src={product.screenshot}
            alt={`Tela do ${product.name}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <FakeUI product={product} />
        )}

        {product.hotspots.map((h, i) => (
          <Hotspot
            key={`${product.slug}-${i}`}
            index={i}
            data={h}
            isOpen={activeHotspot === i}
            popovers={popovers}
            onOpen={() => onOpen(i)}
            onToggle={() => onToggle(i)}
          />
        ))}
      </div>
    </div>
  );
}

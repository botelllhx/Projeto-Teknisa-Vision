import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { POSTS } from "@/data/posts";

/**
 * §12 · Blog / Conteúdo — galeria editorial **sticky + scroll sincronizado**: à ESQUERDA uma imagem
 * destaque GRANDE que fica **parada (sticky)** e troca conforme o post ativo; à DIREITA um **índice
 * de posts scrollável**. O ativo segue o **scroll** (IntersectionObserver) e o **hover/foco**.
 * Minimalista, base branca, casando com o resto do site (respiro de seção normal, não mais o sticky
 * stacking). Imagens reais (Pexels) em `public/assets/teknisa/blog/<id>.jpg`. Conteúdo `// TODO`
 * (títulos/datas reais do blog depois, não inventar). **Mobile**: sem sticky, cada post vira card
 * com a própria imagem.
 */
export function BlogSection() {
  const [activeId, setActiveId] = useState(POSTS[0]?.id ?? "");
  const itemRefs = useRef(new Map<string, HTMLLIElement>());

  // o post ativo (imagem destaque à esquerda) acompanha o scroll: fica ativo o item que cruza a
  // faixa ~32–45% do topo da viewport. Hover/foco também definem o ativo (feedback imediato).
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting);
        if (!vis.length) return;
        const top = vis.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b,
        );
        const id = (top.target as HTMLElement).dataset.id;
        if (id) setActiveId(id);
      },
      { rootMargin: "-32% 0px -55% 0px", threshold: 0 },
    );
    itemRefs.current.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const active = POSTS.find((p) => p.id === activeId) ?? POSTS[0];

  return (
    <section
      id="recursos"
      aria-label="Blog e conteúdo da Teknisa"
      className="scroll-mt-24 bg-background py-24 lg:py-32"
    >
      <div className="section-container">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-primary">Do blog · Conteúdo</span>
            {/* TODO: headline final com marketing */}
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[4rem]">
              O que move o food service, em primeira mão.
            </h2>
          </div>
          <a
            href="#recursos" // // TODO: rota do blog
            className="group hidden h-12 w-fit items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:inline-flex"
          >
            Ver o blog
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        {/* galeria: imagem destaque sticky (esq) + índice scrollável (dir) */}
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          {/* ESQUERDA — imagem destaque grande, fica parada (sticky) e troca com o post ativo */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <a
                href={active.url}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[2rem] bg-secondary ring-1 ring-border"
              >
                {POSTS.map((p) => (
                  <img
                    key={p.id}
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
                    style={{ opacity: p.id === active.id ? 1 : 0 }}
                  />
                ))}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <span className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="h-2.5 w-2.5 shrink-0 bg-white" aria-hidden />
                    {active.category}
                  </span>
                  <h3 className="mt-3 max-w-md font-display text-2xl font-bold leading-tight tracking-tight text-white xl:text-3xl">
                    {active.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90">
                    Ler artigo
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* DIREITA — índice de posts scrollável; define o ativo no scroll/hover/foco */}
          <ul>
            {POSTS.map((post, i) => {
              const isActive = post.id === active.id;
              return (
                <li
                  key={post.id}
                  data-id={post.id}
                  ref={(el) => {
                    if (el) itemRefs.current.set(post.id, el);
                    else itemRefs.current.delete(post.id);
                  }}
                >
                  <a
                    href={post.url}
                    onMouseEnter={() => setActiveId(post.id)}
                    onFocus={() => setActiveId(post.id)}
                    className="group block border-t border-border py-6 first:border-t-0 lg:py-8 lg:first:border-t"
                  >
                    {/* imagem só no mobile (no desktop a featured à esquerda mostra) */}
                    <div className="mb-4 aspect-[16/10] overflow-hidden rounded-2xl bg-secondary lg:hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex items-start gap-4 lg:gap-6">
                      <span
                        className={`font-display text-sm font-bold tabular-nums transition-colors ${isActive ? "text-primary" : "text-foreground/30"}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="flex items-center gap-2 text-sm font-semibold text-primary">
                          <span className="h-2 w-2 shrink-0 bg-primary" aria-hidden />
                          {post.category}
                        </span>
                        <h3
                          className={`mt-2 font-display text-xl font-bold leading-tight tracking-tight transition-colors group-hover:text-primary lg:text-2xl ${isActive ? "text-primary" : "text-foreground"}`}
                        >
                          {post.title}
                        </h3>
                        {post.readTime && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            {post.readTime} de leitura
                          </p>
                        )}
                      </div>
                      <ArrowUpRight
                        className={`mt-1 h-5 w-5 shrink-0 transition-all duration-200 ${isActive ? "text-primary opacity-100" : "text-foreground/30 opacity-0 group-hover:opacity-100"}`}
                        aria-hidden
                      />
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* CTA mobile */}
        <div className="mt-10 lg:hidden">
          <a
            href="#recursos"
            className="group inline-flex h-12 w-fit items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Ver o blog
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

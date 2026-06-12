import { useState } from "react";
import { ArrowRight, Newspaper } from "lucide-react";
import { StackingSection } from "@/components/ui/StackingSection";
import { PostCard } from "@/components/ui/PostCard";
import { POSTS, type Post } from "@/data/posts";

/** Miniatura compacta (lista "últimas do blog"); placeholder em gradiente sem imagem real. */
function Thumb({ post }: { post: Post }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-secondary ring-1 ring-border">
      {ok ? (
        <img src={post.image} alt="" aria-hidden loading="lazy" onError={() => setOk(false)} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
      ) : (
        <div className="grid h-full w-full place-items-center bg-gradient-to-br from-teknisa-200 to-teknisa-600">
          <Newspaper className="h-6 w-6 text-white/70" strokeWidth={1.5} aria-hidden />
        </div>
      )}
    </div>
  );
}

/**
 * §12 · Blog / Conteúdo — painel de **sticky stacking** (cobre a EAD; é o **último** painel, não
 * encolhe). Estética editorial: **artigo em destaque** (imagem enorme) + **últimas do blog** (lista
 * compacta). Eyebrow sentence case. Fundo **azul bem claro** (`teknisa-50`) marca a divisão com a
 * EAD branca. Conteúdo `// TODO` (títulos/datas reais do blog depois, não inventar).
 */
export function BlogSection() {
  const featured = POSTS[0];
  const rest = POSTS.slice(1, 4);

  return (
    <StackingSection id="recursos" ariaLabel="Blog e conteúdo da Teknisa" last className="bg-teknisa-50">
      <div className="section-container grid items-center gap-12 py-20 lg:min-h-screen lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
        {/* esquerda: header + artigo em destaque */}
        <div>
          <span className="text-sm font-semibold text-primary">Do blog · Conteúdo</span>
          {/* TODO: headline final */}
          <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            O que move o food service, em primeira mão.
          </h2>
          <div className="mt-8">
            <PostCard post={featured} size="lg" />
          </div>
        </div>

        {/* direita: últimas do blog (compacta) + CTA */}
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-foreground/70">Últimas do blog</h3>
          <ul className="mt-1 divide-y divide-border">
            {rest.map((p) => (
              <li key={p.id}>
                <a href={p.url} className="group flex items-center gap-4 py-4">
                  <Thumb post={p} />
                  <span className="min-w-0">
                    <span className="text-xs font-semibold text-primary">{p.category}</span>
                    <span className="mt-0.5 block font-display text-base font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
                      {p.title}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#recursos"
            className="group mt-8 inline-flex h-12 w-fit items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Ver o blog
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </StackingSection>
  );
}

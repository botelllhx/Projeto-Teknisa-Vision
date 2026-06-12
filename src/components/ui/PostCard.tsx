import { useState } from "react";
import { Newspaper, Plus } from "lucide-react";
import type { Post } from "@/data/posts";

// variação de tom no placeholder (até as imagens reais). Só tons de azul.
const GRADS = [
  "from-teknisa-200 to-teknisa-700",
  "from-teknisa-400 to-teknisa-900",
  "from-teknisa-300 to-primary",
  "from-teknisa-500 to-teknisa-800",
];

/**
 * Card de artigo do blog (§12) — **editorial** (referência theswaddle): número opcional, **imagem
 * grande** (altura por viewport), marcador ■ + categoria (sentence case, azul), **título bold**.
 * Usado em **linha horizontal scrollável** (`shrink-0`). Sem imagem real (`// TODO`), cai num
 * placeholder em gradiente. Card é um link real; hover dá zoom + "+".
 */
export function PostCard({ post, number }: { post: Post; number?: number }) {
  const [ok, setOk] = useState(true);

  return (
    <a
      href={post.url}
      className="group flex w-[16rem] shrink-0 snap-start flex-col focus-visible:outline-none sm:w-[20rem] lg:w-[24rem]"
    >
      {number != null && (
        <span className="mb-3 font-display text-base font-bold tabular-nums text-foreground/35">
          {String(number).padStart(2, "0")}
        </span>
      )}

      <div className="relative h-[34vh] overflow-hidden rounded-2xl bg-secondary ring-1 ring-border lg:h-[40vh]">
        {ok ? (
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            onError={() => setOk(false)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div className={`grid h-full w-full place-items-center bg-gradient-to-br ${GRADS[post.id.charCodeAt(0) % GRADS.length]}`}>
            <Newspaper className="h-16 w-16 text-white/60" strokeWidth={1.5} aria-hidden />
          </div>
        )}

        <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-lg bg-white text-primary opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
          <Plus className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-4">
        <span className="flex items-center gap-2 text-sm font-semibold text-primary">
          <span className="h-2.5 w-2.5 shrink-0 bg-primary" aria-hidden />
          {post.category}
        </span>
        <h3 className="mt-2 line-clamp-2 font-display text-xl font-bold leading-tight tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary lg:text-2xl">
          {post.title}
        </h3>
        {post.readTime && <p className="mt-2 text-sm text-muted-foreground">{post.readTime} de leitura</p>}
      </div>
    </a>
  );
}

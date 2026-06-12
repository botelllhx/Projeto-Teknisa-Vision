import { useState } from "react";
import { Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Post } from "@/data/posts";

/**
 * Card de artigo do blog (§12) — imagem grande, eyebrow de categoria (sentence case), título forte.
 * `size="lg"` = destaque (imagem enorme); `size="md"` = grid. Sem imagem real (`// TODO`), cai num
 * **placeholder em gradiente** azul. Card é um link real; hover dá leve zoom + título em azul.
 */
export function PostCard({ post, size = "md", className }: { post: Post; size?: "lg" | "md"; className?: string }) {
  const [ok, setOk] = useState(true);
  const lg = size === "lg";

  return (
    <a
      href={post.url}
      className={cn("group block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4", className)}
    >
      <div className={cn("relative overflow-hidden rounded-3xl bg-secondary ring-1 ring-border", lg ? "aspect-[3/2]" : "aspect-[16/10]")}>
        {ok ? (
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            onError={() => setOk(false)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-teknisa-200 via-teknisa-400 to-teknisa-700">
            <Newspaper className={cn("text-white/65", lg ? "h-20 w-20" : "h-12 w-12")} strokeWidth={1.5} aria-hidden />
          </div>
        )}
      </div>

      <div className={cn(lg ? "mt-6" : "mt-4")}>
        <span className="text-sm font-semibold text-primary">{post.category}</span>
        <h3
          className={cn(
            "mt-1 font-display font-bold leading-tight tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary",
            lg ? "text-3xl lg:text-[2.5rem]" : "text-xl",
          )}
        >
          {post.title}
        </h3>
        {post.readTime && <p className="mt-2 text-sm text-muted-foreground">{post.readTime} de leitura</p>}
      </div>
    </a>
  );
}

import { ArrowRight } from "lucide-react";
import { StackingSection } from "@/components/ui/StackingSection";
import { PostCard } from "@/components/ui/PostCard";
import { POSTS } from "@/data/posts";

/**
 * §12 · Blog / Conteúdo — **último** painel de **sticky stacking** (cobre a EAD, não encolhe).
 * Estética **editorial** (theswaddle): header grande + **linha horizontal scrollável** de cards de
 * artigo **grandes** (■ categoria + título bold). Fundo **azul bem claro** (`teknisa-50`) marca a
 * divisão com a EAD branca. Conteúdo `// TODO` (títulos/datas reais do blog depois, não inventar).
 */
const CtaButton = ({ className = "" }: { className?: string }) => (
  <a
    href="#recursos"
    className={`group inline-flex h-12 w-fit items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${className}`}
  >
    Ver o blog
    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
  </a>
);

export function BlogSection() {
  return (
    <StackingSection id="recursos" ariaLabel="Blog e conteúdo da Teknisa" last className="bg-teknisa-50">
      <div className="flex min-h-screen flex-col justify-center pb-12 pt-20 lg:pb-14">
        <div className="section-container">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold text-primary">Do blog · Conteúdo</span>
              {/* TODO: headline final */}
              <h2 className="mt-3 font-display text-4xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
                O que move o food service, em primeira mão.
              </h2>
            </div>
            <CtaButton className="hidden lg:inline-flex" />
          </div>
        </div>

        {/* linha horizontal scrollável de artigos */}
        <div className="mt-8 snap-x snap-mandatory overflow-x-auto pb-2 [scrollbar-width:none] lg:mt-10 [&::-webkit-scrollbar]:hidden">
          <ul className="flex gap-6 px-5 sm:px-8 lg:gap-8 lg:px-10 xl:px-14">
            {POSTS.map((post) => (
              <li key={post.id} className="flex">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </div>

        <div className="section-container mt-10 lg:hidden">
          <CtaButton />
        </div>
      </div>
    </StackingSection>
  );
}

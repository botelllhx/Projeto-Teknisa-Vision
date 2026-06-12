import { ArrowRight } from "lucide-react";
import { StackingSection } from "@/components/ui/StackingSection";
import { CourseCard } from "@/components/ui/CourseCard";
import { COURSES } from "@/data/courses";

/**
 * §11 · EAD Teknisa — a **academia dos sistemas Teknisa** (capacitação + certificação). Painel de
 * **sticky stacking** (cobre a §10 e é coberto pelo Blog). Estética editorial em branco+azul:
 * imagem grande do curso em destaque + lista "mais buscados" numerada. Eyebrow **sentence case**.
 * Conteúdo `// TODO` (módulos reais do EAD ancoram). Fundo **branco** (divisão com o Blog claro).
 */
export function EADSection() {
  const featured = COURSES[0];
  const popular = COURSES.slice(1, 5);

  return (
    <StackingSection id="ead" ariaLabel="EAD Teknisa" className="bg-background">
      <div className="section-container grid items-center gap-12 py-20 lg:min-h-screen lg:grid-cols-2 lg:gap-16 lg:py-24">
        {/* esquerda: header + mais buscados + CTA */}
        <div>
          <span className="text-sm font-semibold text-primary">EAD Teknisa · Capacitação</span>
          {/* TODO: headline final */}
          <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            Sua equipe dominando o sistema.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            A academia dos sistemas Teknisa: treinamentos por módulo, livres e privados, com
            certificado. No ritmo de cada um, do operador ao gestor.
          </p>

          <div className="mt-8">
            <h3 className="text-sm font-semibold text-foreground/70">Mais buscados</h3>
            <ol className="mt-1 divide-y divide-border">
              {popular.map((c, i) => (
                <li key={c.id}>
                  <a href={c.url} className="group flex items-baseline gap-5 py-3.5">
                    <span className="font-display text-xl font-bold tabular-nums text-primary/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="text-xs font-semibold text-primary">{c.module}</span>
                      <span className="block font-display text-lg font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
                        {c.title}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm text-muted-foreground">{c.duration}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <a
            href="#contato"
            className="group mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Conheça o EAD Teknisa
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        {/* direita: curso em destaque (imagem grande) */}
        <CourseCard course={featured} />
      </div>
    </StackingSection>
  );
}

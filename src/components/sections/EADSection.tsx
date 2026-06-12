import { ArrowRight } from "lucide-react";
import { StackingSection } from "@/components/ui/StackingSection";
import { CourseCard } from "@/components/ui/CourseCard";
import { COURSES } from "@/data/courses";

/**
 * §11 · EAD Teknisa — a academia dos sistemas Teknisa. Painel de **sticky stacking**. Estética
 * **editorial** (theswaddle, branco+azul): header grande + **linha horizontal scrollável** de cards
 * de curso **grandes e numerados** (01, 02…), com ■ módulo + título bold + badges. Fundo branco.
 */
const CtaButton = ({ className = "" }: { className?: string }) => (
  <a
    href="#contato"
    className={`group inline-flex h-12 w-fit items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${className}`}
  >
    Conheça o EAD Teknisa
    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
  </a>
);

export function EADSection() {
  return (
    <StackingSection id="ead" ariaLabel="EAD Teknisa" className="bg-background">
      <div className="flex min-h-screen flex-col justify-center pb-12 pt-20 lg:pb-14">
        <div className="section-container">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold text-primary">EAD Teknisa · Capacitação</span>
              {/* TODO: headline final */}
              <h2 className="mt-3 font-display text-4xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
                Sua equipe dominando o sistema.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A academia dos sistemas Teknisa: treinamentos por módulo, livres e privados, com
                certificado. No ritmo de cada um.
              </p>
            </div>
            <CtaButton className="hidden lg:inline-flex" />
          </div>
        </div>

        {/* linha horizontal scrollável de cursos (mais buscados) */}
        <div className="mt-8 snap-x snap-mandatory overflow-x-auto pb-2 [scrollbar-width:none] lg:mt-10 [&::-webkit-scrollbar]:hidden">
          <ul className="flex gap-6 px-5 sm:px-8 lg:gap-8 lg:px-10 xl:px-14">
            {COURSES.map((course, i) => (
              <li key={course.id} className="flex">
                <CourseCard course={course} number={i + 1} />
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

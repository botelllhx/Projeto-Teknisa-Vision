import { useState } from "react";
import { Award, Clock, GraduationCap, Lock, Unlock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Course } from "@/data/courses";

/**
 * Card de curso do EAD (§11) — imagem grande (editorial), eyebrow de módulo (sentence case),
 * título forte, meta (duração/público) e badges (Livre/Privado, Certificado). Sem imagem real
 * (`// TODO`), cai num **placeholder em gradiente** azul (nada quebrado). Card é um link real.
 */
export function CourseCard({ course, className }: { course: Course; className?: string }) {
  const [ok, setOk] = useState(true);
  const livre = course.access === "livre";

  return (
    <a
      href={course.url}
      className={cn("group block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4", className)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-secondary ring-1 ring-border">
        {ok ? (
          <img
            src={course.image}
            alt={course.title}
            loading="lazy"
            onError={() => setOk(false)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-teknisa-300 via-teknisa-500 to-teknisa-800">
            <GraduationCap className="h-16 w-16 text-white/70" strokeWidth={1.5} aria-hidden />
          </div>
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
            {livre ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
            {livre ? "Livre" : "Privado"}
          </span>
          {course.certified && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              <Award className="h-3.5 w-3.5" />
              Certificado
            </span>
          )}
        </div>
      </div>

      <div className="mt-5">
        <span className="text-sm font-semibold text-primary">{course.module}</span>
        <h3 className="mt-1 font-display text-2xl font-bold leading-tight tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary lg:text-3xl">
          {course.title}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden /> {course.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4" aria-hidden /> {course.audience}
          </span>
        </div>
      </div>
    </a>
  );
}

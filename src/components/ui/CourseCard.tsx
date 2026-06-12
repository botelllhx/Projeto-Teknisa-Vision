import { useState } from "react";
import { Award, GraduationCap, Lock, Plus, Unlock } from "lucide-react";
import type { Course } from "@/data/courses";

// variação de tom no placeholder (até as imagens reais), pra não ficar monótono. Só tons de azul.
const GRADS = [
  "from-teknisa-300 to-teknisa-800",
  "from-teknisa-500 to-teknisa-900",
  "from-primary to-teknisa-600",
  "from-teknisa-200 to-teknisa-700",
];

/**
 * Card de curso do EAD (§11) — **editorial** (referência theswaddle): número (01, 02…), **imagem
 * grande** (altura por viewport), marcador ■ + módulo (sentence case, azul), **título bold**, meta e
 * badges (Livre/Privado, Certificado). Usado em **linha horizontal scrollável** (`shrink-0`). Sem
 * imagem real (`// TODO`), cai num placeholder em gradiente. Card é um link real; hover dá zoom + "+".
 */
export function CourseCard({ course, number }: { course: Course; number?: number }) {
  const [ok, setOk] = useState(true);
  const livre = course.access === "livre";

  return (
    <a
      href={course.url}
      className="group flex w-[16rem] shrink-0 snap-start flex-col focus-visible:outline-none sm:w-[19rem] lg:w-[22rem]"
    >
      {number != null && (
        <span className="mb-3 font-display text-base font-bold tabular-nums text-foreground/35">
          {String(number).padStart(2, "0")}
        </span>
      )}

      <div className="relative h-[30vh] overflow-hidden rounded-2xl bg-secondary ring-1 ring-border lg:h-[36vh]">
        {ok ? (
          <img
            src={course.image}
            alt={course.title}
            loading="lazy"
            onError={() => setOk(false)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div className={`grid h-full w-full place-items-center bg-gradient-to-br ${GRADS[course.id.charCodeAt(0) % GRADS.length]}`}>
            <GraduationCap className="h-16 w-16 text-white/65" strokeWidth={1.5} aria-hidden />
          </div>
        )}

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
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

        <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-lg bg-white text-primary opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
          <Plus className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-4">
        <span className="flex items-center gap-2 text-sm font-semibold text-primary">
          <span className="h-2.5 w-2.5 shrink-0 bg-primary" aria-hidden />
          {course.module}
        </span>
        <h3 className="mt-2 line-clamp-2 font-display text-xl font-bold leading-tight tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary lg:text-2xl">
          {course.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {course.duration} · {course.audience}
        </p>
      </div>
    </a>
  );
}

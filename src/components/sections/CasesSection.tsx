import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { VideoCard } from "@/components/ui/VideoCard";
import { CASES } from "@/data/cases";

/**
 * §8 · Cases — grid 2×2 de **cards de vídeo** (autoplay mudo, modelo Slack). Quote + cliente +
 * métrica sempre em texto; **play com som no clique** (só um card com som por vez, `soundId`).
 * Base clara, texto preto/azul (tokens). Filtro omitido (poucos itens): cada card traz sua tag
 * de segmento. Conteúdo placeholder (`// TODO`) até o marketing fornecer.
 */
export function CasesSection() {
  const [soundId, setSoundId] = useState<string | null>(null);

  return (
    <section id="cases" aria-label="Cases de sucesso" className="scroll-mt-24 bg-background py-20 lg:py-28">
      <div className="section-container">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-primary">Histórias reais</span>
          <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[4rem]">
            Quem opera com a Teknisa, recomenda.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Operações de alimentação que rodam todo dia na plataforma. Dê o play e ouça quem vive a
            rotina, do corporativo ao hospitalar, escolar e varejo.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-2">
          {CASES.map((c) => (
            <VideoCard
              key={c.id}
              data={c}
              hasSound={soundId === c.id}
              anySound={soundId !== null}
              onActivateSound={() => setSoundId((cur) => (cur === c.id ? null : c.id))}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#contato"
            className="group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Ver todos os cases
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

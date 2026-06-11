import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { VideoCard } from "@/components/ui/VideoCard";
import { LogoCard } from "@/components/ui/LogoCard";
import { CASES } from "@/data/cases";

/**
 * §8 · Cases — **mural** (estilo Slack/Function): testemunhos em **vídeo** (autoplay mudo,
 * play com som no clique) + cards de **logo**, em alturas variadas e colunas escalonadas.
 * Base clara; vídeos com overlay branco; logos claros (tokens). Conteúdo placeholder (`// TODO`).
 * Filtro omitido (poucos itens). Só um vídeo com som por vez (`soundId`).
 */
export function CasesSection() {
  const [soundId, setSoundId] = useState<string | null>(null);
  const [madero, pobreJuan, madalosso, cosechas] = CASES;

  const video = (c: (typeof CASES)[number], area: string) => (
    <VideoCard
      data={c}
      className={area}
      hasSound={soundId === c.id}
      anySound={soundId !== null}
      onActivateSound={() => setSoundId((cur) => (cur === c.id ? null : c.id))}
    />
  );

  return (
    <section id="cases" aria-label="Cases de sucesso" className="scroll-mt-24 bg-background py-20 lg:py-28">
      <div className="section-container">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-primary">Histórias reais</span>
          <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[4rem]">
            Quem move a alimentação roda na Teknisa.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Grandes operações do food service rodam todo dia na plataforma. Dê o play e ouça quem vive
            a rotina.
          </p>
        </div>

        {/* mural escalonado: vídeos altos (span 2) + logos baixos, colunas alternadas */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:grid-rows-[repeat(3,12rem)] lg:gap-5">
          {video(madero, "lg:col-start-1 lg:row-start-1 lg:row-span-2")}
          <LogoCard brand={pobreJuan.brand} src={pobreJuan.logo} className="lg:col-start-2 lg:row-start-1" />
          {video(madalosso, "lg:col-start-3 lg:row-start-1 lg:row-span-2")}
          <LogoCard brand={cosechas.brand} src={cosechas.logo} className="lg:col-start-4 lg:row-start-1" />
          <LogoCard brand={madero.brand} src={madero.logo} className="lg:col-start-1 lg:row-start-3" />
          {video(pobreJuan, "lg:col-start-2 lg:row-start-2 lg:row-span-2")}
          <LogoCard brand={madalosso.brand} src={madalosso.logo} className="lg:col-start-3 lg:row-start-3" />
          {video(cosechas, "lg:col-start-4 lg:row-start-2 lg:row-span-2")}
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

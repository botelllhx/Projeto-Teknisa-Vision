import { useEffect, useRef, useState } from "react";
import { Play, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Case } from "@/data/cases";

/**
 * Card de case (§8, modelo Slack): vídeo de **preview em autoplay mudo/loop** + **quote +
 * cliente + métrica em TEXTO** (a maioria não dá play). **Play com som** no clique do botão
 * (pausa os outros via `anySound`/`hasSound`). Vídeo é decorativo (`aria-hidden`) enquanto mudo.
 *
 * Lazy real: só toca quando o card entra na viewport (IntersectionObserver); pausa ao sair e
 * em aba oculta. `prefers-reduced-motion`/mobile → **poster estático** (sem autoplay), play manual.
 * Sem mídia (placeholder): mostra gradiente de marca + poster (se existir) — nunca mídia quebrada.
 */
export function VideoCard({
  data,
  hasSound,
  anySound,
  onActivateSound,
}: {
  data: Case;
  hasSound: boolean;
  anySound: boolean;
  onActivateSound: () => void;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [posterOk, setPosterOk] = useState(true);
  const [allowAutoplay, setAllowAutoplay] = useState(false);

  // autoplay só fora de reduced-motion e fora de mobile
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 768px)");
    const update = () => setAllowAutoplay(!reduce.matches && !mobile.matches);
    update();
    reduce.addEventListener("change", update);
    mobile.addEventListener("change", update);
    return () => {
      reduce.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
    };
  }, []);

  // lazy: detectar viewport
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => setInView(e[0].isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // autoplay mudo: em view, permitido e ninguém com som
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const playMuted = inView && allowAutoplay && !anySound;
    if (hasSound) return; // controlado pelo efeito de som
    v.muted = true;
    v.controls = false;
    if (playMuted) v.play().catch(() => {});
    else v.pause();
  }, [inView, allowAutoplay, anySound, hasSound]);

  // som: este card tocando com áudio + controles; pausa os outros (anySound)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hasSound) {
      v.muted = false;
      v.controls = true;
      v.play().catch(() => {});
    }
  }, [hasSound]);

  // pausa em aba oculta
  useEffect(() => {
    const onVis = () => {
      const v = videoRef.current;
      if (!v) return;
      if (document.hidden) v.pause();
      else if (!hasSound && inView && allowAutoplay && !anySound) v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [inView, allowAutoplay, anySound, hasSound]);

  return (
    <article
      ref={cardRef}
      className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-xl"
    >
      {/* mídia (aspect fixo = sem CLS) */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-teknisa-700 to-teknisa-900">
        {posterOk && (
          <img
            src={data.poster}
            alt=""
            aria-hidden
            loading="lazy"
            onError={() => setPosterOk(false)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="none"
          aria-hidden={!hasSound}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={data.videoWebm} type="video/webm" />
          <source src={data.videoMp4} type="video/mp4" />
        </video>

        {/* segmento (tag) */}
        <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
          {data.segment}
        </span>

        {/* play com som */}
        <button
          type="button"
          onClick={onActivateSound}
          aria-label={`Ouvir o depoimento de ${data.client}, ${data.company}`}
          className={cn(
            "absolute inset-0 z-10 grid place-items-center transition-opacity focus-visible:outline-none",
            hasSound ? "opacity-0" : "opacity-0 focus-visible:opacity-100 group-hover:opacity-100",
          )}
        >
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-primary shadow-lg ring-1 ring-black/5">
            {hasSound ? <Volume2 className="h-6 w-6" /> : <Play className="h-6 w-6 translate-x-0.5 fill-current" />}
          </span>
        </button>
      </div>

      {/* corpo (texto na paleta: preto/azul sobre branco) */}
      <div className="p-6 lg:p-7">
        <p className="font-display text-lg font-semibold leading-snug text-foreground">
          &ldquo;{data.quote}&rdquo;
        </p>
        <div className="mt-5 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate font-semibold text-foreground">{data.client}</p>
            <p className="truncate text-sm text-muted-foreground">
              {data.role}, {data.company}
            </p>
          </div>
          {data.metric && (
            <p className="shrink-0 text-right text-sm font-bold text-primary">{data.metric}</p>
          )}
        </div>
      </div>
    </article>
  );
}

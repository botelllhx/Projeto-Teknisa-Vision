import { useEffect, useRef, useState } from "react";
import { Play, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Case } from "@/data/cases";

/**
 * Card de testemunho em vídeo (§8, mural estilo Slack/Function): vídeo de **preview em
 * autoplay mudo/loop** preenchendo o card, com **quote + cliente sobrepostos** (texto branco
 * sobre gradiente escuro, sobre a mídia). **Play com som** no clique (um por vez via
 * `anySound`/`hasSound`, pausa os outros). Vídeo decorativo (`aria-hidden`) enquanto mudo.
 *
 * Lazy real (IntersectionObserver: toca só em viewport, pausa ao sair e em aba oculta);
 * `prefers-reduced-motion`/mobile → poster estático, play manual. Sem mídia: gradiente de marca.
 */
export function VideoCard({
  data,
  hasSound,
  anySound,
  onActivateSound,
  className,
}: {
  data: Case;
  hasSound: boolean;
  anySound: boolean;
  onActivateSound: () => void;
  className?: string;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [posterOk, setPosterOk] = useState(true);
  const [allowAutoplay, setAllowAutoplay] = useState(false);

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

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => setInView(e[0].isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || hasSound) return;
    v.muted = true;
    v.controls = false;
    if (inView && allowAutoplay && !anySound) v.play().catch(() => {});
    else v.pause();
  }, [inView, allowAutoplay, anySound, hasSound]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !hasSound) return;
    v.muted = false;
    v.controls = true;
    v.play().catch(() => {});
  }, [hasSound]);

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
      className={cn(
        "group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-teknisa-700 to-teknisa-900 ring-1 ring-black/5 lg:aspect-auto lg:h-full",
        className,
      )}
    >
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

      {/* gradiente p/ legibilidade do texto */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      {/* play com som */}
      <button
        type="button"
        onClick={onActivateSound}
        aria-label={`Ouvir o depoimento de ${data.brand}`}
        className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-primary shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {hasSound ? <Volume2 className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5 fill-current" />}
      </button>

      {/* quote + cliente sobrepostos */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white lg:p-6">
        <p className="font-display text-base font-semibold leading-snug lg:text-lg">
          &ldquo;{data.quote}&rdquo;
        </p>
        <p className="mt-3 font-semibold">{data.brand}</p>
        <p className="text-sm text-white/65">
          {data.person}, {data.role}
        </p>
      </div>
    </article>
  );
}

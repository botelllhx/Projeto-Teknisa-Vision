import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Play, X } from "lucide-react";
import { VideoWithFallback } from "@/components/VideoWithFallback";
import { EASE } from "@/lib/motion";

const VIDEO_SRC = "/assets/teknisa/videos/video_1920x1080_551969.mp4";

const STATS = [
  { value: "28.200+", label: "operações" },
  { value: "10M+", label: "refeições/mês" },
  { value: "99,9%", label: "uptime" },
];

export function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Trava o scroll do body e fecha no Esc enquanto o modal de vídeo está aberto.
  useEffect(() => {
    if (!isVideoOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsVideoOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isVideoOpen]);

  useEffect(() => {
    if (!isVideoOpen) return;
    videoRef.current?.play().catch(() => {});
  }, [isVideoOpen]);

  return (
    <section id="inicio" className="relative bg-white">
      {/* Moldura branca: topo (header), lados e embaixo */}
      <div className="px-2 pb-2 pt-[4.5rem] sm:px-4 sm:pb-4 sm:pt-[5rem] lg:px-6 lg:pb-6 lg:pt-[5.5rem]">
        {/* Bloco do vídeo */}
        <div className="relative min-h-[calc(100dvh-6rem)] overflow-hidden rounded-2xl sm:min-h-[calc(100dvh-6.5rem)] lg:min-h-[calc(100dvh-7rem)] lg:rounded-3xl">
          {/* Vídeo de fundo */}
          <div className="absolute inset-0 z-0">
            <VideoWithFallback
              startTime={10}
              className="h-full w-full object-cover"
              variant="background"
              ariaLabel="Vídeo institucional Teknisa"
              playLabel=""
            />
          </div>

          {/* Overlay — gradiente diagonal azul Teknisa + escurecimento inferior */}
          <div className="absolute inset-0 z-[1]" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(170deg, rgba(4,4,134,0.78) 0%, rgba(4,4,134,0.35) 45%, transparent 70%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 40%, transparent 65%)",
              }}
            />
          </div>

          {/* Conteúdo — duas zonas: texto à esquerda, métricas à direita (no rodapé) */}
          <div className="relative z-10 flex min-h-[calc(100dvh-6rem)] flex-col justify-end px-6 pb-8 sm:min-h-[calc(100dvh-6.5rem)] sm:px-10 sm:pb-10 lg:min-h-[calc(100dvh-7rem)] lg:px-14 lg:pb-12 xl:px-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              {/* Coluna esquerda: headline + sub + CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="max-w-2xl xl:max-w-3xl"
              >
                {/* Label superior com linha */}
                <motion.div
                  className="mb-6 flex items-center gap-3 lg:mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05, duration: 0.6, ease: EASE }}
                >
                  <div className="h-px w-8 bg-white/50 sm:w-12" />
                  <span className="text-[11px] font-semibold text-white/85 sm:text-xs">
                    Food Tech &bull; 35 anos
                  </span>
                </motion.div>

                {/* Headline com tipografia cinética destacando "ecossistema" */}
                <h1
                  className="mb-5 font-display font-bold leading-[0.95] tracking-tight text-white lg:mb-6"
                  aria-label="O maior ecossistema de tecnologia para Varejo Corporativo"
                >
                  <motion.span
                    className="block text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[5rem] 2xl:text-[5.5rem]"
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                  >
                    O maior
                  </motion.span>
                  <motion.span
                    className="block text-[2.75rem] text-white sm:text-[3.5rem] lg:text-[4rem] xl:text-[5rem] 2xl:text-[5.5rem]"
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
                  >
                    ecossistema
                  </motion.span>
                  <motion.span
                    className="mt-1 block text-lg font-medium leading-snug tracking-normal text-white/60 sm:text-xl lg:mt-2 lg:text-2xl xl:text-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
                  >
                    de tecnologia para Varejo Corporativo
                  </motion.span>
                </h1>

                <motion.p
                  className="mb-7 max-w-md text-sm leading-relaxed text-white/50 sm:text-base lg:mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
                >
                  Tecnologia que gerencia +28 mil operações e 10 milhões de refeições por mês com
                  performance e inteligência.
                </motion.p>

                <motion.div
                  className="flex flex-wrap items-center gap-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.55, ease: EASE }}
                >
                  <a
                    href="#contato"
                    className="group inline-flex h-11 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-primary shadow-lg shadow-black/15 transition-all hover:bg-white/90"
                  >
                    Agendar demo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsVideoOpen(true)}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white/80 backdrop-blur-md transition-all hover:border-white/35 hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                    aria-haspopup="dialog"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-primary">
                      <Play className="h-3 w-3 fill-primary" />
                    </span>
                    Assistir vídeo
                  </button>
                </motion.div>
              </motion.div>

              {/* Coluna direita: métricas verticais no canto inferior-direito (desktop) */}
              <motion.div
                className="hidden shrink-0 flex-col items-end gap-0 lg:flex"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
              >
                {STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`py-3 text-right ${i > 0 ? "border-t border-white/10" : ""}`}
                  >
                    <p className="font-display text-3xl font-bold leading-none text-white xl:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] text-white/45 xl:text-xs">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Trust bar mobile — abaixo de tudo em mobile, escondida em lg+ */}
            <motion.div
              className="mt-8 flex items-center gap-5 border-t border-white/10 pt-5 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-xl font-bold leading-none text-white">{s.value}</p>
                  <p className="mt-0.5 text-[10px] text-white/45">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal de vídeo completo */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 px-3 py-6 backdrop-blur-xl sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Vídeo completo da Teknisa"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setIsVideoOpen(false);
            }}
          >
            <motion.div
              className="relative flex max-h-[calc(100dvh-3rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl shadow-black/40 ring-1 ring-white/10 lg:rounded-3xl"
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-5">
                <div>
                  <p className="text-xs font-semibold text-primary/70">Vídeo institucional</p>
                  <h2 className="mt-1 font-display text-lg font-semibold text-slate-950 sm:text-xl">
                    Teknisa Vision
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  aria-label="Fechar vídeo"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <video
                ref={videoRef}
                src={VIDEO_SRC}
                autoPlay
                controls
                playsInline
                preload="metadata"
                className="aspect-video max-h-[calc(100dvh-8rem)] w-full bg-black object-contain"
                aria-label="Vídeo completo da Teknisa"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

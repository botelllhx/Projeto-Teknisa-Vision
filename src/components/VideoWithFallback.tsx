/**
 * Vídeo de fundo com autoplay (muted/playsInline) ao entrar em view e fallback
 * de botão "Assistir" quando o navegador bloqueia o autoplay.
 */
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

const VIDEO_SRC = "/assets/teknisa/videos/video_1920x1080_551969.mp4";

interface VideoWithFallbackProps {
  /** Tempo (s) onde o vídeo começa a tocar. */
  startTime?: number;
  className?: string;
  variant?: "hero" | "background";
  playLabel?: string;
  ariaLabel?: string;
}

export function VideoWithFallback({
  startTime = 0,
  className = "",
  variant = "hero",
  playLabel = "Assistir",
  ariaLabel = "Vídeo",
}: VideoWithFallbackProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const play = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    if (startTime > 0) v.currentTime = startTime;
    v.play()
      .then(() => setIsPlaying(true))
      .catch(() => setAutoplayBlocked(true));
  }, [startTime]);

  useEffect(() => {
    const v = videoRef.current;
    const el = containerRef.current;
    if (!v || !el) return;

    const tryPlay = () => {
      if (autoplayBlocked) return;
      play();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) tryPlay();
      },
      { threshold: 0.1, rootMargin: "50px" },
    );
    observer.observe(el);

    v.addEventListener("loadeddata", tryPlay, { once: true });
    v.addEventListener("canplay", tryPlay, { once: true });
    return () => {
      observer.disconnect();
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
    };
  }, [play, autoplayBlocked]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        playsInline
        loop
        muted
        autoPlay
        preload="auto"
        className="h-full w-full object-cover"
        aria-label={ariaLabel}
        onPause={() => setIsPlaying(false)}
        onPlaying={() => setIsPlaying(true)}
        onClick={() => {
          if (videoRef.current?.paused) play();
        }}
      />
      <AnimatePresence>
        {!isPlaying && playLabel && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              play();
            }}
            className={`group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3 transition-colors ${
              variant === "background" ? "bg-black/30 hover:bg-black/40" : "bg-black/40 hover:bg-black/30"
            }`}
            aria-label={playLabel}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-2xl transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
              <Play className="ml-0.5 h-7 w-7 fill-primary-foreground text-primary-foreground sm:h-8 sm:w-8" />
            </div>
            <span className="text-base font-semibold text-white drop-shadow-lg">{playLabel}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

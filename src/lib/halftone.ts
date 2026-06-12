import { useEffect, useState } from "react";

/**
 * Halftone "de verdade" (§10 Eventos). Renderiza a foto como uma malha de **pontos coloridos**
 * cujo raio varia pela **luminância** do pixel (claro = ponto maior), sobre um fundo escuro,
 * evocando uma retícula de impressão fina e elegante (não uma grade de LED chapada). O resultado
 * é "assado" num dataURL e **cacheado** por src (render uma vez). Imagens same-origin (public/),
 * então `getImageData` não tainta o canvas.
 */
const cache = new Map<string, string>();
const CELL = 5; // espaçamento da retícula (px no espaço de render)
const MAX_W = 1500;

function render(img: HTMLImageElement): string {
  const ratio = img.naturalHeight / img.naturalWidth || 0.5;
  const cw = Math.min(MAX_W, img.naturalWidth || MAX_W);
  const ch = Math.round(cw * ratio);

  const off = document.createElement("canvas");
  off.width = cw;
  off.height = ch;
  const octx = off.getContext("2d", { willReadFrequently: true });
  if (!octx) return img.src;
  octx.drawImage(img, 0, 0, cw, ch);
  const data = octx.getImageData(0, 0, cw, ch).data;

  const out = document.createElement("canvas");
  out.width = cw;
  out.height = ch;
  const ctx = out.getContext("2d");
  if (!ctx) return img.src;
  // base bem escura (os pontos reconstroem a imagem por cima)
  ctx.fillStyle = "#05060f";
  ctx.fillRect(0, 0, cw, ch);
  // leve eco da foto nas sombras, pra não ficar preto-morto
  ctx.globalAlpha = 0.16;
  ctx.drawImage(off, 0, 0);
  ctx.globalAlpha = 1;

  const R = CELL / 2;
  for (let y = 0; y < ch; y += CELL) {
    for (let x = 0; x < cw; x += CELL) {
      const i = (y * cw + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const rad = R * Math.min(1.05, Math.pow(lum, 0.62) * 1.32);
      if (rad < 0.35) continue;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.beginPath();
      ctx.arc(x + R, y + R, rad, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  return out.toDataURL("image/webp", 0.92);
}

function fromSrc(src: string): Promise<string> {
  const hit = cache.get(src);
  if (hit) return Promise.resolve(hit);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const url = render(img);
        cache.set(src, url);
        resolve(url);
      } catch {
        resolve(src);
      }
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}

/** Devolve o dataURL do halftone (ou "" enquanto carrega). */
export function useHalftone(src: string): string {
  const [url, setUrl] = useState(() => cache.get(src) ?? "");
  useEffect(() => {
    let alive = true;
    fromSrc(src).then((u) => alive && setUrl(u));
    return () => {
      alive = false;
    };
  }, [src]);
  return url;
}

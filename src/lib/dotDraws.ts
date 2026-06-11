/**
 * Formas-fonte do dot-art do §6 (TeknisAI). Cada função desenha a forma de uma
 * capacidade em **azul forte** numa grade pequena (o DotArtCard amostra essa grade e
 * desenha um ponto por célula = halftone). Bold/filled para o halftone "pegar".
 * `t` = tempo (ms) para respiração sutil; t=0 = estático (reduced-motion).
 *
 * Paleta: azul da família Teknisa (forte, não o `sky`) + charcoal. Sem cor nova de marca.
 */
export const DOT_BLUE = "#6175ff"; // azul forte (família teknisa), legível como ponto no charcoal
export const DOT_CHARCOAL = "#15151b";

export type DotDraw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Agentes de IA: rede de nós conectados (constelação que pulsa). */
export const network: DotDraw = (ctx, w, h, t) => {
  const s = Math.min(w, h);
  const nodes = [
    [0.5, 0.18], [0.22, 0.4], [0.78, 0.38], [0.3, 0.72], [0.7, 0.74], [0.5, 0.5],
  ];
  const edges = [[5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [0, 1], [0, 2], [1, 3], [2, 4]];
  const pulse = 1 + 0.07 * Math.sin(t / 420);
  ctx.strokeStyle = DOT_BLUE;
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = s * 0.02;
  edges.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a][0] * w, nodes[a][1] * h);
    ctx.lineTo(nodes[b][0] * w, nodes[b][1] * h);
    ctx.stroke();
  });
  ctx.globalAlpha = 1;
  ctx.fillStyle = DOT_BLUE;
  nodes.forEach((n, i) => {
    const r = s * (i === 5 ? 0.075 : 0.05) * pulse;
    ctx.beginPath();
    ctx.arc(n[0] * w, n[1] * h, r, 0, Math.PI * 2);
    ctx.fill();
  });
};

/** Automação operacional: setas circulares (loop) girando devagar. */
export const loop: DotDraw = (ctx, w, h, t) => {
  const cx = w / 2;
  const cy = h / 2;
  const R = Math.min(w, h) * 0.3;
  const rot = t / 1600;
  ctx.strokeStyle = DOT_BLUE;
  ctx.lineWidth = Math.min(w, h) * 0.1;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy, R, rot + 0.35, rot + Math.PI - 0.35);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, R, rot + Math.PI + 0.35, rot + Math.PI * 2 - 0.35);
  ctx.stroke();
  ctx.fillStyle = DOT_BLUE;
  [rot - 0.35, rot + Math.PI - 0.35].forEach((a) => {
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * R, cy + Math.sin(a) * R, Math.min(w, h) * 0.08, 0, Math.PI * 2);
    ctx.fill();
  });
};

/** IA para compras: barras de previsão de demanda (ascendentes, ondulando). */
export const bars: DotDraw = (ctx, w, h, t) => {
  const n = 5;
  const gap = w * 0.05;
  const bw = (w * 0.62 - gap * (n - 1)) / n;
  const x0 = w * 0.19;
  const base = h * 0.8;
  ctx.fillStyle = DOT_BLUE;
  for (let i = 0; i < n; i++) {
    const grow = 0.4 + 0.6 * ((i + 1) / n);
    const wob = 1 + 0.09 * Math.sin(t / 360 + i * 0.7);
    const bh = h * 0.55 * grow * wob;
    ctx.fillRect(x0 + i * (bw + gap), base - bh, bw, bh);
  }
};

/** IA para atendimento: balão de chat com 3 pontos (typing) que sobem/descem. */
export const chat: DotDraw = (ctx, w, h, t) => {
  const bw = w * 0.62;
  const bh = h * 0.46;
  const x = (w - bw) / 2;
  const y = h * 0.2;
  roundRect(ctx, x, y, bw, bh, Math.min(bw, bh) * 0.22);
  ctx.fillStyle = DOT_BLUE;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x + bw * 0.22, y + bh - 1);
  ctx.lineTo(x + bw * 0.12, y + bh + h * 0.12);
  ctx.lineTo(x + bw * 0.4, y + bh - 1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = DOT_CHARCOAL;
  for (let i = 0; i < 3; i++) {
    const dy = t ? 3 * Math.sin(t / 280 + i * 0.7) : 0;
    ctx.beginPath();
    ctx.arc(x + bw * (0.3 + i * 0.2), y + bh * 0.5 + dy, Math.min(bw, bh) * 0.08, 0, Math.PI * 2);
    ctx.fill();
  }
};

/** Acento (card azul): anéis concêntricos que pulsam (ripple de dados). */
export const spiral: DotDraw = (ctx, w, h, t) => {
  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.min(w, h) * 0.46;
  const rings = 5;
  const phase = (t / 2200) % 1;
  ctx.strokeStyle = DOT_BLUE;
  ctx.lineWidth = Math.max(1.2, Math.min(w, h) * 0.06);
  for (let i = 0; i < rings; i++) {
    const k = (i + phase) % rings;
    const r = (maxR * k) / rings + maxR * 0.1;
    ctx.globalAlpha = 1 - (k / rings) * 0.65;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = DOT_BLUE;
  ctx.beginPath();
  ctx.arc(cx, cy, Math.min(w, h) * 0.06, 0, Math.PI * 2);
  ctx.fill();
};

/** Motivo decorativo (coluna alta): círculos empilhados (como a coluna de círculos da ref). */
export const circles: DotDraw = (ctx, w, h, t) => {
  ctx.fillStyle = DOT_BLUE;
  const n = Math.max(2, Math.min(6, Math.round(h / w)));
  const r = w * 0.34;
  for (let i = 0; i < n; i++) {
    const cy = (h / n) * (i + 0.5);
    const pulse = t ? 1 + 0.05 * Math.sin(t / 520 + i * 0.8) : 1;
    ctx.beginPath();
    ctx.arc(w / 2, cy, r * pulse, 0, Math.PI * 2);
    ctx.fill();
  }
};

/** Textura orgânica (preenche o card, fit="fill"): blob ondulado em halftone, vivo. */
export const field: DotDraw = (ctx, w, h, t) => {
  const cx = w * 0.5;
  const cy = h * 0.52;
  const rx = w * 0.46;
  const ry = h * 0.46;
  ctx.fillStyle = DOT_BLUE;
  ctx.beginPath();
  for (let a = 0; a <= Math.PI * 2 + 0.001; a += 0.08) {
    const r = 1 + 0.16 * Math.sin(a * 3 + (t ? t / 650 : 0)) + 0.08 * Math.sin(a * 5 - (t ? t / 900 : 0));
    const x = cx + Math.cos(a) * rx * r;
    const y = cy + Math.sin(a) * ry * r;
    if (a === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
};

export const DOT_DRAWS = { network, loop, bars, chat, spiral, circles, field } as const;
export type DotDrawKey = keyof typeof DOT_DRAWS;

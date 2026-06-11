/**
 * §8 · Cases — dados dos cards de vídeo. **Conteúdo é placeholder** (`// TODO`): NÃO inventar
 * cliente/empresa/número. Marketing valida e fornece vídeos (loop curto, mudo, recortado),
 * posters e quotes/métricas reais. Mídia em `public/assets/teknisa/cases/<id>/`.
 */
export type Case = {
  id: string;
  client: string; // nome da pessoa
  company: string;
  role: string;
  segment: string; // tag exibida no card
  quote: string; // frase curta
  metric?: string; // dado concreto (texto), sem inventar número
  videoWebm: string; // WebM (VP9/AV1) — preferido
  videoMp4: string; // MP4 (H.264) — fallback
  poster: string; // 1º quadro
  alt: string;
};

const A = (id: string, file: string) => `/assets/teknisa/cases/${id}/${file}`;

// TODO: substituir TODO o conteúdo abaixo por cases reais (vídeo + poster + quote + cliente +
// métrica) validados com o marketing. Por ora são placeholders honestos (sem cliente/número fake).
export const CASES: Case[] = [
  {
    id: "corporativo",
    segment: "Restaurante corporativo",
    client: "Nome do cliente",
    company: "Empresa",
    role: "Cargo",
    quote: "Um depoimento curto sobre como a operação ficou mais previsível no dia a dia.",
    metric: "Resultado em destaque",
    videoWebm: A("corporativo", "video.webm"),
    videoMp4: A("corporativo", "video.mp4"),
    poster: A("corporativo", "poster.webp"),
    alt: "Depoimento de cliente do segmento de restaurante corporativo",
  },
  {
    id: "hospitalar",
    segment: "Hospitalar",
    client: "Nome do cliente",
    company: "Empresa",
    role: "Cargo",
    quote: "Um depoimento curto sobre controle nutricional e segurança da operação hospitalar.",
    metric: "Resultado em destaque",
    videoWebm: A("hospitalar", "video.webm"),
    videoMp4: A("hospitalar", "video.mp4"),
    poster: A("hospitalar", "poster.webp"),
    alt: "Depoimento de cliente do segmento hospitalar",
  },
  {
    id: "escolar",
    segment: "Escolar",
    client: "Nome do cliente",
    company: "Empresa",
    role: "Cargo",
    quote: "Um depoimento curto sobre cardápio e produção na alimentação escolar.",
    metric: "Resultado em destaque",
    videoWebm: A("escolar", "video.webm"),
    videoMp4: A("escolar", "video.mp4"),
    poster: A("escolar", "poster.webp"),
    alt: "Depoimento de cliente do segmento escolar",
  },
  {
    id: "varejo",
    segment: "Varejo e food service",
    client: "Nome do cliente",
    company: "Empresa",
    role: "Cargo",
    quote: "Um depoimento curto sobre frente de loja e delivery num fluxo só.",
    metric: "Resultado em destaque",
    videoWebm: A("varejo", "video.webm"),
    videoMp4: A("varejo", "video.mp4"),
    poster: A("varejo", "poster.webp"),
    alt: "Depoimento de cliente do segmento de varejo e food service",
  },
];

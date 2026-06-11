/**
 * §8 · Cases — testemunhos para o **carrossel infinito** (mistura cards de VÍDEO + cards
 * TEXTUAIS coloridos, na paleta). **Conteúdo é placeholder** (`// TODO`): marcas reais que
 * rodam (ou podem rodar) na Teknisa, mas **quote, pessoa, cargo, vídeo e logo são placeholders**
 * até o marketing fornecer/validar. NÃO inventar número/claim específico de cliente.
 * Mídia em `public/assets/teknisa/cases/<id>/` (video.webm + video.mp4 + poster.webp + logo.svg).
 */
export type CardTone = "tint" | "tint2" | "soft" | "navy";

export type Testimonial = {
  id: string;
  kind: "video" | "text";
  brand: string;
  person: string; // // TODO
  role: string; // // TODO
  tag: string; // segmento/contexto (sentence case, sem caixa-alta)
  quote: string; // // TODO: depoimento real
  // vídeo:
  videoWebm?: string;
  videoMp4?: string;
  poster?: string;
  // textual:
  tone?: CardTone;
  logo?: string; // // TODO: logo real; placeholder = wordmark do nome
  alt?: string;
};

const A = (id: string, file: string) => `/assets/teknisa/cases/${id}/${file}`;

const vid = (id: string, brand: string, tag: string, quote: string): Testimonial => {
  const folder = id.split("--")[0]; // pasta = marca-base (ids "--v" reusam a mesma mídia)
  return {
    id,
    kind: "video",
    brand,
    person: "Nome da pessoa", // TODO
    role: "Cargo", // TODO
    tag,
    quote, // TODO
    videoWebm: A(folder, "video.webm"),
    videoMp4: A(folder, "video.mp4"),
    poster: A(folder, "poster.webp"),
    logo: A(folder, "logo.svg"),
    alt: `Depoimento em vídeo de cliente ${brand}`,
  };
};

const txt = (
  id: string,
  brand: string,
  tag: string,
  tone: CardTone,
  quote: string,
): Testimonial => ({
  id,
  kind: "text",
  brand,
  person: "Nome da pessoa", // TODO
  role: "Cargo", // TODO
  tag,
  quote, // TODO
  tone,
  logo: A(id.split("--")[0], "logo.svg"),
});

// TODO: substituir quotes/pessoas/vídeos/logos por material real validado com o marketing.
export const TESTIMONIALS: Testimonial[] = [
  vid("madero", "Madero", "Restaurante", "A operação do dia a dia ficou mais previsível e sob controle."),
  txt("pobre-juan", "Pobre Juan", "Restaurante", "tint", "Cada etapa conversa com a próxima e nada se perde no caminho."),
  vid("familia-madalosso", "Família Madalosso", "Restaurante", "Do planejamento do prato ao prato servido, numa plataforma só."),
  txt("cosechas", "Cosechas", "Franquia", "navy", "A frente de loja e a retaguarda rodam no mesmo fluxo."),
  txt("madero--2", "Madero", "Restaurante", "tint2", "A equipe ganhou tempo para o que importa: o atendimento."),
  vid("pobre-juan--v", "Pobre Juan", "Restaurante", "O custo por prato deixou de ser uma caixa-preta."),
  txt("familia-madalosso--2", "Família Madalosso", "Restaurante", "soft", "Cresceu a operação sem perder o controle da cozinha."),
  vid("cosechas--v", "Cosechas", "Franquia", "Padronizou a operação loja a loja, sem complicar."),
];

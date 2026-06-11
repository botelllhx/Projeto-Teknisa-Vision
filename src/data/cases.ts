/**
 * §8 · Cases — mural de testemunhos em vídeo + cards de logo (alturas variadas).
 *
 * **Conteúdo é placeholder** (`// TODO`): os nomes de cliente são marcas reais que rodam (ou
 * podem rodar) na Teknisa, mas **quote, pessoa, cargo, vídeo e logo são placeholders** até o
 * marketing validar e fornecer o material. NÃO inventar número/claim específico de cliente.
 * Mídia em `public/assets/teknisa/cases/<id>/` (video.webm + video.mp4 + poster.webp + logo.svg).
 */
export type Case = {
  id: string;
  brand: string;
  person: string; // // TODO: pessoa real
  role: string; // // TODO: cargo real
  quote: string; // // TODO: depoimento real
  videoWebm: string;
  videoMp4: string;
  poster: string;
  logo: string; // // TODO: logo real (svg); por ora cai no wordmark do nome
  alt: string;
};

const A = (id: string, file: string) => `/assets/teknisa/cases/${id}/${file}`;
const CASE = (id: string, brand: string, quote: string): Case => ({
  id,
  brand,
  person: "Nome da pessoa", // TODO
  role: "Cargo", // TODO
  quote, // TODO: depoimento real
  videoWebm: A(id, "video.webm"),
  videoMp4: A(id, "video.mp4"),
  poster: A(id, "poster.webp"),
  logo: A(id, "logo.svg"),
  alt: `Depoimento em vídeo do cliente ${brand}`,
});

// TODO: substituir quotes/pessoas/vídeos/logos por material real validado com o marketing.
export const CASES: Case[] = [
  CASE("madero", "Madero", "A operação do dia a dia ficou mais previsível e sob controle."),
  CASE("pobre-juan", "Pobre Juan", "Cada etapa conversa com a próxima e nada se perde no caminho."),
  CASE(
    "familia-madalosso",
    "Família Madalosso",
    "Do planejamento do prato ao prato servido, tudo numa plataforma só.",
  ),
  CASE("cosechas", "Cosechas", "A frente de loja e a retaguarda rodam no mesmo fluxo."),
];

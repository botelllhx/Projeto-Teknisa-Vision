/**
 * §10 · Onde nos encontrar — slides do **slider de eventos** (Food Service Show + feiras).
 * Cada evento tem a sua **cor de marca** (`theme`): `dark` = faixa navy, `light` = faixa branca
 * (a troca entre eles escurece a área na transição). Imagem da foto recebe **halftone no código**.
 * Texto/CTA são placeholders (`// TODO`); não inventar datas/claims.
 */
export type EventSlide = {
  id: string;
  name: string;
  theme: "dark" | "light";
  image: string;
  imageAlt: string;
  logo: string;
  logoAlt: string;
  /** classe de altura da logo (cada marca tem proporção própria) */
  logoClass: string;
  text: string;
  cta?: { label: string; url: string };
};

const A = (f: string) => `/assets/teknisa/events/${f}`;

// TODO: textos finais e URLs reais (validar com marketing — não inventar datas/claims).
export const EVENTS: EventSlide[] = [
  {
    id: "food-service-show",
    name: "Food Service Show",
    theme: "dark",
    image: A("food-service-show.webp"),
    imageAlt: "Plateia reunida no Food Service Show da Teknisa",
    logo: A("Food-Service-Show.svg"),
    logoAlt: "Food Service Show",
    logoClass: "h-28 sm:h-40 lg:h-52",
    text: "O evento itinerante da Teknisa que reúne o setor de food service para palestras, demonstrações ao vivo da plataforma e networking de alto nível.",
  },
  {
    id: "fispal",
    name: "Fispal Food Service",
    theme: "light",
    image: A("fispal.webp"),
    imageAlt: "Estande da Teknisa na Fispal Food Service",
    logo: A("fispal-logo.png"),
    logoAlt: "Fispal Food Service e Fispal Sorvetes",
    logoClass: "h-20 sm:h-28 lg:h-36",
    text: "A Teknisa marca presença na Fispal Food Service. Venha conhecer a plataforma e falar com nosso time direto no estande.",
  },
];

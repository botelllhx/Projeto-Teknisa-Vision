/**
 * §12 · Blog/Conteúdo — artigos. **Conteúdo placeholder** (`// TODO`): categorias realistas, mas
 * **títulos/datas reais devem ser puxados do blog (teknisa.com/blog)** depois — não inventar claim.
 * Imagem real (Pexels, food service, webp) em `public/assets/teknisa/blog/<id>.webp`; sem imagem,
 * cai num placeholder. TODO: trocar pelas featured images reais dos posts depois.
 */
export type Post = {
  id: string;
  title: string;
  category: string; // ex.: "Food service", "Tendências", "Nutrição & UAN", "Varejo", "IA"
  image: string; // // TODO: imagem real
  date?: string; // // TODO
  readTime?: string;
  url: string; // // TODO
};

const A = (id: string) => `/assets/teknisa/blog/${id}.webp`;
const P = (id: string, title: string, category: string, readTime: string): Post => ({
  id,
  title,
  category,
  image: A(id),
  readTime,
  url: "#recursos", // // TODO url real
});

// TODO: substituir títulos/datas por conteúdo real do blog da Teknisa (não inventar).
export const POSTS: Post[] = [
  P("ia-alimentacao-coletiva", "Como a IA está mudando a operação de alimentação coletiva", "IA", "6 min"),
  P("tendencias-food-service", "Tendências de food service para ficar de olho", "Tendências", "5 min"),
  P("cmv-uan", "CMV sob controle: o que toda UAN precisa acompanhar", "Nutrição & UAN", "7 min"),
  P("frente-de-loja-filas", "Frente de loja: menos fila sem perder margem", "Varejo", "4 min"),
  P("cardapio-ao-caixa", "Do cardápio ao caixa: integrando a operação numa plataforma", "Food service", "6 min"),
  P("delivery-apps", "Delivery sem caos: um painel para todos os apps", "Delivery", "5 min"),
  P("equipe-esocial", "Escala, ponto e eSocial: o RH do food service em ordem", "Pessoas e RH", "6 min"),
  P("comanda-digital", "Comanda digital: do salão à cozinha sem ruído", "Atendimento", "4 min"),
  P("self-service-peso", "Self-service por peso: balança integrada ao caixa", "Operação", "5 min"),
  P("cardapio-qr-code", "Cardápio digital e QR code: o pedido na mão do cliente", "Inovação", "4 min"),
];

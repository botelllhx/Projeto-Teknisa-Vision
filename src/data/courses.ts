/**
 * §11 · EAD Teknisa — cursos. **Conteúdo placeholder** (`// TODO`): os módulos são reais do EAD
 * Teknisa (âncora), mas durações/imagens/urls precisam ser validados/expandidos com o marketing.
 * Imagem em `public/assets/teknisa/ead/<id>.webp`; sem imagem, o card cai num placeholder.
 */
export type Course = {
  id: string;
  title: string;
  module: string; // ex.: "Cozinha Central"
  segment?: string;
  duration: string; // ex.: "17 min", "1h30"
  audience: string; // ex.: "Operadores", "Gestores"
  access: "livre" | "privado";
  certified: boolean;
  image: string; // // TODO: imagem real
  url: string; // // TODO: url real
};

const A = (id: string) => `/assets/teknisa/ead/${id}.webp`;
const C = (
  id: string,
  title: string,
  module: string,
  duration: string,
  audience: string,
  access: "livre" | "privado",
): Course => ({ id, title, module, duration, audience, access, certified: true, image: A(id), url: "#contato" }); // // TODO url

// TODO: validar/expandir com o marketing (durações, imagens, urls reais).
export const COURSES: Course[] = [
  C("cozinha-central", "Cozinha Central: cadastros do módulo", "Cozinha Central", "17 min", "Operadores", "livre"),
  C("netproject", "NetProject: acompanhamento de tarefas e projetos", "NetProject", "1h10", "Gestores", "livre"),
  C("modulo-ol", "Módulo OL: centros logísticos", "Logística", "45 min", "Operadores", "livre"),
  C("impostos-irrf", "Parametrizações de impostos e IRRF", "Fiscal", "1h30", "Backoffice", "privado"),
  C("customer-portal", "Customer Portal: customizador", "Customer Portal", "35 min", "Administradores", "livre"),
  C("seguranca-informacao", "Segurança da informação", "Geral", "25 min", "Todos os perfis", "livre"),
];

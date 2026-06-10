/**
 * Camada de dados do §5 · Interactive Product Tour (editável pelo marketing).
 *
 * Conteúdo (nomes, value props, módulos, hotspots) vem do CLAUDE.md / mega-menu.
 * NÃO inventar números/claims. Coordenadas dos hotspots são em % sobre a tela
 * (responsivo); ajustáveis sem mexer no componente.
 *
 * `screenshot` é opcional: enquanto não houver captura real, o stage usa a UI fake
 * (ver ProductFrame). Quando a tela real chegar, preencher `screenshot`.
 *
 * Escopo atual: TecFood é o carro-chefe (hotspots completos); os demais têm hotspots
 * mínimos (marcados como TODO de coordenada/refino). IA fica de fora até ter logo.
 */
export type Hotspot = { x: number; y: number; title: string; desc: string };

export type Product = {
  slug: string;
  name: string;
  logo: string;
  screenshot?: string;
  valueProp: string;
  /** Itens da navegação lateral da UI fake. */
  modules: string[];
  hotspots: Hotspot[];
};

const LOGO = (slug: string, file: string) => `/assets/teknisa/products/${slug}/${file}`;

export const PRODUCTS: Product[] = [
  {
    slug: "tecfood",
    name: "TecFood",
    logo: LOGO("tecfood", "tecfood-horizontal-colorido-svg.svg"),
    valueProp: "Alimentação coletiva sob controle, do cardápio ao fiscal.",
    modules: ["Cardápios", "Ficha técnica e CMV", "Produção", "Estoque", "Gestão nutricional", "Fiscal"],
    hotspots: [
      { x: 13, y: 31, title: "Planejamento de cardápios", desc: "Cardápios por unidade e período, com previsão de demanda." },
      { x: 41, y: 41, title: "Ficha técnica e CMV", desc: "Custo por refeição calculado da ficha técnica, sem planilha paralela." },
      { x: 65, y: 56, title: "Produção", desc: "Ordens de produção e fichas de cozinha por refeição servida." },
      { x: 47, y: 81, title: "Estoque operacional", desc: "Estoque integrado às fichas técnicas e às compras." },
      { x: 87, y: 22, title: "Fiscal", desc: "Notas e obrigações fiscais da operação, sem retrabalho." },
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    logo: LOGO("retail", "retail-horizontal-colorida-svg.svg"),
    valueProp: "Do balcão ao delivery, a frente de loja num fluxo só.",
    modules: ["PDV", "Autoatendimento", "Cardápio digital", "Delivery", "Cashless", "CRM"],
    // TODO: refinar coordenadas/hotspots quando houver tela real
    hotspots: [
      { x: 41, y: 41, title: "Frente de loja", desc: "PDV, autoatendimento e cardápio digital num fluxo só." },
      { x: 66, y: 62, title: "Delivery integrado", desc: "Pedidos do delivery conectados ao salão e à retaguarda." },
    ],
  },
  {
    slug: "erp",
    name: "ERP",
    logo: LOGO("erp", "erp-horizontal-colorido-svg.svg"),
    valueProp: "O backoffice da operação, do financeiro ao fiscal.",
    modules: ["Financeiro", "Fiscal", "Compras", "Estoque", "Contabilidade", "Controladoria"],
    // TODO: refinar coordenadas/hotspots quando houver tela real
    hotspots: [
      { x: 41, y: 41, title: "Financeiro e fiscal", desc: "Do contas a pagar ao fiscal, integrados ao estoque." },
      { x: 65, y: 60, title: "Controladoria", desc: "DRE e indicadores gerenciais em tempo real." },
    ],
  },
  {
    slug: "hcm",
    name: "Pessoas e RH",
    logo: LOGO("hcm", "hcm-horizontal-colorido-svg.svg"),
    valueProp: "Folha, ponto e escala, com eSocial sempre em dia.",
    modules: ["Folha", "Ponto", "Escala", "Gestão de times", "eSocial", "SST"],
    // TODO: refinar coordenadas/hotspots quando houver tela real
    hotspots: [
      { x: 41, y: 41, title: "Folha e ponto", desc: "Folha, ponto e escala de trabalho num lugar só." },
      { x: 65, y: 60, title: "eSocial e SST", desc: "Obrigações de eSocial e SST sempre em dia." },
    ],
  },
  {
    slug: "facilities",
    name: "Facilities",
    logo: LOGO("facilities", "facilities-horizontal-colorido-svg.svg"),
    valueProp: "Serviços terceirizados sob gestão, das equipes aos contratos.",
    modules: ["Contratos", "Equipes e MDO", "Escalas", "Postos de serviço", "Custos"],
    // TODO: refinar coordenadas/hotspots quando houver tela real
    hotspots: [
      { x: 41, y: 41, title: "Contratos e MDO", desc: "Equipes, escalas e custo de mão de obra sob controle." },
      { x: 65, y: 60, title: "Postos de serviço", desc: "Postos, rondas e SLAs acompanhados por contrato." },
    ],
  },
];

/**
 * Camada de dados do §5 · Showcase multi-device (editável pelo marketing).
 *
 * Conteúdo (categorias, módulos, hotspots) vem do CLAUDE.md / mega-menu — NÃO inventar
 * números/claims/clientes. Marketing pode adicionar/remover devices, trocar a tela de
 * cada um, reordenar a entrada na animação (`order`), a profundidade no cluster (`layer`),
 * a posição no cluster (`place`) e os hotspots — tudo sem tocar no componente.
 *
 * TELAS: por ora são IMAGEM (`Screen.type: "image"`). Enquanto não houver captura real,
 * o componente cai numa UI fake clara de placeholder (nunca `img` quebrada). Quando a
 * tela real chegar, preencher `src`. FUTURO (estrutura já pronta): trocar uma tela por
 * vídeo curto em loop é só mudar `type` para "video" e apontar `src` para o arquivo.
 *
 * HOTSPOTS: já ativos nesta fase. Coordenadas x/y em % SOBRE A TELA daquele device
 * (responsivo). Copy em registro de BENEFÍCIO (o ganho de quem usa), não de funcionalidade.
 *
 * COPY (headline/subhead/hotspots): placeholders de benefício. // TODO: copy final
 * (validar com marketing — sem inventar números).
 */

/** Tipos de device com frame em código (ver components/ui/devices). */
export type DeviceKind =
  | "browser"
  | "desktop"
  | "laptop"
  | "tablet-portrait"
  | "tablet-landscape"
  | "phone"
  | "pos"
  | "totem";

export type Hotspot = { x: number; y: number; title: string; desc: string };

export type Screen = {
  /** "image" agora; "video" fica pronto para o futuro (UI viva em loop). */
  type: "image" | "video";
  /** Caminho do arquivo; se ausente/quebrado, cai na UI fake de placeholder. */
  src?: string;
  alt: string;
  /** Ativos NESTA fase. */
  hotspots?: Hotspot[];
};

export type DeviceInShowcase = {
  device: DeviceKind;
  screen: Screen;
  /** Nome do módulo exibido nesse device (um produto = vários módulos). */
  label?: string;
  /** Ordem de entrada na animação (1 = primeiro). */
  order: number;
  /** Profundidade/sobreposição no cluster (z-index). */
  layer?: number;
  /**
   * Posição no cluster (desktop), em % do palco: `x` = centro horizontal, `y` = TOPO
   * do device, `w` = largura. Devices grandes/baixos transbordam a base da seção e são
   * cortados (estilo "emergindo de baixo"); a âncora também sangra à direita.
   */
  place: { x: number; y: number; w: number };
  /** Mostrar no mobile (1 a 2 devices-herói por categoria). */
  hero?: boolean;
};

export type ProductShowcase = {
  slug: string;
  name: string;
  /** Logo lockup horizontal (ícone + wordmark) real. */
  logo: string;
  /** Copy em registro de BENEFÍCIO (não funcionalidade). // TODO: validar com marketing. */
  headline: string;
  subhead: string;
  devices: DeviceInShowcase[];
};

const LOGO = (slug: string, file: string) => `/assets/teknisa/products/${slug}/${file}`;
/**
 * Caminho da tela (imagem) do device. Telas reais **por tipo** em `products/screens/`
 * (otimizadas em WebP): `monitor` (desktop/laptop/browser), `tablet`, `mobile` (phone/pos/
 * totem). Usadas em TODOS os devices para um preview realista; `object-cover` enquadra.
 * TODO: quando houver capturas por produto/módulo, voltar a um caminho específico aqui.
 */
const SCREEN_BY_TYPE: Record<string, "monitor" | "tablet" | "mobile"> = {
  desktop: "monitor",
  laptop: "monitor",
  browser: "monitor",
  tablet: "tablet",
  phone: "mobile",
  pos: "mobile",
  totem: "mobile",
};
const SCREEN = (...args: string[]) => {
  const device = args[1]; // args: [categoria, tipo de device, módulo]; só o tipo importa
  return `/assets/teknisa/products/screens/${SCREEN_BY_TYPE[device] ?? "monitor"}.webp`;
};

/**
 * COMPOSIÇÃO (cluster): cada produto tem 1 device ÂNCORA grande (browser, a tela
 * principal) que pode sangrar à direita da seção, e 2 a 3 acentos menores espalhados
 * que sobem da parte de baixo. `place` = centro x/y + largura, em % do palco.
 */
export const PRODUCTS: ProductShowcase[] = [
  // ─────────────────────────── TecFood (carro-chefe — hotspots completos) ───────────────────────────
  {
    slug: "tecfood",
    name: "TecFood",
    logo: LOGO("tecfood", "tecfood-horizontal-colorido-svg.svg"),
    // TODO: copy final (validar com marketing — sem inventar números)
    headline: "Sua operação inteira sob controle.",
    subhead:
      "Cada módulo conversa com o próximo: você enxerga custo, produção e consumo em tempo real e age antes do problema.",
    devices: [
      {
        device: "desktop",
        label: "Painel de operação",
        order: 1,
        layer: 10,
        place: { x: 76, y: 30, w: 82 },
        hero: true,
        screen: {
          type: "image",
          src: SCREEN("tecfood", "desktop", "operacao"), // TODO: screenshot real
          alt: "Painel de operação do TecFood: cardápios, produção e custos",
          hotspots: [
            {
              x: 24,
              y: 36,
              title: "Planejamento de cardápios",
              desc: "Planeje semanas inteiras de uma vez e pare de improvisar no dia.",
            },
            {
              x: 58,
              y: 54,
              title: "Custo por refeição",
              desc: "Saiba quanto custa cada prato sem manter planilha paralela.",
            },
            {
              x: 82,
              y: 33,
              title: "Previsão de demanda",
              desc: "Produza a quantidade certa e jogue menos comida fora.",
            },
          ],
        },
      },
      {
        device: "tablet-portrait",
        label: "Gestão nutricional",
        order: 2,
        layer: 30,
        place: { x: 27, y: 48, w: 28 },
        screen: {
          type: "image",
          src: SCREEN("tecfood", "tablet", "nutricional"), // TODO: screenshot real
          alt: "Gestão nutricional do TecFood no tablet",
          hotspots: [
            {
              x: 50,
              y: 40,
              title: "Cardápio equilibrado",
              desc: "Refeições aprovadas pela nutrição, sem retrabalho.",
            },
          ],
        },
      },
      {
        device: "phone",
        label: "App do gestor",
        order: 3,
        layer: 40,
        place: { x: 47, y: 58, w: 15 },
        hero: true,
        screen: {
          type: "image",
          src: SCREEN("tecfood", "phone", "gestor"), // TODO: screenshot real
          alt: "App do gestor TecFood no celular",
          hotspots: [
            {
              x: 50,
              y: 32,
              title: "Operação no bolso",
              desc: "Acompanhe qualquer unidade pelo celular, onde estiver.",
            },
          ],
        },
      },
    ],
  },

  // ─────────────────────────── Retail (a mais rica — PDV + totem + delivery em volta da retaguarda) ───────────────────────────
  {
    slug: "retail",
    name: "Retail",
    logo: LOGO("retail", "retail-horizontal-colorida-svg.svg"),
    // TODO: copy final (validar com marketing — sem inventar números)
    headline: "Do balcão ao delivery, nada escapa.",
    subhead:
      "Salão, autoatendimento e delivery num fluxo só: o pedido entra uma vez e a retaguarda já sabe.",
    devices: [
      {
        device: "desktop",
        label: "Retaguarda",
        order: 1,
        layer: 10,
        place: { x: 76, y: 28, w: 80 },
        hero: true,
        screen: {
          type: "image",
          src: SCREEN("retail", "desktop", "retaguarda"), // TODO: screenshot real
          alt: "Retaguarda do Retail: salão, autoatendimento e delivery num fluxo só",
          hotspots: [
            {
              x: 40,
              y: 46,
              title: "Tudo num fluxo só",
              desc: "Salão, autoatendimento e delivery numa operação só.",
            },
          ],
        },
      },
      {
        device: "pos",
        label: "Frente de loja (PDV)",
        order: 2,
        layer: 30,
        place: { x: 15, y: 44, w: 19 },
        hero: true,
        screen: {
          type: "image",
          src: SCREEN("retail", "pos", "pdv"), // TODO: screenshot real
          alt: "PDV do Retail no terminal de frente de loja",
          hotspots: [
            {
              x: 50,
              y: 46,
              title: "Venda sem fila",
              desc: "Atendimento rápido no balcão, já ligado a estoque e fiscal.",
            },
          ],
        },
      },
      {
        device: "totem",
        label: "Autoatendimento (TAA)",
        order: 3,
        layer: 35,
        place: { x: 35, y: 62, w: 13 },
        screen: {
          type: "image",
          src: SCREEN("retail", "totem", "taa"), // TODO: screenshot real
          alt: "Totem de autoatendimento do Retail",
          // TODO: refinar hotspots quando houver tela real
          hotspots: [
            {
              x: 50,
              y: 38,
              title: "Pedido na mão do cliente",
              desc: "Mais vendas no balcão sem aumentar a equipe.",
            },
          ],
        },
      },
      {
        device: "phone",
        label: "Delivery",
        order: 4,
        layer: 40,
        place: { x: 57, y: 66, w: 14 },
        screen: {
          type: "image",
          src: SCREEN("retail", "phone", "delivery"), // TODO: screenshot real
          alt: "Pedidos de delivery do Retail no celular",
          hotspots: [
            {
              x: 50,
              y: 34,
              title: "Delivery sem digitar de novo",
              desc: "Pedidos caem direto na operação, sem retrabalho.",
            },
          ],
        },
      },
    ],
  },

  // ─────────────────────────── ERP ───────────────────────────
  {
    slug: "erp",
    name: "ERP",
    logo: LOGO("erp", "erp-horizontal-colorido-svg.svg"),
    // TODO: copy final (validar com marketing — sem inventar números)
    headline: "Menos achismo. Mais margem.",
    subhead:
      "Financeiro, fiscal e estoque no mesmo lugar: a controladoria enxerga o resultado sem esperar o fechamento.",
    devices: [
      {
        device: "desktop",
        label: "Dashboards gerenciais",
        order: 1,
        layer: 10,
        place: { x: 76, y: 30, w: 80 },
        hero: true,
        screen: {
          type: "image",
          src: SCREEN("erp", "desktop", "dashboards"), // TODO: screenshot real
          alt: "Dashboards gerenciais do ERP",
          // TODO: refinar hotspots quando houver tela real
          hotspots: [
            {
              x: 40,
              y: 46,
              title: "Resultado em tempo real",
              desc: "DRE e indicadores sem esperar o fechamento do mês.",
            },
          ],
        },
      },
      {
        device: "laptop",
        label: "Financeiro e fiscal",
        order: 2,
        layer: 30,
        place: { x: 20, y: 52, w: 42 },
        screen: {
          type: "image",
          src: SCREEN("erp", "laptop", "financeiro"), // TODO: screenshot real
          alt: "Financeiro e fiscal do ERP no laptop",
        },
      },
      {
        device: "tablet-landscape",
        label: "Aprovações",
        order: 3,
        layer: 25,
        place: { x: 55, y: 66, w: 28 },
        hero: true,
        screen: {
          type: "image",
          src: SCREEN("erp", "tablet", "aprovacoes"), // TODO: screenshot real
          alt: "Aprovações do ERP no tablet",
        },
      },
    ],
  },

  // ─────────────────────────── Pessoas e RH (HCM) ───────────────────────────
  {
    slug: "hcm",
    name: "Pessoas e RH",
    logo: LOGO("hcm", "hcm-horizontal-colorido-svg.svg"),
    // TODO: copy final (validar com marketing — sem inventar números)
    headline: "Da folha ao ponto, tudo conectado.",
    subhead:
      "Folha, ponto e escala num lugar só, com eSocial em dia: o RH para de apagar incêndio e cuida de gente.",
    devices: [
      {
        device: "desktop",
        label: "Folha e eSocial",
        order: 1,
        layer: 10,
        place: { x: 76, y: 30, w: 80 },
        hero: true,
        screen: {
          type: "image",
          src: SCREEN("hcm", "desktop", "folha"), // TODO: screenshot real
          alt: "Folha e eSocial do Pessoas e RH",
          // TODO: refinar hotspots quando houver tela real
          hotspots: [
            {
              x: 40,
              y: 46,
              title: "eSocial sempre em dia",
              desc: "Obrigações geradas a partir da folha, sem digitar duas vezes.",
            },
          ],
        },
      },
      {
        device: "tablet-portrait",
        label: "Escala de times",
        order: 2,
        layer: 25,
        place: { x: 24, y: 48, w: 26 },
        screen: {
          type: "image",
          src: SCREEN("hcm", "tablet", "escala"), // TODO: screenshot real
          alt: "Escala de times do Pessoas e RH no tablet",
        },
      },
      {
        device: "phone",
        label: "App do colaborador",
        order: 3,
        layer: 40,
        place: { x: 47, y: 60, w: 14 },
        hero: true,
        screen: {
          type: "image",
          src: SCREEN("hcm", "phone", "colaborador"), // TODO: screenshot real
          alt: "App do colaborador (ponto) do Pessoas e RH no celular",
          hotspots: [
            {
              x: 50,
              y: 34,
              title: "Ponto no celular",
              desc: "O colaborador registra o ponto e consulta o holerite sozinho.",
            },
          ],
        },
      },
    ],
  },

  // ─────────────────────────── Facilities ───────────────────────────
  {
    slug: "facilities",
    name: "Facilities",
    logo: LOGO("facilities", "facilities-horizontal-colorido-svg.svg"),
    // TODO: copy final (validar com marketing — sem inventar números)
    headline: "Cada posto sob controle, sem surpresa.",
    subhead:
      "Contratos, equipes e custo de mão de obra num só lugar: você sabe o que acontece em campo sem ir até lá.",
    devices: [
      {
        device: "desktop",
        label: "Contratos e MDO",
        order: 1,
        layer: 10,
        place: { x: 76, y: 30, w: 80 },
        hero: true,
        screen: {
          type: "image",
          src: SCREEN("facilities", "desktop", "contratos"), // TODO: screenshot real
          alt: "Contratos e mão de obra do Facilities",
          // TODO: refinar hotspots quando houver tela real
          hotspots: [
            {
              x: 40,
              y: 46,
              title: "Custo de mão de obra à vista",
              desc: "Escalas e ponto viram custo por contrato, sem planilha.",
            },
          ],
        },
      },
      {
        device: "tablet-landscape",
        label: "Gestão em campo",
        order: 2,
        layer: 30,
        place: { x: 22, y: 52, w: 30 },
        screen: {
          type: "image",
          src: SCREEN("facilities", "tablet", "campo"), // TODO: screenshot real
          alt: "Gestão em campo do Facilities no tablet",
        },
      },
      {
        device: "phone",
        label: "Rondas e SLA",
        order: 3,
        layer: 40,
        place: { x: 50, y: 62, w: 14 },
        hero: true,
        screen: {
          type: "image",
          src: SCREEN("facilities", "phone", "rondas"), // TODO: screenshot real
          alt: "Rondas e SLA do Facilities no celular",
          hotspots: [
            {
              x: 50,
              y: 34,
              title: "Rondas comprovadas",
              desc: "Postos e SLAs acompanhados em tempo real, por contrato.",
            },
          ],
        },
      },
    ],
  },
];

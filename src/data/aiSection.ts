import { DOT_DRAWS, type DotDrawKey } from "@/lib/dotDraws";

/**
 * §6 · TeknisAI — copy + cards do bento (vindos do CLAUDE.md / mega-menu, nada inventado;
 * sem números/claims). Bento **alinhado** (grid 4×4) e **variado**: card só-texto, card azul
 * de acento, hero, cards de arte, **statement**, coluna alta de motivo e **assinatura**.
 * `lead` no card; `body` (mais texto) nos cards grandes e no subtexto dinâmico à esquerda.
 */
export type Capability = {
  slug: string;
  title: string;
  lead: string;
  body: string;
  draw: DotDrawKey;
  variant: "split" | "blue" | "art" | "text";
  area: string;
};

export const AI_EYEBROW = "Apresentando";

export const AI_INTRO =
  "A inteligência que move a alimentação agora tem nome. A TeknisAI lê os milhões de pontos da sua operação e devolve o que importa: o que produzir, o que comprar e onde cortar, antes de o problema chegar ao seu caixa.";

export const AI_DEFAULT_HINT = "Passe pelos cards e veja onde a inteligência atua.";

/** Card de statement (frase-conceito, sem dado inventado). */
export const AI_STATEMENT = {
  text: "Do dado à decisão, antes do problema aparecer.",
  area: "lg:col-span-2 lg:row-start-4",
};

/** Coluna alta decorativa (motivo de pontos), preenche a altura (fit "fill"). */
export const AI_MOTIF = {
  draw: "circles" as DotDrawKey,
  caption: "Sinal no ruído",
  area: "lg:col-start-4 lg:row-span-4",
};

/** Card de assinatura da marca. */
export const AI_BRAND_LINE = "A inteligência que move a alimentação.";
export const AI_BRAND_AREA = "lg:col-start-3 lg:row-start-4";

export const CAPABILITIES: Capability[] = [
  {
    slug: "atendimento",
    title: "IA para atendimento",
    lead: "Suporte que entende a sua operação.",
    body: "Atendimento e suporte assistidos por IA que entendem o contexto da operação e respondem no seu tom, do balcão ao chamado interno.",
    draw: "chat",
    variant: "text",
    area: "lg:col-span-2",
  },
  {
    slug: "agentes",
    title: "Agentes de IA",
    lead: "Rotinas inteiras no piloto, com você no comando.",
    body: "Agentes que assumem fluxos inteiros da operação, do pedido de compra ao fechamento do dia, e chamam a sua equipe só quando a decisão é humana. Menos clique, mais controle.",
    draw: "network",
    variant: "split",
    area: "lg:col-span-2 lg:row-start-2 lg:row-span-2",
  },
  {
    slug: "automacao",
    title: "Automação operacional",
    lead: "O repetitivo rodando sozinho.",
    body: "Conciliações, lançamentos e alertas que se repetem todo dia passam a rodar sozinhos, no ritmo da operação e sem planilha paralela.",
    draw: "loop",
    variant: "blue",
    area: "lg:col-start-3 lg:row-start-1",
  },
  {
    slug: "compras",
    title: "IA para compras",
    lead: "Comprar na medida, faltar e sobrar menos.",
    body: "A previsão de demanda por unidade e período vira sugestão de compra na medida certa, para faltar menos, desperdiçar menos e proteger a margem.",
    draw: "bars",
    variant: "art",
    area: "lg:col-start-3 lg:row-start-2",
  },
  {
    slug: "financeira",
    title: "IA para gestão financeira",
    lead: "O financeiro lendo a operação em tempo real.",
    body: "Fluxo de caixa, custos e margem lidos direto da operação, com alerta antes de o número virar problema.",
    draw: "spiral",
    variant: "art",
    area: "lg:col-start-3 lg:row-start-3",
  },
];

export { DOT_DRAWS };

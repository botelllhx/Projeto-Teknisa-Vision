import { Bot, CookingPot, Gauge, Headset, PackageCheck, ScanEye } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DOT_DRAWS, type DotDrawKey } from "@/lib/dotDraws";

/**
 * §6 · TeknisAI — copy + cards do bento. Conteúdo do cliente (food service real, nada
 * inventado). Cada card: `name` (rótulo) + `cardLine` (frase curta, no card) + `hover`
 * (detalhe que aparece à esquerda no hover/foco). Variedade real: `layout` (hero = arte
 * grande / panel) e `tone` (cor do card), tamanhos diferentes no grid 12×2.
 */
export type CardTone = "charcoal" | "blue" | "blue2" | "navy" | "light";

export type Capability = {
  slug: string;
  name: string;
  cardLine: string;
  hover: string;
  /** Ícone específico (não genérico) ao lado do nome. */
  icon: LucideIcon;
  draw: DotDrawKey;
  layout: "hero" | "panel" | "text";
  tone: CardTone;
  area: string;
};

export const AI_EYEBROW = "Apresentando";

export const AI_INTRO =
  "A inteligência que move a alimentação agora tem nome. A TeknisAI lê os milhões de pontos da sua operação e devolve o que importa, antes de o problema chegar ao seu caixa.";

export const AI_DEFAULT_HINT = "Passe pelos cards e veja onde a inteligência atua.";

export const CAPABILITIES: Capability[] = [
  {
    slug: "odhen-go",
    name: "Odhen Go",
    cardLine: "A câmera vê o que vende.",
    hover:
      "Object Detection identifica os itens na bandeja e lança a venda sozinho. Menos fila, mais autonomia, zero digitação.",
    icon: ScanEye,
    draw: "field",
    layout: "hero",
    tone: "charcoal",
    area: "lg:col-span-4 lg:row-span-2",
  },
  {
    slug: "producao",
    name: "Produção sob medida",
    cardLine: "A quantidade exata, todo dia.",
    hover:
      "A IA conta os comensais e ajusta a produção ao pico real. Cubas repostas na hora, sem sobra nem falta.",
    icon: CookingPot,
    draw: "bars",
    layout: "panel",
    tone: "blue",
    area: "lg:col-start-5 lg:col-span-4 lg:row-start-1",
  },
  {
    slug: "compra",
    name: "Compra no ponto certo",
    cardLine: "Nunca falta, nunca sobra.",
    hover:
      "Prevê o consumo e diz o que e quanto comprar antes de o estoque apertar. Acabou o achismo.",
    icon: PackageCheck,
    draw: "loop",
    layout: "panel",
    tone: "light",
    area: "lg:col-start-9 lg:col-span-4 lg:row-start-1",
  },
  {
    slug: "agentes",
    name: "Agentes que executam",
    cardLine: "Tarefa pedida, tarefa feita.",
    hover:
      "Assistentes que respondem em linguagem natural e disparam rotinas (pedido, escala, conferência) no seu lugar.",
    icon: Bot,
    draw: "network",
    layout: "text",
    tone: "navy",
    area: "lg:col-start-5 lg:col-span-3 lg:row-start-2",
  },
  {
    slug: "margem",
    name: "Margem sem surpresa",
    cardLine: "O desvio aparece antes do fechamento.",
    hover:
      "CMV e margem vigiados em tempo real, com alerta quando algo foge do padrão. Você corrige no mês, não no relatório.",
    icon: Gauge,
    draw: "spiral",
    layout: "panel",
    tone: "charcoal",
    area: "lg:col-start-8 lg:col-span-2 lg:row-start-2",
  },
  {
    slug: "atendimento",
    name: "Atendimento que não dorme",
    cardLine: "Responde na hora, na voz da sua marca.",
    hover:
      "Tira dúvida do cliente a qualquer hora, no tom do seu negócio, e passa pro humano quando precisa.",
    icon: Headset,
    draw: "chat",
    layout: "panel",
    tone: "blue2",
    area: "lg:col-start-10 lg:col-span-3 lg:row-start-2",
  },
];

export { DOT_DRAWS };

/**
 * §10 · Food Service Show & Feiras — lista de datas ("tour dates"). **Conteúdo placeholder**
 * (`// TODO`): cidades da turnê + as 3 feiras por nome (Fispal/NRF/Anuga). **NÃO inventar**
 * datas/locais/estandes — validar com o marketing. `type` separa os dois grupos do toggle.
 */
export type EventStatus = "em_breve" | "inscricoes_abertas" | "encerrado";

export type EventItem = {
  id: string;
  type: "turne" | "feira";
  name: string;
  city: string;
  venue?: string;
  date: string; // // TODO: data real (não inventar)
  status?: EventStatus;
  cta?: { label: string; url: string };
};

const INSCREVA = { label: "Inscreva-se", url: "#contato" }; // // TODO: url real
const REUNIAO = { label: "Agende uma reunião", url: "#contato" }; // // TODO: url real

// TODO: substituir cidades/datas/locais/estandes por dados reais (validar com marketing).
export const EVENTS: EventItem[] = [
  // Food Service Show — turnê itinerante da Teknisa pelas capitais
  { id: "fss-bsb", type: "turne", name: "Food Service Show", city: "Brasília", venue: "Local a confirmar", date: "Data a confirmar", status: "em_breve", cta: INSCREVA },
  { id: "fss-rj", type: "turne", name: "Food Service Show", city: "Rio de Janeiro", venue: "Local a confirmar", date: "Data a confirmar", status: "em_breve", cta: INSCREVA },
  { id: "fss-sp", type: "turne", name: "Food Service Show", city: "São Paulo", venue: "Local a confirmar", date: "Data a confirmar", status: "inscricoes_abertas", cta: INSCREVA },
  { id: "fss-cwb", type: "turne", name: "Food Service Show", city: "Curitiba", venue: "Local a confirmar", date: "Data a confirmar", status: "em_breve", cta: INSCREVA },
  // Feiras do setor
  { id: "fispal", type: "feira", name: "Fispal Food Service", city: "São Paulo", venue: "Distrito Anhembi", date: "2026 (a confirmar)", status: "em_breve", cta: REUNIAO },
  { id: "nrf", type: "feira", name: "NRF Big Show", city: "Nova York", venue: "Estande a confirmar", date: "2027 (a confirmar)", status: "em_breve", cta: REUNIAO },
  { id: "anuga", type: "feira", name: "Anuga Select Brazil", city: "São Paulo", venue: "Estande a confirmar", date: "2026 (a confirmar)", status: "em_breve", cta: REUNIAO },
];

export const STATUS_LABEL: Record<EventStatus, string> = {
  em_breve: "Em breve",
  inscricoes_abertas: "Inscrições abertas",
  encerrado: "Encerrado",
};

export const byType = (type: "turne" | "feira") => EVENTS.filter((e) => e.type === type);

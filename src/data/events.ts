/**
 * §10 · Food Service Show & Feiras — eventos dos cards. **Conteúdo placeholder** (`// TODO`):
 * cidades da turnê + as 3 feiras por nome. **NÃO inventar** datas/locais/estandes — `date`/`venue`
 * ficam **indefinidos** quando não confirmados (o card mostra "Data em breve" e omite o local).
 * `type` separa os dois grupos do toggle.
 */
export type EventStatus = "em_breve" | "inscricoes_abertas" | "encerrado";

export type EventItem = {
  id: string;
  type: "turne" | "feira";
  name: string;
  city: string;
  venue?: string; // omitido no card quando ausente (não imprimir "a confirmar")
  date?: string; // ausente → "Data em breve" (// TODO: data real)
  status?: EventStatus;
  cta?: { label: string; url: string };
};

const INSCREVA = { label: "Inscreva-se", url: "#contato" }; // // TODO: url real
const REUNIAO = { label: "Agende uma reunião", url: "#contato" }; // // TODO: url real

// TODO: datas/locais/estandes reais a validar com o marketing (não inventar).
export const EVENTS: EventItem[] = [
  // Food Service Show — turnê itinerante da Teknisa pelas capitais (datas a confirmar)
  { id: "fss-bsb", type: "turne", name: "Food Service Show", city: "Brasília", status: "em_breve", cta: INSCREVA },
  { id: "fss-rj", type: "turne", name: "Food Service Show", city: "Rio de Janeiro", status: "em_breve", cta: INSCREVA },
  { id: "fss-sp", type: "turne", name: "Food Service Show", city: "São Paulo", status: "inscricoes_abertas", cta: INSCREVA },
  { id: "fss-cwb", type: "turne", name: "Food Service Show", city: "Curitiba", status: "em_breve", cta: INSCREVA },
  // Feiras do setor (anos do calendário; estandes a confirmar)
  { id: "fispal", type: "feira", name: "Fispal Food Service", city: "São Paulo", venue: "Distrito Anhembi", date: "2026", status: "em_breve", cta: REUNIAO },
  { id: "nrf", type: "feira", name: "NRF Big Show", city: "Nova York", date: "2027", status: "em_breve", cta: REUNIAO },
  { id: "anuga", type: "feira", name: "Anuga Select Brazil", city: "São Paulo", date: "2026", status: "em_breve", cta: REUNIAO },
];

export const STATUS_LABEL: Record<EventStatus, string> = {
  em_breve: "Em breve",
  inscricoes_abertas: "Inscrições abertas",
  encerrado: "Encerrado",
};

export const byType = (type: "turne" | "feira") => EVENTS.filter((e) => e.type === type);

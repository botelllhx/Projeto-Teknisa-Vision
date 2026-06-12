import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, type FieldOption } from "@/components/ui/FormField";
import { EASE_EXPO } from "@/lib/motion";

/**
 * §13 · Seção de conversão (CTA + formulário qualificador) — **antes do footer**. Estética **Klyro**
 * (editorial claro, headline grande bold navy, eyebrow com "barrinhas", inputs de linha) na paleta
 * **branca+azul** da Teknisa (base `teknisa-50`, navy `primary`). Coluna lateral = **prova + "O que
 * acontece depois"** (reforço de conversão, NÃO repete contato do footer). Formulário qualificador
 * (segmento/produto/porte) + **consentimento LGPD**; validação acessível; **NÃO submete de verdade**
 * (`// TODO`: backend/CRM), sem `localStorage`, sem reload (handler + estado fake de sucesso).
 * Reveal discreto (`whileInView`); `prefers-reduced-motion` cai p/ fade simples via MotionConfig.
 */
const SEGMENTOS: FieldOption[] = [
  { value: "alimentacao-coletiva", label: "Alimentação coletiva" },
  { value: "restaurantes-bares", label: "Restaurantes & bares" },
  { value: "varejo", label: "Varejo" },
  { value: "industria", label: "Indústria" },
  { value: "hospitalar", label: "Hospitalar" },
  { value: "outro", label: "Outro" },
];

const PRODUTOS: FieldOption[] = [
  { value: "tecfood", label: "TecFood" },
  { value: "retail", label: "Retail" },
  { value: "erp", label: "ERP" },
  { value: "hcm", label: "HCM" },
  { value: "facilities", label: "Facilities" },
  { value: "ia", label: "IA" },
  { value: "nao-sei", label: "Ainda não sei" },
];

const STEPS = [
  "Você conta sua operação",
  "Montamos uma demo no seu cenário",
  "Você vê o ganho na prática",
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: EASE_EXPO },
};

const EMPTY = {
  nome: "",
  email: "",
  empresa: "",
  telefone: "",
  segmento: "",
  produto: "",
  porte: "",
  mensagem: "",
  consent: false,
};

export function ConversionSection() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof EMPTY) => (value: string | boolean) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = "Informe seu nome.";
    if (!form.email.trim()) e.email = "Informe seu e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "E-mail inválido.";
    if (!form.empresa.trim()) e.empresa = "Informe a empresa.";
    if (!form.consent) e.consent = "É preciso aceitar a Política de Privacidade.";
    return e;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const keys = Object.keys(e);
    if (keys.length) {
      document.getElementById(keys[0] === "consent" ? "consent" : keys[0])?.focus();
      return;
    }
    // TODO: integrar com backend/CRM. Não submete de verdade e não loga dados.
    setSent(true);
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setSent(false);
  };

  return (
    <section id="contato" aria-label="Fale com a Teknisa" className="scroll-mt-24 bg-teknisa-50 py-24 lg:py-32">
      <div className="section-container">
        {/* cabeçalho: eyebrow (barrinhas) + headline grande navy + subhead à direita */}
        <motion.div {...reveal}>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1" aria-hidden>
              <span className="h-2.5 w-5 bg-primary/25" />
              <span className="h-2.5 w-2.5 bg-primary/50" />
              <span className="h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="text-sm font-semibold text-primary">Fale com a Teknisa</span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:items-end lg:gap-12">
            <h2 className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-primary sm:text-5xl lg:text-[3.5rem]">
              Sua operação pode render muito mais. A gente mostra como.
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground lg:pb-2">
              Conte pra gente como é a sua operação no food service e mostramos, na prática, onde a
              Teknisa reduz desperdício, aperta a margem e tira o trabalho manual do caminho.
            </p>
          </div>
        </motion.div>

        {/* corpo: coluna lateral (prova + passos) + formulário */}
        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[1fr_2fr] lg:gap-16">
          {/* coluna lateral — reforço de conversão (não repete contato do footer) */}
          <motion.div {...reveal}>
            {/* TODO: validar a linha de prova com marketing (não inventar número) */}
            <p className="font-display text-xl font-bold leading-tight tracking-tight text-primary lg:text-2xl">
              A maior do food service na América Latina.
            </p>

            <div className="mt-10">
              <h3 className="text-sm font-semibold text-primary">O que acontece depois</h3>
              <ol className="mt-5 space-y-5">
                {STEPS.map((step, i) => (
                  <li key={step} className="flex items-baseline gap-4">
                    <span className="font-display text-sm font-bold tabular-nums text-primary/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base font-medium text-foreground">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>

          {/* formulário qualificador */}
          <motion.div {...reveal}>
            {sent ? (
              <div className="flex flex-col items-start gap-5 rounded-3xl border border-primary/15 bg-white p-8 lg:p-10">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">
                    Recebemos seu contato.
                  </h3>
                  {/* TODO: confirmar SLA real de resposta com o time comercial */}
                  <p className="mt-2 max-w-md text-muted-foreground">
                    Em breve um especialista da Teknisa fala com você para montar a demo no seu
                    cenário.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              // noValidate: validação é nossa (acessível); preventDefault evita reload. // TODO backend
              <form noValidate onSubmit={handleSubmit}>
                <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  <FormField
                    id="nome"
                    label="Nome"
                    required
                    value={form.nome}
                    onChange={set("nome")}
                    error={errors.nome}
                    autoComplete="name"
                  />
                  <FormField
                    id="email"
                    label="E-mail corporativo"
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    error={errors.email}
                    autoComplete="email"
                    inputMode="email"
                  />
                  <FormField
                    id="empresa"
                    label="Empresa"
                    required
                    value={form.empresa}
                    onChange={set("empresa")}
                    error={errors.empresa}
                    autoComplete="organization"
                  />
                  <FormField
                    id="telefone"
                    label="Telefone / WhatsApp"
                    type="tel"
                    value={form.telefone}
                    onChange={set("telefone")}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                  <FormField
                    id="segmento"
                    label="Segmento"
                    as="select"
                    value={form.segmento}
                    onChange={set("segmento")}
                    placeholder="Selecione"
                    options={SEGMENTOS}
                  />
                  <FormField
                    id="produto"
                    label="Produto de interesse"
                    as="select"
                    value={form.produto}
                    onChange={set("produto")}
                    placeholder="Selecione"
                    options={PRODUTOS}
                  />
                  <FormField
                    id="porte"
                    label="Porte da operação (unidades ou refeições/dia)"
                    value={form.porte}
                    onChange={set("porte")}
                    placeholder="Opcional"
                    className="sm:col-span-2"
                  />
                  <FormField
                    id="mensagem"
                    label="Como podemos ajudar?"
                    as="textarea"
                    value={form.mensagem}
                    onChange={set("mensagem")}
                    placeholder="Conte um pouco sobre sua operação"
                    className="sm:col-span-2"
                  />
                </div>

                {/* consentimento LGPD (obrigatório) */}
                <div className="mt-8">
                  <label htmlFor="consent" className="flex items-start gap-3 text-sm text-foreground/70">
                    <input
                      id="consent"
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => set("consent")(e.target.checked)}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                      className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-2 border-border accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    />
                    <span>
                      Concordo com a{" "}
                      <a
                        href="#" // // TODO: link real da Política de Privacidade
                        className="font-medium text-primary underline underline-offset-2"
                      >
                        Política de Privacidade
                      </a>
                      .<span className="text-primary" aria-hidden>{" *"}</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <p id="consent-error" role="alert" className="mt-1.5 text-xs font-medium text-destructive">
                      {errors.consent}
                    </p>
                  )}
                </div>

                {/* botão + microcopy */}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <Button type="submit" size="lg">
                    Falar com especialista
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  {/* TODO: confirmar SLA real */}
                  <p className="text-sm text-muted-foreground">Sem compromisso. Resposta rápida.</p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

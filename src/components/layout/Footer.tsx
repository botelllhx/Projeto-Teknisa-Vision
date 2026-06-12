import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, Youtube } from "lucide-react";
import { DockingDots } from "@/components/ui/DockingDots";

/**
 * Rodapé (§rodapé) — fundo **azul Teknisa**, texto **branco** (a marca). Conceito **editorial**
 * (refs: Monogrid, Raxo, Sheertex): **frase grande** de newsletter + **input em linha** (border só
 * embaixo, sem box), e todo o conteúdo **jogado à esquerda** (`max-w` + `mr-auto`) p/ deixar a
 * **direita aberta** e dar espaço ao **"T" de pontos descer**. No fim, o **wordmark "TEKNISA" gigante
 * 100% da largura** encostando na base, com o cluster de pontos que **doca** sobre o "A" via
 * `DockingDots` (GSAP scroll). Links reais onde já há rota; `// TODO` onde não houver. Não inventar
 * telefone/e-mail. Newsletter é **só UI** (não submete).
 */
const WORDMARK = "/assets/teknisa/brand/teknisa-wordmark.svg";
const YEAR = new Date().getFullYear();

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Produtos",
    links: [
      { label: "TecFood", href: "#tecfood" },
      { label: "Retail", href: "#" }, // // TODO: rota
      { label: "ERP", href: "#" },
      { label: "HCM", href: "#" },
      { label: "Facilities", href: "#" },
      { label: "IA", href: "#ia" },
    ],
  },
  {
    title: "Segmentos",
    links: [
      { label: "Varejo corporativo", href: "#segmentos" },
      { label: "Food service", href: "#segmentos" },
      { label: "Indústrias", href: "#segmentos" },
      { label: "Serviços terceirizados", href: "#segmentos" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "#" }, // // TODO
      { label: "Cases", href: "#cases" },
      { label: "Blog", href: "#recursos" },
      { label: "EAD Teknisa", href: "#ead" },
      { label: "Trabalhe conosco", href: "#" }, // // TODO
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Central de ajuda", href: "#" }, // // TODO
      { label: "Status", href: "#" }, // // TODO
      { label: "Contato", href: "#contato" },
    ],
  },
];

const SOCIALS = [
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Facebook, label: "Facebook" },
];

export function Footer() {
  return (
    <footer id="rodape" className="relative overflow-hidden bg-primary text-white">
      <div className="section-container pt-20 lg:pt-28">
        {/* todo o conteúdo fica à esquerda e a faixa direita é reservada p/ o "T" de pontos descer
            sem cruzar texto nem a barra (border). 76vw < início dos pontos (~83vw) em qualquer
            largura ≥768px; o cap 64rem mantém compacto nas telas grandes. */}
        <div className="md:max-w-[min(64rem,76vw)]">
        {/* newsletter editorial: frase grande + input em linha — jogado à esquerda */}
        <div className="max-w-2xl">
          {/* TODO: copy final com marketing */}
          <h2 className="font-display text-3xl font-bold leading-[1.06] tracking-tight sm:text-4xl lg:text-[2.9rem]">
            Quer acompanhar o que move a alimentação?
          </h2>
          <p className="mt-4 max-w-md text-base text-white/55">
            Eventos, conteúdos e novidades do food service, direto no seu e-mail.
          </p>

          {/* input só com linha embaixo (sem box). UI apenas — não submete (// TODO: backend) */}
          <form
            className="group mt-8 flex items-center gap-4 border-b border-white/25 pb-3 transition-colors focus-within:border-white/70 lg:mt-10"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="footer-email" className="sr-only">
              Seu e-mail
            </label>
            <input
              id="footer-email"
              type="email"
              placeholder="Seu e-mail"
              className="h-9 flex-1 border-0 bg-transparent p-0 text-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              aria-label="Inscrever"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-focus-within:translate-x-0.5" />
            </button>
          </form>
        </div>

        {/* navegação + marca/contato — jogado à esquerda (direita aberta p/ os pontos descerem) */}
        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
          {/* marca + contato + redes */}
          <div>
            <p className="font-display text-xl font-bold tracking-tight">Teknisa</p>
            <div className="mt-5 space-y-2.5 text-sm text-white/60">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden />
                Rua Sergipe 1014, Savassi, Belo Horizonte
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-white/40" aria-hidden />
                {/* TODO: e-mail real */}
                contato a definir
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#" // // TODO: url real da rede
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* colunas de navegação */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-sm font-semibold text-white">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-white/55 transition-colors hover:text-white focus-visible:underline focus-visible:outline-none"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* linha legal */}
        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 py-7 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <p>© Teknisa {YEAR}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <a href="#" className="transition-colors hover:text-white">
              Política de Privacidade
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Termos de Uso
            </a>
          </div>
        </div>
        </div>
      </div>

      {/* lockup gigante encostando na base: o conjunto (wordmark + "T" de pontos) ocupa 100% da
          largura — o wordmark sangra na borda ESQUERDA (sem padding) e o "T" de pontos alcança a
          borda DIREITA, encaixado justinho logo após o "A", com a haste parando na metade do A. O
          container interno tem a LARGURA DO WORDMARK p/ os pontos serem posicionados em % da própria
          letra (DockingDots). */}
      <div className="relative mt-24 w-full lg:mt-40">
        <div className="relative w-[90%]">
          <img src={WORDMARK} alt="Teknisa" role="img" className="block w-full" />
          <DockingDots />
        </div>
      </div>
    </footer>
  );
}

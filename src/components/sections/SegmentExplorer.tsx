import { useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  ClipboardList,
  Factory,
  Monitor,
  ShieldCheck,
  TrendingDown,
  Workflow,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { segmentGroups } from "@/components/layout/menuData";
import {
  ClaimCard,
  IconCard,
  PhotoCard,
  StatCard,
  TagsCard,
  TextCard,
  type BentoTone,
} from "@/components/ui/BentoCard";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { EASE } from "@/lib/motion";

/**
 * §3 · Explorador de segmentos — abas (segmented-control). Cada aba tem layout,
 * tons de azul, ícones e copy próprios (foco nas DORES e BENEFÍCIOS do segmento),
 * com 2 cards de imagem de tamanhos/posições diferentes. Só tons de azul Teknisa +
 * neutros. Sem ícone decorativo repetido e sem travessão (ver CLAUDE.md).
 */

type Slot = "photoBig" | "photo2" | "claim" | "feature" | "stat" | "text" | "tags";

interface SegConfig {
  claim: { lead: string; strong: string; icon: LucideIcon };
  feature: { icon: LucideIcon; title: string; line: string };
  /**
   * Métrica do SETOR/segmento (não da Teknisa) — dá escala/relevância ao mercado.
   * Números reais com fonte (validar/atualizar com marketing, blueprint §8):
   *  - Alimentação coletiva: ABERC (~37 mi pessoas/dia, R$ 21 bi/ano) — aberc.com.br/mercado-real
   *  - Food service: Abrasel (1,38 mi estabelecimentos; R$ 455 bi em 2024) — abrasel.com.br
   *  - Indústria de alimentos: ABIA (R$ 1,161 tri em 2023; 10,8% do PIB) — abia.org.br/releases
   *  - Facilities: Abrafac/Frost & Sullivan (~R$ 60 bi/ano; maior da América Latina) — abrafac.org.br
   */
  stat: { big: string; label: string; source: string };
  text: string;
  photo2Label: string;
  theme: { claimTone: BentoTone; statTone: BentoTone };
  layout: { slot: Slot; span: string }[];
}

const HERO = (slug: string) => `/assets/teknisa/segments/${slug}/hero.webp`;
const PHOTO2 = (slug: string) => `/assets/teknisa/segments/${slug}/2.webp`;

const CONFIG: Record<string, SegConfig> = {
  // ── Varejo Corporativo (alimentação coletiva): foto grande topo-esquerda ──
  "varejo-corporativo": {
    claim: { lead: "Menos desperdício,", strong: "mais controle de CMV.", icon: TrendingDown },
    feature: {
      icon: ClipboardList,
      title: "Ficha técnica e CMV",
      line: "Custo por refeição sob controle, sem planilha paralela.",
    },
    stat: { big: "+37 mi", label: "pessoas alimentadas por dia no Brasil", source: "ABERC" },
    text: "Planeje cardápios e produção em escala, com previsão de demanda.",
    photo2Label: "Produção",
    theme: { claimTone: "lightBlue", statTone: "brand" },
    layout: [
      { slot: "photoBig", span: "sm:col-span-2 lg:col-span-2 lg:row-span-2" },
      { slot: "claim", span: "sm:col-span-2 lg:col-span-2" },
      { slot: "stat", span: "lg:col-span-1" },
      { slot: "photo2", span: "lg:col-span-1" },
      { slot: "feature", span: "lg:col-span-1" },
      { slot: "text", span: "sm:col-span-2 lg:col-span-2" },
      { slot: "tags", span: "lg:col-span-1" },
    ],
  },

  // ── Food Service: foto grande topo-direita ──
  "food-service": {
    claim: { lead: "Do balcão ao delivery,", strong: "sem fila e sem ruído.", icon: Zap },
    feature: {
      icon: Monitor,
      title: "Frente de loja",
      line: "PDV, autoatendimento e cardápio digital num só fluxo.",
    },
    stat: { big: "1,4 mi", label: "bares e restaurantes no país", source: "Abrasel" },
    text: "Centralize salão, delivery e retaguarda numa operação só.",
    photo2Label: "No balcão",
    theme: { claimTone: "blue600", statTone: "paleBlue" },
    layout: [
      { slot: "claim", span: "sm:col-span-2 lg:col-span-2" },
      { slot: "photoBig", span: "sm:col-span-2 lg:col-span-2 lg:row-span-2" },
      { slot: "feature", span: "lg:col-span-1" },
      { slot: "photo2", span: "lg:col-span-1" },
      { slot: "text", span: "sm:col-span-2 lg:col-span-2" },
      { slot: "stat", span: "lg:col-span-1" },
      { slot: "tags", span: "lg:col-span-1" },
    ],
  },

  // ── Indústrias: foto panorâmica no topo ──
  industrias: {
    claim: { lead: "Do chão de fábrica", strong: "ao resultado financeiro.", icon: Workflow },
    feature: {
      icon: Factory,
      title: "Produção e fiscal",
      line: "Rastreabilidade e fiscal integrados, sem retrabalho.",
    },
    stat: { big: "R$ 1,1 tri", label: "faturamento da indústria de alimentos", source: "ABIA" },
    text: "ERP que conecta produção, estoque, fiscal e financeiro.",
    photo2Label: "Linha de produção",
    theme: { claimTone: "tint", statTone: "navy" },
    layout: [
      { slot: "photoBig", span: "sm:col-span-2 lg:col-span-3" },
      { slot: "stat", span: "lg:col-span-1" },
      { slot: "claim", span: "sm:col-span-2 lg:col-span-2" },
      { slot: "feature", span: "lg:col-span-1" },
      { slot: "photo2", span: "lg:col-span-1" },
      { slot: "text", span: "sm:col-span-2 lg:col-span-2" },
      { slot: "tags", span: "sm:col-span-2 lg:col-span-2" },
    ],
  },

  // ── Serviços terceirizados: foto grande em FAIXA LARGA no topo (grid de 3 linhas,
  //    proporcional às outras abas; título cabe numa linha só) ──
  "servicos-terceirizados": {
    claim: { lead: "Equipes, escalas e custos", strong: "sob controle total.", icon: ShieldCheck },
    feature: {
      icon: ClipboardCheck,
      title: "Contratos e MDO",
      line: "Escalas, ponto e custo de mão de obra num lugar só.",
    },
    stat: { big: "R$ 60 bi", label: "movimentados em facilities por ano", source: "Abrafac" },
    text: "Gestão completa de contratos, equipes e postos de serviço.",
    photo2Label: "Em campo",
    theme: { claimTone: "blue700", statTone: "paleBlue" },
    layout: [
      { slot: "photoBig", span: "sm:col-span-2 lg:col-span-4" },
      { slot: "claim", span: "sm:col-span-2 lg:col-span-2" },
      { slot: "feature", span: "lg:col-span-1" },
      { slot: "stat", span: "lg:col-span-1" },
      { slot: "photo2", span: "lg:col-span-1" },
      { slot: "text", span: "sm:col-span-2 lg:col-span-2" },
      { slot: "tags", span: "lg:col-span-1" },
    ],
  },
};

const TABS = segmentGroups.map((g) => ({
  slug: g.id,
  label: g.title,
  icon: g.icon,
  subs: g.items, // {name, icon, href, badge}
}));

/** Stagger de entrada do bento ao trocar de aba. */
const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.42, ease: EASE } },
};

export function SegmentExplorer() {
  const [active, setActive] = useState(0);

  const tab = TABS[active];
  const cfg = CONFIG[tab.slug];

  const renderSlot = (slot: Slot) => {
    switch (slot) {
      case "photoBig":
        return <PhotoCard photo={HERO(tab.slug)} title={tab.label} icon={tab.icon} large />;
      case "photo2":
        return (
          <PhotoCard
            photo={PHOTO2(tab.slug)}
            fallbackPhoto={HERO(tab.slug)}
            title={cfg.photo2Label}
            icon={tab.icon}
          />
        );
      case "claim":
        return (
          <ClaimCard
            lead={cfg.claim.lead}
            strong={cfg.claim.strong}
            icon={cfg.claim.icon}
            tone={cfg.theme.claimTone}
          />
        );
      case "feature":
        return <IconCard icon={cfg.feature.icon} title={cfg.feature.title} line={cfg.feature.line} />;
      case "stat":
        return (
          <StatCard
            big={cfg.stat.big}
            label={cfg.stat.label}
            source={cfg.stat.source}
            tone={cfg.theme.statTone}
          />
        );
      case "text":
        return <TextCard headline={cfg.text} slug={tab.slug} />;
      case "tags":
        return <TagsCard items={tab.subs} />;
    }
  };

  return (
    <section id="segmentos" aria-label="Soluções por segmento" className="scroll-mt-24 bg-background">
      <div className="section-container py-20 lg:py-28">
        {/* Cabeçalho */}
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-primary">Para o seu segmento</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Cada <span className="text-primary">operação</span> tem sua própria realidade
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Escolha o segmento que mais se parece com a sua.
          </p>
        </div>

        {/* Abas — segmented control compartilhado (track claro + pílula azul ativa) */}
        <SegmentedControl
          tabs={TABS.map((t) => ({ id: t.slug, label: t.label, icon: t.icon }))}
          active={active}
          onChange={setActive}
          ariaLabel="Segmentos"
          layoutId="segTabPill"
          tabId={(id) => `segtab-${id}`}
          panelId={(id) => `segpanel-${id}`}
          className="mt-10 lg:mt-12"
        />

        {/* Bento do segmento ativo — remonta (key) e entra com stagger ao trocar de aba */}
        <motion.div
          key={tab.slug}
          id={`segpanel-${tab.slug}`}
          role="tabpanel"
          aria-labelledby={`segtab-${tab.slug}`}
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:auto-rows-[minmax(190px,auto)]"
        >
          {cfg.layout.map(({ slot, span }) => (
            <motion.div key={slot} variants={item} className={span}>
              {renderSlot(slot)}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  FileText,
  Headphones,
  MessageCircle,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { productGroups, segmentGroups, type MenuGroup } from "./menuData";

// Recursos
const resources = [
  { icon: BookOpen, label: "Blog Teknisa", href: "#blog", desc: "Artigos e novidades" },
  { icon: FileText, label: "Cases de Sucesso", href: "#cases", desc: "Histórias de clientes" },
  { icon: Calendar, label: "Eventos", href: "#eventos", desc: "Feiras e webinars" },
  { icon: Video, label: "Webinars", href: "#", desc: "Treinamentos online" },
  { icon: Award, label: "Certificações", href: "#", desc: "Abrasel, ANR, ABF, Aberc" },
];

// Suporte
const supportOptions = [
  { icon: Headphones, label: "Suporte 7 dias", desc: "07h às 00h", href: "#" },
  { icon: MessageCircle, label: "Chat ao vivo", desc: "Resposta imediata", href: "#" },
  { icon: Video, label: "Plataforma EAD", desc: "Treinamentos completos", href: "#" },
  { icon: Users, label: "Time dedicado", desc: "Consultoria especializada", href: "#" },
];

export const HEADER_MEGA_PANEL_ID = "header-mega-panel";

export type MegaMenuPanelType = "produtos" | "segmentos" | "recursos" | "suporte";

/** Conteúdo do mega-menu para uso dentro do header expansível (sem painel absoluto). */
export function MegaMenuPanelContent({
  type,
  onClose,
}: {
  type: MegaMenuPanelType;
  onClose: () => void;
}) {
  switch (type) {
    case "produtos":
      return <ProductsMegaMenuContent onClose={onClose} />;
    case "segmentos":
      return <SegmentsMegaMenuContent onClose={onClose} />;
    case "recursos":
      return <ResourcesMegaMenuContent onClose={onClose} />;
    case "suporte":
      return <SupportMegaMenuContent onClose={onClose} />;
  }
}

/** Coluna de grupo (título azul + lista alinhada) usada em Produtos e Segmentos. */
function MegaMenuColumn({ group, onClose }: { group: MenuGroup; onClose: () => void }) {
  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center gap-2 lg:mb-2.5">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 lg:h-8 lg:w-8">
          <group.icon className="h-3.5 w-3.5 text-primary lg:h-4 lg:w-4" />
        </div>
        <h3 className="text-[11px] font-bold uppercase leading-none tracking-wider text-primary lg:text-xs">
          {group.title}
        </h3>
      </div>

      <ul className="space-y-px pl-9 lg:pl-10">
        {group.items.map((item) => (
          <li key={`${group.id}-${item.name}`}>
            <Link
              to={item.href}
              onClick={onClose}
              className="group flex items-center gap-1.5 rounded-md py-0.5 pr-1 text-foreground/80 transition-all duration-200 hover:bg-primary/5 hover:text-primary"
            >
              <item.icon className="h-[14.5px] w-[14.5px] flex-shrink-0 text-primary/45 transition-colors group-hover:text-primary" />
              <span className="min-w-0 text-[11.5px] font-medium leading-snug lg:text-[12.5px]">
                {item.name}
              </span>
              {item.badge ? (
                <span className="ml-auto flex-shrink-0 rounded-full bg-primary px-1.5 py-0.5 text-[8px] font-semibold uppercase leading-none tracking-[0.12em] text-white shadow-sm shadow-primary/20">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductsMegaMenuContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-4 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4 lg:px-8 lg:pb-6">
      <h2 className="mb-3 mt-1 font-display text-xs font-bold leading-tight text-foreground lg:mb-4 lg:text-[0.82rem] xl:text-sm">
        Soluções por área da operação
      </h2>

      {/* Scroll só abaixo de lg (layout empilhado); a partir de lg, altura natural. */}
      <div className="-mr-1 pr-1 max-lg:max-h-[min(72vh,calc(100dvh-6.5rem))] max-lg:overflow-y-auto max-lg:overscroll-y-contain lg:mr-0 lg:max-h-none lg:overflow-visible lg:pr-0">
        <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-9">
          {productGroups.map((group) => (
            <MegaMenuColumn key={group.id} group={group} onClose={onClose} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SegmentsMegaMenuContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-4 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4 lg:px-8 lg:pb-6">
      <h2 className="mb-3 mt-1 font-display text-base font-bold text-foreground lg:mb-4 lg:text-lg">
        Quem opera com a Teknisa
      </h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-9">
        {segmentGroups.map((group) => (
          <MegaMenuColumn key={group.id} group={group} onClose={onClose} />
        ))}
      </div>

      <div className="mt-7 flex flex-col items-start gap-3 border-t border-border/50 pt-5 sm:flex-row sm:items-center sm:gap-5">
        <p className="text-[11px] text-muted-foreground lg:text-xs">
          De redes de fast food a operações offshore: a Teknisa atende escala em qualquer formato.
        </p>
        <Button
          onClick={onClose}
          size="sm"
          variant="outline"
          className="ml-auto rounded-xl border-primary/30 text-primary hover:bg-primary/5"
        >
          Falar com especialista
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function ResourcesMegaMenuContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-4 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4 lg:px-8 lg:pb-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground lg:mb-6 lg:text-sm">
            Recursos & Conteúdo
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
            {resources.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="group flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-secondary lg:gap-4 lg:rounded-2xl lg:p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-all group-hover:bg-primary lg:h-12 lg:w-12 lg:rounded-xl">
                  <item.icon className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground lg:h-6 lg:w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground lg:text-sm">{item.desc}</p>
                </div>
                <ArrowRight className="ml-auto mt-1 hidden h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 lg:block" />
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 p-4 lg:rounded-2xl lg:p-6">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground lg:mb-4 lg:text-sm">
            Em Destaque
          </h4>

          <div className="mb-4 rounded-xl border border-border/30 bg-white/80 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold text-primary">
              <Zap className="h-4 w-4" />
              NOVO
            </div>
            <h5 className="mb-2 text-sm font-semibold text-foreground lg:text-base">
              IA no Food Service
            </h5>
            <p className="mb-3 text-xs text-muted-foreground lg:text-sm">
              Descubra como a inteligência artificial está revolucionando restaurantes.
            </p>
            <a
              href="#"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-semibold text-primary transition-colors hover:text-primary/80 lg:text-sm"
            >
              Ler artigo
              <ArrowRight className="h-3 w-3 lg:h-4 lg:w-4" />
            </a>
          </div>

          <Button onClick={onClose} variant="outline" className="w-full">
            Ver todos os recursos
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function SupportMegaMenuContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-4 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4 lg:px-8 lg:pb-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground lg:mb-6 lg:text-sm">
            Como podemos ajudar?
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
            {supportOptions.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="group flex items-start gap-3 rounded-xl border border-border p-4 transition-all hover:border-primary/30 hover:bg-primary/5 lg:gap-4 lg:rounded-2xl lg:p-5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary lg:h-14 lg:w-14 lg:rounded-2xl">
                  <item.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground lg:h-7 lg:w-7" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground lg:text-base">{item.label}</p>
                  <p className="text-xs text-muted-foreground lg:text-sm">{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-primary to-primary-light p-4 text-primary-foreground lg:rounded-2xl lg:p-6">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary-foreground/90 lg:mb-4 lg:text-sm">
            Contato Direto
          </h4>

          <div className="mb-4 space-y-3 lg:mb-6 lg:space-y-4">
            <div>
              <p className="mb-1 text-xs text-primary-foreground/80">Telefone</p>
              <p className="text-base font-bold lg:text-lg">0800 123 4567</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-primary-foreground/80">WhatsApp</p>
              <p className="text-base font-bold lg:text-lg">(11) 99999-0000</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-primary-foreground/80">Horário</p>
              <p className="text-sm font-medium">Seg-Dom: 07h às 00h</p>
            </div>
          </div>

          <Button onClick={onClose} className="w-full bg-white text-primary hover:bg-white/90">
            Abrir chamado
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

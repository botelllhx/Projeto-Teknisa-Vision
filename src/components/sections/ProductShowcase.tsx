import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_EXPO } from "@/lib/motion";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { DeviceScreen } from "@/components/ui/DeviceScreen";
import { DEVICE_FRAMES } from "@/components/ui/devices";
import { PRODUCTS, type DeviceInShowcase, type ProductShowcase as Product } from "@/data/productShowcase";

/**
 * §5 · Ecossistema de produtos — Showcase multi-device.
 *
 * Seção **clara**. À esquerda: eyebrow + H2 + subhead (registro de BENEFÍCIO) + switch
 * de categorias (mesmo componente da §3) + logo lockup do produto ativo. À direita: um
 * cluster de devices (frames claros em SVG) com a **tela âncora grande sangrando a 100%
 * da direita** e acentos espalhados.
 *
 * Animação **amarrada ao scroll** (`useScroll`/`useTransform`): ao entrar na seção, os
 * devices sobem de trás/de baixo, um a um (stagger por `order`), e **travam** ao montar.
 * Hotspots aparecem só depois. Trocar de categoria faz crossfade + atualiza logo e copy.
 * reduced-motion: tudo já em posição (sem fly-in).
 *
 * Dados em `src/data/productShowcase.ts`. FUTURO: telas podem virar vídeo (Screen.type).
 */

/** Rótulos curtos do switch (mantém "HCM" no switch; "Pessoas e RH" no lockup). */
const TAB_LABEL: Record<string, string> = {
  tecfood: "TecFood",
  retail: "Retail",
  erp: "ERP",
  hcm: "HCM",
  facilities: "Facilities",
};

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const product = PRODUCTS[active];
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const tabs = PRODUCTS.map((p) => ({ id: p.slug, label: TAB_LABEL[p.slug] ?? p.name }));

  return (
    <section
      id="produtos"
      aria-label="Ecossistema de produtos"
      className="relative scroll-mt-24 overflow-hidden bg-background text-foreground"
    >
      <div ref={sectionRef} className="section-container relative py-20 lg:min-h-[620px] lg:py-28">
        {/* ── Coluna esquerda: copy + switch + lockup ── */}
        <div className="relative z-10 lg:w-[42%]">
          <span className="text-sm font-semibold text-primary">
            Uma plataforma, sua operação inteira
          </span>

          <motion.div
            key={product.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {product.headline}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              {product.subhead}
            </p>
          </motion.div>

          <SegmentedControl
            tabs={tabs}
            active={active}
            onChange={setActive}
            ariaLabel="Produtos"
            layoutId="showcaseTabPill"
            tabId={(id) => `showcase-tab-${id}`}
            panelId={(id) => `showcase-panel-${id}`}
            className="mt-8"
          />

          {/* logo lockup do produto ativo */}
          <div className="mt-8 h-12">
            <img key={product.slug} src={product.logo} alt={product.name} className="h-11 w-auto sm:h-12" />
          </div>
        </div>

        {/* ── Cluster de devices: sangra até a borda direita da viewport no desktop ── */}
        <div
          role="tabpanel"
          id={`showcase-panel-${product.slug}`}
          aria-labelledby={`showcase-tab-${product.slug}`}
          className="mt-12 lg:absolute lg:inset-y-0 lg:left-[37%] lg:right-[calc(50%-50vw)] lg:mt-0"
        >
          <DeviceCluster product={product} scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

/** Cluster scroll-scrubbed (desktop, sangra à direita) + pilha de devices-herói (mobile). */
function DeviceCluster({
  product,
  scrollYProgress,
}: {
  product: Product;
  scrollYProgress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const devices = [...product.devices].sort((a, b) => a.order - b.order);
  const heroes = devices.filter((d) => d.hero);
  const mobileDevices = (heroes.length ? heroes : devices.slice(0, 1)).slice(0, 2);

  return (
    <>
      {/* DESKTOP: cluster absoluto; crossfade ao trocar de produto */}
      <motion.div
        key={product.slug}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:absolute lg:inset-0 lg:block"
      >
        {devices.map((d, idx) => (
          <ClusterDevice
            key={`${d.device}-${d.order}`}
            d={d}
            idx={idx}
            productName={product.name}
            scrollYProgress={scrollYProgress}
            reduced={!!reduced}
          />
        ))}
      </motion.div>

      {/* MOBILE/TABLET: empilha 1 a 2 devices-herói (sem amontoar) */}
      <div className="flex flex-col items-center gap-10 lg:hidden">
        {mobileDevices.map((d) => (
          <motion.div
            key={`m-${d.device}-${d.order}`}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            className="w-full"
            style={{ maxWidth: d.device === "phone" ? "11rem" : "22rem" }}
          >
            <DeviceRender d={d} productName={product.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
}

/** Um device do cluster: sobe de trás/de baixo conforme o scroll e trava (clamp). */
function ClusterDevice({
  d,
  idx,
  productName,
  scrollYProgress,
  reduced,
}: {
  d: DeviceInShowcase;
  idx: number;
  productName: string;
  scrollYProgress: MotionValue<number>;
  reduced: boolean;
}) {
  const start = Math.min(idx * 0.12, 0.5);
  const end = Math.min(start + 0.5, 1);
  const fromY = 70 + idx * 28; // acentos menores vêm de mais longe (de trás, da quina de baixo)

  const y = useTransform(scrollYProgress, [start, end], [reduced ? 0 : fromY, 0]);
  const opacity = useTransform(
    scrollYProgress,
    [start, Math.min(start + 0.2, 1)],
    [reduced ? 1 : 0, 1],
  );
  const scale = useTransform(scrollYProgress, [start, end], [reduced ? 1 : 0.93, 1]);

  return (
    <div
      className="absolute -translate-x-1/2"
      style={{
        left: `${d.place.x}%`,
        top: `${d.place.y}%`,
        width: `${d.place.w}%`,
        zIndex: d.layer ?? 10,
      }}
    >
      <motion.div style={{ y, opacity, scale }}>
        <DeviceRender d={d} productName={productName} />
      </motion.div>
    </div>
  );
}

function DeviceRender({
  d,
  productName,
}: {
  d: DeviceInShowcase;
  productName: string;
}) {
  const Frame = DEVICE_FRAMES[d.device];
  return (
    <Frame className={cn(d.device === "phone" && "mx-auto")}>
      <DeviceScreen
        screen={d.screen}
        deviceKind={d.device}
        productName={productName}
        label={d.label}
      />
    </Frame>
  );
}

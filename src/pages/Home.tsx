import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { SegmentExplorer } from "@/components/sections/SegmentExplorer";
import { ImpactBridge } from "@/components/sections/ImpactBridge";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { SectionPlaceholder } from "@/components/sections/SectionPlaceholder";

/**
 * Home — shell. Navbar ✅ + Hero ✅ + §2 Barra de confiança ✅ + §3 Explorador de
 * segmentos ✅ + §4 Faixa de impacto/ROI (ponte) ✅. Demais seções como placeholders.
 * NOTA: a Faixa de impacto foi realocada (era §7) para logo após os segmentos, virando
 * ponte para o Ecossistema (§5). Numeração ajustada no blueprint e abaixo.
 */
const placeholderSections = [
  { index: 6, title: "Spotlight de IA", anchor: "ia", note: "Seção dark, dado → insight (a §5 é clara).", dark: true, signature: true },
  { index: 7, title: "Deep-dive TecFood", anchor: "tecfood", note: "Sticky-scroll do fluxo de uma refeição coletiva.", signature: true },
  { index: 8, title: "Casos de sucesso", anchor: "cases", note: "3 a 4 cases com foto, métrica e citação." },
  { index: 9, title: "Integrações & ecossistema", anchor: "integracoes", note: "Diagrama orbital da plataforma.", signature: true },
  { index: 10, title: "Food Service Show", anchor: "eventos", note: "Mapa da turnê pelo Brasil + timeline de edições.", dark: true, signature: true },
  { index: 11, title: "Onde nos encontrar (feiras)", anchor: "feiras", note: "Timeline Fispal · NRF · Anuga 2026/2027." },
  { index: 12, title: "Por que Teknisa", anchor: "por-que", note: "Pilares escaneáveis com micro-animação." },
  { index: 13, title: "Prêmios & certificações", anchor: "premios", note: "Selos em faixa discreta, monocromáticos." },
  { index: 14, title: "Hub de conteúdo", anchor: "recursos", note: "Bento de 3 posts/e-books + EAD." },
  { index: 15, title: "CTA final de conversão", anchor: "contato", note: "Full-bleed gradiente azul Teknisa + form.", signature: false },
] as const;

export function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 0 · Navbar ✅ (acima) · 1 · Hero ✅ */}
        <Hero />

        {/* 2 · Barra de confiança ✅ */}
        <TrustBar />

        {/* 3 · Explorador de segmentos (abas + bento) ✅ */}
        <SegmentExplorer />

        {/* 4 · Faixa de impacto / ROI — ponte para o Ecossistema ✅ */}
        <ImpactBridge />

        {/* 5 · Ecossistema de produtos — Showcase multi-device + switch + hotspots (claro) ✅ */}
        <ProductShowcase />

        {/* 6–15 · placeholders na ordem do blueprint */}
        {placeholderSections.map((s) => (
          <SectionPlaceholder
            key={s.index}
            index={s.index}
            title={s.title}
            anchor={s.anchor}
            note={s.note}
            dark={"dark" in s ? s.dark : false}
            signature={"signature" in s ? s.signature : false}
          />
        ))}
      </main>

      {/* 16 · Rodapé */}
      <Footer />
    </>
  );
}

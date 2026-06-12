import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { SegmentExplorer } from "@/components/sections/SegmentExplorer";
import { ImpactBridge } from "@/components/sections/ImpactBridge";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { AISection } from "@/components/sections/AISection";
import { TecFoodScrollBridge } from "@/components/sections/TecFoodScrollBridge";
import { CasesSection } from "@/components/sections/CasesSection";
import { EcosystemOrbit } from "@/components/sections/EcosystemOrbit";
import { SectionPlaceholder } from "@/components/sections/SectionPlaceholder";

/**
 * Home — shell. Navbar ✅ + Hero ✅ + §2 Barra de confiança ✅ + §3 Explorador de
 * segmentos ✅ + §4 Faixa de impacto/ROI (ponte) ✅. Demais seções como placeholders.
 * NOTA: a Faixa de impacto foi realocada (era §7) para logo após os segmentos, virando
 * ponte para o Ecossistema (§5). Numeração ajustada no blueprint e abaixo.
 */
const placeholderSections = [
  { index: 10, title: "Onde nos encontrar (Food Service Show & Feiras)", anchor: "eventos", note: "Momento-assinatura escuro a construir: turnê do Food Service Show + feiras (Fispal · NRF · Anuga).", dark: true, signature: true },
  { index: 11, title: "EAD Teknisa", anchor: "ead", note: "Ensino a distância / capacitação da Teknisa. // TODO: design e conteúdo a definir (não inventar números/cursos)." },
  { index: 12, title: "Hub de conteúdo", anchor: "recursos", note: "Bento de 3 posts/e-books." },
  { index: 13, title: "CTA final de conversão", anchor: "contato", note: "Full-bleed gradiente azul Teknisa + form.", signature: false },
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

        {/* 6 · Spotlight de IA — TeknisAI + bento de dot-art ✅ */}
        <AISection />

        {/* 7 · Ponte TecFood — mockup com Container Scroll Animation ✅ */}
        <TecFoodScrollBridge />

        {/* 8 · Cases — carrossel infinito de testemunhos ✅ */}
        <CasesSection />

        {/* 9 · Integrações & ecossistema — logos em órbita (Orbiting Circles) ✅ */}
        <EcosystemOrbit />

        {/* 10–13 · placeholders na ordem do blueprint */}
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

      {/* 14 · Rodapé */}
      <Footer />
    </>
  );
}

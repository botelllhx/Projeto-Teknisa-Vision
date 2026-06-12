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
import { EventsSection } from "@/components/sections/EventsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { SectionPlaceholder } from "@/components/sections/SectionPlaceholder";

/**
 * Home — shell. Navbar ✅ + Hero ✅ + §2 Barra de confiança ✅ + §3 Explorador de
 * segmentos ✅ + §4 Faixa de impacto/ROI (ponte) ✅. Demais seções como placeholders.
 * NOTA: a Faixa de impacto foi realocada (era §7) para logo após os segmentos, virando
 * ponte para o Ecossistema (§5). Numeração ajustada no blueprint e abaixo.
 */
const placeholderSections = [
  { index: 13, title: "CTA final de conversão", anchor: "contato", note: "Full-bleed gradiente azul Teknisa + form." },
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

        {/* 10 · Onde nos encontrar — slider de eventos (halftone + parallax + darken) ✅ */}
        <EventsSection />

        {/* 11 · Blog / Conteúdo — galeria editorial sticky + scroll sincronizado ✅
            (EAD removida; o sticky stacking foi descartado por ficar apertado vs o resto do site) */}
        <BlogSection />

        {/* 13 · placeholder na ordem do blueprint */}
        {placeholderSections.map((s) => (
          <SectionPlaceholder
            key={s.index}
            index={s.index}
            title={s.title}
            anchor={s.anchor}
            note={s.note}
          />
        ))}
      </main>

      {/* 14 · Rodapé */}
      <Footer />
    </>
  );
}

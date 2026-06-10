import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Home } from "@/pages/Home";
import { SegmentStub } from "@/pages/SegmentStub";
import { ProductStub } from "@/pages/ProductStub";
import { useSmoothScroll } from "@/lib/useSmoothScroll";

/** Casca dentro do Router — habilita smooth scroll (Lenis) e hospeda as rotas. */
function AppShell() {
  useSmoothScroll();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/segmentos/:slug" element={<SegmentStub />} />
      <Route path="/produtos" element={<ProductStub />} />
      <Route path="/produtos/:slug" element={<ProductStub />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <p className="font-display text-6xl font-bold text-primary">404</p>
      <p className="text-muted-foreground">Página não encontrada.</p>
      <Link
        to="/"
        className="inline-flex h-11 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Voltar para a home
      </Link>
    </main>
  );
}

export default function App() {
  return (
    // reducedMotion="user" → Framer Motion respeita prefers-reduced-motion globalmente.
    <MotionConfig reducedMotion="user">
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppShell />
      </BrowserRouter>
    </MotionConfig>
  );
}

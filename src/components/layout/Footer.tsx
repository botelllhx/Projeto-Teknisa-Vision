/**
 * Rodapé — placeholder mínimo (blueprint §16: rodapé rico com colunas Produtos ·
 * Segmentos · Recursos · Eventos · Empresa · Contato · social · seletor PT/EN/ES).
 * A construir.
 */
export function Footer() {
  return (
    <footer id="rodape" className="bg-foreground text-background/70">
      <div className="section-container flex flex-col items-center gap-2 py-12 text-center">
        <p className="font-display text-lg font-semibold text-background">Teknisa</p>
        <p className="max-w-md text-sm text-background/55">
          A inteligência que move a alimentação. Do balcão do restaurante ao ERP da indústria.
        </p>
        <p className="mt-4 text-xs text-background/35">
          Rodapé rico (§16) · placeholder a construir · © {new Date().getFullYear()} Teknisa
        </p>
      </div>
    </footer>
  );
}

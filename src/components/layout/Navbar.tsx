import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HEADER_MEGA_PANEL_ID, MegaMenuPanelContent, type MegaMenuPanelType } from "./MegaMenu";
import { productGroups, segmentGroups } from "./menuData";
import { EASE_SMOOTH, EASE_EXPO } from "@/lib/motion";
import teknisaLogo from "@/assets/teknisa-logo.png";

const menuItems = [
  { name: "Produtos", href: "#produtos", hasDropdown: true, dropdownType: "produtos" as const },
  { name: "Segmentos", href: "#segmentos", hasDropdown: true, dropdownType: "segmentos" as const },
  { name: "Recursos", href: "#recursos", hasDropdown: true, dropdownType: "recursos" as const },
  { name: "Suporte", href: "#suporte", hasDropdown: true, dropdownType: "suporte" as const },
  { name: "Cases", href: "#cases", hasDropdown: false },
  { name: "Sobre", href: "#sobre", hasDropdown: false },
] as const;

/** Painel expande/recolhe via grid-template-rows (0fr→1fr) — evita animar height:auto. */
const megaPanelGridClass = (expanded: boolean) => (expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]");
const megaPanelTransitionClass = "transition-[grid-template-rows] duration-200 ease-expo-out";

/** Mega-menu por hover só em telas grandes com ponteiro fino; senão por clique/teclado. */
function useDesktopHoverMega() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return enabled;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [megaPanel, setMegaPanel] = useState<MegaMenuPanelType | null>(null);
  /** Mantém o último conteúdo montado durante o recolhimento (grid 1fr→0fr). */
  const [megaPanelContent, setMegaPanelContent] = useState<MegaMenuPanelType | null>(null);
  const closeCollapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const desktopHoverMega = useDesktopHoverMega();

  const closeMobile = () => {
    setIsMobileMenuOpen(false);
    setMobileExpanded(null);
  };

  const toggleMobileGroup = (name: string) =>
    setMobileExpanded((curr) => (curr === name ? null : name));

  const closeMega = useCallback(() => setMegaPanel(null), []);

  // Glass/blur ao rolar. Lê window.scrollY a cada evento de scroll. O smooth scroll
  // (Lenis) re-emite "scroll" na window (ver useSmoothScroll), então isto dispara
  // tanto no scroll nativo quanto no suave.
  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > 20;
      setIsScrolled((prev) => (prev === next ? prev : next));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Esc fecha o mega-menu.
  useEffect(() => {
    if (!megaPanel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMega();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaPanel, closeMega]);

  useLayoutEffect(() => {
    if (!megaPanel) return;
    if (closeCollapseTimer.current) {
      clearTimeout(closeCollapseTimer.current);
      closeCollapseTimer.current = null;
    }
    setMegaPanelContent(megaPanel);
  }, [megaPanel]);

  useEffect(() => {
    if (megaPanel) return;
    closeCollapseTimer.current = setTimeout(() => {
      setMegaPanelContent(null);
      closeCollapseTimer.current = null;
    }, 200);
    return () => {
      if (closeCollapseTimer.current) {
        clearTimeout(closeCollapseTimer.current);
        closeCollapseTimer.current = null;
      }
    };
  }, [megaPanel]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: EASE_SMOOTH }}
      className="fixed left-2 right-2 top-2 z-50 sm:left-4 sm:right-4 sm:top-3 lg:left-6 lg:right-6 lg:top-4"
    >
      <div
        className={`overflow-hidden rounded-2xl transition-all duration-500 lg:rounded-3xl ${
          isScrolled || megaPanel
            ? "border border-white/60 bg-white/90 shadow-2xl backdrop-blur-2xl"
            : "border border-transparent bg-transparent shadow-none"
        }`}
        onMouseLeave={() => {
          if (desktopHoverMega) closeMega();
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <nav
            className="flex h-14 items-center justify-between sm:h-16 lg:h-18"
            aria-label="Principal"
          >
            {/* Logo */}
            <a href="/" className="group flex items-center">
              <img src={teknisaLogo} alt="Teknisa" className="h-5 w-auto object-contain sm:h-6" />
            </a>

            {/* Navegação desktop */}
            <div className="hidden items-center gap-1 lg:flex">
              {menuItems.map((item) => {
                const dtype = "dropdownType" in item ? item.dropdownType : undefined;
                const isMegaOpen = dtype ? megaPanel === dtype : false;
                return (
                  <div key={item.name} className="relative">
                    <a
                      href={item.href}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:bg-secondary/80 hover:text-foreground xl:px-4 ${
                        isMegaOpen ? "bg-secondary/80 text-foreground" : ""
                      }`}
                      aria-expanded={dtype ? isMegaOpen : undefined}
                      aria-controls={dtype ? HEADER_MEGA_PANEL_ID : undefined}
                      onMouseEnter={() => {
                        if (desktopHoverMega && dtype) setMegaPanel(dtype);
                      }}
                      onClick={(e) => {
                        if (!dtype) return;
                        const coarse = window.matchMedia(
                          "(hover: none) and (pointer: coarse)",
                        ).matches;
                        if (coarse) {
                          e.preventDefault();
                          setMegaPanel((p) => (p === dtype ? null : dtype));
                        }
                      }}
                      onKeyDown={(e) => {
                        if (!dtype) return;
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setMegaPanel(dtype);
                        }
                      }}
                    >
                      {item.name}
                      {item.hasDropdown && (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isMegaOpen ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Lado direito */}
            <div className="hidden items-center gap-2 lg:flex xl:gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-xl hover:bg-secondary/80"
                aria-label="Buscar"
              >
                <Search className="h-4 w-4" />
              </Button>
              <div className="h-6 w-px bg-border" />
              <Button variant="ghost" size="sm" className="rounded-xl hover:bg-secondary/80">
                Login
              </Button>
              <Button size="sm" className="rounded-xl shadow-lg transition-shadow hover:shadow-xl">
                Fale Conosco
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Botão menu mobile */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl p-2 transition-colors hover:bg-secondary lg:hidden sm:p-2.5"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((o) => !o)}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>
        </div>

        {/* Painel do mega-menu colapsável (desktop) */}
        <div
          id={HEADER_MEGA_PANEL_ID}
          role="region"
          aria-label="Navegação expandida"
          aria-hidden={!megaPanel}
          className={`grid min-h-0 border-t border-border/25 max-lg:hidden ${megaPanelTransitionClass} ${megaPanelGridClass(
            !!megaPanel,
          )}`}
          style={{ pointerEvents: megaPanel ? "auto" : "none" }}
        >
          <div className="min-h-0 overflow-hidden [contain:layout]">
            {megaPanelContent ? (
              <motion.div
                key={megaPanelContent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.12, ease: EASE_EXPO }}
              >
                <MegaMenuPanelContent type={megaPanelContent} onClose={closeMega} />
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE_SMOOTH }}
            className="mt-2 overflow-hidden rounded-2xl border border-white/60 bg-white/98 shadow-2xl backdrop-blur-2xl"
          >
            <div className="space-y-1 px-4 py-4 sm:space-y-2 sm:px-6 sm:py-6">
              {menuItems.map((item, index) => {
                const groupedKey = "dropdownType" in item ? item.dropdownType : undefined;
                const groupsForKey =
                  groupedKey === "produtos"
                    ? productGroups
                    : groupedKey === "segmentos"
                      ? segmentGroups
                      : null;
                const isExpandable = !!groupsForKey;
                const isExpanded = mobileExpanded === item.name;

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="overflow-hidden rounded-xl"
                  >
                    {isExpandable ? (
                      <button
                        type="button"
                        onClick={() => toggleMobileGroup(item.name)}
                        aria-expanded={isExpanded}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-3 font-medium text-foreground transition-colors hover:bg-secondary sm:px-4 sm:py-4"
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                            isExpanded ? "rotate-180 text-primary" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        className="flex items-center justify-between rounded-xl px-3 py-3 font-medium text-foreground transition-colors hover:bg-secondary sm:px-4 sm:py-4"
                        onClick={closeMobile}
                      >
                        {item.name}
                        {item.hasDropdown && (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </a>
                    )}

                    <AnimatePresence>
                      {isExpandable && isExpanded && groupsForKey && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: EASE_SMOOTH }}
                          className="px-3 sm:px-4"
                        >
                          <div className="ml-2 space-y-3 border-l-2 border-primary/20 pb-2 pl-3 pt-1">
                            {groupsForKey.map((group) => {
                              const Icon = group.icon;
                              return (
                                <div key={group.id}>
                                  <div className="mb-1.5 flex items-center gap-2">
                                    <Icon className="h-3.5 w-3.5 text-primary" />
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-foreground/80">
                                      {group.title}
                                    </p>
                                  </div>
                                  <ul className="space-y-0.5 pl-5">
                                    {group.items.map((sub) => (
                                      <li key={`${group.id}-${sub.name}`}>
                                        <Link
                                          to={sub.href}
                                          onClick={closeMobile}
                                          className="block py-1 text-[13px] text-foreground/70 transition-colors hover:text-primary"
                                        >
                                          {sub.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
              <div className="space-y-2 border-t border-border pt-3 sm:space-y-3 sm:pt-4">
                <Button variant="outline" className="h-11 w-full rounded-xl sm:h-12">
                  Login
                </Button>
                <Button className="h-11 w-full rounded-xl sm:h-12">
                  Fale Conosco
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

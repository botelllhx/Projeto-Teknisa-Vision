# CLAUDE.md — Site institucional Teknisa

Guia permanente para trabalhar neste repositório. **A fonte de verdade de produto, estratégia e
direção visual é [`teknisa-redesign-blueprint.md`](teknisa-redesign-blueprint.md) — leia/consulte o
blueprint antes de construir qualquer seção nova.** Este arquivo resume o que já está decidido e
pronto; o blueprint detalha o porquê e o como.

---

## Visão & conceito

Novo site institucional da Teknisa (software house de food service / varejo corporativo), migrando
do antigo WordPress + Avada para código moderno, com ambição de craft nível Awwwards (régua: Toast,
Stripe, Linear).

- **Conceito-guia:** _"A inteligência que move a alimentação."_ — do balcão do restaurante ao ERP da
  indústria, uma plataforma só. Tudo no site prova essa frase.
- **Posicionamento:** **amplitude no portfólio, nicho na narrativa.** O "ecossistema" é o
  guarda-chuva (multiproduto), mas a alma **food-service / alimentação** fica explícita no copy de
  apoio — é a faca contra a TOTVS (especialista, não generalista).
- **Portfólio a comunicar:** TecFood (alimentação coletiva) · Retail (bares/restaurantes/fast
  food/delivery) · ERP (indústrias) · HCM (folha/ponto/eSocial) · Facilities (terceirizados) — + IA
  como diferencial central.

---

## Stack e comandos

- **React 18 + Vite 5 + TypeScript** (SPA). Build/dev oficial: **Vite — não usar Next.js.**
- **react-router-dom 6** — roteamento (home + futuras landings de produto/segmento).
- **TailwindCSS 3** com design tokens (ver abaixo).
- **Framer Motion 12** — reveal-on-scroll, hover, layout do mega-menu. Respeitar
  `prefers-reduced-motion` (já configurado globalmente via `<MotionConfig reducedMotion="user">`).
- **Lenis** — smooth scroll global, **desligado quando `prefers-reduced-motion`** (ver
  `src/lib/useSmoothScroll.ts`).
- **lucide-react** (ícones), **class-variance-authority + clsx + tailwind-merge** (`cn`).
- Fontes self-hosted via **`@fontsource`** (Poppins display + Inter corpo). **Nunca** `next/font`.
- **ESLint + Prettier** configurados (`eslint.config.js`, `.prettierrc.json`).

| Comando          | O que faz                             |
| ---------------- | ------------------------------------- |
| `npm run dev`    | Servidor de desenvolvimento (Vite)    |
| `npm run build`  | `tsc -b --noEmit` + build de produção |
| `npm run lint`   | ESLint em todo o projeto              |
| `npm run format` | Prettier em `src/**`                  |

---

## Design tokens e regras de cor

**Regra dura:** base **BRANCA** (light é o padrão), **azul Teknisa** protagonista dos destaques
(CTAs, ícones, números, headlines), **texto em preto e azul** (preto/quase-preto no corpo; azul em
links, ênfases e títulos). Seções **dark** apenas pontuais/estratégicas.

- **Azul Teknisa (cor de marca real, extraída do Teknisa Vision):** `#040486`
  (HSL `238 97% 27%`) → token semântico `--primary` / classes `bg-primary`, `text-primary`.
- **Escala `teknisa` 50–900** disponível no Tailwind (`text-teknisa-600` etc.) — a marca `#040486`
  fica em `teknisa-800`. **Evitar o azul claro `sky`** como acento: o usuário acha feio (já foi
  removido do hero, onde o texto agora é todo **branco**). Em seções dark, usar branco/translúcido
  ou tons da escala `teknisa`.
- **Tokens semânticos via CSS vars** (estilo shadcn) em `src/styles/index.css`: `background`,
  `foreground`, `primary` (+ `light`/`dark`), `secondary`, `muted`, `accent`, `card`, `popover`,
  `border`, `input`, `ring`, `success`, `destructive`. Suportam **dark mode por `class`**
  (`darkMode: "class"`).
- Tipografia: **títulos em `font-display` = Google Sans** (OFL/open desde nov/2025, self-host via
  `@fontsource/google-sans`, subset latin, pesos 400–700) + `font-sans` (Inter, corpo). Toda heading
  usa `font-display`, então a fonte de título é trocada num só lugar (tailwind `fontFamily.display`).
- Radius `2xl`/`3xl`, sombras suaves ancoradas no azul (`shadow-sm…xl`, `shadow-glow`).
- Easing assinatura: `ease-expo-out` (Tailwind) / `EASE`, `EASE_EXPO`, `EASE_SMOOTH` em
  `src/lib/motion.ts`.

**Não inventar o azul nem outras cores de marca** — derivar sempre do que está nos tokens.

---

## Convenções de código

- **TypeScript estrito**; alias de import **`@/` → `src/`**.
- **Componentes** em PascalCase, named exports (`export function Hero()`); um componente por arquivo.
- **Organização:**
  ```
  src/
    pages/            rotas (Home.tsx, …)
    components/
      layout/         Navbar, MegaMenu, menuData, Footer
      sections/       seções da home (Hero, SectionPlaceholder, …)
      ui/             primitivos (button, …)
    lib/              utils (cn), motion (easings), useSmoothScroll
    styles/           index.css (tokens + base)
    assets/           imagens/logos/fontes importados pelo bundler
  public/assets/      estáticos servidos como root (vídeo do hero, etc.)
  ```
- **Padrão de seção:** cada seção é um `<section id="…">` com `scroll-mt-24` para âncoras; container
  via `.section-container` (`max-w-7xl` + padding). Placeholders seguem `SectionPlaceholder`.
- **PROIBIDO — eyebrow/label em CAIXA ALTA com letter-spacing** (o típico `uppercase
  tracking-[0.2em]`/`tracking-wider`). O usuário **detesta** esse padrão genérico "de IA". Em
  **todo o projeto**, rótulos/eyebrows usam **caixa normal (sentence case)**, peso `font-semibold`
  e cor (ex.: `text-primary`), **sem** `uppercase` e **sem** letter-spacing largo. Vale para
  qualquer seção nova.
- **PROIBIDO — travessão / em dash (`—`) em qualquer parte do projeto.** O usuário detesta (soa
  "de IA"). Não usar `—` (nem en dash `–` em intervalos) em **copy/texto visível**; reescrever com
  vírgula, ponto, "a"/"até" ou `·`. Ex.: "3 a 4 cases", "2026/2027", "alimentação. Do balcão…".
  Evitar também em comentários novos.
- **Não repetir o mesmo ícone decorativo** em várias seções (ex.: `Sparkle`/`Sparkles` genérico).
  Variar ícones por contexto/categoria.
- **Padrão de motion:** `whileInView` + `viewport={{ once: true }}` para reveal; contadores via
  IntersectionObserver; **sempre** assumir que `prefers-reduced-motion` pode estar ligado (o
  `MotionConfig` global zera animações; a rede de segurança CSS está em `index.css`).
- **Acessibilidade:** foco visível, navegação por teclado (o mega-menu abre por Enter/Espaço e fecha
  no Esc), `alt` reais, `aria-*` nos disclosure/dialog. Mira **WCAG AA**.

---

## Arquitetura da home (ordem do blueprint §5)

| #   | Seção                                   | Status                                              |
| --- | --------------------------------------- | --------------------------------------------------- |
| 0   | Navbar sticky glass + mega-menu         | ✅ **pronto**                                       |
| 1   | Hero (ecossistema + métricas + CTAs)    | ✅ **pronto**                                       |
| 2   | Barra de confiança (marquee de logos, full-width) | ✅ **pronto** (só logos — sem métricas)   |
| 3   | Explorador de segmentos (abas + bento)  | ✅ **pronto**                                       |
| 4   | Faixa de impacto / ROI (ponte; base branca + faixa azul) | ✅ **pronto** (realocada, era §7)  |
| 5   | Ecossistema de produtos (**Showcase multi-device** + switch + hotspots, claro) | ✅ **pronto**  |
| 6   | Spotlight de IA (dark, dado→insight)    | ⬜ placeholder ★                                    |
| 7   | Deep-dive TecFood (sticky scroll)       | ⬜ placeholder ★                                    |
| 8   | Casos de sucesso                        | ⬜ placeholder                                      |
| 9   | Integrações (orbital)                   | ⬜ placeholder ★                                    |
| 10  | Food Service Show (mapa da turnê, dark) | ⬜ placeholder ★                                    |
| 11  | Onde nos encontrar / feiras             | ⬜ placeholder                                      |
| 12  | Por que Teknisa                         | ⬜ placeholder                                      |
| 13  | Prêmios & certificações                 | ⬜ placeholder                                      |
| 14  | Hub de conteúdo                         | ⬜ placeholder                                      |
| 15  | CTA final (form)                        | ⬜ placeholder                                      |
| 16  | Rodapé rico (+ Eventos, PT/EN/ES)       | ⬜ placeholder (Footer mínimo)                      |

★ = momento-assinatura (os 5 instantes de "wow" do blueprint §4).

**Navbar / mega-menu (pronto):** itens Produtos · Segmentos · Recursos · Suporte · Cases · Sobre +
busca + Login + CTA **Fale Conosco**. Taxonomia real em `src/components/layout/menuData.ts`
(8 grupos de Produtos, 4 de Segmentos, com selos NOVO). Animação colapsável via grid-rows (0fr→1fr),
glass/blur ao rolar, sticky no topo, acessível por teclado. **Não alterar o conceito de hero/navbar
sem pedir.**

**§2 Barra de confiança (pronto):** só o marquee de logos, **largura total** (`TrustBar` →
`LogoMarquee`, fora do `.section-container`), loop infinito com pausa no hover e fade nas bordas.
Logos são **placeholders "Logoipsum"** (`// TODO: logos reais`). **Sem barra de métricas** (removida
a pedido) e **sem eyebrow**. **§3 Roteador de público (pronto):** bento assimétrico reusando a
taxonomia de Segmentos do `menuData.ts`. É um **explorador com abas** (`SegmentExplorer`) estilo
**segmented-control** (track claro + pílula azul ativa via `layoutId`, acessível por teclado). **Cada
aba tem layout, tons de azul e copy próprios** (foco nas dores+benefícios do segmento) — não é o
mesmo template: cada uma traz **2 cards de imagem** de tamanhos/posições diferentes (big 2×2 ou
panorâmico + um menor). Kit **`BentoCard`** (`PhotoCard`/`ClaimCard`/`IconCard`/`StatCard`/`TextCard`/
`TagsCard`) — **tudo em tons de azul Teknisa + neutros, sem cor nova** (cada categoria escolhe seus
tons: `brand`/`blue600`/`blue700`/`navy`/`tint`/`lightBlue`/`paleBlue`…). Hover enxuto (`transform`+
`shadow`, 200ms — não usar `transition-all`/durações longas, dá sensação de travado). `TextCard` linka
`/segmentos/<slug>` (stub). Fotos **WebP otimizadas** em `segments/<slug>/hero.webp` + `2.webp`
(originais em `raw-assets/`, fora do build); fallback gradiente+ícone. `StatCard` usa **métricas reais
do SETOR** de cada segmento, com **fonte** no card (ABERC · Abrasel · ABIA · Abrafac) — não são
números da Teknisa; **validar/atualizar com marketing** (blueprint §8). Favicon: `public/favicon.svg`.

**§4 Faixa de impacto / ROI (pronto · `ImpactBridge`):** **realocada** (era §7) para logo após os
segmentos, virando **ponte** para o Ecossistema (§5). **Não é dark** — base branca com copy curta
cujas palavras "acendem" para o azul Teknisa **ao scroll** (`useScroll`+`useTransform`, respeita
reduced-motion) e uma **faixa azul** que entra da esquerda p/ direita (full-bleed à esquerda via
`left-[calc(50%-50vw)]` + clip-path) com 4 números de impacto grandes em branco. Números fornecidos
pelo cliente (validar com marketing). A palavra "ecossistema" faz a ponte para a §5.

**§5 Ecossistema de produtos (pronto · `ProductShowcase`):** **Showcase multi-device** numa seção
**clara** (base branca, texto preto/azul). Layout em 2 colunas: à esquerda eyebrow + H2 + subhead em
**registro de BENEFÍCIO** (não funcionalidade, copy placeholder com `// TODO` p/ marketing) + **switch
de categorias** + **logo lockup** do produto ativo; à direita um **cluster de devices** que **monta um
a um ao scroll** (Framer `whileInView` + `staggerChildren`, < ~1s, 60fps). O switch troca o conjunto de
devices/telas/logo/copy por crossfade + re-stagger. **Switch = o MESMO componente da §3**
(`components/ui/SegmentedControl.tsx`, extraído e reusado nas duas seções; `layoutId` único por
instância). **Device frames são desenhados em SVG** (vetor: proporção e raio de canto escalam, claros
e minimalistas, não imagens) em `components/ui/devices/*` (`BrowserWindow`, `DesktopMonitor` = display
sem haste, `Laptop`, `TabletPortrait`, `TabletLandscape`, `Phone`, `POSTerminal`, `Totem`; cor neutra
em `frame-tokens.ts`). A **tela âncora grande (display) sangra a 100% da direita** e os devices
**emergem de baixo e são cortados pela base da seção** (cluster `lg:absolute` ancorado por topo, devices
transbordam; `place: {x = centro, y = topo, w}` em % editável). Cada categoria mostra **3 a 5 devices
apropriados** (ex.: Retail = PDV + totem TAA + delivery + retaguarda), cada um exibindo a tela de **um
módulo** (um produto = vários módulos). **Telas = imagem por ora**
(`Screen.type 'image'`), com **UI fake** clara de placeholder por device; nunca `img` quebrada
(fallback = placeholder/bloco azul + nome). Pastas em `products/<categoria>/`, telas nomeadas
`<categoria>-<device>-<modulo>.webp`. **Hotspots já fazem parte desta fase** (`ShowcaseHotspot` via
**@floating-ui/react**): pins azuis com anel pulsante, **livres** (hover OU foco OU tap, ordem livre),
por coordenadas em % sobre a tela, callout com benefício; `<button>`, `aria-expanded`/`aria-controls`,
`Esc`, flip/collision, foco visível. Hotspots aparecem **após** os devices pousarem. Dados editáveis em
`src/data/productShowcase.ts` (conteúdo do CLAUDE.md/mega-menu, nada inventado; sem números fake).
Escopo: **TecFood carro-chefe** com hotspots completos; Retail · ERP · Pessoas e RH · Facilities com
hotspots mínimos (`TODO`). **IA fica de fora** até ter logo. *A11y/mobile/reduced-motion:* tablist;
mobile empilha e mostra 1 a 2 devices-herói com hotspots por tap; reduced-motion entra sem fly-in.
**Único item ADIADO (estrutura pronta): vídeo** — `Screen.type` aceita `'video'`, trocar uma tela por
vídeo curto em loop no futuro é só mudar o `type`. **§7 (TecFood deep-dive) segue sticky scroll.**

---

## Roadmap técnico (previsto — NÃO instalar até a hora certa)

- **SEO sem SSR (antes do go-live):** prerendering/SSG estático via **`vite-react-ssg`** (ou
  equivalente) + **`react-helmet-async`** para `<title>`/meta/OpenGraph por rota. Importante para
  site institucional. _Ainda não configurado._
- **Momentos-assinatura futuros:** **GSAP/ScrollTrigger** (sticky-scroll TecFood) e **React Three
  Fiber** (WebGL pontual no hero/orbital), lazy-loaded. **Não instalar/usar ainda.**
- **i18n PT/EN/ES** por rota desde cedo.
- **Camada de IA-readability:** schema.org (Organization, Product, Event do Food Service Show,
  BreadcrumbList), `sitemap.xml`, `llms.txt`/`agents.json`.
- **CMS headless (Sanity/Contentful) ou MDX** para blog/cases/eventos.
- **Performance:** imagens AVIF/WebP, lazy-load abaixo da dobra, code-splitting por seção pesada
  (`React.lazy`), fontes variáveis com `font-display: swap`.
- **Landings de segmento individuais** (SEO) após a home.

---

## Regras duras

- **Não inventar** números, claims, prêmios ou clientes — validar com marketing (ver blueprint §8).
- **Não alterar** o conceito/implementação do hero e do navbar sem pedir (estão aprovados).
- **Não usar Next.js**, `next/font`, nem `localStorage`/`sessionStorage` para estado (usar estado
  React).
- **Não instalar GSAP nem React Three Fiber** antes do momento certo (roadmap).
- **Performance:** LCP < 2,5s, CLS ~0. **Acessibilidade:** WCAG AA.
- **Consultar o blueprint a cada nova seção** — ele é a fonte de verdade.
- **Git — sem coautoria nos commits.** **Não** incluir o trailer `Co-Authored-By: Claude …` (nem
  qualquer coautoria) nas mensagens de commit. Commitar/pushar **só quando o usuário pedir**.

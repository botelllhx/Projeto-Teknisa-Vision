# Teknisa — Blueprint de Reconstrução do Site (v2 · Ambição "Award-Level")

**Projeto:** Novo site institucional Teknisa em código (React + TailwindCSS + motion)
**Meta de régua:** não "um bom site B2B" — um site que dispute **Awwwards / FWA / CSS Design Awards**, no nível de craft de Toast, Stripe, Linear e dos Sites of the Year de 2026.
**Data:** Junho/2026 · **Versão:** 2.1 (expandida + alinhada ao build "Teknisa Vision" em andamento)

---

## ✅ Estado atual do build ("Teknisa Vision" · localhost)

Já implementado e aprovado (não refazer):

- **Navbar / mega-menu colapsável com animação** — **resolvido e de responsabilidade do dev.** Este blueprint não especifica o navbar; só registra a taxonomia abaixo para referência das demais seções.
- **Itens de nav:** Produtos · Segmentos · Recursos · Suporte · Cases · Sobre · busca · **Login** · **Fale Conosco** (CTA primário).
- **Mega-menu Produtos** ("Soluções por área da operação") — 8 grupos: Frente de Loja · TecFood · ERP Backoffice · Pessoas e RH · Supply e Compras · CRM · IA · Gestão Corporativa, com selos **NOVO**.
- **Mega-menu Segmentos** ("Quem opera com a Teknisa") — Varejo Corporativo · Food Service · Indústrias · Serviços Terceirizados + CTA "Falar com especialista".
- **Mega-menu Suporte** ("Como podemos ajudar?") — Suporte 7 dias · Chat ao vivo · Plataforma EAD · Time dedicado + card "Contato Direto" (telefone/WhatsApp/horário/Abrir chamado).
- **Hero** — "O maior **ecossistema** de tecnologia para Varejo Corporativo" (tipografia cinética sobre foto escura) + métricas (28.200+ operações · 10M+ refeições/mês · 99,9% uptime) + CTAs **Agendar demo** / **Assistir vídeo**.

> **Implicação:** as seções §5 abaixo foram revisadas para usar a taxonomia/copy reais. A seção "Navbar" virou apenas referência. Os CTAs canônicos do projeto passam a ser **Fale Conosco** + **Agendar demo** (e "Falar com especialista" nos menus). O contador/segment-switcher do hero segue como *evolução opcional* (não obrigatório).

---

## 0. O conceito (a espinha narrativa) — começa por aqui

Um site memorável não é uma lista de seções bonitas: é **uma ideia conduzida do topo ao rodapé**. Antes de qualquer pixel, a Teknisa precisa de um conceito-guia. Proposta:

> ## "A inteligência que move a alimentação."
> **Do balcão do restaurante ao ERP da indústria — uma plataforma só.**

Por que funciona:
- **Captura a amplitude real** (Retail no balcão → TecFood na cozinha coletiva → ERP na indústria → HCM nas pessoas → Facilities na operação) sem virar lista.
- **Coloca a IA no centro** (o argumento mais "2026") sem ser modismo — "inteligência" é o fio que liga dado → decisão.
- **"Move"** sugere operação viva, tempo real, milhões de refeições/dia — o que vira o **momento-assinatura** do hero (ver §5).
- Diferencia da TOTVS ("o melhor sistema") pela **especialização** ("a alimentação" como universo, não "varejo genérico").

Tudo no site deve provar essa frase: a especialização de 35 anos, os números que se movem, o ecossistema integrado, a IA aplicada, e o evento próprio (Food Service Show) que prova liderança de pauta no setor.

> **Decisão de posicionamento a travar (o build hoje ancora em "Varejo Corporativo"):** o hero atual lidera por amplitude ("o maior ecossistema… para Varejo Corporativo"), o que aumenta o TAM e reflete a realidade multiproduto — mas se aproxima do território da TOTVS ("Varejo"). O ativo mais afiado da Teknisa contra a TOTVS é ser **a especialista em alimentação/food service**, não a generalista. Recomendação: **amplitude no portfólio, nicho na narrativa** — manter o "ecossistema" como guarda-chuva, mas deixar a alma food-service explícita no copy de apoio (sub-headline, seção de carro-chefe, Food Service Show). Não é refazer o hero; é não perder a faca do nicho.

---

## 1. Diagnóstico do site atual (condensado)

**Stack hoje:** WordPress + Avada → visual de builder, CSS/JS pesados, Core Web Vitals fracos.

**Portfólio a comunicar:** 5 linhas + IA — **TecFood** (alimentação coletiva: corporativo, hospitalar, escolar, catering aéreo, transportadas, offshore), **Retail** (bares/restaurantes/fast food/delivery/pizzaria/hamburgueria/cafeteria), **ERP** (indústrias de alimentos, bebidas, cosméticos, química, farma), **HCM** (folha, ponto, eSocial, SST), **Facilities** (terceirizados/limpeza/segurança).

**Os 9 problemas que justificam o redesign:**
1. Visual datado de builder; sem sistema de grid/tipografia.
2. Hero sem proposição de valor clara (a metáfora "arroz com feijão" é simpática mas não comunica o quê/para quem em 3s).
3. Corporativês longo e genérico, pouco escaneável.
4. **Roteamento de público confuso** (5 produtos × ~25 segmentos sem direcionar rápido) — o problema nº1.
5. **Produto invisível:** zero captura de tela/vídeo/demo (contra a tendência 2026).
6. Prova social subaproveitada (números, logos e cases sem força).
7. **IA como item de lista**, não como diferencial — desperdício do maior ativo "2026".
8. **Eventos invisíveis:** o Food Service Show (evento PRÓPRIO, itinerante, 10+ edições) e a presença em Fispal/NRF/Anuga não aparecem na home — um ativo de autoridade enorme jogado fora.
9. Performance/SEO presos ao Avada; CTAs concorrentes ("Fale com o presidente", "Vamos tomar um café") diluindo o CTA principal.

---

## 2. Biblioteca de referências (em camadas) — ampliada e definitiva

Organizada em 5 camadas, do "bater o concorrente" ao "roubar craft dos melhores do mundo". Use as galerias da Camada 5 como fonte contínua durante o projeto.

### Camada 1 — Concorrentes diretos (a régua mínima a superar)
| Player | Leitura | O que pegar / evitar |
|---|---|---|
| **TOTVS Food Service** | Hero direto, prova social no topo ("+8 mil clientes, 21 mil PDVs"), CTA "Ligamos para você", ecossistema (Gestão/RD/Techfin). | **Pegar:** clareza + números no topo + CTA de baixa fricção. **Evitar:** menu gigante, peso "enterprise pesado". |
| **Saipos** | Marca jovem, foco restaurante, ênfase em 50+ integrações e 70+ recursos. | **Pegar:** energia e ênfase em ecossistema. **Evitar:** posicionamento "PDV de restaurante" (Teknisa é mais ampla). |
| **Linx/Menew, Senior, Sankhya** | Corporativos, fiscais, HCM. | Diferenciar pela verticalização profunda em coletiva (catering aéreo/hospitalar/escolar) que ninguém cobre. |

### Camada 2 — Food-tech / pares globais (o tom do setor, alto acabamento)
- **Toast** (`toasttab.com`) — **a referência-mãe** para food + produto tangível: hero com produto real, cor de marca forte, prova social agressiva, storytelling por segmento.
- **Square / Block** — clareza de portfólio multiproduto para quem opera comércio.
- **Lightspeed** — restaurante + varejo, bom uso de dados/relatórios na narrativa.
- **Olo, Wonder, Sysco** — operação de food em escala; como falar de volume/logística com elegância.

### Camada 3 — B2B SaaS gold standard (o craft de produto e tipografia)
- **Stripe** — padrão-ouro de gradientes, tipografia e *scroll-driven product story*. Estude o "como" das transições.
- **Linear** — bento, dark mode premium, micro-motion impecável, sensação de "produto rápido".
- **Vercel** — minimalismo funcional, dark, performance como estética.
- **Ramp / Mercury / Brex** — fintech B2B com números grandes e confiança; ótimos para a faixa de impacto/ROI.
- **Rippling / Gusto** — como explicar produto complexo e multimódulo (espelha o desafio Teknisa de 5 produtos).
- **Retool / Linear / Resend** — sensação "feito por quem ama código" (bom para a seção de IA/integrações).

### Camada 4 — Experiencial / award-level (o "wow" que ganha Awwwards)
> Aqui mora a ambição que faltava. São sites que ganharam ou foram nomeados a **Site of the Year / Site of the Day** em 2026 — referência de motion, WebGL e direção de arte. Use com parcimônia: a Teknisa precisa de *pitadas* desse craft, não do excesso.
- **Lando Norris** (Awwwards Site of the Year 2026) — motion que "sente" velocidade; lição de **emoção via movimento**.
- **Bruno Simon / Active Theory / Igloo Inc.** — WebGL e 3D de altíssimo nível (inspiração para 1 momento-assinatura, não a base).
- **Locomotive, Obys, Cuberto, Dogstudio/Hello Monday** — estúdios cujo trabalho define o "estado da arte" em scroll, tipografia cinética e transições.
- **Family / Igloo / Cosmos** — direção de arte editorial e fluida.

### Camada 5 — Galerias para minerar continuamente (mantenha abertas)
- **Awwwards** (craft + SOTY/SOTD) · **The FWA** (experiencial) · **Godly** (curadoria estética) · **Land-book** & **Refero** (landing pages reais) · **SaaS Frame** & **SaaS Landing Page** (padrões B2B SaaS por seção) · **Httpster** (raw/indie) · **Mobbin** (padrões de UI/produto) · **Lapa Ninja** (landing pages).

---

## 3. Tendências visuais 2026/2027 (o que aplicar, sem modismo)

**Ganhando e cabem na Teknisa:**
1. **Bento grids ("minimalismo funcional")** — blocos modulares squircle, densidade sem poluição. Ideal para 5 produtos.
2. **Tipografia expressiva e cinética** — headlines grandes, fonte variável, reveal no scroll, gradiente sutil.
3. **Dark mode + acento vibrante (dopamine accent)** — ar premium; usar em seções estratégicas.
4. **Motion com significado** — reveal on scroll, hover em cards/CTAs, ícones com micro-animação, checkmark em forms. Sempre com `prefers-reduced-motion`.
5. **Produto real > 3D abstrato** — capturas, vídeos curtos, **demos interativas no hero**. A virada definitiva de 2026.
6. **Scroll-driven storytelling** (sticky scroll Apple/Stripe) — texto fixo, telas trocam ao rolar.
7. **Glassmorphism pontual** — navbar sticky, cards sobre imagem, overlays.

**Emergentes (2026→2027) — diferenciais de vanguarda:**
- **Camada de legibilidade para IA** (`llms.txt`, `agents.json`, schema) — SEO da era LLM. **Implementar.**
- **Pitadas de anti-grid/monospace** em seções de IA/dev para sinalizar modernidade (sem virar a base).
- **WebGL/3D pontual** num único momento-assinatura (não na página toda — drena performance).

**Não fazer:** 3D pesado em tudo, Y2K nostálgico, glitch decorativo, ilustração flat genérica de "pessoinhas", minimalismo vazio.

---

## 4. Direção visual recomendada + momentos-assinatura

> **Conceito visual:** "Especialista premium em food service" — sério para enterprise, 5 anos à frente da TOTVS.

- **Base:** **branco** como base institucional (light mode é o padrão), com amplo destaque em **azul Teknisa** e seções dark estratégicas pontuais (IA, faixa de números, Food Service Show). Dark mode global como plus técnico fácil no Tailwind.
- **Cor:** **azul Teknisa** como cor de marca e protagonista dos destaques (CTAs, ícones, números, headlines), sobre base branca; **texto em preto e azul** (preto/quase-preto no corpo, azul em links, ênfases e títulos); escala de neutros calibrada para respiro. Gradientes sutis em **tons de azul** (azul Teknisa → azul claro/ciano) em headlines, bordas e fundos de seção.
- **Tipografia:** sans geométrica de display (headlines 600–800, fonte variável p/ cinética) + sans neutra legível no corpo + monospace pontual em labels de IA/dados.
- **Layout:** sistema de **bento** consistente, `rounded-2xl/3xl`, sombras suaves, ritmo vertical previsível.
- **Imagética:** capturas reais em frames de device + foto de operação real (cozinha industrial, hospital, fábrica, balcão) com overlay de marca. Zero banco de imagem genérico.

### Os 5 momentos-assinatura (é isso que eleva a "award-level")
Um site memorável tem 3–5 instantes de "wow". Os da Teknisa:
1. **Hero vivo** — contador de refeições/dia subindo em tempo real + *segment switcher* que **transforma** o produto no hero (restaurante ↔ hospital ↔ indústria) mostrando o sistema se adaptar.
2. **Mapa do Food Service Show** — Brasil com as cidades-sede da turnê iluminando em sequência (o evento itinerante vira gráfico).
3. **Sticky-scroll do TecFood** — o fluxo de uma refeição coletiva (cardápio → ficha técnica/CMV → produção → fiscal) contado com as telas trocando ao rolar.
4. **Orbital de integrações** — a plataforma no centro, integrações (iFood, adquirentes, fiscal, BI) orbitando com motion sutil.
5. **Seção de IA "dado → insight"** — animação dark em que dados crus se condensam num insight acionável.

---

## 5. Arquitetura da Home (v2 — com momentos-assinatura e Eventos)

Espinha: **autoridade → roteamento → produto tangível → IA → prova → eventos/comunidade → conversão.** Cada seção traz objetivo · conteúdo · **momento-assinatura/craft** · papel na conversão.

### 0 · Navbar sticky (glass) — ✅ já construído pelo dev
Mega-menu colapsável com animação **já implementado e aprovado** — fora do escopo deste blueprint. Estrutura real (referência): Produtos (8 grupos por área da operação) · Segmentos (Varejo Corporativo/Food Service/Indústrias/Serviços Terceirizados) · Recursos · Suporte · Cases · Sobre · Login · **Fale Conosco** (CTA). Manter consistência de cor por grupo e do CTA fixo nas demais seções.

### 1 · Hero — ✅ base construída (evolução opcional: momento-assinatura #1)
Estado atual: "O maior **ecossistema** de tecnologia para Varejo Corporativo" + métricas (28.200+ operações · 10M+ refeições/mês · 99,9% uptime) + CTAs **Agendar demo** / **Assistir vídeo** sobre foto escura com tipografia cinética. Já está na régua.
**Evolução opcional** (se quiser empurrar pro "wow"): **contador de refeições/mês** animando ao vivo + **segment switcher** (Varejo Corporativo ↔ Food Service ↔ Indústrias) que morfa a tela de produto no hero. *Não obrigatório* — o hero atual já cumpre. *Conversão:* CTA dominante único, sem CTAs concorrentes competindo.

### 2 · Barra de confiança
Marquee de logos de clientes (monocromático) + 3–4 métricas-âncora (35 anos · +20 mil instalações · 6 países · +20 mi refeições/dia). *Craft:* contador animado ao entrar no viewport; marquee em loop suave. *Conversão:* reduz risco percebido no topo.

### 3 · Roteador de público ("Qual é o seu negócio?") ⭐ resolve o problema nº1
Bento de 5–6 cards: **Restaurantes & Bares · Alimentação Coletiva · Indústrias · RH & DP · Facilities · (opc.) Setor Público.** Hover revela sub-segmentos; clique leva à landing do segmento. *Craft:* foto contextual por card, hover com profundidade/parallax leve. *Conversão:* segmenta tráfego (essencial p/ SEO e qualificação).

### 4 · Faixa de impacto / ROI (ponte para o Ecossistema · realocada, era §7)
Logo após o roteamento por segmento, dá escala/relevância e serve de **ponte** para o Ecossistema (§5). **Não é mais full-dark:** base branca com copy curtíssima cujas palavras *acendem* para o azul Teknisa ao **scroll**, seguida de uma **faixa azul que entra da esquerda para a direita** (full-bleed à esquerda, parando na direita do conteúdo) com 4 números de impacto grandes em branco. *Conversão:* racionaliza a decisão e emenda no portfólio. *Nota:* números fornecidos pelo cliente (validar com marketing, §8).

### 5 · Ecossistema de produtos (a plataforma) — **Showcase multi-device**
**Cluster de telas em devices diferentes que monta no scroll, com switch por categoria e hotspots
interativos.** Numa **seção clara** (base branca, texto preto/azul): à esquerda, eyebrow + H2 +
subhead (em **registro de BENEFÍCIO**, não de funcionalidade) + **switch de categorias** (o MESMO
componente da §3) + **logo lockup** do produto ativo; à direita, um **cluster de devices** (display,
laptop, tablet, phone, PDV, totem, etc., desenhados em código via **SVG** — claros, minimalistas,
proporção/raio escalam — não imagens). A **tela âncora grande sangra a 100% da direita** e os devices
**emergem de baixo, cortados pela base da seção** (estilo premium). A entrada é **amarrada ao scroll**
(`useScroll`/`useTransform`): sobem de baixo, um a um (stagger por `order`), e travam ao montar
(< ~1s, 60fps; respeita `prefers-reduced-motion`). Cada device exibe a
tela de **um módulo** daquele produto, contando "um produto = vários módulos"; cada categoria mostra
**3 a 5 devices apropriados** (ex.: Retail traz PDV + totem TAA + tablet de cardápio + phone delivery).
O **switch** troca o conjunto de devices/telas (+ logo e copy) por crossfade/re-stagger.
- **Telas:** **imagem (estáticas) por ora**, com UI fake clara de placeholder por device/módulo;
  nunca `img` quebrada (fallback = UI placeholder ou bloco azul + nome).
- **Hotspots: já fazem parte DESTA fase.** Pins azuis com anel pulsante (Framer), livres (hover OU
  foco OU tap, em qualquer ordem), por coordenadas em % sobre a tela; abrem callout (título + 1 a 2
  linhas de **benefício**). Ancoragem/flip/collision e a11y via **@floating-ui/react** (`<button>`,
  `aria-expanded`/`aria-controls`, `Esc`, foco visível). Hotspots aparecem **após** os devices
  pousarem. No reduced-motion entram sem fly-in.
- **Craft:** indicador ativo do switch via `layoutId`, sombra de contato sob cada device, camada de
  dados editável pelo marketing em `src/data/productShowcase.ts`.
- **A11y/mobile:** tablist/`aria-selected`; no mobile empilha (texto em cima, switch com scroll
  horizontal/`select`) e mostra **1 a 2 devices-herói** por categoria; hotspots por tap.
- **Único item ADIADO (estrutura pronta): vídeo.** `Screen.type` aceita `'image' | 'video'` — trocar
  uma tela por vídeo curto em loop (UI "viva") no futuro é só mudar o `type`. Nada mais fica para
  depois (hotspots entram agora).

*Conversão:* leva às landings de produto. A §6 (IA) é a seção **dark** estratégica da vizinhança; a §5
fica clara. (Sticky scroll e bento foram tentados e descartados; não voltar a eles.)

### 6 · Spotlight de IA, momento-assinatura #5 ⭐ (clara)
O que a TeknisAI entrega (previsão de demanda/cardápio, automação de rotinas, IA para compras e
atendimento), em **registro de benefício**. *Craft (conceito atual):* uma **micro-narrativa** inspirada na
Anthropic + refs de **halftone/dot-art** (pontos, não caracteres). Beats ágeis ao entrar na seção:
"Apresentando" + balão de 3 pontos (blur-reveal), depois revela o wordmark **TeknisAI** (sub-brand da IA,
serif **Averia Serif Libre** usada SÓ aqui), depois o layout final que **ocupa ~100vh**: cabeçalho
(TeknisAI + intro + **subtexto que muda no hover/foco dos cards**) em cima, **bento full-width variado**
embaixo. O bento segue uma **estrutura de referência densa** (grid 12×4): card de texto, card azul de
acento, card hero, cards de arte, **coluna alta de motivo** (círculos) e **card de assinatura**, com
tamanhos e composições diferentes (como a §3). Cada capacidade é um **halftone de pontos azuis sobre
charcoal**, numa seção **clara**. Paleta reduzida a **azul, charcoal e branco** (sem magenta/rosa/vermelho
das refs). *A11y/perf:* cards `<button>` (foco atualiza o subtexto, não só hover); dot-art lazy e estático,
respira só no card ativo; `prefers-reduced-motion` cai pro layout final imediato e dot-art estático; mobile
empilha. **Scroll-snap gentil** via Lenis (`lenis/snap`, proximity, só desktop). *Por que claro:*
foge do clichê escuro e mantém a vizinhança coerente com a §5 clara. *Conversão:* inovadora vs. TOTVS; CTA
"Falar com especialista".

### 7 · Ponte TecFood — mockup com Container Scroll Animation
**Transição** (não deep-dive): um **frame de tela** que faz **rotateX (deita→levanta) + scale (cresce)**
conforme o scroll (base **Container Scroll Animation** do Aceternity, adaptado a React + Vite + Framer
Motion, **recolorido aos tokens**, sem moldura de Mac), exibindo a **tela do TecFood** (`screens/monitor.webp`,
placeholder até a captura final). Headline curta de **benefício** (sem "gestão", sem travessão). *Mobile/
reduced-motion:* frame **estático em pé** (sem rotateX/scale). *Conversão:* dá um "produto tangível" e
emenda os blocos vizinhos. **O deep-dive aprofundado** (fluxo cardápio → ficha técnica/CMV → produção →
estoque → fiscal, tabs por sub-segmento) **migrou para a página de produto do TecFood**, não fica na home.

### 8 · Casos de sucesso
3–4 cases (logo, foto, métrica, citação curta — ex.: Risotolândia e clientes de coletiva). *Craft:* cards com foto real + quote, hover que eleva; carrossel cinético. *Conversão:* identificação.

### 9 · Integrações & ecossistema — momento-assinatura #4
Grade/órbita de logos (iFood, adquirentes REDE, fiscal, BI, Gertec/equipamentos, totens de autoatendimento) + API/cloud/on-premise. *Craft:* **diagrama orbital** da plataforma com motion sutil. *Conversão:* remove objeção técnica (resposta ao trunfo "integrações" da Saipos).

### 10 · Food Service Show (evento próprio) — momento-assinatura #2 ⭐ NOVO
**O ativo de autoridade mais subaproveitado hoje.** O Food Service Show é o **evento itinerante exclusivo da Teknisa** (10+ edições por capitais — SP, RJ, Curitiba, Brasília…), que reúne líderes do setor, palestras, demos ao vivo de TecFood/Retail/HCM e celebrou os **35 anos** em 2025.
- **Conteúdo:** pitch do evento + **próxima edição com CTA "Inscreva-se"** + reel de vídeo/fotos das edições + depoimentos.
- **Momento-assinatura:** **mapa do Brasil** com as cidades-sede acendendo em sequência (a "turnê" vira gráfico vivo) + timeline de edições.
- **Conversão:** captura de leads de altíssimo valor (gestores do setor) e prova de que a Teknisa **lidera a pauta**, não só vende software.

### 11 · Onde nos encontrar (feiras do setor) — NOVO
A Teknisa marca presença nas maiores feiras: **Fispal Food Service** (maior da América do Sul — 70 mil visitantes, Distrito Anhembi/SP), **NRF** (NY, maior varejo do mundo, via parceria Gertec), **Anuga Select Brazil**, entre outras.
- **Conteúdo:** timeline/calendário 2026–2027 com logos das feiras, datas e "Agende uma reunião no estande".
- **Craft:** linha do tempo horizontal com scroll; cards de evento com status (próximo/realizado).
- **Conversão:** agendamento de reunião presencial = lead quente.

### 12 · Por que Teknisa (diferenciais)
Pilares escaneáveis: *35 anos de especialização · Cloud + On-premise · Suporte e implantação especializados · Verticalização profunda.* *Craft:* bento com ícones e micro-animação. *Conversão:* quebra objeções de confiança.

### 13 · Prêmios & certificações
Selos em faixa discreta, monocromáticos. *Conversão:* credibilidade enterprise.

### 14 · Hub de conteúdo (Recursos)
3 posts recentes + e-books + EAD/Teknisa Treinamentos. *Craft:* bento de 3 cards com tag. *Conversão:* topo de funil; captura por e-book.

### 15 · CTA final de conversão
Headline de fechamento + form curto ("Ligamos para você": nome, empresa, segmento, contato) ou agendamento de demo. *Craft:* full-bleed com **gradiente azul Teknisa**, validação animada (checkmark). *Conversão:* **captura principal.**

### 16 · Rodapé rico
Colunas Produtos · Segmentos · Recursos · **Eventos** · Empresa (Sobre, Carreiras "Vamos tomar um café?", Revenda) · Contato (Rua Sergipe 1014, Savassi, BH) · social · seletor PT/EN/ES · newsletter. *Nota:* mover o recrutamento "Vamos tomar um café?" para cá / página de Carreiras, fora do fluxo comercial.

### Mapa-resumo
```
0  Navbar glass + CTA fixo (mega-menu)            ✅ construído
1  Hero (ecossistema + métricas + CTAs)           ✅ construído (★ switcher opcional)
2  Barra de confiança (logos + métricas animadas)
3  Roteador de público (bento 5–6 segmentos)        ← resolve nº1
4  Faixa de impacto / ROI (ponte; base branca + faixa azul)   ← realocada (era 7)
5  Ecossistema de produtos (showcase multi-device, switch + hotspots)
6  Spotlight de IA (claro/editorial: assinatura data→decisão + bento)  ★ assinatura
7  Deep-dive TecFood (sticky scroll)                ★ assinatura
8  Casos de sucesso
9  Integrações (orbital)                            ★ assinatura
10 Food Service Show (mapa da turnê)        NOVO    ★ assinatura
11 Onde nos encontrar / feiras (Fispal, NRF) NOVO
12 Por que Teknisa
13 Prêmios & certificações
14 Hub de conteúdo
15 CTA final (form)                                 ← captura principal
16 Rodapé rico (+ Eventos, PT/EN/ES)
```

---

## 6. Checklist "award-level" (o que separa bom de premiável)

- [ ] **Conceito conduzido** do hero ao rodapé (a frase aparece e se prova).
- [ ] **3–5 momentos-assinatura** memoráveis (os 5 acima), o resto contido.
- [ ] **Produto tangível** em telas reais — não ilustração genérica.
- [ ] **Motion intencional** + `prefers-reduced-motion` + 60fps real.
- [ ] **Tipografia como protagonista** (escala, peso, cinética).
- [ ] **Performance impecável** (LCP < 2,5s, CLS ~0) — o que o Avada não entrega.
- [ ] **Detalhe nos micro-estados** (hover, foco, loading, vazio, erro).
- [ ] **Coerência de sistema** (tokens, spacing, radius, sombras).
- [ ] **Acessibilidade AA** (contraste, teclado, foco visível).
- [ ] **Camada de IA-readability** (`llms.txt`, schema) para a era LLM.
- [ ] **História de marca** (Food Service Show + 35 anos) — alma, não só features.

---

## 7. Notas técnicas (React + Tailwind + motion)

- **Stack:** **React + Vite (TypeScript)** + **react-router-dom** + TailwindCSS + **Framer Motion** (reveal/hover/layout) + **Lenis** (smooth scroll) + **GSAP/ScrollTrigger** ou Framer `useScroll` para o sticky-scroll do TecFood; **React Three Fiber** apenas no(s) momento(s) WebGL (hero/orbital), lazy-loaded. **SEO:** como Vite gera SPA, usar **prerendering/SSG estático** (`vite-react-ssg` ou equivalente) + **`react-helmet-async`** para meta/OpenGraph por rota antes do go-live.
- **Tokens no `tailwind.config`:** paleta (**azul Teknisa** + escala de azuis + neutros, texto preto/azul, base branca), escala tipográfica display/body, radius `2xl/3xl`, sombras suaves, dark mode (`class`).
- **Componentes:** `Section`, `BentoCard`, `MetricCounter`, `SegmentSwitcher`, `ProductCard`, `StickyShowcase`, `LogoMarquee`, `OrbitDiagram`, `EventMap`, `EventTimeline`, `CTAForm`.
- **Motion:** `whileInView` + `viewport={{ once: true }}`; contadores via IntersectionObserver; **sempre** `prefers-reduced-motion`.
- **Performance:** imagens otimizadas em AVIF/WebP (ex.: `vite-imagetools` ou pré-otimização no build), lazy-load abaixo da dobra, WebGL só no que for assinatura, fontes variáveis self-hosted (`@fontsource`) com `font-display: swap`, code-splitting por seção pesada (`React.lazy`/dynamic import).
- **SEO + IA:** schema.org (Organization, Product, Event para o Food Service Show, BreadcrumbList), `sitemap.xml`, `llms.txt`/`agents.json`, **landings de segmento individuais**.
- **i18n:** PT/EN/ES por rota desde o início (corrige a mistura atual).
- **CMS:** headless (Sanity/Contentful) ou MDX para blog/cases/**eventos** — marketing publica sem depender de dev (essencial para o calendário de feiras e edições do Food Service Show).

---

## 8. Próximos passos

1. **Validar números e claims** com o marketing (instalações, países, refeições/dia, nº de edições do Food Service Show) — não publicar dado defasado.
2. **Coletar assets reais:** capturas dos sistemas, fotos das edições do Food Service Show e dos estandes (Fispal/NRF), logos de clientes e integrações.
3. **Definir os 2 CTAs canônicos** ("Falar com especialista" + "Ligamos para você") e eliminar CTAs concorrentes.
4. **Travar paleta + tipografia + design tokens** (posso gerar a proposta de tokens Tailwind).
5. **Construir as próximas seções na ordem do mapa** — com navbar e hero prontos, o maior ganho agora é o **Roteador de público (§3)** e o **Ecossistema de produtos (§4)**, seguidos dos momentos-assinatura (Food Service Show, IA, sticky-scroll TecFood, orbital).
6. **Priorizar landings de segmento** para SEO após a home.
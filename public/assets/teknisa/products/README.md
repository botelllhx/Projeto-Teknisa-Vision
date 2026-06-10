# Telas e logos dos produtos (§5 · Showcase multi-device)

Cada categoria/produto tem uma pasta. A §5 (`ProductShowcase`) monta um **cluster de devices**
(frames em código) e cada device exibe a **tela de um módulo**.

- **Logo lockup** (já presente): `<slug>/<slug>-horizontal-colorid[oa]-svg.svg` — usado no switcher e
  no lockup do produto ativo.
- **Telas dos módulos** (a designer exporta): imagens **planas, sem moldura** (o frame do device é
  desenhado em código). Nomeie por `<categoria>-<device>-<modulo>.webp`. Enquanto não existirem, o
  device cai numa **UI fake** clara de placeholder — nunca quebra.

## Estrutura

```
products/
  tecfood/
    tecfood-horizontal-colorido-svg.svg     ← logo lockup
    tecfood-desktop-operacao.webp           ← tela do módulo (no device 'desktop')
    tecfood-tablet-nutricional.webp
    tecfood-laptop-estoque.webp
    tecfood-phone-gestor.webp
  retail/   ← pos/totem/tablet/phone/desktop (a mais rica)
  erp/      · hcm/ · facilities/
  ia/       ← IA fica de fora do switcher até ter logo
```

> Os caminhos exatos saem de `src/data/productShowcase.ts` (campo `screen.src`). Marketing edita lá:
> devices por categoria, módulo de cada device, ordem de entrada, posição no cluster e hotspots.

## Recomendações de export das telas

- Proporção **consistente por tipo de device** (o frame faz `object-cover`): desktop/laptop/browser
  ~16:10 · tablet retrato 3:4 · tablet paisagem 4:3 · phone 9:19 · PDV 4:5 · totem 9:16.
- **WebP** otimizado (master PNG), 2x, telas limpas (< ~200 KB).
- **FUTURO (estrutura pronta):** uma tela pode virar **vídeo** curto em loop — basta `screen.type:
  "video"` e apontar `src` para o `.webm`/`.mp4`. É a única evolução adiada (hotspots já entram agora).

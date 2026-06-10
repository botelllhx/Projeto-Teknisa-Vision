# Fotos dos segmentos (§3 · Explorador de segmentos)

Cada segmento tem uma pasta própria. O bento usa **WebP otimizado**:

- `<slug>/hero.webp` — foto principal (card grande). **Obrigatória** (já presente).
- `<slug>/2.webp` — 2ª foto (card de imagem menor). **Opcional**: enquanto não existir,
  o card cai na foto principal (recorte diferente) e, se nem ela existir, no gradiente azul.

## Estrutura

```
segments/
  varejo-corporativo/hero.webp   (+ 2.webp opcional)
  food-service/hero.webp         (+ 2.webp opcional)
  industrias/hero.webp           (+ 2.webp opcional)
  servicos-terceirizados/hero.webp (+ 2.webp opcional)
```

## Otimização (já feita)

As fotos originais (2–5 MB, alta resolução) foram convertidas para WebP (~1600 px no maior
lado, q72 → 53–92 KB) com `sharp`. **Os JPGs originais ficam em `raw-assets/segments/`**
(fora de `public/`, não vão pro build) como fonte. Para trocar uma foto: substitua o
original e rode a conversão novamente, ou solte um `hero.webp`/`2.webp` já otimizado aqui.

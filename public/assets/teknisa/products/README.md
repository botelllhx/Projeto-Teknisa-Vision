# Telas dos produtos (§5 · Ecossistema de produtos, sticky scroll)

Cada produto tem uma pasta. O frame do sticky scroll (`ProductEcosystem`) carrega
`<slug>/screen.webp`. Enquanto não existir, o card mostra o fallback (frame azul Teknisa +
ícone + nome do produto) — nunca quebra.

## Estrutura

```
products/
  tecfood/screen.webp      ← TecFood (alimentação coletiva)
  retail/screen.webp       ← Retail (frente de loja, bares/restaurantes/delivery)
  erp/screen.webp          ← ERP (backoffice: financeiro, fiscal, indústrias)
  hcm/screen.webp          ← Pessoas e RH (folha, ponto, eSocial)
  facilities/screen.webp   ← Facilities (serviços terceirizados)
  ia/screen.webp           ← IA (inteligência aplicada)
```

## Recomendações

- Capturas reais dos sistemas, proporção paisagem ~4:3 (o frame faz `object-cover`).
- Otimizar para web (WebP, < ~200 KB). Há um frame/borda por volta, então telas limpas funcionam melhor.
- `.webp` é o esperado pelo código (ver `src/components/sections/ProductEcosystem.tsx`).

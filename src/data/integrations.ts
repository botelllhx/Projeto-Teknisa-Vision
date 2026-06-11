import {
  BarChart3,
  Bike,
  Boxes,
  Calculator,
  Cloud,
  CreditCard,
  FileText,
  Fingerprint,
  Landmark,
  Receipt,
  Scale,
  ScanLine,
  ShoppingCart,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * §9 · Integrações — itens que orbitam o ecossistema Teknisa. **Conteúdo placeholder** (`// TODO`):
 * cada item é uma **CATEGORIA do domínio** (não uma marca), com um **ícone placeholder** até a
 * **logo real** (`logo`) entrar em `public/assets/teknisa/integrations/<id>.svg`. NÃO inventar
 * parceiro/marca — validar com o marketing. `ring` = qual órbita (1 interna … 3 externa).
 */
export type Integration = {
  id: string;
  name: string;
  category: string;
  icon: LucideIcon; // placeholder visual enquanto não há logo real
  logo: string; // // TODO: logo real (svg)
  ring: 1 | 2 | 3;
};

const L = (id: string) => `/assets/teknisa/integrations/${id}.svg`;
const I = (id: string, name: string, category: string, icon: LucideIcon, ring: 1 | 2 | 3): Integration => ({
  id,
  name,
  category,
  icon,
  logo: L(id),
  ring,
});

// TODO: substituir por LOGOS/parceiros reais (validar com marketing — não inventar marca).
export const INTEGRATIONS: Integration[] = [
  // anel 1 (interno) — núcleo da operação
  I("fiscal", "Fiscal / NFC-e", "Fiscal", Receipt, 1),
  I("tef", "Pagamento / TEF", "Pagamento", CreditCard, 1),
  I("erp", "ERPs", "ERP", Boxes, 1),
  I("bi", "BI & analytics", "BI", BarChart3, 1),
  // anel 2 (meio)
  I("bancos", "Bancos", "Financeiro", Landmark, 2),
  I("delivery", "Marketplace / delivery", "Delivery", Bike, 2),
  I("acesso", "Catraca / acesso", "Acesso", ScanLine, 2),
  I("balanca", "Balança", "Equipamentos", Scale, 2),
  I("ponto", "Ponto eletrônico", "RH", Fingerprint, 2),
  I("beneficios", "Cartão / benefícios", "Benefícios", Wallet, 2),
  // anel 3 (externo)
  I("contabil", "Contabilidade", "Contábil", Calculator, 3),
  I("ecommerce", "E-commerce", "Vendas", ShoppingCart, 3),
  I("sefaz", "Nota fiscal / SEFAZ", "Fiscal", FileText, 3),
  I("cloud", "Cloud / API", "Plataforma", Cloud, 3),
  I("crm", "CRM", "Relacionamento", Users, 3),
  I("logistica", "Logística", "Logística", Truck, 3),
];

export const byRing = (ring: 1 | 2 | 3) => INTEGRATIONS.filter((i) => i.ring === ring);

export const STATUTS = [
  { value: "commandee", label: "Commandée", color: "amber" },
  { value: "en_preparation", label: "En préparation", color: "violet" },
  { value: "expediee", label: "Expédiée", color: "cyan" },
  { value: "livree", label: "Livrée", color: "green" },
  { value: "retournee", label: "Retournée", color: "orange" },
  { value: "remboursee", label: "Remboursée", color: "blue" },
  { value: "annulee", label: "Annulée", color: "red" },
] as const;

export type Statut = (typeof STATUTS)[number]["value"];
export const STATUT_VALUES = STATUTS.map((s) => s.value) as [Statut, ...Statut[]];

export const CATEGORIES = [
  { value: "mode", label: "Mode" },
  { value: "high_tech", label: "High-tech" },
  { value: "maison", label: "Maison & Déco" },
  { value: "beaute", label: "Beauté & Santé" },
  { value: "sport", label: "Sport & Loisirs" },
  { value: "alimentation", label: "Alimentation" },
  { value: "culture", label: "Culture & Divertissement" },
  { value: "autre", label: "Autre" },
] as const;

export type Categorie = (typeof CATEGORIES)[number]["value"];
export const CATEGORIE_VALUES = CATEGORIES.map((c) => c.value) as [Categorie, ...Categorie[]];

export const METHODES_PAIEMENT = [
  { value: "carte", label: "Carte bancaire" },
  { value: "paypal", label: "PayPal" },
  { value: "virement", label: "Virement" },
  { value: "autre", label: "Autre" },
] as const;

export type MethodePaiement = (typeof METHODES_PAIEMENT)[number]["value"];
export const METHODE_PAIEMENT_VALUES = METHODES_PAIEMENT.map((m) => m.value) as [
  MethodePaiement,
  ...MethodePaiement[],
];

// Suggestions affichées dans le champ enseigne (en plus des enseignes déjà utilisées).
export const ENSEIGNES_SUGGEREES = [
  "Amazon",
  "Zara",
  "Fnac",
  "Cdiscount",
  "AliExpress",
  "Shein",
  "Temu",
  "Decathlon",
  "IKEA",
  "Darty",
  "Boulanger",
  "Leboncoin",
  "Vinted",
  "Veepee",
  "ManoMano",
  "Etsy",
  "H&M",
  "Uniqlo",
  "Sephora",
  "Zalando",
  "Asos",
  "Nike",
  "Apple",
];

export function statutLabel(value: string): string {
  return STATUTS.find((s) => s.value === value)?.label ?? value;
}

export function categorieLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export function methodePaiementLabel(value: string): string {
  return METHODES_PAIEMENT.find((m) => m.value === value)?.label ?? value;
}

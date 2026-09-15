export const STATUTS = [
  { value: "en_attente", label: "En attente", color: "amber" },
  { value: "confirmee", label: "Confirmée", color: "blue" },
  { value: "en_preparation", label: "En préparation", color: "violet" },
  { value: "expediee", label: "Expédiée", color: "cyan" },
  { value: "livree", label: "Livrée", color: "green" },
  { value: "annulee", label: "Annulée", color: "red" },
] as const;

export type Statut = (typeof STATUTS)[number]["value"];
export const STATUT_VALUES = STATUTS.map((s) => s.value) as [Statut, ...Statut[]];

export const PRIORITES = [
  { value: "basse", label: "Basse", color: "slate" },
  { value: "normale", label: "Normale", color: "blue" },
  { value: "haute", label: "Haute", color: "orange" },
  { value: "urgente", label: "Urgente", color: "red" },
] as const;

export type Priorite = (typeof PRIORITES)[number]["value"];
export const PRIORITE_VALUES = PRIORITES.map((p) => p.value) as [Priorite, ...Priorite[]];

export const METHODES_PAIEMENT = [
  { value: "carte", label: "Carte bancaire" },
  { value: "especes", label: "Espèces" },
  { value: "virement", label: "Virement" },
  { value: "cheque", label: "Chèque" },
  { value: "autre", label: "Autre" },
] as const;

export type MethodePaiement = (typeof METHODES_PAIEMENT)[number]["value"];
export const METHODE_PAIEMENT_VALUES = METHODES_PAIEMENT.map((m) => m.value) as [
  MethodePaiement,
  ...MethodePaiement[],
];

export function statutLabel(value: string): string {
  return STATUTS.find((s) => s.value === value)?.label ?? value;
}

export function prioriteLabel(value: string): string {
  return PRIORITES.find((p) => p.value === value)?.label ?? value;
}

export function methodePaiementLabel(value: string): string {
  return METHODES_PAIEMENT.find((m) => m.value === value)?.label ?? value;
}

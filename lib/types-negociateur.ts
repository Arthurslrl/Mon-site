export const CATEGORIES_ABONNEMENT = [
  { value: "streaming", label: "Streaming & Divertissement" },
  { value: "telecom", label: "Téléphonie & Internet" },
  { value: "assurance", label: "Assurance" },
  { value: "sport", label: "Sport & Bien-être" },
  { value: "energie", label: "Énergie" },
  { value: "banque", label: "Banque & Finance" },
  { value: "autre", label: "Autre" },
] as const;

export type CategorieAbonnement = (typeof CATEGORIES_ABONNEMENT)[number]["value"];
export const CATEGORIE_ABONNEMENT_VALUES = CATEGORIES_ABONNEMENT.map((c) => c.value) as [
  CategorieAbonnement,
  ...CategorieAbonnement[],
];

export const FREQUENCES = [
  { value: "mensuel", label: "Mensuel" },
  { value: "annuel", label: "Annuel" },
] as const;

export type Frequence = (typeof FREQUENCES)[number]["value"];
export const FREQUENCE_VALUES = FREQUENCES.map((f) => f.value) as [Frequence, ...Frequence[]];

export const STATUTS_ABONNEMENT = [
  { value: "actif", label: "Actif", color: "green" },
  { value: "en_negociation", label: "En négociation", color: "amber" },
  { value: "resilie", label: "Résilié", color: "slate" },
] as const;

export type StatutAbonnement = (typeof STATUTS_ABONNEMENT)[number]["value"];

export function categorieAbonnementLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return CATEGORIES_ABONNEMENT.find((c) => c.value === value)?.label ?? value;
}

export function statutAbonnementLabel(value: string): string {
  return STATUTS_ABONNEMENT.find((s) => s.value === value)?.label ?? value;
}

export function statutAbonnementColor(value: string): string {
  return STATUTS_ABONNEMENT.find((s) => s.value === value)?.color ?? "slate";
}

// Ramène un montant (mensuel ou annuel) à son équivalent mensuel, pour les totaux.
export function montantMensuel(montant: number, frequence: string): number {
  return frequence === "annuel" ? montant / 12 : montant;
}

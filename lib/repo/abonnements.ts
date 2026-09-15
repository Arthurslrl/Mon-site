import { getDb } from "@/lib/db";
import { simulerNegociation } from "@/lib/negociation-simulateur";
import { montantMensuel, type CategorieAbonnement, type Frequence, type StatutAbonnement } from "@/lib/types-negociateur";

export interface Abonnement {
  id: number;
  nom: string;
  categorie: CategorieAbonnement | null;
  montant: number;
  frequence: Frequence;
  statut: StatutAbonnement;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AbonnementInput {
  nom: string;
  categorie?: CategorieAbonnement | null;
  montant: number;
  frequence: Frequence;
  notes?: string | null;
}

export interface Negociation {
  id: number;
  abonnement_id: number;
  statut: "reussie" | "echouee";
  ancien_montant: number;
  nouveau_montant: number | null;
  economie_mensuelle: number;
  transcript: string[];
  created_at: string;
}

export function listAbonnements(): Abonnement[] {
  return getDb()
    .prepare(`SELECT * FROM abonnements ORDER BY nom COLLATE NOCASE`)
    .all() as Abonnement[];
}

export function getAbonnement(id: number): Abonnement | undefined {
  return getDb().prepare(`SELECT * FROM abonnements WHERE id = ?`).get(id) as
    | Abonnement
    | undefined;
}

export function createAbonnement(input: AbonnementInput): number {
  const result = getDb()
    .prepare(
      `INSERT INTO abonnements (nom, categorie, montant, frequence, notes) VALUES (?, ?, ?, ?, ?)`
    )
    .run(input.nom, input.categorie ?? null, input.montant, input.frequence, input.notes ?? null);
  return Number(result.lastInsertRowid);
}

export function updateAbonnement(id: number, input: AbonnementInput): void {
  getDb()
    .prepare(
      `UPDATE abonnements SET nom = ?, categorie = ?, montant = ?, frequence = ?, notes = ?, updated_at = datetime('now')
       WHERE id = ?`
    )
    .run(input.nom, input.categorie ?? null, input.montant, input.frequence, input.notes ?? null, id);
}

export function deleteAbonnement(id: number): void {
  getDb().prepare(`DELETE FROM abonnements WHERE id = ?`).run(id);
}

export function listNegociations(abonnementId: number): Negociation[] {
  const rows = getDb()
    .prepare(`SELECT * FROM negociations WHERE abonnement_id = ? ORDER BY created_at DESC, id DESC`)
    .all(abonnementId) as (Omit<Negociation, "transcript"> & { transcript: string })[];
  return rows.map((r) => ({ ...r, transcript: JSON.parse(r.transcript) as string[] }));
}

// Lance (et résout immédiatement) une négociation simulée pour un abonnement.
export function lancerNegociation(abonnementId: number): Negociation {
  const db = getDb();
  const abonnement = getAbonnement(abonnementId);
  if (!abonnement) throw new Error("Abonnement introuvable");

  const resultat = simulerNegociation(abonnement.nom, abonnement.montant);

  const tx = db.transaction(() => {
    const insert = db
      .prepare(
        `INSERT INTO negociations
          (abonnement_id, statut, ancien_montant, nouveau_montant, economie_mensuelle, transcript)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .run(
        abonnementId,
        resultat.statut,
        abonnement.montant,
        resultat.nouveauMontant,
        resultat.economieMensuelle,
        JSON.stringify(resultat.transcript)
      );

    if (resultat.statut === "reussie" && resultat.nouveauMontant !== null) {
      db.prepare(`UPDATE abonnements SET montant = ?, updated_at = datetime('now') WHERE id = ?`).run(
        resultat.nouveauMontant,
        abonnementId
      );
    }

    return Number(insert.lastInsertRowid);
  });

  const id = tx();
  return {
    id,
    abonnement_id: abonnementId,
    statut: resultat.statut,
    ancien_montant: abonnement.montant,
    nouveau_montant: resultat.nouveauMontant,
    economie_mensuelle: resultat.economieMensuelle,
    transcript: resultat.transcript,
    created_at: new Date().toISOString(),
  };
}

export interface NegociateurStats {
  totalMensuel: number;
  nbAbonnements: number;
  economieRealisee: number;
  economiePotentielle: number;
  parCategorie: { categorie: string | null; total: number }[];
}

export function getNegociateurStats(): NegociateurStats {
  const db = getDb();
  const abonnements = listAbonnements();

  const totalMensuel = abonnements.reduce(
    (sum, a) => sum + (a.statut === "resilie" ? 0 : montantMensuel(a.montant, a.frequence)),
    0
  );

  const { economieRealisee } = db
    .prepare(
      `SELECT COALESCE(SUM(economie_mensuelle), 0) as economieRealisee FROM negociations WHERE statut = 'reussie'`
    )
    .get() as { economieRealisee: number };

  // Estimation heuristique : abonnements actifs jamais négociés, on suppose ~15% de marge possible.
  const negocieIds = new Set(
    (db.prepare(`SELECT DISTINCT abonnement_id FROM negociations`).all() as { abonnement_id: number }[]).map(
      (r) => r.abonnement_id
    )
  );
  const economiePotentielle = abonnements
    .filter((a) => a.statut === "actif" && !negocieIds.has(a.id))
    .reduce((sum, a) => sum + montantMensuel(a.montant, a.frequence) * 0.15, 0);

  const parCategorieMap = new Map<string | null, number>();
  for (const a of abonnements) {
    if (a.statut === "resilie") continue;
    const key = a.categorie;
    parCategorieMap.set(key, (parCategorieMap.get(key) ?? 0) + montantMensuel(a.montant, a.frequence));
  }
  const parCategorie = Array.from(parCategorieMap.entries())
    .map(([categorie, total]) => ({ categorie, total }))
    .sort((a, b) => b.total - a.total);

  return {
    totalMensuel,
    nbAbonnements: abonnements.length,
    economieRealisee,
    economiePotentielle,
    parCategorie,
  };
}

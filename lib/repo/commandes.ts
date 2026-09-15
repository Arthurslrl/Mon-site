import { getDb } from "@/lib/db";
import type { Categorie, MethodePaiement, Statut } from "@/lib/types";
import type Database from "better-sqlite3";

export interface CommandeItemInput {
  designation: string;
  quantite: number;
  prix_unitaire: number;
}

export interface CommandeItem extends CommandeItemInput {
  id: number;
  commande_id: number;
}

export interface Commande {
  id: number;
  reference: string;
  enseigne: string;
  categorie: Categorie | null;
  statut: Statut;
  methode_paiement: MethodePaiement;
  numero_commande: string | null;
  numero_suivi: string | null;
  lien_suivi: string | null;
  date_commande: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CommandeWithTotal extends Commande {
  total: number;
}

export interface HistoriqueEntry {
  id: number;
  commande_id: number;
  statut: string;
  note: string | null;
  created_at: string;
}

export interface CommandeDetail extends Commande {
  items: CommandeItem[];
  historique: HistoriqueEntry[];
  total: number;
}

export interface CommandeFilters {
  statut?: string;
  enseigne?: string;
  categorie?: string;
  methodePaiement?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  sort?: "date_desc" | "date_asc" | "total_desc" | "total_asc";
  page?: number;
  pageSize?: number;
}

function generateReference(db: Database.Database): string {
  const year = new Date().getFullYear();
  const rows = db
    .prepare(`SELECT reference FROM commandes WHERE reference LIKE ?`)
    .all(`CMD-${year}-%`) as { reference: string }[];
  let max = 0;
  for (const row of rows) {
    const n = Number(row.reference.split("-")[2]);
    if (Number.isFinite(n) && n > max) max = n;
  }
  return `CMD-${year}-${String(max + 1).padStart(4, "0")}`;
}

function buildWhere(filters: CommandeFilters) {
  const clauses: string[] = [];
  const params: unknown[] = [];

  if (filters.statut) {
    clauses.push("c.statut = ?");
    params.push(filters.statut);
  }
  if (filters.enseigne) {
    clauses.push("c.enseigne = ?");
    params.push(filters.enseigne);
  }
  if (filters.categorie) {
    clauses.push("c.categorie = ?");
    params.push(filters.categorie);
  }
  if (filters.methodePaiement) {
    clauses.push("c.methode_paiement = ?");
    params.push(filters.methodePaiement);
  }
  if (filters.dateFrom) {
    clauses.push("date(c.date_commande) >= date(?)");
    params.push(filters.dateFrom);
  }
  if (filters.dateTo) {
    clauses.push("date(c.date_commande) <= date(?)");
    params.push(filters.dateTo);
  }
  if (filters.search) {
    clauses.push("(c.reference LIKE ? OR c.enseigne LIKE ? OR c.numero_commande LIKE ?)");
    const like = `%${filters.search}%`;
    params.push(like, like, like);
  }

  return {
    where: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "",
    params,
  };
}

const SORT_MAP: Record<string, string> = {
  date_desc: "c.date_commande DESC, c.id DESC",
  date_asc: "c.date_commande ASC, c.id ASC",
  total_desc: "total DESC",
  total_asc: "total ASC",
};

export function listCommandes(
  filters: CommandeFilters = {}
): { rows: CommandeWithTotal[]; total: number } {
  const db = getDb();
  const { where, params } = buildWhere(filters);
  const orderBy = SORT_MAP[filters.sort ?? "date_desc"] ?? SORT_MAP.date_desc;

  const { n: total } = db
    .prepare(`SELECT COUNT(*) as n FROM commandes c ${where}`)
    .get(...params) as { n: number };

  const pageSize = filters.pageSize ?? 25;
  const page = filters.page ?? 1;
  const offset = (page - 1) * pageSize;

  const rows = db
    .prepare(
      `SELECT c.*,
        COALESCE((SELECT SUM(quantite * prix_unitaire) FROM commande_items WHERE commande_id = c.id), 0) as total
       FROM commandes c
       ${where}
       ORDER BY ${orderBy}
       LIMIT ? OFFSET ?`
    )
    .all(...params, pageSize, offset) as CommandeWithTotal[];

  return { rows, total };
}

export function getCommande(id: number): CommandeDetail | undefined {
  const db = getDb();
  const commande = db.prepare(`SELECT * FROM commandes WHERE id = ?`).get(id) as
    | Commande
    | undefined;
  if (!commande) return undefined;

  const items = db
    .prepare(`SELECT * FROM commande_items WHERE commande_id = ?`)
    .all(id) as CommandeItem[];
  const historique = db
    .prepare(`SELECT * FROM commande_historique WHERE commande_id = ? ORDER BY created_at DESC, id DESC`)
    .all(id) as HistoriqueEntry[];
  const total = items.reduce((sum, item) => sum + item.quantite * item.prix_unitaire, 0);

  return { ...commande, items, historique, total };
}

export function listDistinctEnseignes(): string[] {
  const rows = getDb()
    .prepare(`SELECT DISTINCT enseigne FROM commandes ORDER BY enseigne COLLATE NOCASE`)
    .all() as { enseigne: string }[];
  return rows.map((r) => r.enseigne);
}

export function createCommande(input: {
  enseigne: string;
  categorie?: Categorie | null;
  statut: Statut;
  methodePaiement: MethodePaiement;
  numeroCommande?: string | null;
  numeroSuivi?: string | null;
  lienSuivi?: string | null;
  dateCommande: string;
  notes?: string | null;
  items: CommandeItemInput[];
}): number {
  const db = getDb();
  const tx = db.transaction(() => {
    const reference = generateReference(db);
    const result = db
      .prepare(
        `INSERT INTO commandes
          (reference, enseigne, categorie, statut, methode_paiement, numero_commande, numero_suivi, lien_suivi, date_commande, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        reference,
        input.enseigne,
        input.categorie ?? null,
        input.statut,
        input.methodePaiement,
        input.numeroCommande ?? null,
        input.numeroSuivi ?? null,
        input.lienSuivi ?? null,
        input.dateCommande,
        input.notes ?? null
      );
    const commandeId = Number(result.lastInsertRowid);

    const insertItem = db.prepare(
      `INSERT INTO commande_items (commande_id, designation, quantite, prix_unitaire) VALUES (?, ?, ?, ?)`
    );
    for (const item of input.items) {
      insertItem.run(commandeId, item.designation, item.quantite, item.prix_unitaire);
    }

    db.prepare(
      `INSERT INTO commande_historique (commande_id, statut, note) VALUES (?, ?, ?)`
    ).run(commandeId, input.statut, "Commande créée");

    return commandeId;
  });
  return tx();
}

export function updateCommande(
  id: number,
  input: {
    enseigne: string;
    categorie?: Categorie | null;
    methodePaiement: MethodePaiement;
    numeroCommande?: string | null;
    numeroSuivi?: string | null;
    lienSuivi?: string | null;
    dateCommande: string;
    notes?: string | null;
    items: CommandeItemInput[];
  }
): void {
  const db = getDb();
  const tx = db.transaction(() => {
    db.prepare(
      `UPDATE commandes SET enseigne = ?, categorie = ?, methode_paiement = ?, numero_commande = ?,
        numero_suivi = ?, lien_suivi = ?, date_commande = ?, notes = ?, updated_at = datetime('now')
       WHERE id = ?`
    ).run(
      input.enseigne,
      input.categorie ?? null,
      input.methodePaiement,
      input.numeroCommande ?? null,
      input.numeroSuivi ?? null,
      input.lienSuivi ?? null,
      input.dateCommande,
      input.notes ?? null,
      id
    );

    db.prepare(`DELETE FROM commande_items WHERE commande_id = ?`).run(id);
    const insertItem = db.prepare(
      `INSERT INTO commande_items (commande_id, designation, quantite, prix_unitaire) VALUES (?, ?, ?, ?)`
    );
    for (const item of input.items) {
      insertItem.run(id, item.designation, item.quantite, item.prix_unitaire);
    }
  });
  tx();
}

export function changeStatut(id: number, statut: Statut, note?: string | null): void {
  const db = getDb();
  const tx = db.transaction(() => {
    db.prepare(`UPDATE commandes SET statut = ?, updated_at = datetime('now') WHERE id = ?`).run(
      statut,
      id
    );
    db.prepare(
      `INSERT INTO commande_historique (commande_id, statut, note) VALUES (?, ?, ?)`
    ).run(id, statut, note ?? null);
  });
  tx();
}

export function deleteCommande(id: number): void {
  getDb().prepare(`DELETE FROM commandes WHERE id = ?`).run(id);
}

export interface DashboardStats {
  totalDepense: number;
  nbCommandes: number;
  parStatut: { statut: string; n: number }[];
  topEnseignes: { enseigne: string; nb_commandes: number; total: number }[];
  parCategorie: { categorie: string | null; total: number }[];
  recentCommandes: CommandeWithTotal[];
}

export function getStats(): DashboardStats {
  const db = getDb();

  const { total: totalDepense } = db
    .prepare(
      `SELECT COALESCE(SUM(i.quantite * i.prix_unitaire), 0) as total
       FROM commande_items i
       JOIN commandes c ON c.id = i.commande_id
       WHERE c.statut NOT IN ('annulee', 'remboursee')`
    )
    .get() as { total: number };

  const parStatut = db
    .prepare(`SELECT statut, COUNT(*) as n FROM commandes GROUP BY statut`)
    .all() as { statut: string; n: number }[];

  const { n: nbCommandes } = db.prepare(`SELECT COUNT(*) as n FROM commandes`).get() as {
    n: number;
  };

  const topEnseignes = db
    .prepare(
      `SELECT c.enseigne, COUNT(DISTINCT c.id) as nb_commandes,
        COALESCE(SUM(i.quantite * i.prix_unitaire), 0) as total
       FROM commandes c
       LEFT JOIN commande_items i ON i.commande_id = c.id
       GROUP BY c.enseigne
       ORDER BY total DESC
       LIMIT 5`
    )
    .all() as { enseigne: string; nb_commandes: number; total: number }[];

  const parCategorie = db
    .prepare(
      `SELECT c.categorie,
        COALESCE(SUM(i.quantite * i.prix_unitaire), 0) as total
       FROM commandes c
       LEFT JOIN commande_items i ON i.commande_id = c.id
       WHERE c.statut NOT IN ('annulee', 'remboursee')
       GROUP BY c.categorie
       ORDER BY total DESC`
    )
    .all() as { categorie: string | null; total: number }[];

  const recentCommandes = listCommandes({ sort: "date_desc", pageSize: 5 }).rows;

  return { totalDepense, nbCommandes, parStatut, topEnseignes, parCategorie, recentCommandes };
}

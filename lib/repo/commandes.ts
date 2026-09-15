import { getDb } from "@/lib/db";
import type { MethodePaiement, Priorite, Statut } from "@/lib/types";
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
  client_id: number;
  reference: string;
  statut: Statut;
  priorite: Priorite;
  methode_paiement: MethodePaiement;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CommandeWithClient extends Commande {
  client_nom: string;
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
  client_nom: string;
  items: CommandeItem[];
  historique: HistoriqueEntry[];
  total: number;
}

export interface CommandeFilters {
  statut?: string;
  clientId?: number;
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
  if (filters.clientId) {
    clauses.push("c.client_id = ?");
    params.push(filters.clientId);
  }
  if (filters.methodePaiement) {
    clauses.push("c.methode_paiement = ?");
    params.push(filters.methodePaiement);
  }
  if (filters.dateFrom) {
    clauses.push("date(c.created_at) >= date(?)");
    params.push(filters.dateFrom);
  }
  if (filters.dateTo) {
    clauses.push("date(c.created_at) <= date(?)");
    params.push(filters.dateTo);
  }
  if (filters.search) {
    clauses.push("(c.reference LIKE ? OR cl.nom LIKE ?)");
    const like = `%${filters.search}%`;
    params.push(like, like);
  }

  return {
    where: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "",
    params,
  };
}

const SORT_MAP: Record<string, string> = {
  date_desc: "c.created_at DESC",
  date_asc: "c.created_at ASC",
  total_desc: "total DESC",
  total_asc: "total ASC",
};

export function listCommandes(
  filters: CommandeFilters = {}
): { rows: CommandeWithClient[]; total: number } {
  const db = getDb();
  const { where, params } = buildWhere(filters);
  const orderBy = SORT_MAP[filters.sort ?? "date_desc"] ?? SORT_MAP.date_desc;

  const { n: total } = db
    .prepare(
      `SELECT COUNT(*) as n FROM commandes c JOIN clients cl ON cl.id = c.client_id ${where}`
    )
    .get(...params) as { n: number };

  const pageSize = filters.pageSize ?? 25;
  const page = filters.page ?? 1;
  const offset = (page - 1) * pageSize;

  const rows = db
    .prepare(
      `SELECT c.*, cl.nom as client_nom,
        COALESCE((SELECT SUM(quantite * prix_unitaire) FROM commande_items WHERE commande_id = c.id), 0) as total
       FROM commandes c
       JOIN clients cl ON cl.id = c.client_id
       ${where}
       ORDER BY ${orderBy}
       LIMIT ? OFFSET ?`
    )
    .all(...params, pageSize, offset) as CommandeWithClient[];

  return { rows, total };
}

export function getCommande(id: number): CommandeDetail | undefined {
  const db = getDb();
  const commande = db
    .prepare(
      `SELECT c.*, cl.nom as client_nom FROM commandes c JOIN clients cl ON cl.id = c.client_id WHERE c.id = ?`
    )
    .get(id) as (Commande & { client_nom: string }) | undefined;
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

export function listCommandesForClient(clientId: number): CommandeWithClient[] {
  return listCommandes({ clientId, pageSize: 1000, sort: "date_desc" }).rows;
}

export function createCommande(input: {
  clientId: number;
  statut: Statut;
  priorite: Priorite;
  methodePaiement: MethodePaiement;
  notes?: string | null;
  items: CommandeItemInput[];
}): number {
  const db = getDb();
  const tx = db.transaction(() => {
    const reference = generateReference(db);
    const result = db
      .prepare(
        `INSERT INTO commandes (client_id, reference, statut, priorite, methode_paiement, notes)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .run(
        input.clientId,
        reference,
        input.statut,
        input.priorite,
        input.methodePaiement,
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
    clientId: number;
    priorite: Priorite;
    methodePaiement: MethodePaiement;
    notes?: string | null;
    items: CommandeItemInput[];
  }
): void {
  const db = getDb();
  const tx = db.transaction(() => {
    db.prepare(
      `UPDATE commandes SET client_id = ?, priorite = ?, methode_paiement = ?, notes = ?, updated_at = datetime('now')
       WHERE id = ?`
    ).run(input.clientId, input.priorite, input.methodePaiement, input.notes ?? null, id);

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
  totalCA: number;
  nbClients: number;
  nbCommandes: number;
  parStatut: { statut: string; n: number }[];
  topClients: { id: number; nom: string; nb_commandes: number; total: number }[];
  recentCommandes: CommandeWithClient[];
}

export function getStats(): DashboardStats {
  const db = getDb();

  const { total: totalCA } = db
    .prepare(
      `SELECT COALESCE(SUM(i.quantite * i.prix_unitaire), 0) as total
       FROM commande_items i
       JOIN commandes c ON c.id = i.commande_id
       WHERE c.statut != 'annulee'`
    )
    .get() as { total: number };

  const parStatut = db
    .prepare(`SELECT statut, COUNT(*) as n FROM commandes GROUP BY statut`)
    .all() as { statut: string; n: number }[];

  const { n: nbClients } = db.prepare(`SELECT COUNT(*) as n FROM clients`).get() as { n: number };
  const { n: nbCommandes } = db.prepare(`SELECT COUNT(*) as n FROM commandes`).get() as {
    n: number;
  };

  const topClients = db
    .prepare(
      `SELECT cl.id, cl.nom, COUNT(DISTINCT c.id) as nb_commandes,
        COALESCE(SUM(i.quantite * i.prix_unitaire), 0) as total
       FROM clients cl
       JOIN commandes c ON c.client_id = cl.id
       LEFT JOIN commande_items i ON i.commande_id = c.id
       GROUP BY cl.id
       ORDER BY total DESC
       LIMIT 5`
    )
    .all() as { id: number; nom: string; nb_commandes: number; total: number }[];

  const recentCommandes = listCommandes({ sort: "date_desc", pageSize: 5 }).rows;

  return { totalCA, nbClients, nbCommandes, parStatut, topClients, recentCommandes };
}

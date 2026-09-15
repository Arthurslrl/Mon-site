import { getDb } from "@/lib/db";

export interface Client {
  id: number;
  nom: string;
  email: string | null;
  telephone: string | null;
  adresse: string | null;
  notes: string | null;
  created_at: string;
}

export interface ClientInput {
  nom: string;
  email?: string | null;
  telephone?: string | null;
  adresse?: string | null;
  notes?: string | null;
}

export function listClients(search?: string): Client[] {
  const db = getDb();
  if (search) {
    const like = `%${search}%`;
    return db
      .prepare(
        `SELECT * FROM clients
         WHERE nom LIKE ? OR email LIKE ? OR telephone LIKE ?
         ORDER BY nom COLLATE NOCASE`
      )
      .all(like, like, like) as Client[];
  }
  return db.prepare(`SELECT * FROM clients ORDER BY nom COLLATE NOCASE`).all() as Client[];
}

export function getClient(id: number): Client | undefined {
  return getDb().prepare(`SELECT * FROM clients WHERE id = ?`).get(id) as Client | undefined;
}

export function createClient(input: ClientInput): number {
  const result = getDb()
    .prepare(
      `INSERT INTO clients (nom, email, telephone, adresse, notes) VALUES (?, ?, ?, ?, ?)`
    )
    .run(
      input.nom,
      input.email ?? null,
      input.telephone ?? null,
      input.adresse ?? null,
      input.notes ?? null
    );
  return Number(result.lastInsertRowid);
}

export function updateClient(id: number, input: ClientInput): void {
  getDb()
    .prepare(
      `UPDATE clients SET nom = ?, email = ?, telephone = ?, adresse = ?, notes = ? WHERE id = ?`
    )
    .run(
      input.nom,
      input.email ?? null,
      input.telephone ?? null,
      input.adresse ?? null,
      input.notes ?? null,
      id
    );
}

export function deleteClient(id: number): void {
  getDb().prepare(`DELETE FROM clients WHERE id = ?`).run(id);
}

export function countClientCommandes(id: number): number {
  const row = getDb()
    .prepare(`SELECT COUNT(*) as n FROM commandes WHERE client_id = ?`)
    .get(id) as { n: number };
  return row.n;
}

export interface ClientWithStats extends Client {
  nb_commandes: number;
  total_depense: number;
}

export function listClientsWithStats(search?: string): ClientWithStats[] {
  const db = getDb();
  const like = search ? `%${search}%` : null;
  const where = like ? `WHERE cl.nom LIKE ? OR cl.email LIKE ? OR cl.telephone LIKE ?` : "";
  const rows = db
    .prepare(
      `SELECT cl.*,
        COUNT(DISTINCT c.id) as nb_commandes,
        COALESCE(SUM(i.quantite * i.prix_unitaire), 0) as total_depense
       FROM clients cl
       LEFT JOIN commandes c ON c.client_id = cl.id
       LEFT JOIN commande_items i ON i.commande_id = c.id
       ${where}
       GROUP BY cl.id
       ORDER BY cl.nom COLLATE NOCASE`
    )
    .all(...(like ? [like, like, like] : []));
  return rows as ClientWithStats[];
}

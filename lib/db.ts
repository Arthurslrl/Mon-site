import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "commandes.sqlite3");

declare global {
  var __commandesDb: Database.Database | undefined;
}

function seedAdmin(db: Database.Database) {
  const { n } = db.prepare("SELECT COUNT(*) as n FROM admin_users").get() as { n: number };
  if (n > 0) return;

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  const hash = bcrypt.hashSync(password, 10);
  db.prepare("INSERT INTO admin_users (email, password_hash) VALUES (?, ?)").run(
    email.trim().toLowerCase(),
    hash
  );
}

function initSchema(db: Database.Database) {
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS commandes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reference TEXT NOT NULL UNIQUE,
      enseigne TEXT NOT NULL,
      categorie TEXT,
      statut TEXT NOT NULL DEFAULT 'commandee',
      methode_paiement TEXT NOT NULL DEFAULT 'carte',
      numero_commande TEXT,
      numero_suivi TEXT,
      lien_suivi TEXT,
      date_commande TEXT NOT NULL DEFAULT (date('now')),
      notes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS commande_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      commande_id INTEGER NOT NULL REFERENCES commandes(id) ON DELETE CASCADE,
      designation TEXT NOT NULL,
      quantite INTEGER NOT NULL DEFAULT 1,
      prix_unitaire REAL NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS commande_historique (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      commande_id INTEGER NOT NULL REFERENCES commandes(id) ON DELETE CASCADE,
      statut TEXT NOT NULL,
      note TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_commandes_statut ON commandes(statut);
    CREATE INDEX IF NOT EXISTS idx_commandes_enseigne ON commandes(enseigne);
    CREATE INDEX IF NOT EXISTS idx_commandes_date ON commandes(date_commande);
    CREATE INDEX IF NOT EXISTS idx_items_commande ON commande_items(commande_id);
    CREATE INDEX IF NOT EXISTS idx_historique_commande ON commande_historique(commande_id);
  `);

  seedAdmin(db);
}

function createConnection(): Database.Database {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const db = new Database(DB_PATH);
  initSchema(db);
  return db;
}

export function getDb(): Database.Database {
  if (!global.__commandesDb) {
    global.__commandesDb = createConnection();
  }
  return global.__commandesDb;
}

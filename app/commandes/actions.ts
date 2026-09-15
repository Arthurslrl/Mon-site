"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getDb } from "@/lib/db";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
} from "@/lib/auth/session";
import * as commandesRepo from "@/lib/repo/commandes";
import type { CommandeItemInput } from "@/lib/repo/commandes";
import {
  CATEGORIE_VALUES,
  METHODE_PAIEMENT_VALUES,
  STATUT_VALUES,
  type Categorie,
  type MethodePaiement,
  type Statut,
} from "@/lib/types";

export interface LoginState {
  error?: string;
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/commandes");

  if (!email || !password) {
    return { error: "Merci de renseigner ton email et ton mot de passe." };
  }

  const db = getDb();
  const admin = db.prepare("SELECT * FROM admin_users WHERE email = ?").get(email) as
    | { id: number; email: string; password_hash: string }
    | undefined;

  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
    return { error: "Identifiants incorrects." };
  }

  const token = createSessionToken(admin.email);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect(next.startsWith("/commandes") ? next : "/commandes");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/commandes/login");
}

const optionalCategorie = z
  .union([z.enum(CATEGORIE_VALUES), z.literal("")])
  .optional()
  .transform((v) => (v ? (v as Categorie) : null));

const commandeMetaSchema = z.object({
  enseigne: z.string().trim().min(1, "L'enseigne est requise"),
  categorie: optionalCategorie,
  methodePaiement: z.enum(METHODE_PAIEMENT_VALUES),
  numeroCommande: z.string().trim().optional(),
  numeroSuivi: z.string().trim().optional(),
  lienSuivi: z.string().trim().optional(),
  dateCommande: z.string().trim().min(1, "La date est requise"),
  notes: z.string().trim().optional(),
});

const createCommandeSchema = commandeMetaSchema.extend({
  statut: z.enum(STATUT_VALUES),
});

function parseItems(formData: FormData): CommandeItemInput[] {
  const designations = formData.getAll("designation") as string[];
  const quantites = formData.getAll("quantite") as string[];
  const prix = formData.getAll("prix_unitaire") as string[];

  const items: CommandeItemInput[] = [];
  for (let i = 0; i < designations.length; i++) {
    const designation = designations[i]?.trim();
    if (!designation) continue;
    const quantite = Math.max(1, Math.round(Number(quantites[i]) || 1));
    const prixUnitaire = Math.max(0, Number(prix[i]) || 0);
    items.push({ designation, quantite, prix_unitaire: prixUnitaire });
  }
  return items;
}

export async function createCommandeAction(formData: FormData): Promise<void> {
  const meta = createCommandeSchema.parse({
    enseigne: formData.get("enseigne"),
    categorie: formData.get("categorie"),
    statut: formData.get("statut"),
    methodePaiement: formData.get("methodePaiement"),
    numeroCommande: formData.get("numeroCommande"),
    numeroSuivi: formData.get("numeroSuivi"),
    lienSuivi: formData.get("lienSuivi"),
    dateCommande: formData.get("dateCommande"),
    notes: formData.get("notes"),
  });
  const items = parseItems(formData);
  if (items.length === 0) {
    items.push({ designation: "Article", quantite: 1, prix_unitaire: 0 });
  }

  const id = commandesRepo.createCommande({
    enseigne: meta.enseigne,
    categorie: meta.categorie,
    statut: meta.statut as Statut,
    methodePaiement: meta.methodePaiement as MethodePaiement,
    numeroCommande: meta.numeroCommande || null,
    numeroSuivi: meta.numeroSuivi || null,
    lienSuivi: meta.lienSuivi || null,
    dateCommande: meta.dateCommande,
    notes: meta.notes || null,
    items,
  });

  revalidatePath("/commandes/liste");
  revalidatePath("/commandes");
  redirect(`/commandes/liste/${id}`);
}

export async function updateCommandeAction(id: number, formData: FormData): Promise<void> {
  const meta = commandeMetaSchema.parse({
    enseigne: formData.get("enseigne"),
    categorie: formData.get("categorie"),
    methodePaiement: formData.get("methodePaiement"),
    numeroCommande: formData.get("numeroCommande"),
    numeroSuivi: formData.get("numeroSuivi"),
    lienSuivi: formData.get("lienSuivi"),
    dateCommande: formData.get("dateCommande"),
    notes: formData.get("notes"),
  });
  const items = parseItems(formData);
  if (items.length === 0) {
    items.push({ designation: "Article", quantite: 1, prix_unitaire: 0 });
  }

  commandesRepo.updateCommande(id, {
    enseigne: meta.enseigne,
    categorie: meta.categorie,
    methodePaiement: meta.methodePaiement as MethodePaiement,
    numeroCommande: meta.numeroCommande || null,
    numeroSuivi: meta.numeroSuivi || null,
    lienSuivi: meta.lienSuivi || null,
    dateCommande: meta.dateCommande,
    notes: meta.notes || null,
    items,
  });

  revalidatePath("/commandes/liste");
  revalidatePath(`/commandes/liste/${id}`);
  revalidatePath("/commandes");
  redirect(`/commandes/liste/${id}`);
}

const statutChangeSchema = z.object({
  statut: z.enum(STATUT_VALUES),
  note: z.string().trim().optional(),
});

export async function changeStatutAction(id: number, formData: FormData): Promise<void> {
  const parsed = statutChangeSchema.parse({
    statut: formData.get("statut"),
    note: formData.get("note"),
  });
  commandesRepo.changeStatut(id, parsed.statut as Statut, parsed.note || null);
  revalidatePath("/commandes/liste");
  revalidatePath(`/commandes/liste/${id}`);
  revalidatePath("/commandes");
}

export async function deleteCommandeAction(id: number): Promise<void> {
  commandesRepo.deleteCommande(id);
  revalidatePath("/commandes/liste");
  revalidatePath("/commandes");
  redirect("/commandes/liste");
}

export interface ImportState {
  imported?: number;
  errors?: string[];
}

export async function importCommandesAction(
  _prev: ImportState,
  formData: FormData
): Promise<ImportState> {
  const csv = String(formData.get("csv") ?? "").trim();
  if (!csv) {
    return { imported: 0, errors: ["Colle du contenu CSV avant d'importer."] };
  }

  const lines = csv.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) {
    return { imported: 0, errors: ["Aucune ligne détectée."] };
  }

  const header = lines[0].split(";").map((h) => h.trim().toLowerCase());
  const hasHeader = header[0] === "enseigne" && header.includes("montant");
  const rows = hasHeader ? lines.slice(1) : lines;
  const lineOffset = hasHeader ? 2 : 1;

  const errors: string[] = [];
  let imported = 0;

  const statutSet = new Set(STATUT_VALUES as readonly string[]);
  const categorieSet = new Set(CATEGORIE_VALUES as readonly string[]);

  rows.forEach((line, idx) => {
    const lineNumber = idx + lineOffset;
    const cols = line.split(";").map((c) => c.trim());
    const [enseigne, date, montantRaw, statutRaw, numeroCommande, numeroSuivi, lienSuivi, categorieRaw, notes] =
      cols;

    if (!enseigne) {
      errors.push(`Ligne ${lineNumber} : enseigne manquante.`);
      return;
    }
    const montant = Number((montantRaw ?? "").replace(",", "."));
    if (!Number.isFinite(montant) || montant < 0) {
      errors.push(`Ligne ${lineNumber} : montant invalide ("${montantRaw ?? ""}").`);
      return;
    }
    const statut = statutSet.has(statutRaw) ? (statutRaw as Statut) : "commandee";
    const categorie = categorieSet.has(categorieRaw) ? (categorieRaw as Categorie) : null;
    const dateCommande = /^\d{4}-\d{2}-\d{2}$/.test(date ?? "")
      ? date
      : new Date().toISOString().slice(0, 10);

    commandesRepo.createCommande({
      enseigne,
      categorie,
      statut,
      methodePaiement: "carte",
      numeroCommande: numeroCommande || null,
      numeroSuivi: numeroSuivi || null,
      lienSuivi: lienSuivi || null,
      dateCommande,
      notes: notes || null,
      items: [{ designation: `Achat ${enseigne}`, quantite: 1, prix_unitaire: montant }],
    });
    imported++;
  });

  if (imported > 0) {
    revalidatePath("/commandes/liste");
    revalidatePath("/commandes");
  }

  return { imported, errors };
}

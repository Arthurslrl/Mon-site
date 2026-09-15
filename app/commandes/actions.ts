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
import * as clientsRepo from "@/lib/repo/clients";
import * as commandesRepo from "@/lib/repo/commandes";
import type { CommandeItemInput } from "@/lib/repo/commandes";
import {
  METHODE_PAIEMENT_VALUES,
  PRIORITE_VALUES,
  STATUT_VALUES,
  type MethodePaiement,
  type Priorite,
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

const clientSchema = z.object({
  nom: z.string().trim().min(1, "Le nom est requis"),
  email: z.string().trim().email().optional().or(z.literal("")),
  telephone: z.string().trim().optional(),
  adresse: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

function parseClientForm(formData: FormData): clientsRepo.ClientInput {
  const parsed = clientSchema.parse({
    nom: formData.get("nom"),
    email: formData.get("email"),
    telephone: formData.get("telephone"),
    adresse: formData.get("adresse"),
    notes: formData.get("notes"),
  });
  return {
    nom: parsed.nom,
    email: parsed.email || null,
    telephone: parsed.telephone || null,
    adresse: parsed.adresse || null,
    notes: parsed.notes || null,
  };
}

export async function createClientAction(formData: FormData): Promise<void> {
  const input = parseClientForm(formData);
  const id = clientsRepo.createClient(input);
  revalidatePath("/commandes/clients");
  redirect(`/commandes/clients/${id}`);
}

export async function updateClientAction(id: number, formData: FormData): Promise<void> {
  const input = parseClientForm(formData);
  clientsRepo.updateClient(id, input);
  revalidatePath("/commandes/clients");
  revalidatePath(`/commandes/clients/${id}`);
  redirect(`/commandes/clients/${id}`);
}

export async function deleteClientAction(id: number): Promise<void> {
  clientsRepo.deleteClient(id);
  revalidatePath("/commandes/clients");
  redirect("/commandes/clients");
}

const commandeMetaSchema = z.object({
  clientId: z.coerce.number().int().positive(),
  priorite: z.enum(PRIORITE_VALUES),
  methodePaiement: z.enum(METHODE_PAIEMENT_VALUES),
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
    clientId: formData.get("clientId"),
    statut: formData.get("statut"),
    priorite: formData.get("priorite"),
    methodePaiement: formData.get("methodePaiement"),
    notes: formData.get("notes"),
  });
  const items = parseItems(formData);
  if (items.length === 0) {
    items.push({ designation: "Article", quantite: 1, prix_unitaire: 0 });
  }

  const id = commandesRepo.createCommande({
    clientId: meta.clientId,
    statut: meta.statut as Statut,
    priorite: meta.priorite as Priorite,
    methodePaiement: meta.methodePaiement as MethodePaiement,
    notes: meta.notes || null,
    items,
  });

  revalidatePath("/commandes/liste");
  revalidatePath("/commandes");
  revalidatePath(`/commandes/clients/${meta.clientId}`);
  redirect(`/commandes/liste/${id}`);
}

export async function updateCommandeAction(id: number, formData: FormData): Promise<void> {
  const meta = commandeMetaSchema.parse({
    clientId: formData.get("clientId"),
    priorite: formData.get("priorite"),
    methodePaiement: formData.get("methodePaiement"),
    notes: formData.get("notes"),
  });
  const items = parseItems(formData);
  if (items.length === 0) {
    items.push({ designation: "Article", quantite: 1, prix_unitaire: 0 });
  }

  commandesRepo.updateCommande(id, {
    clientId: meta.clientId,
    priorite: meta.priorite as Priorite,
    methodePaiement: meta.methodePaiement as MethodePaiement,
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

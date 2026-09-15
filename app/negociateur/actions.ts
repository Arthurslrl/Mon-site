"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import * as abonnementsRepo from "@/lib/repo/abonnements";
import { CATEGORIE_ABONNEMENT_VALUES, FREQUENCE_VALUES, type CategorieAbonnement, type Frequence } from "@/lib/types-negociateur";

const optionalCategorie = z
  .union([z.enum(CATEGORIE_ABONNEMENT_VALUES), z.literal("")])
  .optional()
  .transform((v) => (v ? (v as CategorieAbonnement) : null));

const abonnementSchema = z.object({
  nom: z.string().trim().min(1, "Le nom est requis"),
  categorie: optionalCategorie,
  montant: z.coerce.number().min(0, "Le montant doit être positif"),
  frequence: z.enum(FREQUENCE_VALUES),
  notes: z.string().trim().optional(),
});

function parseAbonnementForm(formData: FormData) {
  const parsed = abonnementSchema.parse({
    nom: formData.get("nom"),
    categorie: formData.get("categorie"),
    montant: formData.get("montant"),
    frequence: formData.get("frequence"),
    notes: formData.get("notes"),
  });
  return {
    nom: parsed.nom,
    categorie: parsed.categorie,
    montant: parsed.montant,
    frequence: parsed.frequence as Frequence,
    notes: parsed.notes || null,
  };
}

export async function createAbonnementAction(formData: FormData): Promise<void> {
  const input = parseAbonnementForm(formData);
  const id = abonnementsRepo.createAbonnement(input);
  revalidatePath("/negociateur");
  revalidatePath("/negociateur/abonnements");
  redirect(`/negociateur/abonnements/${id}`);
}

export async function updateAbonnementAction(id: number, formData: FormData): Promise<void> {
  const input = parseAbonnementForm(formData);
  abonnementsRepo.updateAbonnement(id, input);
  revalidatePath("/negociateur");
  revalidatePath("/negociateur/abonnements");
  revalidatePath(`/negociateur/abonnements/${id}`);
  redirect(`/negociateur/abonnements/${id}`);
}

export async function deleteAbonnementAction(id: number): Promise<void> {
  abonnementsRepo.deleteAbonnement(id);
  revalidatePath("/negociateur");
  revalidatePath("/negociateur/abonnements");
  redirect("/negociateur/abonnements");
}

export async function lancerNegociationAction(id: number): Promise<void> {
  abonnementsRepo.lancerNegociation(id);
  revalidatePath("/negociateur");
  revalidatePath(`/negociateur/abonnements/${id}`);
}

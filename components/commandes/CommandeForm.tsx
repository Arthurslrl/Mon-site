"use client";

import { useState } from "react";
import { CATEGORIES, ENSEIGNES_SUGGEREES, METHODES_PAIEMENT, STATUTS } from "@/lib/types";

interface ItemRow {
  designation: string;
  quantite: number;
  prixUnitaire: number;
}

export interface CommandeFormInitial {
  enseigne?: string;
  categorie?: string | null;
  statut?: string;
  methodePaiement?: string;
  numeroCommande?: string | null;
  numeroSuivi?: string | null;
  lienSuivi?: string | null;
  dateCommande?: string;
  notes?: string | null;
  items?: ItemRow[];
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function CommandeForm({
  enseignesConnues,
  action,
  initial,
  submitLabel,
  showStatut = false,
}: {
  enseignesConnues: string[];
  action: (formData: FormData) => void | Promise<void>;
  initial?: CommandeFormInitial;
  submitLabel: string;
  showStatut?: boolean;
}) {
  const [items, setItems] = useState<ItemRow[]>(
    initial?.items?.length ? initial.items : [{ designation: "", quantite: 1, prixUnitaire: 0 }]
  );

  const total = items.reduce((sum, item) => sum + item.quantite * item.prixUnitaire, 0);
  const suggestions = Array.from(new Set([...enseignesConnues, ...ENSEIGNES_SUGGEREES])).sort(
    (a, b) => a.localeCompare(b)
  );

  function updateItem(index: number, patch: Partial<ItemRow>) {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  }

  function addItem() {
    setItems((prev) => [...prev, { designation: "", quantite: 1, prixUnitaire: 0 }]);
  }

  function removeItem(index: number) {
    setItems((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  }

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Enseigne *</span>
          <input
            name="enseigne"
            required
            list="enseignes-suggestions"
            defaultValue={initial?.enseigne ?? ""}
            placeholder="Zara, Amazon, Leboncoin..."
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
          <datalist id="enseignes-suggestions">
            {suggestions.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Catégorie</span>
          <select
            name="categorie"
            defaultValue={initial?.categorie ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          >
            <option value="">Non catégorisé</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        {showStatut ? (
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Statut initial</span>
            <select
              name="statut"
              defaultValue={initial?.statut ?? "commandee"}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            >
              {STATUTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Date d&apos;achat *</span>
          <input
            type="date"
            name="dateCommande"
            required
            defaultValue={initial?.dateCommande ?? today()}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Méthode de paiement</span>
          <select
            name="methodePaiement"
            defaultValue={initial?.methodePaiement ?? "carte"}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          >
            {METHODES_PAIEMENT.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">N° de commande</span>
          <input
            name="numeroCommande"
            defaultValue={initial?.numeroCommande ?? ""}
            placeholder="Numéro donné par le site"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">N° de suivi</span>
          <input
            name="numeroSuivi"
            defaultValue={initial?.numeroSuivi ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Lien de suivi</span>
          <input
            type="url"
            name="lienSuivi"
            defaultValue={initial?.lienSuivi ?? ""}
            placeholder="https://..."
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Articles</span>
          <button
            type="button"
            onClick={addItem}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            + Ajouter un article
          </button>
        </div>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_72px_96px_auto] gap-2">
              <input
                name="designation"
                value={item.designation}
                onChange={(e) => updateItem(index, { designation: e.target.value })}
                placeholder="Désignation (ex : Jean slim)"
                required
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
              <input
                name="quantite"
                type="number"
                min={1}
                value={item.quantite}
                onChange={(e) => updateItem(index, { quantite: Number(e.target.value) })}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
              <input
                name="prix_unitaire"
                type="number"
                min={0}
                step="0.01"
                value={item.prixUnitaire}
                onChange={(e) => updateItem(index, { prixUnitaire: Number(e.target.value) })}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                disabled={items.length === 1}
                className="rounded-lg px-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-30"
                aria-label="Supprimer l'article"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <p className="mt-2 text-right text-sm font-semibold text-slate-900">
          Total : {total.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
        </p>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Notes</span>
        <textarea
          name="notes"
          rows={3}
          defaultValue={initial?.notes ?? ""}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </label>

      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        {submitLabel}
      </button>
    </form>
  );
}

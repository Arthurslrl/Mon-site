"use client";

import { useActionState } from "react";
import { importCommandesAction, type ImportState } from "../../actions";

const EXEMPLE = `enseigne;date;montant;statut;numero_commande;numero_suivi;lien_suivi;categorie;notes
Amazon;2026-01-15;49.99;livree;AMZ-123456;1Z999AA;https://track.example.com/1Z999AA;high_tech;Casque audio
Zara;2026-02-03;35.50;expediee;ZR-987654;;;mode;`;

export default function ImportForm() {
  const [state, formAction, pending] = useActionState<ImportState, FormData>(
    importCommandesAction,
    {}
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-900">Format attendu</h2>
        <p className="mt-1 text-sm text-slate-500">
          Colonnes séparées par des points-virgules, une commande par ligne. Seuls{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5">enseigne</code> et{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5">montant</code> sont obligatoires.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-50 p-3 text-xs text-slate-700">
          {EXEMPLE}
        </pre>
      </div>

      <form action={formAction} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Contenu CSV</span>
          <textarea
            name="csv"
            required
            rows={10}
            placeholder={EXEMPLE}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs focus:border-indigo-500 focus:outline-none"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
        >
          {pending ? "Import en cours..." : "Importer"}
        </button>

        {state.imported !== undefined ? (
          <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
            {state.imported} commande{state.imported > 1 ? "s" : ""} importée
            {state.imported > 1 ? "s" : ""}.
          </div>
        ) : null}

        {state.errors && state.errors.length > 0 ? (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            <p className="font-medium">Lignes ignorées :</p>
            <ul className="mt-1 list-disc pl-5">
              {state.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </form>
    </div>
  );
}

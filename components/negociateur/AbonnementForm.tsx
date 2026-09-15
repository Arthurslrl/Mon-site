import type { Abonnement } from "@/lib/repo/abonnements";
import { CATEGORIES_ABONNEMENT, FREQUENCES } from "@/lib/types-negociateur";

export default function AbonnementForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  initial?: Partial<Abonnement>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Nom *</span>
        <input
          name="nom"
          required
          defaultValue={initial?.nom ?? ""}
          placeholder="Netflix, Free Mobile, Basic Fit..."
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Catégorie</span>
          <select
            name="categorie"
            defaultValue={initial?.categorie ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          >
            <option value="">Non catégorisé</option>
            {CATEGORIES_ABONNEMENT.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Fréquence</span>
          <select
            name="frequence"
            defaultValue={initial?.frequence ?? "mensuel"}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          >
            {FREQUENCES.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Montant (€) *</span>
          <input
            type="number"
            name="montant"
            required
            min={0}
            step="0.01"
            defaultValue={initial?.montant ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>
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

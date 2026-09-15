import type { Client } from "@/lib/repo/clients";

export default function ClientForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  initial?: Partial<Client>;
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
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            name="email"
            defaultValue={initial?.email ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Téléphone</span>
          <input
            name="telephone"
            defaultValue={initial?.telephone ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Adresse</span>
        <input
          name="adresse"
          defaultValue={initial?.adresse ?? ""}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </label>

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

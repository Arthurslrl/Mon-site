import Link from "next/link";
import { listCommandes } from "@/lib/repo/commandes";
import { listClients } from "@/lib/repo/clients";
import { METHODES_PAIEMENT, STATUTS } from "@/lib/types";
import StatutBadge from "@/components/commandes/StatutBadge";
import PrioriteBadge from "@/components/commandes/PrioriteBadge";

function formatEuros(value: number): string {
  return value.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function formatDate(value: string): string {
  return new Date(value.replace(" ", "T") + "Z").toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const PAGE_SIZE = 25;

type SearchParams = {
  statut?: string;
  clientId?: string;
  methodePaiement?: string;
  q?: string;
  from?: string;
  to?: string;
  sort?: string;
  page?: string;
};

export default async function ListeCommandesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);

  const filters = {
    statut: sp.statut || undefined,
    clientId: sp.clientId ? Number(sp.clientId) : undefined,
    methodePaiement: sp.methodePaiement || undefined,
    search: sp.q || undefined,
    dateFrom: sp.from || undefined,
    dateTo: sp.to || undefined,
    sort: (sp.sort as "date_desc" | "date_asc" | "total_desc" | "total_asc") || "date_desc",
    page,
    pageSize: PAGE_SIZE,
  };

  const { rows, total } = listCommandes(filters);
  const clients = listClients();
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const exportQuery = new URLSearchParams();
  if (filters.statut) exportQuery.set("statut", filters.statut);
  if (filters.clientId) exportQuery.set("clientId", String(filters.clientId));
  if (filters.methodePaiement) exportQuery.set("methodePaiement", filters.methodePaiement);
  if (filters.search) exportQuery.set("q", filters.search);
  if (filters.dateFrom) exportQuery.set("from", filters.dateFrom);
  if (filters.dateTo) exportQuery.set("to", filters.dateTo);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Commandes</h1>
          <p className="mt-1 text-sm text-slate-500">{total} commande(s)</p>
        </div>
        <div className="flex gap-2">
          <a
            href={`/commandes/api/export?${exportQuery.toString()}`}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Exporter en CSV
          </a>
          <Link
            href="/commandes/liste/nouvelle"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            + Nouvelle commande
          </Link>
        </div>
      </div>

      <form className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="search"
          name="q"
          defaultValue={sp.q ?? ""}
          placeholder="Référence ou client..."
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
        <select
          name="statut"
          defaultValue={sp.statut ?? ""}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        >
          <option value="">Tous les statuts</option>
          {STATUTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <select
          name="clientId"
          defaultValue={sp.clientId ?? ""}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        >
          <option value="">Tous les clients</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nom}
            </option>
          ))}
        </select>
        <select
          name="methodePaiement"
          defaultValue={sp.methodePaiement ?? ""}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        >
          <option value="">Tous les paiements</option>
          {METHODES_PAIEMENT.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <label className="text-sm text-slate-600">
          Du
          <input
            type="date"
            name="from"
            defaultValue={sp.from ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>
        <label className="text-sm text-slate-600">
          Au
          <input
            type="date"
            name="to"
            defaultValue={sp.to ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>
        <select
          name="sort"
          defaultValue={sp.sort ?? "date_desc"}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        >
          <option value="date_desc">Plus récentes</option>
          <option value="date_asc">Plus anciennes</option>
          <option value="total_desc">Montant décroissant</option>
          <option value="total_asc">Montant croissant</option>
        </select>
        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Filtrer
          </button>
          <Link
            href="/commandes/liste"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Réinitialiser
          </Link>
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Référence</th>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 font-medium">Priorité</th>
              <th className="px-4 py-3 font-medium">Paiement</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-slate-400">
                  Aucune commande ne correspond aux filtres.
                </td>
              </tr>
            ) : (
              rows.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/commandes/liste/${c.id}`}
                      className="font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      {c.reference}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/commandes/clients/${c.client_id}`} className="hover:text-indigo-600">
                      {c.client_nom}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <StatutBadge statut={c.statut} />
                  </td>
                  <td className="px-4 py-3">
                    <PrioriteBadge priorite={c.priorite} />
                  </td>
                  <td className="px-4 py-3 text-slate-500">{c.methode_paiement}</td>
                  <td className="px-4 py-3 text-slate-500">{formatDate(c.created_at)}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatEuros(c.total)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-2 text-sm">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const params = new URLSearchParams(exportQuery);
            if (filters.sort) params.set("sort", filters.sort);
            params.set("page", String(p));
            return (
              <Link
                key={p}
                href={`/commandes/liste?${params.toString()}`}
                className={`rounded-lg px-3 py-1.5 ${
                  p === page ? "bg-indigo-600 text-white" : "border border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {p}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

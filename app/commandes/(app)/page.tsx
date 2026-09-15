import Link from "next/link";
import { getStats } from "@/lib/repo/commandes";
import { categorieLabel } from "@/lib/types";
import StatutBadge from "@/components/commandes/StatutBadge";

function formatEuros(value: number): string {
  return value.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function formatDate(value: string): string {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const stats = getStats();
  const maxParStatut = Math.max(1, ...stats.parStatut.map((s) => s.n));
  const maxParCategorie = Math.max(1, ...stats.parCategorie.map((c) => c.total));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
        <p className="mt-1 text-sm text-slate-500">
          Toutes tes commandes en ligne, centralisées au même endroit.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total dépensé</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{formatEuros(stats.totalDepense)}</p>
          <p className="mt-1 text-xs text-slate-400">Hors commandes annulées / remboursées</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Commandes</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{stats.nbCommandes}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">Répartition par statut</h2>
          <div className="mt-4 space-y-3">
            {stats.parStatut.length === 0 ? (
              <p className="text-sm text-slate-400">Aucune commande pour le moment.</p>
            ) : (
              stats.parStatut.map((s) => (
                <div key={s.statut} className="flex items-center gap-3">
                  <div className="w-32 shrink-0">
                    <StatutBadge statut={s.statut} />
                  </div>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{ width: `${(s.n / maxParStatut) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-sm font-medium text-slate-600">{s.n}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">Top enseignes</h2>
          <div className="mt-4 space-y-3">
            {stats.topEnseignes.length === 0 ? (
              <p className="text-sm text-slate-400">Aucun achat pour le moment.</p>
            ) : (
              stats.topEnseignes.map((e) => (
                <Link
                  key={e.enseigne}
                  href={`/commandes/liste?enseigne=${encodeURIComponent(e.enseigne)}`}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-50"
                >
                  <span className="text-sm font-medium text-slate-800">{e.enseigne}</span>
                  <span className="text-sm text-slate-500">
                    {e.nb_commandes} cde{e.nb_commandes > 1 ? "s" : ""} · {formatEuros(e.total)}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Dépenses par catégorie</h2>
        <div className="mt-4 space-y-3">
          {stats.parCategorie.length === 0 ? (
            <p className="text-sm text-slate-400">Aucune dépense pour le moment.</p>
          ) : (
            stats.parCategorie.map((c) => (
              <div key={c.categorie ?? "none"} className="flex items-center gap-3">
                <div className="w-40 shrink-0 truncate text-sm text-slate-700">
                  {categorieLabel(c.categorie)}
                </div>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-cyan-500"
                    style={{ width: `${(c.total / maxParCategorie) * 100}%` }}
                  />
                </div>
                <span className="w-20 text-right text-sm font-medium text-slate-600">
                  {formatEuros(c.total)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Dernières commandes</h2>
          <Link href="/commandes/liste" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            Voir tout
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="pb-2 font-medium">Référence</th>
                <th className="pb-2 font-medium">Enseigne</th>
                <th className="pb-2 font-medium">Statut</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.recentCommandes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-slate-400">
                    Aucune commande pour le moment.
                  </td>
                </tr>
              ) : (
                stats.recentCommandes.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="py-2">
                      <Link href={`/commandes/liste/${c.id}`} className="font-medium text-indigo-600 hover:text-indigo-700">
                        {c.reference}
                      </Link>
                    </td>
                    <td className="py-2">{c.enseigne}</td>
                    <td className="py-2">
                      <StatutBadge statut={c.statut} />
                    </td>
                    <td className="py-2 text-slate-500">{formatDate(c.date_commande)}</td>
                    <td className="py-2 text-right font-medium">{formatEuros(c.total)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href="/commandes/liste/nouvelle"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          + Nouvelle commande
        </Link>
        <Link
          href="/commandes/import"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          Importer un CSV
        </Link>
      </div>
    </div>
  );
}

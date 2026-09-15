import Link from "next/link";
import { getNegociateurStats, listAbonnements } from "@/lib/repo/abonnements";
import { categorieAbonnementLabel, montantMensuel } from "@/lib/types-negociateur";
import StatutAbonnementBadge from "@/components/negociateur/StatutAbonnementBadge";

function formatEuros(value: number): string {
  return value.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

export default function NegociateurDashboardPage() {
  const stats = getNegociateurStats();
  const abonnements = listAbonnements();
  const maxParCategorie = Math.max(1, ...stats.parCategorie.map((c) => c.total));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
        <p className="mt-1 text-sm text-slate-500">
          Tous tes abonnements, et une IA qui négocie à ta place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total mensuel</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{formatEuros(stats.totalMensuel)}</p>
          <p className="mt-1 text-xs text-slate-400">{stats.nbAbonnements} abonnement(s)</p>
        </div>
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
          <p className="text-sm text-green-700">Économies réalisées</p>
          <p className="mt-1 text-2xl font-bold text-green-800">
            {formatEuros(stats.economieRealisee)}/mois
          </p>
        </div>
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
          <p className="text-sm text-indigo-700">Économies potentielles estimées</p>
          <p className="mt-1 text-2xl font-bold text-indigo-800">
            {formatEuros(stats.economiePotentielle)}/mois
          </p>
          <p className="mt-1 text-xs text-indigo-400">Sur les abonnements jamais négociés</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Dépenses par catégorie</h2>
        <div className="mt-4 space-y-3">
          {stats.parCategorie.length === 0 ? (
            <p className="text-sm text-slate-400">Aucun abonnement pour le moment.</p>
          ) : (
            stats.parCategorie.map((c) => (
              <div key={c.categorie ?? "none"} className="flex items-center gap-3">
                <div className="w-40 shrink-0 truncate text-sm text-slate-700">
                  {categorieAbonnementLabel(c.categorie)}
                </div>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-500"
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
          <h2 className="text-sm font-semibold text-slate-900">Mes abonnements</h2>
          <Link
            href="/negociateur/abonnements"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Voir tout
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="pb-2 font-medium">Nom</th>
                <th className="pb-2 font-medium">Catégorie</th>
                <th className="pb-2 font-medium">Statut</th>
                <th className="pb-2 text-right font-medium">Montant mensuel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {abonnements.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 text-slate-400">
                    Aucun abonnement pour le moment.
                  </td>
                </tr>
              ) : (
                abonnements.slice(0, 8).map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="py-2">
                      <Link
                        href={`/negociateur/abonnements/${a.id}`}
                        className="font-medium text-indigo-600 hover:text-indigo-700"
                      >
                        {a.nom}
                      </Link>
                    </td>
                    <td className="py-2 text-slate-500">{categorieAbonnementLabel(a.categorie)}</td>
                    <td className="py-2">
                      <StatutAbonnementBadge statut={a.statut} />
                    </td>
                    <td className="py-2 text-right font-medium">
                      {formatEuros(montantMensuel(a.montant, a.frequence))}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Link
        href="/negociateur/abonnements/nouveau"
        className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        + Ajouter un abonnement
      </Link>
    </div>
  );
}

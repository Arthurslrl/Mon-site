import Link from "next/link";
import { listAbonnements } from "@/lib/repo/abonnements";
import { categorieAbonnementLabel, montantMensuel } from "@/lib/types-negociateur";
import StatutAbonnementBadge from "@/components/negociateur/StatutAbonnementBadge";

function formatEuros(value: number): string {
  return value.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

export default function AbonnementsPage() {
  const abonnements = listAbonnements();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mes abonnements</h1>
          <p className="mt-1 text-sm text-slate-500">{abonnements.length} abonnement(s)</p>
        </div>
        <Link
          href="/negociateur/abonnements/nouveau"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          + Nouvel abonnement
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Nom</th>
              <th className="px-4 py-3 font-medium">Catégorie</th>
              <th className="px-4 py-3 font-medium">Fréquence</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 text-right font-medium">Montant mensuel</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {abonnements.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                  Aucun abonnement pour le moment.
                </td>
              </tr>
            ) : (
              abonnements.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/negociateur/abonnements/${a.id}`}
                      className="font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      {a.nom}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{categorieAbonnementLabel(a.categorie)}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {a.frequence === "annuel" ? "Annuel" : "Mensuel"}
                  </td>
                  <td className="px-4 py-3">
                    <StatutAbonnementBadge statut={a.statut} />
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {formatEuros(montantMensuel(a.montant, a.frequence))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

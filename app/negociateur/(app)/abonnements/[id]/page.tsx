import Link from "next/link";
import { notFound } from "next/navigation";
import { getAbonnement, listNegociations } from "@/lib/repo/abonnements";
import { categorieAbonnementLabel, montantMensuel } from "@/lib/types-negociateur";
import StatutAbonnementBadge from "@/components/negociateur/StatutAbonnementBadge";
import NegocierButton from "@/components/negociateur/NegocierButton";
import TranscriptReveal from "@/components/negociateur/TranscriptReveal";
import { deleteAbonnementAction, lancerNegociationAction } from "../../../actions";

function formatEuros(value: number): string {
  return value.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function formatDateTime(value: string): string {
  return new Date(value.replace(" ", "T") + "Z").toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AbonnementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const abonnementId = Number(id);
  const abonnement = getAbonnement(abonnementId);
  if (!abonnement) notFound();

  const negociations = listNegociations(abonnementId);
  const derniere = negociations[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{abonnement.nom}</h1>
          <p className="mt-1 text-sm text-slate-500">{categorieAbonnementLabel(abonnement.categorie)}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/negociateur/abonnements/${abonnement.id}/modifier`}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Modifier
          </Link>
          <form action={deleteAbonnementAction.bind(null, abonnement.id)}>
            <button
              type="submit"
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Supprimer
            </button>
          </form>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Statut</p>
          <div className="mt-2">
            <StatutAbonnementBadge statut={abonnement.statut} />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Fréquence</p>
          <p className="mt-2 font-medium text-slate-900">
            {abonnement.frequence === "annuel" ? "Annuel" : "Mensuel"}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Montant</p>
          <p className="mt-2 font-bold text-slate-900">
            {formatEuros(abonnement.montant)}{" "}
            <span className="text-xs font-normal text-slate-400">
              ({formatEuros(montantMensuel(abonnement.montant, abonnement.frequence))}/mois)
            </span>
          </p>
        </div>
      </div>

      {abonnement.notes ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-900">Notes</p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{abonnement.notes}</p>
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-900">Négociation IA</h2>
          <NegocierButton action={lancerNegociationAction.bind(null, abonnement.id)} />
        </div>

        {derniere ? (
          <div className="mt-4 rounded-lg bg-slate-50 p-4">
            <TranscriptReveal key={derniere.id} lines={derniere.transcript} negociationId={derniere.id} />
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-400">
            Aucune négociation lancée pour cet abonnement.
          </p>
        )}
      </div>

      {negociations.length > 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">Historique des négociations</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Résultat</th>
                  <th className="pb-2 text-right font-medium">Ancien montant</th>
                  <th className="pb-2 text-right font-medium">Nouveau montant</th>
                  <th className="pb-2 text-right font-medium">Économie</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {negociations.map((n) => (
                  <tr key={n.id}>
                    <td className="py-2 text-slate-500">{formatDateTime(n.created_at)}</td>
                    <td className="py-2">
                      {n.statut === "reussie" ? (
                        <span className="text-green-700">Réussie</span>
                      ) : (
                        <span className="text-slate-500">Échouée</span>
                      )}
                    </td>
                    <td className="py-2 text-right">{formatEuros(n.ancien_montant)}</td>
                    <td className="py-2 text-right">
                      {n.nouveau_montant !== null ? formatEuros(n.nouveau_montant) : "—"}
                    </td>
                    <td className="py-2 text-right font-medium text-green-700">
                      {n.economie_mensuelle > 0 ? `+${formatEuros(n.economie_mensuelle)}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}

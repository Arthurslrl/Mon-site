import Link from "next/link";
import { notFound } from "next/navigation";
import { getCommande } from "@/lib/repo/commandes";
import { STATUTS, categorieLabel, methodePaiementLabel } from "@/lib/types";
import StatutBadge from "@/components/commandes/StatutBadge";
import { changeStatutAction, deleteCommandeAction } from "../../../actions";

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

function formatDateTime(value: string): string {
  return new Date(value.replace(" ", "T") + "Z").toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function CommandeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const commande = getCommande(Number(id));
  if (!commande) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{commande.reference}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {commande.enseigne} · Achetée le {formatDate(commande.date_commande)}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/commandes/liste/${commande.id}/modifier`}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Modifier
          </Link>
          <form action={deleteCommandeAction.bind(null, commande.id)}>
            <button
              type="submit"
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Supprimer
            </button>
          </form>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Statut</p>
          <div className="mt-2">
            <StatutBadge statut={commande.statut} />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Catégorie</p>
          <p className="mt-2 font-medium text-slate-900">{categorieLabel(commande.categorie)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Paiement</p>
          <p className="mt-2 font-medium text-slate-900">
            {methodePaiementLabel(commande.methode_paiement)}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total</p>
          <p className="mt-2 font-bold text-slate-900">{formatEuros(commande.total)}</p>
        </div>
      </div>

      {(commande.numero_commande || commande.numero_suivi || commande.lien_suivi) && (
        <div className="grid gap-4 sm:grid-cols-3">
          {commande.numero_commande ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">N° de commande</p>
              <p className="mt-1 font-medium text-slate-900">{commande.numero_commande}</p>
            </div>
          ) : null}
          {commande.numero_suivi ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">N° de suivi</p>
              <p className="mt-1 font-medium text-slate-900">{commande.numero_suivi}</p>
            </div>
          ) : null}
          {commande.lien_suivi ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Suivi du colis</p>
              <a
                href={commande.lien_suivi}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block font-medium text-indigo-600 hover:text-indigo-700"
              >
                Suivre le colis →
              </a>
            </div>
          ) : null}
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Articles</h2>
        <table className="mt-4 w-full text-left text-sm">
          <thead>
            <tr className="text-slate-500">
              <th className="pb-2 font-medium">Désignation</th>
              <th className="pb-2 text-right font-medium">Qté</th>
              <th className="pb-2 text-right font-medium">Prix unitaire</th>
              <th className="pb-2 text-right font-medium">Sous-total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {commande.items.map((item) => (
              <tr key={item.id}>
                <td className="py-2">{item.designation}</td>
                <td className="py-2 text-right">{item.quantite}</td>
                <td className="py-2 text-right">{formatEuros(item.prix_unitaire)}</td>
                <td className="py-2 text-right font-medium">
                  {formatEuros(item.quantite * item.prix_unitaire)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {commande.notes ? (
          <p className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
            {commande.notes}
          </p>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">Changer le statut</h2>
          <form action={changeStatutAction.bind(null, commande.id)} className="mt-4 space-y-3">
            <select
              name="statut"
              defaultValue={commande.statut}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            >
              {STATUTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <input
              name="note"
              placeholder="Note (optionnel)"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Mettre à jour
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">Historique</h2>
          <ol className="mt-4 space-y-3">
            {commande.historique.map((h) => (
              <li key={h.id} className="border-l-2 border-slate-200 pl-3">
                <div className="flex items-center gap-2">
                  <StatutBadge statut={h.statut} />
                  <span className="text-xs text-slate-400">{formatDateTime(h.created_at)}</span>
                </div>
                {h.note ? <p className="mt-1 text-sm text-slate-600">{h.note}</p> : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

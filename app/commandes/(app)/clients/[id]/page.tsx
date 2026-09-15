import Link from "next/link";
import { notFound } from "next/navigation";
import { getClient } from "@/lib/repo/clients";
import { listCommandesForClient } from "@/lib/repo/commandes";
import StatutBadge from "@/components/commandes/StatutBadge";
import { deleteClientAction } from "../../../actions";

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

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const clientId = Number(id);
  const client = getClient(clientId);
  if (!client) notFound();

  const commandes = listCommandesForClient(clientId);
  const totalDepense = commandes.reduce((sum, c) => sum + c.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{client.nom}</h1>
          <p className="mt-1 text-sm text-slate-500">
            Client depuis le {formatDate(client.created_at)}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/commandes/liste/nouvelle?clientId=${client.id}`}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            + Nouvelle commande
          </Link>
          <Link
            href={`/commandes/clients/${client.id}/modifier`}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Modifier
          </Link>
          <form action={deleteClientAction.bind(null, client.id)}>
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
          <p className="text-sm text-slate-500">Email</p>
          <p className="mt-1 font-medium text-slate-900">{client.email || "—"}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Téléphone</p>
          <p className="mt-1 font-medium text-slate-900">{client.telephone || "—"}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Adresse</p>
          <p className="mt-1 font-medium text-slate-900">{client.adresse || "—"}</p>
        </div>
      </div>

      {client.notes ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-900">Notes</p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{client.notes}</p>
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">
            Commandes centralisées ({commandes.length})
          </h2>
          <p className="text-sm text-slate-500">Total : {formatEuros(totalDepense)}</p>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="pb-2 font-medium">Référence</th>
                <th className="pb-2 font-medium">Statut</th>
                <th className="pb-2 font-medium">Paiement</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {commandes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-slate-400">
                    Aucune commande pour ce client.
                  </td>
                </tr>
              ) : (
                commandes.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="py-2">
                      <Link
                        href={`/commandes/liste/${c.id}`}
                        className="font-medium text-indigo-600 hover:text-indigo-700"
                      >
                        {c.reference}
                      </Link>
                    </td>
                    <td className="py-2">
                      <StatutBadge statut={c.statut} />
                    </td>
                    <td className="py-2 text-slate-500">{c.methode_paiement}</td>
                    <td className="py-2 text-slate-500">{formatDate(c.created_at)}</td>
                    <td className="py-2 text-right font-medium">{formatEuros(c.total)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

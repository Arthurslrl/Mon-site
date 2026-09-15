import CommandeForm from "@/components/commandes/CommandeForm";
import { listClients } from "@/lib/repo/clients";
import { createCommandeAction } from "../../../actions";

export default async function NouvelleCommandePage({
  searchParams,
}: {
  searchParams: Promise<{ clientId?: string }>;
}) {
  const { clientId } = await searchParams;
  const clients = listClients();

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Nouvelle commande</h1>
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <CommandeForm
          clients={clients}
          action={createCommandeAction}
          initial={clientId ? { clientId: Number(clientId) } : undefined}
          submitLabel="Créer la commande"
          showStatut
        />
      </div>
    </div>
  );
}

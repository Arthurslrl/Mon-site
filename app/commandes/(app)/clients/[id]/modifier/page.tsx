import { notFound } from "next/navigation";
import ClientForm from "@/components/commandes/ClientForm";
import { getClient } from "@/lib/repo/clients";
import { updateClientAction } from "../../../../actions";

export default async function ModifierClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = getClient(Number(id));
  if (!client) notFound();

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Modifier {client.nom}</h1>
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <ClientForm
          action={updateClientAction.bind(null, client.id)}
          initial={client}
          submitLabel="Enregistrer"
        />
      </div>
    </div>
  );
}

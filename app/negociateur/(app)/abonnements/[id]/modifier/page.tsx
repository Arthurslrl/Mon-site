import { notFound } from "next/navigation";
import AbonnementForm from "@/components/negociateur/AbonnementForm";
import { getAbonnement } from "@/lib/repo/abonnements";
import { updateAbonnementAction } from "../../../../actions";

export default async function ModifierAbonnementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const abonnement = getAbonnement(Number(id));
  if (!abonnement) notFound();

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Modifier {abonnement.nom}</h1>
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <AbonnementForm
          action={updateAbonnementAction.bind(null, abonnement.id)}
          initial={abonnement}
          submitLabel="Enregistrer"
        />
      </div>
    </div>
  );
}

import CommandeForm from "@/components/commandes/CommandeForm";
import { listDistinctEnseignes } from "@/lib/repo/commandes";
import { createCommandeAction } from "../../../actions";

export default function NouvelleCommandePage() {
  const enseignesConnues = listDistinctEnseignes();

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Nouvelle commande</h1>
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <CommandeForm
          enseignesConnues={enseignesConnues}
          action={createCommandeAction}
          submitLabel="Créer la commande"
          showStatut
        />
      </div>
    </div>
  );
}

import ClientForm from "@/components/commandes/ClientForm";
import { createClientAction } from "../../../actions";

export default function NouveauClientPage() {
  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Nouveau client</h1>
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <ClientForm action={createClientAction} submitLabel="Créer le client" />
      </div>
    </div>
  );
}

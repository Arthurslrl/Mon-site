import AbonnementForm from "@/components/negociateur/AbonnementForm";
import { createAbonnementAction } from "../../../actions";

export default function NouvelAbonnementPage() {
  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Nouvel abonnement</h1>
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <AbonnementForm action={createAbonnementAction} submitLabel="Ajouter" />
      </div>
    </div>
  );
}

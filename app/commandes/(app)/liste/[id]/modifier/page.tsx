import { notFound } from "next/navigation";
import CommandeForm from "@/components/commandes/CommandeForm";
import { getCommande, listDistinctEnseignes } from "@/lib/repo/commandes";
import { updateCommandeAction } from "../../../../actions";

export default async function ModifierCommandePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const commande = getCommande(Number(id));
  if (!commande) notFound();

  const enseignesConnues = listDistinctEnseignes();

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Modifier {commande.reference}</h1>
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <CommandeForm
          enseignesConnues={enseignesConnues}
          action={updateCommandeAction.bind(null, commande.id)}
          initial={{
            enseigne: commande.enseigne,
            categorie: commande.categorie,
            methodePaiement: commande.methode_paiement,
            numeroCommande: commande.numero_commande,
            numeroSuivi: commande.numero_suivi,
            lienSuivi: commande.lien_suivi,
            dateCommande: commande.date_commande,
            notes: commande.notes,
            items: commande.items.map((i) => ({
              designation: i.designation,
              quantite: i.quantite,
              prixUnitaire: i.prix_unitaire,
            })),
          }}
          submitLabel="Enregistrer"
        />
      </div>
      <p className="text-sm text-slate-500">
        Le statut se change depuis la fiche de la commande (avec historique).
      </p>
    </div>
  );
}

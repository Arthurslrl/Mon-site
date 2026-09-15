// Simule le déroulé d'une négociation menée par un agent IA.
// Aucune communication réelle n'a lieu : c'est une démonstration du concept,
// utile pour visualiser le produit avant d'investir dans une vraie intégration
// (agent vocal + téléphonie + accord du fournisseur).

export interface NegociationResult {
  statut: "reussie" | "echouee";
  nouveauMontant: number | null;
  economieMensuelle: number;
  transcript: string[];
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function simulerNegociation(nom: string, montantActuel: number): NegociationResult {
  const transcript: string[] = [
    `Connexion au service client de ${nom}...`,
    `Analyse de l'historique d'abonnement et des offres concurrentes...`,
    `Ouverture de la négociation : tarif actuel ${montantActuel.toFixed(2)} €.`,
  ];

  // ~75% de chances d'obtenir une réduction, sinon échec (ou déjà au meilleur prix).
  const reussite = Math.random() < 0.75;

  if (reussite) {
    const pourcentageReduction = randomBetween(0.08, 0.3);
    const nouveauMontant = Math.round(montantActuel * (1 - pourcentageReduction) * 100) / 100;
    const economie = Math.round((montantActuel - nouveauMontant) * 100) / 100;

    transcript.push(
      `Le conseiller propose un geste commercial de ${Math.round(pourcentageReduction * 100)} %.`,
      `Nouveau tarif accepté : ${nouveauMontant.toFixed(2)} € / mois.`,
      `Négociation réussie — économie de ${economie.toFixed(2)} € par mois.`
    );

    return { statut: "reussie", nouveauMontant, economieMensuelle: economie, transcript };
  }

  transcript.push(
    `Le service indique que ${montantActuel.toFixed(2)} € correspond déjà au tarif le plus bas disponible.`,
    `Aucune réduction possible pour le moment.`
  );

  return { statut: "echouee", nouveauMontant: null, economieMensuelle: 0, transcript };
}

# mon-site

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages

- `/` — Pizzeria Loulou (Valras-Plage)
- `/flow` — Flow SaaS landing page
- `/commandes` — Centrale Commandes : suivi centralisé de tes commandes en ligne (voir ci-dessous)
- `/negociateur` — Négociateur d'abonnements : suivi de tes abonnements + négociation par IA (démo, voir ci-dessous). Utilise le même compte que `/commandes`.

## Centrale Commandes (`/commandes`)

Application personnelle protégée par mot de passe permettant de centraliser
toutes tes commandes passées en ligne, chez n'importe quelle enseigne (Amazon,
Zara, Fnac, Leboncoin, etc.) :

- Tableau de bord (total dépensé, répartition par statut, top enseignes,
  dépenses par catégorie)
- Commandes avec articles multiples, enseigne, catégorie, méthode de
  paiement, n° de commande, n° et lien de suivi colis, notes, et historique
  des changements de statut (commandée → expédiée → livrée → retournée...)
- Recherche, filtres (statut, enseigne, catégorie, période) et tri
- Import en masse depuis un CSV collé, et export CSV des commandes filtrées

### Configuration

1. Copie `.env.example` en `.env.local` et renseigne :
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — identifiants du compte admin, utilisés
     uniquement pour créer ce compte au tout premier démarrage.
   - `SESSION_SECRET` — chaîne aléatoire longue pour signer le cookie de
     session (ex : `openssl rand -hex 32`).
2. `npm run dev` puis va sur `/commandes` pour te connecter.

Les données (commandes) sont stockées dans une base SQLite locale
(`data/commandes.sqlite3`, ignorée par git). Pour changer le mot de passe
admin après le premier démarrage, supprime ce fichier et relance le serveur
(ou modifie directement la ligne dans la table `admin_users`).

## Négociateur d'abonnements (`/negociateur`)

Prototype qui recense tes abonnements (streaming, télécom, assurance, sport...)
et simule une négociation automatisée pour faire baisser la facture :

- Tableau de bord (total mensuel, économies déjà réalisées, économies
  potentielles estimées sur les abonnements jamais négociés)
- Un abonnement = nom, catégorie, montant, fréquence (mensuel/annuel)
- Bouton « Lancer la négociation IA » : génère un transcript étape par étape
  et un résultat (réduction obtenue ou refus), avec historique par abonnement

**Important : la négociation est simulée**, pas réelle — aucun appel n'est
passé et aucune banque n'est connectée. C'est une démonstration du concept
pour valider l'idée avant d'investir dans une vraie intégration. Pour la
rendre réelle, il faudrait a minima :

- Un agent vocal IA capable de tenir une conversation (ex : un LLM branché à
  un service de téléphonie comme Twilio, avec synthèse/reconnaissance vocale)
- Une détection automatique des abonnements (agrégateur bancaire type Plaid /
  Budget Insight) plutôt qu'une saisie manuelle
- Un cadre légal clair (consentement explicite de l'utilisateur pour agir en
  son nom, gestion des cas où le service détecte un bot, etc.)

Utilise le même compte admin et la même base SQLite que `/commandes` (voir
sa configuration ci-dessus) : rien à configurer en plus.

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use [Vercel](https://vercel.com/new).

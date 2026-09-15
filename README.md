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
- `/commandes` — Centrale Commandes : back-office de centralisation des commandes clients (voir ci-dessous)

## Centrale Commandes (`/commandes`)

Back-office protégé par mot de passe permettant de regrouper tous les clients et
toutes leurs commandes au même endroit :

- Tableau de bord (chiffre d'affaires, répartition par statut, top clients)
- Fiches clients avec historique centralisé de toutes leurs commandes
- Commandes avec articles multiples, statut, priorité, méthode de paiement,
  notes et historique des changements de statut
- Recherche, filtres (statut, client, paiement, période) et tri
- Export CSV des commandes filtrées

### Configuration

1. Copie `.env.example` en `.env.local` et renseigne :
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — identifiants du compte admin, utilisés
     uniquement pour créer ce compte au tout premier démarrage.
   - `SESSION_SECRET` — chaîne aléatoire longue pour signer le cookie de
     session (ex : `openssl rand -hex 32`).
2. `npm run dev` puis va sur `/commandes` pour te connecter.

Les données (clients, commandes) sont stockées dans une base SQLite locale
(`data/commandes.sqlite3`, ignorée par git). Pour changer le mot de passe
admin après le premier démarrage, supprime ce fichier et relance le serveur
(ou modifie directement la ligne dans la table `admin_users`).

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use [Vercel](https://vercel.com/new).

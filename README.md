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

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use [Vercel](https://vercel.com/new).

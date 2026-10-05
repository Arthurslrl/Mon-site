# Mon site

Ce dépôt contient **mon site internet** (Next.js) **et tous les outils de design**
que Claude utilise pour le construire. Tout est au même endroit.

## Ce qu'il y a dedans

| Dossier / fichier | À quoi ça sert |
|---|---|
| `app/` | **Le site lui-même** : les pages, les composants, les styles |
| `public/` | Images et fichiers publics du site |
| `.claude/skills/` | Les **skills** : des guides de design que Claude lit avant de créer une page |
| `.agents/skills/` | Les fichiers des skills installés avec `npx skills` (ne pas toucher) |
| `design-md/` | Bibliothèque de styles de marques (Stripe, Apple, Linear…) pour dire « fais-le dans le style de… » |
| `CLAUDE.md` | Les consignes que Claude suit automatiquement dans ce dépôt |
| `.mcp.json` | Connexion à l'outil 21st (composants UI) |
| `skills-lock.json` | Liste des skills installés et leur provenance |

Les dossiers qui commencent par un point (`.claude`, `.agents`) n'apparaissent
**pas** sur le site : ce sont seulement des outils pour Claude.

## Pages du site

- `/` — Pizzeria Loulou (Valras-Plage)
- `/flow` — Flow SaaS landing page

## Lancer le site en local

```bash
npm install
npm run dev
```

Puis ouvrir [http://localhost:3000](http://localhost:3000).

## Ajouter un nouveau skill

```bash
npx skills find <mot-clé>      # chercher
npx skills add <owner/repo>    # installer
```

Ou simplement demander à Claude : « trouve-moi un skill pour… ».

## Mise en ligne

Le site se déploie sur [Vercel](https://vercel.com/new).

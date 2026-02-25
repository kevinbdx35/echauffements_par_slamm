# Échauffements par SLAMM

Site de partage des programmes d'échauffement NOGI et MMA, construit avec [Astro](https://astro.build) et Tailwind CSS.

🌐 **[kevinbdx35.github.io/echauffements_par_slamm](https://kevinbdx35.github.io/echauffements_par_slamm)**

## Programmes

- **NOGI** — Échauffement rituel tous les mardis · 17 exercices · 18–20 minutes
- **MMA** — Arts martiaux mixtes

## Stack

- [Astro](https://astro.build) — générateur de site statique
- [Tailwind CSS](https://tailwindcss.com) — styles
- [GitHub Pages](https://pages.github.com) — hébergement
- [GitHub Actions](https://github.com/features/actions) — déploiement automatique

## Développement local

```bash
npm install
npm run dev
```

## Ajouter une vidéo

Dans `src/data/nogi.json` ou `src/data/mma.json`, ajouter l'ID YouTube dans le tableau `youtube_ids` de l'exercice concerné :

```json
{
  "id": 1,
  "titre": "Hip Escapes (Crevettes)",
  "description": "...",
  "youtube_ids": ["ID_YOUTUBE"],
  "duree": "2 allers-retours"
}
```

L'ID se trouve dans l'URL YouTube : `youtube.com/watch?v=`**`ID_ICI`**

## Déploiement

Chaque push sur `main` déclenche automatiquement un build et un déploiement via GitHub Actions.

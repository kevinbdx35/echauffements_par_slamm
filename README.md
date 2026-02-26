# Échauffements par SLAMM

Site de partage des programmes d'échauffement NOGI et MMA, construit avec [Astro](https://astro.build) et Tailwind CSS.

🌐 **[kevinbdx35.github.io/echauffements_par_slamm](https://kevinbdx35.github.io/echauffements_par_slamm)**

## Programmes

- **NOGI** — Échauffement rituel tous les mardis · 18 exercices · 18–20 minutes · 5 phases
- **MMA** — Arts martiaux mixtes · 18 exercices · 5 phases
- **Étirements** — Programme de fin de séance · PDF 22 pages · 15 minutes

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

L'ID se trouve dans l'URL YouTube :
- Vidéo classique : `youtube.com/watch?v=`**`ID_ICI`**
- Short : `youtube.com/shorts/`**`ID_ICI`**
- Lien court : `youtu.be/`**`ID_ICI`**

Pour démarrer une vidéo à un timestamp précis, utiliser le format objet :

```json
{ "id": "ID_YOUTUBE", "start": 95 }
```

Si une vidéo est supprimée ou rendue privée, un message "Vidéo indisponible" s'affiche automatiquement à la place de la miniature.

## Déploiement

Chaque push sur `main` déclenche automatiquement un build et un déploiement via GitHub Actions.

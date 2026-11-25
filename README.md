# Échauffements par SLAMM

Site de partage des programmes d'échauffement NOGI et MMA, construit avec [Astro](https://astro.build) et Tailwind CSS.

🌐 **[kevinbdx35.github.io/echauffements_par_slamm](https://kevinbdx35.github.io/echauffements_par_slamm)**

## Programmes

- **NOGI** — Échauffement rituel tous les mardis · 18 exercices · 18–20 minutes · 5 phases
- **MMA** — Arts martiaux mixtes · 18 exercices · 5 phases
- **Situations** — Sparring à thème pendant la séance · 18 positions tirées au sort · chrono de rounds, binômes par poids ou roi du tapis
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

## Modifier les situations

Le paquet de la page Situations est dans `src/data/situations.json`. Il contient trois parties.

**`themes`** : la clé courte et le nom affiché de chaque thème (`garde`, `ctrl`, `dos`, `jambes`, `debout`).

**`positions`** : une entrée par position.

| Champ | Rôle |
| --- | --- |
| `p` | Nom de la position, affiché en grand sur la carte |
| `th` | Clé du thème (`garde`, `ctrl`, `dos`, `jambes`, `debout`) |
| `d` | Discipline : `"NOGI"`, `"MMA"` ou `"NOGI MMA"` |
| `ra`, `rb` | Rôles des combattants A et B, ex. `"Dessous"` et `"Dessus"` |
| `ga`, `gb` | Listes d'objectifs pour A et pour B ; un objectif est tiré au sort à chaque carte |
| `st` | `true` si la position se travaille debout |
| `sym` | `true` si les deux rôles sont identiques (la carte affiche alors « Combattant A » et « Combattant B ») |
| `lv` | `"conf"` si la position est réservée aux confirmés |

```json
{
  "p": "Demi-garde",
  "th": "garde",
  "d": "NOGI MMA",
  "ra": "Dessous",
  "rb": "Dessus",
  "ga": ["Prendre l'underhook et sortir au dos", "Balayer"],
  "gb": ["Libérer la jambe et passer"]
}
```

**`contraintes`** : une entrée par contrainte. Une contrainte n'est tirée que si elle est compatible avec la position.

| Champ | Rôle |
| --- | --- |
| `t` | Texte de la contrainte. `{A}` et `{B}` sont remplacés par les rôles de la carte, ex. `"{B} : une seule main"` devient « Dessus : une seule main » |
| `d` | `"*"` pour toutes les disciplines, sinon `"NOGI"` ou `"MMA"` |
| `g` | `true` : seulement sur une position au sol |
| `s` | `true` : seulement sur une position debout |
| `a` | `true` : seulement si les rôles sont différents |
| `lv` | `"deb"` ou `"conf"` : seulement à ce niveau |
| `nth` | Liste de thèmes exclus, ex. `["jambes"]` pour « Leg locks interdits » |

Les positions ajoutées depuis la page (« Situations du club ») restent dans le navigateur de l'appareil, avec les réglages et la liste des membres (clé `slamm-situations-v1` du `localStorage`).

## Déploiement

Chaque push sur `main` déclenche automatiquement un build et un déploiement via GitHub Actions.

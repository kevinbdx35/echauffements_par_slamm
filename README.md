# Échauffements par SLAMM

Site de partage des programmes d'échauffement NOGI et MMA, construit avec [Astro](https://astro.build) et Tailwind CSS.

🌐 **[kevinbdx35.github.io/echauffements_par_slamm](https://kevinbdx35.github.io/echauffements_par_slamm)**

## Programmes

- **NOGI** — Échauffement rituel tous les mardis · 18 exercices · 18–20 minutes · 5 phases
- **MMA** — Arts martiaux mixtes · 18 exercices · 5 phases
- **Situations** — Sparring à thème NOGI pendant la séance · 81 positions en 7 thèmes tirées au sort · chrono de rounds et sons, tout le monde en même temps, roi du tapis ou méthode Danaher
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

**`themes`** : la clé courte et le nom affiché de chaque thème (`garde`, `ctrl`, `dos`, `jambes`, `soum`, `debout`, `scramble`). Le menu « Thème de la séance » et l'étiquette des cartes sont générés à partir de cette liste : pour ajouter un thème, il suffit de l'ajouter ici.

**`positions`** : une entrée par position.

| Champ | Rôle |
| --- | --- |
| `p` | Nom de la position, affiché en grand sur la carte |
| `th` | Clé du thème, une des clés de `themes` |
| `ra`, `rb` | Rôles des combattants A et B. Convention : **rôle A = dessous ou défenseur, rôle B = dessus ou attaquant** (ex. `"Dessous"` / `"Dessus"`, `"Tête prise"` / `"Attaquant"`) |
| `ga`, `gb` | Listes d'objectifs pour A et pour B ; un objectif est tiré au sort à chaque carte |
| `st` | `true` si la position se travaille debout |
| `sym` | `true` si les deux rôles sont identiques (la carte affiche alors « Combattant A » et « Combattant B ») |
| `lv` | `"conf"` si la position est réservée aux confirmés |

```json
{
  "p": "Demi-garde, dessous avec l'underhook",
  "th": "garde",
  "ra": "Dessous",
  "rb": "Dessus",
  "ga": ["Prendre le dos", "Renverser en remontant sur les genoux"],
  "gb": ["Reprendre l'underhook et écraser", "Passer la garde"]
}
```

**`contraintes`** : une entrée par contrainte. Une contrainte n'est tirée que si elle est compatible avec la position : tous ses champs `g`, `s`, `a`, `lv` et `sauf` doivent être respectés. Grâce à la convention des rôles, le texte peut nommer les combattants : « le dessous » ou « le défenseur » désignent toujours le rôle A, « le dessus » ou « l'attaquant » le rôle B.

| Champ | Rôle |
| --- | --- |
| `t` | Texte de la contrainte. `{A}` et `{B}` sont remplacés par les rôles de la carte, ex. `"{B} : une seule main"` devient « Dessus : une seule main » |
| `g` | `true` : seulement sur une position au sol |
| `s` | `true` : seulement sur une position debout |
| `a` | `true` : seulement si les rôles sont différents |
| `lv` | `"deb"` ou `"conf"` : seulement à ce niveau |
| `sauf` | Liste de clés de thèmes : la contrainte n'est jamais tirée pour une position de ces thèmes, ex. `["jambes"]` pour « Leg locks interdits » |

```json
{ "t": "Leg locks interdits", "d": "*", "g": true, "sauf": ["jambes"] }
```

La page Situations est entièrement NOGI : il n'y a pas de réglage de discipline. Les réglages restent dans le navigateur de l'appareil (clé `slamm-situations-v1` du `localStorage`) ; pour ajouter une position, il faut la mettre dans `situations.json`. La page ne gère ni noms ni poids : les pratiquants se mettent par deux eux-mêmes.

### Formats de séance

- **Tout le monde en même temps** : tous les binômes travaillent la même carte. Options : inverser les rôles à mi-round (« On inverse les rôles ! »), changer de partenaire à chaque round (« Changez de partenaire » s'affiche pendant le repos ; impossible sans repos, la case est alors grisée) et « 1 round sur 3 en mauvaise position » (un round tiré au hasard par bloc de 3, jamais deux à la suite, dans la liste `mauvaises_positions` de `danaher.json`).
- **Roi du tapis** : le roi tient le rôle A, le challenger le rôle B. « Le roi garde sa place » augmente sa série de 1 ; « Le challenger prend la place » fait du challenger le nouveau roi, avec une série de 1. Sans clic, le roi garde sa place à la fin du round. Le résultat peut être corrigé pendant le repos, et sur l'écran de fin pour le dernier round, qui affiche la meilleure série de la séance.

- **Méthode Danaher** : positional sparring selon John Danaher, en trois programmes (voir plus bas). Les options d'inversion et de changement de partenaire restent disponibles.

Options valables pour tous les formats :

- **Durée surprise** : chaque round dure au hasard entre 2/3 et 4/3 de la durée choisie (4 à 8 min pour 6 min). Le chrono affiche « ? » pendant le travail, sans double bip à 10 s, seulement le son de fin. L'inversion des rôles tombe à la moitié de la durée choisie, pour ne pas révéler la fin du round.
- **Débrief** : avec un repos de 15 s ou plus, « Débrief : raconte ton round à ton partenaire, ce qui a marché et où tu t'es fait prendre » s'affiche pendant le repos ; sinon (repos plus court ou sans repos), sur l'écran de fin.

Le menu « Thème de la séance » indique le nombre de positions de chaque thème selon le niveau choisi ; un thème vide est désactivé, et la sélection revient à « Tous les thèmes » s'il le devient. En méthode Danaher, le thème est fixé par le programme.

## Modifier la méthode Danaher

Les programmes sont dans `src/data/danaher.json`. Les noms de positions qu'il cite doivent exister à l'identique dans `situations.json`.

- **`seance_dds`** (« Séance type Danaher ») : `rounds_defaut`, `duree_defaut` (en secondes) et `repos_defaut` sont appliqués une fois quand on choisit ce programme, qui décoche aussi l'inversion à mi-round (les règles de reset inversent déjà les rôles) ; tout reste modifiable. `rounds` est la liste des cartes, jouées dans l'ordre, sans tirage : `p`, `ra`, `rb` comme dans `situations.json`, `ga` et `gb` (un seul objectif, en texte) et `reset`, affiché à la place de la contrainte sous le libellé « Reset ».
- **`echappements_dabord`** : `positions` liste les positions tirées au sort (cartes de `situations.json`) ; `regle_debutant` ou `regle_confirme` s'affiche à la place de la contrainte selon le niveau.
- **`a_rebours`** : `chaines`, chacune avec `nom` et `etapes`, de la plus proche de la finition à la plus éloignée. Le round 1 part de la première étape, chaque round suivant passe à l'étape d'après, puis la chaîne recommence. La carte affiche « Étape 2 / 4 » et une contrainte tirée normalement.
- **`mauvaises_positions`** : positions utilisées par l'option « 1 round sur 3 en mauvaise position ».

Pour que la carte d'aperçu tienne sur un petit téléphone (360 × 640), chaque objectif doit tenir en 3 lignes dans une demi-carte : environ 32 caractères au maximum.

## Déploiement

Chaque push sur `main` déclenche automatiquement un build et un déploiement via GitHub Actions.

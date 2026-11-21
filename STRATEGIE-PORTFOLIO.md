# Stratégie — refonte de alkhastvatsaev.dev

> Écrit le 21/11/2026. Objectif : qu'un recruteur comprenne **en 5 secondes** qu'il a devant lui quelqu'un qui livre beaucoup, vite, et proprement — preuves chiffrées à l'appui.

## 1. Le message en une phrase

**« Je transforme une idée en application en ligne, testée et déployée — 33 projets, 2 278 commits et 23 applications en ligne en 10 mois. »**

Positionnement : **AI-native Product Engineer** (ingénieur produit qui pilote des agents de codage IA). C'est vrai, c'est recherché, et ça évite le piège « développeur senior » qu'un entretien technique ferait tomber.

## 2. Règles « master class CV » appliquées

Le fichier `MASTERCLASS_CV/00_MASTERCLASS.md` n'existe plus sur le Mac ni sur la carte SD (le dossier `~/Desktop/INDEED` a été supprimé). Ses règles, retrouvées dans l'historique, sont appliquées ici :

1. **Toujours un chiffre vrai** dans chaque preuve (format XYZ : « j'ai fait X, mesuré par Y, grâce à Z »).
2. **Aucun chiffre non vérifiable**, aucun adjectif sans fait derrière (« passionné », « rigoureux » → interdits).
3. **Le titre colle au poste visé** (à adapter avant chaque entretien).
4. **Honnête sur les manques** : aucun client payé, pas d'expérience salariée en dev → on ne le cache pas, on montre le volume et la qualité.

## 3. Les chiffres (tous mesurés le 21/11/2026)

| Chiffre | Valeur | Comment c'est mesuré |
|---|---|---|
| Projets avec du code | **33** | dépôts GitHub non vides, hors archives |
| Commits | **2 278** | API GitHub, tous dépôts produit |
| Applications en ligne | **23** | sites testés un par un, réponse 200 |
| Fichiers de tests | **783** | fichiers `.test` / `.spec` (hors archives) |
| Suites de tests de bout en bout | **38** | Playwright |
| Chaînes d'intégration continue | **34** | fichiers `.github/workflows` |
| Lignes de code | **≈ 566 000** | TS/TSX/Swift/Python/SQL, hors dépendances |
| Durée | **10 mois** | février → novembre 2026 |
| Jours de travail actifs | **119** | jours distincts avec au moins un commit |
| Rythme | **≈ 19 commits / jour actif** | 2 278 ÷ 119 |
| Temps pour un premier produit en ligne | **2 jours (médiane)** | jours actifs par projet, 33 projets |

**Produit phare — NOTA (heynota.app)** : 819 commits en 39 jours actifs, 630 fichiers de tests, 26 suites Playwright, 17 workflows CI, ≈ 205 000 lignes, 9 modules IA, 4 langues, applis iOS + Android.

**Produit le plus récent — SHMOT** : 226 commits en 10 jours actifs, appli iPhone native (844 fichiers Swift, ≈ 57 000 lignes), site web, moteur de recommandation, service IA d'images.

**Avant le code** : ≈ 20 mois concepteur 3D en haute joaillerie (Atelier de l'Objet, pièces pour Cartier et Van Cleef & Arpels).

## 4. Le parcours du recruteur (5 s → 2 min)

| Temps | Ce qu'il voit | Ce qu'il doit penser |
|---|---|---|
| 0–5 s | Nom, titre, une phrase, **4 compteurs animés** | « Volume énorme, en peu de temps » |
| 5–15 s | Bandeau « scanner » : les écrans des applis se transforment en code | « Il livre de vrais produits » |
| 15–45 s | NOTA en chiffres + graphique des commits par mois | « Il tient la distance sur un gros projet » |
| 45 s–2 min | Grille de projets filtrable, chaque carte avec 3 chiffres + lien live | « Je peux vérifier tout de suite » |
| fin | Parcours (joaillerie → IA), méthode, contact | « Je l'appelle » |

## 5. Ce qui change sur le site

- **Accueil FR et EN refaits** (même composant, deux langues).
- Ajout de **Tailwind CSS** et de la structure **shadcn** (`src/components/ui`, `src/lib/utils.ts`) pour intégrer les deux composants demandés :
  - `scanner-card-stream.tsx` : captures réelles de tes applis en ligne → code ASCII.
  - `logo-cloud-2.tsx` : logos des technologies **réellement utilisées** dans tes projets (Nvidia, Turso et Clerk retirés car non utilisés).
- Tous les chiffres vivent dans un seul fichier : `src/data/metrics.ts`. Pour les mettre à jour, on change ce fichier.
- Les autres pages (projets, articles, CV, recruteurs) restent en place.

## 6. Avant l'entretien

- **Adapter le titre** du site/CV au poste exact de l'entreprise.
- Préparer **3 histoires de 2 minutes** : NOTA (gros projet testé), SHMOT (appli iPhone en 10 jours), Atelier Aurelia (3D, pont avec la joaillerie).
- Être prêt à expliquer **comment tu pilotes l'IA** : spécification d'abord, tests imposés, intégration continue bloquante, relecture. C'est ta vraie force — l'assumer.
- **Démo live de NOTA en 15 minutes** sur ton téléphone.
- Vérifier ton droit de citer Cartier / Van Cleef & Arpels (contrat Atelier de l'Objet). Si doute : « maisons de la place Vendôme ».

## 7. Points de vigilance

- Ne pas écrire « X ans d'expérience en développement » : c'est faux (10 mois).
- Les lignes de code impressionnent mais un technicien sait qu'elles sont générées en partie par l'IA : on les montre, sans en faire l'argument n°1. Les **tests** et les **apps en ligne** sont les preuves fortes.
- Mettre à jour `src/data/metrics.ts` chaque mois.

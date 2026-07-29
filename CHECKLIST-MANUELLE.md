# Checklist manuelle SEO — Alkhast Vatsaev

Actions hors code après déploiement de `alkhastvatsaev.dev` et `heynota.app`.

## Search Console

- [ ] Vérifier la propriété **https://alkhastvatsaev.dev** (domaine ou préfixe URL)
- [ ] Vérifier la propriété **https://heynota.app**
- [ ] Soumettre le sitemap `https://alkhastvatsaev.dev/sitemap.xml`
- [ ] Soumettre le sitemap `https://heynota.app/sitemap.xml`
- [ ] Inspection d’URL — portfolio :
  - [ ] `https://alkhastvatsaev.dev/`
  - [ ] `https://alkhastvatsaev.dev/fr`
  - [ ] `https://alkhastvatsaev.dev/projects/nota-crm`
  - [ ] `https://alkhastvatsaev.dev/fr/projets/nota-crm`
- [ ] Inspection d’URL — Nota :
  - [ ] `https://heynota.app/`
  - [ ] `https://heynota.app/logiciel-interventions-terrain`
- [ ] Demander l’indexation des URLs clés **après** déploiement
- [ ] Confirmer que `https://heynota.app/alkhast-vatsaev` renvoie **301** vers `https://alkhastvatsaev.dev` (et disparaît du rapport « pages explorées »)

## Rich Results Test (validator)

Tester après déploiement :

- [ ] `https://alkhastvatsaev.dev/` — Person + WebSite + ProfilePage
- [ ] `https://alkhastvatsaev.dev/projects/nota-crm` — SoftwareApplication + BreadcrumbList
- [ ] `https://alkhastvatsaev.dev/fr/articles/...` — Article (author `@id` Person)
- [ ] `https://heynota.app/` — SoftwareApplication + FAQPage (author → `https://alkhastvatsaev.dev/#person`)
- [ ] Schema.org Validator : https://validator.schema.org/

## Backlinks à créer / mettre à jour

Champ « site web » = **https://alkhastvatsaev.dev** (priorité absolue pour la requête nom).

- [ ] **GitHub** — profil : site web + README bio avec lien portfolio (+ Nota en une ligne)
- [ ] **LinkedIn** — site web + section Sélection : portfolio + heynota.app
- [ ] **dev.to** — champ website / lien dans l’about
- [ ] **Malt** — site web du profil
- [ ] Autres profils publics (X, Behance, Stack Overflow, etc. si actifs)
- [ ] Wikidata : vérifier que les items Person / Nota pointent vers les bonnes URLs (déjà référencés côté schema)

## Suivi

### J+7

- [ ] Position Google (navigation privée / autre navigateur) pour `"Alkhast Vatsaev"`
- [ ] Statut d’indexation `heynota.app/` (Search Console → Pages)
- [ ] Couverture des sitemaps (URLs découvertes vs indexées)
- [ ] Aucune alerte « contenu mince » / soft 404 sur la home Nota

### J+30

- [ ] Position `"Alkhast Vatsaev"` : portfolio devant societe.com / Pappers ?
- [ ] heynota.app indexé (pas seulement « exploré »)
- [ ] Impressions Search Console sur le nom + marque Nota
- [ ] Ajuster : publier 1–2 articles (plans dans `content/articles/`) si le signal contenu manque encore

## Déploiement (rappel)

- [ ] Déployer **portfolio** (`alkhastvatsaev.dev`)
- [ ] Déployer **marketing Nota** (`heynota.app`)
- [ ] Vérifier Lighthouse ≥ 95 sur home portfolio, `/projects/nota-crm`, home heynota (après deploy)

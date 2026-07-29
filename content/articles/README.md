# Articles MDX — structure (ne pas publier sans relecture)

Les articles live restent dans `src/data/articles.ts` jusqu’à migration.
Ce dossier prépare le format MDX pour les prochains contenus **écrits par toi**.

## Frontmatter attendu

```mdx
---
title: "Titre de l’article"
description: "Meta description ≤ 155 car."
date: "2026-08-15"
locale: "fr"
slug: "mon-slug"
tags: ["Next.js", "Firebase"]
draft: true
---

## Intro

Corps de l’article…

## Section

…
```

## Plans d’articles proposés (à écrire toi-même)

### FR

1. **Comment j’ai conçu Nota CRM** — problème terrain (Excel/WhatsApp), 3 piliers (carte / mobile / facturation), stack, lien `heynota.app` + case study `/fr/projets/nota-crm`.
2. **PWA hors-ligne pour techniciens** — sync, photos, pièges Capacitor/service worker, leçons Nota.
3. **Portfolio développeur qui ranke sur son nom** — entité Person, sameAs, contenu réel vs stuffing (meta SEO durable).
4. **De CRM Slot à Nota** — ce que le dépôt public prouve, ce que le produit commercial ajoute.

### EN

1. **Building Nota CRM** — same as FR #1, English voice.
2. **Offline-first field PWA lessons** — same as FR #2.
3. **Ranking for your own name as a developer** — entity + real work, not doorways.

## Règles

- `draft: true` jusqu’à ta validation
- Pas de duplication FR/EN mot à mot (traduction réelle)
- Toujours un lien interne vers un projet + retour home
- Interdit : publier du texte IA non relu

export type FranceCity = {
  slug: string;
  name: string;
  region: string;
  /** Unique local angle — keeps pages from being near-duplicates for Google. */
  localHook: string;
  modes: readonly ("présentiel" | "hybride" | "remote")[];
};

/**
 * Major French employment hubs for programmatic SEO landings.
 * Intentionally ~30 metros — not every commune (thin/doorway risk).
 */
export const franceCities: readonly FranceCity[] = [
  {
    slug: "paris",
    name: "Paris",
    region: "Île-de-France",
    localHook:
      "Basé à Paris, je peux rejoindre une équipe en présentiel, en hybride ou full remote selon le poste.",
    modes: ["présentiel", "hybride", "remote"],
  },
  {
    slug: "lyon",
    name: "Lyon",
    region: "Auvergne-Rhône-Alpes",
    localHook:
      "Ouvert aux équipes lyonnaises en hybride (déplacements ponctuels) ou en 100 % remote France.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "marseille",
    name: "Marseille",
    region: "Provence-Alpes-Côte d’Azur",
    localHook:
      "Disponible pour des équipes à Marseille et ailleurs en PACA en remote ou hybride selon le rythme de collaboration.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "toulouse",
    name: "Toulouse",
    region: "Occitanie",
    localHook:
      "Ouvert aux recrutements toulousains (tech, produit, SaaS) en remote ou hybride depuis Paris.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "nice",
    name: "Nice",
    region: "Provence-Alpes-Côte d’Azur",
    localHook:
      "Candidatures Nice / Côte d’Azur bienvenues en remote-first ou hybride avec déplacements occasionnels.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "nantes",
    name: "Nantes",
    region: "Pays de la Loire",
    localHook:
      "Ouvert aux équipes nantaises : stack React/Next.js, livraison end-to-end, collaboration remote ou hybride.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "montpellier",
    name: "Montpellier",
    region: "Occitanie",
    localHook:
      "Disponible pour des postes à Montpellier en télétravail ou hybride, avec preuves portfolio vérifiables.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "strasbourg",
    name: "Strasbourg",
    region: "Grand Est",
    localHook:
      "Lien Alsace déjà présent dans mon portfolio (ex. Hopla) : ouvert aux équipes strasbourgeoises en remote ou hybride.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "bordeaux",
    name: "Bordeaux",
    region: "Nouvelle-Aquitaine",
    localHook:
      "Ouvert aux recruteurs bordelais qui cherchent un Fullstack JS/TS avec démos live et repos publics.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "lille",
    name: "Lille",
    region: "Hauts-de-France",
    localHook:
      "Disponible pour des équipes lilloises / métropole européenne en remote ou hybride depuis Paris.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "rennes",
    name: "Rennes",
    region: "Bretagne",
    localHook:
      "Ouvert aux postes rennais (digital, SaaS, produit) en télétravail France ou hybride.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "grenoble",
    name: "Grenoble",
    region: "Auvergne-Rhône-Alpes",
    localHook:
      "Candidatures Grenoble bienvenues : profil produit + ingénierie, collaboration remote ou hybride.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "dijon",
    name: "Dijon",
    region: "Bourgogne-Franche-Comté",
    localHook:
      "Ouvert aux équipes dijonnaises qui recrutent un développeur Full Stack JavaScript/TypeScript.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "angers",
    name: "Angers",
    region: "Pays de la Loire",
    localHook:
      "Disponible pour des postes à Angers en remote ou hybride, avec portfolio et GitHub prêts pour un screening technique.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "reims",
    name: "Reims",
    region: "Grand Est",
    localHook:
      "Ouvert aux recrutements rémois : React, Next.js, TypeScript, preuves déployées sur ce site.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "clermont-ferrand",
    name: "Clermont-Ferrand",
    region: "Auvergne-Rhône-Alpes",
    localHook:
      "Disponible pour des équipes à Clermont-Ferrand en télétravail ou avec rythme hybride ponctuel.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "tours",
    name: "Tours",
    region: "Centre-Val de Loire",
    localHook:
      "Ouvert aux postes tourangeaux Fullstack / React / Next.js en remote France ou hybride.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "orleans",
    name: "Orléans",
    region: "Centre-Val de Loire",
    localHook:
      "Proximité Île-de-France : ouvert aux équipes orléanaises en hybride ou remote.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "rouen",
    name: "Rouen",
    region: "Normandie",
    localHook:
      "Disponible pour des recruteurs à Rouen / Normandie qui veulent un profil Fullstack avec démos.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "caen",
    name: "Caen",
    region: "Normandie",
    localHook:
      "Ouvert aux postes caennais en remote ou hybride, stack React/Next.js/TypeScript.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "brest",
    name: "Brest",
    region: "Bretagne",
    localHook:
      "Candidatures Brest / Bretagne Ouest bienvenues en remote-first avec collaboration async claire.",
    modes: ["remote", "hybride"],
  },
  {
    slug: "metz",
    name: "Metz",
    region: "Grand Est",
    localHook:
      "Ouvert aux équipes messines : hybride Grand Est ou 100 % remote France.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "nancy",
    name: "Nancy",
    region: "Grand Est",
    localHook:
      "Disponible pour des postes à Nancy : Fullstack JS/TS, portfolio et études de cas prêt à évaluer.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "mulhouse",
    name: "Mulhouse",
    region: "Grand Est",
    localHook:
      "Ouvert aux recrutements mulhousiens / Sud Alsace en remote ou hybride.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "amiens",
    name: "Amiens",
    region: "Hauts-de-France",
    localHook:
      "Disponible pour des équipes amiénoises qui cherchent un développeur Full Stack avec preuves en ligne.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "limoges",
    name: "Limoges",
    region: "Nouvelle-Aquitaine",
    localHook:
      "Ouvert aux postes limougeauds en télétravail ou hybride selon l’organisation de l’équipe.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "perpignan",
    name: "Perpignan",
    region: "Occitanie",
    localHook:
      "Candidatures Perpignan / Pyrénées-Orientales bienvenues en remote France.",
    modes: ["remote", "hybride"],
  },
  {
    slug: "nimes",
    name: "Nîmes",
    region: "Occitanie",
    localHook:
      "Disponible pour des équipes nîmoises : React, Next.js, TypeScript, déploiement Vercel.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "toulon",
    name: "Toulon",
    region: "Provence-Alpes-Côte d’Azur",
    localHook:
      "Ouvert aux postes toulonnais en remote ou hybride PACA.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "le-mans",
    name: "Le Mans",
    region: "Pays de la Loire",
    localHook:
      "Disponible pour des recruteurs au Mans qui évaluent un Fullstack via démos et GitHub.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "saint-etienne",
    name: "Saint-Étienne",
    region: "Auvergne-Rhône-Alpes",
    localHook:
      "Ouvert aux équipes stéphanoises en remote ou hybride Auvergne-Rhône-Alpes.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "avignon",
    name: "Avignon",
    region: "Provence-Alpes-Côte d’Azur",
    localHook:
      "Candidatures Avignon / Vaucluse bienvenues : profil Fullstack orienté preuves, remote ou hybride.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "annecy",
    name: "Annecy",
    region: "Auvergne-Rhône-Alpes",
    localHook:
      "Ouvert aux postes à Annecy (scale-ups, produit, SaaS) en remote ou hybride.",
    modes: ["hybride", "remote"],
  },
  {
    slug: "aix-en-provence",
    name: "Aix-en-Provence",
    region: "Provence-Alpes-Côte d’Azur",
    localHook:
      "Disponible pour des équipes aixois en collaboration remote-first ou hybride.",
    modes: ["hybride", "remote"],
  },
] as const;

export function getFranceCity(slug: string): FranceCity | undefined {
  return franceCities.find((city) => city.slug === slug);
}

export function franceCityPath(slug: string): string {
  return `/fr/developpeur-full-stack/${slug}`;
}

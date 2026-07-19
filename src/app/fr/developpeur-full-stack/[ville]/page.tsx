import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  franceCities,
  franceCityPath,
  getFranceCity,
} from "@/data/france-cities";

const siteUrl = "https://alkhastvatsaev.dev";
const pillarPath = "/fr/developpeur-full-stack";

type Props = { params: Promise<{ ville: string }> };

export function generateStaticParams() {
  return franceCities.map((city) => ({ ville: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville } = await params;
  const city = getFranceCity(ville);
  if (!city) return {};

  const path = franceCityPath(city.slug);
  const title = `Développeur Full Stack ${city.name} | JavaScript & TypeScript`;
  const description = `Alkhast Vatsaev — développeur Full Stack disponible pour ${city.name} (${city.region}). React, Next.js, TypeScript, démos live et GitHub. Hybride ou remote.`;

  return {
    title,
    description,
    keywords: [
      `développeur full stack ${city.name}`,
      `développeur fullstack ${city.name}`,
      `développeur React ${city.name}`,
      `développeur Next.js ${city.name}`,
      `développeur TypeScript ${city.name}`,
      `développeur JavaScript ${city.region}`,
      "Alkhast Vatsaev",
    ],
    alternates: {
      canonical: path,
      languages: {
        fr: path,
        en: "/",
        "x-default": pillarPath,
      },
    },
    openGraph: {
      title: `Développeur Full Stack à ${city.name} — Alkhast Vatsaev`,
      description,
      url: path,
      siteName: "Alkhast Vatsaev",
      locale: "fr_FR",
      type: "website",
      images: [
        {
          url: "/fr/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `Alkhast Vatsaev — Développeur Full Stack ${city.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Développeur Full Stack ${city.name}`,
      description,
      images: ["/fr/twitter-image.png"],
    },
  };
}

export default async function DeveloppeurFullStackVillePage({
  params,
}: Props) {
  const { ville } = await params;
  const city = getFranceCity(ville);
  if (!city) notFound();

  const path = franceCityPath(city.slug);
  const otherCities = franceCities.filter((c) => c.slug !== city.slug);

  const faqs = [
    {
      question: `Recrutez-vous un développeur Full Stack à ${city.name} ?`,
      answer: `Oui — je candidate sur des postes Full Stack / React / Next.js à ${city.name} et dans la région ${city.region}, en ${city.modes.join(", ")}.`,
    },
    {
      question: "Êtes-vous sur place ou en remote ?",
      answer: city.localHook,
    },
    {
      question: "Où voir des preuves de travail ?",
      answer:
        "Sur alkhastvatsaev.dev : projets déployés (dont CRM Slot), études de cas, CV et GitHub public.",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}${path}#webpage`,
        url: `${siteUrl}${path}`,
        name: `Développeur Full Stack ${city.name} — Alkhast Vatsaev`,
        description: `Profil Full Stack JavaScript/TypeScript disponible pour ${city.name} (${city.region}).`,
        inLanguage: "fr-FR",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#person` },
        primaryImageOfPage: `${siteUrl}/fr/opengraph-image.png`,
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}${path}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: `${siteUrl}/fr`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Développeur Full Stack",
            item: `${siteUrl}${pillarPath}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: city.name,
            item: `${siteUrl}${path}`,
          },
        ],
      },
    ],
  };

  return (
    <main id="main-content" lang="fr" className="seo-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <nav className="seo-breadcrumb" aria-label="Fil d’Ariane">
        <Link href="/fr">Accueil</Link>
        <span aria-hidden="true"> / </span>
        <Link href={pillarPath}>Développeur Full Stack</Link>
        <span aria-hidden="true"> / </span>
        <span>{city.name}</span>
      </nav>

      <section className="hero" aria-labelledby="seo-title">
        <div className="eyebrow-row">
          <p className="eyebrow">
            {city.name} · {city.region} · {city.modes.join(" · ")}
          </p>
          <p className="availability">
            <span aria-hidden="true" />
            Ouvert aux opportunités — CDI ou freelance
          </p>
        </div>
        <h1 id="seo-title">
          Développeur Full Stack à {city.name} — JavaScript & TypeScript
        </h1>
        <p className="seo-lead">
          Vous recrutez un{" "}
          <strong>développeur full stack à {city.name}</strong> (ou React /
          Next.js / TypeScript) ? Je suis Alkhast Vatsaev : portfolio avec
          démos live, repos GitHub et études de cas — pour un screening rapide
          depuis {city.name} et la région {city.region}.
        </p>
        <p className="seo-lead">{city.localHook}</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/fr#work">
            Voir les projets
          </Link>
          <a
            className="button button-secondary"
            href="mailto:alkhastvatsaev@icloud.com"
          >
            Me contacter
          </a>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="why-title">
        <div className="section-heading">
          <p className="section-index">Pourquoi cette page</p>
          <h2 id="why-title">
            Un profil Full Stack évaluable depuis {city.name}.
          </h2>
        </div>
        <div className="profile-copy">
          <p>
            Les recherches « développeur full stack {city.name} », « développeur
            React {city.name} » ou « Next.js {city.region} » aboutissent souvent
            à des annonces. Ici, vous accédez directement au dossier candidat :
            stack, démos, code et contact.
          </p>
          <p>
            Produit phare :{" "}
            <Link href="/fr/projets/crmslot">CRM Slot</Link> — CRM terrain
            (Next.js, Firebase, Mapbox, Stripe). Autres preuves : Serrurerie
            Pro, LOGIS, Hopla, Atelier Aurelia.
          </p>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="stack-title">
        <div className="section-heading">
          <p className="section-index">Stack</p>
          <h2 id="stack-title">JavaScript / TypeScript de bout en bout.</h2>
        </div>
        <ul className="seo-city-list" aria-label="Stack principale">
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "Firebase",
            "Stripe",
            "Vitest",
            "Playwright",
            "Vercel",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="faq-section" aria-labelledby="faq-title">
        <div className="section-heading">
          <p className="section-index">FAQ / {city.name}</p>
          <h2 id="faq-title">Questions fréquentes</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="profile-section" aria-labelledby="other-cities-title">
        <div className="section-heading">
          <p className="section-index">Autres villes</p>
          <h2 id="other-cities-title">Aussi disponible dans d’autres métropoles.</h2>
        </div>
        <ul className="seo-city-list" aria-label="Autres villes France">
          {otherCities.map((c) => (
            <li key={c.slug}>
              <Link href={franceCityPath(c.slug)}>
                Développeur Full Stack {c.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href={pillarPath}>Vue France complète</Link>
          </li>
        </ul>
      </section>

      <section className="contact-section" aria-labelledby="seo-contact-title">
        <p className="section-index">Contact</p>
        <h2 id="seo-contact-title">
          Recruteur à {city.name} — parlons-en.
        </h2>
        <p>
          Échange sur un poste Full Stack, React, Next.js ou TypeScript à{" "}
          {city.name} ({city.region}).
        </p>
        <div className="contact-links">
          <a href="mailto:alkhastvatsaev@icloud.com">
            alkhastvatsaev@icloud.com <span aria-hidden="true">↗</span>
          </a>
          <Link href="/fr/pour-recruteurs">
            Page pour recruteurs <span aria-hidden="true">→</span>
          </Link>
          <Link href={pillarPath}>
            Développeur Full Stack France <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "./seo";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: `${SITE_URL}/og-default.jpg`,
    image: `${SITE_URL}/og-default.jpg`,
    telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "devbyte2026@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Resistencia",
      addressLocality: "Resistencia",
      addressRegion: "Chaco",
      postalCode: "3500",
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -27.4516,
      longitude: -58.9858,
    },
    areaServed: {
      "@type": "GeoShape",
      description: "NEA Argentina - Chaco, Corrientes, Formosa, Misiones",
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://www.facebook.com/devbyte",
      "https://www.instagram.com/devbyte",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Spanish",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/buscar?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function serviceSchema(service: {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} | DevByte`,
    description: service.description,
    provider: {
      "@type": "ProfessionalService",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "GeoShape",
      description: "NEA Argentina",
    },
    url: `${SITE_URL}/servicios/${service.slug}`,
    keywords: service.keywords.join(", "),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function personSchema(person: {
  name: string;
  jobTitle: string;
  description: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    worksFor: {
      "@type": "ProfessionalService",
      name: SITE_NAME,
      url: SITE_URL,
    },
    url: person.url || SITE_URL,
  };
}

export function SchemaOrg({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

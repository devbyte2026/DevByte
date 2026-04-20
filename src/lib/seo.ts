export const SITE_NAME = "DevByte";
export const SITE_URL = "https://devbyte.com.ar";
export const SITE_DESCRIPTION =
  "Agencia de desarrollo web y soluciones digitales en Resistencia, Chaco. Creamos sitios web, apps y sistemas a medida para pymes y municipios del NEA.";
export const KEYWORDS = [
  "desarrollo web Resistencia",
  "agencia web Chaco",
  "aplicaciones web NEA",
  "sistemas a medida Corrientes",
  "páginas web Resistencia Chaco",
  "desarrollo de software NEA Argentina",
  "apps móviles Chaco",
  "e-commerce Resistencia",
];

export function generateMetadata(page: string, description?: string) {
  const fullDescription = description || SITE_DESCRIPTION;
  return {
    title: `${page} | DevByte`,
    description: fullDescription,
    keywords: KEYWORDS,
    openGraph: {
      title: `${page} | DevByte`,
      description: fullDescription,
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: "es_AR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${page} | DevByte`,
      description: fullDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}

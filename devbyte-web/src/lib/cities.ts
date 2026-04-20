export interface City {
  slug: string;
  name: string;
  province: string;
  population: string;
  description: string;
  keywords: string[];
}

export const cities: City[] = [
  {
    slug: "resistencia",
    name: "Resistencia",
    province: "Chaco",
    population: "~400.000 hab.",
    description: "Capital de Chaco y centro económico del NEA. Ciudad con gran actividad comercial, industrial y de servicios.",
    keywords: ["desarrollo web Resistencia", "agencia web Resistencia Chaco", "sitio web Resistencia"],
  },
  {
    slug: "corrientes",
    name: "Corrientes",
    province: "Corrientes",
    population: "~420.000 hab.",
    description: "Ciudad capital de Corrientes, importante centro urbano con fuerte actividad productiva y comercial.",
    keywords: ["desarrollo web Corrientes", "agencia web Corrientes", "página web Corrientes"],
  },
  {
    slug: "posadas",
    name: "Posadas",
    province: "Misiones",
    population: "~380.000 hab.",
    description: "Capital de Misiones, estratégicamente ubicada cerca de la triple frontera. Centro de servicios y turismo.",
    keywords: ["desarrollo web Posadas", "agencia web Posadas Misiones", "sistemas Posadas"],
  },
  {
    slug: "formosa",
    name: "Formosa",
    province: "Formosa",
    population: "~270.000 hab.",
    description: "Capital de Formosa, ciudad en crecimiento con importante sector público y comercial.",
    keywords: ["desarrollo web Formosa", "agencia web Formosa", "app web Formosa"],
  },
  {
    slug: "saenz-pena",
    name: "Sáenz Peña",
    province: "Chaco",
    population: "~130.000 hab.",
    description: "Segunda ciudad más importante del Chaco. Centro comercial y educativo de la región.",
    keywords: ["desarrollo web Sáenz Peña", "agencia web Sáenz Peña Chaco", "sistemas Sáenz Peña"],
  },
  {
    slug: "charata",
    name: "Charata",
    province: "Chaco",
    population: "~35.000 hab.",
    description: "Centro agrícola-ganadero del sudoeste chaqueño. Ciudad con fuerte identidad productiva.",
    keywords: ["desarrollo web Charata", "agencia web Charata Chaco", "página web Charata"],
  },
  {
    slug: "villa-angela",
    name: "Villa Ángela",
    province: "Chaco",
    population: "~50.000 hab.",
    description: "Ciudad del sur del Chaco, importante centro comercial y de servicios de la región.",
    keywords: ["desarrollo web Villa Ángela", "agencia web Villa Ángela", "web Villa Ángela Chaco"],
  },
];
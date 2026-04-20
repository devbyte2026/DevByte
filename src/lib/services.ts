export interface Service {
  slug: string;
  title: string;
  description: string;
  descriptionLong: string;
  keywords: string[];
  benefits: string[];
  technologies: string[];
  priceReference: string;
  icon: string;
}

export const services: Service[] = [
  {
    slug: "sitios-web-institucionales",
    title: "Sitios Web Institucionales",
    description: "Presencia digital profesional para tu negocio",
    descriptionLong:
      "Creamos sitios web profesionales y modernos que reflejan la identidad de tu empresa. Diseños responsive, optimizados para SEO y rápida carga.",
    keywords: [
      "sitio web Resistencia",
      "página web institucional Chaco",
      "desarrollo web NEA",
    ],
    benefits: [
      "Diseño profesional y responsive",
      "Optimizado para SEO local",
      "Carga rápida y seguro",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    priceReference: "$300 - $700 USD",
    icon: "globe",
  },
  {
    slug: "e-commerce",
    title: "Tiendas Online y Catálogos",
    description: "Vende tus productos las 24hs",
    descriptionLong:
      "Tiendas online con pasarela de pago integrada, gestión de inventario y envío. Incluyen Mercado Pago, cálculo de shipping y más.",
    keywords: ["e-commerce Resistencia", "tienda online Chaco", "vender online NEA"],
    benefits: [
      "Mercado Pago integrado",
      "Gestión de inventario",
      "Envíos y seguimiento",
    ],
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Supabase"],
    priceReference: "$500 - $1000 USD",
    icon: "shopping-cart",
  },
  {
    slug: "sistemas-a-medida",
    title: "Sistemas a Medida",
    description: "Software personalizado para tu empresa",
    descriptionLong:
      "Desarrollamos sistemasERP, CRM, gestión de tickets y cualquier aplicación web a medida según las necesidades de tu negocio.",
    keywords: [
      "sistema a medida Resistencia",
      "software empresarial Chaco",
      "desarrollo a medida NEA",
    ],
    benefits: [
      "Diseño según tus procesos",
      "Escalable y mantenible",
      "Soporte y capacitación",
    ],
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    priceReference: "$700 - $2000 USD",
    icon: "code",
  },
  {
    slug: "apps-pwa",
    title: "Apps PWA",
    description: "Aplicaciones web progresivas",
    descriptionLong:
      "Las PWAs funcionan como apps nativas en celulares sin necesidad de descarga. Notificaciones push, offline y acceso rápido.",
    keywords: ["app PWA Resistencia", "aplicación progresiva Chaco", "PWA NEA"],
    benefits: [
      "Sin instalación requise",
      "Notificaciones push",
      "Funciona offline",
    ],
    technologies: ["Next.js", "Service Workers", "TypeScript"],
    priceReference: "$400 - $900 USD",
    icon: "smartphone",
  },
  {
    slug: "mantenimiento-web",
    title: "Mantenimiento Web",
    description: "Tu web siempre activa y segura",
    descriptionLong:
      "Plans de mantenimiento que incluyen hosting, actualizaciones, backups automáticos, seguridad y soporte técnico.",
    keywords: ["mantenimiento web Resistencia", "hosting Chaco", "soporte web NEA"],
    benefits: [
      "Hosting incluido",
      "Backups automáticos",
      "Soporte técnico",
    ],
    technologies: ["Vercel", "PostgreSQL", "Monitoring"],
    priceReference: "$30 - $100 USD/mes",
    icon: "shield",
  },
  {
    slug: "consultoria-digital",
    title: "Consultoría Digital",
    description: "Asesoramiento estratégico para tu transformación digital",
    descriptionLong:
      "Te ayudamos a definir tu estrategia digital, elegir las herramientas correctas y optimizar tu presencia online.",
    keywords: [
      "consultoría digital Resistencia",
      "estrategia digital Chaco",
      "transformación digital NEA",
    ],
    benefits: [
      "Auditoría de presencia digital",
      "Plan de acción personalizado",
      "Seguimiento mensual",
    ],
    technologies: ["Google Analytics", "SEO", "Strategy"],
    priceReference: "$100 - $300 USD",
    icon: "lightbulb",
  },
];

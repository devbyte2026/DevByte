export interface FAQItem {
  question: string;
  answer: string;
  /** Palabras y frases clave usadas para responder preguntas escritas libremente. */
  keywords: string[];
}

export const faqs: FAQItem[] = [
  {
    question: "¿Cuánto cuesta hacer una página web en Resistencia?",
    answer:
      "Los costos varían según el tipo de proyecto. Un sitio web institucional parte desde $300 USD, una tienda online desde $500 USD y sistemas a medida desde $700 USD. El precio final depende de las funcionalidades específicas que necesites. Te recomendamos contactarnos para recibir una cotización personalizada sin compromiso.",
    keywords: [
      "precio",
      "precios",
      "cuesta",
      "costo",
      "costos",
      "cuanto sale",
      "vale",
      "presupuesto",
      "cotizacion",
      "tarifa",
      "plata",
      "dinero",
      "pagar",
    ],
  },
  {
    question: "¿Cuánto tarda en hacerse una web?",
    answer:
      "Los tiempos promedio son: sitio institucional 2-3 semanas, e-commerce 3-5 semanas, sistema a medida 4-8 semanas. Projetos más complejos pueden requerir más tiempo. Siempre acordamos plazos realistas antes de comenzar.",
    keywords: [
      "tiempo",
      "tarda",
      "demora",
      "plazo",
      "plazos",
      "dias",
      "semanas",
      "cuando esta",
      "entrega",
      "rapido",
    ],
  },
  {
    question: "¿Qué incluye el servicio de desarrollo web?",
    answer:
      "Cada proyecto incluye: diseño responsive (móvil, tablet, desktop), optimización SEO básica, formulario de contacto, integración con Google Analytics, certificado SSL, y 30 días de soporte post-entrega. Para proyectos más grandes incluimos documentación y capacitación.",
    keywords: [
      "incluye",
      "que trae",
      "que incluye",
      "caracteristicas",
      "funcionalidades",
      "que ofrece",
      "servicio",
      "que tiene",
    ],
  },
  {
    question: "¿Hacen sitios web para toda Argentina o solo el NEA?",
    answer:
      "Trabajamos principalmente con empresas del NEA (Chaco, Corrientes, Formosa, Misiones) porque entendemos la realidad de la región. Pero también aceptamos proyectos de todo Argentina sin problema. La comunicación es por WhatsApp y email, así que la distancia no es un límite.",
    keywords: [
      "argentina",
      "nea",
      "chaco",
      "corrientes",
      "formosa",
      "misiones",
      "zona",
      "ubicacion",
      "region",
      "otra provincia",
      "trabajan en",
    ],
  },
  {
    question: "¿Pueden hacer tiendas online con Mercado Pago?",
    answer:
      "Sí, todas nuestras tiendas online incluyen integración con Mercado Pago como pasarela de pago principal. También podemos agregar otras como transferencia bancaria o Pago Express. El sistema maneja carrito de compras, inventario, cálculo de envío y seguimiento de pedidos.",
    keywords: [
      "tienda online",
      "ecommerce",
      "e-commerce",
      "mercado pago",
      "pagos",
      "carrito",
      "venta online",
      "vender online",
      "tienda virtual",
    ],
  },
  {
    question: "¿Qué es una app PWA y para qué sirve?",
    answer:
      "Una PWA (Progressive Web App) es una aplicación web que funciona como una app nativa. Se puede instalar en el celular sin pasar por una tienda de apps, envía notificaciones push, funciona offline y se actualiza automáticamente. Es más económico que una app nativa y reacha más usuarios.",
    keywords: [
      "pwa",
      "app",
      "aplicacion",
      "aplicacion movil",
      "progressive web app",
      "instalar",
      "celular",
      "notificaciones",
    ],
  },
  {
    question: "¿Ofrecen mantenimiento después de entregar el proyecto?",
    answer:
      "Sí, tenemos planes de mantenimiento mensuales desde $30 USD/mes que incluyen: hosting, backups automáticos, actualizaciones de seguridad, soporte técnico y cambios menores. También ofrecemos mantenimiento por hora si solo necesitás ocasionales ajustes.",
    keywords: [
      "mantenimiento",
      "soporte",
      "despues de entregar",
      "actualizaciones",
      "hosting",
      "backup",
      "backups",
      "arreglar",
      "cambios",
    ],
  },
  {
    question: "¿Cómo me contacto para pedir un presupuesto?",
    answer:
      `La forma más rápida es por WhatsApp. Escribinos al número que aparece en el sitio con una descripción breve de tu proyecto y te respondemos a la brevedad. También podés usar el formulario de contacto o enviar un email a ${process.env.NEXT_PUBLIC_CONTACT_EMAIL}.`,
    keywords: [
      "contacto",
      "contactar",
      "whatsapp",
      "email",
      "correo",
      "hablar",
      "como los contacto",
      "comunicarme",
    ],
  },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Busca la FAQ que mejor coincide con una pregunta escrita libremente,
 * comparando contra las palabras clave de cada entrada. Devuelve null
 * si ninguna palabra clave aparece en la consulta.
 */
export function findFaqMatch(query: string): FAQItem | null {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return null;

  let bestMatch: FAQItem | null = null;
  let bestScore = 0;

  for (const faq of faqs) {
    let score = 0;
    for (const keyword of faq.keywords) {
      const normalizedKeyword = normalize(keyword);
      if (normalizedKeyword && normalizedQuery.includes(normalizedKeyword)) {
        // Las frases de varias palabras son más específicas: pesan más.
        score += normalizedKeyword.split(" ").length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  return bestMatch;
}

import type { Metadata } from "next";
import { FAQSection } from "@/components/sections/FAQSection";
import { SchemaOrg, faqSchema } from "@/lib/schema";
import { breadcrumbSchema } from "@/lib/schema";

const faqs = [
  {
    question: "¿Cuánto cuesta hacer una página web en Resistencia?",
    answer: "Los costos varían según el tipo de proyecto. Un sitio web institucional parte desde $300 USD, una tienda online desde $500 USD y sistemas a medida desde $700 USD. El precio final depende de las funcionalidades específicas que necesites. Te recomendamos contactarnos para recibir una cotización personalizada sin compromiso.",
  },
  {
    question: "¿Cuánto tarda en hacerse una web?",
    answer: "Los tiempos promedio son: sitio institucional 2-3 semanas, e-commerce 3-5 semanas, sistema a medida 4-8 semanas. Projetos más complejos pueden requerir más tiempo. Siempre acordamos plazos realistas antes de comenzar.",
  },
  {
    question: "¿Qué incluye el servicio de desarrollo web?",
    answer: "Cada proyecto incluye: diseño responsive (móvil, tablet, desktop), optimización SEO básica, formulario de contacto, integración con Google Analytics, certificado SSL, y 30 días de soporte post-entrega. Para proyectos más grandes incluimos documentación y capacitación.",
  },
  {
    question: "¿Hacen sitios web para toda Argentina o solo el NEA?",
    answer: "Trabajamos principalmente con empresas del NEA (Chaco, Corrientes, Formosa, Misiones) porque entendemos la realidad de la región. Pero también aceptamos proyectos de todo Argentina sin problema. La comunicación es por WhatsApp y email, así que la distancia no es un límite.",
  },
  {
    question: "¿Pueden hacer tiendas online con Mercado Pago?",
    answer: "Sí, todas nuestras tiendas online incluyen integración con Mercado Pago como pasarela de pago principal. También podemos agregar otras como transferencia bancaria o Pago Express. El sistema maneja carrito de compras, inventario, cálculo de envío y seguimiento de pedidos.",
  },
  {
    question: "¿Qué es una app PWA y para qué sirve?",
    answer: "Una PWA (Progressive Web App) es una aplicación web que funciona como una app nativa. Se puede instalar en el celular sin pasar por una tienda de apps, envía notificaciones push, funciona offline y se actualiza automáticamente. Es más económico que una app nativa y reacha más usuarios.",
  },
  {
    question: "¿Ofrecen mantenimiento después de entregar el proyecto?",
    answer: "Sí, tenemos planes de mantenimiento mensuales desde $30 USD/mes que incluyen: hosting, backups automáticos, actualizaciones de seguridad, soporte técnico y cambios menores. También ofrecemos mantenimiento por hora si solo necesitás ocasionales ajustes.",
  },
  {
    question: "¿Cómo me contacto para pedir un presupuesto?",
    answer: "La forma más rápida es por WhatsApp. Escribinos al número que aparece en el sitio con una descripción breve de tu proyecto y te respondemos a la brevedad. También podés usar el formulario de contacto o enviar un email a hola@devbyte.com.ar.",
  },
];

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | DevByte — Desarrollo Web en Resistencia, Chaco",
  description: "Respuestas a las preguntas más comunes sobre desarrollo web, precios, tiempos y servicios de DevByte en el NEA.",
  keywords: ["preguntas frecuentes desarrollo web", "FAQ DevByte", "precio página web Resistencia"],
};

export default function FAQPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema(faqs)} />
      <SchemaOrg schema={breadcrumbSchema([
        { name: "Inicio", url: "https://devbyte.com.ar" },
        { name: "Preguntas Frecuentes", url: "https://devbyte.com.ar/preguntas-frecuentes" },
      ])} />
      <FAQSection />
    </>
  );
}
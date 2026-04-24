"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Cuánto cuesta hacer una página web en Resistencia?",
    answer:
      "Los costos varían según el tipo de proyecto. Un sitio web institucional parte desde $300 USD, una tienda online desde $500 USD y sistemas a medida desde $700 USD. El precio final depende de las funcionalidades específicas que necesites. Te recomendamos contactarnos para recibir una cotización personalizada sin compromiso.",
  },
  {
    question: "¿Cuánto tarda en hacerse una web?",
    answer:
      "Los tiempos promedio son: sitio institucional 2-3 semanas, e-commerce 3-5 semanas, sistema a medida 4-8 semanas. Projetos más complejos pueden requerir más tiempo. Siempre acordamos plazos realistas antes de comenzar.",
  },
  {
    question: "¿Qué incluye el servicio de desarrollo web?",
    answer:
      "Cada proyecto incluye: diseño responsive (móvil, tablet, desktop), optimización SEO básica, formulario de contacto, integración con Google Analytics, certificado SSL, y 30 días de soporte post-entrega. Para proyectos más grandes incluimos documentación y capacitación.",
  },
  {
    question: "¿Hacen sitios web para toda Argentina o solo el NEA?",
    answer:
      "Trabajamos principalmente con empresas del NEA (Chaco, Corrientes, Formosa, Misiones) porque entendemos la realidad de la región. Pero también aceptamos proyectos de todo Argentina sin problema. La comunicación es por WhatsApp y email, así que la distancia no es un límite.",
  },
  {
    question: "¿Pueden hacer tiendas online con Mercado Pago?",
    answer:
      "Sí, todas nuestras tiendas online incluyen integración con Mercado Pago como pasarela de pago principal. También podemos agregar otras como transferencia bancaria o Pago Express. El sistema maneja carrito de compras, inventario, cálculo de envío y seguimiento de pedidos.",
  },
  {
    question: "¿Qué es una app PWA y para qué sirve?",
    answer:
      "Una PWA (Progressive Web App) es una aplicación web que funciona como una app nativa. Se puede instalar en el celular sin pasar por una tienda de apps, envía notificaciones push, funciona offline y se actualiza automáticamente. Es más económico que una app nativa y reacha más usuarios.",
  },
  {
    question: "¿Ofrecen mantenimiento después de entregar el proyecto?",
    answer:
      "Sí, tenemos planes de mantenimiento mensuales desde $30 USD/mes que incluyen: hosting, backups automáticos, actualizaciones de seguridad, soporte técnico y cambios menores. También ofrecemos mantenimiento por hora si solo necesitás ocasionales ajustes.",
  },
  {
    question: "¿Cómo me contacto para pedir un presupuesto?",
    answer:
      `La forma más rápida es por WhatsApp. Escribinos al número que aparece en el sitio con una descripción breve de tu proyecto y te respondemos a la brevedad. También podés usar el formulario de contacto o enviar un email a ${process.env.NEXT_PUBLIC_CONTACT_EMAIL}.`,
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="preguntas-frecuentes"
      className="py-16 md:py-24 px-4 md:px-8 bg-surface relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="max-w-3xl mx-auto relative">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full mb-4">
              <HelpCircle className="text-accent" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">
              Preguntas Frecuentes sobre Desarrollo Web en el NEA
            </h2>
            <p className="text-text-muted mt-4">
              Resolvé tus dudas antes de contactarnos
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal
              key={index}
              delay={((index % 4) * 100) as 0 | 100 | 200 | 300}
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md hover:shadow-accent/10 transition-all duration-300 border border-gray-100 hover:border-accent/30 group">
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 text-left"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-primary pr-4 group-hover:text-accent transition-colors duration-300">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "text-accent flex-shrink-0 transition-all duration-300 group-hover:scale-110",
                      openIndex === index && "rotate-180",
                    )}
                    size={20}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={cn(
                    "overflow-hidden transition-all duration-500 ease-out",
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0",
                  )}
                >
                  <p className="px-6 pb-6 text-text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { FAQSection } from "@/components/sections/FAQSection";
import { SchemaOrg, faqSchema } from "@/lib/schema";
import { breadcrumbSchema } from "@/lib/schema";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title:
    "Preguntas Frecuentes | DevByte — Desarrollo Web en Resistencia, Chaco",
  description:
    "Respuestas a las preguntas más comunes sobre desarrollo web, precios, tiempos y servicios de DevByte en el NEA.",
  keywords: [
    "preguntas frecuentes desarrollo web",
    "FAQ DevByte",
    "precio página web Resistencia",
  ],
};

export default function FAQPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema(faqs)} />
      <SchemaOrg
        schema={breadcrumbSchema([
          { name: "Inicio", url: "https://devbyte.com.ar" },
          {
            name: "Preguntas Frecuentes",
            url: "https://devbyte.com.ar/preguntas-frecuentes",
          },
        ])}
      />
      <FAQSection />
    </>
  );
}

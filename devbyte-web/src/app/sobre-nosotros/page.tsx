import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { SchemaOrg, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Sobre Nosotros | DevByte — Desarrollo Digital en Resistencia, Chaco",
  description: "Conocé a Fabricio Barreto y Francisco Vazquez, fundadores de DevByte. Agencia de desarrollo web en Resistencia, Chaco.",
  keywords: ["devbyte equipo", "fabricio barreto", "francisco vazquez", "agencia web Resistencia"],
};

export default function AboutPage() {
  return (
    <>
      <SchemaOrg schema={breadcrumbSchema([
        { name: "Inicio", url: "https://devbyte.com.ar" },
        { name: "Sobre Nosotros", url: "https://devbyte.com.ar/sobre-nosotros" },
      ])} />
      <AboutSection />
    </>
  );
}
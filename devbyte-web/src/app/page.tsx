import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "DevByte | Agencia de Desarrollo Web en Resistencia, Chaco",
  description:
    "Agencia de desarrollo web y soluciones digitales en Resistencia, Chaco. Creamos sitios web, apps y sistemas a medida para pymes y municipios del NEA.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <AboutSection />
      <ServiceAreaSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
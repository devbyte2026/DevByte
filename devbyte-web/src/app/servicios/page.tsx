import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, ShoppingCart, Code, Smartphone, Shield, Lightbulb } from "lucide-react";
import { services } from "@/lib/services";
import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Servicios de Desarrollo Web | DevByte — Resistencia, Chaco",
  description: "Sitios web, e-commerce, sistemas a medida, apps PWA y más. Soluciones digitales para pymes y municipios del NEA.",
};

const iconMap: Record<string, React.ElementType> = {
  globe: Globe,
  "shopping-cart": ShoppingCart,
  code: Code,
  smartphone: Smartphone,
  shield: Shield,
  lightbulb: Lightbulb,
};

export default function ServicesPage() {
  return (
    <SectionWrapper background="default">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-primary mb-4">
          Servicios de Desarrollo Web
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto text-lg">
          Soluciones digitales completas para tu negocio en el NEA argentino
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = iconMap[service.icon] || Code;
          return (
            <Link key={service.slug} href={`/servicios/${service.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all cursor-pointer group">
                <Icon className="text-accent mb-4" size={40} />
                <h2 className="text-xl font-bold font-display text-primary mb-2">{service.title}</h2>
                <p className="text-text-muted mb-4">{service.descriptionLong}</p>
                <ul className="space-y-2 mb-4">
                  {service.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i} className="flex items-center text-sm text-text-muted">
                      <span className="text-accent mr-2">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center text-accent font-medium group-hover:underline">
                  Ver detalles <ArrowRight className="ml-2" size={16} />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
import Link from "next/link";
import { ArrowRight, Globe, ShoppingCart, Code, Smartphone, Shield, Lightbulb } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { services } from "@/lib/services";

const iconMap: Record<string, React.ElementType> = {
  globe: Globe,
  "shopping-cart": ShoppingCart,
  code: Code,
  smartphone: Smartphone,
  shield: Shield,
  lightbulb: Lightbulb,
};

export function ServicesSection() {
  return (
    <section id="servicios" className="py-16 md:py-24 px-4 md:px-8 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">
            Nuestros Servicios
          </h2>
          <p className="text-text-muted mt-4 max-w-xl mx-auto">
            Soluciones digitales completas para tu negocio en el NEA
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Code;
            return (
              <Link key={service.slug} href={`/servicios/${service.slug}`} className="block">
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer border border-gray-100">
                  <Icon className="text-accent mb-4" size={32} />
                  <CardTitle className="text-primary">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                  <ul className="mt-4 space-y-2">
                    {service.benefits.slice(0, 3).map((benefit, i) => (
                      <li key={i} className="flex items-center text-sm text-text-muted">
                        <span className="text-accent mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center text-accent text-sm font-medium">
                    Ver más <ArrowRight className="ml-1" size={16} />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
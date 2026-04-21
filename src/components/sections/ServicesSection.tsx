import Link from "next/link";
import { ArrowRight, Globe, ShoppingCart, Code, Smartphone, Shield, Lightbulb } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { services } from "@/lib/services";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
    <section id="servicios" className="py-16 md:py-24 px-4 md:px-8 bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">
              Nuestros Servicios
            </h2>
            <p className="text-text-muted mt-4 max-w-xl mx-auto">
              Soluciones digitales completas para tu negocio en el NEA
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code;
            return (
              <ScrollReveal key={service.slug} delay={(index % 3) * 100 as 0 | 100 | 200 | 300}>
                <Link href={`/servicios/${service.slug}`} className="block group">
                  <Card className="h-full flex flex-col transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-accent/10 cursor-pointer border border-gray-100 hover:border-accent/30 bg-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 flex flex-col flex-1">
                      <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Icon className="text-accent group-hover:drop-shadow-[0_0_8px_rgba(0,180,216,0.5)] transition-all duration-300" size={32} />
                      </div>
                      <CardTitle className="text-primary group-hover:text-accent transition-colors duration-300">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                      <ul className="mt-4 space-y-2">
                        {service.benefits.slice(0, 3).map((benefit, i) => (
                          <li key={i} className="flex items-center text-sm text-text-muted">
                            <span className="text-accent mr-2">✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto flex items-center text-accent text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                        Ver detalles <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                      </div>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

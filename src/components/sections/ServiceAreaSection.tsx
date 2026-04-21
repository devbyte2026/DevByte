import Link from "next/link";
import { MapPin, CheckCircle2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const cities = [
  { name: "Resistencia", province: "Chaco" },
  { name: "Corrientes", province: "Corrientes" },
  { name: "Posadas", province: "Misiones" },
  { name: "Formosa", province: "Formosa" },
  { name: "Charata", province: "Chaco" },
  { name: "Villa Ángela", province: "Chaco" },
  { name: "Presidencia Roque Sáenz Peña", province: "Chaco" },
  { name: "San Justo", province: "Chaco" },
  { name: "Puerto Vilelas", province: "Chaco" },
  { name: "Barranqueras", province: "Chaco" },
  { name: "Fontana", province: "Chaco" },
  { name: "Clorinda", province: "Formosa" },
];

const services = [
  "Sitios web institucionales",
  "Tiendas online (e-commerce)",
  "Sistemas a medida",
  "Apps PWA",
  "Mantenimiento y soporte",
  "Consultoría digital",
];

export function ServiceAreaSection() {
  return (
    <section id="areas-de-cobertura" className="py-16 md:py-24 px-4 md:px-8 bg-surface-muted relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">
              Áreas de Cobertura — NEA Argentina
            </h2>
            <p className="text-text-muted mt-4 max-w-xl mx-auto">
              Trabajamos con empresas y municipios de toda la región NEA. Conocemos la realidad local.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12">
          <ScrollReveal direction="left">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-6 flex items-center gap-2">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <MapPin className="text-accent" size={22} />
                </div>
                Ciudades donde trabajamos
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {cities.map((city) => (
                  <div
                    key={city.name}
                    className="flex items-center gap-2 text-sm text-text-muted p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-300 group"
                  >
                    <CheckCircle2 className="text-accent flex-shrink-0 group-hover:scale-110 transition-transform" size={14} />
                    <span>{city.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={200}>
            <Card className="p-8 bg-white hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 border border-gray-100 hover:border-accent/30 h-full">
              <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Sparkles className="text-accent" size={20} />
                Servicios disponibles en toda la región
              </h3>
              <ul className="space-y-3 mb-6">
                {services.map((service) => (
                  <li key={service} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <CheckCircle2 className="text-accent" size={18} />
                    </div>
                    <span className="group-hover:text-accent transition-colors">{service}</span>
                  </li>
                ))}
              </ul>
              <p className="text-text-muted text-sm mb-6">
                Si tu ciudad no aparece en la lista, consultanos igual. Trabajamos en todo el NEA.
              </p>
              <Button asChild className="shadow-lg shadow-accent/15 hover:shadow-accent/25 transition-all duration-300">
                <Link href="/contacto">Contactar ahora</Link>
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

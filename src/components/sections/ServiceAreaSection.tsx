import Link from "next/link";
import { MapPin, CheckCircle2 } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const cities = [
  { name: "Resistencia", province: "Chaco" },
  { name: "Corrientes", province: "Corrientes" },
  { name: "Posadas", province: "Misiones" },
  { name: "Formosa", province: "Formosa" },
  { name: "Charata", province: "Chaco" },
  { name: "Villa Ángela", province: "Chaco" },
  { name: " Sáenz Peña", province: "Chaco" },
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
    <SectionWrapper id="areas-de-cobertura" background="muted">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">
          Áreas de Cobertura — NEA Argentina
        </h2>
        <p className="text-text-muted mt-4 max-w-xl mx-auto">
          Trabajamos con empresas y municipios de toda la región NEA. Conocemos la realidad local.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-6 flex items-center gap-2">
            <MapPin className="text-accent" size={22} />
            Ciudades donde trabajamos
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {cities.map((city) => (
              <div
                key={city.name}
                className="flex items-center gap-2 text-sm text-text-muted"
              >
                <CheckCircle2 className="text-accent flex-shrink-0" size={14} />
                <span>{city.name}, {city.province}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="p-8">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Servicios disponibles en toda la región
          </h3>
          <ul className="space-y-3 mb-6">
            {services.map((service) => (
              <li key={service} className="flex items-center gap-2">
                <CheckCircle2 className="text-accent" size={18} />
                <span>{service}</span>
              </li>
            ))}
          </ul>
          <p className="text-text-muted text-sm mb-6">
            Si tu ciudad no aparece en la lista, consultanos igual. Trabajamos en todo el NEA.
          </p>
          <Button asChild>
            <Link href="/contacto">Contactar ahora</Link>
          </Button>
        </Card>
      </div>
    </SectionWrapper>
  );
}
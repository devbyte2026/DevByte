import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { services, Service } from "@/lib/services";
import { SchemaOrg, websiteSchema } from "@/lib/schema";

const websiteSchemaData = websiteSchema();

export function Hero() {
  return (
    <>
      <SchemaOrg schema={websiteSchemaData} />
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary via-primary-light to-primary">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-6 animate-fade-in">
              Agencia de Desarrollo Web — NEA Argentina
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-text-inverted leading-tight animate-slide-up">
              Desarrollo Web Profesional en Resistencia, Chaco
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mt-6 max-w-2xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Transformamos tu negocio del NEA con sitios web, apps y sistemas
              digitales a medida. Más de 10 proyectos entregados en la región.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <Link
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola%2C%20vi%20la%20web%20de%20DevByte%20y%20me%20interesa%20un%20presupuesto%20para...`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicitar Presupuesto Gratis
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/portfolio">Ver Nuestro Portfolio</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">10+</p>
                <p className="text-sm text-gray-300">Proyectos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">NEA</p>
                <p className="text-sm text-gray-300">Argentina</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">24/7</p>
                <p className="text-sm text-gray-300">Soporte Local</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
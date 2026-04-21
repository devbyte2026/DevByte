import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SchemaOrg, websiteSchema } from "@/lib/schema";

const websiteSchemaData = websiteSchema();

export function Hero() {
  return (
    <>
      <SchemaOrg schema={websiteSchemaData} />
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />

        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-accent/40 rounded-full animate-float" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-accent/50 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-accent/60 rounded-full animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="absolute top-32 right-20 border-2 border-accent/20 rounded-xl w-20 h-20 animate-float rotate-12" style={{ animationDelay: "0.3s" }} />
        <div className="absolute bottom-40 left-20 border-2 border-white/10 rounded-full w-16 h-16 animate-float" style={{ animationDelay: "1.2s" }} />
        <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-accent/30 rotate-45 animate-float" style={{ animationDelay: "2s" }} />

        <div className="max-w-6xl mx-auto px-4 md:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-6 animate-fade-in border-accent/30 bg-accent/10 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 mr-1" />
              Agencia de Desarrollo Web — NEA Argentina
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-text-inverted leading-tight animate-slide-up">
              Desarrollo Web Profesional en Resistencia, Chaco
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mt-6 max-w-2xl animate-slide-up text-balance" style={{ animationDelay: "0.1s" }}>
              Transformamos tu negocio del NEA con sitios web, apps y sistemas
              digitales a medida. Más de{' '}
              <span className="text-accent font-semibold">10 proyectos</span>
              {' '}entregados en la región.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300 hover:scale-105 group">
                <Link
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola%2C%20vi%20la%20web%20de%20DevByte%20y%20me%20interesa%20un%20presupuesto%20para...`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicitar Presupuesto Gratis
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300">
                <Link href="/portfolio">Ver Nuestro Portfolio</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="group text-center transition-all duration-300 hover:scale-110">
                <p className="text-4xl font-bold text-gradient">10+</p>
                <p className="text-sm text-gray-300 mt-1">Proyectos</p>
              </div>
              <div className="group text-center transition-all duration-300 hover:scale-110">
                <p className="text-4xl font-bold text-gradient">NEA</p>
                <p className="text-sm text-gray-300 mt-1">Argentina</p>
              </div>
              <div className="group text-center transition-all duration-300 hover:scale-110">
                <p className="text-4xl font-bold text-gradient">24/7</p>
                <p className="text-sm text-gray-300 mt-1">Soporte Local</p>
              </div>
              <div className="group text-center transition-all duration-300 hover:scale-110">
                <p className="text-4xl font-bold text-gradient">100%</p>
                <p className="text-sm text-gray-300 mt-1">Clientes Satisfechos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </section>
    </>
  );
}

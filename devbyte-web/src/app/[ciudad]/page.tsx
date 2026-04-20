import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { cities } from "@/lib/cities";
import { services } from "@/lib/services";
import { portfolio } from "@/lib/portfolio";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { SchemaOrg, breadcrumbSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ ciudad: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ciudad } = await params;
  const city = cities.find((c) => c.slug === ciudad);
  if (!city) return { title: "Ciudad no encontrada" };

  return {
    title: `Desarrollo Web en ${city.name}, ${city.province} | DevByte`,
    description: `Agencia de desarrollo web en ${city.name}, ${city.province}. Sitios web, apps y sistemas a medida para empresas del ${city.province}.`,
    keywords: city.keywords,
  };
}

export function generateStaticParams() {
  return cities.map((city) => ({ ciudad: city.slug }));
}

const cityServices = [
  "Sitios web institucionales",
  "Tiendas online con Mercado Pago",
  "Sistemas de gestión a medida",
  "Apps PWA",
  "Mantenimiento y soporte",
];

const cityBenefits = [
  "Atención personalizada",
  "Conocimiento de la región",
  "Precios accesibles",
  "Soporte en tu idioma",
];

export default async function CityPage({ params }: Props) {
  const { ciudad } = await params;
  const city = cities.find((c) => c.slug === ciudad);
  if (!city) notFound();

  const cityProjects = portfolio.filter((p) =>
    p.slug.includes(ciudad) || ["menulia", "gorilagym", "liga-makalle"].includes(p.slug)
  ).slice(0, 3);

  return (
    <>
      <SchemaOrg schema={breadcrumbSchema([
        { name: "Inicio", url: "https://devbyte.com.ar" },
        { name: "Cobertura", url: "https://devbyte.com.ar/cobertura" },
        { name: city.name, url: `https://devbyte.com.ar/${ciudad}` },
      ])} />

      <SectionWrapper background="gradient">
        <div className="text-center">
          <Badge variant="accent" className="mb-4">Cobertura en {city.province}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-text-inverted mb-4">
            Desarrollo Web en {city.name}
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-2">
            {city.description}
          </p>
          <p className="text-gray-400 text-sm">Población: {city.population}</p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="default">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold font-display text-primary mb-6">
              Servicios disponibles en {city.name}
            </h2>
            <ul className="space-y-4 mb-8">
              {cityServices.map((service) => (
                <li key={service} className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent flex-shrink-0" size={20} />
                  <span>{service}</span>
                </li>
              ))}
            </ul>

            <div className="bg-surface-muted p-6 rounded-xl mb-8">
              <h3 className="font-semibold text-primary mb-4">Proyectos en la zona</h3>
              {cityProjects.length > 0 ? (
                <div className="space-y-3">
                  {cityProjects.map((project) => (
                    <Link key={project.slug} href={`/portfolio/${project.slug}`} className="block text-sm text-text-muted hover:text-accent">
                      → {project.name} ({project.category})
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-muted">Próximamente casos de éxito en {city.name}</p>
              )}
            </div>

            <div className="flex items-center gap-3 text-text-muted text-sm">
              <MapPin className="text-accent" size={18} />
              <span>Atendemos {city.name} y toda la región</span>
            </div>
          </div>

          <div>
            <Card className="p-6">
              <h3 className="text-xl font-bold font-display text-primary mb-4">
                Solicitar presupuesto en {city.name}
              </h3>
              <QuoteForm />
            </Card>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="muted">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-display text-primary">
            ¿Por qué elegir DevByte en {city.name}?
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cityBenefits.map((benefit) => (
            <Card key={benefit} className="p-6 text-center">
              <CheckCircle2 className="text-accent mx-auto mb-3" size={32} />
              <h4 className="font-semibold text-primary">{benefit}</h4>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
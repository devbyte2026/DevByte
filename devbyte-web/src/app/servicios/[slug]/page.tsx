import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { services } from "@/lib/services";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SchemaOrg, serviceSchema, breadcrumbSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Servicio no encontrado" };

  return {
    title: `${service.title} en Resistencia Chaco | DevByte`,
    description: service.descriptionLong,
    keywords: service.keywords,
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const relatedServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <SchemaOrg schema={serviceSchema(service)} />
      <SchemaOrg schema={breadcrumbSchema([
        { name: "Inicio", url: "https://devbyte.com.ar" },
        { name: "Servicios", url: "https://devbyte.com.ar/servicios" },
        { name: service.title, url: `https://devbyte.com.ar/servicios/${service.slug}` },
      ])} />

      <SectionWrapper background="default">
        <div className="mb-8">
          <Link href="/servicios" className="inline-flex items-center text-text-muted hover:text-accent">
            <ArrowLeft className="mr-2" size={18} /> Volver a Servicios
          </Link>
        </div>

        <div className="max-w-3xl">
          <Badge variant="accent" className="mb-4">Servicio</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-primary mb-6">
            {service.title}
          </h1>
          <p className="text-lg text-text-muted mb-8">{service.descriptionLong}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {service.technologies.map((tech) => (
              <Badge key={tech} variant="outline">{tech}</Badge>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div>
            <h2 className="text-2xl font-bold font-display text-primary mb-6">¿Qué incluye?</h2>
            <ul className="space-y-4">
              {service.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card variant="featured" className="p-8">
            <h3 className="text-xl font-bold mb-4">¿Te interesa este servicio?</h3>
            <p className="text-gray-200 mb-6">
              Consulta sin compromiso. Te respondemos a la brevedad.
            </p>
            <p className="text-sm text-gray-400 mb-6">Precio de referencia: {service.priceReference}</p>
            <Button asChild size="lg" className="w-full">
              <Link
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola!%20Me%20interesa%20el%20servicio%20de%20${encodeURIComponent(service.title)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar Presupuesto
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </Card>
        </div>
      </SectionWrapper>

      <SectionWrapper background="muted">
        <h2 className="text-2xl font-bold font-display text-primary mb-8 text-center">
          Otros servicios que te pueden interesar
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedServices.map((s) => (
            <Link key={s.slug} href={`/servicios/${s.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all cursor-pointer">
                <h3 className="font-semibold text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-text-muted">{s.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
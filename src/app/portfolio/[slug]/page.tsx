import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { services } from "@/lib/services";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SchemaOrg, breadcrumbSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.find((p) => p.slug === slug);
  if (!project) return { title: "Proyecto no encontrado" };

  return {
    title: `${project.name} | Portfolio DevByte`,
    description: project.description,
    keywords: project.technologies,
  };
}

export async function generateStaticParams() {
  return portfolio.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolio.find((p) => p.slug === slug);
  if (!project) notFound();

  const relatedProjects = portfolio.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <SchemaOrg schema={breadcrumbSchema([
        { name: "Inicio", url: "https://devbyte.com.ar" },
        { name: "Portfolio", url: "https://devbyte.com.ar/portfolio" },
        { name: project.name, url: `https://devbyte.com.ar/portfolio/${project.slug}` },
      ])} />

      <SectionWrapper background="default">
        <div className="mb-8">
          <Link href="/portfolio" className="inline-flex items-center text-text-muted hover:text-accent">
            <ArrowLeft className="mr-2" size={18} /> Volver a Portfolio
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Badge variant="accent" className="mb-4">{project.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-display text-primary mb-6">
              {project.name}
            </h1>
            <p className="text-lg text-text-muted mb-8">{project.description}</p>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold font-display text-primary mb-3">El Problema</h2>
                <p className="text-text-muted">{project.problem}</p>
              </div>
              <div>
                <h2 className="text-xl font-bold font-display text-primary mb-3">Nuestra Solución</h2>
                <p className="text-text-muted">{project.solution}</p>
              </div>
              {project.results && (
                <div className="bg-accent/10 p-6 rounded-xl">
                  <h2 className="text-xl font-bold font-display text-primary mb-2">Resultados</h2>
                  <p className="text-accent font-semibold text-lg">{project.results}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary to-primary-light h-64 rounded-xl flex items-center justify-center">
              <span className="text-4xl font-bold text-white/20">{project.name}</span>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Tecnologías usadas</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline">{tech}</Badge>
                ))}
              </div>
            </Card>

            <Card variant="featured" className="p-8">
              <h3 className="text-xl font-bold mb-4">¿Necesitás algo similar?</h3>
              <p className="text-gray-200 mb-6">
                Contactanos y te ayudamos a crear la solución perfecta para tu negocio.
              </p>
              <Button asChild size="lg" className="w-full">
                <Link
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola!%20Vi%20el%20proyecto%20${encodeURIComponent(project.name)}%20en%20el%20portfolio%20de%20DevByte%20y%20me%20interesa%20un%20presupuesto`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pedir Presupuesto
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="muted">
        <h2 className="text-2xl font-bold font-display text-primary mb-8 text-center">
          Otros proyectos que te pueden interesar
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedProjects.map((p) => (
            <Link key={p.slug} href={`/portfolio/${p.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all cursor-pointer">
                <h3 className="font-semibold text-primary mb-2">{p.name}</h3>
                <p className="text-sm text-text-muted">{p.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
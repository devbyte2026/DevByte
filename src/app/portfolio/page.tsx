import { Metadata } from "next";
import Link from "next/link";
import { portfolio } from "@/lib/portfolio";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SchemaOrg, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Portfolio | DevByte — Proyectos de Desarrollo Web en el NEA",
  description: "Casos de éxito de sitios web, e-commerce, sistemas a medida y apps PWA para empresas y municipios del NEA argentino.",
};

const categoryLabels: Record<string, string> = {
  sistemas: "Sistemas",
  ecommerce: "E-commerce",
  municipal: "Municipal",
  saas: "SaaS",
};

export default function PortfolioPage() {
  return (
    <>
      <SchemaOrg schema={breadcrumbSchema([
        { name: "Inicio", url: "https://devbyte.com.ar" },
        { name: "Portfolio", url: "https://devbyte.com.ar/portfolio" },
      ])} />

      <SectionWrapper background="default">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-primary mb-4">
            Nuestros Proyectos
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Casos de éxito de empresas y municipios del NEA que transformaron su negocio con DevByte
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((project) => (
            <Link key={project.slug} href={`/portfolio/${project.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all cursor-pointer overflow-hidden p-0">
                <div className="bg-gradient-to-br from-primary to-primary-light h-40 flex items-center justify-center relative">
                  <span className="text-2xl font-bold text-white/20">{project.name}</span>
                  <Badge variant="accent" className="absolute top-4 right-4">
                    {categoryLabels[project.category]}
                  </Badge>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold font-display text-primary mb-2">{project.name}</h2>
                  <p className="text-text-muted mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs bg-surface-muted px-2 py-1 rounded text-text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.results && (
                    <p className="text-sm text-accent font-medium">📈 {project.results}</p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
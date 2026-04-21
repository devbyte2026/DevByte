"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { portfolio } from "@/lib/portfolio";

type Category = "todos" | "sistemas" | "ecommerce" | "municipal" | "saas";

const categories: { value: Category; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "sistemas", label: "Sistemas" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "municipal", label: "Municipal" },
  { value: "saas", label: "SaaS" },
];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("todos");

  const filtered = activeCategory === "todos"
    ? portfolio
    : portfolio.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-16 md:py-24 px-4 md:px-8 bg-surface-muted">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">
            Nuestros Proyectos
          </h2>
          <p className="text-text-muted mt-4 max-w-xl mx-auto">
            Casos de éxito de empresas y municipios del NEA que confiaron en DevByte
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.value
                  ? "bg-accent text-white"
                  : "bg-white text-text-muted hover:bg-gray-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <Link key={project.slug} href={`/portfolio/${project.slug}`} className="block">
              <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer overflow-hidden p-0">
                <div className="bg-gradient-to-br from-primary to-primary-light h-40 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white/20">{project.name}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                  <CardTitle className="text-primary">{project.name}</CardTitle>
                  <CardDescription className="mt-2 line-clamp-2">
                    {project.description}
                  </CardDescription>
                  {project.results && (
                    <p className="mt-3 text-sm text-accent font-medium">
                      📈 {project.results}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs bg-surface-muted px-2 py-1 rounded text-text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
          >
            Ver todos los proyectos <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
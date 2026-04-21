"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { portfolio } from "@/lib/portfolio";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
    <section id="portfolio" className="py-16 md:py-24 px-4 md:px-8 bg-surface-muted relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto relative">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">
              Nuestros Proyectos
            </h2>
            <p className="text-text-muted mt-4 max-w-xl mx-auto">
              Casos de éxito de empresas y municipios del NEA que confiaron en DevByte
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.value
                  ? "bg-accent text-white shadow-lg shadow-accent/30 scale-105"
                  : "bg-white text-text-muted hover:bg-gray-50 hover:scale-[1.02]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, index) => (
            <ScrollReveal key={project.slug} delay={(index % 3) * 100 as 0 | 100 | 200 | 300}>
              <Link href={`/portfolio/${project.slug}`} className="block group">
                <Card className="h-full transition-all duration-500 cursor-pointer overflow-hidden p-0 bg-white hover:shadow-2xl hover:shadow-accent/15 hover:-translate-y-2 border border-gray-100 hover:border-accent/30">
                  <div className="relative overflow-hidden">
                    <div className="bg-gradient-to-br from-primary via-primary-light to-accent/30 h-40 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110">
                      <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
                      <span className="text-2xl font-bold text-white/30 group-hover:scale-125 transition-transform duration-500">{project.name}</span>
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="text-white text-sm font-medium flex items-center gap-1">
                          Ver proyecto <ExternalLink size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs border-accent/30 text-accent">{project.category}</Badge>
                    </div>
                    <CardTitle className="text-primary group-hover:text-accent transition-colors duration-300">{project.name}</CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">
                      {project.description}
                    </CardDescription>
                    {project.results && (
                      <p className="mt-3 text-sm text-accent font-medium flex items-center gap-1">
                        <Sparkles size={12} />
                        {project.results}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs bg-surface-muted px-2 py-1 rounded text-text-muted group-hover:bg-accent/10 transition-colors duration-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-accent font-medium hover:underline group"
            >
              Ver todos los proyectos
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

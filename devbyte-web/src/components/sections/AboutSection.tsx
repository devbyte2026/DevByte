import Link from "next/link";
import { CheckCircle2, MapPin, Code, Headphones, Wallet } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SchemaOrg, personSchema } from "@/lib/schema";

const team = [
  {
    name: "Fabricio Barreto",
    role: "Co-Fundador & Desarrollador Full Stack",
    description: "Especialista en desarrollo de aplicaciones web con Next.js y arquitecturas escalables. Enfoque en soluciones a medida para el NEA.",
  },
  {
    name: "Francisco Vazquez",
    role: "Co-Fundador & Diseñador UX/UI",
    description: "Diseñador centrado en la experiencia del usuario. Crea interfaces que convierten visitantes en clientes.",
  },
];

const differentiators = [
  {
    icon: MapPin,
    title: "Conocemos el NEA",
    description: "Entendemos la realidad de las empresas chaqueñas. Diseñamos soluciones pensadas para pyme locales.",
  },
  {
    icon: Code,
    title: "Tecnología de Primer Nivel",
    description: "Usamos Next.js 15, TypeScript, Tailwind CSS. Stack moderno que garantiza rendimiento y escalabilidad.",
  },
  {
    icon: Headphones,
    title: "Soporte en Tu Idioma",
    description: "Atención personalizada en español rioplatense. Sin tiempos de espera ni complicaciones.",
  },
  {
    icon: Wallet,
    title: "Precios Accesibles",
    description: "Costos competitivos adaptados al mercado regional. Calidad profesional sin pagar precios de capital.",
  },
];

export function AboutSection() {
  return (
    <section id="sobre-nosotros" className="py-16 md:py-24 px-4 md:px-8 bg-surface-muted">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">
            Somos DevByte — Desarrollo Digital desde el NEA
          </h2>
          <p className="text-text-muted mt-4 max-w-2xl mx-auto">
            Somos una agencia de desarrollo web fundada en Resistencia, Chaco, con la misión de llevar soluciones digitales de calidad a empresas y municipios del NEA argentino.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {team.map((member) => (
            <Card key={member.name} variant="default" className="flex gap-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {member.name[0]}
              </div>
              <div>
                <h3 className="text-xl font-semibold font-display text-primary">{member.name}</h3>
                <p className="text-accent font-medium text-sm">{member.role}</p>
                <p className="text-text-muted mt-2 text-sm">{member.description}</p>
              </div>
              <SchemaOrg schema={personSchema({ ...member, jobTitle: member.role })} />
            </Card>
          ))}
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold font-display text-primary text-center mb-8">
            ¿Por qué elegir DevByte?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} variant="glass" className="text-center">
                  <Icon className="text-accent mx-auto mb-4" size={40} />
                  <h4 className="font-semibold text-primary mb-2">{item.title}</h4>
                  <p className="text-sm text-text-muted">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold text-primary mb-4">Tecnologías que usamos</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Next.js 15", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Supabase", "Vercel"].map((tech) => (
              <span key={tech} className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm text-text-muted">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
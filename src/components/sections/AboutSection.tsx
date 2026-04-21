import { MapPin, Code, Headphones, Wallet, Users, Zap, HeartHandshake } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SchemaOrg, personSchema } from "@/lib/schema";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const team = [
  {
    name: "Fabricio Barreto",
    role: "Co-Fundador & Desarrollador Full Stack",
    description: "Especialista en desarrollo de aplicaciones web con Next.js y arquitecturas escalables. Enfoque en soluciones a medida para el NEA.",
  },
  {
    name: "Francisco Vazquez",
    role: "Co-Fundador & Desarrollador Frontend + UX/UI",
    description: "Especialista en diseño de experiencias y desarrollo frontend. Enfocado en crear interfaces modernas y funcionales que impulsen el crecimiento digital de empresas en el NEA.",
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

const values = [
  { icon: Users, label: "Enfoque Humano" },
  { icon: Zap, label: "Entrega Rápida" },
  { icon: HeartHandshake, label: "Confianza" },
];

export function AboutSection() {
  return (
    <section id="sobre-nosotros" className="py-16 md:py-24 px-4 md:px-8 bg-surface-muted relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto relative">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-primary tracking-tight">
              Somos DevByte — Desarrollo Digital desde el NEA
            </h2>
            <p className="text-text-muted mt-4 max-w-2xl mx-auto">
              Somos una agencia de desarrollo web fundada en Resistencia, Chaco, con la misión de llevar soluciones digitales de calidad a empresas y municipios del NEA argentino.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {team.map((member, index) => (
            <ScrollReveal key={member.name} delay={(index % 2) * 100 as 0 | 100 | 200 | 300} direction={index === 0 ? "left" : "right"}>
              <Card variant="default" className="flex gap-6 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 border border-gray-100 hover:border-accent/30">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg shadow-accent/20">
                  {member.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-semibold font-display text-primary">{member.name}</h3>
                  <p className="text-cyan-700 font-semibold text-sm">{member.role}</p>
                  <p className="text-text-muted mt-2 text-sm">{member.description}</p>
                </div>
                <SchemaOrg schema={personSchema({ ...member, jobTitle: member.role })} />
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="mb-16">
          <ScrollReveal>
            <h3 className="text-2xl font-bold font-display text-primary text-center mb-8">
              ¿Por qué elegir DevByte?
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={(index % 4) * 100 as 0 | 100 | 200 | 300}>
                  <Card variant="glass" className="text-center hover:bg-white/90 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Icon className="text-accent group-hover:drop-shadow-[0_0_8px_rgba(0,180,216,0.5)] transition-all duration-300" size={40} />
                    </div>
                    <h4 className="font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-300">{item.title}</h4>
                    <p className="text-sm text-text-muted">{item.description}</p>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        <ScrollReveal delay={200}>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-primary mb-4">Nuestros Valores</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.label} className="flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-sm hover:shadow-md hover:shadow-accent/10 transition-all duration-300">
                    <Icon className="text-accent" size={18} />
                    <span className="text-sm text-text-primary font-medium">{value.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-primary mb-4">Tecnologías que usamos</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["Next.js 15", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Supabase", "Vercel"].map((tech) => (
                <span key={tech} className="bg-white px-5 py-2 rounded-lg shadow-sm text-sm text-text-muted hover:bg-accent hover:text-white transition-all duration-300 hover:scale-105 cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

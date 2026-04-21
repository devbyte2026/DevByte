"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface Testimonial {
  name: string;
  business: string;
  location: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Carlos Mendoza",
    business: "Restaurante El Porvenir",
    location: "Corrientes, Corrientes",
    text: "DevByte creó nuestro menú digital con IA. Los clientes ahora hacen pedidos directamente desde su celular. Incrementamos las ventas un 35%.",
    rating: 5,
  },
  {
    name: "María Fernández",
    business: "Gimnasio PowerFit",
    location: "Resistencia, Chaco",
    text: "El sistema de membresías que desarrollaron nos ahorra horas de trabajo manual. Ahora podemos enfocarnos en atender a nuestros socios.",
    rating: 5,
  },
  {
    name: "Roberto Acevedo",
    business: "Municipalidad de La Escondida",
    location: "La Escondida, Chaco",
    text: "Necesitábamos modernizar nuestra presencia digital. El portal turístico que crearon posicionó a nuestro municipio en el mapa.",
    rating: 5,
  },
  {
    name: "Laura Martínez",
    business: "Panadería DeliPan",
    location: "Posadas, Misiones",
    text: "La tienda online que desarrollaron para nosotros funciona perfectamente. Mercado Pago integrado y los clientes adoran la facilidad de compra.",
    rating: 5,
  },
  {
    name: "Diego Ramírez",
    business: "Liga Makallé de Fútbol",
    location: "Makallé, Chaco",
    text: "La venta de entradas online eliminó el fraude por completo. El sistema de control QR funcionó de maravilla en los partidos.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-[60px]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">
              Clientes del NEA Confían en DevByte
            </h2>
            <p className="text-text-muted mt-4 max-w-xl mx-auto">
              Estas son las experiencias de empresas y organizaciones que transformaron su negocio con nuestras soluciones digitales
            </p>
          </div>
        </ScrollReveal>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="w-full flex-shrink-0 px-4">
                <ScrollReveal direction="scale">
                  <Card className="max-w-2xl mx-auto bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full" />
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 text-accent/20 w-12 h-12" />
                      <div className="flex gap-1 mb-4">
                        {[...Array(t.rating)].map((_, idx) => (
                          <Star key={idx} className="text-yellow-400 fill-yellow-400" size={18} />
                        ))}
                      </div>
                      <p className="text-lg italic text-text-primary leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                      <div className="mt-6 flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-accent/20">
                          {t.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-primary">{t.name}</p>
                          <p className="text-sm text-accent font-medium">{t.business}</p>
                          <p className="text-xs text-text-muted">{t.location}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:translate-x-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300 opacity-80 hover:opacity-100"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300 opacity-80 hover:opacity-100"
            aria-label="Siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-3 rounded-full transition-all duration-300 ${
                current === i ? "bg-accent w-8 shadow-lg shadow-accent/30" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Ir al testimonio ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

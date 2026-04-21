"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";

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

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">
            Clientes del NEA Confían en DevByte
          </h2>
          <p className="text-text-muted mt-4 max-w-xl mx-auto">
            Estas son las experiencias de empresas y organizaciones que transformaron su negocio con nuestras soluciones digitales
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="w-full flex-shrink-0 px-4">
                <Card className="max-w-2xl mx-auto bg-white">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="text-yellow-400 fill-yellow-400" size={18} />
                    ))}
                  </div>
                  <p className="text-lg italic text-text-primary">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-primary">{t.name}</p>
                      <p className="text-sm text-text-muted">{t.business}</p>
                      <p className="text-xs text-text-muted">{t.location}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  current === i ? "bg-accent w-8" : "bg-gray-300"
                }`}
                aria-label={`Ir al testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
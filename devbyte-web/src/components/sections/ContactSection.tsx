"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

const formSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  projectType: z.enum(["sitio-web", "app", "sistema", "otro"]),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const whatsappMessage = `Hola! Soy ${data.name}. 
Email: ${data.email}
${data.phone ? `Teléfono: ${data.phone}` : ""}
Tipo de proyecto: ${data.projectType}
Mensaje: ${data.message}`;
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <section id="contacto" className="py-16 md:py-24 px-4 md:px-8 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">
            Contáctanos — Estamos en Resistencia, Chaco
          </h2>
          <p className="text-text-muted mt-4 max-w-xl mx-auto">
            ¿Necesitás una web para tu negocio? Escribinos y te respondemos a la brevedad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="p-8">
            {submitted ? (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-primary mb-4">¡Gracias por contactarnos!</h3>
                <p className="text-text-muted">
                  Te vamos a responder por WhatsApp a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">
                    Nombre completo *
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all",
                      errors.name && "border-red-500"
                    )}
                    placeholder="Tu nombre"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all",
                      errors.email && "border-red-500"
                    )}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary mb-1">
                    Teléfono (opcional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    placeholder="+54 9 XXX XXXXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-primary mb-1">
                    Tipo de proyecto *
                  </label>
                  <select
                    id="projectType"
                    {...register("projectType")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                  >
                    <option value="sitio-web">Sitio Web</option>
                    <option value="app">App PWA</option>
                    <option value="sistema">Sistema a Medida</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message")}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none",
                      errors.message && "border-red-500"
                    )}
                    placeholder="Contanos sobre tu proyecto..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  <Send className="mr-2" size={18} />
                  {isSubmitting ? "Enviando..." : "Enviar por WhatsApp"}
                </Button>
              </form>
            )}
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Datos de contacto</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <MapPin className="text-accent" size={20} />
                  <span>Resistencia, Chaco — NEA, Argentina</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-accent" size={20} />
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent"
                  >
                    WhatsApp disponible
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-accent" size={20} />
                  <a href="mailto:hola@devbyte.com.ar" className="hover:text-accent">
                    hola@devbyte.com.ar
                  </a>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-primary text-white">
              <h3 className="text-lg font-semibold mb-4">¿Por qué elegirnos?</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Conocemos la realidad del NEA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Tecnología de primer nivel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Soporte en tu idioma</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>Precios accesibles para la región</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
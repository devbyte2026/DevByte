"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

const formSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  businessType: z.string().optional(),
  service: z.enum(["sitio-web", "app", "sistema", "ecommerce", "mantenimiento", "otro"]),
  budget: z.enum(["menos-300", "300-700", "700-1500", "mas-1500", "no-se"]),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  howDidYouFindUs: z.enum(["google", "facebook", "instagram", "recomendacion", "otro"]),
});

type FormData = z.infer<typeof formSchema>;

export function QuoteForm() {
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
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Error al enviar. Probá por WhatsApp.");
      }
    } catch {
      alert("Error de conexión. Usá WhatsApp.");
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <Card className="p-8 text-center">
        <CheckCircle2 className="text-accent mx-auto mb-4" size={48} />
        <h3 className="text-2xl font-bold text-primary mb-2">¡Mensaje enviado!</h3>
        <p className="text-text-muted mb-6">
          Te vamos a contactar a la brevedad. Mientras tanto, podés escribirnos directo por WhatsApp.
        </p>
        <Button asChild>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Continuar por WhatsApp
          </a>
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8">
      <h3 className="text-xl font-bold font-display text-primary mb-6">
        Solicitar Cotización
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Nombre completo *
            </label>
            <input
              {...register("name")}
              className={cn(
                "w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all",
                errors.name && "border-red-500"
              )}
              placeholder="Tu nombre"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Email *
            </label>
            <input
              type="email"
              {...register("email")}
              className={cn(
                "w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all",
                errors.email && "border-red-500"
              )}
              placeholder="tu@email.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Teléfono (opcional)
            </label>
            <input
              type="tel"
              {...register("phone")}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
              placeholder="+54 9 XXX XXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Tipo de negocio
            </label>
            <input
              {...register("businessType")}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
              placeholder="Restaurant, Gimnasio, etc."
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Servicio de interés *
            </label>
            <select
              {...register("service")}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
            >
              <option value="">Seleccionar...</option>
              <option value="sitio-web">Sitio Web Institucional</option>
              <option value="ecommerce">Tienda Online / E-commerce</option>
              <option value="app">App PWA</option>
              <option value="sistema">Sistema a Medida</option>
              <option value="mantenimiento">Mantenimiento Web</option>
              <option value="otro">Otro</option>
            </select>
            {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Presupuesto estimado
            </label>
            <select
              {...register("budget")}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
            >
              <option value="">Seleccionar...</option>
              <option value="menos-300">Menos de $300 USD</option>
              <option value="300-700">$300 - $700 USD</option>
              <option value="700-1500">$700 - $1500 USD</option>
              <option value="mas-1500">Más de $1500 USD</option>
              <option value="no-se">No estoy seguro</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-1">
            ¿Cómo nos conociste? *
          </label>
          <select
            {...register("howDidYouFindUs")}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
          >
            <option value="">Seleccionar...</option>
            <option value="google">Google / Buscador</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="recomendacion">Recomendación de alguien</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-1">
            Cuéntanos sobre tu proyecto *
          </label>
          <textarea
            rows={4}
            {...register("message")}
            className={cn(
              "w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none",
              errors.message && "border-red-500"
            )}
            placeholder="Describí tu proyecto, qué necesitás, cuáles son tus objetivos..."
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 animate-spin" size={18} />
              Enviando...
            </>
          ) : (
            <>
              <Send className="mr-2" size={18} />
              Enviar Solicitud
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Card } from "@/components/ui/Card";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto | DevByte — Agencia Web en Resistencia, Chaco",
  description:
    "Contactá a DevByte para solicitar un presupuesto de desarrollo web. Estamos en Resistencia, Chaco — Atendemos todo el NEA.",
  keywords: [
    "contacto devbyte",
    "presupuesto web Resistencia",
    "agencia web Chaco",
  ],
};

const benefits = [
  "Respuesta en menos de 24 horas",
  "Cotización sin compromiso",
  "Asesoramiento personalizado",
  "Presupuesto detallado",
];

export default function ContactPage() {
  return (
    <section id="contacto" className="py-16 md:py-24 px-4 md:px-8 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-primary mb-4">
            Contáctanos — Estamos en Resistencia, Chaco
          </h1>
          <p className="text-text-muted max-w-xl mx-auto text-lg">
            ¿Necesitás una web para tu negocio? Completá el formulario y te
            respondemos a la brevedad.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <QuoteForm />
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">
                Datos de contacto
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin
                    className="text-accent mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="font-medium text-primary">Ubicación</p>
                    <p className="text-text-muted text-sm">
                      Resistencia, Chaco — NEA, Argentina
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="text-accent mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-primary">WhatsApp</p>
                    <a
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted text-sm hover:text-accent"
                    >
                      Escribinos directo
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="text-accent mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-primary">Email</p>
                    <a
                      href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                      className="text-text-muted text-sm hover:text-accent"
                    >
                      {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                    </a>
                  </div>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-primary text-white">
              <h3 className="text-lg font-semibold mb-4">
                ¿Por qué elegirnos?
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm">
                    <CheckCircle2
                      className="text-accent mt-0.5 flex-shrink-0"
                      size={16}
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Horario de atención
              </h3>
              <p className="text-text-muted text-sm">
                Lunes a Viernes: 9:00 - 18:00
              </p>
              <p className="text-text-muted text-sm">
                Sábado y Domingo: Cerrado
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

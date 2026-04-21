"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch {
      alert("Error al suscribirte. Intentá de nuevo.");
    }

    setLoading(false);
  };

  if (submitted) {
    return (
      <Card className="p-6 text-center bg-accent/10 border border-accent/20">
        <h3 className="text-lg font-bold text-primary mb-2">¡Suscripto exitosamente!</h3>
        <p className="text-text-muted text-sm">
          Recibirás tips de marketing digital y casos de éxito del NEA cada semana.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="text-accent" size={24} />
        <h3 className="text-lg font-bold text-primary">Newsletter DevByte</h3>
      </div>
      <p className="text-text-muted text-sm mb-4">
        Recibí tips de marketing digital y casos de éxito del NEA, 1 email por semana.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Suscribiendo..." : "Suscribirme"}
        </Button>
      </form>
      <p className="text-xs text-text-muted text-center mt-3">
        Sin spam. Podés darte de baja cuando quieras.
      </p>
    </Card>
  );
}
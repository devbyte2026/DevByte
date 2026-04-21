"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || window.location.pathname.startsWith("/admin")) return;

    const hasConverted = localStorage.getItem("devbyte_converted");
    if (hasConverted || hasSeen) return;

    const handleExitIntent = (e: MouseEvent) => {
      if (document.documentElement.clientWidth - e.clientX < 5 && e.clientY < 5) {
        setIsVisible(true);
      }
    };

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 45000);

    document.addEventListener("mouseout", handleExitIntent);
    return () => {
      document.removeEventListener("mouseout", handleExitIntent);
      clearTimeout(timer);
    };
  }, [hasSeen]);

  const handleClose = () => {
    setIsVisible(false);
    setHasSeen(true);
  };

  const handleConvert = () => {
    localStorage.setItem("devbyte_converted", "true");
    window.open(
      `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola!%20Vi%20la%20popup%20de%20DevByte%20y%20me%20interesa%20un%20presupuesto`,
      "_blank"
    );
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="relative max-w-md w-full p-8 animate-slide-up">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-text-muted hover:text-primary"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold font-display text-primary mb-2">
          ¿Necesitás una web para tu negocio?
        </h2>
        <p className="text-text-muted mb-6">
          Consulta gratis sin compromiso. Te respondemos a la brevedad.
        </p>

        <Button onClick={handleConvert} size="lg" className="w-full">
          Quiero mi presupuesto
        </Button>

        <p className="text-xs text-text-muted text-center mt-4">
          Sin spam. Solo respuesta real.
        </p>
      </Card>
    </div>
  );
}
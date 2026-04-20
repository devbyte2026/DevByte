"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConverted = localStorage.getItem("devbyte_converted");
    if (!hasConverted) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola!%20Vi%20la%20web%20de%20DevByte%20y%20me%20interesa%20un%20presupuesto%20para...`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 left-6 z-50 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-200 hover:scale-110 animate-pulse-slow"
    >
      <MessageCircle size={24} />
    </a>
  );
}
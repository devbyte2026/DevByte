"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible] = useState(() => {
    if (typeof window !== "undefined") {
      const hasConverted = localStorage.getItem("devbyte_converted");
      return !hasConverted;
    }
    return false;
  });

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 group">
      <a
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola!%20Vi%20la%20web%20de%20DevByte%20y%20me%20interesa%20un%20presupuesto%20para...`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="flex items-center gap-3 p-4 bg-green-500 text-white rounded-full shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-110"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MessageCircle size={24} className="drop-shadow-lg" />
        <span className={`absolute left-full ml-3 whitespace-nowrap bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}`}>
          ¡Hablemos por WhatsApp!
        </span>
      </a>
      <div className="absolute -inset-2 bg-green-500/20 rounded-full animate-ping" />
      <div className="absolute -inset-1 bg-green-500/10 rounded-full animate-pulse" />
    </div>
  );
}

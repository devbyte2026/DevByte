"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "543734469110";

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[9999] group">
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Vi%20la%20web%20de%20DevByte%20y%20me%20interesa%20un%20presupuesto%20para...`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-xl shadow-green-500/50 hover:scale-110 transition-transform duration-300"
      >
        <MessageCircle size={28} />
      </a>
      <div className="absolute -inset-2 bg-green-500/20 rounded-full animate-ping" />
      <div className="absolute -inset-1 bg-green-500/10 rounded-full animate-pulse" />
    </div>
  );
}

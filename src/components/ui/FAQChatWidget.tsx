"use client";

import { useEffect, useState } from "react";
import { HelpCircle, X, ArrowLeft, MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { faqs } from "@/lib/faqs";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "543734469110";

export function FAQChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset back to the question list every time the widget is closed.
  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => setSelected(null), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!mounted) return null;

  const selectedFaq = selected !== null ? faqs[selected] : null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Preguntas frecuentes"
          className="mb-4 w-[90vw] max-w-sm bg-white rounded-2xl shadow-2xl shadow-black/20 border border-gray-100 overflow-hidden flex flex-col animate-scale-in origin-bottom-right"
          style={{ maxHeight: "min(70vh, 32rem)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 bg-primary px-4 py-3 flex-shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              {selectedFaq ? (
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Volver a las preguntas"
                  className="text-text-inverted/80 hover:text-text-inverted transition-colors flex-shrink-0"
                >
                  <ArrowLeft size={18} />
                </button>
              ) : (
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="text-accent" size={18} />
                </div>
              )}
              <span className="font-semibold text-text-inverted text-sm truncate">
                {selectedFaq ? "Respuesta" : "Preguntas frecuentes"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar preguntas frecuentes"
              className="text-text-inverted/80 hover:text-text-inverted transition-colors flex-shrink-0"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto px-4 py-4 space-y-3 bg-surface-muted/40 flex-1">
            {!selectedFaq ? (
              <>
                <p className="text-xs text-text-muted px-1">
                  Elegí una pregunta para ver la respuesta al instante:
                </p>
                {faqs.map((faq, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelected(index)}
                    className="w-full text-left bg-white border border-gray-100 hover:border-accent/40 hover:shadow-md hover:shadow-accent/10 rounded-xl px-4 py-3 text-sm font-medium text-primary transition-all duration-200"
                  >
                    {faq.question}
                  </button>
                ))}
              </>
            ) : (
              <>
                {/* "User" bubble with the question asked */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-accent text-text-inverted rounded-2xl rounded-br-sm px-4 py-2.5 text-sm">
                    {selectedFaq.question}
                  </div>
                </div>
                {/* "Bot" bubble with the answer */}
                <div className="flex justify-start">
                  <div className="max-w-[85%] bg-white border border-gray-100 text-text-primary rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm leading-relaxed">
                    {selectedFaq.answer}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer CTA */}
          <div className="p-3 border-t border-gray-100 bg-white flex-shrink-0">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Tengo%20una%20consulta%20que%20no%20estaba%20en%20las%20preguntas%20frecuentes...`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg px-4 py-2.5 transition-colors duration-200"
            >
              <MessageCircle size={16} />
              ¿No encontraste tu respuesta? Escribinos
            </a>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={
          isOpen ? "Cerrar preguntas frecuentes" : "Abrir preguntas frecuentes"
        }
        aria-expanded={isOpen}
        className={cn(
          "flex items-center justify-center w-14 h-14 rounded-full shadow-xl shadow-accent/40 transition-all duration-300 hover:scale-110",
          isOpen ? "bg-primary" : "bg-accent",
        )}
      >
        {isOpen ? (
          <X className="text-text-inverted" size={26} />
        ) : (
          <HelpCircle className="text-text-inverted" size={26} />
        )}
      </button>
      {!isOpen && (
        <>
          <div className="absolute bottom-0 right-0 -z-10 w-14 h-14 bg-accent/20 rounded-full animate-ping" />
          <div className="absolute bottom-0 right-0 -z-10 w-14 h-14 bg-accent/10 rounded-full animate-pulse" />
        </>
      )}
    </div>
  );
}

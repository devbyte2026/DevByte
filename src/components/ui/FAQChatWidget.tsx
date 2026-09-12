"use client";

import { useEffect, useRef, useState } from "react";
import { HelpCircle, X, MessageCircle, Send, RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";
import { faqs, findFaqMatch } from "@/lib/faqs";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "543734469110";

const WHATSAPP_FALLBACK_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Tengo%20una%20consulta%20que%20no%20estaba%20en%20las%20preguntas%20frecuentes...`;

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  isFallback?: boolean;
}

const GREETING: ChatMessage = {
  id: "greeting",
  role: "bot",
  text: "¡Hola! 👋 Escribí tu pregunta o elegí una de estas para ver la respuesta al instante.",
};

// Sugerencias rápidas: las primeras preguntas del listado de FAQs.
const QUICK_REPLIES = faqs.slice(0, 4);

export function FAQChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [inputValue, setInputValue] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  if (!mounted) return null;

  function askQuestion(question: string) {
    const trimmed = question.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      text: trimmed,
    };

    const match = findFaqMatch(trimmed);
    const botMessage: ChatMessage = match
      ? {
          id: `${Date.now()}-bot`,
          role: "bot",
          text: match.answer,
        }
      : {
          id: `${Date.now()}-bot`,
          role: "bot",
          text: "No tengo una respuesta preparada para eso todavía. Contanos por WhatsApp y te ayudamos enseguida.",
          isFallback: true,
        };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInputValue("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    askQuestion(inputValue);
  }

  function resetChat() {
    setMessages([GREETING]);
    setInputValue("");
  }

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
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="text-accent" size={18} />
              </div>
              <span className="font-semibold text-text-inverted text-sm truncate">
                Asistente DevByte
              </span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={resetChat}
                aria-label="Reiniciar conversación"
                className="text-text-inverted/80 hover:text-text-inverted transition-colors"
              >
                <RotateCcw size={16} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar preguntas frecuentes"
                className="text-text-inverted/80 hover:text-text-inverted transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Body: transcript */}
          <div
            ref={bodyRef}
            className="overflow-y-auto px-4 py-4 space-y-3 bg-surface-muted/40 flex-1"
          >
            {messages.map((message) =>
              message.role === "user" ? (
                <div key={message.id} className="flex justify-end">
                  <div className="max-w-[85%] bg-accent text-text-inverted rounded-2xl rounded-br-sm px-4 py-2.5 text-sm">
                    {message.text}
                  </div>
                </div>
              ) : (
                <div key={message.id} className="flex justify-start">
                  <div className="max-w-[85%] bg-white border border-gray-100 text-text-primary rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm leading-relaxed space-y-2">
                    <p>{message.text}</p>
                    {message.isFallback && (
                      <a
                        href={WHATSAPP_FALLBACK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-green-600 font-semibold hover:text-green-700"
                      >
                        <MessageCircle size={14} />
                        Escribir por WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ),
            )}

            {/* Sugerencias rápidas: solo mientras no se escribió nada aún */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLIES.map((faq) => (
                  <button
                    key={faq.question}
                    type="button"
                    onClick={() => askQuestion(faq.question)}
                    className="bg-white border border-gray-200 hover:border-accent/40 hover:shadow-sm rounded-full px-3 py-1.5 text-xs font-medium text-primary transition-all duration-200"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-gray-100 bg-white flex-shrink-0 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribí tu pregunta..."
              aria-label="Escribí tu pregunta"
              className="flex-1 min-w-0 bg-surface-muted/60 border border-gray-200 rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            <button
              type="submit"
              aria-label="Enviar pregunta"
              disabled={!inputValue.trim()}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent text-text-inverted hover:bg-accent/90 disabled:opacity-40 disabled:pointer-events-none transition-colors flex-shrink-0"
            >
              <Send size={16} />
            </button>
          </form>
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
          "flex items-center justify-center w-14 h-14 rounded-full shadow-xl shadow-green-500/40 transition-all duration-300 hover:scale-110",
          isOpen ? "bg-primary" : "bg-green-500 hover:bg-green-600",
        )}
      >
        {isOpen ? (
          <X className="text-text-inverted" size={26} />
        ) : (
          <MessageCircle className="text-text-inverted" size={26} />
        )}
      </button>
      {!isOpen && (
        <>
          <div className="absolute bottom-0 right-0 -z-10 w-14 h-14 bg-green-500/20 rounded-full animate-ping" />
          <div className="absolute bottom-0 right-0 -z-10 w-14 h-14 bg-green-500/10 rounded-full animate-pulse" />
        </>
      )}
    </div>
  );
}

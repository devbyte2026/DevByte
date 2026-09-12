"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { faqs } from "@/lib/faqs";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="preguntas-frecuentes"
      className="py-16 md:py-24 px-4 md:px-8 bg-surface relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="max-w-3xl mx-auto relative">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full mb-4">
              <HelpCircle className="text-accent" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-primary">
              Preguntas Frecuentes sobre Desarrollo Web en el NEA
            </h2>
            <p className="text-text-muted mt-4">
              Resolvé tus dudas antes de contactarnos
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal
              key={index}
              delay={((index % 4) * 100) as 0 | 100 | 200 | 300}
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md hover:shadow-accent/10 transition-all duration-300 border border-gray-100 hover:border-accent/30 group">
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 text-left"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-primary pr-4 group-hover:text-accent transition-colors duration-300">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "text-accent flex-shrink-0 transition-all duration-300 group-hover:scale-110",
                      openIndex === index && "rotate-180",
                    )}
                    size={20}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={cn(
                    "overflow-hidden transition-all duration-500 ease-out",
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0",
                  )}
                >
                  <p className="px-6 pb-6 text-text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

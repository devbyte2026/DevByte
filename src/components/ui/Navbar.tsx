"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre-nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScroll > lastScroll && currentScroll > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-[var(--color-surface)]/95 backdrop-blur-md shadow-lg shadow-accent/5 border-b border-[var(--color-border)]"
          : "bg-[var(--color-surface)]/80",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <nav
        aria-label="Navegación principal"
        className="max-w-6xl mx-auto px-4 md:px-8"
      >
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold font-display text-[var(--color-primary)] group"
          >
            Dev<span className="text-[var(--color-accent)] group-hover:text-[var(--color-accent-light)] transition-colors">Byte</span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-4 py-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-all duration-300 font-medium rounded-lg hover:bg-accent/5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <Button asChild size="sm" className="shadow-lg shadow-accent/15 hover:shadow-accent/25 transition-all duration-300">
              <Link
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Solicitar Presupuesto
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              className="p-2 text-[var(--color-primary)] hover:bg-accent/5 rounded-lg transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <X size={24} className="transition-transform duration-300 rotate-90" /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-out",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3 px-4 text-[var(--color-text-primary)] hover:text-[var(--color-accent)] hover:bg-accent/5 transition-all duration-300 font-medium rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 px-4">
              <Button asChild className="w-full">
                <Link
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Solicitar Presupuesto
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

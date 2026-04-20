"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[var(--color-surface)]/95 backdrop-blur-sm shadow-sm border-b border-[var(--color-border)]"
          : "bg-[var(--color-surface)]"
      )}
    >
      <nav
        aria-label="Navegación principal"
        className="max-w-6xl mx-auto px-4 md:px-8"
      >
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold font-display text-[var(--color-primary)]"
          >
            Dev<span className="text-[var(--color-accent)]">Byte</span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <Button asChild size="sm">
              <Link
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar Presupuesto
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              className="p-2 text-[var(--color-primary)]"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-[var(--color-surface)] border-t border-[var(--color-border)] py-4">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button asChild className="w-full">
                <Link
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicitar Presupuesto
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
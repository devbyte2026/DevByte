import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "404 — Página no encontrada | DevByte",
  description: "La página que buscas no existe.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="flex-1 flex items-center justify-center px-4"
      >
        <div className="text-center max-w-md">
          <h1 className="text-8xl font-bold font-display text-accent">404</h1>
          <h2 className="text-2xl font-semibold mt-4 mb-2">
            Página no encontrada
          </h2>
          <p className="text-text-muted mb-8">
            Lo sentimos, la página que buscas no existe o fue movida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">Volver al inicio</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/servicios">Ver servicios</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

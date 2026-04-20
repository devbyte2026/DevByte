import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ThankYou() {
  return (
    <main
      id="main-content"
      className="flex-1 flex items-center justify-center px-4 py-16"
    >
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-bold font-display text-primary mb-4">
          ¡Gracias por contactarnos!
        </h1>
        <p className="text-text-muted mb-8 text-lg">
          Hemos recibido tu mensaje. Te responderemos a la brevedad.
        </p>
        <Button asChild>
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </main>
  );
}

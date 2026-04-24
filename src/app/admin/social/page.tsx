"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Copy, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type ContentType = "blog" | "portfolio" | "service" | "promo";

const FacebookIcon = () => (
  <svg
    className="w-5 h-5 text-blue-600"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    className="w-5 h-5 text-pink-600"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

export default function SocialPage() {
  const router = useRouter();
  const [contentType, setContentType] = useState<ContentType>("blog");
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem("devbyte_admin");
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleGenerate = async () => {
    setLoading(true);

    const mockContent = {
      blog: [
        "📱 Nuevo artículo en el blog de DevByte: '¿Cuánto cuesta una página web en Argentina 2025?' — Comparativa de precios y consejos para pedir presupuestos. 👉 https://devbyte.com.ar/blog\n\n#DevByte #DesarrolloWeb #Argentina #NEA",
        "💡 Nuevo artículo sobre los beneficios de tener presencia web para tu negocio. Estadísticas, casos reales y estrategias que funcionan.\n\n👉 https://devbyte.com.ar/blog\n\n#NEA #Chaco #Digital",
      ],
      portfolio: [
        "🎉 Nuevo proyecto: Sistema de gestión para Gimnasio en Resistencia. Más de 30% de aumento en renovaciones de membresía. 💪\n\n#DevByte #Gimnasio #Resistencia #NEA",
        "✨ Presentamos: Liga Makallé — Sistema de venta de entradas online con control QR. 100% de ventas online, sin fraude.\n\n👉 https://devbyte.com.ar/portfolio/liga-makalle\n\n#DevByte #Futbol #NEA",
      ],
      service: [
        "🚀 Tu negocio necesita una presencia digital fuerte. En DevByte creamos sitios web profesionales, e-commerce y sistemas a medida para empresas del NEA.\n\n💬 Escribinos por WhatsApp\n\n#DevByte #NEA #WebDesign",
        "💻 Somos DevByte — Desarrollo web profesional en Resistencia, Chaco. Sitios web, apps PWA, sistemas a medida. Conocemos la realidad del NEA.\n\n👉 https://devbyte.com.ar/servicios\n\n#DesarrolloWeb #Chaco",
      ],
      promo: [
        `🎁 OFERTA: Primer mes de mantenimiento web gratis para nuevos clientes. Hosting, updates y soporte incluido.\n\n📩 Escribinos a ${process.env.NEXT_PUBLIC_CONTACT_EMAIL} o por WhatsApp\n\n#DevByte #Oferta #Web`,
      ],
    };

    setTimeout(() => {
      setGeneratedContent(mockContent[contentType]);
      setLoading(false);
    }, 1500);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="min-h-screen bg-surface-muted">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary">
              Generador de Contenido Social
            </h1>
            <p className="text-sm text-text-muted">
              Crea posts para Facebook, Instagram y WhatsApp
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Seleccionar tipo de contenido
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button
              variant={contentType === "blog" ? "primary" : "outline"}
              onClick={() => setContentType("blog")}
            >
              Blog
            </Button>
            <Button
              variant={contentType === "portfolio" ? "primary" : "outline"}
              onClick={() => setContentType("portfolio")}
            >
              Portfolio
            </Button>
            <Button
              variant={contentType === "service" ? "primary" : "outline"}
              onClick={() => setContentType("service")}
            >
              Servicio
            </Button>
            <Button
              variant={contentType === "promo" ? "primary" : "outline"}
              onClick={() => setContentType("promo")}
            >
              Promoción
            </Button>
          </div>

          <Button
            onClick={handleGenerate}
            className="mt-6"
            size="lg"
            disabled={loading}
          >
            {loading ? "Generando..." : "Generar Posts"}
          </Button>
        </Card>

        {generatedContent.length > 0 && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FacebookIcon />
                <h4 className="font-semibold">Facebook (más largo)</h4>
              </div>
              <p className="text-sm text-text-muted whitespace-pre-wrap mb-4">
                {generatedContent[0]}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generatedContent[0], 0)}
              >
                <Copy size={16} className="mr-2" />
                {copied === 0 ? "Copiado" : "Copiar"}
              </Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <InstagramIcon />
                <h4 className="font-semibold">Instagram (con hashtags)</h4>
              </div>
              <p className="text-sm text-text-muted whitespace-pre-wrap mb-4">
                {generatedContent[1]}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generatedContent[1], 1)}
              >
                <Copy size={16} className="mr-2" />
                {copied === 1 ? "Copiado" : "Copiar"}
              </Button>
            </Card>
          </div>
        )}

        <div className="mt-8 text-center text-text-muted text-sm">
          <p>
            Contenido generado como inspiración. Personalizá según necesidad.
          </p>
        </div>
      </div>
    </main>
  );
}

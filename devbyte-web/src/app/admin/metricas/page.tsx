"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, TrendingUp, Users, MessageSquare, Eye, Download } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function MetricsPage() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  useEffect(() => {
    const isAdmin = localStorage.getItem("devbyte_admin");
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [router]);

  const metrics = {
    users: { value: "1,234", change: "+12%", trend: "up" },
    pageViews: { value: "4,567", change: "+8%", trend: "up" },
    leads: { value: "23", change: "+15%", trend: "up" },
    conversion: { value: "2.1%", change: "+0.3%", trend: "up" },
  };

  const topPages = [
    { path: "/", views: 1234, avgTime: "1:45" },
    { path: "/servicios", views: 876, avgTime: "2:10" },
    { path: "/portfolio", views: 654, avgTime: "1:58" },
    { path: "/contacto", views: 432, avgTime: "3:22" },
    { path: "/blog", views: 321, avgTime: "4:15" },
  ];

  const topKeywords = [
    { keyword: "desarrollo web Resistencia", position: 5, change: "+2" },
    { keyword: "agencia web Chaco", position: 8, change: "+3" },
    { keyword: "pagina web Resistencia", position: 12, change: "-1" },
    { keyword: "e-commerce Chaco", position: 15, change: "+5" },
  ];

  const recentLeads = [
    { name: "Carlos Mendoza", service: "E-commerce", date: "18/04", status: "nuevo" },
    { name: "María Fernández", service: "Sistema", date: "17/04", status: "contactado" },
    { name: "Roberto Acevedo", service: "Sitio Web", date: "16/04", status: "propuesta" },
  ];

  return (
    <main className="min-h-screen bg-surface-muted">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary">Dashboard de Métricas</h1>
            <p className="text-sm text-text-muted">SEO, tráfico y conversión</p>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm"
          >
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 90 días</option>
          </select>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Usuarios</p>
                <p className="text-2xl font-bold text-primary">{metrics.users.value}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp size={12} />
                  {metrics.users.change} vs período anterior
                </p>
              </div>
              <Users size={32} className="text-accent" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Vistas</p>
                <p className="text-2xl font-bold text-primary">{metrics.pageViews.value}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp size={12} />
                  {metrics.pageViews.change}
                </p>
              </div>
              <Eye size={32} className="text-accent" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Leads</p>
                <p className="text-2xl font-bold text-primary">{metrics.leads.value}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp size={12} />
                  {metrics.leads.change}
                </p>
              </div>
              <MessageSquare size={32} className="text-accent" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Conversión</p>
                <p className="text-2xl font-bold text-primary">{metrics.conversion.value}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp size={12} />
                  {metrics.conversion.change}
                </p>
              </div>
              <BarChart3 size={32} className="text-accent" />
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Páginas más visitadas</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-text-muted border-b">
                  <th className="pb-2">Página</th>
                  <th className="pb-2">Vistas</th>
                  <th className="pb-2">Tiempo avg</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page) => (
                  <tr key={page.path} className="border-b border-gray-100">
                    <td className="py-2 text-sm">{page.path}</td>
                    <td className="py-2 text-sm">{page.views.toLocaleString()}</td>
                    <td className="py-2 text-sm text-text-muted">{page.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Keywords SEO</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-text-muted border-b">
                  <th className="pb-2">Keyword</th>
                  <th className="pb-2">Posición</th>
                  <th className="pb-2">Cambio</th>
                </tr>
              </thead>
              <tbody>
                {topKeywords.map((kw) => (
                  <tr key={kw.keyword} className="border-b border-gray-100">
                    <td className="py-2 text-sm">{kw.keyword}</td>
                    <td className="py-2 text-sm">#{kw.position}</td>
                    <td className="py-2 text-xs">
                      <span className={kw.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                        {kw.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Leads recientes</h3>
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <div key={lead.name} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-sm">{lead.name}</p>
                    <p className="text-xs text-text-muted">{lead.service} — {lead.date}</p>
                  </div>
                  <Badge
                    variant={lead.status === "nuevo" ? "accent" : "outline"}
                    className="text-xs"
                  >
                    {lead.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Acciones SEO pendientes</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-surface-muted rounded-lg">
                <input type="checkbox" className="mt-1" />
                <div>
                  <p className="font-medium text-sm">Publicar artículo sobre e-commerce</p>
                  <p className="text-xs text-text-muted">Keywords: tienda online Argentina</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-surface-muted rounded-lg">
                <input type="checkbox" className="mt-1" />
                <div>
                  <p className="font-medium text-sm">Conseguir 2 backlinks nuevos</p>
                  <p className="text-xs text-text-muted">Directorios locales NEA</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-surface-muted rounded-lg">
                <input type="checkbox" className="mt-1" />
                <div>
                  <p className="font-medium text-sm">Actualizar meta descriptions</p>
                  <p className="text-xs text-text-muted">Páginas de servicios</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Exportar Reporte PDF
          </Button>
        </div>
      </div>
    </main>
  );
}
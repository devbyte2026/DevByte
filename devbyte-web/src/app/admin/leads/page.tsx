"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Download, Filter, MessageCircle, LogOut } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone?: string;
  businessType?: string;
  service: string;
  budget: string;
  message: string;
  howDidYouFindUs: string;
  status: "nuevo" | "contactado" | "propuesta" | "cerrado" | "perdido";
  createdAt: string;
}

const mockLeads: Lead[] = [
  {
    id: 1,
    name: "Carlos Mendoza",
    email: "carlos@restaurant.com",
    phone: "+5493624123456",
    businessType: "Restaurante",
    service: "e-commerce",
    budget: "300-700",
    message: "Necesito una tienda online para vender empanadas y pizzas.",
    howDidYouFindUs: "google",
    status: "nuevo",
    createdAt: "2024-04-18T10:30:00Z",
  },
  {
    id: 2,
    name: "María Fernández",
    email: "maria@gimnasio.com",
    phone: "+5493624987654",
    businessType: "Gimnasio",
    service: "sistema",
    budget: "700-1500",
    message: "Quiero un sistema para gestionar membresías y turnos.",
    howDidYouFindUs: "facebook",
    status: "contactado",
    createdAt: "2024-04-17T15:45:00Z",
  },
  {
    id: 3,
    name: "Roberto Acevedo",
    email: "roberto@municipalidad.gov.ar",
    businessType: "Municipio",
    service: "sitio-web",
    budget: "300-700",
    message: "Necesitamos un portal turístico para el municipio.",
    howDidYouFindUs: "recomendacion",
    status: "propuesta",
    createdAt: "2024-04-16T09:00:00Z",
  },
  {
    id: 4,
    name: "Laura Martínez",
    email: "laura@panaderia.com",
    phone: "+5493624551234",
    businessType: "Panadería",
    service: "e-commerce",
    budget: "menos-300",
    message: "Quiero vender pasteles y tortas online.",
    howDidYouFindUs: "instagram",
    status: "cerrado",
    createdAt: "2024-04-15T14:20:00Z",
  },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  nuevo: { label: "Nuevo", color: "bg-blue-100 text-blue-800" },
  contactado: { label: "Contactado", color: "bg-yellow-100 text-yellow-800" },
  propuesta: { label: "Propuesta enviada", color: "bg-purple-100 text-purple-800" },
  cerrado: { label: "Cerrado", color: "bg-green-100 text-green-800" },
  perdido: { label: "Perdido", color: "bg-gray-100 text-gray-800" },
};

const serviceLabels: Record<string, string> = {
  "sitio-web": "Sitio Web",
  ecommerce: "E-commerce",
  app: "App PWA",
  sistema: "Sistema a Medida",
  mantenimiento: "Mantenimiento",
  otro: "Otro",
};

export default function LeadsPage() {
  const router = useRouter();
  const [leads] = useState<Lead[]>(mockLeads);
  const [filter, setFilter] = useState<string>("todos");
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    const isAdmin = localStorage.getItem("devbyte_admin");
    if (!isAdmin) {
      router.push("/admin/login");
    }
    setNewCount(leads.filter((l) => l.status === "nuevo").length);
  }, [leads, router]);

  const filteredLeads = filter === "todos" ? leads : leads.filter((l) => l.status === filter);

  const handleLogout = () => {
    localStorage.removeItem("devbyte_admin");
    router.push("/admin/login");
  };

  const handleWhatsApp = (lead: Lead) => {
    const message = `Hola ${lead.name}! Te contacto desde DevByte respecto a tu consulta sobre ${serviceLabels[lead.service] || lead.service}.`;
    window.open(`https://wa.me/${lead.phone?.replace("+", "")}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleExportCSV = () => {
    const headers = ["Fecha", "Nombre", "Email", "Teléfono", "Servicio", "Presupuesto", "Estado"];
    const rows = filteredLeads.map((l) => [
      new Date(l.createdAt).toLocaleDateString("es-AR"),
      l.name,
      l.email,
      l.phone || "-",
      serviceLabels[l.service] || l.service,
      l.budget,
      l.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `devbyte_leads_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <main className="min-h-screen bg-surface-muted">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary">DevByte Admin</h1>
            <p className="text-sm text-text-muted">Gestión de Leads</p>
          </div>
          <div className="flex items-center gap-4">
            {newCount > 0 && (
              <Badge variant="accent">{newCount} nuevos</Badge>
            )}
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={16} className="mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-text-muted" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white"
            >
              <option value="todos">Todos</option>
              <option value="nuevo">Nuevos</option>
              <option value="contactado">Contactados</option>
              <option value="propuesta">Con propuesta</option>
              <option value="cerrado">Cerrados</option>
              <option value="perdido">Perdidos</option>
            </select>
          </div>
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download size={16} className="mr-2" />
            Exportar CSV
          </Button>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-muted border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Fecha</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Nombre</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Email</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Servicio</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Presupuesto</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Estado</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-surface-muted/50">
                    <td className="px-4 py-3 text-sm">
                      {new Date(lead.createdAt).toLocaleDateString("es-AR")}
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-primary">{lead.name}</p>
                        {lead.businessType && (
                          <p className="text-xs text-text-muted">{lead.businessType}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{lead.email}</td>
                    <td className="px-4 py-3 text-sm">
                      {serviceLabels[lead.service] || lead.service}
                    </td>
                    <td className="px-4 py-3 text-sm">{lead.budget}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusLabels[lead.status].color}`}>
                        {statusLabels[lead.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {lead.phone && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleWhatsApp(lead)}
                        >
                          <MessageCircle size={16} />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredLeads.length === 0 && (
            <div className="text-center py-12 text-text-muted">
              No hay leads con ese filtro
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
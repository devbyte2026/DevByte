"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Users,
  BarChart3,
  Share2,
  Briefcase,
  LogOut,
  ArrowRight,
  TrendingUp,
  MessageCircle,
  Eye,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface Stats {
  leadsCount: number;
  postsCount: number;
  projectsCount: number;
  visitsToday: number;
}

interface RecentLead {
  id: number;
  name: string;
  service: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    leadsCount: 0,
    postsCount: 0,
    projectsCount: 0,
    visitsToday: 0,
  });
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("devbyte_admin");
    if (!isAdmin) {
      router.push("/admin/login");
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const [leadsRes, postsRes] = await Promise.all([
        fetch("/api/leads"),
        fetch("/api/posts"),
      ]);

      let leadsData = { leads: [] };
      let postsData = { posts: [] };

      if (leadsRes.ok) {
        leadsData = await leadsRes.json();
      }
      if (postsRes.ok) {
        postsData = await postsRes.json();
      }

      setStats({
        leadsCount: leadsData.leads?.length || 0,
        postsCount: postsData.posts?.length || 0,
        projectsCount: 13,
        visitsToday: Math.floor(Math.random() * 100) + 50,
      });

      setRecentLeads(
        (leadsData.leads || []).slice(0, 5).map((l: { id: number; name: string; service: string; status: string; createdAt: string }) => ({
          id: l.id,
          name: l.name,
          service: l.service,
          status: l.status,
          createdAt: l.createdAt,
        }))
      );
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("devbyte_admin");
    router.push("/admin/login");
  };

  const adminSections = [
    {
      title: "Leads",
      description: "Gestión de prospectos y contactos",
      href: "/admin/leads",
      icon: Users,
      color: "bg-blue-500",
      count: stats.leadsCount,
    },
    {
      title: "Blog",
      description: "Crear y editar artículos",
      href: "/admin/blog",
      icon: FileText,
      color: "bg-green-500",
      count: stats.postsCount,
    },
    {
      title: "Portfolio",
      description: "Agregar y gestionar proyectos",
      href: "/admin/portfolio",
      icon: Briefcase,
      color: "bg-purple-500",
      count: stats.projectsCount,
    },
    {
      title: "Métricas",
      description: "SEO y análisis web",
      href: "/admin/metricas",
      icon: BarChart3,
      color: "bg-orange-500",
    },
    {
      title: "Social",
      description: "Generador de contenido social",
      href: "/admin/social",
      icon: Share2,
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-surface-muted">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-display text-primary">DevByte Admin</h1>
            <p className="text-sm text-text-muted">Panel de gestión</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut size={16} className="mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Leads</p>
                <p className="text-3xl font-bold text-primary">{stats.leadsCount}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users size={24} className="text-blue-500" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Artículos</p>
                <p className="text-3xl font-bold text-primary">{stats.postsCount}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText size={24} className="text-green-500" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Proyectos</p>
                <p className="text-3xl font-bold text-primary">{stats.projectsCount}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Briefcase size={24} className="text-purple-500" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Visitas hoy</p>
                <p className="text-3xl font-bold text-primary">{stats.visitsToday}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Eye size={24} className="text-orange-500" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {adminSections.map((section) => (
            <Link key={section.href} href={section.href}>
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer h-full">
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${section.color} rounded-lg`}>
                    <section.icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-primary">{section.title}</h3>
                      {section.count !== undefined && (
                        <Badge variant="outline" className="text-xs">
                          {section.count}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-text-muted mt-1">{section.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {recentLeads.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-primary">Leads Recientes</h2>
              <Link href="/admin/leads">
                <Button variant="ghost" size="sm">
                  Ver todos
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-3 bg-surface-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <MessageCircle size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-primary text-sm">{lead.name}</p>
                      <p className="text-xs text-text-muted">{lead.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={lead.status === "nuevo" ? "accent" : "outline"}
                      className="text-xs"
                    >
                      {lead.status}
                    </Badge>
                    <span className="text-xs text-text-muted">
                      {new Date(lead.createdAt).toLocaleDateString("es-AR")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

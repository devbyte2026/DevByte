"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Edit2, Trash2, ArrowLeft, Save, ExternalLink, Image } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

interface PortfolioProject {
  id?: number;
  slug: string;
  name: string;
  category: "sistemas" | "ecommerce" | "municipal" | "saas" | "web" | "redes";
  client: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  image?: string;
  url?: string;
  results?: string;
}

const categories = [
  { value: "sistemas", label: "Sistemas a Medida" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "municipal", label: "Municipal" },
  { value: "saas", label: "SaaS" },
  { value: "web", label: "Web" },
  { value: "redes", label: "Redes" },
];

const initialProjects: PortfolioProject[] = [];

export default function AdminPortfolioPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<PortfolioProject[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<PortfolioProject>({
    slug: "",
    name: "",
    category: "web",
    client: "",
    description: "",
    problem: "",
    solution: "",
    technologies: [],
    image: "",
    url: "",
    results: "",
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem("devbyte_admin");
    if (!isAdmin) {
      router.push("/admin/login");
      return;
    }
    fetchProjects();
  }, [router]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/portfolio");
      if (response.ok) {
        const data = await response.json();
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects);
        }
      }
    } catch (error) {
      console.log("Using local data");
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingProject(null);
    setFormData({
      slug: "",
      name: "",
      category: "web",
      client: "",
      description: "",
      problem: "",
      solution: "",
      technologies: [],
      image: "",
      url: "",
      results: "",
    });
  };

  const handleEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setIsCreating(false);
    setFormData(project);
  };

  const handleSave = async () => {
    setLoading(true);
    setErrorMessage("");

    const slug = formData.slug || formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const projectData = {
      ...formData,
      slug: slug || `${formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
    };

    try {
      let response: Response;
      if (editingProject?.id) {
        response = await fetch(`/api/portfolio/${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
      } else {
        response = await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
      }

      if (response.ok) {
        const data = await response.json();
        if (editingProject?.id) {
          setProjects(projects.map((p) => (p.slug === editingProject.slug ? { ...projectData, id: editingProject.id } : p)));
        } else {
          setProjects([...projects, { ...projectData, id: data.project?.id || Date.now() }]);
        }
        setIsCreating(false);
        setEditingProject(null);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.details || errorData.error || "Error al guardar");
      }
    } catch (err) {
      setErrorMessage("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("¿Eliminar este proyecto?")) return;

    try {
      await fetch(`/api/portfolio/${slug}`, { method: "DELETE" });
    } catch (error) {
      console.log("Error deleting");
    }
    setProjects(projects.filter((p) => p.slug !== slug));
  };

  if (isCreating || editingProject) {
    return (
      <div className="min-h-screen bg-surface-muted">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" onClick={() => { setIsCreating(false); setEditingProject(null); }}>
              <ArrowLeft size={18} className="mr-2" />
              Volver
            </Button>
            <h1 className="text-xl font-bold text-primary">
              {editingProject ? "Editar Proyecto" : "Nuevo Proyecto"}
            </h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Nombre *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nombre del proyecto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as PortfolioProject["category"] })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">Cliente</label>
              <Input
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="Nombre del cliente"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent outline-none"
                placeholder="Breve descripción"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">Problema</label>
              <textarea
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent outline-none"
                placeholder="Problema que resolviste"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">Solución</label>
              <textarea
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent outline-none"
                placeholder="Cómo lo resolviste"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">Tecnologías (separadas por coma)</label>
              <Input
                value={formData.technologies?.join(", ") || ""}
                onChange={(e) => setFormData({
                  ...formData,
                  technologies: e.target.value.split(",").map((t: string) => t.trim()).filter(Boolean)
                })}
                placeholder="Next.js, TypeScript, Prisma"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">URL de imagen</label>
                <Input
                  value={formData.image || ""}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/portfolio/proyecto.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">URL del proyecto</label>
                <Input
                  value={formData.url || ""}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://proyecto.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">Resultados</label>
              <Input
                value={formData.results || ""}
                onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                placeholder="Ej: Incremento del 30% en ventas"
              />
            </div>

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button onClick={handleSave} disabled={loading}>
                <Save size={18} className="mr-2" />
                {loading ? "Guardando..." : "Guardar Proyecto"}
              </Button>
              <Button variant="outline" onClick={() => { setIsCreating(false); setEditingProject(null); }}>
                Cancelar
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-muted">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary">Gestión de Portfolio</h1>
            <p className="text-sm text-text-muted">{projects.length} proyectos</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-text-muted">Gestiona los proyectos del portfolio.</p>
          <Button onClick={handleCreate}>
            <Plus size={18} className="mr-2" />
            Nuevo Proyecto
          </Button>
        </div>

        <Card className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-surface-muted border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Proyecto</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Categoría</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Cliente</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-text-muted">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((project) => (
                <tr key={project.slug} className="hover:bg-surface-muted/50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-primary line-clamp-1">{project.name}</p>
                      <p className="text-xs text-text-muted line-clamp-1">{project.description}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-xs">
                      {categories.find((c) => c.value === project.category)?.label || project.category}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-muted">
                    {project.client}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-gray-100 rounded text-blue-600"
                          title="Ver sitio"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 hover:bg-gray-100 rounded text-blue-600"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.slug)}
                        className="p-2 hover:bg-gray-100 rounded text-red-600"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && (
            <div className="text-center py-12 text-text-muted">
              No hay proyectos todavía. ¡Agregá el primero!
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

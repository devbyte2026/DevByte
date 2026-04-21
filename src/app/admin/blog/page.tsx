"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, EyeOff, ArrowLeft, Save } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

interface Post {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  image?: string;
  author: string;
  date: string;
  draft: boolean;
}

const categories = [
  "Desarrollo Web",
  "E-commerce",
  "SEO y Marketing",
  "Apps y Tecnología",
  "Casos de Éxito",
  "Novedades DevByte",
];

const mockPosts: Post[] = [
  {
    id: 1,
    title: "Cuánto Cuesta una Página Web en Argentina 2025",
    description: "Guía completa de precios de desarrollo web en Argentina. Comparativa de costos por tipo de proyecto.",
    content: "",
    category: "Desarrollo Web",
    tags: ["precios", "presupuesto", "Argentina"],
    author: "DevByte",
    date: "2025-01-15",
    draft: false,
  },
  {
    id: 2,
    title: "Beneficios de Tener una Página Web para tu Negocio",
    description: "Conocé por qué tu negocio necesita una página web profesional.",
    content: "",
    category: "Desarrollo Web",
    tags: ["Resistencia", "Chaco", "negócios"],
    author: "DevByte",
    date: "2025-01-20",
    draft: false,
  },
];

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "Desarrollo Web",
    tags: "",
    image: "",
    author: "DevByte",
    draft: false,
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem("devbyte_admin");
    if (!isAdmin) {
      router.push("/admin/login");
    }

    fetchPosts();
  }, [router]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      if (data.posts && data.posts.length > 0) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.log("Using mock data, Supabase not configured");
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingPost(null);
    setFormData({
      title: "",
      description: "",
      content: "",
      category: "Desarrollo Web",
      tags: "",
      image: "",
      author: "DevByte",
      draft: false,
    });
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsCreating(false);
    setFormData({
      title: post.title,
      description: post.description,
      content: post.content || "",
      category: post.category,
      tags: post.tags?.join(", ") || "",
      image: post.image || "",
      author: post.author,
      draft: post.draft,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setErrorMessage("");

    const tags = formData.tags ? formData.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [];

    const postData = {
      title: formData.title,
      description: formData.description,
      content: formData.content,
      category: formData.category,
      tags: tags,
      image: formData.image,
      author: formData.author,
      draft: formData.draft,
    };

    console.log("[handleSave] Sending data:", JSON.stringify(postData, null, 2));

    try {
      let response: Response;
      if (editingPost) {
        response = await fetch(`/api/posts/${editingPost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
      } else {
        response = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
      }

      console.log("[handleSave] Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("[handleSave] Response data:", data);
        if (editingPost) {
          setPosts(posts.map((p) => p.id === editingPost.id ? { ...p, ...postData, id: editingPost.id } : p));
        } else {
          setPosts(data.post ? [data.post, ...posts] : [{ ...postData, id: Date.now(), date: new Date().toISOString() }, ...posts]);
        }
        setIsCreating(false);
        setEditingPost(null);
      } else {
        const errorData = await response.json();
        console.log("[handleSave] Error data:", errorData);
        setErrorMessage(errorData.details || errorData.error || "Error al guardar");
      }
    } catch (err) {
      console.error("[handleSave] Catch error:", err);
      setErrorMessage("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este artículo?")) return;

    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
    } catch (error) {
      console.log("Supabase not configured, deleting locally");
    }
    setPosts(posts.filter((p) => p.id !== id));
  };

  const toggleDraft = (post: Post) => {
    const updated = { ...post, draft: !post.draft };
    setPosts(posts.map((p) => p.id === post.id ? updated : p));
    fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ draft: updated.draft }),
    }).catch(() => {});
  };

  if (isCreating || editingPost) {
    return (
      <div className="min-h-screen bg-surface-muted">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" onClick={() => { setIsCreating(false); setEditingPost(null); }}>
              <ArrowLeft size={18} className="mr-2" />
              Volver
            </Button>
            <h1 className="text-xl font-bold text-primary">
              {editingPost ? "Editar Artículo" : "Nuevo Artículo"}
            </h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Título *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Título del artículo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">Descripción *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                placeholder="Descripción breve para SEO"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">Contenido *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none font-mono text-sm"
                placeholder="Contenido del artículo (Markdown)"
                rows={15}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1">Tags (separados por coma)</label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="precios, argentina, web"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">URL de imagen</label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.draft}
                  onChange={(e) => setFormData({ ...formData, draft: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Guardar como borrador</span>
              </label>
            </div>

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button onClick={handleSave} disabled={loading}>
                <Save size={18} className="mr-2" />
                {loading ? "Guardando..." : "Guardar Artículo"}
              </Button>
              <Button variant="outline" onClick={() => { setIsCreating(false); setEditingPost(null); }}>
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
            <h1 className="text-xl font-bold text-primary">Gestión del Blog</h1>
            <p className="text-sm text-text-muted">{posts.length} artículos</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/leads">
              <Button variant="outline" size="sm">Leads</Button>
            </Link>
            <Link href="/admin/metricas">
              <Button variant="outline" size="sm">Métricas</Button>
            </Link>
            <Link href="/admin/social">
              <Button variant="outline" size="sm">Social</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-text-muted">Creá, editá o eliminá artículos del blog.</p>
          <Button onClick={handleCreate}>
            <Plus size={18} className="mr-2" />
            Nuevo Artículo
          </Button>
        </div>

        <Card className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-surface-muted border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Título</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Categoría</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Fecha</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">Estado</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-text-muted">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-surface-muted/50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-primary line-clamp-1">{post.title}</p>
                      <p className="text-xs text-text-muted line-clamp-1">{post.description}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-muted">
                    {new Date(post.date).toLocaleDateString("es-AR")}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={post.draft ? "outline" : "accent"} className="text-xs">
                      {post.draft ? "Borrador" : "Publicado"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => toggleDraft(post)}
                        className="p-2 hover:bg-gray-100 rounded"
                        title={post.draft ? "Publicar" : "Pasar a borrador"}
                      >
                        {post.draft ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 hover:bg-gray-100 rounded text-blue-600"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 hover:bg-gray-100 rounded text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && (
            <div className="text-center py-12 text-text-muted">
              No hay artículos todavía. ¡Creá el primero!
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
import { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Blog | DevByte — Artículos sobre Desarrollo Web y Tecnología",
  description: "Artículos sobre desarrollo web, e-commerce, SEO y tecnología para empresas del NEA argentino. Consejos prácticos y casos de éxito.",
  keywords: ["blog desarrollo web", "artículos NEA", "SEO Chaco", "marketing digital"],
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = getAllCategories();

  return (
    <>
      <SectionWrapper background="default">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-primary mb-4">
            Blog de DevByte
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Artículos sobre desarrollo web, marketing digital y tecnología para empresas del NEA
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Link href="/blog">
            <Badge variant="accent" className="cursor-pointer hover:bg-accent/80">Todos</Badge>
          </Link>
          {categories.map((category) => (
            <Link key={category} href={`/blog/categoria/${category.toLowerCase().replace(/ /g, "-")}`}>
              <Badge variant="outline" className="cursor-pointer hover:bg-surface-muted">
                {category}
              </Badge>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug || post.id}`}>
              <Card className="h-full hover:shadow-lg transition-all cursor-pointer overflow-hidden p-0">
                <div className="bg-gradient-to-br from-primary to-primary-light h-40 flex items-center justify-center p-4">
                  <span className="text-lg font-bold text-white/20 px-4 text-center line-clamp-2">{post.title}</span>
                </div>
                <div className="p-6">
                  <Badge variant="accent" className="mb-3">{post.category}</Badge>
                  <h2 className="text-lg font-bold font-display text-primary mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-text-muted text-sm mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.date).toLocaleDateString("es-AR")}
                    </span>
                    {post.readingTime && (
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readingTime}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-primary mb-2">Próximamente artículos</h3>
            <p className="text-text-muted">Estamos preparando contenido sobre desarrollo web y tecnología para el NEA.</p>
            <Link href="/admin/blog" className="inline-block mt-4 text-accent hover:underline">
              Crear primer artículo →
            </Link>
          </div>
        )}
      </SectionWrapper>
    </>
  );
}
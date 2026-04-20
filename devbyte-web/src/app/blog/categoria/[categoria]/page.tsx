import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

interface Props {
  params: Promise<{ categoria: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const categories = getAllCategories();
  const category = categories.find((c) => c.toLowerCase().replace(/ /g, "-") === categoria);

  if (!category) return { title: "Categoría no encontrada" };

  return {
    title: `${category} | Blog DevByte`,
    description: `Artículos sobre ${category.toLowerCase()} para empresas del NEA.`,
  };
}

export function generateStaticParams() {
  return getAllCategories().map((category) => ({
    categoria: category.toLowerCase().replace(/ /g, "-"),
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { categoria } = await params;
  const categories = getAllCategories();
  const categoryName = categories.find((c) => c.toLowerCase().replace(/ /g, "-") === categoria);

  if (!categoryName) notFound();

  const posts = await getAllPosts();
  const categoryPosts = posts.filter((p) => p.category === categoryName && !p.draft);

  return (
    <SectionWrapper background="default">
      <div className="mb-8">
        <Link href="/blog" className="text-text-muted hover:text-accent text-sm mb-4 inline-block">
          ← Volver al Blog
        </Link>
        <h1 className="text-3xl font-bold font-display text-primary">{categoryName}</h1>
        <p className="text-text-muted mt-2">{categoryPosts.length} artículos</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-lg transition-all cursor-pointer p-0 overflow-hidden">
              <div className="bg-gradient-to-br from-primary to-primary-light h-32 flex items-center justify-center p-4">
                <span className="text-sm font-bold text-white/20 text-center line-clamp-2">{post.title}</span>
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-primary text-sm line-clamp-2">{post.title}</h2>
                <p className="text-xs text-text-muted mt-1 line-clamp-2">{post.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {categoryPosts.length === 0 && (
        <div className="text-center py-12 text-text-muted">
          No hay artículos en esta categoría todavía.
        </div>
      )}
    </SectionWrapper>
  );
}
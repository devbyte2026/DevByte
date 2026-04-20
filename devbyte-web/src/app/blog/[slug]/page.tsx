import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SchemaOrg, breadcrumbSchema } from "@/lib/schema";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado" };

  return {
    title: `${post.title} | Blog DevByte`,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const schemaArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "DevByte",
      url: "https://devbyte.com.ar",
    },
  };

  return (
    <>
      <SchemaOrg schema={schemaArticle} />
      <SchemaOrg schema={breadcrumbSchema([
        { name: "Inicio", url: "https://devbyte.com.ar" },
        { name: "Blog", url: "https://devbyte.com.ar/blog" },
        { name: post.title, url: `https://devbyte.com.ar/blog/${post.slug || post.id}` },
      ])} />

      <article className="py-16 px-4 md:px-8 bg-surface">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-text-muted hover:text-accent text-sm mb-4"
            >
              <ArrowLeft className="mr-2" size={16} />
              Volver al Blog
            </Link>
            <Badge variant="accent" className="mb-3">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-primary mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-text-muted mb-6">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {new Date(post.date).toLocaleDateString("es-AR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {post.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {post.readingTime}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags?.map((tag) => (
                <Link key={tag} href={`/blog/tag/${tag}`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-surface-muted">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {post.content?.split("\n").map((paragraph, i) => (
              paragraph.trim() ? <p key={i} className="mb-4 text-text-primary leading-relaxed">{paragraph}</p> : null
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-text-muted text-sm">¿Te resultó útil este artículo?</p>
              <Link href="/contacto">
                <Button variant="outline" size="sm">
                  Contactanos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <SectionWrapper background="muted">
          <h2 className="text-2xl font-bold font-display text-primary mb-8 text-center">
            Artículos relacionados
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug || p.id}`}>
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer p-0 overflow-hidden">
                  <div className="bg-gradient-to-br from-primary to-primary-light h-24 flex items-center justify-center p-4">
                    <span className="text-sm font-bold text-white/20 text-center line-clamp-2">{p.title}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-primary text-sm line-clamp-2">{p.title}</h3>
                    <p className="text-xs text-text-muted mt-1">{p.category}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
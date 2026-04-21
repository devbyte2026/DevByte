import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { services } from "@/lib/services";
import { portfolio } from "@/lib/portfolio";
import { cities } from "@/lib/cities";
import { getAllPosts, getAllCategories } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/servicios`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/sobre-nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/preguntas-frecuentes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  services.forEach((service) => {
    routes.push({
      url: `${SITE_URL}/servicios/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  portfolio.forEach((project) => {
    routes.push({
      url: `${SITE_URL}/portfolio/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  cities.forEach((city) => {
    routes.push({
      url: `${SITE_URL}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  try {
    const posts = await getAllPosts();
    const categories = getAllCategories();

    posts.forEach((post) => {
      if (!post.draft) {
        const postSlug = post.slug || `post-${post.id}`;
        routes.push({
          url: `${SITE_URL}/blog/${postSlug}`,
          lastModified: new Date(post.date),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        });
      }
    });

    categories.forEach((category) => {
      routes.push({
        url: `${SITE_URL}/blog/categoria/${category.toLowerCase().replace(/ /g, "-")}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      });
    });
  } catch (e) {
    console.log("Blog not available for sitemap");
  }

  return routes;
}
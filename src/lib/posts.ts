export interface Post {
  id: number;
  slug?: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  image?: string;
  author: string;
  date: string;
  draft: boolean;
  readingTime?: string;
}

export interface Category {
  slug: string;
  name: string;
}

export const categories: Category[] = [
  { slug: "desarrollo-web", name: "Desarrollo Web" },
  { slug: "e-commerce", name: "E-commerce" },
  { slug: "seo-y-marketing", name: "SEO y Marketing" },
  { slug: "apps-y-tecnologia", name: "Apps y Tecnología" },
  { slug: "casos-de-exito", name: "Casos de Éxito" },
  { slug: "novedades-devbyte", name: "Novedades DevByte" },
];

async function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return { supabaseUrl, supabaseKey };
}

export async function getAllPosts(): Promise<Post[]> {
  const { supabaseUrl, supabaseKey } = await getSupabaseConfig();

  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/posts?select=*&order=date.desc&draft=eq.false`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) throw new Error("Failed to fetch");

    const posts = await response.json();
    return posts.map((p: Post) => ({
      ...p,
      readingTime: `${Math.max(1, Math.ceil(p.content?.split(" ")?.length / 200 || 0))} min de lectura`,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { supabaseUrl, supabaseKey } = await getSupabaseConfig();

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  try {
    const isNumeric = /^\d+$/.test(slug);
    let query: string;

    if (isNumeric) {
      query = `${supabaseUrl}/rest/v1/posts?id=eq.${slug}&select=*`;
    } else {
      query = `${supabaseUrl}/rest/v1/posts?slug=eq.${slug}&select=*`;
    }

    const response = await fetch(query, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch");

    const posts = await response.json();
    if (posts.length === 0) return null;

    const post = posts[0];
    return {
      ...post,
      readingTime: `${Math.max(1, Math.ceil(post.content?.split(" ")?.length / 200 || 0))} min de lectura`,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const { supabaseUrl, supabaseKey } = await getSupabaseConfig();

  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  try {
    const categoryEncoded = category.replace(/-/g, " ");
    const response = await fetch(
      `${supabaseUrl}/rest/v1/posts?category=ilike.${encodeURIComponent(categoryEncoded)}&draft=eq.false&order=date.desc`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) throw new Error("Failed to fetch");

    return await response.json();
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
}

export function getAllCategories(): string[] {
  return categories.map((c) => c.name);
}

export function getAllTags(): string[] {
  return [
    "precios",
    "presupuesto",
    "Argentina",
    "desarrollo web",
    "Resistencia",
    "Chaco",
    "negocios",
    "presencia digital",
    "PWA",
    "apps móviles",
    "tecnología",
    "NEA",
    "e-commerce",
    "Mercado Pago",
    "ventas online",
    "página web",
    "app móvil",
    "desarrollo",
  ];
}
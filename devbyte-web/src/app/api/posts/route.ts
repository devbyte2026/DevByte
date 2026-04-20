import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  content: z.string().min(100),
  category: z.string(),
  tags: z.array(z.string()),
  image: z.string().optional(),
  author: z.string(),
  draft: z.boolean().optional(),
});

function getSupabaseHeaders() {
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return { supabaseUrl, supabaseKey };
}

export async function GET() {
  try {
    const { supabaseUrl, supabaseKey } = getSupabaseHeaders();

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ posts: [] });
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/posts?select=*&order=date.desc`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch");

    const posts = await response.json();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = postSchema.parse(body);

    const { supabaseUrl, supabaseKey } = getSupabaseHeaders();

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        content: data.content,
        category: data.category,
        tags: data.tags,
        image: data.image,
        author: data.author,
        draft: data.draft ?? false,
        date: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error("Failed to create post");

    const created = await response.json();
    return NextResponse.json({ post: created[0] }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.message }, { status: 400 });
    }
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
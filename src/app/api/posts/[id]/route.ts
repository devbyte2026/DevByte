import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(5).optional(),
  description: z.string().min(20).optional(),
  content: z.string().min(100).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  draft: z.boolean().optional(),
});

function getSupabaseHeaders() {
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return { supabaseUrl, supabaseKey };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { supabaseUrl, supabaseKey } = getSupabaseHeaders();

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/posts?id=eq.${id}&select=*`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch");

    const posts = await response.json();
    if (posts.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post: posts[0] });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = updateSchema.parse(body);

    const { supabaseUrl, supabaseKey } = getSupabaseHeaders();

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const updateData: Record<string, any> = {};
    if (data.title) updateData.title = data.title;
    if (data.description) updateData.description = data.description;
    if (data.content) updateData.content = data.content;
    if (data.category) updateData.category = data.category;
    if (data.tags) updateData.tags = data.tags;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.draft !== undefined) updateData.draft = data.draft;
    updateData.updated_at = new Date().toISOString();

    const response = await fetch(
      `${supabaseUrl}/rest/v1/posts?id=eq.${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) throw new Error("Failed to update");

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.message }, { status: 400 });
    }
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { supabaseUrl, supabaseKey } = getSupabaseHeaders();

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/posts?id=eq.${id}`,
      {
        method: "DELETE",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to delete");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
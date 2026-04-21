import { NextRequest, NextResponse } from "next/server";
import { portfolio } from "@/lib/portfolio";

let projects: typeof portfolio = [];

export async function GET() {
  const allProjects = [...portfolio, ...projects];
  const uniqueProjects = allProjects.filter(
    (project, index, self) =>
      index === self.findIndex((p) => p.slug === project.slug)
  );
  return NextResponse.json({ projects: uniqueProjects });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const existingSlugs = portfolio.map((p) => p.slug);
    const newSlug =
      body.slug ||
      (body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") +
        "-" +
        Date.now());

    if (existingSlugs.includes(body.slug || newSlug)) {
      return NextResponse.json(
        { error: "Ya existe un proyecto con ese slug" },
        { status: 400 }
      );
    }

    const project = {
      id: Date.now(),
      slug: existingSlugs.includes(newSlug)
        ? newSlug.split("-").slice(0, -1).join("-") + "-" + Date.now()
        : newSlug,
      name: body.name,
      category: body.category || "web",
      client: body.client || "",
      description: body.description || "",
      problem: body.problem || "",
      solution: body.solution || "",
      technologies: body.technologies || [],
      image: body.image || "",
      url: body.url || "",
      results: body.results || "",
    };

    projects.push(project);

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

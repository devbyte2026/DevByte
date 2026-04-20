import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const subscriberSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = subscriberSchema.parse(body);

    console.log("Nuevo suscriptor:", { email, name, fecha: new Date().toISOString() });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Email inválido" },
      { status: 400 }
    );
  }
}
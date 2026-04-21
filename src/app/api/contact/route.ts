import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  businessType: z.string().optional(),
  service: z.enum(["sitio-web", "app", "sistema", "ecommerce", "mantenimiento", "otro"]),
  budget: z.enum(["menos-300", "300-700", "700-1500", "mas-1500", "no-se"]),
  message: z.string().min(10),
  howDidYouFindUs: z.enum(["google", "facebook", "instagram", "recomendacion", "otro"]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          ...data,
          status: "nuevo",
          created_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        console.log("Lead guardado en Supabase:", data.email);
      }
    } else {
      console.log("Lead recibido (Supabase no configurado):", data);
    }

    const whatsappMessage = `*Nuevo Lead de DevByte*

*Nombre:* ${data.name}
*Email:* ${data.email}
${data.phone ? `*Teléfono:* ${data.phone}` : ""}
${data.businessType ? `*Negocio:* ${data.businessType}` : ""}
*Servicio:* ${data.service}
*Presupuesto:* ${data.budget}
*Cómo nos conoció:* ${data.howDidYouFindUs}

*Mensaje:*
${data.message}`;

    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    return NextResponse.json({
      success: true,
      whatsappUrl,
    });
  } catch (error) {
    console.error("Error al procesar lead:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 400 }
    );
  }
}
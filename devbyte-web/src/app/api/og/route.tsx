import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "DevByte";
  const type = searchParams.get("type") || "default";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1A1A2E",
          fontSize: 48,
          fontWeight: "bold",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <span style={{ color: "#00B4D8", fontSize: 72 }}>Dev</span>
          <span style={{ color: "#FFFFFF", fontSize: 72 }}>Byte</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: type === "article" ? 32 : 28,
            color: "#FFFFFF",
            maxWidth: 800,
            textAlign: "center",
            padding: "0 40px",
          }}
        >
          {title}
        </div>
        {type === "article" && (
          <div
            style={{
              position: "absolute",
              bottom: 40,
              fontSize: 18,
              color: "#6B7280",
            }}
          >
            devbyte.com.ar
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
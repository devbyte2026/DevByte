import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { WebVitals } from "@/components/WebVitals";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";
import { SchemaOrg, organizationSchema, websiteSchema } from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devbyte.com.ar"),
  title: {
    default: "DevByte | Agencia de Desarrollo Web en Resistencia, Chaco",
    template: "%s | DevByte",
  },
  description:
    "Agencia de desarrollo web y soluciones digitales en Resistencia, Chaco. Creamos sitios web, apps y sistemas a medida para pymes y municipios del NEA.",
  keywords: [
    "desarrollo web Resistencia",
    "agencia web Chaco",
    "aplicaciones web NEA",
    "sistemas a medida Corrientes",
    "páginas web Resistencia Chaco",
    "desarrollo de software NEA Argentina",
  ],
  authors: [{ name: "DevByte", url: "https://devbyte.com.ar" }],
  creator: "DevByte",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://devbyte.com.ar",
    siteName: "DevByte",
    title: "DevByte | Agencia de Desarrollo Web en Resistencia, Chaco",
    description:
      "Agencia de desarrollo web y soluciones digitales en Resistencia, Chaco. Creamos sitios web, apps y sistemas a medida para pymes y municipios del NEA.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "DevByte - Agencia de Desarrollo Web en Resistencia, Chaco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevByte | Agencia de Desarrollo Web en Resistencia, Chaco",
    description:
      "Agencia de desarrollo web y soluciones digitales en Resistencia, Chaco.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <SchemaOrg schema={organizationSchema()} />
        <SchemaOrg schema={websiteSchema()} />

      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[var(--color-surface)] text-[var(--color-text-primary)] font-sans transition-colors duration-200">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[var(--color-accent)] focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Saltar al contenido principal
        </a>
        <Analytics />
        <WebVitals />
        <Navbar />
        <main id="main-content" className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <WhatsAppButton />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
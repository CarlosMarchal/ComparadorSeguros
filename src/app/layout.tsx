import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PasosAnalisis } from "@/components/PasosAnalisis";
import { AvisoDatos } from "@/components/AvisoDatos";
import { site, INDEXAR } from "@/data/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nombre}: coberturas, carencias y precios`,
    template: `%s · ${site.nombre}`,
  },
  description: site.descripcion,
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: site.nombre,
    title: site.nombre,
    description: site.descripcion,
  },
  robots: INDEXAR ? { index: true, follow: true } : { index: false, follow: false },
  alternates: { canonical: "/" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        <a
          href="#contenido"
          className="bg-accent pulsable sr-only rounded-[var(--radius-control)] focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-50 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold"
        >
          Saltar al contenido
        </a>
        <AvisoDatos />
        <Header />
        <main id="contenido">{children}</main>
        <PasosAnalisis />
        <Footer />
      </body>
    </html>
  );
}

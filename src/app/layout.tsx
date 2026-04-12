import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { brand } from "@/config/brand";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.tagline}`,
  description: brand.description,
  keywords: [
    "gym",
    "fitness",
    "Mburucuya",
    "entrenamiento",
    "clases grupales",
    "musculación",
    "Asunción",
    "Paraguay",
  ],
  openGraph: {
    title: brand.name,
    description: brand.tagline,
    type: "website",
    locale: "es_PY",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

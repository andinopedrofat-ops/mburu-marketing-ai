import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CerebritoActivo — Ejercicios de activación cerebral para niños",
  description: "Ejercicios divertidos de activación cerebral para niños de 3 a 5 años",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

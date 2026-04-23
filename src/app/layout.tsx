import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Patricio Fredes · Full Stack Developer",
  description:
    "Portfolio de Patricio Fredes, Full Stack Developer especializado en React, Next.js, TypeScript y AWS.",
  openGraph: {
    title: "Patricio Fredes · Full Stack Developer",
    description: "Construyo productos digitales que escalan — del backend al pixel.",
    siteName: "Patricio Fredes Portfolio",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" style={{ scrollBehavior: "smooth" }}>
      <body style={{ margin: 0, background: "#080C14" }}>
        {children}
      </body>
    </html>
  );
}
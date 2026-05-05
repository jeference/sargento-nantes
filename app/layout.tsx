import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sargento Nantes — Abaixo-Assinado pela Mentoria de Segurança Familiar",
  description:
    "A cada 9 minutos uma família é destruída pela violência. Assine o abaixo-assinado e exija que o Sargento Nantes abra a mentoria que pode salvar a sua.",
  openGraph: {
    title: "Sargento Nantes — Abaixo-Assinado pela Mentoria de Segurança",
    description:
      "Assine e exija que o Sargento Nantes abra a mentoria de proteção familiar contra a criminalidade.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

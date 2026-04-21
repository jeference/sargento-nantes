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
  title: "Sargento Nantes — Grupo VIP de Alta Performance",
  description:
    "Entre para o grupo VIP do Sargento Nantes e receba em primeira mão as missões, estratégias e mentoria de alta performance.",
  openGraph: {
    title: "Sargento Nantes — Grupo VIP",
    description:
      "Mentoria de disciplina, liderança e execução. Assuma posição e entre para a tropa.",
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

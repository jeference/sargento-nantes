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
  title: "Sargento Nantes — O Que a Mídia Não Te Mostra",
  description:
    "Entre no Grupo VIP do Sargento Nantes e receba bandido se dando mal, bastidores de operações e dicas de segurança para blindar sua família. Conteúdo que a grande imprensa esconde.",
  openGraph: {
    title: "Sargento Nantes — O Que a Mídia Não Te Mostra",
    description:
      "Bastidores de operações, bandido se dando mal e segurança prática para sua família. Direto no seu WhatsApp.",
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

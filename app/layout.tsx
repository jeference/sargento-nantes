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
  title: "Sargento Nantes — Abaixo-Assinado por um Treinamento de Segurança Domiciliar",
  description:
    "Em São Paulo, uma residência é invadida a cada 10 minutos (Fonte: SSP). Apoie o abaixo-assinado para que o Sargento Nantes realize um treinamento digital de segurança domiciliar.",
  openGraph: {
    title: "Sargento Nantes — Abaixo-Assinado por um Treinamento de Segurança Domiciliar",
    description:
      "Apoie o abaixo-assinado para que o Sargento Nantes realize um treinamento digital de segurança domiciliar para famílias brasileiras.",
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

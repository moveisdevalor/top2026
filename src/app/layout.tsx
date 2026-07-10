import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AccessTracker } from "@/components/AccessTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TOP 20 2026 — Móveis de Valor",
  description:
    "O prêmio que reconhece as marcas mais admiradas do setor moveleiro. Ser lembrado é bom. Ser escolhido é TOP!",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased font-sans">
        <AccessTracker />
        {children}
      </body>
    </html>
  );
}

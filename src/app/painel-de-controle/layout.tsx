import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { LayoutComponent } from "@/components/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard | Painel de Controle",
  description: "Uma área de grandes resultados!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <LayoutComponent>{children}</LayoutComponent>
      </body>
    </html>
  );
}

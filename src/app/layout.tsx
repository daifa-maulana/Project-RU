import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pondok Pesantren Tahfidz Raudhlatul Ulum",
  description: "Sistem Informasi Terpadu Pondok Pesantren Tahfidz Raudhlatul Ulum. Memantau hafalan dan absensi santri secara real-time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

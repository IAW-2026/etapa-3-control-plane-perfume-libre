import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/ui/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Control Plane - Perfume Libre",
  description: "Panel de administración global del sistema",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} flex min-h-screen bg-background text-foreground`}
      >
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <div className="h-16 border-b flex items-center px-8 md:hidden">
            <h1 className="font-bold text-lg">Control Plane</h1>
          </div>
          <div className="flex-1 p-8 overflow-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}

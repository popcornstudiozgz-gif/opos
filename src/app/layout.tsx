import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: SITE.nombre,
    template: `%s · ${SITE.nombre}`,
  },
  description: SITE.descripcionLarga,
  metadataBase: new URL(SITE.url),
};

/**
 * Layout raíz: solo shell HTML + footer. La navbar NO vive aquí porque
 * necesita saber si estamos dentro de una oposición o en el catálogo
 * general — cada nivel de rutas pone la suya (ver `app/page.tsx` y
 * `app/[oposicion]/layout.tsx`).
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-slate-800 antialiased">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

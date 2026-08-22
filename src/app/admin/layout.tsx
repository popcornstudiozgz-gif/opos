import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { SITE } from "@/lib/site";

/**
 * Sección de admin: protegida por `requireAdmin()` (email en `ADMIN_EMAILS`),
 * sin el `Navbar` público — cabecera propia, mínima.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <>
      <header className="border-b border-brand-100 bg-brand-950 text-white">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/admin/blog" className="font-black">
            {SITE.iniciales} · Admin
          </Link>
          <Link href="/" className="text-sm font-medium text-brand-200 hover:text-white">
            ← Volver al sitio
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}

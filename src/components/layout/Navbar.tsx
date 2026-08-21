import Link from "next/link";
import { SITE } from "@/lib/site";
import { getOposicion } from "@/lib/oposiciones";

/**
 * Navbar consciente de la oposición activa. Fuera de `/[oposicion]/...`
 * (portada del catálogo) solo muestra el nombre del sitio; dentro, añade el
 * nombre de la oposición y su navegación.
 */
export async function Navbar({ oposicionSlug }: { oposicionSlug?: string }) {
  const oposicion = oposicionSlug ? await getOposicion(oposicionSlug) : undefined;

  const navLinks = oposicion
    ? [
        { href: `/${oposicion.slug}/convocatoria`, label: "Convocatoria" },
        { href: `/${oposicion.slug}/temario`, label: "Temario" },
        { href: `/${oposicion.slug}/flashcards`, label: "Flashcards" },
        { href: `/${oposicion.slug}/glosario`, label: "Glosario" },
      ]
    : [];

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-baseline gap-2 font-black text-brand-900">
          <span className="text-lg">{SITE.nombre}</span>
          {oposicion && (
            <span className="hidden text-sm font-medium text-slate-500 sm:inline">
              · {oposicion.nombre}
            </span>
          )}
        </Link>
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
          {oposicion && (
            <Link
              href="/"
              className="ml-2 rounded-lg border border-brand-100 px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              Cambiar oposición
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

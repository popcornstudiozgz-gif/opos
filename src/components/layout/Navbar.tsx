import { SITE } from "@/lib/site";
import { getOposicion } from "@/lib/oposiciones";
import { NavbarShell } from "./NavbarShell";

/**
 * Navbar consciente de la oposición activa. Fuera de `/[oposicion]/...`
 * (portada del catálogo) solo muestra el nombre del sitio; dentro, añade el
 * nombre de la oposición y su navegación.
 *
 * Server Component: resuelve la oposición y arma los links aquí (SSR), y
 * delega el render (incluido el estado de sesión, que necesita el cliente)
 * a `NavbarShell`.
 */
export async function Navbar({ oposicionSlug }: { oposicionSlug?: string }) {
  const oposicion = oposicionSlug ? await getOposicion(oposicionSlug) : undefined;

  // "principal": va siempre en línea en el navbar. El resto se agrupa bajo
  // el desplegable "Más" para que quepa sin saltar de línea (mismo criterio
  // que el proyecto de referencia — ver `NAV_LINKS` en su `lib/site.ts`).
  const navLinks = oposicion
    ? [
        { href: `/${oposicion.slug}/convocatoria`, label: "Convocatoria", principal: true },
        { href: `/${oposicion.slug}/temario`, label: "Temario", principal: true },
        { href: `/${oposicion.slug}/test`, label: "Test", principal: true },
        { href: `/${oposicion.slug}/simulacro`, label: "Simulacro", principal: true },
        { href: `/${oposicion.slug}/glosario`, label: "Glosario", principal: false },
        { href: `/${oposicion.slug}/flashcards`, label: "Flashcards", principal: false },
        { href: `/${oposicion.slug}/casos-practicos`, label: "Casos prácticos", principal: false },
        { href: `/${oposicion.slug}/noticias`, label: "Noticias", principal: false },
      ]
    : [];

  return (
    <NavbarShell
      siteNombre={SITE.nombre}
      oposicion={oposicion ? { slug: oposicion.slug, nombre: oposicion.nombre } : null}
      navLinks={navLinks}
    />
  );
}

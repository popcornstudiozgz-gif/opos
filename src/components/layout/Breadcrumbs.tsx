import Link from "next/link";
import { SITE } from "@/lib/site";

export interface MigaPan {
  label: string;
  /** Ruta relativa (p. ej. `/ayuntamiento-zaragoza`). El último elemento
   * (la página actual) también la lleva: se usa para el `item` del JSON-LD,
   * pero no se renderiza como enlace. */
  href: string;
}

/**
 * Migas de pan: navegación jerárquica (Inicio > Organismo > Oposición >
 * Sección) que la reestructuración de URLs a /[organismo]/[oposicion]/...
 * dejó lista para usar (26/08/2026). Cada página construye su propio array
 * de `items` — igual que ya hace cada página con sus propios metadatos vía
 * `crearMetadata` — en vez de que este componente adivine la ruta por sí
 * solo, para no depender de que el nombre de cada segmento de URL coincida
 * con el texto que se quiere mostrar.
 *
 * Incluye el `BreadcrumbList` de schema.org como JSON-LD: es lo que permite
 * a Google mostrar la ruta de migas en el propio resultado de búsqueda en
 * vez de la URL en crudo.
 */
export function Breadcrumbs({ items }: { items: MigaPan[] }) {
  const todos: MigaPan[] = [{ label: "Inicio", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: todos.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${SITE.url}${item.href}`,
    })),
  };

  return (
    <nav aria-label="Migas de pan" className="border-b border-brand-100 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-2.5 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-slate-500 sm:text-sm">
          {todos.map((item, i) => {
            const esActual = i === todos.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {i > 0 && (
                  <span aria-hidden className="text-slate-300">
                    /
                  </span>
                )}
                {esActual ? (
                  <span className="font-medium text-slate-700" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-brand-700 hover:underline">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      {/* JSON-LD estático generado aquí mismo (nunca HTML de usuario) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}

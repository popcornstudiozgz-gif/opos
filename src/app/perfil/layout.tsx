import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { PerfilNav } from "@/components/perfil/PerfilNav";

/**
 * Shell de dos columnas para TODO `/perfil/*` — sidebar fijo en escritorio,
 * barra de píldoras con scroll horizontal en móvil, mismo patrón que
 * `TemaExplorerLayout` (temario/test/flashcards/glosario). Cada página hija
 * solo devuelve su contenido: el `<Navbar/>`, el sidebar y el ancho máximo
 * del contenido ya los pone este layout una única vez.
 */
export default function PerfilLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* ── Sidebar (escritorio) ── */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 flex-shrink-0 flex-col border-r border-brand-100 bg-white lg:flex xl:w-72">
          <div className="border-b border-brand-50 p-4">
            <h1 className="text-lg font-bold text-brand-900">Mi perfil</h1>
          </div>
          <PerfilNav variante="vertical" />
        </aside>

        {/* ── Columna derecha ── */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Nav horizontal solo en móvil */}
          <div className="border-b border-brand-100 bg-white lg:hidden">
            <div className="flex gap-2 overflow-x-auto px-4 py-3">
              <PerfilNav variante="horizontal" />
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="mx-auto w-full max-w-2xl space-y-6 px-4 py-8 sm:px-8">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

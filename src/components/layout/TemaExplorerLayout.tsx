import type { ReactNode } from "react";
import Link from "next/link";

interface TemaLink {
  slug: string;
  numero: number;
  titulo: string;
}

interface BloqueConTemas {
  slug: string;
  titulo: string;
  temas: TemaLink[];
}

interface OpcionTodos {
  label: string;
  icono: string;
  activo: boolean;
}

interface Props {
  titulo: string;
  subtitulo?: string;
  bloques: BloqueConTemas[];
  /** Ruta base sin querystring, ej. `/${oposicionSlug}/test`. */
  basePath: string;
  /** Ausente en páginas sin vista "todas" (ej. casos prácticos). */
  opcionTodos?: OpcionTodos;
  temaActivoSlug?: string;
  /** Ancho máximo del contenido principal. */
  anchoContenido?: string;
  children: ReactNode;
}

/**
 * Shell de dos columnas para las páginas que se navegan por tema (test,
 * flashcards, glosario, casos prácticos): a la izquierda, un sidebar fijo
 * con todos los bloques/temas siempre visible en escritorio; en móvil, la
 * misma navegación como barra de píldoras con scroll horizontal. Mismo
 * patrón que el proyecto de referencia (`oposiciones-web-main`), portado
 * una sola vez aquí en vez de repetirlo en cada página.
 *
 * Server Component a propósito: el tema activo ya llega resuelto por
 * props desde `searchParams` en la página — no hace falta ningún estado
 * de cliente para saber qué resaltar.
 */
export function TemaExplorerLayout({
  titulo,
  subtitulo,
  bloques,
  basePath,
  opcionTodos,
  temaActivoSlug,
  anchoContenido = "max-w-2xl",
  children,
}: Props) {
  // `basePath` normalmente no trae querystring (ej. `/dpz/test`), pero el
  // glosario en raíz sí puede traerlo ya (`/glosario?oposicion=dpz`) — se
  // añade con `&` en vez de `?` cuando corresponda, para no generar una URL
  // con dos signos de interrogación.
  const separador = basePath.includes("?") ? "&" : "?";
  const hrefTema = (slug: string) => `${basePath}${separador}tema=${slug}`;
  const hrefTodas = `${basePath}${separador}tema=todas`;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* ── Sidebar (escritorio) ── */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 flex-shrink-0 flex-col overflow-y-auto border-r border-brand-100 bg-white lg:flex xl:w-72">
        <div className="border-b border-brand-50 p-4">
          <h1 className="text-lg font-bold text-brand-900">{titulo}</h1>
          {subtitulo && <p className="mt-0.5 text-xs text-slate-500">{subtitulo}</p>}
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {opcionTodos && (
            <Link
              href={hrefTodas}
              className={`mb-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                opcionTodos.activo
                  ? "bg-brand-600 text-white"
                  : "text-slate-600 hover:bg-brand-50 hover:text-brand-700"
              }`}
            >
              <span className="text-base" aria-hidden>
                {opcionTodos.icono}
              </span>
              {opcionTodos.label}
            </Link>
          )}

          {bloques.map((bloque) => (
            <div key={bloque.slug} className="mt-4">
              <p className="mb-1 px-3 py-0.5 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                {bloque.titulo}
              </p>
              {bloque.temas.map((t) => (
                <Link
                  key={t.slug}
                  href={hrefTema(t.slug)}
                  className={`mb-0.5 block rounded-lg px-3 py-2 text-sm leading-snug transition-colors ${
                    temaActivoSlug === t.slug
                      ? "bg-brand-600 font-medium text-white"
                      : "text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                  }`}
                >
                  <span className="font-semibold">Tema {t.numero}:</span>{" "}
                  <span className="opacity-90">{t.titulo}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* ── Columna derecha ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Filtro horizontal solo en móvil */}
        <div className="border-b border-brand-100 bg-white lg:hidden">
          <div className="flex gap-2 overflow-x-auto px-4 py-3">
            {opcionTodos && (
              <Link
                href={hrefTodas}
                className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  opcionTodos.activo
                    ? "bg-brand-600 text-white"
                    : "bg-brand-50 text-brand-700 hover:bg-brand-100"
                }`}
              >
                {opcionTodos.label}
              </Link>
            )}
            {bloques.flatMap((b) => b.temas).map((t) => (
              <Link
                key={t.slug}
                href={hrefTema(t.slug)}
                className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  temaActivoSlug === t.slug
                    ? "bg-brand-600 text-white"
                    : "bg-brand-50 text-brand-700 hover:bg-brand-100"
                }`}
              >
                T{t.numero}
              </Link>
            ))}
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 overflow-auto">
          <div className={`mx-auto w-full ${anchoContenido} px-4 py-8 sm:px-8`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

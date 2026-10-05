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
  /**
   * Ruta base a la que se añade `/<tema-slug>` o `/todas`, ej.
   * `/ayuntamiento-zaragoza/aux-administrativo/test`.
   */
  basePath: string;
  /** Ausente en páginas sin vista "todas" (ej. casos prácticos). */
  opcionTodos?: OpcionTodos;
  temaActivoSlug?: string;
  /** Ancho máximo del contenido principal. */
  anchoContenido?: string;
  children: ReactNode;
}

/**
 * Rejilla de bloques con sus temas, para la portada (sin tema elegido) de
 * test, flashcards, glosario y casos prácticos. Mismo destino de enlace que
 * el menú lateral (`basePath/<tema-slug>`).
 */
export function RejillaTemas({ bloques, basePath }: { bloques: BloqueConTemas[]; basePath: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {bloques.map((bloque) => (
        <div key={bloque.slug} className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold tracking-wider text-brand-500 uppercase">{bloque.titulo}</p>
          <ul className="mt-3 space-y-1">
            {bloque.temas.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`${basePath}/${t.slug}`}
                  prefetch={false}
                  className="flex items-center gap-2 rounded-md px-2 py-1 text-xs text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  <span className="font-semibold text-brand-600">T{t.numero}</span>
                  {t.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
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
 * props desde el segmento `[tema]` de la ruta — no hace falta ningún
 * estado de cliente para saber qué resaltar.
 *
 * El tema va en la ruta (`/test/tema-5`, `/test/todas`) y no en
 * `?tema=` desde octubre de 2026: una página que lee `searchParams` se
 * renderiza en cada visita, y eso era el grueso del consumo de "Fluid
 * Active CPU" de Vercel; con el tema en la ruta, cada combinación es una
 * página estática cacheada. Las URLs viejas con `?tema=` redirigen (ver
 * `next.config.ts`). `prefetch={false}` en los enlaces: precargar los ~22
 * temas de golpe regeneraría páginas que nadie ha pedido.
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
  const hrefTema = (slug: string) => `${basePath}/${slug}`;
  const hrefTodas = `${basePath}/todas`;

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
              prefetch={false}
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
                  prefetch={false}
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
                prefetch={false}
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
                prefetch={false}
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

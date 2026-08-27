import Link from "next/link";
import { organismoAbreviado } from "@/lib/site";
import type { Bloque, Oposicion, TemaDeOposicion } from "@/lib/types";

export interface ProgresoOposicion {
  oposicion: Oposicion;
  bloques: (Bloque & { temas: TemaDeOposicion[] })[];
  /** Slugs de tema marcados como completados por el usuario en esta oposición. */
  temasCompletados: Set<string>;
}

interface Props {
  progreso: ProgresoOposicion[];
}

/**
 * Progreso del temario por oposición: % de temas completados y el
 * desglose por bloque, con enlace directo a cada tema — la vista que
 * faltaba para el botón "Marcar como completado" de cada tema (que hasta
 * ahora solo se veía ahí, sin ningún sitio donde consultar el conjunto).
 * Solo se listan las oposiciones donde el usuario tiene al menos una fila
 * en `tema_progreso` (ver `perfil/page.tsx`) — nunca todo el catálogo.
 */
export function ProgresoTemas({ progreso }: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-brand-900">Progreso del temario</h2>

      {progreso.length === 0 ? (
        <p className="text-sm text-slate-500">
          Aún no has marcado ningún tema como completado. Hazlo desde la página de cada tema.
        </p>
      ) : (
        <div className="space-y-6">
          {progreso.map(({ oposicion, bloques, temasCompletados }) => {
            const temas = bloques.flatMap((b) => b.temas);
            const completados = temas.filter((t) => temasCompletados.has(t.slug)).length;
            const porcentaje = temas.length > 0 ? Math.round((completados / temas.length) * 100) : 0;

            return (
              <div key={oposicion.slug}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-800">
                    {oposicion.nombre}{" "}
                    <span className="font-normal text-slate-400">
                      · {organismoAbreviado(oposicion.organismoSlug, oposicion.organismo)}
                    </span>
                  </p>
                  <span className="shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-600">
                    {completados}/{temas.length} · {porcentaje}%
                  </span>
                </div>
                <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${porcentaje}%` }} />
                </div>

                <div className="space-y-2">
                  {bloques.map((bloque) => (
                    <details key={bloque.slug} className="rounded-lg border border-slate-100">
                      <summary className="cursor-pointer list-none px-3 py-2 text-xs font-semibold tracking-wide text-slate-500 uppercase hover:bg-slate-50">
                        {bloque.titulo}
                      </summary>
                      <ul className="divide-y divide-slate-50 border-t border-slate-100">
                        {bloque.temas.map((tema) => {
                          const hecho = temasCompletados.has(tema.slug);
                          return (
                            <li key={tema.slug}>
                              <Link
                                href={`/${oposicion.organismoSlug}/${oposicion.puestoSlug}/temario/${tema.slug}`}
                                className="flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-brand-50"
                              >
                                <span className={hecho ? "text-emerald-500" : "text-slate-300"}>{hecho ? "✓" : "○"}</span>
                                <span className={hecho ? "text-slate-700" : "text-slate-500"}>
                                  Tema {tema.numero} · {tema.titulo}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

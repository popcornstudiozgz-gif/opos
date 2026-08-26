import Link from "next/link";
import { organismoAbreviado } from "@/lib/site";
import type { Oposicion } from "@/lib/types";

export interface ProgresoFlashcardsOposicion {
  oposicion: Oposicion;
  /** Total de flashcards del temario de esta oposición (las tenga vistas o no). */
  totalFlashcards: number;
  /** Cuántas ha evaluado alguna vez (tiene fila en `flashcard_progreso`). */
  vistas: number;
  /** De las vistas, cuántas tienen `proxima_revision` hoy o antes (repetición SM-2). */
  paraRepasar: number;
}

interface Props {
  progreso: ProgresoFlashcardsOposicion[];
}

/**
 * Progreso de flashcards por oposición: hasta ahora la repetición espaciada
 * (SM-2) se guardaba en `flashcard_progreso` pero no había ningún sitio en
 * el perfil para consultarla — solo se veía dentro de la propia sesión de
 * estudio. Solo lista oposiciones donde el usuario ha evaluado alguna
 * tarjeta (nunca el catálogo entero sin actividad).
 */
export function ProgresoFlashcards({ progreso }: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-brand-900">Progreso de flashcards</h2>

      {progreso.length === 0 ? (
        <p className="text-sm text-slate-500">Aún no has estudiado ninguna flashcard.</p>
      ) : (
        <div className="space-y-5">
          {progreso.map(({ oposicion, totalFlashcards, vistas, paraRepasar }) => {
            const dominadas = vistas - paraRepasar;
            const sinEmpezar = totalFlashcards - vistas;
            return (
              <div key={oposicion.slug}>
                <div className="mb-2.5 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-800">
                    {oposicion.nombre}{" "}
                    <span className="font-normal text-slate-400">
                      · {organismoAbreviado(oposicion.slug, oposicion.organismo)}
                    </span>
                  </p>
                  <Link
                    href={
                      paraRepasar > 0
                        ? `/${oposicion.slug}/flashcards?tema=todas&modo=repasar`
                        : `/${oposicion.slug}/flashcards?tema=todas`
                    }
                    className="shrink-0 text-xs font-semibold text-brand-600 hover:underline"
                  >
                    {paraRepasar > 0 ? "Repasar ahora →" : "Seguir estudiando →"}
                  </Link>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5">
                    <span className="text-sm font-black text-emerald-700">{dominadas}</span>
                    <span className="text-[11px] leading-tight text-emerald-600">dominadas</span>
                  </div>
                  {paraRepasar > 0 && (
                    <div className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5">
                      <span className="text-sm font-black text-red-600">{paraRepasar}</span>
                      <span className="text-[11px] leading-tight text-red-500">para repasar</span>
                    </div>
                  )}
                  {sinEmpezar > 0 && (
                    <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5">
                      <span className="text-sm font-black text-slate-600">{sinEmpezar}</span>
                      <span className="text-[11px] leading-tight text-slate-500">sin empezar</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

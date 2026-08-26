import Link from "next/link";
import { EliminarIntentoBoton } from "./EliminarIntentoBoton";

interface IntentoSimulacro {
  id: string;
  started_at: string;
  total_test: number | null;
  aciertos_test: number | null;
  nota_test: number | null;
  total_casos: number | null;
  aciertos_casos: number | null;
  nota_casos: number | null;
  oposiciones: { nombre: string; organismo: string } | { nombre: string; organismo: string }[] | null;
}

interface Props {
  intentos: IntentoSimulacro[];
}

function unico<T>(v: T | T[] | null): T | null {
  if (!v) return null;
  return Array.isArray(v) ? (v[0] ?? null) : v;
}

/**
 * Historial de simulacros, separado del resto de tests (ver
 * `HistorialTests`) porque un simulacro tiene dos partes con su propia
 * puntuación (test /10, casos /5) que no encajan en el simple
 * "aciertos/total" del resto de modos. La nota ya viene calculada desde
 * `SimulacroRunner` (con la penalización de -0,25 por fallo incluida) —
 * ver `supabase/migrations/0014_simulacro_desglose.sql`.
 */
export function HistorialSimulacros({ intentos }: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-brand-900">Historial de simulacros</h2>

      {intentos.length === 0 ? (
        <p className="text-sm text-slate-500">Aún no has completado ningún simulacro.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {intentos.map((intento) => {
            const fecha = new Date(intento.started_at).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            const oposicion = unico(intento.oposiciones);
            const notaTotal =
              intento.nota_test != null && intento.nota_casos != null
                ? Math.round((intento.nota_test + intento.nota_casos) * 100) / 100
                : null;
            return (
              <li key={intento.id} className="flex items-center gap-2 first:pt-0 last:pb-0">
                <Link
                  href={`/perfil/tests/${intento.id}`}
                  className="-mx-2 flex min-w-0 flex-1 items-center justify-between gap-4 rounded-lg px-2 py-3 transition-colors hover:bg-brand-50"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {oposicion ? `${oposicion.nombre} (${oposicion.organismo})` : "Simulacro"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {fecha}
                      {intento.nota_test != null && (
                        <>
                          {" · "}Test: {intento.aciertos_test}/{intento.total_test} ({intento.nota_test.toFixed(2)}/10)
                        </>
                      )}
                      {intento.nota_casos != null && (
                        <>
                          {" · "}Casos: {intento.aciertos_casos}/{intento.total_casos} ({intento.nota_casos.toFixed(2)}/5)
                        </>
                      )}
                    </p>
                  </div>
                  {notaTotal != null && (
                    <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-sm font-semibold text-brand-700">
                      {notaTotal.toFixed(2)}/15
                    </span>
                  )}
                </Link>
                <EliminarIntentoBoton intentoId={intento.id} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

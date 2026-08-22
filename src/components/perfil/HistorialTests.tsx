import Link from "next/link";
import { EliminarIntentoBoton } from "./EliminarIntentoBoton";

interface IntentoTest {
  id: string;
  modo: string;
  total: number;
  aciertos: number;
  started_at: string;
  oposiciones: { nombre: string } | { nombre: string }[] | null;
  temas: { titulo: string } | { titulo: string }[] | null;
}

interface Props {
  intentos: IntentoTest[];
}

function unico<T>(v: T | T[] | null): T | null {
  if (!v) return null;
  return Array.isArray(v) ? (v[0] ?? null) : v;
}

function etiquetaIntento(intento: IntentoTest): string {
  if (intento.modo === "tema") return unico(intento.temas)?.titulo ?? "Tema";
  if (intento.modo === "aleatorio") return "Todas las preguntas";
  if (intento.modo === "simulacro") return "Simulacro";
  if (intento.modo === "caso") return "Caso práctico";
  return intento.modo;
}

/**
 * Historial de tests de todas las oposiciones del usuario — a diferencia
 * del proyecto de referencia (una sola oposición), aquí cada fila muestra
 * también de qué oposición era, porque el progreso se guarda por
 * separado (ver `supabase/migrations/0007_usuarios_progreso.sql`).
 */
export function HistorialTests({ intentos }: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-brand-900">Historial de tests</h2>

      {intentos.length === 0 ? (
        <p className="text-sm text-slate-500">Aún no has completado ningún test.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {intentos.map((intento) => {
            const porcentaje = intento.total > 0 ? Math.round((intento.aciertos / intento.total) * 100) : 0;
            const fecha = new Date(intento.started_at).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            const oposicion = unico(intento.oposiciones);
            return (
              <li key={intento.id} className="flex items-center gap-2 first:pt-0 last:pb-0">
                <Link
                  href={`/perfil/tests/${intento.id}`}
                  className="-mx-2 flex flex-1 min-w-0 items-center justify-between gap-4 rounded-lg px-2 py-3 transition-colors hover:bg-brand-50"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800">{etiquetaIntento(intento)}</p>
                    <p className="text-xs text-slate-400">
                      {oposicion && <span className="text-brand-600">{oposicion.nombre} · </span>}
                      {fecha}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-sm font-semibold text-brand-700">
                      {intento.aciertos}/{intento.total}
                    </span>
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-600">
                      {porcentaje}%
                    </span>
                  </div>
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

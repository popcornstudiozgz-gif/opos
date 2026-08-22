import type { SupabaseClient } from "@supabase/supabase-js";

type ModoIntento = "tema" | "aleatorio" | "simulacro" | "caso";

interface CrearIntentoParams {
  usuarioId: string;
  oposicionSlug: string;
  modo: ModoIntento;
  temaSlug?: string | null;
  casoId?: string | null;
  total: number;
}

/**
 * Guarda el progreso de tests/casos/simulacro cuando hay sesión iniciada.
 * Las tres funciones "nunca rechazan": un fallo se traduce en `null`/no-op,
 * así que un problema de red o de RLS nunca rompe la experiencia de hacer
 * el test — solo deja de persistirse.
 *
 * A diferencia del proyecto de referencia (una sola oposición), aquí el
 * progreso se guarda separado por `oposicionSlug` (ver
 * `supabase/migrations/0007_usuarios_progreso.sql`), y no hay una RPC de
 * corrección server-side: `opciones.es_correcta` ya viaja al cliente en las
 * consultas de `lib/oposiciones.ts`, así que el resultado se calcula en
 * cliente y se guarda con un insert/upsert directo.
 */
export async function crearIntento(
  supabase: SupabaseClient,
  { usuarioId, oposicionSlug, modo, temaSlug = null, casoId = null, total }: CrearIntentoParams
): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("test_intentos")
      .insert({
        user_id: usuarioId,
        oposicion_slug: oposicionSlug,
        modo,
        tema_slug: temaSlug,
        caso_id: casoId,
        total,
      })
      .select("id")
      .single();
    if (error || !data) {
      console.warn("No se pudo crear el intento:", error);
      return null;
    }
    return data.id as string;
  } catch (error) {
    console.warn("No se pudo crear el intento:", error);
    return null;
  }
}

/** Nunca rechaza. */
export async function guardarRespuesta(
  supabase: SupabaseClient,
  intentoId: string,
  preguntaId: string,
  opcionId: string,
  esCorrecta: boolean
): Promise<void> {
  try {
    const { error } = await supabase
      .from("test_respuestas")
      .upsert(
        { intento_id: intentoId, pregunta_id: preguntaId, opcion_id: opcionId, es_correcta: esCorrecta },
        { onConflict: "intento_id,pregunta_id" }
      );
    if (error) console.warn("No se pudo guardar la respuesta:", error);
  } catch (error) {
    console.warn("No se pudo guardar la respuesta:", error);
  }
}

/** Nunca rechaza. */
export async function cerrarIntento(
  supabase: SupabaseClient,
  intentoId: string,
  aciertos: number
): Promise<void> {
  try {
    const { error } = await supabase
      .from("test_intentos")
      .update({ aciertos, finished_at: new Date().toISOString() })
      .eq("id", intentoId);
    if (error) console.warn("No se pudo cerrar el intento:", error);
  } catch (error) {
    console.warn("No se pudo cerrar el intento:", error);
  }
}

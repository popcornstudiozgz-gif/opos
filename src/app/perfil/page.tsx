import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { crearMetadata } from "@/lib/site";
import { getOposicion, getBloquesConTemas, getFlashcardsDeOposicion } from "@/lib/oposiciones";
import { PerfilForms } from "@/components/perfil/PerfilForms";
import { HistorialTests } from "@/components/perfil/HistorialTests";
import { HistorialSimulacros } from "@/components/perfil/HistorialSimulacros";
import { ProgresoTemas, type ProgresoOposicion } from "@/components/perfil/ProgresoTemas";
import { ProgresoFlashcards, type ProgresoFlashcardsOposicion } from "@/components/perfil/ProgresoFlashcards";

export const metadata = crearMetadata({
  titulo: "Mi perfil",
  descripcion: "Gestiona tu cuenta y consulta tu progreso.",
  ruta: "/perfil",
  indexable: false, // página privada, sin valor de búsqueda propio
});

/**
 * Perfil de cuenta — no depende de ninguna oposición concreta: fuera de
 * `[oposicion]/...` porque un usuario puede estar preparando varias.
 */
export default async function PerfilPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/perfil");
  }

  const { data: perfil } = await supabase
    .from("profiles")
    .select("nombre, created_at")
    .eq("id", user.id)
    .single();

  // Historial de TODAS las oposiciones que el usuario haya estudiado —
  // salvo los simulacros, que tienen su propia sección (ver más abajo):
  // mezclarlos aquí duplicaría la entrada y el aciertos/total de un
  // simulacro no es comparable con el de un test o caso suelto.
  const { data: historial } = await supabase
    .from("test_intentos")
    .select("id, modo, total, aciertos, started_at, finished_at, oposiciones(nombre, organismo), temas(titulo)")
    .eq("user_id", user.id)
    .neq("modo", "simulacro")
    .not("finished_at", "is", null)
    .order("started_at", { ascending: false })
    .limit(10);

  // Historial de simulacros, aparte: con el desglose por parte (test/casos)
  // y su nota real, calculada en `SimulacroRunner` con la penalización de
  // fallos incluida — ver `supabase/migrations/0014_simulacro_desglose.sql`.
  const { data: historialSimulacros } = await supabase
    .from("test_intentos")
    .select(
      "id, started_at, total_test, aciertos_test, nota_test, total_casos, aciertos_casos, nota_casos, oposiciones(nombre, organismo)"
    )
    .eq("user_id", user.id)
    .eq("modo", "simulacro")
    .not("finished_at", "is", null)
    .order("started_at", { ascending: false })
    .limit(10);

  // Progreso de temario ("Marcar como completado"), por oposición — solo
  // las oposiciones donde el usuario tiene al menos una fila en
  // `tema_progreso` (nunca se lista el catálogo entero sin actividad).
  const { data: temaProgreso } = await supabase
    .from("tema_progreso")
    .select("oposicion_slug, tema_slug, completado, ultima_actividad")
    .eq("user_id", user.id);

  const slugsConProgreso = [...new Set((temaProgreso ?? []).map((p) => p.oposicion_slug))];
  const progresoTemas = (
    await Promise.all(
      slugsConProgreso.map(async (slug): Promise<ProgresoOposicion | null> => {
        const [oposicion, bloques] = await Promise.all([getOposicion(slug), getBloquesConTemas(slug)]);
        if (!oposicion) return null;
        const temasCompletados = new Set(
          (temaProgreso ?? [])
            .filter((p) => p.oposicion_slug === slug && p.completado)
            .map((p) => p.tema_slug)
        );
        return { oposicion, bloques, temasCompletados };
      })
    )
  ).filter((p): p is ProgresoOposicion => p !== null);

  // Progreso de flashcards (repetición espaciada SM-2), por oposición —
  // mismo criterio: solo las oposiciones donde el usuario ha evaluado
  // alguna tarjeta (fila en `flashcard_progreso`).
  const { data: flashcardProgreso } = await supabase
    .from("flashcard_progreso")
    .select("oposicion_slug, proxima_revision")
    .eq("user_id", user.id);

  const hoy = new Date().toISOString().split("T")[0];
  const slugsConFlashcards = [...new Set((flashcardProgreso ?? []).map((p) => p.oposicion_slug))];
  const progresoFlashcards = (
    await Promise.all(
      slugsConFlashcards.map(async (slug): Promise<ProgresoFlashcardsOposicion | null> => {
        const [oposicion, flashcards] = await Promise.all([getOposicion(slug), getFlashcardsDeOposicion(slug)]);
        if (!oposicion) return null;
        const filas = (flashcardProgreso ?? []).filter((p) => p.oposicion_slug === slug);
        const paraRepasar = filas.filter((p) => p.proxima_revision <= hoy).length;
        return { oposicion, totalFlashcards: flashcards.length, vistas: filas.length, paraRepasar };
      })
    )
  ).filter((p): p is ProgresoFlashcardsOposicion => p !== null);

  return (
    <>
      <Navbar />
      <Container className="max-w-2xl space-y-6 py-12">
        <PerfilForms user={{ id: user.id, email: user.email ?? "" }} perfil={perfil} />
        <ProgresoTemas progreso={progresoTemas} />
        <ProgresoFlashcards progreso={progresoFlashcards} />
        <HistorialSimulacros intentos={historialSimulacros ?? []} />
        <HistorialTests intentos={historial ?? []} />
      </Container>
    </>
  );
}

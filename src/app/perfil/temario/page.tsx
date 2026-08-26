import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { crearMetadata } from "@/lib/site";
import { getOposicion, getBloquesConTemas } from "@/lib/oposiciones";
import { ProgresoTemas, type ProgresoOposicion } from "@/components/perfil/ProgresoTemas";

export const metadata = crearMetadata({
  titulo: "Progreso del temario",
  descripcion: "Temas completados por oposición.",
  ruta: "/perfil/temario",
  indexable: false, // página privada, sin valor de búsqueda propio
});

export default async function PerfilTemarioPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/perfil/temario");
  }

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
          (temaProgreso ?? []).filter((p) => p.oposicion_slug === slug && p.completado).map((p) => p.tema_slug)
        );
        return { oposicion, bloques, temasCompletados };
      })
    )
  ).filter((p): p is ProgresoOposicion => p !== null);

  return <ProgresoTemas progreso={progresoTemas} />;
}

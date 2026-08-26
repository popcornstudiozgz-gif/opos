import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { crearMetadata } from "@/lib/site";
import { HistorialSimulacros } from "@/components/perfil/HistorialSimulacros";

export const metadata = crearMetadata({
  titulo: "Historial de simulacros",
  descripcion: "Notas de tus simulacros completados.",
  ruta: "/perfil/simulacros",
  indexable: false, // página privada, sin valor de búsqueda propio
});

export default async function PerfilSimulacrosPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/perfil/simulacros");
  }

  // Con el desglose por parte (test/casos) y su nota real, calculada en
  // `SimulacroRunner` con la penalización de fallos incluida — ver
  // `supabase/migrations/0014_simulacro_desglose.sql`.
  const { data: historialSimulacros } = await supabase
    .from("test_intentos")
    .select(
      "id, started_at, total_test, aciertos_test, nota_test, total_casos, aciertos_casos, nota_casos, oposiciones(nombre, organismo)"
    )
    .eq("user_id", user.id)
    .eq("modo", "simulacro")
    .not("finished_at", "is", null)
    .order("started_at", { ascending: false })
    .limit(30);

  return <HistorialSimulacros intentos={historialSimulacros ?? []} />;
}

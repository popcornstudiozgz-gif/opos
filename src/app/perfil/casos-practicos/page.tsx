import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { crearMetadata } from "@/lib/site";
import { HistorialTests } from "@/components/perfil/HistorialTests";

export const metadata = crearMetadata({
  titulo: "Historial de casos prácticos",
  descripcion: "Casos prácticos que has resuelto.",
  ruta: "/perfil/casos-practicos",
  indexable: false, // página privada, sin valor de búsqueda propio
});

export default async function PerfilCasosPracticosPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/perfil/casos-practicos");
  }

  const { data: historial } = await supabase
    .from("test_intentos")
    .select("id, modo, total, aciertos, started_at, finished_at, oposiciones(nombre, organismo), temas(titulo)")
    .eq("user_id", user.id)
    .eq("modo", "caso")
    .not("finished_at", "is", null)
    .order("started_at", { ascending: false })
    .limit(30);

  return (
    <HistorialTests
      intentos={historial ?? []}
      titulo="Historial de casos prácticos"
      mensajeVacio="Aún no has resuelto ningún caso práctico."
    />
  );
}

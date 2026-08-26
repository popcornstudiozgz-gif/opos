import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { crearMetadata } from "@/lib/site";
import { HistorialTests } from "@/components/perfil/HistorialTests";

export const metadata = crearMetadata({
  titulo: "Historial de tests",
  descripcion: "Tests por tema y aleatorios que has completado.",
  ruta: "/perfil/tests",
  indexable: false, // página privada, sin valor de búsqueda propio
});

/**
 * Solo modos "tema" y "aleatorio" — ni simulacros (`/perfil/simulacros`) ni
 * casos prácticos (`/perfil/casos-practicos`), que tienen su propia página.
 */
export default async function PerfilTestsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/perfil/tests");
  }

  const { data: historial } = await supabase
    .from("test_intentos")
    .select("id, modo, total, aciertos, started_at, finished_at, oposiciones(nombre, organismo), temas(titulo)")
    .eq("user_id", user.id)
    .in("modo", ["tema", "aleatorio"])
    .not("finished_at", "is", null)
    .order("started_at", { ascending: false })
    .limit(30);

  return <HistorialTests intentos={historial ?? []} />;
}

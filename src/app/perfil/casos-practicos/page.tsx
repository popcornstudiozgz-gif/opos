import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
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
    <>
      <Navbar />
      <Container className="max-w-2xl space-y-6 py-12">
        <Link href="/perfil" className="text-sm font-medium text-brand-600 hover:underline">
          ← Volver a mi perfil
        </Link>
        <HistorialTests
          intentos={historial ?? []}
          titulo="Historial de casos prácticos"
          mensajeVacio="Aún no has resuelto ningún caso práctico."
        />
      </Container>
    </>
  );
}

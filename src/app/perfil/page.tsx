import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { crearMetadata } from "@/lib/site";
import { PerfilForms } from "@/components/perfil/PerfilForms";
import { HistorialTests } from "@/components/perfil/HistorialTests";

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

  // Historial de TODAS las oposiciones que el usuario haya estudiado.
  const { data: historial } = await supabase
    .from("test_intentos")
    .select("id, modo, total, aciertos, started_at, finished_at, oposiciones(nombre, organismo), temas(titulo)")
    .eq("user_id", user.id)
    .not("finished_at", "is", null)
    .order("started_at", { ascending: false })
    .limit(10);

  return (
    <>
      <Navbar />
      <Container className="max-w-2xl space-y-6 py-12">
        <PerfilForms user={{ id: user.id, email: user.email ?? "" }} perfil={perfil} />
        <HistorialTests intentos={historial ?? []} />
      </Container>
    </>
  );
}

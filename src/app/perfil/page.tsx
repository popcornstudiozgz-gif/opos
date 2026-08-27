import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { crearMetadata } from "@/lib/site";
import { PerfilForms } from "@/components/perfil/PerfilForms";

export const metadata = crearMetadata({
  titulo: "Mi perfil",
  descripcion: "Gestiona tu cuenta y consulta tu progreso.",
  ruta: "/perfil",
  indexable: false, // página privada, sin valor de búsqueda propio
});

/**
 * Perfil de cuenta — no depende de ninguna oposición concreta: fuera de
 * `[organismo]/[oposicion]/...` porque un usuario puede estar preparando varias.
 *
 * Solo el panel de cuenta: el resto de secciones de progreso
 * (temario/flashcards/simulacros/tests/casos prácticos) vive cada una en su
 * propia página bajo `/perfil/*`, con la navegación entre ellas resuelta
 * por el sidebar de `PerfilLayout` (ver `app/perfil/layout.tsx`).
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

  return <PerfilForms user={{ id: user.id, email: user.email ?? "" }} perfil={perfil} />;
}

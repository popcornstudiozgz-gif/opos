import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { crearMetadata } from "@/lib/site";
import { PerfilForms } from "@/components/perfil/PerfilForms";

export const metadata = crearMetadata({
  titulo: "Mi perfil",
  descripcion: "Gestiona tu cuenta y consulta tu progreso.",
  ruta: "/perfil",
  indexable: false, // página privada, sin valor de búsqueda propio
});

const SECCIONES = [
  { href: "/perfil/temario", icono: "📘", titulo: "Temario", descripcion: "Temas completados por oposición" },
  { href: "/perfil/flashcards", icono: "🃏", titulo: "Flashcards", descripcion: "Dominadas y para repasar por oposición" },
  { href: "/perfil/simulacros", icono: "🎯", titulo: "Simulacros", descripcion: "Notas de tus simulacros completados" },
  { href: "/perfil/tests", icono: "📝", titulo: "Tests", descripcion: "Tests por tema y aleatorios" },
  { href: "/perfil/casos-practicos", icono: "⚖️", titulo: "Casos prácticos", descripcion: "Casos que has resuelto" },
] as const;

/**
 * Perfil de cuenta — no depende de ninguna oposición concreta: fuera de
 * `[oposicion]/...` porque un usuario puede estar preparando varias.
 *
 * Es solo el panel de cuenta + navegación: cada tipo de progreso vive en su
 * propia página (`/perfil/temario`, `/perfil/flashcards`,
 * `/perfil/simulacros`, `/perfil/tests`, `/perfil/casos-practicos`) en vez
 * de todo apilado aquí — antes era una sola página larguísima con todas las
 * secciones seguidas.
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

  return (
    <>
      <Navbar />
      <Container className="max-w-2xl space-y-6 py-12">
        <PerfilForms user={{ id: user.id, email: user.email ?? "" }} perfil={perfil} />

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-brand-900">Mi progreso</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {SECCIONES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-start gap-3 rounded-xl border border-slate-100 p-4 transition-colors hover:border-brand-200 hover:bg-brand-50"
              >
                <span className="text-2xl">{s.icono}</span>
                <span>
                  <span className="block text-sm font-semibold text-slate-800">{s.titulo}</span>
                  <span className="block text-xs text-slate-500">{s.descripcion}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}

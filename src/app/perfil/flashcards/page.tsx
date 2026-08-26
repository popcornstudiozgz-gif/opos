import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { crearMetadata } from "@/lib/site";
import { getOposicion, getFlashcardsDeOposicion } from "@/lib/oposiciones";
import { ProgresoFlashcards, type ProgresoFlashcardsOposicion } from "@/components/perfil/ProgresoFlashcards";

export const metadata = crearMetadata({
  titulo: "Progreso de flashcards",
  descripcion: "Tarjetas dominadas y para repasar por oposición.",
  ruta: "/perfil/flashcards",
  indexable: false, // página privada, sin valor de búsqueda propio
});

export default async function PerfilFlashcardsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/perfil/flashcards");
  }

  // Progreso de flashcards (repetición espaciada SM-2), por oposición —
  // solo las oposiciones donde el usuario ha evaluado alguna tarjeta (fila
  // en `flashcard_progreso`).
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
        <Link href="/perfil" className="text-sm font-medium text-brand-600 hover:underline">
          ← Volver a mi perfil
        </Link>
        <ProgresoFlashcards progreso={progresoFlashcards} />
      </Container>
    </>
  );
}

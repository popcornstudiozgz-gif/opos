import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ArticuloForm } from "@/components/admin/ArticuloForm";
import { getOposiciones } from "@/lib/oposiciones";
import { createAdminClient } from "@/lib/supabase/admin";
import { mapArticulo } from "@/lib/blog";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarArticuloPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = createAdminClient();

  const [{ data: fila }, { data: relacionadas }, oposiciones] = await Promise.all([
    supabase
      .from("articulos")
      .select("id, slug, titulo, resumen, contenido, imagen_url, tipo, publicado, publicado_en, created_at, updated_at")
      .eq("id", id)
      .maybeSingle(),
    supabase.from("articulo_oposicion").select("oposicion_slug").eq("articulo_id", id),
    getOposiciones(),
  ]);
  if (!fila) notFound();

  const articulo = { ...mapArticulo(fila), oposicionesSlugs: (relacionadas ?? []).map((r) => r.oposicion_slug) };

  return (
    <Container className="max-w-3xl py-10">
      <h1 className="text-2xl font-black text-brand-900">Editar artículo</h1>
      <div className="mt-6">
        <ArticuloForm oposiciones={oposiciones} articulo={articulo} />
      </div>
    </Container>
  );
}

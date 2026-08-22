import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createAdminClient } from "@/lib/supabase/admin";
import { mapArticulo } from "@/lib/blog";
import { EliminarArticuloBoton } from "@/components/admin/EliminarArticuloBoton";

export default async function AdminBlogPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("articulos")
    .select("id, slug, titulo, resumen, contenido, imagen_url, tipo, publicado, publicado_en, created_at, updated_at")
    .order("created_at", { ascending: false });
  if (error) throw error;

  const articulos = (data ?? []).map(mapArticulo);

  return (
    <Container className="py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-brand-900">Blog</h1>
        <Button href="/admin/blog/nuevo">+ Nuevo artículo</Button>
      </div>

      {articulos.length === 0 ? (
        <Card className="mt-8 p-8 text-center text-slate-500">Todavía no hay artículos. Crea el primero.</Card>
      ) : (
        <Card className="mt-8 divide-y divide-slate-100 p-0">
          {articulos.map((articulo) => (
            <div key={articulo.id} className="flex items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      articulo.publicado ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {articulo.publicado ? "Publicado" : "Borrador"}
                  </span>
                  <span className="text-xs text-slate-400">{articulo.tipo === "noticia" ? "Noticia" : "Artículo"}</span>
                </div>
                <p className="mt-1 truncate font-semibold text-brand-900">{articulo.titulo}</p>
                <p className="truncate text-sm text-slate-500">/blog/{articulo.slug}</p>
              </div>
              <Link
                href={`/admin/blog/${articulo.id}/editar`}
                className="shrink-0 rounded-lg border border-brand-200 px-3 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
              >
                Editar
              </Link>
              <EliminarArticuloBoton id={articulo.id} slug={articulo.slug} />
            </div>
          ))}
        </Card>
      )}
    </Container>
  );
}

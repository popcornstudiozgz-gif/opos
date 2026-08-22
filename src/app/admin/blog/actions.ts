"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminAuth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { TipoArticulo } from "@/lib/types";

export interface ArticuloInput {
  titulo: string;
  slug: string;
  resumen: string;
  contenido: string;
  imagenUrl: string;
  tipo: TipoArticulo;
  publicado: boolean;
  oposicionesSlugs: string[];
}

export type ResultadoAccion = { error: string } | void;

/** Reemplaza las filas de `articulo_oposicion` de un artículo por las oposiciones marcadas ahora. */
async function sincronizarOposiciones(
  supabase: ReturnType<typeof createAdminClient>,
  articuloId: string,
  slugs: string[]
) {
  const { error: errBorrar } = await supabase.from("articulo_oposicion").delete().eq("articulo_id", articuloId);
  if (errBorrar) throw errBorrar;
  if (slugs.length === 0) return;
  const filas = slugs.map((oposicion_slug) => ({ articulo_id: articuloId, oposicion_slug }));
  const { error } = await supabase.from("articulo_oposicion").insert(filas);
  if (error) throw error;
}

/** Invalida las páginas públicas donde puede aparecer este artículo. */
function revalidarRutasArticulo(slug: string, oposicionesSlugs: string[]) {
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  for (const oposicionSlug of oposicionesSlugs) {
    revalidatePath(`/${oposicionSlug}/noticias`);
    revalidatePath(`/${oposicionSlug}`);
  }
}

function mensajeError(error: { code?: string }): string {
  return error.code === "23505" ? "Ya existe un artículo con ese slug." : "No se pudo guardar el artículo.";
}

export async function crearArticulo(input: ArticuloInput): Promise<ResultadoAccion> {
  await requireAdmin();
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("articulos")
    .insert({
      titulo: input.titulo,
      slug: input.slug,
      resumen: input.resumen,
      contenido: input.contenido,
      imagen_url: input.imagenUrl || null,
      tipo: input.tipo,
      publicado: input.publicado,
      publicado_en: input.publicado ? new Date().toISOString() : null,
    })
    .select("id")
    .single();
  if (error || !data) return { error: mensajeError(error ?? {}) };

  await sincronizarOposiciones(supabase, data.id, input.oposicionesSlugs);
  revalidarRutasArticulo(input.slug, input.oposicionesSlugs);
  redirect("/admin/blog");
}

export async function actualizarArticulo(id: string, input: ArticuloInput): Promise<ResultadoAccion> {
  await requireAdmin();
  const supabase = createAdminClient();

  // No se pisa `publicado_en` en cada edición: solo se fija la primera vez
  // que pasa a publicado, para que la fecha mostrada no "salte" al editar.
  const { data: actual } = await supabase.from("articulos").select("publicado, publicado_en").eq("id", id).single();
  const publicadoEn = input.publicado
    ? actual?.publicado
      ? actual.publicado_en
      : new Date().toISOString()
    : (actual?.publicado_en ?? null);

  const { error } = await supabase
    .from("articulos")
    .update({
      titulo: input.titulo,
      slug: input.slug,
      resumen: input.resumen,
      contenido: input.contenido,
      imagen_url: input.imagenUrl || null,
      tipo: input.tipo,
      publicado: input.publicado,
      publicado_en: publicadoEn,
    })
    .eq("id", id);
  if (error) return { error: mensajeError(error) };

  await sincronizarOposiciones(supabase, id, input.oposicionesSlugs);
  revalidarRutasArticulo(input.slug, input.oposicionesSlugs);
  redirect("/admin/blog");
}

export async function eliminarArticulo(id: string, slug: string): Promise<ResultadoAccion> {
  await requireAdmin();
  const supabase = createAdminClient();

  const { data: relacionadas } = await supabase
    .from("articulo_oposicion")
    .select("oposicion_slug")
    .eq("articulo_id", id);

  const { error } = await supabase.from("articulos").delete().eq("id", id);
  if (error) return { error: "No se pudo eliminar el artículo." };

  revalidarRutasArticulo(
    slug,
    (relacionadas ?? []).map((r) => r.oposicion_slug)
  );
  redirect("/admin/blog");
}

import { createClient } from "@/lib/supabase/public";
import type { Articulo, TipoArticulo } from "./types";

/**
 * Consultas públicas del blog (solo artículos `publicado = true`, vía RLS
 * — ver `supabase/migrations/0008_blog.sql`). Las consultas del panel de
 * admin (que sí ven borradores) viven en `src/app/admin/blog/`, con
 * `createAdminClient()`.
 *
 * A diferencia de `lib/oposiciones.ts` (donde un fallo SÍ debe romper la
 * página, porque el contenido es el centro de la página), aquí "nunca se
 * rechaza": estas funciones alimentan secciones opcionales ("Últimas
 * noticias" en las homes, el sitemap) además de las páginas del propio
 * blog, y no deben tumbar el resto del sitio — ni por un problema de red
 * puntual, ni mientras la migración `0008_blog.sql` no se haya ejecutado
 * todavía (la tabla `articulos` no existe = error de Postgres, no un sitio
 * roto).
 */

type FilaArticulo = {
  id: string;
  slug: string;
  titulo: string;
  resumen: string;
  contenido: string;
  imagen_url: string | null;
  tipo: TipoArticulo;
  publicado: boolean;
  publicado_en: string | null;
  created_at: string;
  updated_at: string;
};

export function mapArticulo(fila: FilaArticulo): Articulo {
  return {
    id: fila.id,
    slug: fila.slug,
    titulo: fila.titulo,
    resumen: fila.resumen,
    contenido: fila.contenido,
    imagenUrl: fila.imagen_url,
    tipo: fila.tipo,
    publicado: fila.publicado,
    publicadoEn: fila.publicado_en,
    createdAt: fila.created_at,
    updatedAt: fila.updated_at,
  };
}

const SELECT_ARTICULO = "id, slug, titulo, resumen, contenido, imagen_url, tipo, publicado, publicado_en, created_at, updated_at";

/** Últimos artículos publicados (blog general), más recientes primero. Nunca rechaza: `[]` si algo falla. */
export async function getArticulosPublicados(limit?: number): Promise<Articulo[]> {
  try {
    const supabase = createClient();
    let query = supabase.from("articulos").select(SELECT_ARTICULO).order("publicado_en", { ascending: false });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map(mapArticulo);
  } catch (error) {
    console.warn("No se pudieron cargar los artículos publicados:", error);
    return [];
  }
}

/** Un artículo publicado por su slug, o `undefined` si no existe, no está publicado, o algo falla. */
export async function getArticuloPublicadoPorSlug(slug: string): Promise<Articulo | undefined> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("articulos").select(SELECT_ARTICULO).eq("slug", slug).maybeSingle();
    if (error) throw error;
    return data ? mapArticulo(data) : undefined;
  } catch (error) {
    console.warn(`No se pudo cargar el artículo "${slug}":`, error);
    return undefined;
  }
}

/**
 * Artículos publicados vinculados a una oposición (unión con
 * `articulo_oposicion`), más recientes primero. Nunca rechaza: `[]` si algo falla.
 */
export async function getArticulosDeOposicion(oposicionSlug: string, limit?: number): Promise<Articulo[]> {
  try {
    const supabase = createClient();
    let query = supabase
      .from("articulo_oposicion")
      .select(`articulos!inner(${SELECT_ARTICULO})`)
      .eq("oposicion_slug", oposicionSlug)
      .eq("articulos.publicado", true)
      .order("publicado_en", { ascending: false, referencedTable: "articulos" });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? [])
      .map((fila) => (Array.isArray(fila.articulos) ? fila.articulos[0] : fila.articulos))
      .filter((a): a is FilaArticulo => !!a)
      .map(mapArticulo);
  } catch (error) {
    console.warn(`No se pudieron cargar las noticias de "${oposicionSlug}":`, error);
    return [];
  }
}

type FilaOposicionRelacionada = {
  oposicion_slug: string;
  oposiciones: { nombre: string; organismo: string } | { nombre: string; organismo: string }[] | null;
};

/**
 * Oposiciones a las que afecta un artículo (para los chips del detalle).
 * Incluye `organismo` a propósito: si dos oposiciones comparten nombre de
 * puesto (p. ej. "Auxiliar Administrativo" en el Ayuntamiento y en la DPZ),
 * los chips no deben quedar indistinguibles. Nunca rechaza: `[]` si algo falla.
 */
export async function getOposicionesDeArticulo(
  articuloId: string
): Promise<{ slug: string; nombre: string; organismo: string }[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("articulo_oposicion")
      .select("oposicion_slug, oposiciones(nombre, organismo)")
      .eq("articulo_id", articuloId)
      .returns<FilaOposicionRelacionada[]>();
    if (error) throw error;
    return (data ?? []).map((fila) => {
      const oposicion = Array.isArray(fila.oposiciones) ? fila.oposiciones[0] : fila.oposiciones;
      return {
        slug: fila.oposicion_slug,
        nombre: oposicion?.nombre ?? fila.oposicion_slug,
        organismo: oposicion?.organismo ?? "",
      };
    });
  } catch (error) {
    console.warn(`No se pudieron cargar las oposiciones relacionadas del artículo "${articuloId}":`, error);
    return [];
  }
}

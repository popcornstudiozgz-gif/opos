import { createClient } from "@/lib/supabase/public";
import type { Bloque, EnlaceLegal, Oposicion, TemaDeOposicion } from "./types";

/**
 * Funciones de consulta contra Supabase — el "join" que antes hacían a mano
 * las funciones sobre los arrays de `data/temario/*.ts` ahora lo hace
 * Postgres. La forma de las funciones no cambió: solo su implementación
 * (esto es justo lo que se diseñó desde el principio en `lib/types.ts`).
 */

type FilaOposicion = {
  slug: string;
  nombre: string;
  organismo: string;
  descripcion_corta: string;
  descripcion_larga: string;
  activa: boolean;
};

function mapOposicion(fila: FilaOposicion): Oposicion {
  return {
    slug: fila.slug,
    nombre: fila.nombre,
    organismo: fila.organismo,
    descripcionCorta: fila.descripcion_corta,
    descripcionLarga: fila.descripcion_larga,
    activa: fila.activa,
  };
}

type FilaBloque = {
  id: string;
  oposicion_slug: string;
  slug: string;
  titulo: string;
  descripcion: string | null;
  orden: number;
};

function mapBloque(fila: FilaBloque): Bloque {
  return {
    slug: fila.slug,
    oposicionSlug: fila.oposicion_slug,
    titulo: fila.titulo,
    descripcion: fila.descripcion ?? "",
    orden: fila.orden,
  };
}

/** Fila de `tema_oposicion` con sus relaciones (`temas`, `bloques`) resueltas. */
type FilaTemaOposicion = {
  tema_slug: string;
  oposicion_slug: string;
  numero: number;
  orden: number;
  es_premium: boolean;
  publicado: boolean;
  temas: {
    slug: string;
    titulo: string;
    descripcion: string;
    contenido: string | null;
    enlaces_boe: EnlaceLegal[] | null;
  };
  bloques: { slug: string };
};

function mapTemaDeOposicion(fila: FilaTemaOposicion): TemaDeOposicion {
  return {
    slug: fila.temas.slug,
    titulo: fila.temas.titulo,
    descripcion: fila.temas.descripcion,
    contenido: fila.temas.contenido ?? undefined,
    enlacesBoe: fila.temas.enlaces_boe ?? undefined,
    temaSlug: fila.tema_slug,
    oposicionSlug: fila.oposicion_slug,
    bloqueSlug: fila.bloques.slug,
    numero: fila.numero,
    orden: fila.orden,
    esPremium: fila.es_premium,
    publicado: fila.publicado,
  };
}

const SELECT_TEMA_OPOSICION =
  "tema_slug, oposicion_slug, numero, orden, es_premium, publicado, temas(*), bloques(slug)";

export async function getOposiciones(): Promise<Oposicion[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("oposiciones").select("*").eq("activa", true);
  if (error) throw error;
  return (data ?? []).map(mapOposicion);
}

export async function getOposicion(slug: string): Promise<Oposicion | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase.from("oposiciones").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? mapOposicion(data) : undefined;
}

export async function getBloquesDeOposicion(oposicionSlug: string): Promise<Bloque[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bloques")
    .select("*")
    .eq("oposicion_slug", oposicionSlug)
    .order("orden");
  if (error) throw error;
  return (data ?? []).map(mapBloque);
}

/** Todos los temas asignados a una oposición, con su contenido canónico ya resuelto. */
export async function getTemasDeOposicion(oposicionSlug: string): Promise<TemaDeOposicion[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tema_oposicion")
    .select(SELECT_TEMA_OPOSICION)
    .eq("oposicion_slug", oposicionSlug)
    .order("numero");
  if (error) throw error;
  return (data ?? []).map((fila) => mapTemaDeOposicion(fila as unknown as FilaTemaOposicion));
}

/** Un tema concreto ya resuelto en el contexto de una oposición (o `undefined` si no está asignado a ella). */
export async function getTemaDeOposicion(
  oposicionSlug: string,
  temaSlug: string
): Promise<TemaDeOposicion | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tema_oposicion")
    .select(SELECT_TEMA_OPOSICION)
    .eq("oposicion_slug", oposicionSlug)
    .eq("tema_slug", temaSlug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapTemaDeOposicion(data as unknown as FilaTemaOposicion) : undefined;
}

/** Bloques de una oposición, cada uno con sus temas ya resueltos y ordenados. */
export async function getBloquesConTemas(oposicionSlug: string) {
  const [bloques, temas] = await Promise.all([
    getBloquesDeOposicion(oposicionSlug),
    getTemasDeOposicion(oposicionSlug),
  ]);
  return bloques.map((bloque) => ({
    ...bloque,
    temas: temas.filter((t) => t.bloqueSlug === bloque.slug),
  }));
}

/** Todos los pares oposición/tema publicados, para `generateStaticParams`. */
export async function getParamsTemarioEstatico() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tema_oposicion")
    .select("oposicion_slug, tema_slug")
    .eq("publicado", true);
  if (error) throw error;
  return (data ?? []).map((fila) => ({ oposicion: fila.oposicion_slug, slug: fila.tema_slug }));
}

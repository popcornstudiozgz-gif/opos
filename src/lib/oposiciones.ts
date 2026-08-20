import { OPOSICIONES } from "@/data/oposiciones";
import { BLOQUES } from "@/data/temario/bloques";
import { TEMAS, getTemaCanonico } from "@/data/temario/temas";
import { ASIGNACIONES } from "@/data/temario/asignaciones";
import type { Bloque, Oposicion, TemaDeOposicion } from "./types";

/**
 * Funciones de consulta sobre el catálogo local. Hacen exactamente el mismo
 * "join" que haría la base de datos más adelante (oposiciones · bloques ·
 * temas · tema_oposicion): esto es intencional, para que migrar a Supabase
 * sea sustituir estas funciones por queries, sin tocar quien las llama.
 */

export function getOposiciones(): Oposicion[] {
  return OPOSICIONES.filter((o) => o.activa);
}

export function getOposicion(slug: string): Oposicion | undefined {
  return OPOSICIONES.find((o) => o.slug === slug);
}

export function getBloquesDeOposicion(oposicionSlug: string): Bloque[] {
  return BLOQUES.filter((b) => b.oposicionSlug === oposicionSlug).sort((a, b) => a.orden - b.orden);
}

/** Todos los temas asignados a una oposición, con su contenido canónico ya resuelto. */
export function getTemasDeOposicion(oposicionSlug: string): TemaDeOposicion[] {
  return ASIGNACIONES.filter((a) => a.oposicionSlug === oposicionSlug)
    .map((asignacion) => {
      const tema = getTemaCanonico(asignacion.temaSlug);
      if (!tema) {
        throw new Error(
          `La asignación de "${asignacion.temaSlug}" a "${oposicionSlug}" apunta a un tema que no existe en TEMAS.`
        );
      }
      return { ...tema, ...asignacion };
    })
    .sort((a, b) => a.numero - b.numero);
}

/** Un tema concreto ya resuelto en el contexto de una oposición (o `undefined` si no está asignado a ella). */
export function getTemaDeOposicion(oposicionSlug: string, temaSlug: string): TemaDeOposicion | undefined {
  return getTemasDeOposicion(oposicionSlug).find((t) => t.slug === temaSlug);
}

/** Bloques de una oposición, cada uno con sus temas ya resueltos y ordenados. */
export function getBloquesConTemas(oposicionSlug: string) {
  const bloques = getBloquesDeOposicion(oposicionSlug);
  const temas = getTemasDeOposicion(oposicionSlug);
  return bloques.map((bloque) => ({
    ...bloque,
    temas: temas.filter((t) => t.bloqueSlug === bloque.slug),
  }));
}

/** Todos los slugs de tema-oposición válidos, para `generateStaticParams`. */
export function getParamsTemarioEstatico() {
  return ASIGNACIONES.map((a) => ({ oposicion: a.oposicionSlug, slug: a.temaSlug }));
}

export { TEMAS };

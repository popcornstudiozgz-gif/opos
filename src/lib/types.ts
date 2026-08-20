/**
 * Tipos de dominio compartidos en toda la aplicación.
 *
 * Decisión de arquitectura (ver README): "tema" es contenido reutilizable,
 * independiente de la oposición. Una oposición no contiene temas directamente:
 * los ASIGNA mediante `AsignacionTema` (el equivalente en memoria de la futura
 * tabla puente `tema_oposicion` en Supabase). Así, un mismo tema (p. ej. la
 * Constitución Española) puede pertenecer a varias oposiciones sin duplicar
 * su contenido.
 */

/** Una oposición del catálogo (p. ej. "Auxiliar Administrativo · Ayto. Zaragoza"). */
export interface Oposicion {
  /** Segmento de URL: /[slug]/... */
  slug: string;
  nombre: string;
  organismo: string;
  descripcionCorta: string;
  descripcionLarga: string;
  /** Si no está activa, no se genera su ruta ni aparece en el catálogo. */
  activa: boolean;
}

/** Enlace a una norma o documento oficial completo (BOE, boletín autonómico, web municipal...). */
export interface EnlaceLegal {
  titulo: string;
  url: string;
  /** Nombre de archivo (sin extensión) del PDF de estudio en `public/pdfs/temario/<pdf>.pdf`. */
  pdf?: string;
}

/**
 * Tema canónico: la unidad de contenido reutilizable. NO pertenece a ninguna
 * oposición en concreto — quién lo usa y en qué bloque/orden se define en
 * `AsignacionTema`.
 */
export interface TemaCanonico {
  slug: string;
  titulo: string;
  descripcion: string;
  contenido?: string;
  enlacesBoe?: EnlaceLegal[];
}

/**
 * Asignación de un tema canónico a una oposición concreta (equivalente a la
 * fila de la tabla puente `tema_oposicion`). Aquí vive todo lo que puede
 * variar de una oposición a otra para el mismo tema: en qué bloque cae, qué
 * número de tema es, si está publicado o si es de pago.
 */
export interface AsignacionTema {
  temaSlug: string;
  oposicionSlug: string;
  bloqueSlug: string;
  numero: number;
  orden: number;
  esPremium: boolean;
  publicado: boolean;
}

/** Bloque temático — agrupa temas dentro de UNA oposición (no se comparte entre oposiciones). */
export interface Bloque {
  slug: string;
  oposicionSlug: string;
  titulo: string;
  descripcion: string;
  orden: number;
}

/** Un tema ya resuelto en el contexto de una oposición (contenido + asignación). */
export type TemaDeOposicion = TemaCanonico & AsignacionTema;

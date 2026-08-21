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
  /**
   * Subconjunto de `Flashcard.seccion` que entra en el temario de esta
   * oposición concreta. `null`/`undefined` = se muestran todas las
   * flashcards del tema (no hay recorte); un array = solo las de esas
   * secciones, aunque el tema canónico tenga más contenido en su biblioteca.
   */
  seccionesIncluidas?: string[] | null;
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

/**
 * Flashcard de estudio. Cuelga del tema canónico (`temaSlug`), no de una
 * oposición: se comparte automáticamente entre cualquier oposición que
 * asigne ese tema. `seccion` es la etiqueta fina (p. ej. "titulo-preliminar")
 * que permite recortar qué tarjetas se muestran por oposición vía
 * `AsignacionTema.seccionesIncluidas`.
 */
export interface Flashcard {
  id: string;
  temaSlug: string;
  seccion: string | null;
  anverso: string;
  reverso: string;
}

/**
 * Término de glosario: un concepto que puede resultar complejo o poco
 * claro, con su definición. `seccion` usa el mismo vocabulario de slugs
 * que `Flashcard.seccion` para ese tema, así que el mismo
 * `AsignacionTema.seccionesIncluidas` recorta ambas tablas por igual.
 */
export interface TerminoGlosario {
  id: string;
  temaSlug: string;
  seccion: string | null;
  termino: string;
  definicion: string;
}

export type Dificultad = "facil" | "media" | "dificil";

export interface OpcionPregunta {
  id: string;
  texto: string;
  esCorrecta: boolean;
}

/**
 * Pregunta de test de opción múltiple, derivada 1:1 de una flashcard del
 * mismo tema/seccion. Igual que `Flashcard` y `TerminoGlosario`, se recorta
 * por oposición reutilizando `AsignacionTema.seccionesIncluidas`.
 */
export interface Pregunta {
  id: string;
  temaSlug: string;
  seccion: string | null;
  enunciado: string;
  explicacion: string | null;
  dificultad: Dificultad;
  opciones: OpcionPregunta[];
}

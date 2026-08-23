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
  /**
   * Segmento de URL: /[slug]/... — se asigna a mano al insertar la
   * oposición (ver `scripts/seed.mjs`), nunca se genera solo desde
   * `nombre`. Varios organismos de Zaragoza/Aragón convocan puestos con el
   * mismo nombre (p. ej. "Auxiliar Administrativo" en el Ayuntamiento, la
   * Diputación Provincial de Zaragoza o la DGA): el slug de cada una debe
   * incluir el organismo para no chocar, del tipo
   * `auxiliar-administrativo-ayto-zaragoza`, `auxiliar-administrativo-dpz`,
   * `auxiliar-administrativo-dga` — nunca `auxiliar-administrativo-2` ni
   * variantes ambiguas. `nombre` puede seguir siendo solo el puesto
   * ("Auxiliar Administrativo"): la desambiguación la da `organismo`, que
   * el código ya combina con `nombre` en el H1, los `<title>`, los chips
   * del blog y el selector del admin — ver el resto de usos de este campo.
   */
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
 * Un punto del índice de estudio de un tema: un título/capítulo concreto de
 * la norma, con el rango de artículos que cubre y un enlace directo a ese
 * punto exacto del BOE (ancla `#aN` sobre el artículo inicial — ver
 * `0010_temas_indice_estudio.sql`). `seccion` reutiliza la misma taxonomía
 * que `Flashcard.seccion`/`Pregunta.seccion` de ese tema, para que quede
 * enlazable con su contenido de práctica en el futuro.
 */
export interface PuntoEstudio {
  seccion: string;
  titulo: string;
  /** P. ej. "arts. 159-165". Ausente si el punto no se corresponde con un rango de artículos (p. ej. un anexo). */
  articulos?: string;
  url: string;
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
  /** Vacío o ausente = todavía no tiene índice de estudio (fallback a `enlacesBoe`). */
  indiceEstudio?: PuntoEstudio[];
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

/**
 * Caso práctico: un supuesto narrativo (situación ficticia pero coherente)
 * resuelto mediante una secuencia ORDENADA de preguntas (`Pregunta`, las
 * mismas de `preguntas`/`opciones`, enlazadas vía `caso_preguntas`). Cuelga
 * del tema canónico, como `Flashcard`/`Pregunta`, pero a propósito NO se
 * recorta por `AsignacionTema.seccionesIncluidas`: mezcla secciones del
 * tema para plantear un supuesto realista, y un caso a medias no tiene
 * sentido. Se muestra completo si el tema está asignado, o no se muestra.
 */
export interface CasoPractico {
  id: string;
  temaSlug: string;
  slug: string;
  titulo: string;
  supuesto: string;
  preguntas: Pregunta[];
}

/** Resumen de un caso práctico para las vistas de listado (sin cargar todas sus preguntas). */
export interface CasoPracticoResumen {
  id: string;
  temaSlug: string;
  slug: string;
  titulo: string;
  supuesto: string;
  numPreguntas: number;
}

export type TipoArticulo = "noticia" | "articulo";

/**
 * Artículo del blog: contenido canónico (como `TemaCanonico`), no
 * pertenece a ninguna oposición en concreto. A qué oposición(es) afecta se
 * define aparte, en `articulo_oposicion` (tabla puente) — ver
 * `getOposicionesDeArticulo` en `lib/blog.ts`. Sin ninguna asociación, es
 * una noticia general que solo aparece en `/blog`.
 */
export interface Articulo {
  id: string;
  slug: string;
  titulo: string;
  resumen: string;
  contenido: string;
  imagenUrl: string | null;
  tipo: TipoArticulo;
  publicado: boolean;
  publicadoEn: string | null;
  createdAt: string;
  updatedAt: string;
}

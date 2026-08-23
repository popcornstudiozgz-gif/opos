import { createClient } from "@/lib/supabase/public";
import type {
  Bloque,
  CasoPractico,
  CasoPracticoResumen,
  EnlaceLegal,
  Flashcard,
  Oposicion,
  Pregunta,
  PuntoEstudio,
  TemaDeOposicion,
  TerminoGlosario,
} from "./types";

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
  secciones_incluidas: string[] | null;
  temas: {
    slug: string;
    titulo: string;
    descripcion: string;
    contenido: string | null;
    enlaces_boe: EnlaceLegal[] | null;
    indice_estudio: PuntoEstudio[] | null;
  };
  bloques: { slug: string };
};

function mapTemaDeOposicion(fila: FilaTemaOposicion): TemaDeOposicion {
  // El índice de estudio cuelga del tema canónico (como enlacesBoe), así
  // que puede describir MÁS secciones de las que esta oposición concreta
  // exige (p. ej. tema-1 documenta las 20 secciones de la CE, pero esta
  // oposición solo pide 4 — ver secciones_incluidas). Se recorta aquí con
  // el mismo criterio que ya usan getPreguntasDeTema/getFlashcardsDeTema,
  // para no mandar a estudiar partes que no entran en el examen.
  const indiceEstudio = fila.secciones_incluidas && fila.secciones_incluidas.length > 0
    ? (fila.temas.indice_estudio ?? []).filter((punto) => fila.secciones_incluidas!.includes(punto.seccion))
    : fila.temas.indice_estudio;

  return {
    slug: fila.temas.slug,
    titulo: fila.temas.titulo,
    descripcion: fila.temas.descripcion,
    contenido: fila.temas.contenido ?? undefined,
    enlacesBoe: fila.temas.enlaces_boe ?? undefined,
    indiceEstudio: indiceEstudio && indiceEstudio.length > 0 ? indiceEstudio : undefined,
    temaSlug: fila.tema_slug,
    oposicionSlug: fila.oposicion_slug,
    bloqueSlug: fila.bloques.slug,
    numero: fila.numero,
    orden: fila.orden,
    esPremium: fila.es_premium,
    publicado: fila.publicado,
    seccionesIncluidas: fila.secciones_incluidas,
  };
}

const SELECT_TEMA_OPOSICION =
  "tema_slug, oposicion_slug, numero, orden, es_premium, publicado, secciones_incluidas, temas(*), bloques(slug)";

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

/**
 * Nº de preguntas distintas de `preguntas` que en realidad pertenecen a un
 * caso práctico (tabla puente `caso_preguntas`), opcionalmente acotado a un
 * subconjunto de temas. Esas preguntas no están disponibles en el test
 * suelto (ver `getPreguntaIdsDeCasosPracticos`), así que se restan de los
 * recuentos de `preguntas` en `getEstadisticasOposicion`/
 * `getEstadisticasCatalogo` para que la cifra mostrada coincida con las
 * preguntas realmente jugables como test.
 */
async function contarPreguntasDeCasosPracticos(temaSlugs?: string[]): Promise<number> {
  const supabase = createClient();
  let query = supabase.from("caso_preguntas").select("pregunta_id, casos_practicos!inner(tema_slug)");
  if (temaSlugs) query = query.in("casos_practicos.tema_slug", temaSlugs);
  const { data, error } = await query;
  if (error) throw error;
  return new Set((data ?? []).map((fila) => (fila as { pregunta_id: string }).pregunta_id)).size;
}

/**
 * Cifras de una oposición para su portada (recuentos, sin traer las filas
 * completas de preguntas/flashcards). Se apoya en los temas ya asignados a
 * la oposición para acotar el `in (...)` de cada recuento. `preguntas`
 * excluye las que solo existen como parte de un caso práctico.
 */
export async function getEstadisticasOposicion(oposicionSlug: string) {
  const temas = await getTemasDeOposicion(oposicionSlug);
  const temaSlugs = temas.map((t) => t.slug);
  if (temaSlugs.length === 0) return { temas: 0, preguntas: 0, flashcards: 0 };

  const supabase = createClient();
  const [{ count: preguntas }, { count: flashcards }, preguntasCasoPractico] = await Promise.all([
    supabase.from("preguntas").select("*", { count: "exact", head: true }).in("tema_slug", temaSlugs),
    supabase.from("flashcards").select("*", { count: "exact", head: true }).in("tema_slug", temaSlugs),
    contarPreguntasDeCasosPracticos(temaSlugs),
  ]);
  return {
    temas: temas.length,
    preguntas: Math.max((preguntas ?? 0) - preguntasCasoPractico, 0),
    flashcards: flashcards ?? 0,
  };
}

/**
 * Cifras globales del catálogo para la portada (recuentos, sin traer
 * filas). `preguntas` excluye las que solo existen como parte de un caso
 * práctico (ver `contarPreguntasDeCasosPracticos`).
 */
export async function getEstadisticasCatalogo() {
  const supabase = createClient();
  const [{ count: oposiciones }, { count: temas }, { count: preguntas }, { count: flashcards }, preguntasCasoPractico] =
    await Promise.all([
      supabase.from("oposiciones").select("*", { count: "exact", head: true }).eq("activa", true),
      supabase.from("temas").select("*", { count: "exact", head: true }),
      supabase.from("preguntas").select("*", { count: "exact", head: true }),
      supabase.from("flashcards").select("*", { count: "exact", head: true }),
      contarPreguntasDeCasosPracticos(),
    ]);
  return {
    oposiciones: oposiciones ?? 0,
    temas: temas ?? 0,
    preguntas: Math.max((preguntas ?? 0) - preguntasCasoPractico, 0),
    flashcards: flashcards ?? 0,
  };
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

type FilaFlashcard = {
  id: string;
  tema_slug: string;
  seccion: string | null;
  anverso: string;
  reverso: string;
};

function mapFlashcard(fila: FilaFlashcard): Flashcard {
  return {
    id: fila.id,
    temaSlug: fila.tema_slug,
    seccion: fila.seccion,
    anverso: fila.anverso,
    reverso: fila.reverso,
  };
}

/**
 * Flashcards de un tema, ya recortadas al alcance de la oposición: si
 * `tema_oposicion.secciones_incluidas` tiene valor, solo se devuelven las
 * tarjetas cuya `seccion` está en esa lista; si es `null`, se devuelve la
 * biblioteca completa del tema. Devuelve `[]` si el tema no está asignado a
 * la oposición.
 */
export async function getFlashcardsDeTema(
  oposicionSlug: string,
  temaSlug: string
): Promise<Flashcard[]> {
  const asignacion = await getTemaDeOposicion(oposicionSlug, temaSlug);
  if (!asignacion) return [];

  const supabase = createClient();
  let query = supabase
    .from("flashcards")
    .select("id, tema_slug, seccion, anverso, reverso")
    .eq("tema_slug", temaSlug);

  if (asignacion.seccionesIncluidas && asignacion.seccionesIncluidas.length > 0) {
    query = query.in("seccion", asignacion.seccionesIncluidas);
  }

  const { data, error } = await query.order("created_at");
  if (error) throw error;
  return (data ?? []).map(mapFlashcard);
}

/**
 * Todas las flashcards de una oposición (unión de todos sus temas
 * asignados, cada uno ya recortado por `secciones_incluidas`). Se usa en
 * la vista "Todas las tarjetas" de `/[oposicion]/flashcards?tema=todas`.
 */
export async function getFlashcardsDeOposicion(oposicionSlug: string): Promise<Flashcard[]> {
  const temas = await getTemasDeOposicion(oposicionSlug);
  const porTema = await Promise.all(
    temas.map((tema) => getFlashcardsDeTema(oposicionSlug, tema.slug))
  );
  return porTema.flat();
}

type FilaTerminoGlosario = {
  id: string;
  tema_slug: string | null;
  seccion: string | null;
  termino: string;
  definicion: string;
};

function mapTerminoGlosario(fila: FilaTerminoGlosario): TerminoGlosario {
  return {
    id: fila.id,
    temaSlug: fila.tema_slug ?? "",
    seccion: fila.seccion,
    termino: fila.termino,
    definicion: fila.definicion,
  };
}

/**
 * Términos de glosario de un tema, recortados al alcance de la oposición
 * con el mismo criterio que `getFlashcardsDeTema` (reutiliza
 * `tema_oposicion.secciones_incluidas`, sin un segundo mecanismo de
 * recorte). Devuelve `[]` si el tema no está asignado a la oposición.
 */
export async function getGlosarioDeTema(
  oposicionSlug: string,
  temaSlug: string
): Promise<TerminoGlosario[]> {
  const asignacion = await getTemaDeOposicion(oposicionSlug, temaSlug);
  if (!asignacion) return [];

  const supabase = createClient();
  let query = supabase
    .from("glosario")
    .select("id, tema_slug, seccion, termino, definicion")
    .eq("tema_slug", temaSlug);

  if (asignacion.seccionesIncluidas && asignacion.seccionesIncluidas.length > 0) {
    query = query.in("seccion", asignacion.seccionesIncluidas);
  }

  const { data, error } = await query.order("termino");
  if (error) throw error;
  return (data ?? []).map(mapTerminoGlosario);
}

/** Todos los términos de glosario de una oposición (unión de todos sus temas asignados). */
export async function getGlosarioDeOposicion(oposicionSlug: string): Promise<TerminoGlosario[]> {
  const temas = await getTemasDeOposicion(oposicionSlug);
  const porTema = await Promise.all(
    temas.map((tema) => getGlosarioDeTema(oposicionSlug, tema.slug))
  );
  return porTema.flat().sort((a, b) => a.termino.localeCompare(b.termino, "es"));
}

type FilaPregunta = {
  id: string;
  tema_slug: string;
  seccion: string | null;
  enunciado: string;
  explicacion: string | null;
  dificultad: string;
  opciones: { id: string; texto: string; es_correcta: boolean; orden: number }[];
};

function mapPregunta(fila: FilaPregunta): Pregunta | null {
  const opciones = [...fila.opciones].sort((a, b) => a.orden - b.orden);
  if (opciones.length < 2) return null; // pregunta mal formada, se descarta en vez de romper la página
  return {
    id: fila.id,
    temaSlug: fila.tema_slug,
    seccion: fila.seccion,
    enunciado: fila.enunciado,
    explicacion: fila.explicacion,
    dificultad: (fila.dificultad as Pregunta["dificultad"]) ?? "media",
    opciones: opciones.map((o) => ({ id: o.id, texto: o.texto, esCorrecta: o.es_correcta })),
  };
}

/**
 * IDs de `preguntas` de un tema que están enlazadas a algún caso práctico
 * (tabla puente `caso_preguntas`). Esas preguntas dan por hecho el
 * contexto del supuesto narrativo del caso (p. ej. "la funcionaria del
 * Ayuntamiento de Zamora del enunciado...") y no tienen sentido sueltas,
 * así que se excluyen del test teórico — ver comentario en
 * `0005_casos_practicos.sql` sobre por qué comparten tabla con `preguntas`.
 */
async function getPreguntaIdsDeCasosPracticos(temaSlug: string): Promise<Set<string>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("caso_preguntas")
    .select("pregunta_id, casos_practicos!inner(tema_slug)")
    .eq("casos_practicos.tema_slug", temaSlug);
  if (error) throw error;
  return new Set((data ?? []).map((fila) => fila.pregunta_id as string));
}

/**
 * Preguntas de test de un tema, recortadas al alcance de la oposición con
 * el mismo criterio que `getFlashcardsDeTema` (reutiliza
 * `tema_oposicion.secciones_incluidas`) y excluyendo las preguntas que
 * pertenecen a un caso práctico (ver `getPreguntaIdsDeCasosPracticos`).
 * Devuelve `[]` si el tema no está asignado a la oposición.
 */
export async function getPreguntasDeTema(oposicionSlug: string, temaSlug: string): Promise<Pregunta[]> {
  const asignacion = await getTemaDeOposicion(oposicionSlug, temaSlug);
  if (!asignacion) return [];

  const supabase = createClient();
  let query = supabase
    .from("preguntas")
    .select("id, tema_slug, seccion, enunciado, explicacion, dificultad, opciones(id, texto, es_correcta, orden)")
    .eq("tema_slug", temaSlug);

  if (asignacion.seccionesIncluidas && asignacion.seccionesIncluidas.length > 0) {
    query = query.in("seccion", asignacion.seccionesIncluidas);
  }

  const [{ data, error }, idsCasoPractico] = await Promise.all([
    query.order("created_at"),
    getPreguntaIdsDeCasosPracticos(temaSlug),
  ]);
  if (error) throw error;
  return (data ?? [])
    .filter((fila) => !idsCasoPractico.has(fila.id))
    .map((fila) => mapPregunta(fila as unknown as FilaPregunta))
    .filter((p): p is Pregunta => p !== null);
}

/** Todas las preguntas de test de una oposición (unión de todos sus temas asignados). */
export async function getPreguntasDeOposicion(oposicionSlug: string): Promise<Pregunta[]> {
  const temas = await getTemasDeOposicion(oposicionSlug);
  const porTema = await Promise.all(
    temas.map((tema) => getPreguntasDeTema(oposicionSlug, tema.slug))
  );
  return porTema.flat();
}

type FilaCasoPracticoResumen = {
  id: string;
  tema_slug: string;
  slug: string;
  titulo: string;
  supuesto: string;
  caso_preguntas: { preguntas: { seccion: string | null } }[];
};

function mapCasoPracticoResumen(fila: FilaCasoPracticoResumen): CasoPracticoResumen {
  return {
    id: fila.id,
    temaSlug: fila.tema_slug,
    slug: fila.slug,
    titulo: fila.titulo,
    supuesto: fila.supuesto,
    numPreguntas: fila.caso_preguntas.length,
  };
}

/**
 * Un caso práctico solo entra en el alcance de una oposición si TODAS sus
 * preguntas caen dentro de `secciones_incluidas` para el tema del caso —
 * igual que ya exige `getPreguntasDeTema` para el test. Antes los casos no
 * se recortaban nunca (ver el comentario histórico que sigue abajo en
 * `getCasoPractico`): un caso mezcla varias secciones de su tema a
 * propósito, y esa mezcla solo es correcta para una oposición si esta
 * pide todas esas secciones. Un tema sin recorte (`secciones_incluidas`
 * vacío o nulo) sigue mostrando todos sus casos, como hasta ahora.
 */
function casoDentroDeAlcance(seccionesDelCaso: (string | null)[], seccionesIncluidas: string[] | null | undefined): boolean {
  if (!seccionesIncluidas || seccionesIncluidas.length === 0) return true;
  return seccionesDelCaso.every((s) => s != null && seccionesIncluidas.includes(s));
}

/**
 * Casos prácticos de un tema, sin cargar el enunciado completo de sus
 * preguntas (basta la sección de cada una, para el recorte, y el recuento
 * para la tarjeta del listado). Solo se comprueba que el tema esté
 * asignado a la oposición — el recorte por `seccionesIncluidas` lo aplica
 * `casoDentroDeAlcance`. Devuelve `[]` si el tema no está asignado.
 */
export async function getCasosPracticosDeTema(
  oposicionSlug: string,
  temaSlug: string
): Promise<CasoPracticoResumen[]> {
  const asignacion = await getTemaDeOposicion(oposicionSlug, temaSlug);
  if (!asignacion) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from("casos_practicos")
    .select("id, tema_slug, slug, titulo, supuesto, caso_preguntas(preguntas(seccion))")
    .eq("tema_slug", temaSlug)
    .order("orden");
  if (error) throw error;
  return ((data ?? []) as unknown as FilaCasoPracticoResumen[])
    .filter((fila) => casoDentroDeAlcance(fila.caso_preguntas.map((cp) => cp.preguntas.seccion), asignacion.seccionesIncluidas))
    .map((fila) => mapCasoPracticoResumen(fila));
}

type FilaCasoPractico = {
  id: string;
  tema_slug: string;
  slug: string;
  titulo: string;
  supuesto: string;
  caso_preguntas: { orden: number; preguntas: FilaPregunta }[];
};

const SELECT_CASO_PRACTICO_COMPLETO =
  "id, tema_slug, slug, titulo, supuesto, caso_preguntas(orden, preguntas(id, tema_slug, seccion, enunciado, explicacion, dificultad, opciones(id, texto, es_correcta, orden)))";

function mapCasoPractico(fila: FilaCasoPractico): CasoPractico {
  const preguntas = [...fila.caso_preguntas]
    .sort((a, b) => a.orden - b.orden)
    .map((cp) => mapPregunta(cp.preguntas))
    .filter((p): p is Pregunta => p !== null);

  return {
    id: fila.id,
    temaSlug: fila.tema_slug,
    slug: fila.slug,
    titulo: fila.titulo,
    supuesto: fila.supuesto,
    preguntas,
  };
}

/**
 * Un caso práctico completo por su slug, con sus preguntas ya resueltas y
 * ordenadas según `caso_preguntas.orden`. Comprueba que su tema esté
 * asignado a la oposición y que el caso entre en su recorte (ver
 * `casoDentroDeAlcance`); devuelve `undefined` si el caso no existe, su
 * tema no está asignado, o queda fuera del recorte de esta oposición.
 */
export async function getCasoPractico(
  oposicionSlug: string,
  slug: string
): Promise<CasoPractico | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("casos_practicos")
    .select(SELECT_CASO_PRACTICO_COMPLETO)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  if (!data) return undefined;

  const fila = data as unknown as FilaCasoPractico;
  const asignacion = await getTemaDeOposicion(oposicionSlug, fila.tema_slug);
  if (!asignacion) return undefined;
  if (!casoDentroDeAlcance(fila.caso_preguntas.map((cp) => cp.preguntas.seccion), asignacion.seccionesIncluidas)) return undefined;

  return mapCasoPractico(fila);
}

/**
 * Todos los casos prácticos completos (con sus preguntas) de los temas
 * asignados a una oposición — se usa en el simulacro, que necesita elegir
 * casos al azar de toda la oposición, no de un tema concreto.
 */
export async function getCasosPracticosDeOposicion(oposicionSlug: string): Promise<CasoPractico[]> {
  const temas = await getTemasDeOposicion(oposicionSlug);
  const temaSlugs = temas.map((t) => t.slug);
  if (temaSlugs.length === 0) return [];
  const seccionesPorTema = new Map(temas.map((t) => [t.slug, t.seccionesIncluidas]));

  const supabase = createClient();
  const { data, error } = await supabase
    .from("casos_practicos")
    .select(SELECT_CASO_PRACTICO_COMPLETO)
    .in("tema_slug", temaSlugs)
    .order("orden");
  if (error) throw error;

  return (data ?? [])
    .map((fila) => fila as unknown as FilaCasoPractico)
    .filter((fila) => casoDentroDeAlcance(fila.caso_preguntas.map((cp) => cp.preguntas.seccion), seccionesPorTema.get(fila.tema_slug)))
    .map((fila) => mapCasoPractico(fila));
}

/** Todos los pares oposición/slug de caso práctico publicados, para `generateStaticParams`. */
export async function getParamsCasosPracticosEstatico() {
  const supabase = createClient();
  const [{ data: asignaciones, error: errAsig }, { data: casos, error: errCasos }] = await Promise.all([
    supabase.from("tema_oposicion").select("oposicion_slug, tema_slug").eq("publicado", true),
    supabase.from("casos_practicos").select("slug, tema_slug"),
  ]);
  if (errAsig) throw errAsig;
  if (errCasos) throw errCasos;

  const pares: { oposicion: string; slug: string }[] = [];
  for (const asignacion of asignaciones ?? []) {
    for (const caso of casos ?? []) {
      if (caso.tema_slug === asignacion.tema_slug) {
        pares.push({ oposicion: asignacion.oposicion_slug, slug: caso.slug });
      }
    }
  }
  return pares;
}

import type { Metadata } from "next";

/**
 * Configuración global del DOMINIO (no de una oposición concreta).
 * El nombre/descripción de cada oposición vive en Supabase (tabla
 * `oposiciones`) y se resuelve por slug con `getOposicion()` — ver
 * `lib/oposiciones.ts`.
 */
export const SITE = {
  nombre: "Oposiciones Zaragoza",
  // Marca corta para espacios reducidos (badges, favicon, cabecera de admin).
  iniciales: "OZ",
  descripcionCorta: "Oposiciones Zaragoza: temario, test y simulacros para preparar tu oposición.",
  descripcionLarga:
    "Prepara tu oposición en Zaragoza gratis: novedades, temario oficial, test, flashcards, casos prácticos y simulacros cronometrados.",
  // Dominio propio (comprado en cdmon). robots.ts sigue bloqueando la
  // indexación a propósito mientras el sitio no esté listo para lanzarse.
  url: "https://oposicioneszaragoza.es",
  idioma: "es-ES",
  // Datos del titular para las páginas legales (aviso legal, privacidad,
  // cookies) — proyecto personal, sin actividad mercantil constituida.
  titular: "Darío Marín",
  emailContacto: "dariomarinanson@gmail.com",
} as const;

/**
 * Construye los metadatos de una página partiendo de los valores por defecto.
 *
 * `indexable = false` marca la página como `noindex, follow`: no debe
 * aparecer en buscadores por sí sola (contenido duplicado o sin intención de
 * búsqueda propia — p. ej. una página de tema individual, que nunca va a
 * competir con el BOE por el término legal y solo duplica el mismo
 * `tema.contenido` en cada oposición que reutiliza ese tema), pero sigue
 * siendo rastreable: Google sigue los enlaces que salen de ella (a
 * test/flashcards/casos prácticos, que sí interesa indexar) sin problema.
 */
export function crearMetadata({
  titulo,
  descripcion,
  ruta = "/",
  indexable = true,
}: {
  titulo: string;
  descripcion: string;
  ruta?: string;
  indexable?: boolean;
}): Metadata {
  const url = `${SITE.url}${ruta}`;
  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: url },
    openGraph: {
      title: titulo,
      description: descripcion,
      url,
      siteName: SITE.nombre,
      locale: SITE.idioma,
      type: "website",
    },
    ...(!indexable && { robots: { index: false, follow: true } }),
  };
}

/**
 * Forma corta del organismo (p. ej. "Diputación Provincial de Zaragoza" →
 * "DPZ", para titles que van sueltos) y forma con preposición ya resuelta
 * (para frases tipo "el examen del Ayuntamiento de Zaragoza") — ninguna de
 * las dos es mecánica (no hay una regla fiable para acortar cualquier
 * organismo, ni para saber su género/preposición), así que es un mapa a
 * mano: se añade una entrada por oposición nueva al darla de alta, igual
 * que ya se decide su `slug` a mano. Si falta una entrada, cae al organismo
 * completo — el title sale más largo, pero nunca roto ni con un dato
 * inventado.
 */
const ORGANISMOS: Record<string, { abreviado: string; conPreposicion: string }> = {
  "auxiliar-administrativo-ayto-zaragoza": { abreviado: "Ayto. Zaragoza", conPreposicion: "del Ayto. de Zaragoza" },
  "auxiliar-administrativo-dpz": { abreviado: "DPZ", conPreposicion: "de la DPZ" },
};

export function organismoAbreviado(oposicionSlug: string, organismoCompleto: string): string {
  return ORGANISMOS[oposicionSlug]?.abreviado ?? organismoCompleto;
}

export function organismoConPreposicion(oposicionSlug: string, organismoCompleto: string): string {
  return ORGANISMOS[oposicionSlug]?.conPreposicion ?? `de ${organismoCompleto}`;
}

/**
 * Abrevia el nombre del puesto en los titles que se alargan más (casos
 * prácticos, simulacro) — a diferencia del organismo, esto sí es lo bastante
 * mecánico como para no necesitar un mapa: hoy solo hace falta acortar
 * "Auxiliar", y si el nombre no empieza así (un puesto distinto en una
 * oposición futura), se queda tal cual en vez de inventar una abreviatura.
 */
export function nombreAbreviado(nombre: string): string {
  return nombre.replace(/^Auxiliar\b/, "Aux.");
}

/**
 * Año de una convocatoria a partir de su número/identificador — nunca se
 * escribe un año a mano en una plantilla de title/H1 (quedaría obsoleto en
 * cuanto cambie de año). Funciona con los dos formatos que ya usáis:
 * "CONV 4/2026" y "Decreto núm. 464/2026", porque ambos terminan en el año.
 */
export function anioDeConvocatoria(numero: string): string | null {
  const match = numero.match(/(\d{4})\s*$/);
  return match ? match[1] : null;
}

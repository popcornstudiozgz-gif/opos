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
  // Dominio propio (comprado en cdmon). Indexación abierta desde el
  // lanzamiento (25/08/2026) — ver robots.ts.
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
 * "DPZ", para titles que van sueltos), forma abreviada con preposición ya
 * resuelta (para titles largos tipo "Simulacro... del Ayto. de Zaragoza")
 * y la preposición sola (para componerla con el nombre COMPLETO en sitios
 * como el H1 de la página de organismo: "Oposiciones del Ayuntamiento de
 * Zaragoza") — nada de esto es mecánico (no hay una regla fiable para
 * acortar cualquier organismo, ni para saber su género/preposición), así
 * que es un mapa a mano: se añade una entrada por organismo nuevo al
 * darlo de alta, igual que ya se decide su `organismoSlug` a mano. Si
 * falta una entrada, cae al organismo completo — el texto sale más largo,
 * pero nunca roto ni con un dato inventado.
 *
 * Se indexa por `organismoSlug` (no por el `slug` de cada oposición): es el
 * organismo, no el puesto, quien tiene una abreviatura y un género propios
 * — dos oposiciones del mismo organismo comparten la misma entrada aquí, en
 * vez de duplicarla por cada una.
 */
const ORGANISMOS: Record<string, { abreviado: string; conPreposicion: string; preposicion: string }> = {
  "ayuntamiento-zaragoza": { abreviado: "Ayto. Zaragoza", conPreposicion: "del Ayto. de Zaragoza", preposicion: "del" },
  dpz: { abreviado: "DPZ", conPreposicion: "de la DPZ", preposicion: "de la" },
  "gobierno-aragon": { abreviado: "DGA", conPreposicion: "de la DGA", preposicion: "del" },
};

export function organismoAbreviado(organismoSlug: string, organismoCompleto: string): string {
  return ORGANISMOS[organismoSlug]?.abreviado ?? organismoCompleto;
}

export function organismoConPreposicion(organismoSlug: string, organismoCompleto: string): string {
  return ORGANISMOS[organismoSlug]?.conPreposicion ?? `de ${organismoCompleto}`;
}

/**
 * Igual que `organismoConPreposicion`, pero con el nombre COMPLETO del
 * organismo en vez de la forma abreviada — para titulares donde el
 * organismo ya es el tema de toda la página (el H1 de /[organismo]) y
 * abreviarlo no aporta nada, solo resta claridad.
 */
export function organismoConPreposicionCompleto(organismoSlug: string, organismoCompleto: string): string {
  const entrada = ORGANISMOS[organismoSlug];
  return entrada ? `${entrada.preposicion} ${organismoCompleto}` : `de ${organismoCompleto}`;
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

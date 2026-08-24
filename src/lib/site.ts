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
    "Prepara tu oposición en Zaragoza con temario oficial, tests, flashcards, casos prácticos y simulacros cronometrados. Empieza gratis con Auxiliar Administrativo del Ayuntamiento de Zaragoza, y próximamente más oposiciones de la ciudad.",
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

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
  // Dominio provisional de desarrollo local. Cambiar cuando haya dominio propio.
  url: "http://localhost:3000",
  idioma: "es-ES",
  // Datos del titular para las páginas legales (aviso legal, privacidad,
  // cookies) — proyecto personal, sin actividad mercantil constituida.
  titular: "Darío Marín",
  emailContacto: "dariomarinanson@gmail.com",
} as const;

/** Construye los metadatos de una página partiendo de los valores por defecto. */
export function crearMetadata({
  titulo,
  descripcion,
  ruta = "/",
}: {
  titulo: string;
  descripcion: string;
  ruta?: string;
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
  };
}

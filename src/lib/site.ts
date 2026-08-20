import type { Metadata } from "next";

/**
 * Configuración global del DOMINIO (no de una oposición concreta).
 * El nombre/descripción de cada oposición vive en `data/oposiciones.ts`
 * y se resuelve por slug con `getOposicion()` — ver `lib/oposiciones.ts`.
 */
export const SITE = {
  nombre: "Kiuti",
  descripcionCorta: "Prepara tu oposición: temario de cada oposición en un único sitio.",
  descripcionLarga:
    "Plataforma de preparación de oposiciones. Cada oposición tiene su propio temario, reutilizando el contenido que comparten entre sí.",
  // Dominio provisional de desarrollo local. Cambiar cuando haya dominio propio.
  url: "http://localhost:3000",
  idioma: "es-ES",
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

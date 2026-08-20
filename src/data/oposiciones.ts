import type { Oposicion } from "@/lib/types";

/**
 * Catálogo de oposiciones del sitio. Cada una vive en /[slug]/...
 * Añadir una oposición nueva es añadir una entrada aquí + sus bloques/asignaciones
 * en `data/temario/`, reutilizando los temas canónicos que ya existan cuando coincidan.
 */
export const OPOSICIONES: Oposicion[] = [
  {
    slug: "auxiliar-administrativo",
    nombre: "Auxiliar Administrativo",
    organismo: "Ayuntamiento de Zaragoza",
    descripcionCorta:
      "Preparación online para Auxiliar Administrativo del Ayuntamiento de Zaragoza.",
    descripcionLarga:
      "Temario interactivo para preparar la oposición de Auxiliar Administrativo del Ayuntamiento de Zaragoza: 20 temas oficiales organizados en 7 bloques.",
    activa: true,
  },
];

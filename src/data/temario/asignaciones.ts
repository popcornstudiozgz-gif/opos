import type { AsignacionTema } from "@/lib/types";

/**
 * Asignación de cada tema canónico a la oposición "auxiliar-administrativo"
 * (equivalente en memoria a la tabla puente `tema_oposicion`). El número de
 * tema y el bloque son propios de ESTA oposición: si en el futuro otra
 * oposición reutiliza `tema-1`, puede colocarlo en otro bloque y con otro
 * número sin tocar el contenido del tema.
 */
export const ASIGNACIONES: AsignacionTema[] = [
  { temaSlug: "tema-1", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-1", numero: 1, orden: 1, esPremium: false, publicado: true },
  { temaSlug: "tema-2", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-2", numero: 2, orden: 2, esPremium: false, publicado: true },
  { temaSlug: "tema-3", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-1", numero: 3, orden: 3, esPremium: false, publicado: true },
  { temaSlug: "tema-4", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-3", numero: 4, orden: 4, esPremium: false, publicado: true },
  { temaSlug: "tema-5", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-3", numero: 5, orden: 5, esPremium: false, publicado: true },
  { temaSlug: "tema-6", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-3", numero: 6, orden: 6, esPremium: false, publicado: true },
  { temaSlug: "tema-7", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-3", numero: 7, orden: 7, esPremium: false, publicado: true },
  { temaSlug: "tema-8", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-3", numero: 8, orden: 8, esPremium: false, publicado: true },
  { temaSlug: "tema-9", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-4", numero: 9, orden: 9, esPremium: false, publicado: true },
  { temaSlug: "tema-10", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-4", numero: 10, orden: 10, esPremium: false, publicado: true },
  { temaSlug: "tema-11", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-4", numero: 11, orden: 11, esPremium: false, publicado: true },
  { temaSlug: "tema-12", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-5", numero: 12, orden: 12, esPremium: false, publicado: true },
  { temaSlug: "tema-13", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-5", numero: 13, orden: 13, esPremium: false, publicado: true },
  { temaSlug: "tema-14", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-1", numero: 14, orden: 14, esPremium: false, publicado: true },
  { temaSlug: "tema-15", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-4", numero: 15, orden: 15, esPremium: false, publicado: true },
  { temaSlug: "tema-16", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-4", numero: 16, orden: 16, esPremium: false, publicado: true },
  { temaSlug: "tema-17", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-6", numero: 17, orden: 17, esPremium: false, publicado: true },
  { temaSlug: "tema-18", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-6", numero: 18, orden: 18, esPremium: false, publicado: true },
  { temaSlug: "tema-19", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-6", numero: 19, orden: 19, esPremium: false, publicado: true },
  { temaSlug: "tema-23", oposicionSlug: "auxiliar-administrativo", bloqueSlug: "bloque-7", numero: 20, orden: 20, esPremium: false, publicado: true },
];

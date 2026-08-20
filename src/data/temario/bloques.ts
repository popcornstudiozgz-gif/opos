import type { Bloque } from "@/lib/types";

/**
 * Bloques del temario, por oposición. Un bloque NO se comparte entre
 * oposiciones (aunque agrupe temas que sí se comparten): el bloque 1 de
 * "auxiliar-administrativo" no tiene por qué coincidir con el bloque 1 de
 * otra oposición que use alguno de los mismos temas.
 */
export const BLOQUES: Bloque[] = [
  {
    slug: "bloque-1",
    oposicionSlug: "auxiliar-administrativo",
    titulo: "Bloque 1 — Marco constitucional y territorial",
    descripcion:
      "Constitución Española, Estatuto de Autonomía de Aragón y la organización territorial y municipal.",
    orden: 1,
  },
  {
    slug: "bloque-2",
    oposicionSlug: "auxiliar-administrativo",
    titulo: "Bloque 2 — Igualdad y políticas sociales",
    descripcion:
      "Políticas públicas de igualdad efectiva de género, tutela contra la discriminación, protección a las víctimas de violencia de género y plan de igualdad de Zaragoza.",
    orden: 2,
  },
  {
    slug: "bloque-3",
    oposicionSlug: "auxiliar-administrativo",
    titulo: "Bloque 3 — Procedimiento administrativo",
    descripcion:
      "Disposiciones de la Ley 39/2015 del Procedimiento Administrativo Común de las Administraciones Públicas.",
    orden: 3,
  },
  {
    slug: "bloque-4",
    oposicionSlug: "auxiliar-administrativo",
    titulo: "Bloque 4 — Régimen local",
    descripcion:
      "Contratación administrativa, patrimonio de las entidades locales, fomento, participación ciudadana y potestad reglamentaria.",
    orden: 4,
  },
  {
    slug: "bloque-5",
    oposicionSlug: "auxiliar-administrativo",
    titulo: "Bloque 5 — Hacienda local",
    descripcion:
      "Presupuestos y recursos de las Haciendas Locales y especialidades del régimen de capitalidad de Zaragoza.",
    orden: 5,
  },
  {
    slug: "bloque-6",
    oposicionSlug: "auxiliar-administrativo",
    titulo: "Bloque 6 — Función pública",
    descripcion:
      "Clases de empleados públicos, derechos y deberes, situaciones administrativas, régimen disciplinario y función pública local.",
    orden: 6,
  },
  {
    slug: "bloque-7",
    oposicionSlug: "auxiliar-administrativo",
    titulo: "Bloque 7 — Urbanismo",
    descripcion: "Aspectos básicos de la Ley de Urbanismo de Aragón.",
    orden: 7,
  },
];

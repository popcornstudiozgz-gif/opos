/**
 * Fichas (sin material de estudio) de 22 oposiciones de PTGAS (personal
 * técnico, de gestión y de administración y servicios) funcionario de la
 * Universidad de Zaragoza. Organismo nuevo: `universidad-zaragoza`.
 *
 * Fuentes, leídas en noviembre de 2026:
 * - Las convocatorias de turno libre de 2025 y 2026 en el BOA, localizadas con
 *   el buscador del BOA por título y leídas del PDF: base 1.1 (plazas y
 *   turnos), base 2 (titulación), base 3 (plazo y tasa), bases 8-9 (ejercicios,
 *   puntuaciones y fase de concurso del turno libre) y anexo de temario (el
 *   de acceso libre cuando la convocatoria trae también el de promoción
 *   interna). Datos en `scripts/data/fichas-unizar.json`.
 * - Sumarios del BOE (API de datos abiertos), revisados día a día del
 *   12-09-2026 al 12-11-2026, para saber si cada convocatoria reciente ya ha
 *   salido en el BOE: el plazo son 20 días naturales desde esa publicación.
 *
 * Decisiones y lagunas:
 * - Ayudantes y Facultativos de Archivos y Bibliotecas, Técnicos Medios de
 *   Informática y Técnicos Superiores de Educación Física están en el BOA pero
 *   no en el BOE a 12-11-2026: estado `pendiente_publicacion`, con el plazo
 *   explicado. **Cuando salgan en el BOE, pasarlas a `abierta` con
 *   `plazo_fin`** (día de publicación + 20 naturales).
 * - Las convocatorias mixtas suman en `plazas_total` las de promoción
 *   interna, separadas en el desglose (solo para personal de la Universidad).
 * - Una ficha por escala/especialidad: Escala Auxiliar y Escala Auxiliar con
 *   inglés (OPO-25 y 26/2025) van juntas en la primera; las dos de Química-
 *   Biomédica (OPO-22 y 23/2025, una con licencia de operador de
 *   instalaciones radiactivas) en la segunda. Comparten examen y temario.
 * - Técnicos Superiores de Idiomas: un temario con parte general común y una
 *   parte específica por idioma (alemán, francés, inglés, griego, italiano).
 * - Fuera: las convocatorias solo de promoción interna.
 *
 * Uso: node --env-file=.env.local scripts/seed-fichas-unizar.mjs [slug ...]
 */
import { readFileSync } from "node:fs";
import { sembrarFicha } from "./lib/sembrar-ficha.mjs";

const UNIZAR = { organismo: "Universidad de Zaragoza", organismo_slug: "universidad-zaragoza" };
const FICHAS = JSON.parse(readFileSync(new URL("./data/fichas-unizar.json", import.meta.url), "utf8"));
const soloEstas = process.argv.slice(2);

for (const { oposicion, convocatoria } of FICHAS) {
  if (soloEstas.length && !soloEstas.includes(oposicion.slug)) continue;
  await sembrarFicha({
    oposicion: { ...oposicion, ...UNIZAR },
    convocatoria: {
      ...convocatoria,
      organismo: UNIZAR.organismo,
      aspirantes_que_pasan_fase: [],
      ultima_actualizacion: "12 de noviembre de 2026",
    },
  });
}

/**
 * Fichas (sin material de estudio) de las oposiciones del Servicio Aragonés de
 * Salud (SALUD): 89 categorías de personal estatutario fijo.
 *
 * Fuente: para cada categoría, la última convocatoria por turno libre
 * (concurso-oposición) publicada en el Boletín Oficial de Aragón entre 2023 y
 * 2026, localizada con el buscador del BOA y leída del PDF oficial en
 * noviembre de 2026. Los datos de cada ficha están en
 * `scripts/data/fichas-salud.json` (plazas y su desglose de la base 1.1,
 * titulación de la base 2.1.c, tasa de la base 3.2, plazo de la base 3.7,
 * enlace al PDF) y el programa en
 * `scripts/data/temarios-oficiales/<slug>.json` (anexo I, materia común y
 * específica, sin resumir). Lo común a todas las convocatorias (examen,
 * concurso, nota final) está en `SALUD` de `scripts/lib/sembrar-ficha.mjs`.
 *
 * Decisiones y lagunas:
 * - Cuando la última convocatoria acumula plazas de una anterior (p. ej.
 *   Enfermería, Resolución de 2-09-2025, que suma las 418 plazas de la de
 *   10-01-2025), la ficha da el total del proceso único y enlaza las dos.
 * - Quedan fuera los concursos extraordinarios de «puestos de difícil
 *   cobertura» (Decreto-ley 2/2025): son concursos de méritos sin examen ni
 *   temario. También las convocatorias solo de promoción interna.
 * - Varias especialidades médicas tienen como última convocatoria la de
 *   diciembre de 2023 (plazo del 8-01 al 29-02-2024): se muestran así, como
 *   referencia del examen y del temario, con el plazo cerrado.
 * - Ninguna está abierta a 12-11-2026 (la más reciente, Inmunología, se
 *   publicó el 2-10-2026 y su plazo de un mes ya pasó). Las plazas de las
 *   ofertas de 2025 aún no convocadas (Decreto 90/2025 y Decreto 12/2026,
 *   oferta extraordinaria) no se incluyen.
 * - Las bases de Técnico/a de Grado Medio en Prevención de Riesgos Laborales
 *   y de Técnico/a Superior en Higiene Bucodental no dan código de categoría.
 *
 * Uso: node --env-file=.env.local scripts/seed-fichas-salud.mjs [slug ...]
 * Sin argumentos siembra las 89; con slugs, solo esas.
 */
import { readFileSync } from "node:fs";
import { sembrarFicha, SALUD } from "./lib/sembrar-ficha.mjs";

const FICHAS = JSON.parse(readFileSync(new URL("./data/fichas-salud.json", import.meta.url), "utf8"));
const soloEstas = process.argv.slice(2);

for (const { oposicion, convocatoria } of FICHAS) {
  if (soloEstas.length && !soloEstas.includes(oposicion.slug)) continue;
  await sembrarFicha({
    oposicion: { ...oposicion, organismo: SALUD.organismo, organismo_slug: SALUD.organismo_slug },
    convocatoria: {
      ...convocatoria,
      organismo: SALUD.organismo,
      sistema_seleccion: SALUD.sistema_seleccion,
      duracion_maxima_proceso: SALUD.duracion_maxima_proceso,
      orden_actuacion: SALUD.orden_actuacion,
      aspirantes_que_pasan_fase: [],
      ultima_actualizacion: "12 de noviembre de 2026",
      pruebas: SALUD.pruebas,
      estado: "cerrada",
      plazo_fin: null,
    },
  });
}

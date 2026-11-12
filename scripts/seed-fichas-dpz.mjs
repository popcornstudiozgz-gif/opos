/**
 * Fichas (sin material de estudio) de 22 oposiciones de la Diputación
 * Provincial de Zaragoza (DPZ), además de las tres que ya existían
 * (Auxiliar Administrativo, Administrativo y TAG, con sus propios scripts).
 *
 * Fuentes, leídas en noviembre de 2026:
 * - La lista de convocatorias de nuevo ingreso de dpz.es
 *   (https://dpz.es/ciudadanos/empleo-publico/nuevo-ingreso/) y la página de
 *   cada una (plazas, grupo, plazo de instancias, enlaces).
 * - Las bases específicas de cada convocatoria (PDF del BOPZ o del tablón de
 *   la sede electrónica enlazado desde esa página): base 3 (titulación y
 *   otros requisitos), base 4 (tasa), base 5 (ejercicios), base 6 (orden de
 *   actuación) y anexo II (temario, sin resumir). Las de Archivero/a no están
 *   enlazadas en su página y se tomaron del BOPZ núm. 64, de 20-03-2026
 *   (edicto 1711, texto completo del boletín).
 * - Bases generales de la DPZ para el turno libre (decreto 675/2021, BOPZ
 *   núm. 71, de 29-03-2021).
 * Datos en `scripts/data/fichas-dpz-2.json` y
 * `scripts/data/temarios-oficiales/<slug>.json`.
 *
 * Decisiones y lagunas:
 * - Una ficha por categoría. Cuando hay dos procesos de la misma categoría
 *   (Imprenta OEP 2024 y 2025; Oficial 2.ª de Muel OEP 2024 y 2025) la ficha
 *   usa el más reciente y menciona y enlaza el otro. Las convocatorias en
 *   turno reservado a personas con discapacidad de una categoría que también
 *   tiene turno libre (Almacén IFC, Protección y control de edificios) se
 *   citan en la ficha del turno libre; las que solo existen en turno
 *   reservado (Auxiliar de Sala y Depósito, Oficial de Servicios Internos)
 *   tienen ficha propia, indicándolo en el nombre.
 * - Corrector/a (imprenta, OEP 2024) y Corrector/a de Pruebas de la IFC (OEP
 *   2023) son plazas distintas con temario distinto: dos fichas.
 * - Escala de las plazas de funcionario: la de la base 2 de las bases; la
 *   página web de la DPZ trae erratas en tres (Ayudante de Archivo y
 *   Biblioteca, Técnico/a en Seguridad y Salud y Letrado/a).
 * - Letrado/a Asesor/a: la DPZ la declaró desierta (BOPZ 243, de
 *   21-10-2026, según su página; el anuncio es un PDF escaneado). Archivero/a
 *   tiene en su página un anuncio "declarando desierta" y otro posterior de
 *   valoración de la fase de concurso que no se han podido leer (escaneados):
 *   la ficha no dice nada sobre el resultado.
 * - Fuera: las ya resueltas, la de Encargado/a de obra (OEP 2017, por
 *   sentencia judicial) y la de Auxiliar turístico del Consorcio Goya
 *   Fuendetodos (concurso de méritos de 2023, sin examen).
 * - Oficial 1.ª de Almacén tiene el plazo abierto hasta el 11-12-2026
 *   (`plazo_fin`): la home deja de mostrarla sola cuando pase.
 *
 * Uso: node --env-file=.env.local scripts/seed-fichas-dpz.mjs [slug ...]
 */
import { readFileSync } from "node:fs";
import { sembrarFicha } from "./lib/sembrar-ficha.mjs";

const DPZ = { organismo: "Diputación Provincial de Zaragoza", organismo_slug: "dpz" };
const FICHAS = JSON.parse(readFileSync(new URL("./data/fichas-dpz-2.json", import.meta.url), "utf8"));
const soloEstas = process.argv.slice(2);

for (const { oposicion, convocatoria } of FICHAS) {
  if (soloEstas.length && !soloEstas.includes(oposicion.slug)) continue;
  await sembrarFicha({
    oposicion: { ...oposicion, ...DPZ },
    convocatoria: {
      ...convocatoria,
      organismo: DPZ.organismo,
      aspirantes_que_pasan_fase: [],
      ultima_actualizacion: "12 de noviembre de 2026",
    },
  });
}

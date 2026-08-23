/**
 * Índice de estudio — Temas 2 a 20 (todos menos el Tema 1, ver
 * `seed-indice-estudio-tema-1.mjs`).
 *
 * Mismo mecanismo que el Tema 1: un punto por sección oficial del temario
 * (una por cada valor de `tema_oposicion.secciones_incluidas` — NO se
 * documentan aquí secciones del tema canónico que esta oposición no pide,
 * para no tener que mantener dos fuentes de verdad; ver el comentario de
 * `mapTemaDeOposicion` en `src/lib/oposiciones.ts`, que igualmente
 * recortaría por `secciones_incluidas` aunque se documentaran de más).
 *
 * Los rangos de artículos NO son de memoria: se sacaron con `grep -oE
 * '^Artículo [0-9]+'` sobre el fichero de `content-raw/` correspondiente a
 * cada sección (mismo método que en el Tema 1), y en los casos ambiguos
 * (una `seccion` que no coincide 1:1 con un fichero) se contrastó contra
 * los artículos citados en `scripts/seed-preguntas-tema-N.mjs`.
 *
 * Fuentes sin artículo enlazable:
 * - Disposiciones adicionales de la LCSP (tema-9): el BOE solo ancla el
 *   inicio de la sección de disposiciones adicionales (`#da`), no cada
 *   disposición por número — se enlaza ahí, con el número de disposición
 *   en el texto (`articulos`) para que se busque a mano dentro de la
 *   sección.
 * - Reglamento de Participación Ciudadana y Manual de Atención a la
 *   Ciudadanía (tema-15), Plan de Igualdad de Zaragoza (tema-2): no son
 *   textos BOE, no tienen anclas por artículo — enlace a todo el
 *   documento, sin `articulos`.
 * - "Concepto de ordenanza/reglamento" (tema-16): pregunta doctrinal, no
 *   atada a un artículo concreto — enlace a la LBRL sin ancla.
 *
 * Uso: node --env-file=.env.local scripts/seed-indice-estudio-resto.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

// IDs de norma en el BOE (o BOA, servido también desde boe.es/buscar/act.php)
const LOIEMH = "BOE-A-2007-6115";
const LEY4_ARAGON = "BOE-A-2007-11593";
const ESTATUTO_ARAGON = "BOE-A-2007-8444";
const L39_2015 = "BOE-A-2015-10565";
const LCSP = "BOE-A-2017-12902";
const RBEL = "BOE-A-1986-17958";
const RSCL = "BOE-A-1955-10057";
const LBRL = "BOE-A-1985-5392";
const LHL = "BOE-A-2004-4214";
const LEY_CAPITALIDAD = "BOE-A-2018-1683";
const TREBEP = "BOE-A-2015-11719";
const LEY_URBANISMO_ARAGON = "BOA-d-2014-90410";

// Fuentes sin ancla por artículo (no son BOE)
const PLAN_IGUALDAD_ZGZ = "https://www.zaragoza.es/cont/paginas/catalogopublicaciones/doc/12293.pdf";
const REGLAMENTO_PARTICIPACION = "https://www.zaragoza.es/sede/servicio/normativa/109";
const MANUAL_ATENCION = "https://www.zaragoza.es/cont/paginas/gestionmunicipal/calidad/pdf/Manual-atencion-ciudadania.pdf";

const boe = (id, articulo) => `https://www.boe.es/buscar/act.php?id=${id}${articulo ? `#a${articulo}` : ""}`;

/** Punto de estudio con rango de artículos (o un único artículo si primero === ultimo). */
const art = (seccion, titulo, id, primero, ultimo) => ({
  seccion,
  titulo,
  articulos: primero == null ? undefined : primero === ultimo ? `art. ${primero}` : `arts. ${primero}-${ultimo}`,
  url: boe(id, primero),
});

/** Punto que solo llega a una disposición adicional (el BOE no ancla por número de disposición). */
const dispAdicional = (seccion, titulo, id, ordinal) => ({
  seccion,
  titulo,
  articulos: `Disp. adicional ${ordinal}`,
  url: boe(id, "da"),
});

/** Punto sin artículo/ancla concreto: enlaza al documento entero. */
const doc = (seccion, titulo, url) => ({ seccion, titulo, url });

const INDICES = {
  "tema-2": [
    art("loiemh-titulo-1", "LO 3/2007, Título I: el principio de igualdad y la tutela contra la discriminación", LOIEMH, 3, 13),
    art("ley4-cap-1-disposiciones-generales", "Ley 4/2007 de Aragón, Cap. I: disposiciones generales", LEY4_ARAGON, 1, 4),
    art("ley4-cap-4-proteccion-apoyo-victimas", "Ley 4/2007 de Aragón, Cap. IV: medidas de protección y apoyo a las víctimas", LEY4_ARAGON, 18, 31),
    doc("plan-igualdad-zaragoza", "Plan de Igualdad para empleadas y empleados del Ayuntamiento de Zaragoza", PLAN_IGUALDAD_ZGZ),
  ],
  "tema-3": [
    art("titulo-preliminar", "Título Preliminar", ESTATUTO_ARAGON, 1, 10),
    art("titulo-2-cap-1", "Título II, Cap. I: Las Cortes de Aragón", ESTATUTO_ARAGON, 32, 45),
    art("titulo-2-cap-2", "Título II, Cap. II: El Presidente", ESTATUTO_ARAGON, 46, 52),
    art("titulo-2-cap-3", "Título II, Cap. III: El Gobierno de Aragón (DGA)", ESTATUTO_ARAGON, 53, 58),
    art("titulo-5", "Título V: las competencias de la Comunidad Autónoma", ESTATUTO_ARAGON, 70, 80),
  ],
  "tema-4": [
    art("titulo-1-cap-1", "Título I, Cap. I: capacidad de obrar y concepto de interesado", L39_2015, 3, 8),
  ],
  "tema-5": [
    art("titulo-2-cap-1", "Título II, Cap. I: normas generales de actuación", L39_2015, 13, 28),
    art("titulo-2-cap-2", "Título II, Cap. II: términos y plazos", L39_2015, 29, 33),
  ],
  "tema-6": [
    art("titulo-3-cap-1", "Título III, Cap. I: requisitos de los actos administrativos", L39_2015, 34, 36),
    art("titulo-3-cap-2", "Título III, Cap. II: eficacia de los actos", L39_2015, 37, 46),
    art("titulo-3-cap-3", "Título III, Cap. III: nulidad y anulabilidad", L39_2015, 47, 52),
  ],
  "tema-7": [
    art("titulo-4-cap-1", "Título IV, Cap. I: garantías del procedimiento", L39_2015, 53, 53),
    art("titulo-4-cap-2", "Título IV, Cap. II: iniciación del procedimiento", L39_2015, 54, 69),
    art("titulo-4-cap-3", "Título IV, Cap. III: ordenación del procedimiento", L39_2015, 70, 74),
    art("titulo-4-cap-4", "Título IV, Cap. IV: instrucción del procedimiento", L39_2015, 75, 83),
    art("titulo-4-cap-5", "Título IV, Cap. V: finalización del procedimiento", L39_2015, 84, 95),
  ],
  "tema-8": [
    art("titulo-5-cap-1", "Título V, Cap. I: revisión de oficio", L39_2015, 106, 111),
    art("titulo-5-cap-2", "Título V, Cap. II: recursos administrativos", L39_2015, 112, 126),
  ],
  "tema-9": [
    art("tipos-contractuales", "Delimitación de los tipos contractuales", LCSP, 231, 315),
    dispAdicional("competencias-entidades-locales", "Competencias en materia de contratación en las Entidades Locales", LCSP, "2ª"),
    dispAdicional("normas-especificas-locales", "Normas específicas de contratación pública en las Entidades Locales", LCSP, "3ª"),
  ],
  "tema-10": [
    art("cap-1-clasificacion", "Cap. I: concepto y clasificación de los bienes", RBEL, 1, 8),
    art("cap-3-conservacion", "Cap. III, Secc. 1ª-2ª: inventario, registro y administración de los bienes", RBEL, 17, 36),
    art("cap-3-defensa", "Cap. III, Secc. 3ª: prerrogativas de las Entidades locales sobre sus bienes (defensa)", RBEL, 44, 73),
  ],
  "tema-11": [
    art("formas-actividad", "Las formas de actividad administrativa local (LBRL, art. 25)", LBRL, 25, 28),
    art("servicio-publico-concepto", "El concepto de servicio público local (RSCL)", RSCL, 30, 36),
    art("gestion-directa", "La gestión directa de los servicios (RSCL)", RSCL, 41, 101),
    art("gestion-indirecta", "La gestión indirecta de los servicios (RSCL)", RSCL, 113, 147),
  ],
  "tema-12": [
    art("impuestos-enumeracion", "Enumeración de los impuestos municipales", LHL, 56, 56),
    art("tasas", "Las tasas", LHL, 57, 57),
    art("contribuciones-especiales", "Las contribuciones especiales", LHL, 58, 58),
    art("precios-publicos", "Los precios públicos", LHL, 127, 127),
    art("ibi", "El Impuesto sobre Bienes Inmuebles (IBI)", LHL, 60, 77),
    art("iae", "El Impuesto sobre Actividades Económicas (IAE)", LHL, 78, 91),
    art("ivtm", "El Impuesto sobre Vehículos de Tracción Mecánica (IVTM)", LHL, 92, 99),
    art("icio", "El Impuesto sobre Construcciones, Instalaciones y Obras (ICIO)", LHL, 100, 103),
    art("iivtnu", "El Impuesto sobre el Incremento de Valor de los Terrenos (IIVTNU, plusvalía)", LHL, 104, 110),
  ],
  "tema-13": [
    art("presupuesto-contenido", "Contenido, estructura y aprobación del presupuesto", LHL, 162, 171),
    art("presupuesto-creditos", "Los créditos y sus modificaciones", LHL, 172, 182),
    art("presupuesto-ejecucion", "Ejecución y liquidación del presupuesto", LHL, 183, 193),
    art("capitalidad-zaragoza", "La aprobación del presupuesto municipal en la Ley de Capitalidad de Zaragoza", LEY_CAPITALIDAD, 54, 60),
  ],
  "tema-14": [
    art("municipio-territorio-poblacion", "El municipio: territorio y población", LBRL, 11, 18),
    art("servicios-minimos", "Servicios mínimos obligatorios", LBRL, 26, 26),
    art("municipios-gran-poblacion", "Régimen de organización de los municipios de gran población", LBRL, 121, 138),
    art("capitalidad-zaragoza-general", "Ley de régimen especial de Zaragoza: disposiciones generales", LEY_CAPITALIDAD, 1, 6),
  ],
  // Reglamento de Participación y Manual de Atención: no son textos BOE, sin ancla por artículo.
  "tema-15": [
    doc("participacion-general", "Disposiciones generales del Reglamento de Participación Ciudadana", REGLAMENTO_PARTICIPACION),
    doc("informacion-municipal", "La información municipal", REGLAMENTO_PARTICIPACION),
    doc("instrumentos-participacion", "Los instrumentos de participación ciudadana", REGLAMENTO_PARTICIPACION),
    doc("consejos-distrito", "Los Consejos de Distrito", REGLAMENTO_PARTICIPACION),
    doc("calidad-atencion", "La calidad en los servicios de atención (Manual de Atención a la Ciudadanía)", MANUAL_ATENCION),
    doc("comunicacion-atencion", "La comunicación en la atención al público (Manual de Atención a la Ciudadanía)", MANUAL_ATENCION),
  ],
  "tema-16": [
    doc("concepto", "Concepto de ordenanza y de reglamento municipal", boe(LBRL)),
    art("procedimiento-general", "Procedimiento de aprobación de las ordenanzas", LBRL, 49, 49),
    art("capitalidad-ordenanzas", "La aprobación de ordenanzas, ordenanzas fiscales y reglamentos en la Ley de Capitalidad de Zaragoza", LEY_CAPITALIDAD, 48, 51),
  ],
  "tema-17": [
    art("clases-personal", "Clases de personal", TREBEP, 8, 12),
    art("derechos", "Derechos de los empleados públicos", TREBEP, 14, 15),
    art("deberes-codigo-conducta", "Deberes y código de conducta", TREBEP, 52, 54),
  ],
  "tema-18": [
    art("adquisicion-servicio", "Acceso al empleo público (adquisición de la relación de servicio)", TREBEP, 55, 62),
    art("perdida-servicio", "Pérdida de la relación de servicio", TREBEP, 63, 68),
    art("situaciones-administrativas", "Situaciones administrativas", TREBEP, 85, 92),
    art("regimen-disciplinario", "Régimen disciplinario", TREBEP, 93, 98),
  ],
  "tema-19": [
    art("planificacion-rrhh", "Planificación de recursos humanos", TREBEP, 69, 71),
    art("estructuracion-empleo", "Estructuración del empleo público", TREBEP, 72, 77),
    art("provision-movilidad", "Provisión de puestos y movilidad", TREBEP, 78, 84),
  ],
  "tema-23": [
    art("titulo-preliminar", "Título Preliminar", LEY_URBANISMO_ARAGON, 1, 9),
    art("regimen-suelo", "Título I: régimen urbanístico del suelo", LEY_URBANISMO_ARAGON, 10, 37),
    art("planeamiento", "Título II: planeamiento urbanístico", LEY_URBANISMO_ARAGON, 38, 88),
    art("gestion-urbanistica", "Título IV: gestión urbanística", LEY_URBANISMO_ARAGON, 118, 213),
    art("edificacion-uso", "Título V: edificación y uso del suelo", LEY_URBANISMO_ARAGON, 214, 263),
    art("disciplina-urbanistica", "Título VI: disciplina urbanística", LEY_URBANISMO_ARAGON, 264, 287),
  ],
};

async function main() {
  for (const [temaSlug, indiceEstudio] of Object.entries(INDICES)) {
    const res = await fetch(`${URL_BASE}/rest/v1/temas?slug=eq.${temaSlug}`, {
      method: "PATCH",
      headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ indice_estudio: indiceEstudio }),
    });
    if (!res.ok) {
      console.error(`❌ ${temaSlug}: ${res.status} ${await res.text()}`);
      process.exit(1);
    }
    const [row] = await res.json();
    if (!row) {
      console.error(`❌ ${temaSlug}: no existe en la tabla temas`);
      process.exit(1);
    }
    console.log(`✅ ${temaSlug}: ${row.indice_estudio.length} puntos`);
  }
}

main();

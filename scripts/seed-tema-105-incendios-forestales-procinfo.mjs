/**
 * Crea tema-105: "Incendios forestales: PROCINFO y protección civil" —
 * Tema 20 (numero=20, bloque-2) de Oficial Agente Inspector (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 18 oficial del Anexo I (bases2110.pdf):
 *   "Incendios forestales. Tipos de incendios forestales, partes de un
 *   incendio y factores que influyen en la propagación del fuego.
 *   Prevención. Estadísticas y causalidad. La investigación de las
 *   causas de los incendios forestales. La seguridad del personal y las
 *   comunicaciones. El PROCINFO. Normativa de aplicación. Planes
 *   municipales de Protección Civil. Incendios forestales. Inundaciones.
 *   Nevadas. Delitos contra el medio ambiente. Elaboración de atestados.
 *   Elaboración de informes, actas, y denuncias."
 *
 * Fuentes primarias verificadas en este turno:
 * - PROCINFO: Plan Especial de Protección Civil de Emergencias por
 *   Incendios Forestales de Aragón, aprobado por el Decreto 167/2018, de
 *   9 de octubre, del Gobierno de Aragón, desarrollado en su momento al
 *   amparo de la Ley 30/2002, de Protección Civil y Atención de
 *   Emergencias de Aragón, y de la Directriz Básica estatal (RD
 *   893/2013, de 15 de noviembre).
 * - IMPORTANTE: la Ley 30/2002 aragonesa fue DEROGADA con efectos de 12
 *   de julio de 2024 por la Ley 4/2024, de 28 de junio, del Sistema de
 *   Protección Civil y Gestión de Emergencias de Aragón
 *   (BOE-A-2024-15350), actualmente vigente. Se señala expresamente esta
 *   sustitución normativa para no presentar como vigente una ley
 *   derogada.
 * - Delitos contra el medio ambiente: arts. 352 (incendio forestal
 *   doloso), 353 (agravantes) y 351 (peligro para personas) del Código
 *   Penal — el delito de incendio forestal se apoya en la definición
 *   técnica de "incendio forestal" de la Ley 43/2003 de Montes (ya
 *   verificada en tema-103).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-105-incendios-forestales-procinfo.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-105";
const OPOSICION = "oficial-agente-inspector-ayto-zaragoza";
const BLOQUE_2_ID = "b74ad422-4965-469e-9b9c-ef1a39c26d76";
const LEY_4_2024 = "https://www.boe.es/buscar/doc.php?id=BOE-A-2024-15350";
const RD_893_2013 = "https://www.boe.es/buscar/doc.php?id=BOE-A-2013-12823";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, { method: "POST", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, { method: "POST", headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) => preguntas[i].opciones.map((texto, orden) => ({ pregunta_id: pregunta.id, texto, es_correcta: orden === preguntas[i].correcta, orden })));
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [{
  slug: TEMA,
  titulo: "Incendios forestales: PROCINFO y protección civil",
  descripcion: "Tipos y partes de un incendio forestal. Prevención, causalidad e investigación. El PROCINFO. Planes municipales de Protección Civil. Delitos contra el medio ambiente. Atestados e informes.",
  contenido: "Desarrolla los tipos de incendios forestales y los factores que influyen en su propagación, la prevención y la investigación de causas, el PROCINFO (Plan Especial de Protección Civil de Emergencias por Incendios Forestales de Aragón) y su marco normativo actualizado (Ley 4/2024), los planes municipales de Protección Civil, los delitos contra el medio ambiente relacionados con incendios forestales, y la elaboración de informes, actas y denuncias.",
  enlaces_boe: [
    { url: LEY_4_2024, titulo: "Ley 4/2024 — Sistema de Protección Civil y Gestión de Emergencias de Aragón (vigente)" },
    { url: RD_893_2013, titulo: "RD 893/2013 — Directriz básica de planificación de emergencia por incendios forestales" },
  ],
  indice_estudio: [
    { url: "", titulo: "Tipos de incendio forestal, propagación y causalidad", seccion: "tipos-incendio-forestal-propagacion-causalidad", articulos: "Conceptos fundamentales" },
    { url: RD_893_2013, titulo: "El PROCINFO y su marco normativo", seccion: "procinfo-marco-normativo", articulos: "Decreto 167/2018 (Aragón), RD 893/2013 y Ley 4/2024" },
    { url: "", titulo: "Delitos contra el medio ambiente y elaboración de atestados", seccion: "delitos-medio-ambiente-atestados", articulos: "Arts. 351-353 del Código Penal" },
  ],
}]);

const S1 = "tipos-incendio-forestal-propagacion-causalidad";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué tipos de incendio forestal existen según la parte de la vegetación que arde?", reverso: "Incendio de superficie (arde el matorral, pasto y hojarasca), incendio de copas (arde el dosel arbóreo, el más virulento y rápido) e incendio subterráneo (arde la materia orgánica del suelo, muy lento y persistente)" },
  { anverso: "¿Qué partes se distinguen en un incendio forestal según su forma de avance?", reverso: "El frente o cabeza (la zona de avance más rápido, a favor del viento y la pendiente), los flancos (los bordes laterales) y la cola (la zona de avance más lento, a menudo la parte de origen del fuego)" },
  { anverso: "¿Qué tres factores principales influyen en la propagación de un incendio forestal?", reverso: "El combustible disponible (tipo, cantidad y humedad de la vegetación), la topografía (pendiente y orientación del terreno) y las condiciones meteorológicas (viento, temperatura, humedad relativa)" },
  { anverso: "¿Por qué la pendiente del terreno acelera la propagación de un incendio hacia arriba?", reverso: "Porque el aire caliente y las llamas ascienden precalentando el combustible situado ladera arriba, favoreciendo su ignición más rápida que en terreno llano" },
  { anverso: "¿Qué son las causas naturales de un incendio forestal y qué proporción suelen representar en España?", reverso: "Causas no derivadas de la acción humana, principalmente los rayos; en España representan una proporción minoritaria del total de incendios forestales, siendo la inmensa mayoría de causa humana (intencionada o negligente)" },
  { anverso: "¿Qué es la investigación de las causas de un incendio forestal?", reverso: "El proceso técnico que analiza el punto de origen, los indicios físicos y las circunstancias del incendio para determinar su causa (natural, negligente o intencionada), con relevancia tanto preventiva como para eventuales responsabilidades legales" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué tipo de incendio forestal es el más virulento y rápido?", explicacion: "El incendio de copas, que arde el dosel arbóreo.", dificultad: "media", opciones: ["El incendio de copas", "El incendio subterráneo", "El incendio de superficie", "Todos son igual de rápidos"], correcta: 0 },
  { enunciado: "¿Qué es el frente o cabeza de un incendio forestal?", explicacion: "La zona de avance más rápido, a favor del viento y la pendiente.", dificultad: "media", opciones: ["La zona de avance más rápido", "El punto exacto de origen del fuego", "La zona de menor temperatura", "El límite administrativo del monte"], correcta: 0 },
  { enunciado: "¿Qué tres factores principales influyen en la propagación de un incendio forestal?", explicacion: "Combustible, topografía y condiciones meteorológicas.", dificultad: "media", opciones: ["Combustible, topografía y meteorología", "Solo la temperatura ambiente", "Solo el tipo de vegetación", "Solo la presencia de fauna"], correcta: 0 },
  { enunciado: "¿Por qué la pendiente acelera la propagación de un incendio hacia arriba?", explicacion: "El aire caliente precalienta el combustible ladera arriba.", dificultad: "media", opciones: ["Precalienta el combustible ladera arriba", "Reduce la temperatura del fuego", "No influye en la velocidad de propagación", "Solo afecta a incendios subterráneos"], correcta: 0 },
  { enunciado: "¿Qué proporción de los incendios forestales en España tiene causa humana?", explicacion: "La inmensa mayoría, frente a una proporción minoritaria de causas naturales (rayos).", dificultad: "media", opciones: ["La inmensa mayoría", "Una proporción minoritaria", "Ninguno tiene causa humana", "Exactamente la mitad"], correcta: 0 },
  { enunciado: "¿Qué es la investigación de las causas de un incendio forestal?", explicacion: "El análisis técnico del origen e indicios para determinar su causa.", dificultad: "media", opciones: ["El análisis técnico para determinar la causa", "La extinción material del incendio", "Un tipo de plan de prevención", "Un sinónimo de repoblación forestal"], correcta: 0 },
]);

const S2 = "procinfo-marco-normativo";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el PROCINFO?", reverso: "El Plan Especial de Protección Civil de Emergencias por Incendios Forestales de Aragón, que establece la organización jerárquica y funcional, y los procedimientos de actuación de los recursos y servicios ante emergencias por incendio forestal en el territorio aragonés" },
  { anverso: "¿Qué norma aprobó el PROCINFO y cuándo?", reverso: "El Decreto 167/2018, de 9 de octubre, del Gobierno de Aragón" },
  { anverso: "¿Qué norma estatal marca los requisitos mínimos que deben cumplir los planes de emergencia por incendios forestales como el PROCINFO?", reverso: "El Real Decreto 893/2013, de 15 de noviembre, por el que se aprueba la Directriz básica de planificación de protección civil de emergencia por incendios forestales" },
  { anverso: "¿Bajo qué ley autonómica de protección civil se desarrolló originalmente el PROCINFO, y sigue vigente esa ley?", reverso: "Se desarrolló al amparo de la Ley 30/2002, de Protección Civil y Atención de Emergencias de Aragón; esa ley fue DEROGADA con efectos de 12 de julio de 2024 y sustituida por la Ley 4/2024, de 28 de junio, del Sistema de Protección Civil y Gestión de Emergencias de Aragón, actualmente vigente" },
  { anverso: "¿Qué son los planes municipales de Protección Civil en relación con el PROCINFO?", reverso: "Instrumentos de planificación de ámbito local que se integran y coordinan con el plan autonómico (PROCINFO) para la gestión de emergencias por incendio forestal, así como otras emergencias, en el término municipal correspondiente" },
  { anverso: "¿Qué otras emergencias, además de incendios forestales, contempla el marco de protección civil citado por el temario oficial de esta plaza?", reverso: "Inundaciones y nevadas, entre otras emergencias que pueden requerir la activación de planes de protección civil de ámbito municipal o autonómico" },
  { anverso: "¿Por qué es relevante la seguridad del personal y las comunicaciones dentro de un plan como el PROCINFO?", reverso: "Porque las emergencias por incendio forestal implican riesgo directo para el personal interviniente, y una coordinación de comunicaciones eficaz es esencial para la seguridad y la eficacia de la respuesta conjunta de los distintos servicios" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el PROCINFO?", explicacion: "El Plan Especial de Protección Civil de Emergencias por Incendios Forestales de Aragón.", dificultad: "media", opciones: ["El plan aragonés de emergencias por incendios forestales", "Un catálogo de especies amenazadas", "Un tipo de licencia ambiental municipal", "Un plan de aprovechamiento cinegético"], correcta: 0 },
  { enunciado: "¿Qué norma aprobó el PROCINFO?", explicacion: "El Decreto 167/2018, de 9 de octubre.", dificultad: "media", opciones: ["El Decreto 167/2018", "El Decreto 129/2022", "La Ley 4/2024", "El RD 893/2013"], correcta: 0 },
  { enunciado: "¿Qué norma estatal marca los requisitos mínimos de planes como el PROCINFO?", explicacion: "El Real Decreto 893/2013.", dificultad: "media", opciones: ["El Real Decreto 893/2013", "La Ley 43/2003 de Montes", "La Ley 4/2024 de Aragón", "El Decreto 167/2018"], correcta: 0 },
  { enunciado: "¿Sigue vigente la Ley 30/2002 de Protección Civil de Aragón, bajo la que se desarrolló el PROCINFO?", explicacion: "No, fue derogada y sustituida por la Ley 4/2024, de 28 de junio.", dificultad: "media", opciones: ["No, fue sustituida por la Ley 4/2024", "Sí, sigue plenamente vigente sin cambios", "Sí, pero solo para incendios forestales", "No, fue sustituida por el RD 893/2013"], correcta: 0 },
  { enunciado: "¿Qué función cumplen los planes municipales de Protección Civil respecto al PROCINFO?", explicacion: "Se integran y coordinan con el plan autonómico en la gestión de emergencias.", dificultad: "media", opciones: ["Se integran y coordinan con el plan autonómico", "Sustituyen por completo al PROCINFO", "No tienen ninguna relación con él", "Solo aplican a inundaciones, no a incendios"], correcta: 0 },
  { enunciado: "¿Qué otras emergencias, además de incendios forestales, cita el temario oficial de esta plaza?", explicacion: "Inundaciones y nevadas.", dificultad: "media", opciones: ["Inundaciones y nevadas", "Solo terremotos", "Solo accidentes de tráfico", "Ninguna otra emergencia se contempla"], correcta: 0 },
]);

const S3 = "delitos-medio-ambiente-atestados";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué artículo del Código Penal regula el delito básico de incendio forestal?", reverso: "El artículo 352, que castiga a quienes incendiaren montes o masas forestales, con pena de prisión de uno a cinco años y multa de doce a dieciocho meses" },
  { anverso: "¿De dónde toma el Código Penal la definición técnica de 'incendio forestal' para aplicar el artículo 352?", reverso: "De la Ley 43/2003, de Montes, que lo define como el fuego que se propaga sin control sobre combustibles forestales situados en el monte" },
  { anverso: "¿Qué agravante contempla el artículo 353 del Código Penal para el delito de incendio forestal?", reverso: "Una pena agravada (prisión de 3 a 6 años y multa de 18 a 24 meses) cuando concurren circunstancias de especial gravedad, como que el incendio afecte a una superficie de considerable importancia" },
  { anverso: "¿Qué ocurre si un incendio forestal genera peligro para la vida o integridad física de las personas, según el Código Penal?", reverso: "Se aplica una penalidad agravada conforme al artículo 351 (delito de incendio con peligro para las personas), pudiendo alcanzar penas de mayor gravedad que el tipo básico del artículo 352" },
  { anverso: "¿Qué es un atestado en el contexto de una actuación de un agente inspector municipal?", reverso: "El documento en el que un agente con funciones de policía administrativa o judicial deja constancia formal de los hechos observados, las diligencias practicadas y los indicios recabados en relación con una posible infracción o delito" },
  { anverso: "¿Qué diferencia hay entre un informe, un acta y una denuncia elaborados por un agente inspector?", reverso: "El informe es un documento técnico descriptivo de una situación o hecho observado; el acta certifica formalmente la constatación de un hecho concreto (por ejemplo, una inspección); la denuncia pone en conocimiento de la autoridad competente unos hechos que pudieran ser constitutivos de infracción o delito" },
  { anverso: "¿Por qué es importante la precisión y objetividad al redactar un informe, acta o denuncia relacionada con una posible infracción medioambiental?", reverso: "Porque estos documentos pueden servir de base para un procedimiento sancionador administrativo o para una investigación penal, y su falta de rigor puede comprometer su validez como prueba" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué artículo del Código Penal regula el delito básico de incendio forestal?", explicacion: "El artículo 352.", dificultad: "media", opciones: ["El artículo 352", "El artículo 325", "El artículo 620", "El artículo 138"], correcta: 0 },
  { enunciado: "¿De qué norma toma el Código Penal la definición técnica de incendio forestal?", explicacion: "De la Ley 43/2003, de Montes.", dificultad: "dificil", opciones: ["De la Ley 43/2003 de Montes", "De la Ley 4/2024 de Aragón", "Del RD 893/2013", "De la Ley 42/2007"], correcta: 0 },
  { enunciado: "¿Qué agravante contempla el artículo 353 del Código Penal?", explicacion: "Pena agravada cuando el incendio afecta a una superficie de considerable importancia.", dificultad: "dificil", opciones: ["Pena agravada por superficie de considerable importancia", "Solo se aplica a incendios subterráneos", "Elimina la responsabilidad penal", "Solo aplica a incendios de origen natural"], correcta: 0 },
  { enunciado: "¿Qué ocurre si un incendio forestal pone en peligro la vida de las personas?", explicacion: "Se aplica una penalidad agravada conforme al art. 351 del Código Penal.", dificultad: "media", opciones: ["Se aplica una penalidad agravada (art. 351)", "No tiene ninguna consecuencia penal adicional", "Solo se aplica una sanción administrativa", "Se aplica el mismo tipo básico sin agravar"], correcta: 0 },
  { enunciado: "¿Qué es un atestado en la actuación de un agente inspector?", explicacion: "El documento que deja constancia formal de hechos, diligencias e indicios recabados.", dificultad: "media", opciones: ["El documento con hechos, diligencias e indicios", "Un tipo de licencia ambiental", "Un plan de gestión cinegética", "Un plan de protección civil municipal"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre un informe, un acta y una denuncia?", explicacion: "El informe describe técnicamente; el acta certifica un hecho concreto; la denuncia pone hechos en conocimiento de la autoridad.", dificultad: "media", opciones: ["Describir, certificar y poner en conocimiento de autoridad", "Son términos exactamente sinónimos", "Solo la denuncia tiene validez legal", "El acta siempre sustituye a la denuncia"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 20 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 20, orden: 20, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-105 creado y vinculado como Tema 20 de Oficial Agente Inspector.");

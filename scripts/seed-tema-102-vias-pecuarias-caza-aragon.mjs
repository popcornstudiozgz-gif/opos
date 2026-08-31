/**
 * Crea tema-102: "Vías pecuarias y caza en Aragón" — Tema 17 (numero=17,
 * bloque-2) de Oficial Agente Inspector (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 15 oficial del Anexo I (bases2110.pdf):
 *   "Conocimiento de la Ley de vías pecuarias de Aragón. Concepto,
 *   naturaleza jurídica y tipos. Competencias y ejercicio de potestades
 *   de las Entidades Locales. Clasificación, deslinde, amojonamiento y
 *   señalización. Vías pecuarias del término municipal de Zaragoza. Ley
 *   de Caza de Aragón y normativa autonómica vigente de desarrollo.
 *   Requisitos para el ejercicio de la caza; licencias, permisos y
 *   seguros. Especies de caza. Modalidades de caza. Clasificación de los
 *   terrenos a los efectos de la caza. La planificación cinegética. La
 *   protección y conservación de las especies de caza. Gestión de
 *   hábitats cinegéticos. Actividades de mejora, repoblaciones
 *   cinegéticas, acondicionamiento de hábitats y control de daños. La
 *   responsabilidad por daños. Infracciones y sanciones. Gestión de la
 *   caza en el Ayuntamiento de Zaragoza. Legislación apícola y otras
 *   legislaciones en el medio rural."
 *
 * Fuentes primarias verificadas en este turno:
 * - Ley 10/2005, de 11 de noviembre, de vías pecuarias de Aragón
 *   (BOE-A-2005-20235).
 * - Ley 1/2015, de 12 de marzo, de Caza de Aragón (BOE-A-2015-5291) —
 *   norma VIGENTE, que sustituyó a la anterior Ley 5/2002, de 4 de
 *   abril, de Caza de Aragón (ya derogada).
 * Las vías pecuarias concretas del término municipal de Zaragoza y los
 * datos de gestión cinegética municipal específicos no se detallan con
 * cifras o denominaciones no verificadas en esta sesión; la legislación
 * apícola se trata de forma genérica (competencia sectorial ganadera,
 * sin identificar aquí una norma aragonesa específica no verificada).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-102-vias-pecuarias-caza-aragon.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-102";
const OPOSICION = "oficial-agente-inspector-ayto-zaragoza";
const BLOQUE_2_ID = "b74ad422-4965-469e-9b9c-ef1a39c26d76";
const LEY_VIAS_PECUARIAS = "https://www.boe.es/buscar/act.php?id=BOE-A-2005-20235";
const LEY_CAZA_ARAGON = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-5291";

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
  titulo: "Vías pecuarias y caza en Aragón",
  descripcion: "Ley de Vías Pecuarias de Aragón: concepto, clasificación y deslinde. Ley de Caza de Aragón: licencias, modalidades, planificación cinegética, infracciones y sanciones.",
  contenido: "Desarrolla la Ley 10/2005 de vías pecuarias de Aragón (concepto, naturaleza jurídica, clasificación, deslinde y amojonamiento, competencias de las Entidades Locales) y la Ley 1/2015 de Caza de Aragón, vigente (requisitos, licencias, modalidades de caza, clasificación de terrenos, planificación cinegética, gestión de hábitats, responsabilidad por daños e infracciones).",
  enlaces_boe: [
    { url: LEY_VIAS_PECUARIAS, titulo: "Ley 10/2005 — Vías pecuarias de Aragón" },
    { url: LEY_CAZA_ARAGON, titulo: "Ley 1/2015 — Caza de Aragón (vigente)" },
  ],
  indice_estudio: [
    { url: LEY_VIAS_PECUARIAS, titulo: "Vías pecuarias: concepto, clasificación, deslinde y competencias locales", seccion: "vias-pecuarias-concepto-clasificacion-deslinde", articulos: "Ley 10/2005" },
    { url: LEY_CAZA_ARAGON, titulo: "Caza de Aragón: licencias, modalidades y clasificación de terrenos", seccion: "caza-aragon-licencias-modalidades-terrenos", articulos: "Ley 1/2015" },
    { url: LEY_CAZA_ARAGON, titulo: "Planificación cinegética, daños e infracciones", seccion: "planificacion-cinegetica-danos-infracciones", articulos: "Ley 1/2015" },
  ],
}]);

const S1 = "vias-pecuarias-concepto-clasificacion-deslinde";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma regula las vías pecuarias en Aragón?", reverso: "La Ley 10/2005, de 11 de noviembre, de vías pecuarias de Aragón" },
  { anverso: "¿Qué es una vía pecuaria según su concepto legal?", reverso: "Un bien de dominio público de la Comunidad Autónoma, destinado tradicionalmente al tránsito del ganado, que también puede usarse para otros fines compatibles como el tránsito peatonal, el uso ganadero, recreativo o ambiental" },
  { anverso: "¿Qué naturaleza jurídica tienen las vías pecuarias?", reverso: "Son bienes de dominio público, y por tanto inalienables, imprescriptibles e inembargables, al igual que otros bienes demaniales" },
  { anverso: "¿Qué tipos de vías pecuarias clasifica la normativa según su anchura?", reverso: "Cañadas (las de mayor anchura), cordeles (anchura intermedia) y veredas (las de menor anchura), además de otras denominaciones locales como coladas o azagadores" },
  { anverso: "¿Qué es la clasificación de una vía pecuaria?", reverso: "El acto administrativo por el que se determina la existencia, denominación, anchura, trazado y demás características físicas de cada vía pecuaria de un término municipal" },
  { anverso: "¿Qué es el deslinde de una vía pecuaria?", reverso: "El procedimiento administrativo por el que se definen los límites exactos de la vía pecuaria sobre el terreno, de acuerdo con las características establecidas en su clasificación" },
  { anverso: "¿Qué es el amojonamiento de una vía pecuaria?", reverso: "La operación material posterior al deslinde que materializa físicamente sobre el terreno, mediante hitos o mojones, los límites de la vía pecuaria ya deslindada" },
  { anverso: "¿Qué competencias pueden ejercer las Entidades Locales sobre las vías pecuarias de su término municipal, conforme a la Ley 10/2005?", reverso: "Colaborar en la vigilancia y protección de las vías pecuarias, informar sobre proyectos que las afecten, y ejercer las potestades de tutela y policía sobre su uso conforme a lo previsto en la ley" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué norma regula las vías pecuarias en Aragón?", explicacion: "La Ley 10/2005, de 11 de noviembre.", dificultad: "media", opciones: ["La Ley 10/2005", "La Ley 1/2015", "El RD 1372/1986", "La Ley 42/2007"], correcta: 0 },
  { enunciado: "¿Qué naturaleza jurídica tienen las vías pecuarias?", explicacion: "Son bienes de dominio público: inalienables, imprescriptibles e inembargables.", dificultad: "media", opciones: ["Bienes de dominio público", "Bienes patrimoniales libremente enajenables", "Bienes de titularidad privada", "Bienes comunales exclusivamente ganaderos"], correcta: 0 },
  { enunciado: "¿Qué tipos de vías pecuarias se clasifican según su anchura?", explicacion: "Cañadas, cordeles y veredas.", dificultad: "media", opciones: ["Cañadas, cordeles y veredas", "Autovías, carreteras y caminos", "Sendas, rutas y pistas forestales", "Solo cañadas, sin otras categorías"], correcta: 0 },
  { enunciado: "¿Qué es la clasificación de una vía pecuaria?", explicacion: "El acto que determina existencia, denominación, anchura y trazado de la vía.", dificultad: "media", opciones: ["El acto que determina existencia y trazado", "La materialización física con mojones", "La adjudicación de un aprovechamiento", "Un tipo de licencia de caza"], correcta: 0 },
  { enunciado: "¿Qué es el amojonamiento de una vía pecuaria?", explicacion: "La materialización física con hitos de los límites ya deslindados.", dificultad: "media", opciones: ["La materialización física con hitos", "El acto de clasificación inicial", "Un tipo de concesión administrativa", "La solicitud de licencia de caza"], correcta: 0 },
  { enunciado: "¿Qué competencias pueden ejercer las Entidades Locales sobre las vías pecuarias?", explicacion: "Colaborar en vigilancia, informar sobre proyectos y ejercer tutela y policía.", dificultad: "media", opciones: ["Vigilancia, informar proyectos y policía", "Ninguna, es competencia exclusiva autonómica", "Solo pueden clasificarlas, no vigilarlas", "Solo pueden deslindarlas sin más funciones"], correcta: 0 },
]);

const S2 = "caza-aragon-licencias-modalidades-terrenos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma regula actualmente la caza en Aragón?", reverso: "La Ley 1/2015, de 12 de marzo, de Caza de Aragón, que sustituyó a la anterior Ley 5/2002, de 4 de abril, actualmente derogada" },
  { anverso: "¿Qué requisitos básicos se exigen para el ejercicio de la caza según la normativa vigente?", reverso: "Estar en posesión de la licencia de caza correspondiente, disponer del seguro obligatorio de responsabilidad civil del cazador, y, en su caso, contar con la autorización o permiso específico del terreno cinegético" },
  { anverso: "¿Qué es la licencia de caza?", reverso: "El documento administrativo habilitante, personal e intransferible, que autoriza a su titular a ejercer la actividad cinegética conforme a las condiciones y ámbito territorial que establece" },
  { anverso: "¿Qué es el seguro obligatorio del cazador?", reverso: "Un seguro de responsabilidad civil exigido legalmente para cubrir los daños a terceros que puedan derivarse del ejercicio de la actividad cinegética" },
  { anverso: "¿Cómo se clasifican los terrenos a efectos de la caza en Aragón?", reverso: "Fundamentalmente en terrenos cinegéticos (cotos de caza, con aprovechamiento ordenado) y terrenos no cinegéticos (zonas de seguridad, refugios de fauna, espacios donde la caza está prohibida o limitada)" },
  { anverso: "¿Qué modalidades básicas de caza existen según la especie y el método empleado?", reverso: "Caza mayor (jabalí, corzo, ciervo, entre otros) y caza menor (conejo, liebre, perdiz, entre otras), cada una con modalidades específicas (batida, rececho, media veda, aguardo, entre otras)" },
  { anverso: "¿Qué es la 'media veda' en el calendario cinegético?", reverso: "Un periodo de caza específico, anterior a la temporada general, habitualmente dedicado a determinadas especies de caza menor (como la codorniz o la paloma) en fechas de finales de verano" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué norma regula actualmente la caza en Aragón?", explicacion: "La Ley 1/2015, de 12 de marzo, vigente.", dificultad: "media", opciones: ["La Ley 1/2015 (vigente)", "La Ley 5/2002 (derogada)", "La Ley 10/2005 de vías pecuarias", "El RD 1372/1986"], correcta: 0 },
  { enunciado: "¿Qué requisitos básicos se exigen para cazar legalmente?", explicacion: "Licencia de caza, seguro obligatorio y, en su caso, permiso del terreno.", dificultad: "media", opciones: ["Licencia, seguro obligatorio y permiso del terreno", "Solo el DNI en vigor", "Ningún requisito específico", "Solo ser mayor de edad"], correcta: 0 },
  { enunciado: "¿Qué es la licencia de caza?", explicacion: "El documento habilitante personal e intransferible para ejercer la actividad cinegética.", dificultad: "media", opciones: ["El documento habilitante personal e intransferible", "Un tipo de seguro de responsabilidad civil", "Un permiso exclusivo para caza mayor", "Un tipo de vía pecuaria clasificada"], correcta: 0 },
  { enunciado: "¿Para qué sirve el seguro obligatorio del cazador?", explicacion: "Cubrir daños a terceros derivados de la actividad cinegética.", dificultad: "media", opciones: ["Cubrir daños a terceros por la actividad", "Cubrir exclusivamente daños al propio cazador", "Sustituir a la licencia de caza", "No es un requisito legal exigible"], correcta: 0 },
  { enunciado: "¿Cómo se clasifican los terrenos a efectos de caza?", explicacion: "En cinegéticos (cotos) y no cinegéticos (zonas de seguridad, refugios).", dificultad: "media", opciones: ["Cinegéticos y no cinegéticos", "Urbanos y no urbanizables exclusivamente", "Demaniales y patrimoniales exclusivamente", "No existe clasificación específica"], correcta: 0 },
  { enunciado: "¿Qué es la 'media veda' en el calendario cinegético?", explicacion: "Un periodo específico anterior a la temporada general para ciertas especies de caza menor.", dificultad: "dificil", opciones: ["Un periodo previo para ciertas especies menores", "La temporada completa de caza mayor", "Un tipo de licencia de caza especial", "Un sinónimo de terreno no cinegético"], correcta: 0 },
]);

const S3 = "planificacion-cinegetica-danos-infracciones";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la planificación cinegética?", reverso: "El conjunto de instrumentos (planes de ordenación y de aprovechamiento cinegético) que regulan la gestión sostenible de las especies de caza en un terreno, fijando cupos, especies autorizadas y medidas de conservación" },
  { anverso: "¿Qué relación existe entre la planificación cinegética y la protección de las especies de caza?", reverso: "La planificación busca garantizar la sostenibilidad de las poblaciones cinegéticas, evitando la sobreexplotación y asegurando su conservación a largo plazo mediante cupos y vedas ajustados a cada especie y terreno" },
  { anverso: "¿Qué es la gestión de hábitats cinegéticos?", reverso: "El conjunto de actuaciones (mejora de la vegetación, puntos de agua, refugios) orientadas a mantener o mejorar las condiciones del hábitat necesarias para las especies de caza en un terreno cinegético" },
  { anverso: "¿Qué son las repoblaciones cinegéticas?", reverso: "Las sueltas de ejemplares de una especie de caza en un terreno, con fines de refuerzo poblacional o de aprovechamiento cinegético, sujetas a autorización y condiciones sanitarias específicas" },
  { anverso: "¿Qué es el control de daños en el ámbito de la caza?", reverso: "Las actuaciones autorizadas dirigidas a reducir los daños causados por determinadas especies cinegéticas (por ejemplo, jabalí en cultivos agrícolas), fuera del periodo hábil ordinario de caza cuando esté justificado" },
  { anverso: "¿Quién responde por los daños causados por especies de caza según la normativa cinegética?", reverso: "Con carácter general, responden los titulares de los terrenos cinegéticos (cotos) por los daños causados por las especies que en ellos se cazan, salvo excepciones legalmente establecidas (por ejemplo, en vías públicas)" },
  { anverso: "¿Qué tipo de infracciones contempla la Ley de Caza de Aragón y qué sanciones pueden derivarse?", reverso: "Infracciones leves, graves y muy graves (según el bien jurídico afectado y la gravedad de la conducta), sancionables con multa y, en su caso, con la retirada de la licencia de caza o del arma utilizada" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la planificación cinegética?", explicacion: "Instrumentos que regulan la gestión sostenible de las especies de caza (cupos, especies).", dificultad: "media", opciones: ["Instrumentos de gestión sostenible con cupos y especies", "Un tipo de licencia de caza individual", "Un seguro obligatorio del cazador", "Un tipo de vía pecuaria"], correcta: 0 },
  { enunciado: "¿Qué busca la planificación cinegética respecto a las poblaciones de caza?", explicacion: "Garantizar su sostenibilidad evitando la sobreexplotación.", dificultad: "media", opciones: ["Garantizar la sostenibilidad de las poblaciones", "Maximizar las capturas sin ningún límite", "Eliminar por completo las especies cinegéticas", "No tiene ninguna relación con la conservación"], correcta: 0 },
  { enunciado: "¿Qué es la gestión de hábitats cinegéticos?", explicacion: "Actuaciones para mantener o mejorar las condiciones del hábitat de las especies de caza.", dificultad: "media", opciones: ["Actuaciones para mejorar el hábitat de la caza", "Un tipo de licencia de caza especial", "Un procedimiento de deslinde de vías pecuarias", "Un sinónimo de repoblación forestal"], correcta: 0 },
  { enunciado: "¿Qué son las repoblaciones cinegéticas?", explicacion: "Sueltas de ejemplares de una especie con fines de refuerzo poblacional.", dificultad: "media", opciones: ["Sueltas de ejemplares con fines de refuerzo", "La eliminación de una especie invasora", "Un tipo de infracción sancionable", "Un sinónimo de control de daños"], correcta: 0 },
  { enunciado: "¿Quién responde con carácter general por los daños de especies cinegéticas en un coto?", explicacion: "Los titulares del terreno cinegético (coto), salvo excepciones legales.", dificultad: "media", opciones: ["Los titulares del terreno cinegético", "Siempre la Administración autonómica exclusivamente", "Nunca existe responsabilidad por estos daños", "Siempre el cazador individual, no el coto"], correcta: 0 },
  { enunciado: "¿Qué tipos de infracciones contempla la Ley de Caza de Aragón?", explicacion: "Leves, graves y muy graves, con sanciones proporcionadas.", dificultad: "media", opciones: ["Leves, graves y muy graves", "Solo infracciones muy graves", "No contempla ningún régimen sancionador", "Solo infracciones administrativas fiscales"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 17 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 17, orden: 17, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-102 creado y vinculado como Tema 17 de Oficial Agente Inspector.");

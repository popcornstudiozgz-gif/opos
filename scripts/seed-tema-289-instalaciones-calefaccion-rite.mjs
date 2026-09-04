/**
 * Crea tema-289: "Instalaciones de calefacción" — Tema 13 (numero=13,
 * bloque-2) de Oficial Fontanero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 11 oficial del Anexo I (bases1716.pdf, línea 533):
 * "Instalaciones de calefacción. Instalación individual y colectiva. Redes
 * generales y de distribución. Conexión de aparatos. Materiales,
 * herramientas y su manejo. RD 1027/2007, 20 de julio y modificaciones
 * posteriores del Reglamento de Instalaciones Térmicas en los Edificios."
 *
 * Sourcing: Real Decreto 1027/2007, de 20 de julio, por el que se aprueba
 * el Reglamento de Instalaciones Térmicas en los Edificios (RITE,
 * BOE-A-2007-15820), con sus modificaciones posteriores por RD 238/2013 y
 * RD 178/2021 — verificado en esta sesión: ámbito de aplicación, exigencias
 * básicas (bienestar e higiene, eficiencia energética, seguridad),
 * estructura en cuatro Instrucciones Técnicas (IT1 diseño y dimensionado,
 * IT2 montaje, IT3 mantenimiento y uso, IT4 inspección) y régimen de
 * mantenimiento (empresas mantenedoras habilitadas, obligación de contrato
 * a partir de 70 kW). Tipos de instalación individual/colectiva, redes de
 * distribución y materiales: conocimiento técnico del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-289-instalaciones-calefaccion-rite.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-289";
const OPOSICION = "oficial-fontanero-ayto-zaragoza";
const BLOQUE_2_ID = "417e77bc-e7ac-4984-ae49-3a35de79350d";

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
  titulo: "Instalaciones de calefacción",
  descripcion: "El RITE (RD 1027/2007): ámbito de aplicación, exigencias básicas y estructura en cuatro Instrucciones Técnicas. Instalación individual y colectiva de calefacción, redes de distribución y conexión de aparatos. Materiales, herramientas y mantenimiento.",
  contenido: "Desarrolla las instalaciones de calefacción y el reglamento que las regula: el Reglamento de Instalaciones Térmicas en los Edificios (RITE), su ámbito de aplicación, sus exigencias básicas y su estructura en cuatro Instrucciones Técnicas; la diferencia entre instalación individual y colectiva de calefacción, las redes generales y de distribución y la conexión de los aparatos terminales (radiadores, suelo radiante); y los materiales y herramientas empleados, junto con el régimen de mantenimiento periódico exigido.",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-15820", titulo: "Real Decreto 1027/2007, de 20 de julio, Reglamento de Instalaciones Térmicas en los Edificios (RITE)" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-15820", titulo: "El RITE: ámbito y estructura", seccion: "el-rite-ambito-y-estructura", articulos: "RD 1027/2007" },
    { url: "", titulo: "Instalación individual y colectiva", seccion: "instalacion-individual-y-colectiva", articulos: "Conocimiento técnico del oficio" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-15820", titulo: "Materiales, herramientas y mantenimiento", seccion: "materiales-herramientas-y-mantenimiento", articulos: "RD 1027/2007, IT3" },
  ],
}]);

const S1 = "el-rite-ambito-y-estructura";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿A qué tipo de instalaciones se aplica el RITE?", reverso: "A las instalaciones fijas de climatización (calefacción, refrigeración y ventilación) y de producción de agua caliente sanitaria en edificios, tanto de nueva construcción como en reformas de instalaciones existentes; excluye las instalaciones de procesos industriales no destinadas al bienestar de las personas" },
  { anverso: "¿Cuáles son las tres exigencias básicas que debe cumplir una instalación térmica según el RITE?", reverso: "Bienestar e higiene (calidad térmica del ambiente, calidad del aire interior, dotación de agua caliente), eficiencia energética, y seguridad (prevención de riesgos para personas, bienes y medio ambiente)" },
  { anverso: "¿En cuántas Instrucciones Técnicas (IT) se estructura la parte técnica del RITE, y cómo se numeran?", reverso: "En cuatro: IT1 (diseño y dimensionado), IT2 (montaje), IT3 (mantenimiento y uso) e IT4 (inspección)" },
  { anverso: "¿Qué regula la Instrucción Técnica IT1 del RITE?", reverso: "Las exigencias técnicas de diseño y dimensionado de las instalaciones térmicas, incluidas las de bienestar e higiene, eficiencia energética y seguridad" },
  { anverso: "¿Qué regula la Instrucción Técnica IT4 del RITE?", reverso: "Las inspecciones periódicas de eficiencia energética a las que están sometidas determinadas instalaciones térmicas, y la periodicidad con que deben realizarse" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿A qué tipo de instalaciones se aplica el RITE?", explicacion: "A las instalaciones fijas de climatización y producción de ACS en edificios.", dificultad: "facil", opciones: ["A las instalaciones fijas de climatización y de producción de ACS en edificios", "Exclusivamente a instalaciones industriales de proceso, sin relación con el bienestar de las personas", "Exclusivamente a instalaciones de abastecimiento de agua potable", "Exclusivamente a instalaciones eléctricas de baja tensión en viviendas"], correcta: 0 },
  { enunciado: "¿Cuáles son las tres exigencias básicas del RITE?", explicacion: "Bienestar e higiene, eficiencia energética y seguridad.", dificultad: "media", opciones: ["Bienestar e higiene, eficiencia energética y seguridad", "Exclusivamente caudal, presión y velocidad del agua", "Exclusivamente resistencia mecánica y estanquidad", "Exclusivamente control metrológico y calidad del agua"], correcta: 0 },
  { enunciado: "¿En cuántas Instrucciones Técnicas se estructura la parte técnica del RITE?", explicacion: "En cuatro: IT1 a IT4.", dificultad: "media", opciones: ["En cuatro", "En dos", "En seis", "En ninguna: el RITE no se estructura en Instrucciones Técnicas"], correcta: 0 },
  { enunciado: "¿Qué regula la Instrucción Técnica IT1 del RITE?", explicacion: "Las exigencias técnicas de diseño y dimensionado.", dificultad: "dificil", opciones: ["Las exigencias técnicas de diseño y dimensionado de las instalaciones térmicas", "Exclusivamente el mantenimiento y uso de las instalaciones ya en funcionamiento", "Exclusivamente las inspecciones periódicas de eficiencia energética", "Exclusivamente el montaje y las pruebas de puesta en servicio"], correcta: 0 },
  { enunciado: "¿Qué regula la Instrucción Técnica IT4 del RITE?", explicacion: "Las inspecciones periódicas de eficiencia energética.", dificultad: "dificil", opciones: ["Las inspecciones periódicas de eficiencia energética", "Exclusivamente el diseño y dimensionado inicial de la instalación", "Exclusivamente el montaje de la instalación en obra", "Exclusivamente el mantenimiento preventivo diario de la instalación"], correcta: 0 },
]);

const S2 = "instalacion-individual-y-colectiva";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué diferencia hay entre una instalación de calefacción individual y una colectiva?", reverso: "En la individual, cada vivienda dispone de su propio equipo generador de calor (caldera individual); en la colectiva, un único equipo (o batería de equipos) genera calor para todo el edificio, distribuido después por una red común de tuberías" },
  { anverso: "¿Qué es la red de distribución de una instalación de calefacción colectiva?", reverso: "El conjunto de tuberías que conducen el agua caliente desde la sala de calderas hasta los distintos aparatos terminales (radiadores, suelo radiante) de cada vivienda o local del edificio, con sus correspondientes montantes y ramales" },
  { anverso: "¿Cómo se conecta habitualmente un radiador a la red de distribución de calefacción?", reverso: "Mediante dos tomas: una de entrada de agua caliente y otra de salida de retorno, cada una con su llave de corte (y habitualmente una válvula termostática en la entrada para regular la temperatura de la habitación)" },
  { anverso: "¿Qué es el suelo radiante como sistema de calefacción, y en qué se diferencia de los radiadores?", reverso: "Un sistema de emisión de calor mediante tuberías embebidas en el propio pavimento, que caldea la habitación de forma más uniforme y a menor temperatura de trabajo del agua que los radiadores convencionales" },
  { anverso: "¿Qué elemento debe purgarse periódicamente en un radiador, y por qué?", reverso: "El aire acumulado en su interior, mediante el purgador (llave o válvula de purga); el aire reduce la superficie útil de intercambio de calor y puede provocar ruidos o un calentamiento deficiente del radiador" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué diferencia hay entre una instalación de calefacción individual y una colectiva?", explicacion: "Individual: caldera propia por vivienda. Colectiva: un equipo común para todo el edificio.", dificultad: "facil", opciones: ["En la individual cada vivienda tiene su propia caldera; en la colectiva un equipo común genera calor para todo el edificio", "Ambas son exactamente lo mismo, sin ninguna diferencia real entre sí", "La individual solo existe en edificios de más de veinte plantas", "La colectiva nunca requiere ninguna red de distribución de tuberías"], correcta: 0 },
  { enunciado: "¿Qué es la red de distribución en una instalación de calefacción colectiva?", explicacion: "El conjunto de tuberías que llevan el agua caliente desde la sala de calderas hasta los aparatos terminales.", dificultad: "media", opciones: ["El conjunto de tuberías que conducen el agua caliente desde la sala de calderas hasta los aparatos terminales", "Exclusivamente el equipo generador de calor situado en la sala de calderas", "Exclusivamente el contador general de la instalación de calefacción", "Exclusivamente la válvula termostática de cada radiador del edificio"], correcta: 0 },
  { enunciado: "¿Cómo se conecta habitualmente un radiador a la red de distribución?", explicacion: "Mediante toma de entrada y de retorno, con llaves de corte.", dificultad: "media", opciones: ["Mediante una toma de entrada de agua caliente y otra de salida de retorno, cada una con su llave de corte", "Mediante una única toma, sin distinguir entrada ni retorno de agua", "Directamente soldado a la caldera, sin ninguna llave de corte intermedia", "Mediante conexión eléctrica, sin ninguna toma hidráulica"], correcta: 0 },
  { enunciado: "¿Qué caracteriza al suelo radiante frente a los radiadores convencionales?", explicacion: "Tuberías embebidas en el pavimento, calor más uniforme y menor temperatura de trabajo.", dificultad: "dificil", opciones: ["Tuberías embebidas en el pavimento que caldean de forma más uniforme y a menor temperatura de trabajo", "Un sistema que nunca requiere ninguna red de distribución de agua caliente", "Un sistema idéntico a un radiador convencional, solo que instalado en el techo", "Un sistema que exclusivamente puede combinarse con producción individual de ACS"], correcta: 0 },
  { enunciado: "¿Por qué debe purgarse periódicamente el aire acumulado en un radiador?", explicacion: "Porque reduce la superficie útil de intercambio de calor y puede provocar ruidos.", dificultad: "media", opciones: ["Porque el aire reduce la superficie útil de intercambio de calor y puede provocar ruidos o un calentamiento deficiente", "Porque el aire aumenta siempre la eficiencia energética del radiador afectado", "Porque el aire acumulado eleva automáticamente la presión de toda la instalación de calefacción", "Porque purgar el radiador sustituye a cualquier otra operación de mantenimiento exigida por el RITE"], correcta: 0 },
]);

const S3 = "materiales-herramientas-y-mantenimiento";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué materiales de tuberías, ya vistos en temas anteriores, son habituales en redes de calefacción?", reverso: "El cobre, el polipropileno (PP-R) y el acero, además de sistemas multicapa; todos ellos con buen comportamiento frente a las temperaturas de trabajo de una instalación de calefacción" },
  { anverso: "¿Qué herramienta específica se emplea para purgar el aire de un radiador?", reverso: "Una llave de purgador (habitualmente una llave cuadradilla o de purgador específica), que abre la pequeña válvula de purga situada en un extremo superior del radiador" },
  { anverso: "¿Qué obliga el RITE, en su Instrucción Técnica IT3, respecto al mantenimiento de las instalaciones térmicas?", reverso: "A que el titular de la instalación contrate su mantenimiento con una empresa mantenedora habilitada, con un programa de mantenimiento preventivo y de gestión energética adaptado a la instalación" },
  { anverso: "¿A partir de qué potencia térmica exige el RITE un contrato de mantenimiento con empresa mantenedora habilitada?", reverso: "A partir de 70 kW de potencia térmica nominal" },
  { anverso: "¿Durante cuánto tiempo debe conservarse, como mínimo, el registro de las operaciones de mantenimiento de una instalación térmica según el RITE?", reverso: "Un mínimo de cinco años" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué materiales de tuberías son habituales en redes de calefacción?", explicacion: "Cobre, PP-R, acero y sistemas multicapa.", dificultad: "facil", opciones: ["Cobre, polipropileno (PP-R), acero y sistemas multicapa", "Exclusivamente PVC de saneamiento, sin ningún otro material posible", "Exclusivamente hormigón, sin ningún tipo de tubería metálica o plástica", "Ningún material específico: el RITE prohíbe cualquier tipo de tubería en calefacción"], correcta: 0 },
  { enunciado: "¿Qué herramienta se emplea específicamente para purgar el aire de un radiador?", explicacion: "Una llave de purgador.", dificultad: "media", opciones: ["Una llave de purgador", "Una llave dinamométrica de par calibrado", "Un soplete de oxiacetileno para corte de metales", "Un manómetro digital de precisión 0,1 bar"], correcta: 0 },
  { enunciado: "¿Qué obliga el RITE (IT3) respecto al mantenimiento de las instalaciones térmicas?", explicacion: "A contratarlo con una empresa mantenedora habilitada.", dificultad: "media", opciones: ["A contratar el mantenimiento con una empresa mantenedora habilitada", "A que el propio usuario final realice personalmente todo el mantenimiento", "A prescindir de cualquier mantenimiento en instalaciones de menos de 20 años", "A sustituir la instalación completa cada cinco años, sin excepción"], correcta: 0 },
  { enunciado: "¿A partir de qué potencia térmica exige el RITE un contrato de mantenimiento con empresa habilitada?", explicacion: "A partir de 70 kW.", dificultad: "dificil", opciones: ["70 kW", "7 kW", "700 kW", "No se exige ningún umbral de potencia para esta obligación"], correcta: 0 },
  { enunciado: "¿Durante cuánto tiempo debe conservarse, como mínimo, el registro de operaciones de mantenimiento según el RITE?", explicacion: "Un mínimo de cinco años.", dificultad: "dificil", opciones: ["Cinco años", "Un año", "Diez años", "No se exige ningún plazo mínimo de conservación"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "RITE", definicion: "Reglamento de Instalaciones Térmicas en los Edificios, aprobado por el Real Decreto 1027/2007, que regula las instalaciones fijas de climatización y de producción de ACS." },
  { tema_slug: TEMA, seccion: S1, termino: "Instrucción Técnica (IT)", definicion: "Cada uno de los cuatro bloques (IT1 a IT4) en los que se estructura la parte técnica del RITE: diseño y dimensionado, montaje, mantenimiento y uso, e inspección." },
  { tema_slug: TEMA, seccion: S2, termino: "Suelo radiante", definicion: "Sistema de calefacción mediante tuberías embebidas en el pavimento, que caldea de forma uniforme a menor temperatura de trabajo que un radiador convencional." },
  { tema_slug: TEMA, seccion: S2, termino: "Purgador", definicion: "Válvula o llave de un radiador que permite eliminar el aire acumulado en su interior, mejorando el intercambio de calor." },
  { tema_slug: TEMA, seccion: S3, termino: "Empresa mantenedora habilitada", definicion: "Empresa autorizada conforme al RITE para realizar el mantenimiento de instalaciones térmicas, exigible por contrato a partir de 70 kW de potencia." },
  { tema_slug: TEMA, seccion: S3, termino: "Programa de mantenimiento preventivo", definicion: "Conjunto de operaciones periódicas exigidas por la IT3 del RITE para conservar la instalación térmica en condiciones adecuadas de funcionamiento y eficiencia." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 13 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 13, orden: 13, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-289 creado y vinculado como Tema 13 de Oficial Fontanero.");

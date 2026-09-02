/**
 * Crea tema-139: "El Reglamento Electrotécnico para Baja Tensión (REBT)" —
 * Tema 7 (numero=7, bloque-2) de Oficial Electricista (Ayto. Zaragoza).
 * Primer tema de la parte específica de esta oposición.
 *
 * Corresponde al TEMA 5 oficial del Anexo I (bases2110.pdf, línea 1316):
 *   "El Reglamento Electrotécnico para Baja Tensión (REBT). Estructura del
 *   Real Decreto 842/2002. Instrucciones Técnicas Complementarias
 *   (ITC-BT). Ámbito de aplicación, empresas instaladoras y categorías de
 *   instaladores autorizados."
 *
 * Fuente primaria verificada en esta sesión (WebSearch + WebFetch sobre
 * boe.es y fuentes técnicas del sector):
 * - Real Decreto 842/2002, de 2 de agosto, por el que se aprueba el
 *   Reglamento electrotécnico para baja tensión — BOE-A-2002-18099
 *   (https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099). Objeto
 *   (preservar la seguridad de personas y bienes), campo de aplicación
 *   (instalaciones ≤1.000 V en corriente alterna y ≤1.500 V en corriente
 *   continua, art. 2), y desarrollo mediante 52 Instrucciones Técnicas
 *   Complementarias (ITC-BT-01 a ITC-BT-52; la ITC-BT-52 se incorporó
 *   posteriormente por el RD 1053/2014).
 * - ITC-BT-03 (Empresa instaladora e instalador en baja tensión):
 *   categorías de instalador — básica (instalaciones eléctricas de baja
 *   tensión más comunes) y especialista, con las modalidades de
 *   instalaciones de generación y distribución de baja tensión, líneas
 *   subterráneas de alta tensión, subestaciones y centros de
 *   transformación, líneas aéreas de alta tensión, e instalaciones de
 *   automatismos, entre otras.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-139-rebt-estructura-itc-bt.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-139";
const OPOSICION = "oficial-electricista-ayto-zaragoza";
const BLOQUE_2_ID = "4dbd9335-cb26-48e5-a83b-aef9eeb23097";

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
  titulo: "El Reglamento Electrotécnico para Baja Tensión (REBT)",
  descripcion: "Estructura del Real Decreto 842/2002. Instrucciones Técnicas Complementarias (ITC-BT). Ámbito de aplicación, empresas instaladoras y categorías de instaladores autorizados.",
  contenido: "Desarrolla la estructura del Real Decreto 842/2002, por el que se aprueba el Reglamento electrotécnico para baja tensión (REBT): su objeto, campo de aplicación y desarrollo mediante 52 Instrucciones Técnicas Complementarias (ITC-BT). Explica el ámbito de aplicación del reglamento, el régimen de las empresas instaladoras en baja tensión y las categorías de instalador autorizado (básica y especialista) reguladas en la ITC-BT-03.",
  enlaces_boe: [
    { titulo: "Real Decreto 842/2002, de 2 de agosto, Reglamento electrotécnico para baja tensión", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Estructura del Real Decreto 842/2002: objeto y campo de aplicación", seccion: "estructura-real-decreto-842-2002", articulos: "Arts. 1 a 2" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Las Instrucciones Técnicas Complementarias (ITC-BT)", seccion: "instrucciones-tecnicas-complementarias-itc-bt", articulos: "ITC-BT-01 a ITC-BT-52" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Empresas instaladoras y categorías de instalador autorizado", seccion: "empresas-instaladoras-categorias-instalador-autorizado", articulos: "ITC-BT-03" },
  ],
}]);

const S1 = "estructura-real-decreto-842-2002";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma aprueba el Reglamento Electrotécnico para Baja Tensión (REBT) actualmente vigente?", reverso: "El Real Decreto 842/2002, de 2 de agosto, que sustituyó al anterior reglamento de 1973 e incorporó remisiones a normas técnicas europeas e internacionales" },
  { anverso: "¿Cuál es el objeto del REBT?", reverso: "Establecer las condiciones técnicas y garantías que deben reunir las instalaciones eléctricas de baja tensión para preservar la seguridad de las personas y de los bienes, así como asegurar el normal funcionamiento de dichas instalaciones" },
  { anverso: "¿Cuál es el campo de aplicación del REBT en cuanto a niveles de tensión (art. 2)?", reverso: "Instalaciones destinadas a la producción, distribución, transporte, transformación, y utilización de energía eléctrica con tensión nominal igual o inferior a 1.000 V en corriente alterna, o 1.500 V en corriente continua" },
  { anverso: "¿Cómo se estructura normativamente el REBT?", reverso: "Por un cuerpo articulado (el propio Real Decreto 842/2002, con sus artículos de disposiciones generales) que se desarrolla y completa mediante 52 Instrucciones Técnicas Complementarias (ITC-BT-01 a ITC-BT-52)" },
  { anverso: "¿Qué debe garantizarse mediante la documentación técnica y la puesta en servicio de una instalación eléctrica según el REBT?", reverso: "Que la instalación cumple las prescripciones reglamentarias antes de entrar en funcionamiento, mediante los proyectos, memorias técnicas de diseño y certificados de instalación que correspondan según el tipo de instalación" },
  { anverso: "¿Qué son las inspecciones periódicas previstas en el REBT y quién puede realizarlas?", reverso: "Comprobaciones del correcto estado de determinadas instalaciones de baja tensión (según su tipo y potencia), realizadas por Organismos de Control autorizados en materia de seguridad industrial" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué Real Decreto aprueba el Reglamento Electrotécnico para Baja Tensión vigente?", explicacion: "El Real Decreto 842/2002, de 2 de agosto.", dificultad: "facil", opciones: ["El Real Decreto 842/2002, de 2 de agosto", "El Real Decreto 314/2006, de 17 de marzo", "El Real Decreto 1627/1997, de 24 de octubre", "El Real Decreto 773/1997, de 30 de mayo"], correcta: 0 },
  { enunciado: "¿Cuál es el objeto principal del REBT?", explicacion: "Preservar la seguridad de personas y bienes en las instalaciones eléctricas de baja tensión.", dificultad: "facil", opciones: ["Preservar la seguridad de las personas y los bienes", "Regular exclusivamente el precio de la electricidad", "Regular el transporte de mercancías peligrosas", "Establecer los tributos municipales sobre instalaciones"], correcta: 0 },
  { enunciado: "Según el art. 2 del REBT, ¿cuál es su campo de aplicación en corriente alterna?", explicacion: "Instalaciones con tensión nominal igual o inferior a 1.000 V en corriente alterna.", dificultad: "media", opciones: ["Tensión nominal igual o inferior a 1.000 V", "Tensión nominal igual o inferior a 400 V", "Tensión nominal igual o inferior a 230 V", "Tensión nominal igual o inferior a 1.500 V"], correcta: 0 },
  { enunciado: "¿Mediante qué instrumento normativo se desarrolla y completa el articulado del REBT?", explicacion: "Mediante las Instrucciones Técnicas Complementarias (ITC-BT-01 a ITC-BT-52).", dificultad: "media", opciones: ["Mediante las Instrucciones Técnicas Complementarias (ITC-BT)", "Mediante ordenanzas municipales exclusivamente", "Mediante el Código Técnico de la Edificación en su totalidad", "No se desarrolla mediante ningún instrumento adicional"], correcta: 0 },
  { enunciado: "¿Quién puede realizar las inspecciones periódicas de determinadas instalaciones de baja tensión previstas en el REBT?", explicacion: "Organismos de Control autorizados en materia de seguridad industrial.", dificultad: "media", opciones: ["Organismos de Control autorizados", "Cualquier empresa instaladora sin autorización específica", "Únicamente el propio titular de la instalación", "El fabricante de los materiales eléctricos empleados"], correcta: 0 },
]);

const S2 = "instrucciones-tecnicas-complementarias-itc-bt";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Cuántas Instrucciones Técnicas Complementarias (ITC-BT) desarrollan el REBT?", reverso: "52 (ITC-BT-01 a ITC-BT-52); la ITC-BT-52, sobre infraestructura para la recarga de vehículos eléctricos, se incorporó posteriormente mediante el Real Decreto 1053/2014" },
  { anverso: "¿Qué regula la ITC-BT-01?", reverso: "La terminología: define los términos técnicos empleados a lo largo de todo el reglamento y sus instrucciones complementarias" },
  { anverso: "¿Qué regulan conjuntamente las ITC-BT-13, ITC-BT-14, ITC-BT-15, ITC-BT-16 y ITC-BT-17?", reverso: "Los distintos elementos de la instalación de enlace de un edificio: Caja General de Protección (BT-13), Línea General de Alimentación (BT-14), Derivaciones Individuales (BT-15), ubicación de contadores (BT-16), y dispositivos de mando y protección/ICP (BT-17)" },
  { anverso: "¿Qué regula la ITC-BT-18?", reverso: "Las puestas a tierra: objeto, elementos que la componen y prescripciones de ejecución" },
  { anverso: "¿Qué regula la ITC-BT-24?", reverso: "La protección contra los contactos directos e indirectos en las instalaciones eléctricas de baja tensión" },
  { anverso: "¿Qué regula la ITC-BT-28?", reverso: "Las instalaciones eléctricas en locales de pública concurrencia (hospitales, espectáculos, centros comerciales, entre otros)" },
  { anverso: "¿Qué regula la ITC-BT-47?", reverso: "Los motores: prescripciones de instalación, protección y conexionado de los motores eléctricos en baja tensión" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Cuántas Instrucciones Técnicas Complementarias (ITC-BT) desarrollan el REBT?", explicacion: "52, de la ITC-BT-01 a la ITC-BT-52.", dificultad: "media", opciones: ["52", "30", "20", "10"], correcta: 0 },
  { enunciado: "¿Qué regula la ITC-BT-01?", explicacion: "La terminología empleada en todo el reglamento.", dificultad: "facil", opciones: ["La terminología del reglamento", "Las puestas a tierra", "Los motores eléctricos", "Las piscinas y fuentes"], correcta: 0 },
  { enunciado: "¿Qué elemento de la instalación de enlace regula la ITC-BT-13?", explicacion: "La Caja General de Protección (CGP).", dificultad: "media", opciones: ["La Caja General de Protección (CGP)", "La Línea General de Alimentación (LGA)", "Las Derivaciones Individuales (DI)", "El Interruptor de Control de Potencia (ICP)"], correcta: 0 },
  { enunciado: "¿Qué instrucción técnica complementaria regula las puestas a tierra?", explicacion: "La ITC-BT-18.", dificultad: "media", opciones: ["La ITC-BT-18", "La ITC-BT-24", "La ITC-BT-28", "La ITC-BT-47"], correcta: 0 },
  { enunciado: "¿Qué instrucción técnica complementaria regula la protección contra contactos directos e indirectos?", explicacion: "La ITC-BT-24.", dificultad: "media", opciones: ["La ITC-BT-24", "La ITC-BT-18", "La ITC-BT-30", "La ITC-BT-44"], correcta: 0 },
  { enunciado: "¿Qué instrucción técnica complementaria se incorporó posteriormente al REBT mediante el Real Decreto 1053/2014?", explicacion: "La ITC-BT-52, sobre infraestructura para la recarga de vehículos eléctricos.", dificultad: "dificil", opciones: ["La ITC-BT-52 (recarga de vehículos eléctricos)", "La ITC-BT-01 (terminología)", "La ITC-BT-18 (puestas a tierra)", "La ITC-BT-03 (empresas instaladoras)"], correcta: 0 },
]);

const S3 = "empresas-instaladoras-categorias-instalador-autorizado";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué instrucción técnica complementaria regula las empresas instaladoras e instaladores en baja tensión?", reverso: "La ITC-BT-03 (Empresa instaladora e instalador en baja tensión)" },
  { anverso: "¿Qué requisito debe cumplir una empresa para poder actuar como empresa instaladora en baja tensión según el REBT?", reverso: "Haber presentado ante el órgano competente de la comunidad autónoma la declaración responsable acreditando que cumple los requisitos exigidos (disponer de instalador/es habilitados, medios técnicos y humanos adecuados)" },
  { anverso: "¿Qué categorías de instalador autorizado establece la ITC-BT-03?", reverso: "La categoría básica y la categoría especialista, esta última con distintas modalidades según el tipo de instalación" },
  { anverso: "¿Qué tipo de instalaciones habilita a ejecutar la categoría básica de instalador?", reverso: "Las instalaciones eléctricas de baja tensión más comunes: instalaciones de enlace, interiores en viviendas, locales comerciales y pequeña industria" },
  { anverso: "¿Qué modalidades incluye la categoría especialista de instalador?", reverso: "Entre otras, instalaciones de generación y distribución de baja tensión, líneas subterráneas y aéreas de alta tensión, subestaciones y centros de transformación, e instalaciones de automatismos" },
  { anverso: "¿Qué documento debe expedir la empresa instaladora al finalizar una instalación eléctrica sujeta al REBT?", reverso: "El correspondiente Certificado de Instalación Eléctrica (CIE), acreditando que la instalación se ajusta a las prescripciones reglamentarias" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué instrucción técnica complementaria regula las empresas instaladoras e instaladores en baja tensión?", explicacion: "La ITC-BT-03.", dificultad: "media", opciones: ["La ITC-BT-03", "La ITC-BT-05", "La ITC-BT-16", "La ITC-BT-24"], correcta: 0 },
  { enunciado: "¿Qué debe presentar una empresa ante el órgano competente para poder actuar como empresa instaladora en baja tensión?", explicacion: "Una declaración responsable acreditando que cumple los requisitos exigidos.", dificultad: "media", opciones: ["Una declaración responsable", "Una fianza económica exclusivamente", "Ningún trámite es necesario", "Un contrato con el Colegio de Ingenieros"], correcta: 0 },
  { enunciado: "¿Qué categorías de instalador establece la ITC-BT-03?", explicacion: "Básica y especialista.", dificultad: "facil", opciones: ["Básica y especialista", "Junior y senior", "Provisional y definitiva", "Municipal y autonómica"], correcta: 0 },
  { enunciado: "¿Qué tipo de instalaciones habilita a ejecutar la categoría básica de instalador?", explicacion: "Las instalaciones eléctricas de baja tensión más comunes (enlace, viviendas, locales comerciales, pequeña industria).", dificultad: "media", opciones: ["Las instalaciones eléctricas de baja tensión más comunes", "Únicamente las líneas de alta tensión", "Únicamente las subestaciones eléctricas", "Únicamente las instalaciones de generación"], correcta: 0 },
  { enunciado: "¿Qué documento debe expedir la empresa instaladora al finalizar una instalación eléctrica sujeta al REBT?", explicacion: "El Certificado de Instalación Eléctrica (CIE).", dificultad: "media", opciones: ["El Certificado de Instalación Eléctrica (CIE)", "Una factura proforma únicamente", "El libro de órdenes de la obra", "El certificado de eficiencia energética"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 7 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 7, orden: 7, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-139 creado y vinculado como Tema 7 de Oficial Electricista.");

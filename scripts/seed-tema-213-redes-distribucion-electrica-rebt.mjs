/**
 * Crea tema-213: "Redes de distribución eléctrica y REBT" — Tema 17
 * (numero=17, bloque-2) de Oficial Planta Potabilizadora (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 15 oficial del Anexo I (bases2110.pdf, línea
 * 1214): "Redes de distribución eléctrica; Reglamento electrotécnico de
 * baja tensión, ITC-BT 6, 7, 8 y 11. Transformadores eléctricos.
 * Dispositivos de corte y protección, REBT ITC-BT 13, 17, 22, 23 y 24.
 * Aparellaje eléctrico: tipos, características y función. Factor de
 * potencia de una instalación eléctrica. Formas de corrección del
 * factor de potencia. Conexionado a tierra, REBT ITC-BT-18."
 *
 * Fuentes primarias verificadas mediante búsqueda en esta sesión:
 * - REBT (RD 842/2002, ya verificado en el proyecto para Oficial
 *   Electricista) y sus Instrucciones Técnicas Complementarias citadas
 *   literalmente por el temario oficial: ITC-BT-06 (redes aéreas de
 *   distribución), ITC-BT-07 (redes subterráneas de distribución),
 *   ITC-BT-08 (sistemas de conexión del neutro y de las masas en redes
 *   de distribución), ITC-BT-11 (redes de distribución de energía
 *   eléctrica: acometidas), ITC-BT-13 (instalaciones de enlace: cajas
 *   generales de protección), ITC-BT-17 (instalaciones de enlace:
 *   dispositivos generales e individuales de mando y protección),
 *   ITC-BT-22 (protección contra sobreintensidades), ITC-BT-23
 *   (protección contra sobretensiones), ITC-BT-24 (protección contra
 *   contactos directos e indirectos), e ITC-BT-18 (instalaciones de
 *   puesta a tierra).
 * El resto del contenido (aparellaje eléctrico, factor de potencia y su
 * corrección) es conocimiento técnico consolidado de electrotecnia
 * industrial, sin una norma específica adicional más allá del propio
 * REBT.
 *
 * Tres secciones:
 * 1. redes-distribucion-itc-bt-6-7-8-11-transformadores
 * 2. dispositivos-corte-proteccion-itc-bt-13-17-22-23-24
 * 3. aparellaje-factor-potencia-puesta-tierra-itc-bt-18
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-213-redes-distribucion-electrica-rebt.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-213";
const OPOSICION = "oficial-planta-potabilizadora-ayto-zaragoza";
const BLOQUE_2_ID = "ca4ed0ad-ab08-4bc9-80b7-fb4e6941b64a";

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
  titulo: "Redes de distribución eléctrica y REBT",
  descripcion: "Redes de distribución eléctrica y transformadores (ITC-BT 6, 7, 8, 11). Dispositivos de corte y protección (ITC-BT 13, 17, 22, 23, 24). Aparellaje eléctrico, factor de potencia y puesta a tierra (ITC-BT-18).",
  contenido: "Desarrolla el marco del Reglamento Electrotécnico para Baja Tensión aplicable a las instalaciones eléctricas de una planta potabilizadora: las redes de distribución eléctrica aéreas y subterráneas y los transformadores (ITC-BT-06, 07, 08 y 11), los dispositivos de corte y protección de las instalaciones de enlace (ITC-BT-13, 17, 22, 23 y 24), el aparellaje eléctrico y sus tipos y funciones, el factor de potencia de una instalación y sus formas de corrección, y el conexionado a tierra (ITC-BT-18).",
  enlaces_boe: [
    "https://www.boe.es/biblioteca_juridica/codigos/abrir_pdf.php?fich=326_Reglamento_electrotecnico_para_baja_tension_e_ITC.pdf",
  ],
  indice_estudio: [
    { url: "https://www.boe.es/biblioteca_juridica/codigos/abrir_pdf.php?fich=326_Reglamento_electrotecnico_para_baja_tension_e_ITC.pdf", titulo: "Redes de distribución eléctrica y transformadores", seccion: "redes-distribucion-itc-bt-6-7-8-11-transformadores", articulos: "REBT (RD 842/2002), ITC-BT-06, 07, 08 y 11" },
    { url: "https://www.boe.es/biblioteca_juridica/codigos/abrir_pdf.php?fich=326_Reglamento_electrotecnico_para_baja_tension_e_ITC.pdf", titulo: "Dispositivos de corte y protección", seccion: "dispositivos-corte-proteccion-itc-bt-13-17-22-23-24", articulos: "REBT, ITC-BT-13, 17, 22, 23 y 24" },
    { url: "https://www.boe.es/biblioteca_juridica/codigos/abrir_pdf.php?fich=326_Reglamento_electrotecnico_para_baja_tension_e_ITC.pdf", titulo: "Aparellaje eléctrico, factor de potencia y puesta a tierra", seccion: "aparellaje-factor-potencia-puesta-tierra-itc-bt-18", articulos: "REBT, ITC-BT-18" },
  ],
}]);

const S1 = "redes-distribucion-itc-bt-6-7-8-11-transformadores";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué ITC-BT del REBT establece los requisitos de las redes aéreas de distribución de energía eléctrica?", reverso: "La ITC-BT-06" },
  { anverso: "¿Qué ITC-BT del REBT establece los requisitos de las redes subterráneas de distribución de energía eléctrica?", reverso: "La ITC-BT-07" },
  { anverso: "¿Qué regula la ITC-BT-08 del REBT?", reverso: "Los sistemas de conexión del neutro y de las masas en las redes de distribución de energía eléctrica" },
  { anverso: "¿Qué regula la ITC-BT-11 del REBT?", reverso: "Las redes de distribución de energía eléctrica en su tramo de acometidas, es decir, la conexión entre la red de distribución y las instalaciones de enlace de los usuarios" },
  { anverso: "¿Qué función cumple un transformador eléctrico dentro de una instalación como la de una planta potabilizadora?", reverso: "Modificar el nivel de tensión de la energía eléctrica recibida (habitualmente reduciendo la tensión de media a baja tensión) para adaptarla a las necesidades de los equipos y receptores de la instalación, manteniendo la frecuencia constante" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué ITC-BT establece los requisitos de las redes aéreas de distribución eléctrica?", explicacion: "La ITC-BT-06.", dificultad: "media", opciones: ["La ITC-BT-06", "La ITC-BT-07", "La ITC-BT-08", "La ITC-BT-11"], correcta: 0 },
  { enunciado: "¿Qué ITC-BT establece los requisitos de las redes subterráneas de distribución eléctrica?", explicacion: "La ITC-BT-07.", dificultad: "media", opciones: ["La ITC-BT-07", "La ITC-BT-06", "La ITC-BT-08", "La ITC-BT-11"], correcta: 0 },
  { enunciado: "¿Qué regula la ITC-BT-08 del REBT?", explicacion: "Los sistemas de conexión del neutro y de las masas en redes de distribución.", dificultad: "dificil", opciones: ["Los sistemas de conexión del neutro y de las masas", "Las cajas generales de protección de las instalaciones de enlace", "La protección contra sobreintensidades de las instalaciones", "Las instalaciones de puesta a tierra de las instalaciones"], correcta: 0 },
  { enunciado: "¿Qué regula la ITC-BT-11 del REBT?", explicacion: "Las redes de distribución en su tramo de acometidas.", dificultad: "media", opciones: ["Las redes de distribución en su tramo de acometidas", "Las cajas generales de protección exclusivamente", "La protección contra contactos directos e indirectos", "El conexionado a tierra de las instalaciones eléctricas"], correcta: 0 },
  { enunciado: "¿Qué función cumple un transformador eléctrico en una instalación de la planta?", explicacion: "Modifica el nivel de tensión para adaptarla a las necesidades de los equipos.", dificultad: "media", opciones: ["Modifica el nivel de tensión para adaptarla a los equipos", "Mide exclusivamente el caudal de una conducción de la planta", "Dosifica exclusivamente el hipoclorito de la desinfección final", "Filtra exclusivamente las partículas sólidas del agua tratada"], correcta: 0 },
]);

const S2 = "dispositivos-corte-proteccion-itc-bt-13-17-22-23-24";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué regula la ITC-BT-13 del REBT?", reverso: "Las cajas generales de protección de las instalaciones de enlace, que determinan su ubicación, sistema de instalación, tipo y características" },
  { anverso: "¿Qué regula la ITC-BT-17 del REBT?", reverso: "Los dispositivos generales e individuales de mando y protección de las instalaciones de enlace, incluido el interruptor de control de potencia" },
  { anverso: "¿Qué regula la ITC-BT-22 del REBT?", reverso: "La protección contra sobreintensidades en las instalaciones interiores o receptoras, mediante dispositivos como interruptores automáticos magnetotérmicos o fusibles" },
  { anverso: "¿Qué regula la ITC-BT-23 del REBT?", reverso: "La protección contra sobretensiones, tanto temporales como transitorias, en las instalaciones interiores" },
  { anverso: "¿Qué regula la ITC-BT-24 del REBT?", reverso: "La protección contra los contactos directos e indirectos en las instalaciones interiores o receptoras" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué regula la ITC-BT-13 del REBT?", explicacion: "Las cajas generales de protección de las instalaciones de enlace.", dificultad: "media", opciones: ["Las cajas generales de protección", "La protección contra sobreintensidades", "La protección contra sobretensiones", "El conexionado a tierra de la instalación"], correcta: 0 },
  { enunciado: "¿Qué regula la ITC-BT-17 del REBT?", explicacion: "Los dispositivos generales e individuales de mando y protección.", dificultad: "media", opciones: ["Los dispositivos generales e individuales de mando y protección", "Las redes aéreas de distribución eléctrica exclusivamente", "Las redes subterráneas de distribución eléctrica exclusivamente", "El factor de potencia de la instalación eléctrica"], correcta: 0 },
  { enunciado: "¿Qué regula la ITC-BT-22 del REBT?", explicacion: "La protección contra sobreintensidades.", dificultad: "media", opciones: ["La protección contra sobreintensidades", "La protección contra sobretensiones", "La protección contra contactos directos e indirectos", "Las cajas generales de protección de la instalación"], correcta: 0 },
  { enunciado: "¿Qué regula la ITC-BT-23 del REBT?", explicacion: "La protección contra sobretensiones.", dificultad: "dificil", opciones: ["La protección contra sobretensiones", "La protección contra sobreintensidades", "La protección contra contactos directos e indirectos", "Las instalaciones de puesta a tierra"], correcta: 0 },
  { enunciado: "¿Qué regula la ITC-BT-24 del REBT?", explicacion: "La protección contra los contactos directos e indirectos.", dificultad: "media", opciones: ["La protección contra los contactos directos e indirectos", "La protección contra sobretensiones exclusivamente", "Las redes de distribución en su tramo de acometidas", "El factor de potencia de la instalación eléctrica"], correcta: 0 },
]);

const S3 = "aparellaje-factor-potencia-puesta-tierra-itc-bt-18";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el aparellaje eléctrico, en el contexto de una instalación como la de la planta potabilizadora?", reverso: "El conjunto de dispositivos eléctricos (interruptores, seccionadores, contactores, relés, fusibles) que permiten maniobrar, proteger y controlar los distintos circuitos de la instalación" },
  { anverso: "¿Qué es el factor de potencia de una instalación eléctrica?", reverso: "La relación entre la potencia activa (la que realmente se transforma en trabajo útil) y la potencia aparente total consumida por la instalación, siendo un indicador de la eficiencia con la que se aprovecha la energía eléctrica suministrada" },
  { anverso: "¿Por qué interesa corregir un factor de potencia bajo en una instalación con motores eléctricos como la de una planta potabilizadora?", reverso: "Porque un factor de potencia bajo implica un mayor consumo de energía reactiva, lo que puede suponer penalizaciones económicas en la factura eléctrica y un uso menos eficiente de la capacidad de la instalación" },
  { anverso: "¿Cuál es la forma más habitual de corregir el factor de potencia en instalaciones industriales con motores?", reverso: "La instalación de baterías de condensadores, que compensan la energía reactiva consumida por los motores y otros receptores inductivos, mejorando el factor de potencia global de la instalación" },
  { anverso: "¿Qué regula la ITC-BT-18 del REBT, y cuál es su finalidad principal?", reverso: "Las instalaciones de puesta a tierra, cuya finalidad principal es limitar la tensión que puedan presentar las masas metálicas respecto a tierra en caso de fallo, garantizar la actuación de las protecciones, y reducir el riesgo derivado de un fallo en los materiales eléctricos empleados" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el aparellaje eléctrico de una instalación?", explicacion: "El conjunto de dispositivos que permiten maniobrar, proteger y controlar los circuitos.", dificultad: "media", opciones: ["El conjunto de dispositivos que maniobran, protegen y controlan circuitos", "El conjunto exclusivo de tuberías de la instalación de agua", "El conjunto exclusivo de reactivos químicos de la planta", "El conjunto exclusivo de rodamientos de las bombas de la planta"], correcta: 0 },
  { enunciado: "¿Qué es el factor de potencia de una instalación eléctrica?", explicacion: "La relación entre la potencia activa y la potencia aparente total consumida.", dificultad: "media", opciones: ["La relación entre potencia activa y potencia aparente total", "La relación entre el caudal y la presión de una conducción", "La relación entre la masa y el volumen de un material", "La relación entre la velocidad y la sección de un conducto"], correcta: 0 },
  { enunciado: "¿Por qué interesa corregir un factor de potencia bajo en una instalación con motores?", explicacion: "Un factor bajo implica mayor consumo reactivo y posibles penalizaciones económicas.", dificultad: "media", opciones: ["Implica mayor consumo reactivo y posibles penalizaciones económicas", "No genera ninguna consecuencia económica real para la instalación", "Mejora automáticamente la calidad sanitaria del agua tratada", "Reduce de forma directa el caudal disponible en la red de agua"], correcta: 0 },
  { enunciado: "¿Cuál es la forma más habitual de corregir el factor de potencia en instalaciones con motores?", explicacion: "La instalación de baterías de condensadores.", dificultad: "dificil", opciones: ["La instalación de baterías de condensadores", "La sustitución completa de todos los motores de la instalación", "La reducción permanente de la potencia contratada", "La instalación de un transformador adicional de mayor potencia"], correcta: 0 },
  { enunciado: "¿Qué regula la ITC-BT-18 del REBT?", explicacion: "Las instalaciones de puesta a tierra.", dificultad: "media", opciones: ["Las instalaciones de puesta a tierra", "Las cajas generales de protección de la instalación", "La protección contra sobreintensidades de la instalación", "Las redes aéreas de distribución eléctrica"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 17 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 17, orden: 17, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-213 creado y vinculado como Tema 17 de Oficial Planta Potabilizadora.");

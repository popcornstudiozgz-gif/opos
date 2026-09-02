/**
 * Crea tema-201: "Cámaras, arquetas en la red de abastecimiento, nudo
 * tipo para válvulas y trampillos" — Tema 21 (numero=21, bloque-2) de
 * Oficial Guardallaves (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 19 oficial del Anexo I (bases2110.pdf, línea 946):
 *   "Cámaras, arquetas en la red de abastecimiento de agua, nudo tipo
 *   para válvulas, trampillos."
 *
 * Fuentes primarias verificadas y leídas en esta sesión:
 * - Procedimiento de Prevención de Riesgos Laborales PPRL-1601,
 *   "Procedimiento para la realización de trabajos en espacios
 *   confinados" del Ayuntamiento de Zaragoza (mayo 2020), documento
 *   interno municipal accedido a través de su republicación pública en
 *   el portal sindical ayuntamiento.osta.es (texto íntegro descargado y
 *   leído en esta sesión): define "cámara" (alojamiento visitable con
 *   cubierta de losas desmontables u otro sistema, junto a la tapa de
 *   registro) y "registro" (alojamiento cuyo acceso se realiza única y
 *   exclusivamente a través de la abertura de su tapa), y cita ambos
 *   como ejemplos de espacio confinado en el listado no exhaustivo del
 *   Ayuntamiento ("arquetas de registro", "arquetas llaves maniobra").
 * - Ordenanza Municipal para la Ecoeficiencia y la Calidad de la Gestión
 *   Integral del Agua (OMECGIA), Anexo XIII, "Modelos de arquetas de
 *   contadores" (planos oficiales M-21 a M-30, entre ellos arqueta para
 *   riego, para contadores electrónicos o electromagnéticos, y arqueta
 *   rectangular).
 * - UNE-EN 124, norma de referencia para las tapas y marcos de registro
 *   en zonas de tráfico peatonal y rodado, con sus clases de carga
 *   (B-125, C-250, D-400), ya citada de forma consistente con el resto
 *   del proyecto.
 * El "nudo tipo para válvulas" (disposición normalizada municipal de
 * válvulas en un cruce de conducciones) es documentación técnica interna
 * del Servicio de Explotación de Redes, explicada por su función sin
 * fabricar su contenido concreto.
 *
 * Tres secciones:
 * 1. camaras-registros-definiciones-pprl-1601
 * 2. arquetas-modelos-anexo-xiii-omecgia
 * 3. tapas-une-en-124-nudo-tipo-trampillos
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-201-camaras-arquetas-nudo-tipo-trampillos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-201";
const OPOSICION = "oficial-guardallaves-ayto-zaragoza";
const BLOQUE_2_ID = "5bb8da57-00c3-4865-a0a1-651b70c85ba0";

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
  titulo: "Cámaras, arquetas en la red de abastecimiento, nudo tipo para válvulas y trampillos",
  descripcion: "Cámaras y registros: definiciones y diferencias (PPRL-1601). Modelos oficiales de arquetas de contadores (Anexo XIII OMECGIA). Tapas de registro (UNE-EN 124), nudo tipo para válvulas y trampillos.",
  contenido: "Desarrolla los alojamientos y accesos a la red de abastecimiento con los que trabaja habitualmente un guardallaves: la diferencia entre cámara y registro conforme al Procedimiento municipal de trabajos en espacios confinados (PPRL-1601), los modelos oficiales de arquetas de contadores del Ayuntamiento de Zaragoza (Anexo XIII de la OMECGIA), las tapas de registro normalizadas por UNE-EN 124 y sus clases de carga, el nudo tipo para la disposición de válvulas en un cruce de conducciones, y los trampillos de acceso.",
  enlaces_boe: [
    "https://www.zaragoza.es/contenidos/medioambiente/Ordenanzaagua.pdf",
  ],
  indice_estudio: [
    { url: "", titulo: "Cámaras y registros: definiciones (PPRL-1601)", seccion: "camaras-registros-definiciones-pprl-1601", articulos: "Ayuntamiento de Zaragoza, PPRL-1601, apartado 5 (Definiciones)" },
    { url: "https://www.zaragoza.es/contenidos/medioambiente/Ordenanzaagua.pdf", titulo: "Modelos oficiales de arquetas de contadores", seccion: "arquetas-modelos-anexo-xiii-omecgia", articulos: "OMECGIA, Anexo XIII" },
    { url: "", titulo: "Tapas de registro (UNE-EN 124), nudo tipo y trampillos", seccion: "tapas-une-en-124-nudo-tipo-trampillos", articulos: "UNE-EN 124; resto, conocimiento técnico del oficio" },
  ],
}]);

const S1 = "camaras-registros-definiciones-pprl-1601";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cómo define el Procedimiento PPRL-1601 del Ayuntamiento de Zaragoza una \"cámara\"?", reverso: "Como aquellos alojamientos visitables que, aunque su acceso pueda realizarse a través de una tapa de registro, disponen junto a esta de una cubierta a base de losas desmontables de hormigón armado (\"cobijas\") que pueden retirarse, si es necesario, para operaciones de mantenimiento o sustitución" },
  { anverso: "¿Cómo define el Procedimiento PPRL-1601 del Ayuntamiento de Zaragoza un \"registro\"?", reverso: "Como aquellos alojamientos visitables cuyo acceso, tanto de personas como de material, se realiza única y exclusivamente a través de la abertura que ocupa la tapa de su marco" },
  { anverso: "¿Cuál es la principal diferencia entre una cámara y un registro, según estas definiciones?", reverso: "La cámara dispone de una vía de acceso complementaria (las losas desmontables o \"cobijas\"), además de la tapa de registro; el registro solo dispone de la propia tapa como único punto de acceso" },
  { anverso: "¿Por qué cita el PPRL-1601 las \"arquetas de registro\" y las \"arquetas llaves maniobra\" en su listado de espacios confinados del Ayuntamiento de Zaragoza?", reverso: "Porque son alojamientos con aberturas de entrada y salida limitadas, ventilación natural desfavorable y, en muchos casos, riesgo de deficiencia de oxígeno o presencia de contaminantes, características propias de un espacio confinado que exigen medidas preventivas especiales para trabajar en ellas" },
  { anverso: "¿Por qué es relevante para un guardallaves distinguir correctamente entre cámara y registro antes de intervenir en uno de estos elementos?", reverso: "Porque determina el modo de acceso disponible (solo por tapa, o también por las losas desmontables), y porque ambos pueden constituir un espacio confinado sujeto al procedimiento PPRL-1601, con sus correspondientes medidas preventivas antes de entrar" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cómo define el PPRL-1601 una \"cámara\"?", explicacion: "Un alojamiento visitable con una cubierta de losas desmontables, además de la tapa de registro.", dificultad: "media", opciones: ["Un alojamiento visitable con losas desmontables, además de la tapa", "Un alojamiento cuyo único acceso es la abertura de su tapa", "Un contador de agua situado en el interior de una finca privada", "Una válvula motorizada instalada en un cruce de conducciones"], correcta: 0 },
  { enunciado: "¿Cómo define el PPRL-1601 un \"registro\"?", explicacion: "Un alojamiento cuyo acceso se realiza única y exclusivamente por la abertura de su tapa.", dificultad: "media", opciones: ["Un alojamiento cuyo acceso se realiza solo por la abertura de su tapa", "Un alojamiento con una cubierta de losas desmontables adicional", "Un elemento exclusivo para la purga de aire de la conducción", "Un elemento exclusivo para la medición del caudal de un sector"], correcta: 0 },
  { enunciado: "¿Cuál es la principal diferencia entre una cámara y un registro según el PPRL-1601?", explicacion: "La cámara tiene una vía de acceso adicional mediante losas desmontables.", dificultad: "dificil", opciones: ["La cámara tiene una vía de acceso adicional mediante losas", "Ambos términos son exactamente equivalentes en el procedimiento", "El registro siempre es de mayor tamaño que la cámara", "La cámara nunca puede considerarse un espacio confinado"], correcta: 0 },
  { enunciado: "¿Por qué cita el PPRL-1601 las arquetas de registro y de llaves de maniobra como espacios confinados?", explicacion: "Por sus aberturas limitadas, ventilación desfavorable y posible deficiencia de oxígeno.", dificultad: "media", opciones: ["Por sus aberturas limitadas y su ventilación desfavorable", "Porque así lo exige exclusivamente la ordenanza fiscal del agua", "Porque su acceso está reservado exclusivamente a personal externo", "Porque no pueden considerarse nunca espacios confinados"], correcta: 0 },
  { enunciado: "¿Por qué es relevante distinguir entre cámara y registro antes de intervenir?", explicacion: "Determina el modo de acceso y ambos pueden ser espacio confinado sujeto al PPRL-1601.", dificultad: "media", opciones: ["Determina el modo de acceso y la aplicación del PPRL-1601", "No aporta ninguna utilidad práctica real para el guardallaves", "Solo es relevante para el personal de nueva incorporación", "Solo es relevante en las zonas de reciente urbanización"], correcta: 0 },
]);

const S2 = "arquetas-modelos-anexo-xiii-omecgia";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué anexo de la OMECGIA recoge los modelos oficiales de arquetas de contadores del Ayuntamiento de Zaragoza?", reverso: "El Anexo XIII, \"Modelos de arquetas de contadores\"" },
  { anverso: "¿A qué deben ajustarse las arquetas de contadores instaladas en Zaragoza, según el Anexo XIII de la OMECGIA?", reverso: "A los planos oficiales municipales correspondientes, cada uno identificado con una referencia (por ejemplo, M-25 o M-21 para arquetas de contador de riego, M-29 para arquetas de contadores de 50-65 mm)" },
  { anverso: "¿Qué modelos concretos, entre otros, recoge el Anexo XIII de la OMECGIA para contadores de tecnología especial?", reverso: "El modelo M-27 (arqueta de contadores electrónicos) y el modelo M-28 (arqueta de contadores electromagnéticos), distintos de los modelos de arqueta convencional" },
  { anverso: "¿Qué modelo del Anexo XIII de la OMECGIA se emplea para tuberías de calibre entre 1 pulgada y 2½ pulgadas?", reverso: "El modelo M-24, \"Armario para contadores de agua potable, tuberías de 1” hasta 2½”\"" },
  { anverso: "¿Por qué es importante que el guardallaves conozca los distintos modelos oficiales de arqueta de contador?", reverso: "Porque le permite identificar si una arqueta encontrada en la red corresponde al modelo reglamentario para su uso concreto (riego, contador convencional, contador electrónico) y detectar instalaciones no conformes con la ordenanza" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué anexo de la OMECGIA recoge los modelos oficiales de arquetas de contadores?", explicacion: "El Anexo XIII.", dificultad: "media", opciones: ["El Anexo XIII", "El Anexo IV", "El Anexo I", "El Anexo VII"], correcta: 0 },
  { enunciado: "¿A qué deben ajustarse las arquetas de contadores instaladas en Zaragoza, según el Anexo XIII de la OMECGIA?", explicacion: "A los planos oficiales municipales correspondientes.", dificultad: "media", opciones: ["A los planos oficiales municipales correspondientes", "A cualquier diseño libremente elegido por el instalador", "Exclusivamente a la normativa estatal de vivienda", "Exclusivamente al criterio particular de cada abonado"], correcta: 0 },
  { enunciado: "¿Qué modelos del Anexo XIII de la OMECGIA corresponden a contadores de tecnología especial?", explicacion: "M-27 (electrónicos) y M-28 (electromagnéticos).", dificultad: "dificil", opciones: ["M-27 y M-28", "M-21 y M-25", "M-29 y M-30", "M-24 y M-26"], correcta: 0 },
  { enunciado: "¿Qué modelo del Anexo XIII se emplea para tuberías de 1 a 2½ pulgadas?", explicacion: "El modelo M-24.", dificultad: "dificil", opciones: ["El modelo M-24", "El modelo M-30", "El modelo M-26", "El modelo M-21"], correcta: 0 },
  { enunciado: "¿Por qué es importante que el guardallaves conozca los distintos modelos de arqueta de contador?", explicacion: "Permite detectar instalaciones no conformes con la ordenanza.", dificultad: "media", opciones: ["Permite detectar instalaciones no conformes con la ordenanza", "No aporta ninguna utilidad práctica en el trabajo diario", "Solo es relevante para el personal de nueva incorporación", "Solo es relevante en las zonas de reciente urbanización"], correcta: 0 },
]);

const S3 = "tapas-une-en-124-nudo-tipo-trampillos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma es la referencia para las tapas y marcos de registro instalados en zonas de tráfico peatonal y rodado?", reverso: "La norma UNE-EN 124" },
  { anverso: "¿Qué clase de carga de la UNE-EN 124 corresponde a zonas peatonales, y cuál a viales de tráfico normal o intenso?", reverso: "La clase B-125 se emplea en zonas peatonales; la clase D-400 en viales de tráfico normal o intenso. La clase C-250 se sitúa en un nivel intermedio, para zonas de tráfico ocasional" },
  { anverso: "¿Qué marcado debe llevar una tapa o marco de registro conforme a UNE-EN 124?", reverso: "El marcado EN 124, la clase de carga correspondiente (por ejemplo, D-400) y el nombre o las iniciales del fabricante y el lugar de fabricación" },
  { anverso: "¿Qué es un nudo tipo para válvulas en la red de abastecimiento?", reverso: "Una disposición normalizada de las válvulas de aislamiento en un cruce o encuentro de conducciones, definida por el Servicio de Explotación de Redes, que facilita identificar de forma homogénea qué válvulas cerrar para aislar cada tramo en un punto característico de la red" },
  { anverso: "¿Qué es un trampillo, en el contexto de los accesos de la red de abastecimiento?", reverso: "Una tapa de acceso de menor tamaño, habitualmente empleada para operaciones puntuales (como la maniobra de una llave de paso individual) que no requieren la apertura completa de una arqueta o registro mayor" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué norma es la referencia para las tapas y marcos de registro en zonas de tráfico peatonal y rodado?", explicacion: "La norma UNE-EN 124.", dificultad: "media", opciones: ["La norma UNE-EN 124", "La norma UNE-EN 1074", "La norma UNE-EN 14339", "La norma UNE-EN 12201"], correcta: 0 },
  { enunciado: "¿Qué clase de carga de la UNE-EN 124 corresponde a viales de tráfico normal o intenso?", explicacion: "La clase D-400.", dificultad: "media", opciones: ["La clase D-400", "La clase B-125", "La clase C-250", "Ninguna clase concreta, al no aplicarse a viales"], correcta: 0 },
  { enunciado: "¿Qué debe incluir el marcado de una tapa de registro conforme a UNE-EN 124?", explicacion: "El marcado EN 124, la clase de carga y los datos del fabricante.", dificultad: "dificil", opciones: ["El marcado EN 124, la clase de carga y los datos del fabricante", "Únicamente el año de fabricación de la tapa", "Únicamente el peso total de la tapa instalada", "Únicamente el color exterior de la tapa instalada"], correcta: 0 },
  { enunciado: "¿Qué es un nudo tipo para válvulas en la red de abastecimiento?", explicacion: "Una disposición normalizada de válvulas en un cruce de conducciones.", dificultad: "media", opciones: ["Una disposición normalizada de válvulas en un cruce de conducciones", "Un contador de agua situado en el interior de una finca privada", "Una tapa de registro de menor tamaño para maniobras puntuales", "Un tipo concreto de material empleado en tuberías de fundición"], correcta: 0 },
  { enunciado: "¿Qué es un trampillo en el contexto de los accesos de la red de abastecimiento?", explicacion: "Una tapa de acceso de menor tamaño para operaciones puntuales.", dificultad: "media", opciones: ["Una tapa de acceso de menor tamaño para operaciones puntuales", "Una disposición normalizada de válvulas en un cruce de conducciones", "Un modelo de arqueta exclusivo para contadores electrónicos", "Un instrumento empleado en el método acústico de detección de fugas"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 21 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 21, orden: 21, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-201 creado y vinculado como Tema 21 de Oficial Guardallaves.");

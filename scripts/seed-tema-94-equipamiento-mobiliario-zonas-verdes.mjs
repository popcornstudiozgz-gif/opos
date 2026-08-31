/**
 * Crea tema-94: "Equipamiento y mobiliario en zonas verdes, montes y
 * riberas" — Tema 9 (numero=9, bloque-2) de Oficial Agente Inspector
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 7 oficial del Anexo I (bases2110.pdf):
 *   "Equipamiento y mobiliario en zonas verdes, montes y riberas:
 *   montaje, reparación y limpieza de fuentes, red de riegos, bancos,
 *   papeleras y señalética; sustitución de piezas dañadas y pintado de
 *   mobiliario urbano; revisión periódica del estado estructural de los
 *   elementos."
 *
 * Conocimiento técnico consolidado de mantenimiento de mobiliario
 * urbano; no requiere cita legal artículo a artículo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-94-equipamiento-mobiliario-zonas-verdes.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-94";
const OPOSICION = "oficial-agente-inspector-ayto-zaragoza";
const BLOQUE_2_ID = "b74ad422-4965-469e-9b9c-ef1a39c26d76";

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
  titulo: "Equipamiento y mobiliario en zonas verdes, montes y riberas",
  descripcion: "Montaje, reparación y limpieza de fuentes, red de riegos, bancos, papeleras y señalética. Sustitución de piezas dañadas y pintado de mobiliario urbano. Revisión periódica del estado estructural.",
  contenido: "Desarrolla el montaje, reparación y limpieza de los elementos de equipamiento y mobiliario urbano propios de zonas verdes, montes y riberas (fuentes, red de riegos, bancos, papeleras, señalética), la sustitución de piezas dañadas y el pintado, y la revisión periódica del estado estructural de estos elementos.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Fuentes y red de riegos: montaje, reparación y limpieza", seccion: "fuentes-red-riegos-mantenimiento", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Bancos, papeleras y señalética", seccion: "bancos-papeleras-senaletica", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Sustitución de piezas, pintado y revisión estructural", seccion: "sustitucion-piezas-pintado-revision", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "fuentes-red-riegos-mantenimiento";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué elementos básicos componen una fuente ornamental o de agua potable de un parque?", reverso: "El surtidor o grifo, la red de fontanería de alimentación, el vaso o pilón de recogida, y en su caso el sistema de recirculación y filtrado del agua" },
  { anverso: "¿Qué avería habitual presenta una fuente de agua potable de uso público?", reverso: "Obstrucción del grifo o surtidor por cal o suciedad, fugas en las conexiones, o fallo del pulsador temporizado que corta el paso de agua" },
  { anverso: "¿Qué mantenimiento periódico requiere una fuente ornamental con recirculación de agua?", reverso: "Limpieza del vaso y del filtro, comprobación del funcionamiento de la bomba de recirculación, y control de la calidad del agua para evitar la proliferación de algas o mal olor" },
  { anverso: "¿Qué elementos de la red de riegos de una zona verde requieren revisión periódica?", reverso: "Aspersores y goteros (obstrucciones, roturas), electroválvulas, el programador de riego, y las uniones y tuberías del circuito frente a posibles fugas" },
  { anverso: "¿Qué precaución debe seguirse al reparar una fuga en la red de riegos de un parque con presencia de visitantes?", reverso: "Señalizar la zona de trabajo, cortar el suministro de agua del sector afectado antes de intervenir, y reponer el pavimento o césped afectado tras la reparación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué elementos componen una fuente ornamental con recirculación?", explicacion: "Surtidor, red de alimentación, vaso de recogida y sistema de recirculación/filtrado.", dificultad: "media", opciones: ["Surtidor, alimentación, vaso y recirculación", "Únicamente el grifo de agua potable", "Únicamente la papelera adyacente", "Únicamente el banco cercano"], correcta: 0 },
  { enunciado: "¿Qué avería es habitual en una fuente de agua potable pública?", explicacion: "Obstrucción por cal, fugas o fallo del pulsador temporizado.", dificultad: "media", opciones: ["Obstrucción, fugas o fallo del pulsador", "Rotura del filtro de arena de sílice", "Fallo del programador de riego", "Deterioro de la pintura del banco"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento requiere una fuente ornamental con recirculación?", explicacion: "Limpieza del vaso/filtro, comprobación de la bomba y control de calidad del agua.", dificultad: "media", opciones: ["Limpieza, comprobación de bomba y calidad del agua", "Ningún mantenimiento periódico", "Solo pintado anual de la estructura", "Solo sustitución del grifo cada año"], correcta: 0 },
  { enunciado: "¿Qué elementos de la red de riegos requieren revisión periódica?", explicacion: "Aspersores, goteros, electroválvulas, programador y tuberías.", dificultad: "media", opciones: ["Aspersores, electroválvulas y tuberías", "Únicamente las papeleras del parque", "Únicamente los bancos de madera", "Únicamente la señalética informativa"], correcta: 0 },
  { enunciado: "¿Qué precaución debe seguirse al reparar una fuga de riego en un parque con visitantes?", explicacion: "Señalizar la zona y cortar el suministro antes de intervenir.", dificultad: "media", opciones: ["Señalizar la zona y cortar el suministro", "No es necesaria ninguna precaución", "Reparar sin cortar el agua nunca", "Cerrar el parque completo siempre"], correcta: 0 },
]);

const S2 = "bancos-papeleras-senaletica";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué materiales son habituales en la fabricación de bancos de mobiliario urbano?", reverso: "Madera tratada, fundición o perfilería metálica, hormigón prefabricado, y combinaciones de estos materiales (estructura metálica con listones de madera o plástico reciclado)" },
  { anverso: "¿Qué desperfectos habituales presenta un banco de madera expuesto a la intemperie?", reverso: "Astillamiento o rotura de listones, aflojamiento de la tornillería de fijación, y deterioro del tratamiento protector frente a la humedad" },
  { anverso: "¿Qué tipos de papeleras son habituales en parques y zonas verdes según su sistema de vaciado?", reverso: "Papeleras con bolsa interior extraíble, papeleras basculantes, y papeleras con cubo removible; algunas incorporan separación para reciclaje" },
  { anverso: "¿Qué avería es habitual en una papelera de anclaje fijo tras un uso prolongado?", reverso: "El aflojamiento o rotura del anclaje al suelo, la deformación de la boca de vertido, o el deterioro de la tapa/mecanismo basculante" },
  { anverso: "¿Qué es la señalética en un parque, monte o ribera?", reverso: "El conjunto de paneles, carteles y señales que informan sobre normas de uso, orientación, itinerarios, especies presentes o advertencias de seguridad en el espacio" },
  { anverso: "¿Qué mantenimiento requiere la señalética exterior de un parque o monte?", reverso: "Comprobar la legibilidad del texto (deterioro por sol/lluvia), la firmeza del soporte o poste, y la limpieza frente a pintadas o suciedad acumulada" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué materiales son habituales en bancos de mobiliario urbano?", explicacion: "Madera tratada, metal y hormigón prefabricado.", dificultad: "facil", opciones: ["Madera tratada, metal y hormigón", "Únicamente plástico reciclado", "Únicamente vidrio templado", "Únicamente piedra natural"], correcta: 0 },
  { enunciado: "¿Qué desperfecto es habitual en un banco de madera a la intemperie?", explicacion: "Astillamiento de listones y aflojamiento de tornillería.", dificultad: "media", opciones: ["Astillamiento y aflojamiento de tornillería", "Oxidación del hormigón prefabricado", "Rotura del filtro de la fuente cercana", "Fallo del programador de riego"], correcta: 0 },
  { enunciado: "¿Qué tipos de papeleras son habituales según su sistema de vaciado?", explicacion: "Con bolsa extraíble, basculantes y con cubo removible.", dificultad: "media", opciones: ["Bolsa extraíble, basculantes y cubo removible", "Solo papeleras fijas sin vaciado", "Solo papeleras subterráneas", "Solo papeleras de vidrio"], correcta: 0 },
  { enunciado: "¿Qué avería es habitual en una papelera de anclaje fijo?", explicacion: "Aflojamiento del anclaje o deterioro del mecanismo basculante.", dificultad: "media", opciones: ["Aflojamiento del anclaje o deterioro del mecanismo", "Rotura del vaso de la fuente", "Fallo del aspersor de riego", "Deterioro de la señalética informativa"], correcta: 0 },
  { enunciado: "¿Qué es la señalética en un parque o monte?", explicacion: "Paneles y carteles informativos sobre normas, orientación o advertencias.", dificultad: "facil", opciones: ["Paneles informativos de normas y orientación", "El sistema de riego automático", "El conjunto de bancos y papeleras", "La red eléctrica del parque"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento requiere la señalética exterior?", explicacion: "Legibilidad, firmeza del soporte y limpieza frente a pintadas.", dificultad: "media", opciones: ["Legibilidad, firmeza del soporte y limpieza", "No requiere ningún mantenimiento", "Solo sustitución anual completa", "Solo revisión eléctrica"], correcta: 0 },
]);

const S3 = "sustitucion-piezas-pintado-revision";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué criterio debe seguirse al sustituir una pieza dañada de mobiliario urbano (por ejemplo, un listón de banco)?", reverso: "Emplear una pieza de material y dimensiones compatibles con el conjunto original, fijándola con el mismo sistema de anclaje para mantener la resistencia y el aspecto homogéneo del elemento" },
  { anverso: "¿Qué producto es habitual para el pintado de protección de mobiliario urbano metálico?", reverso: "Pintura antioxidante o esmalte de protección exterior, resistente a la intemperie, aplicada tras una preparación previa de la superficie (lijado, eliminación de óxido)" },
  { anverso: "¿Qué mantenimiento de la madera de un banco o mesa exterior evita su deterioro prematuro?", reverso: "La aplicación periódica de barniz o lasur protector que sella la madera frente a la humedad y los rayos UV" },
  { anverso: "¿Qué es la revisión periódica del estado estructural del mobiliario urbano?", reverso: "La inspección sistemática de anclajes, soldaduras, uniones y elementos de fijación de bancos, papeleras, fuentes y señalética, para detectar deterioro que pueda comprometer la seguridad de las personas usuarias" },
  { anverso: "¿Qué debe hacerse ante un elemento de mobiliario urbano con un defecto estructural grave (por ejemplo, un banco con anclaje suelto)?", reverso: "Retirarlo de uso o señalizarlo como fuera de servicio de inmediato, y proceder a su reparación o sustitución antes de permitir su uso, priorizando la seguridad de las personas" },
  { anverso: "¿Por qué es importante llevar un registro de las incidencias y reparaciones del mobiliario urbano de un parque?", reverso: "Para planificar el mantenimiento preventivo, detectar elementos con averías recurrentes que puedan requerir sustitución completa, y disponer de trazabilidad ante una posible reclamación por daños" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué criterio debe seguirse al sustituir una pieza dañada de mobiliario urbano?", explicacion: "Usar material y dimensiones compatibles con el conjunto original.", dificultad: "media", opciones: ["Usar material y dimensiones compatibles", "Usar cualquier material disponible sin criterio", "No es necesario fijarla con el mismo sistema", "Sustituir siempre el elemento completo"], correcta: 0 },
  { enunciado: "¿Qué producto se usa para proteger mobiliario urbano metálico?", explicacion: "Pintura antioxidante o esmalte de protección exterior.", dificultad: "facil", opciones: ["Pintura antioxidante o esmalte exterior", "Barniz de madera exclusivamente", "Cera para suelos", "Ningún producto es necesario"], correcta: 0 },
  { enunciado: "¿Qué evita la aplicación periódica de barniz o lasur en madera exterior?", explicacion: "El deterioro prematuro por humedad y rayos UV.", dificultad: "media", opciones: ["El deterioro por humedad y rayos UV", "La oxidación de piezas metálicas", "El fallo del programador de riego", "La obstrucción de la fuente"], correcta: 0 },
  { enunciado: "¿Qué es la revisión periódica del estado estructural del mobiliario urbano?", explicacion: "Inspección sistemática de anclajes y uniones para detectar deterioro.", dificultad: "media", opciones: ["Inspección de anclajes y uniones", "El pintado anual del mobiliario", "El riego de las zonas verdes cercanas", "La limpieza de la señalética"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse ante un banco con anclaje suelto y defecto estructural grave?", explicacion: "Retirarlo de uso o señalizarlo fuera de servicio de inmediato.", dificultad: "media", opciones: ["Retirarlo o señalizarlo fuera de servicio", "Dejarlo en uso hasta la próxima revisión", "Repararlo sin retirarlo del uso público", "Ignorarlo si no hay quejas de usuarios"], correcta: 0 },
  { enunciado: "¿Por qué es importante registrar las incidencias y reparaciones del mobiliario urbano?", explicacion: "Para planificar mantenimiento preventivo y tener trazabilidad ante reclamaciones.", dificultad: "media", opciones: ["Para planificar mantenimiento y tener trazabilidad", "No aporta ninguna utilidad práctica", "Solo sirve para facturar a terceros", "Sustituye a la revisión estructural"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 9 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 9, orden: 9, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-94 creado y vinculado como Tema 9 de Oficial Agente Inspector.");

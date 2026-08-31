/**
 * Crea tema-98: "Mantenimiento de vías y espacios públicos" — Tema 13
 * (numero=13, bloque-2) de Oficial Agente Inspector (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 11 oficial del Anexo I (bases2110.pdf):
 *   "Mantenimiento de vías y espacios públicos: de señalización; control
 *   de la vegetación no deseada en bordillos y arcenes. Creación,
 *   ejecución y mantenimiento de caminos. Partes de la vía pública.
 *   Señalizaciones. Mantenimiento de vías y espacios públicos.Ordenanza
 *   municipal de protección del arbolado."
 *
 * Fuente primaria verificada en este turno: Ordenanza de Protección del
 * Arbolado Urbano de Zaragoza, aprobada definitivamente el 31 de mayo de
 * 2013 (https://www.zaragoza.es/sede/servicio/normativa/4084) —
 * establece el marco de protección, conservación y catalogación del
 * arbolado urbano, con un régimen especial para ejemplares singulares.
 * El resto del contenido (partes de la vía pública, señalización,
 * control de vegetación en bordillos, caminos) se trata como
 * conocimiento técnico consolidado de mantenimiento viario.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-98-mantenimiento-vias-espacios-publicos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-98";
const OPOSICION = "oficial-agente-inspector-ayto-zaragoza";
const BLOQUE_2_ID = "b74ad422-4965-469e-9b9c-ef1a39c26d76";
const ORD_ARBOLADO = "https://www.zaragoza.es/sede/servicio/normativa/4084";

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
  titulo: "Mantenimiento de vías y espacios públicos",
  descripcion: "Partes de la vía pública y señalización. Control de vegetación en bordillos y arcenes. Creación y mantenimiento de caminos. Ordenanza de Protección del Arbolado Urbano de Zaragoza.",
  contenido: "Desarrolla las partes básicas de la vía pública y su señalización, el control de la vegetación no deseada en bordillos y arcenes, la creación, ejecución y mantenimiento de caminos, y la Ordenanza de Protección del Arbolado Urbano de Zaragoza (2013).",
  enlaces_boe: [
    { url: ORD_ARBOLADO, titulo: "Ordenanza de Protección del Arbolado Urbano de Zaragoza (2013)" },
  ],
  indice_estudio: [
    { url: "", titulo: "Partes de la vía pública y señalización", seccion: "partes-via-publica-senalizacion", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Control de vegetación en bordillos, arcenes y caminos", seccion: "control-vegetacion-bordillos-caminos", articulos: "Conceptos fundamentales" },
    { url: ORD_ARBOLADO, titulo: "Ordenanza de Protección del Arbolado Urbano de Zaragoza", seccion: "ordenanza-proteccion-arbolado-urbano", articulos: "Aprobada 31/05/2013" },
  ],
}]);

const S1 = "partes-via-publica-senalizacion";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué partes básicas componen habitualmente una vía pública urbana?", reverso: "La calzada (destinada a la circulación de vehículos), la acera (destinada al tránsito peatonal), el bordillo (elemento que separa ambas), y en su caso el arcén (franja lateral de la calzada)" },
  { anverso: "¿Qué es el arcén de una vía?", reverso: "La franja lateral de la calzada, no destinada a la circulación normal de vehículos, que puede servir de zona de emergencia, tránsito ocasional o soporte a elementos de la vía" },
  { anverso: "¿Qué es la señalización vertical de una vía pública?", reverso: "El conjunto de señales instaladas sobre soportes (postes, pórticos) que informan, advierten o regulan la circulación (señales de tráfico, informativas, de obras)" },
  { anverso: "¿Qué es la señalización horizontal de una vía pública?", reverso: "Las marcas pintadas directamente sobre el pavimento (líneas de carril, pasos de peatones, flechas de dirección) que regulan y orientan la circulación de vehículos y peatones" },
  { anverso: "¿Qué avería habitual presenta la señalización horizontal con el paso del tiempo y el uso?", reverso: "El desgaste y pérdida de visibilidad de la pintura por el rodamiento de vehículos, la climatología y la abrasión, requiriendo repintado periódico" },
  { anverso: "¿Qué debe comprobarse en una señal vertical dañada o derribada detectada durante una inspección?", reverso: "Su estabilidad, legibilidad y correcta orientación; si supone un riesgo (caída, obstrucción de visibilidad), debe comunicarse con carácter urgente para su reparación o sustitución" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué partes básicas componen habitualmente una vía pública urbana?", explicacion: "Calzada, acera, bordillo y, en su caso, arcén.", dificultad: "facil", opciones: ["Calzada, acera, bordillo y arcén", "Únicamente la calzada", "Únicamente la acera peatonal", "Únicamente el bordillo"], correcta: 0 },
  { enunciado: "¿Qué es el arcén de una vía?", explicacion: "La franja lateral de la calzada no destinada a circulación normal.", dificultad: "media", opciones: ["La franja lateral no destinada a circulación normal", "La zona exclusiva de tránsito peatonal", "El elemento que separa calzada y acera", "Un tipo de señal vertical"], correcta: 0 },
  { enunciado: "¿Qué es la señalización vertical de una vía pública?", explicacion: "Señales sobre soportes que informan, advierten o regulan la circulación.", dificultad: "media", opciones: ["Señales sobre soportes que regulan la circulación", "Marcas pintadas directamente en el pavimento", "El bordillo que separa calzada y acera", "El arcén lateral de la calzada"], correcta: 0 },
  { enunciado: "¿Qué es la señalización horizontal?", explicacion: "Marcas pintadas sobre el pavimento que regulan y orientan la circulación.", dificultad: "media", opciones: ["Marcas pintadas sobre el pavimento", "Señales sobre postes o pórticos", "El bordillo de la vía pública", "Un tipo de arcén lateral"], correcta: 0 },
  { enunciado: "¿Qué avería es habitual en la señalización horizontal con el tiempo?", explicacion: "Desgaste y pérdida de visibilidad por rodamiento y climatología.", dificultad: "media", opciones: ["Desgaste y pérdida de visibilidad de la pintura", "Corrosión del poste de soporte", "Rotura del bordillo de la acera", "Obstrucción por vegetación exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse ante una señal vertical dañada que supone un riesgo?", explicacion: "Comunicarlo con carácter urgente para su reparación o sustitución.", dificultad: "media", opciones: ["Comunicarlo con carácter urgente", "Ignorarlo hasta la siguiente revisión anual", "Repararla uno mismo sin formación específica", "Retirarla sin comunicarlo a nadie"], correcta: 0 },
]);

const S2 = "control-vegetacion-bordillos-caminos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Por qué debe controlarse la vegetación espontánea que crece en bordillos, aceras y arcenes?", reverso: "Porque puede dañar el pavimento (levantamiento de losetas, grietas), dificultar la circulación peatonal, reducir la visibilidad de la señalización, y dar una imagen de abandono del espacio público" },
  { anverso: "¿Qué métodos se emplean habitualmente para el control de vegetación no deseada en bordillos y arcenes?", reverso: "El arranque manual o mecánico (cepillado, rascado), el uso puntual de herbicidas autorizados donde proceda, y, cada vez más, métodos térmicos (agua caliente, vapor) como alternativa sin productos químicos" },
  { anverso: "¿Qué es un camino en el contexto de espacios públicos municipales (parques, montes)?", reverso: "Una vía de tránsito, habitualmente sin pavimentar o con firme ligero (zahorra, tierra compactada), destinada al paso peatonal, ciclista o de vehículos de mantenimiento en espacios naturales o periurbanos" },
  { anverso: "¿Qué labores incluye la creación de un nuevo camino en un espacio natural o periurbano?", reverso: "El trazado según la topografía y usos previstos, el desbroce y preparación del terreno, la nivelación, y en su caso la aportación de firme (zahorra u otro material compactable) para mejorar su tránsito" },
  { anverso: "¿Qué mantenimiento periódico requiere un camino de tierra o zahorra en un espacio natural?", reverso: "Reparación de baches o socavones, control de la vegetación invasora en sus márgenes, limpieza de cunetas de desagüe, y reposición del firme en tramos degradados por erosión" },
  { anverso: "¿Qué relación existe entre el mal estado de un camino y el riesgo de erosión en zonas con pendiente?", reverso: "Un camino mal drenado o sin mantenimiento puede concentrar el agua de lluvia, acelerando la erosión del propio camino y de las zonas adyacentes, especialmente en pendientes pronunciadas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Por qué debe controlarse la vegetación espontánea en bordillos y aceras?", explicacion: "Puede dañar el pavimento, dificultar el tránsito y reducir la visibilidad de señales.", dificultad: "media", opciones: ["Puede dañar pavimento y dificultar el tránsito", "No supone ningún problema real", "Mejora siempre la seguridad vial", "Solo afecta a la estética, sin más efectos"], correcta: 0 },
  { enunciado: "¿Qué métodos se emplean para el control de vegetación en bordillos y arcenes?", explicacion: "Arranque manual/mecánico, herbicidas autorizados y métodos térmicos.", dificultad: "media", opciones: ["Arranque, herbicidas autorizados y métodos térmicos", "Únicamente el riego intensivo de la zona", "Únicamente la poda de arbolado cercano", "No existe ningún método de control"], correcta: 0 },
  { enunciado: "¿Qué es un camino en espacios públicos municipales como parques o montes?", explicacion: "Una vía de tránsito sin pavimentar o con firme ligero.", dificultad: "media", opciones: ["Una vía de tránsito sin pavimentar o con firme ligero", "Una calzada asfaltada para tráfico rodado intenso", "Un tipo de señalización horizontal", "Un elemento de mobiliario urbano"], correcta: 0 },
  { enunciado: "¿Qué labores incluye la creación de un nuevo camino?", explicacion: "Trazado, desbroce, nivelación y aportación de firme.", dificultad: "media", opciones: ["Trazado, desbroce, nivelación y firme", "Únicamente pintar señalización horizontal", "Únicamente instalar mobiliario urbano", "No requiere ninguna labor previa"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento periódico requiere un camino de tierra en un espacio natural?", explicacion: "Reparación de baches, control de vegetación y limpieza de cunetas.", dificultad: "media", opciones: ["Reparación de baches y limpieza de cunetas", "No requiere ningún mantenimiento periódico", "Solo pintar la señalización horizontal", "Solo revisar el arbolado cercano"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el mal estado de un camino y la erosión en pendientes?", explicacion: "Un camino mal drenado acelera la erosión del propio camino y su entorno.", dificultad: "media", opciones: ["Acelera la erosión del camino y su entorno", "No tiene ninguna relación con la erosión", "Reduce siempre el riesgo de erosión", "Solo afecta a caminos asfaltados"], correcta: 0 },
]);

const S3 = "ordenanza-proteccion-arbolado-urbano";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la Ordenanza de Protección del Arbolado Urbano de Zaragoza y cuándo se aprobó?", reverso: "La norma municipal que regula de forma integral cualquier actuación sobre el arbolado en materia de protección, conservación y catalogación; fue aprobada definitivamente el 31 de mayo de 2013" },
  { anverso: "¿Qué régimen especial establece la Ordenanza de Protección del Arbolado Urbano para determinados ejemplares?", reverso: "Un régimen de protección especial para árboles singulares, por su rareza, interés cultural, ambiental o social, sometidos a mayores garantías frente a su tala o daño" },
  { anverso: "¿Qué tipo de actuaciones sobre el arbolado urbano regula esta ordenanza?", reverso: "Las actuaciones de plantación, poda, trasplante, tala y cualquier intervención que afecte a árboles situados en el término municipal de Zaragoza, tanto en espacios públicos como, en determinados supuestos, privados" },
  { anverso: "¿Qué otras ordenanzas municipales de Zaragoza, anteriores a la de 2013, regulan también las zonas verdes?", reverso: "Las Ordenanzas Municipales de 1979 (normas para la redacción de proyectos de parques y jardines) y de 1986 (uso de zonas verdes), que siguen aplicándose en lo no derogado por normativa posterior" },
  { anverso: "¿Por qué es importante para un agente inspector conocer la Ordenanza de Protección del Arbolado antes de autorizar o valorar una intervención sobre un árbol?", reverso: "Porque determinadas actuaciones (especialmente sobre ejemplares catalogados o singulares) pueden requerir autorización específica o estar sometidas a mayores restricciones que una intervención ordinaria" },
  { anverso: "¿Qué papel puede tener el agente inspector en la aplicación práctica de la Ordenanza de Protección del Arbolado?", reverso: "Detectar posibles infracciones (talas o daños no autorizados a arbolado protegido), verificar el cumplimiento de las condiciones de protección, y elaborar los informes o denuncias que correspondan" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuándo se aprobó definitivamente la Ordenanza de Protección del Arbolado Urbano de Zaragoza?", explicacion: "El 31 de mayo de 2013.", dificultad: "media", opciones: ["El 31 de mayo de 2013", "El 30 de septiembre de 2008", "El 19 de septiembre de 2002", "El 27 de julio de 2026"], correcta: 0 },
  { enunciado: "¿Qué régimen especial establece esta ordenanza?", explicacion: "Un régimen de protección especial para árboles singulares.", dificultad: "media", opciones: ["Protección especial para árboles singulares", "Prohibición total de cualquier poda", "Un catálogo exclusivo de especies invasoras", "Un régimen fiscal sobre el arbolado"], correcta: 0 },
  { enunciado: "¿Qué tipo de actuaciones regula la Ordenanza de Protección del Arbolado?", explicacion: "Plantación, poda, trasplante y tala de árboles del término municipal.", dificultad: "media", opciones: ["Plantación, poda, trasplante y tala", "Únicamente el riego de zonas verdes", "Únicamente la limpieza de calles", "Únicamente la señalización viaria"], correcta: 0 },
  { enunciado: "¿Qué ordenanzas municipales anteriores a 2013 regulan también las zonas verdes de Zaragoza?", explicacion: "Las de 1979 (proyectos de parques y jardines) y 1986 (uso de zonas verdes).", dificultad: "dificil", opciones: ["Las de 1979 y 1986", "No existe normativa anterior a 2013", "Solo la de 1986", "Solo la de 1979"], correcta: 0 },
  { enunciado: "¿Por qué es importante conocer esta ordenanza antes de valorar una intervención sobre un árbol?", explicacion: "Ejemplares catalogados o singulares pueden requerir autorización específica.", dificultad: "media", opciones: ["Pueden requerir autorización específica", "Todas las intervenciones son siempre libres", "Solo aplica a árboles fuera del municipio", "No afecta a decisiones de mantenimiento"], correcta: 0 },
  { enunciado: "¿Qué papel tiene el agente inspector en la aplicación de esta ordenanza?", explicacion: "Detectar infracciones, verificar el cumplimiento y elaborar informes/denuncias.", dificultad: "media", opciones: ["Detectar infracciones y elaborar informes", "Ningún papel, es competencia exclusiva de otro servicio", "Solo puede actuar sobre especies invasoras", "Solo puede actuar en montes, no en zona urbana"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 13 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 13, orden: 13, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-98 creado y vinculado como Tema 13 de Oficial Agente Inspector.");

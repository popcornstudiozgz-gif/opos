/**
 * Crea tema-96: "Seguridad y prevención de riesgos en trabajos de zonas
 * verdes, montes y riberas" — Tema 11 (numero=11, bloque-2) de Oficial
 * Agente Inspector (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 9 oficial del Anexo I (bases2110.pdf):
 *   "Seguridad y prevención de riesgos en trabajos en de zonas verdes,
 *   montes y riberas: uso de herramientas y maquinaria de forma segura;
 *   identificación de riesgos asociados al trabajo al aire libre;
 *   aplicación de primeros auxilios. Seguridad y salud en trabajos de
 *   manipulación segura de residuos peligrosos o contaminados; uso
 *   adecuado de equipos de protección personal (guantes, mascarillas...);
 *   protocolos de actuación en caso de contacto con residuos tóxicos."
 *
 * Fuente primaria: Ley 31/1995, de Prevención de Riesgos Laborales
 * (BOE-A-1995-24292, ya verificada en tema-76). Contenido de riesgos
 * específicos del trabajo al aire libre y primeros auxilios tratado
 * como conocimiento técnico consolidado de seguridad laboral.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-96-seguridad-prl-zonas-verdes-montes.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-96";
const OPOSICION = "oficial-agente-inspector-ayto-zaragoza";
const BLOQUE_2_ID = "b74ad422-4965-469e-9b9c-ef1a39c26d76";
const LEY_31_1995 = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292";

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
  titulo: "Seguridad y prevención de riesgos en trabajos de zonas verdes, montes y riberas",
  descripcion: "Uso seguro de herramientas y maquinaria. Riesgos del trabajo al aire libre y primeros auxilios. Manipulación segura de residuos peligrosos. Equipos de protección individual.",
  contenido: "Desarrolla el uso seguro de herramientas y maquinaria de jardinería/forestal, la identificación de riesgos propios del trabajo al aire libre y las nociones básicas de primeros auxilios, la manipulación segura de residuos peligrosos o contaminados, y el uso adecuado de equipos de protección individual con los protocolos de actuación ante contacto con residuos tóxicos.",
  enlaces_boe: [
    { url: LEY_31_1995, titulo: "Ley 31/1995 — Prevención de Riesgos Laborales" },
  ],
  indice_estudio: [
    { url: "", titulo: "Uso seguro de herramientas y maquinaria", seccion: "uso-seguro-herramientas-maquinaria", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Riesgos del trabajo al aire libre y primeros auxilios", seccion: "riesgos-trabajo-aire-libre-primeros-auxilios", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Manipulación de residuos peligrosos y EPI", seccion: "manipulacion-residuos-peligrosos-epi", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "uso-seguro-herramientas-maquinaria";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué comprobación básica debe hacerse antes de usar una motosierra, desbrozadora u otra máquina de motor?", reverso: "Revisar el estado general de la máquina (niveles, cuchillas/cadena, protecciones), comprobar que los dispositivos de seguridad (frenos, resguardos) funcionan correctamente, y verificar que se dispone del EPI adecuado" },
  { anverso: "¿Qué distancia de seguridad debe mantenerse respecto a otra persona al trabajar con una desbrozadora o motosierra?", reverso: "Una distancia mínima suficiente (habitualmente varios metros) para evitar el riesgo de proyección de objetos o contacto accidental con el elemento de corte" },
  { anverso: "¿Qué riesgo específico presenta el uso de una motosierra frente al de otras herramientas de corte?", reverso: "El riesgo de rebote (kickback o coz), un movimiento brusco e incontrolado de la barra que puede causar lesiones graves si la punta de la cadena entra en contacto inesperado con un objeto" },
  { anverso: "¿Qué precaución debe seguirse al transportar herramientas de corte (tijeras de podar, sierras) entre distintas ubicaciones de trabajo?", reverso: "Proteger el filo con su funda o protector correspondiente, y transportarlas de forma que no supongan riesgo de corte accidental para quien las porta o para terceros" },
  { anverso: "¿Qué mantenimiento básico de seguridad requiere la maquinaria de motor de combustión antes de cada jornada?", reverso: "Comprobar niveles de combustible y aceite, el estado del filtro de aire, y el afilado o estado del elemento de corte, evitando el uso de maquinaria con desperfectos visibles" },
  { anverso: "¿Qué debe hacerse si se detecta un fallo de seguridad en una máquina (por ejemplo, un resguardo roto)?", reverso: "Retirar la máquina de uso inmediatamente, señalizarla como fuera de servicio, y comunicarlo para su reparación antes de volver a utilizarla" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué debe comprobarse antes de usar una motosierra o desbrozadora?", explicacion: "Estado general, dispositivos de seguridad y disponibilidad del EPI adecuado.", dificultad: "media", opciones: ["Estado general, seguridad y EPI adecuado", "Solo el nivel de combustible", "Solo el color de la carcasa", "No es necesaria ninguna comprobación previa"], correcta: 0 },
  { enunciado: "¿Por qué debe mantenerse una distancia de seguridad al trabajar con desbrozadora o motosierra?", explicacion: "Para evitar proyección de objetos o contacto accidental con el elemento de corte.", dificultad: "media", opciones: ["Evitar proyección de objetos o contacto accidental", "No influye en la seguridad del trabajo", "Solo es relevante en interiores", "Solo aplica en trabajos nocturnos"], correcta: 0 },
  { enunciado: "¿Qué es el 'rebote' o kickback de una motosierra?", explicacion: "Un movimiento brusco de la barra al contactar la punta con un objeto inesperado.", dificultad: "media", opciones: ["Un movimiento brusco de la barra por contacto inesperado", "Un fallo del filtro de aire", "Un tipo de mantenimiento preventivo", "Un tipo de EPI de protección"], correcta: 0 },
  { enunciado: "¿Qué precaución debe seguirse al transportar herramientas de corte entre ubicaciones?", explicacion: "Proteger el filo con funda o protector correspondiente.", dificultad: "media", opciones: ["Proteger el filo con funda o protector", "Transportarlas sin ninguna protección", "Llevarlas siempre desenfundadas", "No es necesaria ninguna precaución"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento de seguridad requiere la maquinaria de combustión antes de cada jornada?", explicacion: "Niveles, filtro de aire y estado del elemento de corte.", dificultad: "media", opciones: ["Niveles, filtro de aire y elemento de corte", "Ningún mantenimiento diario es necesario", "Solo lavar la carcasa exterior", "Solo revisar el color de la pintura"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse ante un fallo de seguridad detectado en una máquina?", explicacion: "Retirarla de uso, señalizarla y comunicarlo para su reparación.", dificultad: "media", opciones: ["Retirarla de uso y comunicar el fallo", "Seguir usándola con precaución adicional", "Repararla uno mismo sin formación específica", "Ignorarlo si el fallo parece menor"], correcta: 0 },
]);

const S2 = "riesgos-trabajo-aire-libre-primeros-auxilios";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el riesgo de exposición solar prolongada en trabajos al aire libre y cómo se previene?", reverso: "El riesgo de quemaduras, golpe de calor o efectos acumulativos a largo plazo por radiación UV; se previene con protección solar, ropa adecuada, hidratación frecuente y, si es posible, evitando las horas de máxima radiación" },
  { anverso: "¿Qué es un golpe de calor y qué síntomas presenta?", reverso: "Una elevación peligrosa de la temperatura corporal por exposición prolongada al calor sin hidratación suficiente; cursa con piel caliente y seca, confusión, mareo, y en casos graves pérdida de consciencia, requiriendo atención médica urgente" },
  { anverso: "¿Qué primera actuación básica debe realizarse ante una sospecha de golpe de calor en un compañero de trabajo?", reverso: "Trasladarlo a un lugar fresco y sombreado, aflojar su ropa, refrescarlo con agua, e hidratarlo si está consciente, avisando de inmediato a los servicios de emergencia" },
  { anverso: "¿Qué riesgo presenta el trabajo en terrenos irregulares propios de montes y riberas?", reverso: "El riesgo de caídas, esguinces o torceduras por desniveles, piedras sueltas, raíces o vegetación que oculta el terreno" },
  { anverso: "¿Qué riesgo biológico es propio del trabajo al aire libre en zonas de vegetación y montes?", reverso: "Picaduras o mordeduras de insectos, garrapatas (con riesgo de enfermedades transmitidas) y, en menor medida, contacto con animales silvestres o plantas urticantes/tóxicas" },
  { anverso: "¿Qué es la posición lateral de seguridad y cuándo se aplica en primeros auxilios?", reverso: "Una postura que se coloca a una persona inconsciente que respira con normalidad, para evitar que se ahogue con sus propios vómitos o secreciones mientras se espera la llegada de asistencia médica" },
  { anverso: "¿Qué debe hacerse ante una herida por corte con herramienta durante un trabajo de campo?", reverso: "Aplicar presión directa con material limpio para controlar la hemorragia, elevar la zona afectada si es posible, y trasladar a la persona a un centro sanitario si la herida es profunda o no cesa el sangrado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Cómo se previene el riesgo de exposición solar prolongada?", explicacion: "Con protección solar, ropa adecuada, hidratación y evitando horas de máxima radiación.", dificultad: "media", opciones: ["Protección solar, ropa adecuada e hidratación", "No existe forma de prevenirlo", "Solo trabajando exclusivamente de noche", "Solo con gafas de sol, sin más medidas"], correcta: 0 },
  { enunciado: "¿Qué es un golpe de calor?", explicacion: "Una elevación peligrosa de la temperatura corporal por exposición prolongada al calor.", dificultad: "media", opciones: ["Elevación peligrosa de la temperatura corporal", "Una quemadura solar leve en la piel", "Una picadura de insecto infectada", "Un esguince por terreno irregular"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse ante una sospecha de golpe de calor en un compañero?", explicacion: "Trasladarlo a lugar fresco, aflojar ropa, refrescarlo e hidratarlo, avisando a emergencias.", dificultad: "media", opciones: ["Lugar fresco, refrescarlo y avisar a emergencias", "Hacerle beber alcohol para reanimarlo", "Dejarlo trabajando hasta que mejore solo", "Aplicar únicamente frío en la cabeza sin más acción"], correcta: 0 },
  { enunciado: "¿Qué riesgo presenta el trabajo en terreno irregular de montes y riberas?", explicacion: "Caídas, esguinces o torceduras por desniveles y obstáculos.", dificultad: "facil", opciones: ["Caídas, esguinces y torceduras", "Riesgo eléctrico exclusivamente", "Riesgo de legionela exclusivamente", "Ningún riesgo relevante"], correcta: 0 },
  { enunciado: "¿Cuándo se aplica la posición lateral de seguridad?", explicacion: "A una persona inconsciente que respira con normalidad, para evitar la asfixia por vómito.", dificultad: "media", opciones: ["A persona inconsciente que respira con normalidad", "A cualquier persona consciente con una herida", "Solo en caso de golpe de calor", "Solo en caso de picadura de insecto"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse ante una herida por corte con herramienta en campo?", explicacion: "Presión directa, elevar la zona y trasladar a centro sanitario si es profunda.", dificultad: "media", opciones: ["Presión directa y traslado si es profunda", "Ignorarla si no duele demasiado", "Aplicar únicamente alcohol sin presión", "Seguir trabajando sin ninguna atención"], correcta: 0 },
]);

const S3 = "manipulacion-residuos-peligrosos-epi";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un residuo peligroso o contaminado en el contexto de trabajos en zonas verdes, montes y riberas?", reverso: "Un residuo que, por su naturaleza (vertido químico, materiales con amianto, residuos sanitarios abandonados, entre otros) supone un riesgo para la salud de quien lo manipula o para el medio ambiente si no se gestiona adecuadamente" },
  { anverso: "¿Qué debe hacerse al encontrar un vertido de sustancia desconocida en un espacio natural durante una inspección?", reverso: "No manipularlo directamente, señalizar y acotar la zona, y comunicarlo de inmediato al servicio competente para su identificación y gestión especializada, sin intentar identificarlo por contacto u olfato" },
  { anverso: "¿Qué EPI son básicos frente al riesgo de manipulación de residuos potencialmente contaminados?", reverso: "Guantes de protección adecuados al tipo de residuo, mascarilla o protección respiratoria si hay riesgo de inhalación, y calzado de seguridad; en su caso, ropa desechable de protección" },
  { anverso: "¿Qué protocolo básico debe seguirse ante un contacto accidental con un residuo tóxico?", reverso: "Retirarse de la zona, lavar la zona de contacto con agua abundante si es posible, no ingerir ni frotar la zona afectada, y solicitar atención médica informando del tipo de sustancia si se conoce" },
  { anverso: "¿Por qué no debe manipularse material con sospecha de contener amianto sin la formación y protección específica?", reverso: "Porque la inhalación de fibras de amianto puede causar enfermedades graves a largo plazo (asbestosis, cáncer), y su manipulación requiere procedimientos y EPI específicos regulados por normativa de riesgos laborales" },
  { anverso: "¿Qué información básica debe recogerse al reportar la localización de un vertido o residuo peligroso detectado?", reverso: "La ubicación exacta, una descripción del tipo de residuo o vertido observado (cantidad aproximada, aspecto), y, si es posible, fotografías desde una distancia segura, sin manipular el material" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué debe hacerse al encontrar un vertido de sustancia desconocida en un espacio natural?", explicacion: "No manipularlo, señalizar la zona y comunicarlo al servicio competente.", dificultad: "media", opciones: ["No manipularlo y comunicarlo al servicio competente", "Identificarlo tocándolo u oliéndolo directamente", "Retirarlo personalmente de inmediato", "Ignorarlo si no parece peligroso a simple vista"], correcta: 0 },
  { enunciado: "¿Qué EPI son básicos frente a la manipulación de residuos potencialmente contaminados?", explicacion: "Guantes adecuados, protección respiratoria y calzado de seguridad.", dificultad: "facil", opciones: ["Guantes, protección respiratoria y calzado de seguridad", "No es necesaria ninguna protección especial", "Solo gafas de sol convencionales", "Solo un pañuelo cubriendo la boca"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse ante un contacto accidental con un residuo tóxico?", explicacion: "Retirarse, lavar con agua abundante y solicitar atención médica.", dificultad: "media", opciones: ["Retirarse, lavar con agua y buscar atención médica", "Ignorarlo si no hay dolor inmediato", "Frotar la zona afectada con fuerza", "Continuar trabajando sin informar a nadie"], correcta: 0 },
  { enunciado: "¿Por qué no debe manipularse material con sospecha de amianto sin formación específica?", explicacion: "Puede causar enfermedades graves a largo plazo por inhalación de fibras.", dificultad: "media", opciones: ["Puede causar enfermedades graves por inhalación", "No supone ningún riesgo real para la salud", "Solo afecta a instalaciones industriales", "El amianto ya no se encuentra en España"], correcta: 0 },
  { enunciado: "¿Qué información debe recogerse al reportar un vertido o residuo peligroso detectado?", explicacion: "Ubicación exacta, descripción del residuo y fotografías desde distancia segura.", dificultad: "media", opciones: ["Ubicación, descripción y fotografías a distancia segura", "Solo la hora exacta del hallazgo", "Solo el nombre de quien lo detectó", "No es necesario reportar ninguna información"], correcta: 0 },
  { enunciado: "¿Qué ley establece el marco general de la prevención de riesgos laborales aplicable a estos trabajos?", explicacion: "La Ley 31/1995, de Prevención de Riesgos Laborales.", dificultad: "media", opciones: ["La Ley 31/1995", "El Real Decreto 630/2013", "La Ley 42/2007", "El Reglamento (CE) 338/97"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 11 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 11, orden: 11, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-96 creado y vinculado como Tema 11 de Oficial Agente Inspector.");

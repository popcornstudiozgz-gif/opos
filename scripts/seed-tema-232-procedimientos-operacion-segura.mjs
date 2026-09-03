/**
 * Crea tema-232: "Procedimientos de operación segura" — Tema 20
 * (numero=20, bloque-2) de Oficial Conductor, Especialidad Maquinaria
 * Pesada (Ayto. de Zaragoza).
 *
 * Corresponde al TEMA 18 oficial del Anexo I (bases2110.pdf, línea
 * 2177): "Procedimientos de operación segura antes de arrancar.
 * Comprobación diaria de la maquinaria. Control e interpretación de los
 * sistemas después de arrancar. Al finalizar tarea control del estado
 * de la máquina. Medidas de seguridad durante el mantenimiento."
 *
 * Normativa ya citada y verificada en esta oposición:
 * - Ley 31/1995, de 8 de noviembre, de Prevención de Riesgos Laborales
 *   (BOE-A-1995-24292) — ya citada en tema-220.
 * - RD 1215/1997, de 18 de julio, equipos de trabajo (BOE-A-1997-17824)
 *   — ya citado en tema-220 y tema-231.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-232-procedimientos-operacion-segura.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-232";
const OPOSICION = "oficial-conductor-maquinaria-pesada-ayto-zaragoza";
const BLOQUE_2_ID = "388bfbfc-396e-4de2-8897-09532d6a0bcd";

const LEY_31_1995 = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292";
const RD_1215_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-17824";

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
  titulo: "Procedimientos de operación segura",
  descripcion: "Procedimientos antes de arrancar la máquina y comprobación diaria. Control e interpretación de los sistemas tras el arranque. Control del estado de la máquina al finalizar la tarea. Medidas de seguridad durante el mantenimiento.",
  contenido: "Desarrolla la secuencia completa de operación segura de la maquinaria pesada a lo largo de la jornada de trabajo: los procedimientos y comprobaciones que deben realizarse antes de arrancar la máquina, conforme a la Ley 31/1995 y al RD 1215/1997; el control e interpretación de los sistemas de la máquina inmediatamente después del arranque (testigos, indicadores, ruidos anómalos); el control del estado de la máquina al finalizar la tarea, antes de dejarla estacionada; y las medidas de seguridad específicas que deben respetarse durante las propias operaciones de mantenimiento de la máquina.",
  enlaces_boe: [
    { url: LEY_31_1995, titulo: "Ley 31/1995 — Prevención de Riesgos Laborales" },
    { url: RD_1215_1997, titulo: "RD 1215/1997 — equipos de trabajo" },
  ],
  indice_estudio: [
    { url: LEY_31_1995, titulo: "Procedimientos antes de arrancar y comprobación diaria de la maquinaria", seccion: "procedimientos-antes-arrancar-comprobacion-diaria", articulos: "Ley 31/1995, RD 1215/1997" },
    { url: "", titulo: "Control e interpretación de los sistemas después de arrancar", seccion: "control-interpretacion-sistemas-despues-arrancar", articulos: "Conocimiento técnico del oficio" },
    { url: RD_1215_1997, titulo: "Control al finalizar la tarea y medidas de seguridad durante el mantenimiento", seccion: "control-final-tarea-medidas-seguridad-mantenimiento", articulos: "RD 1215/1997" },
  ],
}]);

const S1 = "procedimientos-antes-arrancar-comprobacion-diaria";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un procedimiento de operación segura, aplicado al arranque de la maquinaria pesada?", reverso: "Una secuencia ordenada y sistemática de comprobaciones y acciones que debe realizar la persona operadora antes de poner en marcha la máquina, destinada a verificar que la máquina y su entorno de trabajo se encuentran en condiciones seguras para iniciar la jornada" },
  { anverso: "¿Qué comprobaciones visuales debe realizar el Oficial Conductor en su ronda de inspección diaria antes de subir a la cabina?", reverso: "El estado general de la máquina (posibles fugas de fluidos bajo ella, estado de neumáticos o cadenas, estado del equipo de trabajo), la ausencia de daños visibles, y que no existan personas u obstáculos en las inmediaciones o bajo la propia máquina" },
  { anverso: "¿Qué debe comprobar el Oficial Conductor al subir a la cabina, antes de arrancar el motor?", reverso: "Que los mandos se encuentran en posición neutra, que el freno de estacionamiento está accionado, que el asiento y los retrovisores están correctamente ajustados, y que el cinturón de seguridad se encuentra en buen estado y disponible para su uso" },
  { anverso: "¿Por qué debe emitirse una señal acústica (bocina) antes de arrancar el motor de una máquina de gran tamaño en una zona con presencia de personas?", reverso: "Para advertir a cualquier persona que pudiera encontrarse cerca de la máquina, dentro de sus zonas muertas o en una posición no visible desde la cabina, de que el motor va a ponerse en marcha y la máquina puede comenzar a moverse" },
  { anverso: "¿Qué relación existe entre una comprobación diaria completa y sistemática y la detección temprana de una avería incipiente?", reverso: "Una comprobación diaria rigurosa permite detectar signos tempranos de una avería (una pequeña fuga, un ruido anómalo, un desgaste inusual) antes de que se agrave durante la jornada de trabajo, evitando tanto el riesgo para la seguridad como un coste de reparación mayor" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un procedimiento de operación segura aplicado al arranque de la maquinaria?", explicacion: "Una secuencia ordenada de comprobaciones antes de poner en marcha la máquina.", dificultad: "facil", opciones: ["Una secuencia ordenada de comprobaciones antes de arrancar", "Un documento exclusivamente administrativo sin efectos prácticos", "Un trámite exigido solo una vez al año por la empresa", "Un procedimiento exigido solo tras un accidente ya ocurrido"], correcta: 0 },
  { enunciado: "¿Qué debe comprobar el Oficial Conductor en su ronda de inspección visual antes de subir a la cabina?", explicacion: "El estado general de la máquina, posibles fugas y la ausencia de personas u obstáculos cercanos.", dificultad: "media", opciones: ["El estado general, posibles fugas y ausencia de personas cercanas", "Únicamente el color exterior de la máquina", "Únicamente el nivel de combustible del depósito", "Ninguna comprobación específica distinta del arranque directo"], correcta: 0 },
  { enunciado: "¿Qué debe comprobar el Oficial Conductor al subir a la cabina antes de arrancar el motor?", explicacion: "Que los mandos están en neutro, el freno accionado y el cinturón de seguridad disponible.", dificultad: "media", opciones: ["Mandos en neutro, freno accionado y cinturón disponible", "Únicamente que la radio de la cabina funciona correctamente", "Únicamente el color del asiento de la cabina", "Ninguna comprobación adicional distinta de la inspección exterior"], correcta: 0 },
  { enunciado: "¿Por qué debe emitirse una señal acústica antes de arrancar el motor en una zona con presencia de personas?", explicacion: "Para advertir a quien pudiera estar en zonas muertas o no visibles desde la cabina.", dificultad: "media", opciones: ["Para advertir a personas en zonas muertas o no visibles", "No existe ninguna razón real para emitir esta señal", "Únicamente por exigencia estética del fabricante", "Únicamente si la máquina va a desplazarse por carretera"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre una comprobación diaria rigurosa y la detección temprana de averías?", explicacion: "Permite detectar signos tempranos de avería antes de que se agraven durante la jornada.", dificultad: "dificil", opciones: ["Permite detectar signos tempranos antes de que se agraven", "No existe ninguna relación real entre ambos aspectos", "Solo es relevante en máquinas de más de diez años de uso", "Solo es relevante si la máquina ya presenta una avería grave"], correcta: 0 },
]);

const S2 = "control-interpretacion-sistemas-despues-arrancar";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué debe hacer el Oficial Conductor inmediatamente después de arrancar el motor de la máquina, antes de comenzar a desplazarla o a trabajar?", reverso: "Observar el panel de instrumentos y comprobar que los testigos de aviso (presión de aceite, temperatura, carga de la batería) se apagan correctamente tras el arranque, y prestar atención a cualquier ruido, vibración u olor anómalo procedente del motor o de otros sistemas" },
  { anverso: "¿Qué indica un testigo de presión de aceite que permanece encendido tras el arranque del motor?", reverso: "Una presión de aceite insuficiente en el circuito de lubricación del motor, una situación grave que exige detener inmediatamente el motor y no continuar su funcionamiento hasta identificar y resolver la causa, dado el riesgo de gripado del motor" },
  { anverso: "¿Qué debe comprobar el Oficial Conductor sobre los sistemas hidráulicos tras el arranque, antes de utilizar el equipo de trabajo con normalidad?", reverso: "Que los mandos hidráulicos responden de forma suave y progresiva, sin movimientos bruscos ni retardos anómalos, y que no se aprecian fugas visibles en las mangueras, racores o cilindros del sistema" },
  { anverso: "¿Qué es un periodo de calentamiento del motor, y por qué puede ser recomendable respetarlo antes de someter la máquina a plena carga?", reverso: "Un breve intervalo de funcionamiento a ralentí o baja carga tras el arranque, especialmente en condiciones de temperatura fría, que permite que el aceite alcance una temperatura y una fluidez adecuadas para lubricar correctamente todos los componentes antes de exigir el máximo rendimiento del motor" },
  { anverso: "¿Qué debe hacer el Oficial Conductor si, tras el arranque, detecta un testigo de aviso encendido o un comportamiento anómalo que no comprende con seguridad?", reverso: "No iniciar el trabajo con la máquina y comunicarlo de inmediato al servicio de mantenimiento o a la persona responsable, en lugar de continuar operando la máquina asumiendo que la anomalía carece de importancia" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué debe hacer el Oficial Conductor inmediatamente después de arrancar el motor?", explicacion: "Comprobar que los testigos de aviso se apagan correctamente y detectar cualquier anomalía.", dificultad: "media", opciones: ["Comprobar los testigos de aviso y detectar anomalías", "Iniciar el trabajo de inmediato sin ninguna comprobación adicional", "Apagar el motor de inmediato sin ninguna comprobación previa", "Desplazar la máquina a máxima velocidad sin comprobación previa"], correcta: 0 },
  { enunciado: "¿Qué indica un testigo de presión de aceite que permanece encendido tras el arranque?", explicacion: "Presión de aceite insuficiente, que exige detener el motor de inmediato por riesgo de gripado.", dificultad: "dificil", opciones: ["Presión de aceite insuficiente, exige detener el motor", "Un nivel de combustible bajo, sin mayor gravedad", "Una simple advertencia estética sin ninguna relevancia real", "Un fallo exclusivo del sistema de iluminación de la cabina"], correcta: 0 },
  { enunciado: "¿Qué debe comprobar el Oficial Conductor sobre los sistemas hidráulicos tras el arranque?", explicacion: "Que los mandos responden de forma suave y no hay fugas visibles.", dificultad: "media", opciones: ["Que los mandos responden con suavidad y sin fugas visibles", "Únicamente el color del aceite hidráulico empleado", "Ninguna comprobación específica distinta del motor", "Únicamente la temperatura exterior del día de trabajo"], correcta: 0 },
  { enunciado: "¿Qué es un periodo de calentamiento del motor tras el arranque?", explicacion: "Un breve intervalo a baja carga que permite al aceite alcanzar una fluidez adecuada.", dificultad: "dificil", opciones: ["Un breve intervalo a baja carga antes de exigir el máximo rendimiento", "Un periodo exigido solo en máquinas eléctricas", "Un trámite administrativo sin ninguna base técnica real", "Un periodo exclusivo aplicable únicamente en verano"], correcta: 0 },
  { enunciado: "¿Qué debe hacer el Oficial Conductor si detecta un testigo encendido o un comportamiento anómalo tras el arranque?", explicacion: "No iniciar el trabajo y comunicarlo de inmediato al servicio de mantenimiento.", dificultad: "media", opciones: ["No iniciar el trabajo y comunicarlo de inmediato", "Continuar trabajando con normalidad hasta el final de la jornada", "Ignorarlo si la anomalía parece de escasa importancia", "Reiniciar el motor varias veces hasta que el testigo se apague"], correcta: 0 },
]);

const S3 = "control-final-tarea-medidas-seguridad-mantenimiento";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué comprobaciones debe realizar el Oficial Conductor al finalizar la tarea, antes de dejar la máquina estacionada?", reverso: "Apoyar el equipo de trabajo (cazo, hoja) en el suelo, accionar el freno de estacionamiento, dejar los mandos en posición neutra, retirar la llave de contacto si procede, y realizar una revisión visual final en busca de daños o fugas producidos durante la jornada" },
  { anverso: "¿Por qué es recomendable dejar el equipo de trabajo (cazo, hoja) apoyado en el suelo al finalizar la jornada, en lugar de dejarlo elevado?", reverso: "Porque reduce el riesgo de que una pérdida de presión hidráulica durante la parada provoque un descenso brusco e incontrolado del equipo, y porque una máquina con el equipo apoyado resulta más estable frente a un posible vuelco durante el estacionamiento" },
  { anverso: "¿Qué es el bloqueo o consignación de una máquina, antes de realizar una operación de mantenimiento sobre ella?", reverso: "El conjunto de medidas destinadas a impedir la puesta en marcha accidental de la máquina mientras se está interviniendo sobre ella (llave retirada, dispositivo de bloqueo activado, señalización de \"máquina en mantenimiento\"), evitando que otra persona la ponga en marcha sin saber que se está trabajando en ella" },
  { anverso: "¿Qué precaución específica debe adoptarse antes de intervenir sobre el sistema hidráulico de una máquina con fines de mantenimiento?", reverso: "Despresurizar el circuito hidráulico siguiendo el procedimiento indicado por el fabricante antes de desconectar cualquier manguera o componente, dado que un fluido hidráulico a presión puede inyectarse bajo la piel a través de un escape a alta velocidad, causando lesiones graves" },
  { anverso: "¿Qué medida de seguridad debe respetarse al situarse bajo un equipo de trabajo elevado (por ejemplo, la cuchara de una excavadora) durante una operación de mantenimiento o de sustitución de piezas?", reverso: "Utilizar siempre un apoyo mecánico fiable (caballete, calzo estructural) que sostenga el equipo de forma independiente del sistema hidráulico, y nunca confiar exclusivamente en la presión hidráulica o en el propio circuito de la máquina para mantenerlo elevado mientras alguien trabaja debajo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué debe hacer el Oficial Conductor al finalizar la tarea antes de dejar la máquina estacionada?", explicacion: "Apoyar el equipo de trabajo, accionar el freno y realizar una revisión visual final.", dificultad: "media", opciones: ["Apoyar el equipo, accionar el freno y revisar visualmente", "Dejar el equipo de trabajo elevado para la siguiente jornada", "Ninguna comprobación adicional distinta de apagar el motor", "Únicamente cerrar las puertas de la cabina sin más comprobación"], correcta: 0 },
  { enunciado: "¿Por qué es recomendable dejar el equipo de trabajo apoyado en el suelo al finalizar la jornada?", explicacion: "Reduce el riesgo de descenso brusco por pérdida de presión y mejora la estabilidad frente al vuelco.", dificultad: "media", opciones: ["Reduce el riesgo de descenso brusco y mejora la estabilidad", "No existe ninguna razón técnica real para esta práctica", "Únicamente por motivos estéticos de la máquina estacionada", "Únicamente resulta relevante en máquinas de gran antigüedad"], correcta: 0 },
  { enunciado: "¿Qué es el bloqueo o consignación de una máquina antes de una operación de mantenimiento?", explicacion: "Medidas para impedir su puesta en marcha accidental mientras se interviene sobre ella.", dificultad: "dificil", opciones: ["Medidas para impedir la puesta en marcha accidental", "Un simple cartel decorativo sin ningún efecto real", "Una revisión exclusivamente estética de la máquina", "Un trámite exigido solo para máquinas de gran tamaño"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse antes de intervenir sobre el sistema hidráulico con fines de mantenimiento?", explicacion: "Despresurizar el circuito siguiendo el procedimiento del fabricante antes de desconectar componentes.", dificultad: "dificil", opciones: ["Despresurizar el circuito antes de desconectar componentes", "Ninguna precaución adicional distinta de apagar el motor", "Aumentar la presión del circuito antes de intervenir", "Desconectar directamente sin ninguna comprobación previa"], correcta: 0 },
  { enunciado: "¿Qué medida debe respetarse al situarse bajo un equipo de trabajo elevado durante el mantenimiento?", explicacion: "Utilizar un apoyo mecánico fiable, sin confiar exclusivamente en la presión hidráulica.", dificultad: "media", opciones: ["Utilizar un apoyo mecánico fiable, sin confiar solo en lo hidráulico", "Confiar únicamente en la presión hidráulica del circuito", "No es necesaria ninguna precaución adicional en este caso", "Bastaría con detener el motor sin ningún apoyo mecánico"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 20 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 20, orden: 20, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-232 creado y vinculado como Tema 20 de Oficial Conductor Maquinaria Pesada.");

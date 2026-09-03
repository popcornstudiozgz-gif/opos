/**
 * Crea tema-279: "Prevención de Riesgos en la conducción de vehículos.
 * Accidentes. Obligaciones del conductor, deber de auxilio, primeros
 * auxilios" — Tema 19 (numero=19, bloque-2) de Oficial Conductor,
 * Especialidad General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 17 oficial del Anexo I (bases2110.pdf, línea
 * 1588):
 *   "Prevención de Riesgos en la conducción de vehículos. Accidentes.
 *   Obligaciones del conductor, deber de auxilio, primeros auxilios."
 *
 * Sourcing: normativa real y verificada — Ley 31/1995 de Prevención de
 * Riesgos Laborales (ya usada en varios temas del proyecto) para la
 * sección de PRL en la conducción; artículo 51 del RDLeg 6/2015 (ya
 * usado en tema-272 y tema-275) para las obligaciones del conductor en
 * caso de accidente; artículos 195 y 196 del Código Penal (ya usado en
 * tema-275) para el delito de omisión del deber de socorro, con la
 * agravación específica cuando el propio omitente causó el accidente.
 * La sección de primeros auxilios recoge conocimiento técnico
 * consolidado (secuencia PAS: proteger, avisar, socorrer) sin una ley
 * única que lo regule como tal, criterio ya aplicado a otros temas
 * técnicos sin normativa específica en este mismo proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-279-prl-conduccion-accidentes-auxilio.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-279";
const OPOSICION = "oficial-conductor-general-ayto-zaragoza";
const BLOQUE_2_ID = "38c4f100-214c-45c4-8600-841993100e43";

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
  titulo: "PRL en la conducción, accidentes y deber de auxilio",
  descripcion: "Prevención de riesgos en la conducción profesional (Ley 31/1995). Obligaciones del conductor en caso de accidente (art. 51 RDLeg 6/2015). El deber de auxilio y la omisión del deber de socorro (arts. 195-196 CP). Nociones básicas de primeros auxilios.",
  contenido: "Desarrolla la prevención de riesgos laborales aplicada a la conducción profesional, las obligaciones legales del conductor implicado en un accidente de tráfico, el deber de auxilio a las víctimas y las consecuencias penales de su omisión, y unas nociones básicas de primeros auxilios orientadas a la actuación inicial de un conductor ante un accidente, antes de la llegada de los servicios de emergencia.",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292", titulo: "Ley 31/1995, de Prevención de Riesgos Laborales" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722", titulo: "Real Decreto Legislativo 6/2015 (art. 51: obligaciones en caso de accidente)" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444", titulo: "Ley Orgánica 10/1995, del Código Penal (arts. 195-196: omisión del deber de socorro)" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292", titulo: "Prevención de riesgos en la conducción profesional", seccion: "prevencion-de-riesgos-en-la-conduccion-profesional", articulos: "Ley 31/1995" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722", titulo: "Obligaciones del conductor y deber de auxilio", seccion: "obligaciones-del-conductor-y-deber-de-auxilio", articulos: "RDLeg 6/2015, art. 51; Código Penal, arts. 195-196" },
    { url: "", titulo: "Primeros auxilios básicos en un accidente de tráfico", seccion: "primeros-auxilios-basicos-en-accidente-de-trafico", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "prevencion-de-riesgos-en-la-conduccion-profesional";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué obligación general establece la Ley 31/1995 para el empresario en relación con los riesgos derivados de la conducción profesional?", reverso: "Garantizar la seguridad y la salud de los trabajadores a su servicio en todos los aspectos relacionados con el trabajo, evaluando y previniendo los riesgos específicos de la conducción (fatiga, distracciones, condiciones meteorológicas) y adoptando las medidas necesarias" },
  { anverso: "¿Qué riesgo específico de la conducción profesional guarda relación directa con lo estudiado sobre los tiempos de conducción y descanso en un tema anterior?", reverso: "La fatiga del conductor, factor de riesgo que el propio sistema de control de tiempos de conducción y descanso (Reglamento CE 561/2006) busca prevenir, y que la Ley 31/1995 exige tener en cuenta como riesgo laboral específico" },
  { anverso: "¿Qué es la evaluación de riesgos, aplicada a la conducción profesional?", reverso: "El proceso mediante el cual se identifican los peligros asociados a la actividad de conducir (fatiga, distracciones, condiciones de la vía, del vehículo, meteorológicas) y se valora el riesgo que suponen, como paso previo a adoptar medidas preventivas" },
  { anverso: "¿Qué medidas preventivas puede adoptar un servicio municipal de conducción frente al riesgo de fatiga de sus conductores?", reverso: "Una planificación adecuada de los turnos y las rutas que respete los tiempos de conducción y descanso, evitando jornadas excesivamente prolongadas y facilitando pausas suficientes durante servicios de larga duración" },
  { anverso: "¿Qué derecho tiene un conductor profesional, según la Ley 31/1995, en relación con la información y formación sobre los riesgos de su puesto de trabajo?", reverso: "El derecho a recibir información y formación teórica y práctica, suficiente y adecuada, en materia preventiva, centrada específicamente en su puesto de trabajo o función, en este caso la conducción de vehículos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué obligación general establece la Ley 31/1995 para el empresario respecto a la conducción profesional?", explicacion: "Garantizar la seguridad y salud de los trabajadores, evaluando y previniendo los riesgos específicos.", dificultad: "facil", opciones: ["Garantizar la seguridad y salud de los trabajadores en el trabajo", "Garantizar exclusivamente el mantenimiento mecánico del vehículo", "Garantizar exclusivamente la validez de la ITV del vehículo utilizado", "Ninguna obligación específica distinta de la ya exigida al propio conductor"], correcta: 0 },
  { enunciado: "¿Qué riesgo específico de la conducción profesional se relaciona con los tiempos de conducción y descanso?", explicacion: "La fatiga del conductor.", dificultad: "media", opciones: ["La fatiga del conductor", "El exceso de velocidad, sin relación real con los tiempos de descanso", "El estado de los neumáticos, sin relación real con los tiempos de descanso", "El nivel de aceite del motor, sin relación real con los tiempos de descanso"], correcta: 0 },
  { enunciado: "¿Qué es la evaluación de riesgos aplicada a la conducción profesional?", explicacion: "Identificar los peligros de conducir y valorar el riesgo, como paso previo a las medidas preventivas.", dificultad: "media", opciones: ["Identificar peligros de conducir y valorar el riesgo asociado", "Un trámite exclusivamente relacionado con la ITV del vehículo utilizado", "Un trámite exclusivamente relacionado con el seguro del vehículo utilizado", "Un examen exclusivo para la obtención del Certificado de Aptitud Profesional"], correcta: 0 },
  { enunciado: "¿Qué medida preventiva puede adoptar un servicio municipal frente al riesgo de fatiga de sus conductores?", explicacion: "Planificar turnos y rutas que respeten los tiempos de conducción y descanso.", dificultad: "media", opciones: ["Planificar turnos y rutas respetando los tiempos de conducción y descanso", "Aumentar la velocidad máxima permitida para reducir la duración del trayecto", "Eliminar por completo las pausas durante cualquier servicio de larga duración", "Ninguna medida preventiva real es posible frente al riesgo de fatiga del conductor"], correcta: 0 },
  { enunciado: "¿Qué derecho reconoce la Ley 31/1995 al conductor profesional en materia de información y formación?", explicacion: "El derecho a recibir información y formación suficiente y adecuada, centrada en su puesto de trabajo.", dificultad: "dificil", opciones: ["El derecho a recibir información y formación adecuada a su puesto", "Ningún derecho específico distinto del ya reconocido a cualquier trabajador", "El derecho exclusivo a recibir formación sobre mecánica del automóvil", "El derecho exclusivo a recibir formación sobre el Reglamento General de Vehículos"], correcta: 0 },
]);

const S2 = "obligaciones-del-conductor-y-deber-de-auxilio";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué obligación general establece el artículo 51 del RDLeg 6/2015 para el usuario de la vía implicado en un accidente, o que lo presencie o tenga conocimiento de él?", reverso: "Auxiliar o solicitar auxilio para atender a las posibles víctimas, prestar su colaboración, evitar mayores peligros o daños, restablecer en la medida de lo posible la seguridad de la circulación y esclarecer los hechos" },
  { anverso: "¿Qué castiga el artículo 195 del Código Penal, en relación con el deber de auxilio?", reverso: "No prestar socorro a una persona que se encuentre desamparada y en peligro manifiesto y grave, cuando se pudiera hacer sin riesgo propio ni de terceros, con una pena de multa de tres a doce meses" },
  { anverso: "¿Qué alternativa contempla el propio artículo 195 del Código Penal si el conductor no puede prestar auxilio directamente a la víctima?", reverso: "La obligación de solicitar ayuda urgente a terceros, como una alternativa válida a la prestación de auxilio directo cuando este no sea posible" },
  { anverso: "¿Qué agravación específica prevé el artículo 195 del Código Penal cuando el conductor que omite el auxilio es quien ha causado el accidente?", reverso: "La pena se eleva a prisión de seis meses a dieciocho meses si el accidente fue ocasionado fortuitamente por quien omitió el auxilio, y a prisión de seis meses a cuatro años si el accidente se debió a su imprudencia" },
  { anverso: "¿Qué relación existe entre el artículo 51 del RDLeg 6/2015 y el artículo 195 del Código Penal en materia de deber de auxilio?", reverso: "El artículo 51 establece la obligación administrativa general de auxilio para cualquier usuario de la vía implicado en un accidente, presente o con conocimiento de él; el artículo 195 tipifica como delito la omisión de ese auxilio cuando la víctima se encuentra desamparada y en peligro manifiesto y grave" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué obligación establece el artículo 51 del RDLeg 6/2015 para el usuario implicado en un accidente?", explicacion: "Auxiliar o solicitar auxilio, colaborar, evitar mayores daños y esclarecer los hechos.", dificultad: "facil", opciones: ["Auxiliar o solicitar auxilio y colaborar para esclarecer los hechos", "Abandonar el lugar del accidente cuanto antes, sin ninguna otra obligación", "Ninguna obligación específica distinta del cumplimiento de las normas de circulación", "Comunicar el accidente únicamente a su aseguradora, sin ninguna otra obligación"], correcta: 0 },
  { enunciado: "¿Qué castiga el artículo 195 del Código Penal?", explicacion: "No prestar socorro a quien está desamparado y en peligro manifiesto y grave, pudiendo hacerlo sin riesgo.", dificultad: "media", opciones: ["No prestar socorro a quien está desamparado y en peligro grave", "Circular con exceso de velocidad, sin ninguna relación con el deber de auxilio", "Conducir bajo los efectos del alcohol, sin ninguna relación con el deber de auxilio", "No disponer del Certificado de Aptitud Profesional (CAP) correspondiente"], correcta: 0 },
  { enunciado: "¿Qué alternativa contempla el artículo 195 CP si no se puede prestar auxilio directo?", explicacion: "Solicitar ayuda urgente a terceros.", dificultad: "media", opciones: ["Solicitar ayuda urgente a terceros", "Ninguna alternativa, siendo obligatorio siempre el auxilio directo sin excepción", "Abandonar el lugar sin ninguna otra actuación adicional exigida por la norma", "Esperar exclusivamente a que llegue la Policía Local sin ninguna otra actuación"], correcta: 0 },
  { enunciado: "¿Qué agravación prevé el artículo 195 CP si el propio omitente causó el accidente por imprudencia?", explicacion: "Prisión de 6 meses a 4 años.", dificultad: "media", opciones: ["Prisión de 6 meses a 4 años", "Multa de 3 a 12 meses, sin ninguna pena de prisión adicional", "Ninguna agravación adicional distinta de la pena general del artículo 195", "Prisión permanente revisable, con independencia de las circunstancias del caso"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el artículo 51 del RDLeg 6/2015 y el artículo 195 del Código Penal?", explicacion: "El primero establece la obligación administrativa; el segundo tipifica como delito su omisión en casos graves.", dificultad: "dificil", opciones: ["El primero es la obligación administrativa; el segundo, el delito de su omisión", "Ambos artículos regulan exactamente la misma obligación y con idénticas consecuencias", "El artículo 195 CP deroga por completo al artículo 51 del RDLeg 6/2015", "No existe ninguna relación real entre ambos artículos de distintas normas"], correcta: 0 },
]);

const S3 = "primeros-auxilios-basicos-en-accidente-de-trafico";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué significa la secuencia PAS en la actuación básica ante un accidente de tráfico?", reverso: "Proteger, Avisar y Socorrer: proteger la zona del accidente para evitar nuevos daños, avisar a los servicios de emergencia, y socorrer a las víctimas dentro de las posibilidades y conocimientos de quien auxilia" },
  { anverso: "¿Qué debería hacer en primer lugar un conductor que llega o presencia un accidente, según la secuencia PAS?", reverso: "Proteger la zona: señalizar el lugar del accidente (triángulos de preseñalización, luces de emergencia), evitando así un segundo accidente que agrave la situación inicial" },
  { anverso: "¿Qué información básica debe facilitarse al avisar a los servicios de emergencia tras un accidente?", reverso: "La ubicación exacta del accidente, el número aproximado de heridos y su estado aparente, y cualquier riesgo adicional presente (fuego, materia peligrosa derramada, vehículos en posición inestable)" },
  { anverso: "¿Por qué se recomienda, con carácter general, no mover a una persona herida tras un accidente de tráfico, salvo riesgo inminente?", reverso: "Porque un movimiento incorrecto puede agravar lesiones no visibles, especialmente en la columna vertebral, salvo que exista un riesgo inminente (incendio, explosión) que obligue a desplazar a la víctima por su propia seguridad" },
  { anverso: "¿Qué debería hacer un conductor con conocimientos básicos de primeros auxilios ante una persona consciente pero con una herida sangrante tras un accidente?", reverso: "Aplicar presión directa sobre la herida con un paño o material limpio disponible, para intentar contener la hemorragia mientras se espera la llegada de los servicios de emergencia" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué significa la secuencia PAS?", explicacion: "Proteger, Avisar, Socorrer.", dificultad: "facil", opciones: ["Proteger, Avisar y Socorrer", "Parar, Auxiliar y Salir del lugar del accidente", "Prevenir, Actuar y Solicitar el permiso de conducción", "Protocolo, Ambulancia y Seguro del vehículo implicado"], correcta: 0 },
  { enunciado: "¿Qué debería hacer en primer lugar un conductor ante un accidente, según la secuencia PAS?", explicacion: "Proteger la zona, señalizando el lugar para evitar un segundo accidente.", dificultad: "media", opciones: ["Proteger la zona señalizando el lugar del accidente", "Socorrer directamente a las víctimas sin ninguna señalización previa", "Avisar exclusivamente a su responsable municipal, sin ninguna otra actuación", "Retirar los vehículos implicados sin ninguna señalización previa del lugar"], correcta: 0 },
  { enunciado: "¿Qué información básica debe facilitarse al avisar a los servicios de emergencia?", explicacion: "Ubicación exacta, número de heridos y estado aparente, y riesgos adicionales.", dificultad: "media", opciones: ["Ubicación, número de heridos y riesgos adicionales presentes", "Únicamente la matrícula de los vehículos implicados en el accidente", "Únicamente el nombre completo de las personas implicadas en el accidente", "Ninguna información específica, siendo suficiente con indicar que hubo un accidente"], correcta: 0 },
  { enunciado: "¿Por qué se recomienda no mover a una persona herida, salvo riesgo inminente?", explicacion: "Porque puede agravar lesiones no visibles, especialmente de columna.", dificultad: "media", opciones: ["Porque puede agravar lesiones no visibles, especialmente de columna", "Porque moverla siempre mejora su estado, sin ningún riesgo real asociado", "Porque no existe ningún riesgo real al mover a una persona herida", "Porque la normativa de tráfico prohíbe expresamente mover a cualquier herido"], correcta: 0 },
  { enunciado: "¿Qué debería hacerse ante una persona consciente con una herida sangrante?", explicacion: "Aplicar presión directa sobre la herida con un paño o material limpio.", dificultad: "dificil", opciones: ["Aplicar presión directa sobre la herida con material limpio", "Trasladarla de inmediato en el propio vehículo hasta un hospital cercano", "Aplicar únicamente agua fría sobre la herida, sin ninguna presión directa", "No realizar ninguna actuación hasta la llegada de los servicios de emergencia"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Evaluación de riesgos", definicion: "Proceso de identificación de los peligros de un puesto de trabajo, como la conducción profesional, y valoración del riesgo que suponen, previo a la adopción de medidas preventivas." },
  { tema_slug: TEMA, seccion: S1, termino: "Fatiga del conductor", definicion: "Estado de cansancio que reduce la capacidad de reacción y control del vehículo, riesgo laboral específico de la conducción profesional relacionado con los tiempos de conducción y descanso." },
  { tema_slug: TEMA, seccion: S2, termino: "Deber de auxilio", definicion: "Obligación, recogida en el artículo 51 del RDLeg 6/2015, de todo usuario de la vía implicado en un accidente, o que lo presencie o tenga conocimiento de él, de auxiliar o solicitar auxilio para las víctimas." },
  { tema_slug: TEMA, seccion: S2, termino: "Omisión del deber de socorro", definicion: "Delito tipificado en el artículo 195 del Código Penal, consistente en no prestar socorro a una persona desamparada y en peligro manifiesto y grave, pudiendo hacerlo sin riesgo propio ni de terceros." },
  { tema_slug: TEMA, seccion: S3, termino: "PAS", definicion: "Secuencia básica de actuación ante un accidente: Proteger la zona, Avisar a los servicios de emergencia y Socorrer a las víctimas dentro de las posibilidades de quien auxilia." },
  { tema_slug: TEMA, seccion: S3, termino: "Triángulo de preseñalización", definicion: "Dispositivo de señalización de emergencia que se coloca a cierta distancia de un vehículo accidentado o averiado para advertir a otros conductores y prevenir un segundo accidente." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 19 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 19, orden: 19, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-279 creado y vinculado como Tema 19 de Oficial Conductor General.");

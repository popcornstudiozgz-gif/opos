/**
 * Crea tema-100: "Sensibilización y comunicación ambiental" — Tema 15
 * (numero=15, bloque-2) de Oficial Agente Inspector (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 13 oficial del Anexo I (bases2110.pdf):
 *   "Sensibilización y comunicación. instalación de carteles
 *   informativos; participación en campañas de educación ambiental;
 *   atención y orientación al público sobre la campaña, ya sea de
 *   residuos, parques, montes, etc."
 *
 * Conocimiento técnico consolidado de comunicación/educación ambiental y
 * atención al público, coherente con el desarrollado en otros temas del
 * proyecto (p. ej. tema-68 de Oficial Mantenimiento General); no
 * requiere cita legal artículo a artículo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-100-sensibilizacion-comunicacion-ambiental.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-100";
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
  titulo: "Sensibilización y comunicación ambiental",
  descripcion: "Instalación de carteles informativos. Participación en campañas de educación ambiental. Atención y orientación al público sobre campañas de residuos, parques y montes.",
  contenido: "Desarrolla la instalación de carteles y paneles informativos en espacios naturales y urbanos, la participación en campañas de educación ambiental, y la atención y orientación a la ciudadanía sobre campañas relacionadas con residuos, parques y montes.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Carteles y paneles informativos", seccion: "carteles-paneles-informativos", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Campañas de educación ambiental", seccion: "campanas-educacion-ambiental", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Atención y orientación al público sobre campañas", seccion: "atencion-orientacion-publico-campanas", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "carteles-paneles-informativos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un cartel o panel informativo en un espacio natural o zona verde?", reverso: "Un elemento de comunicación visual que transmite información relevante (normas de uso, itinerarios, especies presentes, avisos de campaña) a las personas usuarias del espacio" },
  { anverso: "¿Qué criterios básicos debe cumplir un cartel informativo para ser eficaz?", reverso: "Ser legible a la distancia adecuada, usar un lenguaje claro y directo, incluir pictogramas o iconos que faciliten su comprensión rápida, y estar ubicado en un punto visible sin obstáculos" },
  { anverso: "¿Qué debe comprobarse en la instalación de un cartel informativo en un espacio exterior?", reverso: "Que el soporte quede firme y estable, que no suponga un riesgo de obstáculo o caída para las personas usuarias, y que sea resistente a las condiciones meteorológicas" },
  { anverso: "¿Qué mantenimiento requiere la cartelería informativa ya instalada en parques y montes?", reverso: "Revisión periódica de su legibilidad (deterioro por sol o lluvia), limpieza frente a pintadas o suciedad, y reposición cuando el contenido quede desactualizado o el soporte se dañe" },
  { anverso: "¿Por qué es importante actualizar la cartelería cuando cambia una campaña o normativa vigente?", reverso: "Porque una información desactualizada puede confundir a la ciudadanía o transmitir un mensaje incorrecto, perdiendo eficacia comunicativa e incluso generando desconfianza en la información municipal" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un cartel o panel informativo en un espacio natural?", explicacion: "Un elemento de comunicación visual con información relevante para las personas usuarias.", dificultad: "facil", opciones: ["Un elemento de comunicación visual informativo", "Un tipo de mobiliario urbano sin función informativa", "Un residuo voluminoso a retirar", "Un elemento exclusivo de señalización de tráfico"], correcta: 0 },
  { enunciado: "¿Qué criterios debe cumplir un cartel informativo eficaz?", explicacion: "Legibilidad, lenguaje claro, pictogramas y ubicación visible.", dificultad: "media", opciones: ["Legibilidad, lenguaje claro y ubicación visible", "Solo debe ser de gran tamaño, sin más criterios", "No requiere ningún criterio específico", "Solo debe contener texto sin pictogramas"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse al instalar un cartel en un espacio exterior?", explicacion: "Firmeza del soporte, ausencia de riesgo y resistencia meteorológica.", dificultad: "media", opciones: ["Firmeza del soporte y resistencia meteorológica", "Solo el color del cartel", "Solo el tamaño de la letra", "No es necesaria ninguna comprobación"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento requiere la cartelería informativa ya instalada?", explicacion: "Revisión de legibilidad, limpieza y reposición cuando se desactualiza.", dificultad: "media", opciones: ["Revisión, limpieza y reposición cuando procede", "No requiere ningún mantenimiento periódico", "Solo sustitución anual sin revisión previa", "Solo limpieza, sin revisar el contenido"], correcta: 0 },
  { enunciado: "¿Por qué es importante actualizar la cartelería cuando cambia una campaña?", explicacion: "Para evitar confusión y mantener la eficacia comunicativa.", dificultad: "media", opciones: ["Para evitar confusión y mantener eficacia comunicativa", "No es relevante mantenerla actualizada", "Solo afecta a la estética del espacio", "Solo se actualiza una vez al año sin excepción"], correcta: 0 },
]);

const S2 = "campanas-educacion-ambiental";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una campaña de educación ambiental?", reverso: "Una iniciativa organizada, con objetivos y mensajes definidos, orientada a informar, sensibilizar y modificar comportamientos de la ciudadanía en relación con el medio ambiente (residuos, agua, biodiversidad, energía)" },
  { anverso: "¿Qué tipo de campañas de educación ambiental son habituales en un municipio como Zaragoza?", reverso: "Campañas sobre correcta separación de residuos, ahorro de agua, respeto al arbolado y zonas verdes, prevención de incendios forestales, y protección de la biodiversidad urbana" },
  { anverso: "¿Qué papel puede tener un agente inspector en la participación directa de una campaña de educación ambiental?", reverso: "Distribuir material informativo, atender consultas de la ciudadanía sobre la campaña, colaborar en actividades divulgativas puntuales, y transmitir el mensaje de la campaña durante su labor diaria de inspección" },
  { anverso: "¿Por qué es importante adaptar el mensaje de una campaña ambiental al público destinatario (por ejemplo, escolares frente a personas adultas)?", reverso: "Porque un lenguaje y formato adecuados a cada público aumentan la comprensión y la eficacia del mensaje, favoreciendo un cambio real de comportamiento" },
  { anverso: "¿Qué es la evaluación de una campaña de educación ambiental y por qué es relevante?", reverso: "El proceso de valorar si la campaña ha alcanzado sus objetivos (por ejemplo, reducción de residuos mal separados), permitiendo ajustar futuras campañas y justificar los recursos invertidos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una campaña de educación ambiental?", explicacion: "Una iniciativa organizada para informar y modificar comportamientos ambientales.", dificultad: "facil", opciones: ["Una iniciativa para informar y modificar comportamientos", "Un tipo de sanción administrativa ambiental", "Un cartel informativo aislado sin objetivo", "Un residuo especial a gestionar"], correcta: 0 },
  { enunciado: "¿Qué tipo de campañas de educación ambiental son habituales en Zaragoza?", explicacion: "Sobre separación de residuos, ahorro de agua, respeto al arbolado e incendios forestales.", dificultad: "media", opciones: ["Residuos, ahorro de agua y prevención de incendios", "Únicamente campañas de tráfico urbano", "Únicamente campañas fiscales municipales", "Ninguna campaña ambiental se realiza"], correcta: 0 },
  { enunciado: "¿Qué papel puede tener un agente inspector en una campaña de educación ambiental?", explicacion: "Distribuir material, atender consultas y transmitir el mensaje en su labor diaria.", dificultad: "media", opciones: ["Distribuir material y transmitir el mensaje", "Ningún papel, es competencia exclusiva de otro servicio", "Solo diseñar el material gráfico de la campaña", "Solo gestionar el presupuesto de la campaña"], correcta: 0 },
  { enunciado: "¿Por qué debe adaptarse el mensaje de una campaña al público destinatario?", explicacion: "Aumenta la comprensión y eficacia del mensaje según el público.", dificultad: "media", opciones: ["Aumenta la comprensión y eficacia del mensaje", "No influye en el resultado de la campaña", "Solo es relevante para público infantil", "El mensaje debe ser siempre idéntico para todos"], correcta: 0 },
  { enunciado: "¿Qué es la evaluación de una campaña de educación ambiental?", explicacion: "Valorar si alcanzó sus objetivos, para ajustar futuras campañas.", dificultad: "media", opciones: ["Valorar si alcanzó sus objetivos", "Un sinónimo de sanción administrativa", "El diseño inicial de los carteles", "La distribución física del material"], correcta: 0 },
]);

const S3 = "atencion-orientacion-publico-campanas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué información básica debe poder ofrecer un agente inspector ante una consulta ciudadana sobre una campaña de residuos?", reverso: "Qué se pide exactamente a la ciudadanía (por ejemplo, cómo separar un residuo concreto), dónde depositarlo correctamente, y a quién dirigirse para más información o para solicitar la recogida de residuos especiales" },
  { anverso: "¿Qué actitud debe mantener el agente inspector al atender a una persona con dudas o quejas sobre una campaña ambiental (por ejemplo, sobre una poda o corte de vegetación)?", reverso: "Escuchar de forma activa, explicar con claridad el motivo técnico o normativo de la actuación, y, si no puede resolver la duda directamente, orientar hacia el servicio o canal municipal competente" },
  { anverso: "¿Qué papel cumple la atención presencial del agente inspector frente a otros canales de comunicación de una campaña (carteles, redes sociales)?", reverso: "Permite resolver dudas concretas de forma personalizada e inmediata, y detectar en tiempo real el nivel de comprensión o rechazo de la ciudadanía hacia el mensaje de la campaña" },
  { anverso: "¿Qué debe hacer el agente inspector si una persona plantea una consulta que excede su ámbito de competencia (por ejemplo, sobre una tasa fiscal)?", reverso: "Informar con claridad de que no es su ámbito de competencia y orientar a la persona hacia el servicio municipal correcto, evitando dar información no verificada" },
  { anverso: "¿Por qué es relevante que el agente inspector conozca bien el contenido de la campaña ambiental vigente antes de atender al público sobre ella?", reverso: "Porque una información incorrecta o contradictoria transmitida por el propio personal municipal puede generar confusión y desconfianza, restando eficacia a toda la campaña" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué información básica debe poder ofrecer un agente ante una consulta sobre una campaña de residuos?", explicacion: "Qué se pide, dónde depositarlo y a quién dirigirse para más información.", dificultad: "media", opciones: ["Qué se pide, dónde depositarlo y a quién dirigirse", "Solo el horario de recogida de basuras", "Solo el nombre de la empresa gestora", "No debe dar ninguna información al respecto"], correcta: 0 },
  { enunciado: "¿Qué actitud debe mantener el agente ante una queja sobre una poda o corte de vegetación?", explicacion: "Escuchar activamente, explicar el motivo y orientar si no puede resolverlo.", dificultad: "media", opciones: ["Escuchar, explicar el motivo y orientar si procede", "Ignorar la queja sin dar explicaciones", "Discutir con la persona sin escuchar sus razones", "Derivar siempre sin dar ninguna explicación"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta la atención presencial frente a otros canales de una campaña?", explicacion: "Resuelve dudas de forma personalizada e inmediata.", dificultad: "media", opciones: ["Resuelve dudas de forma personalizada e inmediata", "No aporta ninguna ventaja específica", "Sustituye por completo a los carteles informativos", "Solo sirve para quejas, no para dudas"], correcta: 0 },
  { enunciado: "¿Qué debe hacer el agente ante una consulta fuera de su ámbito de competencia?", explicacion: "Informar con claridad y orientar hacia el servicio competente.", dificultad: "media", opciones: ["Informar y orientar hacia el servicio competente", "Dar una respuesta aproximada sin verificarla", "Ignorar la consulta sin ninguna respuesta", "Resolverla igualmente aunque no sea su ámbito"], correcta: 0 },
  { enunciado: "¿Por qué es relevante conocer bien el contenido de la campaña antes de atender al público sobre ella?", explicacion: "Una información incorrecta genera confusión y resta eficacia a la campaña.", dificultad: "media", opciones: ["Evita confusión y mantiene la eficacia de la campaña", "No influye en el resultado de la campaña", "Solo es relevante para el personal administrativo", "Solo importa si la campaña es sobre residuos"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 15 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 15, orden: 15, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-100 creado y vinculado como Tema 15 de Oficial Agente Inspector.");

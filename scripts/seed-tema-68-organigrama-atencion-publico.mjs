/**
 * Crea tema-68: "Organigrama municipal y atención al público" — Tema 14
 * (numero=14, bloque-2) de Oficial Mantenimiento General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 12 oficial del Anexo I (bases2110.pdf):
 *   "Organigrama del Ayuntamiento de Zaragoza. Ubicación de Centros.
 *   Servicios y dependencias municipales. La atención al público. La
 *   información telefónica. La información oral/presencial."
 *
 * Contenido propio y distinto de tema-15 (Auxiliar Administrativo:
 * participación ciudadana, ROTPC), aunque comparte el ámbito general de
 * atención a la ciudadanía; se opta por contenido dedicado para no
 * modificar un tema canónico ya publicado y en uso por otra oposición.
 * Sobre la estructura municipal se sigue la organización general y
 * pública conocida del Ayuntamiento de Zaragoza (Alcaldía, Áreas de
 * Gobierno, Distritos/Juntas); no se citan datos internos no verificados
 * (nombres de responsables, organigrama detallado por unidades), que
 * varían con cada mandato y quedan fuera del alcance verificable en
 * esta sesión — se advierte explícitamente al alumnado que debe
 * consultar el organigrama vigente en la web municipal antes del examen.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-68-organigrama-atencion-publico.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-68";
const OPOSICION = "oficial-mantenimiento-ayto-zaragoza";
const BLOQUE_2_ID = "336de420-fb74-4814-9d50-6e2981ed064f";

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
  titulo: "Organigrama municipal y atención al público",
  descripcion: "Organigrama del Ayuntamiento de Zaragoza. Ubicación de centros, servicios y dependencias municipales. La atención al público, la información telefónica y la información oral/presencial.",
  contenido: "Desarrolla la estructura organizativa general del Ayuntamiento de Zaragoza (Alcaldía, Áreas de Gobierno, Distritos y Juntas Municipales/Vecinales) y la ubicación de sus principales centros y dependencias, junto con los criterios y técnicas de atención al público en sus distintos canales: telefónico, oral y presencial. Se advierte que el organigrama detallado por unidades y responsables varía con cada mandato corporativo, por lo que debe consultarse siempre su versión vigente en la sede electrónica municipal.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Organigrama, centros, servicios y dependencias municipales", seccion: "organigrama-centros-servicios-municipales", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Atención telefónica, oral y presencial", seccion: "atencion-telefonica-oral-presencial", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Calidad en la atención a la ciudadanía", seccion: "calidad-atencion-ciudadania", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "organigrama-centros-servicios-municipales";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuáles son los órganos superiores de gobierno del Ayuntamiento de Zaragoza?", reverso: "El Alcalde o Alcaldesa, la Junta de Gobierno Local y el Pleno del Ayuntamiento, con la estructura de Áreas de Gobierno delegadas por la Alcaldía" },
  { anverso: "¿Qué es un Área de Gobierno municipal?", reverso: "Una gran unidad organizativa del Ayuntamiento, encabezada por un Consejero o Consejera de Área, que agrupa varias materias de gestión (por ejemplo, Urbanismo, Servicios Públicos, Servicios Sociales)" },
  { anverso: "¿En cuántos Distritos urbanos se organiza el municipio de Zaragoza, aproximadamente?", reverso: "Zaragoza se organiza en varios Distritos urbanos (en torno a 15, según la delimitación vigente) más los Barrios Rurales, cada uno con su Junta Municipal o Junta Vecinal" },
  { anverso: "¿Qué son las oficinas municipales de atención ciudadana (OMAC)?", reverso: "Los puntos de atención presencial descentralizados del Ayuntamiento de Zaragoza, distribuidos por los distritos, donde la ciudadanía puede realizar trámites y consultas sin desplazarse al centro" },
  { anverso: "¿Dónde debe consultarse el organigrama actualizado y vigente del Ayuntamiento de Zaragoza?", reverso: "En la sede electrónica y la web institucional del Ayuntamiento de Zaragoza (zaragoza.es), ya que el organigrama detallado por unidades cambia con cada mandato corporativo" },
  { anverso: "¿Qué es el Registro General del Ayuntamiento de Zaragoza?", reverso: "La oficina donde se presentan formalmente instancias, solicitudes y documentos dirigidos a cualquier órgano municipal, dejando constancia oficial de la fecha de entrada" },
  { anverso: "¿Qué es un Centro Cívico dentro de la organización municipal?", reverso: "Un equipamiento municipal de proximidad, gestionado dentro de la estructura de servicios municipales, donde se desarrollan actividades socioculturales y de participación vecinal" },
  { anverso: "¿Qué diferencia hay entre un servicio 'central' y un servicio 'desconcentrado' del Ayuntamiento?", reverso: "El servicio central se presta desde las dependencias principales del Ayuntamiento; el desconcentrado se presta más cerca de la ciudadanía, a través de dependencias distribuidas por distritos o barrios" },
  { anverso: "¿Qué son las 'Juntas Municipales' dentro de la organización territorial de Zaragoza?", reverso: "Los órganos de gestión desconcentrada de cada Distrito, que dan cauce a la participación vecinal y tramitan asuntos de gestión municipal de proximidad" },
  { anverso: "¿Por qué es importante que un oficial de mantenimiento general conozca la ubicación de los centros municipales?", reverso: "Porque su trabajo requiere desplazarse a distintos equipamientos (centros cívicos, colegios, instalaciones deportivas) y necesita ubicarlos con rapidez para atender incidencias" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuáles son los órganos superiores de gobierno del Ayuntamiento de Zaragoza?", explicacion: "El Alcalde/Alcaldesa, la Junta de Gobierno Local y el Pleno.", dificultad: "media", opciones: ["Alcaldía, Junta de Gobierno Local y Pleno", "Solo el Alcalde o Alcaldesa", "Solo el Pleno municipal", "Las Juntas Municipales de Distrito"], correcta: 0 },
  { enunciado: "¿Qué es un Área de Gobierno municipal?", explicacion: "Una gran unidad organizativa encabezada por un Consejero o Consejera de Área.", dificultad: "media", opciones: ["Una unidad organizativa encabezada por un Consejero de Área", "Un tipo de Centro Cívico", "Una oficina de atención ciudadana", "Un órgano exclusivo de barrios rurales"], correcta: 0 },
  { enunciado: "¿Qué son las OMAC del Ayuntamiento de Zaragoza?", explicacion: "Oficinas municipales de atención ciudadana, puntos presenciales descentralizados.", dificultad: "media", opciones: ["Oficinas municipales de atención ciudadana", "Un tipo de Área de Gobierno", "El Registro General único", "Las Juntas Municipales de Distrito"], correcta: 0 },
  { enunciado: "¿Dónde debe consultarse el organigrama vigente y actualizado del Ayuntamiento?", explicacion: "En la sede electrónica y web institucional (zaragoza.es).", dificultad: "facil", opciones: ["En la sede electrónica municipal (zaragoza.es)", "En cualquier buscador de internet genérico", "No es necesario consultarlo, es siempre el mismo", "Solo se puede consultar de forma presencial"], correcta: 0 },
  { enunciado: "¿Qué función cumple el Registro General del Ayuntamiento?", explicacion: "Recibir formalmente instancias y documentos, dejando constancia de la fecha de entrada.", dificultad: "media", opciones: ["Recibir formalmente instancias y documentos", "Gestionar el organigrama de Áreas de Gobierno", "Coordinar las Juntas Municipales", "Programar actividades de Centros Cívicos"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre un servicio central y uno desconcentrado?", explicacion: "El central se presta en dependencias principales; el desconcentrado, más cerca de la ciudadanía por distritos.", dificultad: "media", opciones: ["El desconcentrado se presta más cerca de la ciudadanía", "Son exactamente lo mismo", "El central solo existe en barrios rurales", "El desconcentrado no tramita ningún asunto"], correcta: 0 },
  { enunciado: "¿Qué son las Juntas Municipales dentro de la organización territorial?", explicacion: "Órganos de gestión desconcentrada de cada Distrito.", dificultad: "media", opciones: ["Órganos de gestión desconcentrada de cada Distrito", "Un tipo de Área de Gobierno central", "El órgano superior de gobierno municipal", "Una oficina exclusiva de atención telefónica"], correcta: 0 },
  { enunciado: "¿Por qué es relevante para un oficial de mantenimiento general conocer la ubicación de los centros municipales?", explicacion: "Porque su trabajo implica desplazarse a distintos equipamientos para atender incidencias.", dificultad: "facil", opciones: ["Porque debe desplazarse a distintos equipamientos", "Porque debe redactar el organigrama municipal", "Porque tramita instancias en el Registro General", "Porque gestiona directamente las Áreas de Gobierno"], correcta: 0 },
]);

const S2 = "atencion-telefonica-oral-presencial";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué elementos son clave al descolgar el teléfono en una atención institucional?", reverso: "Identificarse (servicio y, en su caso, nombre), saludar con cortesía, y mostrar disposición para atender la consulta desde el primer momento" },
  { anverso: "¿Qué diferencia principal hay entre la comunicación telefónica y la presencial?", reverso: "En la telefónica no existe comunicación visual (gestos, expresión), por lo que el tono de voz y la claridad verbal adquieren mayor importancia relativa" },
  { anverso: "¿Qué se recomienda hacer si, en una llamada, no se puede resolver la consulta de la persona que llama?", reverso: "Informar con claridad de a quién o dónde debe dirigirse, o tomar nota de sus datos para que se le devuelva la llamada, evitando dejarla sin respuesta" },
  { anverso: "¿Qué es la escucha activa en la atención al público?", reverso: "Prestar atención completa al interlocutor, sin interrumpir, captando no solo las palabras sino también la intención y las necesidades reales de la consulta" },
  { anverso: "¿Qué caracteriza un lenguaje adecuado en la atención presencial a la ciudadanía?", reverso: "Un lenguaje claro, comprensible, sin tecnicismos innecesarios ni jerga administrativa, adaptado a la persona que se tiene delante" },
  { anverso: "¿Qué actitud debe evitarse en la atención oral/presencial ante una persona alterada o molesta?", reverso: "Responder con el mismo tono o actitud negativa; conviene mantener la calma, escuchar y reconducir la conversación de forma profesional" },
  { anverso: "¿Qué información básica debe recabarse al recibir un aviso o incidencia por teléfono en tareas de mantenimiento?", reverso: "Ubicación exacta, tipo de incidencia, urgencia/gravedad, y datos de contacto de quien avisa por si se necesita más información" },
  { anverso: "¿Por qué es importante la puntualidad y disponibilidad en la atención presencial de un servicio público?", reverso: "Porque la ciudadanía acude con una expectativa de horario y disponibilidad, y su incumplimiento genera una percepción negativa del servicio público" },
  { anverso: "¿Qué se entiende por 'primera impresión' en la atención presencial?", reverso: "La valoración inicial que se forma la persona usuaria en los primeros segundos de contacto, basada en aspectos como el saludo, la actitud y el aspecto del entorno" },
  { anverso: "¿Qué debe hacerse cuando una consulta o incidencia recibida no es competencia del área o servicio que la atiende?", reverso: "Orientar a la persona hacia el servicio o unidad competente, en lugar de simplemente rechazar la consulta sin más información" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es clave al descolgar el teléfono en una atención institucional?", explicacion: "Identificarse, saludar con cortesía y mostrar disposición.", dificultad: "facil", opciones: ["Identificarse y mostrar disposición a atender", "Preguntar primero el motivo sin saludar", "Colgar si no se reconoce el número", "Transferir la llamada sin identificarse"], correcta: 0 },
  { enunciado: "¿Qué diferencia principal hay entre la comunicación telefónica y la presencial?", explicacion: "En la telefónica no hay comunicación visual, por lo que el tono de voz es más importante.", dificultad: "media", opciones: ["No hay comunicación visual en la telefónica", "Son exactamente iguales en todos los aspectos", "La presencial no requiere escucha activa", "La telefónica no requiere identificarse"], correcta: 0 },
  { enunciado: "¿Qué es la escucha activa en la atención al público?", explicacion: "Prestar atención completa sin interrumpir, captando la intención y necesidades reales.", dificultad: "media", opciones: ["Prestar atención completa sin interrumpir", "Responder inmediatamente sin dejar hablar", "Repetir literalmente lo que dice el usuario", "Anotar solo los datos de contacto"], correcta: 0 },
  { enunciado: "¿Qué caracteriza un lenguaje adecuado en la atención presencial?", explicacion: "Claro, comprensible, sin tecnicismos ni jerga innecesaria.", dificultad: "facil", opciones: ["Claro y sin tecnicismos innecesarios", "Técnico y formal en todos los casos", "Con abundante jerga administrativa", "Lo más breve posible, sin explicaciones"], correcta: 0 },
  { enunciado: "¿Qué actitud debe evitarse ante una persona alterada en la atención presencial?", explicacion: "Responder con el mismo tono negativo; hay que mantener la calma.", dificultad: "media", opciones: ["Responder con el mismo tono negativo", "Escuchar y mantener la calma", "Reconducir la conversación con profesionalidad", "Pedir disculpas cuando proceda"], correcta: 0 },
  { enunciado: "¿Qué información básica debe recabarse al recibir un aviso de incidencia de mantenimiento?", explicacion: "Ubicación, tipo de incidencia, urgencia y datos de contacto.", dificultad: "media", opciones: ["Ubicación, tipo de incidencia, urgencia y contacto", "Solo el nombre de quien avisa", "Solo la hora exacta del aviso", "Solo si es una queja o una consulta"], correcta: 0 },
  { enunciado: "¿Por qué es importante la puntualidad en la atención presencial de un servicio público?", explicacion: "Porque su incumplimiento genera una percepción negativa del servicio.", dificultad: "facil", opciones: ["Su incumplimiento genera percepción negativa del servicio", "No influye en la percepción del servicio", "Solo importa en la atención telefónica", "Solo importa en incidencias de mantenimiento"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse ante una consulta que no es competencia del servicio que la atiende?", explicacion: "Orientar a la persona hacia el servicio o unidad competente.", dificultad: "media", opciones: ["Orientar hacia el servicio competente", "Rechazarla sin más información", "Ignorarla hasta que se repita", "Responderla igualmente aunque no sea competente"], correcta: 0 },
]);

const S3 = "calidad-atencion-ciudadania";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el Manual de Atención a la Ciudadanía del Ayuntamiento de Zaragoza?", reverso: "Un documento interno de referencia que recoge criterios y protocolos comunes de calidad para la atención a la ciudadanía en los distintos servicios y canales municipales" },
  { anverso: "¿Cuáles son los factores clave que determinan la calidad percibida de un servicio de atención pública?", reverso: "Los aspectos tangibles del entorno, la capacidad de respuesta, la fiabilidad/seguridad transmitida, y la empatía hacia la persona atendida" },
  { anverso: "¿Qué es el 'momento de la verdad' en la atención a la ciudadanía?", reverso: "El instante concreto de contacto directo entre la persona usuaria y el empleado público, donde se forma la percepción real de la calidad del servicio, más allá de la normativa o los medios disponibles" },
  { anverso: "¿Cuáles son las causas más habituales de una baja calidad percibida en la atención a un servicio público?", reverso: "La actitud inadecuada del personal y la lentitud o demora excesiva en la respuesta" },
  { anverso: "¿Qué significa 'personalizar' la atención a la ciudadanía?", reverso: "Adaptar el trato a la situación concreta de cada persona (por ejemplo, usando su nombre o mostrando cercanía), en lugar de aplicar un trato genérico e impersonal" },
  { anverso: "¿Qué es la mejora continua aplicada a la atención a la ciudadanía?", reverso: "El principio de revisar y perfeccionar de forma constante los procesos y el trato al público, en lugar de conformarse con un nivel de calidad ya alcanzado" },
  { anverso: "¿Por qué es relevante que un oficial de mantenimiento general aplique criterios de calidad en la atención, aunque su función principal no sea de cara al público?", reverso: "Porque en su trabajo diario puede tener contacto directo con la ciudadanía en equipamientos municipales (colegios, centros cívicos), y su actitud también forma parte de la imagen del servicio municipal" },
  { anverso: "¿Qué diferencia hay entre una actitud 'reactiva' y una actitud 'proactiva' en la atención a incidencias?", reverso: "La reactiva espera a que se produzca el problema para actuar; la proactiva anticipa y previene incidencias antes de que lleguen a afectar al servicio o a la ciudadanía" },
  { anverso: "¿Qué es un 'error de transferencia' en la atención a la ciudadanía, según los errores clásicos de servicio?", reverso: "Derivar a la persona usuaria de un servicio a otro sin resolver realmente su consulta, generando la sensación de que 'nadie se hace cargo' del problema" },
  { anverso: "¿Qué papel cumple la autocontrol emocional en la calidad de la atención al público?", reverso: "Permite mantener un trato profesional y sereno incluso ante situaciones tensas o quejas, evitando que una reacción personal deteriore la calidad del servicio" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el Manual de Atención a la Ciudadanía del Ayuntamiento de Zaragoza?", explicacion: "Un documento que recoge criterios y protocolos comunes de calidad de atención.", dificultad: "media", opciones: ["Un documento con criterios comunes de calidad de atención", "El organigrama oficial del Ayuntamiento", "Un reglamento de participación ciudadana", "Una ordenanza fiscal municipal"], correcta: 0 },
  { enunciado: "¿Cuáles son los factores clave de la calidad percibida en un servicio de atención?", explicacion: "Aspectos tangibles, capacidad de respuesta, fiabilidad y empatía.", dificultad: "media", opciones: ["Tangibles, respuesta, fiabilidad y empatía", "Solo la rapidez de respuesta", "Solo el aspecto de las instalaciones", "Solo la formación técnica del personal"], correcta: 0 },
  { enunciado: "¿Qué es el 'momento de la verdad' en la atención a la ciudadanía?", explicacion: "El instante de contacto directo donde se forma la percepción real de calidad.", dificultad: "media", opciones: ["El instante de contacto directo con la persona usuaria", "El momento de firmar un reglamento", "La revisión anual del Manual de Atención", "El momento de recibir una queja por escrito"], correcta: 0 },
  { enunciado: "¿Cuáles son las causas más habituales de baja calidad percibida en un servicio público?", explicacion: "La actitud inadecuada del personal y la lentitud en la respuesta.", dificultad: "facil", opciones: ["Actitud inadecuada y lentitud en la respuesta", "El exceso de personal disponible", "La existencia de un Manual de Atención", "La ubicación del centro municipal"], correcta: 0 },
  { enunciado: "¿Qué significa personalizar la atención a la ciudadanía?", explicacion: "Adaptar el trato a la situación concreta de cada persona.", dificultad: "media", opciones: ["Adaptar el trato a cada persona concreta", "Aplicar siempre el mismo protocolo genérico", "Evitar usar el nombre de la persona atendida", "Delegar siempre en otro servicio"], correcta: 0 },
  { enunciado: "¿Qué diferencia una actitud reactiva de una proactiva ante incidencias?", explicacion: "La proactiva anticipa y previene; la reactiva espera a que ocurra el problema.", dificultad: "media", opciones: ["La proactiva anticipa; la reactiva espera al problema", "Son sinónimos en la gestión de incidencias", "La reactiva siempre es más eficaz", "La proactiva solo aplica a atención telefónica"], correcta: 0 },
  { enunciado: "¿Qué es un 'error de transferencia' en la atención a la ciudadanía?", explicacion: "Derivar a otro servicio sin resolver realmente la consulta.", dificultad: "dificil", opciones: ["Derivar sin resolver realmente la consulta", "Personalizar en exceso la atención", "Aplicar mejora continua al servicio", "Mostrar autocontrol emocional ante una queja"], correcta: 0 },
  { enunciado: "¿Por qué es relevante la calidad de atención para un oficial de mantenimiento general?", explicacion: "Porque puede tener contacto directo con la ciudadanía en equipamientos municipales.", dificultad: "facil", opciones: ["Porque puede tener contacto con la ciudadanía en equipamientos", "Porque gestiona directamente el Registro General", "Porque redacta el Manual de Atención", "Porque coordina las Áreas de Gobierno"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 14 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 14, orden: 14, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-68 creado y vinculado como Tema 14 de Oficial Mantenimiento General.");

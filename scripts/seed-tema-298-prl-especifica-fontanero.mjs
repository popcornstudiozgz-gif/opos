/**
 * Crea tema-298: "PRL específica de fontanería: amianto, espacios
 * confinados y entibaciones" — Tema 22 (numero=22, bloque-2), ÚLTIMO tema
 * de la parte específica de Oficial Fontanero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 20 oficial del Anexo I (bases1716.pdf, línea 552):
 * "Prevención de Riesgos Laborales: Riesgos Laborales específicos en las
 * funciones de fontanero, medidas de protección individuales y colectivas
 * a las funciones de la categoría. Trabajos en presencia de amianto.
 * Normativa Trabajos en espacios confinados. Normativa. Entibos.
 * Normativa."
 *
 * Sourcing — las tres normas de este tema ya están verificadas en otras
 * "Oficial X" de este mismo proyecto, reutilizadas sin nueva búsqueda por
 * tratarse de la misma normativa técnica aplicable a fontanería:
 *   - RD 396/2006, de 31 de marzo, sobre trabajos con riesgo de exposición
 *     al amianto (BOE-A-2006-6034) — ya verificado en Oficial Albañil,
 *     relevante aquí por las conducciones de fibrocemento con amianto
 *     todavía presentes en instalaciones antiguas de agua y saneamiento.
 *   - PPRL-1601, "Procedimiento para la realización de Trabajos en
 *     Espacios Confinados" del Ayuntamiento de Zaragoza (mayo 2020) — ya
 *     localizado, leído íntegro y verificado en Oficial Guardallaves y
 *     reutilizado en Oficial Planta Potabilizadora; aplicable igualmente a
 *     un Oficial Fontanero que trabaje en arquetas, pozos o depósitos.
 *   - RD 1627/1997, de 24 de octubre, disposiciones mínimas de seguridad y
 *     salud en las obras de construcción (BOE-A-1997-24853) — ya
 *     verificado en Oficial Cementerio para el tema de excavaciones y
 *     entibaciones de zanjas, tarea habitual también en fontanería.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-298-prl-especifica-fontanero.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-298";
const OPOSICION = "oficial-fontanero-ayto-zaragoza";
const BLOQUE_2_ID = "417e77bc-e7ac-4984-ae49-3a35de79350d";

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
  titulo: "PRL específica de fontanería: amianto, espacios confinados y entibaciones",
  descripcion: "Riesgos específicos del oficio de fontanero y trabajos con presencia de amianto (RD 396/2006, fibrocemento en conducciones antiguas). Trabajos en espacios confinados (PPRL-1601 del Ayuntamiento de Zaragoza). Entibaciones en zanjas (RD 1627/1997).",
  contenido: "Cierra la parte específica del temario con los riesgos laborales propios del oficio de fontanero y tres materias de especial relevancia: los trabajos con presencia de amianto en conducciones antiguas de fibrocemento, regulados por el RD 396/2006; los trabajos en espacios confinados (arquetas, pozos, depósitos), conforme al procedimiento municipal PPRL-1601 del Ayuntamiento de Zaragoza; y las entibaciones necesarias en zanjas de cierta profundidad, conforme al RD 1627/1997 sobre seguridad y salud en las obras de construcción.",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2006-6034", titulo: "Real Decreto 396/2006, de 31 de marzo, trabajos con riesgo de exposición al amianto" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1997-24853", titulo: "Real Decreto 1627/1997, de 24 de octubre, disposiciones mínimas de seguridad y salud en las obras de construcción" },
  ],
  indice_estudio: [
    { url: "", titulo: "Riesgos específicos y trabajos con amianto", seccion: "riesgos-especificos-y-trabajos-con-amianto", articulos: "RD 396/2006" },
    { url: "", titulo: "Trabajos en espacios confinados", seccion: "trabajos-en-espacios-confinados", articulos: "PPRL-1601 (Ayuntamiento de Zaragoza)" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1997-24853", titulo: "Entibaciones en zanjas", seccion: "entibaciones-en-zanjas", articulos: "RD 1627/1997" },
  ],
}]);

const S1 = "riesgos-especificos-y-trabajos-con-amianto";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuáles son algunos de los riesgos laborales más habituales en las funciones propias de un Oficial Fontanero?", reverso: "Cortes y golpes con herramientas manuales, quemaduras por soldadura, sobreesfuerzos al manipular tuberías y equipos, posturas forzadas en espacios reducidos, y riesgos derivados de trabajos en zanjas o espacios confinados" },
  { anverso: "¿Qué regula el Real Decreto 396/2006, y por qué es relevante para un fontanero?", reverso: "Regula los trabajos con riesgo de exposición al amianto; es relevante porque las conducciones antiguas de fibrocemento (que contienen amianto) siguen presentes en instalaciones de agua y saneamiento de edificios anteriores a su prohibición" },
  { anverso: "¿Qué obligación general impone el RD 396/2006 antes de intervenir en una conducción que pueda contener amianto?", reverso: "Identificar la presencia de amianto antes de la intervención y, si se confirma, aplicar un plan de trabajo específico que minimice la exposición, con personal formado y con la protección adecuada" },
  { anverso: "¿Qué medida de protección colectiva o individual es especialmente relevante al manipular fibrocemento con amianto?", reverso: "Evitar en todo lo posible operaciones que generen polvo (como cortar o romper el material en seco), humedecerlo si es inevitable manipularlo, y emplear equipos de protección respiratoria adecuados frente a fibras de amianto" },
  { anverso: "¿Por qué no debe un Oficial Fontanero, por su cuenta, romper o perforar una tubería antigua de fibrocemento sin haber verificado antes si contiene amianto?", reverso: "Porque manipular amianto sin las medidas del RD 396/2006 puede liberar fibras respirables, con un riesgo grave para la salud (enfermedades pulmonares graves, incluido el cáncer), que exige un procedimiento específico antes de intervenir" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuál de estos es un riesgo laboral habitual en las funciones de un Oficial Fontanero?", explicacion: "Cortes, quemaduras por soldadura, sobreesfuerzos, posturas forzadas, entre otros.", dificultad: "facil", opciones: ["Cortes con herramientas, quemaduras por soldadura y sobreesfuerzos al manipular tuberías", "Exclusivamente riesgos derivados del tráfico rodado en vías de circulación", "Exclusivamente riesgos derivados de la manipulación de alimentos", "Ningún riesgo específico distinto del propio de cualquier oficina administrativa"], correcta: 0 },
  { enunciado: "¿Qué regula el RD 396/2006?", explicacion: "Los trabajos con riesgo de exposición al amianto.", dificultad: "media", opciones: ["Los trabajos con riesgo de exposición al amianto", "Los trabajos en espacios confinados de cualquier tipo", "Las entibaciones en zanjas y excavaciones", "El control metrológico de los contadores de agua"], correcta: 0 },
  { enunciado: "¿Por qué es relevante el RD 396/2006 para un Oficial Fontanero?", explicacion: "Las conducciones antiguas de fibrocemento pueden contener amianto.", dificultad: "media", opciones: ["Porque las conducciones antiguas de fibrocemento pueden contener amianto", "Porque todas las tuberías modernas de PVC contienen amianto en su composición", "Porque el amianto se emplea como material de aportación en soldadura fuerte", "Porque el amianto es el gas comburente empleado en los equipos de oxicorte"], correcta: 0 },
  { enunciado: "¿Qué obligación impone el RD 396/2006 antes de intervenir en una conducción que pueda contener amianto?", explicacion: "Identificar su presencia y aplicar un plan de trabajo específico si se confirma.", dificultad: "dificil", opciones: ["Identificar la presencia de amianto y aplicar un plan de trabajo específico si se confirma", "Ninguna obligación previa: puede intervenirse con normalidad sin ninguna comprobación", "Sustituir automáticamente cualquier conducción antigua sin necesidad de identificar el material", "Aplicar exclusivamente un EPI respiratorio, sin ningún otro requisito adicional"], correcta: 0 },
  { enunciado: "¿Qué medida debería evitarse al manipular fibrocemento con amianto, según el RD 396/2006?", explicacion: "Generar polvo (cortar o romper en seco); mejor humedecer si es inevitable.", dificultad: "media", opciones: ["Generar polvo cortando o rompiendo el material en seco", "Humedecer el material antes de manipularlo si fuera inevitable hacerlo", "Emplear equipos de protección respiratoria adecuados durante la manipulación", "Formar previamente al personal que vaya a intervenir en la conducción"], correcta: 0 },
]);

const S2 = "trabajos-en-espacios-confinados";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es, en términos generales, un espacio confinado en el trabajo de un Oficial Fontanero?", reverso: "Un recinto con aberturas limitadas de entrada y salida, ventilación natural desfavorable, no concebido para una ocupación continuada, en el que pueden acumularse gases peligrosos o darse una atmósfera con déficit de oxígeno: por ejemplo, una arqueta profunda, un pozo o un depósito de agua" },
  { anverso: "¿Qué es el PPRL-1601 del Ayuntamiento de Zaragoza?", reverso: "El «Procedimiento para la realización de Trabajos en Espacios Confinados» del Ayuntamiento de Zaragoza (mayo de 2020), que establece las medidas y el procedimiento a seguir para trabajar con seguridad en este tipo de recintos" },
  { anverso: "¿Qué medida previa exige, con carácter general, un procedimiento de trabajos en espacios confinados como el PPRL-1601 antes de entrar en el recinto?", reverso: "Medir la atmósfera interior (oxígeno, gases tóxicos e inflamables) antes de la entrada, y ventilar el espacio si fuera necesario, además de disponer de un permiso de entrada específico" },
  { anverso: "¿Qué figura debe estar presente en el exterior de un espacio confinado mientras un trabajador opera en su interior, según los procedimientos habituales de este tipo de trabajos?", reverso: "Un vigilante o ayudante exterior, en comunicación permanente con el trabajador del interior, capaz de dar la alarma y activar el rescate si fuera necesario, sin entrar él mismo al espacio confinado salvo con el equipo de rescate adecuado" },
  { anverso: "¿Por qué se localizó y verificó el PPRL-1601 en este proyecto, a diferencia de otros procedimientos internos municipales similares (como el PPRL-1602 o el PPRL-1606)?", reverso: "Porque, a diferencia de esos otros procedimientos —no localizados públicamente en otras «Oficial X» del proyecto—, el PPRL-1601 sí se localizó y se leyó íntegro en una sesión anterior, republicado en un portal sindical, lo que permite citarlo como fuente real" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es, en términos generales, un espacio confinado?", explicacion: "Recinto con aberturas limitadas, mala ventilación, no concebido para ocupación continuada.", dificultad: "facil", opciones: ["Un recinto con aberturas limitadas, ventilación desfavorable y riesgo de gases peligrosos o falta de oxígeno", "Cualquier habitación de una vivienda con ventanas cerradas durante el invierno", "Cualquier vehículo de transporte de materiales de una obra municipal", "Cualquier almacén de herramientas de gran tamaño con buena ventilación"], correcta: 0 },
  { enunciado: "¿Qué es el PPRL-1601 del Ayuntamiento de Zaragoza?", explicacion: "El procedimiento municipal para trabajos en espacios confinados.", dificultad: "media", opciones: ["El «Procedimiento para la realización de Trabajos en Espacios Confinados» del Ayuntamiento de Zaragoza", "Un procedimiento exclusivo para trabajos con amianto, sin relación con espacios confinados", "Un procedimiento exclusivo para entibaciones de zanjas, sin relación con espacios confinados", "Un procedimiento exclusivo para la soldadura oxiacetilénica en talleres municipales"], correcta: 0 },
  { enunciado: "¿Qué debe medirse, con carácter general, antes de entrar en un espacio confinado?", explicacion: "La atmósfera interior: oxígeno, gases tóxicos e inflamables.", dificultad: "media", opciones: ["La atmósfera interior (oxígeno, gases tóxicos e inflamables)", "Exclusivamente la temperatura ambiente exterior al espacio confinado", "Exclusivamente el nivel de ruido exterior al espacio confinado", "Exclusivamente la humedad relativa del aire exterior al recinto"], correcta: 0 },
  { enunciado: "¿Qué función cumple el vigilante o ayudante exterior en un trabajo en espacio confinado?", explicacion: "Comunicación permanente y capacidad de dar la alarma y activar el rescate.", dificultad: "dificil", opciones: ["Mantener comunicación permanente con el trabajador interior y poder activar el rescate si es necesario", "Entrar directamente al espacio confinado sin ningún equipo si detecta cualquier anomalía", "Realizar exclusivamente tareas administrativas, sin ninguna relación con la seguridad del trabajo", "Sustituir al trabajador del interior cada 10 minutos, con independencia de cualquier incidencia"], correcta: 0 },
  { enunciado: "¿Cómo se verificó el PPRL-1601 en este proyecto, a diferencia de otros PPRL municipales no localizados?", explicacion: "Se localizó y leyó íntegro, republicado en un portal sindical.", dificultad: "dificil", opciones: ["Se localizó y se leyó íntegro, republicado en un portal sindical", "No se pudo verificar en ningún caso, aplicándose el mismo criterio que a los PPRL no localizados", "Se obtuvo directamente de la Oficina de Recursos Humanos del Ayuntamiento sin ninguna otra fuente", "Se dedujo su contenido exclusivamente a partir de otros PPRL ya verificados en el proyecto"], correcta: 0 },
]);

const S3 = "entibaciones-en-zanjas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué regula, en lo relativo a zanjas y excavaciones, el Real Decreto 1627/1997?", reverso: "Las disposiciones mínimas de seguridad y salud en las obras de construcción, entre ellas las relativas a excavaciones, zanjas y su entibación para evitar el riesgo de desprendimiento de tierras" },
  { anverso: "¿Qué es una entibación, en el contexto de una zanja abierta para fontanería?", reverso: "Un sistema de apeo o contención de las paredes de la zanja (con tablones, paneles metálicos u otros elementos), destinado a evitar su desprendimiento y proteger a los trabajadores que operan en su interior" },
  { anverso: "¿Por qué es especialmente relevante la entibación en las zanjas donde trabaja un Oficial Fontanero para tender o reparar tuberías?", reverso: "Porque el desprendimiento de tierras es uno de los riesgos más graves de este tipo de trabajos, con consecuencias potencialmente mortales por sepultamiento, y aumenta con la profundidad y el tipo de terreno" },
  { anverso: "¿Qué factores influyen en la necesidad y el tipo de entibación que debe aplicarse a una zanja?", reverso: "La profundidad de la zanja, el tipo de terreno (cohesión, humedad), la presencia de cargas próximas al borde (vehículos, materiales apilados) y las condiciones climáticas, entre otros factores técnicos" },
  { anverso: "¿Qué debe comprobar el Oficial antes de entrar en una zanja ya entibada para trabajar en la tubería?", reverso: "Que la entibación está correctamente colocada y en buen estado, sin daños ni desplazamientos, y que se han seguido las indicaciones técnicas previstas para ese tipo de terreno y profundidad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué regula el Real Decreto 1627/1997 en relación con zanjas y excavaciones?", explicacion: "Disposiciones mínimas de seguridad y salud en las obras de construcción.", dificultad: "facil", opciones: ["Las disposiciones mínimas de seguridad y salud en las obras de construcción", "Exclusivamente el control metrológico de los contadores de agua", "Exclusivamente los trabajos con riesgo de exposición al amianto", "Exclusivamente la soldadura oxiacetilénica y el oxicorte"], correcta: 0 },
  { enunciado: "¿Qué es una entibación en una zanja de fontanería?", explicacion: "Un sistema de apeo o contención de las paredes para evitar su desprendimiento.", dificultad: "media", opciones: ["Un sistema de apeo o contención de las paredes de la zanja para evitar su desprendimiento", "Un sistema de purga de aire de la propia tubería que se está instalando en la zanja", "Un sistema de medición del caudal de agua que circula por la nueva tubería", "Un sistema de ventilación forzada exclusivo de los espacios confinados"], correcta: 0 },
  { enunciado: "¿Por qué es especialmente grave el riesgo de desprendimiento de tierras en una zanja sin entibar?", explicacion: "Puede provocar el sepultamiento de los trabajadores, con consecuencias potencialmente mortales.", dificultad: "media", opciones: ["Porque puede provocar el sepultamiento de los trabajadores, con consecuencias potencialmente mortales", "Porque solo afecta a la calidad estética del acabado final de la zanja", "Porque reduce exclusivamente la velocidad de ejecución de la obra, sin ningún riesgo real", "Porque afecta exclusivamente al coste económico final de la obra, sin ningún riesgo físico"], correcta: 0 },
  { enunciado: "¿Qué factores influyen en el tipo de entibación necesaria para una zanja?", explicacion: "Profundidad, tipo de terreno, cargas próximas al borde, condiciones climáticas.", dificultad: "dificil", opciones: ["La profundidad, el tipo de terreno, las cargas próximas al borde y las condiciones climáticas", "Exclusivamente el color del terreno excavado, sin ningún otro factor técnico relevante", "Exclusivamente la hora del día en que se ejecuta la excavación, sin otro factor técnico", "Exclusivamente el material de la tubería que se va a instalar en el interior de la zanja"], correcta: 0 },
  { enunciado: "¿Qué debe comprobar el Oficial antes de entrar en una zanja ya entibada?", explicacion: "Que la entibación está correctamente colocada y en buen estado, sin daños.", dificultad: "media", opciones: ["Que la entibación está correctamente colocada y en buen estado, sin daños ni desplazamientos", "Que la entibación ha sido retirada por completo antes de su entrada a la zanja", "Que el color de la entibación coincide con el del resto de materiales de la obra", "Que la entibación ha sido sustituida por una barandilla perimetral exclusivamente"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Fibrocemento", definicion: "Material compuesto de cemento y fibras (tradicionalmente de amianto) empleado en conducciones antiguas de agua y saneamiento, hoy prohibido por su composición." },
  { tema_slug: TEMA, seccion: S1, termino: "RD 396/2006", definicion: "Real Decreto sobre trabajos con riesgo de exposición al amianto, relevante para intervenciones en conducciones antiguas de fibrocemento." },
  { tema_slug: TEMA, seccion: S2, termino: "Espacio confinado", definicion: "Recinto de acceso limitado y ventilación desfavorable, no concebido para ocupación continuada, con riesgo de gases peligrosos o falta de oxígeno." },
  { tema_slug: TEMA, seccion: S2, termino: "PPRL-1601", definicion: "Procedimiento del Ayuntamiento de Zaragoza para la realización de trabajos en espacios confinados, verificado en este proyecto." },
  { tema_slug: TEMA, seccion: S3, termino: "Entibación", definicion: "Sistema de apeo o contención de las paredes de una zanja o excavación, destinado a evitar su desprendimiento." },
  { tema_slug: TEMA, seccion: S3, termino: "RD 1627/1997", definicion: "Real Decreto de disposiciones mínimas de seguridad y salud en las obras de construcción, aplicable entre otros aspectos a excavaciones y entibaciones." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 22 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 22, orden: 22, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-298 creado y vinculado como Tema 22 de Oficial Fontanero — ÚLTIMO tema de la parte específica.");

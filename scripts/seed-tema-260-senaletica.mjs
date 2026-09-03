/**
 * Crea tema-260: "Señalética en lugares de trabajo y de lugares de
 * pública concurrencia. Cartelería en proyectos de las Administraciones
 * Públicas" — Tema 16 (numero=16, bloque-2) de Oficial Pintor,
 * Especialidad Gráfica (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 14 oficial del Anexo I (bases2110.pdf, línea
 * 1524): "Señalética en lugares de trabajo y de lugares de pública
 * concurrencia. Cartelería en proyectos de las Administraciones
 * Públicas. Normativa."
 *
 * Normativa verificada mediante WebSearch en esta sesión:
 * - RD 485/1997, de 14 de abril, disposiciones mínimas en materia de
 *   señalización de seguridad y salud en el trabajo (BOE-A-1997-8668).
 * - RDLeg 1/2013, de 29 de noviembre, texto refundido de la Ley General
 *   de derechos de las personas con discapacidad y de su inclusión
 *   social (BOE-A-2013-12632) — accesibilidad y señalización adecuada
 *   en espacios y proyectos de las Administraciones Públicas.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-260-senaletica.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-260";
const OPOSICION = "oficial-pintor-grafica-ayto-zaragoza";
const BLOQUE_2_ID = "1e5d5916-cf4a-4920-9175-579f18034ad6";

const RD_485_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-8668";
const RDLEG_1_2013 = "https://www.boe.es/buscar/act.php?id=BOE-A-2013-12632";

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
  titulo: "Señalética en lugares de trabajo y de pública concurrencia",
  descripcion: "La señalización de seguridad y salud en el trabajo (RD 485/1997). La accesibilidad de la señalética en espacios y proyectos de las Administraciones Públicas (RDLeg 1/2013). La cartelería institucional.",
  contenido: "Desarrolla la señalética como disciplina propia del Oficial Pintor Especialidad Gráfica: la señalización de seguridad y salud en el trabajo, regulada por el RD 485/1997, con sus colores, formas geométricas y pictogramas normalizados; la accesibilidad de la señalética y la cartelería en proyectos de las Administraciones Públicas, exigida por el RDLeg 1/2013 (formato de lectura fácil, contraste, información accesible); y las particularidades de la cartelería institucional en lugares de pública concurrencia (edificios municipales, centros cívicos, instalaciones deportivas), donde confluyen las exigencias de seguridad, accesibilidad e identidad visual.",
  enlaces_boe: [
    { url: RD_485_1997, titulo: "RD 485/1997 — señalización de seguridad y salud en el trabajo" },
    { url: RDLEG_1_2013, titulo: "RDLeg 1/2013 — Ley General de derechos de las personas con discapacidad" },
  ],
  indice_estudio: [
    { url: RD_485_1997, titulo: "La señalización de seguridad y salud en el trabajo (RD 485/1997)", seccion: "senalizacion-seguridad-salud-trabajo", articulos: "RD 485/1997" },
    { url: RDLEG_1_2013, titulo: "Accesibilidad de la señalética en proyectos de las Administraciones Públicas", seccion: "accesibilidad-senaletica-administraciones-publicas", articulos: "RDLeg 1/2013" },
    { url: "", titulo: "La cartelería en lugares de pública concurrencia", seccion: "carteleria-lugares-publica-concurrencia", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "senalizacion-seguridad-salud-trabajo";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué regula el RD 485/1997?", reverso: "Las disposiciones mínimas en materia de señalización de seguridad y salud en el trabajo, estableciendo los colores, formas geométricas, pictogramas y demás características que debe reunir cualquier señal de seguridad instalada en un centro de trabajo" },
  { anverso: "¿Qué significan, según el RD 485/1997, las señales de forma redonda con pictograma negro sobre fondo azul?", reverso: "Son señales de obligación, que indican un comportamiento específico que debe seguirse obligatoriamente (por ejemplo, \"uso obligatorio de casco\" o \"uso obligatorio de protección auditiva\")" },
  { anverso: "¿Qué significan las señales de forma triangular con pictograma negro sobre fondo amarillo, conforme al RD 485/1997?", reverso: "Son señales de advertencia, que informan de un riesgo o peligro determinado presente en esa zona (por ejemplo, \"riesgo eléctrico\" o \"peligro de caída a distinto nivel\")" },
  { anverso: "¿Qué significan las señales de forma redonda con pictograma negro sobre fondo blanco y banda diagonal roja, conforme al RD 485/1997?", reverso: "Son señales de prohibición, que prohíben expresamente un comportamiento que podría provocar un riesgo (por ejemplo, \"prohibido fumar\" o \"prohibido el paso a personas no autorizadas\")" },
  { anverso: "¿Qué debe tener en cuenta el Oficial Pintor Especialidad Gráfica al reproducir una señal de seguridad normalizada para un edificio o instalación municipal, más allá de su criterio estético?", reverso: "Que la forma geométrica, el color y el pictograma de cada tipo de señal están normalizados por el RD 485/1997 y no pueden modificarse libremente, dado que su función de comunicar un riesgo o una instrucción de seguridad depende precisamente de esa normalización reconocible" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué regula el RD 485/1997?", explicacion: "Las disposiciones mínimas en materia de señalización de seguridad y salud en el trabajo.", dificultad: "facil", opciones: ["La señalización de seguridad y salud en el trabajo", "La protección frente a la humedad de los edificios", "La limitación del riesgo de caídas en edificios", "El aislamiento acústico de los lugares de trabajo"], correcta: 0 },
  { enunciado: "¿Qué significan las señales redondas con pictograma negro sobre fondo azul?", explicacion: "Señales de obligación, que indican un comportamiento que debe seguirse.", dificultad: "media", opciones: ["Señales de obligación", "Señales de advertencia de un riesgo", "Señales de prohibición", "Señales exclusivamente informativas"], correcta: 0 },
  { enunciado: "¿Qué significan las señales triangulares con pictograma negro sobre fondo amarillo?", explicacion: "Señales de advertencia, que informan de un riesgo o peligro determinado.", dificultad: "media", opciones: ["Señales de advertencia de un riesgo", "Señales de obligación de un comportamiento", "Señales de prohibición de un comportamiento", "Señales exclusivamente decorativas"], correcta: 0 },
  { enunciado: "¿Qué significan las señales redondas con banda diagonal roja sobre fondo blanco?", explicacion: "Señales de prohibición, que prohíben un comportamiento que podría provocar un riesgo.", dificultad: "media", opciones: ["Señales de prohibición", "Señales de obligación", "Señales de advertencia", "Señales exclusivamente informativas"], correcta: 0 },
  { enunciado: "¿Qué debe tener en cuenta el Oficial al reproducir una señal de seguridad normalizada?", explicacion: "La forma, color y pictograma están normalizados por el RD 485/1997 y no pueden modificarse libremente.", dificultad: "dificil", opciones: ["Están normalizados y no pueden modificarse libremente", "Puede modificar libremente forma, color y pictograma", "Solo el color resulta relevante, no la forma geométrica", "La normalización solo aplica a señales de prohibición"], correcta: 0 },
]);

const S2 = "accesibilidad-senaletica-administraciones-publicas";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué exige, con carácter general, el RDLeg 1/2013 en relación con la señalización de los espacios públicos y edificios de las Administraciones Públicas?", reverso: "Garantizar la accesibilidad y la no discriminación de las personas con discapacidad en el acceso y uso de los espacios urbanizados, edificios y servicios, lo que incluye una señalización adecuada que facilite la orientación y la información a todas las personas usuarias" },
  { anverso: "¿Qué es el formato de lectura fácil, mencionado en el RDLeg 1/2013 en relación con la información de espacios públicos?", reverso: "Un formato de presentación de la información (textos breves, vocabulario sencillo, apoyo visual mediante pictogramas) que facilita la comprensión del mensaje a personas con dificultades de comprensión lectora, incluidas personas con discapacidad intelectual o cognitiva" },
  { anverso: "¿Qué característica de contraste debería tener en cuenta el Oficial Pintor Especialidad Gráfica al diseñar un cartel o un directorio para un edificio municipal, conforme al criterio de accesibilidad del RDLeg 1/2013?", reverso: "Un contraste suficiente entre el color del texto y el del fondo, que facilite la lectura a personas con baja visión, evitando combinaciones de colores de escaso contraste que dificulten la percepción del contenido" },
  { anverso: "¿Qué relación existe entre el tamaño de la tipografía empleada en un directorio o cartel informativo municipal y la accesibilidad exigida por el RDLeg 1/2013?", reverso: "Un tamaño de letra insuficiente dificulta la lectura a personas con baja visión o a cierta distancia, por lo que debe emplearse un tamaño adecuado a la distancia habitual de lectura prevista y a las necesidades de accesibilidad del público general" },
  { anverso: "¿Por qué resulta especialmente relevante el criterio de accesibilidad en la cartelería de un edificio municipal, más allá de una simple buena práctica de diseño?", reverso: "Porque el RDLeg 1/2013 establece la accesibilidad como una condición básica exigible en los espacios y servicios de las Administraciones Públicas, con un régimen de infracciones y sanciones asociado al incumplimiento de estas condiciones" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué exige el RDLeg 1/2013 en relación con la señalización de espacios de las Administraciones Públicas?", explicacion: "Garantizar la accesibilidad y no discriminación de las personas con discapacidad.", dificultad: "media", opciones: ["Garantizar la accesibilidad y no discriminación", "Ninguna exigencia específica sobre señalización pública", "Exige únicamente un criterio estético uniforme", "Solo resulta aplicable a edificios de nueva construcción"], correcta: 0 },
  { enunciado: "¿Qué es el formato de lectura fácil?", explicacion: "Un formato con textos breves y apoyo visual que facilita la comprensión a personas con dificultades.", dificultad: "media", opciones: ["Un formato con textos breves y apoyo visual sencillo", "Un formato exclusivo para personas sin ninguna discapacidad", "Un tipo de tipografía exclusiva de gran tamaño", "Un color de fondo exclusivo para carteles institucionales"], correcta: 0 },
  { enunciado: "¿Qué característica de contraste debe tenerse en cuenta al diseñar un cartel municipal accesible?", explicacion: "Un contraste suficiente entre texto y fondo que facilite la lectura a personas con baja visión.", dificultad: "media", opciones: ["Un contraste suficiente entre texto y fondo", "El contraste nunca resulta relevante para la accesibilidad", "Siempre debe emplearse el mismo color de texto y fondo", "Solo resulta relevante en carteles de gran tamaño"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el tamaño de la tipografía y la accesibilidad exigida por el RDLeg 1/2013?", explicacion: "Un tamaño insuficiente dificulta la lectura a personas con baja visión.", dificultad: "dificil", opciones: ["Un tamaño insuficiente dificulta la lectura a baja visión", "El tamaño de la tipografía nunca influye en la accesibilidad", "Siempre debe emplearse el menor tamaño posible de letra", "Solo resulta relevante en directorios, nunca en carteles"], correcta: 0 },
  { enunciado: "¿Por qué es especialmente relevante el criterio de accesibilidad en la cartelería municipal, más allá del diseño estético?", explicacion: "El RDLeg 1/2013 la establece como condición básica exigible, con régimen de infracciones asociado.", dificultad: "dificil", opciones: ["Es una condición básica exigible con régimen de infracciones", "La accesibilidad es una recomendación sin ninguna exigencia legal", "Solo resulta relevante en edificios de titularidad privada", "El RDLeg 1/2013 no regula la cartelería de forma alguna"], correcta: 0 },
]);

const S3 = "carteleria-lugares-publica-concurrencia";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un lugar de pública concurrencia, en el sentido relevante para la cartelería y la señalética municipal?", reverso: "Un espacio accesible al público en general, con un flujo habitual de personas usuarias, como un edificio administrativo, un centro cívico, una instalación deportiva o un centro cultural, donde la señalética debe orientar y proteger a un público diverso y numeroso" },
  { anverso: "¿Qué diferencia existe entre la señalización de seguridad exigida por el RD 485/1997 y la cartelería informativa general de un edificio de pública concurrencia?", reverso: "La señalización de seguridad está normalizada por su forma, color y pictograma, y comunica un riesgo, una prohibición o una instrucción de seguridad; la cartelería informativa general (directorios, indicaciones de salas) admite mayor libertad de diseño dentro del criterio de accesibilidad y de la identidad corporativa" },
  { anverso: "¿Qué información básica debería incluir un directorio o panel informativo instalado en la entrada de un edificio municipal de pública concurrencia?", reverso: "La distribución de las dependencias o servicios por planta, una indicación clara de la ubicación actual (\"usted está aquí\"), y, conforme a los criterios de accesibilidad, un contraste y un tamaño de letra adecuados a su lectura por el público general" },
  { anverso: "¿Qué precaución debería adoptar el Oficial Pintor Especialidad Gráfica al ubicar físicamente un cartel de señalización de seguridad en un lugar de pública concurrencia, más allá de su correcto diseño gráfico?", reverso: "Situarlo en una posición visible, a una altura adecuada y sin obstáculos que dificulten su percepción, dado que una señal correctamente diseñada pero mal ubicada pierde gran parte de su eficacia comunicativa" },
  { anverso: "¿Qué relación existe entre la señalética de seguridad, la accesibilidad y la identidad corporativa municipal, tres aspectos que confluyen en la cartelería de un edificio de pública concurrencia?", reverso: "Los tres aspectos deben coexistir y respetarse simultáneamente: la señalización de seguridad no puede alterarse por criterios estéticos, la accesibilidad debe garantizarse en toda la cartelería, y la identidad corporativa debe aplicarse en los elementos que no estén normalizados por la seguridad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un lugar de pública concurrencia?", explicacion: "Un espacio accesible al público con un flujo habitual de personas usuarias.", dificultad: "facil", opciones: ["Un espacio accesible al público con flujo habitual de personas", "Un espacio exclusivamente privado sin acceso público", "Un espacio exclusivamente destinado a personal técnico", "Un espacio exclusivamente de almacenamiento municipal"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre la señalización de seguridad del RD 485/1997 y la cartelería informativa general?", explicacion: "La de seguridad está normalizada; la informativa general admite mayor libertad de diseño.", dificultad: "media", opciones: ["La de seguridad está normalizada; la informativa, no", "Ambas están normalizadas exactamente de la misma manera", "La cartelería informativa nunca admite ningún diseño propio", "No existe ninguna diferencia real entre ambos tipos"], correcta: 0 },
  { enunciado: "¿Qué información básica debería incluir un directorio en la entrada de un edificio municipal?", explicacion: "Distribución de dependencias, indicación de ubicación actual, y accesibilidad de contraste y tamaño.", dificultad: "media", opciones: ["Distribución, ubicación actual y buena accesibilidad", "Únicamente el logotipo del Ayuntamiento, sin más información", "Únicamente el horario de atención al público", "Ninguna información específica resulta necesaria"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al ubicar físicamente un cartel de seguridad, más allá de su diseño gráfico?", explicacion: "Situarlo visible, a altura adecuada y sin obstáculos que dificulten su percepción.", dificultad: "dificil", opciones: ["Situarlo visible y sin obstáculos que dificulten su percepción", "La ubicación física nunca influye en la eficacia de la señal", "Basta con un buen diseño, sin importar dónde se ubique", "Solo resulta relevante la altura, no la visibilidad general"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre seguridad, accesibilidad e identidad corporativa en la cartelería de un edificio de pública concurrencia?", explicacion: "Deben coexistir: la seguridad no se altera por estética, la accesibilidad se garantiza siempre, y la identidad se aplica donde no hay normalización de seguridad.", dificultad: "dificil", opciones: ["Deben coexistir respetando cada exigencia simultáneamente", "Solo resulta relevante la identidad corporativa, sin más criterios", "La seguridad y la accesibilidad nunca pueden coexistir juntas", "Solo resulta relevante la seguridad, sin ninguna otra consideración"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 16 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 16, orden: 16, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-260 creado y vinculado como Tema 16 de Oficial Pintor Gráfica.");

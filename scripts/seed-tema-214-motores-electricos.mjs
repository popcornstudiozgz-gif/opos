/**
 * Crea tema-214: "Motores eléctricos" — Tema 18 (numero=18, bloque-2)
 * de Oficial Planta Potabilizadora (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 16 oficial del Anexo I (bases2110.pdf, línea
 * 1225): "Motores eléctricos: tipos, características, aplicaciones,
 * instalación y mantenimiento. Índice de protección IP: Guía Técnica de
 * aplicación REBT – anexo 1. Mando y control de potencia. Tipos de
 * arranque y conexiones. Equipos auxiliares. Eficiencia energética en
 * los motores eléctricos: Directiva 2005/32/CE y Norma IEC 60034-30,
 * REBT ITC-BT 47."
 *
 * Fuentes primarias verificadas mediante búsqueda en esta sesión:
 * - REBT (RD 842/2002) e ITC-BT-47 ("Instalaciones con fines
 *   especiales. Receptores. Motores"), ya verificada y citada en el
 *   proyecto (Oficial Electricista, Oficial Guardallaves).
 * - Directiva 2005/32/CE (Directiva marco de diseño ecológico),
 *   desarrollada para motores eléctricos por el Reglamento (CE) nº
 *   640/2009 de la Comisión, de 22 de julio de 2009.
 * - Norma IEC 60034-30, que clasifica los motores de inducción
 *   trifásicos en clases de eficiencia energética IE1 a IE5 (estándar,
 *   alta, premium, súper premium y ultra premium), con la obligatoriedad
 *   de la clase IE2 desde el 16 de junio de 2011 y de la IE3 desde el
 *   1 de enero de 2015/2017 según potencia, en el ámbito de la Unión
 *   Europea.
 * El resto del contenido (tipos y características de motores, mando y
 * control de potencia, tipos de arranque, equipos auxiliares) es
 * conocimiento técnico consolidado de electrotecnia industrial.
 *
 * Tres secciones:
 * 1. tipos-caracteristicas-aplicaciones-instalacion-mantenimiento
 * 2. indice-proteccion-ip-mando-control-arranque
 * 3. eficiencia-energetica-directiva-2005-32-ce-iec-60034-30-itc-bt-47
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-214-motores-electricos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-214";
const OPOSICION = "oficial-planta-potabilizadora-ayto-zaragoza";
const BLOQUE_2_ID = "ca4ed0ad-ab08-4bc9-80b7-fb4e6941b64a";

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
  titulo: "Motores eléctricos",
  descripcion: "Tipos, características, aplicaciones, instalación y mantenimiento de motores eléctricos. Índice de protección IP. Mando y control de potencia, tipos de arranque. Eficiencia energética: Directiva 2005/32/CE, IEC 60034-30 e ITC-BT-47.",
  contenido: "Desarrolla los motores eléctricos como elemento fundamental de las bombas, agitadores y demás equipos rotativos de una planta potabilizadora: sus tipos, características, aplicaciones, instalación y mantenimiento; el índice de protección IP conforme a la Guía Técnica de aplicación del REBT; el mando y control de potencia, los tipos de arranque y las conexiones de los motores, y sus equipos auxiliares; y la eficiencia energética de los motores eléctricos, regulada por la Directiva 2005/32/CE, la norma IEC 60034-30 (clases de eficiencia IE1 a IE5) y la ITC-BT-47 del REBT.",
  enlaces_boe: [
    "https://www.boe.es/biblioteca_juridica/codigos/abrir_pdf.php?fich=326_Reglamento_electrotecnico_para_baja_tension_e_ITC.pdf",
    "https://www.boe.es/buscar/doc.php?id=DOUE-L-2009-81290",
  ],
  indice_estudio: [
    { url: "", titulo: "Tipos, características, aplicaciones, instalación y mantenimiento", seccion: "tipos-caracteristicas-aplicaciones-instalacion-mantenimiento", articulos: "Conocimiento técnico de electrotecnia industrial" },
    { url: "https://www.boe.es/biblioteca_juridica/codigos/abrir_pdf.php?fich=326_Reglamento_electrotecnico_para_baja_tension_e_ITC.pdf", titulo: "Índice de protección IP, mando, control y tipos de arranque", seccion: "indice-proteccion-ip-mando-control-arranque", articulos: "REBT, Guía Técnica, Anexo 1" },
    { url: "https://www.boe.es/buscar/doc.php?id=DOUE-L-2009-81290", titulo: "Eficiencia energética: Directiva 2005/32/CE, IEC 60034-30 e ITC-BT-47", seccion: "eficiencia-energetica-directiva-2005-32-ce-iec-60034-30-itc-bt-47", articulos: "Directiva 2005/32/CE; Reglamento (CE) nº 640/2009; IEC 60034-30; REBT ITC-BT-47" },
  ],
}]);

const S1 = "tipos-caracteristicas-aplicaciones-instalacion-mantenimiento";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un motor de inducción trifásico de jaula de ardilla, el tipo de motor eléctrico más habitual en las bombas de una planta potabilizadora?", reverso: "Un motor eléctrico de corriente alterna en el que el rotor (jaula de ardilla) gira arrastrado por el campo magnético giratorio generado en el estátor, sin necesidad de conexión eléctrica directa al rotor, lo que lo hace robusto y de bajo mantenimiento" },
  { anverso: "¿Qué aplicaciones son las más habituales de los motores eléctricos dentro de una planta de tratamiento de agua?", reverso: "El accionamiento de bombas de elevación e impulsión, de agitadores en los procesos de coagulación-floculación, de compresores y soplantes de aire, y de las turbinas de recirculación de fangos de los decantadores" },
  { anverso: "¿Qué características básicas de un motor eléctrico deben tenerse en cuenta al seleccionarlo para una aplicación concreta?", reverso: "La potencia nominal, la velocidad de giro (número de polos), la tensión y frecuencia de alimentación, el par de arranque necesario para el equipo accionado, y el entorno de instalación (temperatura, humedad, presencia de polvo)" },
  { anverso: "¿Qué comprobaciones básicas de mantenimiento requiere periódicamente un motor eléctrico?", reverso: "Medición del aislamiento eléctrico entre bobinados y masa, comprobación del estado de los rodamientos y de posibles vibraciones anómalas, verificación de la temperatura de funcionamiento, y limpieza de las rejillas de ventilación para evitar sobrecalentamientos" },
  { anverso: "¿Por qué es importante que la instalación de un motor eléctrico respete las indicaciones de su placa de características?", reverso: "Porque esa placa recoge los valores de tensión, intensidad, potencia y frecuencia para los que el motor está diseñado, y una instalación fuera de esos valores puede provocar un funcionamiento incorrecto, un sobrecalentamiento o una avería prematura" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un motor de inducción trifásico de jaula de ardilla?", explicacion: "Un motor de corriente alterna en el que el rotor gira arrastrado por el campo magnético del estátor.", dificultad: "media", opciones: ["Un motor en el que el rotor gira arrastrado por el campo del estátor", "Un motor de corriente continua exclusivo para pequeñas potencias", "Un instrumento que mide exclusivamente el caudal de una bomba", "Un instrumento que mide exclusivamente la presión de una red"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes es una aplicación habitual de los motores eléctricos en una planta potabilizadora?", explicacion: "El accionamiento de bombas de elevación e impulsión, entre otras aplicaciones.", dificultad: "facil", opciones: ["El accionamiento de bombas de elevación e impulsión", "La dosificación exclusiva de reactivos sin ningún equipo motorizado", "La medición exclusiva de la calidad del agua en laboratorio", "La desinfección exclusiva del agua sin ningún equipo motorizado"], correcta: 0 },
  { enunciado: "¿Qué características deben tenerse en cuenta al seleccionar un motor para una aplicación concreta?", explicacion: "Potencia, velocidad de giro, tensión/frecuencia, par de arranque y entorno de instalación.", dificultad: "media", opciones: ["Potencia, velocidad, tensión/frecuencia, par y entorno", "Únicamente el color exterior de la carcasa del motor", "Únicamente la fecha de fabricación del motor elegido", "Únicamente el nombre comercial del fabricante del motor"], correcta: 0 },
  { enunciado: "¿Qué comprobación básica de mantenimiento requiere periódicamente un motor eléctrico?", explicacion: "Medición del aislamiento eléctrico entre bobinados y masa.", dificultad: "media", opciones: ["Medición del aislamiento eléctrico entre bobinados y masa", "Ninguna comprobación periódica, al ser equipos de vida indefinida", "Sustitución completa anual, con independencia de su estado real", "Pintado exterior periódico, sin ninguna comprobación funcional"], correcta: 0 },
  { enunciado: "¿Por qué es importante respetar la placa de características al instalar un motor eléctrico?", explicacion: "Recoge los valores de diseño; superarlos puede provocar sobrecalentamiento o avería.", dificultad: "dificil", opciones: ["Superar esos valores puede provocar sobrecalentamiento o avería", "La placa de características es meramente informativa sin efecto real", "Los valores de la placa nunca condicionan la instalación del motor", "La placa solo indica el color con el que debe pintarse el motor"], correcta: 0 },
]);

const S2 = "indice-proteccion-ip-mando-control-arranque";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el índice de protección IP de un motor eléctrico?", reverso: "Un código normalizado, formado por las letras IP seguidas de dos dígitos, que indica el grado de protección de la envolvente del motor frente a la entrada de cuerpos sólidos (primer dígito) y de agua (segundo dígito)" },
  { anverso: "¿Dónde se recoge en España la guía técnica de aplicación de los índices de protección IP conforme al REBT?", reverso: "En la Guía Técnica de aplicación del REBT, Anexo 1, que desarrolla de forma práctica los criterios de clasificación IP aplicables a las envolventes de los equipos eléctricos" },
  { anverso: "¿Por qué es especialmente relevante elegir un motor con un índice IP adecuado en una planta potabilizadora?", reverso: "Porque muchos motores de la planta (bombas sumergibles, motores en zonas húmedas o con proyecciones de agua) se instalan en ambientes con presencia de agua o humedad, exigiendo un grado de protección IP suficientemente alto frente a la entrada de líquidos" },
  { anverso: "¿Qué es el arranque directo de un motor eléctrico, uno de los tipos de arranque más simples?", reverso: "Un tipo de arranque en el que el motor se conecta directamente a la tensión nominal de la red desde el primer instante, generando una elevada corriente de arranque, adecuado para motores de pequeña potencia" },
  { anverso: "¿Por qué se emplean tipos de arranque más elaborados (estrella-triángulo, arrancador electrónico, variador de frecuencia) en motores de mayor potencia?", reverso: "Porque reducen la elevada corriente de arranque que se produciría con un arranque directo, evitando caídas de tensión perjudiciales en la instalación y reduciendo el esfuerzo mecánico sobre el motor y el equipo accionado durante el arranque" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el índice de protección IP de un motor eléctrico?", explicacion: "Un código que indica el grado de protección frente a cuerpos sólidos y agua.", dificultad: "facil", opciones: ["Un código que indica la protección frente a sólidos y agua", "Un código que indica exclusivamente la potencia nominal del motor", "Un código que indica exclusivamente la velocidad de giro del motor", "Un código que indica exclusivamente el fabricante del motor"], correcta: 0 },
  { enunciado: "¿Dónde se recoge en España la guía técnica de aplicación de los índices IP conforme al REBT?", explicacion: "En la Guía Técnica de aplicación del REBT, Anexo 1.", dificultad: "media", opciones: ["En la Guía Técnica de aplicación del REBT, Anexo 1", "En la norma UNE-EN 1074, sobre válvulas de suministro de agua", "En el Real Decreto 140/2003, sobre calidad del agua de consumo", "En la Directiva 2005/32/CE, sobre diseño ecológico"], correcta: 0 },
  { enunciado: "¿Por qué es especialmente relevante el índice IP en los motores de una planta potabilizadora?", explicacion: "Muchos motores se instalan en ambientes con presencia de agua o humedad.", dificultad: "media", opciones: ["Muchos motores se instalan en ambientes con agua o humedad", "El índice IP no tiene ninguna relevancia real en este tipo de planta", "El índice IP solo es relevante en instalaciones exteriores urbanas", "El índice IP determina exclusivamente el color del motor"], correcta: 0 },
  { enunciado: "¿Qué es el arranque directo de un motor eléctrico?", explicacion: "El motor se conecta directamente a la tensión nominal desde el primer instante.", dificultad: "media", opciones: ["El motor se conecta directamente a la tensión nominal", "El motor arranca siempre mediante un variador de frecuencia", "El motor arranca siempre mediante conexión estrella-triángulo", "El motor no requiere ninguna conexión eléctrica para arrancar"], correcta: 0 },
  { enunciado: "¿Por qué se emplean tipos de arranque más elaborados en motores de mayor potencia?", explicacion: "Reducen la elevada corriente de arranque y el esfuerzo mecánico sobre el motor.", dificultad: "dificil", opciones: ["Reducen la corriente de arranque y el esfuerzo mecánico", "No aportan ninguna ventaja real frente al arranque directo", "Aumentan de forma deliberada la corriente de arranque del motor", "Solo se emplean en motores de muy pequeña potencia"], correcta: 0 },
]);

const S3 = "eficiencia-energetica-directiva-2005-32-ce-iec-60034-30-itc-bt-47";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué Directiva europea establece el marco general de diseño ecológico aplicado, entre otros productos, a los motores eléctricos?", reverso: "La Directiva 2005/32/CE, desarrollada específicamente para motores eléctricos por el Reglamento (CE) nº 640/2009 de la Comisión, de 22 de julio de 2009" },
  { anverso: "¿Qué norma técnica clasifica los motores de inducción trifásicos en clases de eficiencia energética?", reverso: "La norma IEC 60034-30, que establece cinco clases de eficiencia: IE1 (estándar), IE2 (alta), IE3 (premium), IE4 (súper premium) e IE5 (ultra premium)" },
  { anverso: "¿Desde cuándo es obligatoria en la Unión Europea la clase de eficiencia IE2 para los motores nuevos, conforme a esta normativa?", reverso: "Desde el 16 de junio de 2011" },
  { anverso: "¿Desde cuándo es obligatoria la clase de eficiencia IE3 (o IE2 combinado con un variador de frecuencia) para los motores nuevos de mayor potencia, según el calendario de aplicación de esta normativa?", reverso: "Desde el 1 de enero de 2015 para motores de 7,5 a 375 kW, y desde el 1 de enero de 2017 para motores de 0,75 a 375 kW" },
  { anverso: "¿Qué relación tiene la ITC-BT-47 del REBT con la eficiencia energética de los motores eléctricos citada por el temario oficial de esta oposición?", reverso: "La ITC-BT-47 regula las condiciones de instalación y protección de los motores eléctricos en baja tensión, complementando en el ámbito reglamentario español las exigencias de eficiencia energética de la Directiva 2005/32/CE y la norma IEC 60034-30" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué Directiva europea establece el marco de diseño ecológico aplicado a los motores eléctricos?", explicacion: "La Directiva 2005/32/CE.", dificultad: "media", opciones: ["La Directiva 2005/32/CE", "El Reglamento (UE) nº 517/2014", "La Directiva 98/83/CE sobre calidad del agua", "El Reglamento (CE) nº 1907/2006 (REACH)"], correcta: 0 },
  { enunciado: "¿Qué norma técnica clasifica los motores de inducción trifásicos en clases de eficiencia energética?", explicacion: "La norma IEC 60034-30.", dificultad: "media", opciones: ["La norma IEC 60034-30", "La norma UNE-EN 1074", "La norma UNE-EN 545", "La norma UNE-EN 124"], correcta: 0 },
  { enunciado: "¿Desde cuándo es obligatoria en la UE la clase de eficiencia IE2 para motores nuevos?", explicacion: "Desde el 16 de junio de 2011.", dificultad: "dificil", opciones: ["Desde el 16 de junio de 2011", "Desde el 1 de enero de 2003", "Desde el 1 de enero de 2020", "Desde el 2 de agosto de 2018"], correcta: 0 },
  { enunciado: "¿Desde cuándo es obligatoria la clase IE3 para motores de 0,75 a 375 kW, según el calendario de esta normativa?", explicacion: "Desde el 1 de enero de 2017.", dificultad: "dificil", opciones: ["Desde el 1 de enero de 2017", "Desde el 1 de enero de 2011", "Desde el 1 de enero de 2005", "Desde el 1 de enero de 2025"], correcta: 0 },
  { enunciado: "¿Qué regula la ITC-BT-47 del REBT en relación con los motores eléctricos?", explicacion: "Las condiciones de instalación y protección de los motores en baja tensión.", dificultad: "media", opciones: ["Las condiciones de instalación y protección de los motores", "Las redes aéreas de distribución eléctrica exclusivamente", "Las instalaciones de puesta a tierra exclusivamente", "Las cajas generales de protección exclusivamente"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 18 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 18, orden: 18, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-214 creado y vinculado como Tema 18 de Oficial Planta Potabilizadora.");

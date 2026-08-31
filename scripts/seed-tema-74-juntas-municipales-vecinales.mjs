/**
 * Crea tema-74: "Juntas Municipales y Juntas Vecinales de Zaragoza" —
 * Tema 20 (numero=20, bloque-2) de Oficial Mantenimiento General (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 18 oficial del Anexo I (bases2110.pdf):
 *   "Juntas Municipales: órganos y procedimientos que tramitan. Juntas
 *   Vecinales: órganos, el Alcalde de Barrio, los equipos municipales en
 *   los barrios rurales (enumeración)."
 *
 * Fuente primaria: Reglamento de Órganos Territoriales y Participación
 * Ciudadana de Zaragoza (ROTPC), aprobado el 17/12/2005, modificado por
 * última vez el 22/12/2017 (creación del Distrito Sur, BOPZ nº 44 de
 * 23/02/2018) — https://www.zaragoza.es/sede/servicio/normativa/109.
 * Verificado en este turno (búsqueda + lectura de resumen de la página
 * oficial de normativa municipal): arts. 11-28 (Juntas Municipales de
 * Distrito), arts. 29-35 (Juntas Vecinales de Barrios Rurales), arts.
 * 32-33 (Alcalde de Barrio) y art. 30 (Consejo Territorial de Alcaldes
 * de Barrio). El propio Reglamento NO emplea la expresión "equipos
 * municipales"; sobre este punto el temario oficial se cubre con la
 * figura más próxima que sí regula el ROTPC — el personal administrativo
 * desconcentrado (art. 43) y el Consejo Territorial de Alcaldes de
 * Barrio (art. 30) — señalándolo explícitamente en el contenido para no
 * inventar una estructura formal que el reglamento no reconoce como tal.
 *
 * No se reutiliza tema-15 (Auxiliar Administrativo, participación
 * ciudadana/ROTPC general) porque su recorte por secciones no cubre el
 * contenido específico de Alcalde de Barrio ni Consejo Territorial que
 * exige este temario; se crea contenido propio centrado en esos puntos.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-74-juntas-municipales-vecinales.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-74";
const OPOSICION = "oficial-mantenimiento-ayto-zaragoza";
const BLOQUE_2_ID = "336de420-fb74-4814-9d50-6e2981ed064f";
const ROTPC = "https://www.zaragoza.es/sede/servicio/normativa/109";

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
  titulo: "Juntas Municipales y Juntas Vecinales de Zaragoza",
  descripcion: "Juntas Municipales de Distrito: órganos y procedimientos. Juntas Vecinales de Barrios Rurales: órganos y el Alcalde de Barrio. Consejo Territorial de Alcaldes de Barrio.",
  contenido: "Desarrolla, según el Reglamento de Órganos Territoriales y Participación Ciudadana de Zaragoza (ROTPC), la organización y funciones de las Juntas Municipales de Distrito, las Juntas Vecinales de Barrios Rurales, la figura del Alcalde de Barrio y el Consejo Territorial de Alcaldes de Barrio como órgano de coordinación de los barrios rurales.",
  enlaces_boe: [
    { url: ROTPC, titulo: "Reglamento de Órganos Territoriales y Participación Ciudadana de Zaragoza (ROTPC)" },
  ],
  indice_estudio: [
    { url: ROTPC, titulo: "Juntas Municipales de Distrito: órganos y funciones", seccion: "juntas-municipales-distrito-organos-funciones", articulos: "arts. 11-28" },
    { url: ROTPC, titulo: "Juntas Vecinales de Barrios Rurales y el Alcalde de Barrio", seccion: "juntas-vecinales-alcalde-barrio", articulos: "arts. 29-35 (Juntas Vecinales), 32-33 (Alcalde de Barrio)" },
    { url: ROTPC, titulo: "Consejo Territorial de Alcaldes de Barrio", seccion: "consejo-territorial-alcaldes-barrio", articulos: "art. 30 (y art. 43, personal administrativo desconcentrado)" },
  ],
}]);

const S1 = "juntas-municipales-distrito-organos-funciones";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué son las Juntas Municipales de Distrito según el Reglamento de Órganos Territoriales y Participación Ciudadana de Zaragoza (ROTPC)?", reverso: "Órganos territoriales del Ayuntamiento para la gestión desconcentrada de cada Distrito urbano, que canalizan la participación vecinal en asuntos de gestión municipal de proximidad" },
  { anverso: "¿Qué artículos del ROTPC regulan las Juntas Municipales de Distrito?", reverso: "Los artículos 11 a 28" },
  { anverso: "¿Qué órganos necesarios integran una Junta Municipal de Distrito según el art. 14 del ROTPC?", reverso: "El Presidente, el Pleno (con presidente, vocales de grupos políticos, presidentes de concejos locales y representantes de asociaciones vecinales) y, con carácter potestativo, el Consejo Rector" },
  { anverso: "¿Cuáles son las funciones principales de una Junta Municipal de Distrito según el art. 18 del ROTPC?", reverso: "Control de gestión, aprobación de programas, elaboración de estudios, y emisión de informes sobre ordenación urbanística, proyectos de obras y presupuestos que afectan al distrito" },
  { anverso: "¿Cómo funciona el procedimiento de sesiones de una Junta Municipal de Distrito según el art. 21 del ROTPC?", reverso: "Se reúnen con periodicidad mínima trimestral, con un quórum de un tercio de sus miembros, y adoptan sus acuerdos por mayoría simple" },
  { anverso: "¿Qué son los Consejos de Distrito según el art. 37 del ROTPC?", reverso: "Órganos de ámbito territorial para la desconcentración administrativa que sirven de cauce a la tramitación de asuntos de gestión municipal, formados por la agrupación de Juntas Municipales limítrofes" },
  { anverso: "¿Cómo se constituyen los Consejos de Distrito según el art. 38 del ROTPC?", reverso: "Por Juntas Municipales completas, territorialmente limítrofes, pudiendo agrupar tanto barrios urbanos como rurales" },
  { anverso: "¿Quiénes integran el Consejo Rector de un Consejo de Distrito según el art. 42 del ROTPC?", reverso: "El Presidente del Consejo de Distrito, los Presidentes de las Juntas que lo integran, un vocal por cada grupo municipal, y un representante vecinal con voz pero sin voto" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué son las Juntas Municipales de Distrito según el ROTPC?", explicacion: "Órganos de gestión desconcentrada de cada Distrito urbano.", dificultad: "media", opciones: ["Órganos de gestión desconcentrada de cada Distrito", "El órgano superior de gobierno municipal", "Un tipo de Centro Cívico", "El Registro General del Ayuntamiento"], correcta: 0 },
  { enunciado: "¿Qué artículos del ROTPC regulan las Juntas Municipales de Distrito?", explicacion: "Los artículos 11 a 28.", dificultad: "dificil", opciones: ["Artículos 11 a 28", "Artículos 29 a 35", "Artículos 1 a 10", "Artículos 40 a 46"], correcta: 0 },
  { enunciado: "¿Qué órganos integra necesariamente una Junta Municipal de Distrito?", explicacion: "Presidente y Pleno (Consejo Rector es potestativo).", dificultad: "media", opciones: ["Presidente y Pleno", "Solo un Consejo Rector obligatorio", "Solo el Alcalde de Barrio", "Solo el Consejo Territorial"], correcta: 0 },
  { enunciado: "¿Cuáles son funciones principales de una Junta Municipal de Distrito?", explicacion: "Control de gestión, aprobación de programas e informes sobre urbanismo y presupuestos.", dificultad: "media", opciones: ["Control de gestión e informes sobre urbanismo/presupuestos", "Redactar el reglamento orgánico municipal", "Elegir al Alcalde o Alcaldesa de Zaragoza", "Gestionar directamente la Casa Amparo"], correcta: 0 },
  { enunciado: "¿Con qué periodicidad mínima se reúne una Junta Municipal de Distrito?", explicacion: "Trimestral.", dificultad: "media", opciones: ["Trimestral", "Semanal", "Anual", "Mensual"], correcta: 0 },
  { enunciado: "¿Qué son los Consejos de Distrito según el ROTPC?", explicacion: "Órganos formados por la agrupación de Juntas Municipales limítrofes.", dificultad: "dificil", opciones: ["Agrupación de Juntas Municipales limítrofes", "Un órgano exclusivo de barrios rurales", "El Pleno del Ayuntamiento de Zaragoza", "La Junta de Gobierno Local"], correcta: 0 },
  { enunciado: "¿Quién integra el Consejo Rector de un Consejo de Distrito?", explicacion: "Presidente del Consejo, presidentes de las Juntas, un vocal por grupo y un representante vecinal.", dificultad: "dificil", opciones: ["Presidente, presidentes de Juntas, vocales y representante vecinal", "Solo el Alcalde de Zaragoza", "Solo representantes vecinales sin cargo municipal", "Solo el personal administrativo desconcentrado"], correcta: 0 },
]);

const S2 = "juntas-vecinales-alcalde-barrio";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué son las Juntas Vecinales de Barrios Rurales según el ROTPC?", reverso: "Los órganos territoriales equivalentes a las Juntas Municipales pero para los Barrios Rurales de Zaragoza, con los mismos fines y funciones, aplicando principios de coordinación y solidaridad (art. 29)" },
  { anverso: "¿Qué artículos del ROTPC regulan las Juntas Vecinales de Barrios Rurales?", reverso: "Los artículos 29 a 35" },
  { anverso: "¿Qué órganos necesarios integra una Junta Vecinal de Barrio Rural según el art. 31 del ROTPC?", reverso: "El Alcalde del Barrio (como Presidente), el Pleno (con vocales según población, presidentes de concejos locales y representantes de entidades) y, potestativamente, el Consejo Rector" },
  { anverso: "¿Cómo se nombra al Alcalde de Barrio según el art. 32 del ROTPC?", reverso: "Mediante un proceso democrático de consulta entre el vecindario del barrio, supervisado por el Ayuntamiento; su mandato coincide con el de la corporación municipal" },
  { anverso: "¿Cuáles son las funciones del Alcalde de Barrio según el art. 32 del ROTPC?", reverso: "Dirigir el gobierno y la administración de la Junta Vecinal, representar al Ayuntamiento en el barrio, convocar las sesiones, disponer gastos, dirigir al personal y ejecutar los acuerdos adoptados" },
  { anverso: "¿Qué diferencia principal hay entre una Junta Municipal de Distrito y una Junta Vecinal de Barrio Rural en cuanto a su presidencia?", reverso: "La Junta Municipal de Distrito la preside habitualmente un Concejal/a; la Junta Vecinal de Barrio Rural la preside el Alcalde de Barrio, elegido por consulta vecinal, no un concejal designado" },
  { anverso: "¿A qué principios remite el art. 29 del ROTPC al equiparar las Juntas Vecinales con las Municipales?", reverso: "A los principios de unidad de gobierno, eficacia, coordinación y solidaridad, los mismos que rigen la actuación de las Juntas Municipales de Distrito" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué son las Juntas Vecinales de Barrios Rurales según el ROTPC?", explicacion: "El equivalente a las Juntas Municipales pero para los Barrios Rurales, con los mismos fines.", dificultad: "media", opciones: ["El equivalente a las Juntas Municipales para Barrios Rurales", "Un órgano exclusivo de Distritos urbanos", "El Consejo Rector del Ayuntamiento", "Una oficina de atención ciudadana"], correcta: 0 },
  { enunciado: "¿Qué artículos del ROTPC regulan las Juntas Vecinales de Barrios Rurales?", explicacion: "Los artículos 29 a 35.", dificultad: "dificil", opciones: ["Artículos 29 a 35", "Artículos 11 a 28", "Artículos 40 a 46", "Artículos 1 a 10"], correcta: 0 },
  { enunciado: "¿Quién preside una Junta Vecinal de Barrio Rural?", explicacion: "El Alcalde de Barrio.", dificultad: "facil", opciones: ["El Alcalde de Barrio", "Un Concejal designado por la Alcaldía", "El Presidente del Consejo de Distrito", "El Presidente de la Junta Municipal más cercana"], correcta: 0 },
  { enunciado: "¿Cómo se nombra al Alcalde de Barrio según el ROTPC?", explicacion: "Mediante proceso democrático de consulta vecinal, supervisado por el Ayuntamiento.", dificultad: "media", opciones: ["Mediante consulta vecinal supervisada por el Ayuntamiento", "Por designación directa de la Alcaldía de Zaragoza", "Por sorteo entre los vecinos empadronados", "Por votación exclusiva del Pleno municipal"], correcta: 0 },
  { enunciado: "¿Cuál de estas es una función del Alcalde de Barrio según el art. 32 del ROTPC?", explicacion: "Dirigir el gobierno y administración de la Junta Vecinal y representar al Ayuntamiento en el barrio.", dificultad: "media", opciones: ["Dirigir la Junta Vecinal y representar al Ayuntamiento en el barrio", "Aprobar el presupuesto general del Ayuntamiento", "Nombrar a los Concejales de Distrito", "Gestionar directamente la Casa Amparo"], correcta: 0 },
  { enunciado: "¿Qué diferencia principal existe en la presidencia entre Junta Municipal de Distrito y Junta Vecinal de Barrio Rural?", explicacion: "La primera la preside un Concejal; la segunda, el Alcalde de Barrio elegido por consulta vecinal.", dificultad: "media", opciones: ["Concejal frente a Alcalde de Barrio elegido por consulta", "No existe ninguna diferencia entre ambas", "Ambas las preside siempre el mismo Concejal", "La Junta Vecinal no tiene presidencia"], correcta: 0 },
  { enunciado: "¿A qué principios remite el art. 29 del ROTPC para las Juntas Vecinales?", explicacion: "Unidad de gobierno, eficacia, coordinación y solidaridad.", dificultad: "dificil", opciones: ["Unidad de gobierno, eficacia, coordinación y solidaridad", "Exclusivamente al principio de legalidad", "Exclusivamente al principio de transparencia", "Ningún principio expreso, solo remite a la costumbre"], correcta: 0 },
]);

const S3 = "consejo-territorial-alcaldes-barrio";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el Consejo Territorial de Alcaldes de Barrio según el art. 30 del ROTPC?", reverso: "El órgano de coordinación, información y propuesta de la gestión municipal referida a los Barrios Rurales de Zaragoza" },
  { anverso: "¿Quién preside el Consejo Territorial de Alcaldes de Barrio?", reverso: "El Concejal o Concejala Presidente/a del Distrito Rural" },
  { anverso: "¿Quiénes integran el Consejo Territorial de Alcaldes de Barrio, además de su presidencia?", reverso: "Todos los Alcaldes de Barrio de los Barrios Rurales de Zaragoza, y los portavoces de los grupos municipales en la Comisión de Participación Ciudadana del Pleno" },
  { anverso: "¿Cuáles son las funciones básicas del Consejo Territorial de Alcaldes de Barrio?", reverso: "Impulsar iniciativas conjuntas, proponer soluciones coordinadas a problemas comunes de los barrios rurales, y ser informado en los planes de desconcentración administrativa que les afecten" },
  { anverso: "¿Utiliza el ROTPC la expresión 'equipos municipales' como estructura formal en los barrios rurales?", reverso: "No: el Reglamento no reconoce esa expresión como una estructura formal diferenciada; la figura más próxima que sí regula es el personal administrativo desconcentrado (art. 43), con oficinas administrativas dotadas de recursos para gestionar las competencias delegadas" },
  { anverso: "¿Qué regula el art. 43 del ROTPC sobre el personal administrativo desconcentrado?", reverso: "La existencia de oficinas administrativas en los distritos y barrios rurales, dotadas de recursos suficientes para la gestión de las competencias que tienen delegadas" },
  { anverso: "¿Por qué es relevante distinguir entre lo que regula literalmente el ROTPC y la terminología del temario oficial de la oposición?", reverso: "Porque el temario oficial usa la expresión 'equipos municipales' de forma genérica, mientras que el Reglamento aplicable regula estructuras concretas (personal administrativo desconcentrado, Consejo Territorial de Alcaldes de Barrio) que son las que hay que conocer con precisión" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el Consejo Territorial de Alcaldes de Barrio?", explicacion: "El órgano de coordinación, información y propuesta referido a los Barrios Rurales.", dificultad: "media", opciones: ["El órgano de coordinación referido a los Barrios Rurales", "El órgano superior de gobierno del Ayuntamiento", "Una Junta Municipal de Distrito urbano", "El Registro General del Ayuntamiento"], correcta: 0 },
  { enunciado: "¿Quién preside el Consejo Territorial de Alcaldes de Barrio?", explicacion: "El Concejal/a Presidente/a del Distrito Rural.", dificultad: "media", opciones: ["El Concejal Presidente del Distrito Rural", "El Alcalde de Zaragoza en persona", "El Alcalde de Barrio de mayor edad", "El Presidente del Consejo de Distrito urbano"], correcta: 0 },
  { enunciado: "¿Quiénes integran el Consejo Territorial de Alcaldes de Barrio?", explicacion: "Todos los Alcaldes de Barrio y portavoces de grupos municipales en la Comisión de Participación.", dificultad: "media", opciones: ["Alcaldes de Barrio y portavoces de grupos municipales", "Solo representantes de asociaciones vecinales", "Solo funcionarios del área de urbanismo", "Solo el personal administrativo desconcentrado"], correcta: 0 },
  { enunciado: "¿Cuál es una función básica del Consejo Territorial de Alcaldes de Barrio?", explicacion: "Proponer soluciones coordinadas a problemas comunes de los barrios rurales.", dificultad: "media", opciones: ["Proponer soluciones coordinadas a problemas comunes", "Aprobar el presupuesto general municipal", "Nombrar a los Concejales de Distrito", "Redactar la Ordenanza de Movilidad Urbana"], correcta: 0 },
  { enunciado: "¿Emplea el ROTPC la expresión 'equipos municipales' como estructura formal?", explicacion: "No, no la reconoce como estructura formal diferenciada.", dificultad: "dificil", opciones: ["No, no la reconoce como estructura formal", "Sí, la regula en su artículo 43", "Sí, es sinónimo del Consejo Territorial", "Sí, sustituye a las Juntas Vecinales"], correcta: 0 },
  { enunciado: "¿Qué regula el art. 43 del ROTPC?", explicacion: "El personal administrativo desconcentrado en distritos y barrios rurales.", dificultad: "dificil", opciones: ["El personal administrativo desconcentrado", "La composición del Pleno municipal", "La tasa de instalación de escenarios", "El régimen interno del Albergue Municipal"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 20 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 20, orden: 20, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-74 creado y vinculado como Tema 20 de Oficial Mantenimiento General.");

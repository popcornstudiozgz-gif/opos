/**
 * Crea tema-77: "Organización del deporte municipal en Zaragoza" — Tema 7
 * (numero=7, bloque-2) de Oficial Polivalente Instalaciones Deportivas
 * (Ayto. Zaragoza). Primer tema de la parte específica de esta oposición.
 *
 * Corresponde al TEMA 5 oficial del Anexo I (bases2110.pdf):
 *   "Organización del deporte en el Ayuntamiento de Zaragoza: Unidades
 *   organizativas y competencias, oferta de instalaciones y servicios,
 *   normativa (Reglamento de Centros y Pabellones Deportivos Municipales,
 *   Ordenanza Fiscal 24.8 Tasa por prestación de servicios en Centros
 *   Deportivos Municipales)."
 *
 * Fuentes primarias verificadas en este turno:
 * - Reglamento de Centros y Pabellones Deportivos Municipales, aprobado
 *   el 30/09/2008, publicado en BOP núm. 258 de 08/11/2008
 *   (https://www.zaragoza.es/sede/servicio/normativa/442).
 * - Ordenanza Fiscal nº 24.8, Tasa por prestación de servicios en Centros
 *   Deportivos Municipales
 *   (https://www.zaragoza.es/ciudad/normativa/ordenanzas-fiscales/2007/ord24_8.htm):
 *   hecho imponible = uso de espacios deportivos y servicios deportivos,
 *   sanitarios y recreativos prestados en los Centros Deportivos
 *   Municipales; sujeto pasivo = quien usa las instalaciones gestionadas
 *   por el Ayuntamiento a través del Servicio de Instalaciones Deportivas
 *   y Distritos.
 * La estructura organizativa detallada (unidades concretas, organigrama
 * interno) no se cita con precisión de detalle variable con el mandato;
 * se remite a consultar la web municipal vigente, igual que en el tema
 * de organigrama de Oficial Mantenimiento General (tema-68).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-77-organizacion-deporte-municipal.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-77";
const OPOSICION = "oficial-instalaciones-deportivas-ayto-zaragoza";
const BLOQUE_2_ID = "cdb0920b-a2d8-4ea8-b3fc-b80168d7361a";
const REGL_CENTROS_DEPORTIVOS = "https://www.zaragoza.es/sede/servicio/normativa/442";
const OF_24_8 = "https://www.zaragoza.es/ciudad/normativa/ordenanzas-fiscales/2007/ord24_8.htm";

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
  titulo: "Organización del deporte municipal en Zaragoza",
  descripcion: "Unidades organizativas y competencias del deporte municipal. Oferta de instalaciones y servicios. Reglamento de Centros y Pabellones Deportivos Municipales y Ordenanza Fiscal 24.8.",
  contenido: "Desarrolla la organización del deporte municipal de Zaragoza (unidades organizativas y competencias, oferta de instalaciones y servicios) y su normativa reguladora: el Reglamento de Centros y Pabellones Deportivos Municipales (2008) y la Ordenanza Fiscal nº 24.8, tasa por prestación de servicios en Centros Deportivos Municipales.",
  enlaces_boe: [
    { url: REGL_CENTROS_DEPORTIVOS, titulo: "Reglamento de Centros y Pabellones Deportivos Municipales (Ayuntamiento de Zaragoza)" },
    { url: OF_24_8, titulo: "Ordenanza Fiscal nº 24.8 — Tasa por prestación de servicios en Centros Deportivos Municipales" },
  ],
  indice_estudio: [
    { url: "", titulo: "Unidades organizativas, competencias y oferta de instalaciones", seccion: "organizacion-deporte-municipal-zaragoza", articulos: "Conceptos fundamentales" },
    { url: REGL_CENTROS_DEPORTIVOS, titulo: "Reglamento de Centros y Pabellones Deportivos Municipales", seccion: "reglamento-centros-pabellones-deportivos", articulos: "Aprobado 30/09/2008, BOP núm. 258" },
    { url: OF_24_8, titulo: "Ordenanza Fiscal 24.8: tasa por servicios en Centros Deportivos", seccion: "ordenanza-fiscal-24-8-tasa-centros-deportivos", articulos: "Hecho imponible, sujeto pasivo, devengo" },
  ],
}]);

const S1 = "organizacion-deporte-municipal-zaragoza";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué entidad gestiona una parte relevante de las instalaciones deportivas municipales de Zaragoza?", reverso: "Zaragoza Deporte Municipal, S.A., sociedad municipal encargada de la gestión de centros y servicios deportivos del Ayuntamiento, junto con el Servicio de Instalaciones Deportivas y Distritos" },
  { anverso: "¿Qué tipo de oferta de instalaciones deportivas ofrece habitualmente un centro deportivo municipal de Zaragoza?", reverso: "Piscinas cubiertas y de verano, pabellones polideportivos, salas de fitness, pistas de pádel/tenis, y espacios para actividades dirigidas y escuelas deportivas" },
  { anverso: "¿Qué son los servicios 'sanitarios y recreativos' ofertados junto a los espacios deportivos según la Ordenanza Fiscal 24.8?", reverso: "Servicios complementarios al uso puramente deportivo (por ejemplo, saunas, servicios de socorrismo, actividades recreativas acuáticas) que se prestan en los propios Centros Deportivos Municipales" },
  { anverso: "¿Qué diferencia hay entre gestión directa y gestión indirecta de una instalación deportiva municipal?", reverso: "La gestión directa la realiza el propio Ayuntamiento o su sociedad municipal; la indirecta se encomienda a entidades públicas o privadas autorizadas mediante convenio o concesión" },
  { anverso: "¿Por qué es relevante para un oficial polivalente de instalaciones deportivas conocer la red completa de centros deportivos municipales de Zaragoza?", reverso: "Porque puede ser destinado a distintos centros según necesidades de servicio, y necesita conocer la oferta y características de cada instalación para desempeñar correctamente sus funciones" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué entidad gestiona buena parte de las instalaciones deportivas municipales de Zaragoza?", explicacion: "Zaragoza Deporte Municipal, S.A., junto con el Servicio de Instalaciones Deportivas y Distritos.", dificultad: "media", opciones: ["Zaragoza Deporte Municipal, S.A.", "El Registro General del Ayuntamiento", "La Unidad de Colegios Públicos", "El Servicio de Movilidad Urbana"], correcta: 0 },
  { enunciado: "¿Qué tipo de espacios suele incluir la oferta de un centro deportivo municipal?", explicacion: "Piscinas, pabellones, salas de fitness, pistas y espacios para actividades dirigidas.", dificultad: "facil", opciones: ["Piscinas, pabellones, salas de fitness y pistas", "Únicamente oficinas administrativas", "Únicamente aulas de formación", "Únicamente espacios de almacenamiento"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre gestión directa e indirecta de una instalación deportiva municipal?", explicacion: "La directa la realiza el Ayuntamiento o su sociedad municipal; la indirecta se encomienda a terceros autorizados.", dificultad: "media", opciones: ["La directa es municipal; la indirecta se encomienda a terceros", "Son exactamente lo mismo", "La indirecta nunca está permitida por el Ayuntamiento", "La directa solo aplica a piscinas de verano"], correcta: 0 },
  { enunciado: "¿Por qué debe un oficial polivalente conocer la red completa de centros deportivos municipales?", explicacion: "Porque puede ser destinado a distintos centros y necesita conocer sus características.", dificultad: "media", opciones: ["Porque puede ser destinado a distintos centros", "Porque gestiona directamente el presupuesto municipal", "Porque redacta la Ordenanza Fiscal 24.8", "Porque no influye en su trabajo diario"], correcta: 0 },
]);

const S2 = "reglamento-centros-pabellones-deportivos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Cuándo se aprobó el Reglamento de Centros y Pabellones Deportivos Municipales de Zaragoza y cuándo se publicó?", reverso: "Se aprobó el 30 de septiembre de 2008 y se publicó en el Boletín Oficial de la Provincia (BOP) núm. 258 de 8 de noviembre de 2008" },
  { anverso: "¿Qué regula el Reglamento de Centros y Pabellones Deportivos Municipales?", reverso: "Los derechos y obligaciones de la ciudadanía como usuaria de este servicio público, y diversos aspectos relacionados con el uso y el acceso de personas físicas y jurídicas a la red de centros e instalaciones deportivas municipales" },
  { anverso: "¿A qué instalaciones se aplica el Reglamento de Centros y Pabellones Deportivos Municipales?", reverso: "A los centros e instalaciones deportivas municipales gestionadas tanto de forma directa como indirecta (mediante entidades públicas o privadas autorizadas por acuerdo de los órganos de gobierno del Ayuntamiento)" },
  { anverso: "¿Qué excepción prevé el Reglamento respecto a instalaciones cedidas a terceros?", reverso: "Cuando el convenio de cesión establezca su propio régimen de gestión u operación, ese régimen específico prevalece sobre el Reglamento general" },
  { anverso: "¿Qué tipo de obligaciones básicas suele imponer un reglamento de este tipo a las personas usuarias?", reverso: "Respetar el horario y las normas de uso de cada espacio, hacer un uso adecuado de las instalaciones y equipamiento, y respetar al resto de personas usuarias y al personal del centro" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Cuándo se aprobó el Reglamento de Centros y Pabellones Deportivos Municipales?", explicacion: "El 30 de septiembre de 2008.", dificultad: "dificil", opciones: ["El 30 de septiembre de 2008", "El 19 de septiembre de 2002", "El 1 de enero de 2015", "El 27 de julio de 2026"], correcta: 0 },
  { enunciado: "¿Qué regula este Reglamento?", explicacion: "Derechos y obligaciones de la ciudadanía usuaria del servicio, y el uso/acceso a la red de instalaciones.", dificultad: "media", opciones: ["Derechos y obligaciones de las personas usuarias", "Exclusivamente las tarifas de las tasas municipales", "Exclusivamente el organigrama del Ayuntamiento", "Exclusivamente el mantenimiento técnico de piscinas"], correcta: 0 },
  { enunciado: "¿A qué tipo de gestión se aplica este Reglamento?", explicacion: "A la gestión directa e indirecta de las instalaciones deportivas municipales.", dificultad: "media", opciones: ["A la gestión directa e indirecta", "Únicamente a la gestión directa municipal", "Únicamente a instalaciones privadas sin relación municipal", "Únicamente a piscinas de verano"], correcta: 0 },
  { enunciado: "¿Qué ocurre si el convenio de cesión de una instalación establece su propio régimen de gestión?", explicacion: "Ese régimen específico prevalece sobre el Reglamento general.", dificultad: "dificil", opciones: ["Prevalece el régimen específico del convenio", "El Reglamento general siempre prevalece", "La instalación queda fuera de toda normativa", "Se aplican ambos regímenes simultáneamente sin jerarquía"], correcta: 0 },
]);

const S3 = "ordenanza-fiscal-24-8-tasa-centros-deportivos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué regula la Ordenanza Fiscal nº 24.8 del Ayuntamiento de Zaragoza?", reverso: "La tasa por prestación de servicios en los Centros Deportivos Municipales" },
  { anverso: "¿Cuál es el hecho imponible de la tasa de la Ordenanza Fiscal 24.8?", reverso: "El uso de los espacios deportivos y de los servicios deportivos, sanitarios y recreativos prestados en los Centros Deportivos Municipales detallados en la propia ordenanza" },
  { anverso: "¿Quiénes son los sujetos pasivos de esta tasa?", reverso: "Las personas que utilizan los Centros Deportivos Municipales de titularidad o gestión del Ayuntamiento de Zaragoza a través del Servicio de Instalaciones Deportivas y Distritos" },
  { anverso: "¿Cuándo se devenga la tasa de la Ordenanza Fiscal 24.8?", reverso: "Cuando se solicita el uso de los espacios y servicios del Centro Deportivo Municipal" },
  { anverso: "¿Qué sanción prevé la ordenanza para quien accede a las instalaciones o usa servicios sin abonar la tarifa correspondiente o sin autorización?", reverso: "Una multa de 30,00 euros, que también se aplica al uso fraudulento de títulos de abonado ajenos" },
  { anverso: "¿Qué sucede si una persona usa fraudulentamente el título de abonado de otra persona en un Centro Deportivo Municipal?", reverso: "Se le sanciona con la misma multa de 30,00 euros prevista para el acceso o uso sin pago ni autorización" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué regula la Ordenanza Fiscal nº 24.8?", explicacion: "La tasa por prestación de servicios en los Centros Deportivos Municipales.", dificultad: "facil", opciones: ["La tasa por servicios en Centros Deportivos Municipales", "El Reglamento de participación ciudadana", "La tasa de instalación de escenarios", "El régimen interno del Albergue Municipal"], correcta: 0 },
  { enunciado: "¿Cuál es el hecho imponible de la tasa de la Ordenanza Fiscal 24.8?", explicacion: "El uso de espacios y servicios deportivos, sanitarios y recreativos de los Centros Deportivos Municipales.", dificultad: "media", opciones: ["El uso de espacios y servicios de los Centros Deportivos", "La instalación y desmontaje de escenarios", "La ocupación de la vía pública en general", "El acceso al Registro General del Ayuntamiento"], correcta: 0 },
  { enunciado: "¿Quiénes son los sujetos pasivos de esta tasa?", explicacion: "Las personas que utilizan los Centros Deportivos Municipales.", dificultad: "media", opciones: ["Quienes utilizan los Centros Deportivos Municipales", "Exclusivamente el personal municipal", "Exclusivamente las empresas concesionarias", "Los Alcaldes de Barrio"], correcta: 0 },
  { enunciado: "¿Qué sanción prevé la Ordenanza Fiscal 24.8 para el acceso sin pago ni autorización?", explicacion: "Una multa de 30,00 euros.", dificultad: "dificil", opciones: ["Una multa de 30,00 euros", "La expulsión definitiva sin sanción económica", "Una multa de 300,00 euros", "No prevé ninguna sanción específica"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 7 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 7, orden: 7, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-77 creado y vinculado como Tema 7 de Oficial Polivalente Instalaciones Deportivas.");

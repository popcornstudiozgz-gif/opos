/**
 * Crea tema-189: "Corte y restitución del suministro de agua" — Tema 9
 * (numero=9, bloque-2) de Oficial Guardallaves (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 7 oficial del Anexo I (bases2110.pdf, línea 905):
 *   "Teoría y práctica del corte y la restitución del suministro de
 *   agua. Protocolo de actuación en una rotura de la red de
 *   abastecimiento."
 *
 * Distingue dos realidades distintas del "corte de suministro", ambas
 * cubiertas con sourcing verificado en esta sesión:
 * - La maniobra técnica operativa del guardallaves (cerrar y abrir
 *   válvulas para aislar un tramo, por avería o por mantenimiento):
 *   conocimiento técnico consolidado del oficio, sin norma española
 *   específica que lo regule como tal.
 * - La suspensión administrativa del suministro (por impago u otras
 *   causas contractuales) y su restablecimiento: SÍ tiene marco legal
 *   publicado y verificado — arts. 62 a 64 de la Ordenanza Municipal
 *   para la Ecoeficiencia y la Calidad de la Gestión Integral del Agua
 *   (OMECGIA), aprobación definitiva Pleno 28-01-2011, BOPZ 07-02-2011,
 *   con modificaciones posteriores — texto descargado y leído íntegro
 *   en esta sesión (https://www.zaragoza.es/contenidos/medioambiente/
 *   Ordenanzaagua.pdf).
 *
 * Tres secciones:
 * 1. teoria-tecnica-corte-restitucion-maniobra-valvulas
 * 2. causas-procedimiento-suspension-restablecimiento-omecgia
 * 3. protocolo-actuacion-rotura-red-abastecimiento
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-189-corte-restitucion-suministro-agua.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-189";
const OPOSICION = "oficial-guardallaves-ayto-zaragoza";
const BLOQUE_2_ID = "5bb8da57-00c3-4865-a0a1-651b70c85ba0";

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
  titulo: "Corte y restitución del suministro de agua",
  descripcion: "Maniobra técnica de aislamiento y restitución de tramos de red. Causas y procedimiento de suspensión administrativa del suministro y su restablecimiento (arts. 62-64 OMECGIA). Protocolo de actuación ante una rotura de la red.",
  contenido: "Distingue dos situaciones distintas de corte del suministro de agua: la maniobra técnica operativa (cerrar y abrir válvulas para aislar un tramo de red, por avería o por trabajos de mantenimiento) y la suspensión administrativa del suministro a un abonado concreto (por impago u otras causas contractuales), esta última regulada por la Ordenanza Municipal para la Ecoeficiencia y la Calidad de la Gestión Integral del Agua de Zaragoza. Desarrolla también el protocolo de actuación técnica ante una rotura de la red de abastecimiento, desde su detección hasta la restitución completa del servicio.",
  enlaces_boe: [
    "https://www.zaragoza.es/contenidos/medioambiente/Ordenanzaagua.pdf",
  ],
  indice_estudio: [
    { url: "", titulo: "Teoría y práctica del corte y la restitución: maniobra de válvulas", seccion: "teoria-tecnica-corte-restitucion-maniobra-valvulas", articulos: "Conocimiento técnico del oficio de guardallaves" },
    { url: "https://www.zaragoza.es/contenidos/medioambiente/Ordenanzaagua.pdf", titulo: "Causas y procedimiento de suspensión administrativa y su restablecimiento", seccion: "causas-procedimiento-suspension-restablecimiento-omecgia", articulos: "OMECGIA, arts. 62 a 64" },
    { url: "", titulo: "Protocolo de actuación ante una rotura de la red de abastecimiento", seccion: "protocolo-actuacion-rotura-red-abastecimiento", articulos: "Conocimiento técnico del oficio de guardallaves" },
  ],
}]);

const S1 = "teoria-tecnica-corte-restitucion-maniobra-valvulas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿En qué consiste, técnicamente, un corte de suministro para aislar un tramo de red?", reverso: "En cerrar de forma ordenada las válvulas que delimitan el tramo afectado (según el estudio de sectorización), dejando sin presión únicamente esa zona, para poder intervenir en ella con seguridad" },
  { anverso: "¿Por qué es importante seguir un orden concreto al cerrar las válvulas que aíslan un tramo?", reverso: "Para minimizar la zona realmente afectada por el corte, evitar dejar sin servicio a más abonados de los estrictamente necesarios, y prevenir sobrepresiones o golpes de ariete al maniobrar" },
  { anverso: "¿Qué se debe comprobar antes de dar por cerrado un tramo aislado de la red?", reverso: "Que la presión ha descendido efectivamente en el tramo (mediante purgas, ventosas o puntos de vaciado) y que no queda agua a presión que pueda proyectarse al abrir la conducción para la reparación" },
  { anverso: "¿Cómo debe realizarse la restitución del suministro tras una intervención, en cuanto a la apertura de válvulas?", reverso: "De forma gradual y en el orden inverso al cierre, para llenar la conducción evitando bolsas de aire y evitando golpes de ariete por una apertura brusca" },
  { anverso: "¿Qué debe hacerse tras restituir el suministro en un tramo, antes de dar la incidencia por cerrada?", reverso: "Purgar el aire de la conducción por los puntos altos o ventosas, comprobar la ausencia de fugas en la zona reparada y verificar que la calidad del agua es adecuada antes de su consumo normal" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿En qué consiste técnicamente aislar un tramo de red para una intervención?", explicacion: "En cerrar de forma ordenada las válvulas que delimitan el tramo afectado.", dificultad: "facil", opciones: ["En cerrar de forma ordenada las válvulas que delimitan el tramo", "En vaciar por completo todos los depósitos de la red municipal", "En suspender la póliza de suministro de todos los abonados de la ciudad", "En sustituir de forma preventiva todas las tuberías de la zona"], correcta: 0 },
  { enunciado: "¿Por qué es importante seguir un orden concreto al cerrar las válvulas de un tramo?", explicacion: "Para minimizar la zona afectada y prevenir golpes de ariete.", dificultad: "media", opciones: ["Para minimizar la zona afectada y prevenir golpes de ariete", "Porque el orden de cierre no tiene ninguna relevancia técnica real", "Porque así lo exige exclusivamente la ordenanza fiscal del agua", "Para aumentar deliberadamente el número de abonados afectados"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse antes de abrir una conducción ya aislada para su reparación?", explicacion: "Que la presión ha descendido efectivamente en el tramo.", dificultad: "media", opciones: ["Que la presión ha descendido efectivamente en el tramo", "Que el contador del abonado más cercano marca cero", "Que la factura del último trimestre está correctamente pagada", "Que la válvula de seguridad de todo el sector está retirada"], correcta: 0 },
  { enunciado: "¿Cómo debe restituirse el suministro tras una intervención?", explicacion: "De forma gradual y en orden inverso al cierre, para evitar golpes de ariete.", dificultad: "dificil", opciones: ["De forma gradual y en orden inverso al cierre", "De forma brusca e inmediata, abriendo todas las válvulas a la vez", "Sin ningún orden concreto, siempre que se abran todas las válvulas", "Únicamente durante el horario nocturno, por motivos de presión"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse tras restituir el suministro, antes de dar la incidencia por cerrada?", explicacion: "Purgar el aire, comprobar fugas y verificar la calidad del agua.", dificultad: "media", opciones: ["Purgar el aire, comprobar fugas y verificar la calidad del agua", "Ninguna comprobación adicional una vez abiertas todas las válvulas", "Únicamente notificar la incidencia al departamento de facturación", "Únicamente comprobar el estado exterior de las arquetas de la zona"], correcta: 0 },
]);

const S2 = "causas-procedimiento-suspension-restablecimiento-omecgia";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué ordenanza municipal regula la suspensión administrativa del suministro de agua a un abonado en Zaragoza?", reverso: "La Ordenanza Municipal para la Ecoeficiencia y la Calidad de la Gestión Integral del Agua (OMECGIA), en sus arts. 62 a 64" },
  { anverso: "¿Cuáles son algunas de las causas de suspensión del suministro previstas en el art. 62 de la OMECGIA?", reverso: "El impago de recibos y liquidaciones en plazo, la negligencia del abonado en reparar averías o en permitir la revisión de sus instalaciones, disponer de suministro sin póliza contratada, o utilizar el suministro para usos distintos al contratado" },
  { anverso: "¿Qué datos debe incluir la notificación de suspensión del suministro, según el art. 63 de la OMECGIA?", reverso: "Nombre y dirección del abonado, identificación de la finca y la póliza, fecha a partir de la cual se producirá la suspensión, causas justificativas, dirección y horario para subsanarlas, y el plazo para formular reclamaciones" },
  { anverso: "¿En qué días no puede ejecutarse la suspensión del suministro, según el art. 63.5 de la OMECGIA?", reverso: "En día festivo, ni en ningún día sin servicio administrativo y técnico de atención al público, ni en la víspera de uno de esos días — para poder tramitar por completo el restablecimiento si procede" },
  { anverso: "¿Cuándo debe restablecerse el servicio tras subsanarse las causas de la suspensión, y qué requiere ese restablecimiento, según el art. 64 de la OMECGIA?", reverso: "El mismo día o, en su defecto, el siguiente día hábil; y requiere el pago previo por el abonado de los gastos de la operación, según la tarifa de la ordenanza fiscal correspondiente al calibre instalado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué ordenanza regula la suspensión administrativa del suministro de agua en Zaragoza?", explicacion: "La OMECGIA, en sus arts. 62 a 64.", dificultad: "facil", opciones: ["La Ordenanza Municipal para la Ecoeficiencia y la Gestión Integral del Agua", "El Reglamento de Policía Sanitaria Mortuoria", "La Ordenanza Municipal de Cementerios de Zaragoza", "El Reglamento de los Servicios de Prevención"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes es una causa de suspensión del suministro prevista en el art. 62 de la OMECGIA?", explicacion: "El impago de recibos y liquidaciones en plazo, entre otras causas.", dificultad: "media", opciones: ["El impago de recibos y liquidaciones en los plazos establecidos", "La antigüedad de la instalación interior del abonado", "El cambio de titularidad catastral de la finca del abonado", "La ausencia de contador individual en viviendas unifamiliares"], correcta: 0 },
  { enunciado: "¿Qué debe incluir la notificación de suspensión del suministro, según el art. 63 de la OMECGIA?", explicacion: "Datos del abonado, la finca, la fecha, las causas y el plazo de reclamación.", dificultad: "media", opciones: ["Datos del abonado, la finca, la fecha, las causas y el plazo de reclamación", "Únicamente la fecha de suspensión, sin ningún otro dato adicional", "Únicamente el importe total de la deuda pendiente del abonado", "Únicamente el nombre del técnico municipal responsable del expediente"], correcta: 0 },
  { enunciado: "¿En qué días no puede ejecutarse la suspensión del suministro, según el art. 63.5 de la OMECGIA?", explicacion: "En festivos y días sin atención administrativa y técnica, ni en su víspera.", dificultad: "dificil", opciones: ["En festivos y días sin atención administrativa y técnica, ni en su víspera", "Únicamente los domingos, pudiendo ejecutarse el resto de festivos", "En cualquier día, sin ninguna restricción prevista por la ordenanza", "Únicamente durante el mes de agosto, por el periodo vacacional"], correcta: 0 },
  { enunciado: "¿Qué requiere el restablecimiento del servicio tras subsanarse la causa de la suspensión, según el art. 64 de la OMECGIA?", explicacion: "El pago previo de los gastos de la operación, según la tarifa correspondiente.", dificultad: "media", opciones: ["El pago previo de los gastos de la operación, según tarifa", "Una nueva solicitud completa de alta del servicio desde cero", "Una inspección previa de todas las instalaciones interiores del inmueble", "La presentación de un nuevo certificado de profesionalidad del abonado"], correcta: 0 },
]);

const S3 = "protocolo-actuacion-rotura-red-abastecimiento";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cuáles son las primeras acciones ante el aviso de una rotura en la red de abastecimiento?", reverso: "Confirmar la ubicación exacta de la avería, evaluar el riesgo para personas, tráfico o inmuebles cercanos, y delimitar sobre plano el tramo mínimo de válvulas a cerrar para aislarla" },
  { anverso: "¿Qué se debe valorar al elegir qué válvulas cerrar ante una rotura, además de aislar la fuga?", reverso: "El menor número de abonados afectados posible y la existencia de instalaciones sensibles en la zona (hospitales, centros escolares, grandes consumidores) que puedan requerir aviso previo o suministro alternativo" },
  { anverso: "¿Qué debe hacerse una vez aislado el tramo y vaciada la conducción, antes de iniciar la reparación física?", reverso: "Señalizar la zona de trabajo conforme a la normativa de seguridad vial si afecta a la vía pública, y comprobar las condiciones de seguridad de la excavación o cata si es necesario abrir zanja" },
  { anverso: "¿Qué debe comprobarse en la reparación antes de la puesta en carga de la conducción?", reverso: "La estanqueidad de la unión o pieza reparada, normalmente mediante una prueba de presión, antes de purgar el aire y restituir el suministro con normalidad" },
  { anverso: "¿Por qué puede ser necesario un control de la calidad del agua tras la reparación de una rotura, antes de considerar el suministro plenamente normalizado?", reverso: "Porque la apertura de la conducción puede introducir contaminación externa, y el Real Decreto 140/2003 exige que el agua suministrada cumpla los criterios sanitarios de calidad en el punto de entrega al consumidor" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuáles son las primeras acciones ante el aviso de una rotura en la red de abastecimiento?", explicacion: "Confirmar la ubicación, evaluar el riesgo y delimitar el tramo a aislar.", dificultad: "facil", opciones: ["Confirmar la ubicación, evaluar el riesgo y delimitar el tramo a aislar", "Notificar directamente a todos los abonados de la ciudad", "Cerrar de inmediato el depósito central de Casablanca", "Suspender la póliza de suministro del abonado más cercano"], correcta: 0 },
  { enunciado: "¿Qué debe valorarse, además de aislar la fuga, al elegir qué válvulas cerrar ante una rotura?", explicacion: "El menor número de afectados y las instalaciones sensibles de la zona.", dificultad: "media", opciones: ["El menor número de afectados y las instalaciones sensibles de la zona", "Únicamente la antigüedad de las válvulas disponibles en ese tramo", "Únicamente el color de las tapas de registro de la zona afectada", "Únicamente la distancia al depósito de Casablanca desde la avería"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse antes de iniciar la reparación física, una vez aislado y vaciado el tramo?", explicacion: "Señalizar la zona de trabajo y comprobar la seguridad de la excavación.", dificultad: "media", opciones: ["Señalizar la zona de trabajo y comprobar la seguridad de la excavación", "Notificar el cierre definitivo del tramo a Industria de forma inmediata", "Sustituir de forma preventiva todo el tramo, sin evaluar la avería primero", "Facturar de inmediato los gastos de la operación al abonado más próximo"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse en la reparación antes de la puesta en carga de la conducción?", explicacion: "La estanqueidad de la unión reparada, normalmente mediante prueba de presión.", dificultad: "dificil", opciones: ["La estanqueidad de la unión reparada, mediante prueba de presión", "Únicamente el aspecto visual exterior de la reparación realizada", "Únicamente la fecha de fabricación de la tubería sustituida", "Únicamente el peso final de los materiales empleados en la reparación"], correcta: 0 },
  { enunciado: "¿Por qué puede ser necesario un control de calidad del agua tras reparar una rotura?", explicacion: "Porque la apertura de la conducción puede introducir contaminación, según exige el RD 140/2003.", dificultad: "dificil", opciones: ["Porque la apertura de la conducción puede introducir contaminación", "Porque lo exige exclusivamente la ordenanza fiscal del agua", "Porque así lo exige el certificado de profesionalidad del guardallaves", "No es necesario ningún control adicional tras una reparación correcta"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 9 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 9, orden: 9, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-189 creado y vinculado como Tema 9 de Oficial Guardallaves.");

/**
 * Amplía tema-410 (Manual de Atención a la Ciudadanía) con la sección
 * `web-quejas-cita-previa` para cubrir el Tema 5 de Subalterna/o (CONV
 * 5/2026): "El Manual de Atención a la Ciudadanía. Conocimiento de la web
 * municipal. Quejas y sugerencias. Solicitud de cita previa."
 * Operaria/o Especialista, cuyo Tema 3 es solo el Manual, queda recortada a
 * las cinco secciones del Manual.
 *
 * Fuentes (páginas oficiales de zaragoza.es descargadas y leídas en esta
 * sesión, octubre de 2026):
 * - Servicio de Quejas y Sugerencias (sede/servicio/tramite/4022 y
 *   sede/servicio/quejas-sugerencias/): por internet con o sin registro
 *   (sin registro, seguimiento con el código que llega al correo) y en
 *   ZaragozApp; se pueden adjuntar archivos, situar la queja en un mapa y
 *   autorizar su publicación sin datos personales; presencial en las
 *   oficinas de registro de Plaza del Pilar, 18 y del Seminario (Vía
 *   Hispanidad, 20) y en las Juntas; por teléfono en el 010 (976 721 234
 *   desde fuera de Zaragoza).
 * - Catálogo de transparencia «Quejas, sugerencias y denuncias»
 *   (sede/servicio/transparencia/1340): compromiso de respuesta antes de
 *   48 horas; seguimiento por enlace al correo o dándose de alta.
 * - Fichas de padrón (tramite/3317 y 3319) y de la ORC (equipamiento/325):
 *   la ORC de Plaza del Pilar atiende sin cita previa (lunes a viernes de
 *   8:30 a 14:00 y algunas tardes de 16 a 19 h); en las Juntas Municipales
 *   y Vecinales se atiende sin cita de 9:30 a 13:30 y con cita previa de
 *   8:30 a 9:30, pidiéndola en línea o por teléfono; trámites por internet
 *   con certificado electrónico o Cl@ve y justificante en «Mi Carpeta
 *   Ciudadana»; horario del 010 (lunes a viernes de 8 a 20 h; julio y
 *   agosto de 8 a 15 h).
 * Son datos de servicio que pueden cambiar: el tema lo advierte.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-410-ampliacion-web-quejas-cita-previa.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function pedir(ruta, opciones = {}) {
  const res = await fetch(`${URL_BASE}/rest/v1/${ruta}`, { ...opciones, headers: { ...HEADERS, ...(opciones.headers || {}) } });
  if (!res.ok) { console.error(`❌ ${ruta}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.status === 204 ? null : res.json();
}
const insertar = (tabla, filas) => pedir(tabla, { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(filas) });

const TEMA = "tema-410";
const S = "web-quejas-cita-previa";
const QUEJAS = "https://www.zaragoza.es/sede/servicio/tramite/4022";
const MANUAL_SECCIONES = ["ayuntamiento-ciudadania-calidad", "comunicacion-escuchar-hablar", "pautas-practicas-atencion", "situaciones-dificiles-hostilidad", "principios-basicos-atencion"];

const flashcards = [
  ["La web municipal", "zaragoza.es es la web del Ayuntamiento; su sede electrónica permite hacer trámites, consultar la normativa, el tablón de edictos, la oferta de empleo, el callejero, los equipamientos y la información de transparencia"],
  ["Trámites por internet", "Se hacen con certificado electrónico (como el DNI electrónico) o con el sistema Cl@ve; el justificante queda en «Mi Carpeta Ciudadana»"],
  ["El 010", "Servicio municipal de atención telefónica; desde fuera de Zaragoza se llama al 976 721 234; atiende de lunes a viernes de 8 a 20 h (en julio y agosto de 8 a 15 h)"],
  ["Servicio de Quejas y Sugerencias", "Permite hacer llegar al Ayuntamiento quejas, sugerencias y comentarios sobre la ciudad o los servicios municipales"],
  ["Cómo presentar una queja", "Por internet (con registro o sin registro), con la aplicación ZaragozApp, en persona en las oficinas de registro (Plaza del Pilar, 18 y Seminario, Vía Hispanidad, 20) y Juntas, o por teléfono en el 010"],
  ["Queja sin registro", "Si no te registras, solo puedes seguir la queja con el código que recibes en tu correo electrónico"],
  ["Compromiso de respuesta", "El Ayuntamiento se compromete a responder las quejas y sugerencias antes de 48 horas"],
  ["Mapa de quejas", "Al presentar la queja por internet se pueden adjuntar archivos, situarla en un mapa y autorizar que se publique sin datos personales"],
  ["Atención sin cita previa", "La Oficina de Relaciones con la Ciudadanía (ORC) de Plaza del Pilar, 18 atiende sin cita previa, de lunes a viernes de 8:30 a 14:00 y algunas tardes de 16 a 19 h"],
  ["Cita previa en las Juntas", "En las Juntas Municipales y Vecinales se atiende sin cita de 9:30 a 13:30 y con cita previa de 8:30 a 9:30; la cita se pide en línea o por teléfono"],
];

const preguntas = [
  ["facil", "La web del Ayuntamiento de Zaragoza es:", ["zaragoza.es", "aragon.es", "boe.es"], "Web municipal."],
  ["media", "Para hacer un trámite municipal por internet se necesita:", ["Un certificado electrónico o el sistema Cl@ve", "Solo un correo electrónico", "Un fax"], "Fichas de trámites de zaragoza.es."],
  ["media", "El teléfono municipal de información es el:", ["010", "112", "091"], "Ficha del Servicio de Quejas y Sugerencias."],
  ["media", "El Ayuntamiento se compromete a responder las quejas y sugerencias:", ["Antes de 48 horas", "En un mes", "En tres meses"], "Catálogo de transparencia, «Quejas, sugerencias y denuncias»."],
  ["media", "Si presentas una queja por internet sin registrarte, la sigues:", ["Con el código que te llega al correo electrónico", "No se puede seguir", "Llamando al 112"], "Servicio de Quejas y Sugerencias."],
  ["media", "¿Dónde se atiende el padrón sin cita previa?", ["En la Oficina de Relaciones con la Ciudadanía de Plaza del Pilar", "Solo en el Seminario", "Solo por internet"], "Fichas del padrón y de la ORC."],
  ["dificil", "En las Juntas Municipales y Vecinales, el horario con cita previa es de:", ["8:30 a 9:30", "9:30 a 13:30", "16:00 a 19:00"], "Fichas del padrón."],
  ["media", "¿Cuál de estos NO es un modo de presentar una queja?", ["Por correo postal a la Delegación del Gobierno", "Con la aplicación ZaragozApp", "En el 010"], "Servicio de Quejas y Sugerencias."],
];

const glosario = [
  [S, "Sede electrónica", "Dirección de internet del Ayuntamiento donde se hacen trámites y se consulta información oficial."],
  [S, "Cl@ve", "Sistema del Estado para identificarse en internet y hacer trámites sin certificado electrónico."],
  [S, "Cita previa", "Reserva de día y hora para ser atendido en una oficina municipal."],
  [S, "010", "Teléfono municipal de información y atención a la ciudadanía."],
];

const [tema] = await pedir(`temas?slug=eq.${TEMA}&select=indice_estudio,enlaces_boe`);
if (tema.indice_estudio.some((i) => i.seccion === S)) { console.error(`❌ ${TEMA} ya tiene la sección ${S}.`); process.exit(1); }

console.log(`📚 Ampliando ${TEMA} con ${S}...`);
await pedir(`temas?slug=eq.${TEMA}`, {
  method: "PATCH",
  body: JSON.stringify({
    indice_estudio: [...tema.indice_estudio, { seccion: S, titulo: "La web municipal, quejas y sugerencias y cita previa", articulos: "Fichas oficiales de zaragoza.es (2026)", url: QUEJAS }],
    enlaces_boe: [...tema.enlaces_boe, { url: QUEJAS, titulo: "Servicio de Quejas y Sugerencias, Ayuntamiento de Zaragoza (sede electrónica)" }],
  }),
});
await insertar("flashcards", flashcards.map(([anverso, reverso]) => ({ tema_slug: TEMA, seccion: S, anverso, reverso })));
const filas = await insertar("preguntas", preguntas.map(([dificultad, enunciado, , explicacion]) => ({ tema_slug: TEMA, seccion: S, dificultad, enunciado, explicacion })));
await insertar("opciones", filas.flatMap((fila, i) => preguntas[i][2].map((texto, orden) => ({ pregunta_id: fila.id, texto, es_correcta: orden === 0, orden }))));
await insertar("glosario", glosario.map(([seccion, termino, definicion]) => ({ tema_slug: TEMA, seccion, termino, definicion })));
console.log(`   ✓ ${flashcards.length} flashcards, ${preguntas.length} preguntas, ${glosario.length} términos`);

await pedir(`tema_oposicion?tema_slug=eq.${TEMA}&oposicion_slug=eq.operario-especialista-ayto-zaragoza`, {
  method: "PATCH",
  body: JSON.stringify({ secciones_incluidas: MANUAL_SECCIONES }),
});
console.log("   ✓ Operario/a Especialista recortada a las secciones del Manual");
console.log(`✅ ${TEMA} ampliado.`);

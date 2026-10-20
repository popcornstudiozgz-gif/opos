/**
 * Crea tema-303: "Conocimiento del municipio de Zaragoza: callejero,
 * polígonos industriales y parques de bomberos" — Tema 41 (numero=41,
 * bloque-3) de Bombero/a Conductor/a, para la segunda prueba del primer
 * ejercicio.
 *
 * Fuentes leídas íntegras en la sesión:
 * - Bases específicas CONV 8.1/2026 (bases2107.pdf), Anexo III: callejero
 *   (calle, entrada, salida) y polígonos industriales (denominación,
 *   situación). Extraído por posición del texto en el PDF a
 *   scripts/data/callejero-bombero-conv-8-1-2026.json: 367 calles y 52
 *   polígonos. Se descartan las dos filas que el documento repite idénticas
 *   al final (ACUARIO y ADOLFO, HERMANO) y la fila "MAYOR | MAYOR | MAYOR",
 *   errata del propio anexo (la otra fila de MAYOR —JAIME I / COSO— sí se
 *   usa). La extracción por texto plano (pdftotext) desalineaba varias filas
 *   (p. ej. HISPANIDAD, ZURIZA, los polígonos de la carretera de Castellón);
 *   las coordenadas del PDF son la referencia.
 * - Texto refundido de las bases generales del turno libre (junio de 2026),
 *   base 9.4.C, segunda prueba: 50 preguntas + 5 de reserva, 3 opciones, 30
 *   minutos, 0-5 puntos (mínimo 2,5), error = -1/4; contenido evaluable
 *   (parques, malla básica y viales del anexo, polígonos, Juntas, hospitales
 *   y demás puntos que enumera), y sentidos de circulación del Servicio de
 *   Movilidad en la fecha del ejercicio.
 * - Tema 9 de la Escuela de Bomberos del Ayuntamiento (V.2024, publicado en
 *   zaragoza.es/sede/portal/bomberos/temarios): ubicación de los parques 1 a 5.
 * - Casa Consistorial: Plaza del Pilar nº 18 (pie de la sede electrónica
 *   municipal).
 *
 * No se fabrican rutas ni direcciones no publicadas: las preguntas sobre
 * calles y polígonos salen literalmente del anexo, y de los hospitales y
 * demás puntos de referencia solo se recoge que son materia de examen.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-303-callejero-poligonos-bomberos.mjs
 */
import { readFileSync } from "node:fs";

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-303";
const OPOSICION = "bombero-conductor-ayto-zaragoza";
const BLOQUE_3_ID = "4cfdb495-22b3-40c9-a2c5-808c6d5286ea";
const NUMERO = 41;

const BASES = "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2107.pdf";
const TRBGTL = "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases-textorefundido/bases_turno_libre.pdf";
const TEMA_9_ESCUELA = "https://www.zaragoza.es/cont/vistas/portal/bomberos/doc/TEMA_9_EL_SERVICIO_CONTRA_INCENDIOS_DE_SALVAMENTO_Y_PROTECCION_CIVIL_V2024.pdf";

const datos = JSON.parse(readFileSync(new URL("./data/callejero-bombero-conv-8-1-2026.json", import.meta.url), "utf8"));

async function insertar(tabla, filas) {
  const salida = [];
  for (let i = 0; i < filas.length; i += 500) {
    const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, { method: "POST", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify(filas.slice(i, i + 500)) });
    if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
    salida.push(...(await res.json()));
  }
  return salida;
}
async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, { method: "POST", headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
/** Preguntas con { opciones, correcta } (índice de la correcta). */
async function insertarPreguntasConOpciones(preguntas) {
  const insertadas = await insertar("preguntas", preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA })));
  await insertar("opciones", insertadas.flatMap((pregunta, i) => preguntas[i].opciones.map((texto, orden) => ({ pregunta_id: pregunta.id, texto, es_correcta: orden === preguntas[i].correcta, orden }))));
  return insertadas.length;
}
/** Casos: la primera opción de cada pregunta es la correcta (el cliente baraja). */
async function crearCaso({ slug, titulo, supuesto, orden, preguntas }) {
  if (preguntas.length !== 10) { console.error(`❌ ${titulo}: ${preguntas.length} preguntas (se esperaban 10)`); process.exit(1); }
  const [caso] = await insertar("casos_practicos", [{ tema_slug: TEMA, slug, titulo, supuesto, orden }]);
  const insertadas = await insertar("preguntas", preguntas.map((p) => ({ tema_slug: TEMA, seccion: p.seccion, enunciado: p.enunciado, explicacion: p.explicacion, dificultad: p.dificultad })));
  await insertar("opciones", insertadas.flatMap((pregunta, i) => preguntas[i].opciones.map((texto, idx) => ({ pregunta_id: pregunta.id, texto, es_correcta: idx === 0, orden: idx }))));
  await insertar("caso_preguntas", insertadas.map((pregunta, i) => ({ caso_id: caso.id, pregunta_id: pregunta.id, orden: i })));
  console.log(`   ✓ caso: ${titulo}`);
}

// ── Utilidades de generación ────────────────────────────────────────────
function prng(semilla) {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const sinTildes = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const clave = (s) => sinTildes(s).toUpperCase().replace(/[^A-Z0-9]/g, "");
const NO_TIENE = "NO TIENE";
const mostrar = (v) => (v === NO_TIENE ? "No tiene (figura como «NO TIENE» en el anexo)" : v);
/** Elige `n` distractores distintos del pool, deterministas según `semilla`. */
function distractores(pool, excluidas, n, semilla) {
  const fuera = new Set(excluidas.map(clave));
  const candidatos = [...new Set(pool)].filter((v) => !fuera.has(clave(v)));
  const r = prng(semilla);
  const elegidos = [];
  while (elegidos.length < n) {
    const v = candidatos[Math.floor(r() * candidatos.length)];
    if (!elegidos.includes(v)) elegidos.push(v);
  }
  return elegidos;
}
/** Inserta la correcta en una posición determinista entre los distractores. */
function conCorrecta(correcta, otras, semilla) {
  const pos = Math.floor(prng(semilla * 7 + 3)() * (otras.length + 1));
  const opciones = [...otras];
  opciones.splice(pos, 0, correcta);
  return { opciones, correcta: pos };
}

// ── Secciones ───────────────────────────────────────────────────────────
const S_PRUEBA = "prueba-conocimiento-municipio";
const S_PARQUES = "parques-bomberos";
const S_POLIGONOS = "poligonos-industriales";
const TRAMOS = [
  { seccion: "callejero-a-c", desde: "A", hasta: "C", titulo: "Callejero: calles de la A a la C" },
  { seccion: "callejero-d-l", desde: "D", hasta: "L", titulo: "Callejero: calles de la D a la L" },
  { seccion: "callejero-m-r", desde: "M", hasta: "R", titulo: "Callejero: calles de la M a la R" },
  { seccion: "callejero-s-z", desde: "S", hasta: "Z", titulo: "Callejero: calles de la S a la Z" },
];
const seccionDeCalle = (calle) => {
  const inicial = sinTildes(calle)[0].toUpperCase();
  return TRAMOS.find((t) => inicial >= t.desde && inicial <= t.hasta).seccion;
};

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [{
  slug: TEMA,
  titulo: "Conocimiento del municipio de Zaragoza: callejero, polígonos industriales y parques de bomberos",
  descripcion: "Segunda prueba del primer ejercicio: el callejero del Anexo III (cada calle con su entrada y su salida), los polígonos industriales y su situación, los cuatro parques del Servicio contra Incendios y los puntos de referencia que fijan las bases generales.",
  contenido: "Prepara la prueba de conocimiento del municipio de Zaragoza tal como la regulan las bases: cómo es la prueba y qué puede preguntarse, dónde están los parques de bomberos, la entrada y la salida de cada una de las calles del callejero oficial de la convocatoria y la situación de los polígonos industriales. Las calles y polígonos están tomados literalmente del Anexo III; los sentidos de circulación aplicables son los del Servicio de Movilidad en la fecha del examen, y la malla básica la del anexo IV de la Ordenanza General de Tráfico y el PGOU.",
  enlaces_boe: [
    { url: BASES, titulo: "Bases específicas CONV 8.1/2026 — Anexo III: callejero y polígonos" },
    { url: TRBGTL, titulo: "Texto refundido de las bases generales del turno libre — base 9.4.C" },
    { url: TEMA_9_ESCUELA, titulo: "Escuela de Bomberos de Zaragoza — Tema 9: parques de bomberos" },
  ],
  indice_estudio: [
    { seccion: S_PRUEBA, titulo: "La prueba de conocimiento del municipio", articulos: "Bases generales, base 9.4.C (segunda prueba)", url: TRBGTL },
    { seccion: S_PARQUES, titulo: "Los parques de bomberos", articulos: "Tema 9 de la Escuela de Bomberos, apartado 4", url: TEMA_9_ESCUELA },
    ...TRAMOS.map((t) => ({ seccion: t.seccion, titulo: t.titulo, articulos: "Anexo III, callejero", url: BASES })),
    { seccion: S_POLIGONOS, titulo: "Polígonos industriales", articulos: "Anexo III, polígonos industriales", url: BASES },
  ],
}]);

// ── La prueba y los puntos de referencia ────────────────────────────────
console.log(`📝 ${S_PRUEBA}...`);
await insertar("flashcards", [
  { anverso: "¿Cómo es la segunda prueba del primer ejercicio (conocimiento del municipio)?", reverso: "Un cuestionario tipo test de 50 preguntas, más 5 de reserva, con 3 respuestas alternativas, en un máximo de 30 minutos" },
  { anverso: "¿Cómo se califica la prueba de conocimiento del municipio?", reverso: "De 0 a 5 puntos; hace falta un mínimo de 2,5. Las respuestas en blanco no penalizan y cada error descuenta un cuarto del valor de un acierto" },
  { anverso: "¿Sobre qué versan las preguntas de la prueba del municipio según las bases generales?", reverso: "Sobre la ubicación, disposición o trayecto más adecuado para moverse entre los puntos, establecimientos o calles que fijan las bases: parques del Servicio, malla básica y viales del anexo, polígonos, Juntas de Distrito y Vecinales, hospitales y otros puntos de referencia" },
  { anverso: "¿Qué hospitales cita expresamente la base 9.4.C como puntos de referencia?", reverso: "Hospital Universitario Miguel Servet, Hospital Clínico Universitario Lozano Blesa, Hospital Royo Villanova, Hospital Real y Provincial Nuestra Señora de Gracia y Hospital Militar de Zaragoza" },
  { anverso: "Además de parques, hospitales y Juntas, ¿qué otros puntos de referencia cita la base 9.4.C?", reverso: "Aeropuerto de Zaragoza, Estación intermodal Delicias, Estación Municipal de la Romareda, Pabellón Deportivo Municipal Príncipe Felipe y Casa Consistorial (Plaza del Pilar, 18)" },
  { anverso: "¿Qué sentidos de circulación se tienen en cuenta para determinar el recorrido más correcto?", reverso: "Los establecidos por el Servicio de Movilidad del Ayuntamiento en la fecha del ejercicio, sin considerar afecciones o cortes puntuales de ese día" },
  { anverso: "¿Qué es la malla básica a efectos de la prueba?", reverso: "La red viaria principal determinada en el anexo IV de la Ordenanza General de Tráfico de Zaragoza y en el Plan General de Ordenación Urbana vigentes en la fecha de la prueba" },
  { anverso: "¿Cuándo se realiza la prueba del municipio respecto a la del temario?", reverso: "El mismo día e inmediatamente a continuación de la primera prueba (cuestionario de 100 preguntas sobre el temario); quien abandona tras la primera figura como «no presentado» en la segunda y queda eliminado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S_PRUEBA })));
let n = await insertarPreguntasConOpciones([
  { enunciado: "¿Cuántas preguntas computables tiene la prueba de conocimiento del municipio?", explicacion: "50 preguntas tipo test con 3 alternativas, más 5 de reserva (base 9.4.C).", dificultad: "facil", opciones: ["50", "100", "30"], correcta: 0 },
  { enunciado: "¿Cuál es el tiempo máximo de la prueba de conocimiento del municipio?", explicacion: "Treinta minutos (base 9.4.C).", dificultad: "facil", opciones: ["30 minutos", "75 minutos", "60 minutos"], correcta: 0 },
  { enunciado: "¿Qué puntuación mínima hay que obtener en la prueba del municipio?", explicacion: "Se califica de 0 a 5 y hace falta un mínimo de 2,5 (base 9.4.C).", dificultad: "media", opciones: ["2,5 puntos", "5 puntos", "7,5 puntos"], correcta: 0 },
  { enunciado: "En la prueba del municipio, una respuesta errónea:", explicacion: "Descuenta un cuarto del valor de una respuesta acertada; las respuestas en blanco no penalizan.", dificultad: "media", opciones: ["Descuenta un cuarto del valor de un acierto", "No penaliza", "Descuenta lo mismo que vale un acierto"], correcta: 0 },
  { enunciado: "¿Qué sentidos de circulación se consideran para el recorrido más correcto?", explicacion: "Los del Servicio de Movilidad en la fecha del ejercicio, sin tener en cuenta afecciones puntuales.", dificultad: "media", opciones: ["Los fijados por el Servicio de Movilidad en la fecha del ejercicio", "Los vigentes cuando se publicaron las bases", "Los que indique cada aspirante en su respuesta"], correcta: 0 },
  { enunciado: "¿Cuál de estos hospitales figura expresamente entre los puntos de referencia de la prueba?", explicacion: "La base 9.4.C cita el Miguel Servet, el Clínico Lozano Blesa, el Royo Villanova, el Provincial Nuestra Señora de Gracia y el Militar.", dificultad: "media", opciones: ["Hospital Royo Villanova", "Hospital de Barbastro", "Hospital Obispo Polanco"], correcta: 0 },
  { enunciado: "¿Dónde está la Casa Consistorial del Ayuntamiento de Zaragoza?", explicacion: "En la Plaza del Pilar, nº 18.", dificultad: "facil", opciones: ["Plaza del Pilar, 18", "Vía Hispanidad, 20", "Plaza de España, 1"], correcta: 0 },
].map((p) => ({ ...p, seccion: S_PRUEBA })));
console.log(`   ✓ preguntas: ${n}`);

// ── Parques de bomberos (Tema 9 de la Escuela) ──────────────────────────
console.log(`📝 ${S_PARQUES}...`);
await insertar("flashcards", [
  { anverso: "¿Dónde está el Parque 1 o Parque central de bomberos?", reverso: "En la margen izquierda del Ebro, al norte de la ciudad, en la avenida Valle de Broto, en el segundo cinturón de ronda; es además Parque de Zona nº 1" },
  { anverso: "¿Dónde está el Parque 2 de bomberos?", reverso: "En el Casco Antiguo, anexo al Museo del Fuego y de los Bomberos, en un ensanche de la calle Ramón y Cajal; su zona de influencia es el centro de la ciudad" },
  { anverso: "¿Desde cuándo funciona el Parque 2 y qué tiene de particular?", reverso: "Se abrió como parque en 1907 y durante 75 años fue el único Parque de Bomberos de Zaragoza, hasta la inauguración del parque central en 1983" },
  { anverso: "¿Dónde está el Parque 3 de bomberos?", reverso: "Al sur de la ciudad, en la calle Violante de Hungría, en el antiguo cuartel de Palafox; abrió en octubre de 1988 y atiende la zona sur y oeste" },
  { anverso: "¿Dónde está el Parque 4 de bomberos?", reverso: "En el barrio de Casetas; se inauguró el 8 de marzo de 1991 como parque de apoyo y cubre, entre otros, el corredor industrial de la carretera de Logroño" },
  { anverso: "¿Qué es el Parque 5?", reverso: "Instalaciones destinadas en principio a escuela de bomberos y parque de prácticas, en el Polígono Empresarium, barrio de la Cartuja Baja (C/ Acebo s/n); de momento sin personal fijo asignado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S_PARQUES })));
n = await insertarPreguntasConOpciones([
  { enunciado: "¿En qué avenida está el Parque 1 o Parque central?", explicacion: "Avenida Valle de Broto, en el segundo cinturón de ronda, margen izquierda del Ebro (Tema 9 de la Escuela de Bomberos).", dificultad: "facil", opciones: ["Avenida Valle de Broto", "Avenida de Navarra", "Avenida de Cataluña"], correcta: 0 },
  { enunciado: "¿Qué parque está anexo al Museo del Fuego y de los Bomberos?", explicacion: "El Parque 2, en un ensanche de la calle Ramón y Cajal (Casco Antiguo).", dificultad: "facil", opciones: ["El Parque 2", "El Parque 1", "El Parque 4"], correcta: 0 },
  { enunciado: "¿En qué calle está el Parque 3?", explicacion: "En la calle Violante de Hungría, en el antiguo cuartel de Palafox.", dificultad: "media", opciones: ["Violante de Hungría", "Valle de Broto", "Ramón y Cajal"], correcta: 0 },
  { enunciado: "¿En qué barrio está el Parque 4?", explicacion: "En Casetas; se inauguró el 8 de marzo de 1991.", dificultad: "media", opciones: ["Casetas", "La Cartuja Baja", "Torrero"], correcta: 0 },
  { enunciado: "¿Qué parque fue durante 75 años el único de Zaragoza?", explicacion: "El Parque 2, abierto en 1907, hasta la inauguración del parque central en 1983.", dificultad: "dificil", opciones: ["El Parque 2", "El Parque 3", "El Parque 1"], correcta: 0 },
  { enunciado: "¿En qué polígono están las instalaciones del Parque 5 (escuela y parque de prácticas)?", explicacion: "En el Polígono Empresarium, barrio de la Cartuja Baja (C/ Acebo s/n).", dificultad: "media", opciones: ["Empresarium", "Malpica", "Cogullada"], correcta: 0 },
].map((p) => ({ ...p, seccion: S_PARQUES })));
console.log(`   ✓ preguntas: ${n}`);

// ── Callejero (generado del Anexo III) ──────────────────────────────────
const calles = datos.calles;
const porNombre = new Map();
for (const c of calles) porNombre.set(c.calle, [...(porNombre.get(c.calle) ?? []), c]);
const viales = [...new Set(calles.flatMap((c) => [c.entrada, c.salida]))].filter((v) => v !== NO_TIENE && v !== "LÍMITE TÉRMINO");

const flashcardsCallejero = [...porNombre.entries()].map(([calle, filas]) => ({
  tema_slug: TEMA,
  seccion: seccionDeCalle(calle),
  anverso: filas.length > 1
    ? `Callejero: ¿por dónde se entra y se sale de ${calle}? (figura ${filas.length} veces en el anexo)`
    : `Callejero: ¿por dónde se entra y se sale de ${calle}?`,
  reverso: filas.map((f) => `Entrada: ${f.entrada} · Salida: ${mostrar(f.salida)}`).join("\n"),
}));

const preguntasCallejero = [];
calles.forEach((c, i) => {
  const hermanas = porNombre.get(c.calle);
  const excluidas = [c.calle, ...hermanas.flatMap((h) => [h.entrada, h.salida])];
  const seccion = seccionDeCalle(c.calle);
  const fuente = `Anexo III (callejero): ${c.calle} — entrada ${c.entrada}, salida ${mostrar(c.salida)}.`;
  // Entrada: si hay otra fila de la misma calle, se distingue por su salida.
  if (!hermanas.some((h) => h !== c && h.salida === c.salida)) {
    const tramo = hermanas.length > 1 ? ` en el tramo cuya salida es ${mostrar(c.salida)}` : "";
    preguntasCallejero.push({
      seccion, dificultad: "media",
      enunciado: `Según el callejero de las bases, ¿por qué calle se ENTRA a ${c.calle}${tramo}?`,
      explicacion: fuente,
      ...conCorrecta(c.entrada, distractores(viales, excluidas, 2, i * 2 + 1), i * 2 + 1),
    });
  }
  // Salida: si hay otra fila de la misma calle, se distingue por su entrada.
  if (!hermanas.some((h) => h !== c && h.entrada === c.entrada)) {
    const tramo = hermanas.length > 1 ? ` en el tramo cuya entrada es ${c.entrada}` : "";
    preguntasCallejero.push({
      seccion, dificultad: "media",
      enunciado: `Según el callejero de las bases, ¿por qué calle se SALE de ${c.calle}${tramo}?`,
      explicacion: fuente,
      ...conCorrecta(mostrar(c.salida), distractores(viales, excluidas, 2, i * 2 + 2), i * 2 + 2),
    });
  }
});

console.log("📝 callejero...");
await insertar("flashcards", flashcardsCallejero);
console.log(`   ✓ flashcards: ${flashcardsCallejero.length}`);
n = await insertarPreguntasConOpciones(preguntasCallejero);
console.log(`   ✓ preguntas: ${n}`);

// ── Polígonos industriales ──────────────────────────────────────────────
console.log(`📝 ${S_POLIGONOS}...`);
const poligonos = datos.poligonos;
const situaciones = [...new Set(poligonos.map((p) => p.situacion))];
await insertar("flashcards", poligonos.map((p) => ({ tema_slug: TEMA, seccion: S_POLIGONOS, anverso: `¿Dónde se sitúa el polígono ${p.denominacion}?`, reverso: p.situacion })));
const preguntasPoligonos = poligonos.map((p, i) => ({
  seccion: S_POLIGONOS, dificultad: "media",
  enunciado: `Según el anexo de polígonos industriales, ¿dónde se sitúa ${p.denominacion}?`,
  explicacion: `Anexo III (polígonos industriales): ${p.denominacion} — ${p.situacion}.`,
  ...conCorrecta(p.situacion, distractores(situaciones, [p.situacion], 2, 1000 + i), 1000 + i),
}));
n = await insertarPreguntasConOpciones(preguntasPoligonos);
console.log(`   ✓ flashcards: ${poligonos.length} · preguntas: ${n}`);

// ── Glosario ────────────────────────────────────────────────────────────
console.log("📖 glosario...");
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S_PRUEBA, termino: "Malla básica", definicion: "Red viaria principal de Zaragoza definida en el anexo IV de la Ordenanza General de Tráfico y en el PGOU; es materia de la prueba de conocimiento del municipio." },
  { tema_slug: TEMA, seccion: S_PRUEBA, termino: "Nota de corte", definicion: "Puntuación que fija el tribunal para que solo superen la prueba los mejores aspirantes, hasta el número máximo que marcan las bases (201 en la primera prueba de esta convocatoria)." },
  { tema_slug: TEMA, seccion: S_PARQUES, termino: "Parque de zona", definicion: "Parque de bomberos con su dotación de personal y vehículos que atiende las emergencias de un área concreta de la ciudad, dependiendo del parque central." },
  { tema_slug: TEMA, seccion: "callejero-a-c", termino: "Entrada y salida", definicion: "En el callejero del Anexo III, las calles por las que se accede a cada vía y por las que se abandona; son la base de las preguntas sobre recorridos." },
  { tema_slug: TEMA, seccion: "callejero-a-c", termino: "NO TIENE", definicion: "Indicación del callejero del Anexo III para las calles que no tienen salida a otra vía." },
  { tema_slug: TEMA, seccion: S_POLIGONOS, termino: "Situación", definicion: "En el anexo de polígonos, la vía o punto kilométrico por el que se localiza y accede a cada polígono industrial." },
]);

// ── Casos prácticos ─────────────────────────────────────────────────────
console.log("🧩 casos prácticos...");
const filaDe = (calle) => {
  const filas = porNombre.get(calle);
  if (!filas || filas.length !== 1) { console.error(`❌ Calle no encontrada o repetida en el anexo: ${calle}`); process.exit(1); }
  return filas[0];
};
const casoCalle = (calle, tipo, semilla) => {
  const c = filaDe(calle);
  const excluidas = [c.calle, c.entrada, c.salida];
  const correcta = tipo === "entrada" ? c.entrada : mostrar(c.salida);
  return {
    seccion: seccionDeCalle(calle), dificultad: "media",
    enunciado: tipo === "entrada" ? `¿Por qué calle se entra a ${calle}, según el callejero de las bases?` : `¿Por qué calle se sale de ${calle}, según el callejero de las bases?`,
    explicacion: `Anexo III (callejero): ${calle} — entrada ${c.entrada}, salida ${mostrar(c.salida)}.`,
    opciones: [correcta, ...distractores(viales, excluidas, 2, semilla)],
  };
};
const CENTRO = [["COSO", "entrada"], ["ALFONSO I", "salida"], ["INDEPENDENCIA", "entrada"], ["CÉSAR AUGUSTO", "salida"], ["ESPARTERO", "entrada"], ["ESTUDIANTES", "salida"], ["CONSTITUCIÓN", "entrada"], ["GRAN VÍA", "salida"], ["ARAGÓN", "entrada"], ["HEROÍSMO", "salida"]];
await crearCaso({
  slug: "caso-salida-casco-historico-callejero",
  titulo: "Una salida al centro histórico: repaso del callejero",
  orden: 1,
  supuesto: "Un bombero conductor repasa con su compañero, antes del examen, las calles del centro de la ciudad que más recorren las dotaciones del Parque 2, comprobando la entrada y la salida de cada una en el callejero oficial de la convocatoria.",
  preguntas: CENTRO.map(([calle, tipo], i) => casoCalle(calle, tipo, 5000 + i)),
});
const POLIGONOS_CASO = ["COGULLADA, POLIGONO INDUSTRIAL", "CIUDAD DEL TRANSPORTE", "EMPRESARIUM, (POLIGONO INDUSTRIAL)", "EXPO-ZARAGOZA, PG.", "MIRAFLORES (PG. EMPRESARIAL)", "MONTEMOLIN (POLIGONO INDUSTRIAL)", "PLAZA, (POLIGONO)", "PORTAZGO, POLIGONO INDUSTRIAL", "SAN VALERO, POLIGONO INDUSTRIAL", "VALSECA, POLIGONO INDUSTRIAL"];
await crearCaso({
  slug: "caso-avisos-poligonos-industriales",
  titulo: "Avisos en polígonos industriales",
  orden: 2,
  supuesto: "Durante una guardia entran varios avisos de incendio en naves de distintos polígonos industriales. El conductor debe saber, para cada uno, por qué vía se sitúa según el anexo de polígonos de la convocatoria.",
  preguntas: POLIGONOS_CASO.map((nombre, i) => {
    const p = poligonos.find((x) => x.denominacion === nombre);
    if (!p) { console.error(`❌ Polígono no encontrado: ${nombre}`); process.exit(1); }
    return {
      seccion: S_POLIGONOS, dificultad: "media",
      enunciado: `¿Dónde se sitúa ${nombre}, según el anexo de polígonos?`,
      explicacion: `Anexo III (polígonos industriales): ${nombre} — ${p.situacion}.`,
      opciones: [p.situacion, ...distractores(situaciones, [p.situacion], 2, 6000 + i)],
    };
  }),
});
await crearCaso({
  slug: "caso-preparacion-prueba-municipio-parques",
  titulo: "Preparando la prueba del municipio y los parques",
  orden: 3,
  supuesto: "Una aspirante organiza su estudio para la segunda prueba del primer ejercicio y empieza por entender cómo es la prueba y dónde están los parques del Servicio.",
  preguntas: [
    { seccion: S_PRUEBA, dificultad: "facil", enunciado: "¿Cuántas preguntas computables tendrá la prueba del municipio?", explicacion: "50 preguntas, más 5 de reserva.", opciones: ["50", "100", "40"] },
    { seccion: S_PRUEBA, dificultad: "facil", enunciado: "¿Cuántas alternativas tendrá cada pregunta?", explicacion: "Tres respuestas alternativas, una correcta.", opciones: ["Tres", "Cuatro", "Dos"] },
    { seccion: S_PRUEBA, dificultad: "media", enunciado: "Si deja una pregunta en blanco, ¿cuánto le resta?", explicacion: "Las respuestas en blanco no penalizan.", opciones: ["Nada", "Un cuarto de acierto", "Un acierto entero"] },
    { seccion: S_PRUEBA, dificultad: "media", enunciado: "¿Qué nota mínima necesita en esta prueba?", explicacion: "2,5 sobre 5.", opciones: ["2,5 sobre 5", "5 sobre 10", "7,5 sobre 15"] },
    { seccion: S_PRUEBA, dificultad: "media", enunciado: "Para estudiar los sentidos de circulación, ¿qué referencia debe tomar?", explicacion: "Los establecidos por el Servicio de Movilidad en la fecha del ejercicio.", opciones: ["Los del Servicio de Movilidad en la fecha del ejercicio", "Los de un navegador comercial", "Los del callejero de 2008"] },
    { seccion: S_PARQUES, dificultad: "facil", enunciado: "¿Dónde está el Parque central (Parque 1)?", explicacion: "En la avenida Valle de Broto, margen izquierda del Ebro.", opciones: ["Avenida Valle de Broto", "Calle Ramón y Cajal", "Calle Violante de Hungría"] },
    { seccion: S_PARQUES, dificultad: "media", enunciado: "¿Qué parque atiende la zona sur y oeste desde el antiguo cuartel de Palafox?", explicacion: "El Parque 3, en la calle Violante de Hungría.", opciones: ["El Parque 3", "El Parque 2", "El Parque 4"] },
    { seccion: S_PARQUES, dificultad: "media", enunciado: "¿Qué parque cubre el barrio de Casetas y el corredor de la carretera de Logroño?", explicacion: "El Parque 4, inaugurado el 8 de marzo de 1991.", opciones: ["El Parque 4", "El Parque 1", "El Parque 5"] },
    { seccion: S_PRUEBA, dificultad: "media", enunciado: "¿Cuál de estos puntos NO figura entre los que cita la base 9.4.C?", explicacion: "La base cita, entre otros, el Aeropuerto, la Estación Delicias, el Príncipe Felipe y la Casa Consistorial; no la Basílica del Pilar.", opciones: ["La Basílica del Pilar", "El Aeropuerto de Zaragoza", "La Estación intermodal Delicias"] },
    { seccion: S_PRUEBA, dificultad: "media", enunciado: "¿Dónde se definen el callejero y los polígonos que entran en la prueba?", explicacion: "En el anexo sobre conocimiento del municipio de las bases específicas (Anexo III).", opciones: ["En el Anexo III de las bases específicas", "En el PGOU completo", "En la guía telefónica municipal"] },
  ],
});

console.log(`\n🔗 Vinculando ${TEMA} como Tema ${NUMERO} de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_3_ID, numero: NUMERO, orden: NUMERO, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log(`\n✅ ${TEMA} creado y vinculado como Tema ${NUMERO} de Bombero/a Conductor/a.`);

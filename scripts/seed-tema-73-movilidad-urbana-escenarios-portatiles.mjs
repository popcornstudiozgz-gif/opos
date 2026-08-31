/**
 * Crea tema-73: "Movilidad urbana y escenarios portátiles" — Tema 19
 * (numero=19, bloque-2) de Oficial Mantenimiento General (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 17 oficial del Anexo I (bases2110.pdf):
 *   "Ordenanza de Movilidad Urbana de Zaragoza. Ordenanza fiscal n.º
 *   24.23: Tasa por prestación de servicios de instalación de
 *   escenarios. Escenarios portátiles, módulos, elementos de unión,
 *   fijación, acceso, protección, cálculos elementales necesarios."
 *
 * Fuentes primarias verificadas en este turno:
 * - Ordenanza de Movilidad Urbana de Zaragoza, aprobada por el Pleno en
 *   julio de 2024 y publicada en el BOPZ el 21 de agosto de 2024
 *   (https://www.zaragoza.es/sede/servicio/normativa/13296).
 * - Ordenanza Fiscal nº 24.23, Tasa por prestación de servicios de
 *   instalación de escenarios
 *   (https://www.zaragoza.es/sede/servicio/normativa/3563): el hecho
 *   imponible es la instalación y desmontaje de escenarios; los
 *   escenarios los montan y transportan siempre las Brigadas de
 *   Arquitectura municipales, sujeto a autorización de ocupación del
 *   dominio público y disponibilidad de material.
 * No se dispone de la tarifa vigente exacta ni de artículos concretos de
 * la Ordenanza de Movilidad Urbana más allá de su existencia y objeto
 * general; el contenido técnico de montaje de escenarios (módulos,
 * uniones, cálculos elementales) se trata como conocimiento técnico
 * consolidado de seguridad en estructuras temporales, sin forzar cita
 * legal artículo a artículo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-73-movilidad-urbana-escenarios-portatiles.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-73";
const OPOSICION = "oficial-mantenimiento-ayto-zaragoza";
const BLOQUE_2_ID = "336de420-fb74-4814-9d50-6e2981ed064f";
const ORD_MOVILIDAD = "https://www.zaragoza.es/sede/servicio/normativa/13296";
const OF_24_23 = "https://www.zaragoza.es/sede/servicio/normativa/3563";

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
  titulo: "Movilidad urbana y escenarios portátiles",
  descripcion: "Ordenanza de Movilidad Urbana de Zaragoza. Ordenanza Fiscal 24.23: tasa por instalación de escenarios. Escenarios portátiles: módulos, elementos de unión, fijación, acceso, protección y cálculos elementales.",
  contenido: "Desarrolla los conceptos generales de la Ordenanza de Movilidad Urbana de Zaragoza (2024), la Ordenanza Fiscal nº 24.23 sobre la tasa por instalación de escenarios (competencia exclusiva de las Brigadas de Arquitectura municipales), y los conceptos técnicos básicos de montaje seguro de escenarios portátiles: módulos, elementos de unión y fijación, accesos y protecciones perimetrales.",
  enlaces_boe: [
    { url: ORD_MOVILIDAD, titulo: "Ordenanza de Movilidad Urbana de Zaragoza (2024)" },
    { url: OF_24_23, titulo: "Ordenanza Fiscal nº 24.23 — Tasa por instalación de escenarios" },
  ],
  indice_estudio: [
    { url: ORD_MOVILIDAD, titulo: "Ordenanza de Movilidad Urbana de Zaragoza", seccion: "ordenanza-movilidad-urbana-zaragoza", articulos: "Aprobada julio 2024, BOPZ 21/08/2024" },
    { url: OF_24_23, titulo: "Ordenanza Fiscal 24.23: tasa por instalación de escenarios", seccion: "ordenanza-fiscal-24-23-tasa-escenarios", articulos: "Hecho imponible, sujeto pasivo, Brigadas de Arquitectura" },
    { url: "", titulo: "Montaje de escenarios portátiles: módulos, uniones y protecciones", seccion: "escenarios-portatiles-montaje-seguridad", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "ordenanza-movilidad-urbana-zaragoza";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la Ordenanza de Movilidad Urbana de Zaragoza?", reverso: "La norma municipal que regula la circulación, el estacionamiento y el uso de la vía pública por los distintos modos de movilidad (peatonal, ciclista, vehículos, transporte público) en el término municipal de Zaragoza" },
  { anverso: "¿Cuándo fue aprobada la vigente Ordenanza de Movilidad Urbana de Zaragoza y cuándo se publicó?", reverso: "Fue aprobada en sesión plenaria en julio de 2024 y publicada en el Boletín Oficial de la Provincia de Zaragoza (BOPZ) el 21 de agosto de 2024" },
  { anverso: "¿Qué objetivos generales persigue la Ordenanza de Movilidad Urbana de Zaragoza?", reverso: "Priorizar la seguridad vial y la protección de las personas usuarias más vulnerables (peatones, ciclistas), y adaptar la regulación de la movilidad a los retos actuales de la ciudad" },
  { anverso: "¿Qué relación tiene la ocupación de la vía pública para instalar un escenario con la Ordenanza de Movilidad Urbana?", reverso: "La instalación de elementos como un escenario en la vía pública afecta a la circulación y al uso del espacio público, por lo que debe coordinarse con las condiciones de movilidad y contar con la autorización municipal correspondiente" },
  { anverso: "¿Por qué es relevante para un oficial de mantenimiento general conocer la existencia de la Ordenanza de Movilidad Urbana, aunque no sea su norma de referencia principal?", reverso: "Porque su actividad (desplazamientos por la ciudad, ocupación puntual de vía pública para trabajos o montajes) debe respetar las condiciones generales de circulación y uso del espacio público que regula la ordenanza" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué regula la Ordenanza de Movilidad Urbana de Zaragoza?", explicacion: "La circulación, estacionamiento y uso de la vía pública por los distintos modos de movilidad.", dificultad: "facil", opciones: ["Circulación, estacionamiento y uso de la vía pública", "Exclusivamente el transporte de mercancías", "Exclusivamente las tasas municipales", "El régimen interno de los Centros Cívicos"], correcta: 0 },
  { enunciado: "¿Cuándo se publicó la vigente Ordenanza de Movilidad Urbana de Zaragoza en el BOPZ?", explicacion: "El 21 de agosto de 2024.", dificultad: "dificil", opciones: ["El 21 de agosto de 2024", "El 27 de julio de 2026", "El 1 de enero de 2020", "El 19 de septiembre de 2002"], correcta: 0 },
  { enunciado: "¿Qué objetivo general persigue la Ordenanza de Movilidad Urbana de Zaragoza?", explicacion: "Priorizar la seguridad vial y proteger a las personas usuarias vulnerables.", dificultad: "media", opciones: ["Priorizar la seguridad vial y a usuarios vulnerables", "Regular exclusivamente el transporte ferroviario", "Fijar exclusivamente las tasas de instalación de escenarios", "Sustituir a la Ordenanza Fiscal 24.23"], correcta: 0 },
  { enunciado: "¿Por qué la instalación de un escenario en vía pública se relaciona con la Ordenanza de Movilidad Urbana?", explicacion: "Porque afecta a la circulación y al uso del espacio público, requiriendo autorización.", dificultad: "media", opciones: ["Porque afecta a la circulación y uso del espacio público", "Porque la ordenanza regula exclusivamente escenarios", "Porque no tiene ninguna relación entre ambas normas", "Porque sustituye a la autorización municipal"], correcta: 0 },
  { enunciado: "¿Por qué es relevante para un oficial de mantenimiento conocer la Ordenanza de Movilidad Urbana?", explicacion: "Porque su actividad puede implicar ocupación puntual de vía pública para trabajos o montajes.", dificultad: "media", opciones: ["Porque puede implicar ocupación puntual de vía pública", "Porque es la norma que regula su contrato laboral", "Porque sustituye al Reglamento de PRL", "Porque no tiene relación con su trabajo diario"], correcta: 0 },
]);

const S2 = "ordenanza-fiscal-24-23-tasa-escenarios";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué regula la Ordenanza Fiscal nº 24.23 del Ayuntamiento de Zaragoza?", reverso: "La tasa por prestación de servicios de instalación de escenarios en la vía pública o en instalaciones municipales" },
  { anverso: "¿Cuál es el hecho imponible de la tasa regulada en la Ordenanza Fiscal 24.23?", reverso: "La actividad municipal de instalación y desmontaje de escenarios" },
  { anverso: "¿Quiénes son los sujetos pasivos de la tasa de la Ordenanza Fiscal 24.23?", reverso: "Las personas físicas o jurídicas que solicitan la prestación del servicio de instalación de escenarios" },
  { anverso: "¿Qué unidad municipal se encarga siempre del transporte y montaje de los escenarios según la Ordenanza Fiscal 24.23?", reverso: "Las Brigadas de Arquitectura del Ayuntamiento de Zaragoza; los escenarios nunca se ceden para que terceros los monten por sí mismos" },
  { anverso: "¿De qué depende que se preste el servicio de instalación de un escenario, según la Ordenanza Fiscal 24.23?", reverso: "De la autorización de ocupación del dominio público local por el órgano municipal competente y de la disponibilidad de material" },
  { anverso: "¿Cuándo se devenga (se genera la obligación de pago de) la tasa de instalación de escenarios?", reverso: "Cuando se concede la solicitud de instalación de los escenarios" },
  { anverso: "¿Existen supuestos exentos de la tasa de instalación de escenarios según la Ordenanza Fiscal 24.23?", reverso: "Sí: no están sujetos a la tasa los supuestos que, por razones objetivas o subjetivas, se consideren de interés público" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué regula la Ordenanza Fiscal nº 24.23 del Ayuntamiento de Zaragoza?", explicacion: "La tasa por instalación de escenarios.", dificultad: "facil", opciones: ["La tasa por instalación de escenarios", "El régimen de circulación de vehículos", "El reglamento de la Casa Amparo", "La tasa de instalaciones deportivas"], correcta: 0 },
  { enunciado: "¿Cuál es el hecho imponible de la tasa de la Ordenanza Fiscal 24.23?", explicacion: "La instalación y desmontaje de escenarios.", dificultad: "media", opciones: ["La instalación y desmontaje de escenarios", "El uso general de la vía pública", "La circulación de vehículos pesados", "El alquiler de material municipal en general"], correcta: 0 },
  { enunciado: "¿Quiénes son los sujetos pasivos de esta tasa?", explicacion: "Las personas que solicitan la prestación del servicio de instalación de escenarios.", dificultad: "media", opciones: ["Quienes solicitan el servicio de instalación", "Exclusivamente entidades públicas", "Exclusivamente el Ayuntamiento de Zaragoza", "Las Brigadas de Arquitectura municipales"], correcta: 0 },
  { enunciado: "¿Qué unidad municipal transporta y monta siempre los escenarios?", explicacion: "Las Brigadas de Arquitectura.", dificultad: "media", opciones: ["Las Brigadas de Arquitectura", "La empresa solicitante del servicio", "La Unidad de Colegios Públicos", "Cualquier oficial de mantenimiento general"], correcta: 0 },
  { enunciado: "¿De qué depende la prestación del servicio de instalación de un escenario?", explicacion: "De la autorización de ocupación del dominio público y la disponibilidad de material.", dificultad: "media", opciones: ["De la autorización de ocupación y disponibilidad de material", "Únicamente del pago anticipado de la tasa", "Únicamente de la fecha solicitada", "No depende de ninguna condición adicional"], correcta: 0 },
  { enunciado: "¿Cuándo se devenga la tasa de instalación de escenarios?", explicacion: "Cuando se concede la solicitud de instalación.", dificultad: "dificil", opciones: ["Cuando se concede la solicitud de instalación", "En el momento del desmontaje del escenario", "Al inicio del año fiscal", "Nunca se devenga, es un servicio gratuito"], correcta: 0 },
  { enunciado: "¿Existen supuestos exentos de esta tasa?", explicacion: "Sí, los que por razones objetivas o subjetivas se consideren de interés público.", dificultad: "dificil", opciones: ["Sí, los de interés público", "No, la tasa se aplica siempre sin excepción", "Solo están exentas las entidades religiosas", "Solo están exentos los actos deportivos"], correcta: 0 },
]);

const S3 = "escenarios-portatiles-montaje-seguridad";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un escenario portátil (o desmontable)?", reverso: "Una estructura temporal, formada por módulos prefabricados, que se monta y desmonta para eventos puntuales en vía pública o espacios municipales" },
  { anverso: "¿Qué es un módulo de escenario y cómo se combinan entre sí?", reverso: "Cada una de las piezas prefabricadas (habitualmente de estructura metálica con tablero superior) que, unidas entre sí mediante sus sistemas de anclaje, forman la superficie completa del escenario" },
  { anverso: "¿Qué elementos de unión son habituales entre módulos de un escenario portátil?", reverso: "Grapas, pasadores, tornillería o sistemas de clip específicos del fabricante, que fijan los módulos entre sí y a la estructura de las patas o soportes" },
  { anverso: "¿Qué función cumplen las patas regulables de un escenario modular?", reverso: "Permiten ajustar la altura y nivelar la superficie del escenario sobre un terreno irregular, garantizando una plataforma horizontal y estable" },
  { anverso: "¿Qué es la fijación o lastrado de un escenario portátil y por qué es necesaria?", reverso: "El anclaje o contrapeso que impide el desplazamiento o vuelco de la estructura, especialmente importante frente al viento cuando el escenario incorpora elementos verticales (torres de sonido, telones, cubiertas)" },
  { anverso: "¿Qué elementos de acceso deben preverse en un escenario elevado?", reverso: "Escaleras o rampas seguras, con pasamanos, que permitan subir y bajar del escenario sin riesgo de caída" },
  { anverso: "¿Qué es la protección perimetral de un escenario y para qué sirve?", reverso: "Barandillas o vallado en los bordes y zonas de desnivel del escenario, que evitan caídas accidentales de personas desde la plataforma elevada" },
  { anverso: "¿Qué cálculo elemental debe considerarse antes de montar un escenario respecto a su carga?", reverso: "La carga máxima admisible por metro cuadrado que soporta la estructura, en función del número de personas, equipos e instalaciones previstos sobre ella, sin superar la capacidad indicada por el fabricante" },
  { anverso: "¿Por qué debe revisarse la nivelación del terreno antes de montar un escenario portátil?", reverso: "Porque un terreno irregular puede generar inestabilidad en la estructura si no se compensa adecuadamente con las patas regulables, aumentando el riesgo de vuelco o desplazamiento" },
  { anverso: "¿Qué debe comprobarse tras el montaje completo de un escenario portátil, antes de su uso?", reverso: "La estabilidad general de la estructura, el correcto anclaje de todos los módulos, la firmeza de barandillas y accesos, y la ausencia de elementos sueltos o mal fijados" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un escenario portátil?", explicacion: "Una estructura temporal formada por módulos prefabricados.", dificultad: "facil", opciones: ["Una estructura temporal de módulos prefabricados", "Una construcción fija de hormigón armado", "Un tipo de mobiliario urbano permanente", "Un vehículo municipal de transporte"], correcta: 0 },
  { enunciado: "¿Qué elementos unen los módulos de un escenario portátil entre sí?", explicacion: "Grapas, pasadores, tornillería o sistemas de clip del fabricante.", dificultad: "media", opciones: ["Grapas, pasadores, tornillería o clips", "Solo cinta adhesiva reforzada", "Solo soldadura en obra", "No requieren ningún elemento de unión"], correcta: 0 },
  { enunciado: "¿Para qué sirven las patas regulables de un escenario modular?", explicacion: "Para ajustar la altura y nivelar la superficie sobre terreno irregular.", dificultad: "media", opciones: ["Para ajustar altura y nivelar sobre terreno irregular", "Para unir los módulos entre sí", "Para transportar el escenario", "Para proteger el perímetro de la plataforma"], correcta: 0 },
  { enunciado: "¿Por qué es necesaria la fijación o lastrado de un escenario portátil?", explicacion: "Para impedir el desplazamiento o vuelco, especialmente frente al viento.", dificultad: "media", opciones: ["Para impedir desplazamiento o vuelco por viento", "Para nivelar el terreno bajo la estructura", "Para facilitar el acceso al escenario", "Para calcular la carga máxima admisible"], correcta: 0 },
  { enunciado: "¿Qué función cumple la protección perimetral de un escenario elevado?", explicacion: "Evitar caídas accidentales desde la plataforma.", dificultad: "media", opciones: ["Evitar caídas accidentales desde la plataforma", "Unir los módulos entre sí", "Nivelar el terreno irregular", "Calcular la carga admisible"], correcta: 0 },
  { enunciado: "¿Qué cálculo elemental debe considerarse antes de montar un escenario?", explicacion: "La carga máxima admisible por metro cuadrado.", dificultad: "media", opciones: ["La carga máxima admisible por metro cuadrado", "Solo el número de accesos disponibles", "Solo el color de la tarima", "Solo la fecha del evento"], correcta: 0 },
  { enunciado: "¿Qué riesgo aumenta si no se compensa un terreno irregular con las patas regulables?", explicacion: "El riesgo de vuelco o desplazamiento de la estructura.", dificultad: "media", opciones: ["El riesgo de vuelco o desplazamiento", "El riesgo de sobrecoste de la tasa municipal", "El riesgo de incumplir la Ordenanza de Movilidad", "Ningún riesgo adicional relevante"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse tras completar el montaje de un escenario, antes de su uso?", explicacion: "Estabilidad, anclajes, firmeza de accesos y ausencia de elementos sueltos.", dificultad: "facil", opciones: ["Estabilidad general y ausencia de elementos sueltos", "Solo el color y el diseño estético", "Solo la fecha de fabricación de los módulos", "Solo la tasa municipal abonada"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 19 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 19, orden: 19, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-73 creado y vinculado como Tema 19 de Oficial Mantenimiento General.");

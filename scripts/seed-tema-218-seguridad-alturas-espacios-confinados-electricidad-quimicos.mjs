/**
 * Crea tema-218: "Seguridad laboral en trabajos en altura, espacios
 * confinados, trabajos eléctricos y con productos químicos" — Tema 22
 * (numero=22, bloque-2) de Oficial Planta Potabilizadora (Ayto.
 * Zaragoza). Último tema de la parte específica de esta oposición.
 *
 * Corresponde al TEMA 20 oficial del Anexo I (bases2110.pdf, línea
 * 1260): "Seguridad laboral en los trabajos en alturas. Seguridad
 * laboral en los trabajos en espacios confinados. La figura del recurso
 * preventivo. Seguridad laboral en los trabajos eléctricos. Seguridad
 * en el almacenamiento y transporte de productos químicos."
 *
 * Fuentes primarias verificadas y ya empleadas en el proyecto:
 * - RD 1215/1997 (equipos de trabajo), modificado por el RD 2177/2004
 *   específicamente en materia de trabajos temporales en altura.
 * - Ley 54/2003 (art. 32 bis introducido en la Ley 31/1995) y RD
 *   39/1997: la figura del recurso preventivo.
 * - Procedimiento de Prevención de Riesgos Laborales PPRL-1601 del
 *   Ayuntamiento de Zaragoza, "Procedimiento para la realización de
 *   Trabajos en Espacios Confinados" (mayo 2020), verificado y leído
 *   íntegro en esta sesión (Oficial Guardallaves, tema-202) —
 *   directamente aplicable a los decantadores, depósitos y arquetas de
 *   una planta potabilizadora, citados de forma genérica en su listado
 *   de espacios confinados del Ayuntamiento.
 * - RD 614/2001, sobre riesgos eléctricos, ya verificado en el proyecto
 *   (Oficial Electricista).
 * - RD 656/2017, Reglamento de Almacenamiento de Productos Químicos, y
 *   RD 97/2014, sobre transporte de mercancías peligrosas por
 *   carretera (desarrollo español del ADR), ambos verificados mediante
 *   búsqueda en esta sesión.
 *
 * Tres secciones:
 * 1. trabajos-altura-rd-2177-2004-recurso-preventivo
 * 2. espacios-confinados-pprl-1601
 * 3. trabajos-electricos-almacenamiento-transporte-quimicos
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-218-seguridad-alturas-espacios-confinados-electricidad-quimicos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-218";
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
  titulo: "Seguridad laboral en trabajos en altura, espacios confinados, trabajos eléctricos y con productos químicos",
  descripcion: "Trabajos temporales en altura y la figura del recurso preventivo. Espacios confinados en la planta (PPRL-1601). Trabajos eléctricos. Almacenamiento y transporte de productos químicos.",
  contenido: "Desarrolla cuatro riesgos de especial gravedad en el trabajo de Oficial de Planta Potabilizadora, cada uno con su propio marco normativo: los trabajos temporales en altura y la figura del recurso preventivo en actividades peligrosas; los trabajos en espacios confinados (decantadores, depósitos, arquetas) conforme al Procedimiento municipal PPRL-1601; los trabajos eléctricos sobre las instalaciones y cuadros de la planta; y la seguridad en el almacenamiento y el transporte de los productos químicos empleados en el tratamiento del agua (hipoclorito sódico, sulfato de alúmina, entre otros).",
  enlaces_boe: [
    "https://ayuntamiento.osta.es/wp-content/uploads/2021/02/PPRL1601.pdf",
    "https://www.boe.es/buscar/act.php?id=BOE-A-2017-8755",
  ],
  indice_estudio: [
    { url: "", titulo: "Trabajos temporales en altura y la figura del recurso preventivo", seccion: "trabajos-altura-rd-2177-2004-recurso-preventivo", articulos: "RD 1215/1997, modificado por RD 2177/2004; Ley 54/2003, art. 32 bis" },
    { url: "https://ayuntamiento.osta.es/wp-content/uploads/2021/02/PPRL1601.pdf", titulo: "Espacios confinados en la planta: el Procedimiento PPRL-1601", seccion: "espacios-confinados-pprl-1601", articulos: "Ayuntamiento de Zaragoza, PPRL-1601" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2017-8755", titulo: "Trabajos eléctricos y seguridad en el almacenamiento y transporte de productos químicos", seccion: "trabajos-electricos-almacenamiento-transporte-quimicos", articulos: "RD 614/2001; RD 656/2017; RD 97/2014" },
  ],
}]);

const S1 = "trabajos-altura-rd-2177-2004-recurso-preventivo";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué Real Decreto modificó el RD 1215/1997 específicamente en materia de trabajos temporales en altura?", reverso: "El Real Decreto 2177/2004, de 12 de noviembre" },
  { anverso: "¿Qué zonas de una planta potabilizadora son especialmente sensibles al riesgo de caída en altura, exigiendo las medidas de este marco normativo?", reverso: "Las plataformas y pasarelas sobre decantadores y filtros, las escaleras de acceso a depósitos elevados, y cualquier trabajo de mantenimiento sobre estructuras o equipos situados a una altura significativa respecto al nivel del suelo" },
  { anverso: "¿Qué jerarquía de medidas de protección establece con carácter general la normativa de trabajos en altura, de mayor a menor prioridad?", reverso: "En primer lugar, evitar el propio trabajo en altura si es posible; si no lo es, priorizar la protección colectiva (barandillas, plataformas seguras) sobre la individual; y solo en último término recurrir a equipos de protección individual anticaídas (arnés y línea de vida)" },
  { anverso: "¿Qué es el recurso preventivo, figura consolidada por la Ley 54/2003 en el art. 32 bis de la Ley 31/1995?", reverso: "Un trabajador designado que reúne los conocimientos, cualificación y experiencia necesarios en las actividades o procesos considerados peligrosos o con riesgos especiales, cuya presencia es obligatoria para vigilar el cumplimiento de las actividades preventivas" },
  { anverso: "¿En qué tipo de actividades de una planta potabilizadora sería exigible la presencia de un recurso preventivo, conforme al criterio general de la normativa?", reverso: "En actividades consideradas de riesgo especial, como los trabajos en espacios confinados, los trabajos en altura sin protección colectiva suficiente, o los trabajos que combinen varios riesgos graves simultáneos (por ejemplo, trabajo eléctrico en una zona de acceso restringido)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué Real Decreto modificó el RD 1215/1997 en materia de trabajos temporales en altura?", explicacion: "El RD 2177/2004.", dificultad: "media", opciones: ["El Real Decreto 2177/2004", "El Real Decreto 486/1997", "El Real Decreto 773/1997", "El Real Decreto 39/1997"], correcta: 0 },
  { enunciado: "¿Qué zonas de una planta potabilizadora son especialmente sensibles al riesgo de caída en altura?", explicacion: "Plataformas sobre decantadores y filtros, y escaleras de acceso a depósitos elevados, entre otras.", dificultad: "media", opciones: ["Plataformas sobre decantadores y filtros, y escaleras elevadas", "Exclusivamente la sala de control de la planta", "Exclusivamente el laboratorio de análisis de la planta", "Ninguna zona concreta, al no existir riesgo real de altura"], correcta: 0 },
  { enunciado: "¿Qué jerarquía de medidas establece con carácter general la normativa de trabajos en altura?", explicacion: "Evitar el trabajo en altura, priorizar la protección colectiva, y solo después la individual.", dificultad: "media", opciones: ["Evitar el trabajo, priorizar protección colectiva sobre individual", "Priorizar siempre la protección individual sobre la colectiva", "Ninguna jerarquía real entre los distintos tipos de protección", "Emplear siempre y exclusivamente equipos de protección individual"], correcta: 0 },
  { enunciado: "¿Qué es el recurso preventivo, figura del art. 32 bis de la Ley 31/1995?", explicacion: "Un trabajador designado que vigila el cumplimiento de las actividades preventivas en actividades de riesgo especial.", dificultad: "media", opciones: ["Un trabajador designado que vigila las actividades preventivas", "Un equipo de protección individual exclusivo para trabajos en altura", "Un documento exclusivo de autorización de trabajo en la planta", "Un instrumento exclusivo de medición de gases en un espacio"], correcta: 0 },
  { enunciado: "¿En qué tipo de actividad de la planta sería exigible la presencia de un recurso preventivo?", explicacion: "En actividades de riesgo especial, como los trabajos en espacios confinados.", dificultad: "dificil", opciones: ["En actividades de riesgo especial, como espacios confinados", "En cualquier tarea administrativa de la sala de control", "Únicamente en la etapa de desbaste del tratamiento del agua", "Únicamente en la etapa de filtración del tratamiento del agua"], correcta: 0 },
]);

const S2 = "espacios-confinados-pprl-1601";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué documento municipal regula los trabajos en espacios confinados, aplicable a los decantadores, depósitos y arquetas de una planta potabilizadora?", reverso: "El Procedimiento de Prevención de Riesgos Laborales PPRL-1601, \"Procedimiento para la realización de Trabajos en Espacios Confinados\" del Ayuntamiento de Zaragoza (mayo 2020)" },
  { anverso: "¿Cómo define el PPRL-1601 un espacio confinado?", reverso: "Un recinto con aberturas limitadas de entrada y salida, ventilación natural desfavorable y, en la mayoría de los casos, deficiencia de oxígeno o presencia de contaminantes tóxicos o inflamables, no concebido para la ocupación permanente de trabajadores" },
  { anverso: "¿Qué documento es obligatorio cumplimentar y firmar antes de que un trabajador acceda a un espacio confinado de la planta, según el PPRL-1601?", reverso: "La \"Autorización de trabajo en espacios confinados\", con validez para una única jornada de trabajo" },
  { anverso: "¿Qué gases debe medir siempre el equipo detector multigas antes del acceso a un espacio confinado, según el PPRL-1601?", reverso: "El nivel de oxígeno (O₂), el monóxido de carbono (CO), el ácido sulfhídrico (H₂S) y el resto de gases explosivos que puedan estar presentes, midiendo también el nivel de explosividad en % L.I.E." },
  { anverso: "¿Qué debe hacer el recurso preventivo, según el protocolo de emergencia del PPRL-1601, si un trabajador pierde el conocimiento dentro de un espacio confinado y la atmósfera es peligrosa sin disponer de equipo respiratorio autónomo?", reverso: "NO ENTRAR, comunicar de inmediato la situación al 080 o al 061 indicando la localización exacta, y esperar a que el personal de emergencia especializado realice el rescate en condiciones de seguridad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué documento municipal regula los trabajos en espacios confinados aplicable a la planta potabilizadora?", explicacion: "El PPRL-1601.", dificultad: "media", opciones: ["El Procedimiento PPRL-1601", "El Real Decreto 140/2003", "La norma UNE-EN 1074", "El Real Decreto 656/2017"], correcta: 0 },
  { enunciado: "¿Cómo define el PPRL-1601 un espacio confinado?", explicacion: "Un recinto con aberturas limitadas y ventilación desfavorable, con posible deficiencia de oxígeno.", dificultad: "facil", opciones: ["Un recinto con aberturas limitadas y ventilación desfavorable", "Cualquier local de trabajo con ventanas practicables", "Cualquier vehículo del parque móvil de la planta", "Un almacén de gran superficie bien ventilado"], correcta: 0 },
  { enunciado: "¿Qué documento es obligatorio antes de acceder a un espacio confinado de la planta?", explicacion: "La \"Autorización de trabajo en espacios confinados\".", dificultad: "media", opciones: ["La \"Autorización de trabajo en espacios confinados\"", "Únicamente el permiso verbal del encargado de turno", "Únicamente la orden de trabajo diaria de la planta", "Ningún documento adicional distinto de la ficha del trabajador"], correcta: 0 },
  { enunciado: "¿Qué gases debe medir siempre el detector multigas antes de acceder a un espacio confinado?", explicacion: "Oxígeno, monóxido de carbono, ácido sulfhídrico y el nivel de explosividad.", dificultad: "media", opciones: ["Oxígeno, monóxido de carbono, ácido sulfhídrico y explosividad", "Únicamente el nivel de cloro residual del agua tratada", "Únicamente la humedad relativa del ambiente del recinto", "Únicamente la temperatura ambiente del espacio confinado"], correcta: 0 },
  { enunciado: "¿Qué debe hacer el recurso preventivo si un trabajador pierde el conocimiento en atmósfera peligrosa sin equipo respiratorio autónomo disponible?", explicacion: "NO ENTRAR y comunicar la situación al 080 o al 061.", dificultad: "dificil", opciones: ["NO ENTRAR y comunicar la situación al 080 o al 061", "Entrar de inmediato sin ningún equipo de protección adicional", "Esperar sin comunicar la incidencia a ningún servicio de emergencia", "Entrar solo si dos compañeros más acceden al mismo tiempo"], correcta: 0 },
]);

const S3 = "trabajos-electricos-almacenamiento-transporte-quimicos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué Real Decreto regula los riesgos derivados del trabajo en instalaciones eléctricas?", reverso: "El Real Decreto 614/2001, de 8 de junio, sobre disposiciones mínimas para la protección de la salud y seguridad de los trabajadores frente al riesgo eléctrico" },
  { anverso: "¿Qué distinción básica establece la normativa de riesgo eléctrico entre las condiciones en que puede trabajarse en o cerca de una instalación eléctrica?", reverso: "Trabajos sin tensión (con la instalación desconectada y verificada la ausencia de tensión), trabajos en tensión (con la instalación conectada, exigiendo formación y medios específicos), y trabajos en proximidad de elementos en tensión, cada uno con sus propias medidas de seguridad" },
  { anverso: "¿Qué reglamento español regula las condiciones de seguridad del almacenamiento de productos químicos peligrosos, como el hipoclorito sódico o el sulfato de alúmina de una planta potabilizadora?", reverso: "El Real Decreto 656/2017, de 23 de junio, por el que se aprueba el Reglamento de Almacenamiento de Productos Químicos y sus Instrucciones Técnicas Complementarias MIE APQ 0 a 10" },
  { anverso: "¿A qué normativa está adaptado el RD 656/2017 en cuanto a la clasificación de las sustancias químicas peligrosas?", reverso: "Al Reglamento (CE) nº 1272/2008 (Reglamento CLP), sobre clasificación, etiquetado y envasado de sustancias y mezclas" },
  { anverso: "¿Qué normativa regula el transporte por carretera de productos químicos peligrosos, en caso de que la planta reciba suministros de reactivos por este medio?", reverso: "El Real Decreto 97/2014, de 14 de febrero, que regula las operaciones de transporte de mercancías peligrosas por carretera en territorio español, desarrollando en España el Acuerdo internacional ADR y transponiendo la Directiva 2008/68/CE" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué Real Decreto regula los riesgos derivados del trabajo en instalaciones eléctricas?", explicacion: "El RD 614/2001.", dificultad: "media", opciones: ["El Real Decreto 614/2001", "El Real Decreto 656/2017", "El Real Decreto 97/2014", "El Real Decreto 1215/1997"], correcta: 0 },
  { enunciado: "¿Qué distinción básica establece la normativa de riesgo eléctrico sobre el tipo de trabajo eléctrico?", explicacion: "Trabajos sin tensión, en tensión y en proximidad de elementos en tensión.", dificultad: "media", opciones: ["Trabajos sin tensión, en tensión y en proximidad", "Únicamente trabajos sin tensión, sin ninguna otra categoría", "Únicamente trabajos en tensión, sin ninguna otra categoría", "No existe ninguna distinción real entre tipos de trabajo eléctrico"], correcta: 0 },
  { enunciado: "¿Qué reglamento regula la seguridad del almacenamiento de productos químicos como el hipoclorito sódico?", explicacion: "El RD 656/2017.", dificultad: "media", opciones: ["El Real Decreto 656/2017", "El Real Decreto 140/2003", "El Real Decreto 244/2016", "El Real Decreto 902/2018"], correcta: 0 },
  { enunciado: "¿A qué reglamento europeo está adaptado el RD 656/2017 en cuanto a la clasificación de sustancias peligrosas?", explicacion: "Al Reglamento (CE) nº 1272/2008 (CLP).", dificultad: "dificil", opciones: ["Al Reglamento (CE) nº 1272/2008 (CLP)", "Al Reglamento (UE) nº 517/2014, sobre gases fluorados", "Al Reglamento (CE) nº 1907/2006 (REACH) exclusivamente", "A ningún reglamento europeo específico de clasificación"], correcta: 0 },
  { enunciado: "¿Qué normativa regula el transporte por carretera de productos químicos peligrosos que pueda recibir la planta?", explicacion: "El RD 97/2014, desarrollo español del ADR.", dificultad: "dificil", opciones: ["El Real Decreto 97/2014", "El Real Decreto 656/2017", "El Real Decreto 614/2001", "El Real Decreto 39/1997"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 22 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 22, orden: 22, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-218 creado y vinculado como Tema 22 de Oficial Planta Potabilizadora.");

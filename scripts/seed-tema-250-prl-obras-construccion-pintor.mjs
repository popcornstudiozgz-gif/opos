/**
 * Crea tema-250: "Prevención de Riesgos Laborales en las obras de
 * construcción" — Tema 22 (numero=22, bloque-2, último tema de la parte
 * específica) de Oficial Pintor, Especialidad General (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 20 oficial del Anexo I (bases2110.pdf, línea
 * 1486): "Prevención de Riesgos Laborales en las obras de construcción.
 * Legislación. Medios de protección Individual. Medios de Protección
 * colectiva. Líneas de Vida."
 *
 * Normativa ya citada y verificada en este bloque temático y en el
 * resto del proyecto:
 * - Ley 31/1995, de Prevención de Riesgos Laborales (BOE-A-1995-24292).
 * - RD 1627/1997, disposiciones mínimas de seguridad y salud en las
 *   obras de construcción (BOE-A-1997-22614).
 * - RD 773/1997, equipos de protección individual (BOE-A-1997-12735).
 * - RD 486/1997, condiciones de seguridad y salud en los lugares de
 *   trabajo (BOE-A-1997-8669) — protección colectiva.
 * - RD 2177/2004, trabajos temporales en altura (BOE-A-2004-19311), ya
 *   citado en tema-248 — líneas de vida y sistemas anticaídas.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-250-prl-obras-construccion-pintor.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-250";
const OPOSICION = "oficial-pintor-general-ayto-zaragoza";
const BLOQUE_2_ID = "77506e2f-f4c6-4512-8bf8-99d0b3bbbafd";

const LEY_31_1995 = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292";
const RD_1627_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-22614";
const RD_773_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-12735";
const RD_486_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-8669";
const RD_2177_2004 = "https://www.boe.es/buscar/doc.php?id=BOE-A-2004-19311";

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
  titulo: "Prevención de Riesgos Laborales en las obras de construcción",
  descripcion: "El marco legal de la Ley 31/1995 y el RD 1627/1997 en obras de construcción. Medios de protección individual y colectiva. Las líneas de vida en trabajos en altura.",
  contenido: "Desarrolla, como último tema de la parte específica de esta oposición, el marco legal de la prevención de riesgos laborales aplicable a las obras de construcción en las que participa el Oficial Pintor: la Ley 31/1995 como norma marco y el RD 1627/1997 como desarrollo específico para las obras de construcción, con sus figuras de coordinación de seguridad; los medios de protección individual (EPI) exigidos por el RD 773/1997; los medios de protección colectiva del RD 486/1997 y del propio RD 1627/1997; y las líneas de vida como sistema de protección colectiva o individual anticaídas en trabajos en altura, conforme al RD 2177/2004.",
  enlaces_boe: [
    { url: LEY_31_1995, titulo: "Ley 31/1995 — Prevención de Riesgos Laborales" },
    { url: RD_1627_1997, titulo: "RD 1627/1997 — seguridad y salud en obras de construcción" },
    { url: RD_773_1997, titulo: "RD 773/1997 — equipos de protección individual" },
    { url: RD_2177_2004, titulo: "RD 2177/2004 — trabajos temporales en altura (líneas de vida)" },
  ],
  indice_estudio: [
    { url: RD_1627_1997, titulo: "El marco legal: Ley 31/1995 y RD 1627/1997 en obras de construcción", seccion: "marco-legal-ley-31-1995-rd-1627-1997", articulos: "Ley 31/1995, RD 1627/1997" },
    { url: RD_773_1997, titulo: "Medios de protección individual y colectiva", seccion: "medios-proteccion-individual-colectiva", articulos: "RD 773/1997, RD 486/1997" },
    { url: RD_2177_2004, titulo: "Las líneas de vida en trabajos en altura", seccion: "lineas-vida-trabajos-altura", articulos: "RD 2177/2004" },
  ],
}]);

const S1 = "marco-legal-ley-31-1995-rd-1627-1997";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma establece el marco general de la prevención de riesgos laborales, de aplicación también a las obras de construcción?", reverso: "La Ley 31/1995, de 8 de noviembre, de Prevención de Riesgos Laborales, que impone al empresario el deber de garantizar la seguridad y la salud de los trabajadores en todos los aspectos relacionados con el trabajo" },
  { anverso: "¿Qué regula específicamente el RD 1627/1997 en relación con las obras de construcción?", reverso: "Las disposiciones mínimas de seguridad y de salud aplicables específicamente a las obras de construcción, temporales o móviles, transponiendo la Directiva 92/57/CEE, con exigencias sobre el estudio o estudio básico de seguridad y salud, el plan de seguridad y salud, y la coordinación entre distintas empresas que intervienen en la obra" },
  { anverso: "¿Qué es el coordinador de seguridad y salud en obras de construcción, figura introducida por el RD 1627/1997?", reverso: "La persona técnica designada por el promotor para coordinar la aplicación de los principios de la acción preventiva durante la fase de proyecto o de ejecución de la obra, cuando intervienen varias empresas o trabajadores autónomos, velando por el cumplimiento del plan de seguridad y salud" },
  { anverso: "¿Qué es el libro de incidencias, exigido por el RD 1627/1997 en las obras de construcción?", reverso: "Un documento habilitado en cada centro de trabajo de la obra, a disposición de la dirección facultativa, del coordinador de seguridad, de las empresas y de los trabajadores, en el que se anotan las incidencias relativas al cumplimiento del plan de seguridad y salud, sirviendo de instrumento de control y seguimiento preventivo" },
  { anverso: "¿Qué obligación tiene el Oficial Pintor, como trabajador, en relación con el plan de seguridad y salud de una obra en la que participa?", reverso: "Conocer y cumplir las medidas de prevención establecidas en el plan de seguridad y salud de esa obra concreta, utilizando adecuadamente los equipos de trabajo y de protección puestos a su disposición, y comunicando cualquier situación que, a su juicio, entrañe un riesgo para la seguridad y la salud" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué norma establece el marco general de la prevención de riesgos laborales?", explicacion: "La Ley 31/1995, de Prevención de Riesgos Laborales.", dificultad: "facil", opciones: ["La Ley 31/1995, de Prevención de Riesgos Laborales", "El Reglamento General de Circulación", "El Reglamento General de Vehículos", "El Reglamento CLP de sustancias peligrosas"], correcta: 0 },
  { enunciado: "¿Qué regula específicamente el RD 1627/1997?", explicacion: "Las disposiciones mínimas de seguridad y salud en las obras de construcción.", dificultad: "media", opciones: ["Las disposiciones mínimas de seguridad en obras de construcción", "Los equipos de protección individual con carácter general", "Las condiciones generales de cualquier lugar de trabajo", "El etiquetado de sustancias y mezclas peligrosas"], correcta: 0 },
  { enunciado: "¿Qué es el coordinador de seguridad y salud en obras de construcción?", explicacion: "La persona técnica que coordina la aplicación de los principios de la acción preventiva en la obra.", dificultad: "media", opciones: ["La persona que coordina la aplicación de la acción preventiva", "El propio Oficial Pintor que ejecuta el trabajo de pintura", "Un cargo exclusivo de obras de más de un año de duración", "Una figura que solo existe en obras de titularidad pública"], correcta: 0 },
  { enunciado: "¿Qué es el libro de incidencias exigido por el RD 1627/1997?", explicacion: "Un documento en el que se anotan las incidencias relativas al plan de seguridad y salud.", dificultad: "dificil", opciones: ["Un documento donde se anotan incidencias del plan de seguridad", "Un documento exclusivamente contable de la obra", "Un documento exclusivamente fotográfico de la obra", "Un registro exclusivo de las horas trabajadas por el personal"], correcta: 0 },
  { enunciado: "¿Qué obligación tiene el Oficial Pintor respecto al plan de seguridad y salud de una obra?", explicacion: "Conocerlo y cumplirlo, utilizando adecuadamente los equipos de trabajo y protección puestos a su disposición.", dificultad: "media", opciones: ["Conocerlo y cumplirlo, usando adecuadamente sus equipos", "Ninguna obligación específica distinta de ejecutar su trabajo", "Elaborar personalmente el plan de seguridad de la obra", "Sustituir al coordinador de seguridad si este está ausente"], correcta: 0 },
]);

const S2 = "medios-proteccion-individual-colectiva";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué son los equipos de protección individual (EPI), conforme al RD 773/1997?", reverso: "Cualquier equipo destinado a ser llevado o sujetado por el trabajador para que le proteja de uno o varios riesgos que puedan amenazar su seguridad o su salud, así como cualquier complemento o accesorio destinado a tal fin" },
  { anverso: "¿Cuándo deben emplearse los equipos de protección individual, según el RD 773/1997?", reverso: "Cuando los riesgos no puedan evitarse o limitarse suficientemente por medios de protección colectiva o mediante medidas, métodos o procedimientos de organización del trabajo, siendo la protección colectiva siempre prioritaria sobre la individual" },
  { anverso: "¿Cuáles son los EPI más habituales del Oficial Pintor en las tareas propias de su oficio?", reverso: "Casco de protección (especialmente en obras con riesgo de caída de objetos), calzado de seguridad, guantes adecuados al producto manipulado, protección respiratoria en trabajos con disolventes o decapado en espacios poco ventilados, protección ocular ante proyecciones, y arnés anticaídas en trabajos en altura" },
  { anverso: "¿Qué es un medio de protección colectiva, a diferencia de un EPI?", reverso: "Una medida o dispositivo que protege simultáneamente a varias personas trabajadoras frente a un riesgo determinado, sin necesidad de que cada una porte un equipo individual: por ejemplo, una barandilla perimetral de un andamio, una red de seguridad, o una señalización que delimita una zona de riesgo" },
  { anverso: "¿Por qué la normativa de prevención establece una jerarquía que antepone la protección colectiva a la individual?", reverso: "Porque la protección colectiva actúa sobre el origen o el entorno del riesgo, protegiendo a todas las personas presentes con independencia de su comportamiento individual, mientras que el EPI depende de su correcto uso por cada persona y solo protege a quien lo lleva puesto correctamente" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué son los equipos de protección individual (EPI)?", explicacion: "Equipos llevados por el trabajador para protegerle de uno o varios riesgos.", dificultad: "facil", opciones: ["Equipos llevados por el trabajador para protegerle de riesgos", "Dispositivos que protegen simultáneamente a varias personas", "Documentos que registran incidencias de la obra", "Estudios técnicos previos a la ejecución de la obra"], correcta: 0 },
  { enunciado: "¿Cuándo deben emplearse los EPI, según el RD 773/1997?", explicacion: "Cuando el riesgo no pueda evitarse suficientemente por protección colectiva u organización del trabajo.", dificultad: "media", opciones: ["Cuando no puedan evitarse por protección colectiva u organización", "Siempre, con independencia de cualquier otra medida", "Nunca, al ser siempre preferible exclusivamente la colectiva", "Solo cuando lo solicite expresamente el propio trabajador"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es un EPI habitual del Oficial Pintor?", explicacion: "Protección respiratoria en trabajos con disolventes o decapado en espacios poco ventilados.", dificultad: "media", opciones: ["Protección respiratoria en trabajos con disolventes", "Un extintor portátil de la propia obra", "Una barandilla perimetral de un andamio", "Una señalización que delimita una zona de riesgo"], correcta: 0 },
  { enunciado: "¿Qué es un medio de protección colectiva?", explicacion: "Una medida que protege simultáneamente a varias personas, como una barandilla o una red de seguridad.", dificultad: "media", opciones: ["Una medida que protege simultáneamente a varias personas", "Un equipo llevado individualmente por cada trabajador", "Un documento que registra el plan de seguridad de la obra", "Un estudio técnico previo a la ejecución de la obra"], correcta: 0 },
  { enunciado: "¿Por qué se antepone la protección colectiva a la individual en la normativa de prevención?", explicacion: "Actúa sobre el origen o entorno del riesgo, protegiendo a todos con independencia del comportamiento individual.", dificultad: "dificil", opciones: ["Protege a todas las personas con independencia de su comportamiento", "El EPI siempre resulta más eficaz que la protección colectiva", "No existe ninguna jerarquía real entre ambos tipos de protección", "La protección colectiva nunca resulta aplicable en obras de pintura"], correcta: 0 },
]);

const S3 = "lineas-vida-trabajos-altura";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una línea de vida, como sistema de protección en trabajos en altura?", reverso: "Un dispositivo de anclaje, formado habitualmente por un cable o una cuerda tensada entre dos o más puntos fijos, al que se conecta el arnés anticaídas de la persona trabajadora mediante un elemento de amarre deslizante, permitiendo el desplazamiento a lo largo del recorrido protegido frente a una posible caída" },
  { anverso: "¿Qué diferencia existe entre una línea de vida horizontal y una vertical?", reverso: "La línea de vida horizontal permite el desplazamiento lateral de la persona trabajadora a lo largo de una cubierta o fachada, mientras que la línea de vida vertical se emplea para el ascenso o descenso seguro por un elemento vertical (una escalera fija, por ejemplo), acompañando ese movimiento" },
  { anverso: "¿Qué es una línea de vida provisional o temporal, frecuente en trabajos de pintura de fachadas de corta duración?", reverso: "Un sistema instalado específicamente para la duración de un trabajo concreto, mediante puntos de anclaje temporales homologados, a diferencia de una línea de vida permanente, instalada de forma fija en el edificio para su uso en futuros trabajos de mantenimiento" },
  { anverso: "¿Qué debe comprobar el Oficial Pintor antes de conectar su arnés a una línea de vida ya instalada por otra empresa o en una obra anterior?", reverso: "Que la línea de vida dispone de la certificación o documentación que acredite su correcta instalación y su capacidad de carga conforme a la norma técnica aplicable, sin confiar únicamente en su apariencia visual, dado que una instalación defectuosa no siempre resulta evidente a simple vista" },
  { anverso: "¿Qué relación existe entre las líneas de vida y el resto de medios auxiliares para trabajos en altura ya estudiados en el tema anterior (andamios, PEMP)?", reverso: "Las líneas de vida constituyen un sistema de protección individual anticaídas complementario, que puede emplearse junto con otros medios auxiliares (por ejemplo, en el borde de una cubierta a la que se accede desde un andamio) o como sistema principal en trabajos verticales donde no resulta viable montar un andamio o emplear una PEMP" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es una línea de vida, como sistema de protección en trabajos en altura?", explicacion: "Un dispositivo de anclaje al que se conecta el arnés anticaídas, permitiendo el desplazamiento protegido.", dificultad: "facil", opciones: ["Un dispositivo de anclaje al que se conecta el arnés anticaídas", "Un andamio tubular de gran altura montado en fachada", "Una plataforma elevadora móvil de personal", "Un equipo de protección respiratoria frente a disolventes"], correcta: 0 },
  { enunciado: "¿Qué diferencia una línea de vida horizontal de una vertical?", explicacion: "La horizontal permite desplazamiento lateral; la vertical acompaña el ascenso o descenso por un elemento vertical.", dificultad: "media", opciones: ["La horizontal permite desplazamiento lateral; la vertical, ascenso o descenso", "Ambos tipos cumplen exactamente la misma función", "La línea vertical nunca resulta aplicable en obras de pintura", "La línea horizontal solo se emplea en escaleras fijas"], correcta: 0 },
  { enunciado: "¿Qué es una línea de vida provisional o temporal?", explicacion: "Un sistema instalado para la duración de un trabajo concreto, mediante anclajes temporales homologados.", dificultad: "media", opciones: ["Un sistema instalado para la duración de un trabajo concreto", "Un sistema instalado de forma fija y permanente en el edificio", "Un equipo de protección respiratoria de uso temporal", "Un andamio de borriquetas de baja altura"], correcta: 0 },
  { enunciado: "¿Qué debe comprobar el Oficial Pintor antes de conectar su arnés a una línea de vida ya instalada?", explicacion: "Que dispone de certificación de correcta instalación y capacidad de carga conforme a la norma técnica.", dificultad: "dificil", opciones: ["Que dispone de certificación de instalación y capacidad de carga", "Basta con una comprobación visual superficial del cable", "Ninguna comprobación adicional resulta necesaria en la práctica", "Solo resulta relevante si la línea de vida es de tipo vertical"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre las líneas de vida y otros medios auxiliares como andamios o PEMP?", explicacion: "Pueden emplearse de forma complementaria o como sistema principal en trabajos verticales donde no son viables.", dificultad: "media", opciones: ["Pueden ser complementarias o el sistema principal según el caso", "Las líneas de vida sustituyen siempre a cualquier otro medio", "No existe ninguna relación real entre estos medios auxiliares", "Los andamios y las PEMP nunca requieren líneas de vida adicionales"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 22 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 22, orden: 22, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-250 creado y vinculado como Tema 22 de Oficial Pintor General (último tema de la parte específica).");

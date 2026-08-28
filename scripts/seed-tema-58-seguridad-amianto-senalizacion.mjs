/**
 * Crea el tema canónico tema-58: "Seguridad en lugares de trabajo.
 * Condiciones generales en el trabajo. Trabajos en presencia de amianto;
 * procedimiento PPRL 1602 del Ayuntamiento de Zaragoza para realización
 * de trabajos con amianto. Condiciones ambientales, iluminación.
 * Señalización de obras en viales y edificios públicos" y lo asigna como
 * Tema 20 (bloque-2) de la oposición Oficial Albañil (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 18 oficial del Anexo I (bases2110.pdf).
 *
 * Fuentes primarias:
 * - RD 1627/1997 (BOE-A-1997-22614), Anexo IV, Parte A (condiciones
 *   generales de los lugares de trabajo en obras) y Parte C, apdos. 2
 *   (caídas de objetos) y 4 (factores atmosféricos) — texto leído
 *   íntegro en sesión previa.
 * - RD 396/2006, de 31 de marzo (BOE-A-2006-6474), disposiciones mínimas
 *   de seguridad y salud en trabajos con riesgo de exposición al amianto
 *   (texto descargado y leído en este turno): valor límite ambiental de
 *   exposición (VLA-ED, art. 4), plan de trabajo previo obligatorio (art.
 *   11-12), formación específica (art. 13) y vigilancia de la salud
 *   (art. 16).
 * - RD 485/1997, de 14 de abril (BOE-A-1997-8668, verificado en este
 *   turno), señalización de seguridad y salud en el trabajo.
 *
 * AVISO IMPORTANTE (sección 2) — el "Procedimiento PPRL-1602 del
 * Ayuntamiento de Zaragoza para realización de trabajos con amianto"
 * citado en el enunciado oficial es, como el PPRL-1606 del tema 10, un
 * documento interno no publicado que no se ha podido localizar ni
 * reproducir; se señala expresamente esta laguna.
 *
 * Tres secciones:
 * 1. condiciones-generales-trabajo — condiciones generales de los
 *    lugares de trabajo en obra: caídas de objetos, factores
 *    atmosféricos, condiciones ambientales e iluminación.
 * 2. trabajos-amianto-pprl1602 — trabajos con riesgo de exposición al
 *    amianto y aviso sobre el PPRL-1602.
 * 3. senalizacion-seguridad-obras — señalización de seguridad y salud en
 *    obras y viales.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-58-seguridad-amianto-senalizacion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-58";
const OPOSICION = "oficial-albanil-ayto-zaragoza";
const BLOQUE_2_ID = "11fb28dc-2b37-42bb-ae51-aeb7421e298c";
const RD_1627_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-22614";
const RD_396_2006 = "https://www.boe.es/buscar/act.php?id=BOE-A-2006-6474";
const RD_485_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-8668";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) =>
    preguntas[i].opciones.map((texto, orden) => ({
      pregunta_id: pregunta.id,
      texto,
      es_correcta: orden === preguntas[i].correcta,
      orden,
    })),
  );
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "Seguridad en lugares de trabajo, amianto y señalización de obras",
    descripcion:
      "Seguridad en lugares de trabajo. Condiciones generales en el trabajo. Trabajos en presencia de amianto; procedimiento PPRL 1602 del Ayuntamiento de Zaragoza para realización de trabajos con amianto. Condiciones ambientales, iluminación. Señalización de obras en viales y edificios públicos.",
    contenido:
      "Desarrolla las condiciones generales de seguridad en los lugares de trabajo de una obra (caídas de objetos, factores atmosféricos, condiciones ambientales e iluminación), los trabajos con riesgo de exposición al amianto conforme al RD 396/2006, y la señalización de seguridad y salud en obras y viales conforme al RD 485/1997. El procedimiento interno PPRL-1602 del Ayuntamiento de Zaragoza para trabajos con amianto, citado en el temario oficial, es un documento no publicado cuyo contenido concreto no puede verificarse ni reproducirse aquí: se señala esta laguna de forma expresa en la sección 2.",
    enlaces_boe: [
      { url: RD_1627_1997, titulo: "RD 1627/1997 — Seguridad y salud en obras de construcción" },
      { url: RD_396_2006, titulo: "RD 396/2006 — Seguridad y salud en trabajos con riesgo de exposición al amianto" },
      { url: RD_485_1997, titulo: "RD 485/1997 — Señalización de seguridad y salud en el trabajo" },
    ],
    indice_estudio: [
      { url: RD_1627_1997, titulo: "Condiciones generales del lugar de trabajo en obra", seccion: "condiciones-generales-trabajo", articulos: "Anexo IV, Parte A y Parte C, apdos. 2 y 4" },
      { url: RD_396_2006, titulo: "Trabajos con amianto; aviso sobre el PPRL-1602", seccion: "trabajos-amianto-pprl1602", articulos: "arts. 4, 11-13 y 16" },
      { url: RD_485_1997, titulo: "Señalización de seguridad y salud en obras", seccion: "senalizacion-seguridad-obras", articulos: "RD 485/1997" },
    ],
  },
]);

const S1 = "condiciones-generales-trabajo";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿A qué ámbito se aplica la Parte A del Anexo IV del RD 1627/1997?", reverso: "A la totalidad de la obra, incluidos los puestos de trabajo en el interior y en el exterior de los locales" },
    { anverso: "¿Qué exige el RD 1627/1997 sobre la temperatura en los puestos de trabajo de una obra?", reverso: "Que sea la adecuada para el organismo humano durante el tiempo de trabajo, cuando las circunstancias lo permitan, teniendo en cuenta los métodos de trabajo aplicados y las cargas físicas de los trabajadores" },
    { anverso: "¿Qué protección exige el RD 1627/1997 frente a la caída de objetos o materiales?", reverso: "Que los trabajadores estén protegidos mediante medidas de protección colectiva siempre que sea técnicamente posible, estableciendo pasos cubiertos o impidiendo el acceso a zonas peligrosas cuando sea necesario" },
    { anverso: "¿Qué exige el RD 1627/1997 respecto a los materiales de acopio, equipos y herramientas en el tajo?", reverso: "Que se coloquen o almacenen de forma que se evite su desplome, caída o vuelco" },
    { anverso: "¿Qué obligación general establece el RD 1627/1997 frente a los factores atmosféricos?", reverso: "Proteger a los trabajadores contra las inclemencias atmosféricas que puedan comprometer su seguridad y su salud" },
    { anverso: "¿Qué se entiende por 'condiciones ambientales' de un puesto de trabajo, en sentido amplio?", reverso: "El conjunto de factores físicos del entorno de trabajo (temperatura, humedad, ventilación, ruido, iluminación) que pueden afectar al confort, la salud y el rendimiento de los trabajadores" },
    { anverso: "¿Por qué es importante una iluminación adecuada en los tajos de una obra?", reverso: "Porque una iluminación insuficiente incrementa el riesgo de accidentes (tropiezos, golpes, caídas) y dificulta la ejecución correcta y segura de los trabajos, especialmente en interiores, sótanos o durante jornadas con poca luz natural" },
    { anverso: "¿Qué tipo de iluminación debe priorizarse en un puesto de trabajo, según el criterio general de seguridad y salud laboral?", reverso: "La iluminación natural, complementada con iluminación artificial adecuada cuando aquella sea insuficiente, evitando deslumbramientos y sombras que dificulten la percepción de riesgos" },
    { anverso: "¿Qué documento debe reflejar las medidas relativas a condiciones ambientales, temperatura e iluminación previstas para una obra concreta?", reverso: "El estudio o estudio básico de seguridad y salud, y su desarrollo en el plan de seguridad y salud del contratista" },
    { anverso: "¿Qué relación existe entre unas buenas condiciones ambientales de un tajo y la prevención de accidentes?", reverso: "Unas condiciones ambientales adecuadas (temperatura, iluminación, ausencia de acumulación de objetos) reducen la fatiga y los despistes de los trabajadores, disminuyendo la probabilidad de golpes, caídas o errores de ejecución" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿A qué ámbito se aplica la Parte A del Anexo IV del RD 1627/1997?", explicacion: "A la totalidad de la obra, en interior y exterior de los locales.", dificultad: "media", opciones: ["A la totalidad de la obra, interior y exterior", "Únicamente a los trabajos en cubierta", "Solo a los trabajos con amianto", "Exclusivamente a las oficinas de obra"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 1627/1997 sobre la temperatura de los puestos de trabajo?", explicacion: "Que sea adecuada para el organismo humano, considerando métodos de trabajo y cargas físicas.", dificultad: "media", opciones: ["Que sea adecuada al organismo, según métodos y cargas físicas", "Que se mantenga siempre a 20ºC exactos", "No se regula la temperatura en obras", "Solo se exige en trabajos con amianto"], correcta: 0 },
  { enunciado: "¿Qué medida exige el RD 1627/1997 frente a la caída de objetos o materiales?", explicacion: "Protección colectiva siempre que sea técnicamente posible.", dificultad: "media", opciones: ["Protección colectiva cuando sea técnicamente posible", "Únicamente el uso de casco individual", "Solo señalización sin medidas físicas", "Ninguna medida específica exigida"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 1627/1997 sobre el almacenamiento de materiales y herramientas en el tajo?", explicacion: "Colocarlos de forma que se evite su desplome, caída o vuelco.", dificultad: "media", opciones: ["Evitar su desplome, caída o vuelco", "Almacenarlos siempre en altura máxima", "No existe regulación sobre acopios", "Solo se regula para maquinaria pesada"], correcta: 0 },
  { enunciado: "¿Qué obligación general establece el RD 1627/1997 frente a los factores atmosféricos?", explicacion: "Proteger a los trabajadores contra las inclemencias que comprometan su seguridad y salud.", dificultad: "media", opciones: ["Proteger frente a inclemencias que comprometan seguridad y salud", "Suspender la obra ante cualquier lluvia", "No existe obligación específica al respecto", "Solo aplica a trabajos en cubierta"], correcta: 0 },
  { enunciado: "¿Qué tipo de iluminación debe priorizarse en un puesto de trabajo?", explicacion: "La natural, complementada con artificial adecuada cuando sea insuficiente.", dificultad: "media", opciones: ["La natural, complementada con artificial si es insuficiente", "Únicamente la artificial en todo momento", "No es relevante el tipo de iluminación", "Solo se exige en trabajos nocturnos"], correcta: 0 },
  { enunciado: "¿Qué documento debe reflejar las condiciones ambientales previstas para una obra?", explicacion: "El estudio de seguridad y salud y su desarrollo en el plan de seguridad y salud del contratista.", dificultad: "media", opciones: ["El estudio y el plan de seguridad y salud", "El cuadro de precios del proyecto", "El libro de mantenimiento del edificio", "El certificado de profesionalidad del oficial"], correcta: 0 },
  { enunciado: "¿Qué efecto tienen unas buenas condiciones ambientales en un tajo sobre la prevención de accidentes?", explicacion: "Reducen la fatiga y los despistes, disminuyendo la probabilidad de golpes, caídas o errores.", dificultad: "media", opciones: ["Reducen fatiga y despistes, disminuyendo accidentes", "No tienen relación con la accidentabilidad", "Solo afectan al rendimiento económico", "Aumentan siempre el coste sin otro beneficio"], correcta: 0 },
]);

const S2 = "trabajos-amianto-pprl1602";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué norma establece las disposiciones mínimas de seguridad y salud en trabajos con riesgo de exposición al amianto?", reverso: "El Real Decreto 396/2006, de 31 de marzo" },
    { anverso: "¿Cuál es el valor límite ambiental de exposición diaria (VLA-ED) al amianto fijado por el RD 396/2006?", reverso: "0,1 fibras por centímetro cúbico, medidas como media ponderada en el tiempo para un período de ocho horas" },
    { anverso: "¿Qué debe elaborar el empresario antes del comienzo de cualquier trabajo con riesgo de exposición al amianto, según el RD 396/2006?", reverso: "Un plan de trabajo, que debe prever las medidas necesarias para garantizar la seguridad y salud de los trabajadores" },
    { anverso: "¿Ante quién debe presentarse para su aprobación el plan de trabajo con amianto?", reverso: "Ante la autoridad laboral correspondiente al lugar de trabajo en el que vayan a realizarse las actividades" },
    { anverso: "¿En qué plazo debe resolver la autoridad laboral sobre un plan de trabajo con amianto presentado, según el RD 396/2006?", reverso: "Cuarenta y cinco días, transcurridos los cuales sin notificación expresa, el plan se entiende aprobado" },
    { anverso: "¿Qué formación específica exige el RD 396/2006 a los trabajadores expuestos al amianto?", reverso: "Una formación que incluya, entre otros aspectos, las propiedades del amianto y sus efectos sobre la salud, los tipos de productos que pueden contenerlo, las operaciones que pueden implicar exposición y las exigencias en materia de vigilancia de la salud" },
    { anverso: "¿Qué obligación de vigilancia establece el RD 396/2006 respecto a los trabajadores expuestos al amianto?", reverso: "Someterlos a vigilancia de la salud, tanto durante la exposición como con posterioridad a su cese, dado el carácter diferido de las enfermedades asociadas al amianto" },
    { anverso: "¿Qué registro deben cumplir las empresas que realizan trabajos con riesgo por amianto, según el RD 396/2006?", reverso: "Deben inscribirse en el Registro de empresas con riesgo por amianto (RERA)" },
    { anverso: "¿Qué procedimiento interno del Ayuntamiento de Zaragoza cita expresamente el temario oficial de Oficial Albañil para la realización de trabajos con amianto?", reverso: "El procedimiento PPRL-1602" },
    { anverso: "¿Está publicado el contenido del procedimiento PPRL-1602 del Ayuntamiento de Zaragoza?", reverso: "No. Es un documento técnico interno de prevención de riesgos laborales no localizado en fuentes públicas; su contenido concreto no puede verificarse ni reproducirse aquí, pero debe respetar como mínimo el marco legal del RD 396/2006 (plan de trabajo, VLA-ED, formación y vigilancia de la salud)" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué norma regula los trabajos con riesgo de exposición al amianto?", explicacion: "El RD 396/2006, de 31 de marzo.", dificultad: "facil", opciones: ["El RD 396/2006", "El RD 1627/1997", "El RD 485/1997", "El RD 486/1997"], correcta: 0 },
  { enunciado: "¿Cuál es el valor límite ambiental de exposición diaria al amianto (VLA-ED)?", explicacion: "0,1 fibras por centímetro cúbico, media ponderada para 8 horas.", dificultad: "dificil", opciones: ["0,1 fibras/cm³", "1 fibra/cm³", "0,01 fibras/cm³", "10 fibras/cm³"], correcta: 0 },
  { enunciado: "¿Qué debe elaborar el empresario antes de iniciar un trabajo con riesgo de exposición al amianto?", explicacion: "Un plan de trabajo con las medidas necesarias de seguridad y salud.", dificultad: "media", opciones: ["Un plan de trabajo previo", "Solo una comunicación verbal a los operarios", "Un certificado de profesionalidad específico", "Un estudio geotécnico del terreno"], correcta: 0 },
  { enunciado: "¿Ante quién debe presentarse el plan de trabajo con amianto para su aprobación?", explicacion: "Ante la autoridad laboral del lugar donde se realizarán las actividades.", dificultad: "media", opciones: ["Ante la autoridad laboral correspondiente", "Ante el Colegio de Arquitectos", "Ante la Inspección de Hacienda", "Ante el Ayuntamiento exclusivamente"], correcta: 0 },
  { enunciado: "¿En qué plazo debe resolver la autoridad laboral sobre un plan de trabajo con amianto?", explicacion: "45 días; si no responde, el plan se entiende aprobado.", dificultad: "dificil", opciones: ["45 días", "15 días", "90 días", "6 meses"], correcta: 0 },
  { enunciado: "¿Qué obligación de vigilancia establece el RD 396/2006 respecto a los trabajadores expuestos al amianto?", explicacion: "Vigilancia de la salud durante la exposición y tras su cese.", dificultad: "media", opciones: ["Vigilancia de la salud incluso tras cesar la exposición", "Solo un reconocimiento médico inicial único", "Ninguna vigilancia médica específica", "Solo vigilancia si el trabajador lo solicita"], correcta: 0 },
  { enunciado: "¿En qué registro deben inscribirse las empresas con riesgo por amianto?", explicacion: "El Registro de empresas con riesgo por amianto (RERA).", dificultad: "dificil", opciones: ["El Registro de empresas con riesgo por amianto", "El Registro Mercantil exclusivamente", "El Registro de la Propiedad", "El Registro de Contratistas del Estado"], correcta: 0 },
  { enunciado: "¿Está disponible públicamente el contenido del procedimiento PPRL-1602 del Ayuntamiento de Zaragoza citado en el temario?", explicacion: "No; es un documento interno no publicado.", dificultad: "media", opciones: ["No, es un documento interno no publicado", "Sí, se publica anualmente en el BOPZ", "Sí, figura como anexo del RD 396/2006", "Sí, está disponible en el BOE"], correcta: 0 },
]);

const S3 = "senalizacion-seguridad-obras";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué norma regula las disposiciones mínimas de señalización de seguridad y salud en el trabajo?", reverso: "El Real Decreto 485/1997, de 14 de abril" },
    { anverso: "¿Qué significa la señal de color rojo en la señalización de seguridad, según el criterio general del RD 485/1997?", reverso: "Prohibición (comportamiento peligroso) o peligro-alarma (alto, parada, dispositivos de desconexión de emergencia, evacuación), y también identifica material y equipos de lucha contra incendios" },
    { anverso: "¿Qué significa el color amarillo (o amarillo anaranjado) en la señalización de seguridad?", reverso: "Advertencia: indica atención, precaución, y la necesidad de verificación ante un riesgo o peligro" },
    { anverso: "¿Qué significa el color azul en la señalización de seguridad?", reverso: "Obligación: indica un comportamiento o acción específica obligatoria (por ejemplo, obligación de usar un equipo de protección individual)" },
    { anverso: "¿Qué significa el color verde en la señalización de seguridad?", reverso: "Salvamento o auxilio (puertas, salidas, recorridos de emergencia, primeros auxilios) o situación de seguridad (vuelta a la normalidad)" },
    { anverso: "¿Qué tipos de señalización recoge, entre otros, el RD 485/1997?", reverso: "Señales en forma de panel, señalización de tuberías y recipientes con sustancias peligrosas, señalización de obstáculos y lugares peligrosos, señales luminosas, señales acústicas, comunicación verbal y señales gestuales" },
    { anverso: "¿Qué elemento se emplea habitualmente para la señalización de obras en viales urbanos, además de las señales del RD 485/1997?", reverso: "La señalización vial específica de obras (vallas, conos, balizas luminosas, paneles direccionales), coordinada con la normativa de tráfico aplicable a la ordenación de la circulación en presencia de obras" },
    { anverso: "¿Por qué es especialmente importante la señalización de obras en viales y edificios públicos de uso concurrido?", reverso: "Porque, además de proteger a los trabajadores, debe proteger a terceros ajenos a la obra (peatones, usuarios del edificio, tráfico rodado) que pueden verse expuestos a riesgos derivados de los trabajos" },
    { anverso: "¿Qué debe garantizarse en el vallado o cerramiento perimetral de una obra en vía pública?", reverso: "Que sea estable, visible, continuo y de altura suficiente para impedir el acceso de personas ajenas a la obra, complementado con la señalización adecuada" },
    { anverso: "¿Qué relación existe entre la señalización de un tajo y la evaluación de riesgos de la obra?", reverso: "La señalización debe determinarse en función de los riesgos identificados en la evaluación de riesgos y reflejarse en el plan de seguridad y salud, adaptándose a cada fase de la obra según vayan cambiando los riesgos presentes" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué norma regula la señalización de seguridad y salud en el trabajo?", explicacion: "El RD 485/1997, de 14 de abril.", dificultad: "facil", opciones: ["El RD 485/1997", "El RD 486/1997", "El RD 396/2006", "El RD 1627/1997"], correcta: 0 },
  { enunciado: "¿Qué significa el color rojo en la señalización de seguridad?", explicacion: "Prohibición o peligro-alarma, y material de lucha contra incendios.", dificultad: "media", opciones: ["Prohibición, peligro-alarma o lucha contra incendios", "Obligación de uso de EPI", "Salvamento y primeros auxilios", "Advertencia de riesgo genérico"], correcta: 0 },
  { enunciado: "¿Qué significa el color azul en la señalización de seguridad?", explicacion: "Obligación de un comportamiento o acción específica.", dificultad: "media", opciones: ["Obligación de una acción específica", "Prohibición de una conducta", "Salvamento o auxilio", "Situación de seguridad"], correcta: 0 },
  { enunciado: "¿Qué significa el color verde en la señalización de seguridad?", explicacion: "Salvamento o auxilio, o situación de seguridad.", dificultad: "media", opciones: ["Salvamento, auxilio o situación de seguridad", "Prohibición o peligro-alarma", "Advertencia de un riesgo", "Obligación de uso de casco"], correcta: 0 },
  { enunciado: "¿Qué tipos de señalización recoge el RD 485/1997, además de las señales en panel?", explicacion: "Señalización de tuberías, obstáculos, señales luminosas, acústicas, verbales y gestuales.", dificultad: "media", opciones: ["Tuberías, obstáculos, señales luminosas, acústicas y gestuales", "Únicamente señales en panel", "Solo la señalización de tráfico rodado", "Exclusivamente comunicación escrita"], correcta: 0 },
  { enunciado: "¿Qué elementos son habituales en la señalización de obras en viales urbanos?", explicacion: "Vallas, conos, balizas luminosas y paneles direccionales.", dificultad: "media", opciones: ["Vallas, conos, balizas y paneles direccionales", "Únicamente cinta de balizamiento", "Solo señales acústicas", "Exclusivamente carteles informativos sin balizas"], correcta: 0 },
  { enunciado: "¿Por qué es especialmente importante la señalización de obras en edificios públicos concurridos?", explicacion: "Porque protege también a terceros ajenos a la obra, no solo a los trabajadores.", dificultad: "media", opciones: ["Porque protege también a terceros ajenos a la obra", "Porque solo afecta a la estética del entorno", "Porque no tiene relación con la seguridad laboral", "Porque sustituye al plan de seguridad y salud"], correcta: 0 },
  { enunciado: "¿Qué debe garantizar el vallado perimetral de una obra en vía pública?", explicacion: "Estabilidad, visibilidad, continuidad y altura suficiente para impedir el acceso ajeno.", dificultad: "media", opciones: ["Ser estable, visible, continuo y de altura suficiente", "Ser transparente para no afectar a la fachada", "No requiere ninguna característica concreta", "Ser desmontable diariamente sin excepción"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 20 de ${OPOSICION}...`);
await upsert(
  "tema_oposicion",
  [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 20, orden: 20, es_premium: false, publicado: true, secciones_incluidas: null }],
  "tema_slug,oposicion_slug"
);

console.log("\n✅ tema-58 creado y vinculado como Tema 20 de Oficial Albañil.");

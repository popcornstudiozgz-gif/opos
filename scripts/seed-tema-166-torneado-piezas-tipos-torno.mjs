/**
 * Crea tema-166: "Torneado de piezas: tipos de torno" — Tema 18
 * (numero=18, bloque-2) de Oficial Herrero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 16 oficial del Anexo I (bases2110.pdf, línea 1278):
 *   "Torneado de piezas. Tipos de torno. Elementos de un torno, avances.
 *   Cuchillas y herramientas de corte. Medios de seguridad de un torno."
 *
 * Conocimiento técnico consolidado de mecanizado por torneado, sin una
 * ley española específica que lo regule como técnica de taller. Los
 * medios de seguridad del torno se complementan con el Real Decreto
 * 1215/1997, ya verificado y citado en tema-160 de esta misma oposición.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-166-torneado-piezas-tipos-torno.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-166";
const OPOSICION = "oficial-herrero-ayto-zaragoza";
const BLOQUE_2_ID = "b0312afa-8a49-41a8-a672-99793edcc74e";

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
  titulo: "Torneado de piezas: tipos de torno",
  descripcion: "Tipos de torno. Elementos de un torno, avances. Cuchillas y herramientas de corte. Medios de seguridad de un torno.",
  contenido: "Desarrolla el torneado de piezas: los tipos de torno empleados en el taller de herrería, los elementos que componen un torno y sus avances, las cuchillas y herramientas de corte propias del torneado, y los medios de seguridad del torno conforme a las disposiciones mínimas del Real Decreto 1215/1997 sobre equipos de trabajo.",
  enlaces_boe: [
    { titulo: "Real Decreto 1215/1997, disposiciones mínimas de seguridad para la utilización de equipos de trabajo", url: "https://www.boe.es/buscar/doc.php?id=BOE-A-1997-17824" },
  ],
  indice_estudio: [
    { url: "", titulo: "Tipos de torno. Elementos de un torno y avances", seccion: "tipos-torno-elementos-avances", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Cuchillas y herramientas de corte del torno", seccion: "cuchillas-herramientas-corte-torno", articulos: "Conceptos fundamentales" },
    { url: "https://www.boe.es/buscar/doc.php?id=BOE-A-1997-17824", titulo: "Medios de seguridad de un torno", seccion: "medios-seguridad-torno", articulos: "RD 1215/1997" },
  ],
}]);

const S1 = "tipos-torno-elementos-avances";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el torneado, como operación de mecanizado?", reverso: "Un proceso de mecanizado por arranque de viruta en el que la pieza gira sobre su propio eje mientras una herramienta de corte, fija o con desplazamiento controlado, va eliminando material hasta conseguir la forma final deseada" },
  { anverso: "¿Qué es un torno paralelo (o torno universal)?", reverso: "El tipo de torno más habitual en un taller de herrería, con bancada recta y capacidad para realizar operaciones básicas de cilindrado, refrentado, roscado y otras, mediante el desplazamiento manual o automático del carro portaherramientas" },
  { anverso: "¿Qué es el cabezal (o cabezal fijo) de un torno?", reverso: "El elemento del torno que aloja el husillo principal y el sistema de sujeción de la pieza (el plato de garras), proporcionando el movimiento de giro de la pieza durante el mecanizado" },
  { anverso: "¿Qué es la bancada de un torno?", reverso: "La estructura base y guía sobre la que se desplazan el carro portaherramientas y el contrapunto, proporcionando la rigidez y la precisión necesarias para el mecanizado" },
  { anverso: "¿Qué es el avance, en el contexto del torneado?", reverso: "El desplazamiento longitudinal (a lo largo del eje de la pieza) o transversal de la herramienta de corte por cada vuelta de la pieza, un parámetro que influye directamente en el acabado superficial y en la velocidad de mecanizado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el torneado?", explicacion: "Un mecanizado por arranque de viruta en el que la pieza gira mientras una herramienta la mecaniza.", dificultad: "facil", opciones: ["Un mecanizado por arranque de viruta con la pieza girando", "Un mecanizado exclusivo mediante golpeo con martillo", "Un proceso exclusivo de soldadura de dos piezas metálicas", "Un proceso exclusivo de medición de la dureza de una pieza"], correcta: 0 },
  { enunciado: "¿Qué es el torno paralelo o universal?", explicacion: "El tipo de torno más habitual, con bancada recta y capacidad para operaciones básicas.", dificultad: "media", opciones: ["El tipo de torno más habitual, con bancada recta", "Un torno exclusivo para el corte de chapa de gran espesor", "Un torno exclusivo para el conformado de tubos curvos", "Un torno que no requiere ningún elemento de sujeción de la pieza"], correcta: 0 },
  { enunciado: "¿Qué elemento del torno aloja el husillo principal y el sistema de sujeción de la pieza?", explicacion: "El cabezal o cabezal fijo.", dificultad: "media", opciones: ["El cabezal o cabezal fijo", "La bancada del torno", "El contrapunto del torno", "El carro portaherramientas del torno"], correcta: 0 },
  { enunciado: "¿Qué es la bancada de un torno?", explicacion: "La estructura base y guía sobre la que se desplazan el carro y el contrapunto.", dificultad: "media", opciones: ["La estructura base y guía del carro y el contrapunto", "El elemento que sujeta directamente la pieza a mecanizar", "La herramienta de corte empleada durante el torneado", "El sistema eléctrico que alimenta el motor del torno"], correcta: 0 },
  { enunciado: "¿Qué es el avance en el torneado?", explicacion: "El desplazamiento de la herramienta de corte por cada vuelta de la pieza.", dificultad: "dificil", opciones: ["El desplazamiento de la herramienta por cada vuelta de la pieza", "La velocidad de giro exclusiva del motor del torno", "El diámetro final que debe tener la pieza mecanizada", "El tipo de material del que está fabricada la pieza"], correcta: 0 },
]);

const S2 = "cuchillas-herramientas-corte-torno";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una cuchilla de torno?", reverso: "La herramienta de corte que, montada en el portaherramientas del torno, arranca material de la pieza en rotación, con una geometría de filo adaptada al tipo de operación a realizar (cilindrado, refrentado, roscado, entre otras)" },
  { anverso: "¿Qué es una cuchilla de cilindrar?", reverso: "Una cuchilla de torno diseñada para el mecanizado longitudinal de la pieza, reduciendo su diámetro a lo largo de su eje mediante un avance paralelo a dicho eje" },
  { anverso: "¿Qué es una cuchilla de refrentar?", reverso: "Una cuchilla de torno diseñada para mecanizar la cara frontal (perpendicular al eje) de la pieza, mediante un avance transversal, obteniendo una superficie plana y perpendicular al eje de giro" },
  { anverso: "¿Qué es una cuchilla de roscar?", reverso: "Una cuchilla de torno con un perfil de filo específico (adaptado al tipo de rosca deseada), empleada para generar directamente una rosca sobre la pieza en rotación mediante un avance sincronizado con su giro" },
  { anverso: "¿Qué material de corte es habitual en las cuchillas empleadas en un torno de taller de herrería?", reverso: "El acero rápido (HSS), por su buen equilibrio entre dureza a alta temperatura, tenacidad y coste, aunque también se emplean cuchillas con plaquitas de metal duro para materiales o velocidades de corte más exigentes" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una cuchilla de torno?", explicacion: "La herramienta de corte montada en el portaherramientas que arranca material de la pieza en rotación.", dificultad: "facil", opciones: ["La herramienta de corte que arranca material de la pieza en rotación", "El elemento que sujeta la pieza durante el torneado", "El sistema que proporciona el giro a la pieza mecanizada", "El instrumento empleado para medir el diámetro final de la pieza"], correcta: 0 },
  { enunciado: "¿Qué es una cuchilla de cilindrar?", explicacion: "Mecaniza longitudinalmente la pieza, reduciendo su diámetro a lo largo del eje.", dificultad: "media", opciones: ["Mecaniza longitudinalmente, reduciendo el diámetro", "Mecaniza exclusivamente la cara frontal de la pieza", "Genera directamente una rosca sobre la pieza", "Sujeta la pieza durante todo el proceso de torneado"], correcta: 0 },
  { enunciado: "¿Qué es una cuchilla de refrentar?", explicacion: "Mecaniza la cara frontal de la pieza, perpendicular al eje de giro.", dificultad: "media", opciones: ["Mecaniza la cara frontal, perpendicular al eje", "Mecaniza longitudinalmente a lo largo de todo el eje", "Genera directamente una rosca sobre la pieza", "Sustituye por completo al carro portaherramientas del torno"], correcta: 0 },
  { enunciado: "¿Qué es una cuchilla de roscar?", explicacion: "Genera directamente una rosca sobre la pieza mediante un avance sincronizado.", dificultad: "media", opciones: ["Genera directamente una rosca sobre la pieza", "Mecaniza exclusivamente la cara frontal de la pieza", "Reduce el diámetro de la pieza a lo largo de su eje", "Sustituye por completo al plato de garras del torno"], correcta: 0 },
  { enunciado: "¿Qué material de corte es habitual en las cuchillas de un torno de taller de herrería?", explicacion: "El acero rápido (HSS), y en casos exigentes plaquitas de metal duro.", dificultad: "dificil", opciones: ["Acero rápido (HSS), y plaquitas de metal duro en casos exigentes", "Madera tratada térmicamente, sin ningún componente metálico", "Aluminio puro, sin ninguna aleación adicional de dureza", "Un material exclusivamente cerámico sin ningún componente metálico"], correcta: 0 },
]);

const S3 = "medios-seguridad-torno";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué Real Decreto establece las disposiciones mínimas de seguridad para la utilización de un torno, como equipo de trabajo?", reverso: "El Real Decreto 1215/1997, de 18 de julio" },
  { anverso: "¿Qué elemento de protección impide el acceso accidental a la zona de mecanizado de un torno en funcionamiento?", reverso: "El resguardo o pantalla de protección, que protege frente a la proyección de virutas y el contacto accidental con la pieza o la herramienta en movimiento" },
  { anverso: "¿Por qué está especialmente desaconsejado el uso de guantes al manipular directamente el plato de garras o la pieza en rotación de un torno?", reverso: "Porque el guante podría quedar atrapado por la pieza o el plato en movimiento, arrastrando la mano del operario hacia el punto de peligro, un riesgo de atrapamiento bien conocido en máquinas rotativas" },
  { anverso: "¿Qué otro elemento de protección personal, además de evitar los guantes en la zona de rotación, es habitual emplear al tornear?", reverso: "Gafas de protección, frente al riesgo de proyección de virutas, y ropa de trabajo ajustada, sin elementos sueltos (mangas anchas, cordones colgantes) que puedan engancharse en la pieza o el plato en rotación" },
  { anverso: "¿Qué comprobación previa debe realizar el operario antes de arrancar el torno, respecto a la sujeción de la pieza y las herramientas?", reverso: "Comprobar que la pieza está correctamente sujeta en el plato de garras, que la herramienta está firmemente fijada en el portaherramientas, y que no queda ninguna llave u objeto suelto sobre el torno antes de iniciar el giro" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué Real Decreto establece las disposiciones mínimas de seguridad para la utilización de un torno?", explicacion: "El Real Decreto 1215/1997.", dificultad: "media", opciones: ["El Real Decreto 1215/1997", "El Real Decreto 614/2001", "El Real Decreto 773/1997", "El Real Decreto 486/1997"], correcta: 0 },
  { enunciado: "¿Qué función cumple el resguardo o pantalla de protección de un torno?", explicacion: "Protege frente a la proyección de virutas y el contacto accidental con la pieza o la herramienta.", dificultad: "media", opciones: ["Protege frente a proyección de virutas y contacto accidental", "Aumenta la velocidad de giro del torno durante el mecanizado", "Sustituye por completo a la necesidad de cuchillas de corte", "Mide la temperatura de la pieza durante el mecanizado"], correcta: 0 },
  { enunciado: "¿Por qué está desaconsejado el uso de guantes al manipular directamente la pieza en rotación de un torno?", explicacion: "El guante podría quedar atrapado, arrastrando la mano del operario hacia el punto de peligro.", dificultad: "dificil", opciones: ["El guante podría quedar atrapado y arrastrar la mano del operario", "Los guantes reducen siempre la precisión del torneado sin ningún riesgo real", "Los guantes están prohibidos en cualquier tarea del taller de herrería", "Los guantes aumentan siempre el riesgo de descarga eléctrica en el torno"], correcta: 0 },
  { enunciado: "¿Qué característica de la ropa de trabajo debe evitarse al utilizar un torno?", explicacion: "Elementos sueltos como mangas anchas o cordones colgantes que puedan engancharse.", dificultad: "media", opciones: ["Elementos sueltos que puedan engancharse en la pieza en rotación", "El uso de calzado de seguridad durante el torneado", "El uso de gafas de protección durante el torneado", "El uso de ropa de trabajo resistente al desgaste habitual"], correcta: 0 },
  { enunciado: "¿Qué debe comprobar el operario antes de arrancar el torno, respecto a llaves u objetos sueltos?", explicacion: "Que no queda ninguna llave u objeto suelto sobre el torno antes de iniciar el giro.", dificultad: "media", opciones: ["Que no queda ninguna llave u objeto suelto sobre el torno", "Que el color del torno es el adecuado antes de iniciar el trabajo", "Que la temperatura ambiente del taller es la adecuada para tornear", "Ninguna comprobación específica es necesaria antes de arrancar el torno"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 18 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 18, orden: 18, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-166 creado y vinculado como Tema 18 de Oficial Herrero.");

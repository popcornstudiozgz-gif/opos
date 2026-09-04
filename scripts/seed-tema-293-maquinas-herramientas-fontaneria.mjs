/**
 * Crea tema-293: "Máquinas y herramientas de fontanería" — Tema 17
 * (numero=17, bloque-2) de Oficial Fontanero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 15 oficial del Anexo I (bases1716.pdf, línea 543):
 * "Máquinas y herramientas. Clases, condiciones de trabajo."
 *
 * Sourcing: herramientas manuales y eléctricas del oficio (cortatubos,
 * terraja/roscadora, escariador, curvadora) — conocimiento técnico
 * consolidado sin ley única, verificado con búsqueda previa. Condiciones
 * de trabajo con equipos: RD 1215/1997, de seguridad en la utilización de
 * los equipos de trabajo (BOE-A-1997-17824), ya verificado en otras
 * "Oficial X" del proyecto (Herrero, Guardallaves).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-293-maquinas-herramientas-fontaneria.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-293";
const OPOSICION = "oficial-fontanero-ayto-zaragoza";
const BLOQUE_2_ID = "417e77bc-e7ac-4984-ae49-3a35de79350d";

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
  titulo: "Máquinas y herramientas de fontanería",
  descripcion: "Herramientas manuales del oficio: cortatubos, terraja/roscadora, escariador, curvadora. Máquinas eléctricas (roscadora, amoladora, taladro) y condiciones seguras de uso (RD 1215/1997). Mantenimiento y conservación de herramientas.",
  contenido: "Desarrolla las máquinas y herramientas propias del oficio de fontanero: las herramientas manuales de uso más frecuente (cortatubos, terraja o roscadora, escariador, curvadora de tubos), las máquinas eléctricas que las complementan y las condiciones de trabajo seguras exigidas por el Real Decreto 1215/1997, y las pautas de mantenimiento y conservación que garantizan su correcto funcionamiento y su vida útil.",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1997-17824", titulo: "Real Decreto 1215/1997, de 18 de julio, sobre disposiciones mínimas de seguridad y salud para la utilización de los equipos de trabajo" },
  ],
  indice_estudio: [
    { url: "", titulo: "Herramientas manuales de fontanería", seccion: "herramientas-manuales-de-fontaneria", articulos: "Conocimiento técnico del oficio" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1997-17824", titulo: "Máquinas eléctricas y condiciones de trabajo", seccion: "maquinas-electricas-y-condiciones-de-trabajo", articulos: "RD 1215/1997" },
    { url: "", titulo: "Mantenimiento y conservación de herramientas", seccion: "mantenimiento-y-conservacion-de-herramientas", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "herramientas-manuales-de-fontaneria";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Para qué se emplea un cortatubos, y qué característica debe tener su cuchilla para tuberías metálicas?", reverso: "Para cortar tuberías dejando un corte limpio, perpendicular y sin rebabas; para tuberías metálicas (cobre, acero) la cuchilla debe ser de acero templado, e incorpora habitualmente un escariador integrado" },
  { anverso: "¿Qué es una terraja o roscadora manual, y para qué se emplea?", reverso: "Una herramienta que corta una rosca exterior sobre el extremo de un tubo metálico, permitiendo después realizar una unión roscada con el accesorio correspondiente" },
  { anverso: "¿Qué es un escariador y por qué es necesario tras cortar un tubo?", reverso: "Una herramienta (a menudo integrada en el propio cortatubos) que elimina la rebaba interior y exterior que deja el corte, evitando turbulencias en el flujo de agua y facilitando el roscado o la unión posterior" },
  { anverso: "¿Para qué se emplea una curvadora de tubos, y qué tipos existen según el esfuerzo requerido?", reverso: "Para doblar tuberías (típicamente de cobre) sin aplastarlas ni deformar su sección; existen curvadoras manuales, eléctricas e hidráulicas, según el diámetro del tubo y el esfuerzo necesario para curvarlo" },
  { anverso: "¿Qué función cumple un alicate de presión en instalaciones de tuberías PEX?", reverso: "Sujetar o comprimir con firmeza piezas o accesorios durante el montaje de conexiones PEX, complementando a los cortadores de tubos y a los alicates específicos de juntas de este material" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Para qué se emplea un cortatubos?", explicacion: "Para cortar tuberías con un corte limpio, perpendicular y sin rebabas.", dificultad: "facil", opciones: ["Para cortar tuberías dejando un corte limpio, perpendicular y sin rebabas", "Para curvar tuberías de cobre sin aplastar su sección", "Para roscar el extremo exterior de un tubo metálico", "Para comprimir accesorios de conexión en tuberías PEX"], correcta: 0 },
  { enunciado: "¿Qué función cumple una terraja o roscadora manual?", explicacion: "Corta una rosca exterior en el extremo de un tubo metálico.", dificultad: "media", opciones: ["Cortar una rosca exterior sobre el extremo de un tubo metálico", "Cortar el tubo con un corte limpio, sin ninguna rosca resultante", "Eliminar la rebaba interior y exterior que deja un corte previo", "Doblar el tubo sin aplastar ni deformar su sección"], correcta: 0 },
  { enunciado: "¿Por qué es necesario escariar un tubo tras cortarlo?", explicacion: "Para eliminar la rebaba y evitar turbulencias, facilitando el roscado o la unión.", dificultad: "media", opciones: ["Para eliminar la rebaba interior y exterior, evitando turbulencias y facilitando la unión posterior", "Para aumentar artificialmente el diámetro interior del tubo cortado", "Para reducir la longitud total del tramo de tubería cortado", "Para cambiar el material del tubo antes de su instalación"], correcta: 0 },
  { enunciado: "¿Qué tipos de curvadora de tubos existen según el esfuerzo requerido?", explicacion: "Manuales, eléctricas e hidráulicas.", dificultad: "dificil", opciones: ["Manuales, eléctricas e hidráulicas", "Exclusivamente manuales, sin ninguna otra variante disponible", "Exclusivamente hidráulicas, sin ninguna otra variante disponible", "Exclusivamente neumáticas, sin ninguna otra variante disponible"], correcta: 0 },
  { enunciado: "¿Para qué se emplea un alicate de presión en instalaciones PEX?", explicacion: "Para sujetar o comprimir con firmeza piezas o accesorios durante el montaje.", dificultad: "media", opciones: ["Para sujetar o comprimir con firmeza piezas o accesorios durante el montaje de conexiones PEX", "Para roscar exclusivamente tuberías metálicas de cobre o acero", "Para medir la presión de servicio de la instalación ya terminada", "Para soldar por termofusión tuberías de polipropileno"], correcta: 0 },
]);

const S2 = "maquinas-electricas-y-condiciones-de-trabajo";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué ventaja aporta una roscadora eléctrica frente a una terraja manual en trabajos de gran volumen?", reverso: "Permite roscar tramos largos o muchas piezas con mucho menos esfuerzo físico y en menos tiempo, aunque la terraja manual sigue siendo útil para reparaciones puntuales o espacios de difícil acceso" },
  { anverso: "¿A qué máquinas y equipos se aplica el Real Decreto 1215/1997?", reverso: "A los equipos de trabajo utilizados por los trabajadores en su actividad laboral: máquinas, aparatos, instrumentos e instalaciones, fijas o portátiles, incluidas las herramientas eléctricas empleadas en fontanería" },
  { anverso: "¿Qué exige, con carácter general, el RD 1215/1997 sobre las condiciones de un equipo de trabajo antes de su uso?", reverso: "Que el equipo se adecue al trabajo que deba realizarse, que garantice la seguridad y salud de los trabajadores durante su utilización, y que se mantenga en condiciones adecuadas mediante el mantenimiento oportuno" },
  { anverso: "¿Qué información debe recibir el trabajador antes de utilizar un equipo de trabajo, según el RD 1215/1997?", reverso: "Información y, en su caso, formación adecuadas sobre los riesgos derivados de la utilización de ese equipo concreto, así como sobre las medidas de prevención y protección aplicables" },
  { anverso: "¿Qué EPI resulta especialmente relevante al manejar una amoladora o una roscadora eléctrica en el taller de fontanería?", reverso: "Gafas de protección frente a proyecciones (virutas, chispas), y guantes adecuados que no comprometan el agarre ni queden atrapados por partes móviles de la máquina" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué ventaja aporta una roscadora eléctrica frente a una terraja manual en trabajos de gran volumen?", explicacion: "Menos esfuerzo físico y menos tiempo para roscar tramos largos o muchas piezas.", dificultad: "facil", opciones: ["Permite roscar con mucho menos esfuerzo físico y en menos tiempo", "Elimina por completo la necesidad de escariar el tubo tras cortarlo", "Sustituye por completo a un cortatubos en cualquier circunstancia", "Solo puede emplearse en tuberías de PVC, nunca en tuberías metálicas"], correcta: 0 },
  { enunciado: "¿A qué se aplica el RD 1215/1997?", explicacion: "A los equipos de trabajo: máquinas, aparatos, instrumentos e instalaciones utilizados por los trabajadores.", dificultad: "media", opciones: ["A los equipos de trabajo utilizados por los trabajadores en su actividad laboral", "Exclusivamente a las instalaciones de agua potable, sin relación con herramientas o máquinas", "Exclusivamente a los vehículos de transporte de materiales de obra", "Exclusivamente a los equipos de protección individual (EPI), no a las máquinas"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 1215/1997 sobre las condiciones de un equipo de trabajo?", explicacion: "Que se adecue al trabajo, garantice la seguridad y se mantenga en condiciones adecuadas.", dificultad: "media", opciones: ["Que se adecue al trabajo a realizar, garantice la seguridad y se mantenga en condiciones adecuadas", "Que sea siempre el modelo más moderno disponible en el mercado, sin excepción", "Que carezca de cualquier tipo de mantenimiento periódico posterior a su compra", "Que se utilice exclusivamente por el personal de mayor antigüedad en la empresa"], correcta: 0 },
  { enunciado: "¿Qué debe recibir el trabajador antes de utilizar un equipo de trabajo, según el RD 1215/1997?", explicacion: "Información y formación sobre los riesgos y las medidas de prevención aplicables.", dificultad: "dificil", opciones: ["Información y, en su caso, formación sobre los riesgos y las medidas de prevención aplicables", "Únicamente el manual de instrucciones del fabricante, sin ninguna formación adicional", "Ninguna información específica, al considerarse suficiente la experiencia previa del trabajador", "Únicamente una autorización escrita de su superior jerárquico directo"], correcta: 0 },
  { enunciado: "¿Qué EPI es especialmente relevante al manejar una amoladora o roscadora eléctrica?", explicacion: "Gafas de protección y guantes adecuados que no queden atrapados por partes móviles.", dificultad: "media", opciones: ["Gafas de protección frente a proyecciones y guantes adecuados que no queden atrapados por partes móviles", "Un arnés anticaídas, propio de trabajos en altura, sin relación con esta máquina", "Un equipo de respiración autónoma, propio de espacios confinados", "Botas de agua, propias de trabajos con presencia de agua estancada"], correcta: 0 },
]);

const S3 = "mantenimiento-y-conservacion-de-herramientas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Por qué debe mantenerse afilada la cuchilla de un cortatubos, más allá de la comodidad de uso?", reverso: "Una cuchilla desafilada exige más fuerza y más pasadas para completar el corte, aumenta el riesgo de que el tubo se deforme u ovalice, y puede dejar un corte irregular difícil de escariar correctamente" },
  { anverso: "¿Qué cuidado básico debe darse a las herramientas manuales de fontanería tras su uso en obra?", reverso: "Limpiarlas de restos de agua, cal, grasa o virutas metálicas, y secarlas antes de guardarlas, para evitar la corrosión y prolongar su vida útil" },
  { anverso: "¿Por qué es importante revisar periódicamente los cables y las conexiones eléctricas de las máquinas portátiles de fontanería?", reverso: "Porque un cable dañado o una conexión defectuosa puede provocar un riesgo eléctrico grave para el trabajador, además de comprometer el correcto funcionamiento de la máquina" },
  { anverso: "¿Qué debe comprobarse en las cuchillas y peines de una terraja o roscadora antes de un trabajo importante?", reverso: "Que están afilados y no presentan desgaste excesivo, ya que unas cuchillas o peines desgastados producen roscas defectuosas que comprometen la estanquidad de la unión" },
  { anverso: "¿Qué ventaja tiene organizar y almacenar ordenadamente las herramientas en el vehículo o taller del Oficial Fontanero?", reverso: "Reduce el tiempo de localización de cada herramienta, disminuye el riesgo de daños por golpes o humedad, y facilita detectar a tiempo una herramienta deteriorada o que falta" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Por qué debe mantenerse afilada la cuchilla de un cortatubos?", explicacion: "Para evitar deformaciones del tubo y cortes irregulares.", dificultad: "facil", opciones: ["Porque una cuchilla desafilada aumenta el riesgo de deformar el tubo y dejar un corte irregular", "Porque una cuchilla desafilada reduce automáticamente el diámetro real del tubo cortado", "Porque una cuchilla desafilada mejora la calidad final del corte realizado", "Porque el afilado de la cuchilla no tiene ninguna relación con la calidad del corte"], correcta: 0 },
  { enunciado: "¿Qué cuidado básico debe darse a las herramientas manuales tras su uso en obra?", explicacion: "Limpiarlas y secarlas para evitar la corrosión.", dificultad: "media", opciones: ["Limpiarlas de restos de agua, cal, grasa o virutas y secarlas antes de guardarlas", "Guardarlas directamente sin ninguna limpieza previa, con independencia de su estado", "Sumergirlas en agua durante varias horas antes de guardarlas en el almacén", "Aplicarles pintura decorativa antes de cada uso, sin relación con su mantenimiento"], correcta: 0 },
  { enunciado: "¿Por qué es importante revisar periódicamente los cables de las máquinas portátiles?", explicacion: "Un cable dañado supone un riesgo eléctrico grave.", dificultad: "media", opciones: ["Porque un cable dañado puede provocar un riesgo eléctrico grave para el trabajador", "Porque los cables no tienen ninguna relación real con la seguridad del trabajador", "Porque revisar los cables sustituye a cualquier otra revisión de mantenimiento", "Porque los cables solo deben revisarse una vez, en el momento de la compra"], correcta: 0 },
  { enunciado: "¿Qué consecuencia tiene emplear una terraja con peines desgastados?", explicacion: "Produce roscas defectuosas que comprometen la estanquidad.", dificultad: "dificil", opciones: ["Produce roscas defectuosas que comprometen la estanquidad de la unión", "Mejora la calidad y la resistencia de la rosca obtenida", "No tiene ninguna consecuencia relevante sobre la rosca final", "Aumenta automáticamente la vida útil de la propia terraja"], correcta: 0 },
  { enunciado: "¿Qué ventaja tiene almacenar ordenadamente las herramientas del Oficial Fontanero?", explicacion: "Reduce tiempo de localización, daños y facilita detectar deterioros.", dificultad: "media", opciones: ["Reduce el tiempo de localización, disminuye el riesgo de daños y facilita detectar deterioros a tiempo", "No aporta ninguna ventaja real frente a un almacenamiento desordenado", "Sustituye por completo a cualquier revisión periódica del estado de las herramientas", "Solo es relevante si las herramientas son eléctricas, nunca si son manuales"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Terraja", definicion: "Herramienta que corta una rosca exterior sobre el extremo de un tubo metálico para permitir una unión roscada." },
  { tema_slug: TEMA, seccion: S1, termino: "Escariador", definicion: "Herramienta que elimina la rebaba interior y exterior de un tubo tras cortarlo, facilitando el roscado o la unión posterior." },
  { tema_slug: TEMA, seccion: S2, termino: "Equipo de trabajo", definicion: "Cualquier máquina, aparato, instrumento o instalación utilizado por un trabajador en su actividad laboral, regulado por el RD 1215/1997." },
  { tema_slug: TEMA, seccion: S2, termino: "RD 1215/1997", definicion: "Real Decreto sobre disposiciones mínimas de seguridad y salud para la utilización de los equipos de trabajo por los trabajadores." },
  { tema_slug: TEMA, seccion: S3, termino: "Peine (de terraja)", definicion: "Elemento cortante intercambiable de una terraja o roscadora que forma el perfil de la rosca sobre el tubo." },
  { tema_slug: TEMA, seccion: S3, termino: "Mantenimiento preventivo (de herramienta)", definicion: "Conjunto de operaciones periódicas de limpieza, afilado y revisión que conservan una herramienta en condiciones seguras y eficaces de uso." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 17 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 17, orden: 17, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-293 creado y vinculado como Tema 17 de Oficial Fontanero.");

/**
 * Crea tema-212: "Soldadura" — Tema 16 (numero=16, bloque-2) de Oficial
 * Planta Potabilizadora (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 14 oficial del Anexo I (bases2110.pdf, línea
 * 1204): "Tipos de soldadura. Soldadura y corte oxiacetilénicos: campo
 * de aplicación, componentes, manejo y medidas de seguridad. La
 * soldadura por arco eléctrico: principios de funcionamiento,
 * componentes, tipos, medidas de seguridad."
 *
 * Conocimiento técnico consolidado de soldadura industrial, sin una ley
 * española que lo regule como tal en su vertiente de proceso — mismo
 * criterio ya aplicado en Oficial Herrero (ver scripts/seed-tema-164-*
 * y seed-tema-165-*.mjs, soldadura oxiacetilénica y por arco eléctrico
 * de ese proyecto). Las medidas de seguridad explícitamente exigidas
 * por el propio temario oficial sí cuentan con marco normativo real,
 * ya verificado en el proyecto: Ley 31/1995 de Prevención de Riesgos
 * Laborales, RD 773/1997 (equipos de protección individual, aplicable
 * a la protección ocular y facial frente a la radiación y las
 * proyecciones de la soldadura) y RD 1215/1997 (equipos de trabajo,
 * aplicable a los equipos de soldadura y corte empleados).
 *
 * Tres secciones:
 * 1. tipos-soldadura-generalidades
 * 2. soldadura-corte-oxiacetilenico-aplicacion-seguridad
 * 3. soldadura-arco-electrico-funcionamiento-tipos-seguridad
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-212-soldadura.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-212";
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
  titulo: "Soldadura",
  descripcion: "Tipos de soldadura. Soldadura y corte oxiacetilénicos: campo de aplicación, componentes, manejo y medidas de seguridad. Soldadura por arco eléctrico: funcionamiento, componentes, tipos y medidas de seguridad.",
  contenido: "Desarrolla la soldadura como técnica de unión y reparación empleada en el mantenimiento de una planta potabilizadora: los principales tipos de soldadura, la soldadura y el corte oxiacetilénicos (su campo de aplicación, componentes del equipo, manejo y medidas de seguridad), y la soldadura por arco eléctrico (principios de funcionamiento, componentes, tipos y medidas de seguridad), estas últimas apoyadas en el marco normativo de prevención de riesgos laborales aplicable a estos equipos y procesos.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Tipos de soldadura: generalidades", seccion: "tipos-soldadura-generalidades", articulos: "Conocimiento técnico de soldadura industrial" },
    { url: "", titulo: "Soldadura y corte oxiacetilénicos: aplicación y seguridad", seccion: "soldadura-corte-oxiacetilenico-aplicacion-seguridad", articulos: "Conocimiento técnico; Ley 31/1995, RD 773/1997, RD 1215/1997" },
    { url: "", titulo: "Soldadura por arco eléctrico: funcionamiento, tipos y seguridad", seccion: "soldadura-arco-electrico-funcionamiento-tipos-seguridad", articulos: "Conocimiento técnico; Ley 31/1995, RD 773/1997, RD 1215/1997" },
  ],
}]);

const S1 = "tipos-soldadura-generalidades";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es, en términos generales, la soldadura como proceso de unión de materiales?", reverso: "Un proceso que une dos o más piezas de forma permanente mediante la fusión del material base, del material de aportación, o de ambos, en la zona de la unión" },
  { anverso: "¿Qué gran clasificación se establece habitualmente entre los tipos de soldadura según la fuente de energía empleada?", reverso: "Soldadura por fusión con llama (como la oxiacetilénica), soldadura por fusión con arco eléctrico (como el arco manual, MIG/MAG o TIG), y otros procesos como la soldadura por resistencia eléctrica o por fricción" },
  { anverso: "¿Qué es el material de aportación en un proceso de soldadura?", reverso: "El material adicional (en forma de varilla, electrodo o hilo continuo) que se funde junto con el material base de las piezas para formar el cordón de soldadura, cuya composición debe ser compatible con la de los materiales a unir" },
  { anverso: "¿Qué criterios generales condicionan la elección de un tipo de soldadura frente a otro para una reparación concreta en la planta?", reverso: "El material de las piezas a unir, el espesor de las mismas, la posición de soldeo (horizontal, vertical, sobre cabeza), la exigencia de acabado y resistencia requerida, y la disponibilidad de equipos y de personal cualificado para ese proceso concreto" },
  { anverso: "¿Qué es una zona afectada térmicamente (ZAT), presente en cualquier unión soldada?", reverso: "La región del material base próxima al cordón de soldadura que, sin llegar a fundirse, sufre modificaciones en su estructura y sus propiedades mecánicas por efecto del calor generado durante el proceso de soldeo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es, en términos generales, la soldadura?", explicacion: "Un proceso que une piezas de forma permanente mediante la fusión del material.", dificultad: "facil", opciones: ["Un proceso que une piezas de forma permanente mediante fusión", "Un proceso que separa piezas mediante corte con herramienta rotativa", "Un proceso que genera un agujero cilíndrico en una pieza", "Un proceso que genera una rosca interior o exterior en una pieza"], correcta: 0 },
  { enunciado: "¿Qué gran clasificación se establece entre los tipos de soldadura según la fuente de energía?", explicacion: "Soldadura por llama, por arco eléctrico, y otros procesos como resistencia o fricción.", dificultad: "media", opciones: ["Por llama, por arco eléctrico, y otros procesos", "Únicamente soldadura por llama, sin ninguna otra clasificación", "Únicamente soldadura por arco eléctrico, sin ninguna otra alternativa", "Únicamente soldadura por resistencia, sin ninguna otra alternativa"], correcta: 0 },
  { enunciado: "¿Qué es el material de aportación en un proceso de soldadura?", explicacion: "El material adicional que se funde junto al material base para formar el cordón.", dificultad: "media", opciones: ["El material adicional que forma el cordón de soldadura", "El material exclusivo empleado para el corte oxiacetilénico", "El gas exclusivo empleado para la protección del arco eléctrico", "El equipo exclusivo de protección individual del soldador"], correcta: 0 },
  { enunciado: "¿Qué criterios condicionan la elección de un tipo de soldadura para una reparación concreta?", explicacion: "El material, el espesor, la posición de soldeo y la disponibilidad de equipos y personal.", dificultad: "media", opciones: ["El material, el espesor, la posición y la disponibilidad de medios", "Únicamente el color exterior de las piezas a soldar", "Únicamente la fecha de fabricación de las piezas a soldar", "Ningún criterio técnico real distinto del coste del proceso"], correcta: 0 },
  { enunciado: "¿Qué es la zona afectada térmicamente (ZAT) de una unión soldada?", explicacion: "La región del material base que sufre modificaciones por el calor sin llegar a fundirse.", dificultad: "dificil", opciones: ["La región que sufre modificaciones por el calor sin fundirse", "La región exclusiva donde se deposita el material de aportación", "La región exclusiva protegida por el gas del proceso de soldeo", "Una zona que no existe realmente en ningún proceso de soldadura"], correcta: 0 },
]);

const S2 = "soldadura-corte-oxiacetilenico-aplicacion-seguridad";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿En qué se basa la soldadura oxiacetilénica?", reverso: "En la combustión de una mezcla de oxígeno y acetileno, que genera una llama de muy alta temperatura capaz de fundir el material base y el de aportación en la zona de la unión" },
  { anverso: "¿Qué componentes básicos integra un equipo de soldadura y corte oxiacetilénico?", reverso: "Botellas de oxígeno y de acetileno, manorreductores que regulan la presión de salida de cada gas, mangueras de conexión (de colores diferenciados por gas), válvulas antirretorno, y el soplete de soldadura o de corte" },
  { anverso: "¿Para qué campo de aplicación resulta especialmente adecuado el corte oxiacetilénico en el mantenimiento de una planta?", reverso: "Para el corte de piezas metálicas de acero de cierto espesor (tuberías, perfiles, chapas) cuando no se dispone de otros métodos de corte, o cuando se requiere una gran movilidad del equipo por no depender de energía eléctrica" },
  { anverso: "¿Qué medidas de seguridad básicas exige el manejo de un equipo de soldadura oxiacetilénica?", reverso: "Uso de gafas de protección adecuadas a la radiación de la llama, manipulación cuidadosa de las botellas de gas (fijación vertical, protección frente a golpes y fuentes de calor), verificación de la ausencia de fugas en las conexiones, y disponibilidad de un extintor adecuado cerca del área de trabajo" },
  { anverso: "¿Qué riesgo específico presentan las botellas de acetileno frente a las de oxígeno, y qué precaución exige?", reverso: "El acetileno es un gas inestable y altamente inflamable que puede descomponerse violentamente si se somete a presiones excesivas o a un calentamiento indebido, por lo que sus botellas deben manipularse siempre en posición vertical y nunca exponerse a fuentes de calor directas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿En qué se basa la soldadura oxiacetilénica?", explicacion: "En la combustión de una mezcla de oxígeno y acetileno.", dificultad: "facil", opciones: ["En la combustión de una mezcla de oxígeno y acetileno", "En la formación de un arco eléctrico entre dos electrodos", "En la resistencia eléctrica generada en el punto de contacto", "En la fricción mecánica entre las dos piezas a unir"], correcta: 0 },
  { enunciado: "¿Qué componentes básicos integra un equipo de soldadura y corte oxiacetilénico?", explicacion: "Botellas de oxígeno y acetileno, manorreductores, mangueras, válvulas antirretorno y soplete.", dificultad: "media", opciones: ["Botellas de gas, manorreductores, mangueras y soplete", "Únicamente un electrodo y una pinza porta-electrodos", "Únicamente un transformador eléctrico de soldadura", "Únicamente un generador de gas protector inerte"], correcta: 0 },
  { enunciado: "¿Para qué campo de aplicación resulta especialmente adecuado el corte oxiacetilénico?", explicacion: "Para el corte de piezas metálicas de acero sin depender de energía eléctrica.", dificultad: "media", opciones: ["Para el corte de acero sin depender de energía eléctrica", "Exclusivamente para la unión de tuberías de plástico", "Exclusivamente para la desinfección de conducciones de agua", "Exclusivamente para el mecanizado de precisión de pequeñas piezas"], correcta: 0 },
  { enunciado: "¿Qué medida de seguridad básica exige el manejo de un equipo de soldadura oxiacetilénica?", explicacion: "Uso de gafas de protección y manipulación cuidadosa de las botellas de gas.", dificultad: "media", opciones: ["Uso de gafas de protección y manipulación cuidadosa de las botellas", "Ninguna medida especial distinta de las de cualquier otra herramienta", "Uso exclusivo de guantes de protección eléctrica de alta tensión", "Uso exclusivo de calzado de seguridad, sin ninguna otra medida"], correcta: 0 },
  { enunciado: "¿Qué riesgo específico presentan las botellas de acetileno?", explicacion: "Es un gas inestable que puede descomponerse violentamente ante presión o calor excesivos.", dificultad: "dificil", opciones: ["Puede descomponerse violentamente ante presión o calor excesivos", "No presenta ningún riesgo real distinto del propio oxígeno", "Es un gas completamente inerte sin ningún riesgo de inflamabilidad", "Solo presenta riesgo si se combina con acero de bajo carbono"], correcta: 0 },
]);

const S3 = "soldadura-arco-electrico-funcionamiento-tipos-seguridad";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿En qué se basa la soldadura por arco eléctrico?", reverso: "En generar un arco eléctrico (una descarga eléctrica continua a través del aire ionizado) entre un electrodo y las piezas a soldar, cuyo calor funde el material base y el material de aportación en la zona de la unión" },
  { anverso: "¿Qué componentes básicos integra un equipo de soldadura por arco eléctrico manual (electrodo revestido)?", reverso: "Una fuente de alimentación (transformador, transformador-rectificador o inverter), cables de conexión, una pinza porta-electrodos, una pinza de masa que se conecta a la pieza, y el propio electrodo revestido" },
  { anverso: "¿Qué diferencia principal existe entre la soldadura por arco manual con electrodo revestido y la soldadura MIG/MAG?", reverso: "En el arco manual, el electrodo revestido se consume y debe sustituirse pieza a pieza; en la MIG/MAG, el material de aportación es un hilo continuo alimentado automáticamente, lo que permite soldar de forma más rápida y continua" },
  { anverso: "¿Qué caracteriza a la soldadura TIG frente a otros procesos de arco eléctrico?", reverso: "Emplea un electrodo de tungsteno no consumible bajo protección de gas inerte (habitualmente argón), lo que permite un control muy preciso del arco y una soldadura de gran calidad, especialmente adecuada en materiales delicados o de acabado exigente" },
  { anverso: "¿Qué medidas de seguridad específicas exige la soldadura por arco eléctrico, además de las generales de cualquier trabajo en caliente?", reverso: "Protección ocular y facial mediante careta o pantalla de soldar con filtro adecuado (frente a la radiación ultravioleta e infrarroja del arco), guantes y ropa de protección frente a proyecciones y quemaduras, y una instalación eléctrica del equipo en buen estado que evite riesgos de electrocución" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿En qué se basa la soldadura por arco eléctrico?", explicacion: "En generar un arco eléctrico entre un electrodo y las piezas, fundiendo el material en la unión.", dificultad: "facil", opciones: ["En generar un arco eléctrico que funde el material de la unión", "En la combustión de una mezcla de oxígeno y acetileno", "En la fricción mecánica entre las dos piezas a unir", "En la resistencia eléctrica generada en el punto de contacto"], correcta: 0 },
  { enunciado: "¿Qué componentes básicos integra un equipo de soldadura por arco manual con electrodo revestido?", explicacion: "Fuente de alimentación, cables, pinza porta-electrodos, pinza de masa y electrodo.", dificultad: "media", opciones: ["Fuente de alimentación, cables, pinza porta-electrodos y masa", "Botellas de oxígeno y acetileno con sus manorreductores", "Un lecho de arena o carbón activo para filtración", "Un depósito de hipoclorito sódico para desinfección"], correcta: 0 },
  { enunciado: "¿Qué diferencia principal existe entre el arco manual con electrodo revestido y la soldadura MIG/MAG?", explicacion: "El electrodo revestido se consume pieza a pieza; en MIG/MAG el hilo se alimenta continuamente.", dificultad: "media", opciones: ["En MIG/MAG el material de aportación es un hilo continuo", "Ambos procesos emplean exactamente el mismo tipo de electrodo", "El arco manual siempre emplea protección de gas inerte argón", "La soldadura MIG/MAG no genera nunca ningún tipo de arco eléctrico"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a la soldadura TIG frente a otros procesos de arco eléctrico?", explicacion: "Emplea un electrodo de tungsteno no consumible bajo protección de gas inerte.", dificultad: "dificil", opciones: ["Electrodo de tungsteno no consumible bajo gas inerte", "Electrodo revestido consumible sin ninguna protección de gas", "Hilo continuo consumible bajo protección de gas activo", "Ausencia total de cualquier tipo de electrodo en el proceso"], correcta: 0 },
  { enunciado: "¿Qué medida de seguridad específica exige la soldadura por arco eléctrico?", explicacion: "Protección ocular y facial mediante careta con filtro frente a la radiación del arco.", dificultad: "media", opciones: ["Protección ocular y facial mediante careta con filtro adecuado", "Ninguna medida especial distinta de las de la soldadura oxiacetilénica", "Uso exclusivo de gafas de sol convencionales sin filtro específico", "Uso exclusivo de mascarilla frente a polvo, sin ninguna otra protección"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 16 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 16, orden: 16, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-212 creado y vinculado como Tema 16 de Oficial Planta Potabilizadora.");

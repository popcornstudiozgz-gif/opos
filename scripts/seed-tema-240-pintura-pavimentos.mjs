/**
 * Crea tema-240: "Pintura para pavimentos" — Tema 12 (numero=12,
 * bloque-2) de Oficial Pintor, Especialidad General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 10 oficial del Anexo I (bases2110.pdf, línea
 * 1460): "Pintura para pavimentos. Resinas. Barnices. Aditivos.
 * Características. Tipos. Usos. Herramientas. Equipos. Método de
 * aplicación. Fichas Técnicas. Normativa."
 *
 * Normativa: RD 227/2006 (BOE-A-2006-3377, COV) y Reglamento CLP
 * (DOUE-L-2008-82637), ya citados en temas anteriores, de aplicación a
 * las pinturas y resinas para pavimentos como productos químicos. El
 * resto es conocimiento técnico consolidado del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-240-pintura-pavimentos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-240";
const OPOSICION = "oficial-pintor-general-ayto-zaragoza";
const BLOQUE_2_ID = "77506e2f-f4c6-4512-8bf8-99d0b3bbbafd";

const RD_227_2006 = "https://www.boe.es/buscar/act.php?id=BOE-A-2006-3377";

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
  titulo: "Pintura para pavimentos",
  descripcion: "Resinas y barnices empleados en pintura de pavimentos. Aditivos, características y tipos. Herramientas y equipos específicos. Método de aplicación y fichas técnicas.",
  contenido: "Desarrolla la pintura y los revestimientos específicos para pavimentos: las resinas empleadas (epoxi, poliuretano, acrílicas) según el uso y el tráfico previstos, y los barnices de protección; los aditivos característicos de estos productos, como las cargas antideslizantes; sus tipos, características y usos según el entorno (industrial, deportivo, señalización viaria); y las herramientas, equipos y métodos de aplicación específicos de pavimentos, distintos de los empleados en paramentos verticales.",
  enlaces_boe: [
    { url: RD_227_2006, titulo: "RD 227/2006 — límites de COV en pinturas y barnices" },
  ],
  indice_estudio: [
    { url: RD_227_2006, titulo: "Resinas y barnices para pavimentos", seccion: "resinas-barnices-pavimentos", articulos: "RD 227/2006" },
    { url: "", titulo: "Aditivos, características y tipos según el uso", seccion: "aditivos-caracteristicas-tipos-pavimentos", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Herramientas, equipos y método de aplicación", seccion: "herramientas-equipos-metodo-aplicacion-pavimentos", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "resinas-barnices-pavimentos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué resina resulta especialmente adecuada para pavimentos industriales sometidos a tráfico intenso y agentes químicos?", reverso: "La resina epoxi, por su elevada resistencia mecánica, química y a la abrasión, ampliamente empleada en pavimentos de naves industriales, garajes y almacenes sometidos a un uso exigente" },
  { anverso: "¿Qué ventaja ofrece una resina de poliuretano frente a una epoxi en pavimentos expuestos a la intemperie o a los rayos UV?", reverso: "El poliuretano mantiene mejor el color y el brillo frente a la radiación ultravioleta, mientras que la resina epoxi tiende a amarillear o a perder brillo con la exposición prolongada al sol, por lo que el poliuretano resulta preferible en pavimentos exteriores" },
  { anverso: "¿Qué es un barniz de protección aplicado sobre un pavimento?", reverso: "Una capa transparente de acabado, aplicada sobre la pintura o resina de color, destinada a proteger la superficie frente al desgaste, la abrasión y los agentes químicos, prolongando la vida útil del pavimento sin alterar su aspecto visual" },
  { anverso: "¿Qué es una pintura acrílica para pavimentos, y en qué se diferencia de una resina epoxi para el mismo fin?", reverso: "Una pintura de base acuosa o disolvente, de menor resistencia mecánica y química que la resina epoxi, pero de aplicación más sencilla y menor coste, empleada habitualmente en pavimentos de tráfico ligero (aceras, señalización, zonas de escaso desgaste)" },
  { anverso: "¿Por qué es relevante que el Oficial Pintor elija la resina o pintura de pavimento adecuada al tipo de tráfico y al entorno de uso previsto?", reverso: "Porque un producto insuficientemente resistente para el uso previsto se deteriora prematuramente (desconchones, pérdida de adherencia), mientras que un producto de mayor resistencia de la estrictamente necesaria puede suponer un coste innecesario para la obra" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué resina resulta especialmente adecuada para pavimentos industriales de tráfico intenso?", explicacion: "La resina epoxi, por su elevada resistencia mecánica, química y a la abrasión.", dificultad: "facil", opciones: ["La resina epoxi", "Una pintura plástica convencional al agua", "Una pintura de silicatos exclusiva de fachadas", "Un barniz al aceite tradicional"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece el poliuretano frente a la resina epoxi en pavimentos exteriores?", explicacion: "Mantiene mejor el color y el brillo frente a la radiación ultravioleta.", dificultad: "media", opciones: ["Mantiene mejor el color y el brillo frente a los rayos UV", "Ofrece siempre una mayor resistencia mecánica que la epoxi", "Resulta siempre más económico que la resina epoxi", "No requiere ninguna preparación previa del pavimento"], correcta: 0 },
  { enunciado: "¿Qué es un barniz de protección aplicado sobre un pavimento?", explicacion: "Una capa transparente que protege frente al desgaste y los agentes químicos.", dificultad: "media", opciones: ["Una capa transparente de protección frente al desgaste", "La primera capa de color aplicada sobre el pavimento", "Un aditivo que aumenta la viscosidad de la resina", "Un disolvente empleado para limpiar herramientas"], correcta: 0 },
  { enunciado: "¿Qué diferencia una pintura acrílica para pavimentos de una resina epoxi para el mismo fin?", explicacion: "La acrílica ofrece menor resistencia mecánica y química, pero mayor sencillez de aplicación.", dificultad: "dificil", opciones: ["La acrílica ofrece menor resistencia pero mayor sencillez", "Ambos productos ofrecen exactamente la misma resistencia", "La acrílica siempre resulta más resistente que la epoxi", "La resina epoxi nunca requiere preparación del pavimento"], correcta: 0 },
  { enunciado: "¿Por qué es relevante elegir la resina adecuada al tipo de tráfico previsto en un pavimento?", explicacion: "Un producto insuficiente se deteriora prematuramente; uno excesivo supone un coste innecesario.", dificultad: "media", opciones: ["Un producto insuficiente se deteriora antes de tiempo", "El tipo de tráfico nunca influye en la elección del producto", "Siempre conviene elegir la resina de mayor resistencia posible", "La elección del producto solo depende de su color disponible"], correcta: 0 },
]);

const S2 = "aditivos-caracteristicas-tipos-pavimentos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una carga antideslizante, como aditivo en pintura de pavimentos?", reverso: "Una carga (habitualmente partículas de cuarzo, corindón o materiales similares) que se incorpora a la pintura o resina, o se espolvorea sobre la última mano aún fresca, para aumentar la rugosidad superficial y reducir el riesgo de resbalón, especialmente relevante en pavimentos húmedos o exteriores" },
  { anverso: "¿Qué es un pavimento continuo de resina (o pavimento multicapa)?", reverso: "Un sistema formado por varias capas sucesivas de resina (imprimación, capa base, en su caso capa con carga de cuarzo, y capa de acabado o sellado), que conforman un revestimiento continuo, sin juntas, de alta resistencia y fácil limpieza" },
  { anverso: "¿Qué característica exige un pavimento de pintura destinado a una zona industrial con presencia de aceites o grasas?", reverso: "Una elevada resistencia química a hidrocarburos y grasas, propia de resinas como la epoxi, que evita el reblandecimiento o el deterioro de la película en contacto con este tipo de sustancias" },
  { anverso: "¿Qué diferencia de acabado puede ofrecerse en un pavimento de resina, más allá de su color?", reverso: "Un acabado liso, brillante o mate, o un acabado texturizado o antideslizante mediante la incorporación de cargas de cuarzo, según las exigencias de uso y de seguridad frente a resbalones del espacio a tratar" },
  { anverso: "¿Por qué es especialmente relevante la resistencia a la abrasión en un pavimento de tránsito de vehículos, como el de un garaje o un almacén?", reverso: "Porque el paso repetido de ruedas sobre la superficie somete a la pintura o resina a un desgaste continuo por fricción, y una resistencia a la abrasión insuficiente provoca un desgaste prematuro, dejando visible el pavimento base y perdiendo la protección y el aspecto uniforme del acabado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una carga antideslizante en pintura de pavimentos?", explicacion: "Una carga que aumenta la rugosidad superficial reduciendo el riesgo de resbalón.", dificultad: "facil", opciones: ["Una carga que aumenta la rugosidad y reduce el resbalón", "Un pigmento que aporta color al pavimento", "Un disolvente empleado en la limpieza de herramientas", "Un aditivo que acelera el secado de la resina"], correcta: 0 },
  { enunciado: "¿Qué es un pavimento continuo de resina o pavimento multicapa?", explicacion: "Un sistema de varias capas de resina que conforma un revestimiento continuo sin juntas.", dificultad: "media", opciones: ["Un sistema de varias capas que forma un revestimiento continuo", "Una única capa de pintura aplicada directamente sobre el hormigón", "Un tipo de barniz exclusivo para superficies de madera", "Un tipo de disolvente exclusivo para resinas epoxi"], correcta: 0 },
  { enunciado: "¿Qué característica exige un pavimento industrial con presencia de aceites o grasas?", explicacion: "Elevada resistencia química a hidrocarburos y grasas.", dificultad: "media", opciones: ["Elevada resistencia química a hidrocarburos y grasas", "Un acabado exclusivamente decorativo sin ninguna resistencia", "Una elevada transparencia frente a la luz solar", "Una elevada capacidad de absorción de agua"], correcta: 0 },
  { enunciado: "¿Qué acabado puede ofrecerse en un pavimento de resina, además del color?", explicacion: "Un acabado liso, brillante, mate o texturizado antideslizante.", dificultad: "media", opciones: ["Un acabado liso, brillante, mate o texturizado", "Únicamente un acabado exclusivamente mate", "Únicamente un acabado exclusivamente brillante", "Ningún acabado distinto del color resulta posible"], correcta: 0 },
  { enunciado: "¿Por qué es relevante la resistencia a la abrasión en un pavimento de tránsito de vehículos?", explicacion: "El paso repetido de ruedas somete la superficie a desgaste continuo por fricción.", dificultad: "dificil", opciones: ["El paso repetido de vehículos somete la superficie a desgaste continuo", "La abrasión nunca resulta relevante en un pavimento de garaje", "Solo resulta relevante en pavimentos de exterior sin tráfico", "Solo resulta relevante si el pavimento es de color oscuro"], correcta: 0 },
]);

const S3 = "herramientas-equipos-metodo-aplicacion-pavimentos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué herramienta se emplea habitualmente para extender de forma uniforme una resina epoxi sobre un pavimento?", reverso: "Una llana metálica o de goma dentada, que reparte la resina en un espesor de capa uniforme, seguida habitualmente de un rodillo desaireador (rodillo de púas) que elimina las burbujas de aire atrapadas en la mezcla" },
  { anverso: "¿Qué es un rodillo desaireador o rodillo de púas, empleado en la aplicación de pavimentos de resina?", reverso: "Un rodillo con púas metálicas o plásticas que se pasa sobre la resina recién extendida, con el fin de romper y eliminar las burbujas de aire atrapadas durante la aplicación, evitando que queden defectos visibles o debilidades en la película curada" },
  { anverso: "¿Qué preparación previa del pavimento resulta habitualmente necesaria antes de aplicar una resina epoxi, más allá de la limpieza superficial?", reverso: "Un tratamiento mecánico del soporte (granallado, fresado o lijado con máquina específica) que abra el poro del hormigón y elimine lechadas de cemento, grasas o restos incrustados, mejorando la adherencia de la resina al pavimento" },
  { anverso: "¿Qué equipo específico se emplea para espolvorear la carga de cuarzo sobre una capa de resina aún fresca, en un pavimento antideslizante?", reverso: "Un espolvoreador o tamiz manual, que reparte la carga de cuarzo de forma homogénea sobre la superficie de resina fresca, antes de que esta cure, garantizando una distribución uniforme de la textura antideslizante" },
  { anverso: "¿Por qué debe respetarse un tiempo mínimo de curado de una resina epoxi antes de someter el pavimento a tránsito o a una nueva capa?", reverso: "Porque la resina epoxi cura mediante una reacción química que requiere un tiempo determinado para alcanzar sus propiedades mecánicas y de resistencia definitivas; someterla a tránsito o a una nueva capa antes de ese tiempo puede dañar la película o comprometer la adherencia de la siguiente capa" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué herramienta se emplea para extender de forma uniforme una resina epoxi sobre un pavimento?", explicacion: "Una llana metálica o de goma dentada.", dificultad: "media", opciones: ["Una llana metálica o de goma dentada", "Una brocha fina de precisión", "Una espátula de masillar de pequeño tamaño", "Un compactador de rodillo vibratorio"], correcta: 0 },
  { enunciado: "¿Qué función cumple un rodillo desaireador en la aplicación de un pavimento de resina?", explicacion: "Rompe y elimina las burbujas de aire atrapadas durante la aplicación.", dificultad: "media", opciones: ["Rompe y elimina las burbujas de aire atrapadas", "Aporta el color final a la resina aplicada", "Aumenta la viscosidad de la resina epoxi", "Acelera el proceso de curado de la resina"], correcta: 0 },
  { enunciado: "¿Qué preparación previa resulta habitualmente necesaria antes de aplicar una resina epoxi sobre hormigón?", explicacion: "Un tratamiento mecánico (granallado, fresado o lijado) que abra el poro del hormigón.", dificultad: "dificil", opciones: ["Un tratamiento mecánico que abra el poro del hormigón", "Ninguna preparación distinta de un simple barrido", "Únicamente una limpieza con agua a baja presión", "Únicamente la aplicación directa sin ninguna preparación"], correcta: 0 },
  { enunciado: "¿Qué equipo se emplea para espolvorear la carga de cuarzo en un pavimento antideslizante?", explicacion: "Un espolvoreador o tamiz manual.", dificultad: "media", opciones: ["Un espolvoreador o tamiz manual", "Una pistola de pintar convencional", "Un rodillo desaireador de púas", "Una llana metálica dentada"], correcta: 0 },
  { enunciado: "¿Por qué debe respetarse un tiempo mínimo de curado antes de someter el pavimento a tránsito?", explicacion: "La resina cura mediante una reacción química que requiere tiempo para alcanzar sus propiedades definitivas.", dificultad: "dificil", opciones: ["La resina requiere tiempo para alcanzar sus propiedades definitivas", "El tiempo de curado nunca resulta relevante en la práctica", "Solo resulta relevante si el pavimento es de color claro", "Solo resulta relevante en pavimentos de tráfico ligero"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 12 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 12, orden: 12, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-240 creado y vinculado como Tema 12 de Oficial Pintor General.");

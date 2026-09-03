/**
 * Crea tema-249: "Materias primas empleadas en Artes Gráficas" — Tema
 * 21 (numero=21, bloque-2) de Oficial Pintor, Especialidad General
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 19 oficial del Anexo I (bases2110.pdf, línea
 * 1483): "Materias Primas empleadas en Artes Gráficas. Vinilos
 * Adhesivos. Vinilo de corte. Adhesivos. Soportes del material gráfico.
 * Tipos. Usos. Manipulación. Métodos de Aplicación. Normativa."
 *
 * Nota: este punto del temario oficial de Oficial Pintor Especialidad
 * General coincide, en su enunciado, con contenido propio de artes
 * gráficas que también forma parte del temario de Oficial Pintor
 * Especialidad Gráfica (temas 7-9 de esa especialidad). Se desarrolla
 * aquí como tema independiente, con enfoque introductorio adecuado al
 * perfil generalista de esta especialidad, sin duplicar literalmente el
 * contenido más extenso de la Especialidad Gráfica.
 *
 * Normativa: Reglamento CLP (DOUE-L-2008-82637), ya citado en varios
 * temas de este bloque, de aplicación al etiquetado de adhesivos y
 * disolventes de limpieza de vinilos. El resto (materiales y técnica)
 * es conocimiento técnico consolidado del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-249-materias-primas-artes-graficas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-249";
const OPOSICION = "oficial-pintor-general-ayto-zaragoza";
const BLOQUE_2_ID = "77506e2f-f4c6-4512-8bf8-99d0b3bbbafd";

const REGLAMENTO_CLP = "https://www.boe.es/buscar/doc.php?id=DOUE-L-2008-82637";

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
  titulo: "Materias primas empleadas en artes gráficas",
  descripcion: "Vinilos adhesivos y vinilo de corte. Adhesivos empleados en rotulación. Soportes del material gráfico: tipos y usos. Manipulación y métodos de aplicación básicos.",
  contenido: "Desarrolla, con un enfoque introductorio adecuado al perfil generalista de esta especialidad, las materias primas básicas empleadas en artes gráficas que un Oficial Pintor puede necesitar conocer para trabajos puntuales de rotulación o señalización: los vinilos adhesivos y el vinilo de corte, y su diferencia respecto a una pintura convencional; los adhesivos empleados en la fijación de estos materiales; y los soportes habituales del material gráfico, sus tipos, usos y las precauciones básicas de manipulación y aplicación.",
  enlaces_boe: [
    { url: REGLAMENTO_CLP, titulo: "Reglamento (CE) 1272/2008 (CLP) — clasificación, etiquetado y envasado" },
  ],
  indice_estudio: [
    { url: "", titulo: "Vinilos adhesivos y vinilo de corte", seccion: "vinilos-adhesivos-vinilo-corte", articulos: "Conocimiento técnico del oficio" },
    { url: REGLAMENTO_CLP, titulo: "Adhesivos empleados en rotulación", seccion: "adhesivos-empleados-rotulacion", articulos: "Reglamento CLP" },
    { url: "", titulo: "Soportes del material gráfico: tipos, usos y manipulación", seccion: "soportes-material-grafico-tipos-usos", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "vinilos-adhesivos-vinilo-corte";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un vinilo adhesivo, como material gráfico?", reverso: "Una lámina fina de PVC (cloruro de polivinilo), coloreada en masa o impresa, con una capa adhesiva en su cara posterior protegida por un papel siliconado, empleada para rotular, señalizar o decorar superficies mediante su aplicación directa" },
  { anverso: "¿Qué es el vinilo de corte, y en qué se diferencia de un vinilo impreso?", reverso: "Un vinilo adhesivo de color uniforme del que se recortan directamente letras, formas o logotipos mediante una plotter de corte, sin ningún proceso de impresión previo, a diferencia de un vinilo impreso, que recibe primero una imagen o diseño mediante impresión digital y se recorta después según su contorno" },
  { anverso: "¿Qué diferencia fundamental existe entre aplicar un vinilo adhesivo y aplicar una pintura convencional sobre una superficie?", reverso: "El vinilo es un material prefabricado que se adhiere físicamente a la superficie mediante su capa de adhesivo, sin ningún proceso de secado ni de curado químico, mientras que la pintura se aplica en estado líquido y forma su acabado mediante un proceso de secado o curado sobre el propio soporte" },
  { anverso: "¿Qué es el papel de transferencia (o papel aplicación), empleado en la colocación de un vinilo de corte recortado?", reverso: "Una lámina adhesiva de baja adherencia que se coloca sobre las letras o formas ya recortadas del vinilo de corte, permitiendo levantarlas todas juntas del papel siliconado y trasladarlas de una sola vez a la superficie definitiva, manteniendo su posición relativa exacta" },
  { anverso: "¿Qué característica de un vinilo autoadhesivo resulta relevante al elegirlo para una aplicación en exterior frente a una en interior?", reverso: "Su durabilidad frente a la intemperie (resistencia a los rayos UV, a la lluvia y a los cambios de temperatura), dado que existen formulaciones de vinilo específicamente pensadas para uso exterior de larga duración, frente a otras de menor coste orientadas a un uso interior o temporal" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un vinilo adhesivo, como material gráfico?", explicacion: "Una lámina fina de PVC con capa adhesiva, empleada para rotular o decorar superficies.", dificultad: "facil", opciones: ["Una lámina de PVC con capa adhesiva para rotular superficies", "Una pintura líquida de secado rápido para exteriores", "Un tipo de barniz transparente de protección", "Un adhesivo empleado en la colocación de papel pintado"], correcta: 0 },
  { enunciado: "¿En qué se diferencia el vinilo de corte de un vinilo impreso?", explicacion: "El de corte se recorta directamente sin impresión previa; el impreso recibe una imagen antes de recortarse.", dificultad: "media", opciones: ["El de corte se recorta sin impresión previa", "Ambos tipos de vinilo son exactamente idénticos", "El vinilo impreso nunca puede recortarse posteriormente", "El vinilo de corte siempre incluye una imagen impresa"], correcta: 0 },
  { enunciado: "¿Qué diferencia fundamental existe entre aplicar un vinilo y aplicar una pintura convencional?", explicacion: "El vinilo se adhiere físicamente sin curado químico; la pintura forma su acabado mediante secado o curado.", dificultad: "dificil", opciones: ["El vinilo se adhiere físicamente, sin curado químico", "Ambos procesos son exactamente equivalentes en cualquier caso", "La pintura nunca requiere ningún proceso de secado", "El vinilo siempre requiere un proceso de curado químico"], correcta: 0 },
  { enunciado: "¿Qué es el papel de transferencia empleado en la colocación de un vinilo de corte?", explicacion: "Una lámina de baja adherencia que traslada las formas recortadas de una vez a la superficie definitiva.", dificultad: "media", opciones: ["Una lámina que traslada las formas recortadas a la superficie", "El propio papel siliconado que protege el adhesivo del vinilo", "Un adhesivo líquido empleado para fijar el vinilo", "Un tipo de vinilo exclusivo para uso en exteriores"], correcta: 0 },
  { enunciado: "¿Qué característica resulta relevante al elegir un vinilo para una aplicación en exterior?", explicacion: "Su durabilidad frente a la intemperie, rayos UV, lluvia y cambios de temperatura.", dificultad: "media", opciones: ["Su durabilidad frente a la intemperie", "El color del vinilo, sin ninguna otra consideración", "El precio del vinilo, sin ninguna otra consideración", "El tamaño del rollo de vinilo disponible"], correcta: 0 },
]);

const S2 = "adhesivos-empleados-rotulacion";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué función cumple la capa adhesiva de un vinilo autoadhesivo?", reverso: "Fijar de forma permanente o temporal (según su formulación) la lámina de vinilo a la superficie de destino, mediante un adhesivo sensible a la presión que se activa al aplicar una ligera fuerza sobre el material, sin necesidad de calor ni de disolventes adicionales" },
  { anverso: "¿Qué diferencia existe entre un adhesivo permanente y uno removible (o repositable), empleados en vinilos de rotulación?", reverso: "El adhesivo permanente crea una unión de alta resistencia, difícil de retirar sin dañar la superficie o el propio vinilo; el adhesivo removible permite despegar el vinilo sin dejar residuos ni dañar el soporte, adecuado para señalización temporal o cambiante" },
  { anverso: "¿Qué información de la etiqueta o ficha de seguridad de un adhesivo o disolvente de limpieza empleado en rotulación resulta relevante consultar antes de su uso, conforme al Reglamento CLP?", reverso: "Los pictogramas de peligro, las indicaciones de peligro (frases H) y los consejos de prudencia (frases P), que informan sobre riesgos como la inflamabilidad o la irritación cutánea y respiratoria, y sobre las medidas de protección a adoptar durante su manipulación" },
  { anverso: "¿Qué producto se emplea habitualmente para eliminar residuos de adhesivo tras retirar un vinilo antiguo de una superficie?", reverso: "Un disolvente o eliminador de adhesivos específico (a base de cítricos u otros disolventes suaves), aplicado con precaución para no dañar el acabado de la superficie subyacente, evitando el uso de disolventes agresivos sobre superficies delicadas o ya pintadas" },
  { anverso: "¿Por qué debe aplicarse un vinilo autoadhesivo sobre una superficie limpia, seca y libre de grasa?", reverso: "Porque la presencia de polvo, humedad o grasa reduce significativamente la capacidad de adherencia del adhesivo sensible a la presión, provocando que el vinilo se despegue prematuramente o que aparezcan burbujas de aire bajo la lámina durante su aplicación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué función cumple la capa adhesiva de un vinilo autoadhesivo?", explicacion: "Fijar la lámina a la superficie mediante un adhesivo sensible a la presión.", dificultad: "facil", opciones: ["Fijar la lámina mediante un adhesivo sensible a la presión", "Aportar el color final del vinilo aplicado", "Proteger el vinilo frente a la radiación ultravioleta", "Facilitar el corte del vinilo mediante plotter"], correcta: 0 },
  { enunciado: "¿Qué diferencia un adhesivo permanente de uno removible en vinilos de rotulación?", explicacion: "El permanente crea una unión de alta resistencia; el removible permite despegarlo sin dañar el soporte.", dificultad: "media", opciones: ["El removible permite despegarlo sin dañar el soporte", "Ambos tipos de adhesivo son exactamente equivalentes", "El adhesivo permanente siempre resulta más económico", "El adhesivo removible nunca puede emplearse en exteriores"], correcta: 0 },
  { enunciado: "¿Qué información debe consultarse en la etiqueta de un adhesivo o disolvente conforme al Reglamento CLP?", explicacion: "Pictogramas de peligro, indicaciones H y consejos de prudencia P.", dificultad: "media", opciones: ["Pictogramas de peligro, indicaciones H y consejos P", "Únicamente el precio de venta del producto", "Únicamente la marca comercial del fabricante", "Únicamente el color del envase del producto"], correcta: 0 },
  { enunciado: "¿Qué producto se emplea para eliminar residuos de adhesivo tras retirar un vinilo antiguo?", explicacion: "Un disolvente o eliminador de adhesivos específico, aplicado con precaución.", dificultad: "media", opciones: ["Un disolvente o eliminador de adhesivos específico", "Agua a alta presión exclusivamente, sin ningún otro producto", "Ningún producto resulta necesario en la práctica habitual", "Un decapante de pintura convencional sin ninguna precaución"], correcta: 0 },
  { enunciado: "¿Por qué debe aplicarse un vinilo sobre una superficie limpia, seca y libre de grasa?", explicacion: "El polvo, la humedad o la grasa reducen la capacidad de adherencia del adhesivo.", dificultad: "dificil", opciones: ["Reducen la capacidad de adherencia del adhesivo", "La limpieza previa nunca influye en la adherencia del vinilo", "Solo resulta relevante en vinilos de tipo removible", "Solo resulta relevante en aplicaciones de exterior"], correcta: 0 },
]);

const S3 = "soportes-material-grafico-tipos-usos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un soporte, en el contexto del material gráfico sobre el que se aplica un vinilo o una impresión?", reverso: "La superficie física final sobre la que se coloca el vinilo o el material gráfico (una pared, un vehículo, un panel, un cristal), cuyas características (porosidad, curvatura, textura) condicionan el tipo de vinilo y la técnica de aplicación más adecuados" },
  { anverso: "¿Qué precaución exige aplicar un vinilo sobre una superficie curva o con relieve, frente a una superficie plana?", reverso: "Emplear una técnica de aplicación en húmedo (con agua jabonosa que facilita el reposicionamiento) y, en su caso, calor (con pistola de aire caliente) para dar flexibilidad al vinilo y adaptarlo a la curvatura, evitando arrugas o burbujas de aire que serían más difíciles de eliminar en una superficie irregular" },
  { anverso: "¿Qué es un panel compuesto de aluminio (o panel dibond), habitual como soporte rígido en señalización y rotulación?", reverso: "Un panel formado por dos láminas finas de aluminio con un núcleo intermedio de polietileno, ligero, rígido y resistente a la intemperie, muy empleado como soporte para carteles, señalización y paneles informativos sobre los que se aplica un vinilo o una impresión directa" },
  { anverso: "¿Qué diferencia existe, como soporte, entre aplicar un vinilo sobre un cristal (escaparate, ventana) y aplicarlo sobre una pared pintada?", reverso: "El cristal es una superficie no porosa y lisa que favorece una adherencia uniforme pero también hace más visible cualquier burbuja de aire atrapada; una pared pintada puede presentar una porosidad y una textura variables según el tipo de pintura y su estado, lo que puede afectar a la adherencia final del vinilo" },
  { anverso: "¿Por qué es importante que el Oficial Pintor identifique correctamente el tipo de soporte antes de aplicar un elemento gráfico, del mismo modo que se estudió para la pintura convencional en temas anteriores?", reverso: "Porque, igual que ocurre con la pintura, cada soporte exige una preparación y una técnica de aplicación distintas; un vinilo mal adaptado al tipo de soporte puede despegarse prematuramente, arrugarse o presentar un acabado defectuoso, comprometiendo el resultado del trabajo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un soporte, en el contexto del material gráfico?", explicacion: "La superficie física final sobre la que se coloca el vinilo o el material gráfico.", dificultad: "facil", opciones: ["La superficie final sobre la que se coloca el material gráfico", "El propio vinilo antes de ser recortado", "El adhesivo empleado para fijar el vinilo", "El papel de transferencia usado en la colocación"], correcta: 0 },
  { enunciado: "¿Qué técnica facilita aplicar un vinilo sobre una superficie curva o con relieve?", explicacion: "Aplicación en húmedo con agua jabonosa y, en su caso, calor para dar flexibilidad.", dificultad: "dificil", opciones: ["Aplicación en húmedo con agua jabonosa y calor", "Aplicación exclusivamente en seco sin ninguna precaución", "Aplicación exclusivamente con disolvente orgánico", "Ninguna técnica específica distinta de una superficie plana"], correcta: 0 },
  { enunciado: "¿Qué es un panel compuesto de aluminio (dibond)?", explicacion: "Un panel de dos láminas de aluminio con núcleo de polietileno, ligero y resistente a la intemperie.", dificultad: "media", opciones: ["Un panel de aluminio con núcleo de polietileno", "Un tipo de vinilo específico para exteriores", "Un adhesivo removible de alta resistencia", "Un disolvente empleado en la limpieza de vinilos"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre aplicar un vinilo sobre un cristal y sobre una pared pintada?", explicacion: "El cristal es no poroso y liso; la pared puede tener porosidad y textura variables que afectan a la adherencia.", dificultad: "dificil", opciones: ["La pared puede tener porosidad variable que afecta la adherencia", "Ambos soportes ofrecen exactamente la misma adherencia", "El cristal siempre resulta menos adecuado que la pared pintada", "La pared nunca influye en la adherencia final del vinilo"], correcta: 0 },
  { enunciado: "¿Por qué es importante identificar correctamente el tipo de soporte antes de aplicar un elemento gráfico?", explicacion: "Cada soporte exige una preparación y técnica distintas; un vinilo mal adaptado puede despegarse o arrugarse.", dificultad: "media", opciones: ["Cada soporte exige una preparación y técnica distintas", "El tipo de soporte nunca influye en el resultado del vinilo", "Todos los soportes admiten exactamente la misma técnica", "Solo resulta relevante en soportes de gran tamaño"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 21 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 21, orden: 21, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-249 creado y vinculado como Tema 21 de Oficial Pintor General.");

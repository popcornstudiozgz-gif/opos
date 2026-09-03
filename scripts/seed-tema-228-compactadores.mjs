/**
 * Crea tema-228: "Compactadores" — Tema 16 (numero=16, bloque-2) de
 * Oficial Conductor, Especialidad Maquinaria Pesada (Ayto. de Zaragoza).
 *
 * Corresponde al TEMA 14 oficial del Anexo I (bases2110.pdf, línea
 * 2144): "Compactadores. Tipos, esquema y funcionamiento. Método de
 * trabajo."
 *
 * Normativa verificada mediante WebSearch en esta sesión:
 * - RD 1311/2005, de 4 de noviembre, sobre la protección de la salud y
 *   la seguridad de los trabajadores frente a los riesgos derivados de
 *   la exposición a vibraciones mecánicas (BOE-A-2005-18262) —
 *   especialmente relevante en el trabajo con rodillos compactadores
 *   vibratorios, por la vibración de cuerpo completo transmitida a la
 *   persona operadora.
 * - RD 1644/2008 (BOE-A-2008-16387), ya citado, sobre requisitos
 *   esenciales de seguridad de las máquinas.
 * El resto del contenido (tipos y funcionamiento) es conocimiento
 * técnico consolidado del oficio, sin ley única adicional que lo regule.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-228-compactadores.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-228";
const OPOSICION = "oficial-conductor-maquinaria-pesada-ayto-zaragoza";
const BLOQUE_2_ID = "388bfbfc-396e-4de2-8897-09532d6a0bcd";

const RD_1311_2005 = "https://www.boe.es/buscar/act.php?id=BOE-A-2005-18262";
const RD_1644_2008 = "https://www.boe.es/buscar/act.php?id=BOE-A-2008-16387";

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
  titulo: "Compactadores",
  descripcion: "Tipos de compactadores, esquema y funcionamiento. Método de trabajo y grado de compactación. La protección frente a las vibraciones mecánicas transmitidas por el compactador (RD 1311/2005).",
  contenido: "Desarrolla los compactadores como maquinaria de obra pública destinada a aumentar la densidad de un material (tierra, zahorra, aglomerado asfáltico) mediante la aplicación de peso estático, vibración o impacto: sus tipos según el elemento compactador (rodillo liso, pata de cabra, neumáticos, placa vibrante) y según su sistema de compactación; su esquema constructivo y funcionamiento; y su método de trabajo, incluida la exigencia de controlar el grado de compactación alcanzado. Se incluye la protección de la persona operadora frente a las vibraciones mecánicas de cuerpo completo transmitidas por la máquina, conforme al RD 1311/2005.",
  enlaces_boe: [
    { url: RD_1311_2005, titulo: "RD 1311/2005 — protección frente a riesgos derivados de la exposición a vibraciones mecánicas" },
    { url: RD_1644_2008, titulo: "RD 1644/2008 — comercialización y puesta en servicio de las máquinas" },
  ],
  indice_estudio: [
    { url: RD_1644_2008, titulo: "Tipos, esquema y funcionamiento de los compactadores", seccion: "compactadores-tipos-esquema-funcionamiento", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Método de trabajo y grado de compactación", seccion: "compactadores-metodo-trabajo-grado-compactacion", articulos: "Conocimiento técnico del oficio" },
    { url: RD_1311_2005, titulo: "Vibraciones mecánicas: protección de la persona operadora (RD 1311/2005)", seccion: "vibraciones-mecanicas-proteccion-operador", articulos: "RD 1311/2005" },
  ],
}]);

const S1 = "compactadores-tipos-esquema-funcionamiento";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un compactador, como máquina de obra pública?", reverso: "Una máquina autopropulsada destinada a aumentar la densidad de un material (tierra, zahorra, mezcla asfáltica) mediante la aplicación de una carga estática, dinámica (vibración) o de impacto, reduciendo los huecos de aire y mejorando su capacidad portante" },
  { anverso: "¿Qué es un compactador de rodillo liso?", reverso: "Un compactador dotado de uno o dos tambores metálicos lisos, empleado habitualmente para la compactación de materiales granulares de grano fino o de mezclas asfálticas, aportando una superficie final lisa y uniforme" },
  { anverso: "¿Qué es un compactador de pata de cabra (pie de carnero)?", reverso: "Un compactador cuyo tambor incorpora numerosos salientes o \"patas\" que penetran en el material, siendo especialmente adecuado para compactar suelos cohesivos (arcillosos) en tongadas de relleno, al amasar y compactar el material desde su interior" },
  { anverso: "¿Qué es un compactador de neumáticos?", reverso: "Un compactador que utiliza varias filas de neumáticos de gran tamaño, con un lastre variable, que compacta mediante el amasado producido por la deformación del propio neumático, siendo adecuado para materiales granulares mixtos y para el sellado de la superficie de mezclas asfálticas" },
  { anverso: "¿Qué es una placa vibrante compactadora?", reverso: "Un pequeño equipo de compactación, manual o guiado, dotado de una placa metálica sobre la que actúa un sistema vibratorio, empleado en trabajos de compactación de pequeña superficie donde no puede acceder un rodillo compactador (zanjas estrechas, junto a estructuras)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un compactador, como máquina de obra pública?", explicacion: "Una máquina que aumenta la densidad de un material aplicando carga estática, vibración o impacto.", dificultad: "facil", opciones: ["Una máquina que aumenta la densidad de un material", "Una máquina exclusiva para la excavación de zanjas", "Una máquina exclusiva para el transporte de materiales", "Una máquina exclusiva para la nivelación fina de firmes"], correcta: 0 },
  { enunciado: "¿Para qué tipo de material resulta especialmente adecuado un compactador de rodillo liso?", explicacion: "Materiales granulares de grano fino o mezclas asfálticas, con superficie final lisa y uniforme.", dificultad: "media", opciones: ["Materiales granulares finos y mezclas asfálticas", "Exclusivamente suelos arcillosos de relleno profundo", "Exclusivamente roca de gran tamaño sin fragmentar", "Exclusivamente materiales líquidos o semilíquidos"], correcta: 0 },
  { enunciado: "¿Qué es un compactador de pata de cabra?", explicacion: "Un compactador con salientes que penetran el material, adecuado para suelos cohesivos en tongadas.", dificultad: "media", opciones: ["Un compactador con salientes adecuado para suelos cohesivos", "Un compactador exclusivo para mezclas asfálticas superficiales", "Un compactador exclusivo para zanjas de pequeña anchura", "Un tipo de motoniveladora con hoja compactadora incorporada"], correcta: 0 },
  { enunciado: "¿Cómo compacta un compactador de neumáticos?", explicacion: "Mediante el amasado producido por la deformación del propio neumático bajo carga.", dificultad: "dificil", opciones: ["Mediante el amasado por deformación del propio neumático", "Mediante un tambor metálico liso de gran diámetro", "Mediante salientes o patas que penetran el material", "Mediante un sistema de percusión hidráulica repetida"], correcta: 0 },
  { enunciado: "¿En qué situación resulta especialmente útil una placa vibrante compactadora?", explicacion: "En trabajos de compactación de pequeña superficie donde no accede un rodillo compactador.", dificultad: "media", opciones: ["En zonas de pequeña superficie o difícil acceso", "En la compactación de grandes explanadas abiertas", "En el sellado final de una carretera de varios carriles", "En la compactación de materiales exclusivamente líquidos"], correcta: 0 },
]);

const S2 = "compactadores-metodo-trabajo-grado-compactacion";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿En qué consiste el método básico de trabajo de un compactador de rodillo?", reverso: "Realizar pasadas sucesivas y solapadas sobre la superficie a compactar, avanzando a una velocidad moderada y constante, cubriendo toda la anchura de trabajo mediante el solape parcial entre pasadas consecutivas, hasta alcanzar el número de pasadas previsto" },
  { anverso: "¿Qué es una tongada, en el contexto de la compactación de rellenos?", reverso: "Cada una de las capas de material de espesor limitado (habitualmente entre 20 y 30 cm antes de compactar, según el tipo de material y de compactador) que se extiende y compacta de forma sucesiva hasta alcanzar el espesor total de relleno previsto en el proyecto" },
  { anverso: "¿Por qué se compacta el material en tongadas de espesor limitado, en lugar de compactar todo el relleno de una vez?", reverso: "Porque la energía de compactación transmitida por la máquina solo resulta efectiva hasta una determinada profundidad; compactar tongadas más gruesas de lo recomendado deja la parte inferior insuficientemente compactada, comprometiendo la capacidad portante del conjunto" },
  { anverso: "¿Qué es el grado de compactación (o grado Proctor) de un material?", reverso: "El porcentaje que relaciona la densidad seca alcanzada en el terreno tras la compactación con la densidad máxima obtenida en el ensayo Proctor de laboratorio, utilizado como criterio de control de calidad para verificar que la compactación ejecutada en obra cumple el mínimo exigido en el proyecto" },
  { anverso: "¿Qué relación existe entre la humedad del material y la eficacia de la compactación?", reverso: "Existe una humedad óptima de compactación para cada material, por debajo o por encima de la cual la compactación resulta menos eficaz; un material demasiado seco ofrece mayor fricción interna, y uno demasiado húmedo puede generar sobrepresión de agua que impide alcanzar la densidad máxima" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿En qué consiste el método básico de trabajo de un compactador de rodillo?", explicacion: "Pasadas sucesivas y solapadas a velocidad constante hasta alcanzar el número previsto.", dificultad: "media", opciones: ["Pasadas sucesivas y solapadas hasta el número previsto", "Una única pasada a máxima velocidad sobre toda la superficie", "Excavación previa del material antes de cada pasada", "Transporte del material compactado a un punto de acopio"], correcta: 0 },
  { enunciado: "¿Qué es una tongada, en la compactación de rellenos?", explicacion: "Cada capa de material de espesor limitado que se extiende y compacta sucesivamente.", dificultad: "media", opciones: ["Cada capa de material de espesor limitado y sucesivo", "El conjunto total del relleno ya finalizado", "El material sobrante retirado tras la compactación", "Un tipo específico de compactador de neumáticos"], correcta: 0 },
  { enunciado: "¿Por qué se compacta en tongadas de espesor limitado en lugar de todo el relleno de una vez?", explicacion: "La energía de compactación solo es efectiva hasta cierta profundidad.", dificultad: "dificil", opciones: ["La energía de compactación solo es efectiva hasta cierta profundidad", "No existe ninguna razón técnica real para esta práctica", "Únicamente por motivos de rapidez en la ejecución", "Únicamente porque lo exige el color del material a compactar"], correcta: 0 },
  { enunciado: "¿Qué es el grado de compactación o grado Proctor de un material?", explicacion: "El porcentaje entre la densidad alcanzada en obra y la densidad máxima del ensayo Proctor.", dificultad: "dificil", opciones: ["El porcentaje entre densidad alcanzada y densidad máxima Proctor", "El número total de pasadas realizadas con el compactador", "El peso total del compactador empleado en la obra", "La velocidad de avance del compactador durante el trabajo"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre la humedad del material y la eficacia de la compactación?", explicacion: "Existe una humedad óptima; por debajo o por encima de ella, la compactación es menos eficaz.", dificultad: "media", opciones: ["Existe una humedad óptima para una compactación eficaz", "La humedad del material no influye en ningún caso", "Cuanta más humedad, siempre mejor resulta la compactación", "Cuanta menos humedad, siempre mejor resulta la compactación"], correcta: 0 },
]);

const S3 = "vibraciones-mecanicas-proteccion-operador";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué regula el RD 1311/2005 en relación con el trabajo de operador de un compactador vibratorio?", reverso: "La protección de la salud y la seguridad de los trabajadores frente a los riesgos derivados de la exposición a vibraciones mecánicas, distinguiendo entre la vibración transmitida al sistema mano-brazo y la vibración de cuerpo completo, esta última especialmente relevante en el puesto de operador de un compactador" },
  { anverso: "¿Qué es la vibración de cuerpo completo, a efectos del RD 1311/2005?", reverso: "La vibración mecánica que se transmite al cuerpo entero de la persona trabajadora, habitualmente a través del asiento del vehículo o máquina, y que puede entrañar riesgos para su salud y seguridad, en particular lumbalgias y lesiones de la columna vertebral" },
  { anverso: "¿Qué medidas puede adoptar el Ayuntamiento u organismo empleador para reducir la exposición a vibraciones de un operador de compactador?", reverso: "Dotar a la máquina de un asiento con suspensión neumática o mecánica que amortigüe la vibración, limitar el tiempo de exposición diaria mediante rotación de tareas, y realizar el mantenimiento adecuado de la máquina para evitar vibraciones anómalas por desgaste" },
  { anverso: "¿Qué valores establece el RD 1311/2005 en relación con la exposición diaria a vibraciones de cuerpo completo?", reverso: "Un valor de exposición diaria que da lugar a una acción (a partir del cual deben adoptarse medidas técnicas u organizativas) y un valor límite de exposición diaria que no debe superarse en ningún caso, ambos normalizados a un período de referencia de ocho horas" },
  { anverso: "¿Por qué es especialmente relevante el RD 1311/2005 para el puesto de Oficial Conductor de Maquinaria Pesada, más allá del trabajo específico con compactadores?", reverso: "Porque buena parte de la maquinaria de obra pública que opera (excavadora, pala cargadora, motoniveladora, bulldozer) transmite igualmente vibraciones de cuerpo completo a la persona operadora, por lo que la evaluación y las medidas preventivas de este RD resultan aplicables, en mayor o menor medida, a todo su puesto de trabajo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué regula el RD 1311/2005?", explicacion: "La protección de los trabajadores frente a los riesgos derivados de la exposición a vibraciones mecánicas.", dificultad: "facil", opciones: ["La protección frente a los riesgos por vibraciones mecánicas", "Exclusivamente la comercialización y puesta en servicio de máquinas", "Exclusivamente los equipos de protección individual", "Exclusivamente las condiciones generales de los lugares de trabajo"], correcta: 0 },
  { enunciado: "¿Qué es la vibración de cuerpo completo, a efectos del RD 1311/2005?", explicacion: "La vibración transmitida al cuerpo entero, habitualmente a través del asiento del vehículo o máquina.", dificultad: "media", opciones: ["La vibración transmitida al cuerpo entero por el asiento", "La vibración transmitida exclusivamente a las manos", "La vibración transmitida exclusivamente a los pies", "Un tipo de vibración que solo afecta al sistema auditivo"], correcta: 0 },
  { enunciado: "¿Qué medida puede reducir la exposición a vibraciones de un operador de compactador?", explicacion: "Un asiento con suspensión que amortigüe la vibración, entre otras medidas.", dificultad: "media", opciones: ["Un asiento con suspensión que amortigüe la vibración", "Aumentar la velocidad de avance del compactador", "Eliminar por completo el sistema de amortiguación del asiento", "Ninguna medida es posible frente a este tipo de riesgo"], correcta: 0 },
  { enunciado: "¿Qué establece el RD 1311/2005 respecto a la exposición diaria a vibraciones?", explicacion: "Un valor que da lugar a una acción y un valor límite que no debe superarse, normalizados a 8 horas.", dificultad: "dificil", opciones: ["Un valor de acción y un valor límite normalizados a 8 horas", "Ningún valor de referencia numérico concreto", "Un valor único aplicable exclusivamente a compactadores", "Un valor límite que solo aplica a trabajos nocturnos"], correcta: 0 },
  { enunciado: "¿Por qué resulta relevante el RD 1311/2005 más allá del trabajo específico con compactadores?", explicacion: "Buena parte de la maquinaria de obra pública transmite igualmente vibraciones de cuerpo completo.", dificultad: "media", opciones: ["Otra maquinaria de obra pública también transmite vibraciones", "Solo resulta aplicable al compactador, ninguna otra máquina", "No guarda relación con el resto de maquinaria de la oposición", "Solo resulta aplicable si la máquina supera diez años de uso"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 16 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 16, orden: 16, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-228 creado y vinculado como Tema 16 de Oficial Conductor Maquinaria Pesada.");

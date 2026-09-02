/**
 * Crea tema-157: "Propiedades y ensayos de los materiales" — Tema 9
 * (numero=9, bloque-2) de Oficial Herrero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 7 oficial del Anexo I (bases2110.pdf, línea 1253):
 *   "Propiedades y ensayos de los materiales: Cohesión, Elasticidad,
 *   Plasticidad, Dureza, Tenacidad, Fatiga, Resiliencia."
 *
 * Conocimiento técnico consolidado de ciencia de materiales, sin una ley
 * española que lo regule como tal — mismo criterio que temas anteriores
 * de esta oposición. Búsqueda previa realizada conforme al estándar de
 * sourcing del proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-157-propiedades-ensayos-materiales.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-157";
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
  titulo: "Propiedades y ensayos de los materiales",
  descripcion: "Cohesión, elasticidad, plasticidad, dureza, tenacidad, fatiga, resiliencia.",
  contenido: "Desarrolla las propiedades mecánicas fundamentales de los materiales metálicos empleados en el oficio de herrero: cohesión, elasticidad y plasticidad; dureza y tenacidad; y fatiga y resiliencia, junto con una introducción a los ensayos técnicos habituales para determinar cada una de estas propiedades.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Cohesión, elasticidad y plasticidad", seccion: "cohesion-elasticidad-plasticidad", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Dureza y tenacidad", seccion: "dureza-tenacidad", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Fatiga y resiliencia. Ensayos de materiales", seccion: "fatiga-resiliencia-ensayos", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "cohesion-elasticidad-plasticidad";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la cohesión de un material?", reverso: "La fuerza de atracción interna entre las partículas (átomos, moléculas) que componen un material, responsable de que se mantenga unido como un sólido y se oponga a su separación o fractura" },
  { anverso: "¿Qué es la elasticidad de un material?", reverso: "La propiedad por la cual un material deformado por la aplicación de una carga recupera su forma y dimensiones originales al cesar dicha carga, siempre que no se supere su límite elástico" },
  { anverso: "¿Qué es la plasticidad de un material?", reverso: "La propiedad por la cual un material, al superar su límite elástico, sufre una deformación permanente (no recuperable) sin llegar a romperse, conservando su nueva forma incluso al cesar la carga aplicada" },
  { anverso: "¿Qué relación existe entre la elasticidad y la plasticidad de un material metálico como el acero?", reverso: "Son propiedades complementarias que definen dos fases sucesivas del comportamiento del material frente a una carga creciente: primero se comporta de forma elástica (hasta el límite elástico) y, superado ese límite, de forma plástica" },
  { anverso: "¿Por qué es especialmente relevante la plasticidad de un metal para las operaciones de forja propias del oficio de herrero?", reverso: "Porque la forja aprovecha precisamente la deformación plástica del metal caliente para darle la forma deseada mediante golpeo o presión, sin que la pieza se rompa durante el conformado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la cohesión de un material?", explicacion: "La fuerza de atracción interna entre las partículas que lo componen.", dificultad: "facil", opciones: ["La fuerza de atracción interna entre sus partículas", "La capacidad de recuperar su forma tras una deformación", "La capacidad de absorber energía sin romperse", "La resistencia a la penetración de otro material más duro"], correcta: 0 },
  { enunciado: "¿Qué es la elasticidad de un material?", explicacion: "La capacidad de recuperar su forma original al cesar la carga aplicada.", dificultad: "facil", opciones: ["La capacidad de recuperar su forma original tras una carga", "La capacidad de deformarse de forma permanente sin romperse", "La resistencia a la penetración de otro material más duro", "La capacidad de absorber energía de un impacto sin fracturarse"], correcta: 0 },
  { enunciado: "¿Qué es la plasticidad de un material?", explicacion: "La capacidad de sufrir una deformación permanente sin romperse.", dificultad: "media", opciones: ["La capacidad de sufrir una deformación permanente sin romperse", "La capacidad de recuperar siempre su forma original", "La resistencia máxima antes de la rotura del material", "La capacidad de absorber energía de un impacto sin fracturarse"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre elasticidad y plasticidad frente a una carga creciente?", explicacion: "Son fases sucesivas: primero elástica, y superado el límite elástico, plástica.", dificultad: "media", opciones: ["Son fases sucesivas: primero elástica, luego plástica", "Son exactamente la misma propiedad con distinto nombre", "La plasticidad siempre precede a la fase elástica", "Ambas propiedades son mutuamente excluyentes en cualquier material"], correcta: 0 },
  { enunciado: "¿Por qué es relevante la plasticidad del metal caliente para las operaciones de forja?", explicacion: "La forja aprovecha la deformación plástica para dar forma al metal sin romperlo.", dificultad: "media", opciones: ["La forja aprovecha la deformación plástica para dar forma al metal", "La forja requiere que el metal se comporte de forma exclusivamente elástica", "La plasticidad impide cualquier operación de conformado del metal", "La forja no guarda ninguna relación con la plasticidad del material"], correcta: 0 },
]);

const S2 = "dureza-tenacidad";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la dureza de un material?", reverso: "La resistencia que opone un material a ser rayado, penetrado o desgastado por otro material o cuerpo más duro" },
  { anverso: "¿Qué es un ensayo de dureza?", reverso: "Un procedimiento normalizado que mide la resistencia de un material a la penetración de un indentador (bola, cono o pirámide) bajo una carga determinada, expresando el resultado en una escala de dureza (por ejemplo, Brinell, Rockwell o Vickers)" },
  { anverso: "¿Qué es la tenacidad de un material?", reverso: "La capacidad de un material para absorber energía y deformarse plásticamente antes de romperse, es decir, su resistencia a la fractura frágil" },
  { anverso: "¿Qué relación existe habitualmente entre la dureza y la tenacidad de un acero tratado térmicamente?", reverso: "Suelen ser propiedades inversamente relacionadas: un aumento de la dureza (por ejemplo, mediante temple) tiende a reducir la tenacidad del material, haciéndolo más frágil, y viceversa" },
  { anverso: "¿Por qué necesita el herrero encontrar un equilibrio entre dureza y tenacidad al fabricar una herramienta de corte?", reverso: "Porque una dureza excesiva sin tenacidad suficiente haría que la herramienta se astillara con facilidad, mientras que una tenacidad excesiva sin dureza suficiente haría que el filo se desgastara o deformara rápidamente en uso" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es la dureza de un material?", explicacion: "La resistencia a ser rayado, penetrado o desgastado por otro material más duro.", dificultad: "facil", opciones: ["La resistencia a ser rayado, penetrado o desgastado", "La capacidad de recuperar su forma tras una carga", "La capacidad de absorber energía sin romperse", "La fuerza de atracción interna entre sus partículas"], correcta: 0 },
  { enunciado: "¿Qué mide un ensayo de dureza como el Brinell, Rockwell o Vickers?", explicacion: "La resistencia del material a la penetración de un indentador bajo una carga determinada.", dificultad: "media", opciones: ["La resistencia a la penetración de un indentador", "La capacidad de absorber energía de un impacto", "La resistencia a la fatiga por esfuerzos repetidos", "La temperatura de fusión del material ensayado"], correcta: 0 },
  { enunciado: "¿Qué es la tenacidad de un material?", explicacion: "La capacidad de absorber energía y deformarse plásticamente antes de romperse.", dificultad: "media", opciones: ["La capacidad de absorber energía antes de romperse", "La resistencia a ser rayado por otro material más duro", "La capacidad de recuperar siempre su forma original", "La fuerza de atracción interna entre sus partículas"], correcta: 0 },
  { enunciado: "¿Qué relación suele existir entre dureza y tenacidad en un acero tratado térmicamente?", explicacion: "Suelen ser inversamente relacionadas: más dureza, menos tenacidad, y viceversa.", dificultad: "dificil", opciones: ["Suelen ser inversamente relacionadas entre sí", "Son siempre directamente proporcionales entre sí", "No existe ninguna relación real entre ambas propiedades", "Ambas aumentan siempre simultáneamente con el temple"], correcta: 0 },
  { enunciado: "¿Por qué debe buscar el herrero un equilibrio entre dureza y tenacidad en una herramienta de corte?", explicacion: "Dureza excesiva sin tenacidad astilla la herramienta; tenacidad excesiva sin dureza desgasta el filo.", dificultad: "media", opciones: ["Dureza excesiva astilla; tenacidad excesiva desgasta el filo", "Ambas propiedades son irrelevantes para una herramienta de corte", "Basta con maximizar únicamente la dureza sin ninguna otra consideración", "Basta con maximizar únicamente la tenacidad sin ninguna otra consideración"], correcta: 0 },
]);

const S3 = "fatiga-resiliencia-ensayos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la fatiga de un material?", reverso: "El fenómeno de debilitamiento y posible rotura de un material sometido a esfuerzos repetidos o cíclicos, incluso cuando dichos esfuerzos son individualmente inferiores a su resistencia a la rotura o a su límite elástico" },
  { anverso: "¿Qué es un ensayo de fatiga?", reverso: "Un procedimiento que somete una probeta del material a un esfuerzo cíclico repetido, determinando el número de ciclos que resiste antes de romperse a distintos niveles de carga" },
  { anverso: "¿Qué es la resiliencia de un material?", reverso: "La capacidad de un material para absorber energía de un impacto súbito sin romperse, medida habitualmente mediante un ensayo de choque (por ejemplo, el ensayo Charpy)" },
  { anverso: "¿Qué diferencia existe entre tenacidad y resiliencia?", reverso: "Ambas están relacionadas con la resistencia a la fractura frágil, pero la resiliencia se refiere específicamente a la capacidad de absorber energía frente a un impacto súbito, mientras que la tenacidad es un concepto más general aplicable también a esfuerzos aplicados de forma gradual" },
  { anverso: "¿Qué es el ensayo Charpy?", reverso: "Un ensayo normalizado de resiliencia en el que una probeta entallada se rompe mediante el golpe de un péndulo, midiendo la energía absorbida por la probeta durante la rotura" },
  { anverso: "¿Por qué es relevante conocer la resistencia a la fatiga de un material empleado en un elemento sometido a vibraciones o cargas repetidas (por ejemplo, una estructura metálica próxima a maquinaria)?", reverso: "Porque, aunque cada esfuerzo individual esté por debajo de la resistencia a la rotura del material, su repetición continuada puede iniciar y propagar grietas por fatiga hasta provocar una rotura inesperada del elemento" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la fatiga de un material?", explicacion: "El debilitamiento y posible rotura por esfuerzos repetidos o cíclicos.", dificultad: "media", opciones: ["El debilitamiento y posible rotura por esfuerzos repetidos", "La resistencia a ser rayado por otro material más duro", "La capacidad de recuperar su forma tras una carga puntual", "La fuerza de atracción interna entre sus partículas"], correcta: 0 },
  { enunciado: "¿Qué mide un ensayo de fatiga?", explicacion: "El número de ciclos que resiste una probeta antes de romperse a distintos niveles de carga.", dificultad: "media", opciones: ["El número de ciclos que resiste antes de romperse", "La resistencia a la penetración de un indentador", "La temperatura de fusión del material ensayado", "El peso máximo que soporta la pieza sin fundirse"], correcta: 0 },
  { enunciado: "¿Qué es la resiliencia de un material?", explicacion: "La capacidad de absorber energía de un impacto súbito sin romperse.", dificultad: "media", opciones: ["La capacidad de absorber energía de un impacto súbito", "La resistencia a ser rayado por otro material más duro", "La capacidad de recuperar siempre su forma original", "El debilitamiento por esfuerzos repetidos en el tiempo"], correcta: 0 },
  { enunciado: "¿Qué ensayo normalizado se emplea habitualmente para medir la resiliencia de un material?", explicacion: "El ensayo Charpy.", dificultad: "dificil", opciones: ["El ensayo Charpy", "El ensayo Brinell", "El ensayo Rockwell", "El ensayo Vickers"], correcta: 0 },
  { enunciado: "¿Por qué es relevante conocer la resistencia a la fatiga de un elemento sometido a vibraciones o cargas repetidas?", explicacion: "Esfuerzos repetidos por debajo de la resistencia a la rotura pueden iniciar grietas y provocar una rotura inesperada.", dificultad: "dificil", opciones: ["Esfuerzos repetidos pueden provocar una rotura inesperada", "La fatiga solo afecta a materiales sometidos a temperaturas extremas", "La resistencia a la fatiga no guarda relación con esfuerzos repetidos", "Un único esfuerzo puntual siempre es más peligroso que su repetición"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 9 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 9, orden: 9, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-157 creado y vinculado como Tema 9 de Oficial Herrero.");

/**
 * Crea tema-239: "Cálculo de volumen y cantidad de pintura" — Tema 11
 * (numero=11, bloque-2) de Oficial Pintor, Especialidad General (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 9 oficial del Anexo I (bases2110.pdf, línea
 * 1457): "Cálculo de volumen y cantidad de pintura para la ejecución en
 * la aplicación de revestimientos. Rendimiento de los revestimientos de
 * pintura. Cálculo de superficies. Normativa."
 *
 * Conocimiento técnico consolidado del oficio (matemática aplicada al
 * cálculo de superficies y rendimientos de pintura), sin ley española
 * única que lo regule — mismo criterio que en otros temas de cálculo
 * aplicado del proyecto (por ejemplo, tema-224 de Oficial Conductor
 * Maquinaria Pesada). Búsqueda previa realizada conforme al estándar
 * de sourcing del proyecto: no existe normativa específica distinta de
 * las fichas técnicas de cada fabricante (ya introducidas en temas
 * anteriores) que regulen esta materia.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-239-calculo-volumen-rendimiento.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-239";
const OPOSICION = "oficial-pintor-general-ayto-zaragoza";
const BLOQUE_2_ID = "77506e2f-f4c6-4512-8bf8-99d0b3bbbafd";

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
  titulo: "Cálculo de volumen y cantidad de pintura",
  descripcion: "Cálculo de superficies a pintar. El rendimiento de un revestimiento de pintura. Cálculo de la cantidad de pintura necesaria para la ejecución de un trabajo.",
  contenido: "Desarrolla el cálculo aplicado necesario para planificar correctamente un trabajo de pintura: el cálculo de superficies de paramentos, techos y otros elementos a pintar; el concepto de rendimiento de un revestimiento de pintura, expresado habitualmente en metros cuadrados por litro; y el cálculo de la cantidad total de pintura necesaria para ejecutar un trabajo, combinando la superficie a tratar, el rendimiento del producto y el número de manos previstas.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Cálculo de superficies a pintar", seccion: "calculo-superficies-pintar", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "El rendimiento de los revestimientos de pintura", seccion: "rendimiento-revestimientos-pintura", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Cálculo de la cantidad total de pintura necesaria", seccion: "calculo-cantidad-pintura-necesaria", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "calculo-superficies-pintar";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cómo se calcula la superficie de una pared rectangular a pintar?", reverso: "Multiplicando su altura por su longitud (Superficie = altura × longitud), expresando el resultado en metros cuadrados (m²) cuando ambas medidas se expresan en metros" },
  { anverso: "¿Qué debe descontarse, con carácter general, al calcular la superficie neta a pintar de una pared con puertas y ventanas?", reverso: "La superficie ocupada por los huecos de puertas y ventanas, salvo que su tamaño sea tan reducido que el criterio del presupuesto o de la medición establecida no exija su descuento, en cuyo caso se sigue el criterio pactado o habitual del oficio" },
  { anverso: "¿Cómo se calcula, de forma aproximada, la superficie total a pintar de un techo de una habitación rectangular?", reverso: "Multiplicando la longitud por la anchura de la habitación (Superficie = longitud × anchura), obteniendo la superficie en planta que coincide con la superficie del techo en una habitación de techo horizontal" },
  { anverso: "¿Cómo se calcula la superficie total de las cuatro paredes de una habitación rectangular, antes de descontar huecos?", reverso: "Sumando el perímetro de la habitación (dos veces la suma de longitud y anchura) multiplicado por la altura de las paredes: Superficie = perímetro × altura = 2 × (longitud + anchura) × altura" },
  { anverso: "¿Por qué es importante medir con precisión la superficie real a pintar antes de calcular la cantidad de material necesaria?", reverso: "Porque un error en el cálculo de superficie se traslada directamente al cálculo de material, pudiendo generar tanto una falta de pintura que obligue a interrumpir el trabajo como un sobrante innecesario que incremente el coste de la obra" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cómo se calcula la superficie de una pared rectangular a pintar?", explicacion: "Multiplicando su altura por su longitud.", dificultad: "facil", opciones: ["Multiplicando su altura por su longitud", "Sumando su altura y su longitud", "Dividiendo su altura entre su longitud", "Multiplicando su altura por su espesor"], correcta: 0 },
  { enunciado: "¿Qué debe descontarse al calcular la superficie neta a pintar de una pared con puertas y ventanas?", explicacion: "La superficie ocupada por los huecos, salvo criterio distinto pactado o habitual.", dificultad: "media", opciones: ["La superficie ocupada por los huecos de puertas y ventanas", "Ninguna superficie, calculándose siempre el muro completo", "Únicamente la superficie de las puertas, nunca de las ventanas", "Únicamente la superficie de las ventanas, nunca de las puertas"], correcta: 0 },
  { enunciado: "¿Cómo se calcula la superficie a pintar de un techo de una habitación rectangular?", explicacion: "Multiplicando la longitud por la anchura de la habitación.", dificultad: "media", opciones: ["Multiplicando la longitud por la anchura de la habitación", "Multiplicando la altura por la longitud de la habitación", "Sumando la longitud y la anchura de la habitación", "Dividiendo la longitud entre la anchura de la habitación"], correcta: 0 },
  { enunciado: "¿Cómo se calcula la superficie total de las cuatro paredes de una habitación rectangular?", explicacion: "Perímetro (2 × (longitud + anchura)) multiplicado por la altura.", dificultad: "dificil", opciones: ["El perímetro de la habitación multiplicado por su altura", "La longitud multiplicada por la anchura de la habitación", "La suma de la longitud y la anchura de la habitación", "La altura multiplicada por la anchura de la habitación"], correcta: 0 },
  { enunciado: "¿Por qué es importante medir con precisión la superficie antes de calcular el material necesario?", explicacion: "Un error se traslada directamente al cálculo de material, generando falta o sobrante.", dificultad: "media", opciones: ["Un error se traslada directamente al cálculo de material necesario", "La superficie nunca influye en la cantidad de material necesaria", "Solo resulta relevante en superficies de más de cien metros", "Solo resulta relevante para pinturas epoxi bicomponente"], correcta: 0 },
]);

const S2 = "rendimiento-revestimientos-pintura";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el rendimiento de un revestimiento de pintura?", reverso: "La superficie que puede cubrirse con una unidad de volumen de producto (habitualmente expresado en metros cuadrados por litro, m²/l), indicado por el fabricante en la ficha técnica del producto para una mano y sobre un soporte de porosidad estándar" },
  { anverso: "¿Qué factores pueden hacer que el rendimiento real de una pintura sea inferior al rendimiento teórico indicado en su ficha técnica?", reverso: "Una porosidad del soporte superior a la estándar (que absorbe más producto), un método de aplicación con mayor pérdida de material (por ejemplo, la pistola frente a la brocha), una textura rugosa de la superficie, o una técnica de aplicación menos eficiente" },
  { anverso: "¿Qué es el número de manos, en relación con el rendimiento de un revestimiento?", reverso: "El número de capas sucesivas de pintura que deben aplicarse sobre una superficie para lograr un acabado uniforme, de opacidad completa y del color previsto, siendo habitual que la primera mano rinda menos que las siguientes por la mayor absorción del soporte" },
  { anverso: "¿Por qué la primera mano de pintura sobre un soporte nuevo o muy absorbente suele rendir menos que las manos siguientes?", reverso: "Porque el soporte absorbe una parte significativa del producto en la primera aplicación, mientras que en las manos siguientes la superficie ya está parcialmente sellada por la capa anterior, reduciendo la absorción y aumentando el rendimiento efectivo" },
  { anverso: "¿Qué relación existe entre el rendimiento de un producto y su viscosidad de aplicación?", reverso: "Una viscosidad más elevada suele implicar un espesor de capa mayor y, por tanto, un menor rendimiento (menos superficie cubierta por litro); diluir el producto dentro de los límites indicados por el fabricante puede aumentar el rendimiento, aunque también puede reducir el poder cubriente y el número de manos necesarias" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el rendimiento de un revestimiento de pintura?", explicacion: "La superficie que puede cubrirse con una unidad de volumen de producto.", dificultad: "facil", opciones: ["La superficie cubierta con una unidad de volumen de producto", "El tiempo total que tarda en secar una capa de pintura", "El número de colores disponibles de un mismo producto", "El precio de venta de un litro de pintura"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes factores puede reducir el rendimiento real respecto al teórico de la ficha técnica?", explicacion: "Una porosidad del soporte superior a la estándar, entre otros factores.", dificultad: "media", opciones: ["Una porosidad del soporte superior a la estándar", "Una temperatura ambiente exactamente igual a la de ensayo", "Un soporte de porosidad exactamente estándar", "Una aplicación exclusivamente con brocha fina"], correcta: 0 },
  { enunciado: "¿Qué es el número de manos, en relación con el rendimiento?", explicacion: "El número de capas sucesivas necesarias para un acabado uniforme y opaco.", dificultad: "media", opciones: ["El número de capas sucesivas necesarias para un acabado uniforme", "El número de personas necesarias para ejecutar el trabajo", "El número de colores mezclados en la propia pintura", "El número de herramientas empleadas en la aplicación"], correcta: 0 },
  { enunciado: "¿Por qué la primera mano sobre un soporte nuevo suele rendir menos que las siguientes?", explicacion: "El soporte absorbe más producto en la primera aplicación que en las siguientes, ya parcialmente selladas.", dificultad: "dificil", opciones: ["El soporte absorbe más producto en la primera aplicación", "La primera mano siempre rinde más que cualquier otra mano", "El rendimiento nunca varía entre distintas manos aplicadas", "Solo varía si se emplea una pistola en la primera mano"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre la viscosidad de aplicación y el rendimiento del producto?", explicacion: "Una viscosidad más elevada suele implicar mayor espesor de capa y menor rendimiento.", dificultad: "dificil", opciones: ["Mayor viscosidad suele implicar mayor espesor y menor rendimiento", "La viscosidad nunca influye en el rendimiento del producto", "Menor viscosidad siempre reduce el rendimiento del producto", "El rendimiento depende exclusivamente del color de la pintura"], correcta: 0 },
]);

const S3 = "calculo-cantidad-pintura-necesaria";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cómo se calcula, de forma aproximada, la cantidad de pintura necesaria para una mano sobre una superficie conocida?", reverso: "Dividiendo la superficie total a pintar (en m²) entre el rendimiento del producto indicado en su ficha técnica (en m²/l), obteniendo el volumen de pintura necesario en litros para esa mano" },
  { anverso: "¿Cómo se calcula la cantidad total de pintura necesaria para un trabajo que requiere dos manos de acabado?", reverso: "Calculando primero la cantidad necesaria para una mano (superficie entre rendimiento) y multiplicando después ese resultado por el número de manos previstas, ajustando si el rendimiento de la primera mano difiere del de las siguientes" },
  { anverso: "¿Por qué es habitual añadir un margen o \"merma\" al cálculo teórico de la cantidad de pintura necesaria para un trabajo?", reverso: "Porque en la práctica existen pérdidas de producto por salpicaduras, restos en herramientas y envases, correcciones o repasos, y variaciones del rendimiento real respecto al teórico, por lo que un margen de seguridad evita quedarse sin producto antes de terminar el trabajo" },
  { anverso: "Si una superficie de 80 m² se pinta con un producto de rendimiento 8 m²/l a una mano, ¿qué cantidad aproximada de pintura sería necesaria para esa mano?", reverso: "10 litros, resultado de dividir los 80 m² de superficie entre el rendimiento de 8 m²/l del producto (80 ÷ 8 = 10 litros)" },
  { anverso: "¿Qué debe tener en cuenta el Oficial Pintor al calcular la cantidad de pintura necesaria si va a aplicar el producto con pistola en lugar de con brocha o rodillo?", reverso: "Que la aplicación con pistola suele generar una mayor pérdida de material por proyección fuera de la superficie de destino (overspray), lo que puede reducir el rendimiento real respecto al indicado en la ficha técnica, siendo prudente aumentar el margen de seguridad del cálculo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cómo se calcula la cantidad de pintura necesaria para una mano sobre una superficie conocida?", explicacion: "Dividiendo la superficie total entre el rendimiento del producto.", dificultad: "media", opciones: ["Dividiendo la superficie total entre el rendimiento del producto", "Multiplicando la superficie total por el rendimiento del producto", "Sumando la superficie total y el rendimiento del producto", "Dividiendo el rendimiento del producto entre la superficie total"], correcta: 0 },
  { enunciado: "¿Cómo se calcula la cantidad total de pintura para un trabajo de dos manos?", explicacion: "Calculando la cantidad de una mano y multiplicándola por el número de manos previstas.", dificultad: "media", opciones: ["Calculando una mano y multiplicando por el número de manos", "Calculando una mano y dividiendo entre el número de manos", "Calculando únicamente la última mano de acabado", "El número de manos no influye en la cantidad total necesaria"], correcta: 0 },
  { enunciado: "¿Por qué es habitual añadir un margen al cálculo teórico de pintura necesaria?", explicacion: "Existen pérdidas de producto por salpicaduras, restos y variaciones del rendimiento real.", dificultad: "media", opciones: ["Existen pérdidas de producto y variaciones del rendimiento real", "El cálculo teórico siempre resulta exacto en la práctica", "El margen solo se aplica en pinturas epoxi bicomponente", "El margen solo se aplica si se emplea pistola airless"], correcta: 0 },
  { enunciado: "Si una superficie de 80 m² se pinta con un producto de rendimiento 8 m²/l, ¿cuántos litros son necesarios para una mano?", explicacion: "80 ÷ 8 = 10 litros.", dificultad: "facil", opciones: ["10 litros", "8 litros", "80 litros", "640 litros"], correcta: 0 },
  { enunciado: "¿Qué debe tener en cuenta el Oficial al calcular la cantidad de pintura si aplica el producto con pistola?", explicacion: "La aplicación con pistola suele generar mayor pérdida de material por overspray.", dificultad: "dificil", opciones: ["La pistola suele generar mayor pérdida de material por overspray", "La pistola nunca genera ninguna pérdida adicional de material", "El método de aplicación nunca influye en el cálculo necesario", "Solo resulta relevante si se aplica una única mano de acabado"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 11 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 11, orden: 11, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-239 creado y vinculado como Tema 11 de Oficial Pintor General.");

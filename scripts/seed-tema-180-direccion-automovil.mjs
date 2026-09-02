/**
 * Crea tema-180: "Dirección del automóvil" — Tema 16 (numero=16,
 * bloque-2) de Oficial Mecánico.
 *
 * Corresponde al TEMA 14 oficial: "Dirección del automóvil."
 *
 * Conocimiento técnico consolidado de mecánica del automóvil, sin una
 * ley española que lo regule como tal.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-180-direccion-automovil.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-180";
const OPOSICION = "oficial-mecanico-ayto-zaragoza";
const BLOQUE_2_ID = "aa6cf0d6-e9fd-4e52-837d-15fab35cbcbe";

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
  titulo: "Dirección del automóvil",
  descripcion: "El sistema de dirección mecánica de cremallera, la dirección asistida hidráulica y eléctrica, y la geometría de dirección y alineación de las ruedas.",
  contenido: "Desarrolla el sistema de dirección del automóvil: el mecanismo de dirección de cremallera y piñón, los sistemas de dirección asistida (hidráulica y eléctrica) que reducen el esfuerzo del conductor, y los fundamentos de la geometría de dirección (convergencia, caída, avance) necesarios para un correcto comportamiento y desgaste uniforme de los neumáticos.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "El sistema de dirección mecánica de cremallera", seccion: "sistema-direccion-mecanica-cremallera", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Dirección asistida: hidráulica y eléctrica", seccion: "direccion-asistida-hidraulica-electrica", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Geometría de dirección y alineación", seccion: "geometria-direccion-alineacion", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "sistema-direccion-mecanica-cremallera";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la función del sistema de dirección de un automóvil?", reverso: "Permitir al conductor controlar la orientación de las ruedas delanteras (en la mayoría de configuraciones) para dirigir el vehículo, transformando el giro del volante en el movimiento angular de las ruedas" },
  { anverso: "¿Qué es la caja de dirección de cremallera y piñón?", reverso: "El mecanismo más habitual en automóviles actuales, en el que un piñón, solidario a la columna de dirección, engrana con una cremallera dentada que se desplaza lateralmente, moviendo las ruedas a través de las bieletas de dirección" },
  { anverso: "¿Qué son las bieletas de dirección?", reverso: "Las varillas que unen los extremos de la cremallera con las manguetas de las ruedas, transmitiendo el movimiento lateral de la cremallera al giro de las propias ruedas" },
  { anverso: "¿Qué es la columna de dirección?", reverso: "El eje que transmite el giro del volante hasta el piñón de la caja de dirección; en muchos vehículos incorpora una junta cardán o elementos de seguridad (columna colapsable) para absorber energía en caso de impacto" },
  { anverso: "¿Qué es la mangueta de la rueda, en relación con el sistema de dirección?", reverso: "El elemento que soporta el buje de la rueda y permite su giro alrededor del eje de dirección (pivote), conectado a la bieleta de dirección y a la suspensión del vehículo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuál es la función del sistema de dirección de un automóvil?", explicacion: "Permitir al conductor controlar la orientación de las ruedas para dirigir el vehículo.", dificultad: "facil", opciones: ["Controlar la orientación de las ruedas para dirigir el vehículo", "Generar la chispa que enciende la mezcla del motor", "Impulsar el combustible a presión hacia los inyectores", "Evacuar el calor generado por la combustión del motor"], correcta: 0 },
  { enunciado: "¿Qué es la caja de dirección de cremallera y piñón?", explicacion: "El mecanismo en el que un piñón engrana con una cremallera dentada que se desplaza lateralmente.", dificultad: "media", opciones: ["Un mecanismo en el que un piñón engrana con una cremallera dentada", "Un mecanismo exclusivo de la dirección asistida eléctrica", "Un mecanismo que forma parte del sistema de frenos", "Un mecanismo que forma parte del sistema de refrigeración"], correcta: 0 },
  { enunciado: "¿Qué función cumplen las bieletas de dirección?", explicacion: "Unen los extremos de la cremallera con las manguetas de las ruedas.", dificultad: "media", opciones: ["Unen los extremos de la cremallera con las manguetas de las ruedas", "Generan la presión de sobrealimentación del motor", "Filtran las impurezas presentes en el aceite del motor", "Regulan la temperatura del líquido refrigerante del motor"], correcta: 0 },
  { enunciado: "¿Qué es la columna de dirección?", explicacion: "El eje que transmite el giro del volante hasta el piñón de la caja de dirección.", dificultad: "media", opciones: ["El eje que transmite el giro del volante hasta el piñón", "El elemento que soporta el buje de la rueda del vehículo", "El elemento que filtra las impurezas del aceite del motor", "El elemento que regula la temperatura del habitáculo"], correcta: 0 },
  { enunciado: "¿Qué es la mangueta de la rueda?", explicacion: "El elemento que soporta el buje de la rueda y permite su giro alrededor del eje de dirección.", dificultad: "dificil", opciones: ["El elemento que soporta el buje de la rueda y permite su giro", "El elemento que transmite el giro del volante a la columna", "El elemento que filtra las impurezas del combustible", "El elemento que genera la presión de sobrealimentación"], correcta: 0 },
]);

const S2 = "direccion-asistida-hidraulica-electrica";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la dirección asistida?", reverso: "Un sistema que reduce el esfuerzo físico que el conductor debe aplicar al volante para girar las ruedas, especialmente relevante a baja velocidad o en maniobras de aparcamiento" },
  { anverso: "¿Cómo funciona la dirección asistida hidráulica?", reverso: "Una bomba hidráulica, accionada por el motor mediante una correa, genera presión de aceite que ayuda a mover el mecanismo de dirección, reduciendo el esfuerzo que debe realizar el conductor al girar el volante" },
  { anverso: "¿Cómo funciona la dirección asistida eléctrica (EPS, Electric Power Steering)?", reverso: "Un motor eléctrico, controlado por una centralita electrónica en función de la velocidad del vehículo y el esfuerzo detectado en el volante, proporciona la asistencia necesaria sin necesidad de una bomba hidráulica accionada por el motor" },
  { anverso: "¿Qué ventaja principal aporta la dirección asistida eléctrica frente a la hidráulica?", reverso: "No consume potencia del motor de forma constante (solo cuando realmente se necesita asistencia), lo que mejora la eficiencia energética del vehículo, y permite variar la asistencia según la velocidad de circulación" },
  { anverso: "¿Qué síntomas puede presentar una avería en el sistema de dirección asistida?", reverso: "Un esfuerzo notablemente mayor al girar el volante de lo habitual, ruidos anómalos al girar, o, en sistemas hidráulicos, una posible fuga de líquido de dirección asistida" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué función cumple la dirección asistida?", explicacion: "Reduce el esfuerzo físico que el conductor debe aplicar al volante.", dificultad: "facil", opciones: ["Reduce el esfuerzo físico que debe aplicar el conductor al volante", "Aumenta la velocidad máxima que puede alcanzar el vehículo", "Genera la chispa que enciende la mezcla del motor", "Filtra las impurezas presentes en el aceite del motor"], correcta: 0 },
  { enunciado: "¿Cómo funciona la dirección asistida hidráulica?", explicacion: "Una bomba hidráulica accionada por el motor genera presión de aceite que ayuda a mover el mecanismo de dirección.", dificultad: "media", opciones: ["Una bomba hidráulica accionada por el motor genera presión de aceite", "Un motor eléctrico independiente mueve directamente las ruedas", "No emplea ningún elemento adicional al mecanismo de dirección", "Funciona exclusivamente mediante la fuerza del propio conductor"], correcta: 0 },
  { enunciado: "¿Cómo funciona la dirección asistida eléctrica (EPS)?", explicacion: "Un motor eléctrico controlado por una centralita proporciona la asistencia necesaria según velocidad y esfuerzo.", dificultad: "media", opciones: ["Un motor eléctrico controlado por una centralita proporciona asistencia", "Emplea siempre una bomba hidráulica accionada por correa", "No requiere ningún tipo de control electrónico para funcionar", "Es un sistema exclusivo de los vehículos de gama muy básica"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta la dirección asistida eléctrica frente a la hidráulica?", explicacion: "No consume potencia del motor de forma constante, mejorando la eficiencia energética.", dificultad: "dificil", opciones: ["No consume potencia del motor de forma constante", "Siempre consume más energía que un sistema hidráulico", "No aporta ninguna ventaja real frente al sistema hidráulico", "Elimina por completo la necesidad de mecanismo de cremallera"], correcta: 0 },
  { enunciado: "¿Qué síntoma es característico de una avería en el sistema de dirección asistida?", explicacion: "Un esfuerzo notablemente mayor al girar el volante de lo habitual.", dificultad: "media", opciones: ["Un esfuerzo notablemente mayor al girar el volante", "Un aumento del nivel de aceite del motor del vehículo", "Una reducción de la temperatura del líquido refrigerante", "Un cambio en el color de la carrocería del vehículo"], correcta: 0 },
]);

const S3 = "geometria-direccion-alineacion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la convergencia (o paralelismo) de las ruedas?", reverso: "El ángulo, visto desde arriba, que forman las ruedas de un mismo eje entre sí; si las ruedas apuntan ligeramente hacia dentro por delante se denomina convergencia, si apuntan hacia fuera, divergencia" },
  { anverso: "¿Qué es la caída (o camber) de una rueda?", reverso: "El ángulo, visto de frente, que forma el plano de la rueda respecto a la vertical; una caída negativa indica que la parte superior de la rueda se inclina hacia el interior del vehículo" },
  { anverso: "¿Qué es el avance (o caster) de la dirección?", reverso: "El ángulo de inclinación del eje de giro de la dirección (pivote) respecto a la vertical, visto de lado, que influye en la estabilidad direccional del vehículo y en la tendencia del volante a volver al centro tras un giro" },
  { anverso: "¿Por qué es importante mantener correctamente ajustada la geometría de dirección de un vehículo?", reverso: "Una geometría desajustada provoca un desgaste irregular y prematuro de los neumáticos, tira el vehículo hacia un lado durante la conducción, y puede afectar negativamente a la estabilidad y seguridad del vehículo" },
  { anverso: "¿Cuándo es especialmente recomendable revisar la geometría de dirección de un vehículo?", reverso: "Tras un impacto contra un bordillo o bache pronunciado, tras sustituir elementos de la suspensión o dirección, o cuando se observa un desgaste irregular de los neumáticos o el vehículo tira hacia un lado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la convergencia de las ruedas?", explicacion: "El ángulo, visto desde arriba, que forman las ruedas de un mismo eje entre sí.", dificultad: "media", opciones: ["El ángulo entre las ruedas de un mismo eje visto desde arriba", "El ángulo de inclinación del eje de giro visto de lado", "El ángulo del plano de la rueda respecto a la vertical", "La distancia entre los dos ejes del vehículo"], correcta: 0 },
  { enunciado: "¿Qué es la caída (camber) de una rueda?", explicacion: "El ángulo, visto de frente, que forma el plano de la rueda respecto a la vertical.", dificultad: "media", opciones: ["El ángulo del plano de la rueda respecto a la vertical", "El ángulo entre las ruedas de un mismo eje visto desde arriba", "El ángulo de inclinación del eje de giro visto de lado", "La presión de inflado recomendada para la rueda"], correcta: 0 },
  { enunciado: "¿Qué es el avance (caster) de la dirección?", explicacion: "El ángulo de inclinación del eje de giro de la dirección respecto a la vertical, visto de lado.", dificultad: "dificil", opciones: ["El ángulo de inclinación del eje de giro visto de lado", "El ángulo entre las ruedas de un mismo eje visto desde arriba", "El ángulo del plano de la rueda respecto a la vertical", "La distancia entre los dos ejes del vehículo"], correcta: 0 },
  { enunciado: "¿Qué consecuencia tiene una geometría de dirección desajustada?", explicacion: "Desgaste irregular y prematuro de los neumáticos, y el vehículo puede tirar hacia un lado.", dificultad: "media", opciones: ["Desgaste irregular de neumáticos y el vehículo tira hacia un lado", "No tiene ninguna consecuencia relevante para el vehículo", "Mejora el rendimiento del motor de forma notable", "Reduce el consumo de combustible del vehículo"], correcta: 0 },
  { enunciado: "¿Cuándo es especialmente recomendable revisar la geometría de dirección?", explicacion: "Tras un impacto contra un bordillo o bache, o al observar desgaste irregular de neumáticos.", dificultad: "media", opciones: ["Tras un impacto contra un bordillo o al observar desgaste irregular", "Nunca es necesario revisarla mientras el vehículo circule bien", "Solo debe revisarse una vez cada diez años, sin excepciones", "Solo debe revisarse si el vehículo cambia de color exterior"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 16 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 16, orden: 16, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-180 creado y vinculado como Tema 16 de Oficial Mecánico.");

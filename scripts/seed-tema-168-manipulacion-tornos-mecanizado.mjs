/**
 * Crea tema-168: "Manipulación de tornos: mecanizado avanzado" — Tema 20
 * (numero=20, bloque-2) de Oficial Herrero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 18 oficial del Anexo I (bases2110.pdf, línea 1283):
 *   "Manipulación de tornos. Estudio del corte. Velocidad de corte.
 *   Ejecución del mecanizado, cilindrado, refrentado, ranurado, tronzado,
 *   torneado excéntrico, moleteado."
 *
 * Conocimiento técnico consolidado de mecanizado por torneado, sin una
 * ley española específica que lo regule como técnica de taller — mismo
 * criterio que temas anteriores de esta oposición (complementa a
 * tema-166, centrado en tipos de torno y seguridad). Búsqueda previa
 * realizada conforme al estándar de sourcing del proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-168-manipulacion-tornos-mecanizado.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-168";
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
  titulo: "Manipulación de tornos: mecanizado avanzado",
  descripcion: "Estudio del corte. Velocidad de corte. Ejecución del mecanizado: cilindrado, refrentado, ranurado, tronzado, torneado excéntrico, moleteado.",
  contenido: "Desarrolla la manipulación práctica del torno: el estudio del corte y la velocidad de corte como parámetros fundamentales del mecanizado, y la ejecución de las principales operaciones de torneado: cilindrado, refrentado, ranurado, tronzado, torneado excéntrico y moleteado.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Estudio del corte y velocidad de corte", seccion: "estudio-corte-velocidad-corte", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Cilindrado, refrentado, ranurado y tronzado", seccion: "cilindrado-refrentado-ranurado-tronzado", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Torneado excéntrico y moleteado", seccion: "torneado-excentrico-moleteado", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "estudio-corte-velocidad-corte";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la velocidad de corte en torneado?", reverso: "La velocidad lineal a la que la superficie de la pieza pasa por delante del filo de la herramienta, expresada habitualmente en metros por minuto, y que depende de la velocidad de giro de la pieza y de su diámetro" },
  { anverso: "¿Qué factores determinan la velocidad de corte adecuada para una operación de torneado?", reverso: "El material de la pieza a mecanizar, el material de la herramienta de corte (por ejemplo, acero rápido o metal duro), el tipo de operación (desbaste o acabado), y las condiciones de refrigeración disponibles" },
  { anverso: "¿Qué ocurre si se emplea una velocidad de corte excesiva para el material y la herramienta empleados?", reverso: "Un desgaste prematuro o incluso la rotura del filo de la herramienta por sobrecalentamiento, además de un posible deterioro del acabado superficial de la pieza mecanizada" },
  { anverso: "¿Qué ocurre si se emplea una velocidad de corte excesivamente baja para la operación prevista?", reverso: "Un rendimiento de mecanizado innecesariamente reducido (mayor tiempo de trabajo para la misma operación), y en algunos casos un acabado superficial peor del esperado por un corte menos eficiente" },
  { anverso: "¿Qué relación existe entre la velocidad de corte y la velocidad de giro (en revoluciones por minuto) que debe programarse en el torno para una pieza de mayor diámetro?", reverso: "Para mantener la misma velocidad de corte, una pieza de mayor diámetro requiere una menor velocidad de giro en revoluciones por minuto, ya que un mismo giro recorre una mayor distancia lineal cuanto mayor es el diámetro de la pieza" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la velocidad de corte en torneado?", explicacion: "La velocidad lineal a la que la superficie de la pieza pasa por delante del filo de la herramienta.", dificultad: "media", opciones: ["La velocidad lineal a la que la pieza pasa por el filo de la herramienta", "El desplazamiento de la herramienta por cada vuelta de la pieza", "El diámetro final que debe tener la pieza mecanizada", "El tiempo total empleado en una operación de torneado"], correcta: 0 },
  { enunciado: "¿Qué factores determinan la velocidad de corte adecuada en una operación de torneado?", explicacion: "El material de la pieza, el material de la herramienta, el tipo de operación y la refrigeración.", dificultad: "media", opciones: ["Material de la pieza y de la herramienta, tipo de operación y refrigeración", "Únicamente el color de la pieza a mecanizar", "Únicamente la marca comercial del torno empleado", "Únicamente el precio de la herramienta de corte disponible"], correcta: 0 },
  { enunciado: "¿Qué consecuencia tiene emplear una velocidad de corte excesiva?", explicacion: "Un desgaste prematuro o rotura del filo por sobrecalentamiento.", dificultad: "media", opciones: ["Un desgaste prematuro o rotura del filo por sobrecalentamiento", "Una mejora automática del acabado superficial obtenido", "Una reducción del tiempo de vida útil del torno sin ninguna otra consecuencia", "Ninguna consecuencia relevante para el resultado del mecanizado"], correcta: 0 },
  { enunciado: "¿Qué consecuencia tiene emplear una velocidad de corte excesivamente baja?", explicacion: "Un rendimiento de mecanizado reducido y, en algunos casos, un acabado peor.", dificultad: "media", opciones: ["Un rendimiento de mecanizado reducido", "Una rotura inmediata de la herramienta de corte empleada", "Un aumento automático de la dureza de la pieza mecanizada", "Ninguna consecuencia relevante para el resultado del mecanizado"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el diámetro de la pieza y la velocidad de giro necesaria para mantener la misma velocidad de corte?", explicacion: "A mayor diámetro, menor velocidad de giro en revoluciones por minuto.", dificultad: "dificil", opciones: ["A mayor diámetro, menor velocidad de giro necesaria", "A mayor diámetro, mayor velocidad de giro necesaria", "El diámetro de la pieza no influye en la velocidad de giro necesaria", "La velocidad de giro siempre debe ser máxima, con independencia del diámetro"], correcta: 0 },
]);

const S2 = "cilindrado-refrentado-ranurado-tronzado";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el cilindrado, como operación de torneado?", reverso: "El mecanizado longitudinal de una pieza en rotación, reduciendo su diámetro de forma uniforme a lo largo del eje mediante el avance de la herramienta paralelo a dicho eje" },
  { anverso: "¿Qué es el refrentado, como operación de torneado?", reverso: "El mecanizado de la cara frontal de una pieza, perpendicular a su eje de giro, mediante un avance transversal de la herramienta, obteniendo una superficie plana y perpendicular al eje" },
  { anverso: "¿Qué es el ranurado, como operación de torneado?", reverso: "El mecanizado de una ranura estrecha en la superficie de una pieza (exterior, interior o frontal), empleando una herramienta de corte estrecha adaptada a la anchura de la ranura requerida" },
  { anverso: "¿Para qué se emplean habitualmente las ranuras mecanizadas en una pieza torneada?", reverso: "Para alojar elementos de sujeción (como una junta tórica o un anillo elástico de retención), como zona de salida de una herramienta de roscado, o como elemento decorativo o funcional del diseño de la pieza" },
  { anverso: "¿Qué es el tronzado, como operación de torneado?", reverso: "El corte completo de una pieza en rotación mediante una herramienta estrecha (similar a la de ranurado pero de mayor profundidad de penetración), separando así una parte de la pieza del resto del material en bruto" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el cilindrado?", explicacion: "El mecanizado longitudinal que reduce el diámetro de forma uniforme a lo largo del eje.", dificultad: "facil", opciones: ["El mecanizado longitudinal que reduce el diámetro uniformemente", "El mecanizado de la cara frontal perpendicular al eje", "El corte completo que separa una pieza del material en bruto", "El mecanizado de una ranura estrecha en la superficie"], correcta: 0 },
  { enunciado: "¿Qué es el refrentado?", explicacion: "El mecanizado de la cara frontal de la pieza, perpendicular al eje de giro.", dificultad: "media", opciones: ["El mecanizado de la cara frontal, perpendicular al eje", "El mecanizado longitudinal a lo largo de todo el eje", "El corte completo que separa una pieza del material en bruto", "El mecanizado de una ranura estrecha en la superficie"], correcta: 0 },
  { enunciado: "¿Qué es el ranurado?", explicacion: "El mecanizado de una ranura estrecha en la superficie de la pieza.", dificultad: "media", opciones: ["El mecanizado de una ranura estrecha en la superficie", "El mecanizado longitudinal que reduce el diámetro de la pieza", "El corte completo que separa una pieza del material en bruto", "El mecanizado de la cara frontal perpendicular al eje"], correcta: 0 },
  { enunciado: "¿Para qué se emplean habitualmente las ranuras mecanizadas en una pieza torneada?", explicacion: "Para alojar elementos de sujeción, como zona de salida de roscado, o con fines decorativos.", dificultad: "dificil", opciones: ["Para alojar elementos de sujeción o como salida de roscado", "Exclusivamente para reducir el peso final de la pieza mecanizada", "Exclusivamente para facilitar el pintado posterior de la pieza", "Ninguna aplicación práctica real en piezas torneadas"], correcta: 0 },
  { enunciado: "¿Qué es el tronzado?", explicacion: "El corte completo de una pieza en rotación, separándola del material en bruto.", dificultad: "media", opciones: ["El corte completo que separa una pieza del material en bruto", "El mecanizado longitudinal que reduce el diámetro de la pieza", "El mecanizado de la cara frontal perpendicular al eje", "El mecanizado de una ranura de escasa profundidad"], correcta: 0 },
]);

const S3 = "torneado-excentrico-moleteado";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el torneado excéntrico?", reverso: "Una operación de torneado en la que el eje de mecanizado de una parte de la pieza no coincide con el eje de giro principal, obteniendo una zona cuyo centro está desplazado respecto al resto de la pieza (por ejemplo, un cigüeñal o una leva)" },
  { anverso: "¿Cómo se consigue habitualmente sujetar una pieza para realizar un torneado excéntrico?", reverso: "Mediante un plato de garras independientes (que permite desplazar cada garra por separado para descentrar la pieza) o mediante un montaje específico con un útil auxiliar que desplaza el centro de giro de la zona a mecanizar" },
  { anverso: "¿Qué es el moleteado, como operación de torneado?", reverso: "Una operación que no arranca viruta, sino que conforma por deformación plástica un relieve regular (rombos o líneas rectas) sobre la superficie exterior de una pieza, mediante una herramienta con rodillos endurecidos que se presiona contra la pieza en rotación" },
  { anverso: "¿Para qué se emplea habitualmente el moleteado en una pieza?", reverso: "Para mejorar el agarre manual de una pieza (por ejemplo, en un mango o una empuñadura), o con fines decorativos, sin que se trate de una operación de arranque de material" },
  { anverso: "¿Qué diferencia fundamental existe entre el moleteado y el resto de operaciones de torneado como el cilindrado o el ranurado?", reverso: "El moleteado conforma la superficie por deformación plástica (aplastando el material para crear el relieve), sin arrancar viruta, mientras que el resto de operaciones estudiadas arrancan material mediante el filo de corte de la herramienta" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el torneado excéntrico?", explicacion: "El eje de mecanizado de una parte de la pieza no coincide con el eje de giro principal.", dificultad: "media", opciones: ["El eje de mecanizado no coincide con el eje de giro principal", "El mecanizado longitudinal habitual que reduce el diámetro de la pieza", "El corte completo que separa una pieza del material en bruto", "El mecanizado de la cara frontal perpendicular al eje de giro"], correcta: 0 },
  { enunciado: "¿Cómo se consigue habitualmente sujetar una pieza para un torneado excéntrico?", explicacion: "Mediante un plato de garras independientes o un útil auxiliar que descentra la zona a mecanizar.", dificultad: "dificil", opciones: ["Mediante un plato de garras independientes o un útil auxiliar", "Mediante el mismo plato universal empleado en cualquier torneado centrado", "Sin ningún sistema de sujeción específico distinto del habitual", "Únicamente sujetando la pieza manualmente sin ningún útil auxiliar"], correcta: 0 },
  { enunciado: "¿Qué es el moleteado?", explicacion: "Conforma un relieve regular por deformación plástica, sin arrancar viruta.", dificultad: "media", opciones: ["Conforma un relieve por deformación plástica, sin arrancar viruta", "Arranca viruta para reducir el diámetro de la pieza mecanizada", "Corta completamente la pieza separándola del material en bruto", "Mecaniza la cara frontal de la pieza perpendicular al eje"], correcta: 0 },
  { enunciado: "¿Para qué se emplea habitualmente el moleteado en una pieza?", explicacion: "Para mejorar el agarre manual o con fines decorativos.", dificultad: "media", opciones: ["Para mejorar el agarre manual o con fines decorativos", "Exclusivamente para reducir el peso final de la pieza mecanizada", "Exclusivamente para generar una rosca sobre la superficie de la pieza", "Exclusivamente para separar la pieza del material en bruto"], correcta: 0 },
  { enunciado: "¿Qué diferencia fundamental existe entre el moleteado y el cilindrado o el ranurado?", explicacion: "El moleteado deforma el material sin arrancar viruta; las otras operaciones sí arrancan viruta.", dificultad: "dificil", opciones: ["El moleteado deforma el material sin arrancar viruta", "El moleteado arranca siempre más viruta que el cilindrado", "Ambas operaciones son exactamente equivalentes entre sí", "El moleteado nunca puede aplicarse sobre piezas metálicas"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 20 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 20, orden: 20, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-168 creado y vinculado como Tema 20 de Oficial Herrero.");

/**
 * Crea tema-193: "Válvulas de la red de abastecimiento" — Tema 13
 * (numero=13, bloque-2) de Oficial Guardallaves (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 11 oficial del Anexo I (bases2110.pdf, línea 916):
 *   "Válvulas: Válvulas. Tipología. Válvulas de compuerta: De cierre
 *   elástico, de cierre metal, estanqueidad en ambos sistemas.
 *   Descripción de sus componentes. Válvulas de mariposa: De eje
 *   excéntrico, de eje cerrado. Utilización de uno u otro sistema.
 *   Estanqueidad en ambos tipos. Descripción de sus componentes.
 *   Válvulas reductoras de presión: funcionamiento."
 *
 * Fuente primaria verificada mediante búsqueda en esta sesión: norma
 * UNE-EN 1074, "Válvulas para el suministro de agua. Requisitos de
 * aptitud al uso y ensayos de verificación apropiados", en sus partes
 * aplicables (Parte 1: requisitos generales; Parte 2: válvulas de
 * aislamiento —compuerta, mariposa—); citada por su función y alcance
 * general. El funcionamiento mecánico detallado de cada tipología de
 * válvula (compuerta de cierre elástico o metal, mariposa de eje
 * excéntrico o cerrado, reductora de presión) es conocimiento técnico
 * consolidado del oficio de guardallaves, no reproducido en la propia
 * norma UNE-EN a nivel de detalle constructivo.
 *
 * Tres secciones:
 * 1. tipologia-general-valvulas-une-en-1074
 * 2. valvulas-compuerta-cierre-elastico-metal
 * 3. valvulas-mariposa-reductoras-presion
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-193-valvulas-red-abastecimiento.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-193";
const OPOSICION = "oficial-guardallaves-ayto-zaragoza";
const BLOQUE_2_ID = "5bb8da57-00c3-4865-a0a1-651b70c85ba0";

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
  titulo: "Válvulas de la red de abastecimiento",
  descripcion: "Tipología general de válvulas (UNE-EN 1074). Válvulas de compuerta: cierre elástico y cierre metálico. Válvulas de mariposa: eje excéntrico y eje cerrado. Válvulas reductoras de presión.",
  contenido: "Desarrolla las válvulas empleadas en la red de abastecimiento de agua: su tipología general conforme a la norma UNE-EN 1074, las válvulas de compuerta (de cierre elástico y de cierre metal, con la descripción de sus componentes y su estanqueidad), las válvulas de mariposa (de eje excéntrico y de eje cerrado, sus usos característicos y su estanqueidad), y las válvulas reductoras de presión y su funcionamiento.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Tipología general de válvulas (UNE-EN 1074)", seccion: "tipologia-general-valvulas-une-en-1074", articulos: "UNE-EN 1074, Parte 1" },
    { url: "", titulo: "Válvulas de compuerta: cierre elástico y cierre metálico", seccion: "valvulas-compuerta-cierre-elastico-metal", articulos: "UNE-EN 1074, Parte 2; resto, conocimiento técnico del oficio" },
    { url: "", titulo: "Válvulas de mariposa y válvulas reductoras de presión", seccion: "valvulas-mariposa-reductoras-presion", articulos: "UNE-EN 1074, Parte 2; resto, conocimiento técnico del oficio" },
  ],
}]);

const S1 = "tipologia-general-valvulas-une-en-1074";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma establece los requisitos de aptitud al uso y los ensayos de verificación de las válvulas para el suministro de agua?", reverso: "La norma UNE-EN 1074, dividida en varias partes: requisitos generales (Parte 1), válvulas de aislamiento (Parte 2), válvulas de retención (Parte 3), ventosas (Parte 4) e hidrantes (Parte 6)" },
  { anverso: "¿Qué función cumple una válvula de aislamiento (o de seccionamiento) en la red de abastecimiento?", reverso: "Permitir el corte total del paso de agua por un tramo de conducción, para poder aislarlo en caso de avería o de trabajos de mantenimiento, sin afectar al resto de la red" },
  { anverso: "¿Qué diferencia general existe entre una válvula de todo o nada y una válvula de regulación?", reverso: "La válvula de todo o nada está diseñada para trabajar en posiciones extremas (totalmente abierta o totalmente cerrada); la válvula de regulación está diseñada para trabajar también en posiciones intermedias, controlando el caudal o la presión" },
  { anverso: "¿Por qué no es recomendable usar una válvula de compuerta convencional (de todo o nada) para regular el caudal en una posición intermedia?", reverso: "Porque su diseño no está pensado para esa función: mantenerla parcialmente cerrada de forma prolongada puede provocar cavitación, vibración y un desgaste prematuro de sus componentes internos" },
  { anverso: "¿Qué elementos básicos suele tener en común cualquier válvula de la red, con independencia de su tipología?", reverso: "Un cuerpo (carcasa exterior que soporta la presión), un elemento de cierre (compuerta, mariposa u otro), un sistema de accionamiento (volante, cuadradillo o motorización) y los elementos de estanqueidad que evitan fugas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué norma establece los requisitos de aptitud al uso de las válvulas para el suministro de agua?", explicacion: "La norma UNE-EN 1074.", dificultad: "media", opciones: ["La norma UNE-EN 1074", "La norma UNE-EN 545", "La norma UNE-EN 12201", "La norma UNE-EN 124"], correcta: 0 },
  { enunciado: "¿Qué función cumple una válvula de aislamiento en la red de abastecimiento?", explicacion: "Permitir el corte total del paso de agua por un tramo, para aislarlo.", dificultad: "facil", opciones: ["Permitir el corte total del paso de agua por un tramo", "Medir el caudal exacto que circula por ese tramo", "Filtrar las partículas sólidas que arrastra el agua", "Purgar el aire acumulado en los puntos altos de la red"], correcta: 0 },
  { enunciado: "¿Qué diferencia general existe entre una válvula de todo o nada y una de regulación?", explicacion: "La de regulación está diseñada también para posiciones intermedias.", dificultad: "media", opciones: ["La de regulación trabaja también en posiciones intermedias", "Ambos tipos de válvula cumplen exactamente la misma función", "La de todo o nada siempre regula mejor el caudal intermedio", "La de regulación nunca puede cerrarse completamente"], correcta: 0 },
  { enunciado: "¿Qué riesgo genera usar una válvula de compuerta convencional en posición parcialmente cerrada de forma prolongada?", explicacion: "Cavitación, vibración y desgaste prematuro de sus componentes.", dificultad: "dificil", opciones: ["Cavitación, vibración y desgaste prematuro de sus componentes", "Ningún riesgo real si el diámetro de la válvula es suficiente", "Una mejora automática de la estanqueidad de la válvula", "Una reducción automática del consumo eléctrico de la red"], correcta: 0 },
  { enunciado: "¿Qué elementos básicos suele tener en común cualquier válvula de la red?", explicacion: "Cuerpo, elemento de cierre, sistema de accionamiento y elementos de estanqueidad.", dificultad: "media", opciones: ["Cuerpo, elemento de cierre, accionamiento y estanqueidad", "Exclusivamente un contador de caudal integrado", "Exclusivamente un sistema de telecontrol integrado", "Exclusivamente una arqueta de registro asociada"], correcta: 0 },
]);

const S2 = "valvulas-compuerta-cierre-elastico-metal";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Cómo funciona una válvula de compuerta?", reverso: "Mediante una compuerta que se desplaza de forma perpendicular al flujo del agua, subiendo o bajando dentro del cuerpo de la válvula, hasta obstruir por completo el paso o liberarlo totalmente" },
  { anverso: "¿En qué consiste el cierre elástico de una válvula de compuerta?", reverso: "La compuerta va recubierta de un elastómero (goma sintética) que, al descender, se ajusta y deforma ligeramente contra el cuerpo de la válvula, garantizando la estanqueidad sin necesidad de un asiento metálico mecanizado" },
  { anverso: "¿En qué consiste el cierre metal de una válvula de compuerta?", reverso: "La estanqueidad se logra por el contacto directo entre dos superficies metálicas mecanizadas (la compuerta y el asiento del cuerpo), un sistema más antiguo y más sensible a pequeñas impurezas o incrustaciones que puedan impedir un cierre perfecto" },
  { anverso: "¿Qué ventaja presenta el cierre elástico frente al cierre metal en una válvula de compuerta?", reverso: "Una estanqueidad más fiable y duradera, al tolerar mejor pequeñas partículas o irregularidades en el asiento, por lo que es el sistema predominante en las válvulas de nueva instalación" },
  { anverso: "¿Qué componentes principales integran una válvula de compuerta, además de la propia compuerta?", reverso: "El cuerpo, el husillo (vástago roscado que transforma el giro del accionamiento en desplazamiento lineal de la compuerta), la tapa o cierre superior, y el sistema de accionamiento (volante o cuadradillo para llave de maniobra)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Cómo funciona una válvula de compuerta?", explicacion: "Mediante una compuerta que se desplaza perpendicular al flujo, obstruyéndolo o liberándolo.", dificultad: "facil", opciones: ["Mediante una compuerta que se desplaza perpendicular al flujo", "Mediante un disco que gira sobre un eje central paralelo al flujo", "Mediante un muelle que regula automáticamente la presión", "Mediante un flotador que sube y baja según el nivel de agua"], correcta: 0 },
  { enunciado: "¿En qué consiste el cierre elástico de una válvula de compuerta?", explicacion: "La compuerta va recubierta de un elastómero que se ajusta contra el cuerpo.", dificultad: "media", opciones: ["La compuerta va recubierta de un elastómero que se ajusta al cuerpo", "El cierre se logra por contacto directo entre dos piezas metálicas", "El cierre se logra mediante un disco excéntrico giratorio", "El cierre se logra exclusivamente mediante presión hidráulica externa"], correcta: 0 },
  { enunciado: "¿En qué consiste el cierre metal de una válvula de compuerta?", explicacion: "La estanqueidad se logra por contacto directo entre superficies metálicas mecanizadas.", dificultad: "media", opciones: ["Por contacto directo entre superficies metálicas mecanizadas", "Mediante un elastómero que recubre la compuerta", "Mediante un muelle interno que regula la presión de cierre", "Mediante una junta tórica de goma en el eje de accionamiento"], correcta: 0 },
  { enunciado: "¿Qué ventaja presenta el cierre elástico frente al cierre metal?", explicacion: "Una estanqueidad más fiable ante pequeñas partículas o irregularidades.", dificultad: "dificil", opciones: ["Una estanqueidad más fiable ante pequeñas partículas o irregularidades", "Un coste de fabricación siempre inferior en cualquier diámetro", "Una resistencia mecánica siempre superior al cierre metal", "La imposibilidad de sufrir ningún tipo de desgaste con el uso"], correcta: 0 },
  { enunciado: "¿Qué es el husillo de una válvula de compuerta?", explicacion: "El vástago roscado que transforma el giro del accionamiento en desplazamiento de la compuerta.", dificultad: "dificil", opciones: ["El vástago roscado que transforma el giro en desplazamiento", "El elastómero que recubre la compuerta en el cierre elástico", "El disco que gira sobre un eje central en una válvula de mariposa", "El contador que mide el caudal que atraviesa la válvula"], correcta: 0 },
]);

const S3 = "valvulas-mariposa-reductoras-presion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cómo funciona una válvula de mariposa?", reverso: "Mediante un disco que gira sobre un eje, situado en el interior del cuerpo de la válvula y perpendicular (o próximo a perpendicular) al flujo, de modo que al girar 90° pasa de obstruir totalmente el paso a dejarlo libre" },
  { anverso: "¿Qué es una válvula de mariposa de eje excéntrico?", reverso: "Aquella en la que el eje de giro del disco está desplazado respecto al centro geométrico del disco y del cuerpo, lo que reduce el rozamiento entre disco y asiento durante la maniobra y mejora su vida útil y su estanqueidad" },
  { anverso: "¿Qué es una válvula de mariposa de eje cerrado (o concéntrico)?", reverso: "Aquella en la que el eje de giro del disco coincide con el centro geométrico del disco y del cuerpo, un diseño más simple pero con mayor rozamiento entre disco y asiento durante la maniobra" },
  { anverso: "¿En qué situaciones se prefiere la válvula de mariposa frente a la de compuerta?", reverso: "En diámetros grandes y espacios reducidos, ya que la mariposa es más compacta y ligera, y permite una maniobra más rápida (un cuarto de vuelta) frente al recorrido más largo del husillo de una compuerta" },
  { anverso: "¿Cómo funciona una válvula reductora de presión?", reverso: "Regula automáticamente su grado de apertura para mantener, a su salida, una presión inferior y más estable que la de entrada, con independencia de las variaciones de caudal o de presión aguas arriba, protegiendo así la red o las instalaciones situadas aguas abajo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cómo funciona una válvula de mariposa?", explicacion: "Mediante un disco que gira 90° sobre un eje, obstruyendo o liberando el paso.", dificultad: "facil", opciones: ["Mediante un disco que gira 90° sobre un eje", "Mediante una compuerta que se desplaza perpendicular al flujo", "Mediante un muelle que regula automáticamente la presión", "Mediante un flotador que sube y baja según el nivel de agua"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a una válvula de mariposa de eje excéntrico?", explicacion: "El eje de giro está desplazado del centro, reduciendo el rozamiento disco-asiento.", dificultad: "dificil", opciones: ["El eje de giro está desplazado del centro geométrico", "El eje de giro coincide siempre con el centro geométrico", "Carece por completo de asiento de estanqueidad", "No puede emplearse en ningún diámetro superior a 100 mm"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a una válvula de mariposa de eje cerrado o concéntrico?", explicacion: "El eje de giro coincide con el centro geométrico del disco y el cuerpo.", dificultad: "media", opciones: ["El eje de giro coincide con el centro geométrico del disco", "El eje de giro está siempre desplazado del centro geométrico", "Carece por completo de mecanismo de accionamiento manual", "Solo puede instalarse en posición vertical de la conducción"], correcta: 0 },
  { enunciado: "¿En qué situaciones se prefiere la válvula de mariposa frente a la de compuerta?", explicacion: "En diámetros grandes y espacios reducidos, por ser más compacta y rápida de maniobrar.", dificultad: "media", opciones: ["En diámetros grandes y espacios reducidos", "Únicamente en acometidas domiciliarias de pequeño calibre", "Únicamente cuando se requiere un cierre metal exclusivamente", "Nunca se prefiere frente a la válvula de compuerta"], correcta: 0 },
  { enunciado: "¿Qué función cumple una válvula reductora de presión?", explicacion: "Mantiene a su salida una presión inferior y estable, con independencia de la entrada.", dificultad: "media", opciones: ["Mantiene a su salida una presión inferior y estable", "Aumenta artificialmente la presión disponible aguas abajo", "Mide el caudal exacto que circula por la conducción", "Purga el aire acumulado en los puntos altos de la red"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 13 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 13, orden: 13, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-193 creado y vinculado como Tema 13 de Oficial Guardallaves.");

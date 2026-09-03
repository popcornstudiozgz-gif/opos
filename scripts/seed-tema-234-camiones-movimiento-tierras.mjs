/**
 * Crea tema-234: "Camiones específicos para movimiento de tierras" —
 * Tema 22 (numero=22, bloque-2, último tema de la parte específica) de
 * Oficial Conductor, Especialidad Maquinaria Pesada (Ayto. de
 * Zaragoza).
 *
 * Corresponde al TEMA 20 oficial del Anexo I (bases2110.pdf, línea
 * 2192): "Camiones específicos para movimiento de tierras. Tipos.
 * Métodos de trabajo."
 *
 * Normativa ya citada y verificada en esta oposición:
 * - RD 2822/1998, de 23 de diciembre, Reglamento General de Vehículos
 *   (BOE-A-1999-1826) — ya citado en tema-219 y tema-230, categorías de
 *   vehículos aplicables a los camiones de obra.
 * - RD 1428/2003, Reglamento General de Circulación (BOE-A-2003-23514)
 *   — ya citado en temas anteriores.
 * El resto (tipos de dumper, métodos de trabajo) es conocimiento
 * técnico consolidado del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-234-camiones-movimiento-tierras.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-234";
const OPOSICION = "oficial-conductor-maquinaria-pesada-ayto-zaragoza";
const BLOQUE_2_ID = "388bfbfc-396e-4de2-8897-09532d6a0bcd";

const RD_2822_1998 = "https://www.boe.es/buscar/act.php?id=BOE-A-1999-1826";
const RD_1428_2003 = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514";

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
  titulo: "Camiones específicos para movimiento de tierras",
  descripcion: "Tipos de camiones específicos para movimiento de tierras: dumper rígido y articulado. Métodos de trabajo y ciclo de carga y transporte. Normativa de vehículos aplicable a estos camiones de obra.",
  contenido: "Desarrolla, como último tema de la parte específica de esta oposición, los camiones específicos para movimiento de tierras: sus tipos, con especial atención al dumper rígido y al dumper articulado, distintos de un camión de carretera convencional por sus características constructivas adaptadas al trabajo fuera de vía pública; sus métodos de trabajo y el ciclo de carga, transporte y descarga que desarrollan en coordinación con la maquinaria de carga (excavadora o pala cargadora); y el encaje de estos vehículos dentro de las categorías y exigencias del Reglamento General de Vehículos y del Reglamento General de Circulación cuando circulan por vía pública.",
  enlaces_boe: [
    { url: RD_2822_1998, titulo: "RD 2822/1998 — Reglamento General de Vehículos" },
    { url: RD_1428_2003, titulo: "RD 1428/2003 — Reglamento General de Circulación" },
  ],
  indice_estudio: [
    { url: "", titulo: "Tipos de camiones para movimiento de tierras: dumper rígido y articulado", seccion: "camiones-movimiento-tierras-tipos-dumper-articulado", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Métodos de trabajo: el ciclo de carga y transporte", seccion: "camiones-metodos-trabajo-ciclo-carga-transporte", articulos: "Conocimiento técnico del oficio" },
    { url: RD_2822_1998, titulo: "Normativa de vehículos aplicable a los camiones de obra", seccion: "seguridad-camiones-obra-normativa-vehiculos", articulos: "RD 2822/1998, RD 1428/2003" },
  ],
}]);

const S1 = "camiones-movimiento-tierras-tipos-dumper-articulado";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un dumper, como camión específico para movimiento de tierras?", reverso: "Un vehículo pesado de caja basculante, diseñado específicamente para el transporte de materiales a granel (tierras, áridos, escombros) en terrenos irregulares fuera de vía pública convencional, con una robustez y una capacidad de carga superiores a las de un camión de carretera equivalente" },
  { anverso: "¿Qué es un dumper rígido?", reverso: "Un dumper cuyo chasis es de una sola pieza, sin articulación entre el eje delantero y el trasero, lo que le confiere mayor capacidad de carga y estabilidad en terreno relativamente firme, a costa de una menor maniobrabilidad en terreno muy irregular" },
  { anverso: "¿Qué es un dumper articulado?", reverso: "Un dumper cuyo chasis está dividido en dos secciones unidas por una articulación central que permite el giro entre ambas, lo que le proporciona una notable mejora en la tracción y en la capacidad de adaptación a terrenos muy irregulares o embarrados, a costa de una capacidad de carga generalmente algo menor que la de un dumper rígido equivalente" },
  { anverso: "¿Qué ventaja ofrece la articulación central de un dumper articulado en terrenos blandos o con pendiente irregular?", reverso: "Permite que todas las ruedas mantengan un mejor contacto con el terreno al adaptarse mejor a sus irregularidades, mejorando la tracción disponible y reduciendo el riesgo de que una rueda quede sin apoyo en una zanja o socavón del terreno" },
  { anverso: "¿En qué se diferencia un camión de obra (dumper) de un camión convencional de carretera, en cuanto a su caja de carga?", reverso: "La caja del dumper es basculante (con sistema hidráulico de volteo para la descarga) y de mayor robustez estructural, preparada para recibir el impacto de materiales pesados descargados directamente desde una excavadora o pala cargadora, a diferencia de una caja de carretera convencional" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un dumper?", explicacion: "Un vehículo pesado de caja basculante diseñado para transportar materiales a granel en terreno irregular.", dificultad: "facil", opciones: ["Un vehículo de caja basculante para materiales a granel", "Una máquina exclusiva para la excavación de zanjas", "Una máquina exclusiva para la nivelación fina de firmes", "Un tipo de compactador de rodillo vibratorio"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un dumper rígido?", explicacion: "Chasis de una sola pieza, sin articulación entre eje delantero y trasero.", dificultad: "media", opciones: ["Chasis de una sola pieza, sin articulación central", "Chasis dividido en dos secciones articuladas", "La ausencia total de caja basculante", "La ausencia total de motor diésel propio"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un dumper articulado?", explicacion: "Chasis dividido en dos secciones unidas por una articulación central.", dificultad: "media", opciones: ["Chasis dividido en dos secciones con articulación central", "Chasis de una sola pieza sin ninguna articulación", "La ausencia total de sistema hidráulico de volteo", "Un tamaño siempre inferior al de un dumper rígido"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece la articulación central de un dumper articulado en terreno irregular?", explicacion: "Mejor contacto de todas las ruedas con el terreno y mayor tracción disponible.", dificultad: "dificil", opciones: ["Mejor contacto con el terreno y mayor tracción disponible", "Ninguna ventaja real frente a un dumper rígido equivalente", "Una capacidad de carga siempre superior a un dumper rígido", "Una velocidad máxima siempre superior a un dumper rígido"], correcta: 0 },
  { enunciado: "¿Qué diferencia la caja de un dumper de la de un camión convencional de carretera?", explicacion: "Es basculante, con sistema hidráulico de volteo, y de mayor robustez estructural.", dificultad: "media", opciones: ["Es basculante y de mayor robustez estructural", "Es idéntica en todos los aspectos a la de un camión convencional", "Carece por completo de sistema de descarga propio", "Solo puede transportar materiales líquidos o semilíquidos"], correcta: 0 },
]);

const S2 = "camiones-metodos-trabajo-ciclo-carga-transporte";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Cuáles son las fases básicas del ciclo de trabajo de un camión de obra (dumper) en coordinación con una excavadora o pala cargadora?", reverso: "Posicionamiento en el punto de carga, espera y recepción de la carga desde la máquina de carga, desplazamiento hasta el punto de descarga o de acopio, maniobra de descarga mediante el volteo de la caja, y regreso vacío al punto de carga para iniciar un nuevo ciclo" },
  { anverso: "¿Qué debe comprobar la persona conductora de un dumper antes de posicionarse bajo el equipo de carga de una excavadora o pala cargadora?", reverso: "Que la máquina de carga ha detectado su presencia y está preparada para cargar, que se sitúa en la posición correcta indicada (habitualmente mediante gestos o señales acordadas), y que ninguna otra persona se encuentra en la zona de maniobra entre ambos vehículos" },
  { anverso: "¿Qué precaución debe adoptar la persona conductora de un dumper durante la propia operación de carga, mientras la máquina descarga material sobre su caja?", reverso: "Permanecer en la cabina con las puertas y ventanas cerradas si el material se descarga desde una altura considerable, y mantener el vehículo completamente inmóvil hasta que la máquina de carga confirme que ha finalizado la descarga" },
  { anverso: "¿Qué precaución debe respetarse al circular con un dumper cargado por una pista de obra con pendiente pronunciada?", reverso: "Adaptar la velocidad a las condiciones del firme y de la pendiente, evitar frenadas o giros bruscos que puedan comprometer la estabilidad del vehículo cargado, y respetar en todo momento la carga máxima admisible del propio dumper" },
  { anverso: "¿Qué precaución debe respetarse en la maniobra de descarga de un dumper mediante el volteo de la caja?", reverso: "Situar el vehículo sobre terreno firme y lo más nivelado posible antes de accionar el volteo, y mantener una distancia de seguridad respecto a personas o a bordes de excavación durante toda la maniobra, dado que el desplazamiento del centro de gravedad al elevar la caja puede comprometer la estabilidad del vehículo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Cuál es una de las fases básicas del ciclo de trabajo de un dumper en coordinación con una excavadora?", explicacion: "El posicionamiento en el punto de carga, entre otras fases del ciclo.", dificultad: "media", opciones: ["El posicionamiento en el punto de carga", "La compactación del material ya descargado", "La nivelación final de la superficie de descarga", "El mantenimiento periódico del propio dumper"], correcta: 0 },
  { enunciado: "¿Qué debe comprobar la persona conductora de un dumper antes de posicionarse bajo el equipo de carga?", explicacion: "Que la máquina ha detectado su presencia y que nadie está en la zona de maniobra.", dificultad: "media", opciones: ["Que la máquina la ha detectado y no hay nadie en la zona", "Únicamente que dispone de combustible suficiente", "Ninguna comprobación adicional distinta de encender el motor", "Únicamente el color de la máquina de carga"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse durante la operación de carga sobre la caja del dumper?", explicacion: "Permanecer inmóvil hasta que la máquina de carga confirme que ha finalizado la descarga.", dificultad: "media", opciones: ["Permanecer inmóvil hasta confirmar el fin de la descarga", "Iniciar la marcha en cuanto se detecta el primer material cargado", "Salir del vehículo mientras se realiza la carga", "Aumentar la velocidad del motor durante toda la carga"], correcta: 0 },
  { enunciado: "¿Qué precaución debe respetarse al circular con un dumper cargado por una pista con pendiente pronunciada?", explicacion: "Adaptar la velocidad y evitar frenadas o giros bruscos, respetando la carga máxima admisible.", dificultad: "media", opciones: ["Adaptar la velocidad y evitar maniobras bruscas", "Circular siempre a la máxima velocidad posible del vehículo", "No existe ninguna precaución adicional relevante en pendiente", "Superar la carga máxima admisible si la pista lo permite"], correcta: 0 },
  { enunciado: "¿Qué precaución debe respetarse en la maniobra de descarga mediante volteo de la caja?", explicacion: "Situarse sobre terreno firme y nivelado, manteniendo distancia de seguridad respecto a personas o bordes.", dificultad: "dificil", opciones: ["Terreno firme y nivelado, con distancia de seguridad", "Ninguna precaución adicional distinta de accionar el volteo", "Realizar siempre la descarga sobre un talud pronunciado", "Realizar la descarga con el motor apagado en todo momento"], correcta: 0 },
]);

const S3 = "seguridad-camiones-obra-normativa-vehiculos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué consideración tiene, a efectos del Reglamento General de Vehículos, un dumper de obra destinado exclusivamente al trabajo dentro de una explotación o de una obra, sin circular por vía pública?", reverso: "Puede no requerir matriculación ni las mismas exigencias que un vehículo de circulación general, en función de sus características constructivas y de su uso exclusivo fuera de las vías públicas objeto de la normativa de tráfico, si bien debe cumplir igualmente los requisitos de seguridad de las máquinas (RD 1644/2008)" },
  { anverso: "¿Qué exigencias adicionales se aplican a un dumper cuando sí debe circular por vía pública para desplazarse entre obras o hasta un vertedero autorizado?", reverso: "Las correspondientes a su categoría de vehículo conforme al Reglamento General de Vehículos, incluida su matriculación si procede, el cumplimiento de las normas de comportamiento del Reglamento General de Circulación, y las condiciones de anchura, altura y masa aplicables según su autorización" },
  { anverso: "¿Qué elementos de señalización y alumbrado son exigibles a un dumper que circula por vía pública, de forma análoga a otros vehículos especiales ya estudiados en esta oposición?", reverso: "Las luces y catadióptricos correspondientes a su categoría, y, en su caso, la señal distintiva de vehículo lento (V-20), si su velocidad máxima por construcción es inferior al umbral que exige portarla conforme a la normativa de tráfico" },
  { anverso: "¿Qué documentación debe portar, con carácter general, la persona conductora de un dumper que circula por vía pública?", reverso: "El permiso de conducción de la categoría exigida para ese tipo de vehículo, la documentación del propio vehículo (ficha técnica, tarjeta de inspección técnica si procede) y, en su caso, la autorización complementaria de circulación si el vehículo la requiere por sus características" },
  { anverso: "¿Por qué es relevante para el Oficial Conductor de Maquinaria Pesada conocer estas normas de vehículos aplicables al dumper, más allá de su uso exclusivamente dentro de la obra?", reverso: "Porque en la práctica habitual del oficio es frecuente que el propio dumper deba desplazarse por tramos de vía pública para acceder a distintas zonas de una obra urbana, para trasladarse entre obras próximas, o para dirigirse a un vertedero o planta de tratamiento autorizada" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué consideración puede tener un dumper destinado exclusivamente al trabajo dentro de una obra, sin circular por vía pública?", explicacion: "Puede no requerir matriculación ni las exigencias de un vehículo de circulación general, cumpliendo igualmente el RD 1644/2008.", dificultad: "dificil", opciones: ["Puede no requerir matriculación, cumpliendo igualmente la normativa de máquinas", "Debe cumplir siempre exactamente las mismas exigencias que un turismo", "Queda excluido de cualquier normativa de seguridad aplicable", "Debe portar siempre placas de matrícula extranjera temporal"], correcta: 0 },
  { enunciado: "¿Qué exigencias se aplican a un dumper cuando debe circular por vía pública entre obras?", explicacion: "Las de su categoría según el Reglamento General de Vehículos y las normas del Reglamento General de Circulación.", dificultad: "media", opciones: ["Las de su categoría de vehículo y las normas de circulación", "Ninguna exigencia adicional distinta del uso exclusivo en obra", "Únicamente el pago de una tasa municipal de circulación", "Únicamente una autorización verbal del jefe de obra"], correcta: 0 },
  { enunciado: "¿Qué señal distintiva puede ser exigible a un dumper de baja velocidad que circula por vía pública?", explicacion: "La señal V-20 de vehículo lento, según su velocidad máxima por construcción.", dificultad: "media", opciones: ["La señal V-20 de vehículo lento", "Una bandera roja portada por un peatón guía", "Un distintivo exclusivo de vehículo eléctrico", "Ninguna señal distintiva resulta nunca exigible"], correcta: 0 },
  { enunciado: "¿Qué documentación debe portar, con carácter general, la persona conductora de un dumper que circula por vía pública?", explicacion: "El permiso de conducción exigido, la documentación del vehículo y, en su caso, la autorización complementaria.", dificultad: "media", opciones: ["Permiso de conducción, documentación del vehículo y autorización", "Ninguna documentación específica distinta de la propia obra", "Únicamente un justificante de la empresa contratista", "Únicamente el parte de mantenimiento del propio dumper"], correcta: 0 },
  { enunciado: "¿Por qué es relevante para el Oficial Conductor conocer la normativa de vehículos aplicable al dumper?", explicacion: "Es frecuente que deba desplazarse por vía pública entre zonas de obra o hasta un vertedero autorizado.", dificultad: "media", opciones: ["Es frecuente que deba desplazarse por vía pública en su trabajo", "El dumper nunca circula por vía pública en ninguna circunstancia", "Solo es relevante si la obra dura más de un año", "Solo es relevante para el personal técnico, no para el operador"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 22 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 22, orden: 22, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-234 creado y vinculado como Tema 22 de Oficial Conductor Maquinaria Pesada (último tema de la parte específica).");

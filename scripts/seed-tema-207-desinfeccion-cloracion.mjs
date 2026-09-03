/**
 * Crea tema-207: "La desinfección: la cloración" — Tema 11 (numero=11,
 * bloque-2) de Oficial Planta Potabilizadora (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 9 oficial del Anexo I (bases2110.pdf, línea
 * 1153): "La desinfección de aguas de consumo público: Su necesidad.
 * La cloración. Objetivos de la cloración. Factores más importantes
 * que influyen en la desinfección y oxidación por cloro. Las pérdidas
 * de cloro residual en la red de distribución: causas y factores a
 * tener en cuenta. La medida del cloro residual. Cloración por
 * hipoclorito sódico: Características y peculiaridades del empleo de
 * hipoclorito sódico. Control y automatismo del almacenamiento y la
 * dosificación."
 *
 * Fuentes primarias verificadas mediante búsqueda en esta sesión:
 * - Ayuntamiento de Zaragoza, portal de infraestructuras, "Potabilización
 *   de agua": la Planta de Casablanca aplica precloración (para oxidar
 *   materia orgánica) y una desinfección final mediante hipoclorito
 *   antes de la distribución.
 * - Real Decreto 140/2003, ya verificado en el proyecto: exige el
 *   mantenimiento de un nivel de cloro residual libre en el punto de
 *   entrega al consumidor dentro de los parámetros sanitarios exigidos.
 * El resto del contenido (factores de la desinfección, pérdidas de
 * cloro residual en la red, características del hipoclorito sódico,
 * control y automatismo de su almacenamiento y dosificación) es
 * conocimiento técnico consolidado del tratamiento de aguas.
 *
 * Tres secciones:
 * 1. necesidad-objetivos-cloracion-factores-desinfeccion
 * 2. cloro-residual-perdidas-red-medida
 * 3. hipoclorito-sodico-almacenamiento-dosificacion-automatismo
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-207-desinfeccion-cloracion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-207";
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
  titulo: "La desinfección: la cloración",
  descripcion: "Necesidad y objetivos de la cloración. Factores de la desinfección por cloro. Pérdidas y medida del cloro residual en la red. Cloración por hipoclorito sódico: características, almacenamiento y dosificación automatizada.",
  contenido: "Desarrolla la desinfección del agua de consumo público, última etapa del tratamiento de potabilización antes de su distribución: su necesidad, la cloración como método de desinfección habitual y sus objetivos, los factores que más influyen en la desinfección y la oxidación por cloro, las pérdidas de cloro residual en la red de distribución y su medida, y la cloración por hipoclorito sódico empleada en la Planta Potabilizadora de Casablanca, con el control y automatismo de su almacenamiento y dosificación.",
  enlaces_boe: [
    "https://www.boe.es/buscar/act.php?id=BOE-A-2003-3596",
    "https://www.zaragoza.es/sede/portal/infraestructuras/agua/potabilizacion",
  ],
  indice_estudio: [
    { url: "", titulo: "Necesidad, objetivos de la cloración y factores de la desinfección", seccion: "necesidad-objetivos-cloracion-factores-desinfeccion", articulos: "Conocimiento técnico del tratamiento de aguas" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-3596", titulo: "Cloro residual: pérdidas en la red y su medida", seccion: "cloro-residual-perdidas-red-medida", articulos: "RD 140/2003; conocimiento técnico del tratamiento de aguas" },
    { url: "https://www.zaragoza.es/sede/portal/infraestructuras/agua/potabilizacion", titulo: "Cloración por hipoclorito sódico: almacenamiento, dosificación y automatismo", seccion: "hipoclorito-sodico-almacenamiento-dosificacion-automatismo", articulos: "Ayuntamiento de Zaragoza — Potabilización del agua" },
  ],
}]);

const S1 = "necesidad-objetivos-cloracion-factores-desinfeccion";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Por qué es necesaria la desinfección de un agua de consumo público, incluso después de haber pasado por decantación y filtración?", reverso: "Porque estos procesos físicos no garantizan por sí solos la eliminación total de bacterias y microorganismos patógenos, siendo necesaria una etapa de desinfección específica antes de distribuir el agua al consumo humano" },
  { anverso: "¿Qué es la cloración, como método de desinfección del agua?", reverso: "La adición de cloro (o un compuesto que lo libere, como el hipoclorito sódico) al agua, con capacidad de destruir bacterias y microorganismos patógenos mediante su acción oxidante" },
  { anverso: "¿Cuáles son los dos grandes objetivos de la cloración del agua de consumo?", reverso: "Desinfectar el agua eliminando microorganismos patógenos, y mantener un nivel de cloro residual que proteja el agua frente a una posible recontaminación durante su recorrido por la red de distribución hasta el consumidor" },
  { anverso: "¿Qué factores influyen principalmente en la eficacia de la desinfección y la oxidación por cloro?", reverso: "La dosis de cloro aplicada, el tiempo de contacto entre el cloro y el agua, el pH del agua, la temperatura, y la presencia de materia orgánica u otras sustancias que consuman parte del cloro añadido (demanda de cloro)" },
  { anverso: "¿Por qué es relevante el pH del agua para la eficacia de la desinfección por cloro?", reverso: "Porque el pH determina la proporción entre las dos formas químicas del cloro libre en el agua (ácido hipocloroso e ion hipoclorito), siendo el ácido hipocloroso considerablemente más eficaz como desinfectante que el ion hipoclorito" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Por qué es necesaria la desinfección incluso después de la decantación y la filtración?", explicacion: "Estos procesos físicos no garantizan por sí solos la eliminación total de patógenos.", dificultad: "facil", opciones: ["Los procesos físicos no garantizan la eliminación total de patógenos", "La decantación y la filtración ya eliminan por completo cualquier patógeno", "La desinfección solo es necesaria si el agua procede de pozos profundos", "La desinfección no aporta ninguna mejora real tras esos procesos previos"], correcta: 0 },
  { enunciado: "¿Qué es la cloración, como método de desinfección del agua?", explicacion: "La adición de cloro (o un compuesto que lo libere) con capacidad de destruir microorganismos patógenos.", dificultad: "facil", opciones: ["La adición de cloro con capacidad de destruir patógenos", "La adición de sulfato de alúmina para desestabilizar partículas", "El paso del agua a través de un lecho de arena o carbón activo", "La eliminación de sólidos gruesos mediante rejas de desbaste"], correcta: 0 },
  { enunciado: "¿Cuáles son los dos grandes objetivos de la cloración del agua de consumo?", explicacion: "Desinfectar y mantener un cloro residual que proteja frente a recontaminación en la red.", dificultad: "media", opciones: ["Desinfectar y mantener un cloro residual protector en la red", "Únicamente mejorar el sabor y el olor del agua tratada", "Únicamente reducir la turbidez del agua ya decantada", "Únicamente ajustar el pH del agua antes de su distribución"], correcta: 0 },
  { enunciado: "¿Qué factores influyen principalmente en la eficacia de la desinfección por cloro?", explicacion: "La dosis, el tiempo de contacto, el pH, la temperatura y la demanda de cloro.", dificultad: "media", opciones: ["La dosis, el tiempo de contacto, el pH y la demanda de cloro", "Únicamente el color exterior del depósito de almacenamiento", "Únicamente la hora del día en que se realiza la dosificación", "Únicamente la marca comercial del hipoclorito empleado"], correcta: 0 },
  { enunciado: "¿Por qué es relevante el pH del agua para la eficacia de la desinfección por cloro?", explicacion: "Determina la proporción entre ácido hipocloroso e ion hipoclorito, de eficacia distinta.", dificultad: "dificil", opciones: ["Determina la proporción entre formas de cloro de distinta eficacia", "El pH no tiene ninguna relación real con la eficacia de la cloración", "Un pH más alto siempre mejora la eficacia de la desinfección", "El pH solo es relevante en la etapa de coagulación-floculación"], correcta: 0 },
]);

const S2 = "cloro-residual-perdidas-red-medida";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el cloro residual libre en una conducción de la red de distribución?", reverso: "La cantidad de cloro que permanece disponible en el agua, en su forma activa, después de haber satisfecho la demanda inicial de desinfección, y que actúa como protección residual frente a una posible recontaminación posterior" },
  { anverso: "¿Cuáles son algunas de las causas más habituales de pérdida de cloro residual a lo largo de la red de distribución?", reverso: "El tiempo de permanencia del agua en la red (a mayor tiempo, mayor pérdida por reacción con materia orgánica o con las paredes de la tubería), la temperatura del agua, la presencia de biofilm en las conducciones, y las fugas o zonas de bajo consumo con agua estancada" },
  { anverso: "¿Por qué es un problema que el cloro residual se agote antes de llegar a los puntos más alejados de la red?", reverso: "Porque esos puntos quedan sin la protección residual frente a una posible recontaminación durante su recorrido final, incumpliendo además el nivel mínimo de cloro residual exigido por la normativa sanitaria en el punto de entrega al consumidor" },
  { anverso: "¿Qué métodos existen para medir el cloro residual del agua?", reverso: "Métodos analíticos manuales en laboratorio o con kits de campo (por ejemplo, colorimétricos con reactivo DPD), y sistemas de medición en continuo mediante sondas o analizadores automáticos instalados en puntos estratégicos de la planta y de la red" },
  { anverso: "¿Qué medida de gestión de la red puede emplearse para compensar una pérdida excesiva de cloro residual en zonas alejadas del punto de tratamiento?", reverso: "La recloración en puntos intermedios de la red (estaciones de recloración), que añaden una dosis adicional de cloro para restablecer el nivel de cloro residual antes de que el agua llegue a las zonas más alejadas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el cloro residual libre en una conducción de la red?", explicacion: "El cloro que permanece disponible tras satisfacer la demanda inicial, protegiendo frente a recontaminación.", dificultad: "media", opciones: ["El cloro disponible tras la demanda inicial, protección residual", "El cloro que ya ha reaccionado por completo sin dejar ningún resto", "El cloro añadido exclusivamente en la etapa de precloración", "El cloro medido exclusivamente en el punto de captación del agua"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes es una causa habitual de pérdida de cloro residual en la red?", explicacion: "El tiempo de permanencia del agua en la red, entre otras causas.", dificultad: "media", opciones: ["El tiempo de permanencia del agua en la red", "La reducción del diámetro de la conducción en algún tramo", "El aumento de la presión disponible en la zona afectada", "La instalación de un contador de mayor calibre en la zona"], correcta: 0 },
  { enunciado: "¿Por qué es un problema que el cloro residual se agote antes de llegar a puntos alejados de la red?", explicacion: "Esos puntos quedan sin protección residual frente a una posible recontaminación.", dificultad: "media", opciones: ["Esos puntos quedan sin protección frente a recontaminación", "No genera ningún problema real para la calidad del agua entregada", "Mejora automáticamente el sabor del agua en esos puntos alejados", "Reduce de forma directa el consumo de agua de esos abonados"], correcta: 0 },
  { enunciado: "¿Qué método analítico habitual se emplea para medir el cloro residual?", explicacion: "Métodos colorimétricos con reactivo DPD, entre otros.", dificultad: "dificil", opciones: ["Métodos colorimétricos con reactivo DPD", "Exclusivamente la medición directa de la turbidez del agua", "Exclusivamente la medición directa del caudal de la conducción", "Exclusivamente la medición directa de la presión de la red"], correcta: 0 },
  { enunciado: "¿Qué medida permite compensar una pérdida excesiva de cloro residual en zonas alejadas de la red?", explicacion: "La recloración en puntos intermedios (estaciones de recloración).", dificultad: "media", opciones: ["La recloración en puntos intermedios de la red", "El aumento permanente de la presión de toda la red", "La reducción del calibre de los contadores de esa zona", "El cierre definitivo del suministro a esa zona concreta"], correcta: 0 },
]);

const S3 = "hipoclorito-sodico-almacenamiento-dosificacion-automatismo";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué reactivo emplea la Planta Potabilizadora de Casablanca en su etapa de desinfección final, según la información oficial del Ayuntamiento de Zaragoza?", reverso: "El hipoclorito, aplicado tanto en una precloración inicial (para oxidar materia orgánica) como en la desinfección final antes de la distribución" },
  { anverso: "¿Qué es el hipoclorito sódico?", reverso: "Una disolución acuosa de hipoclorito de sodio, un compuesto químico que libera cloro activo al disolverse en agua, empleado como reactivo de desinfección alternativo al cloro gas por su mayor facilidad y seguridad de manejo" },
  { anverso: "¿Qué peculiaridad presenta el hipoclorito sódico en cuanto a su estabilidad durante el almacenamiento?", reverso: "Se degrada progresivamente con el tiempo, la temperatura y la exposición a la luz, perdiendo concentración de cloro activo, por lo que requiere un almacenamiento adecuado (lugar fresco, protegido de la luz) y una renovación periódica de las existencias" },
  { anverso: "¿Qué elementos suele incluir un sistema de dosificación automatizada de hipoclorito sódico en una planta potabilizadora?", reverso: "Depósitos de almacenamiento del reactivo, bombas dosificadoras que regulan el caudal de inyección, y un sistema de control que ajusta automáticamente la dosis en función del caudal de agua a tratar y de las mediciones de cloro residual" },
  { anverso: "¿Qué ventaja aporta el control y automatismo de la dosificación de hipoclorito sódico frente a una dosificación manual?", reverso: "Permite mantener de forma constante y precisa la dosis adecuada de cloro pese a las variaciones de caudal y de calidad del agua bruta, reduciendo el riesgo tanto de una desinfección insuficiente como de una sobredosificación innecesaria" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué reactivo emplea la Planta Potabilizadora de Casablanca en su etapa de desinfección?", explicacion: "El hipoclorito, tanto en precloración como en la desinfección final.", dificultad: "media", opciones: ["El hipoclorito", "El sulfato de alúmina", "El almidón", "El dióxido de carbono"], correcta: 0 },
  { enunciado: "¿Qué es el hipoclorito sódico?", explicacion: "Una disolución acuosa que libera cloro activo al disolverse en agua.", dificultad: "facil", opciones: ["Una disolución acuosa que libera cloro activo", "Un reactivo exclusivo de la etapa de coagulación", "Un medio filtrante exclusivo de la etapa de filtración", "Un compuesto exclusivo para el ajuste del pH del agua"], correcta: 0 },
  { enunciado: "¿Qué peculiaridad presenta el hipoclorito sódico en cuanto a su almacenamiento?", explicacion: "Se degrada progresivamente con el tiempo, la temperatura y la luz.", dificultad: "media", opciones: ["Se degrada progresivamente con el tiempo, la temperatura y la luz", "Es un compuesto químicamente estable de forma indefinida", "No requiere ningún tipo de renovación periódica de existencias", "Mejora su concentración de cloro activo con el paso del tiempo"], correcta: 0 },
  { enunciado: "¿Qué elementos suele incluir un sistema de dosificación automatizada de hipoclorito sódico?", explicacion: "Depósitos de almacenamiento, bombas dosificadoras y un sistema de control.", dificultad: "media", opciones: ["Depósitos, bombas dosificadoras y un sistema de control", "Únicamente un depósito de almacenamiento sin ningún otro elemento", "Únicamente una bomba dosificadora sin ningún sistema de control", "Ningún elemento adicional distinto del propio reactivo almacenado"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta el automatismo de la dosificación de hipoclorito frente a una dosificación manual?", explicacion: "Mantiene una dosis constante y precisa pese a las variaciones de caudal y calidad.", dificultad: "dificil", opciones: ["Mantiene una dosis constante y precisa pese a las variaciones", "No aporta ninguna ventaja real frente a la dosificación manual", "Elimina por completo la necesidad de medir el cloro residual", "Reduce de forma automática el consumo total de agua de la planta"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 11 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 11, orden: 11, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-207 creado y vinculado como Tema 11 de Oficial Planta Potabilizadora.");

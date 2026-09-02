/**
 * Crea tema-172: "Distribución del automóvil" — Tema 8 (numero=8,
 * bloque-2) de Oficial Mecánico (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 6 oficial del Anexo I (bases2110.pdf, línea 1399):
 *   "Distribución del automóvil."
 *
 * Conocimiento técnico consolidado de mecánica del automóvil, sin una
 * ley española que lo regule como tal — mismo criterio que tema-171.
 * Búsqueda previa realizada conforme al estándar de sourcing del
 * proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-172-distribucion-automovil.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-172";
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
  titulo: "Distribución del automóvil",
  descripcion: "El sistema de distribución: concepto y función. Correa y cadena de distribución, tensores. Árbol de levas, taqués y sincronización con el cigüeñal.",
  contenido: "Desarrolla el sistema de distribución del motor de automóvil: su concepto y función de sincronizar la apertura y cierre de las válvulas con el movimiento del pistón, los elementos de transmisión del movimiento (correa o cadena de distribución, con sus tensores), y el árbol de levas y los taqués, junto con la importancia de una correcta sincronización con el cigüeñal.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "El sistema de distribución: concepto y función", seccion: "sistema-distribucion-concepto-funcion", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Correa y cadena de distribución. Tensores", seccion: "correa-cadena-distribucion-tensores", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Árbol de levas, taqués y sincronización", seccion: "arbol-levas-taques-sincronizacion", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "sistema-distribucion-concepto-funcion";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el sistema de distribución de un motor?", reverso: "El conjunto de elementos mecánicos que controlan la apertura y el cierre de las válvulas de admisión y escape en el momento exacto del ciclo del motor, sincronizando su movimiento con el del pistón a través del cigüeñal" },
  { anverso: "¿Cuál es la función principal del sistema de distribución?", reverso: "Garantizar que la entrada de la mezcla aire-combustible (o del aire, en motores de inyección directa) y la salida de los gases quemados se produzcan exactamente en el momento adecuado de cada ciclo, optimizando el rendimiento y la eficiencia del motor" },
  { anverso: "¿Por qué debe estar sincronizado el árbol de levas con el cigüeñal en un motor de cuatro tiempos?", reverso: "Porque el árbol de levas debe girar a la mitad de la velocidad del cigüeñal, dado que cada válvula solo se abre una vez por cada dos vueltas completas del cigüeñal en un ciclo de cuatro tiempos (admisión, compresión, explosión y escape)" },
  { anverso: "¿Qué consecuencia tiene una distribución desincronizada respecto al cigüeñal, en un motor donde las válvulas y los pistones comparten el mismo espacio (motor de interferencia)?", reverso: "Un riesgo real de colisión mecánica entre las válvulas abiertas y los pistones en movimiento, provocando daños graves en válvulas, pistones e incluso en la culata o el bloque motor" },
  { anverso: "¿Qué es un motor de interferencia, frente a uno sin interferencia?", reverso: "Un motor en el que las válvulas, al abrirse completamente, invaden el espacio que recorre el pistón en su punto más alto, por lo que una desincronización de la distribución provoca su colisión; en un motor sin interferencia, ese espacio no se invade y el riesgo de colisión no existe" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el sistema de distribución de un motor?", explicacion: "Controla la apertura y cierre de las válvulas sincronizado con el movimiento del pistón.", dificultad: "facil", opciones: ["Controla la apertura y cierre de las válvulas sincronizado con el pistón", "Controla exclusivamente la temperatura del motor durante su funcionamiento", "Controla exclusivamente la presión del aceite lubricante del motor", "Controla exclusivamente la mezcla de combustible en el carburador"], correcta: 0 },
  { enunciado: "¿Cuál es la función principal del sistema de distribución?", explicacion: "Garantizar que la admisión y el escape se produzcan en el momento adecuado del ciclo.", dificultad: "media", opciones: ["Garantizar que admisión y escape se produzcan en el momento adecuado", "Transformar el movimiento alternativo del pistón en rotación continua", "Enfriar el motor durante su funcionamiento habitual", "Almacenar el aceite lubricante del motor durante su funcionamiento"], correcta: 0 },
  { enunciado: "¿A qué velocidad debe girar el árbol de levas respecto al cigüeñal en un motor de cuatro tiempos?", explicacion: "A la mitad de la velocidad del cigüeñal.", dificultad: "dificil", opciones: ["A la mitad de la velocidad del cigüeñal", "A la misma velocidad exacta que el cigüeñal", "Al doble de la velocidad del cigüeñal", "Sin ninguna relación fija con la velocidad del cigüeñal"], correcta: 0 },
  { enunciado: "¿Qué riesgo conlleva una distribución desincronizada en un motor de interferencia?", explicacion: "Colisión mecánica entre válvulas y pistones, con daños graves.", dificultad: "media", opciones: ["Colisión mecánica entre válvulas y pistones", "Ningún riesgo relevante distinto de una pérdida de potencia leve", "Un aumento automático del rendimiento del motor", "Una reducción automática del consumo de combustible"], correcta: 0 },
  { enunciado: "¿Qué es un motor de interferencia?", explicacion: "Aquel en el que las válvulas abiertas invaden el espacio que recorre el pistón.", dificultad: "dificil", opciones: ["Aquel en el que las válvulas invaden el espacio del pistón", "Aquel que nunca puede sufrir ningún daño por desincronización", "Aquel que carece por completo de árbol de levas propio", "Aquel exclusivo de los motores eléctricos sin combustión interna"], correcta: 0 },
]);

const S2 = "correa-cadena-distribucion-tensores";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la correa de distribución?", reverso: "Una correa dentada, habitualmente de goma reforzada con fibras, que transmite el movimiento del cigüeñal al árbol o árboles de levas, manteniendo la sincronización necesaria del sistema de distribución" },
  { anverso: "¿Qué es la cadena de distribución, como alternativa a la correa?", reverso: "Una cadena metálica, similar a la de una bicicleta pero de mayor robustez, que cumple la misma función que la correa de distribución, con una vida útil habitualmente mayor pero un funcionamiento algo más ruidoso" },
  { anverso: "¿Qué es el tensor de la correa o cadena de distribución?", reverso: "Un dispositivo (mecánico o hidráulico) que mantiene la tensión adecuada de la correa o cadena durante todo su recorrido, compensando el desgaste y las vibraciones para evitar que patine o se salga de su posición correcta" },
  { anverso: "¿Por qué es importante sustituir la correa de distribución dentro del intervalo de kilometraje o tiempo recomendado por el fabricante, aunque no muestre signos visibles de desgaste?", reverso: "Porque el material de la correa se degrada progresivamente con el uso y el paso del tiempo, y su rotura repentina —especialmente en un motor de interferencia— puede provocar daños graves e imprevistos al motor" },
  { anverso: "¿Qué elementos se sustituyen habitualmente junto con la correa de distribución en una revisión preventiva completa?", reverso: "El propio tensor, y en muchos casos también la bomba de agua del circuito de refrigeración, ya que comparte el mismo accionamiento y su sustitución conjunta evita tener que repetir el trabajo de desmontaje en un futuro próximo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es la correa de distribución?", explicacion: "Una correa dentada que transmite el movimiento del cigüeñal al árbol de levas.", dificultad: "facil", opciones: ["Una correa dentada que transmite el movimiento al árbol de levas", "Una cadena metálica exclusiva de los motores diésel", "Un elemento exclusivo del sistema de frenos del vehículo", "Un elemento exclusivo del sistema de refrigeración del motor"], correcta: 0 },
  { enunciado: "¿Qué ventaja presenta habitualmente la cadena de distribución frente a la correa?", explicacion: "Una vida útil habitualmente mayor, aunque con un funcionamiento algo más ruidoso.", dificultad: "media", opciones: ["Una vida útil habitualmente mayor", "Un funcionamiento siempre más silencioso que la correa", "Un coste de sustitución siempre inferior al de la correa", "La ausencia total de necesidad de cualquier tensor"], correcta: 0 },
  { enunciado: "¿Qué función cumple el tensor de la correa o cadena de distribución?", explicacion: "Mantiene la tensión adecuada, compensando el desgaste y las vibraciones.", dificultad: "media", opciones: ["Mantiene la tensión adecuada de la correa o cadena", "Transforma el movimiento alternativo del pistón en rotación", "Sincroniza directamente la apertura de las válvulas de escape", "Enfría el motor durante su funcionamiento habitual"], correcta: 0 },
  { enunciado: "¿Por qué es importante sustituir la correa de distribución dentro del intervalo recomendado, aunque no muestre desgaste visible?", explicacion: "El material se degrada con el uso y el tiempo, y su rotura puede provocar daños graves.", dificultad: "media", opciones: ["El material se degrada con el uso y el tiempo", "La correa nunca se degrada con el paso del tiempo sin uso real", "Solo es relevante en motores sin interferencia entre válvulas y pistones", "La sustitución periódica solo es una recomendación estética del fabricante"], correcta: 0 },
  { enunciado: "¿Qué elemento se sustituye habitualmente junto con la correa de distribución en una revisión preventiva completa?", explicacion: "El tensor, y en muchos casos la bomba de agua del circuito de refrigeración.", dificultad: "dificil", opciones: ["El tensor y, en muchos casos, la bomba de agua", "Exclusivamente el cigüeñal completo del motor", "Exclusivamente el árbol de levas completo del motor", "Exclusivamente el sistema de frenos del vehículo"], correcta: 0 },
]);

const S3 = "arbol-levas-taques-sincronizacion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el árbol de levas?", reverso: "Un eje dotado de levas (protuberancias de perfil específico) que, al girar, empujan las válvulas o los taqués para abrir las válvulas de admisión o escape en el momento y con el recorrido exactos previstos por su diseño" },
  { anverso: "¿Qué es un taqué, en el sistema de distribución?", reverso: "El elemento intermedio situado entre la leva del árbol de levas y la propia válvula, que transmite el empuje de la leva a la válvula, permitiendo su apertura con el recorrido adecuado" },
  { anverso: "¿Qué es un taqué hidráulico, frente a uno mecánico convencional?", reverso: "Un taqué que, mediante presión de aceite, ajusta automáticamente la holgura de la válvula, eliminando la necesidad de un reglaje manual periódico propio de los taqués mecánicos convencionales" },
  { anverso: "¿Qué son las marcas de distribución (o marcas de reglaje) de un motor?", reverso: "Referencias grabadas en el cigüeñal, el árbol o los árboles de levas y otros elementos del sistema, que permiten alinear correctamente estos componentes al montar o sustituir la correa o cadena de distribución, garantizando la sincronización exacta del motor" },
  { anverso: "¿Qué debe comprobar el mecánico tras sustituir la correa o cadena de distribución de un motor, antes de darlo por finalizado?", reverso: "Que las marcas de distribución de cigüeñal y árbol o árboles de levas quedan correctamente alineadas, confirmando así que la sincronización del motor se ha restablecido de forma correcta" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el árbol de levas?", explicacion: "Un eje con levas que abre las válvulas al girar, en el momento y recorrido exactos.", dificultad: "facil", opciones: ["Un eje con levas que abre las válvulas al girar", "El eje acodado que transforma el movimiento en rotación continua", "El elemento que une el pistón con el cigüeñal del motor", "La pieza que actúa como depósito del aceite lubricante"], correcta: 0 },
  { enunciado: "¿Qué es un taqué en el sistema de distribución?", explicacion: "El elemento intermedio entre la leva y la válvula que transmite el empuje.", dificultad: "media", opciones: ["El elemento intermedio entre la leva y la válvula", "El eje que aloja todas las levas del sistema de distribución", "El elemento que transforma el movimiento del pistón en rotación", "La pieza que sella la cámara de combustión entre bloque y culata"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta un taqué hidráulico frente a uno mecánico convencional?", explicacion: "Ajusta automáticamente la holgura de la válvula, sin reglaje manual periódico.", dificultad: "media", opciones: ["Ajusta automáticamente la holgura de la válvula", "Requiere siempre un reglaje manual más frecuente que el mecánico", "Elimina por completo la necesidad de árbol de levas en el motor", "Solo puede emplearse en motores diésel de gran cilindrada"], correcta: 0 },
  { enunciado: "¿Qué son las marcas de distribución de un motor?", explicacion: "Referencias que permiten alinear correctamente cigüeñal y árbol de levas al montar la distribución.", dificultad: "dificil", opciones: ["Referencias que permiten alinear cigüeñal y árbol de levas", "Marcas exclusivas para identificar el tipo de aceite del motor", "Marcas exclusivas para identificar el fabricante del vehículo", "Referencias exclusivas del sistema de frenos del vehículo"], correcta: 0 },
  { enunciado: "¿Qué debe comprobar el mecánico tras sustituir la correa o cadena de distribución, antes de dar el trabajo por finalizado?", explicacion: "Que las marcas de distribución quedan correctamente alineadas.", dificultad: "media", opciones: ["Que las marcas de distribución quedan correctamente alineadas", "Que el color de la nueva correa coincide con la correa sustituida", "Que el peso de la nueva correa es idéntico al de la correa sustituida", "Ninguna comprobación adicional distinta de haber montado la nueva correa"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 8 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 8, orden: 8, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-172 creado y vinculado como Tema 8 de Oficial Mecánico.");

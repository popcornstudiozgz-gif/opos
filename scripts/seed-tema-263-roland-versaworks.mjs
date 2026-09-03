/**
 * Crea tema-263: "Roland VersaWorks versión 6.14.0 o posterior. Menús,
 * opciones y variables" — Tema 19 (numero=19, bloque-2) de Oficial
 * Pintor, Especialidad Gráfica (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 17 oficial del Anexo I (bases2110.pdf, línea
 * 1533): "Roland VersaWorks versión 6.14.0 o posterior. Menús, opciones
 * y variables."
 *
 * Conocimiento técnico de un software RIP (Raster Image Processor)
 * comercial concreto (VersaWorks, de Roland DG Corporation), sin
 * regulación legal propia más allá de su propia licencia de uso — no
 * existe normativa española que regule el funcionamiento de este
 * software. Búsqueda previa realizada conforme al estándar de sourcing
 * del proyecto: el temario oficial cita expresamente la versión
 * "6.14.0 o posterior", identificando el producto comercial concreto
 * que debe conocerse (el software de control de las impresoras de gran
 * formato Roland habituales en un taller de rotulación), sin que ello
 * constituya una fuente normativa sino la referencia al propio software
 * exigido.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-263-roland-versaworks.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-263";
const OPOSICION = "oficial-pintor-grafica-ayto-zaragoza";
const BLOQUE_2_ID = "1e5d5916-cf4a-4920-9175-579f18034ad6";

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
  titulo: "Roland VersaWorks 6.14.0 o posterior",
  descripcion: "Software RIP de control de impresoras de gran formato Roland. Menús, opciones y variables de trabajo. Flujo de preparación e impresión de un archivo.",
  contenido: "Desarrolla el manejo del software RIP (Raster Image Processor) Roland VersaWorks, versión 6.14.0 o posterior, empleado para el control de las impresoras de gran formato Roland habituales en un taller de rotulación: sus menús y opciones principales, las variables de trabajo que permiten ajustar la calidad, el tipo de soporte y el consumo de tinta de cada impresión, y el flujo completo de preparación de un archivo desde su recepción hasta su envío a impresión, incluyendo la organización de trabajos en cola y el control del color mediante perfiles ICC.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Menús y opciones principales de Roland VersaWorks", seccion: "menus-opciones-versaworks", articulos: "Conocimiento técnico del software" },
    { url: "", titulo: "Variables de trabajo: soporte, calidad y consumo de tinta", seccion: "variables-trabajo-versaworks", articulos: "Conocimiento técnico del software" },
    { url: "", titulo: "Flujo de preparación e impresión de un archivo", seccion: "flujo-preparacion-impresion-versaworks", articulos: "Conocimiento técnico del software" },
  ],
}]);

const S1 = "menus-opciones-versaworks";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un software RIP (Raster Image Processor), categoría a la que pertenece Roland VersaWorks?", reverso: "Un programa que traduce el archivo de diseño (vectorial o de mapa de bits) a un lenguaje que la impresora de gran formato puede interpretar directamente, gestionando además el control del color, el mosaico (tiling) de imágenes grandes y la disposición de los trabajos en la cola de impresión" },
  { anverso: "¿Qué es la cola de trabajos (Job Queue) de VersaWorks, elemento central de su interfaz?", reverso: "La lista de trabajos de impresión pendientes o en curso gestionada por el programa, desde la que puede consultarse el estado de cada trabajo, reordenar su prioridad, o pausarlo y reanudarlo sin necesidad de reenviar el archivo original" },
  { anverso: "¿Qué es el menú de \"Preferencias del dispositivo\" (Device Settings) de VersaWorks?", reverso: "El menú donde se configuran los parámetros específicos de la impresora conectada (modelo, tamaño máximo de soporte, tipos de tinta instalados), necesario para que el software genere una salida de impresión compatible con la máquina real del taller" },
  { anverso: "¿Qué es el mosaico o tiling, opción disponible en VersaWorks al trabajar con un diseño de gran tamaño?", reverso: "La división automática de una imagen que excede el ancho máximo del soporte o de la impresora en varias secciones o \"teselas\" independientes, que se imprimen por separado y se ensamblan después físicamente para formar la imagen completa" },
  { anverso: "¿Qué es el visor de vista previa (Preview) de VersaWorks, relevante antes de lanzar una impresión?", reverso: "La ventana que muestra cómo quedará el trabajo una vez impreso sobre el soporte seleccionado, permitiendo comprobar antes de imprimir la disposición, el tamaño y los colores del diseño, y evitar así un desperdicio de material y tinta por un error no detectado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un software RIP, categoría a la que pertenece VersaWorks?", explicacion: "Traduce el archivo de diseño a un lenguaje que la impresora de gran formato puede interpretar.", dificultad: "media", opciones: ["Traduce el diseño a un lenguaje que la impresora interpreta", "Un programa exclusivo de dibujo vectorial sin conexión a impresora", "Un formato de archivo exclusivo para el corte de vinilo", "Una herramienta exclusiva de selección de color de relleno"], correcta: 0 },
  { enunciado: "¿Qué es la cola de trabajos (Job Queue) de VersaWorks?", explicacion: "La lista de trabajos de impresión pendientes o en curso gestionada por el programa.", dificultad: "facil", opciones: ["La lista de trabajos de impresión pendientes o en curso", "El menú exclusivo de configuración del color de la impresora", "La ventana exclusiva de vista previa antes de imprimir", "El archivo exclusivo de perfil ICC del soporte utilizado"], correcta: 0 },
  { enunciado: "¿Para qué sirve el menú de Preferencias del dispositivo (Device Settings)?", explicacion: "Configura los parámetros específicos de la impresora conectada.", dificultad: "media", opciones: ["Configura los parámetros específicos de la impresora conectada", "Gestiona exclusivamente la cola de trabajos pendientes", "Muestra exclusivamente la vista previa del trabajo a imprimir", "Convierte exclusivamente el texto en curvas vectoriales"], correcta: 0 },
  { enunciado: "¿Qué es el mosaico o tiling en VersaWorks?", explicacion: "La división de una imagen que excede el ancho del soporte en varias teselas independientes.", dificultad: "dificil", opciones: ["Divide una imagen grande en varias teselas independientes", "Une varios archivos de diseño distintos en uno solo", "Aplica exclusivamente un perfil de color a la imagen", "Reduce exclusivamente la resolución de la imagen importada"], correcta: 0 },
  { enunciado: "¿Para qué sirve el visor de vista previa de VersaWorks antes de imprimir?", explicacion: "Permite comprobar disposición, tamaño y colores, evitando desperdicio de material y tinta.", dificultad: "media", opciones: ["Permite comprobar el resultado antes de imprimir, evitando desperdicio", "Solo sirve para consultar el estado de la cola de trabajos", "Solo sirve para configurar el modelo de impresora conectada", "No permite detectar ningún error antes de lanzar la impresión"], correcta: 0 },
]);

const S2 = "variables-trabajo-versaworks";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el ajuste de calidad de impresión (modo de pasadas) en VersaWorks?", reverso: "Un parámetro que determina cuántas veces pasa el cabezal de impresión sobre cada zona del soporte: un mayor número de pasadas mejora la calidad y la definición del resultado, pero reduce la velocidad de impresión y aumenta el tiempo total del trabajo" },
  { anverso: "¿Qué es el perfil ICC (International Color Consortium) que puede cargarse en VersaWorks?", reverso: "Un archivo que describe cómo un dispositivo concreto (una impresora con una tinta y un soporte determinados) reproduce el color, permitiendo que el software ajuste los colores del diseño para que el resultado impreso coincida lo más fielmente posible con el color previsto en pantalla" },
  { anverso: "¿Qué es la configuración de soporte (Media Settings) de VersaWorks?", reverso: "El conjunto de parámetros que definen el tipo de material sobre el que se va a imprimir (vinilo, lona, papel fotográfico), incluyendo el consumo de tinta recomendado y la temperatura de secado, ajustado automáticamente según el soporte seleccionado por el usuario" },
  { anverso: "¿Por qué es relevante ajustar correctamente el límite de tinta (Ink Limit) en VersaWorks al imprimir sobre un soporte poroso?", reverso: "Porque un exceso de tinta puede provocar que el soporte se sature, generando manchas, chorreo o un secado defectuoso, mientras que una cantidad insuficiente puede dar lugar a colores apagados o poco saturados en el resultado final" },
  { anverso: "¿Qué relación existe entre la resolución de impresión (medida en ppp o dpi) configurada en VersaWorks y la distancia de visualización prevista del rótulo o lona final?", reverso: "Cuanto más se vaya a observar de cerca el elemento impreso, mayor resolución conviene emplear para evitar que se aprecien los puntos de tinta individuales; para elementos de gran formato destinados a verse a distancia, una resolución menor resulta suficiente y permite además reducir el tiempo de impresión" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué determina el ajuste de calidad de impresión (modo de pasadas)?", explicacion: "Cuántas veces pasa el cabezal sobre cada zona: más pasadas mejora calidad pero reduce velocidad.", dificultad: "media", opciones: ["Cuántas veces pasa el cabezal sobre cada zona del soporte", "Exclusivamente el tipo de soporte seleccionado para imprimir", "Exclusivamente el color de tinta empleado en la impresión", "Exclusivamente el tamaño máximo permitido del archivo"], correcta: 0 },
  { enunciado: "¿Qué es un perfil ICC cargado en VersaWorks?", explicacion: "Describe cómo un dispositivo reproduce el color, ajustando el resultado impreso al previsto en pantalla.", dificultad: "dificil", opciones: ["Describe cómo un dispositivo reproduce el color", "Un archivo exclusivo de configuración de la cola de trabajos", "Un archivo exclusivo de definición del tamaño del soporte", "Un ajuste exclusivo de la velocidad de impresión del cabezal"], correcta: 0 },
  { enunciado: "¿Qué define la configuración de soporte (Media Settings) de VersaWorks?", explicacion: "El tipo de material sobre el que se imprime, con su consumo de tinta y temperatura de secado.", dificultad: "media", opciones: ["El tipo de material sobre el que se imprime y sus parámetros", "Exclusivamente el perfil de color aplicado a la impresora", "Exclusivamente el número de pasadas del cabezal", "Exclusivamente el tamaño del archivo importado"], correcta: 0 },
  { enunciado: "¿Por qué es relevante ajustar bien el límite de tinta sobre un soporte poroso?", explicacion: "Un exceso satura el soporte (manchas, chorreo); un defecto da colores apagados.", dificultad: "dificil", opciones: ["Un exceso satura el soporte; un defecto da colores apagados", "El límite de tinta nunca influye en el resultado final", "Solo influye en la velocidad de impresión, no en la calidad", "Solo resulta relevante en soportes no porosos como el vinilo"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre la resolución de impresión y la distancia de visualización prevista?", explicacion: "A mayor cercanía de visualización conviene mayor resolución; a distancia, una resolución menor basta.", dificultad: "media", opciones: ["A mayor cercanía conviene mayor resolución, y viceversa", "La resolución de impresión nunca depende de la distancia prevista", "Siempre conviene la máxima resolución disponible del programa", "La distancia de visualización solo afecta al tamaño del soporte"], correcta: 0 },
]);

const S3 = "flujo-preparacion-impresion-versaworks";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es el primer paso habitual del flujo de trabajo al recibir un archivo en VersaWorks?", reverso: "La importación del archivo de diseño (habitualmente en un formato como PDF, EPS o TIFF exportado desde un programa de diseño vectorial como CorelDRAW), comprobando que se ha recibido con las dimensiones y la resolución correctas antes de continuar con la preparación de la impresión" },
  { anverso: "¿Qué comprobación de color conviene realizar antes de lanzar la impresión definitiva de un trabajo en VersaWorks?", reverso: "Realizar una prueba de color o una impresión de prueba en un formato reducido sobre el mismo soporte final, para verificar que los colores obtenidos coinciden con los previstos antes de consumir material y tinta en la impresión completa del trabajo" },
  { anverso: "¿Qué es el anidado o \"nesting\" de varios trabajos en VersaWorks?", reverso: "La disposición automática o manual de varios diseños distintos dentro del mismo ancho de soporte, aprovechando al máximo el material disponible y reduciendo el desperdicio al agrupar trabajos de menor tamaño en una sola pasada de impresión" },
  { anverso: "¿Qué relevancia tiene comprobar el estado de los cabezales de impresión (nozzle check) antes de lanzar un trabajo importante en VersaWorks?", reverso: "Permite detectar si algún inyector del cabezal está obstruido o defectuoso antes de imprimir, evitando que aparezcan rayas o zonas sin tinta en el trabajo final y el consiguiente desperdicio de soporte y tiempo si el defecto se detectara solo al finalizar la impresión" },
  { anverso: "¿Qué papel juega la calibración periódica de la impresora, en combinación con VersaWorks, en la consistencia del color entre distintos trabajos de rotulación de un mismo cliente?", reverso: "Garantiza que el color obtenido se mantenga estable a lo largo del tiempo, evitando variaciones perceptibles entre trabajos impresos en fechas distintas, algo especialmente importante cuando el cliente exige que el color de un nuevo pedido coincida exactamente con el de un pedido anterior" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuál es el primer paso habitual al recibir un archivo en VersaWorks?", explicacion: "Importar el archivo de diseño y comprobar dimensiones y resolución correctas.", dificultad: "facil", opciones: ["Importar el archivo y comprobar dimensiones y resolución", "Lanzar directamente la impresión definitiva sin comprobación", "Configurar exclusivamente el perfil ICC del dispositivo", "Eliminar exclusivamente los trabajos previos de la cola"], correcta: 0 },
  { enunciado: "¿Qué comprobación de color conviene realizar antes de la impresión definitiva?", explicacion: "Una prueba de color reducida sobre el mismo soporte final, antes de consumir material en la impresión completa.", dificultad: "media", opciones: ["Una prueba de color reducida sobre el mismo soporte final", "Ninguna comprobación resulta necesaria antes de imprimir", "Solo comprobar el perfil ICC sin imprimir ninguna prueba", "Solo resulta necesaria en trabajos de gran formato"], correcta: 0 },
  { enunciado: "¿Qué es el anidado o \"nesting\" de varios trabajos en VersaWorks?", explicacion: "Disposición de varios diseños dentro del mismo ancho de soporte para aprovechar el material.", dificultad: "media", opciones: ["Dispone varios diseños en el mismo ancho de soporte", "Combina exclusivamente varios colores en un solo objeto", "Reduce exclusivamente la resolución de todos los trabajos", "Elimina exclusivamente los trabajos duplicados de la cola"], correcta: 0 },
  { enunciado: "¿Qué relevancia tiene comprobar el estado de los cabezales (nozzle check) antes de un trabajo importante?", explicacion: "Detecta inyectores obstruidos antes de imprimir, evitando rayas y desperdicio de soporte.", dificultad: "media", opciones: ["Detecta inyectores obstruidos antes de imprimir", "No tiene ninguna relevancia práctica en el resultado final", "Solo resulta relevante al cambiar el tipo de soporte", "Solo resulta relevante al configurar el perfil de color"], correcta: 0 },
  { enunciado: "¿Qué garantiza la calibración periódica de la impresora en combinación con VersaWorks?", explicacion: "Consistencia del color a lo largo del tiempo entre distintos trabajos de un mismo cliente.", dificultad: "dificil", opciones: ["Consistencia del color entre trabajos en fechas distintas", "No influye en la consistencia del color entre trabajos", "Solo afecta a la velocidad de impresión del cabezal", "Solo resulta relevante en el primer trabajo tras la instalación"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 19 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 19, orden: 19, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-263 creado y vinculado como Tema 19 de Oficial Pintor Gráfica.");

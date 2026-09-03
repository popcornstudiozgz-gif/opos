/**
 * Crea tema-264: "Tipos de ficheros gráficos, características, intercambio
 * de ficheros gráficos" — Tema 20 (numero=20, bloque-2) de Oficial
 * Pintor, Especialidad Gráfica (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 18 oficial del Anexo I (bases2110.pdf, línea
 * 1536): "Tipos de ficheros gráficos, características, intercambio de
 * ficheros gráficos."
 *
 * Fuente verificada en esta sesión: ISO 32000-1:2008 ("Document
 * management — Portable document format — Part 1: PDF 1.7"), norma
 * internacional que estandariza el formato PDF desde que Adobe cedió su
 * especificación a ISO en 2008 (confirmado mediante búsqueda web —
 * ISO/TC 171/SC 2/WG 8 —, y su adopción como norma española a través de
 * AENOR, disponible en tienda.aenor.com). El resto de formatos de
 * fichero gráfico tratados en el tema (EPS, TIFF, JPEG, PNG, GIF, AI,
 * CDR) son conocimiento técnico consolidado del sector de las artes
 * gráficas sin una ley española que los regule individualmente —
 * búsqueda realizada conforme al estándar de sourcing del proyecto
 * antes de concluirlo así.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-264-tipos-ficheros-graficos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-264";
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
  titulo: "Tipos de ficheros gráficos",
  descripcion: "Formatos vectoriales y de mapa de bits. Características de cada formato de fichero gráfico. Intercambio de ficheros entre programas y con el cliente.",
  contenido: "Desarrolla los principales tipos de ficheros gráficos empleados en un taller de rotulación digital: la distinción fundamental entre formatos vectoriales (AI, CDR, EPS, SVG) y formatos de mapa de bits o raster (JPEG, TIFF, PNG, GIF), las características técnicas de cada uno (compresión con o sin pérdida, transparencia, capas, resolución), el formato PDF (estandarizado internacionalmente como ISO 32000) como formato de intercambio universal entre programas de diseño y de impresión, y las buenas prácticas para el intercambio de ficheros gráficos con clientes y proveedores externos.",
  enlaces_boe: [
    { titulo: "ISO 32000-1:2008 — Document management — Portable document format — Part 1: PDF 1.7", url: "https://www.iso.org/standard/51502.html" },
  ],
  indice_estudio: [
    { url: "", titulo: "Formatos vectoriales frente a formatos de mapa de bits", seccion: "vectoriales-mapa-bits", articulos: "Conocimiento técnico del sector" },
    { url: "https://www.iso.org/standard/51502.html", titulo: "El formato PDF (ISO 32000) y otros formatos de intercambio", seccion: "formato-pdf-intercambio", articulos: "ISO 32000-1:2008" },
    { url: "", titulo: "Buenas prácticas en el intercambio de ficheros gráficos", seccion: "buenas-practicas-intercambio", articulos: "Conocimiento técnico del sector" },
  ],
}]);

const S1 = "vectoriales-mapa-bits";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué diferencia fundamental existe entre un fichero gráfico vectorial y uno de mapa de bits (raster)?", reverso: "El vectorial define las formas mediante fórmulas matemáticas (líneas, curvas, puntos de anclaje) y puede escalarse a cualquier tamaño sin perder nitidez, mientras que el de mapa de bits está formado por una cuadrícula fija de píxeles y pierde calidad al ampliarse por encima de su resolución original" },
  { anverso: "¿Qué son los formatos AI y CDR, ejemplos de ficheros vectoriales propios de cada programa de diseño?", reverso: "AI es el formato nativo de Adobe Illustrator y CDR el formato nativo de CorelDRAW; ambos almacenan la información vectorial completa del diseño (capas, trazados, texto editable) pero solo se abren de forma nativa en su propio programa o en versiones compatibles de otros programas de diseño" },
  { anverso: "¿Qué es el formato EPS (Encapsulated PostScript), formato vectorial de intercambio entre distintos programas de diseño?", reverso: "Un formato de fichero vectorial basado en el lenguaje PostScript que puede abrirse e intercambiarse entre distintos programas de diseño (Illustrator, CorelDRAW, InDesign), siendo históricamente uno de los formatos estándar más empleados en artes gráficas para compartir diseños vectoriales" },
  { anverso: "¿Qué es la compresión con pérdida, característica del formato JPEG, y en qué se diferencia de la compresión sin pérdida?", reverso: "La compresión con pérdida reduce el tamaño del fichero descartando parte de la información original de la imagen (de forma poco perceptible en dosis moderadas), mientras que la compresión sin pérdida reduce el tamaño del fichero sin eliminar ningún dato, permitiendo recuperar la imagen exactamente igual al abrirla" },
  { anverso: "¿Por qué el formato JPEG no resulta adecuado para un logotipo con fondo transparente destinado a superponerse sobre otro elemento?", reverso: "Porque JPEG no admite canal de transparencia (alfa): cualquier zona que debiera quedar transparente se rellena con un color de fondo sólido, siendo preferible en ese caso un formato como PNG o un formato vectorial que sí admite transparencia" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué diferencia fundamental existe entre un fichero vectorial y uno de mapa de bits?", explicacion: "El vectorial se escala sin perder nitidez; el de mapa de bits pierde calidad al ampliarse.", dificultad: "facil", opciones: ["El vectorial se escala sin perder nitidez, a diferencia del de bits", "Ambos tipos de fichero se comportan exactamente igual al escalar", "El de mapa de bits siempre ocupa menos espacio que el vectorial", "El vectorial nunca puede editarse una vez guardado el fichero"], correcta: 0 },
  { enunciado: "¿Qué son los formatos AI y CDR?", explicacion: "Los formatos nativos de Adobe Illustrator y CorelDRAW respectivamente.", dificultad: "media", opciones: ["Los formatos nativos de Illustrator y CorelDRAW", "Dos formatos de mapa de bits con compresión sin pérdida", "Dos formatos exclusivos de intercambio con la impresora", "Dos extensiones exclusivas del software VersaWorks"], correcta: 0 },
  { enunciado: "¿Qué es el formato EPS?", explicacion: "Un formato vectorial basado en PostScript, intercambiable entre distintos programas de diseño.", dificultad: "media", opciones: ["Un formato vectorial basado en PostScript, de intercambio", "Un formato exclusivo de mapa de bits sin compresión", "Un formato exclusivo de la cola de trabajos de VersaWorks", "Un formato exclusivo de perfiles de color ICC"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre compresión con pérdida y sin pérdida?", explicacion: "Con pérdida se descarta información original; sin pérdida se conserva todo el dato original.", dificultad: "dificil", opciones: ["Con pérdida se descarta información; sin pérdida se conserva todo", "Ambos tipos de compresión conservan exactamente los mismos datos", "La compresión sin pérdida siempre genera un fichero más grande", "La compresión con pérdida solo se aplica a ficheros vectoriales"], correcta: 0 },
  { enunciado: "¿Por qué JPEG no resulta adecuado para un logotipo con fondo transparente?", explicacion: "JPEG no admite canal de transparencia (alfa); rellena las zonas transparentes con color sólido.", dificultad: "media", opciones: ["JPEG no admite canal de transparencia (alfa)", "JPEG solo puede emplearse en ficheros vectoriales", "JPEG siempre reduce drásticamente la calidad del logotipo", "JPEG no puede abrirse en ningún programa de diseño"], correcta: 0 },
]);

const S2 = "formato-pdf-intercambio";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el formato PDF y qué norma internacional lo estandariza desde 2008?", reverso: "El PDF (Portable Document Format) es un formato de fichero que preserva el aspecto exacto de un documento independientemente del programa o dispositivo con el que se abra; desde 2008 está estandarizado internacionalmente por la norma ISO 32000-1 (PDF 1.7), tras la cesión por parte de Adobe del control de su especificación a la ISO" },
  { anverso: "¿Por qué el PDF resulta especialmente adecuado como formato de intercambio de un diseño gráfico entre el taller de rotulación y una imprenta externa?", reverso: "Porque el PDF puede incrustar (embeber) las fuentes tipográficas y las imágenes utilizadas en el diseño, garantizando que el documento se visualice y se reproduzca de forma idéntica en cualquier equipo, sin depender de que el destinatario tenga instaladas las mismas fuentes o los mismos archivos originales" },
  { anverso: "¿Qué es el formato TIFF (Tagged Image File Format), habitual en el intercambio de imágenes de mapa de bits de alta calidad?", reverso: "Un formato de fichero de mapa de bits que admite compresión sin pérdida (o incluso sin ninguna compresión), capas y una alta profundidad de color, por lo que se emplea habitualmente para el archivo o el intercambio de imágenes de alta calidad destinadas a impresión profesional" },
  { anverso: "¿Qué es el formato PNG (Portable Network Graphics), formato de mapa de bits habitual en diseño digital?", reverso: "Un formato de fichero de mapa de bits con compresión sin pérdida que admite canal de transparencia (alfa), por lo que resulta habitual para logotipos, iconos o elementos gráficos que deban superponerse sobre otros fondos sin mostrar un recuadro de color sólido alrededor" },
  { anverso: "¿Qué información adicional (además de la propia imagen) conviene comprobar antes de enviar un fichero de intercambio a un cliente o proveedor, especialmente si se trata de un formato vectorial con texto?", reverso: "Que las fuentes tipográficas empleadas estén correctamente incrustadas en el fichero o que el texto se haya convertido previamente en curvas, evitando así que el destinatario vea el diseño con una fuente distinta a la original por no tener instalada la fuente empleada" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué norma internacional estandariza el formato PDF desde 2008?", explicacion: "ISO 32000-1 (PDF 1.7), tras la cesión por Adobe del control de su especificación a la ISO.", dificultad: "media", opciones: ["ISO 32000-1, tras la cesión de Adobe del control de la especificación", "No existe ninguna norma internacional que estandarice el PDF", "Una norma exclusivamente española sin reconocimiento internacional", "El propio fabricante Adobe mantiene el control exclusivo del formato"], correcta: 0 },
  { enunciado: "¿Por qué el PDF resulta adecuado para el intercambio con una imprenta externa?", explicacion: "Puede incrustar fuentes e imágenes, garantizando una visualización idéntica en cualquier equipo.", dificultad: "media", opciones: ["Puede incrustar fuentes e imágenes, garantizando fidelidad", "Nunca puede incluir imágenes dentro del propio documento", "Solo puede abrirse en el programa original de diseño", "No permite conservar el aspecto exacto del documento"], correcta: 0 },
  { enunciado: "¿Qué características tiene el formato TIFF?", explicacion: "Admite compresión sin pérdida, capas y alta profundidad de color, para imágenes de alta calidad.", dificultad: "media", opciones: ["Admite compresión sin pérdida y alta profundidad de color", "Es un formato exclusivamente vectorial sin píxeles", "No admite ningún tipo de compresión en ningún caso", "Es un formato exclusivo del software VersaWorks"], correcta: 0 },
  { enunciado: "¿Qué característica distingue al formato PNG frente a JPEG?", explicacion: "PNG admite canal de transparencia (alfa) con compresión sin pérdida.", dificultad: "media", opciones: ["PNG admite canal de transparencia con compresión sin pérdida", "PNG nunca admite ningún tipo de compresión de la imagen", "PNG es un formato exclusivamente vectorial, a diferencia de JPEG", "PNG no puede emplearse nunca para logotipos o iconos"], correcta: 0 },
  { enunciado: "¿Qué conviene comprobar en un fichero vectorial con texto antes de enviarlo a un cliente?", explicacion: "Que las fuentes estén incrustadas o el texto convertido en curvas.", dificultad: "dificil", opciones: ["Que las fuentes estén incrustadas o el texto convertido en curvas", "Que el fichero se haya guardado exclusivamente en formato JPEG", "Que el fichero no contenga ninguna imagen de mapa de bits", "Que el fichero se haya comprimido con pérdida de calidad"], correcta: 0 },
]);

const S3 = "buenas-practicas-intercambio";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Por qué conviene acordar con el cliente el formato de fichero de entrega antes de comenzar un trabajo de rotulación, en lugar de asumir un formato por defecto?", reverso: "Porque distintos clientes y proveedores pueden requerir formatos distintos según su propio flujo de trabajo (por ejemplo, un formato vectorial editable frente a un PDF cerrado de solo visualización), y acordarlo de antemano evita reelaboraciones y retrasos innecesarios en la entrega final del proyecto" },
  { anverso: "¿Qué es el espacio de color de un fichero gráfico (RGB frente a CMYK), relevante al intercambiar un fichero destinado a impresión?", reverso: "RGB es el modelo de color empleado por las pantallas (basado en luz), mientras que CMYK es el modelo empleado en la impresión física (basado en tintas); un fichero preparado en RGB y enviado directamente a impresión sin conversión puede mostrar colores distintos a los previstos una vez impreso" },
  { anverso: "¿Qué riesgo existe al comprimir en exceso un fichero gráfico para reducir su tamaño antes de enviarlo por correo electrónico a un cliente?", reverso: "Una compresión excesiva, especialmente con pérdida (como en JPEG a baja calidad), puede degradar visiblemente la nitidez y el detalle de la imagen, resultando en un fichero de menor peso pero con una calidad insuficiente para su uso final en impresión o corte" },
  { anverso: "¿Qué ventaja aporta empaquetar (Package o Collect for Output) todos los ficheros vinculados a un diseño —fuentes, imágenes enlazadas, el propio documento— en una sola carpeta antes de enviarlo a otro profesional o a producción?", reverso: "Evita que falten elementos necesarios para reproducir el diseño correctamente en otro equipo, un problema frecuente cuando una imagen se ha enlazado (no incrustado) al documento original y no se incluye junto con el fichero principal al transferirlo" },
  { anverso: "¿Por qué resulta recomendable mantener un fichero maestro editable (por ejemplo, en formato nativo CDR o AI) además del fichero final exportado a PDF o JPEG entregado al cliente?", reverso: "Porque el fichero editable permite realizar modificaciones futuras sobre el diseño original (una corrección solicitada por el cliente, una adaptación a otro soporte), algo que no resulta posible o resulta mucho más complicado partiendo únicamente del fichero final ya aplanado y exportado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Por qué conviene acordar el formato de entrega con el cliente antes de empezar el trabajo?", explicacion: "Distintos clientes requieren formatos distintos según su propio flujo de trabajo; evita reelaboraciones.", dificultad: "media", opciones: ["Evita reelaboraciones y retrasos por un formato inadecuado", "El formato de entrega nunca influye en el resultado final", "Siempre debe entregarse exclusivamente en formato JPEG", "El cliente nunca tiene preferencia sobre el formato de entrega"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre los espacios de color RGB y CMYK?", explicacion: "RGB es el modelo de pantallas (luz); CMYK el de la impresión física (tintas).", dificultad: "dificil", opciones: ["RGB es el modelo de pantallas; CMYK el de impresión física", "Ambos espacios de color producen siempre el mismo resultado", "CMYK se emplea exclusivamente en pantallas, nunca en impresión", "RGB se emplea exclusivamente en impresión, nunca en pantallas"], correcta: 0 },
  { enunciado: "¿Qué riesgo existe al comprimir en exceso un fichero antes de enviarlo por correo?", explicacion: "Puede degradar visiblemente la nitidez, insuficiente para impresión o corte.", dificultad: "media", opciones: ["Puede degradar la nitidez, insuficiente para impresión o corte", "La compresión nunca afecta a la calidad final de la imagen", "Solo afecta al peso del fichero, nunca a su calidad visual", "Solo resulta relevante en ficheros vectoriales, no de mapa de bits"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta empaquetar todos los ficheros vinculados a un diseño en una sola carpeta?", explicacion: "Evita que falten elementos (fuentes, imágenes enlazadas) al transferir el diseño a otro equipo.", dificultad: "media", opciones: ["Evita que falten elementos necesarios en otro equipo", "Reduce automáticamente el tamaño de todos los ficheros", "Convierte automáticamente el texto en curvas vectoriales", "Elimina automáticamente las imágenes enlazadas del diseño"], correcta: 0 },
  { enunciado: "¿Por qué conviene conservar un fichero maestro editable además del fichero final entregado?", explicacion: "Permite realizar modificaciones futuras sobre el diseño original, algo muy difícil desde el fichero ya aplanado.", dificultad: "media", opciones: ["Permite modificaciones futuras sobre el diseño original", "El fichero maestro nunca resulta útil tras la entrega final", "Solo resulta relevante si el cliente pide un formato PDF", "El fichero final exportado siempre es igual de editable"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 20 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 20, orden: 20, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-264 creado y vinculado como Tema 20 de Oficial Pintor Gráfica.");

/**
 * Crea tema-259: "Sistemas de color en impresión Digital. Perfiles de
 * Color. Sistemas de Impresión Digital. Tintas. Detección y corrección
 * de errores. Mantenimiento de equipos de impresión de tintas
 * ecosolventes" — Tema 15 (numero=15, bloque-2) de Oficial Pintor,
 * Especialidad Gráfica (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 13 oficial del Anexo I (bases2110.pdf, línea
 * 1521): "Sistemas de color en impresión Digital. Perfiles de Color.
 * Sistemas de Impresión Digital. Tintas. Detección y corrección de
 * errores. Mantenimiento de equipos de impresión de tintas
 * ecosolventes. Normativa."
 *
 * Normativa: Reglamento CLP (DOUE-L-2008-82637, ya citado en varios
 * temas de este bloque), de aplicación a las tintas ecosolventes como
 * producto químico. El resto (sistemas de color, perfiles, detección de
 * errores) es conocimiento técnico consolidado del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-259-sistemas-color-impresion-digital.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-259";
const OPOSICION = "oficial-pintor-grafica-ayto-zaragoza";
const BLOQUE_2_ID = "1e5d5916-cf4a-4920-9175-579f18034ad6";

const REGLAMENTO_CLP = "https://www.boe.es/buscar/doc.php?id=DOUE-L-2008-82637";

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
  titulo: "Sistemas de color en impresión digital",
  descripcion: "Sistemas de color RGB y CMYK. Perfiles de color ICC. Sistemas de impresión digital y tipos de tintas, incluidas las ecosolventes. Detección y corrección de errores de impresión. Mantenimiento de equipos.",
  contenido: "Desarrolla los sistemas de color aplicados a la impresión digital: el sistema RGB, propio de pantallas, y el sistema CMYK, propio de la impresión; los perfiles de color (ICC), que garantizan una reproducción cromática consistente entre el diseño en pantalla y el resultado impreso; los sistemas de impresión digital y los tipos de tintas empleadas, con especial atención a las tintas ecosolventes, habituales en la impresión de gran formato para exterior; la detección y corrección de errores habituales de impresión (bandeado, desalineación de color); y el mantenimiento básico de los equipos de impresión de tintas ecosolventes.",
  enlaces_boe: [
    { url: REGLAMENTO_CLP, titulo: "Reglamento (CE) 1272/2008 (CLP) — clasificación, etiquetado y envasado" },
  ],
  indice_estudio: [
    { url: "", titulo: "Sistemas de color RGB y CMYK, y perfiles de color ICC", seccion: "sistemas-color-rgb-cmyk-perfiles-icc", articulos: "Conocimiento técnico del oficio" },
    { url: REGLAMENTO_CLP, titulo: "Sistemas de impresión digital y tintas, incluidas las ecosolventes", seccion: "sistemas-impresion-tintas-ecosolventes", articulos: "Reglamento CLP" },
    { url: "", titulo: "Detección de errores y mantenimiento de equipos de impresión", seccion: "deteccion-errores-mantenimiento-equipos", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "sistemas-color-rgb-cmyk-perfiles-icc";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el sistema de color RGB?", reverso: "Un sistema de color aditivo (basado en la emisión de luz) que combina los colores rojo, verde y azul (Red, Green, Blue) para generar el resto de colores, empleado en pantallas, monitores y dispositivos de visualización digital" },
  { anverso: "¿Qué es el sistema de color CMYK?", reverso: "Un sistema de color sustractivo (basado en la absorción de luz por pigmentos o tintas) que combina el cian, el magenta, el amarillo y el negro (Cyan, Magenta, Yellow, Key/black) para generar el resto de colores, empleado en los sistemas de impresión" },
  { anverso: "¿Por qué es habitual que un color visto en pantalla (RGB) no coincida exactamente con el mismo color una vez impreso (CMYK)?", reverso: "Porque ambos sistemas de color trabajan sobre principios distintos (aditivo frente a sustractivo) y cada uno tiene una gama de colores reproducibles (gamut) diferente, existiendo colores visibles en pantalla que no pueden reproducirse exactamente con tintas de impresión" },
  { anverso: "¿Qué es un perfil de color ICC?", reverso: "Un archivo estándar que describe las características cromáticas específicas de un dispositivo (una pantalla, una impresora, un tipo de papel o tinta concreto), empleado por el software de diseño e impresión para lograr una reproducción del color lo más consistente posible entre distintos dispositivos" },
  { anverso: "¿Qué utilidad tiene, en la práctica, calibrar la pantalla del ordenador de diseño con un perfil de color ICC adecuado antes de aprobar un color para un trabajo de impresión municipal?", reverso: "Permite que el color visualizado en pantalla se aproxime lo más posible al resultado real de la impresión, reduciendo el riesgo de aprobar un color que, una vez impreso, resulte visiblemente distinto al esperado (por ejemplo, un RAL corporativo concreto)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el sistema de color RGB?", explicacion: "Un sistema aditivo que combina rojo, verde y azul, empleado en pantallas.", dificultad: "facil", opciones: ["Un sistema aditivo de rojo, verde y azul para pantallas", "Un sistema sustractivo de cian, magenta y amarillo para impresión", "Un tipo de perfil de color exclusivo de impresoras", "Un tipo de tinta ecosolvente de impresión digital"], correcta: 0 },
  { enunciado: "¿Qué es el sistema de color CMYK?", explicacion: "Un sistema sustractivo que combina cian, magenta, amarillo y negro, empleado en impresión.", dificultad: "media", opciones: ["Un sistema sustractivo de cian, magenta, amarillo y negro", "Un sistema aditivo de rojo, verde y azul para pantallas", "Un tipo de perfil de color exclusivo de pantallas", "Un tipo de tinta ecosolvente de impresión digital"], correcta: 0 },
  { enunciado: "¿Por qué un color visto en pantalla puede no coincidir exactamente con el mismo color impreso?", explicacion: "RGB y CMYK trabajan sobre principios distintos y cada uno tiene una gama de colores diferente.", dificultad: "dificil", opciones: ["Trabajan sobre principios distintos con gamas de color diferentes", "Ambos sistemas reproducen exactamente la misma gama de colores", "El color impreso siempre coincide exactamente con el de pantalla", "Solo influye la marca de la impresora, no el sistema de color"], correcta: 0 },
  { enunciado: "¿Qué es un perfil de color ICC?", explicacion: "Un archivo estándar que describe las características cromáticas de un dispositivo.", dificultad: "media", opciones: ["Un archivo que describe las características cromáticas de un dispositivo", "Un tipo de tinta específica de impresión digital", "Un sistema de color exclusivo de pantallas RGB", "Un tipo de papel específico para impresión de gran formato"], correcta: 0 },
  { enunciado: "¿Qué utilidad tiene calibrar la pantalla con un perfil ICC antes de aprobar un color para impresión municipal?", explicacion: "Reduce el riesgo de aprobar un color que resulte visiblemente distinto una vez impreso.", dificultad: "media", opciones: ["Reduce el riesgo de un color distinto entre pantalla e impresión", "La calibración de pantalla nunca influye en el resultado impreso", "Solo resulta relevante en impresión offset, nunca en digital", "Solo resulta relevante si se imprime en color negro"], correcta: 0 },
]);

const S2 = "sistemas-impresion-tintas-ecosolventes";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una tinta ecosolvente, habitual en las impresoras de gran formato de un taller de rotulación?", reverso: "Un tipo de tinta que combina pigmentos con un disolvente de menor toxicidad y menor emisión de compuestos orgánicos volátiles que un disolvente convencional, ofreciendo buena resistencia a la intemperie y a los rayos UV, adecuada para impresión de exterior sin la necesidad de laminado en muchos casos" },
  { anverso: "¿Qué ventaja ofrece una tinta ecosolvente frente a una tinta acuosa convencional para trabajos de rotulación de exterior?", reverso: "Ofrece una mayor resistencia a la intemperie, al agua y a los rayos UV una vez seca la impresión, resultando más adecuada para elementos de señalética o publicidad exterior que deben soportar condiciones climáticas adversas durante un tiempo prolongado" },
  { anverso: "¿Qué información debería consultar el Oficial en la etiqueta o ficha de seguridad de una tinta ecosolvente, conforme al Reglamento CLP?", reverso: "Los pictogramas de peligro, las indicaciones de peligro (H) y los consejos de prudencia (P), dado que, pese a su menor toxicidad relativa frente a un disolvente convencional, sigue conteniendo componentes químicos que exigen medidas de protección y ventilación adecuadas" },
  { anverso: "¿Qué es un cabezal de impresión, componente crítico de una impresora de gran formato con tintas ecosolventes?", reverso: "El componente que expulsa las gotas de tinta sobre el material a imprimir, formado por multitud de pequeñas boquillas o inyectores, cuya obstrucción por secado de tinta es una de las causas más habituales de defectos en la impresión (bandeado, líneas ausentes)" },
  { anverso: "¿Por qué resulta más crítico el riesgo de obstrucción de los cabezales con una tinta ecosolvente que con una tinta acuosa?", reverso: "Porque el componente disolvente de la tinta ecosolvente puede secarse y endurecerse con mayor facilidad en los pequeños conductos del cabezal si la impresora permanece inactiva un tiempo prolongado, exigiendo un mantenimiento y una limpieza más regulares" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una tinta ecosolvente?", explicacion: "Una tinta con disolvente de menor toxicidad y buena resistencia a la intemperie y rayos UV.", dificultad: "facil", opciones: ["Una tinta de menor toxicidad y buena resistencia UV", "Una tinta exclusivamente acuosa sin ningún componente solvente", "Un tipo de perfil de color exclusivo de impresión digital", "Un tipo de laminado exclusivo de protección solar"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece una tinta ecosolvente frente a una tinta acuosa en exterior?", explicacion: "Mayor resistencia a la intemperie, al agua y a los rayos UV una vez seca.", dificultad: "media", opciones: ["Mayor resistencia a la intemperie, agua y rayos UV", "Siempre resulta menos resistente que una tinta acuosa", "No existe ninguna diferencia real entre ambos tipos de tinta", "Solo resulta adecuada para trabajos exclusivamente de interior"], correcta: 0 },
  { enunciado: "¿Qué debe consultarse en la etiqueta de una tinta ecosolvente conforme al Reglamento CLP?", explicacion: "Pictogramas de peligro, indicaciones H y consejos de prudencia P.", dificultad: "media", opciones: ["Pictogramas de peligro, indicaciones H y consejos P", "Únicamente el precio de venta del producto", "Únicamente la marca comercial del fabricante", "Únicamente el color del envase del producto"], correcta: 0 },
  { enunciado: "¿Qué es un cabezal de impresión?", explicacion: "El componente que expulsa las gotas de tinta mediante pequeñas boquillas o inyectores.", dificultad: "media", opciones: ["El componente que expulsa las gotas de tinta sobre el material", "El rodillo que arrastra el material durante la impresión", "El depósito que almacena la tinta antes de su uso", "El panel de control de la impresora de gran formato"], correcta: 0 },
  { enunciado: "¿Por qué resulta más crítica la obstrucción de cabezales con tinta ecosolvente que con tinta acuosa?", explicacion: "El disolvente puede secarse y endurecerse en los conductos si la impresora está inactiva.", dificultad: "dificil", opciones: ["El disolvente puede secarse y endurecerse en los conductos", "La tinta ecosolvente nunca obstruye los cabezales de impresión", "Solo la tinta acuosa puede obstruir los cabezales de impresión", "El tipo de tinta nunca influye en el riesgo de obstrucción"], correcta: 0 },
]);

const S3 = "deteccion-errores-mantenimiento-equipos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el bandeado, defecto habitual de una impresión digital de gran formato?", reverso: "La aparición de líneas o bandas horizontales visibles en la impresión, habitualmente causadas por una obstrucción parcial de uno o varios inyectores del cabezal de impresión, o por un desajuste en el avance del material durante la impresión" },
  { anverso: "¿Qué es una desalineación de color, otro defecto habitual detectable en una impresión digital?", reverso: "Un desplazamiento visible entre las distintas tintas de color que componen la imagen (por ejemplo, entre el cian y el magenta), que provoca un efecto de \"doble imagen\" o de bordes borrosos, habitualmente causado por un desajuste mecánico o de calibración del equipo" },
  { anverso: "¿Qué operación básica de mantenimiento debería realizar el Oficial Pintor Especialidad Gráfica de forma periódica para prevenir el bandeado por obstrucción de cabezales?", reverso: "Ejecutar el proceso de limpieza de cabezales que incorpora el propio software de la impresora, y realizar impresiones de prueba periódicas (test de inyectores) que permitan detectar a tiempo cualquier boquilla obstruida antes de lanzar un trabajo de gran tamaño" },
  { anverso: "¿Qué debería hacer el Oficial si, tras un test de inyectores, detecta que varias boquillas del cabezal permanecen obstruidas pese a la limpieza automática del equipo?", reverso: "Repetir el ciclo de limpieza, y si el problema persiste, valorar una limpieza manual más profunda del cabezal o comunicar la incidencia para una posible intervención técnica especializada, evitando lanzar trabajos de gran tamaño con el defecto sin resolver" },
  { anverso: "¿Por qué es recomendable mantener la impresora de gran formato en uso regular, aunque sea con pequeñas impresiones de mantenimiento, en lugar de dejarla inactiva durante largos periodos?", reverso: "Porque el uso regular ayuda a evitar que la tinta ecosolvente se seque y obstruya los cabezales, un problema mucho más probable si el equipo permanece inactivo durante semanas sin ningún ciclo de limpieza o impresión" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el bandeado, defecto habitual de una impresión digital?", explicacion: "Líneas o bandas horizontales causadas por obstrucción de inyectores o desajuste de avance.", dificultad: "media", opciones: ["Líneas horizontales por obstrucción de inyectores o desajuste", "Un desplazamiento entre distintas tintas de color", "Una pérdida de adherencia del material impreso", "Un defecto exclusivo de la impresión offset tradicional"], correcta: 0 },
  { enunciado: "¿Qué es una desalineación de color en una impresión digital?", explicacion: "Un desplazamiento visible entre las tintas que provoca un efecto de doble imagen o bordes borrosos.", dificultad: "media", opciones: ["Un desplazamiento entre tintas que genera doble imagen", "Una obstrucción total de todos los cabezales de impresión", "Un defecto exclusivo del sistema de color RGB", "Un defecto exclusivo del laminado de protección"], correcta: 0 },
  { enunciado: "¿Qué operación básica de mantenimiento previene el bandeado por obstrucción de cabezales?", explicacion: "Limpieza de cabezales y test de inyectores periódicos.", dificultad: "media", opciones: ["Limpieza de cabezales y test de inyectores periódicos", "Ninguna operación de mantenimiento resulta necesaria", "Únicamente cambiar el color de la tinta empleada", "Únicamente aumentar la velocidad de impresión del equipo"], correcta: 0 },
  { enunciado: "¿Qué debería hacer el Oficial si varias boquillas permanecen obstruidas tras la limpieza automática?", explicacion: "Repetir el ciclo, y si persiste, valorar limpieza manual o comunicar la incidencia técnica.", dificultad: "dificil", opciones: ["Repetir el ciclo y valorar limpieza manual o intervención técnica", "Lanzar el trabajo de gran tamaño sin ninguna otra actuación", "Ignorar el problema si algunas boquillas siguen funcionando", "Sustituir directamente toda la impresora sin más comprobación"], correcta: 0 },
  { enunciado: "¿Por qué es recomendable mantener la impresora en uso regular en lugar de dejarla inactiva mucho tiempo?", explicacion: "El uso regular evita que la tinta ecosolvente se seque y obstruya los cabezales.", dificultad: "media", opciones: ["El uso regular evita que la tinta se seque y obstruya cabezales", "La inactividad nunca influye en el estado de los cabezales", "Solo resulta relevante con tinta acuosa, nunca ecosolvente", "Solo resulta relevante si la impresora es de pequeño formato"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 15 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 15, orden: 15, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-259 creado y vinculado como Tema 15 de Oficial Pintor Gráfica.");

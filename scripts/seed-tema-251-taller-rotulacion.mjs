/**
 * Crea tema-251: "El taller de rotulación" — Tema 7 (numero=7, bloque-2)
 * de Oficial Pintor, Especialidad Gráfica (Ayto. Zaragoza). Primer tema
 * de la parte específica de esta oposición.
 *
 * Corresponde al TEMA 5 oficial del Anexo I (bases2110.pdf, línea
 * 1497): "El Taller de Rotulación. Instalaciones. Iluminación.
 * Materiales. Normativa."
 *
 * Normativa: RD 486/1997 (BOE-A-1997-8669, ya verificado en otros temas
 * del proyecto), condiciones de seguridad y salud en los lugares de
 * trabajo, incluida la iluminación; RD 656/2017 (BOE-A-2017-8755, ya
 * citado en tema-235 de Oficial Pintor General), almacenamiento de
 * productos químicos, de aplicación a los adhesivos y disolventes de
 * limpieza del taller de rotulación.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-251-taller-rotulacion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-251";
const OPOSICION = "oficial-pintor-grafica-ayto-zaragoza";
const BLOQUE_2_ID = "1e5d5916-cf4a-4920-9175-579f18034ad6";

const RD_486_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-8669";
const RD_656_2017 = "https://www.boe.es/buscar/doc.php?id=BOE-A-2017-8755";

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
  titulo: "El taller de rotulación",
  descripcion: "Instalaciones y organización del taller de rotulación. Iluminación adecuada al trabajo de precisión. Materiales básicos del taller. Almacenamiento seguro de adhesivos y disolventes.",
  contenido: "Desarrolla el taller de rotulación como espacio de trabajo del Oficial Pintor Especialidad Gráfica: sus instalaciones y organización (zona de corte, zona de impresión, zona de almacenamiento de materiales, mesa de trabajo), la iluminación adecuada al trabajo de precisión que exige esta especialidad, y los materiales básicos del taller (vinilos, laminados, adhesivos, disolventes de limpieza). Se incluye la normativa aplicable a las condiciones de seguridad y salud del taller (RD 486/1997) y al almacenamiento seguro de los productos químicos empleados (RD 656/2017).",
  enlaces_boe: [
    { url: RD_486_1997, titulo: "RD 486/1997 — condiciones de seguridad y salud en los lugares de trabajo" },
    { url: RD_656_2017, titulo: "RD 656/2017 — Reglamento de Almacenamiento de Productos Químicos" },
  ],
  indice_estudio: [
    { url: RD_486_1997, titulo: "Instalaciones del taller de rotulación", seccion: "instalaciones-taller-rotulacion", articulos: "RD 486/1997" },
    { url: RD_486_1997, titulo: "Iluminación adecuada al trabajo de precisión", seccion: "iluminacion-trabajo-precision", articulos: "RD 486/1997" },
    { url: RD_656_2017, titulo: "Materiales del taller y almacenamiento seguro de productos químicos", seccion: "materiales-taller-almacenamiento-productos-quimicos", articulos: "RD 656/2017" },
  ],
}]);

const S1 = "instalaciones-taller-rotulacion";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué zonas básicas debería diferenciar la organización de un taller de rotulación?", reverso: "Una zona de corte con plotter, una zona de impresión digital, una mesa de aplicación o transferencia de vinilos, una zona de almacenamiento de materiales (rollos de vinilo, láminas, adhesivos) y una zona de guardado de herramientas y equipos de protección" },
  { anverso: "¿Qué exige, con carácter general, el RD 486/1997 sobre el orden, la limpieza y el mantenimiento del taller de rotulación como lugar de trabajo?", reverso: "Que las zonas de paso permanezcan libres de obstáculos, que los suelos se mantengan limpios y libres de restos de material o de sustancias resbaladizas, y que las operaciones de limpieza no supongan un riesgo para quienes las realizan" },
  { anverso: "¿Por qué es especialmente relevante mantener limpia y ordenada la mesa de aplicación de vinilos de un taller de rotulación?", reverso: "Porque cualquier partícula de polvo o resto de material atrapado bajo el vinilo durante su colocación puede generar un defecto visible en el acabado final, especialmente crítico en trabajos de precisión como la rotulación" },
  { anverso: "¿Qué condición debería reunir la zona de almacenamiento de rollos de vinilo y láminas de un taller de rotulación?", reverso: "Un espacio protegido de la luz solar directa y de temperaturas extremas, dado que ciertos materiales pueden degradarse (perder adhesión o decolorarse) si se almacenan en condiciones inadecuadas durante un tiempo prolongado" },
  { anverso: "¿Qué diferencia existe, en cuanto a organización del espacio, entre un taller de rotulación y el taller de pintura tradicional ya estudiado en la especialidad general?", reverso: "El taller de rotulación exige espacio y equipamiento específico para el corte y la impresión digital (plotter, impresora), mientras que el taller de pintura tradicional se organiza en torno a la preparación y aplicación manual de pinturas líquidas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué zonas básicas debería diferenciar la organización de un taller de rotulación?", explicacion: "Corte, impresión, aplicación, almacenamiento y guardado de herramientas.", dificultad: "facil", opciones: ["Corte, impresión, aplicación, almacenamiento y herramientas", "Únicamente una zona de descanso del personal", "Únicamente una zona de atención al público", "Ninguna diferenciación resulta relevante en un taller"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 486/1997 sobre las zonas de paso del taller?", explicacion: "Que permanezcan libres de obstáculos y los suelos limpios y libres de sustancias resbaladizas.", dificultad: "media", opciones: ["Que permanezcan libres de obstáculos y sustancias resbaladizas", "Ninguna exigencia específica sobre esta materia", "Solo deben mantenerse limpias una vez al mes", "Las zonas de paso no requieren ningún mantenimiento particular"], correcta: 0 },
  { enunciado: "¿Por qué es especialmente relevante mantener limpia la mesa de aplicación de vinilos?", explicacion: "Cualquier partícula bajo el vinilo puede generar un defecto visible en el acabado final.", dificultad: "media", opciones: ["Una partícula bajo el vinilo genera un defecto visible", "No influye en ningún caso en el resultado del trabajo", "Solo resulta relevante en trabajos de gran superficie", "Solo resulta relevante si se emplea vinilo impreso"], correcta: 0 },
  { enunciado: "¿Qué condición debería reunir la zona de almacenamiento de rollos de vinilo?", explicacion: "Protegida de la luz solar directa y de temperaturas extremas.", dificultad: "media", opciones: ["Protegida de la luz solar directa y temperaturas extremas", "Ninguna condición específica distinta de cualquier estantería", "Debe estar siempre expuesta a la luz solar directa", "Debe estar siempre a temperatura muy elevada"], correcta: 0 },
  { enunciado: "¿Qué diferencia organizativa existe entre un taller de rotulación y uno de pintura tradicional?", explicacion: "El de rotulación exige espacio específico para corte e impresión digital.", dificultad: "dificil", opciones: ["El de rotulación exige espacio para corte e impresión digital", "Ambos talleres se organizan exactamente de la misma manera", "El de pintura tradicional exige siempre una plotter de corte", "No existe ninguna diferencia real entre ambos tipos de taller"], correcta: 0 },
]);

const S2 = "iluminacion-trabajo-precision";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué exige, con carácter general, el RD 486/1997 sobre la iluminación de un lugar de trabajo como este taller de rotulación?", reverso: "Que la iluminación de cada zona se adapte a las características de la actividad que se efectúe en ella, garantizando unos niveles mínimos de iluminación adecuados según el tipo de tarea, evitando deslumbramientos y contrastes excesivos" },
  { anverso: "¿Por qué resulta especialmente exigente el nivel de iluminación necesario en la mesa de corte y de aplicación de vinilos de este taller?", reverso: "Porque se trata de tareas de precisión (recorte de letras pequeñas, alineación exacta de motivos, detección de burbujas o defectos) que requieren distinguir con claridad detalles finos, exigiendo un nivel de iluminación superior al de una tarea general de menor precisión" },
  { anverso: "¿Qué es la iluminación de tarea o localizada, relevante en un puesto de trabajo de rotulación de precisión?", reverso: "Una iluminación adicional, dirigida específicamente sobre la zona de trabajo concreta (la mesa de corte, la superficie de aplicación), que complementa la iluminación general del taller para alcanzar el nivel necesario en tareas de mayor exigencia visual" },
  { anverso: "¿Qué problema puede generar un deslumbramiento o un reflejo excesivo sobre la pantalla del ordenador o de la mesa de trabajo de este taller?", reverso: "Puede dificultar la apreciación correcta del color en pantalla o de los detalles del material trabajado, provocando fatiga visual y aumentando el riesgo de errores en el corte, la impresión o la aplicación del material gráfico" },
  { anverso: "¿Por qué es relevante para el Oficial Pintor Especialidad Gráfica que la iluminación de la zona de revisión de color sea de una calidad cromática adecuada (temperatura de color neutra)?", reverso: "Porque una iluminación con una tonalidad de color inadecuada (demasiado cálida o demasiado fría) puede distorsionar la percepción real del color de una impresión o de un vinilo, provocando errores al comparar el resultado con el color de referencia solicitado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué exige el RD 486/1997 sobre la iluminación de un lugar de trabajo como este taller?", explicacion: "Que se adapte a la actividad, con niveles mínimos adecuados y sin deslumbramientos.", dificultad: "facil", opciones: ["Que se adapte a la actividad, con niveles mínimos adecuados", "Ninguna exigencia específica sobre iluminación", "Solo debe garantizarse iluminación natural, nunca artificial", "La iluminación solo es relevante en trabajos nocturnos"], correcta: 0 },
  { enunciado: "¿Por qué resulta especialmente exigente la iluminación en la mesa de corte y aplicación de vinilos?", explicacion: "Son tareas de precisión que requieren distinguir detalles finos con claridad.", dificultad: "media", opciones: ["Son tareas de precisión que requieren distinguir detalles finos", "La iluminación nunca resulta relevante en tareas de precisión", "Solo resulta relevante en trabajos de gran superficie", "Solo resulta relevante durante la noche"], correcta: 0 },
  { enunciado: "¿Qué es la iluminación de tarea o localizada?", explicacion: "Una iluminación adicional dirigida específicamente sobre la zona de trabajo concreta.", dificultad: "media", opciones: ["Una iluminación adicional dirigida a la zona de trabajo concreta", "La única iluminación exigida en cualquier taller", "Un tipo de iluminación exclusivamente natural", "Un tipo de iluminación prohibido en talleres de rotulación"], correcta: 0 },
  { enunciado: "¿Qué problema puede generar un deslumbramiento sobre la pantalla o la mesa de trabajo?", explicacion: "Dificulta apreciar el color y los detalles, aumentando el riesgo de errores.", dificultad: "media", opciones: ["Dificulta apreciar el color y aumenta el riesgo de errores", "No genera ningún problema real en el trabajo diario", "Solo resulta relevante en trabajos de gran superficie", "Solo resulta relevante si se trabaja con vinilo de corte"], correcta: 0 },
  { enunciado: "¿Por qué es relevante una temperatura de color neutra en la iluminación de la zona de revisión de color?", explicacion: "Una tonalidad inadecuada puede distorsionar la percepción real del color trabajado.", dificultad: "dificil", opciones: ["Una tonalidad inadecuada distorsiona la percepción del color", "La temperatura de color nunca influye en la percepción visual", "Solo resulta relevante si se trabaja exclusivamente en pantalla", "Solo resulta relevante en impresión, nunca en vinilo de corte"], correcta: 0 },
]);

const S3 = "materiales-taller-almacenamiento-productos-quimicos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué materiales básicos componen el fondo habitual de un taller de rotulación?", reverso: "Rollos de vinilo adhesivo de distintos colores, láminas de laminado protector, adhesivos y disolventes de limpieza, papel de transferencia, y soportes rígidos (metacrilato, PVC expandido, dibond) para carteles y señalética" },
  { anverso: "¿Qué exige el RD 656/2017 respecto al almacenamiento de los disolventes y adhesivos empleados en este taller de rotulación?", reverso: "Mantenerlos alejados de fuentes de ignición y de calor, en un espacio ventilado, en recipientes cerrados y correctamente etiquetados, conforme a las Instrucciones Técnicas Complementarias (ITC MIE APQ) del Reglamento de Almacenamiento de Productos Químicos" },
  { anverso: "¿Qué información debería consultar el Oficial Pintor Especialidad Gráfica en la etiqueta de un disolvente de limpieza de vinilos antes de utilizarlo?", reverso: "Los pictogramas de peligro, las indicaciones de peligro (frases H) y los consejos de prudencia (frases P), conforme al Reglamento (CE) 1272/2008 (CLP), que informan sobre la inflamabilidad o toxicidad del producto y las medidas de protección a adoptar" },
  { anverso: "¿Qué precaución debe adoptarse al almacenar rollos de vinilo o láminas laminadas en posición vertical u horizontal en este taller?", reverso: "Almacenarlos conforme a la recomendación del fabricante (habitualmente en posición vertical y sin apilar excesivo peso), evitando deformaciones, arrugas o marcas permanentes que podrían inutilizar el material antes de su uso" },
  { anverso: "¿Por qué es relevante disponer de una zona diferenciada de almacenamiento de productos químicos en este taller, separada de la zona de trabajo con material gráfico?", reverso: "Porque permite aplicar las condiciones específicas de almacenamiento seguro que exigen los disolventes y adhesivos (ventilación, alejamiento de fuentes de ignición), sin interferir con la actividad diaria de corte, impresión y aplicación del material gráfico" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuál de los siguientes es un material básico habitual de un taller de rotulación?", explicacion: "Rollos de vinilo adhesivo, entre otros materiales básicos del taller.", dificultad: "facil", opciones: ["Rollos de vinilo adhesivo", "Un compactador de rodillo vibratorio", "Un martillo hidráulico", "Un horómetro de maquinaria pesada"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 656/2017 respecto al almacenamiento de disolventes y adhesivos de este taller?", explicacion: "Alejarlos de fuentes de ignición, en espacio ventilado y en recipientes cerrados y etiquetados.", dificultad: "media", opciones: ["Alejarlos de fuentes de ignición, en espacio ventilado y etiquetados", "Ninguna condición específica distinta de guardarlos en cualquier estantería", "Almacenarlos siempre junto a cualquier otro producto del taller", "Almacenarlos siempre en recipientes abiertos para facilitar su uso"], correcta: 0 },
  { enunciado: "¿Qué información aporta la etiqueta de un disolvente conforme al Reglamento CLP?", explicacion: "Pictogramas de peligro, indicaciones H y consejos de prudencia P.", dificultad: "media", opciones: ["Pictogramas de peligro, indicaciones H y consejos P", "Únicamente el precio de venta del producto", "Únicamente la marca comercial del fabricante", "Únicamente la fecha de caducidad del producto"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al almacenar rollos de vinilo o láminas laminadas?", explicacion: "Seguir la recomendación del fabricante, evitando deformaciones o marcas permanentes.", dificultad: "media", opciones: ["Seguir la recomendación del fabricante para evitar deformaciones", "Ninguna precaución específica resulta relevante en este caso", "Apilar siempre el máximo peso posible sobre los rollos", "Almacenarlos siempre expuestos a la luz solar directa"], correcta: 0 },
  { enunciado: "¿Por qué es relevante una zona diferenciada de almacenamiento de productos químicos en este taller?", explicacion: "Permite aplicar condiciones de seguridad sin interferir con el trabajo diario de material gráfico.", dificultad: "dificil", opciones: ["Permite aplicar condiciones de seguridad sin interferencias", "No aporta ninguna ventaja real frente a un almacén único", "Solo resulta relevante en talleres de gran tamaño", "Solo resulta relevante si se trabaja con vinilo impreso"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 7 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 7, orden: 7, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-251 creado y vinculado como Tema 7 de Oficial Pintor Gráfica.");

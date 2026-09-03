/**
 * Crea tema-235: "El taller de pintura" — Tema 7 (numero=7, bloque-2) de
 * Oficial Pintor, Especialidad General (Ayto. Zaragoza). Primer tema de
 * la parte específica de esta oposición.
 *
 * Corresponde al TEMA 5 oficial del Anexo I (bases2110.pdf, línea 1445):
 *   "El taller de Pintura. Instalaciones. Materiales. Herramientas.
 *   Equipos de pintura. Limpieza. Normativa."
 *
 * Normativa verificada mediante WebSearch en esta sesión:
 * - RD 656/2017, de 23 de junio, Reglamento de Almacenamiento de
 *   Productos Químicos y sus Instrucciones Técnicas Complementarias MIE
 *   APQ 0 a 10 (BOE-A-2017-8755) — almacenamiento de pinturas,
 *   disolventes y demás productos químicos del taller.
 * - RD 486/1997, de 14 de abril, condiciones de seguridad y salud en
 *   los lugares de trabajo (BOE-A-1997-8669) — ya verificado en otros
 *   temas del proyecto (orden, limpieza, ventilación del taller).
 * - Reglamento (CE) 1272/2008 (CLP), clasificación, etiquetado y
 *   envasado de sustancias y mezclas — etiquetado de los productos
 *   químicos del taller (disolventes, pinturas).
 * El resto (herramientas y equipos de pintura) es conocimiento técnico
 * consolidado del oficio, sin ley única adicional.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-235-taller-pintura.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-235";
const OPOSICION = "oficial-pintor-general-ayto-zaragoza";
const BLOQUE_2_ID = "77506e2f-f4c6-4512-8bf8-99d0b3bbbafd";

const RD_656_2017 = "https://www.boe.es/buscar/doc.php?id=BOE-A-2017-8755";
const RD_486_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-8669";
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
  titulo: "El taller de pintura",
  descripcion: "Instalaciones y organización del taller de pintura. Materiales y herramientas básicas. Equipos de pintura. Limpieza y almacenamiento seguro de productos químicos.",
  contenido: "Desarrolla el taller de pintura como espacio de trabajo del Oficial Pintor: sus instalaciones y organización (zonas de mezcla, almacén, limpieza de útiles), los materiales y herramientas básicas del oficio, y los equipos de aplicación de pintura; la limpieza del taller y de las propias herramientas tras su uso; y la normativa aplicable al almacenamiento de pinturas, disolventes y demás productos químicos del taller, conforme al RD 656/2017 y al Reglamento CLP de clasificación y etiquetado de sustancias peligrosas.",
  enlaces_boe: [
    { url: RD_656_2017, titulo: "RD 656/2017 — Reglamento de Almacenamiento de Productos Químicos (ITC MIE APQ)" },
    { url: RD_486_1997, titulo: "RD 486/1997 — condiciones de seguridad y salud en los lugares de trabajo" },
    { url: REGLAMENTO_CLP, titulo: "Reglamento (CE) 1272/2008 (CLP) — clasificación, etiquetado y envasado" },
  ],
  indice_estudio: [
    { url: RD_486_1997, titulo: "Instalaciones del taller de pintura", seccion: "instalaciones-taller-pintura", articulos: "RD 486/1997" },
    { url: "", titulo: "Materiales, herramientas y equipos de pintura", seccion: "materiales-herramientas-equipos-pintura", articulos: "Conocimiento técnico del oficio" },
    { url: RD_656_2017, titulo: "Limpieza del taller y almacenamiento seguro de productos químicos", seccion: "limpieza-almacenamiento-productos-quimicos-taller", articulos: "RD 656/2017, Reglamento CLP" },
  ],
}]);

const S1 = "instalaciones-taller-pintura";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué zonas básicas debería diferenciar la organización de un taller de pintura?", reverso: "Una zona de preparación y mezcla de pinturas, una zona de almacenamiento de productos y materiales, una zona de limpieza y mantenimiento de herramientas, y una zona de guardado de equipos de protección individual, cada una con sus propias exigencias de orden y ventilación" },
  { anverso: "¿Qué exige, con carácter general, el RD 486/1997 sobre la ventilación de un taller donde se manipulan pinturas y disolventes?", reverso: "Que existan condiciones ambientales adecuadas, incluida una ventilación suficiente para evitar la acumulación de vapores de disolventes, que pueden resultar tóxicos o inflamables en concentraciones elevadas" },
  { anverso: "¿Qué exige el RD 486/1997 sobre el orden, la limpieza y el mantenimiento del taller de pintura, como lugar de trabajo?", reverso: "Que las zonas de paso permanezcan libres de obstáculos, que los suelos se mantengan limpios y libres de sustancias resbaladizas o derramadas, y que las operaciones de limpieza no supongan un riesgo para quienes las realizan" },
  { anverso: "¿Qué características de iluminación debería reunir la zona de preparación y mezcla de pinturas del taller?", reverso: "Una iluminación suficiente y de buena calidad cromática, que permita apreciar con precisión el color y la consistencia de la mezcla, evitando errores de dosificación o de igualado de tonos" },
  { anverso: "¿Por qué es relevante disponer de una zona diferenciada de almacenamiento en el taller de pintura, separada de la zona de trabajo habitual?", reverso: "Porque permite aplicar las condiciones específicas de almacenamiento seguro que exigen los productos químicos del taller (ventilación, alejamiento de fuentes de ignición, segregación de productos incompatibles), sin interferir con la actividad diaria de preparación y aplicación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué zonas básicas debería diferenciar la organización de un taller de pintura?", explicacion: "Preparación y mezcla, almacenamiento, limpieza de herramientas y guardado de EPI.", dificultad: "facil", opciones: ["Preparación, almacenamiento, limpieza y guardado de EPI", "Únicamente una zona de descanso del personal", "Únicamente una zona de atención al público", "Ninguna diferenciación resulta relevante en un taller"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 486/1997 sobre la ventilación de un taller donde se manipulan disolventes?", explicacion: "Condiciones ambientales adecuadas, con ventilación suficiente para evitar la acumulación de vapores.", dificultad: "media", opciones: ["Ventilación suficiente para evitar acumulación de vapores", "Ninguna exigencia específica sobre ventilación", "Solo resulta exigible si el taller carece de ventanas", "Solo resulta exigible en talleres de más de cien metros"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 486/1997 sobre las zonas de paso del taller?", explicacion: "Que permanezcan libres de obstáculos y los suelos limpios y libres de sustancias resbaladizas.", dificultad: "media", opciones: ["Que permanezcan libres de obstáculos y sustancias resbaladizas", "Ninguna exigencia específica sobre esta materia", "Solo deben mantenerse limpias una vez al mes", "Las zonas de paso no requieren ningún mantenimiento particular"], correcta: 0 },
  { enunciado: "¿Por qué es importante una buena iluminación en la zona de preparación de mezclas del taller?", explicacion: "Permite apreciar con precisión el color y la consistencia de la mezcla.", dificultad: "media", opciones: ["Permite apreciar con precisión color y consistencia", "No influye en ningún caso en la calidad del trabajo", "Solo es relevante en trabajos de aerografía", "Solo es relevante durante la noche"], correcta: 0 },
  { enunciado: "¿Por qué es relevante disponer de una zona diferenciada de almacenamiento en el taller?", explicacion: "Permite aplicar las condiciones específicas de almacenamiento seguro sin interferir con el trabajo diario.", dificultad: "dificil", opciones: ["Permite aplicar condiciones de almacenamiento seguro sin interferencias", "No aporta ninguna ventaja real frente a un almacén único", "Solo resulta relevante en talleres de gran tamaño", "Solo resulta relevante si se trabaja con pintura en polvo"], correcta: 0 },
]);

const S2 = "materiales-herramientas-equipos-pintura";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué herramientas manuales básicas componen el equipo habitual de un Oficial Pintor?", reverso: "Brochas y pinceles de distintos tamaños y formas, rodillos de diferentes texturas, espátulas y llanas para el masillado, cubetas y bandejas de trabajo, cinta de carrocero para el enmascarado, y lijas de distintos granos para el lijado de superficies" },
  { anverso: "¿Qué es una pistola de pintar, como equipo de aplicación?", reverso: "Un equipo que pulveriza la pintura mediante aire comprimido (pistola aerográfica) o mediante un sistema de bomba a alta presión sin aire (airless), proyectándola en forma de niebla fina sobre la superficie a tratar, logrando acabados más uniformes que la brocha o el rodillo" },
  { anverso: "¿Qué diferencia existe entre una pistola de pintar convencional (con aire comprimido) y una pistola airless?", reverso: "La convencional mezcla la pintura con aire comprimido para pulverizarla, generando más niebla de pintura (overspray); la airless bombea la pintura a alta presión sin mezclarla con aire, logrando mayor rendimiento y menor pérdida de material, especialmente en superficies grandes" },
  { anverso: "¿Qué es una llana o espátula de masillar, y para qué se emplea en el trabajo de pintura?", reverso: "Una herramienta de hoja plana y flexible empleada para aplicar masilla o plaste sobre imperfecciones de la superficie (grietas, agujeros, desconchones), alisándola antes del lijado y la posterior aplicación de la pintura" },
  { anverso: "¿Qué función cumple la cinta de carrocero (cinta de enmascarar) en los trabajos de pintura?", reverso: "Proteger y delimitar con precisión las zonas que no deben pintarse (marcos, cristales, zócalos, molduras), garantizando un acabado limpio y evitando manchas de pintura sobre superficies no destinadas a ser tratadas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Cuál de las siguientes es una herramienta manual básica del Oficial Pintor?", explicacion: "La brocha, entre otras herramientas manuales básicas del oficio.", dificultad: "facil", opciones: ["La brocha", "El compactador de rodillo", "El martillo hidráulico", "El horómetro"], correcta: 0 },
  { enunciado: "¿Qué es una pistola de pintar?", explicacion: "Un equipo que pulveriza la pintura mediante aire comprimido o a alta presión sin aire.", dificultad: "media", opciones: ["Un equipo que pulveriza la pintura sobre la superficie", "Una herramienta exclusiva para el lijado de superficies", "Una herramienta exclusiva para el masillado de grietas", "Un accesorio exclusivo del sistema de andamiaje"], correcta: 0 },
  { enunciado: "¿Qué diferencia principal existe entre una pistola convencional y una airless?", explicacion: "La convencional usa aire comprimido para pulverizar; la airless bombea a alta presión sin mezclar con aire.", dificultad: "dificil", opciones: ["La convencional usa aire comprimido; la airless, alta presión sin aire", "Ambas funcionan exactamente de la misma manera", "La airless siempre genera más niebla de pintura", "La convencional nunca puede usarse en superficies grandes"], correcta: 0 },
  { enunciado: "¿Para qué se emplea una llana o espátula de masillar?", explicacion: "Para aplicar masilla o plaste sobre imperfecciones de la superficie.", dificultad: "media", opciones: ["Para aplicar masilla sobre imperfecciones de la superficie", "Para pulverizar pintura sobre la superficie a tratar", "Para proteger zonas que no deben pintarse", "Para mezclar los componentes de una pintura epoxi"], correcta: 0 },
  { enunciado: "¿Qué función cumple la cinta de carrocero en los trabajos de pintura?", explicacion: "Proteger y delimitar con precisión las zonas que no deben pintarse.", dificultad: "facil", opciones: ["Proteger y delimitar zonas que no deben pintarse", "Aplicar masilla sobre imperfecciones de la superficie", "Pulverizar pintura mediante aire comprimido", "Lijar la superficie antes de aplicar la pintura"], correcta: 0 },
]);

const S3 = "limpieza-almacenamiento-productos-quimicos-taller";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué regula el RD 656/2017, relevante para el almacenamiento de pinturas y disolventes en el taller?", reverso: "El Reglamento de Almacenamiento de Productos Químicos y sus Instrucciones Técnicas Complementarias (ITC MIE APQ), que establecen las condiciones de seguridad exigibles al almacenamiento de líquidos inflamables y demás productos químicos como las pinturas y sus disolventes" },
  { anverso: "¿Qué exige, con carácter general, el almacenamiento correcto de disolventes inflamables en el taller de pintura?", reverso: "Mantenerlos alejados de fuentes de ignición y de calor, en un espacio ventilado, en recipientes cerrados y correctamente etiquetados, y separados de productos incompatibles, conforme a las condiciones de la normativa de almacenamiento de productos químicos" },
  { anverso: "¿Qué es el Reglamento CLP (Reglamento CE 1272/2008)?", reverso: "El reglamento europeo sobre clasificación, etiquetado y envasado de sustancias y mezclas, que exige identificar los peligros de un producto químico (como una pintura o un disolvente) mediante pictogramas normalizados, indicaciones de peligro y consejos de prudencia en su etiqueta" },
  { anverso: "¿Qué información debe consultar el Oficial Pintor en la etiqueta o en la ficha de datos de seguridad de una pintura o disolvente antes de utilizarlo?", reverso: "Los pictogramas de peligro, las indicaciones de peligro (frases H) y los consejos de prudencia (frases P), que informan sobre los riesgos del producto (inflamabilidad, toxicidad, irritación) y las medidas de protección y almacenamiento que deben adoptarse" },
  { anverso: "¿Qué debe hacerse, con carácter general, con los trapos, brochas o materiales impregnados de disolvente tras su uso, antes de desecharlos?", reverso: "Gestionarlos conforme a la normativa de residuos aplicable a residuos peligrosos, evitando acumularlos en el propio taller sin control (por el riesgo de combustión espontánea de trapos impregnados) y depositándolos en los contenedores o puntos de recogida específicos habilitados" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué regula el RD 656/2017?", explicacion: "El Reglamento de Almacenamiento de Productos Químicos y sus ITC MIE APQ.", dificultad: "media", opciones: ["El Reglamento de Almacenamiento de Productos Químicos", "Exclusivamente el régimen de emisiones de COV en pinturas", "Exclusivamente los equipos de protección individual", "Exclusivamente las condiciones de los lugares de trabajo"], correcta: 0 },
  { enunciado: "¿Qué exige el almacenamiento correcto de disolventes inflamables en el taller?", explicacion: "Alejarlos de fuentes de ignición, en espacio ventilado, en recipientes cerrados y etiquetados.", dificultad: "media", opciones: ["Alejarlos de fuentes de ignición, en espacio ventilado y etiquetados", "Ninguna condición específica distinta de guardarlos en cualquier estantería", "Almacenarlos siempre junto a cualquier otro producto del taller", "Almacenarlos siempre en recipientes abiertos para facilitar su uso"], correcta: 0 },
  { enunciado: "¿Qué es el Reglamento CLP?", explicacion: "El reglamento europeo sobre clasificación, etiquetado y envasado de sustancias y mezclas.", dificultad: "media", opciones: ["El reglamento sobre clasificación, etiquetado y envasado de sustancias", "El reglamento sobre almacenamiento de productos químicos", "El reglamento sobre equipos de protección individual", "El reglamento sobre emisiones de COV en pinturas"], correcta: 0 },
  { enunciado: "¿Qué información aporta la etiqueta de una pintura o disolvente conforme al Reglamento CLP?", explicacion: "Pictogramas de peligro, indicaciones de peligro (H) y consejos de prudencia (P).", dificultad: "dificil", opciones: ["Pictogramas de peligro, indicaciones H y consejos P", "Únicamente el precio de venta del producto", "Únicamente la marca comercial del fabricante", "Únicamente la fecha de caducidad del producto"], correcta: 0 },
  { enunciado: "¿Qué riesgo específico presentan los trapos impregnados de disolvente acumulados sin control en el taller?", explicacion: "El riesgo de combustión espontánea.", dificultad: "dificil", opciones: ["El riesgo de combustión espontánea", "Ningún riesgo adicional distinto de la propia suciedad", "Únicamente un riesgo estético para el taller", "Únicamente el riesgo de manchar otras herramientas"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 7 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 7, orden: 7, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-235 creado y vinculado como Tema 7 de Oficial Pintor General.");

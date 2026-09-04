/**
 * Crea tema-285: "Redes generales de distribución de agua a presión" —
 * Tema 9 (numero=9, bloque-2) de Oficial Fontanero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 7 oficial del Anexo I (bases1716.pdf, línea 521):
 * "Instalaciones de redes generales de distribución de agua a presión.
 * Montaje de las instalaciones. Elementos de unión de tuberías y piezas,
 * tipos de juntas."
 *
 * Sourcing: materiales de tuberías (cobre UNE-EN 1057, polipropileno PP-R,
 * polietileno reticulado PEX, multicapa PEX-Al-PEX, PVC/PE UNE-EN 1452 y
 * UNE-EN 12201 ya verificadas en Guardallaves) y tipos de unión (soldadura
 * blanda/fuerte, termofusión, press-fitting, roscada, encolada) —
 * conocimiento técnico consolidado del oficio sin ley única que lo regule,
 * verificado con búsqueda previa. Las pruebas de resistencia mecánica y
 * estanquidad al finalizar el montaje sí están reguladas: CTE DB-HS4,
 * apartado 5.2.1 (norma UNE 100151:1988 para tuberías metálicas, UNE-CEN/TR
 * 12108:2015 IN para termoplásticas y multicapa), texto oficial descargado
 * de codigotecnico.org en esta sesión.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-285-redes-distribucion-presion-juntas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-285";
const OPOSICION = "oficial-fontanero-ayto-zaragoza";
const BLOQUE_2_ID = "417e77bc-e7ac-4984-ae49-3a35de79350d";

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
  titulo: "Redes generales de distribución de agua a presión",
  descripcion: "Materiales de tuberías empleados en fontanería (cobre, polipropileno, polietileno reticulado, multicapa, PVC/PE) y sus usos. Tipos de unión y juntas: soldadura, termofusión, roscada, press-fitting y encolada. Montaje de redes a presión y pruebas de resistencia mecánica y estanquidad.",
  contenido: "Desarrolla el montaje de las redes generales de distribución de agua a presión: los materiales de tuberías más empleados en fontanería y sus características (cobre, polipropileno, polietileno reticulado, sistemas multicapa, PVC y polietileno), los distintos tipos de unión y juntas según el material (soldadura blanda y fuerte, termofusión, press-fitting, unión roscada y unión encolada), y las pruebas de resistencia mecánica y estanquidad que exige el CTE DB-HS4 antes de la puesta en servicio de la instalación.",
  enlaces_boe: [
    { url: "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf", titulo: "CTE, Documento Básico HS Salubridad, Sección HS4, apartado 5.2 (Puesta en servicio: pruebas y ensayos)" },
  ],
  indice_estudio: [
    { url: "", titulo: "Materiales de tuberías en fontanería", seccion: "materiales-de-tuberias-en-fontaneria", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Tipos de unión y juntas", seccion: "tipos-de-union-y-juntas", articulos: "Conocimiento técnico del oficio" },
    { url: "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf", titulo: "Montaje y pruebas de la red a presión", seccion: "montaje-y-pruebas-de-la-red-a-presion", articulos: "CTE DB-HS4, apartado 5.2.1" },
  ],
}]);

const S1 = "materiales-de-tuberias-en-fontaneria";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué características tiene el cobre como material de tuberías en fontanería?", reverso: "Tubería metálica de larga tradición en agua fría, agua caliente sanitaria, gas y calefacción, normalizada por la UNE-EN 1057; resistente a la corrosión interior en condiciones normales y con buen comportamiento frente a la temperatura" },
  { anverso: "¿Para qué se emplea principalmente el polipropileno copolímero random (PP-R) en fontanería?", reverso: "Para conducción de agua fría y caliente sanitaria, climatización y calefacción; se une mediante termofusión (fusión del propio material con calor, sin aportar material adicional)" },
  { anverso: "¿Qué ventaja aporta el polietileno reticulado (PEX) frente a otros plásticos en instalaciones de agua caliente?", reverso: "Resiste temperaturas elevadas (en torno a 120-150 ºC) sin perder su forma ni sus propiedades, lo que lo hace adecuado para redes de agua caliente sanitaria y calefacción por suelo radiante" },
  { anverso: "¿Qué es un sistema multicapa PEX-Al-PEX?", reverso: "Una tubería compuesta por una capa intermedia de aluminio soldado longitudinalmente entre dos capas de polietileno reticulado (PEX), que combina la resistencia y estanquidad al oxígeno del aluminio con la flexibilidad de un tubo plástico" },
  { anverso: "¿Para qué se usa habitualmente el PVC en instalaciones relacionadas con la fontanería, a diferencia del PE?", reverso: "El PVC se emplea sobre todo en redes de evacuación (saneamiento, desagües), mientras que el polietileno (PE), normalizado por UNE-EN 12201, se usa en redes de abastecimiento de agua a presión" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué norma UNE-EN regula la tubería de cobre empleada en fontanería?", explicacion: "La UNE-EN 1057.", dificultad: "media", opciones: ["UNE-EN 1057", "UNE-EN 12201", "UNE-EN 1452", "UNE-EN 545"], correcta: 0 },
  { enunciado: "¿Cómo se realiza habitualmente la unión de tuberías de polipropileno (PP-R)?", explicacion: "Por termofusión, fundiendo el propio material con calor.", dificultad: "facil", opciones: ["Por termofusión", "Exclusivamente por unión roscada", "Exclusivamente por soldadura fuerte con estaño", "Exclusivamente por encolado con adhesivo epoxi"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta el PEX frente a otros plásticos en agua caliente?", explicacion: "Resiste temperaturas elevadas (120-150ºC aprox.) sin perder su forma.", dificultad: "media", opciones: ["Resiste temperaturas elevadas sin perder su forma ni sus propiedades", "Es el único material apto para conducir agua fría en toda la instalación", "No requiere ningún tipo de unión entre tramos de tubería", "Es el único material admitido por el CTE DB-HS4 para cualquier instalación"], correcta: 0 },
  { enunciado: "¿Qué es un sistema multicapa PEX-Al-PEX?", explicacion: "Tubería con capa intermedia de aluminio entre dos capas de PEX.", dificultad: "media", opciones: ["Una tubería con una capa intermedia de aluminio entre dos capas de polietileno reticulado", "Una tubería exclusivamente de aluminio, sin ninguna capa de plástico", "Una tubería exclusivamente de cobre revestida de PVC en su exterior", "Una tubería exclusivamente de polietileno, sin ninguna capa metálica"], correcta: 0 },
  { enunciado: "¿En qué tipo de red se emplea habitualmente el PVC, a diferencia del PE de la UNE-EN 12201?", explicacion: "El PVC se usa sobre todo en evacuación; el PE en abastecimiento a presión.", dificultad: "dificil", opciones: ["El PVC se emplea sobre todo en redes de evacuación, y el PE en redes de abastecimiento a presión", "Ambos materiales se emplean exclusivamente en redes de evacuación, nunca en abastecimiento", "Ambos materiales se emplean exclusivamente en redes de abastecimiento, nunca en evacuación", "El PVC se emplea exclusivamente en agua caliente sanitaria, y el PE exclusivamente en agua fría"], correcta: 0 },
]);

const S2 = "tipos-de-union-y-juntas";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿En qué se diferencian la soldadura blanda y la soldadura fuerte en tuberías de cobre?", reverso: "La soldadura blanda se realiza a temperaturas inferiores a 450 ºC (con aleaciones de estaño) y se usa en agua fría/caliente sanitaria; la soldadura fuerte se realiza a temperaturas superiores a 450 ºC (con aleaciones de cobre-fósforo o plata) y se emplea en instalaciones de gas o donde se exige mayor resistencia" },
  { anverso: "¿Qué es la termofusión como sistema de unión?", reverso: "Un procedimiento de unión de tuberías termoplásticas (como el PP-R) en el que se calientan los extremos a unir con una herramienta específica hasta fundir el material, que se sueldan entre sí al enfriarse, sin aportar ningún material adicional" },
  { anverso: "¿Qué es una unión por press-fitting?", reverso: "Un sistema de unión mecánica, habitual en tuberías PEX y multicapa, en el que un accesorio con un casquillo o anillo se comprime (prensa) sobre la tubería con una herramienta específica, sin soldadura ni encolado" },
  { anverso: "¿Qué caracteriza a una unión roscada en fontanería?", reverso: "La unión entre dos piezas mediante rosca macho-hembra (o macho-macho con manguito), habitualmente con junta de estanquidad (cinta de teflón o pasta selladora) para garantizar que no haya fugas" },
  { anverso: "¿En qué tipo de tuberías se emplea habitualmente la unión encolada?", reverso: "En tuberías de PVC, mediante imprimación y adhesivo (cemento de PVC) específico que funde superficialmente el material en la zona de unión, creando una junta química permanente" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿En qué se diferencian la soldadura blanda y la soldadura fuerte en tuberías de cobre?", explicacion: "La blanda se hace por debajo de 450ºC; la fuerte, por encima.", dificultad: "media", opciones: ["La soldadura blanda se realiza por debajo de 450 ºC y la fuerte por encima de esa temperatura", "Ambas se realizan exactamente a la misma temperatura, sin ninguna diferencia real", "La soldadura blanda solo se usa en instalaciones de gas, nunca en agua", "La soldadura fuerte solo se usa en tuberías de PVC, nunca en tuberías de cobre"], correcta: 0 },
  { enunciado: "¿Qué es la termofusión como sistema de unión de tuberías?", explicacion: "Fundir con calor los extremos de tuberías termoplásticas para soldarlas entre sí.", dificultad: "facil", opciones: ["Fundir con calor los extremos de tuberías termoplásticas para soldarlas entre sí", "Unir dos tuberías exclusivamente mediante rosca macho-hembra", "Unir dos tuberías exclusivamente mediante un adhesivo químico", "Unir dos tuberías exclusivamente mediante bridas atornilladas"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a una unión por press-fitting?", explicacion: "Un accesorio se prensa mecánicamente sobre la tubería con una herramienta específica.", dificultad: "media", opciones: ["Un accesorio con casquillo o anillo se prensa mecánicamente sobre la tubería con una herramienta específica", "La tubería se calienta hasta fundirla, sin utilizar ningún accesorio mecánico", "La tubería se une exclusivamente mediante un adhesivo químico específico", "La tubería se une exclusivamente mediante soldadura fuerte con aleación de plata"], correcta: 0 },
  { enunciado: "¿Qué elemento suele añadirse a una unión roscada para garantizar la estanquidad?", explicacion: "Cinta de teflón o pasta selladora.", dificultad: "media", opciones: ["Cinta de teflón o pasta selladora en la rosca", "Un adhesivo epoxi de fraguado ultrarrápido", "Una soldadura fuerte adicional sobre la propia rosca", "Ningún elemento adicional, al ser la rosca estanca por sí sola"], correcta: 0 },
  { enunciado: "¿Qué material de tubería se une habitualmente mediante encolado con imprimación y cemento específico?", explicacion: "El PVC.", dificultad: "dificil", opciones: ["El PVC", "El cobre", "El polipropileno (PP-R)", "El sistema multicapa PEX-Al-PEX"], correcta: 0 },
]);

const S3 = "montaje-y-pruebas-de-la-red-a-presion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿A qué está obligada la empresa instaladora antes de la puesta en servicio de una instalación, según el CTE DB-HS4?", reverso: "A efectuar una prueba de resistencia mecánica y estanquidad de todas las tuberías, elementos y accesorios que integran la instalación, con todos sus componentes vistos y accesibles para su control" },
  { anverso: "¿Cómo se inicia la prueba de resistencia mecánica y estanquidad según el CTE DB-HS4?", reverso: "Llenando de agua toda la instalación con los grifos terminales abiertos hasta asegurar que la purga de aire ha sido completa; a continuación se cierran esos grifos y el de la fuente de alimentación, y se emplea una bomba hasta alcanzar la presión de prueba" },
  { anverso: "¿Qué norma se considera válida para las pruebas de tuberías metálicas según el CTE DB-HS4?", reverso: "La norma UNE 100 151:1988" },
  { anverso: "¿Qué norma se considera válida para las pruebas de tuberías termoplásticas y multicapa según el CTE DB-HS4?", reverso: "El procedimiento de ensayo A de la norma UNE-CEN/TR 12108:2015 IN" },
  { anverso: "¿Qué precisión mínima debe tener el manómetro empleado en la prueba de presión según el CTE DB-HS4?", reverso: "Debe apreciar como mínimo intervalos de presión de 0,1 bar" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿A qué está obligada la empresa instaladora antes de la puesta en servicio, según el CTE DB-HS4?", explicacion: "A una prueba de resistencia mecánica y estanquidad de toda la instalación.", dificultad: "facil", opciones: ["A efectuar una prueba de resistencia mecánica y estanquidad de toda la instalación", "A pintar de un color reglamentario todas las tuberías vistas de la instalación", "A instalar exclusivamente tuberías de cobre en toda la instalación", "A prescindir de cualquier prueba si la instalación es de pequeño tamaño"], correcta: 0 },
  { enunciado: "¿Cómo debe iniciarse la prueba de resistencia mecánica y estanquidad?", explicacion: "Llenando de agua la instalación con los grifos abiertos hasta purgar el aire.", dificultad: "media", opciones: ["Llenando de agua toda la instalación con los grifos terminales abiertos hasta purgar completamente el aire", "Vaciando por completo la instalación y dejándola sin agua durante 24 horas", "Cerrando todos los grifos desde el primer momento, sin purgar el aire de la instalación", "Aplicando directamente la presión de prueba sin llenar antes de agua la instalación"], correcta: 0 },
  { enunciado: "¿Qué norma considera válida el CTE DB-HS4 para las pruebas de tuberías metálicas?", explicacion: "La UNE 100 151:1988.", dificultad: "media", opciones: ["UNE 100 151:1988", "UNE-EN 12201", "UNE-CEN/TR 12108:2015 IN", "UNE-EN 1057"], correcta: 0 },
  { enunciado: "¿Qué norma considera válida el CTE DB-HS4 para las pruebas de tuberías termoplásticas y multicapa?", explicacion: "El procedimiento de ensayo A de la UNE-CEN/TR 12108:2015 IN.", dificultad: "dificil", opciones: ["UNE-CEN/TR 12108:2015 IN (procedimiento de ensayo A)", "UNE 100 151:1988", "UNE-EN 1057", "UNE-EN 545"], correcta: 0 },
  { enunciado: "¿Qué precisión mínima debe tener el manómetro empleado en la prueba de presión?", explicacion: "Intervalos de 0,1 bar como mínimo.", dificultad: "media", opciones: ["Intervalos de presión de 0,1 bar como mínimo", "Intervalos de presión de 10 bar como mínimo", "No se exige ninguna precisión mínima concreta", "Intervalos de presión de 1 kPa exactamente, sin margen alguno"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "PP-R", definicion: "Polipropileno copolímero random, material plástico empleado en tuberías de agua fría y caliente, unido habitualmente por termofusión." },
  { tema_slug: TEMA, seccion: S1, termino: "PEX", definicion: "Polietileno reticulado, material plástico resistente a altas temperaturas empleado en agua caliente sanitaria y calefacción." },
  { tema_slug: TEMA, seccion: S2, termino: "Termofusión", definicion: "Sistema de unión de tuberías termoplásticas que consiste en fundir con calor los extremos a unir, soldándolos entre sí al enfriarse." },
  { tema_slug: TEMA, seccion: S2, termino: "Press-fitting", definicion: "Sistema de unión mecánica en el que un accesorio se prensa sobre la tubería (habitual en PEX y multicapa) con una herramienta específica, sin soldadura." },
  { tema_slug: TEMA, seccion: S3, termino: "Prueba de estanquidad", definicion: "Ensayo obligatorio, tras el montaje, para comprobar que la instalación resiste la presión de prueba sin fugas ni deformaciones." },
  { tema_slug: TEMA, seccion: S3, termino: "Purga", definicion: "Operación de eliminar el aire de una instalación llena de agua, abriendo los grifos terminales hasta asegurar su salida completa." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 9 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 9, orden: 9, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-285 creado y vinculado como Tema 9 de Oficial Fontanero.");

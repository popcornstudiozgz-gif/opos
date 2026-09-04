/**
 * Crea tema-294: "Soldadura de metales, nociones básicas" — Tema 18
 * (numero=18, bloque-2) de Oficial Fontanero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 16 oficial del Anexo I (bases1716.pdf, línea 544):
 * "Soldadura de metales, nociones básicas. Tipos, materiales a emplear y
 * técnicas."
 *
 * Sourcing: conocimiento técnico consolidado sin ley única que lo regule
 * (temperaturas y materiales de la soldadura blanda/fuerte, ya usadas de
 * forma introductoria en tema-285; fundamentos de la soldadura eléctrica
 * por arco SMAW y MIG/MAG), verificado con búsqueda previa conforme al
 * estándar del proyecto — mismo criterio ya aplicado con más profundidad
 * en Oficial Herrero para soldadura oxiacetilénica y eléctrica, aquí a
 * nivel de "nociones básicas" propio del temario de Oficial Fontanero.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-294-soldadura-metales-nociones-basicas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-294";
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
  titulo: "Soldadura de metales, nociones básicas",
  descripcion: "Soldadura blanda y soldadura fuerte: temperaturas, materiales de aportación y usos. Nociones de soldadura eléctrica por arco (SMAW, MIG/MAG). Materiales de aportación, decapantes y técnica básica de un cordón de soldadura.",
  contenido: "Desarrolla las nociones básicas de soldadura de metales que necesita un Oficial Fontanero: la diferencia entre soldadura blanda y soldadura fuerte, sus temperaturas de trabajo y sus materiales de aportación; los fundamentos de la soldadura eléctrica por arco, con sus variantes más habituales (electrodo revestido y MIG/MAG); y los materiales de aportación, decapantes y la técnica básica para ejecutar un cordón de soldadura correcto.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Soldadura blanda y soldadura fuerte", seccion: "soldadura-blanda-y-soldadura-fuerte", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Soldadura eléctrica por arco", seccion: "soldadura-electrica-por-arco", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Materiales de aportación y técnica básica", seccion: "materiales-de-aportacion-y-tecnica-basica", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "soldadura-blanda-y-soldadura-fuerte";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿A qué temperatura se trabaja habitualmente en la soldadura blanda, y qué aleación de aportación se emplea?", reverso: "En torno a 400 ºC, con una aleación de aportación de estaño y plomo (o de estaño sin plomo en aplicaciones sanitarias, por razones de salubridad del agua)" },
  { anverso: "¿A qué temperatura se trabaja habitualmente en la soldadura fuerte, y en qué se diferencia de la soldadura blanda en cuanto a resistencia?", reverso: "En torno a 800 ºC; ofrece una unión de mayor resistencia mecánica que la soldadura blanda, por eso se emplea en aplicaciones más exigentes, como el gas" },
  { anverso: "¿Qué material de aportación se emplea habitualmente en la soldadura fuerte, a diferencia de la aleación de estaño-plomo de la blanda?", reverso: "Aleaciones de cobre-fósforo o de plata, con un punto de fusión más elevado que el de la aleación de estaño-plomo empleada en la soldadura blanda" },
  { anverso: "¿En qué tipo de instalaciones de fontanería se emplea habitualmente la soldadura blanda, y en cuáles la fuerte?", reverso: "La soldadura blanda se emplea en instalaciones de agua fría y agua caliente sanitaria; la soldadura fuerte se reserva para instalaciones que exigen mayor resistencia, como las de gas" },
  { anverso: "¿Qué preparación previa exige la superficie del tubo y del accesorio antes de soldar, tanto en soldadura blanda como fuerte?", reverso: "Limpiar y decapar bien las superficies a unir, eliminando óxido, grasa e impurezas, para que el material de aportación moje correctamente el metal base y la unión quede estanca" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿A qué temperatura aproximada se trabaja en la soldadura blanda?", explicacion: "En torno a 400ºC.", dificultad: "facil", opciones: ["En torno a 400 ºC", "En torno a 800 ºC", "En torno a 1.500 ºC", "En torno a 100 ºC"], correcta: 0 },
  { enunciado: "¿A qué temperatura aproximada se trabaja en la soldadura fuerte?", explicacion: "En torno a 800ºC.", dificultad: "media", opciones: ["En torno a 800 ºC", "En torno a 400 ºC", "En torno a 100 ºC", "En torno a 2.000 ºC"], correcta: 0 },
  { enunciado: "¿Qué material de aportación es característico de la soldadura fuerte?", explicacion: "Aleaciones de cobre-fósforo o de plata.", dificultad: "media", opciones: ["Aleaciones de cobre-fósforo o de plata", "Una aleación de estaño y plomo, propia de la soldadura blanda", "Un electrodo revestido, propio de la soldadura eléctrica por arco", "Un decapante ácido, sin ningún material metálico de aportación"], correcta: 0 },
  { enunciado: "¿En qué tipo de instalación de fontanería es más habitual la soldadura fuerte, por su mayor exigencia de resistencia?", explicacion: "En instalaciones de gas.", dificultad: "dificil", opciones: ["En instalaciones de gas", "En instalaciones de agua fría doméstica convencional", "En instalaciones de riego de jardines particulares", "En instalaciones de desagüe de PVC"], correcta: 0 },
  { enunciado: "¿Qué preparación previa es común a la soldadura blanda y a la fuerte antes de soldar?", explicacion: "Limpiar y decapar bien las superficies a unir.", dificultad: "media", opciones: ["Limpiar y decapar bien las superficies a unir, eliminando óxido, grasa e impurezas", "Calentar el tubo hasta la temperatura de fusión antes de aplicar cualquier limpieza", "Aplicar directamente el material de aportación sin ninguna preparación previa", "Sumergir el tubo en agua fría inmediatamente antes de soldar"], correcta: 0 },
]);

const S2 = "soldadura-electrica-por-arco";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿En qué se basa la soldadura eléctrica por arco?", reverso: "En generar un arco eléctrico entre un electrodo y la pieza a unir, que produce el calor suficiente para fundir el metal base y el material de aportación, uniendo ambas piezas al solidificar" },
  { anverso: "¿Qué es la soldadura SMAW (electrodo revestido)?", reverso: "Una técnica de soldadura por arco en la que se emplea un electrodo metálico recubierto de un revestimiento que, al fundirse, protege el baño de soldadura de la atmósfera; sencilla, económica y muy utilizada en trabajos de campo" },
  { anverso: "¿Qué es la soldadura MIG/MAG y qué la diferencia de la SMAW en cuanto al material de aportación?", reverso: "Una técnica de soldadura por arco que emplea un hilo o alambre continuo como material de aportación, protegido por un gas (inerte en MIG, activo en MAG), lo que permite soldaduras más limpias y de mayor velocidad que con electrodo revestido" },
  { anverso: "¿Por qué la soldadura eléctrica por arco es menos habitual que la soldadura blanda o fuerte en el trabajo diario de un fontanero?", reverso: "Porque la fontanería trabaja mayoritariamente con tuberías de cobre o plástico, donde la unión habitual es soldadura blanda/fuerte o termofusión; la soldadura por arco se reserva para trabajos puntuales sobre elementos de acero o soportería metálica" },
  { anverso: "¿Qué protección ocular es imprescindible al soldar con arco eléctrico, y por qué?", reverso: "Una careta o pantalla de soldadura con filtro adecuado, porque el arco eléctrico emite radiación ultravioleta e infrarroja intensa capaz de dañar la vista (incluida la conocida «quemadura de arco» en la córnea) en muy poco tiempo de exposición" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿En qué se basa la soldadura eléctrica por arco?", explicacion: "En generar un arco eléctrico que funde el metal base y el material de aportación.", dificultad: "facil", opciones: ["En generar un arco eléctrico entre el electrodo y la pieza, que funde el metal para unirlas", "En aplicar exclusivamente presión mecánica entre las dos piezas a unir", "En aplicar exclusivamente un adhesivo químico entre las dos piezas a unir", "En calentar las piezas exclusivamente mediante un soplete de gas, sin ninguna corriente eléctrica"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a la soldadura SMAW (electrodo revestido)?", explicacion: "Electrodo con revestimiento que protege el baño de soldadura; sencilla y económica.", dificultad: "media", opciones: ["Un electrodo metálico revestido que protege el baño de soldadura al fundirse", "Un hilo continuo protegido por gas, propio de la técnica MIG/MAG", "La ausencia total de cualquier fuente de calor durante el proceso", "El uso exclusivo de una aleación de estaño y plomo como material de aportación"], correcta: 0 },
  { enunciado: "¿Qué material de aportación emplea la soldadura MIG/MAG, a diferencia de la SMAW?", explicacion: "Un hilo o alambre continuo, protegido por gas.", dificultad: "media", opciones: ["Un hilo o alambre continuo protegido por gas", "Un electrodo revestido, idéntico al de la técnica SMAW", "Una aleación de estaño y plomo, propia de la soldadura blanda", "Ningún material de aportación adicional distinto del propio metal base"], correcta: 0 },
  { enunciado: "¿Por qué la soldadura por arco es menos habitual que la blanda o fuerte en el trabajo diario de un fontanero?", explicacion: "Porque la fontanería trabaja mayoritariamente con cobre o plástico, no con soldadura por arco.", dificultad: "dificil", opciones: ["Porque la fontanería trabaja mayoritariamente con tuberías de cobre o plástico, donde no es la unión habitual", "Porque la soldadura por arco está prohibida en cualquier instalación relacionada con la fontanería", "Porque la soldadura por arco solo puede emplearse en instalaciones de gas, nunca en soportería metálica", "Porque la soldadura por arco no requiere ninguna protección ocular, a diferencia de la blanda o fuerte"], correcta: 0 },
  { enunciado: "¿Qué protección ocular es imprescindible al soldar con arco eléctrico?", explicacion: "Careta o pantalla de soldadura con filtro adecuado, por la radiación UV e IR del arco.", dificultad: "media", opciones: ["Una careta o pantalla de soldadura con filtro adecuado", "Unas gafas de sol convencionales, sin ningún filtro específico de soldadura", "Ninguna protección ocular específica, al no emitir el arco ningún tipo de radiación", "Unas gafas graduadas convencionales, sin ningún filtro adicional"], correcta: 0 },
]);

const S3 = "materiales-de-aportacion-y-tecnica-basica";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un decapante (o fundente) en soldadura blanda o fuerte, y qué función cumple?", reverso: "Una sustancia química que se aplica sobre las superficies a soldar antes de calentarlas, que elimina los óxidos residuales y evita que se formen nuevos durante el calentamiento, permitiendo que el material de aportación moje correctamente el metal" },
  { anverso: "¿Qué se entiende por «mojado» del material de aportación sobre el metal base en una soldadura correcta?", reverso: "Que el material de aportación fundido se extiende de forma uniforme por la superficie limpia del metal base, penetrando por capilaridad en la unión, en lugar de formar gotas aisladas que indicarían una unión deficiente" },
  { anverso: "¿Qué aspecto visual debe tener un cordón de soldadura bien ejecutado, con carácter general?", reverso: "Un aspecto uniforme, sin porosidades, grietas ni faltas de penetración visibles, con un brillo metálico limpio y sin exceso ni defecto de material de aportación" },
  { anverso: "¿Por qué es importante dejar enfriar una unión soldada antes de manipularla o ponerla en carga (presión de agua)?", reverso: "Porque el material de aportación necesita solidificar completamente para alcanzar su resistencia mecánica final; manipular o presurizar la unión en caliente puede debilitarla o incluso romperla" },
  { anverso: "¿Qué riesgo específico debe tenerse en cuenta al soldar cerca de materiales combustibles o en espacios con acumulación de gases (por ejemplo, tras vaciar una instalación de gas)?", reverso: "El riesgo de incendio o explosión por la fuente de calor de la soldadura; deben tomarse medidas previas como ventilar el espacio, retirar materiales combustibles próximos y, si aplica, purgar completamente la instalación de gas antes de soldar" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué función cumple un decapante en soldadura blanda o fuerte?", explicacion: "Elimina óxidos y evita que se formen nuevos, permitiendo que el material de aportación moje bien el metal.", dificultad: "facil", opciones: ["Eliminar óxidos residuales y evitar que se formen nuevos durante el calentamiento", "Aumentar la temperatura de fusión del material de aportación empleado", "Sustituir por completo la necesidad de limpiar previamente la superficie a soldar", "Reducir la resistencia mecánica final de la unión soldada"], correcta: 0 },
  { enunciado: "¿Qué se entiende por «mojado» del material de aportación en una soldadura correcta?", explicacion: "Que se extiende uniformemente y penetra por capilaridad, en vez de formar gotas aisladas.", dificultad: "media", opciones: ["Que el material de aportación se extiende uniformemente y penetra por capilaridad en la unión", "Que el material de aportación forma gotas aisladas sobre la superficie del metal base", "Que la superficie del metal base queda completamente húmeda de agua antes de soldar", "Que el decapante permanece líquido sobre la unión una vez finalizada la soldadura"], correcta: 0 },
  { enunciado: "¿Qué aspecto visual indica un cordón de soldadura bien ejecutado?", explicacion: "Uniforme, sin porosidades ni grietas, con brillo metálico limpio.", dificultad: "media", opciones: ["Un aspecto uniforme, sin porosidades ni grietas, con brillo metálico limpio", "Un aspecto irregular con múltiples burbujas visibles en toda su longitud", "Un aspecto mate y oscuro, con grietas visibles a simple vista", "Un exceso muy visible de material de aportación acumulado sin uniformidad"], correcta: 0 },
  { enunciado: "¿Por qué es importante dejar enfriar una unión soldada antes de ponerla en carga?", explicacion: "Porque necesita solidificar completamente para alcanzar su resistencia mecánica final.", dificultad: "dificil", opciones: ["Porque el material de aportación necesita solidificar completamente para alcanzar su resistencia final", "Porque el enfriamiento reduce automáticamente la estanquidad de la unión ejecutada", "Porque la presión del agua nunca puede afectar a una unión recién soldada, esté fría o caliente", "Porque enfriar la unión sustituye a la necesidad de haberla decapado previamente"], correcta: 0 },
  { enunciado: "¿Qué riesgo específico debe considerarse al soldar cerca de materiales combustibles o gases?", explicacion: "Riesgo de incendio o explosión por la fuente de calor.", dificultad: "media", opciones: ["Riesgo de incendio o explosión por la fuente de calor de la soldadura", "Ningún riesgo adicional distinto del propio de cualquier soldadura en taller", "Riesgo exclusivamente eléctrico, sin ninguna relación con el calor generado", "Riesgo exclusivamente de corrosión acelerada del metal base soldado"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Soldadura blanda", definicion: "Técnica de soldadura a baja temperatura (en torno a 400 ºC) con aportación de aleación de estaño, empleada en agua fría y ACS." },
  { tema_slug: TEMA, seccion: S1, termino: "Soldadura fuerte", definicion: "Técnica de soldadura a mayor temperatura (en torno a 800 ºC) con aportación de cobre-fósforo o plata, de mayor resistencia mecánica, empleada por ejemplo en gas." },
  { tema_slug: TEMA, seccion: S2, termino: "SMAW", definicion: "Soldadura eléctrica por arco con electrodo revestido, sencilla y económica, habitual en trabajos de campo." },
  { tema_slug: TEMA, seccion: S2, termino: "MIG/MAG", definicion: "Soldadura eléctrica por arco con hilo continuo protegido por gas, que permite soldaduras más limpias y rápidas que el electrodo revestido." },
  { tema_slug: TEMA, seccion: S3, termino: "Decapante", definicion: "Sustancia que elimina óxidos de la superficie a soldar y evita que se formen nuevos durante el calentamiento, facilitando el mojado del material de aportación." },
  { tema_slug: TEMA, seccion: S3, termino: "Mojado", definicion: "Extensión uniforme del material de aportación fundido sobre el metal base, señal de una soldadura correctamente ejecutada." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 18 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 18, orden: 18, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-294 creado y vinculado como Tema 18 de Oficial Fontanero.");

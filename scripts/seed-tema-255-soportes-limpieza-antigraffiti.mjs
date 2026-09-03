/**
 * Crea tema-255: "Soportes del material gráfico. Productos de limpieza.
 * Productos de protección antigraffiti" — Tema 11 (numero=11, bloque-2)
 * de Oficial Pintor, Especialidad Gráfica (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 9 oficial del Anexo I (bases2110.pdf, línea
 * 1509): "Soportes del material gráfico. Productos de limpieza.
 * Productos de protección anti grafiti. Normativa."
 *
 * Normativa: Reglamento CLP (DOUE-L-2008-82637, ya citado), de
 * aplicación a los productos de limpieza y antigrafiti como productos
 * químicos. El resto (tipos de soporte) es conocimiento técnico
 * consolidado del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-255-soportes-limpieza-antigraffiti.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-255";
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
  titulo: "Soportes del material gráfico, productos de limpieza y protección antigraffiti",
  descripcion: "Tipos de soportes sobre los que se aplica el material gráfico. Productos de limpieza específicos para cada soporte. Productos de protección antigraffiti y su función en el mobiliario urbano municipal.",
  contenido: "Desarrolla los soportes finales sobre los que se aplica el material gráfico (cristal, metal, piedra, mobiliario urbano, vehículos) y sus características particulares; los productos de limpieza específicos para preparar cada tipo de soporte antes de la aplicación, o para su mantenimiento posterior; y los productos de protección antigraffiti, empleados en superficies municipales especialmente expuestas al vandalismo, que facilitan la eliminación de pintadas sin dañar el soporte original. Se incluye la normativa de clasificación y etiquetado (Reglamento CLP) aplicable a estos productos químicos.",
  enlaces_boe: [
    { url: REGLAMENTO_CLP, titulo: "Reglamento (CE) 1272/2008 (CLP) — clasificación, etiquetado y envasado" },
  ],
  indice_estudio: [
    { url: "", titulo: "Soportes del material gráfico: tipos y características", seccion: "soportes-material-grafico-tipos-caracteristicas", articulos: "Conocimiento técnico del oficio" },
    { url: REGLAMENTO_CLP, titulo: "Productos de limpieza específicos para cada soporte", seccion: "productos-limpieza-soportes", articulos: "Reglamento CLP" },
    { url: REGLAMENTO_CLP, titulo: "Productos de protección antigraffiti", seccion: "productos-proteccion-antigraffiti", articulos: "Reglamento CLP" },
  ],
}]);

const S1 = "soportes-material-grafico-tipos-caracteristicas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué características del cristal, como soporte del material gráfico, resultan relevantes al aplicar un vinilo sobre él?", reverso: "Su superficie no porosa y lisa, que favorece una adherencia uniforme del vinilo, pero también hace más visible cualquier burbuja de aire o imperfección atrapada durante la aplicación, exigiendo especial cuidado en la técnica" },
  { anverso: "¿Qué precaución debe adoptarse al aplicar material gráfico sobre un soporte metálico, como una señal o un elemento de mobiliario urbano?", reverso: "Comprobar el estado del metal (ausencia de óxido activo bajo pintura antigua o suelto) y su temperatura superficial, dado que aplicar un vinilo sobre metal muy caliente por exposición solar puede provocar burbujas o una adherencia deficiente" },
  { anverso: "¿Qué característica de la piedra o de un soporte de mampostería resulta especialmente relevante antes de aplicar material gráfico sobre ella?", reverso: "Su porosidad y su textura irregular, que pueden dificultar una adherencia uniforme del vinilo y exigir, en muchos casos, el empleo de otras técnicas (pintura directa, paneles independientes) más adecuadas que un vinilo autoadhesivo convencional" },
  { anverso: "¿Qué particularidad presenta un vehículo municipal como soporte de rotulación, frente a una superficie plana fija?", reverso: "Su superficie con curvaturas, remaches y juntas de chapa, que exige técnicas de aplicación con calor y agua jabonosa para adaptar el vinilo a la geometría del vehículo, además de una preparación previa que elimine cera o tratamientos de la carrocería" },
  { anverso: "¿Por qué es relevante que el Oficial Pintor Especialidad Gráfica identifique correctamente el tipo de soporte antes de planificar la aplicación de un trabajo gráfico, del mismo modo que se estudia para la pintura convencional en la especialidad general?", reverso: "Porque cada soporte exige una preparación, un tipo de vinilo o de adhesivo, y una técnica de aplicación distintos; una elección inadecuada puede provocar despegues, burbujas o un acabado defectuoso en el resultado final" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué característica del cristal resulta relevante al aplicar un vinilo sobre él?", explicacion: "Su superficie no porosa y lisa favorece la adherencia pero hace visibles las burbujas de aire.", dificultad: "media", opciones: ["Superficie no porosa que favorece adherencia pero hace visibles burbujas", "Su elevada porosidad que dificulta cualquier adherencia", "Su tendencia a la corrosión con la humedad", "Su carácter higroscópico frente al ambiente"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al aplicar material gráfico sobre un soporte metálico expuesto al sol?", explicacion: "Comprobar la temperatura superficial, dado que el metal muy caliente puede provocar burbujas.", dificultad: "dificil", opciones: ["Comprobar que el metal no está excesivamente caliente", "La temperatura del metal nunca influye en la aplicación", "Solo resulta relevante en soportes de cristal, nunca de metal", "Solo resulta relevante durante el invierno"], correcta: 0 },
  { enunciado: "¿Qué característica de la piedra o mampostería resulta relevante antes de aplicar material gráfico?", explicacion: "Su porosidad y textura irregular pueden dificultar una adherencia uniforme del vinilo.", dificultad: "media", opciones: ["Su porosidad y textura irregular dificultan la adherencia", "Su superficie siempre resulta perfectamente lisa y no porosa", "Nunca presenta ninguna dificultad para aplicar un vinilo", "Solo resulta relevante en soportes de gran tamaño"], correcta: 0 },
  { enunciado: "¿Qué particularidad presenta un vehículo municipal como soporte de rotulación?", explicacion: "Su superficie con curvaturas exige técnicas de aplicación con calor y agua jabonosa.", dificultad: "media", opciones: ["Su superficie curva exige técnicas con calor y agua jabonosa", "Su superficie resulta siempre perfectamente plana", "No exige ninguna técnica distinta de una superficie fija plana", "Solo resulta relevante si el vehículo es de gran tamaño"], correcta: 0 },
  { enunciado: "¿Por qué es relevante identificar correctamente el tipo de soporte antes de planificar un trabajo gráfico?", explicacion: "Cada soporte exige preparación, adhesivo y técnica distintos; una elección inadecuada provoca fallos.", dificultad: "dificil", opciones: ["Cada soporte exige una preparación y técnica distintas", "El tipo de soporte nunca influye en el resultado del trabajo", "Todos los soportes admiten exactamente la misma técnica", "Solo resulta relevante en soportes de gran superficie"], correcta: 0 },
]);

const S2 = "productos-limpieza-soportes";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué función cumple un producto de limpieza específico antes de aplicar material gráfico sobre un soporte?", reverso: "Eliminar polvo, grasa, restos de adhesivos anteriores o cualquier contaminante que pudiera reducir la adherencia del nuevo vinilo o material gráfico, garantizando una superficie limpia y en condiciones óptimas para la aplicación" },
  { anverso: "¿Qué tipo de producto de limpieza resulta habitual para preparar un soporte de cristal antes de aplicar un vinilo?", reverso: "Un limpiacristales o un disolvente suave a base de alcohol isopropílico, que elimina grasa y polvo sin dejar residuos que pudieran interferir con la adherencia del vinilo, y que se evapora rápidamente sin dejar marcas" },
  { anverso: "¿Qué precaución debe adoptarse al elegir un producto de limpieza para un soporte metálico ya pintado, como un elemento de mobiliario urbano?", reverso: "Verificar que el producto no resulte agresivo con la pintura existente (evitando disolventes fuertes que puedan disolverla o decolorarla), especialmente si el soporte no va a repintarse antes de aplicar el material gráfico" },
  { anverso: "¿Qué información debería consultar el Oficial en la etiqueta de un producto de limpieza conforme al Reglamento CLP, antes de utilizarlo en un espacio interior poco ventilado?", reverso: "Los pictogramas de peligro, las indicaciones de peligro (H) y los consejos de prudencia (P), especialmente relevantes si el producto contiene disolventes volátiles que pudieran generar vapores en un espacio con ventilación limitada" },
  { anverso: "¿Por qué debe dejarse secar completamente el producto de limpieza aplicado sobre un soporte antes de proceder a la aplicación del material gráfico?", reverso: "Porque la humedad residual del limpiador puede quedar atrapada bajo el vinilo, impidiendo una correcta adherencia y favoreciendo la aparición de burbujas o un despegue prematuro del material aplicado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué función cumple un producto de limpieza específico antes de aplicar material gráfico?", explicacion: "Eliminar polvo, grasa y contaminantes que reducirían la adherencia del nuevo material.", dificultad: "facil", opciones: ["Eliminar polvo, grasa y contaminantes del soporte", "Aportar color adicional al soporte antes de aplicar el vinilo", "Aumentar la temperatura del soporte antes de la aplicación", "Sustituir por completo la necesidad de cualquier adhesivo"], correcta: 0 },
  { enunciado: "¿Qué producto de limpieza resulta habitual para preparar un soporte de cristal?", explicacion: "Un limpiacristales o disolvente suave a base de alcohol isopropílico.", dificultad: "media", opciones: ["Un limpiacristales o disolvente suave de alcohol isopropílico", "Un decapante de pintura de alta agresividad", "Un producto exclusivo para superficies metálicas oxidadas", "Un producto exclusivamente abrasivo de limpieza mecánica"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al limpiar un soporte metálico ya pintado antes de aplicar material gráfico?", explicacion: "Verificar que el producto no resulte agresivo con la pintura existente.", dificultad: "dificil", opciones: ["Verificar que el producto no daña la pintura existente", "Cualquier producto de limpieza resulta igualmente adecuado", "La agresividad del producto nunca resulta relevante en este caso", "Solo resulta relevante en soportes metálicos sin pintar"], correcta: 0 },
  { enunciado: "¿Qué información debe consultarse en la etiqueta de un producto de limpieza conforme al Reglamento CLP?", explicacion: "Pictogramas de peligro, indicaciones H y consejos de prudencia P.", dificultad: "media", opciones: ["Pictogramas de peligro, indicaciones H y consejos P", "Únicamente el precio de venta del producto", "Únicamente la marca comercial del fabricante", "Únicamente el color del envase del producto"], correcta: 0 },
  { enunciado: "¿Por qué debe secarse completamente el producto de limpieza antes de aplicar el material gráfico?", explicacion: "La humedad residual puede impedir la adherencia y favorecer burbujas o un despegue prematuro.", dificultad: "media", opciones: ["La humedad residual impide la adherencia y genera defectos", "La humedad residual nunca afecta al resultado del trabajo", "Solo resulta relevante en soportes metálicos, nunca en cristal", "Solo resulta relevante si se emplea vinilo de corte"], correcta: 0 },
]);

const S3 = "productos-proteccion-antigraffiti";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un producto de protección antigraffiti, empleado en superficies municipales expuestas al vandalismo?", reverso: "Un producto que se aplica como capa de sacrificio sobre una superficie (fachada, mobiliario urbano, señalización), formando una barrera que impide que la pintura de una futura pintada penetre en el material original, facilitando su eliminación posterior sin dañar el soporte" },
  { anverso: "¿Qué diferencia existe entre un producto antigrafiti permanente y uno sacrificable (o de un solo uso)?", reverso: "El producto permanente puede limpiarse repetidamente sin perder su función protectora tras cada eliminación de pintada; el sacrificable se elimina junto con la propia pintada durante la limpieza, debiendo reaplicarse una nueva capa protectora tras cada intervención" },
  { anverso: "¿Qué método de limpieza resulta habitual para eliminar una pintada de una superficie protegida con un producto antigrafiti?", reverso: "El empleo de un disolvente específico compatible con el producto antigrafiti aplicado, o agua a presión moderada en el caso de productos permanentes, evitando técnicas abrasivas que pudieran dañar tanto la protección como el soporte original" },
  { anverso: "¿Qué relación existe entre el laminado antigraffiti, ya estudiado en un tema anterior de este bloque, y este producto de protección antigrafiti aplicado directamente sobre superficies?", reverso: "Ambos persiguen el mismo objetivo (facilitar la limpieza de pintadas), pero el laminado se aplica como una capa sobre el propio material impreso, mientras que este producto se aplica directamente sobre la superficie del elemento (fachada, mobiliario) sin necesidad de un material gráfico previo" },
  { anverso: "¿Por qué resulta especialmente relevante para un Ayuntamiento como el de Zaragoza disponer de un criterio de protección antigrafiti en elementos de mobiliario urbano y señalización de alto valor visual?", reverso: "Porque reduce el coste y la frecuencia de las intervenciones de limpieza necesarias tras un acto de vandalismo, y contribuye a mantener una imagen cuidada del espacio público municipal con menor esfuerzo de mantenimiento a largo plazo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un producto de protección antigrafiti?", explicacion: "Un producto que forma una barrera de sacrificio que facilita eliminar pintadas sin dañar el soporte.", dificultad: "facil", opciones: ["Un producto que facilita eliminar pintadas sin dañar el soporte", "Un producto que aporta color adicional a la superficie", "Un adhesivo específico para fijar vinilos de corte", "Un tipo de laminado exclusivo de protección solar"], correcta: 0 },
  { enunciado: "¿Qué diferencia un producto antigrafiti permanente de uno sacrificable?", explicacion: "El permanente se limpia repetidamente; el sacrificable se elimina con la pintada y debe reaplicarse.", dificultad: "media", opciones: ["El sacrificable se elimina con la pintada y debe reaplicarse", "Ambos tipos de producto son exactamente equivalentes", "El permanente siempre debe reaplicarse tras cada limpieza", "El sacrificable nunca necesita reaplicarse tras la limpieza"], correcta: 0 },
  { enunciado: "¿Qué método de limpieza resulta habitual para eliminar una pintada de una superficie protegida?", explicacion: "Un disolvente específico compatible o agua a presión moderada, evitando técnicas abrasivas.", dificultad: "media", opciones: ["Un disolvente compatible o agua a presión, sin técnicas abrasivas", "Exclusivamente técnicas abrasivas de lijado mecánico", "Ningún método de limpieza resulta compatible con la protección", "Exclusivamente fuego directo sobre la superficie protegida"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el laminado antigraffiti y el producto de protección antigrafiti aplicado directamente sobre superficies?", explicacion: "Ambos facilitan la limpieza, pero el laminado se aplica sobre el material impreso, no directamente sobre la superficie.", dificultad: "dificil", opciones: ["Ambos facilitan la limpieza pero se aplican de forma distinta", "Ambos son exactamente el mismo producto con distinto nombre", "El laminado nunca guarda relación con este tipo de protección", "Solo el producto directo resulta realmente eficaz frente a pintadas"], correcta: 0 },
  { enunciado: "¿Por qué resulta relevante para un Ayuntamiento disponer de protección antigrafiti en mobiliario urbano de alto valor visual?", explicacion: "Reduce el coste y la frecuencia de las intervenciones de limpieza tras actos de vandalismo.", dificultad: "media", opciones: ["Reduce el coste y frecuencia de limpieza tras el vandalismo", "No aporta ninguna ventaja real para la gestión municipal", "Solo resulta relevante en mobiliario de escaso valor visual", "Solo resulta relevante si nunca se producen actos de vandalismo"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 11 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 11, orden: 11, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-255 creado y vinculado como Tema 11 de Oficial Pintor Gráfica.");

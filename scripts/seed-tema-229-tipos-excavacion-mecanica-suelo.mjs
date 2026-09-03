/**
 * Crea tema-229: "Tipos de excavación y mecánica del suelo" — Tema 17
 * (numero=17, bloque-2) de Oficial Conductor, Especialidad Maquinaria
 * Pesada (Ayto. de Zaragoza).
 *
 * Corresponde al TEMA 15 oficial del Anexo I (bases2110.pdf, línea
 * 2148): "Tipos de excavación. Por su profundidad. Por su nivel de
 * complejidad. Por el tipo de material. Por el grado de humedad.
 * Mecánica del suelo: esponjamiento, dureza, compacidad. Clasificación
 * del suelo. Rocas y piedras naturales, tierras. Ejecución de firmes,
 * extendido, fondos de cimentación, zanjas y fondos de zanja.
 * Colocación y renovación de redes de distribución, canalizaciones de
 * agua, desagües, drenajes, conducciones de gas, electricidad y
 * comunicaciones. Ejecución de cimentaciones y zapatas. Refuerzos de
 * firmes, bacheos, saneamiento de blandones. Taludes y excavaciones
 * escalonadas."
 *
 * Normativa verificada (ya citada en el proyecto):
 * - RD 1627/1997, disposiciones mínimas de seguridad y salud en obras
 *   de construcción (BOE-A-1997-22614) — ya citado en tema-223.
 * - RD 314/2006, de 17 de marzo, por el que se aprueba el Código
 *   Técnico de la Edificación (BOE-A-2006-5515) — Documento Básico
 *   SE-C, Seguridad Estructural: Cimientos, verificado mediante
 *   WebSearch en esta sesión.
 * El resto (mecánica del suelo, redes de servicios) es conocimiento
 * técnico consolidado del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-229-tipos-excavacion-mecanica-suelo.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-229";
const OPOSICION = "oficial-conductor-maquinaria-pesada-ayto-zaragoza";
const BLOQUE_2_ID = "388bfbfc-396e-4de2-8897-09532d6a0bcd";

const RD_1627_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-22614";
const RD_314_2006 = "https://www.boe.es/buscar/doc.php?id=BOE-A-2006-5515";

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
  titulo: "Tipos de excavación y mecánica del suelo",
  descripcion: "Clasificación de las excavaciones por profundidad, complejidad, material y humedad. Mecánica del suelo: esponjamiento, dureza y compacidad. Firmes, redes de servicios, cimentaciones y taludes escalonados.",
  contenido: "Desarrolla la clasificación técnica de las excavaciones y los fundamentos de mecánica del suelo aplicados al trabajo con maquinaria pesada: los tipos de excavación según su profundidad, nivel de complejidad, tipo de material y grado de humedad; conceptos de mecánica del suelo (esponjamiento, dureza, compacidad) y la clasificación del suelo en rocas, piedras naturales y tierras; y las aplicaciones prácticas de la excavación en obra pública: ejecución de firmes y fondos de cimentación, colocación y renovación de redes de servicios (agua, desagües, drenajes, gas, electricidad y comunicaciones), ejecución de cimentaciones y zapatas conforme al CTE, refuerzos de firmes y bacheos, y taludes y excavaciones escalonadas.",
  enlaces_boe: [
    { url: RD_1627_1997, titulo: "RD 1627/1997 — disposiciones mínimas de seguridad y salud en obras de construcción" },
    { url: RD_314_2006, titulo: "RD 314/2006 — Código Técnico de la Edificación (DB SE-C, Cimientos)" },
  ],
  indice_estudio: [
    { url: "", titulo: "Tipos de excavación: profundidad, complejidad, material y humedad", seccion: "tipos-excavacion-profundidad-complejidad-material-humedad", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Mecánica del suelo: esponjamiento, dureza, compacidad y clasificación", seccion: "mecanica-suelo-esponjamiento-dureza-compacidad", articulos: "Conocimiento técnico del oficio" },
    { url: RD_1627_1997, titulo: "Firmes, redes de servicios, cimentaciones y taludes escalonados", seccion: "firmes-cimentaciones-redes-taludes-escalonados", articulos: "RD 1627/1997, RD 314/2006 (CTE DB SE-C)" },
  ],
}]);

const S1 = "tipos-excavacion-profundidad-complejidad-material-humedad";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cómo se clasifican las excavaciones según su profundidad?", reverso: "En excavaciones superficiales (de escasa profundidad, como una explanación o un vaciado poco profundo), excavaciones de profundidad media (zanjas y cimentaciones habituales) y excavaciones profundas (pozos, cimentaciones especiales), cada una con exigencias distintas de estabilidad y entibación" },
  { anverso: "¿Qué factores determinan el nivel de complejidad de una excavación?", reverso: "La presencia de servicios enterrados (redes de agua, gas, electricidad), la proximidad a construcciones existentes, el nivel freático, la necesidad de entibación o de sistemas de contención, y el espacio disponible para la maniobra de la maquinaria" },
  { anverso: "¿Cómo influye el tipo de material a excavar en la técnica y en la maquinaria empleada?", reverso: "Un material suelto y poco cohesivo (arena, grava) se excava con facilidad pero requiere mayor atención a la estabilidad de los taludes; un material cohesivo (arcilla) mantiene mejor un talud vertical pero puede ser más difícil de excavar; la roca compacta puede requerir martillo hidráulico o voladura previa" },
  { anverso: "¿Cómo influye el grado de humedad del terreno en los trabajos de excavación?", reverso: "Un terreno seco puede resultar más duro de excavar pero más estable; un terreno con humedad moderada suele ser más fácil de trabajar; un terreno saturado de agua pierde cohesión y capacidad portante, aumentando el riesgo de desprendimientos y dificultando el tránsito de la maquinaria" },
  { anverso: "¿Por qué es relevante clasificar correctamente el tipo de excavación antes de comenzar los trabajos con maquinaria pesada?", reverso: "Porque permite seleccionar la máquina y el equipo de trabajo más adecuados (excavadora, cuchara bivalva, martillo hidráulico), planificar las medidas de seguridad necesarias (entibación, taluzado) y estimar de forma realista el rendimiento y el plazo de ejecución de los trabajos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cómo se clasifican las excavaciones según su profundidad?", explicacion: "En superficiales, de profundidad media y profundas, cada una con distintas exigencias de estabilidad.", dificultad: "media", opciones: ["En superficiales, de profundidad media y profundas", "Únicamente en excavaciones de tierra o de roca", "Únicamente en excavaciones diurnas o nocturnas", "Únicamente en excavaciones urbanas o interurbanas"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes factores determina el nivel de complejidad de una excavación?", explicacion: "La presencia de servicios enterrados, entre otros factores relevantes.", dificultad: "media", opciones: ["La presencia de servicios enterrados", "El color del terreno a excavar", "La marca comercial de la excavadora empleada", "El nombre de la empresa contratista de la obra"], correcta: 0 },
  { enunciado: "¿Cómo influye un material cohesivo como la arcilla en la excavación de un talud?", explicacion: "Mantiene mejor un talud vertical, pero puede resultar más difícil de excavar que un material suelto.", dificultad: "dificil", opciones: ["Mantiene mejor un talud vertical pero es más difícil de excavar", "Se excava siempre con mayor facilidad que un material suelto", "No influye en ningún caso en la estabilidad del talud", "Impide por completo la excavación con maquinaria mecánica"], correcta: 0 },
  { enunciado: "¿Qué efecto tiene un terreno saturado de agua sobre la excavación?", explicacion: "Pierde cohesión y capacidad portante, aumentando el riesgo de desprendimientos.", dificultad: "media", opciones: ["Pierde cohesión y aumenta el riesgo de desprendimientos", "Mejora siempre la estabilidad del terreno excavado", "No influye en ningún caso en la seguridad de la excavación", "Facilita siempre el tránsito de la maquinaria pesada"], correcta: 0 },
  { enunciado: "¿Por qué es relevante clasificar correctamente el tipo de excavación antes de comenzar los trabajos?", explicacion: "Permite seleccionar el equipo adecuado, planificar la seguridad y estimar el rendimiento.", dificultad: "media", opciones: ["Permite seleccionar el equipo, la seguridad y estimar el rendimiento", "No aporta ninguna utilidad práctica real en la obra", "Solo es relevante para el cálculo del presupuesto económico", "Solo resulta necesario en excavaciones de más de un año"], correcta: 0 },
]);

const S2 = "mecanica-suelo-esponjamiento-dureza-compacidad";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el esponjamiento de un suelo, en mecánica del suelo aplicada a la excavación?", reverso: "El aumento de volumen que experimenta un material del terreno al ser excavado y removido de su estado natural (\"en banco\"), debido a la pérdida de la compacidad original al fragmentarse, factor que debe tenerse en cuenta al calcular la capacidad de transporte necesaria" },
  { anverso: "¿Qué es la dureza de un suelo o de una roca, a efectos de excavación?", reverso: "La resistencia que opone el material a ser penetrado o fragmentado por el equipo de trabajo de la máquina, que condiciona la elección del cazo, la necesidad de un martillo hidráulico, o incluso la viabilidad de la excavación mecánica frente a otros métodos" },
  { anverso: "¿Qué es la compacidad de un suelo?", reverso: "El grado de proximidad entre las partículas que componen el suelo, relacionado con su densidad y con los huecos de aire existentes entre ellas; un suelo de mayor compacidad ofrece generalmente mayor resistencia y menor riesgo de asiento bajo carga" },
  { anverso: "¿Cómo se clasifica de forma general el suelo, según su naturaleza, a efectos de las obras de movimiento de tierras?", reverso: "En rocas (material consolidado que requiere generalmente medios mecánicos especiales o voladura), piedras naturales o bolos (fragmentos de gran tamaño sueltos en el terreno), y tierras (materiales sueltos de grano fino a grueso: arcillas, limos, arenas, gravas)" },
  { anverso: "¿Por qué es relevante para el Oficial Conductor conocer la clasificación del terreno antes de excavarlo?", reverso: "Porque permite anticipar la dificultad, el rendimiento esperable y el equipo más adecuado (cazo estándar, cazo con dientes reforzados, martillo hidráulico), evitando forzar la máquina contra un material para el que no está adecuadamente equipada" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el esponjamiento de un suelo?", explicacion: "El aumento de volumen que experimenta el material al ser excavado respecto a su estado en banco.", dificultad: "media", opciones: ["El aumento de volumen del material al ser excavado", "La reducción de peso del material al ser excavado", "El aumento de dureza del material al ser excavado", "La reducción de humedad del material al ser excavado"], correcta: 0 },
  { enunciado: "¿Qué es la dureza de un suelo o roca a efectos de excavación?", explicacion: "La resistencia que opone el material a ser penetrado o fragmentado por el equipo de trabajo.", dificultad: "media", opciones: ["La resistencia del material a ser penetrado o fragmentado", "El color característico del material excavado", "El peso específico del material por unidad de volumen", "La temperatura habitual del material en el terreno"], correcta: 0 },
  { enunciado: "¿Qué es la compacidad de un suelo?", explicacion: "El grado de proximidad entre las partículas que lo componen, relacionado con su densidad.", dificultad: "dificil", opciones: ["El grado de proximidad entre las partículas del suelo", "El color predominante del suelo en su estado natural", "La velocidad a la que se puede excavar ese suelo", "El tipo de vegetación presente sobre ese suelo"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es uno de los tres grandes grupos en que se clasifica el suelo según su naturaleza?", explicacion: "Las tierras, junto con las rocas y las piedras naturales.", dificultad: "media", opciones: ["Las tierras", "El hormigón armado", "El acero estructural", "La madera laminada"], correcta: 0 },
  { enunciado: "¿Por qué es relevante conocer la clasificación del terreno antes de excavarlo?", explicacion: "Permite anticipar la dificultad y elegir el equipo adecuado, evitando forzar la máquina.", dificultad: "media", opciones: ["Permite elegir el equipo adecuado y evitar forzar la máquina", "No aporta ninguna utilidad práctica real en la excavación", "Solo es relevante para el cálculo del presupuesto de la obra", "Solo resulta necesario si la excavación supera diez metros"], correcta: 0 },
]);

const S3 = "firmes-cimentaciones-redes-taludes-escalonados";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué exige el Código Técnico de la Edificación (RD 314/2006), a través de su Documento Básico SE-C, en relación con el fondo de una cimentación?", reverso: "Que la excavación alcance una profundidad y una calidad del terreno de apoyo adecuadas a las características del suelo y a las cargas previstas, conforme al estudio geotécnico del proyecto, garantizando la capacidad portante necesaria para la cimentación proyectada" },
  { anverso: "¿Qué precauciones deben adoptarse al excavar en las proximidades de redes de distribución existentes (agua, gas, electricidad, comunicaciones)?", reverso: "Localizar previamente su trazado exacto mediante los planos de servicios y, en su caso, cateo manual previo, mantener una distancia de seguridad adecuada, y extremar la precaución con el equipo mecánico en el entorno inmediato de la canalización para evitar dañarla" },
  { anverso: "¿Qué es un bacheo, en el contexto del mantenimiento de firmes?", reverso: "La reparación puntual y localizada de un firme deteriorado (bache), mediante la excavación del material dañado, el saneamiento del fondo y la reposición de las capas de firme correspondientes" },
  { anverso: "¿Qué es un blandón, en el contexto del refuerzo de firmes?", reverso: "Una zona localizada del firme o de la explanada que presenta escasa capacidad portante (por exceso de humedad, mala compactación u otra causa), que debe sanearse retirando el material inadecuado y sustituyéndolo por otro de características adecuadas antes de continuar la obra" },
  { anverso: "¿Qué es una excavación escalonada?", reverso: "Una excavación ejecutada en varios niveles o \"escalones\" horizontales sucesivos, en lugar de un único talud continuo, técnica empleada para mejorar la estabilidad de excavaciones de gran altura o para facilitar el acceso y la maniobra de la maquinaria en distintos niveles de trabajo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué exige el CTE (RD 314/2006) en relación con el fondo de una cimentación?", explicacion: "Alcanzar profundidad y calidad de terreno de apoyo adecuadas, conforme al estudio geotécnico.", dificultad: "media", opciones: ["Alcanzar profundidad y calidad de terreno adecuadas al proyecto", "Ninguna exigencia específica distinta de excavar hasta 1 metro", "Que la excavación se realice siempre en horario nocturno", "Que la excavación se realice siempre con cuchara bivalva"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al excavar cerca de redes de servicios existentes?", explicacion: "Localizar previamente su trazado y mantener distancia de seguridad, extremando la precaución.", dificultad: "media", opciones: ["Localizar el trazado previo y mantener distancia de seguridad", "Ninguna precaución adicional distinta de una excavación normal", "Excavar siempre a máxima velocidad para reducir el tiempo", "Prescindir de los planos de servicios si la obra tiene prisa"], correcta: 0 },
  { enunciado: "¿Qué es un bacheo en el mantenimiento de firmes?", explicacion: "La reparación puntual de un firme deteriorado mediante excavación, saneamiento y reposición.", dificultad: "media", opciones: ["La reparación puntual de un firme deteriorado", "La excavación general de toda una calzada urbana", "La colocación de una nueva red de agua potable", "El vallado perimetral de una zona en obras"], correcta: 0 },
  { enunciado: "¿Qué es un blandón en el refuerzo de firmes?", explicacion: "Una zona localizada de escasa capacidad portante que debe sanearse y sustituirse.", dificultad: "dificil", opciones: ["Una zona localizada de escasa capacidad portante", "Un tipo de rodillo compactador de gran tamaño", "Un accesorio acoplable al brazo de una excavadora", "Un tipo de firme asfáltico de alta resistencia"], correcta: 0 },
  { enunciado: "¿Qué es una excavación escalonada?", explicacion: "Una excavación ejecutada en varios niveles horizontales sucesivos, en lugar de un talud continuo.", dificultad: "media", opciones: ["Una excavación en varios niveles horizontales sucesivos", "Una excavación con un único talud vertical continuo", "Una excavación exclusiva para zanjas de pequeña sección", "Una excavación realizada exclusivamente con martillo hidráulico"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 17 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 17, orden: 17, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-229 creado y vinculado como Tema 17 de Oficial Conductor Maquinaria Pesada.");

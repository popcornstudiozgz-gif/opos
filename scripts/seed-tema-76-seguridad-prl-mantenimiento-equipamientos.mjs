/**
 * Crea tema-76: "Seguridad y prevención de riesgos en el mantenimiento de
 * equipamientos públicos" — Tema 22 (numero=22, bloque-2) de Oficial
 * Mantenimiento General (Ayto. Zaragoza). Cierra la parte específica de
 * esta oposición (16 temas, tema-61 a tema-76).
 *
 * Corresponde al TEMA 20 oficial del Anexo I (bases2110.pdf):
 *   "Seguridad y prevención de riesgos en el mantenimiento de los
 *   equipamientos públicos: factores de riesgo en el trabajo; peligro,
 *   daño y riesgo; operaciones y tareas que se realizan, fuentes de
 *   riesgos, sustancias y materias primas, equipos de protección
 *   individual y medidas preventivas."
 *
 * Fuentes primarias: Ley 31/1995, de 8 de noviembre, de Prevención de
 * Riesgos Laborales (BOE-A-1995-24292) y Real Decreto 773/1997, de 30 de
 * mayo, sobre utilización de equipos de protección individual
 * (BOE-A-1997-12735, ya verificado y usado en scripts/seed-tema-60-prl-
 * especifica-albanil-epi.mjs de Oficial Albañil). Ambos identificadores
 * verificados en este turno mediante búsqueda y confirmación del título
 * real de la norma. Conceptos básicos de PRL (peligro, daño, riesgo)
 * tomados de la propia Ley 31/1995 (art. 4, definiciones); las fuentes de
 * riesgo específicas del mantenimiento de equipamientos (mecánico,
 * eléctrico, químico) se tratan como conocimiento técnico consolidado de
 * seguridad laboral aplicado al oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-76-seguridad-prl-mantenimiento-equipamientos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-76";
const OPOSICION = "oficial-mantenimiento-ayto-zaragoza";
const BLOQUE_2_ID = "336de420-fb74-4814-9d50-6e2981ed064f";
const LEY_31_1995 = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292";
const RD_773_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-12735";

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
  titulo: "Seguridad y prevención de riesgos en el mantenimiento de equipamientos públicos",
  descripcion: "Factores de riesgo en el trabajo; peligro, daño y riesgo. Operaciones y tareas, fuentes de riesgo, sustancias y materias primas. Equipos de protección individual y medidas preventivas.",
  contenido: "Desarrolla los conceptos básicos de prevención de riesgos laborales (peligro, daño, riesgo) según la Ley 31/1995, las fuentes de riesgo propias de las operaciones y tareas de mantenimiento de equipamientos públicos (mecánico, eléctrico, químico), y los equipos de protección individual y medidas preventivas aplicables según el RD 773/1997.",
  enlaces_boe: [
    { url: LEY_31_1995, titulo: "Ley 31/1995 — Prevención de Riesgos Laborales" },
    { url: RD_773_1997, titulo: "RD 773/1997 — Utilización de equipos de protección individual" },
  ],
  indice_estudio: [
    { url: LEY_31_1995, titulo: "Conceptos básicos: peligro, daño y riesgo", seccion: "conceptos-basicos-peligro-dano-riesgo", articulos: "art. 4 (definiciones)" },
    { url: "", titulo: "Fuentes de riesgo en operaciones de mantenimiento", seccion: "fuentes-riesgo-operaciones-mantenimiento", articulos: "Conceptos fundamentales" },
    { url: RD_773_1997, titulo: "Equipos de protección individual y medidas preventivas", seccion: "epi-medidas-preventivas-mantenimiento", articulos: "arts. 2, 3, 7, 10 y Anexo I" },
  ],
}]);

const S1 = "conceptos-basicos-peligro-dano-riesgo";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué ley establece el marco general de la prevención de riesgos laborales en España?", reverso: "La Ley 31/1995, de 8 de noviembre, de Prevención de Riesgos Laborales" },
  { anverso: "¿Qué es un 'riesgo laboral' según el art. 4 de la Ley 31/1995?", reverso: "La posibilidad de que un trabajador sufra un determinado daño derivado del trabajo, valorándose conjuntamente la probabilidad de que se produzca el daño y su severidad" },
  { anverso: "¿Qué es un 'daño derivado del trabajo' según la Ley 31/1995?", reverso: "Las enfermedades, patologías o lesiones sufridas con motivo u ocasión del trabajo" },
  { anverso: "¿Qué es un 'peligro' en el ámbito de la prevención de riesgos laborales?", reverso: "La fuente, situación o acto con potencial de causar daño, en términos de lesión o enfermedad; el peligro existe con independencia de que se materialice o no en un daño" },
  { anverso: "¿Qué diferencia hay entre 'peligro' y 'riesgo'?", reverso: "El peligro es la fuente potencial de daño (por ejemplo, un cable pelado); el riesgo es la probabilidad de que ese peligro llegue a materializarse en un daño concreto, combinada con la gravedad de ese daño" },
  { anverso: "¿Qué es la 'prevención' según la Ley 31/1995?", reverso: "El conjunto de actividades o medidas adoptadas o previstas en todas las fases de actividad de la empresa con el fin de evitar o disminuir los riesgos derivados del trabajo" },
  { anverso: "¿Qué es un 'riesgo laboral grave e inminente' según la Ley 31/1995?", reverso: "Aquel que resulte probable racionalmente que se materialice en un futuro inmediato y pueda suponer un daño grave para la salud de los trabajadores" },
  { anverso: "¿Qué es la evaluación de riesgos laborales?", reverso: "El proceso dirigido a estimar la magnitud de aquellos riesgos que no hayan podido evitarse, obteniendo información para que el empresario adopte las medidas preventivas adecuadas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué ley establece el marco general de la prevención de riesgos laborales en España?", explicacion: "La Ley 31/1995, de 8 de noviembre.", dificultad: "facil", opciones: ["La Ley 31/1995", "El Real Decreto 773/1997", "El Real Decreto 485/1997", "El Real Decreto 513/2017"], correcta: 0 },
  { enunciado: "¿Cómo define la Ley 31/1995 el 'riesgo laboral'?", explicacion: "La posibilidad de que un trabajador sufra un daño derivado del trabajo, valorando probabilidad y severidad.", dificultad: "media", opciones: ["Posibilidad de sufrir un daño, valorando probabilidad y severidad", "Solo la probabilidad de un accidente, sin valorar su gravedad", "Cualquier tarea que implique uso de herramientas", "Un sinónimo exacto de 'peligro'"], correcta: 0 },
  { enunciado: "¿Qué es un 'daño derivado del trabajo'?", explicacion: "Enfermedades, patologías o lesiones sufridas con motivo u ocasión del trabajo.", dificultad: "media", opciones: ["Enfermedades, patologías o lesiones por el trabajo", "Cualquier gasto económico de la empresa", "Un sinónimo de equipo de protección individual", "Una sanción administrativa a la empresa"], correcta: 0 },
  { enunciado: "¿Qué es un 'peligro' en prevención de riesgos laborales?", explicacion: "La fuente o situación con potencial de causar daño.", dificultad: "media", opciones: ["La fuente o situación con potencial de causar daño", "La probabilidad exacta de que ocurra un accidente", "Un equipo de protección individual defectuoso", "Un tipo de fuego de clase A"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre peligro y riesgo?", explicacion: "El peligro es la fuente potencial; el riesgo combina probabilidad y gravedad de que se materialice.", dificultad: "media", opciones: ["El peligro es la fuente; el riesgo, su probabilidad y gravedad", "Son sinónimos exactos sin ninguna diferencia", "El riesgo siempre es mayor que el peligro", "El peligro solo existe si ya se ha producido un daño"], correcta: 0 },
  { enunciado: "¿Qué es la 'prevención' según la Ley 31/1995?", explicacion: "El conjunto de medidas para evitar o disminuir los riesgos derivados del trabajo.", dificultad: "facil", opciones: ["Medidas para evitar o disminuir los riesgos del trabajo", "Un tipo de equipo de protección individual", "Un documento exclusivo del Ayuntamiento de Zaragoza", "La sanción tras un accidente laboral"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un 'riesgo laboral grave e inminente'?", explicacion: "Probabilidad racional de materializarse en un futuro inmediato con daño grave.", dificultad: "dificil", opciones: ["Probable en futuro inmediato con daño grave para la salud", "Cualquier riesgo, sin importar su probabilidad", "Un riesgo ya materializado y superado", "Un riesgo exclusivo de trabajos eléctricos"], correcta: 0 },
  { enunciado: "¿Qué es la evaluación de riesgos laborales?", explicacion: "El proceso para estimar la magnitud de los riesgos no evitados y adoptar medidas preventivas.", dificultad: "media", opciones: ["Estimar la magnitud de riesgos y adoptar medidas preventivas", "Un examen médico anual obligatorio", "La entrega de EPI al trabajador", "Un simulacro de evacuación por incendio"], correcta: 0 },
]);

const S2 = "fuentes-riesgo-operaciones-mantenimiento";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué tipo de riesgo mecánico es habitual en tareas de mantenimiento de equipamientos públicos?", reverso: "Golpes, cortes, atrapamientos y proyecciones de partículas, propios del uso de herramientas manuales y máquinas (radiales, taladros, sierras)" },
  { anverso: "¿Qué tipo de riesgo eléctrico es habitual en tareas de mantenimiento?", reverso: "Contacto eléctrico directo (con partes en tensión) o indirecto (con masas puestas accidentalmente en tensión), presente en trabajos de electricidad, alarmas o electrodomésticos" },
  { anverso: "¿Qué es un riesgo químico en el mantenimiento de equipamientos públicos y cita un ejemplo?", reverso: "El derivado del contacto, inhalación o ingestión de sustancias peligrosas; por ejemplo, disolventes, pinturas, productos de limpieza o desinfectantes de piscinas" },
  { anverso: "¿Qué es un riesgo ergonómico habitual en tareas de mantenimiento?", reverso: "Sobreesfuerzos por manipulación manual de cargas, posturas forzadas (trabajar agachado o con los brazos elevados) y movimientos repetitivos" },
  { anverso: "¿Qué es un riesgo de caída a distinto nivel y en qué tareas de mantenimiento es habitual?", reverso: "El riesgo de caer desde una altura (escalera, andamio, tejado) a un nivel inferior; habitual en trabajos de reparación de cubiertas, cambio de luminarias o mantenimiento de fachadas" },
  { anverso: "¿Qué es un riesgo de caída al mismo nivel y cómo se previene?", reverso: "El riesgo de tropezar o resbalar en el propio plano de trabajo, por suelos mojados, desorden de materiales o cables; se previene con orden, limpieza y señalización" },
  { anverso: "¿Qué es una ficha de datos de seguridad (FDS) de un producto químico?", reverso: "El documento que recoge la información esencial sobre los peligros de un producto químico (composición, riesgos, medidas de primeros auxilios, EPI recomendado, almacenamiento) que debe consultarse antes de manipularlo" },
  { anverso: "¿Qué es el orden y la limpieza como medida preventiva básica en el trabajo de mantenimiento?", reverso: "Mantener herramientas, materiales y residuos ordenados y las zonas de paso despejadas, reduciendo el riesgo de tropiezos, caídas y accidentes con objetos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué tipo de riesgo mecánico es habitual en mantenimiento con herramientas y máquinas?", explicacion: "Golpes, cortes, atrapamientos y proyecciones de partículas.", dificultad: "facil", opciones: ["Golpes, cortes, atrapamientos y proyecciones", "Únicamente riesgo químico", "Únicamente riesgo ergonómico", "Únicamente riesgo eléctrico"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre contacto eléctrico directo e indirecto?", explicacion: "El directo es con partes en tensión; el indirecto, con masas puestas accidentalmente en tensión.", dificultad: "media", opciones: ["Directo con partes en tensión; indirecto con masas en tensión", "Son exactamente el mismo tipo de riesgo", "El indirecto solo ocurre en corriente continua", "El directo solo ocurre en instalaciones de alarma"], correcta: 0 },
  { enunciado: "¿Qué es un riesgo químico en tareas de mantenimiento?", explicacion: "El derivado del contacto, inhalación o ingestión de sustancias peligrosas.", dificultad: "media", opciones: ["El derivado de sustancias peligrosas (disolventes, pinturas)", "El derivado exclusivamente de cargas pesadas", "El derivado exclusivamente de caídas a distinto nivel", "El derivado exclusivamente del ruido"], correcta: 0 },
  { enunciado: "¿Qué es un riesgo ergonómico habitual en mantenimiento?", explicacion: "Sobreesfuerzos, posturas forzadas y movimientos repetitivos.", dificultad: "media", opciones: ["Sobreesfuerzos y posturas forzadas", "Contacto eléctrico directo", "Inhalación de productos químicos", "Caída a distinto nivel"], correcta: 0 },
  { enunciado: "¿En qué tareas es más habitual el riesgo de caída a distinto nivel?", explicacion: "Reparación de cubiertas, cambio de luminarias o mantenimiento de fachadas.", dificultad: "media", opciones: ["Reparación de cubiertas o cambio de luminarias en altura", "Trabajo de oficina con ordenador", "Atención telefónica al público", "Archivo de documentación administrativa"], correcta: 0 },
  { enunciado: "¿Cómo se previene el riesgo de caída al mismo nivel?", explicacion: "Con orden, limpieza y señalización.", dificultad: "media", opciones: ["Con orden, limpieza y señalización", "Usando siempre un arnés anticaídas", "Usando exclusivamente guantes aislantes", "No tiene medida preventiva posible"], correcta: 0 },
  { enunciado: "¿Qué es una ficha de datos de seguridad (FDS)?", explicacion: "El documento con la información esencial sobre los peligros de un producto químico.", dificultad: "media", opciones: ["El documento con información de peligros de un producto químico", "El parte de mantenimiento de un equipo", "El registro de entrada de un documento administrativo", "El plan de evacuación de un edificio"], correcta: 0 },
  { enunciado: "¿Qué aporta el orden y la limpieza como medida preventiva?", explicacion: "Reduce el riesgo de tropiezos, caídas y accidentes con objetos.", dificultad: "facil", opciones: ["Reduce el riesgo de tropiezos y caídas", "No tiene ninguna relación con la prevención", "Solo afecta a la estética del lugar de trabajo", "Sustituye al uso de EPI"], correcta: 0 },
]);

const S3 = "epi-medidas-preventivas-mantenimiento";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un equipo de protección individual (EPI) según el RD 773/1997?", reverso: "Cualquier equipo destinado a ser llevado o sujetado por el trabajador para que le proteja de uno o varios riesgos que puedan amenazar su seguridad o su salud, así como cualquier complemento o accesorio destinado a tal fin" },
  { anverso: "¿Cuándo debe usarse un EPI según el RD 773/1997?", reverso: "Cuando los riesgos no se hayan podido evitar o limitar suficientemente por medios técnicos de protección colectiva o mediante medidas de organización del trabajo" },
  { anverso: "¿Qué EPI es básico frente al riesgo de proyección de partículas al usar una radial o taladro?", reverso: "Gafas de protección o pantalla facial" },
  { anverso: "¿Qué EPI es básico frente al riesgo de contacto eléctrico en trabajos de electricidad?", reverso: "Guantes aislantes y herramientas con mango aislado, adecuados a la tensión de trabajo" },
  { anverso: "¿Qué EPI es básico frente al riesgo de caída de objetos o golpes en la cabeza en obras o trabajos con maquinaria?", reverso: "El casco de protección" },
  { anverso: "¿Qué EPI es básico frente al riesgo de caída a distinto nivel en trabajos en altura?", reverso: "El arnés anticaídas, conectado a un punto de anclaje adecuado, junto con la formación específica para su uso" },
  { anverso: "¿Qué EPI es básico frente al riesgo de inhalación de polvo o partículas?", reverso: "La mascarilla de protección respiratoria, con el filtro adecuado al tipo de contaminante" },
  { anverso: "¿Qué es la jerarquía de medidas preventivas según la Ley 31/1995 (de más a menos prioritaria)?", reverso: "Eliminar el riesgo en origen; si no es posible, evaluarlo y combatirlo; adoptar medidas de protección colectiva antes que individual; y, como último recurso, usar EPI" },
  { anverso: "¿Por qué el EPI se considera la 'última barrera' frente al riesgo y no la primera medida a adoptar?", reverso: "Porque protege únicamente a la persona que lo lleva puesto, mientras que eliminar el riesgo en origen o aplicar protección colectiva protege a todas las personas expuestas sin depender del uso correcto de un equipo individual" },
  { anverso: "¿Qué obligación básica tiene el trabajador respecto al EPI que le entrega la empresa, según la Ley 31/1995?", reverso: "Utilizarlo correctamente, conservarlo en buen estado, y ponerlo en conocimiento de su superior cuando detecte una anomalía o deterioro" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué norma regula la utilización de equipos de protección individual en España?", explicacion: "El Real Decreto 773/1997.", dificultad: "media", opciones: ["El Real Decreto 773/1997", "La Ley 31/1995", "El Real Decreto 485/1997", "El Real Decreto 513/2017"], correcta: 0 },
  { enunciado: "¿Cuándo debe usarse un EPI según el RD 773/1997?", explicacion: "Cuando el riesgo no se pueda evitar o limitar suficientemente por otros medios.", dificultad: "media", opciones: ["Cuando el riesgo no se pueda evitar por otros medios", "Siempre, en cualquier tarea sin excepción", "Solo si lo solicita expresamente el trabajador", "Nunca, es una medida meramente opcional"], correcta: 0 },
  { enunciado: "¿Qué EPI es básico frente a la proyección de partículas al usar una radial?", explicacion: "Gafas de protección o pantalla facial.", dificultad: "facil", opciones: ["Gafas de protección o pantalla facial", "Guantes aislantes eléctricos", "Arnés anticaídas", "Mascarilla respiratoria"], correcta: 0 },
  { enunciado: "¿Qué EPI es básico frente al riesgo de contacto eléctrico?", explicacion: "Guantes aislantes y herramientas de mango aislado.", dificultad: "facil", opciones: ["Guantes aislantes y herramientas de mango aislado", "Casco de protección exclusivamente", "Arnés anticaídas exclusivamente", "Mascarilla respiratoria exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué EPI es básico en trabajos en altura frente al riesgo de caída a distinto nivel?", explicacion: "El arnés anticaídas conectado a un punto de anclaje adecuado.", dificultad: "media", opciones: ["El arnés anticaídas", "Las gafas de protección", "Los guantes aislantes", "La mascarilla respiratoria"], correcta: 0 },
  { enunciado: "¿Cuál es la jerarquía correcta de medidas preventivas según la Ley 31/1995?", explicacion: "Eliminar el riesgo, protección colectiva, y como último recurso EPI.", dificultad: "dificil", opciones: ["Eliminar el riesgo, protección colectiva y luego EPI", "Usar siempre EPI en primer lugar", "Solo aplican medidas de protección colectiva", "No existe una jerarquía establecida"], correcta: 0 },
  { enunciado: "¿Por qué se considera el EPI la 'última barrera' frente al riesgo?", explicacion: "Porque solo protege a quien lo lleva puesto, no a otras personas expuestas.", dificultad: "media", opciones: ["Porque solo protege a quien lo lleva puesto", "Porque es la medida más eficaz de todas", "Porque elimina el riesgo en origen", "Porque sustituye a la evaluación de riesgos"], correcta: 0 },
  { enunciado: "¿Qué obligación tiene el trabajador respecto al EPI entregado por la empresa?", explicacion: "Utilizarlo correctamente, conservarlo bien e informar de anomalías.", dificultad: "media", opciones: ["Utilizarlo correctamente e informar de anomalías", "Ninguna obligación específica al respecto", "Solo debe usarlo si lo considera necesario", "Debe adquirirlo por su cuenta si se estropea"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 22 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 22, orden: 22, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-76 creado y vinculado como Tema 22 de Oficial Mantenimiento General.");
console.log("\n🎉 Parte específica de Oficial Mantenimiento General COMPLETA (16 temas, tema-61 a tema-76).");

/**
 * Crea tema-91: "Seguridad y salud en el trabajo: gestión de riesgos en
 * instalaciones deportivas" — Tema 22 (numero=22, bloque-2) de Oficial
 * Polivalente Instalaciones Deportivas (Ayto. Zaragoza). Cierra la parte
 * específica de esta oposición (16 temas, tema-77 a tema-91 más la
 * reutilización de tema-75 para el Tema 21).
 *
 * Corresponde al TEMA 20 oficial del Anexo I (bases2110.pdf):
 *   "Normativa sobre seguridad y salud en el trabajo. Factores de riesgo
 *   en el trabajo: Peligro, daño y riesgo. Gestión de los riesgos
 *   presentes en las instalaciones deportivas."
 *
 * Fuente primaria: Ley 31/1995, de 8 de noviembre, de Prevención de
 * Riesgos Laborales (BOE-A-1995-24292) — ya verificada en tema-76 de
 * Oficial Mantenimiento General; art. 4 (definiciones de peligro, daño y
 * riesgo). A diferencia de tema-76 (centrado en mantenimiento general de
 * equipamientos), este tema se centra en los riesgos específicos de una
 * instalación deportiva con piscina (químicos, ahogamiento, eléctricos en
 * entorno húmedo, legionela), muchos de los cuales ya se han desarrollado
 * en detalle en los temas previos de esta misma oposición (tema-80
 * electricidad/piscinas, tema-83 legionela, tema-87 productos químicos de
 * desinfección, tema-90 fitosanitarios) — por lo que este tema cierra con
 * una visión integradora de gestión de riesgos, sin repetir el desarrollo
 * extenso ya realizado en esos temas.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-91-seguridad-salud-riesgos-deportivas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-91";
const OPOSICION = "oficial-instalaciones-deportivas-ayto-zaragoza";
const BLOQUE_2_ID = "cdb0920b-a2d8-4ea8-b3fc-b80168d7361a";
const LEY_31_1995 = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292";

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
  titulo: "Seguridad y salud en el trabajo: gestión de riesgos en instalaciones deportivas",
  descripcion: "Normativa sobre seguridad y salud en el trabajo. Factores de riesgo: peligro, daño y riesgo. Gestión integrada de los riesgos presentes en instalaciones deportivas.",
  contenido: "Desarrolla el marco normativo de la prevención de riesgos laborales (Ley 31/1995) y sus conceptos básicos (peligro, daño, riesgo), y ofrece una visión integradora de la gestión de los riesgos propios de una instalación deportiva con piscina, complementando los riesgos ya desarrollados en detalle en temas anteriores de esta oposición (eléctrico en piscinas, legionela, productos químicos de desinfección, fitosanitarios).",
  enlaces_boe: [
    { url: LEY_31_1995, titulo: "Ley 31/1995 — Prevención de Riesgos Laborales" },
  ],
  indice_estudio: [
    { url: LEY_31_1995, titulo: "Conceptos básicos: peligro, daño y riesgo", seccion: "conceptos-basicos-peligro-dano-riesgo-deportivas", articulos: "art. 4 (definiciones)" },
    { url: "", titulo: "Mapa de riesgos de una instalación deportiva", seccion: "mapa-riesgos-instalacion-deportiva", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Gestión integrada de la prevención en instalaciones deportivas", seccion: "gestion-integrada-prevencion-deportivas", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "conceptos-basicos-peligro-dano-riesgo-deportivas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué ley establece el marco general de la prevención de riesgos laborales en España?", reverso: "La Ley 31/1995, de 8 de noviembre, de Prevención de Riesgos Laborales" },
  { anverso: "¿Qué es un 'riesgo laboral' según el art. 4 de la Ley 31/1995?", reverso: "La posibilidad de que un trabajador sufra un determinado daño derivado del trabajo, valorándose conjuntamente la probabilidad de que se produzca el daño y su severidad" },
  { anverso: "¿Qué es un 'peligro' en el ámbito de la prevención de riesgos laborales?", reverso: "La fuente, situación o acto con potencial de causar daño; existe con independencia de que llegue a materializarse en un daño real" },
  { anverso: "¿Qué diferencia hay entre 'peligro' y 'riesgo' aplicado a una piscina, por ejemplo con el agua tratada con cloro?", reverso: "El cloro almacenado es el peligro (fuente potencial de daño químico); el riesgo es la probabilidad de que, en la manipulación concreta, ese peligro se materialice en una intoxicación o quemadura, y su gravedad" },
  { anverso: "¿Qué es un 'daño derivado del trabajo' según la Ley 31/1995?", reverso: "Las enfermedades, patologías o lesiones sufridas con motivo u ocasión del trabajo" },
  { anverso: "¿Qué es la evaluación de riesgos laborales?", reverso: "El proceso dirigido a estimar la magnitud de aquellos riesgos que no hayan podido evitarse, obteniendo información para que se adopten las medidas preventivas adecuadas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué ley establece el marco general de la prevención de riesgos laborales?", explicacion: "La Ley 31/1995, de 8 de noviembre.", dificultad: "facil", opciones: ["La Ley 31/1995", "El Real Decreto 1311/2012", "El Real Decreto 513/2017", "El Decreto 50/1993"], correcta: 0 },
  { enunciado: "¿Cómo define la Ley 31/1995 el 'riesgo laboral'?", explicacion: "Posibilidad de sufrir un daño derivado del trabajo, valorando probabilidad y severidad.", dificultad: "media", opciones: ["Posibilidad de sufrir un daño, valorando probabilidad y severidad", "Solo la probabilidad de accidente, sin valorar la gravedad", "Cualquier tarea con uso de productos químicos", "Un sinónimo exacto de 'peligro'"], correcta: 0 },
  { enunciado: "¿Qué es un 'peligro' en prevención de riesgos laborales?", explicacion: "La fuente o situación con potencial de causar daño.", dificultad: "media", opciones: ["La fuente o situación con potencial de causar daño", "La probabilidad exacta de un accidente", "Un equipo de protección individual defectuoso", "Un tipo de instalación deportiva concreta"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre peligro y riesgo aplicado al cloro almacenado en una piscina?", explicacion: "El cloro es el peligro; el riesgo es la probabilidad y gravedad de que se materialice un daño.", dificultad: "media", opciones: ["El cloro es el peligro; el riesgo es su probabilidad de materializarse", "Son términos exactamente sinónimos", "El riesgo solo existe si ya hubo un accidente previo", "El peligro desaparece si se usan guantes"], correcta: 0 },
  { enunciado: "¿Qué es un 'daño derivado del trabajo'?", explicacion: "Enfermedades, patologías o lesiones sufridas con motivo u ocasión del trabajo.", dificultad: "media", opciones: ["Enfermedades, patologías o lesiones por el trabajo", "Cualquier gasto económico de la instalación", "Un tipo de equipo de protección individual", "Una sanción administrativa al centro"], correcta: 0 },
  { enunciado: "¿Qué es la evaluación de riesgos laborales?", explicacion: "El proceso para estimar la magnitud de los riesgos no evitados y adoptar medidas.", dificultad: "media", opciones: ["Estimar la magnitud de riesgos y adoptar medidas", "Un examen médico anual obligatorio", "La entrega de EPI al trabajador", "Un simulacro de evacuación por incendio"], correcta: 0 },
]);

const S2 = "mapa-riesgos-instalacion-deportiva";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un 'mapa de riesgos' de una instalación deportiva?", reverso: "Una identificación sistemática de los principales riesgos presentes en cada zona del centro (piscina, sala de máquinas, vestuarios, zonas verdes, pistas), que sirve de base para priorizar las medidas preventivas" },
  { anverso: "¿Qué riesgo específico presenta la zona del vaso de una piscina para las personas usuarias, más allá de los riesgos laborales del personal?", reverso: "El riesgo de ahogamiento, que exige la presencia de socorrismo y sistemas de vigilancia adecuados, además de la señalización de profundidades y normas de uso" },
  { anverso: "¿Qué riesgos combina la sala de máquinas de depuración/desinfección de una piscina, ya vistos en temas anteriores de esta oposición?", reverso: "Riesgo eléctrico (bombas, cuadros), riesgo químico (almacenamiento y manipulación de cloro y otros productos), y riesgo de resbalones por humedad ambiental" },
  { anverso: "¿Qué riesgo específico presentan los vestuarios y duchas de un centro deportivo, además del riesgo de caídas por suelo mojado?", reverso: "El riesgo biológico (legionela en el sistema de agua caliente sanitaria, hongos y bacterias por humedad constante) si el mantenimiento higiénico-sanitario no es adecuado" },
  { anverso: "¿Qué riesgos presentan las zonas de jardinería y espacios exteriores de una instalación deportiva?", reverso: "Riesgos derivados del uso de maquinaria (cortacésped, desbrozadora, motosierra), de la manipulación de productos fitosanitarios, y de trabajos al aire libre (exposición solar, condiciones meteorológicas)" },
  { anverso: "¿Qué es un riesgo ergonómico habitual entre el personal de mantenimiento de una instalación deportiva?", reverso: "Sobreesfuerzos por manipulación de cargas (bombonas de cloro, sacos de arena para filtros, mobiliario), posturas forzadas y movimientos repetitivos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un mapa de riesgos de una instalación deportiva?", explicacion: "Una identificación sistemática de los riesgos por zonas, base para priorizar medidas.", dificultad: "media", opciones: ["Una identificación sistemática de riesgos por zonas", "Un plano arquitectónico del edificio", "Un registro de reservas de espacios deportivos", "Una Carta de Servicios del centro"], correcta: 0 },
  { enunciado: "¿Qué riesgo específico presenta el vaso de una piscina para las personas usuarias?", explicacion: "El riesgo de ahogamiento, que exige socorrismo y vigilancia.", dificultad: "facil", opciones: ["El riesgo de ahogamiento", "El riesgo eléctrico exclusivamente", "El riesgo de incendio exclusivamente", "El riesgo ergonómico exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué riesgos combina la sala de máquinas de depuración/desinfección?", explicacion: "Riesgo eléctrico, químico y de resbalones por humedad.", dificultad: "media", opciones: ["Riesgo eléctrico, químico y de resbalones", "Únicamente riesgo de incendio", "Únicamente riesgo ergonómico", "Ningún riesgo relevante"], correcta: 0 },
  { enunciado: "¿Qué riesgo biológico es propio de vestuarios y duchas si el mantenimiento no es adecuado?", explicacion: "El riesgo de legionela y proliferación de hongos/bacterias por humedad.", dificultad: "media", opciones: ["Legionela y proliferación de hongos/bacterias", "Riesgo de exposición a fitosanitarios", "Riesgo eléctrico exclusivamente", "Riesgo de caída de arbolado"], correcta: 0 },
  { enunciado: "¿Qué riesgos presentan las zonas de jardinería de una instalación deportiva?", explicacion: "Uso de maquinaria, manipulación de fitosanitarios y trabajo al aire libre.", dificultad: "media", opciones: ["Maquinaria, fitosanitarios y trabajo al aire libre", "Únicamente riesgo eléctrico", "Únicamente riesgo de ahogamiento", "Ningún riesgo relevante"], correcta: 0 },
  { enunciado: "¿Qué es un riesgo ergonómico habitual en el personal de mantenimiento deportivo?", explicacion: "Sobreesfuerzos por manipulación de cargas y posturas forzadas.", dificultad: "media", opciones: ["Sobreesfuerzos por manipulación de cargas", "Riesgo exclusivo de ahogamiento", "Riesgo exclusivo de incendio", "Riesgo exclusivo de legionela"], correcta: 0 },
]);

const S3 = "gestion-integrada-prevencion-deportivas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un plan de prevención de riesgos laborales aplicado a una instalación deportiva?", reverso: "El instrumento que integra la actividad preventiva del centro en su sistema general de gestión, estableciendo la política, organización y procedimientos para gestionar los riesgos identificados" },
  { anverso: "¿Qué papel tiene la coordinación de actividades empresariales cuando en una instalación deportiva trabajan a la vez personal municipal y empresas externas (limpieza, socorrismo, mantenimiento de piscinas)?", reverso: "Garantizar que los distintos empleadores presentes en el centro se informan mutuamente de los riesgos de sus actividades y coordinan las medidas preventivas para evitar riesgos añadidos por la concurrencia de trabajos" },
  { anverso: "¿Qué es la jerarquía de medidas preventivas según la Ley 31/1995 (de más a menos prioritaria)?", reverso: "Eliminar el riesgo en origen; si no es posible, evaluarlo y combatirlo; adoptar medidas de protección colectiva antes que individual; y, como último recurso, usar EPI" },
  { anverso: "¿Por qué la formación específica del personal de mantenimiento sobre los riesgos de una instalación deportiva (química, eléctrica, biológica) es una medida preventiva prioritaria?", reverso: "Porque un personal formado reconoce mejor los peligros, sigue correctamente los protocolos establecidos, y reacciona con mayor eficacia ante una incidencia, reduciendo la probabilidad de que un peligro se materialice en un daño" },
  { anverso: "¿Qué papel cumple el registro documental (mantenimiento, controles sanitarios, incidencias) en la gestión integrada de riesgos de una instalación deportiva?", reverso: "Permite demostrar el cumplimiento de las obligaciones preventivas, detectar patrones de riesgo recurrentes, y facilita la trazabilidad ante una inspección o un incidente" },
  { anverso: "¿Qué relación existe entre los distintos riesgos ya vistos en esta oposición (eléctrico en piscinas, legionela, productos químicos, fitosanitarios) y este tema de cierre sobre gestión de riesgos?", reverso: "Este tema integra esos riesgos específicos ya desarrollados en un marco común de gestión preventiva (identificación, evaluación, planificación de medidas), en lugar de tratarlos de forma aislada" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un plan de prevención de riesgos laborales de una instalación deportiva?", explicacion: "El instrumento que integra la actividad preventiva en el sistema general de gestión del centro.", dificultad: "media", opciones: ["El instrumento que integra la actividad preventiva del centro", "Un plano de las instalaciones eléctricas", "El registro de reservas de espacios deportivos", "Una Carta de Servicios del centro"], correcta: 0 },
  { enunciado: "¿Qué garantiza la coordinación de actividades empresariales en un centro con personal municipal y empresas externas?", explicacion: "Que se informan mutuamente de riesgos y coordinan medidas preventivas.", dificultad: "media", opciones: ["Que se informan mutuamente y coordinan medidas", "Que solo el personal municipal recibe información", "Que las empresas externas quedan exentas de PRL", "No tiene ninguna relevancia preventiva"], correcta: 0 },
  { enunciado: "¿Cuál es la jerarquía correcta de medidas preventivas según la Ley 31/1995?", explicacion: "Eliminar el riesgo, protección colectiva, y como último recurso EPI.", dificultad: "dificil", opciones: ["Eliminar el riesgo, protección colectiva y luego EPI", "Usar siempre EPI en primer lugar", "Solo aplican medidas de protección colectiva", "No existe una jerarquía establecida"], correcta: 0 },
  { enunciado: "¿Por qué es prioritaria la formación del personal sobre los riesgos específicos de la instalación?", explicacion: "Reconoce mejor los peligros, sigue protocolos y reacciona con más eficacia.", dificultad: "media", opciones: ["Reconoce peligros y reacciona con más eficacia", "No influye en la reducción de riesgos", "Solo es relevante para el personal administrativo", "Sustituye por completo al uso de EPI"], correcta: 0 },
  { enunciado: "¿Qué papel cumple el registro documental en la gestión integrada de riesgos?", explicacion: "Demuestra cumplimiento, detecta patrones y facilita la trazabilidad.", dificultad: "media", opciones: ["Demuestra cumplimiento y facilita la trazabilidad", "No tiene ninguna utilidad práctica", "Solo sirve para facturar servicios externos", "Sustituye a la formación del personal"], correcta: 0 },
  { enunciado: "¿Qué aporta este tema de cierre respecto a los riesgos ya vistos en temas anteriores de esta oposición?", explicacion: "Los integra en un marco común de gestión preventiva.", dificultad: "media", opciones: ["Los integra en un marco común de gestión preventiva", "Repite exactamente el mismo contenido ya visto", "Sustituye por completo esos temas anteriores", "No tiene relación alguna con esos temas"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 22 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 22, orden: 22, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-91 creado y vinculado como Tema 22 de Oficial Polivalente Instalaciones Deportivas.");
console.log("\n🎉 Parte específica de Oficial Polivalente Instalaciones Deportivas COMPLETA (16 temas: tema-77 a tema-91, más tema-75 reutilizado).");

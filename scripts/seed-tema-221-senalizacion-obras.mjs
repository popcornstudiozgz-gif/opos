/**
 * Crea tema-221: "Señalización de obras" — Tema 9 (numero=9, bloque-2) de
 * Oficial Conductor, Especialidad Maquinaria Pesada (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 7 oficial del Anexo I (bases2110.pdf, línea 2103):
 *   "Señalización de obras. Señalización, balizamiento y otros elementos
 *   de seguridad. Colaboración en la seguridad vial."
 *
 * Normativa verificada mediante WebSearch en esta sesión:
 * - Orden de 31 de agosto de 1987, sobre señalización, balizamiento,
 *   defensa, limpieza y terminación de obras fijas en vías fuera de
 *   poblado, que aprueba la Norma de carreteras 8.3-IC "Señalización de
 *   obras" (BOE-A-1987-21608). Referencia técnica nacional para la
 *   señalización de obras, con el matiz de que su ámbito formal son las
 *   carreteras fuera de poblado; para obras en vías urbanas del
 *   municipio, se completa con la normativa municipal siguiente.
 * - Ordenanza de Accesibilidad del Municipio de Zaragoza (consultada en
 *   www.zaragoza.es en esta sesión): su art. 28 regula específicamente
 *   el vallado, balizamiento e iluminación nocturna de zanjas y zonas de
 *   obras en la vía pública municipal (altura de vallas ≥0,90 m,
 *   iluminación mínima de 10 lux, señalización luminosa cada 50 m,
 *   pasos peatonales sobre zanjas).
 * - Ordenanza de Movilidad Urbana de Zaragoza — régimen de autorización
 *   municipal para la ocupación de la vía pública por obras.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-221-senalizacion-obras.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-221";
const OPOSICION = "oficial-conductor-maquinaria-pesada-ayto-zaragoza";
const BLOQUE_2_ID = "388bfbfc-396e-4de2-8897-09532d6a0bcd";

const NORMA_8_3_IC = "https://www.boe.es/buscar/doc.php?id=BOE-A-1987-21608";
const ORDENANZA_ACCESIBILIDAD = "https://www.zaragoza.es/sede/servicio/normativa/13087";
const ORDENANZA_MOVILIDAD = "https://www.zaragoza.es/sede/servicio/normativa/13296";

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
  titulo: "Señalización de obras",
  descripcion: "La Norma de carreteras 8.3-IC: señalización, balizamiento y defensa de obras. La Ordenanza de Accesibilidad de Zaragoza: vallado e iluminación de zanjas en vía pública. Colaboración del oficial conductor en la seguridad vial.",
  contenido: "Desarrolla la señalización de las obras que ejecuta o en las que participa el Oficial Conductor de Maquinaria Pesada: la Norma de carreteras 8.3-IC (Orden de 31 de agosto de 1987), referencia técnica nacional sobre señalización, balizamiento, defensa, limpieza y terminación de obras fijas; su desarrollo y particularización en la Ordenanza de Accesibilidad del Municipio de Zaragoza para las obras y zanjas ejecutadas en vía pública urbana (vallado, iluminación nocturna, pasos peatonales); y el papel de colaboración que corresponde al Oficial Conductor en la seguridad vial durante la ejecución de los trabajos.",
  enlaces_boe: [
    { url: NORMA_8_3_IC, titulo: "Orden de 31-08-1987 — Norma de carreteras 8.3-IC, señalización de obras" },
    { url: ORDENANZA_ACCESIBILIDAD, titulo: "Ordenanza de Accesibilidad del Municipio de Zaragoza (art. 28, zanjas)" },
    { url: ORDENANZA_MOVILIDAD, titulo: "Ordenanza de Movilidad Urbana de Zaragoza" },
  ],
  indice_estudio: [
    { url: NORMA_8_3_IC, titulo: "La Norma de carreteras 8.3-IC: señalización, balizamiento y defensa de obras", seccion: "norma-8-3-ic-senalizacion-balizamiento-defensa", articulos: "Orden 31-08-1987" },
    { url: ORDENANZA_ACCESIBILIDAD, titulo: "El vallado e iluminación de zanjas en la vía pública de Zaragoza", seccion: "vallado-iluminacion-zanjas-ordenanza-accesibilidad", articulos: "Ordenanza de Accesibilidad, art. 28" },
    { url: ORDENANZA_MOVILIDAD, titulo: "Colaboración del oficial conductor en la seguridad vial", seccion: "colaboracion-oficial-conductor-seguridad-vial", articulos: "Ordenanza de Movilidad Urbana" },
  ],
}]);

const S1 = "norma-8-3-ic-senalizacion-balizamiento-defensa";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma constituye la referencia técnica nacional en materia de señalización de obras en carreteras?", reverso: "La Norma de carreteras 8.3-IC, \"Señalización de obras\", aprobada por la Orden de 31 de agosto de 1987, sobre señalización, balizamiento, defensa, limpieza y terminación de obras fijas en vías fuera de poblado" },
  { anverso: "¿Cuáles son los tres objetivos de la señalización de obras, según la Norma 8.3-IC?", reverso: "Informar a las personas usuarias de la presencia de las obras, ordenar la circulación en la zona afectada, y modificar el comportamiento de las personas usuarias adaptándolo a la situación singular que representan las obras" },
  { anverso: "¿Qué es el balizamiento, dentro de la señalización de una obra?", reverso: "El conjunto de elementos (conos, paneles direccionales, luces de balizamiento, entre otros) que delimitan físicamente la zona de obras y guían visualmente a las personas usuarias a lo largo del itinerario alternativo o de la reducción de la vía" },
  { anverso: "¿Qué es la defensa de una obra, en el sentido de la Norma 8.3-IC?", reverso: "El conjunto de elementos físicos (vallas, barreras, elementos de contención) destinados a impedir físicamente el acceso de vehículos o personas a la zona de trabajo, protegiendo tanto a quienes circulan como al propio personal que ejecuta la obra" },
  { anverso: "¿Qué tres conceptos combina la Norma 8.3-IC para determinar el esquema de señalización aplicable a una obra concreta?", reverso: "El tipo de vía, el grado de ocupación de la calzada por la obra, y la duración prevista de los trabajos, cuya combinación determina el esquema de señalización, balizamiento y defensa que corresponde aplicar en cada caso" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué norma constituye la referencia técnica nacional en materia de señalización de obras?", explicacion: "La Norma de carreteras 8.3-IC, aprobada por la Orden de 31 de agosto de 1987.", dificultad: "facil", opciones: ["La Norma de carreteras 8.3-IC", "El Reglamento General de Circulación exclusivamente", "El Reglamento General de Vehículos exclusivamente", "La Ley de Tráfico y Seguridad Vial exclusivamente"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es uno de los tres objetivos de la señalización de obras según la Norma 8.3-IC?", explicacion: "Informar a las personas usuarias de la presencia de las obras.", dificultad: "media", opciones: ["Informar de la presencia de las obras", "Impedir totalmente la circulación por la vía afectada", "Reducir la velocidad exclusivamente en horario nocturno", "Sustituir a la propia señalización vertical de la vía"], correcta: 0 },
  { enunciado: "¿Qué es el balizamiento de una obra?", explicacion: "Los elementos que delimitan físicamente la zona de obras y guían el itinerario alternativo.", dificultad: "media", opciones: ["Los elementos que delimitan la zona y guían el itinerario", "Exclusivamente la señal vertical de limitación de velocidad", "Exclusivamente el vallado perimetral de la obra", "Exclusivamente el personal que dirige el tráfico manualmente"], correcta: 0 },
  { enunciado: "¿Qué es la defensa de una obra?", explicacion: "Los elementos físicos que impiden el acceso de vehículos o personas a la zona de trabajo.", dificultad: "media", opciones: ["Los elementos que impiden el acceso a la zona de trabajo", "Los elementos meramente informativos sin función física", "El seguro de responsabilidad civil de la obra", "El itinerario alternativo señalizado para peatones"], correcta: 0 },
  { enunciado: "¿Qué tres conceptos combina la Norma 8.3-IC para determinar el esquema de señalización de una obra?", explicacion: "Tipo de vía, grado de ocupación de la calzada y duración de los trabajos.", dificultad: "dificil", opciones: ["Tipo de vía, grado de ocupación y duración de los trabajos", "Únicamente la anchura total de la calzada afectada", "Únicamente el número de vehículos empleados en la obra", "Únicamente si la obra se ejecuta de día o de noche"], correcta: 0 },
]);

const S2 = "vallado-iluminacion-zanjas-ordenanza-accesibilidad";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué exige el artículo 28 de la Ordenanza de Accesibilidad del Municipio de Zaragoza respecto al perímetro de una zona de obras con zanjas?", reverso: "Que quede totalmente cerrado mediante vallas continuas y estables, con una altura igual o superior a 0,90 metros, sin que sus bases invadan el itinerario peatonal accesible" },
  { anverso: "¿Qué prohíbe expresamente el artículo 28 de la Ordenanza de Accesibilidad de Zaragoza como elemento de cierre perimetral de una zanja en obra?", reverso: "El uso de cuerdas, cables o elementos similares para delimitar el perímetro de la zanja, al no ofrecer una protección física suficiente frente a caídas" },
  { anverso: "¿Qué nivel mínimo de iluminación exige la Ordenanza de Accesibilidad de Zaragoza en el vallado de una zona de obras durante la noche?", reverso: "Una iluminación mínima de 10 lux en el plano del suelo, junto con señalización luminosa de destellos de tonos anaranjados o rojizos al inicio y al final del vallado, y cada 50 metros a lo largo del mismo" },
  { anverso: "¿Qué exige la Ordenanza de Accesibilidad de Zaragoza cuando es necesario habilitar un paso peatonal sobre una zanja?", reverso: "Disponer una plataforma rígida y antideslizante, enrasada con el pavimento circundante con una tolerancia de ±1 cm, y delimitada con vallas a ambos lados en toda su anchura" },
  { anverso: "¿Por qué resulta especialmente relevante para el Oficial Conductor de Maquinaria Pesada conocer estas exigencias de la Ordenanza de Accesibilidad?", reverso: "Porque las zanjas y excavaciones abiertas con la propia maquinaria (por ejemplo, con una retroexcavadora) deben quedar debidamente valladas, iluminadas y con pasos peatonales seguros mientras permanezcan abiertas, siendo una obligación directamente vinculada a su actividad en obra pública" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué altura mínima exige el art. 28 de la Ordenanza de Accesibilidad de Zaragoza para las vallas de una zona de obras con zanjas?", explicacion: "Una altura igual o superior a 0,90 metros.", dificultad: "media", opciones: ["0,90 metros o superior", "0,50 metros o superior", "1,50 metros o superior", "No se exige ninguna altura mínima específica"], correcta: 0 },
  { enunciado: "¿Qué elemento de cierre perimetral prohíbe expresamente esta Ordenanza para una zanja en obra?", explicacion: "Cuerdas, cables o elementos similares.", dificultad: "media", opciones: ["Cuerdas, cables o elementos similares", "Las vallas continuas y estables", "Los paneles de balizamiento reflectantes", "Las plataformas rígidas antideslizantes"], correcta: 0 },
  { enunciado: "¿Qué nivel mínimo de iluminación nocturna exige esta Ordenanza en el vallado de una obra?", explicacion: "Una iluminación mínima de 10 lux en el plano del suelo.", dificultad: "media", opciones: ["10 lux en el plano del suelo", "1 lux en el plano del suelo", "100 lux en el plano del suelo", "No exige ningún nivel mínimo de iluminación"], correcta: 0 },
  { enunciado: "¿Qué exige la Ordenanza para un paso peatonal habilitado sobre una zanja?", explicacion: "Una plataforma rígida y antideslizante, enrasada con tolerancia de ±1 cm, con vallas a ambos lados.", dificultad: "dificil", opciones: ["Plataforma rígida y antideslizante, enrasada y con vallas", "Una simple tabla de madera sin ningún otro requisito", "Ninguna exigencia específica distinta del resto del vallado", "Una pasarela exclusivamente metálica sin tolerancia definida"], correcta: 0 },
  { enunciado: "¿Por qué resulta relevante esta Ordenanza para el Oficial Conductor de Maquinaria Pesada?", explicacion: "Porque las zanjas abiertas con su maquinaria deben quedar debidamente valladas e iluminadas.", dificultad: "media", opciones: ["Las zanjas abiertas con su maquinaria deben quedar valladas e iluminadas", "No guarda ninguna relación con su actividad de conducción de maquinaria", "Solo resulta aplicable a obras ejecutadas por administraciones distintas", "Solo resulta aplicable a obras de más de un año de duración"], correcta: 0 },
]);

const S3 = "colaboracion-oficial-conductor-seguridad-vial";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué autorización exige, con carácter general, la Ordenanza de Movilidad Urbana de Zaragoza para ocupar una vía urbana con motivo de una obra?", reverso: "La autorización de la autoridad municipal competente, previa solicitud de la persona interesada, en los términos y con las condiciones que la propia ordenanza establece para cada tipo de ocupación" },
  { anverso: "¿Qué papel de colaboración corresponde al Oficial Conductor de Maquinaria Pesada en la seguridad vial durante la ejecución de los trabajos?", reverso: "Verificar que la señalización, el balizamiento y la defensa de la zona de obras se mantienen en condiciones adecuadas mientras opera la máquina, y comunicar cualquier deficiencia detectada (elementos caídos, desplazados o deteriorados) para su reposición inmediata" },
  { anverso: "¿Qué debe hacer el Oficial Conductor antes de comenzar a operar su máquina en una zona de obras situada en vía pública?", reverso: "Comprobar que la señalización, el balizamiento y la defensa de la zona están correctamente instalados conforme al esquema previsto, y que se ha delimitado un área de seguridad suficiente que evite el acceso de terceros al radio de acción de la máquina" },
  { anverso: "¿Qué debe hacer el Oficial Conductor si observa que un elemento de señalización o balizamiento ha resultado dañado o desplazado durante los trabajos?", reverso: "Reponerlo o comunicarlo de inmediato a quien corresponda para su reposición, dado que un elemento de señalización deteriorado o mal posicionado compromete la seguridad tanto de terceros como del propio personal de obra" },
  { anverso: "¿Qué relación existe entre una correcta señalización de la obra y la propia seguridad del Oficial Conductor mientras opera la maquinaria?", reverso: "Una señalización adecuada reduce el riesgo de que vehículos o peatones ajenos a la obra invadan la zona de trabajo mientras la máquina está en movimiento, disminuyendo así el riesgo de atropello, colisión o interferencia con las maniobras de la máquina" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué exige, con carácter general, la Ordenanza de Movilidad Urbana de Zaragoza para ocupar una vía con motivo de una obra?", explicacion: "La autorización de la autoridad municipal competente.", dificultad: "media", opciones: ["La autorización de la autoridad municipal competente", "Ninguna autorización si la obra dura menos de un día", "Únicamente una comunicación verbal previa, sin más trámite", "Únicamente el pago de una tasa, sin necesidad de autorización"], correcta: 0 },
  { enunciado: "¿Qué papel de colaboración corresponde al Oficial Conductor en la seguridad vial durante los trabajos?", explicacion: "Verificar que la señalización y el balizamiento se mantienen en condiciones adecuadas.", dificultad: "media", opciones: ["Verificar que la señalización se mantiene en condiciones adecuadas", "Ningún papel específico distinto de operar la propia máquina", "Sustituir por completo al personal de señalización de la obra", "Autorizar personalmente el corte total de la vía pública"], correcta: 0 },
  { enunciado: "¿Qué debe comprobar el Oficial Conductor antes de comenzar a operar en una zona de obras en vía pública?", explicacion: "Que la señalización, el balizamiento y la defensa están correctamente instalados.", dificultad: "facil", opciones: ["Que la señalización y el balizamiento están correctamente instalados", "Únicamente que dispone de combustible suficiente para la jornada", "Únicamente que el resto del personal ha llegado a la obra", "Ninguna comprobación adicional distinta del estado de la máquina"], correcta: 0 },
  { enunciado: "¿Qué debe hacer el Oficial Conductor si detecta un elemento de señalización dañado o desplazado durante los trabajos?", explicacion: "Reponerlo o comunicarlo de inmediato para su reposición.", dificultad: "media", opciones: ["Reponerlo o comunicarlo de inmediato para su reposición", "Ignorarlo si la obra está próxima a finalizar", "Continuar los trabajos sin ninguna actuación adicional", "Esperar a la siguiente jornada laboral para comunicarlo"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre una correcta señalización de la obra y la seguridad del propio Oficial Conductor?", explicacion: "Reduce el riesgo de que terceros invadan la zona de trabajo mientras la máquina está en movimiento.", dificultad: "dificil", opciones: ["Reduce el riesgo de que terceros invadan la zona de trabajo", "No existe ninguna relación real entre ambos aspectos", "Solo protege a los peatones, sin beneficio para el operador", "Solo resulta relevante en obras de más de seis meses de duración"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 9 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 9, orden: 9, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-221 creado y vinculado como Tema 9 de Oficial Conductor Maquinaria Pesada.");

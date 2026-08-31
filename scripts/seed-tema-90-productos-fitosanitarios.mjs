/**
 * Crea tema-90: "Aplicación de productos fitosanitarios" — Tema 20
 * (numero=20, bloque-2) de Oficial Polivalente Instalaciones Deportivas
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 18 oficial del Anexo I (bases2110.pdf):
 *   "Aplicación de productos fitosanitarios. Productos, equipos para la
 *   aplicación y riesgos derivados de la utilización de plaguicidas."
 *
 * Fuente primaria verificada en este turno: Real Decreto 1311/2012, de
 * 14 de septiembre, por el que se establece el marco de actuación para
 * conseguir un uso sostenible de los productos fitosanitarios
 * (BOE-A-2012-11605), que transpone la Directiva 2009/128/CE; establece
 * la obligación del carné/certificado de aplicador de productos
 * fitosanitarios (niveles básico y cualificado) para su manipulación y
 * aplicación profesional. Equipos y riesgos concretos tratados como
 * conocimiento técnico consolidado del oficio, complementario al marco
 * legal citado.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-90-productos-fitosanitarios.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-90";
const OPOSICION = "oficial-instalaciones-deportivas-ayto-zaragoza";
const BLOQUE_2_ID = "cdb0920b-a2d8-4ea8-b3fc-b80168d7361a";
const RD_1311_2012 = "https://www.boe.es/buscar/act.php?id=BOE-A-2012-11605";

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
  titulo: "Aplicación de productos fitosanitarios",
  descripcion: "Productos fitosanitarios y su marco normativo (RD 1311/2012). Equipos para la aplicación. Riesgos derivados de la utilización de plaguicidas.",
  contenido: "Desarrolla los productos fitosanitarios empleados en el mantenimiento de zonas verdes y su marco normativo de uso sostenible (RD 1311/2012), los equipos de aplicación, y los riesgos derivados de la utilización de plaguicidas junto con las medidas preventivas exigibles.",
  enlaces_boe: [
    { url: RD_1311_2012, titulo: "RD 1311/2012 — Marco de actuación para un uso sostenible de los productos fitosanitarios" },
  ],
  indice_estudio: [
    { url: RD_1311_2012, titulo: "Productos fitosanitarios: tipos y marco normativo", seccion: "productos-fitosanitarios-tipos-normativa", articulos: "RD 1311/2012 (transpone la Directiva 2009/128/CE)" },
    { url: "", titulo: "Equipos para la aplicación de fitosanitarios", seccion: "equipos-aplicacion-fitosanitarios", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Riesgos derivados de la utilización de plaguicidas", seccion: "riesgos-plaguicidas-medidas-preventivas", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "productos-fitosanitarios-tipos-normativa";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un producto fitosanitario?", reverso: "Una sustancia o preparado destinado a proteger las plantas frente a organismos nocivos (plagas, enfermedades, malas hierbas) o a regular sus procesos vitales" },
  { anverso: "¿Qué norma establece el marco de actuación para un uso sostenible de los productos fitosanitarios en España?", reverso: "El Real Decreto 1311/2012, de 14 de septiembre, que transpone la Directiva europea 2009/128/CE" },
  { anverso: "¿Qué tipos básicos de plaguicidas existen según el organismo que combaten?", reverso: "Herbicidas (contra malas hierbas), insecticidas (contra insectos), fungicidas (contra hongos) y acaricidas (contra ácaros), entre otras categorías según su función" },
  { anverso: "¿Qué obligación exige el RD 1311/2012 a las personas que aplican profesionalmente productos fitosanitarios?", reverso: "Disponer del carné o certificado de manipulador/aplicador de productos fitosanitarios (nivel básico o cualificado según el tipo de producto y actividad), obtenido tras un curso de capacitación específico" },
  { anverso: "¿Qué diferencia hay entre el carné de nivel básico y el de nivel cualificado de aplicador de fitosanitarios?", reverso: "El nivel básico habilita para el manejo de productos de menor peligrosidad y tareas más sencillas; el cualificado se exige para productos de mayor toxicidad o para dirigir/supervisar equipos de aplicación" },
  { anverso: "¿Qué es la gestión integrada de plagas (GIP), principio promovido por el RD 1311/2012?", reverso: "Un enfoque que prioriza medidas preventivas y no químicas (control biológico, culturales, físicas) para el control de plagas, recurriendo a los productos fitosanitarios químicos solo cuando es estrictamente necesario" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un producto fitosanitario?", explicacion: "Una sustancia destinada a proteger las plantas frente a organismos nocivos.", dificultad: "facil", opciones: ["Una sustancia para proteger plantas de organismos nocivos", "Un producto exclusivo para el tratamiento del agua", "Un producto de limpieza de superficies", "Un tipo de abono orgánico exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué norma regula el uso sostenible de productos fitosanitarios en España?", explicacion: "El Real Decreto 1311/2012, de 14 de septiembre.", dificultad: "media", opciones: ["El Real Decreto 1311/2012", "El Real Decreto 865/2003", "El Real Decreto 773/1997", "La Ley 31/1995"], correcta: 0 },
  { enunciado: "¿Qué tipo de plaguicida se emplea específicamente contra malas hierbas?", explicacion: "El herbicida.", dificultad: "facil", opciones: ["El herbicida", "El insecticida", "El fungicida", "El acaricida"], correcta: 0 },
  { enunciado: "¿Qué obligación exige el RD 1311/2012 a los aplicadores profesionales?", explicacion: "Disponer del carné o certificado de aplicador de productos fitosanitarios.", dificultad: "media", opciones: ["Disponer del carné de aplicador fitosanitario", "No exige ninguna cualificación específica", "Solo exige el DNI en vigor", "Solo exige experiencia de un año"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre el carné básico y el cualificado de aplicador?", explicacion: "El cualificado se exige para productos más tóxicos o para supervisar equipos.", dificultad: "media", opciones: ["El cualificado es para productos más tóxicos o supervisión", "Son exactamente el mismo nivel de capacitación", "El básico habilita para cualquier producto", "El cualificado no requiere ningún curso"], correcta: 0 },
  { enunciado: "¿Qué es la gestión integrada de plagas (GIP)?", explicacion: "Un enfoque que prioriza medidas preventivas y no químicas antes de usar fitosanitarios.", dificultad: "media", opciones: ["Prioriza medidas preventivas antes que productos químicos", "Consiste en aplicar siempre el máximo de producto químico", "Prohíbe totalmente el uso de fitosanitarios", "Solo se aplica en agricultura, no en jardinería"], correcta: 0 },
]);

const S2 = "equipos-aplicacion-fitosanitarios";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una mochila pulverizadora manual y para qué se emplea?", reverso: "Un equipo portátil, cargado a la espalda, que pulveriza el producto fitosanitario mediante una boquilla accionada manualmente o con batería, empleado en tratamientos localizados de pequeña y mediana superficie" },
  { anverso: "¿Qué es un pulverizador de arrastre o tractorizado y para qué se emplea?", reverso: "Un equipo de mayor capacidad, remolcado o acoplado a un tractor o vehículo, empleado para tratar grandes superficies de zonas verdes de forma más rápida y eficiente" },
  { anverso: "¿Qué es la boquilla de un equipo de aplicación fitosanitaria y por qué influye en la calidad del tratamiento?", reverso: "El elemento que pulveriza el producto en forma de gotas; su tamaño y tipo determinan el tamaño de gota, la deriva (arrastre por el viento) y la uniformidad de la aplicación" },
  { anverso: "¿Por qué es importante calibrar periódicamente un equipo de aplicación de fitosanitarios?", reverso: "Para garantizar que se aplica la dosis correcta del producto, evitando tanto el infratratamiento (ineficaz) como el sobretratamiento (mayor riesgo ambiental y para la salud, y mayor coste)" },
  { anverso: "¿Qué condiciones meteorológicas deben evitarse al aplicar productos fitosanitarios al aire libre?", reverso: "Viento fuerte (por el riesgo de deriva hacia zonas no objetivo), lluvia inminente (que arrastraría el producto) y temperaturas muy altas (que favorecen la evaporación y menor eficacia)" },
  { anverso: "¿Qué mantenimiento básico requiere un equipo de pulverización tras su uso?", reverso: "Limpieza interna y externa con agua (evitando verter el agua de limpieza sobre suelo o cauces sin control), revisión de boquillas obstruidas y comprobación del estado de juntas y depósito" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una mochila pulverizadora manual?", explicacion: "Un equipo portátil a la espalda para tratamientos localizados.", dificultad: "facil", opciones: ["Un equipo portátil a la espalda", "Un equipo tractorizado de gran capacidad", "Un tipo de aspersor de riego", "Un filtro de arena de sílice"], correcta: 0 },
  { enunciado: "¿Para qué se emplea un pulverizador de arrastre o tractorizado?", explicacion: "Para tratar grandes superficies de forma rápida y eficiente.", dificultad: "media", opciones: ["Para tratar grandes superficies", "Para tratamientos muy localizados y pequeños", "Para regar el césped automáticamente", "Para desinfectar el agua de piscinas"], correcta: 0 },
  { enunciado: "¿Qué influencia tiene la boquilla de un equipo de aplicación?", explicacion: "Determina el tamaño de gota, la deriva y la uniformidad del tratamiento.", dificultad: "media", opciones: ["Determina el tamaño de gota y la deriva", "No influye en la calidad del tratamiento", "Solo afecta a la velocidad de vaciado del depósito", "Determina el tipo de producto que se puede usar"], correcta: 0 },
  { enunciado: "¿Por qué es importante calibrar un equipo de aplicación de fitosanitarios?", explicacion: "Para garantizar la dosis correcta, evitando infra o sobretratamiento.", dificultad: "media", opciones: ["Para garantizar la dosis correcta de producto", "Para aumentar siempre la velocidad de aplicación", "No influye en el resultado del tratamiento", "Solo afecta al color del producto aplicado"], correcta: 0 },
  { enunciado: "¿Qué condición meteorológica debe evitarse al aplicar fitosanitarios al aire libre?", explicacion: "Viento fuerte, por el riesgo de deriva hacia zonas no objetivo.", dificultad: "media", opciones: ["Viento fuerte", "Cielo nublado sin viento", "Temperatura moderada sin viento", "Ausencia total de sol"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento requiere un equipo de pulverización tras su uso?", explicacion: "Limpieza controlada, revisión de boquillas y comprobación de juntas y depósito.", dificultad: "media", opciones: ["Limpieza controlada y revisión de boquillas", "No requiere ningún mantenimiento tras el uso", "Solo guardarlo sin limpiar hasta el próximo uso", "Solo sustituir el depósito cada vez"], correcta: 0 },
]);

const S3 = "riesgos-plaguicidas-medidas-preventivas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué vías de exposición a un plaguicida existen para la persona que lo aplica?", reverso: "Vía dérmica (contacto con la piel), vía respiratoria (inhalación de vapores o aerosoles) y vía oral (ingestión accidental), siendo la dérmica la más habitual en la aplicación profesional" },
  { anverso: "¿Qué EPI son imprescindibles al aplicar productos fitosanitarios?", reverso: "Mono o traje de protección química, guantes resistentes a productos químicos, mascarilla o equipo de protección respiratoria adecuado al producto, gafas o pantalla facial, y calzado impermeable" },
  { anverso: "¿Qué es el plazo de seguridad de un producto fitosanitario?", reverso: "El tiempo mínimo que debe transcurrir entre la aplicación del producto y el acceso de personas (o la recolección, en cultivos) a la zona tratada, para garantizar que el riesgo residual sea seguro" },
  { anverso: "¿Qué debe hacerse tras aplicar un producto fitosanitario en una zona verde de uso público (como un parque o instalación deportiva)?", reverso: "Señalizar la zona tratada, respetar el plazo de seguridad indicado en la etiqueta antes de permitir el acceso, e informar a las personas usuarias de la restricción temporal" },
  { anverso: "¿Qué debe hacerse con los envases vacíos de productos fitosanitarios?", reverso: "Gestionarlos como residuo peligroso, mediante el sistema específico de recogida (como SIGFITO en España), sin reutilizarlos para otros fines ni desecharlos con los residuos ordinarios" },
  { anverso: "¿Qué medidas de higiene personal deben seguirse tras finalizar una aplicación de fitosanitarios?", reverso: "Lavarse manos y cara (y ducharse si es posible) antes de comer, beber o fumar, y cambiar la ropa de trabajo si ha podido estar en contacto con el producto" },
  { anverso: "¿Por qué es importante conocer la ficha de datos de seguridad de cada producto fitosanitario antes de su aplicación?", reverso: "Porque detalla su toxicidad específica, los EPI recomendados, el plazo de seguridad, y las medidas de primeros auxilios en caso de exposición accidental" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuál es la vía de exposición más habitual en la aplicación profesional de plaguicidas?", explicacion: "La vía dérmica (contacto con la piel).", dificultad: "media", opciones: ["La vía dérmica", "La vía oral exclusivamente", "La vía respiratoria exclusivamente", "No existe riesgo de exposición"], correcta: 0 },
  { enunciado: "¿Qué EPI son imprescindibles al aplicar fitosanitarios?", explicacion: "Traje de protección, guantes, mascarilla, gafas y calzado impermeable.", dificultad: "facil", opciones: ["Traje, guantes, mascarilla y calzado impermeable", "No es necesaria ninguna protección especial", "Solo gafas de sol convencionales", "Solo calzado deportivo habitual"], correcta: 0 },
  { enunciado: "¿Qué es el plazo de seguridad de un producto fitosanitario?", explicacion: "El tiempo mínimo antes de permitir el acceso a la zona tratada.", dificultad: "media", opciones: ["El tiempo mínimo antes de permitir el acceso", "El tiempo de caducidad del producto", "El tiempo de calibración del equipo", "El tiempo de secado de la pintura"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse tras aplicar fitosanitarios en una zona verde de uso público?", explicacion: "Señalizar la zona y respetar el plazo de seguridad antes del acceso.", dificultad: "media", opciones: ["Señalizar y respetar el plazo de seguridad", "Permitir el acceso inmediato sin restricciones", "No es necesaria ninguna señalización", "Solo avisar verbalmente sin señalizar"], correcta: 0 },
  { enunciado: "¿Cómo deben gestionarse los envases vacíos de fitosanitarios?", explicacion: "Como residuo peligroso, mediante un sistema específico de recogida.", dificultad: "media", opciones: ["Como residuo peligroso con recogida específica", "Reutilizándolos para otros productos", "Con los residuos ordinarios del centro", "No requieren ninguna gestión especial"], correcta: 0 },
  { enunciado: "¿Qué medida de higiene debe seguirse tras aplicar fitosanitarios?", explicacion: "Lavarse manos y cara antes de comer, beber o fumar.", dificultad: "media", opciones: ["Lavarse manos y cara antes de comer o fumar", "No es necesaria ninguna medida higiénica", "Solo lavarse al final de la jornada laboral", "Solo cambiar los guantes, sin más medidas"], correcta: 0 },
  { enunciado: "¿Por qué es importante conocer la ficha de seguridad de cada producto fitosanitario?", explicacion: "Detalla toxicidad, EPI recomendados, plazo de seguridad y primeros auxilios.", dificultad: "media", opciones: ["Detalla toxicidad, EPI y primeros auxilios", "Solo indica el precio del producto", "Solo indica el fabricante del producto", "No aporta información relevante de seguridad"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 20 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 20, orden: 20, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-90 creado y vinculado como Tema 20 de Oficial Polivalente Instalaciones Deportivas.");

/**
 * Crea tema-92: "Mantenimiento de parques y jardines" — Tema 7
 * (numero=7, bloque-2) de Oficial Agente Inspector (Ayto. Zaragoza).
 * Primer tema de la parte específica de esta oposición.
 *
 * Corresponde al TEMA 5 oficial del Anexo I (bases2110.pdf):
 *   "Mantenimiento de parques y jardines: labores de limpieza y desbroce
 *   de zonas verdes; preparación del terreno. Gestión del arbolado,
 *   realización de podas de formación, mantenimiento y seguridad;
 *   técnicas de plantación y trasplante de árboles y arbustos;
 *   inspección visual de riesgo de arbolado y actuaciones correctivas en
 *   arbolado dañado."
 *
 * Conocimiento técnico consolidado del oficio de jardinería y gestión de
 * arbolado; no requiere cita legal artículo a artículo. Complementa
 * (sin duplicar) tema-89 (Oficial Instalaciones Deportivas: césped,
 * arbustos y árboles), con enfoque aquí en gestión y seguridad del
 * arbolado en parques, no en zonas verdes de un centro deportivo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-92-mantenimiento-parques-jardines.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-92";
const OPOSICION = "oficial-agente-inspector-ayto-zaragoza";
const BLOQUE_2_ID = "b74ad422-4965-469e-9b9c-ef1a39c26d76";

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
  titulo: "Mantenimiento de parques y jardines",
  descripcion: "Limpieza y desbroce de zonas verdes. Gestión del arbolado: podas de formación, mantenimiento y seguridad. Técnicas de plantación y trasplante. Inspección visual de riesgo de arbolado.",
  contenido: "Desarrolla las labores básicas de limpieza y desbroce de zonas verdes y preparación del terreno, la gestión del arbolado urbano (podas de formación, mantenimiento y seguridad), las técnicas de plantación y trasplante de árboles y arbustos, y la inspección visual de riesgo de arbolado con las actuaciones correctivas ante ejemplares dañados.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Limpieza, desbroce y preparación del terreno", seccion: "limpieza-desbroce-preparacion-terreno", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Gestión del arbolado: podas y plantación", seccion: "gestion-arbolado-podas-plantacion", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Inspección visual de riesgo de arbolado", seccion: "inspeccion-visual-riesgo-arbolado", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "limpieza-desbroce-preparacion-terreno";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el desbroce de una zona verde?", reverso: "La eliminación de vegetación espontánea (maleza, matorral) no deseada de una superficie, previa a labores de plantación, siembra o para mantener limpio un espacio público" },
  { anverso: "¿Qué diferencia hay entre desbroce manual y mecánico?", reverso: "El manual se realiza con herramientas de mano (azada, hoz); el mecánico emplea máquinas (desbrozadora, tractor con brazo desbrozador), más eficiente en grandes superficies o terrenos irregulares" },
  { anverso: "¿Qué es la preparación del terreno previa a una plantación?", reverso: "El conjunto de labores (laboreo, nivelación, incorporación de materia orgánica, eliminación de piedras y raíces) que acondicionan el suelo para recibir una nueva plantación o siembra" },
  { anverso: "¿Qué es el laboreo del suelo?", reverso: "La labor mecánica o manual de remover y airear la tierra (mediante azada, motocultor o arado), mejorando su estructura y facilitando el enraizamiento de las plantas" },
  { anverso: "¿Por qué es importante retirar los residuos de la limpieza de una zona verde de forma adecuada?", reverso: "Para evitar la acumulación de restos vegetales que puedan favorecer plagas o enfermedades, y para cumplir con la gestión de residuos vegetales establecida (compostaje, punto limpio, recogida específica)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el desbroce de una zona verde?", explicacion: "La eliminación de vegetación espontánea no deseada.", dificultad: "facil", opciones: ["La eliminación de vegetación espontánea no deseada", "La plantación de nuevos árboles", "El riego programado del césped", "La poda de formación de arbustos"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre desbroce manual y mecánico?", explicacion: "El manual usa herramientas de mano; el mecánico usa máquinas, más eficiente en grandes superficies.", dificultad: "media", opciones: ["El mecánico usa máquinas y es más eficiente en grandes superficies", "Son exactamente el mismo procedimiento", "El manual solo se usa en interiores", "El mecánico no puede usarse en terreno irregular"], correcta: 0 },
  { enunciado: "¿Qué labores incluye la preparación del terreno antes de plantar?", explicacion: "Laboreo, nivelación, incorporación de materia orgánica y eliminación de piedras/raíces.", dificultad: "media", opciones: ["Laboreo, nivelación y eliminación de piedras/raíces", "Solo el riego previo del terreno", "Solo la poda de árboles cercanos", "No requiere ninguna preparación previa"], correcta: 0 },
  { enunciado: "¿Qué es el laboreo del suelo?", explicacion: "Remover y airear la tierra para mejorar su estructura.", dificultad: "media", opciones: ["Remover y airear la tierra", "Podar las ramas de un árbol", "Sembrar semillas de césped", "Aplicar un producto fitosanitario"], correcta: 0 },
  { enunciado: "¿Por qué es importante retirar adecuadamente los residuos de limpieza de una zona verde?", explicacion: "Para evitar plagas/enfermedades y cumplir la gestión de residuos vegetales.", dificultad: "media", opciones: ["Para evitar plagas y cumplir la gestión de residuos", "No tiene ninguna relevancia sanitaria", "Solo afecta a la estética del parque", "Solo se retiran en otoño"], correcta: 0 },
]);

const S2 = "gestion-arbolado-podas-plantacion";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la poda de formación de un árbol joven en el arbolado urbano?", reverso: "La poda realizada en los primeros años de vida del árbol para orientar su crecimiento futuro, formando una estructura de ramas equilibrada y adaptada al espacio urbano disponible" },
  { anverso: "¿Qué es la poda de mantenimiento (o de conservación) del arbolado urbano?", reverso: "La poda periódica de árboles ya formados, orientada a eliminar ramas secas, dañadas, cruzadas o que suponen un riesgo, y a mantener el porte adecuado al entorno urbano" },
  { anverso: "¿Qué es la poda de seguridad en arbolado urbano?", reverso: "La poda dirigida específicamente a eliminar ramas o partes del árbol que suponen un riesgo inminente para personas, vehículos o instalaciones (ramas fracturadas, mal ancladas, sobre zonas de tránsito)" },
  { anverso: "¿Qué es la técnica de plantación de un árbol o arbusto?", reverso: "El conjunto de operaciones (apertura del hoyo de plantación, colocación del cepellón o raíz desnuda, relleno con sustrato adecuado, riego de asentamiento y, si procede, tutorado) para establecer correctamente un ejemplar nuevo" },
  { anverso: "¿Qué es el trasplante de un árbol o arbusto ya desarrollado?", reverso: "La operación de extraer un ejemplar de su ubicación original (con su cepellón) y reubicarlo en otro emplazamiento, cuidando de minimizar el estrés y el daño a sus raíces" },
  { anverso: "¿Qué es un tutor en la plantación de un árbol joven y para qué se usa?", reverso: "Un soporte (estaca o poste) que se ancla junto al árbol recién plantado y se sujeta al tronco, para darle estabilidad frente al viento mientras desarrolla su propio sistema radicular" },
  { anverso: "¿Cuál es la mejor época general para plantar árboles y arbustos caducifolios a raíz desnuda?", reverso: "El periodo de reposo vegetativo (otoño-invierno), cuando el árbol ha perdido la hoja y el estrés del trasplante es menor" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es la poda de formación de un árbol joven?", explicacion: "La poda en los primeros años para orientar el crecimiento futuro.", dificultad: "media", opciones: ["La poda en los primeros años para orientar el crecimiento", "La poda de árboles ya adultos y formados", "La eliminación de ramas de riesgo inminente", "El trasplante de un ejemplar joven"], correcta: 0 },
  { enunciado: "¿Qué es la poda de seguridad en arbolado urbano?", explicacion: "La dirigida a eliminar ramas que suponen un riesgo inminente.", dificultad: "media", opciones: ["Eliminar ramas que suponen un riesgo inminente", "Orientar el crecimiento de un árbol joven", "Sembrar semillas de nuevos ejemplares", "Aplicar riego de asentamiento"], correcta: 0 },
  { enunciado: "¿Qué incluye la técnica de plantación de un árbol?", explicacion: "Apertura del hoyo, colocación del cepellón, relleno, riego y tutorado.", dificultad: "media", opciones: ["Hoyo, cepellón, relleno, riego y tutorado", "Solo el riego posterior a la plantación", "Solo la poda inicial del ejemplar", "Solo la elección del emplazamiento"], correcta: 0 },
  { enunciado: "¿Qué es el trasplante de un árbol ya desarrollado?", explicacion: "Extraerlo con su cepellón y reubicarlo minimizando el daño a las raíces.", dificultad: "media", opciones: ["Extraerlo y reubicarlo minimizando daño a raíces", "Podar sus ramas de forma intensiva", "Aplicar un tratamiento fitosanitario", "Sustituirlo por un ejemplar joven"], correcta: 0 },
  { enunciado: "¿Para qué sirve un tutor en la plantación de un árbol joven?", explicacion: "Da estabilidad frente al viento mientras desarrolla sus raíces.", dificultad: "media", opciones: ["Da estabilidad frente al viento", "Sustituye al riego de asentamiento", "Elimina la necesidad de poda posterior", "Protege frente a plagas de insectos"], correcta: 0 },
  { enunciado: "¿Cuál es la mejor época para plantar árboles caducifolios a raíz desnuda?", explicacion: "El periodo de reposo vegetativo (otoño-invierno).", dificultad: "media", opciones: ["El periodo de reposo vegetativo (otoño-invierno)", "Pleno verano con la hoja completa", "Solo en primavera con la floración", "No influye la época del año"], correcta: 0 },
]);

const S3 = "inspeccion-visual-riesgo-arbolado";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la inspección visual de riesgo de arbolado (o VTA, Visual Tree Assessment)?", reverso: "Un método de evaluación del estado de un árbol basado en la observación externa de síntomas (grietas, hongos, ramas secas, inclinación, heridas), sin necesidad de instrumentos invasivos, para valorar su nivel de riesgo" },
  { anverso: "¿Qué signos externos pueden indicar un problema de estabilidad o sanidad en un árbol durante una inspección visual?", reverso: "Grietas o fisuras en el tronco, presencia de cuerpos fructíferos de hongos (setas), cavidades, corteza incluida en horquillas, inclinación anómala del tronco, y ramas secas o muertas" },
  { anverso: "¿Qué es un cuerpo fructífero de hongo en la base o el tronco de un árbol y por qué es un signo de alarma?", reverso: "La parte visible (seta) de un hongo que se desarrolla sobre madera en descomposición; su presencia puede indicar pudrición interna del tronco o las raíces, comprometiendo la estabilidad estructural del árbol" },
  { anverso: "¿Qué es la corteza incluida en una horquilla (bifurcación) de un árbol y qué riesgo supone?", reverso: "Una unión débil entre dos ramas principales donde la corteza queda 'atrapada' en el interior de la unión en lugar de fusionarse el tejido leñoso; supone un mayor riesgo de fractura de una de las ramas, especialmente con viento fuerte" },
  { anverso: "¿Qué actuación correctiva puede aplicarse a un árbol con riesgo detectado, según su gravedad?", reverso: "Desde una poda de seguridad (eliminación de ramas de riesgo) o instalación de sistemas de sujeción (cableado), hasta la tala controlada del ejemplar si el riesgo es severo e irreversible" },
  { anverso: "¿Con qué frecuencia es recomendable realizar inspecciones periódicas de riesgo en el arbolado urbano de un municipio?", reverso: "Con una periodicidad regular (habitualmente anual, o más frecuente en ejemplares de riesgo ya identificado o zonas de alta afluencia de personas), complementada con inspecciones tras eventos meteorológicos severos (vendavales, nevadas)" },
  { anverso: "¿Qué debe hacer el agente inspector si detecta un árbol con riesgo grave e inminente de caída en un espacio de alta afluencia?", reverso: "Señalizar y acotar la zona de forma inmediata para proteger a las personas, y comunicar la incidencia con carácter urgente al servicio municipal responsable del arbolado para su valoración técnica y actuación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la inspección visual de riesgo de arbolado (VTA)?", explicacion: "Evaluación del árbol basada en la observación externa de síntomas, sin instrumentos invasivos.", dificultad: "media", opciones: ["Evaluación mediante observación externa de síntomas", "Un análisis de laboratorio de la madera", "Una radiografía del tronco del árbol", "Un análisis químico del suelo"], correcta: 0 },
  { enunciado: "¿Qué signos externos pueden indicar un problema de estabilidad en un árbol?", explicacion: "Grietas, hongos, cavidades, inclinación anómala y ramas secas.", dificultad: "media", opciones: ["Grietas, hongos, cavidades e inclinación anómala", "Solo el color de las hojas en otoño", "Solo la altura total del árbol", "Solo la especie del ejemplar"], correcta: 0 },
  { enunciado: "¿Qué indica la presencia de un cuerpo fructífero de hongo en el tronco de un árbol?", explicacion: "Puede indicar pudrición interna, comprometiendo la estabilidad estructural.", dificultad: "media", opciones: ["Posible pudrición interna del árbol", "Que el árbol está completamente sano", "Que necesita más riego únicamente", "Que se acerca su época de floración"], correcta: 0 },
  { enunciado: "¿Qué riesgo supone la corteza incluida en una horquilla de un árbol?", explicacion: "Mayor riesgo de fractura de una rama, especialmente con viento fuerte.", dificultad: "dificil", opciones: ["Mayor riesgo de fractura de una rama", "Ningún riesgo relevante para el árbol", "Solo afecta a la estética del ejemplar", "Favorece un crecimiento más rápido"], correcta: 0 },
  { enunciado: "¿Qué actuación correctiva puede aplicarse ante un riesgo severo e irreversible en un árbol?", explicacion: "La tala controlada del ejemplar.", dificultad: "media", opciones: ["La tala controlada del ejemplar", "Únicamente aumentar el riego", "Únicamente aplicar abono", "Ninguna actuación es posible"], correcta: 0 },
  { enunciado: "¿Qué debe hacer el agente inspector ante un árbol con riesgo grave e inminente en zona de alta afluencia?", explicacion: "Señalizar y acotar la zona de inmediato y comunicar la incidencia con urgencia.", dificultad: "media", opciones: ["Señalizar, acotar y comunicar con urgencia", "Ignorarlo hasta la siguiente inspección anual", "Talar el árbol él mismo sin autorización", "Esperar a que caiga la rama por sí sola"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 7 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 7, orden: 7, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-92 creado y vinculado como Tema 7 de Oficial Agente Inspector.");

/**
 * Crea tema-89: "Jardinería: césped, arbustos y árboles" — Tema 19
 * (numero=19, bloque-2) de Oficial Polivalente Instalaciones Deportivas
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 17 oficial del Anexo I (bases2110.pdf):
 *   "Jardinería: Césped, arbustos y árboles (mantenimiento, útiles y
 *   maquinaria)."
 *
 * Conocimiento técnico consolidado del oficio de jardinería; no requiere
 * cita legal artículo a artículo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-89-jardineria-cesped-arbustos-arboles.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-89";
const OPOSICION = "oficial-instalaciones-deportivas-ayto-zaragoza";
const BLOQUE_2_ID = "cdb0920b-a2d8-4ea8-b3fc-b80168d7361a";

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
  titulo: "Jardinería: césped, arbustos y árboles",
  descripcion: "Mantenimiento de césped, arbustos y árboles en zonas verdes de instalaciones deportivas. Útiles y maquinaria de jardinería.",
  contenido: "Desarrolla las operaciones básicas de mantenimiento de césped (siega, escarificado, abonado), arbustos (poda de formación y mantenimiento) y árboles en zonas verdes de instalaciones deportivas, junto con los útiles y la maquinaria propios del oficio de jardinería.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Mantenimiento del césped", seccion: "mantenimiento-cesped", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Mantenimiento de arbustos y árboles", seccion: "mantenimiento-arbustos-arboles", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Útiles y maquinaria de jardinería", seccion: "utiles-maquinaria-jardineria", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "mantenimiento-cesped";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la siega del césped y con qué frecuencia se realiza habitualmente en temporada de crecimiento?", reverso: "El corte periódico de la hierba para mantener una altura adecuada; en temporada de crecimiento activo (primavera-verano) suele realizarse semanalmente o cada 10-15 días" },
  { anverso: "¿Qué regla básica de altura de corte debe respetarse al segar el césped para no dañarlo?", reverso: "No cortar más de un tercio de la altura total de la hierba en cada siega, ya que un corte demasiado severo debilita la planta y favorece la aparición de malas hierbas" },
  { anverso: "¿Qué es el escarificado del césped?", reverso: "Una operación que elimina el fieltro (musgo y restos vegetales acumulados en la base del césped) mediante cuchillas verticales, mejorando la aireación del suelo y la absorción de agua y nutrientes" },
  { anverso: "¿Qué es el aireado (o perforado) del césped?", reverso: "Una operación que practica pequeños orificios en el suelo para descompactarlo, mejorando la penetración de aire, agua y nutrientes hasta las raíces" },
  { anverso: "¿Qué es el abonado del césped y con qué frecuencia se realiza habitualmente?", reverso: "La aplicación de nutrientes (nitrógeno, fósforo, potasio) para favorecer el crecimiento y color del césped; habitualmente se realiza varias veces al año, con mayor intensidad en primavera y otoño" },
  { anverso: "¿Qué es la resiembra de un césped?", reverso: "La siembra de semillas adicionales sobre un césped ya existente para reparar zonas dañadas, ralas o desgastadas por el uso intensivo" },
  { anverso: "¿Por qué el césped de campos de fútbol o zonas de juego intensivo requiere un mantenimiento más frecuente que un césped ornamental?", reverso: "Porque el uso constante (pisoteo, roce) desgasta más la hierba y compacta el suelo, requiriendo siegas, aireados y resiembras más frecuentes para mantener su calidad y resistencia" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Con qué frecuencia se siega habitualmente el césped en temporada de crecimiento activo?", explicacion: "Semanalmente o cada 10-15 días.", dificultad: "media", opciones: ["Semanalmente o cada 10-15 días", "Una vez al año", "Cada 6 meses", "Diariamente sin excepción"], correcta: 0 },
  { enunciado: "¿Qué regla básica debe respetarse al segar el césped?", explicacion: "No cortar más de un tercio de la altura total en cada siega.", dificultad: "media", opciones: ["No cortar más de un tercio de la altura", "Cortar siempre a ras de suelo", "Cortar la mitad de la altura cada vez", "No existe ninguna regla al respecto"], correcta: 0 },
  { enunciado: "¿Qué es el escarificado del césped?", explicacion: "Eliminar el fieltro acumulado mediante cuchillas verticales.", dificultad: "media", opciones: ["Eliminar el fieltro mediante cuchillas verticales", "Sembrar semillas adicionales", "Aplicar abono nitrogenado", "Perforar el suelo para aireación"], correcta: 0 },
  { enunciado: "¿Qué es el aireado del césped?", explicacion: "Practicar orificios en el suelo para descompactarlo.", dificultad: "media", opciones: ["Practicar orificios para descompactar el suelo", "Cortar la hierba a baja altura", "Aplicar fertilizante nitrogenado", "Eliminar el musgo acumulado"], correcta: 0 },
  { enunciado: "¿Qué es la resiembra de un césped?", explicacion: "Sembrar semillas adicionales para reparar zonas dañadas.", dificultad: "facil", opciones: ["Sembrar semillas adicionales en zonas dañadas", "Cortar el césped por primera vez", "Aplicar herbicida selectivo", "Regar de forma manual con manguera"], correcta: 0 },
  { enunciado: "¿Por qué el césped de campos de fútbol requiere mantenimiento más frecuente?", explicacion: "El uso intensivo desgasta más la hierba y compacta el suelo.", dificultad: "media", opciones: ["El uso intensivo desgasta y compacta el suelo", "No requiere mantenimiento diferenciado", "Solo necesita riego, sin siega", "Es idéntico al mantenimiento ornamental"], correcta: 0 },
]);

const S2 = "mantenimiento-arbustos-arboles";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la poda de formación de un arbusto o árbol joven?", reverso: "La poda realizada en los primeros años de vida de la planta para orientar su crecimiento, dando forma a su estructura futura (ramificación equilibrada, altura, densidad)" },
  { anverso: "¿Qué es la poda de mantenimiento (o de conservación)?", reverso: "La poda periódica de una planta ya formada, orientada a mantener su forma, eliminar ramas secas, dañadas o cruzadas, y favorecer su vigor y floración" },
  { anverso: "¿Cuál es la mejor época general para podar la mayoría de arbustos y árboles caducifolios?", reverso: "El periodo de reposo vegetativo (invierno, cuando la planta ha perdido la hoja), ya que se minimiza el estrés de la poda y facilita ver la estructura de ramas" },
  { anverso: "¿Qué precaución debe seguirse al usar herramientas de poda entre distintos ejemplares?", reverso: "Desinfectar las herramientas de corte entre plantas (especialmente si hay sospecha de enfermedad), para evitar la transmisión de patógenos de un ejemplar a otro" },
  { anverso: "¿Qué es un seto y qué tipo de poda requiere para mantener su forma?", reverso: "Una hilera de arbustos plantados de forma continua para formar una barrera vegetal; requiere podas periódicas de recorte (perfilado) para mantener una forma regular y compacta" },
  { anverso: "¿Qué es el acolchado (mulching) en el mantenimiento de arbustos y árboles?", reverso: "La cobertura del suelo alrededor de la base de la planta con materiales orgánicos (corteza, restos de poda triturados) que reduce la evaporación, controla malas hierbas y aporta nutrientes al descomponerse" },
  { anverso: "¿Qué es el riesgo de arbolado y por qué debe inspeccionarse periódicamente el estado de los árboles en un espacio público?", reverso: "El riesgo de caída de ramas o del propio ejemplar por enfermedad, plaga o daño estructural; la inspección periódica permite detectar signos de riesgo (grietas, hongos, ramas secas) antes de que se materialice un accidente" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es la poda de formación?", explicacion: "La poda en los primeros años para orientar el crecimiento de la planta.", dificultad: "media", opciones: ["La poda en los primeros años para orientar el crecimiento", "La poda de mantenimiento de una planta ya formada", "El recorte periódico de un seto adulto", "La eliminación total de la planta"], correcta: 0 },
  { enunciado: "¿Qué es la poda de mantenimiento o conservación?", explicacion: "La poda periódica para mantener forma y eliminar ramas secas o dañadas.", dificultad: "media", opciones: ["Mantener forma y eliminar ramas secas/dañadas", "Orientar el crecimiento de una planta joven", "Sembrar semillas adicionales", "Aplicar fertilizante nitrogenado"], correcta: 0 },
  { enunciado: "¿Cuál es la mejor época general para podar arbustos y árboles caducifolios?", explicacion: "El periodo de reposo vegetativo, en invierno.", dificultad: "media", opciones: ["El periodo de reposo vegetativo (invierno)", "El pleno verano con la hoja completa", "Solo en primavera con la floración", "No influye la época del año"], correcta: 0 },
  { enunciado: "¿Por qué debe desinfectarse la herramienta de poda entre distintos ejemplares?", explicacion: "Para evitar la transmisión de patógenos entre plantas.", dificultad: "media", opciones: ["Para evitar la transmisión de patógenos", "Para afilar mejor la herramienta", "No es necesaria ninguna desinfección", "Solo se desinfecta al final de la jornada"], correcta: 0 },
  { enunciado: "¿Qué función cumple el acolchado (mulching) en la base de una planta?", explicacion: "Reduce evaporación, controla malas hierbas y aporta nutrientes.", dificultad: "media", opciones: ["Reduce evaporación y controla malas hierbas", "Sustituye por completo al riego", "Elimina la necesidad de poda", "Solo tiene función decorativa"], correcta: 0 },
  { enunciado: "¿Por qué es importante inspeccionar periódicamente el riesgo de arbolado en espacios públicos?", explicacion: "Para detectar signos de riesgo antes de que se materialice un accidente.", dificultad: "media", opciones: ["Para detectar signos de riesgo antes de un accidente", "No tiene ninguna relevancia de seguridad", "Solo afecta a la estética del arbolado", "Solo se hace tras un accidente ya ocurrido"], correcta: 0 },
]);

const S3 = "utiles-maquinaria-jardineria";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un cortacésped y qué tipos básicos existen?", reverso: "Una máquina que corta la hierba a una altura determinada; existen modelos manuales de empuje, motorizados de empuje, y autopropulsados o tractor cortacésped para grandes superficies" },
  { anverso: "¿Qué es una desbrozadora?", reverso: "Una máquina portátil con un cabezal de hilo o disco de corte, usada para cortar hierba y maleza en zonas irregulares, bordes o de difícil acceso para el cortacésped" },
  { anverso: "¿Para qué se usa un escarificador mecánico?", reverso: "Para realizar la operación de escarificado del césped a máquina, mediante cuchillas verticales que eliminan el fieltro de forma más eficiente que a mano" },
  { anverso: "¿Para qué se usan las tijeras de podar (podadora de mano) y las tijeras de dos manos?", reverso: "Para cortar ramas de pequeño y mediano diámetro en labores de poda de arbustos y árboles jóvenes, con distinto nivel de fuerza de corte según el tamaño de la rama" },
  { anverso: "¿Para qué se usa una motosierra en jardinería?", reverso: "Para cortar ramas y troncos de mayor diámetro, en podas de mayor entidad o en la tala/retirada de árboles" },
  { anverso: "¿Qué EPI son imprescindibles al usar una motosierra o desbrozadora?", reverso: "Gafas o pantalla facial de protección, protección auditiva, guantes, calzado de seguridad y, en el caso de la motosierra, pantalón anticorte" },
  { anverso: "¿Para qué se usa un soplador en tareas de jardinería?", reverso: "Para agrupar y desplazar hojas caídas, restos de siega o residuos ligeros hacia una zona de recogida, facilitando su posterior retirada" },
  { anverso: "¿Qué mantenimiento básico requiere la maquinaria de motor de combustión de jardinería (cortacésped, desbrozadora)?", reverso: "Revisión periódica del nivel de aceite y combustible, limpieza o sustitución del filtro de aire, y afilado o sustitución de las cuchillas de corte" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué tipos básicos de cortacésped existen?", explicacion: "Manuales de empuje, motorizados de empuje y autopropulsados/tractor.", dificultad: "facil", opciones: ["Manuales, motorizados y autopropulsados", "Solo modelos manuales sin motor", "Solo tractores cortacésped", "Solo modelos eléctricos de mano"], correcta: 0 },
  { enunciado: "¿Para qué se usa una desbrozadora?", explicacion: "Para cortar hierba y maleza en zonas irregulares o de difícil acceso.", dificultad: "media", opciones: ["Para cortar hierba en zonas irregulares", "Para escarificar el césped a máquina", "Para transportar restos de poda", "Para regar zonas de difícil acceso"], correcta: 0 },
  { enunciado: "¿Para qué se usa un escarificador mecánico?", explicacion: "Para realizar el escarificado del césped a máquina.", dificultad: "media", opciones: ["Para escarificar el césped a máquina", "Para cortar ramas de gran diámetro", "Para agrupar hojas caídas", "Para sembrar semillas de césped"], correcta: 0 },
  { enunciado: "¿Para qué se usa una motosierra en jardinería?", explicacion: "Para cortar ramas y troncos de mayor diámetro.", dificultad: "facil", opciones: ["Para cortar ramas y troncos de mayor diámetro", "Para cortar hierba de zonas irregulares", "Para airear el suelo del césped", "Para aplicar abono al césped"], correcta: 0 },
  { enunciado: "¿Qué EPI son imprescindibles al usar una motosierra?", explicacion: "Protección facial, auditiva, guantes, calzado de seguridad y pantalón anticorte.", dificultad: "media", opciones: ["Protección facial, auditiva y pantalón anticorte", "No es necesaria ninguna protección especial", "Solo guantes de látex desechables", "Solo gafas de sol convencionales"], correcta: 0 },
  { enunciado: "¿Para qué se usa un soplador en jardinería?", explicacion: "Para agrupar y desplazar hojas y residuos ligeros.", dificultad: "facil", opciones: ["Para agrupar y desplazar hojas y residuos", "Para cortar ramas de gran diámetro", "Para airear el suelo del césped", "Para desinfectar herramientas de poda"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento básico requiere la maquinaria de motor de combustión de jardinería?", explicacion: "Revisar aceite/combustible, filtro de aire y cuchillas de corte.", dificultad: "media", opciones: ["Revisar aceite, filtro de aire y cuchillas", "No requiere ningún mantenimiento periódico", "Solo lavarla exteriormente cada semana", "Solo revisar el color de la carcasa"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 19 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 19, orden: 19, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-89 creado y vinculado como Tema 19 de Oficial Polivalente Instalaciones Deportivas.");

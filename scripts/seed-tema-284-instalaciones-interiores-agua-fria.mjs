/**
 * Crea tema-284: "Instalaciones interiores de agua fría" — Tema 8
 * (numero=8, bloque-2) de Oficial Fontanero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 6 oficial del Anexo I (bases1716.pdf, línea 519):
 * "Instalaciones interiores. Diseño y montaje de instalaciones,
 * dimensionamiento y caudales mínimos en aparatos domésticos. CTE-HS4."
 *
 * Sourcing: CTE DB-HS4 "Suministro de agua", texto oficial descargado
 * íntegro de codigotecnico.org (Documento Básico HS Salubridad) en esta
 * sesión — apartados 2.1.3 (condiciones mínimas de suministro, tabla 2.1 de
 * caudales instantáneos mínimos, presión mínima/máxima), 3.1 (esquema
 * general: red con contador único / con contadores aislados), 3.2.1
 * (elementos de la red de agua fría: acometida, llave de corte general,
 * filtro, armario/arqueta de contador, tubo de alimentación, distribuidor
 * principal, ascendentes, contadores divisionarios, instalaciones
 * particulares) y 4.2 (dimensionado: velocidad de cálculo, comprobación de
 * presión).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-284-instalaciones-interiores-agua-fria.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-284";
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
  titulo: "Instalaciones interiores de agua fría",
  descripcion: "El esquema general de una instalación de suministro de agua según el CTE DB-HS4: acometida, instalación general y instalaciones particulares. Los caudales instantáneos mínimos por tipo de aparato (tabla 2.1) y las reglas de dimensionado. Condiciones de montaje y ejecución.",
  contenido: "Desarrolla el diseño y montaje de las instalaciones interiores de agua fría conforme al Documento Básico HS4 del Código Técnico de la Edificación: el esquema general de la instalación (red con contador general único o con contadores aislados) y los elementos que la componen, los caudales instantáneos mínimos exigidos para cada tipo de aparato y el procedimiento de dimensionado (velocidad de cálculo, coeficiente de simultaneidad, comprobación de presión), y las condiciones de montaje y ejecución que garantizan su correcto funcionamiento y mantenimiento.",
  enlaces_boe: [
    { url: "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf", titulo: "CTE, Documento Básico HS Salubridad, Sección HS4 (Suministro de agua)" },
  ],
  indice_estudio: [
    { url: "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf", titulo: "Esquema general de la instalación", seccion: "esquema-general-de-la-instalacion", articulos: "CTE DB-HS4, apartados 3.1 y 3.2.1" },
    { url: "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf", titulo: "Caudales mínimos y dimensionado", seccion: "caudales-minimos-y-dimensionado", articulos: "CTE DB-HS4, apartados 2.1.3 y 4.2" },
    { url: "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf", titulo: "Condiciones de montaje y ejecución", seccion: "condiciones-de-montaje-y-ejecucion", articulos: "CTE DB-HS4, apartados 2.1.2, 2.1.4 y 3.4" },
  ],
}]);

const S1 = "esquema-general-de-la-instalacion";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "Según el CTE DB-HS4, ¿de qué partes debe estar compuesta la instalación de suministro de agua de un edificio?", reverso: "De una acometida, una instalación general y, según si la contabilización es única o múltiple, de derivaciones colectivas o de instalaciones particulares" },
  { anverso: "¿Qué dos esquemas generales admite el CTE DB-HS4 para una instalación de suministro de agua?", reverso: "Red con contador general único (con armario o arqueta del contador general) y red con contadores aislados (con los contadores integrados en la instalación general, uno por cada instalación particular)" },
  { anverso: "¿Qué elementos mínimos debe tener la acometida según el CTE DB-HS4?", reverso: "Una llave de toma (o collarín de toma en carga) sobre la red exterior, un tubo de acometida que enlace con la llave de corte general, y una llave de corte en el exterior de la propiedad" },
  { anverso: "¿Qué función cumple la llave de corte general de un edificio?", reverso: "Interrumpir el suministro de agua a todo el edificio; debe estar situada dentro de la propiedad, en una zona de uso común accesible, y alojada en el armario o arqueta del contador general si existe" },
  { anverso: "¿Qué elementos, en este orden, contiene el armario o arqueta del contador general?", reverso: "La llave de corte general, un filtro de la instalación general, el contador, una llave/grifo/racor de prueba, una válvula de retención y una llave de salida" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "Según el CTE DB-HS4, ¿de qué partes se compone la instalación de suministro de agua de un edificio?", explicacion: "Acometida, instalación general y, según el caso, derivaciones colectivas o instalaciones particulares.", dificultad: "facil", opciones: ["Acometida, instalación general y derivaciones colectivas o instalaciones particulares", "Únicamente de la acometida, sin ningún otro elemento adicional", "Únicamente del contador general, sin acometida ni instalación general", "Únicamente de las instalaciones particulares de cada vivienda"], correcta: 0 },
  { enunciado: "¿Qué dos esquemas generales admite el CTE DB-HS4?", explicacion: "Red con contador general único y red con contadores aislados.", dificultad: "media", opciones: ["Red con contador general único y red con contadores aislados", "Red exclusivamente con contadores aislados, sin otra alternativa posible", "Red exclusivamente con contador general único, sin otra alternativa posible", "Red sin ningún tipo de contador, sujeta a tarifa plana"], correcta: 0 },
  { enunciado: "¿Qué elementos mínimos debe tener la acometida según el CTE DB-HS4?", explicacion: "Llave de toma, tubo de acometida y llave de corte exterior a la propiedad.", dificultad: "media", opciones: ["Llave de toma, tubo de acometida y llave de corte en el exterior de la propiedad", "Únicamente un contador general, sin ninguna llave de corte", "Únicamente una válvula antirretorno, sin tubo de acometida", "Únicamente un filtro de la instalación general"], correcta: 0 },
  { enunciado: "¿Dónde debe alojarse la llave de corte general, si el edificio dispone de armario o arqueta del contador general?", explicacion: "En el interior de ese armario o arqueta.", dificultad: "media", opciones: ["En el interior del armario o arqueta del contador general", "En el interior de cada vivienda particular del edificio", "En la azotea del edificio, junto al depósito de agua", "En el exterior del edificio, sin ninguna protección"], correcta: 0 },
  { enunciado: "¿Qué elemento debe instalarse a continuación de la llave de corte general dentro del armario o arqueta del contador?", explicacion: "El filtro de la instalación general.", dificultad: "dificil", opciones: ["El filtro de la instalación general", "Directamente el distribuidor principal del edificio", "Directamente una ascendente o montante del edificio", "Directamente el sistema de tratamiento de agua"], correcta: 0 },
]);

const S2 = "caudales-minimos-y-dimensionado";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "Según la tabla 2.1 del CTE DB-HS4, ¿qué caudal instantáneo mínimo de agua fría exige un lavabo?", reverso: "0,10 dm³/s (litros por segundo)" },
  { anverso: "Según la tabla 2.1 del CTE DB-HS4, ¿qué caudal instantáneo mínimo de agua fría exige un inodoro con fluxor, y en qué se diferencia de uno con cisterna?", reverso: "1,25 dm³/s, muy superior al de un inodoro con cisterna (0,10 dm³/s), porque el fluxor debe llenar la taza de golpe con un caudal instantáneo mucho mayor, sin depósito intermedio" },
  { anverso: "¿Cuál es la presión mínima exigida en los puntos de consumo según el CTE DB-HS4, y varía según el tipo de grifo?", reverso: "Sí: 100 kPa para grifos comunes y 150 kPa para fluxores y calentadores; en ningún punto de consumo debe superarse una presión máxima de 500 kPa" },
  { anverso: "¿Dentro de qué intervalo debe elegirse la velocidad de cálculo del agua en tuberías metálicas, según el CTE DB-HS4?", reverso: "Entre 0,50 y 2,00 m/s (en tuberías termoplásticas y multicapa, el intervalo es más amplio: entre 0,50 y 3,50 m/s)" },
  { anverso: "¿Qué es el coeficiente de simultaneidad en el dimensionado de una instalación según el CTE DB-HS4?", reverso: "El factor que se aplica al caudal máximo de un tramo (suma de los caudales de los puntos de consumo que alimenta) para obtener el caudal de cálculo real, considerando que no todos esos puntos se usan a la vez" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "Según la tabla 2.1 del CTE DB-HS4, ¿qué caudal instantáneo mínimo de agua fría exige un lavabo?", explicacion: "0,10 dm³/s.", dificultad: "facil", opciones: ["0,10 dm³/s", "0,05 dm³/s", "0,20 dm³/s", "1,25 dm³/s"], correcta: 0 },
  { enunciado: "¿Por qué el caudal instantáneo mínimo de un inodoro con fluxor (1,25 dm³/s) es tan superior al de uno con cisterna (0,10 dm³/s)?", explicacion: "El fluxor llena la taza de golpe, sin depósito intermedio que module el caudal.", dificultad: "media", opciones: ["Porque el fluxor debe llenar la taza de golpe, con un caudal instantáneo mucho mayor y sin depósito intermedio", "Porque el inodoro con fluxor consume siempre menos agua total que uno con cisterna", "Porque el inodoro con cisterna nunca necesita ningún caudal instantáneo mínimo exigido", "Porque el fluxor solo se usa en instalaciones de agua caliente sanitaria, nunca en agua fría"], correcta: 0 },
  { enunciado: "¿Cuál es la presión mínima exigida por el CTE DB-HS4 para un fluxor o un calentador en el punto de consumo?", explicacion: "150 kPa, superior a la exigida para un grifo común (100 kPa).", dificultad: "media", opciones: ["150 kPa", "100 kPa", "500 kPa", "50 kPa"], correcta: 0 },
  { enunciado: "¿Dentro de qué intervalo debe elegirse la velocidad de cálculo en tuberías metálicas según el CTE DB-HS4?", explicacion: "Entre 0,50 y 2,00 m/s.", dificultad: "media", opciones: ["Entre 0,50 y 2,00 m/s", "Entre 2,00 y 5,00 m/s", "Entre 0,05 y 0,20 m/s", "Sin ningún límite máximo ni mínimo establecido"], correcta: 0 },
  { enunciado: "¿Qué finalidad tiene aplicar un coeficiente de simultaneidad al dimensionar un tramo de la instalación?", explicacion: "Obtener el caudal de cálculo real, considerando que no todos los puntos se usan a la vez.", dificultad: "dificil", opciones: ["Obtener el caudal de cálculo real del tramo, reduciendo la suma de caudales máximos porque no todos los puntos se usan simultáneamente", "Aumentar artificialmente el caudal máximo de cada tramo por motivos de seguridad", "Determinar exclusivamente el color de las tuberías que deben instalarse en ese tramo", "Sustituir por completo la necesidad de calcular la presión disponible en cada punto"], correcta: 0 },
]);

const S3 = "condiciones-de-montaje-y-ejecucion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué distancia mínima debe separar las tuberías de agua fría de las de agua caliente (ACS o calefacción) según el CTE DB-HS4?", reverso: "4 cm como mínimo; cuando ambas tuberías coinciden en un mismo plano vertical, la de agua fría debe ir siempre por debajo de la de agua caliente" },
  { anverso: "¿En qué puntos de la instalación exige el CTE DB-HS4 disponer sistemas antirretorno?", reverso: "Después de los contadores, en la base de las ascendentes, antes del equipo de tratamiento de agua, en los tubos de alimentación no destinados a usos domésticos, y antes de los aparatos de refrigeración o climatización" },
  { anverso: "¿Por qué deben diseñarse las redes de tuberías de forma accesible para su mantenimiento?", reverso: "Porque el CTE DB-HS4 exige que estén a la vista, alojadas en huecos o patinillos registrables, o que dispongan de arquetas o registros, para poder realizar operaciones de mantenimiento y reparación" },
  { anverso: "¿Qué elementos deben instalarse en la base de las ascendentes o montantes según el CTE DB-HS4?", reverso: "Una válvula de retención (en primer lugar, según el sentido de circulación), una llave de corte para mantenimiento, y una llave de paso con grifo o tapón de vaciado" },
  { anverso: "¿Cuándo debe disponerse una red de retorno en una instalación de agua caliente sanitaria (ACS) según el CTE DB-HS4?", reverso: "Cuando la longitud de la tubería de ida al punto de consumo más alejado sea igual o mayor que 15 metros" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué distancia mínima debe separar las tuberías de agua fría de las de agua caliente según el CTE DB-HS4?", explicacion: "4 cm como mínimo.", dificultad: "facil", opciones: ["4 cm como mínimo", "40 cm como mínimo", "1 cm como mínimo", "No se exige ninguna distancia mínima entre ambas"], correcta: 0 },
  { enunciado: "Si ambas tuberías, fría y caliente, discurren en un mismo plano vertical, ¿cuál debe ir por debajo según el CTE DB-HS4?", explicacion: "La de agua fría debe ir siempre por debajo de la de agua caliente.", dificultad: "media", opciones: ["La tubería de agua fría", "La tubería de agua caliente", "Es indiferente cuál vaya por debajo en cualquier caso", "Ninguna: deben ir siempre en el mismo plano horizontal"], correcta: 0 },
  { enunciado: "¿En cuál de estos puntos exige el CTE DB-HS4 disponer un sistema antirretorno?", explicacion: "Después de los contadores, entre otros puntos.", dificultad: "media", opciones: ["Después de los contadores", "Únicamente en el punto de consumo más alejado de la vivienda", "Únicamente en las tuberías de agua fría, nunca en las de agua caliente", "En ningún punto: el CTE DB-HS4 no regula los sistemas antirretorno"], correcta: 0 },
  { enunciado: "¿Qué debe instalarse en primer lugar, según el sentido de circulación del agua, en la base de una ascendente?", explicacion: "La válvula de retención.", dificultad: "dificil", opciones: ["La válvula de retención", "La llave de paso con grifo de vaciado", "El armario del contador general", "El filtro de la instalación general"], correcta: 0 },
  { enunciado: "¿A partir de qué longitud de tubería de ida es obligatoria una red de retorno en una instalación de ACS?", explicacion: "A partir de 15 metros.", dificultad: "media", opciones: ["15 metros", "5 metros", "50 metros", "No es obligatoria en ningún caso, con independencia de la longitud"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Instalación general", definicion: "Parte de la instalación de suministro comprendida entre la acometida y las derivaciones colectivas o particulares, que incluye la llave de corte general, el filtro, el contador general, el tubo de alimentación y el distribuidor principal." },
  { tema_slug: TEMA, seccion: S1, termino: "Distribuidor principal", definicion: "Tramo de la instalación general que reparte el agua desde el tubo de alimentación hacia las ascendentes o derivaciones colectivas." },
  { tema_slug: TEMA, seccion: S2, termino: "Caudal instantáneo mínimo", definicion: "Caudal mínimo que debe suministrarse a cada tipo de aparato sanitario para su correcto funcionamiento, fijado por la tabla 2.1 del CTE DB-HS4." },
  { tema_slug: TEMA, seccion: S2, termino: "Fluxor", definicion: "Dispositivo de descarga directa desde la red, sin depósito intermedio, que exige un caudal instantáneo mucho mayor que una cisterna convencional." },
  { tema_slug: TEMA, seccion: S3, termino: "Ascendente o montante", definicion: "Tubería vertical de la instalación general que discurre por zonas de uso común y distribuye el agua a las distintas plantas de un edificio." },
  { tema_slug: TEMA, seccion: S3, termino: "Sistema antirretorno", definicion: "Dispositivo que impide la inversión del sentido del flujo de agua, obligatorio en varios puntos de la instalación según el CTE DB-HS4." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 8 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 8, orden: 8, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-284 creado y vinculado como Tema 8 de Oficial Fontanero.");

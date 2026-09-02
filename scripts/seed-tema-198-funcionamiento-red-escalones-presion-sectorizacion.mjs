/**
 * Crea tema-198: "Funcionamiento general de la red. Escalones de presión.
 * Sectorización" — Tema 18 (numero=18, bloque-2) de Oficial Guardallaves
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 16 oficial del Anexo I (bases2110.pdf, línea 940):
 *   "Funcionamiento general de la red. Escalones de presión.
 *   Sectorización."
 *
 * Fuentes primarias verificadas y leídas en esta sesión:
 * - Ayuntamiento de Zaragoza, "Red de abastecimiento de agua"
 *   (https://www.zaragoza.es/sede/portal/infraestructuras/agua/red): las
 *   cinco zonas de presión de la ciudad (Casablanca, Valdespartera,
 *   Canteras, Leones-Academia, Ecociudad) y el sistema de telecontrol y
 *   sectorización (unos 40 sectores operativos en 2019), ya citados en
 *   tema-187.
 * - Ordenanza Municipal para la Ecoeficiencia y la Calidad de la Gestión
 *   Integral del Agua (OMECGIA): art. 9 (la red como bien de dominio
 *   público municipal y competencia obligatoria del Ayuntamiento), art.
 *   10.2 (obligación de estudio de sectorización en proyectos de
 *   urbanización de más de tres hectáreas) y art. 13 (criterios para el
 *   suministro en alta a poblaciones próximas).
 *
 * Tres secciones:
 * 1. funcionamiento-general-red-zonas-presion
 * 2. escalones-presion-cotas-abastecimiento
 * 3. sectorizacion-telecontrol-omecgia
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-198-funcionamiento-red-escalones-presion-sectorizacion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-198";
const OPOSICION = "oficial-guardallaves-ayto-zaragoza";
const BLOQUE_2_ID = "5bb8da57-00c3-4865-a0a1-651b70c85ba0";

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
  titulo: "Funcionamiento general de la red. Escalones de presión. Sectorización",
  descripcion: "Funcionamiento general de la red como servicio público municipal (art. 9 OMECGIA). Las cinco zonas de presión de Zaragoza. Sectorización y telecontrol (art. 10.2 OMECGIA).",
  contenido: "Desarrolla el funcionamiento general de la red de abastecimiento de Zaragoza como bien de servicio público de dominio municipal, las distintas zonas o escalones de presión en que se organiza la ciudad según la cota de cada depósito, y la sectorización de la red apoyada en el sistema de telecontrol, incluyendo la obligación de estudio de sectorización en las nuevas urbanizaciones de cierta superficie.",
  enlaces_boe: [
    "https://www.zaragoza.es/sede/portal/infraestructuras/agua/red",
    "https://www.zaragoza.es/contenidos/medioambiente/Ordenanzaagua.pdf",
  ],
  indice_estudio: [
    { url: "https://www.zaragoza.es/contenidos/medioambiente/Ordenanzaagua.pdf", titulo: "Funcionamiento general de la red: servicio público municipal", seccion: "funcionamiento-general-red-zonas-presion", articulos: "OMECGIA, art. 9" },
    { url: "https://www.zaragoza.es/sede/portal/infraestructuras/agua/red", titulo: "Escalones de presión: las cinco zonas de Zaragoza", seccion: "escalones-presion-cotas-abastecimiento", articulos: "Ayuntamiento de Zaragoza — Red de abastecimiento de agua" },
    { url: "https://www.zaragoza.es/contenidos/medioambiente/Ordenanzaagua.pdf", titulo: "Sectorización y telecontrol", seccion: "sectorizacion-telecontrol-omecgia", articulos: "OMECGIA, art. 10.2; Ayuntamiento de Zaragoza — Red de abastecimiento de agua" },
  ],
}]);

const S1 = "funcionamiento-general-red-zonas-presion";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué naturaleza jurídica tienen las redes de abastecimiento y saneamiento, según el art. 9.2 de la OMECGIA?", reverso: "Son bienes de servicio público de dominio público municipal" },
  { anverso: "¿A quién corresponde la prestación del servicio de abastecimiento y qué carácter tiene, según el art. 9.1 de la OMECGIA?", reverso: "Es competencia municipal y tiene carácter obligatorio, con los límites previstos en la propia ordenanza" },
  { anverso: "¿Qué derecho ostenta el municipio sobre la vía pública en relación con las infraestructuras de abastecimiento, según el art. 9.3 de la OMECGIA?", reverso: "El derecho de realizar por sí, mediante la entidad gestora del servicio, o a través de empresas adjudicatarias, cualquier trabajo de construcción, reparación, remoción o reposición de infraestructuras que requiera la instalación, mejora o mantenimiento del servicio" },
  { anverso: "¿Qué requiere la ejecución de instalaciones y redes de abastecimiento y alcantarillado, según el art. 9.4 de la OMECGIA?", reverso: "Un proyecto de urbanización o de obras ordinarias aprobado por el Ayuntamiento de Zaragoza" },
  { anverso: "¿Cómo se abastece principalmente la red de Zaragoza, en cuanto a su funcionamiento general: por gravedad o por bombeo?", reverso: "De forma mixta: el agua se almacena por gravedad en el depósito central de Casablanca tras su potabilización, y desde ahí se distribuye tanto de forma directa como bombeándola hacia los depósitos secundarios situados en otras zonas de la ciudad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué naturaleza jurídica tienen las redes de abastecimiento, según el art. 9.2 de la OMECGIA?", explicacion: "Son bienes de servicio público de dominio público municipal.", dificultad: "media", opciones: ["Bienes de servicio público de dominio público municipal", "Bienes de titularidad privada gestionados por una concesionaria", "Bienes de titularidad estatal cedidos en uso al Ayuntamiento", "Bienes de titularidad autonómica cedidos en uso al Ayuntamiento"], correcta: 0 },
  { enunciado: "¿Qué carácter tiene la prestación del servicio de abastecimiento, según el art. 9.1 de la OMECGIA?", explicacion: "Competencia municipal y de carácter obligatorio.", dificultad: "media", opciones: ["Competencia municipal de carácter obligatorio", "Competencia autonómica de carácter voluntario", "Competencia estatal de carácter obligatorio", "Competencia municipal de carácter voluntario"], correcta: 0 },
  { enunciado: "¿Qué derecho ostenta el municipio sobre la vía pública respecto a las infraestructuras de abastecimiento?", explicacion: "El derecho a realizar obras de construcción, reparación o reposición de esas infraestructuras.", dificultad: "media", opciones: ["El derecho a realizar obras de construcción, reparación o reposición", "El derecho exclusivo a facturar el consumo de agua de cada abonado", "El derecho exclusivo a autorizar bocas de riego en zonas privadas", "El derecho exclusivo a establecer el precio del agua en alta"], correcta: 0 },
  { enunciado: "¿Qué requiere la ejecución de nuevas instalaciones de abastecimiento, según el art. 9.4 de la OMECGIA?", explicacion: "Un proyecto de urbanización u obras ordinarias aprobado por el Ayuntamiento.", dificultad: "dificil", opciones: ["Un proyecto aprobado por el Ayuntamiento de Zaragoza", "Únicamente la comunicación previa del propietario del terreno", "Únicamente la autorización del organismo de cuenca competente", "Ningún requisito adicional distinto del pago de la tasa correspondiente"], correcta: 0 },
  { enunciado: "¿Cómo se abastece principalmente la red de Zaragoza, en cuanto a su funcionamiento general?", explicacion: "De forma mixta: almacenamiento en Casablanca y distribución directa o bombeada.", dificultad: "media", opciones: ["De forma mixta: almacenamiento central y distribución directa o bombeada", "Exclusivamente por gravedad desde el embalse de Yesa sin depósitos", "Exclusivamente por bombeo directo desde el río Ebro sin depósitos", "Exclusivamente mediante cisternas repartidas por cada barrio"], correcta: 0 },
]);

const S2 = "escalones-presion-cotas-abastecimiento";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un escalón (o zona) de presión en una red de abastecimiento?", reverso: "Un área de la ciudad abastecida desde un mismo depósito o punto de referencia de presión, de forma que todos sus puntos reciben un rango de presión relativamente homogéneo, distinto del de otras zonas abastecidas desde otro depósito o cota diferente" },
  { anverso: "¿Cuántas zonas de presión principales tiene la red de abastecimiento de Zaragoza?", reverso: "Cinco: Casablanca, Valdespartera, Canteras, Leones-Academia y Ecociudad" },
  { anverso: "¿Por qué es necesario dividir una ciudad extensa como Zaragoza en varias zonas de presión, en lugar de abastecerla toda desde un único punto?", reverso: "Porque el desnivel entre distintas zonas de la ciudad es demasiado grande para mantener una presión adecuada en todos los puntos desde un único depósito: una presión suficiente en las zonas más altas resultaría excesiva en las más bajas, y viceversa" },
  { anverso: "¿Qué relación existe entre la cota de un depósito y la presión disponible en los puntos que abastece?", reverso: "A mayor diferencia de cota entre el depósito y el punto de consumo, mayor es la presión disponible en ese punto (y a la inversa, un punto próximo en cota al depósito recibe menos presión)" },
  { anverso: "¿Qué elemento técnico permite, dentro de una misma zona de presión, adaptar la presión disponible a las necesidades concretas de un tramo o de un abonado?", reverso: "Las válvulas reductoras de presión, que reducen y estabilizan la presión de entrada a un valor inferior más adecuado para el tramo o la instalación situada aguas abajo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un escalón o zona de presión en una red de abastecimiento?", explicacion: "Un área abastecida desde un mismo depósito con un rango de presión homogéneo.", dificultad: "facil", opciones: ["Un área abastecida desde un mismo depósito con presión homogénea", "Un tramo de conducción de un único material de construcción", "Un punto exclusivo de medición de la calidad del agua", "Un punto exclusivo de facturación del consumo municipal"], correcta: 0 },
  { enunciado: "¿Cuántas zonas de presión principales tiene la red de abastecimiento de Zaragoza?", explicacion: "Cinco.", dificultad: "media", opciones: ["Cinco", "Dos", "Diez", "Tres"], correcta: 0 },
  { enunciado: "¿Por qué es necesario dividir Zaragoza en varias zonas de presión?", explicacion: "Porque el desnivel entre zonas es demasiado grande para una presión homogénea desde un único punto.", dificultad: "media", opciones: ["Porque el desnivel entre zonas es demasiado grande para un único punto", "Porque así lo exige exclusivamente la ordenanza fiscal del agua", "Porque cada zona de presión tiene un material de tubería distinto", "Porque cada zona de presión corresponde a un distrito administrativo"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre la cota de un depósito y la presión disponible en los puntos que abastece?", explicacion: "A mayor diferencia de cota, mayor presión disponible en ese punto.", dificultad: "media", opciones: ["A mayor diferencia de cota, mayor presión disponible", "A mayor diferencia de cota, menor presión disponible", "La cota del depósito no influye en la presión disponible", "La presión disponible depende exclusivamente del material de la tubería"], correcta: 0 },
  { enunciado: "¿Qué elemento permite adaptar la presión dentro de una misma zona a las necesidades de un tramo concreto?", explicacion: "Las válvulas reductoras de presión.", dificultad: "dificil", opciones: ["Las válvulas reductoras de presión", "Las válvulas de mariposa de eje excéntrico", "Los hidrantes bajo tierra normalizados", "Los contadores de chorro único instalados en la zona"], correcta: 0 },
]);

const S3 = "sectorizacion-telecontrol-omecgia";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la sectorización de una red de abastecimiento?", reverso: "La división de la red en subzonas (sectores) delimitadas mediante válvulas, cada una con su propio punto de medición de caudal de entrada, lo que permite gestionar, monitorizar y controlar cada sector de forma independiente" },
  { anverso: "¿Cuántos sectores operativos tenía aproximadamente la red de Zaragoza en 2019, y qué porcentaje de la superficie representaban?", reverso: "Unos 40 sectores, que representaban más del 50% de la superficie total de la ciudad" },
  { anverso: "¿Qué exige el art. 10.2 de la OMECGIA en los proyectos de urbanización de superficie superior a tres hectáreas?", reverso: "Un estudio de sectorización de la red, que determine las válvulas a accionar, la situación del contador y las presiones resultantes de cada sector" },
  { anverso: "¿Qué papel cumple el telecontrol dentro del sistema de sectorización de Zaragoza?", reverso: "Monitorizar a distancia la potabilizadora, los depósitos, los bombeos y los caudales de entrada de cada sector, permitiendo una gestión más eficiente de la red y una detección más temprana de fugas o incidencias" },
  { anverso: "¿Qué beneficios aporta, en conjunto, la combinación de sectorización y telecontrol en una red de abastecimiento?", reverso: "Mejora la eficiencia de la red (menor volumen de agua no registrada), facilita la detección temprana de fugas, permite un mantenimiento más planificado, y agiliza la localización de las válvulas necesarias en caso de avería o corte programado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la sectorización de una red de abastecimiento?", explicacion: "La división de la red en subzonas delimitadas por válvulas, con medición de caudal propia.", dificultad: "facil", opciones: ["La división de la red en subzonas delimitadas por válvulas", "La clasificación de las tuberías según su material de fabricación", "La clasificación de los abonados según su calibre de contador", "La división administrativa de la ciudad en distritos municipales"], correcta: 0 },
  { enunciado: "¿Cuántos sectores operativos tenía aproximadamente la red de Zaragoza en 2019?", explicacion: "Unos 40 sectores, con más del 50% de la superficie de la ciudad.", dificultad: "dificil", opciones: ["Unos 40 sectores", "Unos 5 sectores", "Unos 400 sectores", "Un único sector para toda la ciudad"], correcta: 0 },
  { enunciado: "¿Qué exige el art. 10.2 de la OMECGIA en urbanizaciones de más de tres hectáreas?", explicacion: "Un estudio de sectorización que determine válvulas, contador y presiones resultantes.", dificultad: "dificil", opciones: ["Un estudio de sectorización de la red", "Una declaración tributaria previa a la conexión al colector", "Un certificado de profesionalidad del instalador de la obra", "Una autorización previa del organismo de cuenca competente"], correcta: 0 },
  { enunciado: "¿Qué papel cumple el telecontrol dentro del sistema de sectorización de Zaragoza?", explicacion: "Monitoriza a distancia la potabilizadora, los depósitos, los bombeos y los caudales.", dificultad: "media", opciones: ["Monitoriza a distancia la potabilizadora, depósitos y caudales", "Sustituye por completo la necesidad de válvulas de sectorización", "Factura de forma automática el consumo de cada sector de la red", "Repara automáticamente cualquier avería detectada en un sector"], correcta: 0 },
  { enunciado: "¿Qué beneficio aporta la combinación de sectorización y telecontrol en la red?", explicacion: "Mejora la eficiencia y facilita la detección temprana de fugas.", dificultad: "media", opciones: ["Mejora la eficiencia y facilita la detección temprana de fugas", "Elimina por completo la necesidad de personal de guardallaves", "Aumenta de forma directa el consumo total de agua de la ciudad", "No aporta ningún beneficio adicional frente a una red no sectorizada"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 18 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 18, orden: 18, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-198 creado y vinculado como Tema 18 de Oficial Guardallaves.");

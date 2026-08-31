/**
 * Crea tema-107: "Interpretación cartográfica" — Tema 22 (numero=22,
 * bloque-2) de Oficial Agente Inspector (Ayto. Zaragoza). Cierra la
 * parte específica de esta oposición.
 *
 * Corresponde al TEMA 20 oficial del Anexo I (bases2110.pdf):
 *   "Interpretación cartográfica: sistemas de coordenadas, coordenadas
 *   UTM, sistema geodésico de referencia, escalas, curvas de nivel,
 *   equidistancia y signos convencionales. Cálculo sobre plano de
 *   distancias, pendientes, altitudes, superficies y volúmenes.
 *   Georreferenciación. Trazados de alineaciones y perpendiculares sobre
 *   el terreno. Uso de clisímetros, brújula y de la alidada de pínulas.
 *   Aplicaciones de los receptores GPS en los trabajos de campo.
 *   Infraestructura de Datos Espaciales de Aragón: definición, objetivos,
 *   aplicaciones y servicios Cartografía. Bases de datos oficiales en
 *   red, de acceso a archivos oficiales, Visualizadores y GIS aplicados
 *   a la gestión del patrimonio, en concreto el del Catastro Virtual,
 *   Sistema de Información Geográfica de Parcelas Agrarias (SIGPAC). y
 *   temáticos tales como DARP, o sectoriales del INAGA, tales como
 *   INACOTOS, INAVIAS, etc."
 *
 * Fuente primaria verificada en este turno: la Infraestructura de Datos
 * Espaciales de Aragón (IDEAragón), desarrollada por el Instituto
 * Geográfico de Aragón (IGEAR), ofrece un visor cartográfico en línea
 * con capas temáticas del territorio aragonés; el INAGA dispone de un
 * Sistema de Información Geográfica de expedientes y visores temáticos
 * propios sobre esa misma infraestructura. Los visores temáticos
 * concretos que cita literalmente el temario oficial (DARP, INACOTOS,
 * INAVIAS) se recogen tal y como los nombra el enunciado oficial, sin
 * fabricar detalle funcional no verificado sobre cada uno. El resto del
 * contenido (sistemas de coordenadas, UTM, escalas, curvas de nivel,
 * instrumentos de campo) es conocimiento técnico consolidado de
 * cartografía y topografía básica.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-107-interpretacion-cartografica.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-107";
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
  titulo: "Interpretación cartográfica",
  descripcion: "Sistemas de coordenadas y UTM. Escalas, curvas de nivel y cálculos sobre plano. Instrumentos de campo: clisímetro, brújula, alidada, GPS. Infraestructura de Datos Espaciales de Aragón, SIGPAC y visores del INAGA.",
  contenido: "Desarrolla los sistemas de coordenadas y la proyección UTM, las escalas y curvas de nivel con los cálculos básicos sobre plano (distancias, pendientes, altitudes, superficies), los instrumentos de campo (clisímetro, brújula, alidada de pínulas, receptores GPS), y las herramientas cartográficas oficiales: la Infraestructura de Datos Espaciales de Aragón (IDEAragón), el Catastro Virtual, el SIGPAC y los visores temáticos del INAGA.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Sistemas de coordenadas, UTM y escalas", seccion: "sistemas-coordenadas-utm-escalas", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Curvas de nivel, cálculos sobre plano e instrumentos de campo", seccion: "curvas-nivel-calculos-instrumentos-campo", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "IDEAragón, SIGPAC y visores del INAGA", seccion: "idearagon-sigpac-visores-inaga", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "sistemas-coordenadas-utm-escalas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un sistema de coordenadas geográficas?", reverso: "Un sistema que localiza cualquier punto de la superficie terrestre mediante dos valores angulares, latitud y longitud, referidos al ecuador y al meridiano de origen" },
  { anverso: "¿Qué es la proyección UTM (Universal Transversal Mercator)?", reverso: "Un sistema de proyección cartográfica que divide la superficie terrestre en husos de 6° de longitud, representando las coordenadas en metros (X, Y) sobre un plano, facilitando cálculos de distancias y superficies frente a las coordenadas geográficas angulares" },
  { anverso: "¿Qué es el sistema geodésico de referencia y cuál es el oficial vigente en España?", reverso: "El modelo matemático que define la forma de la Tierra y sirve de base a las coordenadas; el sistema oficial vigente en España es el ETRS89 (European Terrestrial Reference System 1989), que sustituyó al antiguo datum ED50" },
  { anverso: "¿Qué es la escala de un plano o mapa?", reverso: "La relación matemática entre una distancia medida sobre el plano y la distancia real correspondiente sobre el terreno (por ejemplo, una escala 1:5.000 significa que 1 cm del plano equivale a 5.000 cm, es decir, 50 m, en la realidad)" },
  { anverso: "¿Qué diferencia hay entre una escala grande y una escala pequeña?", reverso: "Una escala grande (por ejemplo, 1:1.000) representa poca superficie con mucho detalle; una escala pequeña (por ejemplo, 1:50.000) representa mucha superficie con menos detalle" },
  { anverso: "¿Qué son los signos convencionales en un mapa topográfico?", reverso: "Los símbolos normalizados que representan de forma simplificada elementos del terreno (carreteras, edificaciones, vegetación, cursos de agua) para facilitar la lectura rápida del mapa" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un sistema de coordenadas geográficas?", explicacion: "Localiza puntos mediante latitud y longitud.", dificultad: "facil", opciones: ["Localiza puntos mediante latitud y longitud", "Un sistema exclusivo de coordenadas UTM", "Un tipo de escala cartográfica", "Un instrumento de medición de campo"], correcta: 0 },
  { enunciado: "¿Qué es la proyección UTM?", explicacion: "Un sistema que divide la Tierra en husos y representa coordenadas en metros.", dificultad: "media", opciones: ["Divide la Tierra en husos y usa coordenadas en metros", "Un sistema exclusivamente de coordenadas angulares", "Un tipo de curva de nivel", "Un instrumento de medición de pendientes"], correcta: 0 },
  { enunciado: "¿Cuál es el sistema geodésico de referencia oficial vigente en España?", explicacion: "El ETRS89, que sustituyó al datum ED50.", dificultad: "media", opciones: ["ETRS89", "ED50 (vigente actualmente)", "WGS72", "No existe un sistema oficial en España"], correcta: 0 },
  { enunciado: "¿Qué representa una escala 1:5.000 en un plano?", explicacion: "1 cm del plano equivale a 5.000 cm (50 m) en la realidad.", dificultad: "media", opciones: ["1 cm equivale a 50 m en la realidad", "1 cm equivale a 5 m en la realidad", "1 cm equivale a 500 m en la realidad", "1 metro equivale a 5.000 km"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre escala grande y pequeña?", explicacion: "La grande representa poca superficie con mucho detalle; la pequeña, mucha superficie con menos detalle.", dificultad: "media", opciones: ["Grande: poca superficie, mucho detalle", "Son términos exactamente sinónimos", "La pequeña siempre tiene más detalle", "No existe diferencia real entre ambas"], correcta: 0 },
  { enunciado: "¿Qué son los signos convencionales de un mapa topográfico?", explicacion: "Símbolos normalizados que representan elementos del terreno.", dificultad: "facil", opciones: ["Símbolos normalizados de elementos del terreno", "Un tipo de coordenada UTM", "Un instrumento de medición de campo", "Un tipo de proyección cartográfica"], correcta: 0 },
]);

const S2 = "curvas-nivel-calculos-instrumentos-campo";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una curva de nivel?", reverso: "Una línea imaginaria (representada en el mapa) que une todos los puntos del terreno que tienen la misma altitud sobre el nivel del mar" },
  { anverso: "¿Qué es la equidistancia entre curvas de nivel?", reverso: "La diferencia de altitud constante entre dos curvas de nivel consecutivas de un mismo mapa (por ejemplo, 10 metros), que determina el nivel de detalle del relieve representado" },
  { anverso: "¿Qué indica que las curvas de nivel estén muy juntas o muy separadas en un mapa?", reverso: "Curvas muy juntas indican una pendiente pronunciada del terreno; curvas muy separadas indican una pendiente suave o terreno prácticamente llano" },
  { anverso: "¿Cómo se calcula la pendiente de un terreno entre dos puntos a partir de un plano?", reverso: "Dividiendo el desnivel (diferencia de altitud) entre la distancia horizontal recorrida entre ambos puntos, expresando el resultado en porcentaje o en grados" },
  { anverso: "¿Cómo se calcula una distancia real a partir de una distancia medida sobre un plano y su escala?", reverso: "Multiplicando la distancia medida sobre el plano por el denominador de la escala (por ejemplo, 3 cm en un plano a escala 1:10.000 equivalen a 30.000 cm, es decir, 300 m reales)" },
  { anverso: "¿Qué es un clisímetro y para qué se usa en trabajos de campo?", reverso: "Un instrumento portátil que mide directamente la pendiente o inclinación del terreno, orientándolo visualmente sobre la línea de máxima pendiente" },
  { anverso: "¿Qué es una brújula y para qué se usa en trabajos de campo?", reverso: "Un instrumento que indica la dirección del norte magnético, empleado para orientarse, tomar rumbos y trasladar direcciones entre el terreno y el plano" },
  { anverso: "¿Qué es la alidada de pínulas y para qué se emplea?", reverso: "Un instrumento topográfico sencillo, formado por una regla con dos pínulas de visión alineada, usado tradicionalmente para trazar y comprobar alineaciones sobre el terreno" },
  { anverso: "¿Qué es el trazado de una perpendicular sobre el terreno en trabajos de replanteo?", reverso: "La operación de marcar sobre el terreno una línea que forma un ángulo de 90° respecto a una alineación de referencia, empleando instrumentos como la escuadra óptica, la alidada o métodos geométricos básicos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una curva de nivel?", explicacion: "Una línea que une puntos del terreno con la misma altitud.", dificultad: "facil", opciones: ["Una línea que une puntos de igual altitud", "Un tipo de escala cartográfica", "Un instrumento de medición de pendientes", "Un sistema de coordenadas UTM"], correcta: 0 },
  { enunciado: "¿Qué es la equidistancia entre curvas de nivel?", explicacion: "La diferencia de altitud constante entre curvas consecutivas.", dificultad: "media", opciones: ["La diferencia de altitud constante entre curvas", "La distancia horizontal entre dos puntos", "Un tipo de proyección cartográfica", "Un instrumento de medición de campo"], correcta: 0 },
  { enunciado: "¿Qué indican curvas de nivel muy juntas en un mapa?", explicacion: "Una pendiente pronunciada del terreno.", dificultad: "media", opciones: ["Una pendiente pronunciada", "Un terreno prácticamente llano", "Un error de escala del mapa", "La presencia de un curso de agua"], correcta: 0 },
  { enunciado: "¿Cómo se calcula la pendiente de un terreno entre dos puntos?", explicacion: "Dividiendo el desnivel entre la distancia horizontal.", dificultad: "media", opciones: ["Desnivel dividido entre distancia horizontal", "Distancia horizontal dividida entre desnivel", "Multiplicando desnivel por escala", "Sumando desnivel y distancia horizontal"], correcta: 0 },
  { enunciado: "¿Qué es un clisímetro?", explicacion: "Un instrumento que mide directamente la pendiente del terreno.", dificultad: "media", opciones: ["Un instrumento que mide la pendiente del terreno", "Un instrumento que indica el norte magnético", "Un tipo de curva de nivel", "Un receptor de señal GPS"], correcta: 0 },
  { enunciado: "¿Para qué se usa una brújula en trabajos de campo?", explicacion: "Para orientarse y tomar rumbos respecto al norte magnético.", dificultad: "facil", opciones: ["Para orientarse y tomar rumbos", "Para medir distancias sobre plano", "Para medir la altitud exacta", "Para calcular superficies de parcelas"], correcta: 0 },
  { enunciado: "¿Para qué se emplea la alidada de pínulas?", explicacion: "Para trazar y comprobar alineaciones sobre el terreno.", dificultad: "media", opciones: ["Para trazar y comprobar alineaciones", "Para medir la pendiente del terreno", "Para determinar coordenadas GPS", "Para calcular superficies en un plano"], correcta: 0 },
]);

const S3 = "idearagon-sigpac-visores-inaga";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué son los receptores GPS y qué aplicación tienen en los trabajos de campo de un agente inspector?", reverso: "Dispositivos que determinan la posición geográfica mediante señales de satélite; permiten geolocalizar con precisión incidencias, puntos de inspección o elementos del territorio directamente sobre el terreno" },
  { anverso: "¿Qué es la georreferenciación?", reverso: "El proceso de asignar a un dato, imagen o elemento (por ejemplo, una fotografía de una incidencia) unas coordenadas geográficas concretas, permitiendo situarlo con precisión sobre un mapa o sistema de información geográfica" },
  { anverso: "¿Qué es la Infraestructura de Datos Espaciales de Aragón (IDEAragón)?", reverso: "El conjunto organizado de datos geográficos del territorio aragonés, accesible por internet, desarrollado por el Instituto Geográfico de Aragón (IGEAR), que ofrece un visor cartográfico con capas temáticas (medio ambiente, urbanismo, hidrografía, vías, usos del suelo)" },
  { anverso: "¿Qué es el Catastro Virtual como herramienta de consulta cartográfica?", reverso: "El visor en línea de la Dirección General del Catastro que permite consultar de forma gratuita la información catastral (parcela, superficie, referencia catastral) georreferenciada sobre una base cartográfica" },
  { anverso: "¿Qué es el SIGPAC (Sistema de Información Geográfica de Parcelas Agrícolas)?", reverso: "Un sistema de información geográfica oficial que identifica y delimita gráficamente las parcelas agrícolas de España, utilizado como base para la gestión y control de las ayudas de la PAC" },
  { anverso: "¿Qué son los visores temáticos sectoriales del INAGA, como los que cita el temario oficial (DARP, INACOTOS, INAVIAS)?", reverso: "Herramientas de visualización cartográfica del Instituto Aragonés de Gestión Ambiental (INAGA), apoyadas en la Infraestructura de Datos Espaciales de Aragón, que muestran información sectorial específica (agraria, cinegética, de vías, entre otras) para su consulta rápida por internet" },
  { anverso: "¿Por qué son útiles estas herramientas (IDEAragón, Catastro Virtual, SIGPAC, visores del INAGA) para el trabajo de un agente inspector municipal?", reverso: "Permiten consultar de forma ágil información oficial georreferenciada (titularidad, usos del suelo, clasificación de terrenos, límites administrativos) directamente relacionada con las incidencias e inspecciones que debe realizar sobre el territorio" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué aplicación tienen los receptores GPS en trabajos de campo de un agente inspector?", explicacion: "Geolocalizar con precisión incidencias o elementos del territorio.", dificultad: "facil", opciones: ["Geolocalizar con precisión incidencias del territorio", "Medir exclusivamente la pendiente del terreno", "Sustituir por completo a los mapas topográficos", "Solo sirven para trazar perpendiculares"], correcta: 0 },
  { enunciado: "¿Qué es la georreferenciación?", explicacion: "Asignar coordenadas geográficas a un dato o elemento.", dificultad: "media", opciones: ["Asignar coordenadas geográficas a un dato", "Un tipo de escala cartográfica", "Un instrumento de medición de campo", "Un sistema de curvas de nivel"], correcta: 0 },
  { enunciado: "¿Qué es IDEAragón?", explicacion: "La infraestructura de datos geográficos de Aragón, desarrollada por el IGEAR.", dificultad: "media", opciones: ["La infraestructura de datos geográficos de Aragón", "Un tipo de licencia ambiental municipal", "Un catálogo de especies amenazadas", "Un plan de protección civil"], correcta: 0 },
  { enunciado: "¿Qué es el Catastro Virtual?", explicacion: "El visor en línea del Catastro para consultar información catastral georreferenciada.", dificultad: "media", opciones: ["El visor en línea de información catastral", "Un sistema de coordenadas UTM", "Un instrumento de medición de pendientes", "Un tipo de curva de nivel"], correcta: 0 },
  { enunciado: "¿Qué es el SIGPAC?", explicacion: "El sistema que identifica y delimita las parcelas agrícolas, base para las ayudas de la PAC.", dificultad: "media", opciones: ["El sistema que delimita parcelas agrícolas", "Un catálogo de especies exóticas invasoras", "Un visor exclusivo de vías pecuarias", "Un instrumento de medición de campo"], correcta: 0 },
  { enunciado: "¿Qué son los visores temáticos sectoriales del INAGA?", explicacion: "Herramientas de visualización cartográfica de información sectorial específica.", dificultad: "media", opciones: ["Herramientas de visualización de información sectorial", "Un tipo de licencia ambiental municipal", "Un instrumento físico de medición de campo", "Un catálogo estatal de especies amenazadas"], correcta: 0 },
  { enunciado: "¿Por qué son útiles estas herramientas cartográficas para un agente inspector municipal?", explicacion: "Permiten consultar ágilmente información oficial georreferenciada relevante para sus inspecciones.", dificultad: "media", opciones: ["Permiten consultar información oficial georreferenciada", "No tienen ninguna utilidad práctica real", "Solo sirven para la gestión de la PAC", "Solo son accesibles para el personal técnico"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 22 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 22, orden: 22, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-107 creado y vinculado como Tema 22 de Oficial Agente Inspector.");
console.log("\n🎉 Parte específica de Oficial Agente Inspector COMPLETA (16 temas: tema-92 a tema-107).");

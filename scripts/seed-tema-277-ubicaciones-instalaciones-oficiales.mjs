/**
 * Crea tema-277: "Principales ubicaciones de instalaciones y edificios
 * oficiales en Zaragoza y barrios rurales del municipio" — Tema 17
 * (numero=17, bloque-2) de Oficial Conductor, Especialidad General
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 15 oficial del Anexo I (bases2110.pdf, línea
 * 1586):
 *   "Principales ubicaciones de instalaciones y edificios oficiales en
 *   Zaragoza y barrios rurales del municipio."
 *
 * Sourcing: no es un tema de normativa, sino de conocimiento geográfico/
 * administrativo del municipio — mismo tratamiento que "conocimiento
 * técnico consolidado" aplicado a otros temas del proyecto sin ley
 * única, pero aquí con verificación directa contra el directorio
 * oficial de equipamientos municipales de zaragoza.es (búsqueda
 * realizada en esta sesión): sede de la Casa Consistorial (Plaza del
 * Pilar, 18) y la relación oficial de los 15 distritos urbanos (con
 * Junta Municipal) y 14 barrios rurales (con Junta Vecinal) del
 * municipio, verificada en zaragoza.es/sede/portal/participacion/
 * en-tu-barrio/servicio/distrito/. No se inventan direcciones concretas
 * de edificios no verificadas en esta sesión — el tema se centra en la
 * estructura territorial oficial (distritos/Juntas Municipales, barrios
 * rurales/Juntas Vecinales) y en la sede central, en lugar de un
 * listado de direcciones exactas de cada Centro Cívico o dependencia,
 * que requeriría una verificación edificio a edificio no realizada
 * aquí.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-277-ubicaciones-instalaciones-oficiales.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-277";
const OPOSICION = "oficial-conductor-general-ayto-zaragoza";
const BLOQUE_2_ID = "38c4f100-214c-45c4-8600-841993100e43";

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
  titulo: "Ubicaciones de instalaciones y edificios oficiales de Zaragoza",
  descripcion: "La Casa Consistorial, sede del Ayuntamiento de Zaragoza. Los 15 distritos urbanos y sus Juntas Municipales. Los 14 barrios rurales y sus Juntas Vecinales.",
  contenido: "Desarrolla el conocimiento básico que debe tener un Oficial Conductor sobre la estructura territorial y las principales instalaciones oficiales del municipio de Zaragoza: la Casa Consistorial como sede central del Ayuntamiento, la organización de la ciudad en 15 distritos urbanos con su correspondiente Junta Municipal, y los 14 barrios rurales del término municipal, cada uno con su propia Junta Vecinal, imprescindible para orientar con criterio los servicios de conducción municipal.",
  enlaces_boe: [
    { url: "https://www.zaragoza.es/sede/servicio/equipamiento/2184", titulo: "Casa Consistorial — Ayuntamiento de Zaragoza (directorio oficial de equipamientos)" },
    { url: "https://www.zaragoza.es/sede/portal/participacion/en-tu-barrio/servicio/distrito/", titulo: "Juntas Municipales y Juntas Vecinales — Ayuntamiento de Zaragoza" },
  ],
  indice_estudio: [
    { url: "https://www.zaragoza.es/sede/servicio/equipamiento/2184", titulo: "La Casa Consistorial, sede del Ayuntamiento", seccion: "la-casa-consistorial-sede-del-ayuntamiento", articulos: "Directorio oficial de equipamientos" },
    { url: "https://www.zaragoza.es/sede/portal/participacion/en-tu-barrio/servicio/distrito/", titulo: "Los distritos urbanos y las Juntas Municipales", seccion: "distritos-urbanos-y-juntas-municipales", articulos: "Estructura territorial oficial" },
    { url: "https://www.zaragoza.es/sede/portal/participacion/en-tu-barrio/servicio/distrito/", titulo: "Los barrios rurales y las Juntas Vecinales", seccion: "barrios-rurales-y-juntas-vecinales", articulos: "Estructura territorial oficial" },
  ],
}]);

const S1 = "la-casa-consistorial-sede-del-ayuntamiento";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Dónde se ubica la Casa Consistorial, sede central del Ayuntamiento de Zaragoza?", reverso: "En la Plaza del Pilar, número 18, ocupando una parcela entre la Basílica del Pilar y La Lonja, en pleno centro histórico de la ciudad" },
  { anverso: "¿Qué tipo de dependencias alberga con carácter general la Casa Consistorial?", reverso: "Las plantas semisótano, baja y entresuelo se destinan principalmente a uso administrativo, mientras que la planta noble se reserva a funciones representativas del Ayuntamiento" },
  { anverso: "¿Por qué es relevante que un Oficial Conductor conozca la ubicación exacta de la Casa Consistorial?", reverso: "Porque es la sede institucional de referencia del Ayuntamiento, a la que con frecuencia deben dirigirse trayectos de traslado de autoridades, documentación o material, y su localización debe conocerse sin necesidad de consultarla cada vez" },
  { anverso: "¿Qué otros edificios administrativos, más allá de la Casa Consistorial, forman parte del conjunto de equipamientos municipales de Zaragoza?", reverso: "Un amplio conjunto de Centros Cívicos, Casas de Juventud, dependencias de distrito y edificios administrativos sectoriales, recogidos en el directorio oficial de equipamientos del Ayuntamiento de Zaragoza" },
  { anverso: "¿Qué debería hacer un Oficial Conductor si tiene dudas sobre la ubicación exacta de una dependencia municipal concreta antes de un servicio?", reverso: "Consultar el directorio oficial de equipamientos municipales del Ayuntamiento de Zaragoza, la fuente de referencia más fiable y actualizada para verificar la ubicación exacta de cualquier instalación oficial del municipio" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Dónde se ubica la Casa Consistorial, sede del Ayuntamiento de Zaragoza?", explicacion: "En la Plaza del Pilar, número 18.", dificultad: "facil", opciones: ["En la Plaza del Pilar, número 18", "En la Plaza de España, número 1", "En el Paseo de la Independencia, número 30", "En la Avenida César Augusto, número 15"], correcta: 0 },
  { enunciado: "¿Qué uso tienen con carácter general las plantas semisótano, baja y entresuelo de la Casa Consistorial?", explicacion: "Uso principalmente administrativo.", dificultad: "media", opciones: ["Uso principalmente administrativo", "Uso exclusivamente representativo, sin ninguna función administrativa", "Uso exclusivamente comercial, sin ninguna dependencia municipal", "Uso exclusivamente residencial para personal municipal"], correcta: 0 },
  { enunciado: "¿Por qué es relevante que un Oficial Conductor conozca la ubicación de la Casa Consistorial?", explicacion: "Por ser la sede institucional de referencia, destino frecuente de trayectos municipales.", dificultad: "media", opciones: ["Por ser la sede institucional de referencia del Ayuntamiento", "Porque es el único edificio municipal existente en toda la ciudad", "Porque solo los Oficiales Conductores pueden acceder a ese edificio", "Porque la Casa Consistorial no forma parte del parque móvil municipal"], correcta: 0 },
  { enunciado: "¿Qué otros edificios administrativos forman parte de los equipamientos municipales de Zaragoza?", explicacion: "Centros Cívicos, Casas de Juventud, dependencias de distrito, entre otros.", dificultad: "media", opciones: ["Centros Cívicos, Casas de Juventud y dependencias de distrito", "Únicamente edificios religiosos de la ciudad de Zaragoza", "Únicamente instalaciones deportivas privadas del municipio", "Ningún otro edificio distinto de la propia Casa Consistorial"], correcta: 0 },
  { enunciado: "¿Qué debería hacer un Oficial Conductor ante dudas sobre la ubicación exacta de una dependencia municipal?", explicacion: "Consultar el directorio oficial de equipamientos del Ayuntamiento de Zaragoza.", dificultad: "dificil", opciones: ["Consultar el directorio oficial de equipamientos municipales", "Desplazarse sin ninguna comprobación previa hasta llegar por azar", "Preguntar exclusivamente a otros conductores particulares de la vía", "No existe ningún directorio oficial de equipamientos municipales"], correcta: 0 },
]);

const S2 = "distritos-urbanos-y-juntas-municipales";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿En cuántos distritos urbanos se organiza la ciudad de Zaragoza, cada uno con su propia Junta Municipal?", reverso: "En 15 distritos urbanos, cada uno de ellos con su correspondiente Junta Municipal como órgano territorial de participación y gestión desconcentrada" },
  { anverso: "¿Qué función cumple una Junta Municipal dentro de la organización territorial de Zaragoza?", reverso: "Gestionar de forma desconcentrada, con participación vecinal, los asuntos que afectan al territorio y a los vecinos de su distrito, mejorando la eficacia de los servicios públicos prestados en esa zona concreta" },
  { anverso: "¿Cuáles son algunos de los 15 distritos urbanos oficiales de Zaragoza?", reverso: "Entre otros: Centro, Casco Histórico, Delicias, Universidad, El Rabal, Actur-Rey Fernando, La Almozara, Las Fuentes, San José, Torrero, Miralbueno, Oliver-Valdefierro, Santa Isabel, Casablanca y Sur (este último, segregado de Casablanca en 2018)" },
  { anverso: "¿Por qué es relevante que un Oficial Conductor conozca los distritos urbanos de Zaragoza y su organización en Juntas Municipales?", reverso: "Porque muchos servicios municipales (traslados de material, personas o documentación) tienen como destino concreto la sede de una Junta Municipal, y conocer su distrito correspondiente ayuda a orientar con rapidez el trayecto" },
  { anverso: "¿Qué distrito urbano de Zaragoza se creó más recientemente, segregándose de otro distrito ya existente?", reverso: "El distrito Sur, creado en 2018 al segregarse del distrito de Casablanca, siendo uno de los cambios más recientes en la organización territorial de la ciudad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿En cuántos distritos urbanos se organiza la ciudad de Zaragoza?", explicacion: "En 15 distritos urbanos, cada uno con su Junta Municipal.", dificultad: "facil", opciones: ["En 15 distritos urbanos", "En 5 distritos urbanos", "En 30 distritos urbanos", "En un único distrito urbano para toda la ciudad"], correcta: 0 },
  { enunciado: "¿Qué función cumple una Junta Municipal en la organización territorial de Zaragoza?", explicacion: "Gestión desconcentrada y participativa de los asuntos del distrito.", dificultad: "media", opciones: ["Gestión desconcentrada y participativa de los asuntos del distrito", "Gestión centralizada exclusiva desde la propia Casa Consistorial", "Ninguna función real distinta de la ya asumida por la Casa Consistorial", "Gestión exclusiva de los barrios rurales, no de los distritos urbanos"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es uno de los 15 distritos urbanos oficiales de Zaragoza?", explicacion: "Delicias es uno de los 15 distritos urbanos oficiales.", dificultad: "media", opciones: ["Delicias", "Alfocea", "Movera", "Juslibol"], correcta: 0 },
  { enunciado: "¿Por qué es relevante que un Oficial Conductor conozca los distritos urbanos y sus Juntas Municipales?", explicacion: "Porque muchos servicios municipales tienen como destino la sede de una Junta Municipal.", dificultad: "media", opciones: ["Porque muchos servicios tienen como destino la sede de una Junta Municipal", "Porque solo puede circular por el distrito Centro de la ciudad", "Porque las Juntas Municipales no tienen ninguna sede física real", "Porque los distritos urbanos no tienen ninguna relación con los servicios municipales"], correcta: 0 },
  { enunciado: "¿Qué distrito urbano de Zaragoza se creó en 2018, segregándose de otro distrito existente?", explicacion: "El distrito Sur, segregado del distrito de Casablanca.", dificultad: "dificil", opciones: ["El distrito Sur, segregado del distrito de Casablanca", "El distrito Centro, segregado del distrito de Delicias", "El distrito Universidad, segregado del distrito de Torrero", "El distrito Actur-Rey Fernando, segregado del distrito de El Rabal"], correcta: 0 },
]);

const S3 = "barrios-rurales-y-juntas-vecinales";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cuántos barrios rurales tiene el término municipal de Zaragoza, cada uno con su propia Junta Vecinal?", reverso: "14 barrios rurales, cada uno con su correspondiente Junta Vecinal, órgano territorial equivalente a la Junta Municipal pero propio de las zonas rurales del municipio" },
  { anverso: "¿Qué diferencia existe entre una Junta Municipal y una Junta Vecinal?", reverso: "La Junta Municipal gestiona un distrito urbano de la ciudad; la Junta Vecinal gestiona un barrio rural del término municipal, ambas con una función equivalente de gestión desconcentrada y participativa, pero referida a un ámbito territorial distinto" },
  { anverso: "¿Cuáles son algunos de los 14 barrios rurales del municipio de Zaragoza?", reverso: "Entre otros: Alfocea, Casetas, Garrapinillos, Juslibol, La Cartuja Baja, Montañana, Monzalbarba, Movera, Peñaflor, San Gregorio, San Juan de Mozarrifar, Torrecilla de Valmadrid, Venta del Olivar y Villarrapa" },
  { anverso: "¿Por qué es especialmente importante que un Oficial Conductor conozca la ubicación relativa de los barrios rurales respecto al núcleo urbano?", reverso: "Porque suelen encontrarse a mayor distancia del centro, con accesos y tiempos de trayecto distintos a los de un servicio dentro del núcleo urbano, lo que exige planificar con más antelación un servicio con destino en uno de ellos" },
  { anverso: "¿Qué tienen en común, pese a sus diferencias, las Juntas Municipales de los distritos urbanos y las Juntas Vecinales de los barrios rurales?", reverso: "Ambas son órganos territoriales de participación ciudadana del Ayuntamiento de Zaragoza, orientados a una gestión desconcentrada que acerque los servicios municipales al territorio y a los vecinos de cada zona concreta" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuántos barrios rurales tiene el término municipal de Zaragoza?", explicacion: "14 barrios rurales, cada uno con su Junta Vecinal.", dificultad: "facil", opciones: ["14 barrios rurales", "5 barrios rurales", "30 barrios rurales", "Ningún barrio rural, al ser Zaragoza un municipio exclusivamente urbano"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre una Junta Municipal y una Junta Vecinal?", explicacion: "La Municipal gestiona un distrito urbano; la Vecinal, un barrio rural.", dificultad: "media", opciones: ["La Municipal gestiona un distrito urbano; la Vecinal, un barrio rural", "Ambos términos designan exactamente el mismo tipo de órgano territorial", "La Vecinal gestiona distritos urbanos y la Municipal barrios rurales", "Ninguna de las dos tiene ninguna función real de gestión territorial"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es uno de los 14 barrios rurales de Zaragoza?", explicacion: "Movera es uno de los 14 barrios rurales del municipio.", dificultad: "media", opciones: ["Movera", "Delicias", "Torrero", "Universidad"], correcta: 0 },
  { enunciado: "¿Por qué es importante conocer la ubicación relativa de los barrios rurales respecto al núcleo urbano?", explicacion: "Porque suelen estar a mayor distancia, con tiempos de trayecto distintos a un servicio urbano.", dificultad: "media", opciones: ["Porque suelen estar a mayor distancia, con tiempos de trayecto distintos", "Porque los barrios rurales no tienen ninguna relación real con el municipio", "Porque el acceso a los barrios rurales está siempre restringido a vehículos municipales", "Porque los barrios rurales solo pueden alcanzarse a pie, sin acceso en vehículo"], correcta: 0 },
  { enunciado: "¿Qué tienen en común las Juntas Municipales y las Juntas Vecinales de Zaragoza?", explicacion: "Ambas son órganos territoriales de participación orientados a la gestión desconcentrada.", dificultad: "dificil", opciones: ["Ambas son órganos territoriales de participación y gestión desconcentrada", "No tienen absolutamente nada en común entre sí, siendo estructuras opuestas", "Ambas dependen directamente de la Comunidad Autónoma de Aragón, no del Ayuntamiento", "Únicamente la Junta Municipal es un órgano real de participación ciudadana"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Casa Consistorial", definicion: "Edificio sede del Ayuntamiento de Zaragoza, ubicado en la Plaza del Pilar, número 18, entre la Basílica del Pilar y La Lonja." },
  { tema_slug: TEMA, seccion: S1, termino: "Directorio de equipamientos municipales", definicion: "Recurso oficial del Ayuntamiento de Zaragoza (zaragoza.es) que recoge la ubicación y los datos de contacto de las instalaciones y edificios municipales del término." },
  { tema_slug: TEMA, seccion: S2, termino: "Junta Municipal", definicion: "Órgano territorial de participación y gestión desconcentrada correspondiente a cada uno de los 15 distritos urbanos de Zaragoza." },
  { tema_slug: TEMA, seccion: S2, termino: "Distrito urbano", definicion: "Cada una de las 15 divisiones administrativas en que se organiza el núcleo urbano de Zaragoza, cada una con su propia Junta Municipal." },
  { tema_slug: TEMA, seccion: S3, termino: "Junta Vecinal", definicion: "Órgano territorial de participación y gestión desconcentrada correspondiente a cada uno de los 14 barrios rurales del término municipal de Zaragoza." },
  { tema_slug: TEMA, seccion: S3, termino: "Barrio rural", definicion: "Cada uno de los 14 núcleos de población del término municipal de Zaragoza situados fuera del núcleo urbano, con su propia Junta Vecinal." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 17 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 17, orden: 17, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-277 creado y vinculado como Tema 17 de Oficial Conductor General.");

/**
 * Crea tema-261: "Identidad Corporativa en el Ayuntamiento de Zaragoza.
 * Rótulos. Directorios. Cartelería. Logotipos" — Tema 17 (numero=17,
 * bloque-2) de Oficial Pintor, Especialidad Gráfica (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 15 oficial del Anexo I (bases2110.pdf, línea
 * 1527): "Identidad Corporativa en el Ayuntamiento de Zaragoza.
 * Rótulos. Directorios. Cartelería. Logotipos."
 *
 * Fuentes verificadas en esta sesión:
 * - Manual de Identidad Corporativa "El Bosque de los Zaragozanos"
 *   (www.zaragoza.es/cont/vistas/portal/medioambiente/
 *   elbosquedeloszaragozanos/ManualDeMarca.pdf), publicación municipal
 *   del Ayuntamiento de Zaragoza, descargada y leída íntegra en esta
 *   sesión (232 líneas de texto extraídas con pdftotext). Es el manual
 *   de identidad de una campaña municipal concreta (el proyecto de
 *   reforestación "El Bosque de los Zaragozanos"), no el manual general
 *   del logotipo institucional del Ayuntamiento — se cita aquí como
 *   ejemplo real y verificado de la estructura que sigue un manual de
 *   identidad corporativa municipal de Zaragoza (versiones de marca,
 *   área de respeto, tamaños mínimos por soporte, colores corporativos
 *   en tintas Pantone, tipografía corporativa), sin extrapolar sus
 *   datos concretos (colores, tipografías) al logotipo institucional
 *   general, que no se ha podido verificar en esta sesión.
 * - Decreto de Alcaldía de 27 de febrero de 2009, por el que se
 *   establece el Sistema de Coordinación de la Comunicación y
 *   Publicidad del Ayuntamiento de Zaragoza (www.zaragoza.es/sede/
 *   servicio/normativa/542), localizado en el portal de normativa
 *   municipal — norma marco de coordinación de la imagen institucional.
 * - Existencia verificada (sin lectura íntegra en esta sesión) de las
 *   "Aplicaciones básicas de Identidad Corporativa del Ayuntamiento de
 *   Zaragoza" (Mini manual, 2013), publicación municipal listada en el
 *   portal de publicaciones de www.zaragoza.es.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-261-identidad-corporativa-zaragoza.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-261";
const OPOSICION = "oficial-pintor-grafica-ayto-zaragoza";
const BLOQUE_2_ID = "1e5d5916-cf4a-4920-9175-579f18034ad6";

const MANUAL_BOSQUE_ZGZ = "https://www.zaragoza.es/cont/vistas/portal/medioambiente/elbosquedeloszaragozanos/ManualDeMarca.pdf";
const DECRETO_COMUNICACION_2009 = "https://www.zaragoza.es/sede/servicio/normativa/542";
const PUBLICACION_MINI_MANUAL = "https://www.zaragoza.es/sede/servicio/publicacion-municipal/11752";

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
  titulo: "Identidad corporativa en el Ayuntamiento de Zaragoza",
  descripcion: "El Sistema de Coordinación de la Comunicación y Publicidad municipal. La estructura de un manual de identidad corporativa: versiones de marca, área de respeto, tamaños mínimos y colores corporativos. Rótulos, directorios y cartelería institucional.",
  contenido: "Desarrolla la identidad corporativa aplicada al Ayuntamiento de Zaragoza: el Decreto de Alcaldía de 27 de febrero de 2009, que establece el Sistema de Coordinación de la Comunicación y Publicidad municipal, como marco general que exige coherencia en la imagen institucional; la estructura habitual de un manual de identidad corporativa municipal (versiones de marca, área de respeto, tamaños mínimos según el soporte, aplicación junto a otras marcas, colores corporativos y tipografía), ilustrada con el manual real y verificado de la campaña municipal \"El Bosque de los Zaragozanos\"; y la aplicación práctica de estos criterios a los rótulos, directorios y cartelería que el Oficial Pintor Especialidad Gráfica reproduce en dependencias e instalaciones municipales.",
  enlaces_boe: [
    { url: DECRETO_COMUNICACION_2009, titulo: "Decreto de Alcaldía 27-02-2009 — Sistema de Coordinación de la Comunicación y Publicidad" },
    { url: MANUAL_BOSQUE_ZGZ, titulo: "Manual de Identidad Corporativa — \"El Bosque de los Zaragozanos\" (Ayuntamiento de Zaragoza)" },
    { url: PUBLICACION_MINI_MANUAL, titulo: "Aplicaciones básicas de Identidad Corporativa del Ayuntamiento de Zaragoza (Mini manual, 2013)" },
  ],
  indice_estudio: [
    { url: DECRETO_COMUNICACION_2009, titulo: "El Sistema de Coordinación de la Comunicación y Publicidad municipal", seccion: "sistema-coordinacion-comunicacion-publicidad", articulos: "Decreto de Alcaldía 27-02-2009" },
    { url: MANUAL_BOSQUE_ZGZ, titulo: "La estructura de un manual de identidad corporativa municipal", seccion: "estructura-manual-identidad-corporativa", articulos: "Manual \"El Bosque de los Zaragozanos\"" },
    { url: "", titulo: "Aplicación a rótulos, directorios y cartelería institucional", seccion: "aplicacion-rotulos-directorios-carteleria", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "sistema-coordinacion-comunicacion-publicidad";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué establece el Decreto de Alcaldía de 27 de febrero de 2009 del Ayuntamiento de Zaragoza?", reverso: "El Sistema de Coordinación de la Comunicación y Publicidad del Ayuntamiento de Zaragoza, un marco normativo interno que persigue coordinar la comunicación institucional y garantizar una aplicación correcta y homogénea de la identidad visual municipal en todos sus ámbitos" },
  { anverso: "¿Por qué resulta necesario, para una organización tan extensa como un Ayuntamiento, contar con un sistema de coordinación de la comunicación y la publicidad como el establecido en 2009?", reverso: "Porque un Ayuntamiento genera comunicación institucional desde múltiples servicios y departamentos de forma simultánea, y sin una coordinación centralizada existiría el riesgo de aplicaciones incoherentes del logotipo, los colores o la tipografía, debilitando la imagen unificada de la institución" },
  { anverso: "¿Qué papel cumple el Oficial Pintor Especialidad Gráfica en la aplicación práctica de este Sistema de Coordinación de la Comunicación y Publicidad?", reverso: "Reproducir con fidelidad, en los rótulos, directorios y elementos de cartelería que ejecuta materialmente, las normas de identidad visual fijadas centralmente por el Ayuntamiento, actuando como el último eslabón técnico que traslada esas normas a la realidad física de cada instalación municipal" },
  { anverso: "¿Qué debería hacer el Oficial si recibe el encargo de un rótulo para una dependencia municipal sin ninguna especificación de identidad corporativa asociada?", reverso: "Consultar el manual de identidad corporativa municipal vigente o al servicio responsable de comunicación antes de diseñar libremente el rótulo, evitando aplicar un criterio propio que pudiera resultar incoherente con la imagen institucional establecida" },
  { anverso: "¿Qué relación existe entre este Sistema de Coordinación de la Comunicación y Publicidad y el criterio de accesibilidad ya estudiado en el tema anterior sobre señalética?", reverso: "Ambos criterios deben aplicarse de forma simultánea y no excluyente: la coherencia de identidad visual exigida por el sistema de coordinación no puede utilizarse para justificar el incumplimiento de las exigencias de accesibilidad (contraste, tamaño de letra) del RDLeg 1/2013" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué establece el Decreto de Alcaldía de 27 de febrero de 2009 del Ayuntamiento de Zaragoza?", explicacion: "El Sistema de Coordinación de la Comunicación y Publicidad municipal.", dificultad: "media", opciones: ["El Sistema de Coordinación de la Comunicación y Publicidad", "La Ordenanza de Accesibilidad del Municipio de Zaragoza", "La Ordenanza de Movilidad Urbana de Zaragoza", "El Reglamento de Policía Sanitaria Mortuoria"], correcta: 0 },
  { enunciado: "¿Por qué resulta necesario un sistema de coordinación de la comunicación en una organización como un Ayuntamiento?", explicacion: "Evita aplicaciones incoherentes de logotipo, colores o tipografía desde distintos servicios simultáneamente.", dificultad: "media", opciones: ["Evita aplicaciones incoherentes desde distintos servicios", "Un Ayuntamiento nunca genera comunicación desde varios servicios", "La coordinación centralizada nunca resulta necesaria en la práctica", "Solo resulta relevante en organizaciones de titularidad privada"], correcta: 0 },
  { enunciado: "¿Qué papel cumple el Oficial Pintor Especialidad Gráfica en la aplicación de este sistema?", explicacion: "Reproducir con fidelidad las normas de identidad visual en los elementos que ejecuta materialmente.", dificultad: "media", opciones: ["Reproducir con fidelidad las normas de identidad visual", "Ningún papel específico distinto de ejecutar cualquier diseño propio", "Elaborar personalmente el sistema de coordinación municipal", "Sustituir al servicio de comunicación en sus decisiones de diseño"], correcta: 0 },
  { enunciado: "¿Qué debería hacer el Oficial ante un encargo de rótulo sin especificación de identidad corporativa asociada?", explicacion: "Consultar el manual de identidad corporativa vigente o al servicio de comunicación antes de diseñar libremente.", dificultad: "dificil", opciones: ["Consultar el manual vigente antes de diseñar libremente", "Diseñar libremente el rótulo según su propio criterio estético", "Rechazar directamente el encargo sin ninguna consulta previa", "Aplicar siempre el mismo diseño de un encargo anterior distinto"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre este sistema de coordinación y el criterio de accesibilidad del RDLeg 1/2013?", explicacion: "Ambos deben aplicarse simultáneamente; la coherencia visual no puede justificar incumplir la accesibilidad.", dificultad: "dificil", opciones: ["Ambos criterios deben aplicarse de forma simultánea", "La identidad visual siempre prevalece sobre la accesibilidad", "La accesibilidad siempre prevalece sobre la identidad visual", "Ambos criterios resultan completamente incompatibles entre sí"], correcta: 0 },
]);

const S2 = "estructura-manual-identidad-corporativa";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué son las versiones de marca de un logotipo, concepto recogido en el manual de identidad corporativa municipal \"El Bosque de los Zaragozanos\"?", reverso: "Reducciones lógicas del logotipo general (por ejemplo, una versión completa, una versión reducida y un favicon) previstas para emplearse según las necesidades de espacio y legibilidad de cada soporte concreto, sin alterar la esencia visual de la marca" },
  { anverso: "¿Qué es el área de respeto de un logotipo, tal como se define en este manual municipal?", reverso: "Un espacio mínimo alrededor del logotipo, calculado tomando como medida de referencia el ancho de un carácter concreto (por ejemplo, la letra \"O\"), que ningún otro elemento gráfico puede invadir, garantizando la legibilidad y la correcta percepción visual de la marca" },
  { anverso: "¿Qué son los tamaños mínimos de un logotipo, y por qué el manual municipal \"El Bosque de los Zaragozanos\" establece un cuadro de medidas frecuentes según el soporte (A4, A3, mupi, cabinas)?", reverso: "Son los anchos mínimos por debajo de los cuales el logotipo pierde legibilidad; el manual fija esas medidas para cada soporte habitual, de forma que quien reproduzca la marca en cualquier formato conozca de antemano el tamaño mínimo aceptable sin necesidad de calcularlo cada vez" },
  { anverso: "¿Qué exige, con carácter general, un manual de identidad corporativa respecto a la aplicación del logotipo junto a otras marcas o logotipos colaboradores?", reverso: "Habitualmente exige una posición determinada (por ejemplo, a la derecha del resto de marcas, o en un faldón inferior), y una separación mínima entre logotipos (con frecuencia un múltiplo del área de respeto propia de cada marca), evitando que ambas marcas interfieran visualmente entre sí" },
  { anverso: "¿Qué son los colores corporativos y la tipografía corporativa, dos elementos que todo manual de identidad reserva a un apartado específico, tal como recoge el manual municipal verificado en esta sesión?", reverso: "Los colores corporativos son las tintas concretas (identificadas habitualmente mediante un sistema Pantone, con sus equivalencias CMYK y RGB) autorizadas para reproducir la marca; la tipografía corporativa es la familia tipográfica (o familias, una para el logotipo y otra para los textos generales) que debe emplearse en toda comunicación asociada a esa identidad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué son las versiones de marca de un logotipo?", explicacion: "Reducciones lógicas del logotipo general para distintas necesidades de espacio y legibilidad.", dificultad: "media", opciones: ["Reducciones lógicas del logotipo según espacio y legibilidad", "Distintos colores del logotipo sin ninguna relación con el espacio", "Distintas tipografías empleadas para el mismo logotipo", "Distintos nombres empleados para la misma institución"], correcta: 0 },
  { enunciado: "¿Qué es el área de respeto de un logotipo?", explicacion: "Un espacio mínimo alrededor del logotipo que ningún otro elemento puede invadir.", dificultad: "media", opciones: ["Un espacio mínimo que ningún otro elemento puede invadir", "El color de fondo obligatorio para aplicar el logotipo", "El tamaño máximo permitido para el logotipo", "La tipografía obligatoria del texto junto al logotipo"], correcta: 0 },
  { enunciado: "¿Por qué establece un manual de identidad un cuadro de tamaños mínimos según el soporte?", explicacion: "Fija de antemano el tamaño mínimo aceptable para cada formato habitual, evitando pérdida de legibilidad.", dificultad: "dificil", opciones: ["Fija de antemano el tamaño mínimo para cada formato habitual", "El tamaño del logotipo nunca resulta relevante según el soporte", "El tamaño mínimo siempre es idéntico en cualquier soporte", "Solo resulta relevante en soportes digitales, nunca impresos"], correcta: 0 },
  { enunciado: "¿Qué exige habitualmente un manual de identidad sobre la aplicación del logotipo junto a otras marcas?", explicacion: "Una posición determinada y una separación mínima entre logotipos.", dificultad: "media", opciones: ["Una posición determinada y una separación mínima", "Ninguna exigencia específica sobre esta aplicación conjunta", "Los logotipos siempre deben superponerse entre sí", "La separación entre logotipos nunca resulta relevante"], correcta: 0 },
  { enunciado: "¿Qué son los colores y la tipografía corporativa de un manual de identidad?", explicacion: "Las tintas Pantone autorizadas y la familia tipográfica que debe emplearse en toda comunicación asociada.", dificultad: "media", opciones: ["Las tintas y tipografía autorizadas para toda la comunicación", "Un apartado meramente decorativo sin ninguna exigencia real", "Solo resulta relevante para el propio logotipo, no para los textos", "Cada departamento puede elegir libremente sus propios colores"], correcta: 0 },
]);

const S3 = "aplicacion-rotulos-directorios-carteleria";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué debería verificar el Oficial Pintor Especialidad Gráfica antes de reproducir el logotipo del Ayuntamiento de Zaragoza en un rótulo de una dependencia municipal?", reverso: "Que emplea la versión de marca adecuada al soporte y al tamaño del rótulo, que respeta el área de respeto y el tamaño mínimo establecidos, y que utiliza los colores y la tipografía corporativa exactos indicados en el manual de identidad vigente" },
  { anverso: "¿Qué es un directorio institucional, elemento de cartelería habitual en un edificio municipal, y qué criterios de identidad corporativa debería respetar?", reverso: "Un panel que informa de la distribución de dependencias o servicios de un edificio, que debería seguir la tipografía y los colores corporativos establecidos, además de los criterios de accesibilidad (contraste, tamaño de letra) ya estudiados en el tema anterior de este bloque" },
  { anverso: "¿Qué debería hacer el Oficial si, al reproducir un rótulo institucional, el espacio físico disponible resulta menor que el tamaño mínimo establecido para el logotipo en el manual de identidad?", reverso: "Emplear una versión reducida del logotipo prevista específicamente para esa circunstancia (si el manual la contempla), o consultar al servicio responsable antes de reducir el logotipo por debajo del tamaño mínimo fijado, dado que hacerlo comprometería su legibilidad" },
  { anverso: "¿Qué relación existe entre la cartelería institucional de un edificio municipal y la señalética de seguridad ya estudiada en el tema anterior de este bloque, cuando ambas coexisten en un mismo espacio?", reverso: "Ambas deben coexistir sin interferir: la señalización de seguridad regulada por el RD 485/1997 no puede alterarse por criterios de identidad corporativa, mientras que la cartelería institucional (directorios, rótulos de dependencias) sí debe seguir el manual de identidad corporativa municipal" },
  { anverso: "¿Por qué resulta relevante para el Oficial Pintor Especialidad Gráfica dominar tanto la estructura general de un manual de identidad corporativa como sus particularidades municipales, más allá de una simple habilidad de diseño gráfico?", reverso: "Porque su trabajo diario consiste precisamente en trasladar esas normas de identidad, fijadas a nivel institucional, a la realidad física de rótulos, directorios y cartelería en decenas de dependencias e instalaciones municipales distintas, siendo el garante técnico de esa coherencia visual en el día a día" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué debería verificar el Oficial antes de reproducir el logotipo municipal en un rótulo?", explicacion: "Versión de marca adecuada, área de respeto, tamaño mínimo, colores y tipografía corporativa exactos.", dificultad: "media", opciones: ["Versión, área de respeto, tamaño y colores corporativos exactos", "Únicamente que el logotipo resulte visualmente atractivo", "Ninguna verificación adicional distinta del propio diseño del rótulo", "Únicamente el tamaño del rótulo, sin más consideraciones"], correcta: 0 },
  { enunciado: "¿Qué criterios debería respetar un directorio institucional, además de la identidad corporativa?", explicacion: "Los criterios de accesibilidad de contraste y tamaño de letra ya estudiados.", dificultad: "media", opciones: ["Los criterios de accesibilidad de contraste y tamaño de letra", "Ningún criterio adicional distinto de la identidad corporativa", "Únicamente el criterio de la señalización de seguridad", "Únicamente el criterio del propio Oficial que lo ejecuta"], correcta: 0 },
  { enunciado: "¿Qué debería hacer el Oficial si el espacio disponible resulta menor que el tamaño mínimo del logotipo?", explicacion: "Emplear una versión reducida prevista o consultar antes de reducirlo por debajo del mínimo.", dificultad: "dificil", opciones: ["Emplear una versión reducida prevista o consultar antes de reducir", "Reducir el logotipo libremente hasta que quepa en el espacio", "Sustituir directamente el logotipo por un texto sin ningún logotipo", "Ignorar el tamaño mínimo si el rótulo es de escasa importancia"], correcta: 0 },
  { enunciado: "¿Cómo deben coexistir la señalización de seguridad y la cartelería institucional en un mismo edificio municipal?", explicacion: "La de seguridad no se altera por identidad corporativa; la institucional sí sigue el manual de identidad.", dificultad: "dificil", opciones: ["La de seguridad no se altera; la institucional sigue el manual", "Ambas deben seguir siempre exactamente el mismo criterio", "La identidad corporativa siempre prevalece sobre la seguridad", "Ambas resultan completamente incompatibles entre sí"], correcta: 0 },
  { enunciado: "¿Por qué es relevante para el Oficial dominar la estructura de un manual de identidad corporativa?", explicacion: "Es el garante técnico diario de trasladar esas normas a rótulos y cartelería reales en múltiples dependencias.", dificultad: "media", opciones: ["Es el garante técnico diario de aplicar esas normas en la práctica", "Esta habilidad nunca resulta relevante para su trabajo diario", "Solo resulta relevante para el personal de comunicación municipal", "Solo resulta relevante en campañas puntuales, no en el día a día"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 17 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 17, orden: 17, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-261 creado y vinculado como Tema 17 de Oficial Pintor Gráfica.");

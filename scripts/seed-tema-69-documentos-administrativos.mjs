/**
 * Crea tema-69: "Documentos administrativos: tipos, notificación y
 * archivo" — Tema 15 (numero=15, bloque-2) de Oficial Mantenimiento
 * General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 13 oficial del Anexo I (bases2110.pdf):
 *   "Tipos de documentos administrativos. La comunicación de los actos
 *   administrativos: elementos generales de la notificación. Publicación
 *   de los actos administrativos. Archivo de la documentación
 *   administrativa. Compulsa de documentos administrativos."
 *
 * Fuente primaria: Ley 39/2015, de 1 de octubre, del Procedimiento
 * Administrativo Común de las Administraciones Públicas (LPACAP,
 * BOE-A-2015-10565) — verificada en este turno (búsqueda y confirmación
 * del título e identificador reales). En concreto, arts. 40-46 (Capítulo
 * II del Título III: notificaciones) y arts. 44-45 (publicación) para la
 * sección de comunicación/notificación de actos; y art. 27 (validez y
 * eficacia de las copias) para la sección de compulsa. La LPACAP íntegra
 * ya forma parte de la parte común de esta oposición (tema-7, numero=3);
 * este tema aporta el enfoque práctico de oficina (tipos de documentos,
 * archivo, compulsa) que no se agota en el articulado de la ley.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-69-documentos-administrativos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-69";
const OPOSICION = "oficial-mantenimiento-ayto-zaragoza";
const BLOQUE_2_ID = "336de420-fb74-4814-9d50-6e2981ed064f";
const LPACAP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565";

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
  titulo: "Documentos administrativos: tipos, notificación y archivo",
  descripcion: "Tipos de documentos administrativos. Comunicación de los actos administrativos: notificación y publicación. Archivo de la documentación administrativa. Compulsa de documentos administrativos.",
  contenido: "Desarrolla los tipos básicos de documentos administrativos, los elementos generales de la notificación y la publicación de actos administrativos según la Ley 39/2015 (LPACAP), y las nociones prácticas de archivo de documentación y compulsa de documentos administrativos.",
  enlaces_boe: [
    { url: LPACAP, titulo: "Ley 39/2015 — Procedimiento Administrativo Común de las Administraciones Públicas" },
  ],
  indice_estudio: [
    { url: "", titulo: "Tipos de documentos administrativos", seccion: "tipos-documentos-administrativos", articulos: "Conceptos fundamentales" },
    { url: LPACAP, titulo: "Notificación y publicación de actos administrativos", seccion: "notificacion-publicacion-actos-administrativos", articulos: "arts. 40-46 (notificación) y 44-45 (publicación)" },
    { url: LPACAP, titulo: "Archivo y compulsa de documentación administrativa", seccion: "archivo-compulsa-documentacion-administrativa", articulos: "art. 27 (validez y eficacia de las copias)" },
  ],
}]);

const S1 = "tipos-documentos-administrativos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una instancia (o solicitud) como documento administrativo?", reverso: "El documento por el que una persona interesada inicia un procedimiento administrativo o realiza una petición formal ante la Administración" },
  { anverso: "¿Qué es un oficio como documento administrativo?", reverso: "Un documento de comunicación entre órganos o unidades administrativas, o entre la Administración y otras entidades, con un contenido concreto y formal" },
  { anverso: "¿Qué es una certificación administrativa?", reverso: "El documento por el que un órgano competente da fe de un hecho, acto o situación que consta en sus archivos o registros" },
  { anverso: "¿Qué es una resolución administrativa?", reverso: "El acto administrativo que pone fin a un procedimiento, resolviendo las cuestiones planteadas por las personas interesadas" },
  { anverso: "¿Qué es una diligencia como documento administrativo?", reverso: "Un documento que deja constancia de hechos, actuaciones o circunstancias que se producen a lo largo de la tramitación de un expediente" },
  { anverso: "¿Qué es un expediente administrativo?", reverso: "El conjunto ordenado de documentos y actuaciones que sirven de antecedente y fundamento a una resolución administrativa, junto con las diligencias encaminadas a ejecutarla" },
  { anverso: "¿Qué es un anuncio o edicto administrativo?", reverso: "Un documento de comunicación pública que da a conocer un acto o resolución a un conjunto indeterminado de personas, habitualmente mediante su publicación en un boletín oficial" },
  { anverso: "¿Qué es una notificación como documento administrativo?", reverso: "El documento por el que se comunica formalmente a una persona interesada el contenido íntegro de una resolución o acto administrativo que le afecta" },
  { anverso: "¿Qué diferencia hay entre un documento 'original' y una 'copia' en el ámbito administrativo?", reverso: "El original es el documento primero y auténtico; la copia es su reproducción, que solo tiene la misma validez que el original si está debidamente compulsada o autenticada" },
  { anverso: "¿Qué es un registro de entrada y salida en una oficina administrativa?", reverso: "El sistema (físico o electrónico) que deja constancia oficial de la fecha y hora en que un documento entra o sale de una Administración, con efectos sobre plazos y procedimientos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una instancia como documento administrativo?", explicacion: "El documento por el que se inicia un procedimiento o se realiza una petición formal.", dificultad: "facil", opciones: ["El documento por el que se inicia un procedimiento o petición", "El acto que pone fin a un procedimiento", "Un documento de comunicación entre órganos", "Un anuncio publicado en un boletín oficial"], correcta: 0 },
  { enunciado: "¿Qué es un oficio como documento administrativo?", explicacion: "Un documento de comunicación entre órganos o unidades administrativas.", dificultad: "media", opciones: ["Un documento de comunicación entre órganos administrativos", "El documento que inicia un procedimiento", "Una certificación de un hecho", "El conjunto ordenado de un expediente"], correcta: 0 },
  { enunciado: "¿Qué es una resolución administrativa?", explicacion: "El acto que pone fin a un procedimiento resolviendo las cuestiones planteadas.", dificultad: "media", opciones: ["El acto que pone fin a un procedimiento", "Un documento de comunicación interna", "Una copia compulsada de un documento", "Un registro de entrada de documentos"], correcta: 0 },
  { enunciado: "¿Qué es un expediente administrativo?", explicacion: "El conjunto ordenado de documentos y actuaciones que fundamentan una resolución.", dificultad: "media", opciones: ["El conjunto ordenado de documentos y actuaciones", "Un único documento de notificación", "Una certificación administrativa aislada", "Un anuncio en boletín oficial"], correcta: 0 },
  { enunciado: "¿Qué es un anuncio o edicto administrativo?", explicacion: "Un documento de comunicación pública a un conjunto indeterminado de personas.", dificultad: "media", opciones: ["Comunicación pública a personas indeterminadas", "Comunicación a una persona interesada concreta", "Un documento interno entre unidades", "Una copia compulsada de un expediente"], correcta: 0 },
  { enunciado: "¿Qué comunica una notificación administrativa?", explicacion: "El contenido íntegro de una resolución o acto que afecta a una persona interesada concreta.", dificultad: "facil", opciones: ["El contenido íntegro de un acto a una persona interesada", "Un hecho indeterminado a la ciudadanía en general", "Solo el inicio de un procedimiento", "Solo el archivo de un expediente"], correcta: 0 },
  { enunciado: "¿Cuándo tiene una copia la misma validez que el documento original?", explicacion: "Cuando está debidamente compulsada o autenticada.", dificultad: "media", opciones: ["Cuando está debidamente compulsada o autenticada", "Siempre, sin ningún requisito adicional", "Nunca tiene la misma validez", "Solo si la firma la misma persona que el original"], correcta: 0 },
  { enunciado: "¿Qué función cumple el registro de entrada y salida de una oficina administrativa?", explicacion: "Dejar constancia oficial de la fecha y hora de entrada/salida de un documento, con efectos sobre plazos.", dificultad: "media", opciones: ["Dejar constancia oficial de fecha y hora con efectos en plazos", "Sustituir a la notificación formal", "Certificar hechos que constan en archivos", "Compulsar copias de documentos"], correcta: 0 },
]);

const S2 = "notificacion-publicacion-actos-administrativos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué regula la Ley 39/2015 (LPACAP) sobre la notificación de los actos administrativos?", reverso: "Los requisitos, medios y plazos para practicar las notificaciones, así como sus efectos, en el Capítulo II de su Título III" },
  { anverso: "¿Qué contenido mínimo debe tener toda notificación según la LPACAP?", reverso: "El texto íntegro de la resolución, con indicación de si es o no definitiva en vía administrativa, la expresión de los recursos que procedan, el órgano ante el que hubieran de presentarse y el plazo para interponerlos" },
  { anverso: "¿Cuál es el medio preferente de notificación para las Administraciones Públicas según la LPACAP?", reverso: "El medio electrónico, siendo obligatorio para determinados sujetos (personas jurídicas, entre otros) y opcional para las personas físicas que no estén obligadas, salvo que elijan expresamente ese medio" },
  { anverso: "¿En qué supuestos procede la práctica de la notificación mediante publicación, según la LPACAP?", reverso: "Cuando los interesados en un procedimiento sean desconocidos, se ignore el lugar de la notificación, o intentada esta no se hubiese podido practicar" },
  { anverso: "¿Dónde se practica habitualmente la publicación de un acto administrativo cuando no cabe notificación individual?", reverso: "En el boletín oficial correspondiente (BOE, boletín autonómico o BOP) y, complementariamente, en el tablón de anuncios o sede electrónica del organismo" },
  { anverso: "¿Qué diferencia esencial hay entre notificación y publicación de un acto administrativo?", reverso: "La notificación se dirige a una persona interesada identificada y concreta; la publicación se dirige a un conjunto indeterminado o desconocido de personas, o se usa cuando la notificación individual no ha podido practicarse" },
  { anverso: "¿Qué ocurre si una notificación se practica correctamente pero contiene un texto incompleto de la resolución?", reverso: "Según la LPACAP, las notificaciones defectuosas (por ejemplo, sin el texto íntegro) surtirán efecto a partir de la fecha en que el interesado realice actuaciones que supongan el conocimiento del contenido, o interponga el recurso procedente" },
  { anverso: "¿Qué es el 'rechazo' de una notificación por la persona interesada o su representante y qué efecto tiene?", reverso: "Si el interesado o su representante rechazan la notificación, se hace constar en el expediente y se tiene por efectuado el trámite, siguiéndose el procedimiento" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué ley regula la notificación de los actos administrativos en España?", explicacion: "La Ley 39/2015, del Procedimiento Administrativo Común (LPACAP).", dificultad: "media", opciones: ["La Ley 39/2015 (LPACAP)", "La Ley 40/2015 de Régimen Jurídico", "La Ley 7/1985 de Bases del Régimen Local", "La Ley 19/2013 de Transparencia"], correcta: 0 },
  { enunciado: "¿Qué debe contener como mínimo toda notificación de una resolución?", explicacion: "El texto íntegro, si es definitiva en vía administrativa, los recursos, órgano y plazo.", dificultad: "media", opciones: ["Texto íntegro, recursos procedentes, órgano y plazo", "Solo el nombre del órgano que la emite", "Solo la fecha de la resolución", "Solo un resumen de la resolución"], correcta: 0 },
  { enunciado: "¿Cuál es el medio preferente de notificación para las Administraciones Públicas?", explicacion: "El medio electrónico.", dificultad: "media", opciones: ["El medio electrónico", "El correo postal certificado exclusivamente", "El anuncio en el tablón físico", "La llamada telefónica"], correcta: 0 },
  { enunciado: "¿Cuándo procede notificar mediante publicación según la LPACAP?", explicacion: "Cuando los interesados son desconocidos, se ignora el lugar, o la notificación intentada no se pudo practicar.", dificultad: "media", opciones: ["Interesados desconocidos o notificación no practicada", "Siempre, en lugar de la notificación individual", "Solo si el interesado lo solicita expresamente", "Nunca, la publicación no sustituye a la notificación"], correcta: 0 },
  { enunciado: "¿Dónde se practica habitualmente la publicación de un acto administrativo?", explicacion: "En el boletín oficial correspondiente y en tablón de anuncios/sede electrónica.", dificultad: "facil", opciones: ["En el boletín oficial y tablón de anuncios", "Únicamente en la prensa privada", "Únicamente por correo electrónico personal", "En ningún medio oficial"], correcta: 0 },
  { enunciado: "¿Qué diferencia esencial hay entre notificación y publicación?", explicacion: "La notificación es a una persona identificada; la publicación a un conjunto indeterminado o cuando falla la individual.", dificultad: "media", opciones: ["La notificación es individual; la publicación es general", "Son términos equivalentes sin diferencia", "La publicación siempre precede a la notificación", "La notificación solo se usa en boletines oficiales"], correcta: 0 },
  { enunciado: "¿Qué efecto tiene una notificación defectuosa que carece del texto íntegro de la resolución?", explicacion: "Surte efecto desde que el interesado conoce el contenido o interpone el recurso procedente.", dificultad: "dificil", opciones: ["Surte efecto cuando el interesado conoce el contenido o recurre", "Es siempre nula de pleno derecho", "No tiene ningún efecto en ningún caso", "Se convierte automáticamente en publicación"], correcta: 0 },
  { enunciado: "¿Qué ocurre si el interesado rechaza expresamente una notificación?", explicacion: "Se hace constar en el expediente y se tiene por efectuado el trámite.", dificultad: "media", opciones: ["Se hace constar y se tiene por efectuado el trámite", "El procedimiento se paraliza automáticamente", "La Administración debe repetir la notificación", "Se anula el acto administrativo notificado"], correcta: 0 },
]);

const S3 = "archivo-compulsa-documentacion-administrativa";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es archivar un documento administrativo?", reverso: "Custodiar y organizar de forma ordenada la documentación generada o recibida por la Administración, de modo que pueda localizarse y consultarse con posterioridad" },
  { anverso: "¿Qué es el archivo de gestión (o de oficina)?", reverso: "El archivo donde se conserva la documentación mientras está en tramitación activa o de uso frecuente por la unidad que la ha generado" },
  { anverso: "¿Qué es el archivo central o intermedio?", reverso: "El archivo donde se traslada la documentación cuando ya no es de uso frecuente en la oficina, pero aún puede ser necesaria por motivos administrativos o legales" },
  { anverso: "¿Qué es el archivo histórico?", reverso: "El archivo de conservación permanente donde se traslada la documentación con valor histórico o cultural, una vez superados los plazos de conservación administrativa" },
  { anverso: "¿Qué criterios básicos deben seguirse al organizar un archivo de documentos administrativos?", reverso: "Un criterio de clasificación coherente (por materia, por expediente, cronológico), una ordenación interna clara, y una correcta identificación externa (etiquetado) para facilitar su localización" },
  { anverso: "¿Qué es una compulsa de un documento administrativo?", reverso: "El procedimiento por el que un empleado público competente coteja una copia con su documento original y certifica que ambos coinciden, dando a la copia validez equivalente al original a los efectos del procedimiento" },
  { anverso: "¿Qué requisito básico debe cumplirse para compulsar una copia?", reverso: "Debe presentarse el documento original junto con la copia, para que el empleado competente pueda cotejar ambos y certificar la coincidencia" },
  { anverso: "¿Qué es un sello o diligencia de compulsa?", reverso: "La marca (sello, firma y fecha) que estampa el empleado público sobre la copia compulsada, dejando constancia de que ha cotejado el documento con el original" },
  { anverso: "¿Sustituye la presentación de una copia simple (no compulsada) a la del documento original en un procedimiento administrativo, según la LPACAP?", reverso: "Con carácter general, la LPACAP admite que los interesados aporten copias simples de los documentos, pudiendo la Administración solicitar el cotejo con el original en caso de duda sobre su autenticidad" },
  { anverso: "¿Por qué es importante para el personal municipal conocer las normas básicas de archivo y compulsa, aunque no trabaje en una oficina de registro?", reverso: "Porque en la gestión ordinaria de cualquier puesto público pueden generarse documentos (partes de trabajo, incidencias, certificados) que deben conservarse y, en ocasiones, aportarse debidamente compulsados o cotejados" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es archivar un documento administrativo?", explicacion: "Custodiar y organizar la documentación para que pueda localizarse y consultarse.", dificultad: "facil", opciones: ["Custodiar y organizar la documentación de forma localizable", "Destruir la documentación tras su uso", "Notificarla a la persona interesada", "Publicarla en el boletín oficial"], correcta: 0 },
  { enunciado: "¿Qué es el archivo de gestión u oficina?", explicacion: "Donde se conserva la documentación en tramitación activa o de uso frecuente.", dificultad: "media", opciones: ["Documentación en tramitación activa o de uso frecuente", "Documentación de conservación histórica permanente", "Documentación ya sin ningún valor administrativo", "Solo copias compulsadas de expedientes"], correcta: 0 },
  { enunciado: "¿Qué es el archivo histórico?", explicacion: "El de conservación permanente para documentación con valor histórico o cultural.", dificultad: "media", opciones: ["Conservación permanente de valor histórico o cultural", "El archivo de uso diario en la oficina", "El archivo temporal de expedientes en trámite", "El registro de entrada y salida"], correcta: 0 },
  { enunciado: "¿Qué es compulsar un documento administrativo?", explicacion: "Cotejar una copia con el original y certificar que coinciden.", dificultad: "facil", opciones: ["Cotejar una copia con el original y certificar coincidencia", "Publicar el documento en un boletín oficial", "Archivar el documento de forma permanente", "Notificarlo a la persona interesada"], correcta: 0 },
  { enunciado: "¿Qué se necesita presentar para compulsar una copia?", explicacion: "El documento original junto con la copia.", dificultad: "media", opciones: ["El documento original junto con la copia", "Solo la copia, sin el original", "Solo una declaración jurada", "Solo el número de expediente"], correcta: 0 },
  { enunciado: "¿Qué es la diligencia de compulsa?", explicacion: "La marca (sello, firma y fecha) que certifica el cotejo con el original.", dificultad: "media", opciones: ["El sello, firma y fecha que certifican el cotejo", "El texto íntegro de una resolución", "El anuncio de publicación de un acto", "El registro de entrada del documento"], correcta: 0 },
  { enunciado: "¿Qué admite la LPACAP respecto a las copias simples aportadas por los interesados?", explicacion: "Se admiten con carácter general, pudiendo la Administración pedir cotejo si hay dudas.", dificultad: "dificil", opciones: ["Se admiten, con posible cotejo si hay dudas", "Nunca se admiten, siempre debe compulsarse", "Sustituyen siempre a la notificación", "Solo se admiten en el archivo histórico"], correcta: 0 },
  { enunciado: "¿Por qué debe el personal municipal, en general, conocer las normas básicas de archivo y compulsa?", explicacion: "Porque en su trabajo pueden generarse documentos que deben conservarse o aportarse cotejados.", dificultad: "media", opciones: ["Porque pueden generar documentos que deben conservarse", "Porque solo aplica al personal de oficinas de registro", "Porque sustituye a la notificación electrónica", "Porque es obligatorio publicar todo documento generado"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 15 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 15, orden: 15, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-69 creado y vinculado como Tema 15 de Oficial Mantenimiento General.");

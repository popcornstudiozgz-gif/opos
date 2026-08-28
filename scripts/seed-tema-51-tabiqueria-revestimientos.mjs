/**
 * Crea el tema canónico tema-51: "Tabiquería interior y exterior.
 * Revestimientos interiores y exteriores (paramentos verticales y
 * horizontales)" y lo asigna como Tema 13 (bloque-2) de la oposición
 * Oficial Albañil (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 11 oficial del Anexo I (bases2110.pdf).
 *
 * Fuente primaria (secciones 1 y 2): RD 1212/2009 (BOE-A-2009-13743),
 * Anexo I, módulo MF0142_1 "Obras de fábrica para revestir" del
 * certificado EOCB0108, unidad formativa UF0303 "Ejecución de fábricas
 * para revestir" (texto leído íntegro en este turno): tipos de fábricas
 * según función, localización y geometría; muros, fachadas, particiones y
 * tabiquería; aparejos, trabazón y juntas; puntos singulares (petos,
 * encuentros con forjado, arranque en cimentación, huecos, arcos, muros
 * curvos, trasdosados); control de calidad (planeidad, desplome,
 * horizontalidad, aplomado).
 * La sección 3 (revestimientos propiamente dichos: enfoscados, guarnecidos
 * y enlucidos) es conocimiento técnico consolidado del oficio, no cubierto
 * en detalle por el módulo MF0142_1 (que define fábricas "para revestir",
 * es decir, como soporte, sin desarrollar la ejecución del revestimiento).
 *
 * Tres secciones:
 * 1. tabiqueria-particiones — tabiquería y particiones interiores.
 * 2. muros-fachadas-puntos-singulares — muros, fachadas y puntos
 *    singulares de las fábricas.
 * 3. revestimientos-verticales-horizontales — revestimientos interiores y
 *    exteriores sobre paramentos verticales y horizontales.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-51-tabiqueria-revestimientos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-51";
const OPOSICION = "oficial-albanil-ayto-zaragoza";
const BLOQUE_2_ID = "11fb28dc-2b37-42bb-ae51-aeb7421e298c";
const RD_1212_2009 = "https://www.boe.es/buscar/act.php?id=BOE-A-2009-13743";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) =>
    preguntas[i].opciones.map((texto, orden) => ({
      pregunta_id: pregunta.id,
      texto,
      es_correcta: orden === preguntas[i].correcta,
      orden,
    })),
  );
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

// ─────────────────────────────────────────────────────────────────────────
// Tema canónico
// ─────────────────────────────────────────────────────────────────────────
console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "Tabiquería y revestimientos interiores y exteriores",
    descripcion: "Tabiquería interior y exterior. Revestimientos interiores y exteriores (paramentos verticales y horizontales).",
    contenido:
      "Desarrolla la tabiquería y particiones interiores (juntas estructurales, trasdosados, arcos de descarga), los muros y fachadas de cerramiento con sus puntos singulares (petos, encuentros con forjado, arranque en cimentación, huecos, arcos, muros curvos) y los revestimientos interiores y exteriores sobre paramentos verticales y horizontales (enfoscados, guarnecidos, enlucidos y revocos).",
    enlaces_boe: [
      { url: RD_1212_2009, titulo: "RD 1212/2009 — Certificado de profesionalidad EOCB0108, Fábricas de Albañilería (MF0142_1)" },
    ],
    indice_estudio: [
      { url: RD_1212_2009, titulo: "Tabiquería y particiones interiores", seccion: "tabiqueria-particiones", articulos: "MF0142_1, UF0303" },
      { url: RD_1212_2009, titulo: "Muros, fachadas y puntos singulares", seccion: "muros-fachadas-puntos-singulares", articulos: "MF0142_1, UF0303" },
      { url: "", titulo: "Revestimientos sobre paramentos verticales y horizontales", seccion: "revestimientos-verticales-horizontales", articulos: "Conceptos fundamentales" },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: tabiqueria-particiones
// ─────────────────────────────────────────────────────────────────────────
const S1 = "tabiqueria-particiones";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es una partición según el certificado EOCB0108?", reverso: "Un elemento constructivo interior (tabiquería) que divide el espacio de un edificio en distintos recintos, sin función estructural portante" },
    { anverso: "¿Con qué conglomerante suelen ejecutarse las particiones de ladrillo hueco en interiores?", reverso: "Con pasta de yeso, además de con mortero de cemento, según el uso y las condiciones de humedad previstas para el paramento" },
    { anverso: "¿Qué es la 'holgura' que debe respetarse entre el forjado y la última hilada de una partición?", reverso: "Un espacio libre que se deja intencionadamente entre la parte superior de la tabiquería y el forjado, para permitir la deformación (flecha) de este sin que transmita cargas a la partición; se rellena transcurrido el plazo indicado" },
    { anverso: "¿Por qué debe rellenarse la holgura entre partición y forjado solo transcurrido un plazo determinado?", reverso: "Para dar tiempo a que el forjado desarrolle la mayor parte de su deformación diferida (flecha) antes de que la tabiquería quede en contacto rígido con él, evitando fisuras" },
    { anverso: "¿Qué es una junta estructural y por qué debe respetarse su discontinuidad al ejecutar particiones?", reverso: "Una separación prevista en el proyecto entre partes de la estructura que se mueven de forma independiente; la tabiquería debe interrumpirse en ese punto para no coartar ese movimiento y evitar fisuras o roturas" },
    { anverso: "¿Qué es un arco de descarga en la ejecución de un hueco de partición?", reverso: "Una solución constructiva mediante dos hiladas volteadas por encima del hueco, que desvía las cargas hacia los laterales, evitando que graviten directamente sobre el dintel cuando el hueco supera ciertas dimensiones" },
    { anverso: "¿Qué es un trasdosado de fachada?", reverso: "Una hoja interior adicional (de ladrillo, bloque u otro sistema) que se construye por el interior de un cerramiento de fachada, habitualmente para alojar aislamiento térmico o mejorar el acondicionamiento del cerramiento" },
    { anverso: "¿Qué debe respetarse al colocar paneles de aislamiento rígido en un trasdosado?", reverso: "Las condiciones de fijación y solape entre paneles indicadas en el proyecto, para evitar puentes térmicos y garantizar la continuidad del aislamiento" },
    { anverso: "¿Qué es la cámara de aire en un cerramiento con trasdosado?", reverso: "El espacio libre que se deja entre la hoja exterior y la hoja de trasdosado, con una dimensión determinada por el proyecto, que contribuye al aislamiento térmico y a evitar humedades por capilaridad o filtración" },
    { anverso: "¿Qué es el 'enjarje' en el encuentro de fábricas o particiones?", reverso: "El trabado o entrelazado de las piezas en el encuentro entre dos muros o particiones perpendiculares, que debe realizarse en todo el espesor y en el número de hiladas indicado para garantizar la trabazón estructural del encuentro" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una partición interior?", explicacion: "Un elemento constructivo que divide espacios interiores, sin función estructural portante.", dificultad: "facil", opciones: ["Un elemento que divide espacios interiores sin función portante", "Un muro exterior de carga", "Una cimentación superficial", "Un elemento de hormigón armado"], correcta: 0 },
  { enunciado: "¿Qué es la 'holgura' entre el forjado y la última hilada de una partición?", explicacion: "Un espacio libre que permite la deformación del forjado sin transmitir cargas a la tabiquería.", dificultad: "media", opciones: ["Un espacio libre que permite la deformación del forjado", "El espesor mínimo de una junta de mortero", "La separación entre dos hiladas consecutivas", "El recubrimiento de una armadura de hormigón"], correcta: 0 },
  { enunciado: "¿Por qué se retrasa el relleno de esa holgura hasta transcurrido un plazo?", explicacion: "Para dar tiempo a que el forjado desarrolle su deformación diferida antes de rigidizar el contacto.", dificultad: "media", opciones: ["Para dejar que el forjado desarrolle su deformación diferida", "Porque lo exige el fraguado del mortero de cemento", "Para reducir el coste de la partición", "Porque así lo determina el Código Estructural siempre"], correcta: 0 },
  { enunciado: "¿Por qué debe interrumpirse una partición al llegar a una junta estructural?", explicacion: "Para no coartar el movimiento independiente que la junta debe permitir entre partes de la estructura.", dificultad: "media", opciones: ["Para no coartar el movimiento que la junta debe permitir", "Porque lo exige el marcado CE de los materiales", "Para ahorrar piezas de ladrillo", "Porque las juntas estructurales solo existen en fachadas"], correcta: 0 },
  { enunciado: "¿Qué es un arco de descarga en un hueco de partición?", explicacion: "Dos hiladas volteadas que desvían las cargas hacia los laterales del hueco.", dificultad: "media", opciones: ["Dos hiladas volteadas que desvían las cargas a los laterales", "Un tipo de dintel prefabricado de hormigón", "Un sistema de trasdosado con aislamiento rígido", "Una junta de dilatación en fachada"], correcta: 0 },
  { enunciado: "¿Qué es un trasdosado de fachada?", explicacion: "Una hoja interior adicional que se construye por el interior de un cerramiento, para alojar aislamiento.", dificultad: "media", opciones: ["Una hoja interior adicional para alojar aislamiento", "El acabado exterior visto de la fachada", "El arranque de muro sobre la cimentación", "La primera hilada de una fábrica vista"], correcta: 0 },
  { enunciado: "¿Qué función cumple la cámara de aire en un cerramiento con trasdosado?", explicacion: "Contribuye al aislamiento térmico y evita humedades por capilaridad o filtración.", dificultad: "media", opciones: ["Contribuye al aislamiento y evita humedades", "Sustituye la necesidad de aislamiento rígido", "Sirve exclusivamente de paso de instalaciones", "Reduce el peso propio de la fábrica exterior"], correcta: 0 },
  { enunciado: "¿Qué es el enjarje en el encuentro entre dos fábricas perpendiculares?", explicacion: "El trabado de piezas en todo el espesor y número de hiladas indicado, para garantizar la trabazón estructural.", dificultad: "dificil", opciones: ["El trabado de piezas que garantiza la trabazón del encuentro", "Un tipo de junta de dilatación", "El relleno de la holgura entre forjado y partición", "Un sistema de anclaje de trasdosados"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: muros-fachadas-puntos-singulares
// ─────────────────────────────────────────────────────────────────────────
const S2 = "muros-fachadas-puntos-singulares";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Cómo clasifica el certificado EOCB0108 las fábricas de albañilería en cuanto a su función?", reverso: "Según función (resistente o de cerramiento/partición), localización (interior o exterior) y geometría (recta, curva, con huecos, etc.)" },
    { anverso: "¿Qué es un muro de cerramiento o fachada, frente a un muro de carga?", reverso: "El muro de cerramiento delimita y protege el edificio del exterior sin necesariamente soportar cargas estructurales de otras plantas; el muro de carga, además, transmite cargas verticales de la estructura hasta la cimentación" },
    { anverso: "¿Qué es un peto en el contexto de fábricas de albañilería?", reverso: "Un muro de poca altura, situado normalmente en el remate de una cubierta o terraza, que actúa como protección o barandilla y como remate de los paramentos" },
    { anverso: "¿Qué debe cuidarse especialmente en el encuentro de una fábrica con el forjado?", reverso: "La correcta transmisión y reparto de cargas, el sellado frente a filtraciones y, cuando corresponda, dejar la holgura necesaria para absorber la deformación del forjado" },
    { anverso: "¿Qué precauciones exige el arranque de un muro sobre la cimentación?", reverso: "Garantizar la impermeabilización en la base del muro (para evitar la ascensión de humedad por capilaridad), el correcto replanteo del aparejo y la nivelación de la primera hilada" },
    { anverso: "¿Qué condiciones atmosféricas obligan a proteger una fábrica recién ejecutada, según el certificado EOCB0108?", reverso: "La lluvia, el hielo, el calor excesivo y el viento, que pueden afectar al fraguado del mortero o a la estabilidad de la fábrica mientras no ha adquirido resistencia suficiente" },
    { anverso: "¿Qué es un muro curvo en albañilería y qué exige su ejecución?", reverso: "Un muro cuyo trazado en planta sigue una curva; exige un replanteo más cuidadoso, el ajuste o corte de piezas para adaptarse a la curvatura y, en su caso, juntas de menor espesor en la cara interior de la curva" },
    { anverso: "Cita tres controles de calidad habituales en la ejecución de una fábrica de ladrillo o bloque", reverso: "Planeidad, desplome (verticalidad) y horizontalidad de hiladas, además de la comprobación del espesor de juntas y el correcto aparejo" },
    { anverso: "¿Qué es el 'aplomado de llagas' como control de calidad en una fábrica vista?", reverso: "La comprobación de que las juntas verticales (llagas) de las distintas hiladas quedan alineadas en vertical, siguiendo el aparejo especificado" },
    { anverso: "¿Qué defectos habituales de ejecución deben vigilarse en una fábrica de albañilería?", reverso: "Desplomes, faltas de horizontalidad en las hiladas, juntas irregulares, aparejo incorrecto, enjarjes deficientes en encuentros y manchas o suciedad en la cara vista" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Según qué criterios clasifica el certificado EOCB0108 las fábricas de albañilería?", explicacion: "Según función, localización y geometría.", dificultad: "media", opciones: ["Función, localización y geometría", "Únicamente el precio del material", "Solo el color de las piezas empleadas", "Exclusivamente su antigüedad"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre un muro de cerramiento y un muro de carga?", explicacion: "El de carga transmite cargas estructurales verticales; el de cerramiento delimita y protege sin esa función estructural.", dificultad: "media", opciones: ["El de carga transmite cargas estructurales, el de cerramiento no", "Son términos sinónimos e intercambiables", "El de cerramiento siempre es de hormigón armado", "El de carga nunca puede ser exterior"], correcta: 0 },
  { enunciado: "¿Qué es un peto en una fábrica de albañilería?", explicacion: "Un muro de poca altura en el remate de una cubierta o terraza, con función de protección.", dificultad: "media", opciones: ["Un muro de poca altura en el remate de cubierta o terraza", "Un sistema de trasdosado con cámara de aire", "El arranque del muro sobre la cimentación", "Un tipo de arco de descarga"], correcta: 0 },
  { enunciado: "¿Qué debe garantizarse en el arranque de un muro sobre la cimentación?", explicacion: "La impermeabilización en la base para evitar humedad por capilaridad, y el correcto replanteo y nivelación.", dificultad: "media", opciones: ["Impermeabilización en la base y correcto replanteo", "Únicamente el color de la primera hilada", "Solo la resistencia del mortero de agarre", "Exclusivamente la altura final del muro"], correcta: 0 },
  { enunciado: "¿Qué condiciones atmosféricas cita el certificado EOCB0108 como factores a proteger en una fábrica recién ejecutada?", explicacion: "Lluvia, hielo, calor y viento.", dificultad: "media", opciones: ["Lluvia, hielo, calor y viento", "Únicamente la lluvia", "Solo las heladas nocturnas", "Exclusivamente el viento fuerte"], correcta: 0 },
  { enunciado: "¿Qué exige la ejecución de un muro curvo respecto a uno recto?", explicacion: "Un replanteo más cuidadoso y el ajuste o corte de piezas para adaptarse a la curvatura.", dificultad: "media", opciones: ["Un replanteo más cuidadoso y ajuste de piezas", "No exige ninguna diferencia respecto a un muro recto", "Prescindir siempre de juntas de mortero", "Emplear exclusivamente piezas cerámicas macizas"], correcta: 0 },
  { enunciado: "¿Qué es el 'aplomado de llagas' como control de calidad?", explicacion: "Comprobar que las juntas verticales de las hiladas quedan alineadas en vertical.", dificultad: "dificil", opciones: ["Comprobar que las juntas verticales quedan alineadas", "Verificar la resistencia a compresión del mortero", "Medir el espesor del recubrimiento de armaduras", "Comprobar la humedad óptima de compactación"], correcta: 0 },
  { enunciado: "¿Cuáles son controles de calidad habituales en una fábrica de ladrillo o bloque?", explicacion: "Planeidad, desplome y horizontalidad de hiladas, entre otros.", dificultad: "facil", opciones: ["Planeidad, desplome y horizontalidad de hiladas", "Únicamente el precio de la partida", "Solo la fecha de fabricación del ladrillo", "Exclusivamente el peso de cada pieza"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: revestimientos-verticales-horizontales
// ─────────────────────────────────────────────────────────────────────────
const S3 = "revestimientos-verticales-horizontales";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es un enfoscado?", reverso: "Un revestimiento continuo de mortero (de cemento o de cal) que se aplica directamente sobre una fábrica u otro soporte, para regularizar la superficie y protegerla, sirviendo de base para acabados posteriores o como acabado final" },
    { anverso: "¿Qué es un guarnecido?", reverso: "Un revestimiento continuo de yeso que se aplica sobre un paramento interior para regularizar su superficie, previo al enlucido final" },
    { anverso: "¿Qué es un enlucido?", reverso: "La capa final, muy fina, de yeso o pasta que se aplica sobre el guarnecido para conseguir un acabado liso y terminado, listo para pintar o decorar" },
    { anverso: "¿Qué es un revoco?", reverso: "Un revestimiento continuo de mortero aplicado como acabado final sobre un enfoscado o directamente sobre la fábrica, con textura y aspecto decorativo (raspado, esgrafiado, proyectado, etc.)" },
    { anverso: "¿Qué diferencia hay entre un revestimiento sobre paramento vertical y uno sobre paramento horizontal?", reverso: "El vertical se aplica sobre muros y tabiques (enfoscados, guarnecidos, enlucidos, alicatados); el horizontal se aplica sobre techos o suelos (enlucidos de techo, soleras, pavimentos), con distintas exigencias de adherencia y puesta en obra por la posición de trabajo" },
    { anverso: "¿Qué es un alicatado?", reverso: "Un revestimiento de paramentos verticales mediante piezas cerámicas (azulejos) fijadas con mortero cola o mortero de cemento, habitual en zonas húmedas como cocinas y baños" },
    { anverso: "¿Qué es un aplacado?", reverso: "Un revestimiento de paramentos mediante placas de mayor tamaño que el azulejo (piedra natural, gres porcelánico, material compuesto), fijadas mediante anclajes mecánicos, mortero cola o sistemas de fijación específicos" },
    { anverso: "¿Por qué es importante la preparación previa del soporte antes de aplicar un revestimiento continuo?", reverso: "Porque la adherencia, planeidad y durabilidad del revestimiento dependen de que el soporte esté limpio, humedecido si procede, sin polvo ni grasa, y con la rugosidad adecuada para el agarre del mortero o yeso" },
    { anverso: "¿Qué patologías pueden aparecer en un revestimiento mal ejecutado o sobre un soporte inadecuado?", reverso: "Desconchados, fisuras, desprendimientos, eflorescencias (manchas blanquecinas por sales) y ampollas o abombamientos por falta de adherencia" },
    { anverso: "¿Qué maestras se emplean para conseguir un revestimiento continuo plano y a plomo?", reverso: "Franjas de mortero o guías de referencia (maestras) ejecutadas con antelación, alineadas y niveladas, entre las que se extiende y enrasa el resto del revestimiento" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un enfoscado?", explicacion: "Un revestimiento continuo de mortero que regulariza y protege una fábrica, base de acabados posteriores.", dificultad: "facil", opciones: ["Un revestimiento continuo de mortero que regulariza el soporte", "La capa final de acabado de yeso muy fina", "Un revestimiento cerámico mediante azulejos", "Una placa de piedra natural fijada mecánicamente"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre guarnecido y enlucido?", explicacion: "El guarnecido regulariza la superficie con yeso; el enlucido es la capa final, fina, de acabado liso.", dificultad: "media", opciones: ["El guarnecido regulariza; el enlucido es la capa final de acabado", "Son exactamente el mismo revestimiento", "El enlucido se aplica solo en exteriores", "El guarnecido se aplica solo sobre hormigón armado"], correcta: 0 },
  { enunciado: "¿Qué es un revoco?", explicacion: "Un revestimiento continuo de mortero de acabado final con textura decorativa.", dificultad: "media", opciones: ["Un revestimiento de mortero de acabado final con textura decorativa", "Un revestimiento cerámico interior", "La primera capa de un guarnecido de yeso", "Un sistema de trasdosado con aislamiento"], correcta: 0 },
  { enunciado: "¿Qué exigencia distingue especialmente un revestimiento sobre paramento horizontal respecto a uno vertical?", explicacion: "Distintas exigencias de adherencia y puesta en obra por la posición de trabajo (techos o suelos).", dificultad: "media", opciones: ["Distintas exigencias de adherencia por la posición de trabajo", "No existe ninguna diferencia relevante", "El horizontal nunca lleva mortero de cemento", "El vertical se aplica solo en interiores"], correcta: 0 },
  { enunciado: "¿Qué es un alicatado?", explicacion: "Un revestimiento de paramentos verticales con piezas cerámicas (azulejos).", dificultad: "facil", opciones: ["Un revestimiento con piezas cerámicas (azulejos)", "Un revestimiento continuo de mortero de cal", "Una capa fina de acabado de yeso", "Un sistema de aislamiento térmico por el exterior"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un aplacado frente a un alicatado?", explicacion: "El aplacado usa placas de mayor tamaño (piedra, gres porcelánico) con anclajes o mortero cola.", dificultad: "media", opciones: ["Usa placas de mayor tamaño con anclajes o mortero cola", "Se aplica exclusivamente en suelos", "No requiere preparación previa del soporte", "Es sinónimo exacto de enfoscado"], correcta: 0 },
  { enunciado: "¿Por qué es importante preparar bien el soporte antes de revestirlo?", explicacion: "Porque la adherencia y durabilidad del revestimiento dependen de la limpieza y rugosidad adecuadas del soporte.", dificultad: "media", opciones: ["Porque la adherencia y durabilidad dependen de ello", "Porque así se reduce el precio del revestimiento", "Porque lo exige únicamente el marcado CE", "Porque acelera el fraguado del hormigón estructural"], correcta: 0 },
  { enunciado: "¿Para qué se emplean las 'maestras' en la ejecución de un revestimiento continuo?", explicacion: "Como guías niveladas y a plomo entre las que se extiende y enrasa el resto del revestimiento.", dificultad: "media", opciones: ["Como guías niveladas para extender y enrasar el revestimiento", "Como refuerzo estructural del paramento", "Como sistema de anclaje de placas de piedra", "Como aislante térmico bajo el revoco"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Vincular a la oposición (Tema 13)
// ─────────────────────────────────────────────────────────────────────────
console.log(`\n🔗 Vinculando ${TEMA} como Tema 13 de ${OPOSICION}...`);
await upsert(
  "tema_oposicion",
  [
    {
      tema_slug: TEMA,
      oposicion_slug: OPOSICION,
      bloque_id: BLOQUE_2_ID,
      numero: 13,
      orden: 13,
      es_premium: false,
      publicado: true,
      secciones_incluidas: null,
    },
  ],
  "tema_slug,oposicion_slug"
);

console.log("\n✅ tema-51 creado y vinculado como Tema 13 de Oficial Albañil.");

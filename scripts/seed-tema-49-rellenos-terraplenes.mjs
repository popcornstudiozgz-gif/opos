/**
 * Crea el tema canónico tema-49: "Rellenos de zanjas, terraplenes, capas
 * granulares. Grava-cemento" y lo asigna como Tema 11 (bloque-2) de la
 * oposición Oficial Albañil (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 9 oficial del Anexo I (bases2110.pdf): "Rellenos de
 * zanjas, terraplenes, capas granulares. Grava-cemento."
 *
 * Contenido técnico consolidado de movimiento de tierras y firmes, sin una
 * única norma que lo regule específicamente para este temario (a
 * diferencia de otros temas de este bloque, no se ha localizado un módulo
 * formativo dedicado dentro del certificado EOCB0108 ni un RD específico
 * citado en las bases); se trata como conocimiento técnico del oficio,
 * igual que se hizo con los temas de ofimática de la DGA. Como referencia
 * general del sector se cita el Pliego de Prescripciones Técnicas
 * Generales para obras de carreteras y puentes (PG-3), documento de
 * referencia habitual en rellenos, terraplenes y capas granulares en obra
 * civil y urbanización, sin atribuirle artículos concretos no verificados.
 *
 * Tres secciones:
 * 1. rellenos-zanjas-tongadas — relleno de zanjas por tongadas y
 *    compactación.
 * 2. terraplenes-desmontes — terraplenes y desmontes, compactación y
 *    control (ensayo Proctor).
 * 3. capas-granulares-grava-cemento — zahorras, capas granulares de firme
 *    y grava-cemento.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-49-rellenos-terraplenes.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-49";
const OPOSICION = "oficial-albanil-ayto-zaragoza";
const BLOQUE_2_ID = "11fb28dc-2b37-42bb-ae51-aeb7421e298c";

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
    titulo: "Rellenos de zanjas, terraplenes y capas granulares. Grava-cemento",
    descripcion: "Rellenos de zanjas, terraplenes, capas granulares. Grava-cemento.",
    contenido:
      "Desarrolla el relleno de zanjas por tongadas y su compactación, los terraplenes y desmontes en movimiento de tierras, las capas granulares de firme (zahorra natural y artificial) y la grava-cemento como material tratado con conglomerante para bases y subbases.",
    enlaces_boe: [],
    indice_estudio: [
      { url: "", titulo: "Relleno de zanjas por tongadas y compactación", seccion: "rellenos-zanjas-tongadas", articulos: "Conceptos fundamentales" },
      { url: "", titulo: "Terraplenes, desmontes y control de compactación", seccion: "terraplenes-desmontes", articulos: "Conceptos fundamentales" },
      { url: "", titulo: "Capas granulares de firme y grava-cemento", seccion: "capas-granulares-grava-cemento", articulos: "Conceptos fundamentales" },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: rellenos-zanjas-tongadas
// ─────────────────────────────────────────────────────────────────────────
const S1 = "rellenos-zanjas-tongadas";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es una tongada en el relleno de una zanja?", reverso: "Cada una de las capas sucesivas de material, de espesor limitado, que se extienden y compactan una tras otra hasta completar el relleno; trabajar por tongadas asegura una compactación uniforme en toda la profundidad" },
    { anverso: "¿Por qué no se rellena una zanja de una sola vez, en una capa gruesa?", reverso: "Porque la energía de compactación no llegaría de forma uniforme a todo el espesor, dejando zonas mal compactadas que después asientan de forma diferencial y pueden dañar el pavimento o la conducción" },
    { anverso: "¿Qué es la 'cama de asiento' de una tubería en el fondo de una zanja?", reverso: "Una capa de material seleccionado (arena o zahorra fina) que se extiende en el fondo de la excavación antes de colocar la tubería, para repartir uniformemente su apoyo y evitar puntos duros" },
    { anverso: "¿Qué es el 'relleno envolvente' o de protección de una conducción?", reverso: "El material (habitualmente arena) que rodea y cubre la tubería o cable hasta una altura determinada por encima de su generatriz superior, protegiéndola de golpes y de las cargas del relleno posterior" },
    { anverso: "¿Qué tipo de material se considera 'inadecuado' para el relleno de zanjas?", reverso: "El material con materia orgánica, escombros, piedras de gran tamaño o elementos que puedan dañar la conducción o generar asientos irregulares" },
    { anverso: "¿Qué instrumento se emplea habitualmente para compactar el relleno en zanjas estrechas?", reverso: "El pisón o compactador de placa vibrante de tamaño reducido (bandeja vibrante), adaptado al espacio limitado de la zanja" },
    { anverso: "¿Qué riesgo existe si se compacta el relleno inmediatamente sobre una tubería sin la altura de protección adecuada?", reverso: "El riesgo de dañar o deformar la tubería por la energía de compactación aplicada demasiado cerca de ella" },
    { anverso: "¿Qué es el asiento diferencial de un relleno mal compactado?", reverso: "El hundimiento desigual de la superficie a lo largo del trazado de la zanja, debido a una compactación irregular, que se manifiesta como baches o grietas en el pavimento reconstruido" },
    { anverso: "¿Qué comprobación debe hacerse tras rellenar y compactar una zanja, antes de reponer el pavimento?", reverso: "Verificar el grado de compactación alcanzado y la cota final del relleno respecto al pavimento circundante, para asegurar un acabado enrasado y estable" },
    { anverso: "¿Qué relación hay entre el espesor de cada tongada y el tipo de compactador empleado?", reverso: "A mayor capacidad y energía del equipo de compactación, mayor puede ser el espesor de la tongada que se compacta eficazmente; equipos ligeros exigen tongadas más finas" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una tongada en el relleno de una zanja?", explicacion: "Cada capa sucesiva de material que se extiende y compacta antes de añadir la siguiente.", dificultad: "facil", opciones: ["Cada capa sucesiva de material que se extiende y compacta", "El material excavado y retirado a vertedero", "El sistema de entibación de la zanja", "El instrumento de medición de niveles"], correcta: 0 },
  { enunciado: "¿Por qué se rellena una zanja por tongadas y no de una vez?", explicacion: "Porque la energía de compactación no llegaría de forma uniforme a todo el espesor si se rellenara de golpe.", dificultad: "media", opciones: ["Porque la compactación no sería uniforme en todo el espesor", "Porque lo exige siempre el pliego administrativo", "Porque abarata el coste de materiales", "Porque acelera el fraguado del mortero"], correcta: 0 },
  { enunciado: "¿Qué es la 'cama de asiento' de una tubería?", explicacion: "Una capa de material seleccionado en el fondo de la zanja que reparte uniformemente el apoyo de la tubería.", dificultad: "media", opciones: ["Una capa de material que reparte uniformemente el apoyo de la tubería", "El relleno final antes de reponer el pavimento", "Un sistema de entibación específico para tuberías", "El material de mayor tamaño usado en la zanja"], correcta: 0 },
  { enunciado: "¿Qué función cumple el relleno envolvente de una conducción?", explicacion: "Protegerla de golpes y de las cargas del relleno posterior.", dificultad: "media", opciones: ["Protegerla de golpes y de las cargas del relleno posterior", "Sustituir la necesidad de compactación", "Servir de aislante eléctrico exclusivamente", "Acelerar el fraguado del hormigón circundante"], correcta: 0 },
  { enunciado: "¿Qué tipo de material se considera inadecuado para rellenar una zanja?", explicacion: "El que contiene materia orgánica, escombros o piedras de gran tamaño.", dificultad: "facil", opciones: ["El que contiene materia orgánica, escombros o piedras grandes", "La arena fina seleccionada", "La zahorra artificial compactada", "El material excavado limpio y bien graduado"], correcta: 0 },
  { enunciado: "¿Qué equipo se usa habitualmente para compactar el relleno en zanjas estrechas?", explicacion: "El pisón o la bandeja vibrante, adaptados al espacio reducido.", dificultad: "media", opciones: ["El pisón o bandeja vibrante", "El rodillo compactador de gran tonelaje", "La hormigonera", "La llana dentada"], correcta: 0 },
  { enunciado: "¿Qué riesgo supone compactar directamente sobre una tubería sin altura de protección suficiente?", explicacion: "Dañar o deformar la tubería por la energía de compactación aplicada demasiado cerca.", dificultad: "media", opciones: ["Dañar o deformar la tubería", "Acelerar el fraguado del relleno", "Mejorar la impermeabilidad de la zanja", "Reducir el coste de la excavación"], correcta: 0 },
  { enunciado: "¿Qué es el asiento diferencial en un relleno mal compactado?", explicacion: "El hundimiento desigual de la superficie a lo largo de la zanja, causando baches o grietas.", dificultad: "media", opciones: ["El hundimiento desigual de la superficie a lo largo de la zanja", "La rotura de la tubería por sobrepresión", "El exceso de humedad en el terreno natural", "La formación de eflorescencias en el pavimento"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: terraplenes-desmontes
// ─────────────────────────────────────────────────────────────────────────
const S2 = "terraplenes-desmontes";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es un terraplén?", reverso: "Un relleno de tierras que se ejecuta para elevar el nivel del terreno hasta la rasante de proyecto, compactado por tongadas" },
    { anverso: "¿Qué es un desmonte?", reverso: "La excavación que se realiza para rebajar el nivel del terreno natural hasta la rasante de proyecto, opuesto al terraplén" },
    { anverso: "¿Qué es la compactación de un terraplén?", reverso: "El proceso mecánico (mediante rodillos, pisones o placas vibrantes) que reduce el volumen de huecos entre partículas del material, aumentando su densidad y capacidad portante" },
    { anverso: "¿Qué es el ensayo Proctor?", reverso: "Un ensayo de laboratorio que determina la relación entre la humedad de un suelo y la densidad seca que alcanza al compactarlo con una energía normalizada, obteniendo la 'humedad óptima' y la 'densidad máxima' de referencia" },
    { anverso: "¿Para qué se usa el grado de compactación (o porcentaje Proctor) alcanzado en obra?", reverso: "Para comprobar, en relación con el ensayo Proctor de referencia, si la densidad conseguida en el terraplén compactado cumple el mínimo exigido en el proyecto" },
    { anverso: "¿Por qué es importante controlar la humedad del material antes de compactar un terraplén?", reverso: "Porque cada suelo alcanza su máxima densidad compactándose a una humedad óptima concreta; un material demasiado seco o demasiado húmedo compacta peor y con menor densidad final" },
    { anverso: "¿Qué es el 'coronamiento' de un terraplén?", reverso: "La capa superior del terraplén, sobre la que se apoyan directamente las capas de firme o la cimentación, y que suele exigir mayor exigencia de compactación que las capas inferiores" },
    { anverso: "¿Qué se entiende por 'saneo' del terreno antes de ejecutar un terraplén?", reverso: "La retirada previa de la capa de tierra vegetal u otro material inadecuado (con materia orgánica) del terreno de apoyo, para asentar el terraplén sobre un fondo firme" },
    { anverso: "¿Qué diferencia hay entre un talud de terraplén y un talud de desmonte?", reverso: "El de terraplén es la pendiente exterior del relleno ejecutado; el de desmonte es la pendiente del corte practicado en el terreno natural; ambos deben ser estables según la naturaleza del material" },
    { anverso: "¿Qué relación hay entre las secciones de desmonte y terraplén al planificar un movimiento de tierras?", reverso: "Se busca compensar, en la medida de lo posible, el volumen excavado en los desmontes con el volumen necesario para los terraplenes, reduciendo el transporte de tierras sobrantes o de préstamo" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un terraplén?", explicacion: "Un relleno de tierras compactado por tongadas para elevar el nivel del terreno hasta la rasante de proyecto.", dificultad: "facil", opciones: ["Un relleno de tierras para elevar el nivel del terreno", "Una excavación para rebajar el nivel del terreno", "Un tipo de entibación de zanjas", "Un sistema de drenaje superficial"], correcta: 0 },
  { enunciado: "¿Qué es un desmonte?", explicacion: "La excavación para rebajar el nivel del terreno natural hasta la rasante de proyecto.", dificultad: "facil", opciones: ["La excavación para rebajar el nivel del terreno", "El relleno para elevar el nivel del terreno", "Un tipo de firme granular", "La capa superior de un terraplén"], correcta: 0 },
  { enunciado: "¿Qué determina el ensayo Proctor?", explicacion: "La relación entre humedad y densidad seca de un suelo al compactarlo con energía normalizada.", dificultad: "media", opciones: ["La relación entre humedad y densidad seca de un suelo compactado", "La resistencia a compresión del hormigón", "El tipo de árido más adecuado para un mortero", "La profundidad máxima de una zanja"], correcta: 0 },
  { enunciado: "¿Para qué se usa el grado de compactación (o porcentaje Proctor) en obra?", explicacion: "Para comprobar si la densidad alcanzada cumple el mínimo exigido por el proyecto.", dificultad: "media", opciones: ["Para comprobar si la densidad alcanzada cumple lo exigido", "Para calcular el precio del metro cúbico de relleno", "Para determinar el tipo de entibación necesaria", "Para fijar la profundidad de la cimentación"], correcta: 0 },
  { enunciado: "¿Por qué es relevante la humedad del material antes de compactar un terraplén?", explicacion: "Porque cada suelo alcanza su máxima densidad a una humedad óptima concreta.", dificultad: "media", opciones: ["Porque cada suelo alcanza su máxima densidad a una humedad óptima", "Porque afecta al color final del terraplén", "Porque determina el precio de la mano de obra", "Porque no tiene ninguna influencia en la compactación"], correcta: 0 },
  { enunciado: "¿Qué es el 'coronamiento' de un terraplén?", explicacion: "La capa superior, que suele exigir mayor compactación por soportar directamente el firme o la cimentación.", dificultad: "media", opciones: ["La capa superior, con mayor exigencia de compactación", "La capa más profunda del terraplén", "El talud exterior del relleno", "El sistema de drenaje del terraplén"], correcta: 0 },
  { enunciado: "¿Qué es el 'saneo' del terreno antes de ejecutar un terraplén?", explicacion: "La retirada previa de tierra vegetal u otro material inadecuado, para asentar el terraplén sobre fondo firme.", dificultad: "media", opciones: ["La retirada previa de tierra vegetal o material inadecuado", "La compactación final del coronamiento", "El drenaje de aguas subterráneas", "El ensayo de densidad del terraplén"], correcta: 0 },
  { enunciado: "¿Por qué interesa compensar desmontes y terraplenes al planificar un movimiento de tierras?", explicacion: "Para reducir el transporte de tierras sobrantes o de préstamo.", dificultad: "dificil", opciones: ["Para reducir el transporte de tierras sobrantes o de préstamo", "Para evitar el uso de compactadores mecánicos", "Porque lo exige siempre el Código Estructural", "Para eliminar la necesidad del ensayo Proctor"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: capas-granulares-grava-cemento
// ─────────────────────────────────────────────────────────────────────────
const S3 = "capas-granulares-grava-cemento";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es una capa granular de firme?", reverso: "Una capa formada por áridos (sin conglomerante o con muy poco) que se extiende y compacta sobre la explanada, para repartir cargas y drenar, sirviendo de base o subbase antes del pavimento" },
    { anverso: "¿Qué es la zahorra?", reverso: "Un material granular formado por partículas de distintos tamaños, con una granulometría continua, empleado para formar capas de base o subbase de firmes" },
    { anverso: "¿Qué diferencia hay entre zahorra natural y zahorra artificial?", reverso: "La zahorra natural procede directamente de yacimientos naturales sin más tratamiento que su clasificación granulométrica; la artificial procede de la trituración (machaqueo) de piedra de cantera o de otros materiales, con mayor control de su granulometría" },
    { anverso: "¿Qué es la subbase de un firme?", reverso: "La capa granular situada inmediatamente sobre la explanada, por debajo de la base, cuya función principal es repartir las cargas del tráfico y proteger la explanada" },
    { anverso: "¿Qué es la base de un firme?", reverso: "La capa granular o tratada situada entre la subbase y el pavimento (o entre la explanada y el pavimento si no existe subbase), que soporta directamente las cargas transmitidas por el pavimento" },
    { anverso: "¿Qué es la grava-cemento?", reverso: "Un material granular (gravilla o zahorra) mezclado con una pequeña proporción de cemento y agua, que tras su compactación y curado adquiere mayor cohesión y resistencia que una capa granular sin tratar" },
    { anverso: "¿Qué ventaja aporta la grava-cemento frente a una capa granular sin tratar?", reverso: "Mayor resistencia mecánica y rigidez, lo que permite repartir mejor las cargas y reducir el espesor necesario de la capa para una misma capacidad portante" },
    { anverso: "¿En qué elementos de una obra de albañilería es habitual emplear grava-cemento como relleno?", reverso: "En rellenos de zanjas bajo pavimentos y viales, y como base de soleras o pavimentaciones donde se requiere mayor estabilidad que un simple relleno granular" },
    { anverso: "¿Por qué debe compactarse la grava-cemento poco después de su fabricación o extendido?", reverso: "Porque el cemento empieza a fraguar desde el amasado; si se retrasa la compactación, se pierde trabajabilidad y no se alcanza la densidad y resistencia previstas" },
    { anverso: "¿Qué comprobaciones de control de calidad son habituales en capas granulares y grava-cemento?", reverso: "El control granulométrico del material, la humedad de compactación y el grado de compactación alcanzado (densidad respecto al Proctor de referencia)" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es una capa granular de firme?", explicacion: "Una capa de áridos que reparte cargas y drena, sirviendo de base o subbase.", dificultad: "media", opciones: ["Una capa de áridos que reparte cargas y drena", "Una capa exclusivamente de hormigón armado", "Un tipo de mortero impermeabilizante", "Un sistema de entibación de zanjas"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre zahorra natural y artificial?", explicacion: "La natural procede de yacimientos sin tratar; la artificial de machaqueo de cantera, con mayor control granulométrico.", dificultad: "media", opciones: ["La natural no se tritura, la artificial procede de machaqueo", "Son exactamente el mismo material", "La artificial nunca se usa en subbases", "La natural solo se usa en pavimentos urbanos"], correcta: 0 },
  { enunciado: "¿Cuál es la función principal de la subbase de un firme?", explicacion: "Repartir las cargas del tráfico y proteger la explanada.", dificultad: "media", opciones: ["Repartir cargas y proteger la explanada", "Servir de acabado estético del pavimento", "Sustituir a la base sin necesidad de esta", "Impermeabilizar totalmente el terreno"], correcta: 0 },
  { enunciado: "¿Qué es la grava-cemento?", explicacion: "Un material granular mezclado con una pequeña proporción de cemento y agua, con mayor cohesión que una capa sin tratar.", dificultad: "media", opciones: ["Un material granular tratado con una pequeña proporción de cemento", "Un tipo de hormigón armado estructural", "Un mortero de agarre para fábricas vistas", "Un aditivo plastificante para morteros"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta la grava-cemento frente a una capa granular sin tratar?", explicacion: "Mayor resistencia mecánica y rigidez.", dificultad: "media", opciones: ["Mayor resistencia mecánica y rigidez", "Menor coste que cualquier zahorra", "Mayor permeabilidad al agua", "Menor necesidad de compactación"], correcta: 0 },
  { enunciado: "¿Dónde es habitual emplear grava-cemento en obras de albañilería?", explicacion: "En rellenos de zanjas bajo pavimentos y como base de soleras.", dificultad: "media", opciones: ["En rellenos de zanjas bajo pavimentos y bases de soleras", "Únicamente en cubiertas inclinadas", "Solo en tabiquería interior", "Exclusivamente en impermeabilizaciones"], correcta: 0 },
  { enunciado: "¿Por qué debe compactarse la grava-cemento poco después de su fabricación?", explicacion: "Porque el cemento empieza a fraguar desde el amasado y se pierde trabajabilidad si se retrasa.", dificultad: "media", opciones: ["Porque el cemento empieza a fraguar desde el amasado", "Porque el material se seca y pierde peso", "Porque lo exige el pliego administrativo siempre", "Porque cambia de color con el tiempo"], correcta: 0 },
  { enunciado: "¿Qué controles de calidad son habituales en capas granulares y grava-cemento?", explicacion: "Control granulométrico, humedad de compactación y grado de compactación alcanzado.", dificultad: "media", opciones: ["Granulometría, humedad y grado de compactación", "Únicamente el color del material", "Solo el precio de mercado del árido", "Exclusivamente la procedencia geográfica"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Vincular a la oposición (Tema 11)
// ─────────────────────────────────────────────────────────────────────────
console.log(`\n🔗 Vinculando ${TEMA} como Tema 11 de ${OPOSICION}...`);
await upsert(
  "tema_oposicion",
  [
    {
      tema_slug: TEMA,
      oposicion_slug: OPOSICION,
      bloque_id: BLOQUE_2_ID,
      numero: 11,
      orden: 11,
      es_premium: false,
      publicado: true,
      secciones_incluidas: null,
    },
  ],
  "tema_slug,oposicion_slug"
);

console.log("\n✅ tema-49 creado y vinculado como Tema 11 de Oficial Albañil.");

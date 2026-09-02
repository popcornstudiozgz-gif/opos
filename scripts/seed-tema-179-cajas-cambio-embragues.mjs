/**
 * Crea tema-179: "Cajas de cambios y embragues del automóvil" — Tema 15
 * (numero=15, bloque-2) de Oficial Mecánico.
 *
 * Corresponde al TEMA 13 oficial: "Cajas de cambios y embragues del
 * automóvil."
 *
 * Conocimiento técnico consolidado de mecánica del automóvil, sin una
 * ley española que lo regule como tal.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-179-cajas-cambio-embragues.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-179";
const OPOSICION = "oficial-mecanico-ayto-zaragoza";
const BLOQUE_2_ID = "aa6cf0d6-e9fd-4e52-837d-15fab35cbcbe";

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
  titulo: "Cajas de cambios y embragues del automóvil",
  descripcion: "El embrague y sus tipos, la caja de cambios manual y sus relaciones de marchas, y las cajas de cambios automáticas y de doble embrague.",
  contenido: "Desarrolla el sistema de transmisión del automóvil relacionado con el cambio de marchas: el embrague (función y tipos), la caja de cambios manual (funcionamiento, sincronizadores, relaciones de marcha) y, de forma comparativa, las cajas de cambios automáticas y de doble embrague, cada vez más presentes en la flota de vehículos actual.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "El embrague: función y tipos", seccion: "embrague-funcionamiento-tipos", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "La caja de cambios manual", seccion: "caja-cambios-manual-marchas", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Cajas de cambios automáticas y de doble embrague", seccion: "caja-cambios-automatica-doble-embrague", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "embrague-funcionamiento-tipos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la función del embrague en un vehículo con caja de cambios manual?", reverso: "Permitir desacoplar de forma temporal y progresiva el motor de la caja de cambios, para poder cambiar de marcha o detener el vehículo sin que el motor se cale" },
  { anverso: "¿Qué es el disco de embrague?", reverso: "El elemento, recubierto de un material de fricción, que se interpone entre el volante motor y el plato de presión, transmitiendo el movimiento del motor a la caja de cambios cuando el pedal de embrague no está pisado" },
  { anverso: "¿Qué es el plato de presión (o mecanismo de embrague)?", reverso: "El elemento que, mediante uno o varios muelles, presiona el disco de embrague contra el volante motor, permitiendo la transmisión del movimiento; se libera al pisar el pedal de embrague" },
  { anverso: "¿Qué es un embrague hidráulico (o convertidor de par), característico de las cajas automáticas tradicionales?", reverso: "Un sistema que transmite el movimiento del motor a la caja de cambios mediante un fluido hidráulico, sin contacto mecánico directo, permitiendo un acoplamiento progresivo y suave sin necesidad de un pedal de embrague" },
  { anverso: "¿Qué síntomas suele presentar un embrague desgastado?", reverso: "Patinamiento (el motor sube de revoluciones sin que aumente la velocidad proporcionalmente, especialmente en cuestas o al acelerar con fuerza), dificultad para meter marchas, o vibraciones al soltar el pedal" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuál es la función del embrague en un vehículo con caja de cambios manual?", explicacion: "Desacoplar de forma temporal el motor de la caja de cambios para cambiar de marcha o detener el vehículo.", dificultad: "facil", opciones: ["Desacoplar temporalmente el motor de la caja de cambios", "Generar la chispa que enciende la mezcla del motor", "Impulsar el combustible a presión hacia los inyectores", "Evacuar el calor generado por la combustión del motor"], correcta: 0 },
  { enunciado: "¿Qué es el disco de embrague?", explicacion: "El elemento que transmite el movimiento del motor a la caja de cambios cuando el pedal no está pisado.", dificultad: "media", opciones: ["El elemento que transmite el movimiento del motor a la caja de cambios", "El elemento que genera la presión de sobrealimentación del motor", "El elemento que filtra las impurezas del aceite del motor", "El elemento que regula la temperatura del líquido refrigerante"], correcta: 0 },
  { enunciado: "¿Qué función cumple el plato de presión del embrague?", explicacion: "Presiona el disco de embrague contra el volante motor mediante muelles.", dificultad: "media", opciones: ["Presiona el disco de embrague contra el volante motor", "Genera la chispa que enciende la mezcla del motor", "Filtra las impurezas presentes en el combustible del motor", "Regula la apertura y cierre de las válvulas del motor"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un embrague hidráulico (convertidor de par)?", explicacion: "Transmite el movimiento mediante un fluido hidráulico, sin contacto mecánico directo, sin necesidad de pedal.", dificultad: "dificil", opciones: ["Transmite el movimiento mediante un fluido hidráulico, sin pedal", "Es un sistema exclusivo de las cajas de cambio manuales", "Funciona de forma idéntica a un embrague de disco convencional", "Requiere siempre un pedal de embrague para su funcionamiento"], correcta: 0 },
  { enunciado: "¿Qué síntoma es característico de un embrague desgastado (patinando)?", explicacion: "El motor sube de revoluciones sin que aumente la velocidad proporcionalmente.", dificultad: "media", opciones: ["El motor sube de revoluciones sin aumentar la velocidad proporcionalmente", "El motor pierde revoluciones de forma repentina al acelerar", "El vehículo aumenta su velocidad sin pisar el acelerador", "El vehículo emite humo blanco de forma constante por el escape"], correcta: 0 },
]);

const S2 = "caja-cambios-manual-marchas";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la función de la caja de cambios de un vehículo?", reverso: "Adaptar la relación entre el régimen de giro del motor y la velocidad de las ruedas, mediante distintas relaciones de marcha (piñones de distinto tamaño), permitiendo un uso eficiente del motor en distintas situaciones de circulación" },
  { anverso: "¿Qué es un sincronizador, en una caja de cambios manual moderna?", reverso: "Un mecanismo que iguala la velocidad de giro de los engranajes antes de que se acoplen al cambiar de marcha, permitiendo un cambio suave y sin el característico ruido de engranajes de las cajas antiguas sin sincronizar" },
  { anverso: "¿Qué es la relación de marcha (o relación de transmisión) de una velocidad concreta?", reverso: "La relación entre el número de dientes del piñón conductor y el conducido en esa marcha, que determina cuántas vueltas debe dar el motor por cada vuelta de las ruedas en esa velocidad" },
  { anverso: "¿Por qué las marchas cortas (primera, segunda) tienen una relación de transmisión distinta a las marchas largas (quinta, sexta)?", reverso: "Las marchas cortas priorizan la fuerza de tracción (más vueltas de motor por vuelta de rueda), útiles para arrancar o subir pendientes; las marchas largas priorizan la eficiencia y velocidad a régimen de motor más bajo, típicas de circulación en carretera" },
  { anverso: "¿Qué es la marcha atrás en una caja de cambios manual?", reverso: "Una relación de marcha específica que invierte el sentido de giro de la transmisión hacia las ruedas mediante un engranaje intermedio adicional, permitiendo que el vehículo se desplace hacia atrás" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Cuál es la función de la caja de cambios?", explicacion: "Adaptar la relación entre el régimen del motor y la velocidad de las ruedas mediante distintas relaciones de marcha.", dificultad: "facil", opciones: ["Adaptar la relación entre el régimen del motor y la velocidad", "Generar la chispa que enciende la mezcla del motor", "Impulsar el combustible a presión hacia los inyectores", "Evacuar el calor generado por la combustión del motor"], correcta: 0 },
  { enunciado: "¿Qué función cumple un sincronizador en una caja de cambios manual moderna?", explicacion: "Iguala la velocidad de giro de los engranajes antes de acoplarse, permitiendo un cambio suave.", dificultad: "media", opciones: ["Iguala la velocidad de los engranajes antes de acoplarse", "Genera la presión de sobrealimentación del motor", "Filtra las impurezas presentes en el aceite del motor", "Regula la temperatura del líquido refrigerante del motor"], correcta: 0 },
  { enunciado: "¿Qué indica la relación de marcha de una velocidad concreta?", explicacion: "Cuántas vueltas debe dar el motor por cada vuelta de las ruedas en esa marcha.", dificultad: "media", opciones: ["Cuántas vueltas da el motor por cada vuelta de las ruedas", "La potencia máxima que puede alcanzar el motor", "El par motor máximo que puede generar el motor", "El número total de cilindros del motor"], correcta: 0 },
  { enunciado: "¿Por qué las marchas cortas priorizan la fuerza de tracción?", explicacion: "Tienen más vueltas de motor por vuelta de rueda, útiles para arrancar o subir pendientes.", dificultad: "dificil", opciones: ["Tienen más vueltas de motor por vuelta de rueda", "Tienen menos vueltas de motor por vuelta de rueda", "No existe ninguna diferencia real entre marchas cortas y largas", "Las marchas cortas solo se emplean en vehículos automáticos"], correcta: 0 },
  { enunciado: "¿Cómo se consigue la marcha atrás en una caja de cambios manual?", explicacion: "Mediante un engranaje intermedio adicional que invierte el sentido de giro hacia las ruedas.", dificultad: "media", opciones: ["Mediante un engranaje intermedio que invierte el sentido de giro", "Invirtiendo directamente el sentido de giro del motor", "Mediante el mismo mecanismo que la primera marcha, sin diferencia", "La marcha atrás no requiere ningún engranaje adicional"], correcta: 0 },
]);

const S3 = "caja-cambios-automatica-doble-embrague";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué caracteriza a una caja de cambios automática tradicional (hidráulica, con convertidor de par)?", reverso: "Cambia de marcha de forma automática sin intervención del conductor, empleando un convertidor de par en lugar de un embrague de disco convencional, y un conjunto de engranajes planetarios gestionados hidráulica y electrónicamente" },
  { anverso: "¿Qué es una caja de cambios de doble embrague (DSG, DCT)?", reverso: "Un tipo de caja de cambios automatizada que emplea dos embragues independientes (uno para las marchas pares, otro para las impares), lo que permite preseleccionar la siguiente marcha y realizar cambios extremadamente rápidos y sin corte de tracción" },
  { anverso: "¿Qué ventaja principal aporta una caja de doble embrague frente a una automática tradicional con convertidor de par?", reverso: "Cambios de marcha más rápidos y con menor pérdida de eficiencia energética, al no depender de un convertidor de par que introduce cierta pérdida por deslizamiento hidráulico" },
  { anverso: "¿Qué es una caja de cambios automatizada de embrague simple (o caja secuencial automatizada)?", reverso: "Una caja de cambios mecánicamente similar a una manual, pero en la que el embrague y el cambio de marchas se accionan de forma automática mediante actuadores, sin pedal de embrague ni palanca de cambio manual convencional" },
  { anverso: "¿Por qué el mantenimiento del líquido (aceite) de una caja automática o de doble embrague es especialmente importante?", reverso: "Porque estos sistemas dependen de una presión hidráulica precisa y de la lubricación de componentes electrónicos y mecánicos de alta precisión; un aceite degradado o en mal estado puede provocar averías costosas y cambios bruscos o erráticos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué caracteriza a una caja de cambios automática tradicional con convertidor de par?", explicacion: "Cambia de marcha sin intervención del conductor, empleando un convertidor de par y engranajes planetarios.", dificultad: "media", opciones: ["Cambia de marcha automáticamente mediante convertidor de par", "Requiere siempre un pedal de embrague manual convencional", "Es un sistema exclusivo de los vehículos de gama muy básica", "Funciona de forma idéntica a una caja manual convencional"], correcta: 0 },
  { enunciado: "¿Qué es una caja de cambios de doble embrague (DSG/DCT)?", explicacion: "Emplea dos embragues independientes que permiten preseleccionar la siguiente marcha y cambiar sin corte de tracción.", dificultad: "media", opciones: ["Emplea dos embragues que permiten cambios sin corte de tracción", "Emplea un único embrague hidráulico sin ningún componente mecánico", "Es idéntica en funcionamiento a una caja manual convencional", "No permite ningún tipo de cambio automático de marchas"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta la caja de doble embrague frente a la automática tradicional con convertidor de par?", explicacion: "Cambios más rápidos y mayor eficiencia energética, al evitar la pérdida por deslizamiento hidráulico del convertidor.", dificultad: "dificil", opciones: ["Cambios más rápidos y mayor eficiencia energética", "No aporta ninguna ventaja real frente al convertidor de par", "Siempre resulta menos eficiente que un convertidor de par", "Elimina por completo la necesidad de cualquier tipo de embrague"], correcta: 0 },
  { enunciado: "¿Qué es una caja automatizada de embrague simple (caja secuencial automatizada)?", explicacion: "Mecánicamente similar a una manual, pero con embrague y cambio accionados automáticamente por actuadores.", dificultad: "dificil", opciones: ["Similar a una manual, pero con embrague y cambio automatizados", "Es idéntica en construcción a una caja de doble embrague", "Requiere siempre un pedal de embrague accionado por el conductor", "Es un sistema exclusivo de los vehículos eléctricos"], correcta: 0 },
  { enunciado: "¿Por qué es especialmente importante el mantenimiento del aceite en una caja automática o de doble embrague?", explicacion: "Estos sistemas dependen de una presión hidráulica precisa y de lubricación de precisión; un aceite degradado puede provocar averías costosas.", dificultad: "media", opciones: ["Dependen de presión hidráulica precisa y lubricación de precisión", "El aceite de estas cajas nunca requiere ningún tipo de mantenimiento", "Solo es relevante en cajas de cambio manuales convencionales", "El aceite de la caja de cambios no influye en su funcionamiento"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 15 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 15, orden: 15, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-179 creado y vinculado como Tema 15 de Oficial Mecánico.");

/**
 * Crea tema-65: "Carpintería de madera, cerrajería y persianas" — Tema 11
 * (numero=11, bloque-2) de Oficial Mantenimiento General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 9 oficial del Anexo I (bases2110.pdf):
 *   "Carpintería de madera, cerrajería y persianas: Nociones básicas,
 *   reconocimiento de herramientas y operaciones básicas de
 *   mantenimiento."
 *
 * Conocimiento técnico consolidado del oficio; no requiere cita legal
 * artículo a artículo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-65-carpinteria-cerrajeria-persianas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-65";
const OPOSICION = "oficial-mantenimiento-ayto-zaragoza";
const BLOQUE_2_ID = "336de420-fb74-4814-9d50-6e2981ed064f";

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
  titulo: "Carpintería de madera, cerrajería y persianas",
  descripcion: "Nociones básicas, reconocimiento de herramientas y operaciones básicas de mantenimiento en carpintería de madera, cerrajería y persianas.",
  contenido: "Desarrolla las nociones básicas de carpintería de madera (tipos de madera, tableros, herrajes), de cerrajería (tipos de cerraduras y herrajes metálicos) y de persianas (tipos y mecanismos), junto con las herramientas y operaciones básicas de mantenimiento de cada especialidad.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Carpintería de madera: nociones y mantenimiento básico", seccion: "carpinteria-madera-nociones-basicas", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Cerrajería: nociones y mantenimiento básico", seccion: "cerrajeria-nociones-basicas", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Persianas: tipos y mantenimiento básico", seccion: "persianas-mantenimiento-basico", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "carpinteria-madera-nociones-basicas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué diferencia hay entre madera maciza y tablero derivado de la madera?", reverso: "La madera maciza procede directamente del tronco; el tablero derivado (contrachapado, aglomerado, DM/MDF) se fabrica con virutas, fibras o chapas de madera unidas con adhesivo" },
  { anverso: "¿Qué es un tablero DM o MDF?", reverso: "Un tablero de fibras de madera prensadas con resina, de superficie lisa y uniforme, muy usado en puertas y mobiliario por su fácil mecanizado" },
  { anverso: "¿Qué es un tablero contrachapado?", reverso: "Un tablero formado por varias chapas finas de madera encoladas con las fibras cruzadas entre capas, lo que le da estabilidad dimensional y resistencia" },
  { anverso: "¿Qué es una bisagra y qué tipos básicos existen?", reverso: "El herraje que permite el giro de una puerta o ventana sobre su marco; existen bisagras de pala tradicionales y bisagras ocultas o de cazoleta, entre otras" },
  { anverso: "¿Qué es un pomo y qué es una manilla en una puerta?", reverso: "El pomo es un tirador giratorio (redondo); la manilla es una palanca que se acciona hacia abajo para liberar el pestillo del mecanismo de la cerradura" },
  { anverso: "¿Qué causa habitual provoca que una puerta de madera 'roce' o no cierre bien?", reverso: "El hinchamiento de la madera por humedad, el desajuste o desgaste de las bisagras, o el asentamiento/movimiento del marco" },
  { anverso: "¿Cómo se soluciona el rozamiento de una puerta por hinchamiento de la madera?", reverso: "Cepillando o lijando ligeramente el canto de la puerta en la zona de roce, y aplicando después un producto protector para sellar la madera" },
  { anverso: "¿Qué es un cierrapuertas (o brazo hidráulico)?", reverso: "Un mecanismo que cierra automáticamente una puerta tras abrirla, regulando la velocidad de cierre mediante un pistón hidráulico" },
  { anverso: "¿Qué producto se usa habitualmente para proteger y mantener la madera de una carpintería exterior?", reverso: "Barnices o lasures protectores frente a la humedad y los rayos UV, que deben renovarse periódicamente según su exposición" },
  { anverso: "¿Qué es un tope de puerta y para qué se usa?", reverso: "Un elemento (de suelo o de pared) que impide que la puerta, al abrirse, golpee contra la pared u otro elemento" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué diferencia la madera maciza de un tablero derivado?", explicacion: "El tablero se fabrica con virutas, fibras o chapas unidas con adhesivo; la maciza procede directamente del tronco.", dificultad: "facil", opciones: ["El tablero se fabrica con virutas/fibras/chapas encoladas", "No hay ninguna diferencia real", "La madera maciza siempre es más barata", "El tablero solo se usa en exteriores"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un tablero contrachapado?", explicacion: "Varias chapas finas encoladas con las fibras cruzadas, dando estabilidad dimensional.", dificultad: "media", opciones: ["Chapas finas encoladas con fibras cruzadas", "Fibras prensadas con resina en una sola capa", "Es siempre más pesado que la madera maciza", "No admite mecanizado"], correcta: 0 },
  { enunciado: "¿Qué herraje permite el giro de una puerta sobre su marco?", explicacion: "La bisagra.", dificultad: "facil", opciones: ["La bisagra", "El pomo", "El cierrapuertas", "El tope de puerta"], correcta: 0 },
  { enunciado: "¿Qué diferencia un pomo de una manilla?", explicacion: "El pomo es giratorio; la manilla se acciona hacia abajo.", dificultad: "media", opciones: ["El pomo es giratorio; la manilla se acciona hacia abajo", "Son términos sinónimos sin diferencia", "El pomo solo existe en ventanas", "La manilla no libera ningún pestillo"], correcta: 0 },
  { enunciado: "¿Qué causa habitual hace que una puerta de madera roce al cerrar?", explicacion: "El hinchamiento por humedad o el desajuste de bisagras.", dificultad: "media", opciones: ["Hinchamiento por humedad o desajuste de bisagras", "El uso de un tablero contrachapado", "La aplicación reciente de barniz", "El tipo de pomo instalado"], correcta: 0 },
  { enunciado: "¿Cómo se soluciona el roce de una puerta por hinchamiento de la madera?", explicacion: "Cepillando o lijando el canto y aplicando después un protector.", dificultad: "media", opciones: ["Cepillando/lijando el canto y aplicando protector", "Sustituyendo siempre la puerta entera", "Aplicando solo barniz sin lijar", "Ajustando únicamente la manilla"], correcta: 0 },
  { enunciado: "¿Qué función cumple un cierrapuertas o brazo hidráulico?", explicacion: "Cierra automáticamente la puerta regulando la velocidad de cierre.", dificultad: "media", opciones: ["Cierra automáticamente la puerta regulando su velocidad", "Impide que la puerta se abra", "Protege la madera de la humedad", "Sustituye a la bisagra"], correcta: 0 },
  { enunciado: "¿Qué producto protege habitualmente una carpintería de madera exterior?", explicacion: "Barnices o lasures protectores frente a humedad y UV.", dificultad: "facil", opciones: ["Barnices o lasures protectores", "Mortero cola", "Lechada de rejuntar", "Yeso de acabado"], correcta: 0 },
]);

const S2 = "cerrajeria-nociones-basicas";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una cerradura de embutir?", reverso: "Una cerradura que se aloja encajada dentro del canto de la puerta, siendo el tipo más habitual en puertas de paso interiores y exteriores" },
  { anverso: "¿Qué es un bombín en una cerradura?", reverso: "El cilindro donde se introduce la llave y que acciona el mecanismo de apertura; puede sustituirse de forma independiente al resto de la cerradura" },
  { anverso: "¿Qué es un pestillo y qué es un cerrojo en una cerradura?", reverso: "El pestillo es la pieza biselada que se retrae al empujar la puerta (cierre automático); el cerrojo es la pieza recta que solo se mueve accionando la llave o la manilla, y da el cierre de seguridad" },
  { anverso: "¿Qué es una cerradura antibumping o de alta seguridad?", reverso: "Una cerradura diseñada con mecanismos adicionales que dificultan las técnicas de apertura sin llave (bumping, ganzuado)" },
  { anverso: "¿Qué es un cierre de seguridad de tres puntos?", reverso: "Un sistema que, al girar la llave, acciona simultáneamente el cierre en tres puntos de la puerta (arriba, centro y abajo), mejorando la resistencia frente a la fuerza" },
  { anverso: "¿Qué es una cancela o verja metálica y qué mantenimiento básico requiere?", reverso: "Un cerramiento metálico de acceso; requiere engrase periódico de bisagras y cerradura, y repintado o tratamiento antioxidante de las zonas oxidadas" },
  { anverso: "¿Qué es la oxidación galvánica y cómo se previene en elementos de cerrajería exterior?", reverso: "La corrosión del metal por exposición a humedad y oxígeno; se previene con pinturas antioxidantes (minio o similar) y galvanizado o tratamientos protectores" },
  { anverso: "¿Qué herramienta se usa para soldar elementos metálicos de cerrajería?", reverso: "El equipo de soldadura eléctrica (por arco) o el soplete de soldadura autógena, según el tipo de unión y espesor del metal" },
  { anverso: "¿Qué diferencia hay entre una llave normal y una llave de seguridad (con perfil europeo protegido)?", reverso: "La llave de seguridad tiene un perfil más complejo, protecciones antibumping/antitaladro, y suele ser de copia restringida (tarjeta de propiedad)" },
  { anverso: "¿Qué es un cerrador magnético (electroimán) en una puerta de acceso controlado?", reverso: "Un dispositivo que mantiene la puerta cerrada mediante fuerza magnética mientras recibe corriente, liberándola al cortar la alimentación (por ejemplo, desde un control de accesos)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una cerradura de embutir?", explicacion: "La que se aloja encajada dentro del canto de la puerta.", dificultad: "facil", opciones: ["La que se aloja encajada en el canto de la puerta", "La que se coloca sobre la superficie de la puerta", "Un tipo de bisagra de seguridad", "Un sistema de cierre magnético"], correcta: 0 },
  { enunciado: "¿Qué es el bombín de una cerradura?", explicacion: "El cilindro donde se introduce la llave y acciona el mecanismo.", dificultad: "media", opciones: ["El cilindro donde se introduce la llave", "La pieza biselada del pestillo", "El cierre de tres puntos", "El herraje que sujeta la cancela"], correcta: 0 },
  { enunciado: "¿Qué diferencia el pestillo del cerrojo en una cerradura?", explicacion: "El pestillo se retrae al empujar; el cerrojo solo se mueve con llave o manilla.", dificultad: "media", opciones: ["El pestillo se retrae al empujar; el cerrojo necesita llave/manilla", "Son la misma pieza con distinto nombre", "El cerrojo se retrae automáticamente", "El pestillo da el cierre de seguridad"], correcta: 0 },
  { enunciado: "¿Qué mejora aporta un cierre de seguridad de tres puntos?", explicacion: "Acciona el cierre en tres puntos de la puerta, mejorando la resistencia.", dificultad: "media", opciones: ["Mejora la resistencia cerrando en tres puntos", "Solo sirve para puertas de madera", "Elimina la necesidad de bombín", "Sustituye a la bisagra"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento básico requiere una cancela o verja metálica?", explicacion: "Engrase de bisagras/cerradura y tratamiento antioxidante.", dificultad: "facil", opciones: ["Engrase y tratamiento antioxidante", "Ningún mantenimiento periódico", "Solo sustitución anual completa", "Solo lijado sin pintar"], correcta: 0 },
  { enunciado: "¿Cómo se previene la corrosión en elementos de cerrajería exterior?", explicacion: "Con pinturas antioxidantes y tratamientos como el galvanizado.", dificultad: "media", opciones: ["Con pinturas antioxidantes y galvanizado", "Dejando el metal sin ningún tratamiento", "Aplicando solo barniz de madera", "Con lechada de rejuntar"], correcta: 0 },
  { enunciado: "¿Qué distingue a una llave de seguridad frente a una llave normal?", explicacion: "Perfil más complejo, protecciones antibumping/antitaladro y copia restringida.", dificultad: "dificil", opciones: ["Perfil complejo y copia restringida", "Es siempre de mayor tamaño físico", "No puede usarse en cerraduras de embutir", "Solo sirve para cancelas metálicas"], correcta: 0 },
  { enunciado: "¿Cómo funciona un cerrador magnético de una puerta de acceso controlado?", explicacion: "Mantiene la puerta cerrada con fuerza magnética mientras recibe corriente.", dificultad: "media", opciones: ["Mantiene la puerta cerrada mientras recibe corriente", "Cierra la puerta con un resorte mecánico", "Sustituye siempre al bombín", "Solo funciona sin alimentación eléctrica"], correcta: 0 },
]);

const S3 = "persianas-mantenimiento-basico";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué tipos básicos de persiana existen según su accionamiento?", reverso: "Persianas manuales (mediante cinta o manivela) y persianas motorizadas (mediante motor eléctrico y pulsador o mando)" },
  { anverso: "¿Qué es el eje de enrollamiento de una persiana?", reverso: "El tubo giratorio (octogonal habitualmente) sobre el que se enrolla la persiana al subirla" },
  { anverso: "¿Qué es una avería habitual en una persiana de cinta?", reverso: "La rotura de la cinta por desgaste o el atasco del recogedor (enrollador de cinta), que impide subir o bajar la persiana con normalidad" },
  { anverso: "¿Qué es el 'eje motor' en una persiana motorizada y qué avería es habitual en él?", reverso: "El motor tubular alojado dentro del eje de enrollamiento; una avería habitual es el fallo del motor por desgaste o el desajuste de los finales de carrera (que impide que la persiana pare en el punto correcto)" },
  { anverso: "¿Qué son los finales de carrera de una persiana motorizada?", reverso: "Los topes o sensores que indican al motor dónde debe detenerse al subir y al bajar completamente la persiana" },
  { anverso: "¿Qué es una lama de persiana y cómo se repara si está rota o descolgada?", reverso: "Cada una de las piezas horizontales (de PVC o aluminio) que forman el cerramiento; una lama rota o descolgada se sustituye individualmente sin necesidad de cambiar toda la persiana" },
  { anverso: "¿Qué es la guía lateral de una persiana y qué problema provoca su deformación?", reverso: "El carril lateral por el que desliza la persiana al subir/bajar; si se deforma o desalinea, la persiana puede engancharse o descarrilar" },
  { anverso: "¿Qué mantenimiento preventivo básico se recomienda en una persiana motorizada?", reverso: "Comprobar periódicamente el estado de las lamas y guías, engrasar el mecanismo si es necesario, y verificar el correcto ajuste de los finales de carrera" },
  { anverso: "¿Qué precaución de seguridad eléctrica debe tomarse al intervenir en una persiana motorizada?", reverso: "Cortar la alimentación eléctrica del circuito antes de manipular el motor o el cableado, y comprobar la ausencia de tensión" },
  { anverso: "¿Qué diferencia una persiana de aluminio frente a una de PVC?", reverso: "La de aluminio es más resistente y duradera pero más cara; la de PVC es más económica y ligera, aunque menos resistente a impactos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué tipos básicos de persiana existen según su accionamiento?", explicacion: "Manuales (cinta/manivela) y motorizadas.", dificultad: "facil", opciones: ["Manuales y motorizadas", "Solo manuales", "Solo motorizadas", "De aluminio y de madera"], correcta: 0 },
  { enunciado: "¿Qué es el eje de enrollamiento de una persiana?", explicacion: "El tubo giratorio sobre el que se enrolla la persiana.", dificultad: "media", opciones: ["El tubo giratorio sobre el que se enrolla", "El carril lateral por el que desliza", "El motor tubular interior", "La pieza horizontal de PVC"], correcta: 0 },
  { enunciado: "¿Qué avería es habitual en una persiana de cinta?", explicacion: "Rotura de la cinta o atasco del recogedor.", dificultad: "facil", opciones: ["Rotura de la cinta o atasco del recogedor", "Fallo de los finales de carrera", "Desgaste del motor tubular", "Deformación de la guía lateral"], correcta: 0 },
  { enunciado: "¿Qué son los finales de carrera de una persiana motorizada?", explicacion: "Los topes o sensores que indican dónde debe detenerse el motor.", dificultad: "media", opciones: ["Los topes que indican dónde detenerse", "Las piezas horizontales de la persiana", "El carril lateral de deslizamiento", "El recogedor de la cinta"], correcta: 0 },
  { enunciado: "¿Cómo se repara una lama de persiana rota o descolgada?", explicacion: "Se sustituye individualmente, sin cambiar toda la persiana.", dificultad: "media", opciones: ["Sustituyendo la lama individualmente", "Sustituyendo siempre la persiana completa", "Solo con engrase del eje motor", "Ajustando los finales de carrera"], correcta: 0 },
  { enunciado: "¿Qué provoca la deformación de la guía lateral de una persiana?", explicacion: "Que la persiana se enganche o descarrile.", dificultad: "media", opciones: ["Que la persiana se enganche o descarrile", "Que el motor deje de funcionar", "Que la cinta se rompa", "Que las lamas cambien de color"], correcta: 0 },
  { enunciado: "¿Qué precaución de seguridad eléctrica debe tomarse antes de intervenir en una persiana motorizada?", explicacion: "Cortar la alimentación y comprobar ausencia de tensión.", dificultad: "media", opciones: ["Cortar la alimentación y comprobar ausencia de tensión", "No es necesaria ninguna precaución", "Solo desconectar el mando a distancia", "Trabajar siempre con la persiana a medio subir"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre una persiana de aluminio y una de PVC?", explicacion: "El aluminio es más resistente y caro; el PVC más económico y menos resistente.", dificultad: "facil", opciones: ["El aluminio es más resistente; el PVC más económico", "Son idénticas en resistencia y precio", "El PVC es siempre más resistente", "El aluminio no admite motorización"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 11 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 11, orden: 11, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-65 creado y vinculado como Tema 11 de Oficial Mantenimiento General.");

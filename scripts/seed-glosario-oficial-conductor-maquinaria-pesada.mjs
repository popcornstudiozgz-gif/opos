/**
 * Glosario de la parte específica de Oficial Conductor, Especialidad
 * Maquinaria Pesada (tema-219 a tema-234). Selección curada (no
 * exhaustiva) de términos técnicos que puedan resultar complejos, ~2
 * por tema, con la misma `seccion` que las flashcards/preguntas de cada
 * tema para que el recorte por `secciones_incluidas` funcione igual.
 *
 * Uso: node --env-file=.env.local scripts/seed-glosario-oficial-conductor-maquinaria-pesada.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, { method: "POST", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}

function t(tema_slug, seccion, termino, definicion) {
  return { tema_slug, seccion, termino, definicion };
}

const TERMINOS = [
  // tema-219 — Normativa de tráfico, circulación y seguridad vial
  t("tema-219", "ley-trafico-seguridad-vial-objeto-estructura", "LTSV", "Sigla habitual de la Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial (RDLeg 6/2015)."),
  t("tema-219", "vehiculos-especiales-maquinaria-obras-autorizaciones", "ACC", "Autorización complementaria de circulación, permiso que habilita a un vehículo especial a circular superando las masas o dimensiones máximas generales."),

  // tema-220 — PRL en maquinaria pesada
  t("tema-220", "seguridad-intrinseca-vuelco-zonas-muertas-distancia", "ROPS", "Roll-Over Protective Structure: estructura de protección contra el vuelco montada sobre la cabina de una máquina."),
  t("tema-220", "seguridad-intrinseca-vuelco-zonas-muertas-distancia", "FOPS", "Falling-Object Protective Structure: estructura de protección contra la caída de objetos sobre la cabina."),

  // tema-221 — Señalización de obras
  t("tema-221", "norma-8-3-ic-senalizacion-balizamiento-defensa", "Balizamiento", "Conjunto de elementos (conos, paneles, luces) que delimitan y guían visualmente el itinerario alrededor de una obra."),
  t("tema-221", "vallado-iluminacion-zanjas-ordenanza-accesibilidad", "Lux", "Unidad de medida de la iluminancia; la Ordenanza de Accesibilidad de Zaragoza exige un mínimo de 10 lux en el vallado nocturno de zanjas."),

  // tema-222 — Trabajos con excavadora (I)
  t("tema-222", "excavadora-tipos-componentes-principales", "Corona de giro", "Elemento circular que permite a la torreta de la excavadora girar libremente sobre el chasis inferior."),
  t("tema-222", "cuchara-bivalva-normas-seguridad-vigentes", "Cuchara bivalva", "Accesorio de dos mandíbulas articuladas que se abren y cierran hidráulicamente, usado en excavaciones estrechas y profundas."),

  // tema-223 — Trabajos con excavadora (II)
  t("tema-223", "taludes-zanjas-vaciados-seguridad-excavaciones", "Entibación", "Sistema de contención (madera, metal) que sostiene las paredes de una zanja o excavación para evitar su desprendimiento."),
  t("tema-223", "carga-materiales-martillos-implementos", "Martillo hidráulico", "Implemento acoplable al brazo de la excavadora que golpea repetidamente el material mediante un pistón percutor."),

  // tema-224 — Trabajos con excavadora (III)
  t("tema-224", "aritmetica-areas-volumenes-movimientos-tierras", "Esponjamiento", "Aumento de volumen que experimenta un material al ser excavado respecto a su volumen original en el terreno (\"en banco\")."),
  t("tema-224", "interpretacion-croquis-dibujos-obra", "Rasante", "Línea que representa el nivel o cota final que debe alcanzar el fondo de una excavación o una superficie de proyecto."),

  // tema-225 — Trabajos con palas cargadoras
  t("tema-225", "pala-cargadora-metodo-trabajo", "Cazo", "Elemento final del equipo de trabajo de una pala cargadora o excavadora, que realiza la excavación o el acopio del material."),
  t("tema-225", "carga-materiales-alimentacion-tolvas-acopio", "Tolva", "Recipiente en forma de embudo en el que se descarga material desde el cazo para su procesamiento posterior."),

  // tema-226 — Mini-excavadoras
  t("tema-226", "mini-excavadoras-tipos-esquema-funcionamiento", "Zero tail swing", "Característica de una mini-excavadora cuya superestructura no sobresale del ancho del tren de rodaje al girar."),
  t("tema-226", "mini-excavadoras-metodo-trabajo", "Offset boom", "Brazo desplazable lateralmente que permite excavar junto a un muro sin girar la torreta de la máquina."),

  // tema-227 — Moto-niveladoras, bulldozer y angledozer
  t("tema-227", "motoniveladora-tipos-esquema-funcionamiento", "Mould-board", "Denominación técnica de la hoja o cuchilla central orientable de una motoniveladora."),
  t("tema-227", "bulldozer-angledozer-tipos-funcionamiento-metodo-trabajo", "Angledozer", "Variante del bulldozer cuya hoja frontal puede orientarse en ángulo respecto al eje de la máquina."),

  // tema-228 — Compactadores
  t("tema-228", "compactadores-tipos-esquema-funcionamiento", "Pata de cabra", "Compactador cuyo tambor incorpora salientes que penetran y amasan un suelo cohesivo desde su interior."),
  t("tema-228", "compactadores-metodo-trabajo-grado-compactacion", "Grado Proctor", "Porcentaje que relaciona la densidad seca alcanzada en obra con la densidad máxima del ensayo Proctor de laboratorio."),

  // tema-229 — Tipos de excavación y mecánica del suelo
  t("tema-229", "mecanica-suelo-esponjamiento-dureza-compacidad", "Compacidad", "Grado de proximidad entre las partículas de un suelo, relacionado con su densidad y los huecos de aire entre ellas."),
  t("tema-229", "firmes-cimentaciones-redes-taludes-escalonados", "Blandón", "Zona localizada del firme o la explanada con escasa capacidad portante, que debe sanearse y sustituirse."),

  // tema-230 — Fuerzas de excavación, centro de gravedad y transporte
  t("tema-230", "fuerzas-excavacion-centro-gravedad", "Centro de gravedad", "Punto en el que se considera concentrado el peso total de la máquina, determinante del riesgo de vuelco."),
  t("tema-230", "transporte-maquinas-autorizaciones-circulacion", "Góndola", "Remolque de plataforma muy baja diseñado para el transporte por carretera de maquinaria de gran peso y altura."),

  // tema-231 — Mantenimiento de maquinaria
  t("tema-231", "mantenimiento-preventivo-verificacion-niveles", "Mantenimiento preventivo", "Mantenimiento programado, realizado antes de que se produzca una avería, para evitarla."),
  t("tema-231", "partes-averia-mantenimiento-documentacion", "Horómetro", "Instrumento que registra las horas totales de funcionamiento de una máquina, usado para planificar su mantenimiento."),

  // tema-232 — Procedimientos de operación segura
  t("tema-232", "control-final-tarea-medidas-seguridad-mantenimiento", "Consignación", "Conjunto de medidas para impedir la puesta en marcha accidental de una máquina mientras se interviene sobre ella."),
  t("tema-232", "control-interpretacion-sistemas-despues-arrancar", "Testigo de aviso", "Indicador luminoso del panel de instrumentos que avisa de una anomalía en un sistema de la máquina (presión, temperatura, carga)."),

  // tema-233 — Motores diésel en maquinaria de obras
  t("tema-233", "motor-diesel-componentes-funcionamiento-hidraulico", "Transmisión hidrostática", "Sistema de transmisión que impulsa fluido a presión hacia motores hidráulicos, sin acoplamiento mecánico directo."),
  t("tema-233", "circuitos-electricos-neumaticos-cadenas-cabina", "Cadena de rodaje", "Conjunto de eslabones articulados que proporciona tracción y estabilidad sobre terrenos blandos o irregulares."),

  // tema-234 — Camiones específicos para movimiento de tierras
  t("tema-234", "camiones-movimiento-tierras-tipos-dumper-articulado", "Dumper articulado", "Camión de obra cuyo chasis está dividido en dos secciones unidas por una articulación central."),
  t("tema-234", "seguridad-camiones-obra-normativa-vehiculos", "V-20", "Señal distintiva de vehículo lento exigible a determinados vehículos cuya velocidad máxima por construcción es reducida."),
];

console.log(`📖 Insertando ${TERMINOS.length} términos de glosario...`);
const insertados = await insertar("glosario", TERMINOS);
console.log(`✅ Glosario de Oficial Conductor Maquinaria Pesada sembrado: ${insertados.length} términos.`);

/**
 * Glosario de la parte específica de Oficial Planta Potabilizadora
 * (tema-203 a tema-218). Selección curada (no exhaustiva) de términos
 * técnicos que puedan resultar complejos, ~2 por tema, con la misma
 * `seccion` que las flashcards/preguntas de cada tema para que el
 * recorte por `secciones_incluidas` funcione igual.
 *
 * Uso: node --env-file=.env.local scripts/seed-glosario-oficial-planta-potabilizadora.mjs
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
  // tema-203 — Parámetros de calidad del agua y normativa sanitaria
  t("tema-203", "parametros-calidad-normativa-rd-140-2003-rd-902-2018", "REACH", "Reglamento (CE) nº 1907/2006 sobre registro, evaluación, autorización y restricción de sustancias químicas, al que se adaptó el régimen de sustancias para el tratamiento del agua."),
  t("tema-203", "contaminantes-organicos-metalicos-microorganismos", "Escherichia coli", "Bacteria empleada como indicador general de contaminación fecal en el agua de consumo humano."),

  // tema-204 — Desbaste, coagulación y floculación
  t("tema-204", "coagulacion-floculacion-conceptos-factores", "Flóculo", "Agregado de partículas formado durante la floculación, de mayor tamaño y densidad que las partículas individuales, capaz de sedimentar."),
  t("tema-204", "reactivos-dosificacion-coagulantes-carbon-co2", "Sulfato de alúmina", "Reactivo coagulante empleado en la Planta Potabilizadora de Casablanca para desestabilizar las partículas en suspensión del agua."),

  // tema-205 — Decantación: el decantador Accelator
  t("tema-205", "decantacion-concepto-accelator-funcionamiento", "Accelator", "Decantador de tipo clarificador-espesador que integra coagulación-floculación y decantación mediante una turbina central de recirculación de fangos."),
  t("tema-205", "purgas-valvulas-control-fangos", "Manto de fangos", "Zona de concentración de fangos en un decantador, cuyo nivel debe controlarse para optimizar la recirculación y programar las purgas."),

  // tema-206 — La filtración
  t("tema-206", "filtracion-arena-carbon-activo", "Carbón activo", "Material filtrante de gran superficie porosa, obtenido por activación de materia orgánica, capaz de adsorber sustancias disueltas causantes de sabor u olor."),
  t("tema-206", "regulacion-caudal-lavado-automatismo-mantenimiento", "Retrolavado", "Operación de lavado de un filtro que invierte el sentido de circulación del agua para expandir el lecho filtrante y arrastrar las partículas retenidas."),

  // tema-207 — La desinfección: la cloración
  t("tema-207", "cloro-residual-perdidas-red-medida", "Cloro residual libre", "Cantidad de cloro que permanece disponible en el agua tras satisfacer la demanda de desinfección, protegiendo frente a una posible recontaminación posterior."),
  t("tema-207", "hipoclorito-sodico-almacenamiento-dosificacion-automatismo", "Hipoclorito sódico", "Disolución acuosa de hipoclorito de sodio que libera cloro activo al disolverse en agua, empleada como reactivo de desinfección."),

  // tema-208 — Circulación de fluidos y medición de caudal y presión
  t("tema-208", "circulacion-canales-abiertos-conductos-cerrados", "Canal abierto", "Conducción en la que el fluido circula con una superficie libre en contacto con la atmósfera, impulsado principalmente por gravedad."),
  t("tema-208", "equipos-medicion-caudal-presion-tipos-instalacion", "Caudalímetro electromagnético", "Instrumento que mide el caudal de un líquido conductor por inducción electromagnética, sin partes móviles en contacto con el fluido."),

  // tema-209 — La red de agua potable de Zaragoza
  t("tema-209", "valvulas-tipos-funcion-instalacion-mantenimiento", "Válvula reductora de presión", "Válvula que regula automáticamente su apertura para mantener a su salida una presión inferior y más estable que la de entrada."),
  t("tema-209", "ventosas-accionamiento-automatizacion-valvulas", "Ventosa", "Elemento de la red que purga el aire acumulado en los puntos altos de una conducción y admite aire cuando esta se vacía."),

  // tema-210 — Bombas y depósitos
  t("tema-210", "tipos-bombas-elevacion-caracteristicas-mantenimiento", "Altura manométrica", "Energía que aporta una bomba al fluido, expresada como altura de columna de agua equivalente, necesaria para vencer el desnivel y las pérdidas de carga."),
  t("tema-210", "depositos-esquema-elementos-impermeabilizacion", "Aliviadero", "Elemento de un depósito que evacúa de forma segura el excedente de agua si el nivel supera su capacidad máxima."),

  // tema-211 — Máquinas y herramientas
  t("tema-211", "uniones-mecanicas-tipos-caracteristicas-uso", "Unión embridada", "Unión desmontable entre dos elementos mediante bridas atornilladas con una junta de estanqueidad intermedia."),
  t("tema-211", "rodamientos-vibraciones-maquinas-rotativas", "Rodamiento", "Elemento mecánico que permite el giro relativo entre dos piezas reduciendo el rozamiento mediante elementos rodantes."),

  // tema-212 — Soldadura
  t("tema-212", "soldadura-corte-oxiacetilenico-aplicacion-seguridad", "Manorreductor", "Dispositivo que regula la presión de salida del gas contenido en una botella de oxígeno o acetileno."),
  t("tema-212", "soldadura-arco-electrico-funcionamiento-tipos-seguridad", "Soldadura TIG", "Proceso de soldadura por arco eléctrico con electrodo de tungsteno no consumible bajo protección de gas inerte."),

  // tema-213 — Redes de distribución eléctrica y REBT
  t("tema-213", "dispositivos-corte-proteccion-itc-bt-13-17-22-23-24", "Caja general de protección", "Elemento de la instalación de enlace, regulado por la ITC-BT-13, que aloja los dispositivos de protección de la acometida eléctrica."),
  t("tema-213", "aparellaje-factor-potencia-puesta-tierra-itc-bt-18", "Batería de condensadores", "Conjunto de condensadores instalado para corregir el factor de potencia de una instalación eléctrica con motores."),

  // tema-214 — Motores eléctricos
  t("tema-214", "indice-proteccion-ip-mando-control-arranque", "Índice de protección IP", "Código normalizado que indica el grado de protección de la envolvente de un equipo eléctrico frente a sólidos y agua."),
  t("tema-214", "eficiencia-energetica-directiva-2005-32-ce-iec-60034-30-itc-bt-47", "Clase IE3", "Clase de eficiencia energética 'premium' de la norma IEC 60034-30, obligatoria en la UE para determinadas potencias desde 2015-2017."),

  // tema-215 — Equipos neumáticos
  t("tema-215", "cilindros-distribuidores-valvuleria-neumatica", "Distribuidor neumático", "Válvula que dirige el flujo de aire comprimido hacia uno u otro lado de un cilindro, controlando su sentido de movimiento."),
  t("tema-215", "compresores-aire-rd-809-2021-secadores", "Calderín", "Depósito acumulador de aire comprimido que amortigua las variaciones de demanda y reduce los arranques del compresor."),

  // tema-216 — Automatización industrial
  t("tema-216", "comunicaciones-red-automatas-industriales", "Modbus", "Protocolo de comunicación estándar abierto de uso extendido en automatización industrial."),
  t("tema-216", "sistemas-comunicaciones-remotos-scada", "SCADA", "Sistema de supervisión, control y adquisición de datos que permite visualizar y gestionar de forma centralizada un proceso industrial."),

  // tema-217 — PRL general en el Ayuntamiento y en Planta Potabilizadora
  t("tema-217", "marco-general-ley-31-1995-ayuntamiento-zaragoza", "Recurso preventivo", "Trabajador designado con la formación adecuada, cuya presencia es obligatoria en actividades de riesgo especial para vigilar el cumplimiento de las medidas preventivas."),

  // tema-218 — Seguridad en alturas, espacios confinados, electricidad y químicos
  t("tema-218", "espacios-confinados-pprl-1601", "Espacio confinado", "Recinto con aberturas limitadas de entrada y salida y ventilación natural desfavorable, no concebido para la ocupación permanente de trabajadores."),
  t("tema-218", "trabajos-electricos-almacenamiento-transporte-quimicos", "Reglamento CLP", "Reglamento (CE) nº 1272/2008 sobre clasificación, etiquetado y envasado de sustancias y mezclas químicas peligrosas."),
];

console.log(`📚 Insertando ${TERMINOS.length} términos de glosario de Oficial Planta Potabilizadora...`);
await insertar("glosario", TERMINOS);
console.log("✅ Glosario de Oficial Planta Potabilizadora sembrado.");

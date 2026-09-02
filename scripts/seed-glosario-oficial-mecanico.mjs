/**
 * Glosario de la parte específica de Oficial Mecánico (tema-171 a
 * tema-186). Selección curada (no exhaustiva) de términos técnicos que
 * puedan resultar complejos, ~2 por tema, con la misma `seccion` que
 * las flashcards/preguntas de cada tema para que el recorte por
 * `secciones_incluidas` funcione igual.
 *
 * Uso: node --env-file=.env.local scripts/seed-glosario-oficial-mecanico.mjs
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
  // tema-171 — Conceptos del automóvil, componentes del motor
  t("tema-171", "bloque-motor-culata-carter", "Cárter", "Depósito situado en la parte inferior del motor donde se almacena el aceite lubricante."),
  t("tema-171", "pistones-bielas-cigueñal-valvulas", "Segmento", "Anillo metálico montado en el pistón que sella la cámara de combustión y controla el consumo de aceite."),

  // tema-172 — Distribución del automóvil
  t("tema-172", "sistema-distribucion-concepto-funcion", "Motor de interferencia", "Motor en el que válvulas y pistones ocupan el mismo espacio en distintos momentos, por lo que un fallo de distribución provoca daños graves."),
  t("tema-172", "arbol-levas-taques-sincronizacion", "Taqué hidráulico", "Elemento que ajusta automáticamente el juego de válvulas mediante presión de aceite, evitando ajustes manuales periódicos."),

  // tema-173 — Engrase, aceites y refrigeración
  t("tema-173", "aceites-clasificacion-viscosidad", "Aceite multigrado", "Aceite de motor que mantiene una viscosidad adecuada tanto en frío como en caliente gracias a aditivos específicos."),
  t("tema-173", "sistema-refrigeracion-automovil", "Termostato", "Válvula que regula el paso del refrigerante hacia el radiador según la temperatura del motor."),

  // tema-174 — Alimentación diésel y gasolina
  t("tema-174", "sistema-alimentacion-motor-gasolina", "Sonda lambda", "Sensor situado en el escape que mide el oxígeno de los gases para que la centralita ajuste la mezcla aire-combustible."),
  t("tema-174", "inyeccion-electronica-common-rail", "Common rail", "Sistema de inyección diésel con un conducto común a presión constante que alimenta los inyectores de todos los cilindros."),

  // tema-175 — Motor de combustión, motor de gasolina
  t("tema-175", "ciclo-otto-combustion-gasolina", "Punto muerto superior (PMS)", "Posición más alta que alcanza el pistón dentro del cilindro durante su carrera."),
  t("tema-175", "rendimiento-parametros-motor", "Relación de compresión", "Relación entre el volumen del cilindro en el punto muerto inferior y en el punto muerto superior."),

  // tema-176 — Encendido del automóvil
  t("tema-176", "sistema-encendido-convencional-bobina", "Bobina de encendido", "Transformador que eleva la tensión de la batería hasta la necesaria para que salte la chispa en la bujía."),
  t("tema-176", "encendido-electronico-dis", "DIS (Distributorless Ignition System)", "Sistema de encendido electrónico sin distribuidor mecánico, controlado directamente por la centralita."),

  // tema-177 — Instalación eléctrica del automóvil
  t("tema-177", "bateria-arranque-carga", "Alternador", "Generador eléctrico accionado por el motor que recarga la batería y alimenta el sistema eléctrico en marcha."),
  t("tema-177", "electronica-embarcada-sensores-actuadores", "Código de avería (DTC)", "Código alfanumérico normalizado almacenado por la centralita ante un funcionamiento anómalo detectado."),

  // tema-178 — Sobrealimentación
  t("tema-178", "turbocompresor-principio-funcionamiento", "Turbo lag", "Breve retardo entre pisar el acelerador y que el turbocompresor genere presión de sobrealimentación efectiva."),
  t("tema-178", "intercooler-wastegate-control-presion", "Wastegate", "Válvula que desvía gases de escape para limitar la velocidad de giro del turbo y la presión de sobrealimentación."),

  // tema-179 — Cajas de cambio y embragues
  t("tema-179", "embrague-funcionamiento-tipos", "Disco de embrague", "Elemento con material de fricción que transmite el movimiento del motor a la caja de cambios."),
  t("tema-179", "caja-cambios-automatica-doble-embrague", "DSG / DCT", "Caja de cambios de doble embrague que preselecciona la siguiente marcha para cambiar sin corte de tracción."),

  // tema-180 — Dirección del automóvil
  t("tema-180", "sistema-direccion-mecanica-cremallera", "Cremallera de dirección", "Mecanismo en el que un piñón engrana con una barra dentada que se desplaza lateralmente para mover las ruedas."),
  t("tema-180", "geometria-direccion-alineacion", "Convergencia", "Ángulo, visto desde arriba, que forman entre sí las ruedas de un mismo eje."),

  // tema-181 — Frenos y seguridad pasiva/activa
  t("tema-181", "abs-sistemas-electronicos-frenado", "ABS", "Sistema antibloqueo de frenos que modula la presión de frenado para evitar el bloqueo total de las ruedas."),
  t("tema-181", "seguridad-pasiva-activa-vehiculos", "Zona de deformación programada", "Parte de la estructura del vehículo diseñada para deformarse de forma controlada en un impacto, absorbiendo energía."),

  // tema-182 — Árbol de transmisión, grupo y diferencial
  t("tema-182", "arbol-transmision-juntas-homocineticas", "Junta homocinética", "Mecanismo que transmite giro a velocidad constante entre ejes no alineados, protegido por un fuelle de goma."),
  t("tema-182", "diferencial-funcionamiento-tipos", "Diferencial autoblocante (LSD)", "Diferencial que limita la diferencia de giro entre ruedas, mejorando la tracción en baja adherencia."),

  // tema-183 — Sistema de escape
  t("tema-183", "catalizador-fap-reduccion-emisiones", "Filtro de partículas (FAP/DPF)", "Dispositivo diésel que retiene físicamente el hollín de los gases de escape, regenerándose periódicamente por combustión."),
  t("tema-183", "silencioso-sensores-escape", "Sensor de presión diferencial", "Sensor que mide la diferencia de presión entre entrada y salida del filtro de partículas para estimar el hollín acumulado."),

  // tema-184 — Vehículos híbridos y eléctricos
  t("tema-184", "vehiculos-hibridos-tipos-funcionamiento", "Frenada regenerativa", "Sistema que emplea el motor eléctrico como generador durante la frenada, recuperando energía hacia la batería."),
  t("tema-184", "vehiculos-electricos-bateria-motor", "BMS (Battery Management System)", "Sistema electrónico que monitoriza y gestiona la carga, temperatura y protección de la batería de tracción."),
  t("tema-184", "seguridad-alta-tension-mantenimiento", "Service plug", "Conector o fusible de servicio cuya retirada forma parte del procedimiento de desconexión segura de alta tensión."),

  // tema-185 — Climatización en vehículos
  t("tema-185", "circuito-frigorifico-principio-funcionamiento", "Evaporador", "Intercambiador de calor donde el refrigerante se evapora absorbiendo el calor del aire del habitáculo."),
  t("tema-185", "gases-refrigerantes-normativa-manipulacion", "Gas fluorado de efecto invernadero", "Gas de origen industrial, como el HFC empleado en climatización, con elevado potencial de calentamiento atmosférico y manipulación regulada por el RD 115/2017."),

  // tema-186 — PRL en trabajos de oficial mecánico
  t("tema-186", "marco-normativo-prl-ley-31-1995", "Recurso preventivo", "Figura designada por el empresario, presente en el centro de trabajo ante circunstancias de riesgo especial, conforme al art. 32 bis de la Ley 31/1995."),
  t("tema-186", "riesgos-especificos-oficial-mecanico-epi", "Equipo de protección individual (EPI)", "Equipo destinado a ser llevado por el trabajador para protegerle de riesgos que no puedan evitarse por medios de protección colectiva u organizativos, regulado por el RD 773/1997."),
];

console.log(`📚 Insertando ${TERMINOS.length} términos de glosario de Oficial Mecánico...`);
await insertar("glosario", TERMINOS);
console.log("✅ Glosario de Oficial Mecánico sembrado.");

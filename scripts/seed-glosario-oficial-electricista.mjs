/**
 * Glosario curado para los 16 temas nuevos de la parte específica de
 * Oficial Electricista (tema-139 a tema-154). Selección curada (no
 * exhaustiva) de términos técnicos que puedan resultar complejos, con la
 * misma `seccion` que las flashcards/preguntas de cada tema, siguiendo el
 * patrón de scripts/seed-glosario-oficial-agente-inspector.mjs.
 *
 * Uso: node --env-file=.env.local scripts/seed-glosario-oficial-electricista.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/glosario`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const t = (tema_slug, seccion, termino, definicion) => ({ tema_slug, seccion, termino, definicion });

const TERMINOS = [
  // tema-139 — REBT: estructura e instaladores
  t("tema-139", "estructura-real-decreto-842-2002", "ITC-BT", "Instrucción Técnica Complementaria: cada una de las 52 disposiciones que desarrollan y completan el articulado del Reglamento Electrotécnico para Baja Tensión."),
  t("tema-139", "empresas-instaladoras-categorias-instalador-autorizado", "Certificado de Instalación Eléctrica (CIE)", "Documento que expide la empresa instaladora al finalizar una instalación, acreditando que se ajusta a las prescripciones reglamentarias del REBT."),

  // tema-140 — conceptos fundamentales de electricidad
  t("tema-140", "ley-ohm-leyes-kirchhoff-circuitos-serie-paralelo-mixto", "Ley de Kirchhoff", "Cada una de las dos leyes (de nudos y de mallas) que rigen el reparto de intensidades y tensiones en un circuito eléctrico."),
  t("tema-140", "corriente-continua-corriente-alterna", "Valor eficaz (RMS)", "Valor de una corriente continua equivalente que produciría el mismo efecto térmico que la corriente alterna considerada; es el valor que muestran habitualmente los aparatos de medida."),

  // tema-141 — seguridad eléctrica y PRL
  t("tema-141", "efectos-corriente-electrica-cuerpo-humano-tipos-contactos", "Fibrilación ventricular", "Alteración grave del ritmo cardiaco por paso de corriente eléctrica, con contracciones desordenadas del corazón que pueden causar la muerte si no se revierte de inmediato."),
  t("tema-141", "cinco-reglas-oro-trabajos-descargo-epi", "Descargo", "Conjunto de operaciones (Cinco Reglas de Oro) que dejan una instalación sin tensión de forma segura antes de trabajar sobre ella."),

  // tema-142 — instalaciones de enlace
  t("tema-142", "caja-general-proteccion-linea-general-alimentacion", "Línea General de Alimentación (LGA)", "Conductor que enlaza la Caja General de Protección con la centralización de contadores de un edificio."),
  t("tema-142", "centralizacion-contadores-derivacion-individual-icp", "Interruptor de Control de Potencia (ICP)", "Dispositivo que limita automáticamente el suministro eléctrico a la potencia contratada por el usuario."),

  // tema-143 — CGMP
  t("tema-143", "composicion-cuadro-general-mando-proteccion-iga", "Corte omnipolar", "Interrupción simultánea de todos los conductores activos (fases y, en su caso, neutro) de un circuito o instalación."),
  t("tema-143", "protectores-sobretensiones-permanentes-transitorias", "Descargador contra sobretensiones (DPS)", "Dispositivo que deriva a tierra el exceso de tensión producido por una sobretensión transitoria, protegiendo a los equipos conectados."),

  // tema-144 — cables y conductores
  t("tema-144", "criterios-calculo-secciones-caida-tension-intensidad-admisible", "Caída de tensión", "Pérdida de tensión a lo largo de un conductor debida a su resistencia eléctrica, proporcional a su longitud y a la intensidad que lo recorre."),
  t("tema-144", "secciones-normalizadas-conductores", "Sección normalizada", "Valor de sección de conductor estandarizado y comercializado por los fabricantes, al que debe ajustarse por exceso el resultado de un cálculo de sección."),

  // tema-145 — instalaciones interiores viviendas
  t("tema-145", "electrificacion-basica-elevada-circuitos-independientes", "Grado de electrificación", "Nivel de previsión de potencia y número de circuitos independientes exigido a una vivienda (básica o elevada), según la ITC-BT-25."),
  t("tema-145", "tubos-canales-protectoras-tipos-caracteristicas", "Canal protectora", "Perfil hueco, cerrado por una tapa desmontable, destinado a alojar conductores en instalación superficial, con fácil acceso a estos."),

  // tema-146 — locales de características especiales
  t("tema-146", "locales-humedos-mojados-riesgo-corrosion-polvorientos", "Local mojado", "Local en el que suelo, paredes y objetos se encuentran habitualmente cubiertos de humedad o proyecciones de agua, según la ITC-BT-30."),
  t("tema-146", "suministros-reserva-emergencia", "Suministro de socorro", "Suministro complementario destinado a asegurar el alumbrado y las señales de seguridad y evacuación de un local de pública concurrencia ante un fallo del suministro normal."),

  // tema-147 — alumbrado e iluminación
  t("tema-147", "luminotecnia-magnitudes-basicas", "Iluminancia", "Flujo luminoso que incide sobre una superficie por unidad de superficie, medido en lux (lx); es la magnitud habitual para especificar el nivel de luz recomendado en un puesto de trabajo."),
  t("tema-147", "tipos-lamparas-luminarias-led", "Índice de reproducción cromática (IRC)", "Valor de 0 a 100 que indica la fidelidad con la que una fuente de luz reproduce los colores de los objetos en comparación con la luz natural."),

  // tema-148 — receptores y motores CA
  t("tema-148", "conexionado-estrella-triangulo", "Conexión en estrella", "Conexión de los devanados de un motor trifásico en la que un extremo de cada uno se une en un punto común, quedando cada devanado a tensión de fase."),
  t("tema-148", "sistemas-arranque-proteccion-motores", "Guardamotor", "Dispositivo que combina la protección contra cortocircuitos y contra sobrecargas de un motor, permitiendo además su mando manual."),

  // tema-149 — puesta a tierra
  t("tema-149", "objeto-partes-puesta-tierra-electrodos", "Electrodo de puesta a tierra", "Elemento metálico enterrado en contacto directo con el terreno, que permite el paso a tierra de las corrientes de defecto."),
  t("tema-149", "medida-resistencia-tierra-telurometro", "Telurómetro", "Instrumento de medida específico de la resistencia de tierra de una instalación, aplicando una corriente de medida a través del electrodo."),

  // tema-150 — automatismos eléctricos cableados
  t("tema-150", "contactores-reles-auxiliares-temporizadores", "Contactor", "Dispositivo electromagnético de maniobra que conecta y desconecta un circuito de potencia mediante el mando de una bobina de menor potencia."),
  t("tema-150", "interpretacion-esquemas-automatismos-fuerza-mando", "Contacto de autorretención", "Contacto auxiliar de un contactor, conectado en paralelo con el pulsador de marcha, que mantiene energizada la bobina una vez soltado dicho pulsador."),

  // tema-151 — averías y mantenimiento
  t("tema-151", "mantenimiento-preventivo-correctivo-predictivo", "Mantenimiento predictivo", "Mantenimiento basado en el seguimiento de parámetros medibles (temperatura, vibración, aislamiento) para anticipar el fallo de un elemento antes de que se produzca."),
  t("tema-151", "instrumentos-medida-polimetro-pinza-medidor-aislamiento", "Medidor de aislamiento (megóhmetro)", "Instrumento que aplica una tensión continua elevada para medir la resistencia de aislamiento de una instalación y detectar posibles fallos."),

  // tema-152 — corrientes débiles y telecomunicaciones
  t("tema-152", "redes-datos-cableado-estructurado", "Cableado estructurado", "Sistema de cableado normalizado y jerarquizado que permite conectar distintos dispositivos y servicios a una misma infraestructura de red."),
  t("tema-152", "sistemas-deteccion-incendios-alarmas", "Central de detección de incendios", "Equipo que recibe las señales de detectores y pulsadores de un sistema contra incendios, procesa la información y activa las alarmas correspondientes."),

  // tema-153 — eficiencia energética y factor de potencia
  t("tema-153", "factor-potencia-energia-activa-reactiva-aparente", "Factor de potencia (cosφ)", "Relación entre la potencia activa y la potencia aparente de una instalación, que indica qué proporción de la energía suministrada se aprovecha como trabajo útil."),
  t("tema-153", "metodos-compensacion-baterias-condensadores", "Sobrecompensación", "Aportación de más energía reactiva capacitiva de la necesaria al compensar el factor de potencia, generando un nuevo desequilibrio también penalizable."),

  // tema-154 — instalaciones solares fotovoltaicas
  t("tema-154", "modalidades-autoconsumo-con-sin-excedentes", "Compensación simplificada de excedentes", "Mecanismo que permite compensar en la factura eléctrica el valor de la energía excedentaria vertida a la red con el de la energía consumida, conforme al Real Decreto 244/2019."),
  t("tema-154", "componentes-instalacion-fotovoltaica", "Protección anti-isla", "Función del inversor de una instalación fotovoltaica que desconecta automáticamente el sistema de una red que ha quedado sin tensión."),
];

console.log(`📖 Insertando ${TERMINOS.length} términos de glosario...`);
await insertBatch(TERMINOS);
console.log("✔ Glosario de Oficial Electricista sembrado.");

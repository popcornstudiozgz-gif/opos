/**
 * Glosario curado para los 16 temas nuevos de la parte específica de
 * Oficial Herrero (tema-155 a tema-170). Selección curada (no
 * exhaustiva) de términos técnicos que puedan resultar complejos, con la
 * misma `seccion` que las flashcards/preguntas de cada tema, siguiendo el
 * patrón de scripts/seed-glosario-oficial-electricista.mjs.
 *
 * Uso: node --env-file=.env.local scripts/seed-glosario-oficial-herrero.mjs
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
  // tema-155 — metalurgia básica
  t("tema-155", "preparacion-bordes-recubrimientos-galvanizacion", "Galvanización", "Recubrimiento de una pieza de acero o hierro con una capa de zinc, que protege el metal base frente a la oxidación por barrera y por protección catódica."),
  t("tema-155", "oxidacion-metales", "Corrosión", "Deterioro progresivo de un metal por reacciones químicas o electroquímicas con su entorno, entre ellas la oxidación."),

  // tema-156 — metalografía y tratamientos térmicos
  t("tema-156", "metalografia-teoria-tratamientos-termicos", "Temple", "Tratamiento térmico que calienta el acero y lo enfría bruscamente, aumentando notablemente su dureza a costa de una mayor fragilidad."),
  t("tema-156", "nociones-resistencia-materiales", "Límite elástico", "Valor de esfuerzo hasta el cual un material recupera su forma original al cesar la carga aplicada."),

  // tema-157 — propiedades y ensayos de materiales
  t("tema-157", "dureza-tenacidad", "Tenacidad", "Capacidad de un material para absorber energía y deformarse plásticamente antes de romperse, es decir, su resistencia a la fractura frágil."),
  t("tema-157", "fatiga-resiliencia-ensayos", "Fatiga (del material)", "Debilitamiento y posible rotura de un material sometido a esfuerzos repetidos, incluso por debajo de su resistencia a la rotura."),

  // tema-158 — normalización, proporcionalidad y escalas
  t("tema-158", "normalizacion-tolerancias", "Tolerancia dimensional", "Margen admisible de variación respecto a la medida nominal de una pieza, dentro del cual se considera correctamente fabricada."),
  t("tema-158", "clases-escalas-proporcionalidad", "Escala de reducción", "Escala de un plano en la que las dimensiones representadas son menores que las dimensiones reales del objeto."),

  // tema-159 — materiales normalizados
  t("tema-159", "clasificacion-materiales-metalicos-no-metalicos", "Material férrico", "Material metálico cuyo componente principal es el hierro, como el acero al carbono o el hierro fundido."),
  t("tema-159", "perfileria-metalica", "Perfil tubular", "Perfil metálico hueco de sección cuadrada o rectangular, muy empleado en estructuras de cerrajería por su buena relación entre resistencia y peso."),

  // tema-160 — el taller y herrería
  t("tema-160", "maquinaria-taller-clasificacion-manejo-seguridad", "Resguardo", "Elemento fijo o móvil de una máquina que impide el acceso a sus zonas de peligro durante el funcionamiento."),
  t("tema-160", "herramientas-taller-tipos-caracteristicas", "Yunque", "Bloque macizo de acero que sirve de base sólida para golpear y conformar el metal caliente durante la forja."),

  // tema-161 — mecanizado manual básico
  t("tema-161", "taladrado-escariado-roscado", "Escariado", "Operación de acabado tras el taladrado que consigue un agujero de dimensión y acabado más precisos que los obtenidos directamente con la broca."),
  t("tema-161", "remachado-punzonado-chaflanado", "Remachado", "Técnica de unión mecánica permanente que emplea un remache insertado en un agujero pasante, deformando su extremo para formar una segunda cabeza."),

  // tema-162 — dibujo técnico y trazado
  t("tema-162", "normas-acotacion-proporcionalidad", "Acotación", "Conjunto de líneas, cifras y símbolos normalizados que indican en un plano las dimensiones reales de una pieza."),
  t("tema-162", "trazado-marcado-piezas", "Trazado al aire", "Trazado realizado directamente sobre una pieza o estructura ya montada, sin el apoyo de una superficie de trabajo plana convencional."),

  // tema-163 — soldadura oxiacetilénica
  t("tema-163", "equipo-oxiacetileno-corte-metales", "Oxicorte", "Proceso de corte de metales que combina el precalentamiento con llama oxiacetilénica y un chorro de oxígeno puro que oxida y elimina el metal."),
  t("tema-163", "procesos-oxigeno-gas-combustible-gases-utilizados", "Llama neutra", "Llama con una proporción equilibrada de oxígeno y acetileno, la más habitual para soldar."),

  // tema-164 — soldadura eléctrica
  t("tema-164", "procesos-mag-mig-tig-gas-protector", "TIG (Tungsten Inert Gas)", "Proceso de soldadura con electrodo de tungsteno no consumible, protegido por gas inerte, que permite un control muy preciso del cordón."),
  t("tema-164", "soldadura-manual-arco-electrico-electrodos", "Electrodo revestido", "Varilla metálica recubierta de un revestimiento químico que protege el baño de fusión y estabiliza el arco durante la soldadura manual."),

  // tema-165 — calderería
  t("tema-165", "cuerpos-cilindricos-conicos-virolas-tubos-curvos", "Virola", "Cada uno de los anillos de chapa curvada que, unidos entre sí, forman el cuerpo cilíndrico o cónico de un depósito u otra pieza de calderería."),
  t("tema-165", "tuberia-embridada-desarrollos-triangulacion", "Desarrollo por triangulación", "Método gráfico que divide la superficie de una pieza de geometría compleja en pequeños triángulos, cuya suma reproduce su desarrollo plano."),

  // tema-166 — torneado: tipos de torno
  t("tema-166", "tipos-torno-elementos-avances", "Avance", "Desplazamiento de la herramienta de corte por cada vuelta de la pieza durante el torneado."),
  t("tema-166", "medios-seguridad-torno", "Riesgo de atrapamiento", "Riesgo de que una prenda o un guante quede atrapado por una pieza en rotación, arrastrando la mano del operario hacia el punto de peligro."),

  // tema-167 — carpintería metálica
  t("tema-167", "cerramientos-vanos-paso-puertas", "Puerta basculante", "Puerta cuya hoja se desplaza mediante un movimiento combinado de giro y traslación, quedando alojada bajo el techo al abrirse por completo."),
  t("tema-167", "cerramientos-huecos-ventanas-proteccion-solar", "Celosía metálica", "Conjunto de lamas metálicas, fijas u orientables, que regulan el paso de luz y aire reduciendo la incidencia solar directa."),

  // tema-168 — manipulación de tornos
  t("tema-168", "estudio-corte-velocidad-corte", "Velocidad de corte", "Velocidad lineal a la que la superficie de la pieza pasa por delante del filo de la herramienta durante el torneado."),
  t("tema-168", "torneado-excentrico-moleteado", "Moleteado", "Operación que conforma por deformación plástica un relieve regular sobre la superficie de una pieza, sin arrancar viruta."),

  // tema-169 — herramientas de medición y verificación
  t("tema-169", "herramientas-medicion-longitud", "Nonio (vernier)", "Escala auxiliar deslizante de un pie de rey que permite leer fracciones de la división mínima de la escala principal."),
  t("tema-169", "inspeccion-verificacion-soldaduras", "Socavadura", "Rebaje en el metal base junto al cordón de soldadura, producido por una fusión excesiva sin aporte suficiente de material para rellenarlo."),

  // tema-170 — PRL específica de herrero
  t("tema-170", "trabajos-espacios-confinados", "Espacio confinado", "Recinto con aberturas limitadas y ventilación desfavorable, no concebido para una ocupación humana continuada, con riesgo de atmósfera peligrosa."),
  t("tema-170", "medidas-proteccion-individual-colectiva-herreria", "Extracción localizada", "Sistema de ventilación que capta los humos o contaminantes en el propio punto de generación, antes de que se dispersen por el ambiente del taller."),
];

console.log(`📖 Insertando ${TERMINOS.length} términos de glosario...`);
await insertBatch(TERMINOS);
console.log("✔ Glosario de Oficial Herrero sembrado.");

/**
 * Glosario curado para los 16 temas nuevos de la parte específica de
 * Oficial Mantenimiento General (tema-61 a tema-76). Mismo criterio que
 * scripts/seed-glosario-oficial-albanil.mjs.
 *
 * Uso: node --env-file=.env.local scripts/seed-glosario-oficial-mantenimiento.mjs
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
  // tema-61 — electricidad básica
  t("tema-61", "unidades-medida-electricas", "Ley de Ohm", "Relación fundamental de la electrotecnia: I = V/R, la intensidad es directamente proporcional a la tensión e inversamente proporcional a la resistencia."),
  t("tema-61", "instalaciones-basicas-interiores-bt", "REBT", "Reglamento electrotécnico para baja tensión (RD 842/2002), norma que regula las instalaciones eléctricas de baja tensión en España."),
  t("tema-61", "averias-reparaciones-herramientas-electricidad", "Cortocircuito", "Contacto directo entre dos conductores a distinto potencial que provoca una intensidad muy elevada y el disparo del magnetotérmico."),

  // tema-62 — fontanería y calefacción
  t("tema-62", "fontaneria-averias-tuberias-desagues", "Golpe de ariete", "Sobrepresión brusca en una tubería producida al cerrar rápidamente una llave o grifo."),
  t("tema-62", "sistemas-calefaccion-clasificacion-componentes", "Vaso de expansión", "Depósito que absorbe el aumento de volumen del agua al calentarse en un circuito cerrado de calefacción."),

  // tema-63 — alarmas y ascensores
  t("tema-63", "tipos-mantenimiento-preventivo-correctivo-predictivo", "Mantenimiento predictivo", "El que anticipa el fallo midiendo parámetros del equipo (vibración, temperatura), interviniendo justo antes de que se produzca la avería."),
  t("tema-63", "ascensores-funciones-avisos-oficial-general", "Empresa conservadora", "Empresa autorizada, única con competencia legal para el mantenimiento técnico de un ascensor, distinta del personal de mantenimiento general del edificio."),

  // tema-64 — albañilería básica de mantenimiento
  t("tema-64", "reparaciones-frecuentes-albanileria", "Fisura", "Abertura fina y superficial en un paramento, distinta de una grieta (más ancha y profunda, posible indicio de movimiento estructural)."),

  // tema-65 — carpintería, cerrajería y persianas
  t("tema-65", "cerrajeria-nociones-basicas", "Bombín", "Cilindro de una cerradura donde se introduce la llave y que acciona el mecanismo de apertura, sustituible de forma independiente."),
  t("tema-65", "persianas-mantenimiento-basico", "Final de carrera", "Tope o sensor de una persiana motorizada que indica al motor dónde debe detenerse al subir o bajar completamente."),

  // tema-66 — audio, imagen e informática
  t("tema-66", "equipos-imagen-informaticos-proyectores-smarttv", "Keystone", "Corrección de un proyector que compensa la deformación trapezoidal de la imagen cuando el equipo no está perpendicular a la pantalla."),

  // tema-67 — ofimática, internet y fotocopiadoras
  t("tema-67", "fotocopiadoras-tamanos-papel-problemas", "Colmatación", "Saturación del filtro o del tambor de una fotocopiadora que provoca manchas o pérdida de calidad en la copia."),

  // tema-68 — organigrama y atención al público
  t("tema-68", "calidad-atencion-ciudadania", "Momento de la verdad", "Instante concreto de contacto directo entre la persona usuaria y el empleado público, donde se forma la percepción real de la calidad del servicio."),

  // tema-69 — documentos administrativos
  t("tema-69", "notificacion-publicacion-actos-administrativos", "Notificación defectuosa", "Notificación que no cumple todos los requisitos exigidos (por ejemplo, texto incompleto), que surte efecto desde que el interesado conoce el contenido o recurre."),
  t("tema-69", "archivo-compulsa-documentacion-administrativa", "Compulsa", "Cotejo de una copia con su documento original por un empleado público competente, que certifica su coincidencia dándole validez equivalente."),

  // tema-70 — Albergue y Casa de Amparo
  t("tema-70", "reglamento-residencia-casa-amparo", "Plaza no concertada", "Plaza de la Casa Amparo destinada a situaciones de especial desamparo valoradas por servicios sociales municipales, distinta de las plazas concertadas con el Gobierno de Aragón."),

  // tema-71 — Centros Cívicos
  t("tema-71", "concepto-organizacion-centros-civicos", "Equipamiento de proximidad", "Instalación municipal descentralizada por distritos o barrios que acerca servicios y actividades a la ciudadanía de su entorno."),

  // tema-72 — Centros Escolares
  t("tema-72", "unidad-colegios-publicos-concepto-cometidos", "CEIP", "Colegio de Educación Infantil y Primaria: centro que imparte el segundo ciclo de infantil (3-6 años) y primaria (6-12 años)."),

  // tema-73 — movilidad urbana y escenarios
  t("tema-73", "escenarios-portatiles-montaje-seguridad", "Lastrado", "Anclaje o contrapeso de una estructura temporal (como un escenario) que impide su desplazamiento o vuelco, especialmente frente al viento."),

  // tema-74 — Juntas Municipales y Vecinales
  t("tema-74", "juntas-vecinales-alcalde-barrio", "ROTPC", "Reglamento de Órganos Territoriales y Participación Ciudadana de Zaragoza, norma que regula las Juntas Municipales, las Juntas Vecinales y el Alcalde de Barrio."),

  // tema-75 — protección de incendios
  t("tema-75", "el-fuego-triangulo-clases-fuego", "Tetraedro del fuego", "Modelo que añade la reacción en cadena a los tres elementos del triángulo del fuego (combustible, comburente, calor); eliminar cualquiera de los cuatro apaga el incendio."),
  t("tema-75", "senalizacion-medios-extincion-incendios", "RIPCI", "Reglamento de instalaciones de protección contra incendios (RD 513/2017), que regula diseño, instalación, mantenimiento e inspección de estos equipos."),

  // tema-76 — seguridad y PRL en mantenimiento
  t("tema-76", "conceptos-basicos-peligro-dano-riesgo", "Riesgo laboral", "Posibilidad de que un trabajador sufra un daño derivado del trabajo, valorando conjuntamente la probabilidad de que se produzca y su severidad (art. 4 Ley 31/1995)."),
  t("tema-76", "epi-medidas-preventivas-mantenimiento", "Jerarquía de medidas preventivas", "Orden de prioridad de la Ley 31/1995: eliminar el riesgo en origen, protección colectiva, y como último recurso el EPI."),
];

console.log(`📚 Insertando ${TERMINOS.length} términos de glosario (Oficial Mantenimiento General)...`);
await insertBatch(TERMINOS);
console.log("✅ Glosario de Oficial Mantenimiento General sembrado.");

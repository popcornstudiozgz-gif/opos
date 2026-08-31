/**
 * Glosario curado para los 15 temas nuevos de la parte específica de
 * Oficial Instalaciones Deportivas (tema-77 a tema-91; el Tema 21 de
 * esta oposición reutiliza tema-75, ya glosado en Oficial Mantenimiento
 * General). Mismo criterio que seed-glosario-oficial-albanil.mjs.
 *
 * Uso: node --env-file=.env.local scripts/seed-glosario-oficial-instalaciones-deportivas.mjs
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
  // tema-77 — organización del deporte municipal
  t("tema-77", "ordenanza-fiscal-24-8-tasa-centros-deportivos", "Hecho imponible", "El presupuesto de hecho que genera la obligación de pagar una tasa; en la OF 24.8, el uso de espacios y servicios de los Centros Deportivos Municipales."),

  // tema-78 — calidad del servicio deportivo
  t("tema-78", "certificacion-iso-14001-centros-deportivos", "ISO 14001", "Norma internacional voluntaria (no legislación española) que certifica un sistema de gestión ambiental verificado por una entidad externa."),

  // tema-79 — ofimática con OpenOffice
  t("tema-79", "writer-calc-openoffice", "OpenDocument (.odt)", "Formato abierto estándar de archivo de OpenOffice/LibreOffice Writer, alternativo al .docx de Microsoft Word."),

  // tema-80 — electricidad en piscinas
  t("tema-80", "rebt-aplicable-piscinas", "Volumen de protección", "Zona concéntrica alrededor del vaso de una piscina (0, 1 y 2) definida por la ITC-BT-31, con restricciones decrecientes sobre los equipos eléctricos permitidos."),

  // tema-81 — fontanería deportiva
  t("tema-81", "fontaneria-nociones-basicas-deportivas", "Rebosadero", "Canal perimetral de una piscina que recoge el agua superficial y la conduce al circuito de depuración, manteniendo constante el nivel del agua."),

  // tema-82 — pintura
  t("tema-82", "tipos-pintura-instalaciones-deportivas", "Ácido isocianúrico", "Producto estabilizante que protege al cloro de la degradación por radiación solar, prolongando su efecto desinfectante en piscinas exteriores."),

  // tema-83 — calefacción, ACS y legionela
  t("tema-83", "legionela-marco-normativo", "Biofilm", "Película de microorganismos y materia orgánica que se forma en tuberías y depósitos, refugio y nutriente de la legionela."),
  t("tema-83", "mantenimiento-preventivo-legionela", "Choque térmico", "Desinfección periódica que eleva la temperatura del agua (habitualmente a 70 °C o más) para eliminar la carga bacteriana acumulada."),

  // tema-84 — limpieza y desinfección
  t("tema-84", "productos-limpieza-clasificacion-etiquetado", "Ficha de datos de seguridad (FDS)", "Documento técnico que detalla la composición, peligros, manipulación y EPI recomendado de un producto químico."),

  // tema-85 — Decreto 50/1993 piscinas
  t("tema-85", "vigilancia-control-sanitario-piscinas", "Autocontrol sanitario", "Conjunto de controles periódicos (analíticos y de registro) que la propia instalación debe realizar sobre parámetros como pH, cloro y turbidez."),

  // tema-86 — depuración del agua
  t("tema-86", "filtros-arena-silice-funcionamiento", "Lavado a contracorriente", "Operación de limpieza de un filtro de arena que invierte el sentido del flujo de agua para arrastrar la suciedad acumulada hacia el desagüe."),

  // tema-87 — desinfección del agua
  t("tema-87", "sistemas-desinfeccion-piscinas", "Cloro combinado", "Cloro que ya ha reaccionado con materia orgánica formando cloraminas, con menor poder desinfectante y responsable del olor característico a cloro."),

  // tema-88 — riego
  t("tema-88", "funcionamiento-riego-automatico", "Sectorización", "División de una instalación de riego en sectores independientes que riegan de forma secuencial, manteniendo la presión adecuada en cada uno."),

  // tema-89 — césped, arbustos y árboles
  t("tema-89", "mantenimiento-cesped", "Escarificado", "Operación que elimina el fieltro (musgo y restos vegetales) del césped mediante cuchillas verticales, mejorando la aireación del suelo."),

  // tema-90 — fitosanitarios
  t("tema-90", "productos-fitosanitarios-tipos-normativa", "Carné de aplicador de fitosanitarios", "Certificado (nivel básico o cualificado) exigido por el RD 1311/2012 para manipular y aplicar profesionalmente productos fitosanitarios."),
  t("tema-90", "riesgos-plaguicidas-medidas-preventivas", "Plazo de seguridad", "Tiempo mínimo que debe transcurrir entre la aplicación de un fitosanitario y el acceso de personas a la zona tratada."),

  // tema-91 — seguridad y gestión de riesgos
  t("tema-91", "mapa-riesgos-instalacion-deportiva", "Mapa de riesgos", "Identificación sistemática de los principales riesgos presentes en cada zona de una instalación, base para priorizar las medidas preventivas."),
];

console.log(`📚 Insertando ${TERMINOS.length} términos de glosario (Oficial Instalaciones Deportivas)...`);
await insertBatch(TERMINOS);
console.log("✅ Glosario de Oficial Instalaciones Deportivas sembrado.");

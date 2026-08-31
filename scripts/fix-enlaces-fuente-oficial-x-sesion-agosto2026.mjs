/**
 * Corrige 6 temas de la parte específica de Oficial Mantenimiento
 * General, Oficial Instalaciones Deportivas y Oficial Agente Inspector
 * que se dejaron sin ningún enlace de fuente (`enlaces_boe: []`) cuando
 * en realidad SÍ existe un documento oficial publicado detrás del punto
 * del temario — detectado en una auditoría pedida por el usuario tras
 * comparar el ratio de temas sin fuente frente al de Oficial Albañil
 * (ver CLAUDE.md, sección "Antes de dejar enlaces_boe: []").
 *
 * Fuentes verificadas en este turno:
 * - tema-68 (Organigrama y atención al público, Oficial Mantenimiento
 *   General) y tema-78, sección manual-atencion-cartas-servicios
 *   (Calidad del servicio deportivo, Oficial Instalaciones Deportivas):
 *   Manual de Atención a la Ciudadanía del Ayuntamiento de Zaragoza,
 *   actualizado en 2018 — https://www.zaragoza.es/cont/paginas/
 *   gestionmunicipal/calidad/pdf/Manual-atencion-ciudadania.pdf
 * - tema-71 (Centros Cívicos, Oficial Mantenimiento General): Reglamento
 *   de Centros Cívicos del Ayuntamiento de Zaragoza —
 *   https://www.zaragoza.es/sede/servicio/normativa/4443
 * - tema-72 (Centros Públicos Escolares, Oficial Mantenimiento General):
 *   portal informativo oficial de la Unidad de Colegios Públicos —
 *   https://www.zaragoza.es/sede/portal/centros-escolares/
 * - tema-93, sección reforestacion-bosque-zaragozanos (Gestión de montes
 *   y riberas, Oficial Agente Inspector): portal oficial del proyecto
 *   Bosque de los Zaragozanos —
 *   https://www.zaragoza.es/sede/portal/medioambiente/elbosquedeloszaragozanos/
 * - tema-107 (Interpretación cartográfica, Oficial Agente Inspector):
 *   IDEAragón (ya citado en el contenido del tema pero sin enlace) —
 *   https://idearagon.aragon.es/portal/aplicaciones.jsp — e INAGA
 *   (visores GIS) — https://www.aragon.es/-/inaga-servicios-gis
 *
 * Uso: node --env-file=.env.local scripts/fix-enlaces-fuente-oficial-x-sesion-agosto2026.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const MANUAL_ATENCION = "https://www.zaragoza.es/cont/paginas/gestionmunicipal/calidad/pdf/Manual-atencion-ciudadania.pdf";
const REGL_CENTROS_CIVICOS = "https://www.zaragoza.es/sede/servicio/normativa/4443";
const PORTAL_COLEGIOS = "https://www.zaragoza.es/sede/portal/centros-escolares/";
const PORTAL_BOSQUE_ZARAGOZANOS = "https://www.zaragoza.es/sede/portal/medioambiente/elbosquedeloszaragozanos/";
const IDEARAGON = "https://idearagon.aragon.es/portal/aplicaciones.jsp";
const INAGA_VISORES = "https://www.aragon.es/-/inaga-servicios-gis";

async function patchTema(slug, body) {
  const res = await fetch(`${URL_BASE}/rest/v1/temas?slug=eq.${slug}`, {
    method: "PATCH",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
  if (!res.ok) { console.error(`❌ Error en temas (${slug}): ${res.status} ${await res.text()}`); process.exit(1); }
  const data = await res.json();
  console.log(`   ✓ ${slug} actualizado (${data.length} fila)`);
}

console.log("🔧 tema-68 (organigrama y atención al público)...");
await patchTema("tema-68", {
  enlaces_boe: [{ url: MANUAL_ATENCION, titulo: "Manual de Atención a la Ciudadanía del Ayuntamiento de Zaragoza (2018)" }],
  indice_estudio: [
    { url: "", titulo: "Organigrama, centros, servicios y dependencias municipales", seccion: "organigrama-centros-servicios-municipales", articulos: "Conceptos fundamentales" },
    { url: MANUAL_ATENCION, titulo: "Atención telefónica, oral y presencial", seccion: "atencion-telefonica-oral-presencial", articulos: "Manual de Atención a la Ciudadanía" },
    { url: MANUAL_ATENCION, titulo: "Calidad en la atención a la ciudadanía", seccion: "calidad-atencion-ciudadania", articulos: "Manual de Atención a la Ciudadanía" },
  ],
});

console.log("🔧 tema-71 (Centros Cívicos)...");
await patchTema("tema-71", {
  enlaces_boe: [{ url: REGL_CENTROS_CIVICOS, titulo: "Reglamento de Centros Cívicos del Ayuntamiento de Zaragoza" }],
  indice_estudio: [
    { url: REGL_CENTROS_CIVICOS, titulo: "Concepto, organización y Reglamento de Centros Cívicos", seccion: "concepto-organizacion-centros-civicos", articulos: "Reglamento de Centros Cívicos" },
    { url: "", titulo: "Tipos de actividades socioculturales", seccion: "tipos-actividades-socioculturales-centros-civicos", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Funciones del oficial de mantenimiento en Centros Cívicos", seccion: "funciones-oficial-mantenimiento-centros-civicos", articulos: "Conceptos fundamentales" },
  ],
});

console.log("🔧 tema-72 (Centros Públicos Escolares)...");
await patchTema("tema-72", {
  enlaces_boe: [{ url: PORTAL_COLEGIOS, titulo: "Centros Públicos Escolares — Unidad de Colegios Públicos (Ayuntamiento de Zaragoza)" }],
  indice_estudio: [
    { url: PORTAL_COLEGIOS, titulo: "Unidad de Colegios Públicos: concepto y cometidos", seccion: "unidad-colegios-publicos-concepto-cometidos", articulos: "Portal de Centros Públicos Escolares" },
    { url: "", titulo: "Tipologías y ubicación de centros escolares", seccion: "tipologias-ubicacion-centros-escolares", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Funciones del oficial de mantenimiento en centros escolares", seccion: "funciones-oficial-mantenimiento-centros-escolares", articulos: "Conceptos fundamentales" },
  ],
});

console.log("🔧 tema-78 (calidad del servicio deportivo)...");
await patchTema("tema-78", {
  enlaces_boe: [{ url: MANUAL_ATENCION, titulo: "Manual de Atención a la Ciudadanía del Ayuntamiento de Zaragoza (2018)" }],
  indice_estudio: [
    { url: MANUAL_ATENCION, titulo: "Manual de Atención al Ciudadano y Cartas de Servicios", seccion: "manual-atencion-cartas-servicios", articulos: "Manual de Atención a la Ciudadanía" },
    { url: "", titulo: "Certificación ISO 14001 en Centros Deportivos", seccion: "certificacion-iso-14001-centros-deportivos", articulos: "Norma internacional de gestión ambiental" },
    { url: "", titulo: "Procedimientos de reserva y uso de espacios deportivos", seccion: "procedimientos-reserva-uso-espacios-deportivos", articulos: "Conceptos fundamentales" },
  ],
});

console.log("🔧 tema-93 (gestión de montes y riberas)...");
await patchTema("tema-93", {
  enlaces_boe: [{ url: PORTAL_BOSQUE_ZARAGOZANOS, titulo: "Bosque de los Zaragozanos — proyecto municipal de reforestación (Ayuntamiento de Zaragoza)" }],
  indice_estudio: [
    { url: "", titulo: "Limpieza y eliminación de especies invasoras", seccion: "limpieza-eliminacion-especies-invasoras", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Conservación de biodiversidad y protección de hábitats", seccion: "conservacion-biodiversidad-habitats", articulos: "Conceptos fundamentales" },
    { url: PORTAL_BOSQUE_ZARAGOZANOS, titulo: "Reforestación, recuperación de áreas degradadas y el Bosque de los Zaragozanos", seccion: "reforestacion-bosque-zaragozanos", articulos: "Portal oficial del proyecto" },
  ],
});

console.log("🔧 tema-107 (interpretación cartográfica)...");
await patchTema("tema-107", {
  enlaces_boe: [
    { url: IDEARAGON, titulo: "IDEAragón — Infraestructura de Datos Espaciales de Aragón" },
    { url: INAGA_VISORES, titulo: "INAGA — Servicios GIS de cartografía por internet" },
  ],
  indice_estudio: [
    { url: "", titulo: "Sistemas de coordenadas, UTM y escalas", seccion: "sistemas-coordenadas-utm-escalas", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Curvas de nivel, cálculos sobre plano e instrumentos de campo", seccion: "curvas-nivel-calculos-instrumentos-campo", articulos: "Conceptos fundamentales" },
    { url: IDEARAGON, titulo: "IDEAragón, SIGPAC y visores del INAGA", seccion: "idearagon-sigpac-visores-inaga", articulos: "IDEAragón e INAGA" },
  ],
});

console.log("\n✅ 6 temas corregidos con fuente real enlazada.");

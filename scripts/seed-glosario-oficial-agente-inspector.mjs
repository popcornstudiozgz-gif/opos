/**
 * Glosario curado para los 16 temas nuevos de la parte específica de
 * Oficial Agente Inspector (tema-92 a tema-107). Mismo criterio que
 * seed-glosario-oficial-albanil.mjs — dado el perfil marcadamente legal
 * de esta oposición, la selección incluye más términos jurídicos que en
 * las anteriores "Oficial X".
 *
 * Uso: node --env-file=.env.local scripts/seed-glosario-oficial-agente-inspector.mjs
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
  // tema-92 — parques y jardines
  t("tema-92", "inspeccion-visual-riesgo-arbolado", "VTA (Visual Tree Assessment)", "Método de evaluación del riesgo de un árbol basado en la observación externa de síntomas (grietas, hongos, inclinación), sin instrumentos invasivos."),
  t("tema-92", "gestion-arbolado-podas-plantacion", "Poda de seguridad", "Poda dirigida a eliminar ramas o partes de un árbol que suponen un riesgo inminente para personas, vehículos o instalaciones."),

  // tema-93 — montes y riberas
  t("tema-93", "limpieza-eliminacion-especies-invasoras", "Especie invasora", "Especie introducida fuera de su área natural que se propaga de forma agresiva, desplazando a la vegetación o fauna autóctona."),
  t("tema-93", "conservacion-biodiversidad-habitats", "Corredor ecológico", "Franja de hábitat natural que conecta espacios separados, permitiendo el desplazamiento y dispersión de especies entre ellos."),

  // tema-94 — mobiliario urbano
  t("tema-94", "sustitucion-piezas-pintado-revision", "Revisión estructural", "Inspección sistemática de anclajes, soldaduras y uniones del mobiliario urbano para detectar deterioro que comprometa la seguridad."),

  // tema-95 — sanidad vegetal y especies invasoras
  t("tema-95", "control-plagas-enfermedades-sanidad-vegetal", "Control biológico conservativo", "Estrategia que favorece a los enemigos naturales ya presentes en el ecosistema (depredadores, parasitoides) para regular plagas sin recurrir a tratamientos químicos."),
  t("tema-95", "especies-exoticas-invasoras-catalogo-cites", "CITES", "Convenio internacional (Washington, 1973) que regula y controla el comercio de especies amenazadas de fauna y flora silvestres."),

  // tema-96 — PRL en zonas verdes y montes
  t("tema-96", "uso-seguro-herramientas-maquinaria", "Rebote (kickback)", "Movimiento brusco e incontrolado de la barra de una motosierra al contactar su punta con un objeto inesperado."),
  t("tema-96", "riesgos-trabajo-aire-libre-primeros-auxilios", "Golpe de calor", "Elevación peligrosa de la temperatura corporal por exposición prolongada al calor sin hidratación suficiente, que requiere atención médica urgente."),

  // tema-97 — limpieza pública
  t("tema-97", "planificacion-rutas-limpieza-estacional", "Planificación de rutas", "Organización previa del recorrido, orden y frecuencia con que se atienden las distintas calles y espacios de una zona."),

  // tema-98 — mantenimiento de vías públicas
  t("tema-98", "ordenanza-proteccion-arbolado-urbano", "Árbol singular", "Ejemplar del arbolado urbano sometido a un régimen de protección especial por su rareza, interés cultural, ambiental o social."),

  // tema-99 — residuos especiales
  t("tema-99", "recogida-residuos-voluminosos-electronicos-escombros", "RAEE", "Residuo de aparato eléctrico y electrónico al final de su vida útil, sometido a gestión específica por los materiales y componentes que puede contener."),
  t("tema-99", "economia-circular-reciclaje-compostaje", "Economía circular", "Modelo que prioriza reducción, reutilización y reciclaje frente al modelo lineal tradicional de producir, usar y tirar."),

  // tema-100 — sensibilización ambiental
  t("tema-100", "campanas-educacion-ambiental", "Campaña de educación ambiental", "Iniciativa organizada, con objetivos y mensajes definidos, orientada a sensibilizar y modificar comportamientos ciudadanos en relación con el medio ambiente."),

  // tema-101 — término municipal y bienes
  t("tema-101", "bienes-demaniales-patrimoniales-comunales", "Bien comunal", "Bien de dominio público cuyo aprovechamiento (pastos, leñas) corresponde al común de los vecinos de un municipio."),
  t("tema-101", "normativa-catastral-arrendamientos-concesiones", "Concesión administrativa", "Autorización del uso privativo o aprovechamiento especial de un bien de dominio público a cambio de contraprestación y por plazo determinado."),

  // tema-102 — vías pecuarias y caza
  t("tema-102", "vias-pecuarias-concepto-clasificacion-deslinde", "Deslinde", "Procedimiento administrativo que define los límites exactos de una vía pecuaria sobre el terreno."),
  t("tema-102", "caza-aragon-licencias-modalidades-terrenos", "Terreno cinegético", "Terreno acotado (coto de caza) con aprovechamiento ordenado de las especies de caza presentes en él."),

  // tema-103 — normativa forestal, aguas y ambiental
  t("tema-103", "concepto-monte-utilidad-publica", "Catálogo de Montes de Utilidad Pública", "Registro administrativo donde se inscriben los montes públicos declarados de utilidad pública, gozando de mayor régimen de protección."),
  t("tema-103", "dominio-publico-hidraulico-zonas", "Zona de policía", "Franja de 100 metros contigua a un cauce público donde se condicionan los usos y actividades que puedan afectar al régimen del río."),

  // tema-104 — conservación de la naturaleza
  t("tema-104", "red-natura-2000-patrimonio-natural", "Red Natura 2000", "Red ecológica europea de espacios protegidos formada por Zonas Especiales de Conservación (ZEC) y Zonas de Especial Protección para las Aves (ZEPA)."),
  t("tema-104", "espacios-protegidos-aragon-laesrpe", "LAESRPE", "Listado Aragonés de Especies Silvestres en Régimen de Protección Especial, creado por el Decreto 129/2022, que integra el Catálogo de Especies Amenazadas de Aragón."),

  // tema-105 — incendios forestales
  t("tema-105", "tipos-incendio-forestal-propagacion-causalidad", "Incendio de copas", "Tipo de incendio forestal en el que arde el dosel arbóreo, el más virulento y de propagación más rápida."),
  t("tema-105", "procinfo-marco-normativo", "PROCINFO", "Plan Especial de Protección Civil de Emergencias por Incendios Forestales de Aragón, aprobado por el Decreto 167/2018."),

  // tema-106 — PAC
  t("tema-106", "pac-aplicacion-aragon-ayudas-ecoregimenes", "Ecorregímenes", "Régimen de ayudas voluntario de la PAC que retribuye a agricultores y ganaderos por adoptar prácticas beneficiosas para el clima y el medio ambiente."),

  // tema-107 — interpretación cartográfica
  t("tema-107", "sistemas-coordenadas-utm-escalas", "UTM", "Proyección cartográfica (Universal Transversal Mercator) que divide la Tierra en husos de 6° y representa las coordenadas en metros sobre un plano."),
  t("tema-107", "curvas-nivel-calculos-instrumentos-campo", "Equidistancia", "Diferencia de altitud constante entre dos curvas de nivel consecutivas de un mismo mapa."),
];

console.log(`📚 Insertando ${TERMINOS.length} términos de glosario (Oficial Agente Inspector)...`);
await insertBatch(TERMINOS);
console.log("✅ Glosario de Oficial Agente Inspector sembrado.");

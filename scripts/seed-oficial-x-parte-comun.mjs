/**
 * Da de alta la "parte común" (temas 1-6) de los 14 puestos "Oficial X"
 * restantes de la misma convocatoria del Ayuntamiento de Zaragoza (CONV
 * 4/2026, BOP núm. 170 de 27/07/2026, bases2110.pdf) que ya se usó para dar
 * de alta oficial-albanil-ayto-zaragoza.
 *
 * Contexto (ver también seed-oficial-albanil-setup-y-parte-comun.mjs y
 * fix-oficial-albanil-reusar-temas-canonicos.mjs): la "parte primera" del
 * Anexo I es, para los ~15 puestos "Oficial X" de esta convocatoria,
 * literalmente el mismo enunciado (con variaciones tipográficas triviales
 * en un par de puestos, sin cambio de contenido exigible): Constitución +
 * Estatuto de Aragón + LPACAP-procedimiento común (TEMA 1 oficial) / Ley de
 * capitalidad de Zaragoza + Haciendas Locales (TEMA 2) / empleados públicos
 * (TEMA 3) / igualdad efectiva + PRL (TEMA 4). En el sitio esos 4 temas
 * oficiales se representan como 6 temas canónicos ya existentes y
 * verificados (tema-1, tema-3 y tema-7, recortados con secciones_incluidas
 * — igual que en oficial-albanil — más tema-42/43/44, íntegros), evitando
 * duplicar contenido.
 *
 * Este script SOLO crea: la oposición, sus 2 bloques (bloque-1 "parte
 * común" con los 6 temas ya enlazados; bloque-2 "parte específica" vacío,
 * a la espera de su propio desarrollo) para cada uno de los 14 puestos.
 * NO toca oficial-albanil-ayto-zaragoza (ya dado de alta) ni crea todavía
 * contenido de la parte específica (temas 7-20) de ninguno de estos 14.
 *
 * Plazas por puesto (Anexo Plazas / base 1.4 de bases2110.pdf, todas
 * dentro de la misma convocatoria y decreto que auxiliar-administrativo-
 * ayto-zaragoza y oficial-albanil-ayto-zaragoza):
 * - Oficial Mantenimiento General: 29 (27 TLO, 1 TLRINTEL, 1 TLRMEN)
 * - Oficial Polivalente Instalaciones Deportivas: 13 (11 TLO, 1 TLRDIS, 1 TLRVGEN)
 * - Oficial Agente Inspector: 10 (8 TLO, 1 TLRVGEN, 1 TLRINTEL)
 * - Oficial Guardallaves: 9 (5 TLO, 1 TLO-A, 2 TLO-D, 1 TLRDIS)
 * - Oficial Cementerio: 3 (3 TLO)
 * - Oficial Mecánico: 4 (2 TLO, 2 TLO-D)
 * - Oficial Herrero: 5 (4 TLO, 1 TLO-D)
 * - Oficial Electricista: 4 (4 TLO)
 * - Oficial Planta Potabilizadora: 3 (3 TLO)
 * - Oficial Carpintero: 2 (1 TLO, 1 TLO-D)
 * - Oficial Pintor, especialidad General: 1 TLO
 * - Oficial Pintor, especialidad Gráfica: 1 TLO
 * - Oficial Conductor, especialidad General: 2 TLO
 * - Oficial Conductor, especialidad Maquinaria Pesada: 2 TLO
 *
 * Uso: node --env-file=.env.local scripts/seed-oficial-x-parte-comun.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const data = await res.json();
  console.log(`   ✓ ${tabla}: ${data.length} filas`);
  return data;
}

// ── Parte común: los mismos 6 temas canónicos, con el mismo recorte, ya
// usados para oficial-albanil-ayto-zaragoza. ──────────────────────────────
const TEMAS_PARTE_COMUN = [
  { temaSlug: "tema-1", numero: 1, secciones: ["titulo-preliminar", "titulo-4", "titulo-8-cap-1", "titulo-8-cap-2"] },
  { temaSlug: "tema-3", numero: 2, secciones: ["titulo-preliminar", "titulo-2-cap-1", "titulo-2-cap-2", "titulo-2-cap-3", "titulo-2-cap-4"] },
  { temaSlug: "tema-7", numero: 3, secciones: null },
  { temaSlug: "tema-42", numero: 4, secciones: ["ley-capitalidad-zaragoza-disposiciones-generales", "gobierno-administracion-municipio-zaragoza", "haciendas-locales-recursos-impuestos-municipales"] },
  { temaSlug: "tema-43", numero: 5, secciones: ["clases-empleados-publicos-derechos-deberes", "adquisicion-perdida-relacion-servicio", "regimen-disciplinario-empleados-publicos", "peculiaridades-funcion-publica-local"] },
  { temaSlug: "tema-44", numero: 6, secciones: ["ley-igualdad-efectiva-principio-tutela-discriminacion", "plan-igualdad-ayuntamiento-zaragoza", "ley-prl-objeto-caracter-norma"] },
];

// ── Los 14 puestos "Oficial X" restantes de esta convocatoria ────────────
const PUESTOS = [
  {
    puestoSlug: "oficial-mantenimiento",
    nombre: "Oficial Mantenimiento General",
    parteEspecifica: "Electricidad, fontanería, alarmas y ascensores, albañilería básica, carpintería/cerrajería/persianas, audio y vídeo, ofimática básica, organigrama del Ayuntamiento, documentos administrativos, Servicios Sociales Comunitarios, Centros Cívicos, Centros Públicos Escolares, movilidad urbana, Juntas Municipales y Vecinales, protección de incendios y seguridad y prevención de riesgos en el mantenimiento de equipamientos públicos.",
  },
  {
    puestoSlug: "oficial-instalaciones-deportivas",
    nombre: "Oficial Polivalente Instalaciones Deportivas",
    parteEspecifica: "Organización del deporte municipal, calidad del servicio deportivo, ofimática básica, electricidad y fontanería aplicadas a instalaciones deportivas, pintura, calefacción y prevención de la legionela, limpieza y desinfección, normativa e higiene de piscinas, tratamiento del agua de piscinas (depuración y desinfección), jardinería (riego, césped, arbustos y árboles), productos fitosanitarios, protección de incendios y prevención de riesgos laborales.",
  },
  {
    puestoSlug: "oficial-agente-inspector",
    nombre: "Oficial Agente Inspector",
    parteEspecifica: "Mantenimiento de parques y jardines, gestión de montes y riberas, equipamiento y mobiliario urbano, sanidad vegetal y fauna, seguridad en trabajos al aire libre, limpieza pública, mantenimiento de vías y espacios públicos, gestión de residuos, sensibilización ambiental, el término municipal de Zaragoza y su patrimonio, vías pecuarias y caza, normativa forestal y de aguas, conservación de la naturaleza y espacios protegidos, incendios forestales, Política Agraria Comunitaria e interpretación cartográfica.",
  },
  {
    puestoSlug: "oficial-guardallaves",
    nombre: "Oficial Guardallaves",
    parteEspecifica: "Red de abastecimiento de agua de Zaragoza, cartografía del Servicio de Explotación de Redes, corte y restitución del suministro, hidráulica básica (caudal, presión, pérdidas de carga), estructura de las conducciones, válvulas y elementos auxiliares de la red, acometidas domiciliarias, válvulas eléctricas y automatismo, detección de averías, sectorización de la red, instalaciones de riego, contadores, cámaras y arquetas, y prevención de riesgos en trabajos en espacios confinados.",
  },
  {
    puestoSlug: "oficial-cementerio",
    nombre: "Oficial Cementerio",
    parteEspecifica: "Conglomerantes ordinarios y morteros, elementos constructivos de fábrica, excavaciones, innovación en materiales de tabiquería y muros, inspección previa y patologías, recursos materiales y organización del trabajo, prevención de riesgos laborales y EPIs, trabajos en altura y andamios, historia del Cementerio de Torrero, normativa (policía sanitaria mortuoria, ordenanza municipal de cementerios), el procedimiento PPRL-1605 de enterramientos, la instrucción operativa de trabajo y el recurso preventivo.",
  },
  {
    puestoSlug: "oficial-mecanico",
    nombre: "Oficial Mecánico",
    parteEspecifica: "Componentes y distribución del motor, engrase y refrigeración, sistemas de alimentación diésel y gasolina, encendido, instalación eléctrica del automóvil, sobrealimentación, cajas de cambios y embragues, dirección, frenos y seguridad pasiva/activa, transmisión y diferencial, sistema de escape, vehículos híbridos y eléctricos, climatización y prevención de riesgos laborales.",
  },
  {
    puestoSlug: "oficial-herrero",
    nombre: "Oficial Herrero",
    parteEspecifica: "Metalurgia básica y metalografía, propiedades y ensayos de materiales, normalización y escalas, materiales normalizados, el taller y su maquinaria y herramientas, mecanizado básico (limado, roscado, punzonado...), dibujo técnico y trazado de piezas, soldadura oxiacetilénica y eléctrica, calderería, torneado de piezas, carpintería metálica, instrumentos de medición y verificación, y prevención de riesgos laborales específicos del oficio.",
  },
  {
    puestoSlug: "oficial-electricista",
    nombre: "Oficial Electricista",
    parteEspecifica: "El Reglamento Electrotécnico para Baja Tensión (REBT), conceptos fundamentales de electricidad, seguridad eléctrica y prevención de riesgos, instalaciones de enlace en edificios, cuadros generales de mando y protección, cables y conductores, instalaciones interiores y en locales especiales, alumbrado, motores de corriente alterna, puesta a tierra, automatismos eléctricos cableados, averías y mantenimiento, corrientes débiles y telecomunicaciones, eficiencia energética e instalaciones solares fotovoltaicas.",
  },
  {
    puestoSlug: "oficial-planta-potabilizadora",
    nombre: "Oficial Planta Potabilizadora",
    parteEspecifica: "Parámetros de calidad del agua y normativa sanitaria, desbaste, coagulación y floculación, decantación, filtración, desinfección y cloración, hidráulica de conducciones, la red de agua potable de Zaragoza, bombas y depósitos, máquinas y herramientas, soldadura, redes de distribución eléctrica y motores eléctricos, equipos neumáticos, automatización industrial, y prevención de riesgos laborales (alturas, espacios confinados, trabajos eléctricos y productos químicos).",
  },
  {
    puestoSlug: "oficial-carpintero",
    nombre: "Oficial Carpintero",
    parteEspecifica: "La madera (propiedades, enfermedades y patologías), secado, pegamentos y plásticos, maderas compuestas, tratamientos de superficie, el banco de carpintero y sus herramientas, máquinas, ensambles, dibujo técnico, mediciones en la construcción, puertas, ventanas, suelos, tabiques de separación ligeros y prevención de riesgos laborales en los trabajos de carpintería.",
  },
  {
    puestoSlug: "oficial-pintor-general",
    nombre: "Oficial Pintor — Especialidad General",
    parteEspecifica: "El taller de pintura, clases de pinturas, imprimaciones e impermeabilización, composición y tecnología de la pintura, cálculo de volumen y rendimiento, pintura para pavimentos, el color, procesos de trabajo, sistemas de pintado en interiores y exteriores, pintura decorativa, empapelado, Documentos Básicos del CTE (humedad, caídas, incendio), patologías en la edificación afectas a la pintura, andamios y plataformas elevadoras, y prevención de riesgos laborales en obras de construcción.",
  },
  {
    puestoSlug: "oficial-pintor-grafica",
    nombre: "Oficial Pintor — Especialidad Gráfica",
    parteEspecifica: "El taller de rotulación, herramientas de posimpresión y corte, materiales de rotulación (vinilos, laminados), materiales flexibles y rígidos de artes gráficas, soportes y productos de limpieza y antigraffiti, empapelado e interpretación de planos en montaje de exposiciones, andamios y plataformas elevadoras, principios de las artes gráficas y la producción gráfica, sistemas de color en impresión digital, señalética, identidad corporativa del Ayuntamiento de Zaragoza, software de rotulación (Corel Draw, Roland VersaWorks), tipos de ficheros gráficos, fuentes tipográficas y prevención de riesgos laborales en obras de construcción.",
  },
  {
    puestoSlug: "oficial-conductor-general",
    nombre: "Oficial Conductor — Especialidad General",
    parteEspecifica: "Energías alternativas en vehículos, vehículo y medio ambiente, mecánica de vehículos a motor, dirección/neumáticos/frenos/amortiguación, sistema eléctrico y de encendido, la Ley de tráfico y el Reglamento General de Circulación, el Certificado de Aptitud Profesional (CAP) y el tacógrafo, autorizaciones administrativas para conducir, infracciones y sanciones, carga de vehículos y transporte, ubicación de instalaciones municipales, la Ordenanza de Movilidad Urbana de Zaragoza, prevención de riesgos en la conducción, vehículos para movimiento de tierras, el Reglamento General de Vehículos y el callejero de Zaragoza.",
  },
  {
    puestoSlug: "oficial-conductor-maquinaria-pesada",
    nombre: "Oficial Conductor — Especialidad Maquinaria Pesada",
    parteEspecifica: "Normativa de tráfico y seguridad vial, prevención de riesgos laborales en el uso de maquinaria pesada, señalización de obras, trabajos con excavadora, palas cargadoras, mini-excavadoras, moto-niveladoras, bulldozer y compactadores, tipos y fuerzas de excavación, mantenimiento de maquinaria, procedimientos de operación segura, motores diésel de la maquinaria de obras y camiones específicos para movimiento de tierras.",
  },
];

console.log(`🏛️  Dando de alta ${PUESTOS.length} oposiciones "Oficial X"...`);
const oposicionesInsertadas = await upsert(
  "oposiciones",
  PUESTOS.map((p) => ({
    slug: `${p.puestoSlug}-ayto-zaragoza`,
    nombre: p.nombre,
    organismo: "Ayuntamiento de Zaragoza",
    descripcion_corta: `Preparación online para ${p.nombre} del Ayuntamiento de Zaragoza (Escala de Administración Especial, C2).`,
    descripcion_larga: `Temario interactivo para preparar la oposición de ${p.nombre} del Ayuntamiento de Zaragoza (turno libre ordinario, convocatoria 2026, BOP núm. 170 de 27/07/2026): 20 temas oficiales organizados en 2 bloques — una parte común compartida con el resto de puestos de "Oficial" de esta convocatoria, y una parte específica del oficio.`,
    activa: true,
    organismo_slug: "ayuntamiento-zaragoza",
    puesto_slug: p.puestoSlug,
  })),
  "slug"
);
console.log(`   ✓ oposiciones: ${oposicionesInsertadas.length} filas`);

console.log("\n📦 Dando de alta los bloques (parte común + parte específica)...");
const bloquesPorPuesto = PUESTOS.flatMap((p) => {
  const oposicionSlug = `${p.puestoSlug}-ayto-zaragoza`;
  return [
    {
      oposicion_slug: oposicionSlug,
      slug: "bloque-1",
      titulo: "Bloque 1 — Parte común",
      descripcion:
        "Constitución Española, Estatuto de Autonomía de Aragón y disposiciones sobre el procedimiento administrativo común; Ley de capitalidad de Zaragoza y Haciendas Locales; empleados públicos; igualdad efectiva y prevención de riesgos laborales. Temario idéntico al de los demás puestos de \"Oficial\" de esta convocatoria.",
      orden: 1,
    },
    {
      oposicion_slug: oposicionSlug,
      slug: "bloque-2",
      titulo: "Bloque 2 — Parte específica",
      descripcion: p.parteEspecifica,
      orden: 2,
    },
  ];
});
const bloquesInsertados = await upsert("bloques", bloquesPorPuesto, "oposicion_slug,slug");

const bloque1IdPorOposicion = Object.fromEntries(
  bloquesInsertados.filter((b) => b.slug === "bloque-1").map((b) => [b.oposicion_slug, b.id])
);

console.log("\n📚 Enlazando la parte común (6 temas canónicos) en cada puesto...");
const temaOposicionFilas = PUESTOS.flatMap((p) => {
  const oposicionSlug = `${p.puestoSlug}-ayto-zaragoza`;
  return TEMAS_PARTE_COMUN.map((t) => ({
    tema_slug: t.temaSlug,
    oposicion_slug: oposicionSlug,
    bloque_id: bloque1IdPorOposicion[oposicionSlug],
    numero: t.numero,
    orden: t.numero,
    es_premium: false,
    publicado: true,
    secciones_incluidas: t.secciones,
  }));
});
await upsert("tema_oposicion", temaOposicionFilas, "tema_slug,oposicion_slug");

console.log(`\n✅ Parte común de ${PUESTOS.length} puestos "Oficial X" sembrada (${temaOposicionFilas.length} filas de tema_oposicion).`);

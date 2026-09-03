/**
 * Glosario de la parte específica de Oficial Pintor, Especialidad
 * General (tema-235 a tema-250). Selección curada (no exhaustiva) de
 * términos técnicos que puedan resultar complejos, ~2 por tema, con la
 * misma `seccion` que las flashcards/preguntas de cada tema para que el
 * recorte por `secciones_incluidas` funcione igual.
 *
 * Uso: node --env-file=.env.local scripts/seed-glosario-oficial-pintor-general.mjs
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
  // tema-235 — El taller de pintura
  t("tema-235", "materiales-herramientas-equipos-pintura", "Airless", "Equipo de pulverización que bombea la pintura a alta presión sin mezclarla con aire, logrando mayor rendimiento en superficies grandes."),
  t("tema-235", "limpieza-almacenamiento-productos-quimicos-taller", "ITC MIE APQ", "Instrucciones Técnicas Complementarias del Reglamento de Almacenamiento de Productos Químicos (RD 656/2017)."),

  // tema-236 — Clases de pinturas
  t("tema-236", "pinturas-epoxi-poliuretanos-clorocaucho", "Bicomponente", "Producto suministrado en dos envases (resina y endurecedor) que deben mezclarse antes de su aplicación."),
  t("tema-236", "disolventes-metodos-aplicacion-fichas-tecnicas-cov", "COV", "Compuestos Orgánicos Volátiles: sustancias que se evaporan a temperatura ambiente, cuyo contenido en pinturas limita el RD 227/2006."),

  // tema-237 — Imprimaciones e impermeabilización
  t("tema-237", "imprimaciones-tipos-funcion", "Imprimación antioxidante", "Capa previa formulada con pigmentos inhibidores de la corrosión, aplicada sobre metal antes del esmalte de acabado."),
  t("tema-237", "productos-impermeabilizacion-tipos-usos", "Transpirabilidad", "Capacidad de un producto de dejar salir el vapor de agua del interior de un muro sin retenerlo."),

  // tema-238 — Composición y tecnología de la pintura
  t("tema-238", "componentes-basicos-pintura-ligante-disolvente-carga", "Ligante", "Componente de la pintura que, tras el secado, forma la película sólida y aglutina el resto de componentes."),
  t("tema-238", "pigmentos-tipos-caracteristicas-usos", "Poder cubriente", "Capacidad de un pigmento para ocultar el color o aspecto del soporte sobre el que se aplica la pintura."),

  // tema-239 — Cálculo de volumen y cantidad de pintura
  t("tema-239", "rendimiento-revestimientos-pintura", "Rendimiento", "Superficie que puede cubrirse con una unidad de volumen de pintura, expresado en m²/l."),
  t("tema-239", "calculo-cantidad-pintura-necesaria", "Merma", "Margen añadido al cálculo teórico de pintura necesaria para cubrir pérdidas de producto en la práctica."),

  // tema-240 — Pintura para pavimentos
  t("tema-240", "aditivos-caracteristicas-tipos-pavimentos", "Carga antideslizante", "Partículas (cuarzo, corindón) incorporadas a una resina de pavimento para aumentar su rugosidad y reducir el resbalón."),
  t("tema-240", "herramientas-equipos-metodo-aplicacion-pavimentos", "Rodillo desaireador", "Rodillo con púas que rompe y elimina las burbujas de aire atrapadas en una resina de pavimento recién extendida."),

  // tema-241 — Componentes del color
  t("tema-241", "sistemas-color-ral-ncs", "RAL", "Sistema de identificación cromática de origen alemán que codifica cada color mediante cuatro cifras."),
  t("tema-241", "mezclas-color-cartas-color", "Tintometría", "Sistema de dosificación automática que añade colorantes concentrados a una base de pintura neutra según una fórmula."),

  // tema-242 — Procesos de los trabajos de pintura
  t("tema-242", "preparacion-limpieza-superficies", "Decapado", "Eliminación completa de una capa de pintura antigua mediante medios mecánicos, térmicos o químicos."),
  t("tema-242", "tipos-superficies-caracteristicas-materiales", "Higroscópico", "Que tiene capacidad de absorber y ceder humedad ambiental, característica propia de la madera como soporte."),

  // tema-243 — Sistemas de pintado exteriores/interiores
  t("tema-243", "defectos-pintura-aplicacion", "Piel de naranja", "Defecto de acabado con textura de pequeños hoyuelos, causado por una técnica de pulverización inadecuada."),
  t("tema-243", "barnices-sistemas-pintado-entorno", "Barniz marino", "Barniz de elevada resistencia a la intemperie, rayos UV y humedad, empleado también en carpintería exterior urbana."),

  // tema-244 — Pintura decorativa, aerografía
  t("tema-244", "aerografia-equipos-tecnica-aplicacion", "Aerógrafo", "Instrumento de precisión accionado por aire comprimido que pulveriza pintura para trabajos de detalle y degradado."),
  t("tema-244", "tecnicas-pintura-decorativa", "Veladura", "Capa muy diluida y semitransparente aplicada sobre un color base ya seco, para lograr efectos de profundidad."),

  // tema-245 — Empapelado
  t("tema-245", "tipos-papel-pintado-materiales", "Papel TNT", "Papel pintado tejido no tejido, dimensionalmente estable, que se coloca encolando la pared en vez del propio papel."),
  t("tema-245", "herramientas-empapelado-calculo-cantidad", "Raport", "Distancia a la que se repite el motivo decorativo de un papel pintado, relevante para casar el dibujo entre tiras."),

  // tema-246 — CTE aplicado a la pintura
  t("tema-246", "db-sua-1-seguridad-riesgo-caidas", "Resbaladicidad", "Resistencia al deslizamiento de un pavimento, clasificada por clases según el DB SUA-1 del CTE."),
  t("tema-246", "db-si-seguridad-caso-incendio", "Pintura intumescente", "Pintura que se expande formando una capa aislante en caso de incendio, mejorando la resistencia al fuego del elemento."),

  // tema-247 — Patologías en la edificación afectas a la pintura
  t("tema-247", "eflorescencias-fisuras-grietas-soporte", "Eflorescencia", "Depósito cristalino blanquecino de sales solubles que migran a la superficie de un material poroso húmedo."),
  t("tema-247", "humedades-tipos-causas-manifestacion", "Humedad de capilaridad", "Ascenso del agua del terreno a través de los poros de un material de construcción, habitual en la base de muros."),

  // tema-248 — Andamios y plataformas elevadoras
  t("tema-248", "plataformas-elevadoras-moviles-personal", "PEMP", "Plataforma Elevadora Móvil de Personal: equipo con cesta que se eleva y desplaza para trabajos en altura."),
  t("tema-248", "escaleras-mano-otros-medios-auxiliares", "Trabajos verticales", "Técnicas de acceso y posicionamiento mediante cuerdas, arneses y dispositivos de progresión en altura."),

  // tema-249 — Materias primas de artes gráficas
  t("tema-249", "vinilos-adhesivos-vinilo-corte", "Vinilo de corte", "Vinilo adhesivo de color uniforme del que se recortan letras o formas mediante una plotter, sin impresión previa."),
  t("tema-249", "adhesivos-empleados-rotulacion", "Adhesivo removible", "Adhesivo que permite despegar el vinilo sin dejar residuos ni dañar el soporte, adecuado para señalización temporal."),

  // tema-250 — PRL en las obras de construcción
  t("tema-250", "marco-legal-ley-31-1995-rd-1627-1997", "Coordinador de seguridad", "Técnico designado por el promotor para coordinar la acción preventiva cuando intervienen varias empresas en una obra."),
  t("tema-250", "lineas-vida-trabajos-altura", "Línea de vida", "Dispositivo de anclaje al que se conecta el arnés anticaídas, permitiendo desplazarse protegido frente a una caída."),
];

console.log(`📖 Insertando ${TERMINOS.length} términos de glosario...`);
const insertados = await insertar("glosario", TERMINOS);
console.log(`✅ Glosario de Oficial Pintor General sembrado: ${insertados.length} términos.`);

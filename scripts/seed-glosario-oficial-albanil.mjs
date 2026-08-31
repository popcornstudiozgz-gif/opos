/**
 * Glosario curado para los 16 temas nuevos de la parte específica de
 * Oficial Albañil (tema-45 a tema-60). Mismo criterio que
 * scripts/seed-glosario.mjs (Auxiliar Administrativo): selección
 * curada de términos que puedan resultar complejos, NO cobertura
 * exhaustiva — no un glosario por cada flashcard. Misma `seccion` que ya
 * usan las flashcards/preguntas de cada tema, para que
 * `tema_oposicion.secciones_incluidas` filtre igual.
 *
 * Uso: node --env-file=.env.local scripts/seed-glosario-oficial-albanil.mjs
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
  // tema-45 — materiales y herramientas
  t("tema-45", "conglomerantes-aridos-morteros", "Fraguado", "Proceso químico por el que un conglomerante (cemento, cal, yeso) mezclado con agua pasa de estado plástico a sólido, ganando resistencia progresivamente."),
  t("tema-45", "conglomerantes-aridos-morteros", "Conglomerante aéreo", "Conglomerante (como la cal aérea o el yeso) que solo fragua y endurece en contacto con el aire, no bajo el agua."),
  t("tema-45", "materiales-ceramicos-bloques-piezas", "Aparejo", "Disposición ordenada de las piezas de una fábrica (a soga, a tizón, a panderete) que determina su resistencia y aspecto."),

  // tema-46 — replanteo y planos
  t("tema-46", "documentacion-proyecto-tipos-obra", "Memoria constructiva", "Documento del proyecto que describe con palabras las soluciones constructivas adoptadas, complementando a los planos."),
  t("tema-46", "interpretacion-planos-escalas-acotacion", "Cota", "Valor numérico que indica una medida (longitud, altura) directamente sobre el plano, sin necesidad de medir con escalímetro."),
  t("tema-46", "replanteo-obra-croquis", "Replanteo", "Operación de trasladar al terreno, con precisión, las medidas y puntos que figuran en el plano del proyecto."),

  // tema-47 — mediciones y valoración
  t("tema-47", "criterios-unidades-medicion", "Partida", "Cada una de las unidades de obra en que se descompone un presupuesto (por ejemplo, 'fábrica de ladrillo'), con su propia medición y precio."),
  t("tema-47", "precios-costes-presupuestos", "Precio descompuesto", "Desglose de un precio unitario en sus componentes (materiales, mano de obra, maquinaria, costes indirectos)."),
  t("tema-47", "ofertas-mediciones-certificaciones", "Certificación de obra", "Documento periódico que valora económicamente la obra ejecutada hasta una fecha, base para el pago al contratista."),

  // tema-48 — excavaciones y demoliciones
  t("tema-48", "excavaciones-zanjas-tipos", "Talud", "Superficie inclinada de un corte de tierras, cuyo ángulo depende de la cohesión del terreno para evitar el desprendimiento."),
  t("tema-48", "entibaciones-apuntalamientos-taludes", "Entibación", "Estructura de contención (madera, metálica) que sostiene las paredes de una zanja o excavación para evitar su derrumbe."),
  t("tema-48", "demolicion-pavimentos-fabricas-revestimientos", "Demolición selectiva", "Técnica de demolición que separa y clasifica los materiales según su naturaleza, para facilitar su reciclaje o gestión diferenciada."),

  // tema-49 — rellenos, terraplenes y grava-cemento
  t("tema-49", "rellenos-zanjas-tongadas", "Tongada", "Cada una de las capas de material que se extiende y compacta sucesivamente al rellenar una zanja o terraplén."),
  t("tema-49", "terraplenes-desmontes", "Compactación", "Proceso mecánico de reducción de huecos de un material de relleno para aumentar su densidad y capacidad portante."),
  t("tema-49", "capas-granulares-grava-cemento", "Grava-cemento", "Mezcla de árido grueso, cemento y agua en pequeña proporción, usada como capa de firme de mayor rigidez que una capa granular simple."),

  // tema-50 — cimentaciones y hormigón armado
  t("tema-50", "tipos-cimentaciones", "Cimentación superficial", "Cimentación que transmite las cargas del edificio al terreno a poca profundidad (zapatas, losas), frente a la profunda (pilotes)."),
  t("tema-50", "hormigon-armado-fabricas", "Recubrimiento de armadura", "Espesor de hormigón que protege las barras de acero frente a la corrosión y el fuego, exigido por la normativa estructural."),
  t("tema-50", "arquetas-contrarrestos-tuberias-abastecimiento", "Contrarresto", "Macizo de hormigón que ancla un codo o derivación de una tubería a presión, evitando su desplazamiento por el empuje del agua."),

  // tema-51 — tabiquería y revestimientos
  t("tema-51", "tabiqueria-particiones", "Partición", "Elemento constructivo interior no estructural que divide el espacio de un edificio en distintas estancias."),
  t("tema-51", "muros-fachadas-puntos-singulares", "Puente térmico", "Zona de la envolvente de un edificio con menor resistencia térmica que el resto, por donde se pierde más calor."),
  t("tema-51", "revestimientos-verticales-horizontales", "Enfoscado", "Revestimiento continuo de mortero aplicado directamente sobre la fábrica, como base previa a un acabado posterior o como acabado final."),

  // tema-52 — innovación de materiales
  t("tema-52", "sistemas-tabiqueria-seca", "Tabiquería seca", "Sistema constructivo de particiones (placas de yeso laminado sobre estructura metálica) que prescinde de agua y mortero en su ejecución."),
  t("tema-52", "piezas-altas-prestaciones", "Prestación", "Cualidad técnica exigible a un material (resistencia, aislamiento, reacción al fuego) certificada normalmente por marcado CE."),
  t("tema-52", "sistemas-innovadores-fachada", "Fachada ventilada", "Sistema de fachada con una cámara de aire entre el aislamiento y el revestimiento exterior, que mejora el comportamiento térmico e higrotérmico del muro."),

  // tema-53 — cubiertas
  t("tema-53", "cubiertas-planas-pendientes-capas", "Formación de pendientes", "Capa de una cubierta plana que da la inclinación necesaria para evacuar el agua hacia los desagües."),
  t("tema-53", "cubiertas-inclinadas-tejados", "Solape", "Superposición entre dos piezas de cubierta (tejas) consecutivas, necesaria para garantizar la estanqueidad frente al agua."),
  t("tema-53", "puntos-singulares-cubiertas", "Encuentro", "Punto singular de una cubierta donde se unen dos elementos distintos (paramento vertical, chimenea), crítico para la impermeabilidad."),

  // tema-54 — impermeabilizaciones y humedades
  t("tema-54", "humedad-capilaridad-muros", "Humedad de capilaridad", "Ascenso del agua del terreno por los poros de un material de construcción, por el fenómeno físico de la capilaridad."),
  t("tema-54", "impermeabilizacion-suelos-soleras", "Barrera antihumedad", "Capa impermeable colocada bajo una solera o en la base de un muro para impedir el paso de la humedad del terreno."),
  t("tema-54", "sistemas-impermeabilizacion-filtraciones-fugas", "Lámina asfáltica", "Material impermeabilizante flexible a base de betún, empleado en cubiertas y muros enterrados."),

  // tema-55 — pavimentación de vías urbanas
  t("tema-55", "pavimentos-acerado-materiales", "Base granular", "Capa de árido compactado situada bajo el pavimento de una acera o calzada, que reparte las cargas sobre el terreno."),
  t("tema-55", "bordillos-encintados", "Encintado", "Hilada de bordillos que delimita y confina el borde de una acera o zona ajardinada."),
  t("tema-55", "sumideros-alcorques-mobiliario", "Alcorque", "Hueco dejado en el pavimento urbano alrededor de la base de un árbol para permitir el riego y la aireación de sus raíces."),

  // tema-56 — organización del trabajo
  t("tema-56", "plan-obra-planificacion", "Diagrama de Gantt", "Representación gráfica de la planificación de una obra, con las tareas en el eje vertical y el tiempo en el horizontal."),
  t("tema-56", "organizacion-tajo-recursos", "Tajo", "Zona o frente de trabajo concreto de una obra donde se desarrolla una tarea determinada."),
  t("tema-56", "plan-calidad-patologias", "Patología constructiva", "Defecto o lesión que aparece en un edificio ya construido, con una causa técnica identificable."),

  // tema-57 — medios auxiliares
  t("tema-57", "andamios-plataformas-trabajo", "Andamio de fachada", "Estructura auxiliar tubular modular que se monta junto a una fachada para permitir trabajar en altura de forma segura."),
  t("tema-57", "escaleras-mano-caidas-altura", "Línea de vida", "Sistema de anclaje horizontal o vertical al que se conecta un arnés para prevenir caídas de altura."),
  t("tema-57", "espacios-confinados-izado-cargas", "Espacio confinado", "Recinto con aberturas limitadas de entrada/salida y ventilación natural desfavorable, no concebido para ocupación continua, con riesgo de atmósfera peligrosa."),

  // tema-58 — seguridad, amianto y señalización
  t("tema-58", "trabajos-amianto-pprl1602", "Fibra de amianto", "Fibra mineral que, al inhalarse, puede causar enfermedades respiratorias graves a largo plazo; su manipulación está estrictamente regulada."),
  t("tema-58", "senalizacion-seguridad-obras", "Señalización de seguridad", "Conjunto de señales (formas, colores) normalizadas por el RD 485/1997 que advierten de un riesgo o indican una obligación en el lugar de trabajo."),

  // tema-59 — inspección, patologías y libro del edificio
  t("tema-59", "inspeccion-previa-patologias-estructurales", "Fisura estructural", "Abertura en un elemento resistente que puede indicar un problema de estabilidad, distinta de una fisura superficial de acabado."),
  t("tema-59", "libro-edificio-mantenimiento", "Libro del Edificio", "Documento que recoge las instrucciones de uso y mantenimiento de un edificio, entregado a la propiedad tras la finalización de la obra."),

  // tema-60 — PRL específica, EPI y espacios confinados
  t("tema-60", "riesgos-especificos-albanil", "Sobreesfuerzo", "Lesión (habitualmente musculoesquelética) producida por el manejo manual de cargas o posturas forzadas propias del oficio."),
  t("tema-60", "epi-tipologia-caracteristicas", "Marcado CE de un EPI", "Certificación que acredita que un equipo de protección individual cumple los requisitos esenciales de seguridad exigidos por la normativa."),
];

console.log(`📚 Insertando ${TERMINOS.length} términos de glosario (Oficial Albañil)...`);
await insertBatch(TERMINOS);
console.log("✅ Glosario de Oficial Albañil sembrado.");

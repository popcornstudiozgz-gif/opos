/**
 * Glosario de la parte específica de Oficial Guardallaves (tema-187 a
 * tema-202). Selección curada (no exhaustiva) de términos técnicos que
 * puedan resultar complejos, ~2 por tema, con la misma `seccion` que
 * las flashcards/preguntas de cada tema para que el recorte por
 * `secciones_incluidas` funcione igual.
 *
 * Uso: node --env-file=.env.local scripts/seed-glosario-oficial-guardallaves.mjs
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
  // tema-187 — Red de abastecimiento de Zaragoza
  t("tema-187", "origen-potabilizacion-deposito-casablanca", "Potabilización", "Conjunto de tratamientos que hacen que un agua no apta para el consumo humano cumpla los criterios sanitarios exigidos para serlo."),
  t("tema-187", "subredes-ambitos-actuacion-arterias-principales", "Arteria (de una red de abastecimiento)", "Conducción de gran diámetro que transporta agua desde un depósito hacia la red de distribución, sin abastecer directamente a los abonados."),

  // tema-188 — Cartografía y SIG
  t("tema-188", "interpretacion-planos-redes-simbologia-escalas", "Perfil longitudinal", "Representación en corte del trazado de una tubería, mostrando su profundidad y sus pendientes."),
  t("tema-188", "sistema-informacion-geografica-idezar", "IDEZar", "Infraestructura de Datos Espaciales de Zaragoza, nodo local de la iniciativa europea INSPIRE."),

  // tema-189 — Corte y restitución del suministro
  t("tema-189", "teoria-tecnica-corte-restitucion-maniobra-valvulas", "Purga", "Operación de vaciado o expulsión de aire de un tramo de conducción, habitualmente a través de una ventosa o un desagüe."),
  t("tema-189", "causas-procedimiento-suspension-restablecimiento-omecgia", "Póliza de suministro", "Contrato que ampara el suministro de agua a un abonado concreto en un punto de consumo determinado."),

  // tema-190 — Conceptos fundamentales de hidráulica
  t("tema-190", "masa-volumen-densidad-peso-especifico", "Densidad", "Relación entre la masa de una sustancia y el volumen que ocupa."),
  t("tema-190", "caudal-velocidad-agua-conducciones", "Caudal", "Volumen de agua que atraviesa una sección de una conducción por unidad de tiempo."),

  // tema-191 — Presión, pérdida de carga, golpe de ariete
  t("tema-191", "presion-relacion-presion-altura", "Metro de columna de agua (m.c.a.)", "Unidad de presión equivalente a la presión ejercida en la base de una columna de agua de un metro de altura."),
  t("tema-191", "golpe-ariete-causas-prevencion", "Golpe de ariete", "Sobrepresión brusca que se produce en una conducción ante un cambio rápido de la velocidad del agua, típicamente por un cierre de válvula demasiado rápido."),

  // tema-192 — Estructura y materiales de las conducciones
  t("tema-192", "materiales-tradicionales-fundicion-hormigon-fibrocemento-acero", "Fundición dúctil", "Aleación de hierro con propiedades mecánicas y de ductilidad superiores a la fundición gris tradicional, normalizada por UNE-EN 545."),
  t("tema-192", "uniones-pruebas-red-conduccion-agua", "Prueba de presión", "Ensayo que somete una conducción recién instalada a una presión superior a la de servicio, para comprobar la ausencia de fugas antes de su puesta en carga."),

  // tema-193 — Válvulas
  t("tema-193", "valvulas-compuerta-cierre-elastico-metal", "Husillo", "Vástago roscado de una válvula de compuerta que transforma el giro del accionamiento en desplazamiento lineal de la compuerta."),
  t("tema-193", "valvulas-mariposa-reductoras-presion", "Válvula de mariposa de eje excéntrico", "Válvula de mariposa cuyo eje de giro está desplazado del centro geométrico del disco, reduciendo el rozamiento durante la maniobra."),

  // tema-194 — Hidrantes, desagües, ventosas
  t("tema-194", "hidrantes-une-en-14339", "Hidrante bajo tierra", "Hidrante contra incendios enterrado, protegido por una tapa a nivel de pavimento, normalizado por UNE-EN 14339."),
  t("tema-194", "ventosas-une-en-1074-4-desagues", "Ventosa", "Elemento de la red que purga el aire acumulado en los puntos altos de una conducción y admite aire cuando esta se vacía."),

  // tema-195 — Acometidas domiciliarias
  t("tema-195", "elementos-componentes-acometida-abastecimiento", "Llave de registro", "Llave situada en la arqueta exterior de una acometida, que corta el suministro y solo puede ser maniobrada por el personal municipal competente."),
  t("tema-195", "normativa-sanitaria-materiales-instalacion", "Acometida", "Tubería que enlaza la instalación interior de un inmueble, junto con su llave de paso, con la red de distribución municipal."),

  // tema-196 — Válvulas eléctricas y automatismo
  t("tema-196", "automatismo-contactor-elementos-mando-proteccion", "Contactor", "Interruptor accionado electromagnéticamente que conecta o desconecta un circuito de potencia desde un circuito de mando de menor potencia."),
  t("tema-196", "cuadro-maniobras-valvulas-motorizadas-montaje-ajuste", "Final de carrera", "Dispositivo que detecta que una válvula motorizada ha alcanzado su posición de apertura o cierre totales, deteniendo el motor en ese punto."),

  // tema-197 — Detección y localización de averías
  t("tema-197", "deteccion-indirecta-analisis-caudales-nocturnos", "Caudal mínimo nocturno", "Caudal registrado en las horas de menor consumo, cuya elevación anómala es indicio de una fuga en el sector."),
  t("tema-197", "metodo-acustico-localizacion-fugas", "Geófono", "Instrumento que capta y amplifica el sonido generado por el agua al escapar a presión, empleado para localizar fugas."),

  // tema-198 — Funcionamiento general de la red, sectorización
  t("tema-198", "escalones-presion-cotas-abastecimiento", "Zona (o escalón) de presión", "Área de la ciudad abastecida desde un mismo depósito, con un rango de presión relativamente homogéneo."),
  t("tema-198", "sectorizacion-telecontrol-omecgia", "Telecontrol", "Sistema de monitorización a distancia de la potabilizadora, los depósitos, los bombeos y los sectores de la red."),

  // tema-199 — Instalaciones de riego
  t("tema-199", "materiales-elementos-red-riego-une-en-12484", "Electroválvula", "Válvula accionada eléctricamente que abre o cierra el paso de agua hacia un sector de riego, gobernada por el programador."),
  t("tema-199", "limitaciones-volumen-horario-control-omecgia", "Xerojardinería", "Técnica de diseño y mantenimiento de jardines orientada a minimizar el consumo de agua de riego."),

  // tema-200 — Contadores de agua y caudalímetros
  t("tema-200", "obligatoriedad-titularidad-mantenimiento-contador", "Tanto alzado", "Modalidad transitoria de facturación del suministro sin contador, aplicable cuando no es posible su instalación."),
  t("tema-200", "metrologia-legal-rd-244-2016-caudalimetro", "Caudalímetro", "Instrumento que mide el caudal instantáneo o acumulado de agua, admitido como sistema de medida excepcional distinto del contador municipal."),

  // tema-201 — Cámaras, arquetas, nudo tipo, trampillos
  t("tema-201", "camaras-registros-definiciones-pprl-1601", "Cámara", "Alojamiento visitable con una cubierta de losas desmontables ('cobijas'), además de su tapa de registro."),
  t("tema-201", "tapas-une-en-124-nudo-tipo-trampillos", "Nudo tipo (para válvulas)", "Disposición normalizada de las válvulas de aislamiento en un cruce de conducciones."),

  // tema-202 — PRL en trabajos de guardallaves
  t("tema-202", "marco-normativo-clasificacion-espacios-confinados", "Espacio confinado", "Recinto con aberturas limitadas de entrada y salida y ventilación natural desfavorable, no concebido para la ocupación permanente de trabajadores."),
  t("tema-202", "autorizacion-trabajo-recurso-preventivo-equipos-medicion", "Recurso preventivo", "Trabajador designado que vigila desde el exterior el cumplimiento de las medidas preventivas durante un trabajo de especial riesgo."),
  t("tema-202", "tecnicas-rescate-camaras-actuacion-emergencia", "Trípode de rescate", "Dispositivo de anclaje exterior que, unido al arnés del trabajador, permite izarlo desde fuera de un espacio confinado en caso de emergencia."),
];

console.log(`📚 Insertando ${TERMINOS.length} términos de glosario de Oficial Guardallaves...`);
await insertar("glosario", TERMINOS);
console.log("✅ Glosario de Oficial Guardallaves sembrado.");

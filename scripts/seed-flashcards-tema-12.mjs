/**
 * Tema-12: Ley Reguladora de las Haciendas Locales (I) — tasas,
 * contribuciones especiales, impuestos municipales (obligatorios: IBI, IAE,
 * IVTM; potestativos: ICIO, IIVTNU) y precios públicos.
 * Los 5 impuestos municipales son artículos larguísimos (decenas de
 * bonificaciones, coeficientes y reglas de gestión muy volátiles); se
 * condensan a lo conceptual y estable: naturaleza, hecho imponible, sujeto
 * pasivo, base imponible, tipo de gravamen y devengo.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-12.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-12";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // Tasas (arts. 20-27 TRLRHL)
  c("tasas", "¿Por qué puede una entidad local establecer una tasa (art. 20.1)?", "Por la utilización privativa o aprovechamiento especial del dominio público local, o por la prestación de servicios/actividades administrativas que afecten de modo particular al sujeto pasivo"),
  c("tasas", "¿Cuándo no se considera voluntaria la solicitud de un servicio a efectos de tasas (art. 20.1.B.a)?", "Cuando venga impuesta por disposiciones legales/reglamentarias, o cuando el bien/servicio sea imprescindible para la vida privada o social del solicitante"),
  c("tasas", "¿Por qué servicios NO pueden las entidades locales exigir tasas (art. 21.1)?", "Abastecimiento de aguas en fuentes públicas, alumbrado de vías públicas, vigilancia pública, protección civil, limpieza de vía pública y enseñanza obligatoria"),
  c("tasas", "¿Son compatibles las tasas con las contribuciones especiales (art. 22)?", "Sí, las tasas por prestación de servicios no excluyen la exacción de contribuciones especiales por su establecimiento o ampliación"),
  c("tasas", "¿Quiénes son sujetos pasivos de las tasas (art. 23.1)?", "Quienes disfruten/utilicen/aprovechen especialmente el dominio público local, o quienes soliciten o resulten beneficiados por servicios/actividades locales"),
  c("tasas", "¿Qué límite tiene el importe de las tasas por prestación de servicios (art. 24.2)?", "No puede exceder, en su conjunto, del coste real o previsible del servicio o actividad"),
  c("tasas", "¿En qué puede consistir la cuota tributaria de una tasa (art. 24.3)?", "Una tarifa, una cantidad fija, o la aplicación conjunta de ambas"),
  c("tasas", "¿Cuándo se devenga una tasa (art. 26.1)?", "Cuando se inicie el uso privativo/aprovechamiento especial, o cuando se inicie la prestación del servicio o se presente la solicitud"),

  // Contribuciones especiales (arts. 28-37 TRLRHL)
  c("contribuciones-especiales", "¿Cuál es el hecho imponible de las contribuciones especiales (art. 28)?", "La obtención por el sujeto pasivo de un beneficio o aumento de valor de sus bienes como consecuencia de obras públicas o del establecimiento/ampliación de servicios públicos locales"),
  c("contribuciones-especiales", "¿A qué se pueden destinar las cantidades recaudadas por contribuciones especiales (art. 29.3)?", "Solo a sufragar los gastos de la obra o servicio por cuya razón se hubiesen exigido"),
  c("contribuciones-especiales", "¿Quiénes son sujetos pasivos de las contribuciones especiales (art. 30.1)?", "Las personas especialmente beneficiadas por las obras o el establecimiento/ampliación de los servicios locales"),
  c("contribuciones-especiales", "¿Cuál es el límite máximo de la base imponible de las contribuciones especiales (art. 31.1)?", "El 90% del coste que la entidad local soporte por la realización de las obras o el establecimiento/ampliación de los servicios"),
  c("contribuciones-especiales", "Cita los módulos generales de reparto de la cuota (art. 32.1.a)", "Metros lineales de fachada, superficie, volumen edificable y valor catastral a efectos del IBI"),
  c("contribuciones-especiales", "¿Cuándo se devengan las contribuciones especiales (art. 33.1)?", "En el momento en que las obras se hayan ejecutado o el servicio haya comenzado a prestarse"),
  c("contribuciones-especiales", "¿Qué acuerdos son necesarios para exigir contribuciones especiales (art. 34.1-2)?", "El acuerdo de imposición en cada caso concreto, y la aprobación de la ordenación concreta antes de ejecutar la obra"),
  c("contribuciones-especiales", "¿Qué es la asociación administrativa de contribuyentes (art. 36.1)?", "La constituida por propietarios afectados por las obras para promover su realización, comprometiéndose a sufragar la parte que corresponda a la entidad si su situación financiera no lo permitiera"),

  // Precios públicos (arts. 41-47 TRLRHL)
  c("precios-publicos", "¿Cuándo puede establecerse un precio público en vez de una tasa (art. 41)?", "Por la prestación de servicios o actividades de competencia local, siempre que no concurran las circunstancias del art. 20.1.B (no voluntariedad o no prestación por el sector privado)"),
  c("precios-publicos", "¿Qué importe mínimo debe cubrir un precio público (art. 44.1)?", "Como mínimo, el coste del servicio prestado o de la actividad realizada"),
  c("precios-publicos", "¿Puede fijarse un precio público por debajo del coste (art. 44.2)?", "Sí, por razones sociales, benéficas, culturales o de interés público, consignando en el presupuesto la dotación para cubrir la diferencia"),
  c("precios-publicos", "¿A quién corresponde el establecimiento o modificación de los precios públicos (art. 47.1)?", "Al Pleno de la Corporación, sin perjuicio de sus facultades de delegación"),

  // Impuestos municipales: enumeración (art. 59)
  c("impuestos-enumeracion", "¿Qué impuestos deben exigir obligatoriamente los ayuntamientos (art. 59.1)?", "IBI (Bienes Inmuebles), IAE (Actividades Económicas) e IVTM (Vehículos de Tracción Mecánica)"),
  c("impuestos-enumeracion", "¿Qué impuestos son potestativos para los ayuntamientos (art. 59.2)?", "ICIO (Construcciones, Instalaciones y Obras) e IIVTNU (Incremento de Valor de los Terrenos de Naturaleza Urbana, \"plusvalía municipal\")"),

  // IBI (arts. 60-77, condensado)
  c("ibi", "¿Qué naturaleza tiene el IBI (art. 60)?", "Tributo directo de carácter real que grava el valor de los bienes inmuebles"),
  c("ibi", "¿Cuál es el hecho imponible del IBI (art. 61.1)?", "La titularidad de una concesión administrativa, un derecho real de superficie, un derecho real de usufructo, o el derecho de propiedad sobre inmuebles"),
  c("ibi", "¿Quién es sujeto pasivo del IBI (art. 63.1)?", "Quien ostente la titularidad del derecho que en cada caso sea constitutivo del hecho imponible"),
  c("ibi", "¿Qué constituye la base imponible del IBI (art. 65)?", "El valor catastral de los bienes inmuebles"),
  c("ibi", "¿Cuál es el tipo de gravamen mínimo y máximo del IBI para bienes urbanos (art. 72.1)?", "Mínimo 0,4%, máximo 1,10%"),
  c("ibi", "¿Cuándo se devenga el IBI (art. 75.1-2)?", "El primer día del período impositivo, que coincide con el año natural"),
  c("ibi", "¿Qué inmuebles están exentos del IBI por defecto (art. 62.1)?", "Los del Estado/CCAA/entidades locales afectos a seguridad ciudadana, educación y prisiones; los bienes comunales; los de la Iglesia Católica; los de la Cruz Roja"),

  // IAE (arts. 78-91, condensado)
  c("iae", "¿Qué naturaleza tiene el IAE (art. 78.1)?", "Tributo directo de carácter real cuyo hecho imponible es el mero ejercicio de actividades empresariales, profesionales o artísticas en territorio nacional"),
  c("iae", "¿Quiénes están exentos del IAE por defecto (art. 82.1.c)?", "Las personas físicas, y las entidades con importe neto de cifra de negocios inferior a 1.000.000 de euros"),
  c("iae", "¿Quién es sujeto pasivo del IAE (art. 83)?", "Las personas físicas o jurídicas que realicen en territorio nacional las actividades que originan el hecho imponible"),
  c("iae", "¿Cómo se determina la cuota tributaria del IAE (art. 84)?", "Aplicando las tarifas del impuesto (aprobadas por real decreto legislativo), con los coeficientes y bonificaciones que correspondan"),
  c("iae", "¿Qué es el coeficiente de ponderación del IAE (art. 86)?", "Un coeficiente que se aplica a las cuotas en función del importe neto de la cifra de negocios del sujeto pasivo (entre 1,29 y 1,35)"),
  c("iae", "¿Cuándo se devenga el IAE (art. 89.1-2)?", "El primer día del período impositivo (año natural), siendo las cuotas irreducibles salvo en altas/bajas, en cuyo caso se prorratean por trimestres"),

  // IVTM (arts. 92-99, condensado)
  c("ivtm", "¿Qué grava el IVTM (art. 92.1)?", "La titularidad de vehículos de tracción mecánica aptos para circular por vías públicas, cualesquiera que sean su clase y categoría"),
  c("ivtm", "¿Quién es sujeto pasivo del IVTM (art. 94)?", "Quien conste como titular del vehículo en el permiso de circulación"),
  c("ivtm", "¿Qué criterio determina la cuota del IVTM (art. 95.1)?", "Un cuadro de tarifas según potencia y clase de vehículo (turismos, autobuses, camiones, tractores, remolques, motocicletas)"),
  c("ivtm", "¿Pueden los ayuntamientos incrementar las cuotas del IVTM (art. 95.4)?", "Sí, mediante un coeficiente que no puede ser superior a 2"),
  c("ivtm", "¿Qué ayuntamiento gestiona el IVTM (art. 97)?", "El del domicilio que conste en el permiso de circulación del vehículo"),

  // ICIO (arts. 100-103, condensado)
  c("icio", "¿Qué naturaleza tiene el ICIO (art. 100.1)?", "Tributo indirecto cuyo hecho imponible es la realización de cualquier construcción, instalación u obra para la que se exija licencia urbanística, se haya obtenido o no"),
  c("icio", "¿Quién es sujeto pasivo contribuyente del ICIO (art. 101.1)?", "Quien sea dueño de la construcción, instalación u obra (quien soporte los gastos), sea o no propietario del inmueble"),
  c("icio", "¿Qué constituye la base imponible del ICIO (art. 102.1)?", "El coste real y efectivo de la construcción, instalación u obra (coste de ejecución material, sin IVA ni honorarios profesionales)"),
  c("icio", "¿Cuál es el tipo de gravamen máximo del ICIO (art. 102.3)?", "4%"),
  c("icio", "¿Cuándo se devenga el ICIO (art. 102.4)?", "En el momento de iniciarse la construcción, instalación u obra, aunque no se haya obtenido la licencia"),

  // IIVTNU / Plusvalía municipal (arts. 104-110, condensado)
  c("iivtnu", "¿Qué grava el IIVTNU o \"plusvalía municipal\" (art. 104.1)?", "El incremento de valor de los terrenos urbanos que se ponga de manifiesto con la transmisión de su propiedad o de un derecho real de goce limitativo del dominio"),
  c("iivtnu", "¿Están sujetos los terrenos rústicos al IIVTNU (art. 104.2)?", "No, solo están sujetos los terrenos que tengan la consideración de urbanos a efectos del IBI"),
  c("iivtnu", "¿Qué establece el art. 104.5 sobre la inexistencia de incremento de valor?", "No se produce la sujeción al impuesto en las transmisiones donde se constate que no hubo incremento de valor real entre adquisición y transmisión"),
  c("iivtnu", "¿Quién es sujeto pasivo en las transmisiones a título oneroso (art. 106.1.b)?", "La persona que transmite el terreno o constituye/transmite el derecho real"),
  c("iivtnu", "¿Cómo se calcula la base imponible del IIVTNU (art. 107.1)?", "Multiplicando el valor catastral del terreno en el devengo por un coeficiente según el período de generación (máximo 20 años)"),
  c("iivtnu", "¿Cuál es el tipo de gravamen máximo del IIVTNU (art. 108.1)?", "30%"),
  c("iivtnu", "¿Cuándo se devenga el IIVTNU (art. 109.1)?", "En la fecha de la transmisión de la propiedad, o en la de constitución/transmisión del derecho real"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-12...`);
await insertBatch(CARDS);

const SECCIONES_AUX_ADMIN = ["tasas", "contribuciones-especiales", "precios-publicos", "impuestos-enumeracion", "ibi", "iae", "ivtm", "icio", "iivtnu"];
const patchTO = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-12&oposicion_slug=eq.auxiliar-administrativo`, {
  method: "PATCH", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
});
if (!patchTO.ok) { console.error(`❌ ${patchTO.status} ${await patchTO.text()}`); process.exit(1); }
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-12) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-12 completado.");

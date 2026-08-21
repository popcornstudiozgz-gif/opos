/**
 * Tema-10: Reglamento de Bienes de las Entidades Locales (RD 1372/1986).
 * Cobertura completa de los 5 capítulos del Título I + Título II (desahucio),
 * con densidad reducida en los artículos de checklist puramente burocrático
 * (campos exactos de cada epígrafe del inventario, arts. 20-28) que aportan
 * poco valor de estudio frente al esfuerzo de transcribirlos uno a uno.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-10.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-10";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // Cap. I: Concepto y clasificación (arts. 1-8)
  c("cap-1-clasificacion", "¿Qué constituye el patrimonio de las Entidades locales (art. 1.1)?", "El conjunto de bienes, derechos y acciones que les pertenezcan"),
  c("cap-1-clasificacion", "¿En qué se clasifican los bienes de las Entidades locales (art. 2.1)?", "Bienes de dominio público y bienes patrimoniales"),
  c("cap-1-clasificacion", "¿En qué se dividen los bienes de dominio público (art. 2.2)?", "De uso público y de servicio público"),
  c("cap-1-clasificacion", "¿Qué son los bienes comunales (art. 2.3-4)?", "Bienes de dominio público cuyo aprovechamiento corresponde al común de los vecinos; solo pueden pertenecer a Municipios y Entidades locales menores"),
  c("cap-1-clasificacion", "Cita ejemplos de bienes de uso público local (art. 3.1)", "Caminos, plazas, calles, paseos, parques, aguas de fuentes y estanques, puentes y demás obras de aprovechamiento general"),
  c("cap-1-clasificacion", "Cita ejemplos de bienes de servicio público (art. 4)", "Casas Consistoriales, mataderos, mercados, hospitales, museos, escuelas, cementerios, piscinas y campos de deporte"),
  c("cap-1-clasificacion", "¿Qué características tienen los bienes comunales y de dominio público (art. 5)?", "Son inalienables, inembargables e imprescriptibles y no sujetos a tributo alguno"),
  c("cap-1-clasificacion", "¿Qué son los bienes patrimoniales o de propios (art. 6.1)?", "Los que, siendo propiedad de la Entidad, no están destinados a uso ni servicio público y pueden ser fuente de ingresos"),
  c("cap-1-clasificacion", "¿Qué normas rigen los bienes patrimoniales (art. 6.2)?", "Su legislación específica y, en su defecto, las normas de Derecho privado"),
  c("cap-1-clasificacion", "¿Qué son las parcelas sobrantes (art. 7.2)?", "Porciones de terreno propiedad de las Entidades locales que por reducida extensión, forma irregular o emplazamiento no son susceptibles de uso adecuado"),
  c("cap-1-clasificacion", "¿Qué mayoría exige el expediente de alteración de la calificación jurídica de un bien (art. 8.2)?", "Mayoría absoluta del número legal de miembros de la Corporación, previa información pública de un mes"),
  c("cap-1-clasificacion", "¿En qué supuestos se produce la alteración de calificación automáticamente (art. 8.4)?", "Aprobación definitiva de planes de ordenación urbana; adscripción por más de 25 años a uso/servicio público; adquisición por usucapión"),

  // Cap. II: Patrimonio (arts. 9-16)
  c("cap-2-patrimonio", "¿Qué capacidad tienen las Entidades locales según el art. 9.1?", "Capacidad jurídica plena para adquirir y poseer bienes de todas clases y ejercitar acciones en defensa de su patrimonio"),
  c("cap-2-patrimonio", "Enumera los modos de adquisición de bienes del art. 10", "Atribución de la Ley; título oneroso (con o sin expropiación); herencia/legado/donación; prescripción; ocupación; cualquier otro modo legítimo"),
  c("cap-2-patrimonio", "¿Cuándo se exige informe pericial previo en adquisiciones onerosas de inmuebles (art. 11.1)?", "Cuando el importe exceda del 1% de los recursos ordinarios del presupuesto o del límite de contratación directa"),

  // Cap. III: Conservación y tutela — Sección 1ª Inventario (arts. 17-36, condensado)
  c("cap-3-conservacion", "¿Qué obligación tienen las Corporaciones locales respecto a sus bienes (art. 17.1)?", "Formar inventario de todos sus bienes y derechos, cualquiera que sea su naturaleza o forma de adquisición"),
  c("cap-3-conservacion", "Enumera los epígrafes del inventario según el art. 18", "Inmuebles; derechos reales; muebles históricos/artísticos; valores mobiliarios y créditos; vehículos; semovientes; otros muebles; bienes y derechos revertibles"),
  c("cap-3-conservacion", "¿Con qué periodicidad se rectifica el inventario (art. 33.1)?", "Anualmente, reflejando las vicisitudes de los bienes durante el ejercicio"),
  c("cap-3-conservacion", "¿Quién es competente para aprobar el inventario (art. 34)?", "El Pleno de la Corporación local"),
  c("cap-3-conservacion", "¿Están obligadas las Corporaciones a inscribir sus inmuebles en el Registro de la Propiedad (art. 36.1)?", "Sí, de acuerdo con la legislación hipotecaria"),

  // Cap. III, Sección 3ª: Prerrogativas (arts. 44-73) — el núcleo de "defensa" del temario
  c("cap-3-defensa", "Enumera las potestades de las Entidades locales respecto a sus bienes según el art. 44.1", "Potestad de investigación; potestad de deslinde; potestad de recuperación de oficio; potestad de desahucio administrativo"),
  c("cap-3-defensa", "¿Qué es la potestad de investigación (art. 45)?", "La facultad de investigar la situación de bienes y derechos que se presuman de propiedad de la Entidad, cuando no conste su titularidad"),
  c("cap-3-defensa", "¿Cómo puede acordarse el ejercicio de la acción investigadora (art. 46)?", "De oficio por la propia Corporación, o por denuncia de particulares"),
  c("cap-3-defensa", "¿Qué premio recibe quien promueve la acción investigadora (art. 54.1)?", "El 10% del valor líquido obtenido por la Corporación en la enajenación de los bienes investigados"),
  c("cap-3-defensa", "¿Qué es la potestad de deslinde (art. 56.1)?", "La facultad de promover y ejecutar el deslinde entre los bienes de la Entidad y los de particulares cuyos límites sean imprecisos"),
  c("cap-3-defensa", "¿Qué es el acuerdo resolutorio de deslinde (art. 65)?", "Es ejecutivo y solo puede impugnarse en vía contencioso-administrativa"),
  c("cap-3-defensa", "¿En qué plazo pueden las Corporaciones recobrar por sí mismas sus bienes de dominio público (art. 70.1-2)?", "En cualquier tiempo, para bienes de dominio público; en el plazo de 1 año desde la usurpación, para bienes patrimoniales"),
  c("cap-3-defensa", "¿Pueden las Corporaciones locales allanarse a demandas sobre su patrimonio (art. 73)?", "No, no podrán allanarse a las demandas judiciales que afecten al dominio y demás derechos reales de su patrimonio"),

  // Cap. IV: Disfrute y aprovechamiento (arts. 74-108, condensado) — biblioteca, no exigido por el temario
  c("cap-4-disfrute", "¿Qué es el uso común general de bienes de dominio público (art. 75.1.a)?", "El correspondiente por igual a todos los ciudadanos, sin circunstancias singulares, que se ejerce libremente sin licencia"),
  c("cap-4-disfrute", "¿Qué requiere el uso común especial normal (art. 77.1)?", "Sujeción a licencia, ajustada a la naturaleza del dominio y a los actos de afectación"),
  c("cap-4-disfrute", "¿Qué está sujeto a concesión administrativa (art. 78.1)?", "El uso privativo de bienes de dominio público y el uso anormal de los mismos"),
  c("cap-4-disfrute", "¿Cuál es el plazo máximo de las concesiones sobre dominio público (art. 79)?", "99 años, salvo que la normativa especial señale uno menor; nunca por tiempo indefinido"),
  c("cap-4-disfrute", "¿En qué régimen se efectúa el aprovechamiento de bienes comunales (art. 94.1)?", "Precisamente en régimen de explotación común o cultivo colectivo, salvo que sea impracticable"),
  c("cap-4-disfrute", "¿A quién corresponde el derecho a aprovechamiento de bienes comunales (art. 103.1)?", "A los vecinos, sin distinción de sexo, estado civil o edad; también a los extranjeros domiciliados en el término municipal"),

  // Cap. V: Enajenación (arts. 109-119, condensado) — biblioteca, no exigido por el temario
  c("cap-5-enajenacion", "¿Cuándo requieren autorización autonómica las enajenaciones de inmuebles patrimoniales (art. 109.1)?", "Cuando su valor exceda del 25% de los recursos ordinarios del presupuesto anual"),
  c("cap-5-enajenacion", "¿A quién pueden cederse gratuitamente los bienes inmuebles patrimoniales (art. 109.2)?", "A Entidades o Instituciones públicas, o a instituciones privadas de interés público sin ánimo de lucro"),
  c("cap-5-enajenacion", "¿Qué mayoría se exige para enajenaciones que superen el 10% de los recursos ordinarios (art. 114)?", "Voto favorable de la mayoría absoluta del número legal de miembros de la Corporación"),
  c("cap-5-enajenacion", "¿Es necesaria la subasta en permutas de bienes inmobiliarios (art. 112.2)?", "No, si la diferencia de valor entre los bienes permutados no supera el 40% del de mayor valor"),

  // Título II: Desahucio por vía administrativa (arts. 120-135, condensado) — biblioteca, no exigido por el temario
  c("titulo-2-desahucio", "¿Cómo se efectúa la extinción de derechos sobre bienes de dominio público o comunales (art. 120)?", "Por las Corporaciones, por vía administrativa, mediante el ejercicio de sus facultades coercitivas"),
  c("titulo-2-desahucio", "¿Qué carácter tienen la competencia y el procedimiento de desahucio (art. 122)?", "Carácter administrativo y sumario, con competencia exclusiva de las Corporaciones locales"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-10...`);
await insertBatch(CARDS);

const SECCIONES_AUX_ADMIN = ["cap-1-clasificacion", "cap-3-conservacion", "cap-3-defensa"];
const patchTO = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-10&oposicion_slug=eq.auxiliar-administrativo`, {
  method: "PATCH", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
});
if (!patchTO.ok) { console.error(`❌ ${patchTO.status} ${await patchTO.text()}`); process.exit(1); }
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-10) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-10 completado.");

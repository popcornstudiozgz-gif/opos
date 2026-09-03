/**
 * Crea tema-217: "La prevención de riesgos laborales en el Ayuntamiento
 * de Zaragoza y en el trabajo de Oficial de Planta Potabilizadora" —
 * Tema 21 (numero=21, bloque-2) de Oficial Planta Potabilizadora (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 19 oficial del Anexo I (bases2110.pdf, línea
 * 1257): "La prevención de riesgos laborales en el Ayuntamiento de
 * Zaragoza y en el trabajo de Oficial de Planta Potabilizadora.
 * Disposiciones mínimas de seguridad y salud en el trabajo."
 *
 * Fuentes primarias ya verificadas en el proyecto y reutilizadas aquí
 * por tratarse del mismo marco general de PRL aplicado en otras
 * oposiciones "Oficial X" (ver, p. ej., tema-186 de Oficial Mecánico):
 * Ley 31/1995 de Prevención de Riesgos Laborales, Ley 54/2003 de
 * reforma de ese marco normativo, RD 39/1997 (Reglamento de los
 * Servicios de Prevención) y RD 486/1997 (disposiciones mínimas de
 * seguridad y salud en los lugares de trabajo). Los riesgos específicos
 * del puesto de Oficial de Planta Potabilizadora (exposición a
 * productos químicos de tratamiento, atmósferas de proceso, ruido de
 * compresores y soplantes, riesgo eléctrico) se desarrollan aquí de
 * forma introductoria, con remisión al tema siguiente (tema-218) para
 * el desarrollo específico de alturas, espacios confinados, trabajos
 * eléctricos y productos químicos exigido de forma expresa por el
 * propio temario oficial.
 *
 * Tres secciones:
 * 1. marco-general-ley-31-1995-ayuntamiento-zaragoza
 * 2. disposiciones-minimas-seguridad-salud-trabajo
 * 3. riesgos-especificos-oficial-planta-potabilizadora
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-217-prl-general-planta-potabilizadora.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-217";
const OPOSICION = "oficial-planta-potabilizadora-ayto-zaragoza";
const BLOQUE_2_ID = "ca4ed0ad-ab08-4bc9-80b7-fb4e6941b64a";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, { method: "POST", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, { method: "POST", headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) => preguntas[i].opciones.map((texto, orden) => ({ pregunta_id: pregunta.id, texto, es_correcta: orden === preguntas[i].correcta, orden })));
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [{
  slug: TEMA,
  titulo: "La prevención de riesgos laborales en el Ayuntamiento de Zaragoza y en el trabajo de Oficial de Planta Potabilizadora",
  descripcion: "Marco general de la Ley 31/1995 aplicado al Ayuntamiento de Zaragoza. Disposiciones mínimas de seguridad y salud en el trabajo. Riesgos específicos del puesto de Oficial de Planta Potabilizadora.",
  contenido: "Desarrolla el marco general de la prevención de riesgos laborales aplicable al Ayuntamiento de Zaragoza y, dentro de él, al puesto de Oficial de Planta Potabilizadora: la Ley 31/1995 de Prevención de Riesgos Laborales y su reforma por la Ley 54/2003, el Reglamento de los Servicios de Prevención (RD 39/1997), las disposiciones mínimas de seguridad y salud en los lugares de trabajo (RD 486/1997), y una introducción a los riesgos específicos de este puesto (exposición a productos químicos de tratamiento, atmósferas de proceso, ruido de equipos rotativos y neumáticos, riesgo eléctrico), desarrollados con mayor detalle en el tema siguiente.",
  enlaces_boe: [
    "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292",
    "https://www.boe.es/buscar/act.php?id=BOE-A-1997-8669",
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292", titulo: "Marco general: Ley 31/1995 y su aplicación en el Ayuntamiento de Zaragoza", seccion: "marco-general-ley-31-1995-ayuntamiento-zaragoza", articulos: "Ley 31/1995; Ley 54/2003; RD 39/1997" },
    { url: "", titulo: "Disposiciones mínimas de seguridad y salud en el trabajo", seccion: "disposiciones-minimas-seguridad-salud-trabajo", articulos: "RD 486/1997" },
    { url: "", titulo: "Riesgos específicos del puesto de Oficial de Planta Potabilizadora", seccion: "riesgos-especificos-oficial-planta-potabilizadora", articulos: "Ley 31/1995; conocimiento técnico del puesto" },
  ],
}]);

const S1 = "marco-general-ley-31-1995-ayuntamiento-zaragoza";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué ley establece el marco general de la prevención de riesgos laborales en España, aplicable también al Ayuntamiento de Zaragoza como empleador público?", reverso: "La Ley 31/1995, de 8 de noviembre, de Prevención de Riesgos Laborales" },
  { anverso: "¿Qué modificación introdujo la Ley 54/2003 sobre el marco normativo original de la Ley 31/1995?", reverso: "Reformó aspectos relativos a la integración de la prevención en la gestión de la empresa, reforzó las obligaciones de coordinación de actividades empresariales, y consolidó la figura del recurso preventivo en actividades o procesos peligrosos" },
  { anverso: "¿Qué reglamento desarrolla las obligaciones organizativas de la Ley 31/1995 en materia de servicios de prevención?", reverso: "El Real Decreto 39/1997, Reglamento de los Servicios de Prevención" },
  { anverso: "¿Qué principios de la acción preventiva establece con carácter general la Ley 31/1995, aplicables también a un Oficial de Planta Potabilizadora?", reverso: "Evitar los riesgos, evaluar los que no puedan evitarse, combatirlos en su origen, adaptar el trabajo a la persona, tener en cuenta la evolución técnica, sustituir lo peligroso por lo que entrañe poco o ningún peligro, planificar la prevención, y anteponer la protección colectiva a la individual" },
  { anverso: "¿Qué derecho básico reconoce la Ley 31/1995 a cualquier trabajador, incluido un Oficial de Planta Potabilizadora, frente a los riesgos derivados de su trabajo?", reverso: "El derecho a una protección eficaz en materia de seguridad y salud en el trabajo, correlativo al deber del empresario (en este caso, el Ayuntamiento) de garantizar esa protección" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué ley establece el marco general de la prevención de riesgos laborales en España?", explicacion: "La Ley 31/1995, de Prevención de Riesgos Laborales.", dificultad: "facil", opciones: ["La Ley 31/1995, de Prevención de Riesgos Laborales", "El Real Decreto 140/2003, de calidad del agua de consumo", "La Ley de Haciendas Locales", "La Ley del Procedimiento Administrativo Común"], correcta: 0 },
  { enunciado: "¿Qué introdujo la Ley 54/2003 sobre el marco normativo de la Ley 31/1995?", explicacion: "Reforzó la integración de la prevención y consolidó la figura del recurso preventivo, entre otros aspectos.", dificultad: "media", opciones: ["Reforzó la integración de la prevención y el recurso preventivo", "Derogó por completo la Ley 31/1995 sustituyéndola íntegramente", "Reguló exclusivamente la calidad del agua de consumo humano", "Reguló exclusivamente la metrología legal de los contadores"], correcta: 0 },
  { enunciado: "¿Qué reglamento desarrolla las obligaciones organizativas de la Ley 31/1995 en materia de servicios de prevención?", explicacion: "El RD 39/1997.", dificultad: "media", opciones: ["El Real Decreto 39/1997", "El Real Decreto 486/1997", "El Real Decreto 773/1997", "El Real Decreto 1215/1997"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es un principio de la acción preventiva establecido por la Ley 31/1995?", explicacion: "Evitar los riesgos, entre otros principios generales.", dificultad: "media", opciones: ["Evitar los riesgos", "Trasladar siempre el riesgo al propio trabajador afectado", "Priorizar siempre la protección individual sobre la colectiva", "Ignorar la evolución técnica disponible en cada momento"], correcta: 0 },
  { enunciado: "¿Qué derecho básico reconoce la Ley 31/1995 a cualquier trabajador?", explicacion: "El derecho a una protección eficaz en materia de seguridad y salud en el trabajo.", dificultad: "facil", opciones: ["El derecho a una protección eficaz en seguridad y salud", "El derecho exclusivo a una retribución económica adicional", "El derecho exclusivo a una jornada laboral reducida", "El derecho exclusivo a elegir libremente su propio horario"], correcta: 0 },
]);

const S2 = "disposiciones-minimas-seguridad-salud-trabajo";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué Real Decreto establece las disposiciones mínimas de seguridad y salud en los lugares de trabajo?", reverso: "El Real Decreto 486/1997, de 14 de abril" },
  { anverso: "¿Qué aspectos generales de un lugar de trabajo, como las instalaciones de una planta potabilizadora, regula el RD 486/1997?", reverso: "Las condiciones constructivas y de seguridad (suelos, aberturas, vías de circulación, escaleras), la iluminación, la ventilación y temperatura, los servicios higiénicos, y las medidas de protección frente a caídas de altura o de objetos, entre otros aspectos" },
  { anverso: "¿Por qué es relevante el RD 486/1997 para las zonas de acceso restringido de una planta, como las plataformas sobre decantadores o filtros?", reverso: "Porque exige que las zonas donde la seguridad de los trabajadores pueda verse afectada por riesgos de caída, caída de objetos o contacto con elementos agresivos cuenten con las medidas de protección adecuadas, y que se impida, en la medida de lo posible, el acceso de personal no autorizado" },
  { anverso: "¿Qué exige con carácter general el RD 486/1997 respecto a las vías y salidas de emergencia de un lugar de trabajo?", reverso: "Que permanezcan expeditas y desemboquen lo más directamente posible al exterior o a una zona de seguridad, y que estén correctamente señalizadas conforme a la normativa de señalización de seguridad y salud" },
  { anverso: "¿Qué relación existe entre el RD 486/1997 y el RD 485/1997 sobre señalización, ambos aplicables a una planta potabilizadora?", reverso: "El RD 486/1997 establece las condiciones mínimas del propio lugar de trabajo, mientras que el RD 485/1997 regula específicamente la señalización de seguridad y salud que debe emplearse para advertir de los riesgos identificados en ese mismo lugar de trabajo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué Real Decreto establece las disposiciones mínimas de seguridad y salud en los lugares de trabajo?", explicacion: "El RD 486/1997.", dificultad: "facil", opciones: ["El Real Decreto 486/1997", "El Real Decreto 39/1997", "El Real Decreto 773/1997", "El Real Decreto 1215/1997"], correcta: 0 },
  { enunciado: "¿Qué aspectos generales regula el RD 486/1997 en un lugar de trabajo?", explicacion: "Condiciones constructivas, iluminación, ventilación, servicios higiénicos y protección frente a caídas.", dificultad: "media", opciones: ["Condiciones constructivas, iluminación y protección frente a caídas", "Exclusivamente la calidad sanitaria del agua tratada en la planta", "Exclusivamente la metrología legal de los contadores instalados", "Exclusivamente la eficiencia energética de los motores eléctricos"], correcta: 0 },
  { enunciado: "¿Por qué es relevante el RD 486/1997 para zonas como plataformas sobre decantadores o filtros?", explicacion: "Exige medidas de protección frente a caídas y limitar el acceso a personal no autorizado.", dificultad: "media", opciones: ["Exige protección frente a caídas y limitar el acceso no autorizado", "No tiene ninguna aplicación real en zonas de acceso restringido", "Prohíbe expresamente cualquier plataforma sobre decantadores", "Solo es aplicable a oficinas administrativas, no a zonas de proceso"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 486/1997 respecto a las vías y salidas de emergencia?", explicacion: "Que permanezcan expeditas y estén correctamente señalizadas.", dificultad: "media", opciones: ["Que permanezcan expeditas y estén correctamente señalizadas", "Que permanezcan cerradas salvo autorización expresa previa", "Que se ubiquen exclusivamente en la sala de control de la planta", "No existe ninguna exigencia real sobre vías de emergencia"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el RD 486/1997 y el RD 485/1997?", explicacion: "El 486/1997 regula el lugar de trabajo; el 485/1997, la señalización de sus riesgos.", dificultad: "dificil", opciones: ["El 486/1997 regula el lugar; el 485/1997, la señalización", "Ambos reales decretos regulan exactamente lo mismo", "El 485/1997 regula el lugar; el 486/1997, la señalización", "No existe ninguna relación real entre ambas normas"], correcta: 0 },
]);

const S3 = "riesgos-especificos-oficial-planta-potabilizadora";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cuáles son algunos de los riesgos específicos más característicos del puesto de Oficial de Planta Potabilizadora, más allá de los riesgos generales de cualquier lugar de trabajo?", reverso: "La exposición a productos químicos de tratamiento (hipoclorito sódico, sulfato de alúmina), el trabajo en atmósferas de proceso o en espacios confinados (depósitos, decantadores, arquetas), el ruido generado por compresores, soplantes y bombas, y el riesgo eléctrico asociado a motores y cuadros de la planta" },
  { anverso: "¿Qué riesgo higiénico está especialmente asociado al manejo del hipoclorito sódico en la etapa de desinfección?", reverso: "El riesgo de exposición química por contacto cutáneo, ocular o inhalación de vapores, especialmente en operaciones de trasiego o de sustitución de garrafas o depósitos de reactivo, que exige el uso de equipos de protección individual adecuados" },
  { anverso: "¿Qué riesgo específico presentan los espacios como los decantadores, depósitos o arquetas de la planta, más allá del riesgo de caída?", reverso: "El riesgo de tratarse de espacios confinados, con posible deficiencia de oxígeno o presencia de gases tóxicos o inflamables, exigiendo la aplicación de un procedimiento específico de trabajo en espacios confinados antes de acceder a ellos" },
  { anverso: "¿Qué riesgo higiénico está asociado al ruido generado por los compresores, soplantes y bombas de una planta potabilizadora?", reverso: "El riesgo de pérdida auditiva por exposición prolongada a niveles de ruido elevados, que exige la evaluación del nivel de exposición y, en su caso, el uso de protectores auditivos y la limitación del tiempo de exposición en las zonas más ruidosas" },
  { anverso: "¿Por qué se remite el desarrollo detallado de alturas, espacios confinados, trabajos eléctricos y productos químicos a un tema específico distinto de este?", reverso: "Porque el propio temario oficial de esta oposición (TEMA 20) dedica un apartado específico y más detallado a esos cuatro riesgos concretos, que por su gravedad potencial merecen un desarrollo normativo y procedimental propio, más allá de esta introducción general de riesgos del puesto" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuál de los siguientes es un riesgo específico característico del puesto de Oficial de Planta Potabilizadora?", explicacion: "La exposición a productos químicos de tratamiento, entre otros riesgos específicos.", dificultad: "facil", opciones: ["La exposición a productos químicos de tratamiento", "El riesgo exclusivo de tráfico rodado en vía pública", "El riesgo exclusivo derivado del trabajo administrativo de oficina", "El riesgo exclusivo derivado del uso de pantallas de visualización"], correcta: 0 },
  { enunciado: "¿Qué riesgo higiénico está especialmente asociado al manejo del hipoclorito sódico?", explicacion: "Exposición química por contacto cutáneo, ocular o inhalación de vapores.", dificultad: "media", opciones: ["Exposición química por contacto o inhalación de vapores", "Ningún riesgo real distinto del propio manejo de cualquier líquido", "Riesgo exclusivo de descarga eléctrica al manipular el reactivo", "Riesgo exclusivo de caída a distinto nivel al manipular el reactivo"], correcta: 0 },
  { enunciado: "¿Qué riesgo específico presentan los decantadores, depósitos o arquetas de la planta?", explicacion: "El riesgo de tratarse de espacios confinados, con posible deficiencia de oxígeno o gases.", dificultad: "media", opciones: ["El riesgo de tratarse de espacios confinados", "Ningún riesgo específico distinto del riesgo eléctrico general", "El riesgo exclusivo de exposición a radiación ultravioleta solar", "El riesgo exclusivo de sobreesfuerzo por manipulación de cargas"], correcta: 0 },
  { enunciado: "¿Qué riesgo higiénico está asociado al ruido de compresores, soplantes y bombas de la planta?", explicacion: "El riesgo de pérdida auditiva por exposición prolongada a ruido elevado.", dificultad: "media", opciones: ["El riesgo de pérdida auditiva por exposición prolongada", "Ningún riesgo real distinto del riesgo de vibración mecánica", "El riesgo exclusivo de intoxicación por inhalación de gases", "El riesgo exclusivo de caída a distinto nivel por el ruido"], correcta: 0 },
  { enunciado: "¿Por qué el desarrollo detallado de alturas, espacios confinados, electricidad y químicos se remite a otro tema?", explicacion: "El propio temario oficial dedica un apartado específico (TEMA 20) a esos riesgos concretos.", dificultad: "media", opciones: ["El temario oficial dedica un apartado específico a esos riesgos", "Esos riesgos no tienen ninguna relación real con este puesto", "No existe ningún otro tema que desarrolle esos riesgos concretos", "Esos riesgos ya han quedado completamente agotados en este tema"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 21 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 21, orden: 21, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-217 creado y vinculado como Tema 21 de Oficial Planta Potabilizadora.");

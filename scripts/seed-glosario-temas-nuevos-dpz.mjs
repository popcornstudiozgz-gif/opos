/**
 * Glosario de los 7 temas canónicos nuevos creados para la oposición de
 * la DPZ (tema-20, 21, 22, 24, 25, 26, 27), que se quedaron sin términos
 * al escribirlos. Mismo criterio que scripts/seed-glosario.mjs: selección
 * curada de conceptos que puedan resultar complejos, no cobertura
 * exhaustiva; misma `seccion` que ya usan las flashcards/preguntas de
 * cada tema, para que el recorte de cada oposición filtre el glosario
 * automáticamente sin tocar tema_oposicion.
 *
 * Uso: node --env-file=.env.local scripts/seed-glosario-temas-nuevos-dpz.mjs
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
  // ═══════════════ tema-21 — Derecho Administrativo: concepto y fuentes ═══
  t("tema-21", "concepto-fuentes", "Reserva de ley",
    "Exigencia constitucional o legal de que determinadas materias (derechos fundamentales, tributos...) solo puedan regularse mediante una norma con rango de ley, nunca por reglamento."),
  t("tema-21", "concepto-fuentes", "Inderogabilidad singular de los reglamentos",
    "Principio por el que ni siquiera un órgano de rango superior al que dictó un reglamento puede dejar de aplicarlo en un caso concreto mediante un acto singular."),
  t("tema-21", "concepto-fuentes", "Principios generales del Derecho",
    "Fuente del Derecho Administrativo con doble función: informadora (inspiran la interpretación del ordenamiento) y supletoria (se aplican en defecto de ley o costumbre)."),
  t("tema-21", "concepto-fuentes", "Jerarquía normativa",
    "Principio del art. 9.3 CE que ordena la prelación de fuentes (Constitución > ley > reglamento), de modo que la norma inferior nunca puede contradecir a la superior."),
  t("tema-21", "concepto-fuentes", "Sometimiento pleno a la ley y al Derecho",
    "Fórmula del art. 103.1 CE: la Administración no solo está sujeta a la ley formal, sino al ordenamiento jurídico en su conjunto (Constitución, principios generales, jurisprudencia consolidada...)."),

  // ═══════════════ tema-22 — Régimen local español y de Aragón ═════════════
  t("tema-22", "regimen-local-general", "Autonomía local",
    "Garantía institucional (arts. 137 y 140-141 CE) por la que municipios, provincias e islas gestionan con independencia los intereses propios de su comunidad, sin subordinación jerárquica a otra Administración."),
  t("tema-22", "regimen-local-general", "Competencias propias",
    "Competencias que solo pueden ser atribuidas a una Entidad Local por ley, y que esta ejerce en régimen de autonomía y bajo su propia responsabilidad (frente a las delegadas, ejercidas por cuenta de quien delega)."),
  t("tema-22", "regimen-local-general", "Potestad de autoorganización",
    "Facultad de una Entidad Local para configurar su propia estructura interna de órganos y servicios, dentro del marco legal."),
  t("tema-22", "administracion-local-aragon", "Comunidad de villa y tierra",
    "Figura histórica aragonesa de agrupación de municipios, reconocida como entidad local propia por la Ley 7/1999, de Administración Local de Aragón."),
  t("tema-22", "administracion-local-aragon", "Entidad metropolitana de Zaragoza",
    "Entidad local propia de la Comunidad Autónoma de Aragón, reconocida por la Ley 7/1999, para la gestión conjunta de servicios de ámbito metropolitano en torno a la capital."),

  // ═══════════════ tema-20 — La provincia y el municipio ═══════════════════
  t("tema-20", "municipio-organizacion", "Junta de Gobierno Local",
    "Órgano municipal integrado por el Alcalde y un número de Concejales no superior a un tercio del legal, de libre nombramiento y cese por aquel; obligatoria en municipios de más de 5.000 habitantes."),
  t("tema-20", "municipio-organizacion", "Concejo abierto",
    "Régimen municipal excepcional (normalmente en municipios muy pequeños) en el que el gobierno y la administración corresponden directamente a una Asamblea vecinal, no a un Ayuntamiento con Alcalde y Concejales."),
  t("tema-20", "municipio-competencias", "Servicios mínimos obligatorios",
    "Catálogo de servicios que todo municipio debe prestar en todo caso (alumbrado, cementerio, recogida de residuos...), ampliado según tramos de población (art. 26 LBRL)."),
  t("tema-20", "provincia-organizacion", "Junta de Gobierno (provincial)",
    "Órgano de la Diputación integrado por el Presidente y un número de Diputados no superior a un tercio del legal, equivalente a la Junta de Gobierno Local en el ámbito municipal."),
  t("tema-20", "provincia-competencias", "Plan provincial de cooperación",
    "Instrumento que aprueba anualmente la Diputación para cooperar con las obras y servicios de competencia municipal, elaborado con participación de los municipios de la provincia."),

  // ═══════════════ tema-24 — Las subvenciones ══════════════════════════════
  t("tema-24", "ley-general-subvenciones", "Subvención",
    "Disposición dineraria entregada sin contraprestación directa, sujeta al cumplimiento de un objetivo o actividad determinados, y dirigida al fomento de una finalidad de utilidad pública o interés social."),
  t("tema-24", "ley-general-subvenciones", "Entidad colaboradora",
    "Entidad que, actuando en nombre del órgano concedente, entrega y distribuye los fondos de una subvención a los beneficiarios (o colabora en su gestión), sin que esos fondos pasen a integrar su propio patrimonio."),
  t("tema-24", "ley-general-subvenciones", "Bases reguladoras",
    "Norma (orden ministerial, u ordenanza en el caso de las entidades locales) que fija los requisitos, procedimiento, criterios de otorgamiento y demás condiciones de una línea de subvenciones."),
  t("tema-24", "ley-general-subvenciones", "Concurrencia competitiva",
    "Procedimiento ordinario de concesión de subvenciones, basado en comparar las solicitudes presentadas conforme a los criterios de valoración de las bases reguladoras, frente a la concesión directa (excepcional)."),
  t("tema-24", "ley-general-subvenciones", "Reintegro",
    "Devolución de las cantidades percibidas como subvención, con el interés de demora correspondiente, cuando concurre alguna de las causas legales (falseamiento, incumplimiento, falta de justificación...)."),

  // ═══════════════ tema-26 — Transparencia, datos e igualdad ═══════════════
  t("tema-26", "transparencia-acceso-informacion", "Publicidad activa",
    "Obligación de los sujetos públicos de publicar de forma periódica y actualizada, por propia iniciativa (sin que nadie la solicite), la información relevante sobre su actividad."),
  t("tema-26", "transparencia-acceso-informacion", "Derecho de acceso a la información pública",
    "Derecho de cualquier persona, sin necesidad de motivar su solicitud, a acceder a los contenidos o documentos en poder de un sujeto obligado por la Ley de Transparencia, con los límites tasados que esta prevé."),
  t("tema-26", "proteccion-datos-principios", "Categorías especiales de datos",
    "Datos que revelan ideología, afiliación sindical, religión, orientación sexual, salud u origen racial o étnico; su tratamiento está sujeto a garantías reforzadas frente al resto de datos personales."),
  t("tema-26", "proteccion-datos-principios", "Deber de confidencialidad",
    "Obligación de reserva que alcanza a responsables, encargados y a cualquier persona que intervenga en el tratamiento de datos personales, y que se mantiene incluso tras finalizar su relación con el responsable."),
  t("tema-26", "igualdad-oportunidades-aragon", "Transversalidad de género",
    "Principio de actuación de los poderes públicos aragoneses por el que la perspectiva de igualdad entre mujeres y hombres se incorpora al diseño, ejecución y evaluación de todas las políticas públicas, no solo a las específicas de igualdad."),

  // ═══════════════ tema-27 — La Administración electrónica ═════════════════
  t("tema-27", "administracion-electronica", "Documento electrónico administrativo",
    "Documento emitido por una Administración Pública en soporte electrónico que cumple los requisitos del art. 26 de la Ley 39/2015 (información identificable, referencia temporal, metadatos, firma electrónica)."),
  t("tema-27", "administracion-electronica", "Copia auténtica",
    "Copia de un documento, cualquiera que sea su soporte, expedida por un órgano competente que garantiza la identidad del órgano que la realiza y de su contenido, con la misma validez que el documento original."),
  t("tema-27", "administracion-electronica", "Digitalización",
    "Proceso tecnológico que convierte un documento en papel u otro soporte no electrónico en un fichero electrónico con la imagen codificada, fiel e íntegra del documento original."),
  t("tema-27", "administracion-electronica", "Expediente administrativo electrónico",
    "Conjunto ordenado de documentos y actuaciones que sirven de antecedente a una resolución administrativa, conformado en formato electrónico mediante agregación ordenada e índice numerado."),

  // ═══════════════ tema-25 — Prevención de Riesgos Laborales ═══════════════
  t("tema-25", "prevencion-riesgos-laborales", "Prevención",
    "Conjunto de actividades o medidas adoptadas en todas las fases de la actividad para evitar o disminuir los riesgos derivados del trabajo, antes de que el daño se produzca."),
  t("tema-25", "prevencion-riesgos-laborales", "Riesgo laboral grave e inminente",
    "Riesgo que, con probabilidad racional, puede materializarse en un futuro inmediato y suponer un daño grave para la salud del trabajador."),
  t("tema-25", "prevencion-riesgos-laborales", "Principios de la acción preventiva",
    "Jerarquía de actuación que debe seguir el empresario (o la Administración empleadora): evitar el riesgo, evaluar el que no se pueda evitar, combatirlo en su origen, y solo en último término proteger individualmente al trabajador."),
];

console.log(`📚 Insertando ${TERMINOS.length} términos de glosario (7 temas nuevos)...`);
await insertBatch(TERMINOS);
console.log("✅ Glosario completado.");

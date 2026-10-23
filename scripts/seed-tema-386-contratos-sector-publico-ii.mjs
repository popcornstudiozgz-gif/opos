/**
 * Crea tema-386 — Tema 14 de Administrativo DGA (tema 9 del programa de
 * materias específicas): "Los Contratos del Sector Publico (II):
 * Preparación de los contratos. La selección del contratista. Adjudicación
 * de los contratos. Procedimientos de contratación. Efectos, cumplimiento y
 * extinción de los contratos administrativos. Revisión de precios."
 *
 * Fuente (texto consolidado leído en esta sesión en la API del BOE):
 * - Ley 9/2017, de Contratos del Sector Público (BOE-A-2017-12902): arts.
 *   44 y 50 (recurso especial), 103-104 (revisión de precios), 116-124
 *   (expediente, contratos menores, urgencia, emergencia y pliegos), 131,
 *   135-136, 140, 145-146, 149-151 y 153 (adjudicación y formalización),
 *   156-160, 166-168, 172 y 177 (procedimientos), 188-198 y 210-213
 *   (efectos, penalidades, demora, pago, cumplimiento y resolución).
 * - En Aragón, el recurso especial lo resuelve el Tribunal Administrativo
 *   de Contratos Públicos de Aragón (art. 118 de la Ley 11/2023,
 *   BOE-A-2023-10876, ya leída para el tema-385).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-386-contratos-sector-publico-ii.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const LCSP = "https://www.boe.es/buscar/act.php?id=BOE-A-2017-12902";
const L11 = "https://www.boe.es/buscar/act.php?id=BOE-A-2023-10876";
const S1 = "preparacion-expediente-pliegos";
const S2 = "seleccion-adjudicacion-formalizacion";
const S3 = "procedimientos-contratacion";
const S4 = "efectos-cumplimiento-contratos";
const S5 = "extincion-resolucion-contratos";
const S6 = "revision-precios";

await sembrarTema({
  tema: {
    slug: "tema-386",
    titulo: "Contratos del Sector Público (II): preparación, selección del contratista, adjudicación, procedimientos, efectos, cumplimiento, extinción y revisión de precios",
    descripcion: "Preparación: expediente de contratación, contratos menores, tramitación urgente y de emergencia, pliegos de cláusulas administrativas y de prescripciones técnicas. Selección del contratista y adjudicación: anuncio, plazos, declaración responsable (DEUC), criterios de adjudicación y mejor relación calidad-precio, ofertas anormalmente bajas, clasificación de ofertas, adjudicación, notificación, formalización y recurso especial. Procedimientos: abierto, abierto simplificado y abreviado, restringido, con negociación (con y sin publicidad), diálogo competitivo y asociación para la innovación. Efectos y prerrogativas, penalidades, demora, daños a terceros y pago. Cumplimiento y recepción, plazo de garantía, causas y efectos de la resolución. Revisión de precios.",
    contenido: "Cómo se prepara y adjudica un contrato público paso a paso: qué documentos lleva el expediente, cuándo basta un contrato menor (menos de 15.000 € en servicios o 40.000 € en obras), qué procedimiento elegir según el importe, cómo se valoran las ofertas y qué pasa con una oferta sospechosamente barata, cuándo se firma el contrato y cómo se puede recurrir. Después, la vida del contrato: penalidades por retraso, plazo de pago de treinta días, recepción, plazo de garantía, motivos para resolverlo y cuándo pueden revisarse los precios.",
    enlaces_boe: [
      { url: LCSP, titulo: "Ley 9/2017, de 8 de noviembre, de Contratos del Sector Público (BOE-A-2017-12902)" },
      { url: L11, titulo: "Ley 11/2023, de uso estratégico de la contratación pública de Aragón, art. 118 (BOE-A-2023-10876)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Expediente de contratación, contratos menores, urgencia, emergencia y pliegos", articulos: "arts. 116-124 LCSP", url: `${LCSP}#a1-28` },
      { seccion: S2, titulo: "Selección del contratista, adjudicación, formalización y recurso especial", articulos: "arts. 44, 50, 131-153 LCSP", url: `${LCSP}#a1-43` },
      { seccion: S3, titulo: "Procedimientos de adjudicación", articulos: "arts. 156-177 LCSP", url: `${LCSP}#a1-68` },
      { seccion: S4, titulo: "Efectos y cumplimiento de los contratos administrativos", articulos: "arts. 188-198 y 210 LCSP", url: `${LCSP}#a1-100` },
      { seccion: S5, titulo: "Extinción: causas y efectos de la resolución", articulos: "arts. 211-213 LCSP", url: `${LCSP}#a2-23` },
      { seccion: S6, titulo: "Revisión de precios", articulos: "arts. 103-104 LCSP", url: `${LCSP}#a1-15` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloqueDerecho, numero: 14 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Inicio del expediente (art. 116.1 LCSP)", "Lo inicia el órgano de contratación motivando la necesidad del contrato, y se publica en el perfil de contratante"],
        ["Contenido del expediente (art. 116.3 LCSP)", "Pliego de cláusulas administrativas particulares, pliego de prescripciones técnicas, certificado de existencia de crédito y fiscalización previa, en su caso"],
        ["Aprobación del expediente (art. 117 LCSP)", "Resolución motivada que abre el procedimiento de adjudicación e implica la aprobación del gasto; se publica en el perfil de contratante"],
        ["Contratos menores (art. 118.1 LCSP)", "Valor estimado inferior a 40.000 € en obras o a 15.000 € en suministros y servicios"],
        ["Expediente del contrato menor (art. 118.2-4 LCSP)", "Informe que justifica la necesidad y que no se altera el objeto para eludir umbrales, aprobación del gasto y factura; en obras, presupuesto"],
        ["Adjudicación del contrato menor (art. 131.3 LCSP)", "Directamente a cualquier empresario con capacidad de obrar y habilitación profesional"],
        ["Tramitación urgente (art. 119 LCSP)", "Necesidad inaplazable o interés público; preferencia en el despacho (informes en 5 días) y plazos de licitación, adjudicación y formalización reducidos a la mitad, con excepciones"],
        ["Tramitación de emergencia (art. 120 LCSP)", "Acontecimientos catastróficos, grave peligro o defensa nacional: se ordena ejecutar lo necesario sin expediente ni crédito previo; la ejecución debe empezar en un mes"],
        ["Pliegos de cláusulas administrativas particulares (art. 122 LCSP)", "Se aprueban antes o con la autorización del gasto y antes de la licitación; contienen criterios de solvencia y adjudicación y derechos y obligaciones; solo se modifican por error material"],
        ["Pliego de prescripciones técnicas (art. 124 LCSP)", "Define las calidades y condiciones sociales y ambientales de la prestación; mismas reglas de aprobación y modificación"],
        ["Pliegos generales en Aragón (art. 121.2 LCSP)", "Las CCAA pueden aprobar pliegos de cláusulas administrativas generales previo dictamen de su órgano consultivo"],
      ],
      preguntas: [
        ["facil", "Es contrato menor un contrato de servicios de valor estimado inferior a:", ["15.000 euros", "40.000 euros", "60.000 euros", "5.000 euros"], "Art. 118.1 LCSP."],
        ["facil", "Es contrato menor un contrato de obras de valor estimado inferior a:", ["40.000 euros", "15.000 euros", "80.000 euros", "100.000 euros"], "Art. 118.1 LCSP."],
        ["media", "En el expediente de un contrato menor se exige, entre otros documentos:", ["Un informe que justifique la necesidad y que no se altera el objeto para eludir los umbrales", "El pliego de cláusulas administrativas particulares", "La clasificación del contratista", "La garantía definitiva"], "Art. 118.2 LCSP."],
        ["media", "La resolución que aprueba el expediente de contratación:", ["Dispone la apertura del procedimiento de adjudicación e implica la aprobación del gasto", "Adjudica el contrato", "Formaliza el contrato", "Aprueba la recepción"], "Art. 117.1 LCSP."],
        ["media", "En la tramitación urgente, los plazos de licitación, adjudicación y formalización:", ["Se reducen a la mitad, salvo excepciones", "Se reducen a un tercio", "No cambian", "Se suprimen"], "Art. 119.2.b) LCSP."],
        ["dificil", "En la tramitación de emergencia, el plazo de inicio de la ejecución no puede superar:", ["Un mes desde el acuerdo", "Quince días", "Tres meses", "Seis meses"], "Art. 120.1.c) LCSP."],
        ["media", "Una vez aprobado, el pliego de cláusulas administrativas particulares solo puede modificarse:", ["Por error material, de hecho o aritmético; si no, hay que retrotraer actuaciones", "Libremente hasta la adjudicación", "Por acuerdo de la mesa", "A petición de un licitador"], "Art. 122.1 LCSP."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Procedimientos ordinarios (art. 131.2 LCSP)", "Abierto o restringido, con pluralidad de criterios basados en la mejor relación calidad-precio"],
        ["Anuncio de licitación (art. 135 LCSP)", "En el perfil de contratante (salvo negociado sin publicidad); en armonizados, además en el DOUE"],
        ["Declaración responsable (art. 140 LCSP)", "Las proposiciones van acompañadas de una declaración ajustada al Documento Europeo Único de Contratación (DEUC) sobre capacidad, solvencia y ausencia de prohibiciones"],
        ["Criterios de adjudicación (art. 145 LCSP)", "Pluralidad de criterios con mejor relación calidad-precio (económicos y cualitativos, incluidos sociales y ambientales); o coste-eficacia (precio o ciclo de vida), previa justificación"],
        ["Criterio único (art. 146.1 LCSP)", "Si solo hay uno, debe estar relacionado con los costes: el precio o el coste del ciclo de vida"],
        ["Comité de expertos (art. 146.2.a LCSP)", "Si los criterios de juicio de valor pesan más que los automáticos, los valora un comité de al menos tres expertos no adscritos al órgano proponente"],
        ["Ofertas anormalmente bajas (art. 149 LCSP)", "Solo pueden excluirse tras un procedimiento contradictorio con el licitador; los pliegos fijan los parámetros de anormalidad"],
        ["Clasificación y adjudicación (art. 150 LCSP)", "La mesa clasifica por orden decreciente y propone; si el único criterio es el precio, la mejor oferta es la más barata"],
        ["Notificación de la adjudicación (art. 151 LCSP)", "Resolución motivada notificada a candidatos y licitadores y publicada en el perfil de contratante en 15 días"],
        ["Formalización (art. 153 LCSP)", "En documento administrativo; si cabe recurso especial, no antes de 15 días hábiles desde la notificación; en otro caso, no más tarde de 15 días hábiles"],
        ["Recurso especial (art. 44 LCSP)", "Contra pliegos, actos de trámite cualificados, adjudicación, modificaciones y otros, en obras de más de 3.000.000 €, suministros y servicios de más de 100.000 € y concesiones de más de 3.000.000 €"],
        ["Plazo del recurso especial (art. 50 LCSP)", "15 días hábiles; en Aragón lo resuelve el Tribunal Administrativo de Contratos Públicos de Aragón"],
      ],
      preguntas: [
        ["media", "Con carácter ordinario, la adjudicación se realizará:", ["Utilizando una pluralidad de criterios basados en la mejor relación calidad-precio", "Siempre al precio más bajo", "Por sorteo", "Por libre elección del órgano de contratación"], "Arts. 131.2 y 145.1 LCSP."],
        ["media", "Cuando se utiliza un único criterio de adjudicación, este debe:", ["Estar relacionado con los costes (precio o coste del ciclo de vida)", "Ser un criterio de calidad", "Ser la experiencia de la empresa", "Ser un criterio social"], "Art. 146.1 LCSP."],
        ["media", "Una oferta incursa en presunción de anormalidad:", ["Solo puede excluirse tras dar al licitador la posibilidad de justificarla", "Se excluye automáticamente", "Se adjudica siempre", "Se remite al Tribunal de Cuentas"], "Art. 149 LCSP."],
        ["media", "La resolución de adjudicación debe publicarse en el perfil de contratante en el plazo de:", ["Quince días", "Un mes", "Diez días hábiles", "Tres días"], "Art. 151.1 LCSP."],
        ["dificil", "Si el contrato es susceptible de recurso especial, la formalización no puede hacerse antes de:", ["Quince días hábiles desde la remisión de la notificación de la adjudicación", "Cinco días naturales", "Un mes", "Dos meses"], "Art. 153.3 LCSP."],
        ["media", "Es susceptible de recurso especial un contrato de servicios del Gobierno de Aragón de valor estimado superior a:", ["100.000 euros", "15.000 euros", "216.000 euros", "3.000.000 euros"], "Art. 44.1.a) LCSP."],
        ["media", "El plazo para interponer el recurso especial en materia de contratación es de:", ["Quince días hábiles", "Un mes", "Dos meses", "Diez días naturales"], "Art. 50.1 LCSP."],
        ["media", "Las proposiciones en el procedimiento abierto deben acompañarse de:", ["Una declaración responsable ajustada al DEUC", "Toda la documentación original de solvencia", "La garantía definitiva", "Un informe de la Intervención"], "Art. 140.1.a) LCSP."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Procedimiento abierto (art. 156 LCSP)", "Todo empresario interesado puede presentar proposición; no hay negociación; en armonizados, plazo mínimo de 35 días (obras, suministros y servicios) o 30 (concesiones)"],
        ["Apertura y adjudicación en el abierto (arts. 157-158 LCSP)", "Apertura en máximo 20 días tras el fin del plazo; adjudicación en 15 días si el único criterio es el precio o en 2 meses si hay varios"],
        ["Abierto simplificado (art. 159.1 LCSP)", "Obras de hasta 2.000.000 € y suministros y servicios por debajo del umbral armonizado de la AGE, con juicios de valor que no superen el 25 % (45 % en prestaciones intelectuales)"],
        ["Plazos del simplificado (art. 159.3 LCSP)", "Anuncio solo en el perfil de contratante; mínimo 15 días para proposiciones (20 en obras)"],
        ["Simplificado abreviado (art. 159.6 LCSP)", "Obras de menos de 80.000 € y suministros y servicios de menos de 60.000 € (no intelectuales): 10 días hábiles (5 en compras corrientes), sin acreditar solvencia y solo criterios automáticos"],
        ["Procedimiento restringido (art. 160 LCSP)", "Cualquiera solicita participar, pero solo ofertan los seleccionados por su solvencia; sin negociación; adecuado para servicios intelectuales complejos"],
        ["Procedimientos con negociación (art. 166 LCSP)", "Se adjudica tras negociar las condiciones con uno o varios candidatos; el pliego fija los aspectos negociables"],
        ["Licitación con negociación (art. 167 LCSP)", "Prestaciones que requieren adaptación o diseño, soluciones innovadoras, complejidad, especificaciones imprecisas u ofertas previas irregulares o inaceptables"],
        ["Negociado sin publicidad (art. 168 LCSP)", "Casos tasados: ninguna oferta o ninguna adecuada en un abierto o restringido, empresario único (arte, exclusividad, razones técnicas), contratos secretos y otros"],
        ["Diálogo competitivo (art. 172 LCSP)", "Una mesa especial dialoga con los candidatos para desarrollar soluciones que servirán de base para sus ofertas"],
        ["Asociación para la innovación (art. 177 LCSP)", "Desarrollo de productos, servicios u obras innovadores no disponibles en el mercado y su compra posterior"],
      ],
      preguntas: [
        ["media", "En el procedimiento abierto:", ["Todo empresario interesado puede presentar proposición y no cabe negociación", "Solo ofertan los invitados", "Se negocian los términos con todos", "No se publica anuncio"], "Art. 156.1 LCSP."],
        ["media", "En el procedimiento restringido:", ["Solo pueden presentar proposición los empresarios seleccionados por el órgano de contratación", "Todos los interesados presentan proposición", "Se negocia con los candidatos", "No hay anuncio de licitación"], "Art. 160 LCSP."],
        ["dificil", "Puede utilizarse el procedimiento abierto simplificado en contratos de obras de valor estimado igual o inferior a:", ["2.000.000 euros", "5.404.000 euros", "500.000 euros", "80.000 euros"], "Art. 159.1.a) LCSP."],
        ["media", "En el abierto simplificado abreviado, el plazo mínimo para presentar proposiciones es de:", ["Diez días hábiles (cinco en compras corrientes)", "Quince días naturales", "Treinta y cinco días", "Un mes"], "Art. 159.6.a) LCSP."],
        ["media", "Cuando el único criterio es el precio, en el procedimiento abierto la adjudicación debe recaer en el plazo máximo de:", ["Quince días desde la apertura de proposiciones", "Dos meses", "Un mes", "Diez días hábiles"], "Art. 158.1 LCSP."],
        ["media", "Puede usarse el negociado sin publicidad cuando:", ["En un procedimiento abierto no se ha presentado ninguna oferta adecuada, sin modificar sustancialmente las condiciones", "El órgano de contratación lo prefiera", "El contrato sea superior a 5.404.000 euros", "Haya prisa"], "Art. 168.a).1.º LCSP."],
        ["media", "El procedimiento cuyo fin es desarrollar productos innovadores y comprarlos después es:", ["La asociación para la innovación", "El diálogo competitivo", "El restringido", "El abierto simplificado"], "Art. 177 LCSP."],
        ["media", "La apertura de las proposiciones en el procedimiento abierto debe hacerse en el plazo máximo de:", ["Veinte días desde la finalización del plazo de presentación", "Diez días", "Un mes", "Dos meses"], "Art. 157.3 LCSP."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Régimen de los efectos (art. 188 LCSP)", "Los efectos de los contratos administrativos se rigen por la LCSP y por los pliegos generales y particulares"],
        ["Principio de vinculación (art. 189 LCSP)", "Los contratos deben cumplirse a tenor de sus cláusulas, sin perjuicio de las prerrogativas de la Administración"],
        ["Prerrogativas (art. 190 LCSP)", "Interpretar, resolver dudas, modificar por interés público, declarar la responsabilidad del contratista, suspender, resolver y determinar sus efectos, e inspeccionar"],
        ["Penalidades por cumplimiento defectuoso (art. 192 LCSP)", "Previstas en los pliegos, proporcionales; cada una hasta el 10 % del precio sin IVA y en total hasta el 50 %"],
        ["Demora (art. 193 LCSP)", "La mora no requiere intimación previa; penalidad diaria de 0,60 € por cada 1.000 € del precio sin IVA, salvo otras en el pliego; cada 5 % acumulado puede resolverse"],
        ["Retraso no imputable (art. 195.2 LCSP)", "Si el contratista ofrece cumplir, se le amplía el plazo al menos en el tiempo perdido"],
        ["Daños a terceros (art. 196 LCSP)", "Los indemniza el contratista, salvo que deriven directamente de una orden de la Administración o de vicios del proyecto; los terceros pueden pedir en un año que se diga a quién corresponde"],
        ["Pago del precio (art. 198.4 LCSP)", "En los 30 días siguientes a la aprobación de certificaciones o documentos de conformidad; si no, intereses de demora e indemnización por costes de cobro"],
        ["Cumplimiento (art. 210.1-2 LCSP)", "Cuando se ha realizado toda la prestación a satisfacción de la Administración; requiere acto formal de recepción o conformidad en el mes siguiente a la entrega"],
        ["Plazo de garantía (art. 210.3 LCSP)", "Se fija desde la recepción; transcurrido sin objeciones, se extingue la responsabilidad del contratista"],
        ["Liquidación (art. 210.4 LCSP)", "Salvo en obras, en 30 días desde la recepción se acuerda y notifica la liquidación y se abona el saldo"],
      ],
      preguntas: [
        ["media", "Si el contratista incurre en demora por causa imputable a él, la penalidad diaria general es de:", ["0,60 euros por cada 1.000 euros del precio, IVA excluido", "1 euro por cada 100 euros", "El 10 % del precio por día", "0,20 euros por cada 1.000 euros"], "Art. 193.3 LCSP."],
        ["media", "La constitución en mora del contratista:", ["No precisa intimación previa de la Administración", "Requiere un requerimiento notarial", "Requiere sentencia", "Requiere dictamen del Consejo Consultivo"], "Art. 193.2 LCSP."],
        ["media", "Cada penalidad por cumplimiento defectuoso no puede superar:", ["El 10 % del precio del contrato, IVA excluido", "El 50 % del precio", "El 5 % del precio", "El 20 % del precio"], "Art. 192.1 LCSP."],
        ["media", "La Administración debe abonar el precio dentro de los:", ["Treinta días siguientes a la aprobación de las certificaciones o documentos de conformidad", "Sesenta días desde la factura", "Noventa días", "Quince días"], "Art. 198.4 LCSP."],
        ["dificil", "Los daños causados a terceros como consecuencia inmediata y directa de una orden de la Administración:", ["Son responsabilidad de la Administración", "Los paga siempre el contratista", "Los paga el responsable del contrato", "No se indemnizan"], "Art. 196.2 LCSP."],
        ["media", "La recepción o conformidad de la prestación debe hacerse, salvo otro plazo en el pliego:", ["Dentro del mes siguiente a la entrega o realización", "En el plazo de garantía", "En quince días", "En seis meses"], "Art. 210.2 LCSP."],
        ["media", "¿Cuál de estas es una prerrogativa del órgano de contratación?", ["Interpretar el contrato y resolver las dudas de su cumplimiento", "Cambiar libremente el precio", "Renunciar a la garantía sin causa", "Ceder el contrato a otra empresa sin procedimiento"], "Art. 190 LCSP."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Causas de resolución (art. 211.1 LCSP)", "Muerte o extinción del contratista, concurso o insolvencia, mutuo acuerdo, demora del contratista, demora en el pago de la Administración, incumplimiento de la obligación principal o esenciales, imposibilidad de ejecutar, entre otras"],
        ["Retraso sobre el plan de trabajos (art. 211.1.d LCSP)", "Es causa de resolución el retraso injustificado superior a un tercio del plazo de duración inicial, incluidas prórrogas"],
        ["Demora en el pago (art. 211.1.e y 198.6 LCSP)", "El contratista puede resolver si la Administración se demora en el pago más de seis meses"],
        ["Quién acuerda la resolución (art. 212.1 LCSP)", "El órgano de contratación, de oficio o a instancia del contratista"],
        ["Resolución por demora (art. 195.1 LCSP)", "Solo requiere audiencia del contratista y, si se opone, dictamen del Consejo de Estado u órgano consultivo autonómico"],
        ["Mutuo acuerdo (art. 212.4 LCSP)", "Solo si no concurre otra causa imputable al contratista y el interés público hace innecesaria o inconveniente su continuación"],
        ["Efectos del incumplimiento culpable (art. 213.3 LCSP)", "Incautación de la garantía e indemnización de daños y perjuicios en lo que exceda de ella"],
        ["Imposibilidad de ejecutar (art. 213.4 LCSP)", "El contratista tiene derecho a una indemnización del 3 % de la prestación dejada de realizar, salvo causa imputable a él o rechazo de la modificación"],
        ["Incumplimiento de la Administración (art. 213.2 LCSP)", "Determina el pago de los daños y perjuicios causados al contratista"],
      ],
      preguntas: [
        ["media", "Si el contrato se resuelve por incumplimiento culpable del contratista:", ["Se incauta la garantía y debe indemnizar los daños que excedan de ella", "Se le devuelve la garantía", "Se le paga una indemnización del 3 %", "Se prorroga el contrato"], "Art. 213.3 LCSP."],
        ["media", "La resolución por mutuo acuerdo solo es posible cuando:", ["No concurra otra causa imputable al contratista y el interés público lo aconseje", "Lo pida el contratista", "Haya demora en el pago", "Lo decida la mesa de contratación"], "Art. 212.4 LCSP."],
        ["dificil", "Si el contrato se resuelve por imposibilidad de ejecutarlo en los términos pactados (art. 211.1.g), sin culpa del contratista, este tiene derecho a una indemnización del:", ["3 % del importe de la prestación dejada de realizar", "6 %", "10 %", "No tiene derecho a nada"], "Art. 213.4 LCSP."],
        ["media", "El retraso injustificado sobre el plan de trabajos es causa de resolución si supera:", ["Un tercio del plazo de duración inicial, incluidas prórrogas", "La mitad del plazo", "Un mes", "El 5 % del precio"], "Art. 211.1.d) LCSP."],
        ["media", "La resolución por demora del contratista, si este se opone, requiere dictamen de:", ["El Consejo de Estado u órgano consultivo equivalente de la Comunidad Autónoma", "El Tribunal Administrativo de Contratos", "La Cámara de Cuentas", "La Junta de Contratación Pública"], "Art. 195.1 LCSP; en Aragón, el Consejo Consultivo."],
        ["media", "El contratista puede instar la resolución por demora de la Administración en el pago cuando esta supera:", ["Seis meses", "Tres meses", "Treinta días", "Un año"], "Arts. 29.2 y 198.6 LCSP."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Revisión periódica y predeterminada (art. 103.1 LCSP)", "Es la única revisión de precios admitida, salvo en ciertos contratos no armonizados del art. 19.2"],
        ["Contratos revisables (art. 103.2 LCSP)", "Obras, suministros de fabricación de armamento y equipamiento, suministro de energía y aquellos con período de recuperación de la inversión de cinco años o más"],
        ["Costes no revisables (art. 103.2 LCSP)", "Amortizaciones, costes financieros, gastos generales o de estructura y beneficio industrial"],
        ["Desindexación (art. 103.2 LCSP)", "La revisión se hace conforme al Real Decreto de desarrollo de la Ley 2/2015 de desindexación de la economía española"],
        ["Concepto de precio (art. 103.1 LCSP)", "Cualquier retribución o contraprestación económica del contrato, pagada por la Administración o por los usuarios"],
        ["Revisión y demora del contratista (art. 104 LCSP)", "Se aplican los índices de las fechas en que debió ejecutarse, salvo que los del período real den un coeficiente inferior"],
      ],
      preguntas: [
        ["media", "Según la LCSP, los precios de los contratos solo pueden revisarse:", ["De forma periódica y predeterminada en los términos legales", "Libremente cada año", "Cuando lo pida el contratista", "Nunca"], "Art. 103.1 LCSP."],
        ["media", "¿En cuál de estos contratos cabe la revisión periódica y predeterminada de precios?", ["Un contrato de obras", "Un contrato menor de servicios de limpieza de un año", "Un suministro de material de oficina de seis meses", "Un contrato de servicios de seis meses"], "Art. 103.2 LCSP."],
        ["dificil", "¿Cuál de estos costes NO es revisable en ningún caso?", ["El beneficio industrial", "Los materiales", "La energía", "Los costes de mano de obra en contratos de obras"], "Art. 103.2 LCSP."],
        ["media", "Si el contratista está en mora, para revisar los precios se aplican:", ["Los índices de las fechas previstas en el contrato, salvo que los del período real den un coeficiente inferior", "Siempre los del período real", "Los más altos", "Ninguno: se suspende la revisión"], "Art. 104 LCSP."],
        ["media", "A efectos de la revisión, se considera precio:", ["Cualquier retribución o contraprestación del contrato, pagada por la Administración o por los usuarios", "Solo lo pagado por la Administración", "Solo el IVA", "Solo el beneficio"], "Art. 103.1 LCSP."],
      ],
    },
  ],
  glosario: [
    [S1, "Expediente de contratación", "Conjunto de documentos (necesidad, pliegos, crédito, fiscalización) que prepara un contrato antes de licitarlo."],
    [S1, "Pliego de cláusulas administrativas particulares", "Documento que fija las reglas jurídicas y económicas de un contrato: solvencia, criterios de adjudicación, derechos y obligaciones."],
    [S1, "Contrato menor", "Contrato de poca cuantía (menos de 15.000 € en servicios y suministros o de 40.000 € en obras) que puede adjudicarse directamente."],
    [S2, "DEUC", "Documento Europeo Único de Contratación: declaración responsable normalizada con la que el licitador afirma reunir los requisitos para contratar."],
    [S2, "Oferta anormalmente baja", "Oferta tan barata que hace dudar de que pueda cumplirse; solo se excluye tras pedir justificación al licitador."],
    [S2, "Formalización", "Firma del documento administrativo del contrato, que lo perfecciona."],
    [S3, "Procedimiento abierto", "Procedimiento en el que cualquier empresa interesada puede presentar oferta, sin negociación."],
    [S3, "Procedimiento negociado sin publicidad", "Procedimiento excepcional, sin anuncio, en el que se negocia con una o varias empresas en los casos tasados por la ley."],
    [S4, "Penalidad", "Cantidad que la Administración descuenta al contratista por cumplir mal o tarde, según el pliego o la ley."],
    [S4, "Recepción", "Acto formal por el que la Administración comprueba y da por buena la prestación realizada."],
    [S5, "Incautación de la garantía", "Pérdida de la garantía definitiva a favor de la Administración cuando el contrato se resuelve por culpa del contratista."],
    [S6, "Revisión de precios", "Actualización del precio del contrato mediante fórmulas o índices predeterminados en los supuestos legales."],
  ],
  casos: [
    {
      slug: "pequenos-encargos-contratos-menores",
      titulo: "Pequeños encargos en un servicio provincial",
      supuesto: "Un servicio provincial del Gobierno de Aragón necesita reparar la cubierta de un almacén (presupuesto de 32.000 euros sin IVA), contratar un curso de formación (9.000 euros sin IVA) y comprar sillas de oficina (18.000 euros sin IVA). Un funcionario propone partir la compra de sillas en dos pedidos de 9.000 euros.",
      preguntas: [
        [S1, "media", "La reparación de la cubierta por 32.000 euros es:", ["Un contrato menor de obras", "Un contrato de obras que requiere procedimiento abierto", "Un contrato de servicios", "Un suministro"], "Art. 118.1 LCSP: obras por debajo de 40.000 €."],
        [S1, "media", "El curso de formación por 9.000 euros es:", ["Un contrato menor de servicios", "Un contrato menor de obras", "Un contrato excluido", "Un contrato que exige procedimiento restringido"], "Art. 118.1 LCSP."],
        [S1, "media", "La compra de sillas por 18.000 euros:", ["No puede tramitarse como contrato menor porque supera 15.000 euros", "Es contrato menor", "Es contrato menor de obras", "Está excluida de la LCSP"], "Art. 118.1 LCSP."],
        [S1, "dificil", "Partir la compra de sillas en dos pedidos para quedar por debajo del límite:", ["Supone un fraccionamiento prohibido para eludir los umbrales", "Es correcto si son proveedores distintos", "Es obligatorio", "Solo requiere el visto bueno del jefe de servicio"], "Arts. 99.2 y 118.2 LCSP."],
        [S1, "media", "En el contrato menor de obras de la cubierta, el expediente debe incluir además:", ["El presupuesto de las obras (y proyecto si lo exigen las normas)", "La clasificación del contratista", "El pliego de prescripciones técnicas obligatorio", "La garantía definitiva"], "Art. 118.4 LCSP."],
        [S1, "media", "Si la reparación afecta a la estabilidad o seguridad de la obra, deberá pedirse:", ["Informe de la oficina o unidad de supervisión", "Dictamen del Consejo Consultivo", "Autorización del Gobierno", "Informe del Justicia"], "Art. 118.4 LCSP."],
        [S2, "media", "Los contratos menores pueden adjudicarse:", ["Directamente a cualquier empresario con capacidad de obrar y habilitación profesional", "Solo por sorteo", "Solo mediante procedimiento abierto", "Solo a empresas clasificadas"], "Art. 131.3 LCSP."],
        [S3, "media", "Para comprar las sillas (18.000 euros, suministro corriente) podría usarse:", ["El procedimiento abierto simplificado abreviado, con 5 días hábiles para ofertar", "El negociado sin publicidad por cuantía", "El diálogo competitivo", "La tramitación de emergencia"], "Art. 159.6 LCSP: suministros de menos de 60.000 €."],
        [S3, "media", "En ese procedimiento abreviado, los licitadores:", ["Quedan eximidos de acreditar la solvencia", "Deben estar clasificados", "Deben aportar garantía provisional", "Deben negociar el precio"], "Art. 159.6.b) LCSP."],
        [S1, "media", "En todos los contratos menores se requerirá, en todo caso:", ["La aprobación del gasto y la factura correspondiente", "La formalización en escritura pública", "La publicación en el DOUE", "La mesa de contratación"], "Art. 118.3 LCSP."],
      ],
    },
    {
      slug: "licitacion-abierta-mantenimiento",
      titulo: "Una licitación abierta con varios criterios",
      supuesto: "El Gobierno de Aragón licita por procedimiento abierto el mantenimiento de sus equipos de climatización, con dos criterios: precio (60 puntos) y calidad técnica (40 puntos, juicio de valor). Una empresa presenta una oferta un 40 % más barata que la media. Tras adjudicar, otra licitadora quiere recurrir.",
      preguntas: [
        [S2, "media", "Como hay varios criterios, los licitadores presentarán:", ["Dos sobres: uno con lo valorable por juicio de valor y otro con lo valorable por fórmulas", "Un único sobre", "Tres sobres obligatoriamente", "Ningún sobre, solo un correo"], "Art. 157.2 LCSP."],
        [S2, "media", "Como el juicio de valor pesa menos que los criterios automáticos, ¿es obligatorio el comité de expertos del art. 146?", ["No; la valoración la hace la mesa o los servicios del órgano", "Sí, siempre", "Solo si lo pide un licitador", "Solo en Aragón"], "Art. 146.2 LCSP."],
        [S2, "media", "La oferta un 40 % más barata, si los pliegos la sitúan como anormal:", ["Solo podrá excluirse tras pedir justificación a la empresa", "Se excluye directamente", "Se adjudica sin más", "Se remite a la policía"], "Art. 149 LCSP."],
        [S2, "media", "En Aragón, la justificación de la oferta anormalmente baja se pide en el plazo máximo de:", ["Cinco días", "Diez días", "Un mes", "Quince días hábiles"], "Art. 91.3.d) Ley 11/2023."],
        [S3, "media", "Al haber varios criterios, la adjudicación debe producirse en el plazo máximo de:", ["Dos meses desde la apertura, salvo otro plazo en el pliego", "Quince días", "Seis meses", "Un año"], "Art. 158.2 LCSP."],
        [S2, "media", "La resolución de adjudicación debe:", ["Ser motivada, notificarse a candidatos y licitadores y publicarse en el perfil en 15 días", "Publicarse solo en el BOA", "Notificarse solo al adjudicatario", "Publicarse a los seis meses"], "Art. 151.1 LCSP."],
        [S2, "dificil", "Si el contrato supera 100.000 euros de valor estimado, la licitadora descontenta puede interponer:", ["Recurso especial en materia de contratación en 15 días hábiles", "Recurso de alzada en un mes", "Reclamación económico-administrativa", "Recurso de casación"], "Arts. 44 y 50 LCSP."],
        [S2, "media", "Ese recurso especial lo resolverá:", ["El Tribunal Administrativo de Contratos Públicos de Aragón", "La propia mesa", "El Tribunal de Cuentas", "El Justicia de Aragón"], "Art. 118 Ley 11/2023."],
        [S2, "media", "Mientras puede interponerse el recurso especial, el contrato:", ["No puede formalizarse antes de 15 días hábiles desde la notificación", "Puede formalizarse al día siguiente", "Debe formalizarse en escritura pública", "Se ejecuta sin formalizar"], "Art. 153.3 LCSP."],
        [S2, "media", "El adjudicatario deberá constituir, antes de la adjudicación, la garantía definitiva del:", ["5 % del precio final ofertado sin IVA", "3 % del presupuesto", "10 % del valor estimado", "1 % del precio"], "Arts. 107 y 150 LCSP."],
      ],
    },
    {
      slug: "obra-retrasada-penalidades",
      titulo: "Una obra que se retrasa",
      supuesto: "Una empresa ejecuta para el Gobierno de Aragón la reforma de un colegio por 400.000 euros sin IVA, con un plazo de seis meses. Por causas imputables a ella, acumula un retraso de 30 días. La Administración, por su parte, tardó 45 días en pagar una certificación. Al final, la empresa termina la obra.",
      preguntas: [
        [S4, "media", "Para considerar a la empresa en mora, la Administración:", ["No necesita intimación previa", "Debe requerirla notarialmente", "Debe pedir permiso al juez", "Debe esperar al final del contrato"], "Art. 193.2 LCSP."],
        [S4, "dificil", "Con la penalidad general de 0,60 euros por cada 1.000 euros, la penalidad diaria es de:", ["240 euros", "24 euros", "2.400 euros", "600 euros"], "Art. 193.3 LCSP: 400.000 / 1.000 × 0,60 = 240 € al día."],
        [S4, "media", "Tras 30 días de retraso, la penalidad acumulada es de:", ["7.200 euros", "720 euros", "12.000 euros", "24.000 euros"], "240 € × 30 días."],
        [S4, "media", "Cada vez que las penalidades por demora alcancen un múltiplo del ____ del precio, la Administración puede resolver o continuar:", ["5 %", "10 %", "20 %", "50 %"], "Art. 193.4 LCSP."],
        [S5, "media", "Si se optara por resolver por demora y la empresa se opusiera, haría falta dictamen de:", ["El Consejo Consultivo de Aragón", "El Tribunal Administrativo de Contratos", "La Junta de Contratación Pública", "Las Cortes de Aragón"], "Art. 195.1 LCSP."],
        [S4, "media", "La Administración debía pagar la certificación en el plazo de:", ["Treinta días desde su aprobación", "Sesenta días", "Noventa días", "Diez días"], "Art. 198.4 LCSP."],
        [S4, "media", "Por el retraso de 45 días en el pago, la empresa tiene derecho a:", ["Intereses de demora e indemnización por costes de cobro desde el día 31", "Resolver el contrato", "Suspender la obra indefinidamente", "Nada"], "Art. 198.4 LCSP."],
        [S4, "media", "Terminada la obra, la Administración debe:", ["Realizar un acto formal y positivo de recepción", "Pagar sin más trámites", "Devolver la garantía de inmediato", "Pedir una nueva licitación"], "Art. 210.2 LCSP."],
        [S4, "media", "Desde la recepción empieza a correr:", ["El plazo de garantía", "El plazo de prescripción de la penalidad", "El plazo del recurso especial", "La revisión de precios"], "Art. 210.3 LCSP."],
        [S6, "media", "Al ser un contrato de obras, ¿podría haberse previsto una revisión de precios?", ["Sí, los contratos de obras admiten la revisión periódica y predeterminada", "No, nunca", "Solo si dura más de diez años", "Solo si lo pide la empresa al final"], "Art. 103.2 LCSP."],
      ],
    },
  ],
});

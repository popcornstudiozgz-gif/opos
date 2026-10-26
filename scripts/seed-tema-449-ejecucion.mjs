/**
 * Crea tema-449 — Tema 27 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (XIX): ejecución."
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título IV, Capítulo VII, arts. 97 a
 * 105, texto consolidado leído íntegro (content-raw/ley-39-2015-
 * procedimiento-administrativo; consolidado del BOE actualizado a
 * 06-11-2024, sin cambios posteriores).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-449-ejecucion.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "titulo-ejecutoriedad";
const S2 = "ejecucion-forzosa-medios";
const S3 = "multa-coercitiva-compulsion";

await sembrarTema({
  tema: {
    slug: "tema-449",
    titulo: "La ejecución de los actos administrativos",
    descripcion: "Ley 39/2015, Título IV, Capítulo VII (arts. 97 a 105): título de la ejecución y notificación previa; ejecutoriedad inmediata y sus excepciones (suspensión, sanciones recurribles en vía administrativa, disposición en contrario, aprobación superior); pago electrónico de las obligaciones con la Hacienda pública; ejecución forzosa previo apercibimiento; medios (apremio sobre el patrimonio, ejecución subsidiaria, multa coercitiva y compulsión sobre las personas), proporcionalidad y elección del menos restrictivo; entrada en domicilio con consentimiento o autorización judicial; prohibición de acciones posesorias.",
    contenido: "Cómo se hacen cumplir los actos administrativos. La Administración no puede ejecutar materialmente nada que limite derechos sin una resolución previa que lo ampare, y debe notificarla. Los actos son inmediatamente ejecutivos, salvo suspensión, sanciones aún recurribles en vía administrativa, disposición en contrario o necesidad de aprobación superior. Si el obligado no cumple, la Administración puede, previo apercibimiento, ejecutar forzosamente con cuatro medios, eligiendo el menos restrictivo: apremio sobre el patrimonio (cantidades de dinero), ejecución subsidiaria (lo hace otro a costa del obligado), multa coercitiva (reiterada, si una ley la autoriza) y compulsión sobre las personas. Para entrar en un domicilio hace falta consentimiento o autorización judicial.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Título y ejecutoriedad", articulos: "arts. 97 y 98", url: `${L}#a97` },
      { seccion: S2, titulo: "Ejecución forzosa, apremio y ejecución subsidiaria", articulos: "arts. 99 a 102", url: `${L}#a99` },
      { seccion: S3, titulo: "Multa coercitiva, compulsión y acciones posesorias", articulos: "arts. 103 a 105", url: `${L}#a103` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 27 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Título de la ejecución (art. 97.1)", "No se inicia ninguna actuación material de ejecución que limite derechos sin una resolución previa que le sirva de fundamento jurídico"],
        ["Notificación previa a la ejecución material (art. 97.2)", "El órgano que la ordena debe notificar al particular la resolución que la autoriza"],
        ["Ejecutoriedad (art. 98.1)", "Los actos sujetos al Derecho Administrativo son inmediatamente ejecutivos"],
        ["Excepciones a la ejecutoriedad inmediata (art. 98.1)", "a) suspensión de la ejecución; b) resolución sancionadora contra la que quepa recurso en vía administrativa, incluido el de reposición; c) disposición en contrario; d) necesidad de aprobación o autorización superior"],
        ["Pago de sanciones y deudas con la Hacienda pública (art. 98.2)", "Preferentemente por medios electrónicos: tarjeta de crédito o débito, transferencia, domiciliación u otros autorizados"],
      ],
      preguntas: [
        ["facil", "Los actos de las Administraciones Públicas sujetos al Derecho Administrativo son, como regla general:", ["Inmediatamente ejecutivos", "Ejecutivos solo cuando son firmes", "Ejecutivos tras la confirmación judicial"], "Art. 98.1 Ley 39/2015."],
        ["media", "No es inmediatamente ejecutiva la resolución sancionadora contra la que quepa:", ["Algún recurso en vía administrativa, incluido el potestativo de reposición", "Únicamente recurso contencioso-administrativo", "Recurso de amparo"], "Art. 98.1.b) Ley 39/2015."],
        ["media", "Antes de iniciar una actuación material de ejecución que limite derechos de los particulares, debe:", ["Haberse adoptado la resolución que le sirva de fundamento jurídico", "Obtenerse autorización judicial siempre", "Publicarse un anuncio en el BOE"], "Art. 97.1 Ley 39/2015."],
        ["media", "El pago de una multa nacida de una resolución administrativa se efectuará preferentemente por:", ["Medios electrónicos como tarjeta, transferencia o domiciliación", "Efectivo en ventanilla", "Cheque nominativo"], "Art. 98.2 Ley 39/2015."],
        ["dificil", "No es inmediatamente ejecutivo un acto cuando:", ["Necesite aprobación o autorización superior", "Sea desfavorable", "Se haya notificado electrónicamente"], "Art. 98.1.d) Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Ejecución forzosa (art. 99)", "Previo apercibimiento, salvo suspensión legal o cuando la Constitución o la ley exijan intervención judicial"],
        ["Medios de ejecución forzosa (art. 100.1)", "Apremio sobre el patrimonio, ejecución subsidiaria, multa coercitiva y compulsión sobre las personas"],
        ["Principios en la elección del medio (art. 100.1 y 2)", "Proporcionalidad y, si hay varios admisibles, el menos restrictivo de la libertad individual"],
        ["Entrada en domicilio (art. 100.3)", "Requiere consentimiento del titular o, en su defecto, autorización judicial"],
        ["Apremio sobre el patrimonio (art. 101)", "Para cantidades líquidas, por el procedimiento de apremio; no puede imponerse una obligación pecuniaria sin norma de rango legal"],
        ["Ejecución subsidiaria (art. 102)", "Para actos no personalísimos: la Administración los realiza, por sí o por terceros, a costa del obligado; el importe puede liquidarse provisionalmente y antes de la ejecución"],
      ],
      preguntas: [
        ["facil", "La ejecución forzosa de los actos administrativos requiere:", ["Previo apercibimiento", "Sentencia judicial previa en todo caso", "Conformidad del obligado"], "Art. 99 Ley 39/2015."],
        ["media", "Si fueran admisibles varios medios de ejecución, se elegirá:", ["El menos restrictivo de la libertad individual", "El más rápido", "El más económico para la Administración"], "Art. 100.2 Ley 39/2015."],
        ["media", "Para entrar en el domicilio del afectado en una ejecución forzosa, la Administración necesita:", ["Su consentimiento o, en su defecto, autorización judicial", "Solo una orden del alcalde", "La presencia de dos testigos"], "Art. 100.3 Ley 39/2015."],
        ["media", "La ejecución subsidiaria procede respecto de actos que:", ["Por no ser personalísimos puedan ser realizados por sujeto distinto del obligado", "Sean personalísimos", "Impliquen pagar una cantidad líquida"], "Art. 102.1 Ley 39/2015."],
        ["dificil", "El importe de los gastos de la ejecución subsidiaria:", ["Puede liquidarse de forma provisional y realizarse antes de la ejecución, a reserva de la definitiva", "Solo puede exigirse tras una sentencia", "Lo asume siempre la Administración"], "Art. 102.4 Ley 39/2015."],
        ["media", "No podrá imponerse a los administrados una obligación pecuniaria que no esté establecida:", ["Con arreglo a una norma de rango legal", "En una instrucción interna", "En un bando"], "Art. 101.2 Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Multa coercitiva (art. 103.1)", "La pueden imponer las Administraciones cuando lo autoricen las leyes y en la forma y cuantía que fijen, reiterada por lapsos suficientes para cumplir"],
        ["Supuestos de multa coercitiva (art. 103.1)", "a) actos personalísimos sin compulsión directa; b) actos en que la compulsión no se estime conveniente; c) actos cuya ejecución el obligado pueda encargar a otro"],
        ["Multa coercitiva y sanción (art. 103.2)", "Es independiente de las sanciones y compatible con ellas"],
        ["Compulsión sobre las personas (art. 104.1)", "Para obligaciones personalísimas de no hacer o soportar, cuando la ley lo autorice expresamente, con respeto a la dignidad y los derechos constitucionales"],
        ["Obligaciones personalísimas de hacer incumplidas (art. 104.2)", "El obligado debe resarcir daños y perjuicios, liquidados y cobrados en vía administrativa"],
        ["Acciones posesorias (art. 105)", "No se admiten contra actuaciones de los órganos administrativos en su competencia y conforme al procedimiento"],
      ],
      preguntas: [
        ["facil", "La multa coercitiva es, respecto de las sanciones:", ["Independiente y compatible con ellas", "Incompatible", "Una forma de sanción"], "Art. 103.2 Ley 39/2015."],
        ["media", "Las Administraciones pueden imponer multas coercitivas:", ["Cuando así lo autoricen las leyes, en la forma y cuantía que estas determinen", "Siempre que lo decida el órgano", "Solo con autorización judicial"], "Art. 103.1 Ley 39/2015."],
        ["media", "La compulsión directa sobre las personas puede usarse para ejecutar obligaciones personalísimas de:", ["No hacer o soportar, cuando la ley lo autorice expresamente", "Pagar una cantidad", "Hacer cualquier tipo de obra"], "Art. 104.1 Ley 39/2015."],
        ["media", "Contra las actuaciones de los órganos administrativos realizadas en su competencia y conforme al procedimiento:", ["No se admiten acciones posesorias", "Cabe siempre acción posesoria", "Cabe interdicto ante el juez de paz"], "Art. 105 Ley 39/2015."],
        ["dificil", "Si no se realiza una prestación personalísima de hacer, el obligado:", ["Debe resarcir los daños y perjuicios, liquidados y cobrados en vía administrativa", "Queda liberado", "Es detenido"], "Art. 104.2 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Ejecutoriedad", "Cualidad de los actos administrativos de poder ser ejecutados de inmediato por la propia Administración (art. 98)."],
    [S1, "Apercibimiento", "Advertencia previa al obligado de que, si no cumple, se procederá a la ejecución forzosa (art. 99)."],
    [S2, "Apremio sobre el patrimonio", "Medio de ejecución para cobrar cantidades líquidas mediante el procedimiento de apremio (art. 101)."],
    [S2, "Ejecución subsidiaria", "Realización por la Administración, o por terceros, de lo que el obligado no hizo, a su costa (art. 102)."],
    [S3, "Multa coercitiva", "Multa reiterada para forzar el cumplimiento de un acto, autorizada por ley y compatible con las sanciones (art. 103)."],
    [S3, "Compulsión sobre las personas", "Uso de la fuerza directa sobre el obligado para ejecutar obligaciones personalísimas de no hacer o soportar, si lo autoriza una ley (art. 104)."],
    [S3, "Acción posesoria", "Acción judicial para proteger la posesión; no se admite contra actuaciones administrativas legítimas (art. 105)."],
  ],
  casos: [
    {
      slug: "adm-ayto-solar-limpieza-subsidiaria",
      titulo: "La limpieza de un solar abandonado",
      supuesto: "El Ayuntamiento ordena por resolución notificada al propietario de un solar que lo limpie y lo valle en un mes, por razones de salubridad. Pasa el plazo sin que haga nada. El servicio quiere encargar la limpieza a una empresa y cobrárselo al propietario; también estudia entrar en una caseta cerrada dentro del solar que el propietario usa como vivienda.",
      preguntas: [
        [S1, "facil", "Para ejecutar materialmente la limpieza, la Administración necesita:", ["Una resolución previa que le sirva de fundamento y que se haya notificado", "Solo una orden verbal", "Una sentencia"], "Art. 97 Ley 39/2015."],
        [S2, "media", "Antes de la ejecución forzosa, el propietario debe recibir:", ["Un apercibimiento", "Una multa sancionadora", "Una citación judicial"], "Art. 99 Ley 39/2015."],
        [S2, "media", "Encargar la limpieza a una empresa a costa del propietario es:", ["Ejecución subsidiaria", "Compulsión sobre las personas", "Apremio sobre el patrimonio"], "Art. 102 Ley 39/2015."],
        [S2, "media", "Es posible porque limpiar el solar es un acto:", ["No personalísimo, que puede hacer otra persona", "Personalísimo", "De no hacer"], "Art. 102.1 Ley 39/2015."],
        [S2, "media", "El coste de la limpieza puede liquidarse:", ["De forma provisional y antes de la ejecución, a reserva de la definitiva", "Solo después de un juicio", "Nunca"], "Art. 102.4 Ley 39/2015."],
        [S2, "media", "Si el propietario no paga ese coste, se exigirá:", ["Por el procedimiento de apremio", "Por compulsión personal", "Mediante acción posesoria"], "Arts. 101 y 102.3 Ley 39/2015."],
        [S2, "dificil", "Para entrar en la caseta que el propietario usa como vivienda hace falta:", ["Su consentimiento o, en su defecto, autorización judicial", "Una orden del concejal", "Nada, por ser un solar"], "Art. 100.3 Ley 39/2015."],
        [S2, "media", "Entre los medios posibles, la Administración debe elegir:", ["El menos restrictivo de la libertad individual", "El más contundente", "El que prefiera la empresa"], "Art. 100.2 Ley 39/2015."],
        [S3, "media", "Si una ley lo autoriza, en lugar de la ejecución subsidiaria podría imponerle:", ["Multas coercitivas reiteradas hasta que cumpla", "Prisión", "Una acción posesoria"], "Art. 103.1.c) Ley 39/2015."],
        [S3, "media", "Si el propietario interpusiera una acción posesoria contra la entrada legítima en el solar:", ["No se admitiría a trámite", "Paralizaría la ejecución", "Obligaría a indemnizarle"], "Art. 105 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-sancion-recurrible-ejecutividad",
      titulo: "Una multa todavía recurrible",
      supuesto: "El 5 de mayo se notifica a una empresa una resolución que le impone una multa de 3.000 euros por instalar sin permiso un cartel publicitario. Contra ella cabe recurso potestativo de reposición. El servicio de recaudación quiere cobrarla de inmediato. Además, la resolución ordena retirar el cartel.",
      preguntas: [
        [S1, "media", "¿Es inmediatamente ejecutiva la multa?", ["No, porque cabe recurso en vía administrativa, incluido el potestativo de reposición", "Sí, desde que se dicta", "Sí, desde que se notifica"], "Art. 98.1.b) Ley 39/2015."],
        [S1, "media", "Cuando sea ejecutiva, la empresa la pagará preferentemente:", ["Por medios electrónicos (tarjeta, transferencia, domiciliación u otros autorizados)", "En efectivo", "Con cheque"], "Art. 98.2 Ley 39/2015."],
        [S1, "facil", "Como regla general, los actos administrativos son:", ["Inmediatamente ejecutivos", "Ejecutivos al año", "Ejecutivos solo si son favorables"], "Art. 98.1 Ley 39/2015."],
        [S2, "media", "Si una vez ejecutiva la empresa no paga, el medio de ejecución adecuado es:", ["El apremio sobre el patrimonio", "La compulsión sobre las personas", "La ejecución subsidiaria"], "Art. 101.1 Ley 39/2015."],
        [S2, "media", "Si la empresa no retira el cartel, la Administración puede retirarlo a su costa mediante:", ["Ejecución subsidiaria", "Compulsión personal", "Acción posesoria"], "Art. 102 Ley 39/2015."],
        [S3, "media", "Si además le impusiera multas coercitivas para que retire el cartel, estas serían:", ["Compatibles con la multa sancionadora", "Incompatibles con ella", "Una segunda sanción por los mismos hechos"], "Art. 103.2 Ley 39/2015."],
        [S3, "dificil", "La multa coercitiva solo puede imponerse:", ["Si una ley la autoriza y en la forma y cuantía que esta determine", "Si lo decide el recaudador", "Si la empresa lo acepta"], "Art. 103.1 Ley 39/2015."],
        [S2, "media", "Antes de retirar el cartel forzosamente, la Administración debe:", ["Apercibir a la empresa", "Pedir permiso al juez en todo caso", "Publicar un edicto"], "Art. 99 Ley 39/2015."],
        [S1, "media", "Si un juez suspendiera la ejecución de la resolución:", ["No sería inmediatamente ejecutiva", "Seguiría siendo ejecutiva", "Se anularía"], "Art. 98.1.a) Ley 39/2015."],
        [S1, "media", "Si la retirada exigiera una autorización superior aún no concedida:", ["El acto no sería inmediatamente ejecutivo", "Sería ejecutivo igualmente", "Sería nulo"], "Art. 98.1.d) Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-desalojo-compulsion",
      titulo: "Un desalojo por riesgo de derrumbe",
      supuesto: "Una resolución ordena el desalojo temporal de un local por riesgo inminente de derrumbe y prohíbe al titular acceder a él. El titular se niega a salir. El Ayuntamiento estudia los medios de ejecución posibles y si debe pedir algo al juzgado, ya que el local es también su domicilio.",
      preguntas: [
        [S3, "media", "La prohibición de acceder al local es una obligación personalísima de:", ["No hacer", "Hacer", "Pagar"], "Art. 104.1 Ley 39/2015."],
        [S3, "media", "Para ejecutarla por compulsión directa sobre la persona hace falta:", ["Que la ley lo autorice expresamente", "Solo la orden del alcalde", "La conformidad del titular"], "Art. 104.1 Ley 39/2015."],
        [S3, "media", "La compulsión debe respetar en todo caso:", ["La dignidad de la persona y los derechos constitucionales", "Solo el horario de oficina", "La opinión de los vecinos"], "Art. 104.1 Ley 39/2015."],
        [S2, "dificil", "Al ser el local su domicilio, para entrar sin su consentimiento hace falta:", ["Autorización judicial", "Una orden policial", "Un acta notarial"], "Art. 100.3 Ley 39/2015."],
        [S2, "media", "Antes de cualquier medio de ejecución forzosa, el titular debe ser:", ["Apercibido", "Sancionado", "Detenido"], "Art. 99 Ley 39/2015."],
        [S2, "media", "La ejecución forzosa no procede cuando:", ["La Constitución o la ley exijan la intervención de un órgano judicial", "El titular se queje", "El acto sea urgente"], "Art. 99 Ley 39/2015."],
        [S3, "media", "Si en vez de la compulsión el Ayuntamiento no la estima conveniente, podría usar, si una ley lo autoriza:", ["Multas coercitivas", "Acciones posesorias", "Una permuta"], "Art. 103.1.b) Ley 39/2015."],
        [S2, "media", "La elección del medio de ejecución debe respetar el principio de:", ["Proporcionalidad", "Máxima dureza", "Oportunidad política"], "Art. 100.1 Ley 39/2015."],
        [S1, "facil", "El desalojo solo puede ejecutarse si existe:", ["Una resolución previa notificada que le sirva de fundamento", "Una denuncia vecinal", "Un informe técnico, sin resolución"], "Art. 97 Ley 39/2015."],
        [S3, "media", "Si se tratara de una obligación personalísima de hacer que el titular no cumple:", ["Debería resarcir los daños y perjuicios en vía administrativa", "No pasaría nada", "Se le aplicaría compulsión física siempre"], "Art. 104.2 Ley 39/2015."],
      ],
    },
  ],
});

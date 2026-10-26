/**
 * Crea tema-454 — Tema 32 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (XXIV): recursos administrativos. Recurso
 * extraordinario de revisión."
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título V, Capítulo II, Sección 4.ª,
 * arts. 125 y 126, y art. 113, texto consolidado leído íntegro
 * (content-raw/ley-39-2015-procedimiento-administrativo; consolidado del BOE
 * actualizado a 06-11-2024, sin cambios posteriores).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-454-recurso-extraordinario-revision.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "revision-objeto-causas-plazos";
const S2 = "revision-resolucion";

await sembrarTema({
  tema: {
    slug: "tema-454",
    titulo: "El recurso extraordinario de revisión",
    descripcion: "Ley 39/2015, Título V, Capítulo II, Sección 4.ª (arts. 125 y 126) y art. 113: recurso contra actos firmes en vía administrativa ante el órgano que los dictó; causas tasadas (error de hecho resultante del expediente, documentos esenciales posteriores, documentos o testimonios declarados falsos y conductas punibles declaradas por sentencia firme); plazos de cuatro años y de tres meses; compatibilidad con la revisión de oficio y la rectificación de errores; inadmisión sin dictamen; pronunciamiento sobre el fondo; silencio desestimatorio a los tres meses.",
    contenido: "El recurso extraordinario de revisión es el único recurso administrativo contra los actos ya firmes, y solo por cuatro causas tasadas: error de hecho que resulte de los propios documentos del expediente (plazo de cuatro años desde la notificación), aparición de documentos esenciales que evidencien el error, documentos o testimonios declarados falsos por sentencia firme, o resolución dictada por prevaricación, cohecho u otra conducta punible declarada por sentencia firme (tres meses desde que se conocen los documentos o desde la firmeza de la sentencia). Lo resuelve el mismo órgano que dictó el acto, que puede inadmitirlo sin dictamen si no se basa en esas causas, y debe pronunciarse también sobre el fondo. A los tres meses sin resolución se entiende desestimado.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Objeto, causas y plazos", articulos: "arts. 113 y 125", url: `${L}#a125` },
      { seccion: S2, titulo: "Resolución del recurso", articulos: "art. 126", url: `${L}#a126` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 32 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Objeto del recurso extraordinario de revisión (arts. 113 y 125.1)", "Los actos firmes en vía administrativa, solo en las circunstancias del art. 125.1"],
        ["Órgano ante el que se interpone y que resuelve (art. 125.1)", "El órgano administrativo que dictó el acto"],
        ["Causa a) (art. 125.1.a)", "Error de hecho que resulte de los propios documentos incorporados al expediente"],
        ["Causa b) (art. 125.1.b)", "Aparición de documentos de valor esencial, aunque sean posteriores, que evidencien el error de la resolución"],
        ["Causa c) (art. 125.1.c)", "Documentos o testimonios declarados falsos por sentencia judicial firme que influyeran esencialmente en la resolución"],
        ["Causa d) (art. 125.1.d)", "Resolución dictada por prevaricación, cohecho, violencia, maquinación fraudulenta u otra conducta punible declarada por sentencia firme"],
        ["Plazo por error de hecho (art. 125.2)", "Cuatro años desde la notificación de la resolución impugnada"],
        ["Plazo en los demás casos (art. 125.2)", "Tres meses desde el conocimiento de los documentos o desde que la sentencia quedó firme"],
        ["Compatibilidad (art. 125.3)", "No perjudica el derecho a pedir la revisión de oficio (art. 106) ni la rectificación de errores (art. 109.2)"],
      ],
      preguntas: [
        ["facil", "El recurso extraordinario de revisión procede contra:", ["Actos firmes en vía administrativa", "Actos de trámite", "Disposiciones de carácter general"], "Art. 125.1 Ley 39/2015."],
        ["media", "El recurso extraordinario de revisión se interpone ante:", ["El órgano administrativo que dictó el acto, que también lo resuelve", "El superior jerárquico", "El Consejo de Estado"], "Art. 125.1 Ley 39/2015."],
        ["media", "Cuando la causa es un error de hecho que resulta de los documentos del expediente, el plazo es de:", ["Cuatro años desde la notificación de la resolución", "Tres meses desde la notificación", "Un mes"], "Art. 125.2 Ley 39/2015."],
        ["media", "Cuando aparecen documentos de valor esencial que evidencian el error, el plazo es de:", ["Tres meses desde el conocimiento de los documentos", "Cuatro años desde la resolución", "Un año desde los documentos"], "Art. 125.2 Ley 39/2015."],
        ["dificil", "Es causa del recurso extraordinario de revisión que en la resolución hayan influido esencialmente documentos o testimonios:", ["Declarados falsos por sentencia judicial firme, anterior o posterior a la resolución", "Aportados fuera de plazo", "Que el interesado considere falsos"], "Art. 125.1.c) Ley 39/2015."],
        ["media", "Un error de Derecho (una interpretación jurídica discutible) en un acto firme:", ["No es causa del recurso extraordinario de revisión, que exige error de hecho", "Es causa del recurso", "Permite la alzada"], "Art. 125.1.a) Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Inadmisión a trámite (art. 126.1)", "Puede acordarse motivadamente, sin dictamen del Consejo de Estado u órgano consultivo, si no se funda en las causas del art. 125.1 o si se desestimaron en el fondo recursos sustancialmente iguales"],
        ["Alcance de la resolución (art. 126.2)", "Debe pronunciarse sobre la procedencia del recurso y, en su caso, sobre el fondo de la cuestión resuelta"],
        ["Silencio en la revisión extraordinaria (art. 126.3)", "Pasados tres meses desde su interposición sin resolución notificada, se entiende desestimado y queda expedita la vía contencioso-administrativa"],
      ],
      preguntas: [
        ["facil", "Transcurridos tres meses desde la interposición del recurso extraordinario de revisión sin resolución:", ["Se entiende desestimado y queda expedita la vía contencioso-administrativa", "Se entiende estimado", "Caduca"], "Art. 126.3 Ley 39/2015."],
        ["media", "El órgano puede inadmitir a trámite el recurso extraordinario de revisión, sin necesidad de dictamen, cuando:", ["No se funde en alguna de las causas del art. 125.1", "Lo presente una persona jurídica", "El acto sea favorable"], "Art. 126.1 Ley 39/2015."],
        ["media", "Al resolver el recurso extraordinario de revisión, el órgano debe pronunciarse:", ["Sobre la procedencia del recurso y, en su caso, sobre el fondo de la cuestión", "Solo sobre la procedencia", "Solo sobre los plazos"], "Art. 126.2 Ley 39/2015."],
        ["dificil", "También puede inadmitirse sin dictamen el recurso extraordinario de revisión cuando:", ["Se hubiesen desestimado en cuanto al fondo otros recursos sustancialmente iguales", "El recurrente no tenga abogado", "Hayan pasado dos meses"], "Art. 126.1 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Acto firme", "Acto contra el que ya no cabe recurso ordinario, por haber vencido los plazos o haberse resuelto los recursos."],
    [S1, "Error de hecho", "Equivocación sobre un dato fáctico (una cifra, una fecha, un documento) que resulta de los propios documentos del expediente; distinto del error de interpretación jurídica."],
    [S1, "Prevaricación", "Delito de la autoridad o funcionario que dicta a sabiendas una resolución arbitraria; declarado por sentencia firme es causa de revisión (art. 125.1.d)."],
    [S1, "Cohecho", "Delito consistente en solicitar o aceptar dádivas a cambio de un acto del cargo; declarado por sentencia firme es causa de revisión (art. 125.1.d)."],
    [S2, "Expedita", "Libre de obstáculos; la vía contencioso-administrativa queda «expedita» cuando el recurso se entiende desestimado (art. 126.3)."],
  ],
  casos: [
    {
      slug: "adm-ayto-revision-error-baremo",
      titulo: "Un error en la suma del baremo",
      supuesto: "En un concurso de traslados resuelto y firme hace dos años, un funcionario descubre revisando su expediente que el tribunal le sumó mal los méritos: su propio certificado de servicios, que consta en el expediente, acredita 8 años y se le computaron 6. Con la puntuación correcta habría obtenido el puesto.",
      preguntas: [
        [S1, "media", "Como la resolución es firme, el recurso administrativo que procede es:", ["El extraordinario de revisión", "La alzada", "La reposición"], "Arts. 113 y 125.1 Ley 39/2015."],
        [S1, "media", "La causa aplicable es:", ["Error de hecho que resulta de los propios documentos del expediente", "Documentos declarados falsos", "Prevaricación"], "Art. 125.1.a) Ley 39/2015."],
        [S1, "media", "El plazo para interponerlo por esta causa es de:", ["Cuatro años desde la notificación de la resolución", "Tres meses desde que lo descubrió", "Un mes"], "Art. 125.2 Ley 39/2015."],
        [S1, "facil", "¿Está dentro de plazo, dos años después?", ["Sí", "No", "Solo si lo autoriza el Pleno"], "Art. 125.2 Ley 39/2015."],
        [S1, "media", "El recurso se presenta ante:", ["El órgano que dictó la resolución del concurso", "El superior jerárquico", "El juzgado"], "Art. 125.1 Ley 39/2015."],
        [S2, "media", "Al resolverlo, el órgano debe pronunciarse:", ["Sobre la procedencia del recurso y sobre el fondo", "Solo sobre la procedencia", "Solo sobre el plazo"], "Art. 126.2 Ley 39/2015."],
        [S2, "media", "Si el órgano no resuelve en tres meses:", ["Se entiende desestimado y puede acudirse al contencioso", "Se entiende estimado", "El funcionario obtiene el puesto"], "Art. 126.3 Ley 39/2015."],
        [S1, "dificil", "Si además quisiera pedir la rectificación del error aritmético, puede hacerlo porque:", ["El recurso de revisión no perjudica el derecho a pedir la rectificación de errores del art. 109.2", "Son incompatibles", "Solo cabe la rectificación"], "Art. 125.3 Ley 39/2015."],
        [S2, "media", "¿Podría inadmitirse sin dictamen?", ["No, porque se funda en una causa del art. 125.1", "Sí, siempre", "Sí, por ser funcionario"], "Art. 126.1 Ley 39/2015."],
        [S1, "media", "Si el funcionario solo alegara que el tribunal interpretó mal las bases:", ["No sería un error de hecho y no encajaría en la revisión extraordinaria", "Encajaría en el error de hecho", "Podría recurrir en alzada"], "Art. 125.1.a) Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-revision-sentencia-cohecho",
      titulo: "Una licencia obtenida con un soborno",
      supuesto: "Una sentencia penal firme de 15 de enero declara que un técnico municipal aceptó dinero de un promotor para informar favorablemente una licencia, concedida y firme años atrás. Un vecino perjudicado por la licencia conoce la sentencia el 1 de febrero y quiere recurrir la licencia en vía administrativa.",
      preguntas: [
        [S1, "media", "La causa del recurso extraordinario de revisión aplicable es:", ["Resolución dictada como consecuencia de cohecho declarado por sentencia firme", "Error de hecho del expediente", "Aparición de documentos esenciales"], "Art. 125.1.d) Ley 39/2015."],
        [S1, "media", "El plazo para interponer el recurso por esta causa es de:", ["Tres meses desde que la sentencia quedó firme", "Cuatro años desde la licencia", "Un mes desde que lo conoció"], "Art. 125.2 Ley 39/2015."],
        [S1, "dificil", "Contado desde la firmeza de la sentencia (15 de enero), el plazo vence:", ["El 15 de abril", "El 1 de mayo", "El 15 de febrero"], "Arts. 125.2 y 30.4 Ley 39/2015."],
        [S1, "facil", "Es necesario que la conducta punible esté declarada:", ["Por sentencia judicial firme", "Por una denuncia vecinal", "Por un informe interno"], "Art. 125.1.d) Ley 39/2015."],
        [S1, "media", "El recurso se interpone ante:", ["El órgano que concedió la licencia", "El juzgado penal", "El Defensor del Pueblo"], "Art. 125.1 Ley 39/2015."],
        [S2, "media", "Además de declarar procedente el recurso, el órgano debe:", ["Resolver sobre el fondo de la licencia", "Limitarse a archivar", "Remitirlo al juez"], "Art. 126.2 Ley 39/2015."],
        [S2, "media", "Si no se resuelve en tres meses desde la interposición:", ["Se entiende desestimado", "Se entiende estimado", "Se anula la licencia automáticamente"], "Art. 126.3 Ley 39/2015."],
        [S1, "media", "El vecino podría, además, pedir la revisión de oficio por nulidad porque:", ["El recurso extraordinario no perjudica la solicitud del art. 106", "Es incompatible con la revisión de oficio", "La revisión de oficio solo la pide el Ayuntamiento"], "Art. 125.3 Ley 39/2015."],
        [S1, "media", "Si la sentencia hubiera declarado falsos los planos que sirvieron para conceder la licencia, la causa sería:", ["Documentos declarados falsos por sentencia firme", "Error de hecho", "Cohecho"], "Art. 125.1.c) Ley 39/2015."],
        [S1, "media", "La licencia, al ser firme, ya no admite:", ["Recursos ordinarios de alzada o reposición", "Ningún tipo de impugnación", "Revisión extraordinaria"], "Arts. 113 y 125 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-revision-documento-nuevo",
      titulo: "Aparece un documento que lo cambia todo",
      supuesto: "A una vecina se le denegó hace un año, con resolución firme, una bonificación del IBI por familia numerosa porque no constaba su título. Ahora la Dirección General competente le expide un certificado que acredita que el título estaba vigente en la fecha de la solicitud. Lo recibe el 3 de junio.",
      preguntas: [
        [S1, "media", "La causa de revisión aplicable es:", ["Aparición de documentos de valor esencial que evidencian el error de la resolución", "Error de hecho que resulta del expediente", "Prevaricación"], "Art. 125.1.b) Ley 39/2015."],
        [S1, "media", "¿Importa que el documento sea posterior a la resolución?", ["No, la causa admite documentos posteriores", "Sí, debe ser anterior", "Sí, debe ser del mismo día"], "Art. 125.1.b) Ley 39/2015."],
        [S1, "media", "El plazo para interponer el recurso es de:", ["Tres meses desde que conoció el documento", "Cuatro años desde la denegación", "Un mes desde la denegación"], "Art. 125.2 Ley 39/2015."],
        [S1, "facil", "El recurso se dirige contra:", ["Un acto firme en vía administrativa", "Un acto de trámite", "Una ordenanza fiscal"], "Art. 125.1 Ley 39/2015."],
        [S2, "media", "Si el recurso se fundara en una causa distinta de las del art. 125.1, el órgano podría:", ["Inadmitirlo motivadamente sin pedir dictamen", "Estimarlo igualmente", "Remitirlo a otro órgano"], "Art. 126.1 Ley 39/2015."],
        [S2, "media", "Si antes se hubieran desestimado en el fondo recursos sustancialmente iguales:", ["Podría inadmitirse sin dictamen", "Debería estimarse", "Debería pedirse dictamen siempre"], "Art. 126.1 Ley 39/2015."],
        [S2, "media", "Si el órgano estima el recurso, además debe resolver sobre:", ["El fondo: la bonificación", "Nada más", "Solo la devolución de tasas"], "Art. 126.2 Ley 39/2015."],
        [S2, "dificil", "Si pasan tres meses sin resolver, la vecina:", ["Puede entenderlo desestimado y acudir al contencioso", "Tiene la bonificación concedida", "Debe presentar alzada"], "Art. 126.3 Ley 39/2015."],
        [S1, "media", "El recurso lo resuelve:", ["El órgano que denegó la bonificación", "El Ministerio de Hacienda", "El Pleno siempre"], "Art. 125.1 Ley 39/2015."],
        [S1, "media", "El recurso extraordinario de revisión es el único recurso administrativo contra actos firmes:", ["Sí, en los supuestos del art. 125.1", "No, también cabe alzada", "No, también cabe reposición"], "Art. 113 Ley 39/2015."],
      ],
    },
  ],
});

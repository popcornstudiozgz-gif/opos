/**
 * Crea tema-446 — Tema 24 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (XVI): instrucción del procedimiento.
 * Participación de los interesados."
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título IV, Capítulo IV, Sección 4.ª,
 * arts. 82 y 83, texto consolidado leído íntegro (content-raw/ley-39-2015-
 * procedimiento-administrativo; consolidado del BOE actualizado a
 * 06-11-2024, sin cambios posteriores).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-446-participacion-interesados.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "tramite-audiencia";
const S2 = "informacion-publica";

await sembrarTema({
  tema: {
    slug: "tema-446",
    titulo: "Instrucción del procedimiento: participación de los interesados",
    descripcion: "Ley 39/2015, Título IV, Capítulo IV, Sección 4.ª (arts. 82 y 83): trámite de audiencia inmediatamente antes de la propuesta de resolución, con los límites de la Ley 19/2013, anterior al informe jurídico y al dictamen consultivo; plazo de diez a quince días; renuncia anticipada; supuesto en que puede prescindirse de la audiencia; audiencia al contratista en responsabilidad patrimonial; información pública, anuncio en diario oficial y sede electrónica, plazo mínimo de veinte días, efectos de comparecer y no comparecer y derecho a respuesta razonada.",
    contenido: "Cómo participan los interesados antes de resolver. En la audiencia, una vez instruido el procedimiento y justo antes de redactar la propuesta de resolución, se les pone de manifiesto el expediente y tienen entre diez y quince días para alegar y aportar documentos; si renuncian antes, el trámite se da por hecho, y puede omitirse si solo se tienen en cuenta los hechos y alegaciones del propio interesado. La información pública la acuerda el órgano que resuelve cuando la naturaleza del procedimiento lo requiere: anuncio en el diario oficial, expediente consultable en la sede electrónica y al menos veinte días para alegar. Comparecer no convierte en interesado, pero da derecho a una respuesta razonada; no comparecer no impide recurrir.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Trámite de audiencia", articulos: "art. 82", url: `${L}#a82` },
      { seccion: S2, titulo: "Información pública", articulos: "art. 83", url: `${L}#a83` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 24 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Momento de la audiencia (art. 82.1)", "Instruido el procedimiento e inmediatamente antes de redactar la propuesta de resolución"],
        ["Límites a lo que se pone de manifiesto (art. 82.1)", "Las limitaciones previstas, en su caso, en la Ley 19/2013, de transparencia"],
        ["Audiencia y asesoramiento jurídico (art. 82.1)", "La audiencia es anterior a la solicitud del informe jurídico o del dictamen del Consejo de Estado u órgano consultivo autonómico, si forman parte del procedimiento"],
        ["Plazo de audiencia (art. 82.2)", "No inferior a diez días ni superior a quince"],
        ["Renuncia a alegar (art. 82.3)", "Si antes del vencimiento manifiestan que no alegarán ni aportarán nada, el trámite se tiene por realizado"],
        ["¿Cuándo puede prescindirse de la audiencia (art. 82.4)?", "Cuando no figuren ni se tengan en cuenta otros hechos, alegaciones y pruebas que las aducidas por el interesado"],
        ["Audiencia al contratista (art. 82.5)", "En los procedimientos de responsabilidad patrimonial del art. 32.9 de la Ley 40/2015, debe darse en todo caso, notificándole las actuaciones"],
      ],
      preguntas: [
        ["facil", "El trámite de audiencia se realiza:", ["Instruido el procedimiento e inmediatamente antes de redactar la propuesta de resolución", "Al inicio del procedimiento", "Después de la resolución"], "Art. 82.1 Ley 39/2015."],
        ["media", "En el trámite de audiencia, los interesados pueden alegar en un plazo:", ["No inferior a diez días ni superior a quince", "De veinte días como mínimo", "De cinco días"], "Art. 82.2 Ley 39/2015."],
        ["media", "Se puede prescindir del trámite de audiencia cuando:", ["No figuren ni se tengan en cuenta otros hechos, alegaciones y pruebas que las aducidas por el interesado", "El procedimiento sea urgente", "El interesado no tenga abogado"], "Art. 82.4 Ley 39/2015."],
        ["media", "Si antes del vencimiento del plazo el interesado manifiesta que no va a alegar:", ["Se tiene por realizado el trámite", "Debe esperarse al fin del plazo", "Se le declara desistido"], "Art. 82.3 Ley 39/2015."],
        ["dificil", "Cuando el procedimiento requiera dictamen del órgano consultivo, la audiencia a los interesados será:", ["Anterior a la solicitud del dictamen", "Posterior al dictamen", "Simultánea a la resolución"], "Art. 82.1, párrafo segundo, Ley 39/2015."],
        ["media", "Al poner de manifiesto el expediente se tendrán en cuenta las limitaciones previstas en:", ["La Ley 19/2013, de transparencia", "La Ley de Enjuiciamiento Civil", "El Código Penal"], "Art. 82.1 Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Quién acuerda la información pública (art. 83.1)?", "El órgano al que corresponda resolver, cuando la naturaleza del procedimiento lo requiera"],
        ["Publicidad de la información pública (art. 83.2)", "Anuncio en el diario oficial correspondiente para que cualquier persona física o jurídica examine el expediente o la parte acordada"],
        ["Contenido del anuncio (art. 83.2)", "Lugar de exhibición (siempre disponible también en la sede electrónica) y plazo para alegaciones"],
        ["Plazo mínimo de alegaciones (art. 83.2)", "En ningún caso inferior a veinte días"],
        ["No comparecer en información pública (art. 83.3)", "No impide a los interesados recurrir la resolución definitiva"],
        ["Comparecer en información pública (art. 83.3)", "No otorga por sí misma la condición de interesado, pero da derecho a una respuesta razonada, que puede ser común para alegaciones sustancialmente iguales"],
        ["Otras formas de participación (art. 83.4)", "Las que establezcan las Administraciones conforme a las leyes, directamente o mediante organizaciones y asociaciones reconocidas"],
      ],
      preguntas: [
        ["facil", "El plazo para formular alegaciones en el trámite de información pública no podrá ser inferior a:", ["Veinte días", "Diez días", "Quince días"], "Art. 83.2 Ley 39/2015."],
        ["media", "La comparecencia en el trámite de información pública:", ["No otorga por sí misma la condición de interesado", "Convierte en interesado a quien comparece", "Obliga a la Administración a estimar las alegaciones"], "Art. 83.3 Ley 39/2015."],
        ["media", "Quienes presenten alegaciones en información pública tienen derecho a:", ["Una respuesta razonada, que puede ser común para alegaciones sustancialmente iguales", "Ser indemnizados", "Recibir copia gratuita del expediente completo en papel"], "Art. 83.3 Ley 39/2015."],
        ["media", "La información pública la acuerda:", ["El órgano al que corresponda la resolución del procedimiento", "El instructor siempre", "El Pleno en todo caso"], "Art. 83.1 Ley 39/2015."],
        ["dificil", "La incomparecencia de un interesado en el trámite de información pública:", ["No le impide interponer los recursos procedentes contra la resolución definitiva", "Le impide recurrir", "Le hace perder la condición de interesado"], "Art. 83.3 Ley 39/2015."],
        ["media", "El expediente sometido a información pública debe estar, en todo caso, a disposición de quien lo solicite:", ["A través de medios electrónicos en la sede electrónica", "Solo en papel en el Registro", "Solo previa cita"], "Art. 83.2 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Trámite de audiencia", "Puesta de manifiesto del expediente a los interesados, antes de la propuesta de resolución, para que aleguen lo que estimen (art. 82)."],
    [S1, "Propuesta de resolución", "Documento del instructor con los hechos, su valoración y la resolución que propone al órgano competente; se redacta tras la audiencia."],
    [S1, "Puesta de manifiesto", "Acceso de los interesados al contenido del expediente, con los límites de la Ley 19/2013 (art. 82.1)."],
    [S2, "Información pública", "Trámite abierto a cualquier persona para examinar el expediente y presentar alegaciones durante al menos veinte días (art. 83)."],
    [S2, "Respuesta razonada", "Contestación motivada que la Administración debe a quienes presentan alegaciones en información pública; puede ser común para las iguales (art. 83.3)."],
  ],
  casos: [
    {
      slug: "adm-ayto-audiencia-sancion-trabajo",
      titulo: "La audiencia en un expediente sancionador",
      supuesto: "En un expediente sancionador a una empresa por incumplir las condiciones de un quiosco, terminada la prueba, el instructor va a redactar la propuesta de resolución. Antes, comunica a la empresa la puesta de manifiesto del expediente. El expediente incluye un informe de un vecino que contiene datos personales de terceros. La empresa contesta al día siguiente que no va a presentar nada más.",
      preguntas: [
        [S1, "facil", "El trámite de audiencia se da en este momento porque:", ["Está instruido el procedimiento y se va a redactar la propuesta de resolución", "Es obligatorio al iniciar", "Lo pidió el vecino"], "Art. 82.1 Ley 39/2015."],
        [S1, "media", "El plazo que debe concederse a la empresa será:", ["De diez a quince días", "De veinte días como mínimo", "De tres días"], "Art. 82.2 Ley 39/2015."],
        [S1, "media", "Al darle vista del informe del vecino, el instructor tendrá en cuenta:", ["Las limitaciones de la Ley 19/2013 respecto a datos de terceros", "Que debe ocultarlo entero sin más", "Que debe publicarlo"], "Art. 82.1 Ley 39/2015."],
        [S1, "media", "Como la empresa manifiesta que no presentará nada:", ["Se tiene por realizado el trámite", "Hay que esperar los quince días", "Se archiva el expediente"], "Art. 82.3 Ley 39/2015."],
        [S1, "media", "En la audiencia, la empresa podría presentar:", ["Alegaciones, documentos y justificaciones", "Solo un recurso", "Solo la renuncia"], "Art. 82.2 Ley 39/2015."],
        [S1, "dificil", "Si en el expediente hubiera que pedir informe jurídico al Servicio Jurídico, la audiencia sería:", ["Anterior a la solicitud de ese informe", "Posterior a ese informe", "Innecesaria"], "Art. 82.1, párrafo segundo, Ley 39/2015."],
        [S1, "media", "¿Podría omitirse la audiencia en este caso?", ["No, porque figuran hechos y pruebas distintos de los aducidos por la empresa", "Sí, siempre en los sancionadores", "Sí, si el instructor lo decide"], "Art. 82.4 Ley 39/2015."],
        [S1, "media", "Tras la audiencia, el instructor:", ["Redacta la propuesta de resolución", "Abre la información pública obligatoriamente", "Ejecuta la sanción"], "Art. 82.1 Ley 39/2015."],
        [S2, "media", "¿Debe abrirse información pública en este expediente?", ["Solo si el órgano que resuelve considera que la naturaleza del procedimiento lo requiere", "Siempre", "Nunca puede abrirse"], "Art. 83.1 Ley 39/2015."],
        [S1, "facil", "Los destinatarios de la audiencia son:", ["Los interesados o sus representantes", "Cualquier ciudadano", "Solo el denunciante"], "Art. 82.1 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-informacion-publica-parque",
      titulo: "La información pública de un proyecto de parque",
      supuesto: "El órgano competente acuerda someter a información pública un expediente para modificar el uso de una parcela municipal y convertirla en parque. Se publica un anuncio en el Boletín Oficial de la Provincia con un plazo de quince días para alegar. Doscientos vecinos presentan escritos casi idénticos en contra, y una asociación vecinal pide ser considerada interesada por haber alegado.",
      preguntas: [
        [S2, "media", "El plazo de quince días fijado en el anuncio es:", ["Insuficiente: no puede ser inferior a veinte días", "Correcto", "Excesivo: el máximo es diez"], "Art. 83.2 Ley 39/2015."],
        [S2, "facil", "El anuncio debe publicarse en:", ["El diario oficial correspondiente", "Un periódico privado exclusivamente", "Las redes sociales del Ayuntamiento"], "Art. 83.2 Ley 39/2015."],
        [S2, "media", "El anuncio debe señalar:", ["El lugar de exhibición y el plazo para alegaciones", "El nombre de quienes alegarán", "La resolución ya adoptada"], "Art. 83.2 Ley 39/2015."],
        [S2, "media", "El expediente debe poder consultarse, en todo caso:", ["En la sede electrónica", "Solo en una oficina municipal", "Solo por correo"], "Art. 83.2 Ley 39/2015."],
        [S2, "media", "¿Es la asociación interesada por haber alegado?", ["No, la comparecencia no otorga por sí misma esa condición", "Sí, automáticamente", "Sí, si tiene más de cien socios"], "Art. 83.3 Ley 39/2015."],
        [S2, "media", "A los doscientos vecinos con escritos casi idénticos, la Administración:", ["Debe dar una respuesta razonada, que puede ser común", "No tiene que contestar", "Debe contestar a cada uno con un escrito distinto"], "Art. 83.3 Ley 39/2015."],
        [S2, "dificil", "Un vecino interesado que no alegó en información pública:", ["Puede recurrir la resolución definitiva", "Pierde el derecho a recurrir", "Solo puede presentar una queja"], "Art. 83.3 Ley 39/2015."],
        [S2, "media", "Pueden examinar el expediente en información pública:", ["Cualquier persona física o jurídica", "Solo los vecinos colindantes", "Solo los interesados"], "Art. 83.2 Ley 39/2015."],
        [S2, "media", "El órgano puede limitar la información pública a:", ["Una parte del expediente", "Solo a los empadronados", "Solo a las asociaciones"], "Art. 83.2 Ley 39/2015."],
        [S2, "media", "Además de la información pública, el Ayuntamiento puede establecer, conforme a las leyes:", ["Otras formas y cauces de participación, incluso a través de asociaciones", "Un referéndum vinculante sin ley", "Nada más"], "Art. 83.4 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-contratista-baches",
      titulo: "La reclamación por un daño causado por un contratista",
      supuesto: "Una vecina reclama responsabilidad patrimonial porque se rompió una rueda del coche en una zanja mal señalizada de una obra que ejecuta una empresa contratista del Ayuntamiento. En la tramitación solo constan los hechos y las fotos que aportó ella misma, y el Ayuntamiento no piensa tener en cuenta nada más.",
      preguntas: [
        [S1, "media", "Respecto a la empresa contratista, la Ley exige:", ["Darle audiencia en todo caso, notificándole las actuaciones", "No informarle", "Darle audiencia solo si la pide"], "Art. 82.5 Ley 39/2015."],
        [S1, "media", "Con la audiencia, la contratista puede:", ["Personarse, alegar lo que convenga y proponer prueba", "Solo pagar", "Solo firmar el acta"], "Art. 82.5 Ley 39/2015."],
        [S1, "dificil", "Respecto a la vecina, si solo constan sus propios hechos y pruebas:", ["Podría prescindirse de su audiencia, pero no de la del contratista", "Hay que darle audiencia en todo caso", "Hay que abrir información pública"], "Art. 82.4 y 5 Ley 39/2015."],
        [S1, "media", "El plazo de audiencia de la contratista será:", ["De diez a quince días", "De veinte días", "De dos meses"], "Art. 82.2 Ley 39/2015."],
        [S1, "facil", "La audiencia se da antes de:", ["Redactar la propuesta de resolución", "Iniciar el procedimiento", "Admitir la reclamación"], "Art. 82.1 Ley 39/2015."],
        [S1, "media", "Si la contratista dice antes del fin del plazo que no alegará nada:", ["El trámite se tiene por realizado", "Se le multa", "Se suspende el procedimiento"], "Art. 82.3 Ley 39/2015."],
        [S2, "media", "Si el Ayuntamiento abriera información pública, comparecer en ella daría a un tercero:", ["Derecho a respuesta razonada, pero no la condición de interesado", "La condición de interesado", "Derecho a indemnización"], "Art. 83.3 Ley 39/2015."],
        [S1, "media", "Si la reclamación requiriera dictamen del órgano consultivo, la audiencia sería:", ["Anterior a la solicitud del dictamen", "Posterior al dictamen", "Simultánea"], "Art. 82.1 Ley 39/2015."],
        [S1, "media", "La audiencia se da a los interesados o, en su caso, a:", ["Sus representantes", "Sus vecinos", "Sus aseguradoras siempre"], "Art. 82.1 Ley 39/2015."],
        [S2, "media", "El plazo mínimo de una información pública sería de:", ["Veinte días", "Diez días", "Quince días"], "Art. 83.2 Ley 39/2015."],
      ],
    },
  ],
});

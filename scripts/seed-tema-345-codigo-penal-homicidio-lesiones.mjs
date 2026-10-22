/**
 * Crea tema-345 — Tema 18 de Policía Local: "Del homicidio y sus formas
 * (Libro II, Título I). De las lesiones (Libro II, Título III)."
 *
 * Fuente: Ley Orgánica 10/1995, del Código Penal (BOE-A-1995-25444), texto
 * consolidado del BOE leído íntegro en los arts. 138 a 143 bis y 147 a 156
 * quinquies (el art. 142 bis tiene en el BOE el ancla «a1-2» y el 143 bis
 * «a1-4»).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-345-codigo-penal-homicidio-lesiones.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const CP = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444";
const a = (ancla) => `${CP}#${ancla}`;
const S1 = "homicidio-asesinato";
const S2 = "homicidio-imprudente-suicidio";
const S3 = "lesiones-tipos";
const S4 = "lesiones-imprudentes-violencia-domestica";
const S5 = "rina-consentimiento-organos";

await sembrarTema({
  tema: {
    slug: "tema-345",
    titulo: "Código Penal: del homicidio y sus formas, y de las lesiones",
    descripcion: "Homicidio doloso y su agravación; asesinato y sus circunstancias; asesinato con prisión permanente revisable; libertad vigilada y privación de la patria potestad; actos preparatorios; homicidio por imprudencia grave y menos grave (vehículos y armas); inducción y cooperación al suicidio y eutanasia; difusión de contenidos que inciten al suicidio; lesiones básicas, leves y maltrato de obra; tipos agravados por medios peligrosos, alevosía, víctima vulnerable o pareja; lesiones de los arts. 149 y 150 y mutilación genital; lesiones imprudentes; violencia de género y doméstica del art. 153; riña tumultuaria; consentimiento; tráfico de órganos.",
    contenido: "Recorre los Títulos I y III del Libro II del Código Penal: qué distingue el homicidio del asesinato y cuándo se castiga con prisión permanente revisable, cómo se castiga causar la muerte por imprudencia (en especial con vehículo a motor), la inducción y cooperación al suicidio, qué requisitos tienen las lesiones (primera asistencia y tratamiento médico), sus tipos agravados, las lesiones a la pareja o a personas del entorno familiar, la riña tumultuaria y el valor del consentimiento.",
    enlaces_boe: [{ url: CP, titulo: "Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal (BOE-A-1995-25444)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Homicidio y asesinato", articulos: "arts. 138-141", url: a("a138") },
      { seccion: S2, titulo: "Homicidio imprudente, suicidio y eutanasia", articulos: "arts. 142-143 bis", url: a("a142") },
      { seccion: S3, titulo: "Lesiones: tipo básico, leves, maltrato de obra y agravadas", articulos: "arts. 147-151", url: a("a147") },
      { seccion: S4, titulo: "Lesiones imprudentes y violencia de género y doméstica", articulos: "arts. 152-153", url: a("a152") },
      { seccion: S5, titulo: "Riña tumultuaria, consentimiento, tráfico de órganos y otras disposiciones", articulos: "arts. 154-156 quinquies", url: a("a154") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 18 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Homicidio (art. 138.1)", "El que matare a otro: prisión de diez a quince años"],
        ["Homicidio con pena superior en grado (art. 138.2)", "Si concurre alguna circunstancia del art. 140.1 o los hechos son además atentado del art. 550"],
        ["Circunstancias del asesinato (art. 139.1)", "1.ª alevosía; 2.ª precio, recompensa o promesa; 3.ª ensañamiento; 4.ª para facilitar la comisión de otro delito o evitar que se descubra"],
        ["Pena del asesinato", "Prisión de quince a veinticinco años; en su mitad superior si concurren varias circunstancias (art. 139.2)"],
        ["Asesinato con prisión permanente revisable (art. 140.1)", "Víctima menor de 16 años o especialmente vulnerable; hecho subsiguiente a un delito contra la libertad sexual sobre la víctima; autor miembro de grupo u organización criminal"],
        ["Asesinato de más de dos personas (art. 140.2)", "Prisión permanente revisable para el condenado por la muerte de más de dos personas"],
        ["Privación de la patria potestad (art. 140 bis.2)", "Se impone si víctima y autor tienen un hijo en común (respecto de este) o si la víctima es hijo del autor (respecto de los otros hijos)"],
        ["Actos preparatorios (art. 141)", "Provocación, conspiración y proposición al homicidio o asesinato: pena inferior en uno o dos grados"],
      ],
      preguntas: [
        ["facil", "¿Qué pena tiene el homicidio del art. 138.1 CP?", ["Prisión de diez a quince años", "Prisión de quince a veinticinco años", "Prisión de cinco a diez años"], "Art. 138.1."],
        ["media", "¿Cuál de estas NO es circunstancia del asesinato del art. 139?", ["Reincidencia", "Alevosía", "Ensañamiento"], "Art. 139.1."],
        ["media", "Matar a otro para evitar que se descubra otro delito es…", ["Asesinato", "Homicidio simple", "Homicidio imprudente"], "Art. 139.1.4.ª."],
        ["media", "El asesinato de una víctima menor de dieciséis años se castiga con…", ["Prisión permanente revisable", "Prisión de 15 a 25 años", "Prisión de 20 a 30 años"], "Art. 140.1.1.ª."],
        ["dificil", "Matar a un agente de la autoridad cuando los hechos son también atentado del art. 550 conlleva…", ["La pena del homicidio superior en grado", "Siempre prisión permanente revisable", "La pena del homicidio en su mitad inferior"], "Art. 138.2.b)."],
        ["media", "Si en un asesinato concurren alevosía y ensañamiento…", ["Se impone la pena en su mitad superior", "Se aplica prisión permanente revisable", "Se impone la pena mínima"], "Art. 139.2."],
        ["dificil", "¿Puede imponerse libertad vigilada a los condenados por delitos del Título I?", ["Sí", "No", "Solo si son menores"], "Art. 140 bis.1."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Homicidio por imprudencia grave (art. 142.1)", "Prisión de uno a cuatro años; con vehículo, además privación del permiso de uno a seis años; con arma de fuego, privación de armas de uno a seis años; profesional, inhabilitación de tres a seis años"],
        ["¿Cuándo es imprudencia grave en todo caso la conducción? (art. 142.1)", "Cuando la concurrencia de alguna circunstancia del art. 379 (velocidad o alcohol/drogas) determina el hecho"],
        ["Homicidio por imprudencia menos grave (art. 142.2)", "Multa de tres a dieciocho meses; con vehículo, privación del permiso de tres a dieciocho meses"],
        ["Imprudencia menos grave en tráfico (art. 142.2)", "La no calificada como grave en la que haya sido determinante una infracción grave de las normas de tráfico, apreciada en resolución motivada"],
        ["Perseguibilidad del homicidio por imprudencia menos grave", "Solo por denuncia del agraviado o su representante legal, salvo cuando se cometa con vehículo a motor o ciclomotor"],
        ["Agravación por pluralidad de víctimas (art. 142 bis)", "En la imprudencia grave, pena superior en un grado si hay notoria gravedad y dos o más muertos (o un muerto y lesionados graves), y en dos grados si el número es muy elevado"],
        ["Inducción y cooperación al suicidio (art. 143)", "Inducción: 4 a 8 años; cooperación con actos necesarios: 2 a 5 años; cooperación que llega a ejecutar la muerte: 6 a 10 años"],
        ["Eutanasia (art. 143.4-5)", "Pena inferior en uno o dos grados si hay petición expresa, seria e inequívoca de quien sufre un padecimiento grave e imposibilitante; no hay responsabilidad si se cumple la ley orgánica de eutanasia"],
        ["Art. 143 bis", "Difundir por internet u otras TIC contenidos destinados a incitar al suicidio de menores o personas con discapacidad necesitadas de especial protección: prisión de uno a cuatro años"],
      ],
      preguntas: [
        ["media", "El homicidio por imprudencia grave se castiga con prisión de…", ["Uno a cuatro años", "Diez a quince años", "Tres meses a un año"], "Art. 142.1."],
        ["media", "Si el homicidio por imprudencia grave se comete con un vehículo a motor, se impone además privación del permiso de…", ["Uno a seis años", "Tres a dieciocho meses", "Seis a diez años"], "Art. 142.1."],
        ["dificil", "¿Es perseguible de oficio el homicidio por imprudencia menos grave cometido con un vehículo a motor?", ["Sí: la exigencia de denuncia no rige con vehículo a motor o ciclomotor", "No, requiere siempre denuncia", "Solo si hay alcohol"], "Art. 142.2, último párrafo."],
        ["media", "La conducción en la que la concurrencia de una circunstancia del art. 379 determina la muerte se reputa…", ["Imprudencia grave en todo caso", "Imprudencia menos grave", "Dolo eventual"], "Art. 142.1."],
        ["media", "La cooperación al suicidio con actos necesarios se castiga con prisión de…", ["Dos a cinco años", "Cuatro a ocho años", "Seis a diez años"], "Art. 143.2."],
        ["dificil", "Quien causa la muerte de otro cumpliendo lo establecido en la ley orgánica reguladora de la eutanasia…", ["No incurre en responsabilidad penal", "Responde por homicidio atenuado", "Responde por cooperación al suicidio"], "Art. 143.5."],
        ["media", "La inducción al suicidio se castiga con prisión de…", ["Cuatro a ocho años", "Dos a cinco años", "Uno a cuatro años"], "Art. 143.1."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Lesiones básicas (art. 147.1)", "Lesión que menoscabe la integridad corporal o la salud física o mental y requiera objetivamente, además de una primera asistencia facultativa, tratamiento médico o quirúrgico: prisión de 3 meses a 3 años o multa de 6 a 12 meses"],
        ["¿Es tratamiento médico la simple vigilancia del curso de la lesión?", "No (art. 147.1, último inciso)"],
        ["Lesiones leves (art. 147.2)", "Lesión que no requiere tratamiento: multa de uno a tres meses"],
        ["Maltrato de obra sin lesión (art. 147.3)", "Golpear o maltratar de obra sin causar lesión: multa de uno a dos meses"],
        ["Perseguibilidad del art. 147.2 y 3", "Solo mediante denuncia de la persona agraviada o de su representante legal"],
        ["Lesiones agravadas del art. 148", "Prisión de dos a cinco años si: medios peligrosos; ensañamiento o alevosía; víctima menor de 14 o con discapacidad necesitada de especial protección; víctima esposa o mujer con análoga relación de afectividad; persona especialmente vulnerable que conviva con el autor"],
        ["Lesiones del art. 149", "Pérdida o inutilidad de órgano o miembro principal o de un sentido, impotencia, esterilidad, grave deformidad o grave enfermedad somática o psíquica: prisión de 6 a 12 años; también la mutilación genital"],
        ["Lesiones del art. 150", "Pérdida o inutilidad de órgano o miembro no principal, o deformidad: prisión de 3 a 6 años"],
      ],
      preguntas: [
        ["media", "Para que exista delito de lesiones del art. 147.1 la lesión debe requerir…", ["Además de una primera asistencia facultativa, tratamiento médico o quirúrgico", "Solo una primera asistencia", "Hospitalización de más de 24 horas"], "Art. 147.1."],
        ["facil", "Golpear a otro sin causarle lesión se castiga con…", ["Multa de uno a dos meses", "Prisión de tres meses a un año", "No es delito"], "Art. 147.3."],
        ["media", "¿Cómo se persiguen las lesiones leves del art. 147.2?", ["Mediante denuncia del agraviado o su representante legal", "De oficio", "Solo por querella del fiscal"], "Art. 147.4."],
        ["media", "Causar a otro la pérdida de un sentido se castiga con prisión de…", ["Seis a doce años", "Tres a seis años", "Dos a cinco años"], "Art. 149.1."],
        ["media", "Causar una deformidad (no grave) se castiga con prisión de…", ["Tres a seis años", "Seis a doce años", "Uno a tres años"], "Art. 150."],
        ["dificil", "¿Se considera tratamiento médico la simple vigilancia o seguimiento facultativo de la lesión?", ["No", "Sí", "Solo si dura más de un mes"], "Art. 147.1, último inciso."],
        ["media", "Las lesiones del 147.1 causadas con un instrumento concretamente peligroso pueden castigarse con prisión de…", ["Dos a cinco años", "Seis a doce años", "Tres meses a tres años"], "Art. 148.1.º."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Lesiones por imprudencia grave (art. 152.1)", "Del 147.1: prisión de 3 a 6 meses o multa de 6 a 18 meses; del 149: prisión de 1 a 3 años; del 150: prisión de 6 meses a 2 años"],
        ["Lesiones por imprudencia grave con vehículo", "Además, privación del derecho a conducir de uno a cuatro años (art. 152.1)"],
        ["Lesiones por imprudencia menos grave (art. 152.2)", "Del 147.1: multa de 1 a 2 meses; de los arts. 149 y 150: multa de 3 a 12 meses; solo perseguible por denuncia del agraviado"],
        ["Art. 153.1: violencia sobre la mujer", "Menoscabo psíquico, lesión leve o maltrato de obra a la esposa o mujer con análoga relación de afectividad aun sin convivencia, o a persona especialmente vulnerable conviviente: prisión de 6 meses a 1 año o TBC de 31 a 80 días y privación de armas de 1 año y 1 día a 3 años"],
        ["Art. 153.2: violencia doméstica", "Mismas conductas sobre las personas del art. 173.2 no incluidas en el 153.1: prisión de 3 meses a 1 año o TBC de 31 a 80 días y privación de armas"],
        ["Agravación del art. 153.3", "Pena en su mitad superior si hay menores presentes, se usan armas, ocurre en el domicilio común o de la víctima, o se quebranta una pena o medida del art. 48"],
        ["Atenuación del art. 153.4", "El juez puede imponer la pena inferior en grado razonándolo en sentencia"],
      ],
      preguntas: [
        ["media", "Maltratar de obra sin causar lesión a la expareja mujer se castiga, según el art. 153.1, con prisión de…", ["Seis meses a un año o TBC de 31 a 80 días", "Multa de uno a dos meses", "Dos a cinco años"], "Art. 153.1."],
        ["media", "¿Exige el art. 153.1 que haya convivencia con la mujer?", ["No: aun sin convivencia", "Sí, siempre", "Solo si hay hijos"], "Art. 153.1."],
        ["media", "Las penas del art. 153 se imponen en su mitad superior si el delito se comete…", ["En presencia de menores", "En la vía pública", "De noche"], "Art. 153.3."],
        ["media", "Las lesiones del art. 149 por imprudencia grave se castigan con prisión de…", ["Uno a tres años", "Seis meses a dos años", "Tres a seis meses"], "Art. 152.1.2.º."],
        ["dificil", "¿Cómo se persigue el delito de lesiones por imprudencia menos grave del art. 152.2?", ["Solo mediante denuncia del agraviado o su representante legal", "De oficio", "Por querella del fiscal"], "Art. 152.2, último párrafo."],
        ["media", "En el art. 153 se impone en todo caso la privación del derecho a la tenencia y porte de armas de…", ["Un año y un día a tres años", "Tres meses a un año", "Cinco a diez años"], "Art. 153.1 y 2."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Riña tumultuaria (art. 154)", "Riñen entre sí acometiéndose tumultuariamente y usando medios o instrumentos que pongan en peligro la vida o integridad: prisión de 3 meses a 1 año o multa de 6 a 24 meses"],
        ["Consentimiento en las lesiones (art. 155)", "Si es válido, libre, espontáneo y expreso, pena inferior en uno o dos grados; no vale el de un menor o de persona con discapacidad necesitada de especial protección"],
        ["Consentimiento que exime (art. 156)", "En trasplantes de órganos conforme a la ley, esterilizaciones y cirugía transexual por facultativo, salvo vicio, precio, minoría de edad o falta absoluta de aptitud"],
        ["Tráfico de órganos (art. 156 bis)", "Promover, favorecer, facilitar, publicitar o ejecutar el tráfico de órganos humanos: prisión de 6 a 12 años (persona viva) o de 3 a 6 años (fallecida)"],
        ["Art. 156 ter", "Difundir por internet contenidos destinados a incitar a la autolesión de menores o personas con discapacidad necesitadas de especial protección: prisión de 6 meses a 3 años"],
        ["Art. 156 quinquies", "Por lesiones a menores puede imponerse inhabilitación para actividades con contacto regular y directo con menores"],
      ],
      preguntas: [
        ["media", "La riña tumultuaria exige que se utilicen…", ["Medios o instrumentos que pongan en peligro la vida o integridad", "Armas de fuego exclusivamente", "Más de diez personas"], "Art. 154."],
        ["media", "El consentimiento válido del ofendido en unas lesiones…", ["Rebaja la pena en uno o dos grados", "Exime siempre", "No tiene efecto"], "Art. 155."],
        ["facil", "¿Es válido el consentimiento de un menor de edad en las lesiones?", ["No", "Sí", "Solo si tiene 16 años"], "Art. 155, párrafo segundo."],
        ["dificil", "El tráfico de órganos de una persona viva se castiga con prisión de…", ["Seis a doce años", "Tres a seis años", "Uno a cuatro años"], "Art. 156 bis.1."],
        ["media", "¿En qué supuestos exime de responsabilidad el consentimiento válido?", ["Trasplantes conforme a la ley, esterilizaciones y cirugía transexual por facultativo", "Cualquier lesión", "Las peleas deportivas"], "Art. 156."],
      ],
    },
  ],
  glosario: [
    [S1, "Asesinato", "Matar a otro con alevosía, precio, ensañamiento o para facilitar o encubrir otro delito."],
    [S1, "Prisión permanente revisable", "Pena del asesinato agravado del art. 140."],
    [S2, "Imprudencia grave", "Infracción relevante del deber de cuidado; en tráfico, la conducción con velocidad o alcohol/drogas del art. 379 que determina el resultado."],
    [S2, "Eutanasia", "Causar la muerte a petición expresa de quien sufre un padecimiento grave; impune si se cumple su ley orgánica."],
    [S3, "Tratamiento médico", "Actuación curativa posterior a la primera asistencia; elemento del delito de lesiones del art. 147.1."],
    [S3, "Maltrato de obra", "Golpear o maltratar físicamente sin causar lesión."],
    [S4, "Violencia doméstica", "Violencia sobre las personas del art. 173.2 (familiares y convivientes)."],
    [S5, "Riña tumultuaria", "Acometimiento recíproco y confuso entre varios con medios peligrosos."],
  ],
  casos: [
    {
      slug: "caso-atropello-alcohol-paso-peatones",
      titulo: "Un atropello mortal",
      supuesto: "Un conductor atropella a dos peatones en un paso de peatones del Paseo Independencia. Uno fallece y el otro sufre la pérdida de una pierna. La prueba de alcoholemia arroja una tasa superior a la penal y el atestado concluye que el alcohol determinó el atropello.",
      preguntas: [
        [S2, "media", "La muerte del peatón se califica como homicidio por imprudencia…", ["Grave, porque la circunstancia del art. 379 determinó el hecho", "Menos grave", "Leve"], "Art. 142.1."],
        [S2, "media", "Pena de prisión del homicidio por imprudencia grave…", ["De uno a cuatro años", "De tres a dieciocho meses", "De diez a quince años"], "Art. 142.1."],
        [S2, "media", "Además, por usar un vehículo a motor, se impone privación del permiso de…", ["Uno a seis años", "Tres a dieciocho meses", "Diez años"], "Art. 142.1."],
        [S3, "media", "La pérdida de una pierna (miembro principal) corresponde a las lesiones del…", ["Art. 149", "Art. 150", "Art. 147.2"], "Art. 149.1."],
        [S4, "media", "Esas lesiones causadas por imprudencia grave se castigan con prisión de…", ["Uno a tres años", "Seis meses a dos años", "Tres a seis meses"], "Art. 152.1.2.º."],
        [S2, "dificil", "Al haber un muerto y un lesionado del art. 149, el juez puede, si hay notoria gravedad…", ["Imponer la pena superior en un grado", "Imponer prisión permanente revisable", "Rebajar la pena"], "Art. 142 bis."],
        [S2, "media", "¿Requiere denuncia de los perjudicados para perseguirse?", ["No, es perseguible de oficio", "Sí", "Solo la del fallecido"], "La denuncia solo se exige en la imprudencia menos grave sin vehículo (art. 142.2)."],
        [S4, "media", "Si las lesiones se hubieran causado por imprudencia grave con vehículo, la privación del permiso por las lesiones sería de…", ["Uno a cuatro años", "Uno a seis años", "Tres a dieciocho meses"], "Art. 152.1."],
        [S1, "media", "Si el conductor hubiera buscado deliberadamente atropellar a los peatones para matarlos, el hecho sería…", ["Un delito doloso de homicidio o asesinato", "Homicidio imprudente", "Lesiones leves"], "Arts. 138-139."],
        [S2, "dificil", "Si la imprudencia fuera menos grave por una infracción grave de tráfico determinante, la pena del homicidio sería…", ["Multa de tres a dieciocho meses", "Prisión de uno a cuatro años", "TBC"], "Art. 142.2."],
      ],
    },
    {
      slug: "caso-agresion-expareja-domicilio",
      titulo: "Una agresión en el domicilio",
      supuesto: "La Policía Local acude a un domicilio por una llamada vecinal. Un hombre ha empujado y abofeteado a su exnovia, con la que no convive, sin causarle lesión que requiera tratamiento. Los hechos han ocurrido en el domicilio de ella y en presencia de su hija menor. Él tenía en vigor una prohibición de aproximarse a ella.",
      preguntas: [
        [S4, "media", "El maltrato de obra a la exnovia se encuadra en el…", ["Art. 153.1", "Art. 147.3", "Art. 148"], "Art. 153.1: mujer ligada al autor por análoga relación de afectividad aun sin convivencia."],
        [S4, "facil", "¿Excluye el art. 153.1 a la expareja con la que no convive?", ["No, se aplica aun sin convivencia", "Sí", "Solo si estuvieron casados"], "Art. 153.1."],
        [S4, "media", "¿Qué pena prevé el art. 153.1?", ["Prisión de seis meses a un año o TBC de 31 a 80 días, y privación de armas", "Multa de uno a dos meses", "Prisión de dos a cinco años"], "Art. 153.1."],
        [S4, "media", "Haberlo cometido en el domicilio de la víctima y ante una menor supone…", ["Imponer la pena en su mitad superior", "Rebajarla", "Ningún efecto"], "Art. 153.3."],
        [S4, "media", "Haber quebrantado una prohibición del art. 48 implica también…", ["La mitad superior de la pena", "La pena inferior en grado", "La exención"], "Art. 153.3."],
        [S3, "media", "Si la bofetada hubiera causado una lesión que requiriera tratamiento médico, al ser la víctima su expareja mujer, las lesiones podrían castigarse con prisión de…", ["Dos a cinco años (art. 148.4.º)", "Seis a doce años", "Multa"], "Art. 148.4.º."],
        [S4, "dificil", "¿Puede el juez imponer la pena inferior en grado?", ["Sí, razonándolo en sentencia atendiendo a las circunstancias", "No, nunca", "Solo si la víctima lo pide"], "Art. 153.4."],
        [S4, "media", "¿Requiere este delito denuncia de la víctima para perseguirse?", ["No: la exigencia de denuncia del art. 147.4 no alcanza al art. 153", "Sí", "Solo si es menor"], "Arts. 147.4 y 153."],
        [S1, "media", "Si el agresor matara a la víctima y tuvieran un hijo en común, la autoridad judicial impondría además…", ["La privación de la patria potestad", "Una multa", "Nada más"], "Art. 140 bis.2."],
        [S5, "media", "¿Rebajaría la pena que la víctima perdonara después al agresor?", ["No: el consentimiento del art. 155 debe ser previo y no es perdón posterior", "Sí, siempre", "Exime"], "Art. 155 se refiere al consentimiento en el hecho."],
      ],
    },
    {
      slug: "caso-pelea-salida-discoteca",
      titulo: "Una pelea a la salida de una discoteca",
      supuesto: "A la salida de una discoteca, dos grupos se enzarzan en una pelea confusa en la que se usan botellas rotas y cinturones. Un joven recibe un corte en la cara que, tras los puntos de sutura, le deja una cicatriz visible. Otro recibe un puñetazo que solo requiere una primera asistencia.",
      preguntas: [
        [S5, "media", "Participar en el acometimiento tumultuario usando botellas rotas puede constituir…", ["Riña tumultuaria", "Desórdenes públicos exclusivamente", "Nada"], "Art. 154."],
        [S5, "media", "Pena de la riña tumultuaria…", ["Prisión de tres meses a un año o multa de seis a 24 meses", "Prisión de dos a cinco años", "Multa de uno a dos meses"], "Art. 154."],
        [S3, "media", "La sutura del corte constituye…", ["Tratamiento médico o quirúrgico", "Primera asistencia sin más", "Simple vigilancia"], "Art. 147.1."],
        [S3, "media", "Si la cicatriz constituye deformidad (no grave), la lesión es del…", ["Art. 150: prisión de tres a seis años", "Art. 149", "Art. 147.2"], "Art. 150."],
        [S3, "media", "Usar una botella rota como instrumento concretamente peligroso permite la agravación del…", ["Art. 148.1.º", "Art. 153", "Art. 154"], "Art. 148.1.º."],
        [S3, "media", "El puñetazo que solo requiere una primera asistencia es…", ["Lesión leve del art. 147.2", "Lesión del art. 147.1", "Maltrato sin lesión"], "Art. 147.2."],
        [S3, "facil", "¿Cómo se persigue esa lesión leve?", ["Por denuncia del agraviado o su representante legal", "De oficio", "No es perseguible"], "Art. 147.4."],
        [S1, "dificil", "Si uno de los participantes hubiera matado a otro con alevosía, el delito sería…", ["Asesinato", "Homicidio imprudente", "Riña"], "Art. 139.1.1.ª."],
        [S3, "media", "Si el lesionado tuviera 13 años, las lesiones del 147.1 podrían castigarse con…", ["Prisión de dos a cinco años", "Multa de uno a tres meses", "Prisión de seis a doce años"], "Art. 148.3.º."],
        [S5, "dificil", "¿Exime que el lesionado hubiera aceptado pelear?", ["No; si fuera consentimiento válido solo rebajaría la pena en uno o dos grados", "Sí", "Exime en las peleas"], "Art. 155."],
      ],
    },
  ],
});

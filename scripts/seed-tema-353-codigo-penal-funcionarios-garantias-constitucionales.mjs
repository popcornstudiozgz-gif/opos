/**
 * Crea tema-353 — Tema 26 de Policía Local: "Delitos cometidos por los
 * funcionarios públicos contra las garantías constitucionales (Libro II,
 * Título XXI, Capítulo V)."
 *
 * Fuente: Ley Orgánica 10/1995, del Código Penal (BOE-A-1995-25444), texto
 * consolidado del BOE leído íntegro en los arts. 529 a 542.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-353-codigo-penal-funcionarios-garantias-constitucionales.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const CP = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444";
const a = (ancla) => `${CP}#${ancla}`;
const S1 = "libertad-individual";
const S2 = "inviolabilidad-domicilio-intimidad";
const S3 = "otros-derechos-individuales";

await sembrarTema({
  tema: {
    slug: "tema-353",
    titulo: "Código Penal: delitos de los funcionarios públicos contra las garantías constitucionales",
    descripcion: "Entrega ilegal de una causa criminal; privación de libertad e incomunicación con violación de plazos o garantías, mediando causa por delito; modalidad imprudente; rigor innecesario con reclusos; entrada en domicilio y registro sin respetar las garantías; vejaciones en un registro lícito; interceptación de correspondencia y de telecomunicaciones; impedir la asistencia letrada o no informar al detenido de sus derechos; censura previa y secuestro de publicaciones; disolución de asociaciones; prohibición o disolución ilegal de reuniones; expropiación ilegal; impedir otros derechos cívicos.",
    contenido: "Recorre el Capítulo V del Título XXI del Libro II del Código Penal (arts. 529 a 542), los delitos que puede cometer un agente cuando, interviniendo en una causa por delito, no respeta las garantías de la Constitución y de la ley: alargar una detención más allá del plazo, registrar un domicilio sin autorización ni consentimiento, intervenir comunicaciones sin garantías, impedir al detenido la asistencia de abogado o no informarle de sus derechos, o disolver una reunión pacífica fuera de los casos legales.",
    enlaces_boe: [{ url: CP, titulo: "Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal (BOE-A-1995-25444)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Delitos contra la libertad individual", articulos: "arts. 529-533", url: a("a529") },
      { seccion: S2, titulo: "Delitos contra la inviolabilidad domiciliaria y demás garantías de la intimidad", articulos: "arts. 534-536", url: a("a534") },
      { seccion: S3, titulo: "Delitos contra otros derechos individuales", articulos: "arts. 537-542", url: a("a537") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 26 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Rúbrica del Capítulo V del Título XXI", "«De los delitos cometidos por los funcionarios públicos contra las garantías constitucionales», dividido en tres secciones: libertad individual, inviolabilidad domiciliaria e intimidad, y otros derechos individuales"],
        ["Entrega ilegal de una causa (art. 529)", "El juez que entrega una causa criminal a otra autoridad que ilegalmente la reclama: inhabilitación especial de 6 meses a 2 años; si entrega además al detenido, pena superior en grado"],
        ["Privación de libertad con violación de garantías (art. 530)", "Mediando causa por delito, acordar, practicar o prolongar la privación de libertad de un detenido, preso o sentenciado violando plazos o garantías: inhabilitación especial de 4 a 8 años"],
        ["Incomunicación ilegal (art. 531)", "Mediando causa por delito, decretar, practicar o prolongar la incomunicación violando plazos o garantías: inhabilitación especial de 2 a 6 años"],
        ["Modalidad imprudente (art. 532)", "Los hechos de los arts. 530 y 531 por imprudencia grave: suspensión de empleo o cargo de 6 meses a 2 años"],
        ["Rigor innecesario con internos (art. 533)", "Funcionario penitenciario o de centros de menores que impone sanciones o privaciones indebidas o usa rigor innecesario: inhabilitación especial de 2 a 6 años"],
        ["Diferencia con la detención ilegal del art. 167", "El art. 530 exige que medie causa por delito y se violen plazos o garantías; el 167 castiga la detención sin mediar causa por delito"],
      ],
      preguntas: [
        ["media", "El agente que, mediando causa por delito, prolonga la detención de un detenido más allá del plazo legal comete…", ["El delito del art. 530", "Detención ilegal del art. 163", "Ningún delito"], "Art. 530."],
        ["media", "¿Qué pena tiene el delito del art. 530?", ["Inhabilitación especial de cuatro a ocho años", "Prisión de cuatro a seis años", "Multa de seis a doce meses"], "Art. 530."],
        ["media", "Prolongar la incomunicación de un detenido violando las garantías legales se castiga con…", ["Inhabilitación especial de dos a seis años", "Suspensión de seis meses", "Prisión de uno a tres años"], "Art. 531."],
        ["dificil", "Si la prolongación de la detención se produce por imprudencia grave, la pena es…", ["Suspensión de empleo o cargo de seis meses a dos años", "Inhabilitación de cuatro a ocho años", "No es delito"], "Art. 532."],
        ["dificil", "¿Qué distingue el delito del art. 530 de la detención ilegal cometida por funcionario del art. 167?", ["Que en el 530 media causa por delito y se violan plazos o garantías", "Que el 530 lo comete un particular", "No hay diferencia"], "Arts. 167.1 y 530."],
        ["media", "El funcionario de un centro de menores que usa un rigor innecesario con los internos comete el delito del…", ["Art. 533", "Art. 174", "Art. 530"], "Art. 533."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Entrada y registro sin garantías (art. 534.1)", "Mediando causa por delito y sin respetar las garantías: entrar en un domicilio sin consentimiento del morador o registrar papeles o efectos sin consentimiento libre del dueño: multa de 6 a 12 meses e inhabilitación de 2 a 6 años"],
        ["No devolver lo registrado (art. 534.1)", "Si no devuelve inmediatamente los papeles o efectos registrados: inhabilitación de 6 a 12 años y multa de 12 a 24 meses, más la pena por la apropiación"],
        ["Vejaciones en un registro lícito (art. 534.2)", "Cometer vejación injusta o daño innecesario en los bienes: penas de esos hechos en su mitad superior e inhabilitación de 2 a 6 años"],
        ["Interceptación de correspondencia (art. 535)", "Mediando causa por delito, interceptar correspondencia privada, postal o telegráfica violando las garantías: inhabilitación de 2 a 6 años; si la divulga, mitad superior y multa"],
        ["Interceptación de telecomunicaciones (art. 536)", "Autoridad, funcionario o agente que, mediando causa por delito, intercepta telecomunicaciones o usa artificios de escucha o grabación violando garantías: inhabilitación de 2 a 6 años"],
        ["Diferencia con los arts. 198 y 204", "Los arts. 534-536 exigen que medie causa por delito; si no media causa legal por delito, se aplican los arts. 198 (intimidad) y 204 (allanamiento)"],
      ],
      preguntas: [
        ["media", "El agente que, investigando un delito, entra en un domicilio sin consentimiento del morador ni las garantías legales comete el delito del…", ["Art. 534.1", "Art. 202", "Art. 530"], "Art. 534.1.1.º."],
        ["media", "Pena del art. 534.1…", ["Multa de seis a doce meses e inhabilitación especial de dos a seis años", "Prisión de dos a cinco años", "Suspensión de un mes"], "Art. 534.1."],
        ["media", "Si en un registro lícito el agente causa daños innecesarios en los bienes…", ["Penas de esos hechos en su mitad superior e inhabilitación de dos a seis años", "No hay delito por ser lícito", "Solo sanción disciplinaria"], "Art. 534.2."],
        ["dificil", "Si tras el registro no devuelve inmediatamente los efectos registrados…", ["Inhabilitación de seis a doce años y multa de doce a veinticuatro meses", "La misma pena básica", "No es delito"], "Art. 534.1, párrafo segundo."],
        ["media", "Intervenir las comunicaciones telefónicas de un investigado sin las garantías legales es delito del…", ["Art. 536", "Art. 535", "Art. 197"], "Art. 536."],
        ["media", "Si el agente divulga la información obtenida con la interceptación ilegal…", ["Inhabilitación en su mitad superior y multa de seis a dieciocho meses", "La pena se rebaja", "Nada cambia"], "Art. 536, párrafo segundo."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Derechos del detenido (art. 537)", "Impedir u obstaculizar la asistencia de abogado, procurar su renuncia o no informar de forma inmediata y comprensible de sus derechos y de las razones de la detención: multa de 4 a 10 meses e inhabilitación de 2 a 4 años"],
        ["Censura previa (art. 538)", "Establecer censura previa o, fuera de los casos legales, recoger ediciones o suspender publicaciones o emisiones: inhabilitación absoluta de 6 a 10 años"],
        ["Asociaciones (art. 539)", "Disolver o suspender una asociación legal sin resolución judicial, o impedir sin causa sus sesiones: inhabilitación especial de 8 a 12 años y multa de 6 a 12 meses"],
        ["Reuniones (art. 540)", "Prohibir una reunión pacífica o disolverla fuera de los casos expresamente permitidos por las leyes: inhabilitación especial de 4 a 8 años y multa de 6 a 9 meses"],
        ["Expropiación ilegal (art. 541)", "Expropiar bienes fuera de los casos permitidos y sin los requisitos legales: inhabilitación de 1 a 4 años y multa de 6 a 12 meses"],
        ["Otros derechos cívicos (art. 542)", "Impedir a sabiendas el ejercicio de otros derechos cívicos reconocidos por la Constitución y las leyes: inhabilitación especial de 1 a 4 años"],
      ],
      preguntas: [
        ["facil", "No informar al detenido de forma inmediata y comprensible de sus derechos es delito del…", ["Art. 537", "Art. 530", "Art. 542"], "Art. 537."],
        ["media", "Favorecer que el detenido renuncie a la asistencia de abogado se castiga con…", ["Multa de cuatro a diez meses e inhabilitación de dos a cuatro años", "Prisión de uno a tres años", "No es delito"], "Art. 537."],
        ["media", "Disolver una reunión pacífica fuera de los casos expresamente permitidos por las leyes es delito del…", ["Art. 540", "Art. 539", "Art. 556"], "Art. 540."],
        ["media", "Pena del art. 540…", ["Inhabilitación especial de cuatro a ocho años y multa de seis a nueve meses", "Inhabilitación absoluta de seis a diez años", "Prisión"], "Art. 540."],
        ["dificil", "Establecer la censura previa se castiga con…", ["Inhabilitación absoluta de seis a diez años", "Inhabilitación especial de uno a cuatro años", "Multa"], "Art. 538."],
        ["media", "Disolver una asociación legalmente constituida sin resolución judicial es delito del…", ["Art. 539", "Art. 540", "Art. 404"], "Art. 539."],
      ],
    },
  ],
  glosario: [
    [S1, "Garantías constitucionales", "Derechos y límites que la Constitución impone a la actuación del poder público frente a los ciudadanos (arts. 17, 18, 20, 21 y 22 CE)."],
    [S1, "Mediando causa por delito", "Que la actuación del funcionario se produce en el marco de la investigación o persecución de un delito."],
    [S1, "Incomunicación", "Régimen excepcional de un detenido o preso que restringe sus comunicaciones, sometido a plazos y garantías."],
    [S2, "Registro domiciliario", "Entrada e inspección de un domicilio; exige consentimiento del titular, resolución judicial o flagrante delito (art. 18.2 CE)."],
    [S2, "Interceptación de comunicaciones", "Captación del contenido de comunicaciones ajenas; exige garantías legales y autorización judicial."],
    [S3, "Censura previa", "Control previo de publicaciones o emisiones, prohibido por el art. 20.2 CE."],
    [S3, "Asistencia letrada", "Derecho del detenido a ser asistido por abogado en las diligencias policiales y judiciales (art. 17.3 CE)."],
  ],
  casos: [
    {
      slug: "caso-detenido-comisaria-plazos",
      titulo: "Un detenido sin abogado",
      supuesto: "Una patrulla detiene a un sospechoso de un robo con violencia. En dependencias policiales, un agente le dice que «es mejor que no llame a ningún abogado, que así acabaremos antes» y no le lee sus derechos hasta varias horas después. Por un descuido en el papeleo, el detenido permanece en calabozos más tiempo del permitido antes de pasar a disposición judicial.",
      preguntas: [
        [S3, "media", "Procurar que el detenido renuncie a la asistencia de abogado es delito del…", ["Art. 537", "Art. 530", "Art. 534"], "Art. 537."],
        [S3, "media", "No informarle de forma inmediata de sus derechos y de las razones de la detención…", ["También es delito del art. 537", "Es solo una irregularidad", "Es delito del art. 542"], "Art. 537."],
        [S3, "media", "Pena del art. 537…", ["Multa de cuatro a diez meses e inhabilitación especial de dos a cuatro años", "Prisión de tres a seis años", "Suspensión de un mes"], "Art. 537."],
        [S1, "media", "Prolongar por imprudencia grave la detención más allá del plazo legal, mediando causa por delito, es…", ["Delito del art. 532 en relación con el 530", "Atípico", "Detención ilegal del art. 163"], "Arts. 530 y 532."],
        [S1, "media", "Pena del art. 532…", ["Suspensión de empleo o cargo de seis meses a dos años", "Inhabilitación de cuatro a ocho años", "Multa"], "Art. 532."],
        [S1, "dificil", "Si la prolongación hubiera sido dolosa, la pena sería…", ["Inhabilitación especial de cuatro a ocho años", "Suspensión de seis meses a dos años", "Prisión de cuatro a seis años"], "Art. 530."],
        [S1, "media", "El delito del art. 530 exige que medie…", ["Causa por delito", "Denuncia de la víctima", "Orden escrita del superior"], "Art. 530."],
        [S2, "media", "Si el agente hubiera registrado el móvil del detenido sin autorización ni consentimiento, mediando causa por delito, podría cometer el delito del…", ["Art. 534 o 536, según la conducta", "Art. 537", "Ninguno"], "Arts. 534 y 536."],
        [S3, "facil", "¿Qué capítulo del Código recoge estos delitos?", ["Capítulo V del Título XXI del Libro II", "Título XIX", "Título XXII"], "Capítulo V."],
        [S1, "dificil", "Si decretara su incomunicación sin respetar los plazos legales…", ["Delito del art. 531: inhabilitación especial de dos a seis años", "Delito del art. 537", "No es delito"], "Art. 531."],
      ],
    },
    {
      slug: "caso-registro-sin-autorizacion",
      titulo: "Un registro sin autorización",
      supuesto: "En una investigación por tráfico de drogas, dos agentes entran en un piso sin autorización judicial, sin consentimiento del morador y sin que exista flagrante delito. Durante el registro rompen muebles sin necesidad y se llevan unos documentos que no devuelven. Además, uno de ellos graba con una aplicación las conversaciones del sospechoso con su abogado.",
      preguntas: [
        [S2, "media", "Entrar en el domicilio sin consentimiento del morador ni las garantías legales, mediando causa por delito, es delito del…", ["Art. 534.1.1.º", "Art. 202", "Art. 540"], "Art. 534.1."],
        [S2, "media", "No devolver inmediatamente los documentos registrados supone…", ["Inhabilitación de seis a doce años y multa de doce a veinticuatro meses", "Ningún agravamiento", "Solo responsabilidad civil"], "Art. 534.1, párrafo segundo."],
        [S2, "dificil", "¿Se castiga además la apropiación de los documentos?", ["Sí, sin perjuicio de la pena que corresponda por la apropiación", "No", "Solo si valen más de 400 euros"], "Art. 534.1, párrafo segundo."],
        [S2, "media", "Romper muebles sin necesidad en un registro, aunque fuera lícito, sería…", ["Delito del art. 534.2", "Atípico", "Solo falta"], "Art. 534.2."],
        [S2, "media", "Grabar las conversaciones con artificios técnicos violando las garantías es delito del…", ["Art. 536", "Art. 535", "Art. 537"], "Art. 536."],
        [S2, "media", "Pena básica del art. 536…", ["Inhabilitación especial de dos a seis años", "Prisión de uno a cuatro años", "Multa de seis meses"], "Art. 536."],
        [S3, "media", "Interferir en la comunicación con el abogado afecta también al derecho protegido en el…", ["Art. 537 (asistencia letrada)", "Art. 539", "Art. 541"], "Art. 537."],
        [S2, "dificil", "Si no hubiera mediado causa por delito alguna, el allanamiento por funcionario se castigaría en el…", ["Art. 204", "Art. 534", "Art. 530"], "Art. 204."],
        [S2, "media", "¿Hay delito del art. 534 si el morador consiente libremente la entrada?", ["No, el tipo exige falta de consentimiento", "Sí", "Solo si es de noche"], "Art. 534.1.1.º."],
        [S2, "media", "Si divulgaran el contenido de lo grabado…", ["Inhabilitación en su mitad superior y multa de seis a dieciocho meses", "Sin cambios", "Rebaja de pena"], "Art. 536, párrafo segundo."],
      ],
    },
    {
      slug: "caso-disolucion-concentracion-pacifica",
      titulo: "Una concentración disuelta",
      supuesto: "Un grupo de vecinos se concentra pacíficamente ante la Junta Municipal de su distrito, comunicada en forma, para protestar por el cierre de un centro de salud. Un mando ordena disolverla sin que concurra ninguno de los casos previstos en las leyes y retira las pancartas de una asociación vecinal, cuyas reuniones también impide en un local municipal cedido.",
      preguntas: [
        [S3, "media", "Disolver una reunión pacífica fuera de los casos permitidos por las leyes es delito del…", ["Art. 540", "Art. 539", "Art. 538"], "Art. 540."],
        [S3, "media", "Pena del art. 540…", ["Inhabilitación especial de cuatro a ocho años y multa de seis a nueve meses", "Inhabilitación absoluta", "Prisión de uno a tres años"], "Art. 540."],
        [S3, "media", "Impedir sin causa legítima las sesiones de una asociación legalmente constituida es delito del…", ["Art. 539", "Art. 540", "Art. 542"], "Art. 539."],
        [S3, "dificil", "Pena del art. 539…", ["Inhabilitación especial de ocho a doce años y multa de seis a doce meses", "Inhabilitación de cuatro a ocho años", "Multa solo"], "Art. 539."],
        [S3, "media", "¿Podría disolverse una asociación sin resolución judicial?", ["No, el art. 539 castiga hacerlo sin previa resolución judicial", "Sí, por orden policial", "Sí, si molesta"], "Art. 539."],
        [S3, "media", "Impedir a sabiendas otros derechos cívicos reconocidos en la Constitución se castiga en el…", ["Art. 542", "Art. 538", "Art. 529"], "Art. 542."],
        [S3, "media", "¿Qué derecho constitucional protege el art. 540?", ["El de reunión pacífica", "El de propiedad", "El de huelga"], "Art. 540 y art. 21 CE."],
        [S3, "dificil", "Si se tratara de recoger sin base legal las ediciones de una revista vecinal, el delito sería el del…", ["Art. 538", "Art. 540", "Art. 541"], "Art. 538."],
        [S3, "media", "El sujeto activo de estos delitos es…", ["Una autoridad o funcionario público", "Cualquier persona", "Solo los jueces"], "Arts. 537-542."],
        [S3, "media", "¿Exige el art. 540 que la reunión sea pacífica?", ["Sí", "No", "Solo si es en un local"], "Art. 540."],
      ],
    },
  ],
});

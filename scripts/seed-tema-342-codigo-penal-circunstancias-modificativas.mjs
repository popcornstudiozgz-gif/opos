/**
 * Crea tema-342 — Tema 15 de Policía Local: "Circunstancias modificativas de
 * la responsabilidad criminal (Libro I, Título I, Capítulo II, III, IV, V y
 * VI)."
 *
 * Fuente: Ley Orgánica 10/1995, del Código Penal (BOE-A-1995-25444), texto
 * consolidado del BOE leído íntegro en los arts. 19 a 26. El art. 22
 * (agravantes) se toma en su redacción vigente desde el 10-04-2026, que
 * incluye la aporofobia, la exclusión social y los motivos antigitanos en
 * la agravante 4.ª.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-342-codigo-penal-circunstancias-modificativas.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const CP = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444";
const a = (ancla) => `${CP}#${ancla}`;
const S1 = "eximentes";
const S2 = "atenuantes";
const S3 = "agravantes";
const S4 = "parentesco-disposiciones-generales";

await sembrarTema({
  tema: {
    slug: "tema-342",
    titulo: "Código Penal: circunstancias que eximen, atenúan o agravan la responsabilidad criminal",
    descripcion: "Minoría de edad penal; eximentes de anomalía o alteración psíquica, intoxicación plena y síndrome de abstinencia, alteraciones de la percepción, legítima defensa, estado de necesidad, miedo insuperable y cumplimiento de un deber; atenuantes (eximentes incompletas, grave adicción, arrebato u obcecación, confesión, reparación del daño, dilaciones indebidas y analógica); agravantes (alevosía, disfraz y abuso de superioridad, precio, discriminación, ensañamiento, abuso de confianza, prevalimiento del carácter público y reincidencia); circunstancia mixta de parentesco; conceptos penales de autoridad, funcionario público, discapacidad y documento.",
    contenido: "Recorre los arts. 19 a 26 del Código Penal: quién no responde con arreglo al Código (los menores de 18 años), las siete eximentes del art. 20 con los requisitos de la legítima defensa y del estado de necesidad, las atenuantes del art. 21, las agravantes del art. 22 en su redacción de 2026, la circunstancia mixta de parentesco y las definiciones de autoridad, funcionario, discapacidad y documento que usa todo el Código.",
    enlaces_boe: [{ url: CP, titulo: "Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal (BOE-A-1995-25444)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Causas que eximen de la responsabilidad criminal", articulos: "arts. 19-20", url: a("a19") },
      { seccion: S2, titulo: "Circunstancias atenuantes", articulos: "art. 21", url: a("a21") },
      { seccion: S3, titulo: "Circunstancias agravantes", articulos: "art. 22", url: a("a22") },
      { seccion: S4, titulo: "Circunstancia mixta de parentesco y disposiciones generales", articulos: "arts. 23-26", url: a("a23") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 15 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Menores de edad (art. 19)", "Los menores de 18 años no son responsables criminalmente con arreglo al Código; pueden serlo conforme a la ley de responsabilidad penal del menor"],
        ["Eximente 1.ª (art. 20)", "Anomalía o alteración psíquica que impida comprender la ilicitud del hecho o actuar conforme a esa comprensión"],
        ["¿Exime el trastorno mental transitorio provocado para delinquir?", "No, si se provocó con el propósito de cometer el delito o se previó o debió prever su comisión (art. 20.1.º)"],
        ["Eximente 2.ª (art. 20)", "Intoxicación plena por alcohol, drogas u otras sustancias no buscada para delinquir, o síndrome de abstinencia que impida comprender la ilicitud o actuar conforme a ello"],
        ["Eximente 3.ª (art. 20)", "Alteraciones en la percepción desde el nacimiento o la infancia que alteren gravemente la conciencia de la realidad"],
        ["Requisitos de la legítima defensa (art. 20.4.º)", "Agresión ilegítima, necesidad racional del medio empleado y falta de provocación suficiente por parte del defensor"],
        ["Agresión ilegítima en defensa de bienes y de la morada", "Bienes: ataque que constituya delito y los ponga en grave peligro de deterioro o pérdida inminentes. Morada: la entrada indebida en ella o sus dependencias"],
        ["Requisitos del estado de necesidad (art. 20.5.º)", "Que el mal causado no sea mayor que el que se evita, que la situación no se haya provocado intencionadamente y que el necesitado no tenga obligación de sacrificarse por su oficio o cargo"],
        ["Eximentes 6.ª y 7.ª (art. 20)", "Miedo insuperable; obrar en cumplimiento de un deber o en el ejercicio legítimo de un derecho, oficio o cargo"],
        ["¿Qué se aplica en las tres primeras eximentes?", "En su caso, las medidas de seguridad previstas en el Código (art. 20, último párrafo)"],
      ],
      preguntas: [
        ["facil", "Según el art. 19 CP, no son responsables criminalmente con arreglo a este Código…", ["Los menores de dieciocho años", "Los menores de dieciséis años", "Los menores de catorce años"], "Art. 19."],
        ["media", "¿Cuál NO es requisito de la legítima defensa?", ["Que el mal causado no sea mayor que el que se evita", "Agresión ilegítima", "Falta de provocación suficiente por parte del defensor"], "El requisito citado es del estado de necesidad (art. 20.5.º)."],
        ["media", "En defensa de la morada, se reputa agresión ilegítima…", ["La entrada indebida en aquella o sus dependencias", "Cualquier insulto desde la calle", "La mera presencia de un desconocido en la acera"], "Art. 20.4.º, primero."],
        ["media", "Un requisito del estado de necesidad es que el necesitado…", ["No tenga, por su oficio o cargo, obligación de sacrificarse", "Sea mayor de edad", "Haya provocado la situación"], "Art. 20.5.º, tercero."],
        ["dificil", "El trastorno mental transitorio NO exime cuando…", ["Fue provocado con el propósito de cometer el delito o se previó o debió prever su comisión", "Dura menos de 24 horas", "Lo diagnostica un médico privado"], "Art. 20.1.º, párrafo segundo."],
        ["media", "El agente que usa la fuerza en el ejercicio legítimo de su cargo puede quedar amparado por la eximente de…", ["Cumplimiento de un deber o ejercicio legítimo de un oficio o cargo", "Miedo insuperable", "Estado de necesidad"], "Art. 20.7.º."],
        ["media", "¿En qué eximentes pueden aplicarse medidas de seguridad?", ["En las de los tres primeros números del art. 20", "En todas", "Solo en el miedo insuperable"], "Art. 20, último párrafo."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Atenuante 1.ª (art. 21)", "Las eximentes del capítulo anterior cuando no concurren todos sus requisitos (eximente incompleta)"],
        ["Atenuante 2.ª (art. 21)", "Actuar a causa de grave adicción a alcohol, drogas u otras sustancias del art. 20.2.º"],
        ["Atenuante 3.ª (art. 21)", "Obrar por causas o estímulos tan poderosos que produzcan arrebato, obcecación u otro estado pasional semejante"],
        ["Atenuante 4.ª: confesión", "Confesar la infracción a las autoridades antes de conocer que el procedimiento judicial se dirige contra el culpable"],
        ["Atenuante 5.ª: reparación del daño", "Reparar el daño a la víctima o disminuir sus efectos en cualquier momento del procedimiento y antes del juicio oral"],
        ["Atenuante 6.ª: dilaciones indebidas", "Dilación extraordinaria e indebida del procedimiento no atribuible al inculpado y desproporcionada con la complejidad de la causa"],
        ["Atenuante 7.ª", "Cualquier otra circunstancia de análoga significación que las anteriores (atenuante analógica)"],
      ],
      preguntas: [
        ["media", "Para que la confesión atenúe, debe hacerse…", ["Antes de conocer que el procedimiento judicial se dirige contra el culpable", "En el juicio oral", "Después de la sentencia"], "Art. 21.4.ª."],
        ["media", "¿Hasta cuándo puede repararse el daño para que opere la atenuante 5.ª?", ["Antes de la celebración del acto del juicio oral", "Hasta la sentencia firme", "Solo en las primeras 72 horas"], "Art. 21.5.ª."],
        ["media", "Si en una legítima defensa falta la necesidad racional del medio, se aprecia…", ["Una eximente incompleta, que atenúa", "La eximente completa", "Una agravante"], "Art. 21.1.ª."],
        ["facil", "El arrebato u obcecación es una circunstancia…", ["Atenuante", "Agravante", "Eximente"], "Art. 21.3.ª."],
        ["dificil", "La atenuante de dilaciones indebidas exige que la dilación…", ["No sea atribuible al inculpado y no guarde proporción con la complejidad de la causa", "Supere siempre cinco años", "La reconozca el Ministerio Fiscal"], "Art. 21.6.ª."],
        ["media", "¿Admite el art. 21 CP atenuantes no enumeradas expresamente?", ["Sí, las de análoga significación", "No", "Solo si lo decide el Gobierno"], "Art. 21.7.ª."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Alevosía (art. 22.1.ª)", "Emplear en los delitos contra las personas medios, modos o formas que aseguren la ejecución sin el riesgo que pudiera proceder de la defensa del ofendido"],
        ["Agravante 2.ª (art. 22)", "Disfraz, abuso de superioridad o aprovechar circunstancias de lugar, tiempo o auxilio de otros que debiliten la defensa o faciliten la impunidad"],
        ["Agravante 3.ª (art. 22)", "Ejecutar el hecho mediante precio, recompensa o promesa"],
        ["Agravante 4.ª: discriminación (redacción de 2026)", "Motivos racistas, antisemitas, antigitanos u otra discriminación por ideología, religión, etnia, sexo, edad, orientación o identidad sexual o de género, razones de género, aporofobia o exclusión social, enfermedad o discapacidad"],
        ["¿Debe concurrir realmente en la víctima la condición discriminada?", "No: se aplica con independencia de que esas condiciones concurran efectivamente en la persona (art. 22.4.ª)"],
        ["Ensañamiento (art. 22.5.ª)", "Aumentar deliberada e inhumanamente el sufrimiento de la víctima con padecimientos innecesarios para ejecutar el delito"],
        ["Agravantes 6.ª y 7.ª", "Obrar con abuso de confianza; prevalerse del carácter público que tenga el culpable"],
        ["Reincidencia (art. 22.8.ª)", "Haber sido condenado ejecutoriamente por un delito del mismo título del Código y de la misma naturaleza"],
        ["Antecedentes que no computan para la reincidencia", "Los cancelados o que debieran serlo y los de delitos leves (salvo los tipos de multirreincidencia de delitos leves)"],
        ["Condenas en otros Estados de la UE", "Producen efectos de reincidencia salvo que el antecedente esté o pudiera estar cancelado según el Derecho español"],
      ],
      preguntas: [
        ["media", "La alevosía se define en relación con los delitos…", ["Contra las personas", "Contra el patrimonio", "Contra la Administración Pública"], "Art. 22.1.ª."],
        ["facil", "Ejecutar el hecho mediante precio, recompensa o promesa es una circunstancia…", ["Agravante", "Atenuante", "Mixta"], "Art. 22.3.ª."],
        ["media", "Aumentar deliberada e inhumanamente el sufrimiento de la víctima es…", ["Ensañamiento", "Alevosía", "Abuso de superioridad"], "Art. 22.5.ª."],
        ["media", "Un funcionario que comete un delito aprovechando su condición puede ver agravada su pena por…", ["Prevalerse del carácter público", "Reincidencia", "Disfraz"], "Art. 22.7.ª."],
        ["dificil", "¿Computa para la reincidencia un antecedente cancelado?", ["No", "Sí, siempre", "Solo si es de un delito grave"], "Art. 22.8.ª, párrafo tercero."],
        ["media", "Para la reincidencia, el delito anterior debe estar comprendido…", ["En el mismo título del Código y ser de la misma naturaleza", "En cualquier título", "En el mismo artículo exclusivamente"], "Art. 22.8.ª."],
        ["dificil", "La agravante de discriminación del art. 22.4.ª se aplica aunque la víctima…", ["No tenga efectivamente la condición que motivó la conducta", "Sea mayor de edad", "Haya perdonado al autor"], "Art. 22.4.ª, inciso final."],
        ["media", "¿Cuál de estos motivos recoge expresamente la agravante 4.ª en su redacción vigente?", ["La aporofobia", "La afición deportiva", "La profesión de la víctima"], "Art. 22.4.ª."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Circunstancia mixta de parentesco (art. 23)", "Puede atenuar o agravar según la naturaleza, motivos y efectos del delito: ser o haber sido cónyuge o pareja estable, o ascendiente, descendiente o hermano del ofensor o de su cónyuge o conviviente"],
        ["Autoridad a efectos penales (art. 24.1)", "Quien por sí solo o como miembro de corporación, tribunal u órgano colegiado tenga mando o ejerza jurisdicción propia"],
        ["Son en todo caso autoridad (art. 24.1)", "Diputados, senadores, miembros de las Asambleas autonómicas y del Parlamento Europeo, funcionarios del Ministerio Fiscal y Fiscales de la Fiscalía Europea"],
        ["Funcionario público a efectos penales (art. 24.2)", "Todo el que por disposición de la ley, por elección o por nombramiento participe en el ejercicio de funciones públicas"],
        ["Discapacidad a efectos penales (art. 25)", "Deficiencias físicas, mentales, intelectuales o sensoriales permanentes que, con diversas barreras, limitan la participación plena en la sociedad"],
        ["Documento a efectos penales (art. 26)", "Todo soporte material que exprese o incorpore datos, hechos o narraciones con eficacia probatoria o cualquier otra relevancia jurídica"],
      ],
      preguntas: [
        ["media", "La circunstancia de parentesco es…", ["Mixta: puede atenuar o agravar", "Siempre agravante", "Siempre atenuante"], "Art. 23."],
        ["facil", "A efectos penales, quien participa en el ejercicio de funciones públicas por nombramiento de autoridad competente es…", ["Funcionario público", "Autoridad en todo caso", "Particular"], "Art. 24.2."],
        ["media", "¿Tienen siempre la consideración de autoridad los miembros del Parlamento Europeo?", ["Sí", "No", "Solo en España"], "Art. 24.1."],
        ["media", "Según el art. 26 CP, un archivo digital con datos con eficacia probatoria es…", ["Un documento", "Un efecto", "Un indicio sin valor"], "Art. 26."],
        ["dificil", "¿Comprende el parentesco del art. 23 al hermano del cónyuge del ofensor?", ["Sí, los hermanos por naturaleza o adopción del ofensor o de su cónyuge o conviviente", "No", "Solo si conviven"], "Art. 23."],
      ],
    },
  ],
  glosario: [
    [S1, "Eximente", "Circunstancia que excluye la responsabilidad criminal."],
    [S1, "Legítima defensa", "Eximente que ampara repeler una agresión ilegítima con un medio racionalmente necesario."],
    [S1, "Estado de necesidad", "Eximente por lesionar un bien ajeno para evitar un mal propio o ajeno no menor."],
    [S2, "Eximente incompleta", "Eximente a la que le falta algún requisito no esencial; funciona como atenuante."],
    [S3, "Alevosía", "Agravante por asegurar la ejecución sin riesgo derivado de la defensa del ofendido."],
    [S3, "Ensañamiento", "Agravante por aumentar inhumanamente el sufrimiento de la víctima."],
    [S3, "Reincidencia", "Agravante por condena ejecutoria previa por delito del mismo título y naturaleza."],
    [S3, "Aporofobia", "Rechazo u hostilidad hacia las personas pobres; motivo de la agravante 4.ª del art. 22."],
    [S4, "Circunstancia mixta", "La que, como el parentesco, puede atenuar o agravar según el delito."],
  ],
  casos: [
    {
      slug: "caso-agresion-portal-defensa",
      titulo: "Una agresión en el portal",
      supuesto: "Un vecino denuncia que, al volver a casa de noche, un desconocido lo amenazó con una navaja en el portal para robarle. Él lo empujó contra la pared y el atracador sufrió una brecha. Horas después, otro vecino, que oyó gritos y salió con un bate, golpeó varias veces al atracador cuando ya estaba en el suelo y desarmado.",
      preguntas: [
        [S1, "facil", "La amenaza con navaja para robar constituye…", ["Una agresión ilegítima", "Una provocación del vecino", "Un estado de necesidad"], "Art. 20.4.º, primero."],
        [S1, "media", "Para que la defensa del primer vecino exima, el medio empleado debe ser…", ["Racionalmente necesario para impedir o repeler la agresión", "Exactamente el mismo arma del agresor", "Cualquiera, sin límite"], "Art. 20.4.º, segundo."],
        [S1, "media", "¿Puede alegar legítima defensa quien había provocado suficientemente la agresión?", ["No, falta un requisito", "Sí, siempre", "Solo si es de noche"], "Art. 20.4.º, tercero."],
        [S1, "media", "¿Ampara la legítima defensa la defensa de otra persona?", ["Sí, de la persona o derechos propios o ajenos", "No, solo la propia", "Solo de familiares"], "Art. 20.4.º."],
        [S2, "dificil", "Si en la defensa se excediera el medio pero existían agresión y falta de provocación, se apreciaría…", ["Eximente incompleta como atenuante", "Eximente completa", "Agravante de abuso de superioridad"], "Art. 21.1.ª."],
        [S3, "media", "Golpear al atracador ya desarmado y en el suelo puede suponer, además, la agravante de…", ["Abuso de superioridad o aprovechar circunstancias que debilitan la defensa", "Precio", "Reincidencia"], "Art. 22.2.ª."],
        [S1, "media", "¿Hay agresión ilegítima actual cuando el atracador ya está en el suelo y desarmado?", ["No: ya no hay agresión que repeler", "Sí, siempre que haya robado", "Sí, durante 24 horas"], "Art. 20.4.º: la defensa exige impedir o repeler una agresión."],
        [S2, "media", "Si el segundo vecino confiesa a la policía antes de saber que hay procedimiento contra él…", ["Puede apreciarse la atenuante de confesión", "Queda exento", "Se agrava su pena"], "Art. 21.4.ª."],
        [S2, "media", "Si paga los gastos médicos del atracador antes del juicio oral…", ["Puede apreciarse la atenuante de reparación del daño", "Queda exento", "No tiene efecto"], "Art. 21.5.ª."],
        [S4, "media", "Si el atracador fuera hermano del primer vecino, el parentesco…", ["Podría atenuar o agravar según la naturaleza, motivos y efectos del delito", "Agravaría siempre", "Eximiría siempre"], "Art. 23."],
      ],
    },
    {
      slug: "caso-ataque-persona-sin-hogar",
      titulo: "El ataque a una persona sin hogar",
      supuesto: "Tres jóvenes con la cara tapada agreden a una persona que duerme en un banco de un parque, entre insultos contra «los mendigos». Uno de ellos ya fue condenado ejecutoriamente hace dos años por un delito de lesiones, antecedente no cancelado. Otro recibió dinero de un tercero para participar.",
      preguntas: [
        [S3, "media", "Atacar por rechazo a la pobreza de la víctima permite aplicar la agravante de…", ["Discriminación por aporofobia o exclusión social", "Abuso de confianza", "Prevalimiento del carácter público"], "Art. 22.4.ª."],
        [S3, "dificil", "¿Se aplicaría esa agravante si la víctima no fuera realmente una persona sin hogar?", ["Sí, con independencia de que la condición concurra efectivamente", "No", "Solo si ella lo acredita"], "Art. 22.4.ª, inciso final."],
        [S3, "media", "Actuar con la cara tapada puede integrar la agravante de…", ["Disfraz", "Ensañamiento", "Precio"], "Art. 22.2.ª."],
        [S3, "media", "Agredir a alguien que duerme, sin posibilidad de defensa, en un delito contra las personas puede ser…", ["Alevosía", "Abuso de confianza", "Reincidencia"], "Art. 22.1.ª."],
        [S3, "media", "El joven condenado antes por lesiones puede ser reincidente porque…", ["El delito anterior es del mismo título y naturaleza y el antecedente no está cancelado", "Tiene cualquier antecedente", "Es mayor de edad"], "Art. 22.8.ª."],
        [S3, "facil", "El que participó a cambio de dinero incurre en la agravante de…", ["Precio, recompensa o promesa", "Disfraz", "Arrebato"], "Art. 22.3.ª."],
        [S3, "media", "Ser tres contra uno puede suponer…", ["Abuso de superioridad", "Estado de necesidad", "Miedo insuperable"], "Art. 22.2.ª."],
        [S1, "media", "Si uno de los agresores tuviera 17 años, respondería…", ["Conforme a la ley de responsabilidad penal del menor", "Con arreglo al Código Penal", "No respondería en ningún caso"], "Art. 19."],
        [S2, "media", "Si alguno alegara haber actuado bajo los efectos de una grave adicción a las drogas, podría apreciarse…", ["La atenuante del art. 21.2.ª", "La agravante de precio", "La eximente de miedo insuperable"], "Art. 21.2.ª."],
        [S3, "dificil", "¿Computaría para la reincidencia una condena anterior por un delito leve?", ["No, salvo los tipos agravados por multirreincidencia de delitos leves", "Sí, siempre", "Solo si es reciente"], "Art. 22.8.ª, párrafo tercero."],
      ],
    },
    {
      slug: "caso-agente-documento-falso",
      titulo: "El agente y el documento",
      supuesto: "En una investigación interna se descubre que un agente de un cuerpo policial alteró un acta de inspección en formato electrónico para favorecer a un conocido, valiéndose de su acceso como funcionario. En la misma investigación declara un concejal del Ayuntamiento.",
      preguntas: [
        [S4, "facil", "¿Es documento a efectos penales un acta en formato electrónico?", ["Sí, todo soporte material que exprese datos con eficacia probatoria", "No, solo el papel", "Solo si está firmada a mano"], "Art. 26."],
        [S4, "media", "El agente, a efectos penales, es…", ["Funcionario público", "Autoridad en todo caso", "Particular"], "Art. 24.2."],
        [S4, "media", "Un concejal, como miembro de una corporación con mando, puede ser considerado…", ["Autoridad", "Simple particular", "Testigo cualificado"], "Art. 24.1."],
        [S3, "media", "Valerse de su condición de funcionario para cometer el hecho puede suponer la agravante de…", ["Prevalerse del carácter público", "Reincidencia", "Ensañamiento"], "Art. 22.7.ª (cuando no sea ya elemento del tipo)."],
        [S3, "media", "Aprovechar la confianza depositada por el conocido para engañarlo sería…", ["Abuso de confianza", "Alevosía", "Disfraz"], "Art. 22.6.ª."],
        [S2, "media", "Si el agente confesara antes de conocer el procedimiento judicial contra él…", ["Se apreciaría la atenuante de confesión", "Quedaría exento", "Se agravaría la pena"], "Art. 21.4.ª."],
        [S2, "dificil", "Si el proceso se paralizara años sin causa atribuible al agente y sin proporción con su complejidad…", ["Atenuante de dilaciones indebidas", "Prescripción automática", "Agravante"], "Art. 21.6.ª."],
        [S1, "media", "¿Podría alegar el agente que actuaba en cumplimiento de un deber?", ["No: alterar un acta no es ejercicio legítimo de su cargo", "Sí, siempre que sea funcionario", "Sí, si obedece a un superior"], "Art. 20.7.º exige ejercicio legítimo."],
        [S4, "media", "¿Son autoridad a efectos penales los fiscales?", ["Sí, los funcionarios del Ministerio Fiscal", "No", "Solo los fiscales jefes"], "Art. 24.1."],
        [S2, "media", "Una circunstancia no enumerada pero de análoga significación a las atenuantes…", ["Puede atenuar (atenuante analógica)", "No puede apreciarse", "Agrava"], "Art. 21.7.ª."],
      ],
    },
  ],
});

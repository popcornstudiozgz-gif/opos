/**
 * Crea tema-350 — Tema 23 de Policía Local: "Delitos contra la salud pública
 * (Libro II, Título XVII, Capítulo III)."
 *
 * Fuente: Ley Orgánica 10/1995, del Código Penal (BOE-A-1995-25444), texto
 * consolidado del BOE leído íntegro en los arts. 359 a 378.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-350-codigo-penal-delitos-salud-publica.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const CP = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444";
const a = (ancla) => `${CP}#${ancla}`;
const S1 = "sustancias-nocivas-medicamentos";
const S2 = "alimentos-aguas-dopaje";
const S3 = "trafico-drogas-tipo-basico";
const S4 = "trafico-drogas-agravaciones";
const S5 = "drogas-disposiciones-comunes";

await sembrarTema({
  tema: {
    slug: "tema-350",
    titulo: "Código Penal: delitos contra la salud pública",
    descripcion: "Sustancias nocivas y productos químicos; medicamentos sin autorización, falsificados o alterados; difusión de contenidos que promuevan conductas de riesgo alimentario entre menores; dopaje deportivo; fraudes alimentarios nocivos, adulteración de alimentos y envenenamiento de aguas; imprudencia grave; tráfico de drogas tóxicas, estupefacientes y sustancias psicotrópicas (tipo básico, sustancias que causan grave daño y demás, escasa entidad); agravantes del art. 369, organización delictiva y extrema gravedad; precursores; decomiso, colaboración, deshabituación y multas.",
    contenido: "Recorre el Capítulo III del Título XVII del Libro II del Código Penal (arts. 359 a 378): primero los delitos sobre sustancias nocivas, medicamentos, alimentos y aguas; después, con más detalle, el tráfico de drogas del art. 368 (cultivo, elaboración, tráfico, promoción del consumo y posesión con esos fines), la distinción entre drogas que causan grave daño y las demás, las agravantes por notoria importancia, venta a menores o en centros docentes, la organización delictiva, los precursores, y las rebajas por colaboración o por haber superado una deshabituación.",
    enlaces_boe: [{ url: CP, titulo: "Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal (BOE-A-1995-25444)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Sustancias nocivas y medicamentos", articulos: "arts. 359-362 sexies", url: a("a359") },
      { seccion: S2, titulo: "Alimentos, aguas, personas jurídicas e imprudencia", articulos: "arts. 363-367", url: a("a363") },
      { seccion: S3, titulo: "Tráfico de drogas: tipo básico", articulos: "art. 368", url: a("a368") },
      { seccion: S4, titulo: "Tráfico de drogas: agravaciones, organizaciones y precursores", articulos: "arts. 369-372", url: a("a369") },
      { seccion: S5, titulo: "Disposiciones comunes: decomiso, reincidencia, atenuaciones y multas", articulos: "arts. 373-378", url: a("a373") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 23 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Sustancias nocivas sin autorización (art. 359)", "Elaborar, despachar, suministrar o comerciar sin autorización sustancias nocivas o productos químicos que puedan causar estragos: prisión de 6 meses a 3 años, multa e inhabilitación"],
        ["Autorizado que incumple formalidades (art. 360)", "Despachar o suministrar esas sustancias sin las formalidades legales: multa de 6 a 12 meses e inhabilitación"],
        ["Medicamentos sin autorización (art. 361)", "Fabricar, importar, comercializar o almacenar medicamentos sin autorización, o caducados o deteriorados, generando riesgo para la vida o la salud: prisión de 6 meses a 3 años"],
        ["Falsificación de medicamentos (art. 362)", "Elaborar medicamentos o productos sanitarios presentándolos engañosamente (identidad, origen, historial) o alterar su composición: prisión de 6 meses a 4 años"],
        ["Tráfico de medicamentos falsificados (art. 362 bis)", "Con conocimiento de la falsificación, venderlos, distribuirlos o tenerlos en depósito para el consumo: prisión de 6 meses a 4 años"],
        ["Agravantes del art. 362 quater", "Pena superior en grado si el autor es autoridad, sanitario, docente o entrenador; difusión a gran escala; se facilitan a menores o vulnerables; organización criminal; o en establecimientos abiertos al público"],
        ["Dopaje (art. 362 quinquies)", "Facilitar sin justificación terapéutica sustancias o métodos prohibidos a deportistas, con peligro para su vida o salud: prisión de 6 meses a 2 años"],
        ["Contenidos de riesgo para menores (art. 361 bis)", "Difundir por internet contenidos que promuevan entre menores el consumo de sustancias o técnicas de ingestión o eliminación de alimentos de riesgo: multa de 6 a 12 meses o prisión de 1 a 3 años"],
      ],
      preguntas: [
        ["media", "Vender medicamentos caducados generando riesgo para la salud de las personas es delito del…", ["Art. 361", "Art. 368", "Art. 363"], "Art. 361."],
        ["media", "La falsificación de medicamentos del art. 362 se castiga con prisión de…", ["Seis meses a cuatro años", "Tres a seis años", "Uno a tres años"], "Art. 362.1."],
        ["dificil", "Si el que facilita medicamentos falsificados es un entrenador en el ejercicio de su profesión…", ["Pena superior en grado", "La misma pena", "Queda exento"], "Art. 362 quater.1.ª."],
        ["media", "Suministrar sin justificación terapéutica sustancias dopantes a un deportista, con peligro para su salud, se castiga en el…", ["Art. 362 quinquies", "Art. 368", "Art. 359"], "Art. 362 quinquies."],
        ["media", "Difundir por internet contenidos que promuevan entre menores conductas de ingesta de riesgo es delito del…", ["Art. 361 bis", "Art. 189 bis", "Art. 365"], "Art. 361 bis."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Fraudes alimentarios nocivos (art. 363)", "Productores, distribuidores o comerciantes que pongan en peligro la salud de los consumidores (alterar caducidad o composición, vender comestibles nocivos, géneros corrompidos…): prisión de 1 a 4 años"],
        ["Adulteración de alimentos (art. 364.1)", "Adulterar con aditivos no autorizados susceptibles de dañar la salud alimentos o bebidas destinados al comercio: penas del art. 363"],
        ["Conductas del art. 364.2", "Administrar a animales de consumo sustancias no permitidas, sacrificarlos o despachar sus carnes sin respetar periodos de espera"],
        ["Envenenamiento de aguas (art. 365)", "Envenenar o adulterar con sustancias infecciosas o gravemente nocivas las aguas potables o alimentos de uso público: prisión de 2 a 6 años"],
        ["Imprudencia grave (art. 367)", "Los hechos de los artículos anteriores cometidos por imprudencia grave: penas inferiores en grado"],
        ["Personas jurídicas (art. 366)", "Multa de 1 a 3 años o del doble al quíntuplo del valor de las sustancias o del beneficio, la más elevada"],
      ],
      preguntas: [
        ["media", "Envenenar las aguas potables destinadas al uso público se castiga con prisión de…", ["Dos a seis años", "Seis meses a tres años", "Uno a cuatro años"], "Art. 365."],
        ["media", "Vender comestibles nocivos para la salud destinados al consumo público, por un comerciante, es delito del…", ["Art. 363", "Art. 368", "Art. 361"], "Art. 363.2."],
        ["media", "Si estos delitos se cometen por imprudencia grave…", ["Se imponen las penas inferiores en grado", "No son delito", "Se imponen las mismas penas"], "Art. 367."],
        ["dificil", "Despachar al consumo carnes de animales sin respetar los periodos de espera reglamentarios tras tratarlos se castiga con…", ["Las penas del art. 363", "Una sanción administrativa solo", "Las del art. 368"], "Art. 364.2.4.º."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Conductas típicas del art. 368", "Actos de cultivo, elaboración o tráfico, o promover, favorecer o facilitar de otro modo el consumo ilegal de drogas tóxicas, estupefacientes o psicotrópicos, o poseerlas con esos fines"],
        ["Pena si causan grave daño a la salud", "Prisión de tres a seis años y multa del tanto al triplo del valor de la droga"],
        ["Pena en los demás casos", "Prisión de uno a tres años y multa del tanto al duplo"],
        ["Escasa entidad (art. 368, párrafo segundo)", "Los tribunales pueden imponer la pena inferior en grado por la escasa entidad del hecho y las circunstancias personales, salvo si concurren las de los arts. 369 bis y 370"],
        ["¿Es delito la posesión para el propio consumo?", "No en el art. 368: este castiga la posesión con fines de cultivo, elaboración o tráfico, o de promover el consumo ilegal de otros"],
        ["Valor de la droga a efectos de la multa (art. 377)", "El precio final del producto o la recompensa o ganancia obtenida o que hubiera podido obtener"],
      ],
      preguntas: [
        ["facil", "Vender droga que causa grave daño a la salud se castiga con prisión de…", ["Tres a seis años", "Uno a tres años", "Seis meses a dos años"], "Art. 368."],
        ["media", "Vender droga que no causa grave daño a la salud se castiga con prisión de…", ["Uno a tres años y multa del tanto al duplo", "Tres a seis años", "Nueve a doce años"], "Art. 368."],
        ["media", "¿Castiga el art. 368 la mera posesión de droga para el propio consumo?", ["No, exige posesión con fines de tráfico o de promover el consumo ajeno", "Sí, siempre", "Sí, si es más de un gramo"], "Art. 368."],
        ["media", "Atendiendo a la escasa entidad del hecho, los tribunales pueden…", ["Imponer la pena inferior en grado", "Absolver siempre", "Imponer la pena superior"], "Art. 368, párrafo segundo."],
        ["dificil", "¿Puede aplicarse la rebaja por escasa entidad si el autor pertenece a una organización delictiva?", ["No", "Sí", "Solo si es primario"], "Art. 368, párrafo segundo: excluida si concurren los arts. 369 bis y 370."],
        ["media", "Cultivar plantas para elaborar droga con destino al tráfico es…", ["Una de las conductas típicas del art. 368", "Atípico", "Delito contra el medio ambiente"], "Art. 368: actos de cultivo."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Efecto de las agravantes del art. 369.1", "Penas superiores en grado a las del art. 368 y multa del tanto al cuádruplo"],
        ["Agravantes del art. 369.1 (I)", "1.ª autor autoridad, funcionario, facultativo, trabajador social, docente o educador en ejercicio; 2.ª participar en otras actividades organizadas; 3.ª en establecimientos abiertos al público por sus responsables o empleados; 4.ª facilitar a menores de 18, disminuidos psíquicos o personas en deshabituación"],
        ["Agravantes del art. 369.1 (II)", "5.ª notoria importancia de la cantidad; 6.ª adulterar o mezclar las sustancias incrementando el daño; 7.ª en centros docentes, militares, penitenciarios o de deshabituación o sus proximidades; 8.ª violencia o uso de armas"],
        ["Organización delictiva (art. 369 bis)", "Prisión de 9 a 12 años (grave daño) o de 4 años y 6 meses a 10 años (demás casos), y multa del tanto al cuádruplo; superior en grado para jefes"],
        ["Pena superior en uno o dos grados (art. 370)", "Utilizar a menores de 18 o disminuidos psíquicos; ser jefe de la organización del art. 369.1.2.ª; extrema gravedad"],
        ["Extrema gravedad (art. 370)", "Cantidad que excede notablemente de la notoria importancia; buques, embarcaciones o aeronaves; simular comercio internacional; redes internacionales; o tres o más circunstancias del art. 369.1"],
        ["Precursores (art. 371)", "Fabricar, transportar o tener equipos, materiales o sustancias de los cuadros I y II de la Convención de Viena de 1988 sabiendo que se usarán para producir drogas: prisión de 3 a 6 años"],
        ["Inhabilitación del art. 372", "Especial de 3 a 10 años para empresarios, facultativos, funcionarios o docentes; absoluta de 10 a 20 años si lo comete autoridad o agente en el ejercicio de su cargo"],
      ],
      preguntas: [
        ["media", "Vender droga a menores de dieciocho años es una agravante que conlleva…", ["La pena superior en grado", "La pena inferior en grado", "Ningún efecto"], "Art. 369.1.4.ª."],
        ["media", "Vender droga en las proximidades de un instituto es…", ["Agravante del art. 369.1.7.ª", "Atenuante", "Irrelevante"], "Art. 369.1.7.ª."],
        ["media", "Utilizar a menores de 18 años para cometer el tráfico supone…", ["La pena superior en uno o dos grados", "La misma pena", "La exención del adulto"], "Art. 370.1.º."],
        ["dificil", "¿Cuándo se considera de extrema gravedad el tráfico, entre otros casos?", ["Cuando concurren tres o más circunstancias del art. 369.1", "Siempre que hay reincidencia", "Cuando la droga es cannabis"], "Art. 370.3.º."],
        ["media", "El miembro de una organización delictiva que trafica con sustancias que causan grave daño a la salud es castigado con prisión de…", ["Nueve a doce años", "Tres a seis años", "Uno a tres años"], "Art. 369 bis."],
        ["dificil", "El agente de la autoridad que trafica con drogas en el ejercicio de su cargo sufre además…", ["Inhabilitación absoluta de diez a veinte años", "Suspensión de un año", "Solo una multa"], "Art. 372."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Actos preparatorios (art. 373)", "Provocación, conspiración y proposición para los delitos de los arts. 368 a 372: pena inferior en uno o dos grados"],
        ["Decomiso en el tráfico de drogas (art. 374)", "Se decomisan drogas, precursores, bienes, medios, instrumentos y ganancias; firme la sentencia se destruyen las muestras; lo decomisado se adjudica íntegramente al Estado"],
        ["Reincidencia internacional (art. 375)", "Las condenas extranjeras por delitos de la misma naturaleza producen efectos de reincidencia"],
        ["Atenuación por colaboración (art. 376)", "Pena inferior en uno o dos grados si el sujeto abandona voluntariamente la actividad y colabora activamente para impedir el delito, identificar a otros o desarticular la organización"],
        ["Atenuación por deshabituación (art. 376)", "Pena inferior en uno o dos grados al drogodependiente que acredite haber finalizado con éxito un tratamiento, salvo notoria importancia o extrema gravedad"],
        ["Orden de imputación de pagos (art. 378)", "1.º reparación e indemnización; 2.º gastos del Estado; 3.º multa; 4.º costas del acusador particular; 5.º demás costas"],
      ],
      preguntas: [
        ["media", "El traficante que abandona la actividad y colabora activamente aportando pruebas decisivas contra la organización puede ver rebajada la pena…", ["En uno o dos grados", "A la mitad exacta", "Nada"], "Art. 376."],
        ["media", "Lo decomisado por sentencia firme en los delitos de tráfico de drogas se adjudica…", ["Íntegramente al Estado", "A la víctima", "Al Ayuntamiento"], "Art. 374.2.ª."],
        ["dificil", "¿Cabe la rebaja por deshabituación si la cantidad de droga era de notoria importancia?", ["No", "Sí", "Solo con informe médico"], "Art. 376, párrafo segundo."],
        ["media", "La conspiración para traficar con drogas se castiga con…", ["La pena inferior en uno o dos grados", "La misma pena", "No se castiga"], "Art. 373."],
        ["media", "¿Qué se paga en primer lugar según el art. 378?", ["La reparación del daño e indemnización de perjuicios", "La multa", "Las costas"], "Art. 378.1.º."],
      ],
    },
  ],
  glosario: [
    [S1, "Salud pública", "Bien jurídico colectivo: la salud del conjunto de la población."],
    [S1, "Dopaje", "Uso de sustancias o métodos prohibidos para aumentar el rendimiento deportivo."],
    [S2, "Fraude alimentario", "Poner en el mercado alimentos nocivos o con requisitos alterados que pongan en peligro la salud."],
    [S3, "Sustancias que causan grave daño a la salud", "Categoría de drogas, delimitada por la jurisprudencia, que eleva la pena del art. 368."],
    [S3, "Promover el consumo ilegal", "Conducta genérica del art. 368 que incluye cualquier forma de facilitar o favorecer la droga a terceros."],
    [S4, "Notoria importancia", "Cantidad de droga elevada que agrava la pena (art. 369.1.5.ª)."],
    [S4, "Precursores", "Sustancias y equipos de la Convención de Viena de 1988 usados para fabricar drogas."],
    [S5, "Decomiso", "Pérdida de los efectos, instrumentos y ganancias del delito."],
  ],
  casos: [
    {
      slug: "caso-venta-droga-instituto",
      titulo: "Venta de droga junto a un instituto",
      supuesto: "Una patrulla de la Policía Local observa durante varios días a un adulto que, a la salida de un instituto, entrega pequeñas bolsitas a alumnos a cambio de dinero. Al identificarlo le intervienen 20 dosis de cocaína y 300 euros fraccionados. Uno de los compradores tiene 15 años.",
      preguntas: [
        [S3, "media", "Tratándose de una sustancia que causa grave daño a la salud (la jurisprudencia incluye en ella la cocaína), el tipo básico se castiga con prisión de…", ["Tres a seis años", "Uno a tres años", "Seis meses a dos años"], "Art. 368."],
        [S4, "media", "Venderla a menores de 18 años es agravante del…", ["Art. 369.1.4.ª", "Art. 370.3.º", "Art. 21"], "Art. 369.1.4.ª."],
        [S4, "media", "Hacerlo en las proximidades de un centro docente es agravante del…", ["Art. 369.1.7.ª", "Art. 369.1.3.ª", "Art. 22.2.ª"], "Art. 369.1.7.ª."],
        [S4, "media", "Las agravantes del art. 369.1 suponen…", ["La pena superior en grado y multa del tanto al cuádruplo", "La pena inferior en grado", "Duplicar la pena siempre"], "Art. 369.1."],
        [S4, "dificil", "Si concurrieran tres o más circunstancias del art. 369.1…", ["Los hechos serían de extrema gravedad (art. 370)", "Nada cambiaría", "Se apreciaría escasa entidad"], "Art. 370.3.º."],
        [S3, "media", "La posesión de las 20 dosis y el dinero fraccionado son indicios de…", ["Posesión con fines de tráfico", "Autoconsumo", "Receptación"], "Art. 368: posesión con aquellos fines."],
        [S5, "media", "¿Qué se hará con la droga y el dinero intervenidos?", ["Decomiso", "Devolución al detenido", "Entrega al instituto"], "Art. 374."],
        [S3, "dificil", "¿Podría aplicarse la rebaja por escasa entidad del art. 368?", ["Es facultativa, pero no si concurren los arts. 369 bis o 370", "Siempre", "Nunca en ningún caso"], "Art. 368, párrafo segundo."],
        [S4, "media", "Si el vendedor utilizara a un menor para repartir la droga…", ["Pena superior en uno o dos grados", "Quedaría exento", "Pena inferior"], "Art. 370.1.º."],
        [S5, "media", "Si el vendedor fuera drogodependiente y acreditara haber terminado con éxito una deshabituación…", ["Podría rebajarse la pena en uno o dos grados, si la cantidad no es de notoria importancia", "Quedaría absuelto", "Se agravaría la pena"], "Art. 376."],
      ],
    },
    {
      slug: "caso-bar-venta-hachis",
      titulo: "Hachís en un bar",
      supuesto: "En una inspección en un bar del Casco Histórico, los agentes descubren que el encargado vende hachís a los clientes desde la barra. Le intervienen varias placas y una báscula de precisión. Además, el local tiene un enganche ilegal a la red eléctrica.",
      preguntas: [
        [S3, "media", "Si la sustancia no causa grave daño a la salud (la jurisprudencia encuadra así el hachís), el tipo básico se castiga con…", ["Prisión de uno a tres años y multa del tanto al duplo", "Prisión de tres a seis años", "Multa solo"], "Art. 368."],
        [S4, "media", "Que lo venda el encargado en un establecimiento abierto al público es agravante del…", ["Art. 369.1.3.ª", "Art. 369.1.5.ª", "Art. 370"], "Art. 369.1.3.ª."],
        [S4, "media", "Con esa agravante, la pena será…", ["La superior en grado", "La misma", "La inferior en grado"], "Art. 369.1."],
        [S3, "media", "La báscula de precisión es un indicio de…", ["Destino al tráfico", "Autoconsumo", "Nada"], "Art. 368."],
        [S5, "media", "La báscula y el dinero de la venta pueden ser…", ["Decomisados como instrumentos y ganancias", "Devueltos", "Subastados por el bar"], "Art. 374."],
        [S4, "dificil", "Si la cantidad intervenida fuera de notoria importancia, ¿se aplicaría también la agravante 5.ª?", ["Sí", "No", "Solo con cocaína"], "Art. 369.1.5.ª."],
        [S3, "media", "Si los clientes consumieran en el local, ¿está promoviendo el consumo ilegal el encargado?", ["Sí", "No", "Solo si cobra"], "Art. 368."],
        [S5, "media", "Si el encargado colaborara para identificar a su proveedor y abandonara la actividad…", ["Podría rebajarse la pena en uno o dos grados", "Quedaría exento", "Nada"], "Art. 376."],
        [S1, "dificil", "Si además vendiera medicamentos sin autorización con riesgo para la salud, ¿qué delito sería?", ["El del art. 361", "El del art. 368", "Ninguno"], "Art. 361."],
        [S5, "media", "La conspiración del encargado con un proveedor para traer hachís se castiga…", ["Con la pena inferior en uno o dos grados", "Igual que el tráfico", "No se castiga"], "Art. 373."],
      ],
    },
    {
      slug: "caso-intoxicacion-alimentaria-fiestas",
      titulo: "Intoxicación en las fiestas",
      supuesto: "Durante las Fiestas del Pilar, decenas de personas sufren una intoxicación tras consumir bocadillos de un puesto ambulante. La inspección sanitaria comprueba que el vendedor usaba carne en mal estado y había modificado las etiquetas de caducidad. En otro puesto, un vendedor ofrecía «pastillas para adelgazar» sin autorización sanitaria.",
      preguntas: [
        [S2, "media", "Vender comestibles nocivos para la salud destinados al consumo público es delito del…", ["Art. 363", "Art. 368", "Art. 359"], "Art. 363.2."],
        [S2, "media", "Traficar con géneros corrompidos es una conducta del…", ["Art. 363.3", "Art. 365", "Art. 361"], "Art. 363.3."],
        [S2, "media", "Alterar los requisitos de caducidad de productos alimentarios ofrecidos en el mercado es…", ["Delito del art. 363.1 si pone en peligro la salud", "Siempre infracción administrativa", "No es delito"], "Art. 363.1."],
        [S2, "media", "Pena del art. 363…", ["Prisión de uno a cuatro años, multa e inhabilitación", "Prisión de dos a seis años", "Multa solo"], "Art. 363."],
        [S2, "dificil", "Si el vendedor no lo hizo intencionadamente, sino por imprudencia grave…", ["Penas inferiores en grado", "Atípico", "Mismas penas"], "Art. 367."],
        [S1, "media", "Las pastillas para adelgazar sin autorización, si generan riesgo para la salud, encajan en el…", ["Art. 361", "Art. 368", "Art. 365"], "Art. 361."],
        [S1, "media", "Si las pastillas fueran falsificadas en su composición o identidad, el delito sería el del…", ["Art. 362", "Art. 360", "Art. 363"], "Art. 362."],
        [S1, "dificil", "Si se ofrecieran a gran escala por redes sociales…", ["Pena superior en grado (art. 362 quater)", "La misma pena", "No sería delito"], "Art. 362 quater.2.ª.a)."],
        [S2, "media", "Si alguien hubiera adulterado el agua de una fuente pública con sustancias gravemente nocivas…", ["Delito del art. 365, prisión de dos a seis años", "Delito del art. 363", "Daños"], "Art. 365."],
        [S5, "media", "¿Se aplica a estos delitos (arts. 361-372) la reincidencia por condenas extranjeras?", ["Sí, si son de la misma naturaleza", "No", "Solo en drogas"], "Art. 375."],
      ],
    },
  ],
});

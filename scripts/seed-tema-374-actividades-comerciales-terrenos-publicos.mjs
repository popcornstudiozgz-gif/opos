/**
 * Crea tema-374 — Tema 47 de Policía Local: "Normativa reguladora de
 * actividades comerciales e industriales en terrenos públicos."
 *
 * Fuentes leídas íntegras en esta sesión:
 * - Ordenanza Reguladora de Actividades Comerciales e Industriales en
 *   Terrenos Públicos de Zaragoza (ORACITP), aprobación definitiva Pleno
 *   26-03-1981 (BOPZ 10-06-1981), texto consolidado de zaragoza.es/sede/
 *   servicio/normativa/240 con sus modificaciones de 1997, 1998 y 1999; su
 *   art. 35 (veladores) quedó derogado por la Ordenanza de Terrazas de
 *   Veladores (BOPZ nº 35 de 14-02-2005).
 * - Reglamento Regulador del Rastro de la Plaza de Toros (Pleno 28-09-2001,
 *   BOPZ nº 238 de 16-10-2001), zaragoza.es/sede/servicio/normativa/80.
 * Lagunas señaladas: (a) la ORACITP sigue fijando sus multas en pesetas
 *   (arts. 20 y 21) y nombra órganos ya inexistentes ("Comisión
 *   Permanente", "Policía Municipal"); no se convierten a euros por cuenta
 *   propia y se recuerda que la LBRL (art. 141) fija los topes generales en
 *   euros; (b) el Rastro también fija sus multas en pesetas.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-374-actividades-comerciales-terrenos-publicos.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const ORA = "https://www.zaragoza.es/sede/servicio/normativa/240";
const RASTRO = "https://www.zaragoza.es/sede/servicio/normativa/80";
const S1 = "oracitp-objeto-modalidades";
const S2 = "oracitp-licencias-requisitos";
const S3 = "oracitp-zonas-obligaciones-prohibiciones";
const S4 = "oracitp-faltas-sanciones-retirada";
const S5 = "venta-ambulante-mercadillos-ferias";

await sembrarTema({
  tema: {
    slug: "tema-374",
    titulo: "Actividades comerciales e industriales en terrenos públicos de Zaragoza (ORACITP)",
    descripcion: "Ordenanza Reguladora de Actividades Comerciales e Industriales en Terrenos Públicos de Zaragoza (1981, texto consolidado): objeto y modalidades de aprovechamiento (quioscos, puestos fijos y de temporada, actividades circunstanciales y sin puesto, aparatos automáticos, venta ambulante, mercadillos y ferias); licencias, requisitos, vigencia, intransmisibilidad y caducidad; zonas del centro con actividades limitadas; obligaciones y prohibiciones; faltas, sanciones y retirada de géneros; venta ambulante, mercadillos, atracciones feriales y el Rastro de la Plaza de Toros.",
    contenido: "Qué hace falta para vender o instalar algo en la calle en Zaragoza (un quiosco, un puesto de castañas, un mercadillo, una atracción de feria) y qué comprueba el policía local: la licencia, que la venta la haga el titular, que no se ocupe más espacio del permitido y que no se vendan productos prohibidos. Si no hay licencia, los agentes retiran el puesto y la mercancía. Las multas de esta ordenanza de 1981 siguen en pesetas, y así se indica.",
    enlaces_boe: [
      { url: ORA, titulo: "Ordenanza Reguladora de Actividades Comerciales e Industriales en Terrenos Públicos de Zaragoza (BOPZ 10-06-1981, texto consolidado)" },
      { url: RASTRO, titulo: "Reglamento Regulador del Rastro de la Plaza de Toros de Zaragoza (BOPZ nº 238, 16-10-2001)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Objeto y clases de aprovechamientos", articulos: "arts. 1-6", url: ORA },
      { seccion: S2, titulo: "Licencias: otorgamiento, requisitos, vigencia y caducidad", articulos: "arts. 7-15", url: ORA },
      { seccion: S3, titulo: "Zonas, obligaciones y prohibiciones", articulos: "arts. 16-18 bis", url: ORA },
      { seccion: S4, titulo: "Faltas, sanciones, retirada y vigilancia", articulos: "arts. 19-25", url: ORA },
      { seccion: S5, titulo: "Disposiciones especiales: quioscos, venta ambulante, mercadillos, atracciones feriales y Rastro", articulos: "arts. 26-52 y Reglamento del Rastro", url: ORA },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 47 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Objeto (art. 1)", "Regular la concesión, disfrute y extinción de aprovechamientos en la vía pública, plazas, parques y otros terrenos municipales con instalaciones o actividades comerciales e industriales"],
        ["Excluidos (art. 1.2)", "El ferial de atracciones de las fiestas del Pilar y de Primavera, que se rige por sus pliegos"],
        ["Modalidades (art. 2)", "Quioscos permanentes, puestos fijos, puestos de temporada, actividades circunstanciales, actividades sin puesto, aparatos automáticos, venta ambulante y mercadillos y ferias"],
        ["Quiosco (art. 2.2)", "Instalación cerrada de materiales duraderos, con carácter permanente en un emplazamiento durante la concesión"],
        ["Puesto fijo y de temporada (art. 2.3-4)", "Fijo: emplazamiento determinado, retirada diaria; de temporada: productos de una época del año durante más de diez días (helados, castañas, refrescos)"],
        ["Actividades circunstanciales (art. 2.5)", "Hasta diez días sin prórroga: libros el Día del Libro, roscones (Epifanía, San Valero, San Blas), flores y fotógrafos del 30 de octubre al 2 de noviembre, palmas, rosquillas"],
        ["Sin puesto y aparatos automáticos (art. 2.6-7)", "Sin puesto: sin permanencia fija, transportando los productos; automáticos: sin persona encargada (básculas, máquinas expendedoras)"],
        ["No obstaculizar (art. 5)", "Ninguna instalación puede estorbar el tráfico; los emplazamientos fijos exigen aceras de más de 2,50 m y dejar libre al menos la mitad; prohibidos ante portales, paradas, pasos de peatones, escaparates o badenes"],
        ["Extensión (art. 6)", "La de la licencia; si no la fija, no más de 1 m de fondo por 2 m de ancho"],
      ],
      preguntas: [
        ["media", "¿Qué duración máxima tienen las actividades circunstanciales?", ["Diez días, sin prórroga", "Un mes", "Seis meses"], "ORACITP, art. 2.5."],
        ["media", "Un puesto de castañas en invierno es un…", ["Puesto de temporada", "Quiosco permanente", "Aparato automático"], "Art. 2.4."],
        ["media", "¿Qué anchura mínima de acera exige un emplazamiento fijo?", ["Más de 2,50 metros", "1 metro", "5 metros"], "Art. 5.2."],
        ["media", "Si la licencia no fija la superficie, ¿cuál es la máxima?", ["1 m de fondo por 2 m de ancho", "3 por 3 m", "Sin límite"], "Art. 6.2."],
        ["media", "¿Se rige por esta ordenanza el ferial de las fiestas del Pilar?", ["No, por los pliegos de sus licitaciones", "Sí", "Solo los puestos de comida"], "Art. 1.2."],
        ["dificil", "¿Qué modalidad es una máquina de chicles en la acera?", ["Aparato automático", "Actividad sin puesto", "Puesto fijo"], "Art. 2.7."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Licencia obligatoria (art. 7.1)", "No puede ejercerse actividad comercial o industrial alguna en vías, plazas, parques u otros terrenos de uso público sin licencia municipal"],
        ["Naturaleza (art. 7.2)", "No da derecho de propiedad sobre el suelo; se refiere solo a la ocupación y no exime de otras autorizaciones"],
        ["Vigencia (art. 8)", "Máximo un año, salvo quioscos, aparatos automáticos y ventas en ventanal; son discrecionales y revocables sin indemnización"],
        ["Otorgamiento (art. 10)", "Por licitación (quioscos, helados, puestos fijos) o a petición; si hay más peticionarios que licencias, licitación o sorteo"],
        ["Requisitos de la venta ambulante (art. 11.1)", "Tributos al día, inscripción en el Registro de Empresarios de Comercio, permiso de trabajo y residencia si es extranjero, mayoría de edad, alta en IAE y Seguridad Social y carecer de otra actividad lucrativa"],
        ["Ejercicio personal (art. 11.2-3)", "El titular ejerce personalmente y debe estar domiciliado en Zaragoza (con excepciones); solo puede ayudarle un familiar o dependiente afiliado"],
        ["Intransmisibles (art. 12)", "Personales e intransmisibles, salvo por fallecimiento a favor del cónyuge o pareja o de hijos convivientes, con autorización"],
        ["Caducidad (art. 15)", "Fin de la vigencia, renuncia o abandono, sanción por falta muy grave, cesión o traspaso no permitido, impago de tasas o resolución municipal por interés público"],
        ["Registro (art. 14.7)", "Las licencias se comunican a la Policía Local (en el texto, 'Policía Municipal'), que conserva su fichero"],
      ],
      preguntas: [
        ["facil", "¿Puede venderse en la vía pública sin licencia municipal?", ["No", "Sí, si es poco tiempo", "Sí, en fiestas"], "Art. 7.1."],
        ["media", "¿Cuál es la vigencia máxima general de las licencias (salvo quioscos, aparatos automáticos y ventanal)?", ["Un año", "Cinco años", "Diez días"], "Art. 8.1."],
        ["media", "¿Puede el titular de una licencia de venta ambulante cederla a un amigo?", ["No, son personales e intransmisibles", "Sí, libremente", "Sí, pagando una tasa"], "Art. 12."],
        ["media", "¿Qué edad se exige para la venta ambulante?", ["Mayoría de edad", "16 años", "21 años"], "Art. 11.1."],
        ["media", "¿Tiene derecho a indemnización el titular si se revoca la licencia por interés público?", ["No", "Sí, siempre", "Solo si es un quiosco"], "Art. 8.4."],
        ["dificil", "¿Quién puede ayudar al titular en el puesto?", ["Solo sus familiares o dependientes afiliados a la Seguridad Social como asalariados suyos", "Cualquiera", "Nadie, nunca"], "Art. 11.3."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Zona sin mercadillos (art. 16.1)", "Dentro de un gran perímetro central (Echegaray y Caballero, María Agustín, avenida de Madrid… hasta Tenerías) no se permite la venta ni la instalación de mercadillos, salvo un mercado dominical"],
        ["Casco central (art. 16.2)", "Entre plaza de España, Coso, Conde Aranda, María Agustín, César Augusto y otras vías solo caben prensa, flores, aparatos automáticos, ventanal, veladores, limpiabotas, pintores, fotógrafos, lotería, castañas o helados y ventas tradicionales"],
        ["Textil (art. 16.4)", "Salvo venta ambulante o mercadillos, solo en barrios rurales y en determinados barrios (Oliver, Valdefierro, Delicias, Casablanca, Torrero, San José, Las Fuentes, Arrabal, Almozara)"],
        ["Obligaciones (art. 17)", "Impuestos y tasas al día, Registro de Empresarios y Seguridad Social, vender solo lo autorizado, pesas legales, normas sanitarias, limpieza y reparación de desperfectos, y exhibir a la Policía Local la licencia y las facturas de procedencia"],
        ["Prohibiciones (art. 18) I", "Productos químicos o peligrosos y alimentos (salvo lo permitido), propaganda fuera del local anunciado, venta sin puesto en calles de categoría especial, juegos de azar con premios en dinero (salvo Lotería Nacional y ONCE)"],
        ["Prohibiciones (art. 18) II", "Ruidos y música molestos, traspasar la licencia, ampliar o cambiar el puesto sin permiso, artículos usados fuera de lugares habilitados, encender fuego y alterar el orden público"],
        ["Otras prohibiciones (art. 18 bis)", "Pedir donativos o hacer cuestaciones sin autorización, y subir o bajar muebles por la fachada sin licencia"],
      ],
      preguntas: [
        ["media", "¿Qué documentos debe exhibir el vendedor a la Policía Local?", ["La licencia y los justificantes del cumplimiento de obligaciones y de la procedencia de los artículos", "Solo el DNI", "Nada"], "Art. 17.j)."],
        ["media", "¿Está permitido instalar máquinas con premios en dinero en la vía pública?", ["No, salvo la venta de Lotería Nacional y cupones de la ONCE", "Sí", "Solo en fiestas"], "Art. 18.h)."],
        ["media", "¿Puede alguien pedir donativos en la calle para recaudar fondos sin autorización?", ["No", "Sí", "Solo los domingos"], "Art. 18 bis a)."],
        ["media", "¿Dónde puede repartirse propaganda impresa de un comercio?", ["Únicamente delante del local publicitado", "En cualquier sitio", "Solo en parques"], "Art. 18.b)."],
        ["dificil", "¿Pueden venderse artículos usados en la vía pública?", ["Solo en lugares o mercados habilitados para ello", "Sí, libremente", "Nunca"], "Art. 18.l)."],
        ["media", "¿Puede un vendedor ampliar su puesto sin autorización?", ["No", "Sí, un metro", "Sí, si no molesta"], "Art. 18.k)."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Faltas leves (art. 19.2)", "Desobedecer a la Policía Local o a los administradores del mercado, falta de ornato o limpieza y otros incumplimientos menores"],
        ["Faltas graves (art. 19.3)", "Tres faltas leves, incumplir normas de seguridad, no ejercer personalmente, vender artículos no autorizados, negarse a exhibir documentos a la Policía Local, arrojar desperdicios o hacer ruidos"],
        ["Faltas muy graves (art. 19.4)", "Dos faltas graves, incumplir obligaciones tributarias, sanitarias o de vender lo autorizado, ampliar o cambiar el puesto sin licencia, ejercer otra persona, dañar el pavimento y vender productos falsificados o de procedencia ilícita"],
        ["Sanciones (art. 20)", "Multas fijadas en pesetas (laguna: no actualizadas a euros); en muy graves, además, suspensión de hasta tres meses o revocación; suspensión provisional posible en graves y muy graves; impone la Alcaldía"],
        ["Retirada sin licencia (art. 21.1)", "Toda actividad sin licencia da lugar a retirar instalaciones, elementos y géneros; se presume que no hay licencia si no se presenta cuando la piden los agentes"],
        ["Retirada inmediata (art. 21.2)", "También al infringir las prohibiciones de productos peligrosos o alimentos, propaganda, alquiler de bicis a menores, venta sin puesto en calles especiales o juegos de azar"],
        ["Recuperar lo retirado (art. 21.3)", "Pagando la multa que imponga la Alcaldía"],
        ["Vigilancia (art. 22)", "La Policía Local, la Inspección de Rentas y, en su caso, Parques y Jardines o Montes vigilan y denuncian"],
        ["Topes legales actuales", "Para las ordenanzas locales, la LBRL (art. 141) fija, salvo previsión legal distinta, multas de hasta 750, 1.500 y 3.000 euros"],
      ],
      preguntas: [
        ["media", "¿Qué hacen los agentes ante un vendedor que no presenta licencia?", ["Retirar las instalaciones, elementos y géneros", "Nada", "Solo tomar nota"], "Art. 21.1."],
        ["media", "Si el vendedor no muestra la licencia cuando se la piden, se presume que…", ["No la tiene", "La tiene", "Está en trámite"], "Art. 21.1."],
        ["media", "Vender productos falsificados es una falta…", ["Muy grave, sin perjuicio de la responsabilidad penal", "Leve", "Grave"], "Art. 19.4.i)."],
        ["media", "Negarse a exhibir los documentos a la Policía Local es una falta…", ["Grave", "Leve", "Muy grave"], "Art. 19.3.e)."],
        ["media", "¿Cómo se recuperan los géneros retirados?", ["Pagando la multa que imponga la Alcaldía", "Gratis al día siguiente", "No se recuperan nunca"], "Art. 21.3."],
        ["dificil", "¿Qué problema presentan hoy las multas de la ORACITP?", ["Siguen expresadas en pesetas, sin actualizar", "No existen", "Son de 6.000 euros"], "Arts. 20 y 21 (texto consolidado)."],
        ["media", "¿Qué otro servicio municipal, además de la Policía Local, vigila el cumplimiento de la ordenanza?", ["La Inspección de Rentas y Exacciones", "Los bomberos", "El Justicia de Aragón"], "Art. 22."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Quioscos permanentes (arts. 26-29)", "Por concurso; vigencia máxima de 25 años; con luz eléctrica, extintor y al menos tres papeleras"],
        ["Puestos fijos (arts. 30-32)", "Vigencia del año natural; máximo 3 m de largo por 1 de fondo; si es vehículo, como máximo una furgoneta"],
        ["Quioscos de temporada (art. 34)", "Máximo seis meses; castañas del 1 de noviembre al 31 de marzo; a no menos de 200 m de uno permanente de la misma actividad"],
        ["Actividades sin puesto (art. 37)", "Tableros de hasta 1 m² a mano o 2 m² sobre ruedas; no pueden exponer en un lugar fijo ni usar vehículos o animales cargados"],
        ["Venta ambulante (arts. 40-41)", "Fuera de establecimiento permanente, en lugares y fechas variables, en puestos desmontables de hasta 2 × 2 m, no más de dos días a la semana de 9 a 15 h"],
        ["Mercadillos (arts. 42-44)", "Agrupaciones de puestos declaradas por el Ayuntamiento: fijos, periódicos (ordinarios o de ocasión, un día a la semana) y ocasionales; los crea el Pleno"],
        ["Obligaciones y prohibiciones en mercadillos (arts. 46-47)", "Obedecer a la Policía Local, estar personalmente, limpieza; prohibidos altavoces, animales (salvo perros guía), salirse del puesto y vehículos fuera de horario"],
        ["Atracciones feriales (arts. 48-52)", "Autorización o concesión del suelo, seguro de responsabilidad civil y licencia de instalación; no se abren sin informe favorable de un facultativo; prohibida la venta ambulante en el recinto ferial"],
        ["Rastro de la Plaza de Toros", "Mercado periódico de ocasión los domingos de 9 a 14 h, con 275 puestos; licencias anuales, personales e intransferibles, solo a personas físicas; prohibida la venta ambulante fuera de los puestos"],
      ],
      preguntas: [
        ["media", "¿Cuántos días a la semana puede practicarse la venta ambulante, fuera de mercadillos?", ["No más de dos, de 9 a 15 horas", "Todos los días", "Solo el domingo"], "Art. 41.1.c)."],
        ["media", "¿Qué superficie máxima tiene un puesto de venta ambulante?", ["2 m de ancho por 2 m de fondo", "3 por 1 m", "1 por 2 m"], "Art. 41.1.f)."],
        ["media", "¿Cuál es la vigencia máxima de la concesión de un quiosco permanente?", ["25 años", "Un año", "50 años"], "Art. 27.1."],
        ["media", "¿Qué órgano acuerda la creación de un mercadillo?", ["El Ayuntamiento Pleno, previo expediente", "La Policía Local", "Los comerciantes"], "Art. 44.1."],
        ["media", "¿Puede abrirse al público una atracción de feria con licencia pero sin reconocimiento técnico?", ["No, necesita informe favorable de facultativo sobre su seguridad", "Sí", "Solo de día"], "Arts. 48.4 y 50.4."],
        ["media", "¿Qué día se celebra el Rastro de la Plaza de Toros?", ["Los domingos, de 9 a 14 h", "Los sábados por la tarde", "Todos los días"], "Reglamento del Rastro, art. 8."],
        ["dificil", "¿Está permitida la venta ambulante en el recinto ferial y sus alrededores?", ["No", "Sí", "Solo de bebidas"], "Arts. 48.6 y 52.3."],
      ],
    },
  ],
  glosario: [
    [S1, "Aprovechamiento", "Uso de un terreno público para una instalación o actividad, sujeto a licencia y tasa."],
    [S1, "Actividad circunstancial", "Venta o actividad autorizada por un máximo de diez días, como la de flores en Todos los Santos."],
    [S2, "Licencia discrecional", "Autorización que el Ayuntamiento puede revocar por interés público sin indemnización."],
    [S2, "Caducidad de la licencia", "Extinción por fin de plazo, renuncia, sanción muy grave, traspaso, impago o interés público."],
    [S3, "Venta en ventanal", "Venta a la vía pública desde ventanas, puertas o escaparates de un local."],
    [S4, "Retirada de géneros", "Medida que adoptan los agentes ante una actividad sin licencia o con productos prohibidos."],
    [S5, "Venta ambulante", "Venta fuera de establecimiento permanente, en puestos desmontables, en lugares y fechas variables."],
    [S5, "Mercadillo", "Agrupación de puestos de venta declarada como tal por el Ayuntamiento."],
    [S5, "Mercado de ocasión", "Mercado periódico de artículos de segunda mano, fuera de moda o restos de existencias."],
    [S5, "Atracción ferial", "Instalación recreativa (aparatos de movimiento, casetas de tiro, tómbolas) en terrenos públicos."],
  ],
  casos: [
    {
      slug: "caso-vendedor-sin-licencia-centro",
      titulo: "Un vendedor sin licencia en la plaza de España",
      supuesto: "Una patrulla encuentra en la plaza de España a una persona que vende bolsos de marca sobre una manta. No puede mostrar licencia ni facturas, y los bolsos parecen falsificados. Un poco más allá, un hombre pide dinero a los transeúntes 'para una asociación' sin acreditar ninguna autorización.",
      preguntas: [
        [S2, "media", "¿Puede venderse en la plaza sin licencia municipal?", ["No", "Sí", "Solo de noche"], "ORACITP, art. 7.1."],
        [S4, "media", "Al no presentar licencia, ¿qué se presume?", ["Que no existe", "Que está en trámite", "Nada"], "Art. 21.1."],
        [S4, "media", "¿Qué hacen los agentes con la mercancía?", ["Retirar las instalaciones, elementos y géneros", "Dejarla", "Venderla"], "Art. 21.1."],
        [S3, "media", "¿Qué debía poder exhibir el vendedor?", ["La licencia y los justificantes o facturas de procedencia", "Solo el DNI", "Nada"], "Art. 17.j)."],
        [S4, "media", "Vender productos falsificados es una falta…", ["Muy grave, además de la posible responsabilidad penal", "Leve", "No es falta"], "Art. 19.4.i)."],
        [S3, "media", "En esa zona del centro, ¿podría autorizarse la venta ambulante de bolsos?", ["No: en el casco central solo se autorizan determinadas actividades", "Sí", "Solo en fiestas"], "Art. 16.2."],
        [S3, "media", "¿Qué prohíbe la ordenanza al hombre que pide dinero?", ["Las cuestaciones o solicitudes de donativos sin autorización municipal", "Nada", "Solo si usa altavoz"], "Art. 18 bis a)."],
        [S4, "media", "¿Qué podría hacer el vendedor para recuperar lo retirado si no fuera delito?", ["Pagar la multa que imponga la Alcaldía", "Nada", "Pedirlo a los agentes al día siguiente"], "Art. 21.3."],
        [S4, "dificil", "¿Quién impone las sanciones de esta ordenanza?", ["La Alcaldía, previa instrucción de expediente", "Los agentes en el acto", "El juez"], "Art. 20.5."],
        [S4, "media", "Si el vendedor desobedece las órdenes de los agentes, comete una falta…", ["Leve", "Muy grave", "Ninguna"], "Art. 19.2.a)."],
      ],
    },
    {
      slug: "caso-puesto-castanas-quiosco",
      titulo: "El puesto de castañas y el quiosco",
      supuesto: "En noviembre, un agente revisa un puesto de castañas en el paseo de Sagasta: lo atiende el sobrino del titular, que no es su empleado, y el puesto ocupa el doble de lo autorizado. En la misma calle, el titular de un quiosco de prensa ha instalado una nevera de bebidas fuera de su perímetro.",
      preguntas: [
        [S1, "media", "¿Qué tipo de aprovechamiento es el puesto de castañas?", ["Puesto de temporada", "Actividad sin puesto", "Quiosco permanente"], "Art. 2.4."],
        [S5, "media", "¿Entre qué fechas se conceden los puestos de castañas?", ["Del 1 de noviembre al 31 de marzo", "Todo el año", "Solo en diciembre"], "Art. 34.2."],
        [S2, "media", "¿Puede atenderlo el sobrino que no es su empleado?", ["No: solo familiares o dependientes afiliados como asalariados del titular pueden asistirle, y el titular debe ejercer personalmente", "Sí", "Sí, si tiene DNI"], "Art. 11.2-3."],
        [S4, "media", "Que ejerza la actividad una persona distinta del titular, cuando es obligatorio el ejercicio personal, es falta…", ["Muy grave", "Leve", "Grave"], "Art. 19.4.g)."],
        [S3, "media", "¿Puede ampliar el puesto al doble?", ["No, está prohibido ampliar sin autorización", "Sí", "Solo en invierno"], "Art. 18.k)."],
        [S4, "media", "Ampliar el aprovechamiento sin licencia es falta…", ["Muy grave", "Leve", "Grave"], "Art. 19.4.f)."],
        [S3, "media", "¿Puede el quiosquero extender su actividad fuera de su perímetro?", ["No, sin autorización municipal", "Sí", "Solo en verano"], "Arts. 6.1 y 18.k)."],
        [S5, "media", "¿Qué dotación mínima debe tener un quiosco permanente?", ["Luz eléctrica, extintor y al menos tres papeleras", "Solo luz", "Nada"], "Art. 29.2."],
        [S4, "dificil", "En faltas graves o muy graves, ¿qué medida provisional cabe?", ["Suspender provisionalmente la licencia y cesar temporalmente la actividad", "Detener al titular", "Ninguna"], "Art. 20.4."],
        [S2, "media", "¿Qué ocurre si el titular deja de pagar las tasas?", ["La licencia puede caducar", "Nada", "Se duplica"], "Art. 15.e)."],
      ],
    },
    {
      slug: "caso-rastro-mercadillo",
      titulo: "Domingo en el Rastro",
      supuesto: "Un domingo, agentes de servicio en el Rastro de la Plaza de Toros observan a un vendedor que usa un altavoz para anunciar sus productos, otro que vende ropa nueva y una tercera persona que vende sin puesto en las inmediaciones del Rastro. A las 15:30 un vehículo de un vendedor sigue en el recinto.",
      preguntas: [
        [S5, "media", "¿Qué tipo de mercado es el Rastro según su Reglamento?", ["Un mercado periódico de ocasión", "Un mercado fijo", "Un mercado ocasional de fiestas"], "Reglamento del Rastro, art. 2."],
        [S5, "media", "¿Puede venderse ropa nueva en el Rastro?", ["No, está prohibido vender artículos nuevos y ropa", "Sí", "Solo de marca"], "Reglamento del Rastro, art. 5.3."],
        [S5, "media", "¿Está permitida la venta ambulante fuera de los puestos en las inmediaciones?", ["No", "Sí", "Solo de comida"], "Reglamento del Rastro, art. 6."],
        [S5, "media", "¿Está permitido usar altavoces para anunciar los productos?", ["No", "Sí", "Solo antes de las 10"], "Reglamento del Rastro, art. 17; ORACITP, art. 47.b)."],
        [S5, "media", "¿A qué hora deben estar desmontados los puestos?", ["A las 15:00", "A las 20:00", "No hay hora"], "Reglamento del Rastro, art. 8."],
        [S5, "media", "¿Quién puede ser titular de un puesto en el Rastro?", ["Solo personas físicas que cumplan los requisitos", "Cualquier empresa", "Cualquiera sin requisitos"], "Reglamento del Rastro, art. 11.2."],
        [S5, "media", "¿Cuántos puestos tiene el Rastro?", ["275", "50", "1.000"], "Reglamento del Rastro, art. 6."],
        [S5, "dificil", "¿Qué norma se aplica en lo no previsto por el Reglamento del Rastro?", ["La Ordenanza de Actividades Comerciales e Industriales en Terrenos Públicos", "El Código de Comercio", "Ninguna"], "Reglamento del Rastro, art. 2."],
        [S5, "media", "¿Deben los vendedores obedecer a la Policía Local?", ["Sí, y la desobediencia es infracción", "No", "Solo si hay delito"], "Reglamento del Rastro, arts. 16 y 20."],
        [S5, "media", "¿Pueden transmitirse las licencias del Rastro?", ["No, son personales e intransferibles", "Sí", "Solo a vecinos"], "Reglamento del Rastro, art. 13."],
      ],
    },
  ],
});

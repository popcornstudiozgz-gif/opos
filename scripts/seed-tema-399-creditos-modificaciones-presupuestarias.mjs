/**
 * Crea tema-399 — Tema 27 de Administrativo DGA (tema 22 del programa de
 * materias específicas): "Los créditos presupuestarios en la Comunidad
 * Autónoma de Aragón y sus modificaciones."
 *
 * Fuentes:
 * - DLeg 3/2023, TR Ley de Hacienda de Aragón (BOE-A-2023-14052): arts.
 *   35-46 (leídos en la API del BOE).
 * - Estatuto de Autonomía de Aragón (BOE-A-2007-8444): arts. 44 y 111.
 * - Ley 5/2012, de Estabilidad Presupuestaria de Aragón (BOE-A-2012-9063):
 *   art. 15 (fondo de contingencia).
 * - Orden HAP/1848/2025, de 30 de diciembre, de condiciones de la prórroga
 *   del Presupuesto de 2024 hasta la aprobación del de 2026 (BOA núm. 252
 *   de 31-12-2025), descargada del BOA y leída: créditos prorrogados de la
 *   Ley 17/2023, de Presupuestos para 2024; no prórroga de subvenciones
 *   nominativas; disponibilidad por capítulos.
 * - Decreto-ley 1/2026, de 10 de junio, del Gobierno de Aragón, de
 *   suplemento de crédito (BOE-A-2026-17288; BOA núm. 111 de 12-06-2026;
 *   convalidado, BOA núm. 133 de 13-07-2026): leído en el BOE. El
 *   preámbulo y el art. 2 difieren en los céntimos de los mayores
 *   ingresos (…417,26 / …417,29 €); en el tema se dan cifras redondeadas.
 * La Ley 17/2023 (presupuesto prorrogado) no se ha leído en esta sesión:
 *   no se reproducen sus listas de créditos ampliables ni sus reglas de
 *   vinculación propias.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-399-creditos-modificaciones-presupuestarias.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const LHA = "https://www.boe.es/buscar/act.php?id=BOE-A-2023-14052";
const EAA = "https://www.boe.es/buscar/act.php?id=BOE-A-2007-8444";
const LEPA = "https://www.boe.es/buscar/act.php?id=BOE-A-2012-9063";
const DL1 = "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-17288";
const PRORR = "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1429052850202&type=pdf";
const S1 = "creditos-caracter-vinculacion";
const S2 = "creditos-extraordinarios-suplementos-ampliaciones";
const S3 = "incorporacion-remanentes";
const S4 = "generaciones-reposiciones";
const S5 = "transferencias-credito";
const S6 = "prorroga-y-tramitacion";

await sembrarTema({
  tema: {
    slug: "tema-399",
    titulo: "Los créditos presupuestarios en la Comunidad Autónoma de Aragón y sus modificaciones",
    descripcion: "El crédito presupuestario: especialidad cualitativa y cuantitativa, carácter limitativo y vinculante (a nivel de concepto), temporalidad. Modificaciones de crédito en la Ley de Hacienda de Aragón: créditos ampliables, créditos extraordinarios y suplementos de crédito (por ley), incorporación de remanentes, generaciones y reposiciones de crédito, transferencias de crédito y sus limitaciones; fondo de contingencia; tramitación y comunicación a las Cortes. El caso real de 2026: presupuesto de 2024 prorrogado (Orden HAP/1848/2025) y suplemento de crédito del Decreto-ley 1/2026.",
    contenido: "Qué se puede hacer cuando el dinero aprobado para algo no basta o no existe: cuándo hace falta una ley (crédito extraordinario o suplemento), cuándo basta una resolución del consejero de Hacienda (transferencias, generaciones, incorporaciones de remanentes) y qué límites hay. Con el ejemplo real de Aragón en 2026, que funciona con el presupuesto de 2024 prorrogado y amplió crédito en junio con un decreto-ley.",
    enlaces_boe: [
      { url: LHA, titulo: "Decreto Legislativo 3/2023, texto refundido de la Ley de Hacienda de la Comunidad Autónoma de Aragón (BOE-A-2023-14052)" },
      { url: EAA, titulo: "Estatuto de Autonomía de Aragón, arts. 44 y 111 (BOE-A-2007-8444)" },
      { url: LEPA, titulo: "Ley 5/2012, de Estabilidad Presupuestaria de Aragón (BOE-A-2012-9063)" },
      { url: PRORR, titulo: "Orden HAP/1848/2025, de condiciones de la prórroga del Presupuesto de 2024 para 2026 (BOA núm. 252, de 31-12-2025)" },
      { url: DL1, titulo: "Decreto-ley 1/2026, de 10 de junio, del Gobierno de Aragón, por el que se concede un suplemento de crédito (BOE-A-2026-17288)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "El crédito presupuestario: especialidad, limitación, vinculación y temporalidad", articulos: "arts. 36 y 39 LHA", url: `${LHA}#a3-8` },
      { seccion: S2, titulo: "Créditos ampliables, extraordinarios y suplementos de crédito", articulos: "arts. 37 y 40 LHA; art. 15 Ley 5/2012", url: `${LHA}#a4-2` },
      { seccion: S3, titulo: "Incorporación de remanentes de crédito", articulos: "art. 41 LHA", url: `${LHA}#a4-3` },
      { seccion: S4, titulo: "Generaciones y reposiciones de crédito", articulos: "arts. 42-43 LHA", url: `${LHA}#a4-4` },
      { seccion: S5, titulo: "Transferencias de crédito y sus limitaciones", articulos: "arts. 44-45 LHA", url: `${LHA}#a4-6` },
      { seccion: S6, titulo: "Tramitación de las modificaciones; la prórroga y el suplemento de 2026", articulos: "art. 46 LHA; arts. 44 y 111 EAA; Orden HAP/1848/2025; Decreto-ley 1/2026", url: `${LHA}#a4-8` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloquePresupuesto, numero: 27 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Especialidad cualitativa (art. 36.1 LHA)", "Los créditos se destinan exclusivamente a la finalidad específica para la que fueron autorizados por la ley de presupuestos o sus modificaciones legales"],
        ["Carácter limitativo (art. 36.2 LHA)", "No pueden adquirirse compromisos por encima del importe del crédito; son nulos de pleno derecho los actos y disposiciones de rango inferior a ley que lo infrinjan"],
        ["Ámbito de los límites (art. 36.3 LHA)", "Se aplican en la clasificación orgánica, económica y por programas"],
        ["Vinculación (art. 36.4 LHA)", "Los créditos de los programas vinculan a nivel de concepto, salvo otras vinculaciones de la ley de presupuestos; los ampliables, al nivel de desagregación con que aparecen"],
        ["Temporalidad (art. 39.1 LHA)", "Solo obligaciones por bienes y servicios del año natural; en enero pueden imputarse gastos devengados en el último trimestre del año anterior"],
        ["Excepciones a la temporalidad (art. 39.2 LHA)", "Se imputan al ejercicio de la orden de pago los atrasos del personal, las obligaciones de ejercicios anteriores con crédito ampliable y las de ejercicios cerrados"],
        ["Tramitación anticipada (art. 39.5-6 LHA)", "Pueden autorizarse gastos en el ejercicio anterior a su imputación, condicionados a la existencia de crédito adecuado y suficiente en el siguiente"],
      ],
      preguntas: [
        ["media", "Los créditos de los programas de gasto del presupuesto aragonés vinculan, con carácter general, a nivel de:", ["Concepto", "Capítulo", "Artículo", "Sección"], "Art. 36.4 LHA."],
        ["media", "Un acto administrativo que comprometa gasto por encima del crédito es:", ["Nulo de pleno derecho", "Anulable", "Válido", "Irregular no invalidante"], "Art. 36.2 LHA."],
        ["dificil", "Los créditos declarados ampliables vinculan:", ["Al nivel de desagregación con que aparecen en los estados de gastos", "A nivel de capítulo", "A nivel de sección", "No vinculan"], "Art. 36.4 LHA."],
        ["media", "Los pliegos de un contrato de tramitación anticipada deben advertir que el gasto queda condicionado a:", ["La existencia de crédito adecuado y suficiente en el ejercicio siguiente", "La aprobación del Tribunal de Cuentas", "El visto bueno sindical", "Nada"], "Art. 39.6 LHA."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Créditos ampliables (art. 37.1 LHA)", "Los que la ley de presupuestos relaciona de modo taxativo y singular; su ampliación efectiva exige expediente de modificación presupuestaria"],
        ["Financiación de las ampliaciones (art. 37.2 LHA)", "Con baja en otros créditos y, excepcionalmente, con mayores ingresos o remanentes de tesorería si lo permite la estabilidad; si no, proyecto de ley de crédito extraordinario o suplemento"],
        ["Crédito extraordinario (art. 40 LHA)", "Cuando hay que realizar un gasto y no existe crédito: proyecto de ley que el Gobierno remite a las Cortes, especificando su financiación"],
        ["Suplemento de crédito (art. 40 LHA)", "Cuando el crédito existe pero es insuficiente: también por proyecto de ley a las Cortes, con su financiación"],
        ["Iniciativa (art. 40 LHA)", "La persona titular del departamento de hacienda somete al Gobierno el acuerdo de remitir el proyecto de ley a las Cortes"],
        ["Reserva de ley (art. 5.1.a LHA)", "Los créditos extraordinarios y suplementos de crédito se aprueban por ley de las Cortes de Aragón"],
        ["Fondo de contingencia (art. 15 Ley 5/2012)", "Mínimo del 0,5 % del límite de gasto no financiero; solo financia ampliaciones, incorporaciones, créditos extraordinarios y suplementos"],
      ],
      preguntas: [
        ["media", "Si hay que realizar un gasto y no existe crédito para él, procede:", ["Un crédito extraordinario, por ley de las Cortes", "Un suplemento de crédito por resolución", "Una generación de crédito", "Una reposición"], "Art. 40 LHA."],
        ["media", "Si el crédito existe pero es insuficiente y no cabe otra modificación, procede:", ["Un suplemento de crédito, por ley", "Un crédito extraordinario por orden", "Una transferencia obligatoria", "Una incorporación de remanentes"], "Art. 40 LHA."],
        ["media", "Los créditos ampliables son los que:", ["Relaciona de modo taxativo y singular la ley de presupuestos", "Decide cada consejero", "Tienen financiación europea", "Son de capítulo 6"], "Art. 37.1 LHA."],
        ["dificil", "La ampliación de un crédito ampliable se financia, con carácter general:", ["Con baja en otros créditos y, excepcionalmente, con mayores ingresos o remanentes de tesorería", "Siempre con deuda", "Con cargo a las Cortes", "Sin necesidad de financiación"], "Art. 37.2 LHA."],
        ["media", "El fondo de contingencia puede financiar:", ["Ampliaciones, incorporaciones, créditos extraordinarios y suplementos", "Cualquier gasto ordinario", "Gastos de personal no previstos sin modificación", "Préstamos a empresas"], "Art. 15.2 Ley 5/2012."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Anulación de créditos (art. 41.1 LHA)", "Tras el cierre, los créditos no afectados a obligaciones reconocidas quedan anulados de pleno derecho"],
        ["Remanentes incorporables (art. 41.2 LHA)", "Créditos extraordinarios, suplementos y ampliaciones del último trimestre; créditos con autorizaciones antes del último mes y disposiciones antes del último día; créditos para operaciones de capital"],
        ["Órgano (art. 41.2 LHA)", "Los incorpora la persona titular del departamento competente en materia de hacienda"],
        ["Aplicación de los incorporados (art. 41.3 LHA)", "En aplicaciones de seguimiento diferenciado, dentro del ejercicio en que se acuerda la incorporación y, en los supuestos a) y b), para los mismos gastos"],
        ["Remanentes de capital (art. 41.4 LHA)", "Pueden incorporarse a cualquier programa de la misma sección en operaciones de capital"],
        ["Financiación afectada (art. 41.5 LHA)", "Se incorporan si se acredita la financiación; los de fondos propios asociados, con cargo al remanente de tesorería no afectado"],
        ["Financiación del resto (art. 41.6 LHA)", "Con cargo al remanente de tesorería no afectado o con baja en otros créditos"],
      ],
      preguntas: [
        ["media", "Los créditos no afectados a obligaciones reconocidas al cierre del ejercicio:", ["Quedan anulados de pleno derecho", "Pasan automáticamente al año siguiente", "Se transfieren a las Cortes", "Se convierten en ampliables"], "Art. 41.1 LHA."],
        ["media", "Pueden incorporarse al ejercicio siguiente, entre otros, los créditos para:", ["Operaciones de capital", "Gastos de protocolo", "Atenciones sociales", "Cualquier capítulo 2"], "Art. 41.2.c) LHA."],
        ["dificil", "Son incorporables los créditos que amparen disposiciones de gasto contraídas antes de:", ["El último día del ejercicio", "El 30 de junio", "El último trimestre", "El 1 de diciembre"], "Art. 41.2.b) LHA."],
        ["media", "La incorporación de remanentes la autoriza:", ["La persona titular del departamento competente en materia de hacienda", "El Pleno de las Cortes", "La Cámara de Cuentas", "El jefe de servicio"], "Art. 41.2 LHA."],
        ["media", "Las incorporaciones sin financiación afectada se financian con:", ["El remanente de tesorería no afectado o baja en otros créditos", "Deuda a corto plazo", "Tasas nuevas", "El Fondo de Garantía"], "Art. 41.6 LHA."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Generación de crédito (art. 42.1 LHA)", "Mayores ingresos a los previstos que generan crédito: aportaciones de personas físicas o jurídicas, enajenación de bienes, prestación de servicios, reembolso de préstamos y reintegros de ejercicios anteriores"],
        ["Requisito de la generación (art. 42.2 LHA)", "En las aportaciones, el reconocimiento del derecho; en los demás supuestos, la efectiva recaudación"],
        ["Competencia (art. 42.3 LHA)", "La persona titular del departamento de hacienda, a propuesta del departamento afectado"],
        ["Reposición de crédito (art. 43 LHA)", "Ingresos por pagos del ejercicio corriente que reponen crédito: reintegros por incapacidad laboral transitoria, de subvenciones cofinanciadas, de pagos indebidos y rendimientos positivos de derivados financieros"],
        ["Diferencia entre generación y reposición", "La reposición devuelve al crédito lo pagado indebida o recuperablemente en el ejercicio corriente; la generación crea crédito con ingresos nuevos o de ejercicios anteriores"],
      ],
      preguntas: [
        ["media", "Una aportación de una empresa privada para cofinanciar un gasto de la Comunidad puede dar lugar a:", ["Una generación de crédito", "Un crédito extraordinario", "Una transferencia", "Una reposición"], "Art. 42.1.a) LHA."],
        ["media", "Para generar crédito por la venta de un bien de la Comunidad es requisito:", ["La efectiva recaudación del derecho", "El simple reconocimiento del derecho", "Una ley", "La autorización de las Cortes"], "Art. 42.2.b) LHA."],
        ["dificil", "Para generar crédito por una aportación de personas físicas o jurídicas basta:", ["El reconocimiento del derecho", "La efectiva recaudación", "La firma de un convenio sin más", "La conformidad del Interventor General"], "Art. 42.2.a) LHA."],
        ["media", "El reintegro de un pago indebido realizado en el ejercicio corriente puede dar lugar a:", ["Una reposición de crédito", "Una generación de crédito", "Un suplemento de crédito", "Un crédito extraordinario"], "Art. 43.d) LHA."],
        ["media", "Las generaciones de crédito las autoriza:", ["La persona titular del departamento de hacienda, a propuesta del departamento afectado", "Las Cortes de Aragón", "El Gobierno de Aragón siempre", "El Interventor Delegado"], "Art. 42.3 LHA."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Transferencia de crédito", "Traspaso de dotación de un crédito a otro sin alterar la suma global del presupuesto"],
        ["Supuestos a propuesta de los departamentos (art. 44.1 LHA)", "Entre créditos de personal por reajustes de plantilla o estructuras; entre créditos de un mismo capítulo dentro de un mismo programa"],
        ["Otras transferencias (art. 44.2 LHA)", "Las que no alteren la suma global ni la distribución por secciones, autorizadas por la persona titular del departamento de hacienda"],
        ["Límite a) (art. 45.a LHA)", "No afectan a créditos ampliables ni a extraordinarios del ejercicio, ni pueden hacerse con cargo a créditos incorporados"],
        ["Límite b) (art. 45.b LHA)", "No minoran créditos de subvenciones nominativas ni los incrementados con suplementos o transferencias"],
        ["Límite c) (art. 45.c LHA)", "No aumentan créditos minorados por otras transferencias, salvo los de personal"],
        ["Límite d) (art. 45.d LHA)", "No se transfiere de operaciones de capital a corrientes, salvo para gastos de funcionamiento de nuevas inversiones"],
      ],
      preguntas: [
        ["media", "Una transferencia de crédito:", ["No altera la suma global de los créditos", "Aumenta el presupuesto total", "Requiere siempre una ley", "Crea un crédito nuevo con ingresos nuevos"], "Art. 44.2 LHA."],
        ["media", "No puede minorarse mediante transferencia un crédito destinado a:", ["Subvenciones nominativas", "Material de oficina", "Arrendamientos", "Reparaciones"], "Art. 45.b) LHA."],
        ["dificil", "Pasar crédito de inversiones a gastos corrientes solo es posible para:", ["Gastos derivados de la entrada en funcionamiento de nuevas inversiones", "Gastos de personal", "Atenciones protocolarias", "Cualquier necesidad urgente"], "Art. 45.d) LHA."],
        ["media", "No pueden realizarse transferencias con cargo a créditos:", ["Incorporados procedentes de ejercicios anteriores", "De capítulo 2", "De capítulo 6 del ejercicio", "De programas de formación"], "Art. 45.a) LHA."],
        ["media", "Las transferencias entre créditos de un mismo capítulo dentro de un mismo programa las acuerda:", ["La persona titular del departamento de hacienda, a propuesta del departamento", "Las Cortes", "El Gobierno de Aragón por decreto", "El jefe de servicio sin más"], "Art. 44.1.b) LHA."],
        ["dificil", "Un crédito que ya fue minorado por una transferencia puede después aumentarse por otra transferencia:", ["Solo si se trata de créditos de personal", "Siempre", "Nunca, sin excepción", "Solo en diciembre"], "Art. 45.c) LHA."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Expediente de modificación (art. 46.1 LHA)", "Toda modificación se instrumenta en expediente con la documentación y procedimiento que fije el departamento de hacienda"],
        ["Comunicación a las Cortes (art. 46.2 LHA)", "Copia de las resoluciones a la Comisión de hacienda de las Cortes en el mes siguiente; inmediata en las incorporaciones de remanentes de capital a otros programas"],
        ["Prórroga en 2026 (Orden HAP/1848/2025)", "Al no aprobarse el presupuesto de 2026, se prorrogó automáticamente el de 2024 (Ley 17/2023), sin aumentar la cuantía total de los créditos iniciales"],
        ["Excluidos de la prórroga", "Los créditos de programas con vigencia limitada a 2024 y, en los capítulos 4 y 7, las subvenciones nominativas de la Ley 17/2023"],
        ["Créditos prorrogados disponibles", "La sección 01 Cortes de Aragón íntegra; el capítulo 1 necesario para la plantilla; los capítulos 3 y 9 de la deuda con prioridad; el fondo de contingencia íntegro"],
        ["Decreto-ley 1/2026", "Concedió un suplemento de crédito de unos 619 millones de euros en el presupuesto de 2026 prorrogado, financiado con unos 485 millones de mayores ingresos y hasta unos 134 millones de endeudamiento; convalidado por las Cortes"],
        ["Decretos-leyes en Aragón (art. 44 EAA)", "Por necesidad urgente y extraordinaria; no pueden tener por objeto, entre otros, los tributos ni el Presupuesto de la Comunidad; deben convalidarse en treinta días"],
      ],
      preguntas: [
        ["media", "Las resoluciones de los expedientes de modificación presupuestaria se comunican a:", ["La Comisión competente en materia de hacienda de las Cortes de Aragón", "El Tribunal Constitucional", "La Comisión Europea", "Los sindicatos"], "Art. 46.2 LHA."],
        ["media", "En 2026, la Comunidad Autónoma de Aragón funciona con:", ["El presupuesto de 2024 prorrogado", "Una ley de presupuestos para 2026", "El presupuesto del Estado", "Un presupuesto aprobado por decreto"], "Orden HAP/1848/2025."],
        ["media", "Durante la prórroga de 2026 no se prorrogan, entre otros:", ["Los créditos de subvenciones nominativas", "Los gastos de personal", "Los intereses de la deuda", "Los créditos de las Cortes"], "Orden HAP/1848/2025, apartado sexto.e)."],
        ["dificil", "El Decreto-ley 1/2026 del Gobierno de Aragón:", ["Concedió un suplemento de crédito, financiado con mayores ingresos y endeudamiento", "Aprobó el presupuesto de 2026", "Creó un nuevo impuesto", "Derogó la Ley de Hacienda"], "Decreto-ley 1/2026, arts. 1-2 (BOE-A-2026-17288)."],
        ["media", "Los decretos-leyes del Gobierno de Aragón deben convalidarse por las Cortes en el plazo de:", ["Treinta días", "Tres meses", "Un año", "Quince días"], "Art. 44.2 EAA."],
        ["media", "Según el Estatuto, no puede ser objeto de decreto-ley:", ["El Presupuesto de la Comunidad Autónoma", "Una medida urgente sobre vivienda", "Una ayuda a damnificados", "Una modificación organizativa"], "Art. 44.1 EAA."],
      ],
    },
  ],
  glosario: [
    [S1, "Crédito limitativo", "Crédito que fija el máximo que puede comprometerse para su finalidad."],
    [S1, "Tramitación anticipada", "Preparación de un gasto en un ejercicio para imputarlo al presupuesto del siguiente."],
    [S2, "Crédito extraordinario", "Crédito nuevo, aprobado por ley, para un gasto que no tenía dotación."],
    [S2, "Suplemento de crédito", "Incremento, aprobado por ley, de un crédito existente que resulta insuficiente."],
    [S2, "Crédito ampliable", "Crédito que la ley de presupuestos permite aumentar mediante expediente en la cuantía necesaria."],
    [S3, "Remanente de crédito", "Parte del crédito no utilizada al cierre del ejercicio."],
    [S3, "Remanente de tesorería", "Magnitud de la liquidación que mide los recursos líquidos disponibles para financiar gasto."],
    [S4, "Generación de crédito", "Aumento de crédito financiado con ingresos no previstos de determinados tipos."],
    [S5, "Transferencia de crédito", "Traslado de dotación entre créditos sin variar el total del presupuesto."],
    [S6, "Decreto-ley", "Norma con rango de ley que dicta el Gobierno por urgencia y que deben convalidar las Cortes."],
  ],
  casos: [
    {
      slug: "modificaciones-servicio-provincial",
      titulo: "Un año de modificaciones en un servicio",
      supuesto: "Un servicio provincial gestiona varios créditos a lo largo del año: necesita más dinero en el concepto de reparaciones (tiene sobrante en suministros del mismo capítulo y programa), recibe una aportación de una fundación privada para cofinanciar una actividad, cobra el reintegro de un pago indebido del mismo año y, en diciembre, comprueba que una obra no podrá terminarse y quiere conservar el crédito para el año siguiente.",
      preguntas: [
        [S5, "media", "Mover crédito de suministros a reparaciones, en el mismo capítulo y programa, se hace mediante:", ["Una transferencia de crédito", "Un crédito extraordinario", "Una generación", "Una ley"], "Art. 44.1.b) LHA."],
        [S5, "media", "Esa transferencia la acuerda:", ["La persona titular del departamento de hacienda, a propuesta del departamento", "El jefe del servicio provincial", "Las Cortes", "El Interventor"], "Art. 44.1 LHA."],
        [S4, "media", "La aportación de la fundación puede dar lugar a:", ["Una generación de crédito", "Un suplemento de crédito", "Una reposición", "Una transferencia"], "Art. 42.1.a) LHA."],
        [S4, "media", "Para esa generación es requisito:", ["El reconocimiento del derecho", "La efectiva recaudación", "Una ley", "Nada"], "Art. 42.2.a) LHA."],
        [S4, "media", "El reintegro del pago indebido del mismo año puede:", ["Reponer crédito", "Generar un crédito extraordinario", "Incorporarse como remanente", "Transferirse a otra sección"], "Art. 43.d) LHA."],
        [S3, "media", "El crédito de la obra no utilizado a 31 de diciembre:", ["Queda anulado, pero puede incorporarse al ejercicio siguiente por ser de capital", "Se pierde sin remedio", "Se transfiere automáticamente", "Se convierte en ampliable"], "Art. 41.1-2.c) LHA."],
        [S3, "media", "La incorporación la autoriza:", ["La persona titular del departamento de hacienda", "El servicio provincial", "Las Cortes", "La Cámara de Cuentas"], "Art. 41.2 LHA."],
        [S3, "dificil", "Esa incorporación, si no hay financiación afectada, se financia con:", ["El remanente de tesorería no afectado o baja en otros créditos", "Un préstamo a corto plazo", "Las tasas del servicio", "El Fondo de Garantía"], "Art. 41.6 LHA."],
        [S6, "media", "Cada una de estas modificaciones se instrumenta en:", ["Un expediente de modificación presupuestaria", "Un contrato menor", "Un convenio", "Una instrucción verbal"], "Art. 46.1 LHA."],
        [S6, "media", "Las resoluciones se comunicarán a la Comisión de hacienda de las Cortes:", ["En el mes inmediato siguiente", "Al cabo de un año", "Solo si lo piden", "Nunca"], "Art. 46.2 LHA."],
      ],
    },
    {
      slug: "gasto-sin-credito-ley",
      titulo: "Un gasto sin crédito",
      supuesto: "Tras unas inundaciones, el Gobierno de Aragón debe financiar ayudas para las que no existe ningún crédito en el presupuesto y, además, reforzar un programa sanitario cuyo crédito es insuficiente. Ninguna transferencia, generación ni ampliación permite cubrirlo.",
      preguntas: [
        [S2, "media", "Para las ayudas sin crédito procede:", ["Un crédito extraordinario", "Un suplemento de crédito", "Una reposición", "Una transferencia"], "Art. 40 LHA."],
        [S2, "media", "Para el programa sanitario con crédito insuficiente procede:", ["Un suplemento de crédito", "Un crédito extraordinario", "Una generación", "Una incorporación"], "Art. 40 LHA."],
        [S2, "media", "Ambos se aprueban:", ["Por ley de las Cortes de Aragón", "Por orden del consejero de hacienda", "Por resolución del Interventor", "Por acuerdo de la Mesa"], "Art. 5.1.a) y 40 LHA."],
        [S2, "media", "El acuerdo de remitir el proyecto a las Cortes lo propone al Gobierno:", ["La persona titular del departamento de hacienda", "El consejero de sanidad", "El presidente de las Cortes", "La Cámara de Cuentas"], "Art. 40 LHA."],
        [S2, "media", "El proyecto de ley debe especificar:", ["La financiación adecuada", "Solo el gasto", "Los nombres de los beneficiarios", "El calendario electoral"], "Art. 40 LHA."],
        [S2, "dificil", "Para financiar estas modificaciones puede utilizarse el fondo de contingencia, que es como mínimo el:", ["0,5 % del límite de gasto no financiero", "5 % del presupuesto", "1 % del capítulo 1", "10 % de los ingresos"], "Art. 15 Ley 5/2012."],
        [S6, "media", "En 2026, con el presupuesto prorrogado, el Gobierno concedió un suplemento de crédito mediante:", ["El Decreto-ley 1/2026", "Una orden del consejero", "Una resolución del Interventor", "La Ley de Presupuestos de 2026"], "BOE-A-2026-17288."],
        [S6, "media", "Ese decreto-ley tuvo que ser:", ["Convalidado por las Cortes de Aragón", "Ratificado por el Rey", "Aprobado por el Senado", "Publicado solo en el BOE"], "Art. 44.2 EAA; convalidación publicada en el BOA núm. 133."],
        [S6, "media", "El suplemento de 2026 se financió con mayores ingresos y, por el resto:", ["Con operaciones de endeudamiento", "Con una subida de tasas", "Con fondos de las comarcas", "Sin financiación"], "Decreto-ley 1/2026, art. 2."],
        [S1, "media", "Comprometer el gasto antes de aprobar la modificación vulneraría:", ["El carácter limitativo de los créditos", "La unidad de caja", "El principio de transparencia", "La regla de gasto"], "Art. 36.2 LHA."],
      ],
    },
    {
      slug: "prorroga-presupuesto-2026",
      titulo: "Gestionar un presupuesto prorrogado",
      supuesto: "El 1 de enero de 2026 no hay presupuesto aprobado. La jefa de sección económica de una Secretaría General Técnica debe saber qué créditos puede usar: los de personal, una subvención nominativa a una asociación prevista en la ley de 2024, un programa de un evento que solo se celebró en 2024 y los intereses de la deuda.",
      preguntas: [
        [S6, "media", "El presupuesto que se aplica es:", ["El de 2024, prorrogado automáticamente", "El de 2025", "Ninguno", "Uno aprobado por el Gobierno"], "Art. 111.3 EAA, art. 35 LHA y Orden HAP/1848/2025."],
        [S6, "media", "Las condiciones de la prórroga las fijó:", ["La Orden HAP/1848/2025 del departamento de hacienda", "Una ley de las Cortes", "El Tribunal de Cuentas", "Un decreto del Presidente"], "Art. 35.3 LHA."],
        [S6, "media", "La subvención nominativa prevista en la ley de 2024:", ["No se prorroga", "Se prorroga íntegramente", "Se duplica", "Se convierte en ampliable"], "Orden HAP/1848/2025, apartado sexto.e)."],
        [S6, "media", "El programa del evento que solo se celebró en 2024:", ["Queda excluido de la prórroga", "Se prorroga", "Se transfiere a las Cortes", "Se convierte en remanente"], "Art. 35.2 LHA."],
        [S6, "media", "Los créditos de personal se prorrogan en lo necesario para:", ["Cubrir la plantilla vigente y los compromisos de personal ya autorizados", "Crear nuevos cuerpos", "Pagar cualquier gratificación", "Nada"], "Orden HAP/1848/2025, apartado sexto.b)."],
        [S6, "dificil", "Los intereses y la amortización de la deuda:", ["Se prorrogan en todo caso y con prioridad", "Quedan suspendidos", "Se pagan solo si sobra crédito", "Requieren una ley especial"], "Orden HAP/1848/2025, apartado sexto.d); art. 135.3 CE."],
        [S6, "media", "La prórroga puede suponer un aumento de la cuantía total de los créditos iniciales:", ["No, en ningún caso", "Sí, hasta un 10 %", "Sí, si lo decide el consejero", "Sí, con el IPC"], "Orden HAP/1848/2025, apartado cuarto."],
        [S5, "media", "Si un crédito prorrogado es insuficiente para un compromiso adquirido, hay que tramitar:", ["La modificación presupuestaria correspondiente, preferentemente con créditos de la misma sección", "Nada", "Un contrato nuevo", "Un decreto-ley siempre"], "Orden HAP/1848/2025, apartado quinto."],
        [S6, "media", "La ejecución y modificación de los créditos durante la prórroga se rige por:", ["La Ley de Hacienda de Aragón y los títulos II y III de la Ley 17/2023", "Solo por instrucciones verbales", "La Ley General Presupuestaria", "El Código Civil"], "Orden HAP/1848/2025, apartado quinto."],
        [S6, "media", "El fondo de contingencia durante la prórroga:", ["Mantiene íntegramente su disponibilidad", "Desaparece", "Se reduce a la mitad", "Pasa a las Cortes"], "Orden HAP/1848/2025, apartado sexto.f)."],
      ],
    },
  ],
});

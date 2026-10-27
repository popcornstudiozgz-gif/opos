/**
 * Ficha (sin material de estudio) de Técnico/a de Administración General
 * (TAG) de la Diputación Provincial de Zaragoza: Escala de Administración
 * General, Subescala Técnica (A1), turno libre.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Decreto de Presidencia núm. 495, de 10-03-2026, convocatoria y bases
 *   (BOPZ núm. 64, de 20-03-2026, edicto núm. 1709): base 2 (7 plazas: 3
 *   OEP 2023, 3 OEP 2024 y 1 OEP 2025; se le sumaría la plaza de la reserva
 *   por discapacidad física convocada aparte si quedara vacante), 3
 *   (titulaciones admitidas), 4 (12,02 €), 5 (tres ejercicios: test de 100
 *   preguntas en 90 minutos con penalización A − E/3; cinco temas por
 *   escrito en cinco horas, uno de cada parte, leídos en público; dos
 *   informes sobre supuestos en cuatro horas con textos legales; todos de 0
 *   a 10 con mínimo 5), 6.2 (letra «U») y anexo II (programa de 123 temas
 *   en cinco partes).
 * - BOE-A-2026-8721 (BOE de 21-04-2026): extracto que abre el plazo de 20
 *   días hábiles. No se ha calculado aquí la fecha exacta de cierre.
 * - El Justicia de Aragón tramitó una queja (expediente Q26/645/02) porque
 *   las bases no admiten el grado en Ciencias Políticas; no se recoge como
 *   dato de la ficha más allá de la lista literal de titulaciones.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-tag-dpz.mjs
 */
import { sembrarFicha } from "./lib/sembrar-ficha.mjs";

const SLUG = "tag-dpz";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Técnico/a de Administración General (TAG)",
    organismo: "Diputación Provincial de Zaragoza",
    organismo_slug: "dpz",
    puesto_slug: "tecnico-administracion-general",
    descripcion_corta: "Oposición de Técnico/a de Administración General (TAG, A1) de la Diputación Provincial de Zaragoza: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario de la Escala de Administración General, Subescala Técnica (subgrupo A1), de la Diputación Provincial de Zaragoza (DPZ). Se exige un grado en Derecho, Administración y Dirección de Empresas, Economía, Finanzas o alguna de las otras titulaciones que enumeran las bases. El programa tiene 123 temas en cinco partes —derecho constitucional, autonómico y comunitario; derecho administrativo general; derecho administrativo local; derecho financiero y presupuestario; y derecho civil y urbanístico—, y la oposición tiene tres ejercicios: un test, cinco temas por escrito y dos informes prácticos.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOPZ 64/2026 (decreto núm. 495)",
    organismo: "Diputación Provincial de Zaragoza",
    plaza: "Técnico/a de Administración General — Escala de Administración General, Subescala Técnica, clase Superior (subgrupo A1)",
    fecha_decreto: "10 de marzo de 2026",
    sistema_seleccion: "Oposición libre, con tres ejercicios eliminatorios",
    requisito_titulacion: "Grado en Derecho, Ciencias Jurídicas de las Administraciones Públicas, Dirección de Empresas, Administración de Empresas, Administración y Dirección de Empresas, Contabilidad y Finanzas, Economía, Economía Financiera, Economía y Finanzas, Finanzas y Contabilidad, Economía y Gestión, Gestión Económica Financiera, o equivalentes.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación del extracto en el BOE (BOE-A-2026-8721, 21 de abril de 2026); plazo ya cerrado. Tasa de 12,02 €, que se paga por ingreso bancario y se presenta con la solicitud.",
    duracion_maxima_proceso: "Las bases específicas no lo fijan; remiten a la base 7 de las bases generales de la DPZ (BOPZ núm. 71, de 29 de marzo de 2021).",
    orden_actuacion: "Por orden alfabético, empezando por la letra «U» (sorteo de la Administración del Estado, BOE de 1 de agosto de 2025).",
    plazas_total: 7,
    desglose_plazas: [{ turno: "Turno libre", cantidad: 7 }],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria (BOPZ núm. 64, 20 de marzo de 2026)", url: "https://bop.dpz.es/BOPZ/UploadServlet?ruta=Boletines%5C2026%5C64%5CEdictos%5Cbop_1709_2026.pdf" },
      { titulo: "Extracto en el BOE (BOE-A-2026-8721, 21 de abril de 2026)", url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-8721" },
    ],
    ultima_actualizacion: "27 de octubre de 2026",
    pruebas: [
      {
        id: "primer-ejercicio", icono: "📝", numero: 1,
        nombre: "Primer ejercicio (test)",
        formato: "Test sobre todo el temario",
        duracion: "90 minutos",
        opciones: "100 preguntas, 4 alternativas",
        detalle: "Con penalización: cada error resta un tercio de acierto (aciertos − errores/3). Se califica de 0 a 10 y hay que sacar al menos un 5.",
      },
      {
        id: "segundo-ejercicio", icono: "✍️", numero: 2,
        nombre: "Segundo ejercicio (temas por escrito)",
        formato: "Desarrollo por escrito de cinco temas sacados a la suerte",
        duracion: "5 horas",
        opciones: "Un tema de cada una de las cinco partes, todos obligatorios",
        detalle: "Se lee en sesión pública ante el tribunal. Se valora el dominio del temario, la claridad, el rigor y la expresión escrita. Se califica de 0 a 10 y hay que sacar al menos un 5.",
      },
      {
        id: "tercer-ejercicio", icono: "📋", numero: 3,
        nombre: "Tercer ejercicio (práctico)",
        formato: "Dos informes con propuesta de resolución sobre supuestos prácticos",
        duracion: "4 horas",
        opciones: "Se permiten textos legales y calculadora, no libros de casos resueltos",
        detalle: "Se lee en sesión pública ante el tribunal. Se califica de 0 a 10 y hay que sacar al menos un 5.",
      },
    ],
    estado: "cerrada",
    plazo_fin: null,
  },
});

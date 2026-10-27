/**
 * Ficha (sin material de estudio) de Administrativo/a de la Diputación
 * Provincial de Zaragoza: Escala de Administración General, Subescala
 * Administrativa (C1), turno libre.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Decreto de Presidencia núm. 595, de 17-03-2026, convocatoria y bases
 *   (BOPZ núm. 68, de 25-03-2026, edicto núm. 1895): base 2 (10 plazas de
 *   la OEP 2025), 3 (Bachiller, Técnico o equivalente), 4 (6,01 €), 5 (dos
 *   ejercicios que pueden hacerse el mismo día: test de 100 preguntas en 90
 *   minutos con penalización A − E/3, y supuestos prácticos con preguntas
 *   cortas o tipo test sin penalización, con el tiempo que fije el
 *   tribunal; ambos de 0 a 10 con mínimo 5), 6.2 (letra «U») y anexo II
 *   (programa de 40 temas: 8 comunes y 32 específicos).
 * - BOE-A-2026-9821 (BOE de 06-05-2026): extracto que abre el plazo de 20
 *   días hábiles. No se ha calculado aquí la fecha exacta de cierre.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-administrativo-dpz.mjs
 */
import { sembrarFicha } from "./lib/sembrar-ficha.mjs";

const SLUG = "administrativo-dpz";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Administrativo/a",
    organismo: "Diputación Provincial de Zaragoza",
    organismo_slug: "dpz",
    puesto_slug: "administrativo",
    descripcion_corta: "Oposición de Administrativo/a (C1) de la Diputación Provincial de Zaragoza: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario de la Escala de Administración General, Subescala Administrativa (subgrupo C1), de la Diputación Provincial de Zaragoza (DPZ). Se exige Bachiller, Técnico o equivalente. El programa tiene 40 temas —8 comunes y 32 específicos: procedimiento y acto administrativo, régimen local y provincial, contratación, bienes, subvenciones, personal, presupuesto y hacienda local, administración electrónica, ofimática y prevención de riesgos laborales—, y la oposición tiene dos ejercicios: un test de 100 preguntas y un ejercicio de supuestos prácticos.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOPZ 68/2026 (decreto núm. 595)",
    organismo: "Diputación Provincial de Zaragoza",
    plaza: "Administrativo/a — Escala de Administración General, Subescala Administrativa (subgrupo C1)",
    fecha_decreto: "17 de marzo de 2026",
    sistema_seleccion: "Oposición libre, con dos ejercicios eliminatorios",
    requisito_titulacion: "Título de Bachiller, Técnico o equivalente.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación del extracto en el BOE (BOE-A-2026-9821, 6 de mayo de 2026); plazo ya cerrado. Tasa de 6,01 €, que se paga por ingreso bancario y se presenta con la solicitud.",
    duracion_maxima_proceso: "Las bases específicas no lo fijan; remiten a la base 7 de las bases generales de la DPZ (BOPZ núm. 71, de 29 de marzo de 2021).",
    orden_actuacion: "Por orden alfabético, empezando por la letra «U» (sorteo de la Administración del Estado, BOE de 1 de agosto de 2025).",
    plazas_total: 10,
    desglose_plazas: [{ turno: "Turno libre", cantidad: 10 }],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria (BOPZ núm. 68, 25 de marzo de 2026)", url: "https://bop.dpz.es/BOPZ/UploadServlet?ruta=Boletines%5C2026%5C68%5CEdictos%5Cbop_1895_2026.pdf" },
      { titulo: "Extracto en el BOE (BOE-A-2026-9821, 6 de mayo de 2026)", url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-9821" },
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
        id: "segundo-ejercicio", icono: "📋", numero: 2,
        nombre: "Segundo ejercicio (supuestos prácticos)",
        formato: "Uno o varios supuestos con preguntas cortas o tipo test",
        duracion: "La fija el tribunal",
        opciones: "Las preguntas tipo test de este ejercicio no penalizan",
        detalle: "Puede hacerse el mismo día que el test, con al menos 30 minutos de descanso, y solo se corrige a quien haya aprobado el primero. Se califica de 0 a 10 y hay que sacar al menos un 5.",
      },
    ],
    estado: "cerrada",
    plazo_fin: null,
  },
});

/**
 * Ficha (sin material de estudio) de Administrador/a Superior del Gobierno
 * de Aragón: Cuerpo de Funcionarios Superiores, Escala Superior de
 * Administración (A1), convocatoria 25/0046.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 5 de febrero de 2026 del Director General de la Función
 *   Pública (BOA núm. 35, de 20-02-2026): base 1.1 (26 plazas: 4 OEP 2023,
 *   7 OEP 2024 y 15 OEP 2025; 1 reservada a víctimas de terrorismo y 1 a
 *   personas transexuales), 1.3 (tres ejercicios + curso selectivo), 1.5,
 *   2.1.e (Licenciado, Ingeniero, Arquitecto o Grado), 3.5 (39,98 €), 6.2
 *   (dos temas por escrito en tres horas, leídos en sesión pública), 6.3
 *   (oral: cuatro temas al azar, 40-45 minutos, 20 de preparación), 6.4
 *   (práctico de cuatro horas: 30 preguntas cortas sobre un máximo de tres
 *   supuestos + informe o dictamen), 8.1-8.3 (0-20, 0-40 y 0-40 puntos, con
 *   un mínimo de 5 sobre 10 en cada tema), 10.4 (curso en línea de 40
 *   horas), letra «Q».
 * - Programa: Anexo I de la Resolución de 25-11-2025 para Administradores
 *   Superiores (130 temas), PDF en aragon.es.
 * - Ficha oficial 25/0046 en aplicaciones.aragon.es/oepc: plazo del
 *   23-02-2026 al 23-03-2026.
 * - Decreto 11/2026 (OEP 2026): 27 plazas de turno libre (anexo I) y 7 para
 *   personas con discapacidad física o sensorial (anexo III), sin convocar.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-administrador-superior-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "administrador-superior-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Administrador/a Superior",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "administrador-superior",
    descripcion_corta: "Oposición de Administrador/a Superior (A1) del Gobierno de Aragón: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario del Cuerpo de Funcionarios Superiores de la Administración de la Comunidad Autónoma de Aragón, Escala Superior de Administración (subgrupo A1), el cuerpo técnico superior de la DGA. Se exige una licenciatura o un grado. El programa tiene 130 temas: derecho constitucional, autonómico y de la Unión Europea, derecho administrativo, contratación, empleo público, hacienda y tributos, políticas públicas de Aragón y derecho civil aragonés. La oposición tiene tres ejercicios: dos temas por escrito, cuatro temas orales y un práctico.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 35/2026 (código 25/0046)",
    organismo: DGA.organismo,
    plaza: "Administradores Superiores — Cuerpo de Funcionarios Superiores de la Administración General de la Comunidad Autónoma de Aragón, Escala Superior de Administración (subgrupo A1)",
    fecha_decreto: "5 de febrero de 2026",
    sistema_seleccion: "Oposición, turno libre (tres ejercicios eliminatorios), seguida de un curso de formación selectivo (en línea, 40 horas, apto o no apto)",
    requisito_titulacion: "Título universitario oficial de Licenciado, Ingeniero, Arquitecto o Grado.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 23 de febrero al 23 de marzo de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 39,98 €. La Oferta de Empleo Público de 2026 prevé 27 plazas más de turno libre y 7 para personas con discapacidad física o sensorial, todavía sin convocar.",
    duracion_maxima_proceso: "Los ejercicios se celebran entre los tres y los doce meses siguientes a la publicación de la convocatoria (base 1.5).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «Q» (sorteo del Instituto Aragonés de Administración Pública de 8 de abril de 2025).",
    plazas_total: 26,
    desglose_plazas: [
      { turno: "Turno libre", cantidad: 24 },
      { turno: "Reserva para víctimas de terrorismo", cantidad: 1 },
      { turno: "Reserva para personas transexuales", cantidad: 1 },
    ],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria (BOA núm. 35, 20 de febrero de 2026)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1436711130404" },
      { titulo: "Programa de materias de Administradores Superiores (Resolución de 25 de noviembre de 2025)", url: "https://www.aragon.es/documents/d/guest/addor-superior-pdf" },
      DGA.ficha("250046", "25/0046"),
      DGA.oep2026,
    ],
    ultima_actualizacion: "27 de octubre de 2026",
    pruebas: [
      {
        id: "primer-ejercicio", icono: "✍️", numero: 1,
        nombre: "Primer ejercicio (escrito)",
        formato: "Desarrollo por escrito de dos temas",
        duracion: "3 horas",
        opciones: "2 temas del programa",
        detalle: "Se lee en sesión pública ante el órgano de selección. Se califica de 0 a 20 puntos; cada tema vale 10 y hay que sacar al menos un 5 en cada uno.",
      },
      {
        id: "segundo-ejercicio", icono: "🎤", numero: 2,
        nombre: "Segundo ejercicio (oral)",
        formato: "Exposición oral de cuatro temas sacados al azar",
        duracion: "Entre 40 y 45 minutos (20 de preparación)",
        opciones: "4 temas, al menos 8 minutos cada uno",
        detalle: "Los temas se sacan por bolas de entre todos los del programa. Se califica de 0 a 40 puntos; cada tema vale 10 y hay que sacar al menos un 5 en cada uno.",
      },
      {
        id: "tercer-ejercicio", icono: "📋", numero: 3,
        nombre: "Tercer ejercicio (práctico)",
        formato: "Preguntas cortas sobre supuestos + informe o dictamen",
        duracion: "4 horas",
        opciones: "30 preguntas cortas sobre un máximo de 3 supuestos",
        detalle: "Primera parte (0-20 puntos, mínimo 10) y segunda parte (0-20 puntos, mínimo 10). Se pueden usar libros y textos propios, y un ordenador o tableta sin conexión a internet. Se lee ante el órgano de selección.",
      },
    ],
    estado: "cerrada",
    plazo_fin: "2026-03-23",
  },
});

/**
 * Datos de convocatoria, por oposición. A diferencia del temario, la
 * convocatoria NO es reutilizable entre oposiciones (plazas, plazos y
 * requisitos son siempre propios de cada una), así que aquí no hay
 * concepto de "canónico" — cada oposición tiene la suya, punto.
 *
 * Portado de `kubo-calendario/src/data/convocatoria.ts` (CONV 4/2026,
 * Auxiliar Administrativo/a · Ayuntamiento de Zaragoza).
 */

export interface DesglosePlazas {
  turno: string;
  cantidad: number;
}

export interface FaseAspirantes {
  fase: string;
  cantidad: string;
}

export interface EnlaceOficial {
  titulo: string;
  url: string;
}

export interface PruebaExamen {
  id: string;
  numero: number;
  nombre: string;
  icono: string;
  duracion: string;
  formato: string;
  opciones: string;
  detalle: string;
}

export interface Convocatoria {
  oposicionSlug: string;
  numero: string;
  organismo: string;
  plaza: string;
  fechaDecreto: string;
  sistemaSeleccion: string;
  requisitoTitulacion: string;
  plazoInstancias: string;
  duracionMaximaProceso: string;
  ordenActuacion: string;
  plazasTotal: number;
  desglosePlazas: DesglosePlazas[];
  aspirantesQuePasanFase: FaseAspirantes[];
  enlacesOficiales: EnlaceOficial[];
  ultimaActualizacion: string;
  pruebas: PruebaExamen[];
}

export const CONVOCATORIAS: Convocatoria[] = [
  {
    oposicionSlug: "auxiliar-administrativo",
    numero: "CONV 4/2026",
    organismo: "Ayuntamiento de Zaragoza — Oficina de Recursos Humanos",
    plaza: "Auxiliar Administrativo/a — Escala de Administración General (Grupo/Subgrupo C2)",
    fechaDecreto: "15 de julio de 2026",
    sistemaSeleccion: "Oposición, turno libre ordinario y turnos libres de reserva",
    requisitoTitulacion:
      "Graduado/a en Educación Secundaria Obligatoria (ESO), o titulación equivalente a efectos profesionales.",
    plazoInstancias:
      "20 días naturales a partir del día siguiente a la publicación del extracto de la convocatoria en el Boletín Oficial del Estado (BOE).",
    duracionMaximaProceso: "6 meses, contados desde la celebración del primer ejercicio.",
    ordenActuacion:
      "Se inicia por las personas aspirantes cuyo primer apellido comience por la letra «V» (y, si no las hubiera, por la «W», y así sucesivamente).",
    plazasTotal: 85,
    desglosePlazas: [
      { turno: "Turno libre ordinario (TLO)", cantidad: 69 },
      { turno: "Turno libre ordinario — ampliación", cantidad: 8 },
      { turno: "Reserva discapacidad física, sensorial u otra", cantidad: 4 },
      { turno: "Reserva personas transexuales", cantidad: 1 },
      { turno: "Reserva discapacidad intelectual", cantidad: 2 },
      { turno: "Reserva discapacidad mental", cantidad: 1 },
    ],
    aspirantesQuePasanFase: [
      {
        fase: "Superan el test teórico y pasan a casos prácticos",
        cantidad: "1.544 personas aspirantes (1.399 turno libre + 145 turnos de reserva)",
      },
      {
        fase: "Superan los casos prácticos y pasan a la prueba de informática",
        cantidad: "170 personas aspirantes (154 turno libre + 16 turnos de reserva)",
      },
    ],
    enlacesOficiales: [
      {
        titulo: "Bases específicas de la convocatoria (PDF)",
        url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2081.pdf",
      },
      {
        titulo: "Portal de Oferta de Empleo Público del Ayuntamiento de Zaragoza",
        url: "https://www.zaragoza.es/oferta",
      },
    ],
    ultimaActualizacion: "17 de agosto de 2026",
    pruebas: [
      {
        id: "test-teorico",
        numero: 1,
        nombre: "Test teórico",
        icono: "📝",
        duracion: "55 minutos",
        formato: "50 preguntas + 5 de reserva",
        opciones: "3 opciones de respuesta",
        detalle:
          "Preguntas tipo test sobre los 20 temas del temario oficial. Las 5 preguntas de reserva solo se corrigen si se anula alguna de las 50 principales.",
      },
      {
        id: "casos-practicos",
        numero: 2,
        nombre: "Casos prácticos",
        icono: "📋",
        duracion: "30 minutos",
        formato: "2 casos prácticos de 10 preguntas cada uno (20 preguntas)",
        opciones: "4 opciones de respuesta",
        detalle:
          "Supuestos prácticos relacionados con las funciones del puesto, resueltos mediante preguntas tipo test asociadas a cada caso.",
      },
      {
        id: "informatica",
        numero: 3,
        nombre: "Prueba de informática",
        icono: "💻",
        duracion: "30 minutos",
        formato: "Prueba práctica con ordenador",
        opciones: "LibreOffice Writer y Calc (v. 24.2.6 o versión vigente)",
        detalle:
          "Solo la realizan quienes superan el test y los casos prácticos (máx. 170 aspirantes). Ejercicio práctico de ofimática y nociones de sistemas operativos (Windows 11 y Ubuntu 24).",
      },
    ],
  },
];

export function getConvocatoria(oposicionSlug: string): Convocatoria | undefined {
  return CONVOCATORIAS.find((c) => c.oposicionSlug === oposicionSlug);
}

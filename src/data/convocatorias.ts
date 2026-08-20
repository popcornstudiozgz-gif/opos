import { createClient } from "@/lib/supabase/public";

/**
 * Datos de convocatoria, por oposición. A diferencia del temario, la
 * convocatoria NO es reutilizable entre oposiciones (plazas, plazos y
 * requisitos son siempre propios de cada una) — de ahí que en Supabase sea
 * una tabla 1:1 con `oposiciones` (`oposicion_slug` como PK), sin concepto
 * de "canónico".
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

type FilaConvocatoria = {
  oposicion_slug: string;
  numero: string;
  organismo: string;
  plaza: string;
  fecha_decreto: string;
  sistema_seleccion: string;
  requisito_titulacion: string;
  plazo_instancias: string;
  duracion_maxima_proceso: string;
  orden_actuacion: string;
  plazas_total: number;
  desglose_plazas: DesglosePlazas[];
  aspirantes_que_pasan_fase: FaseAspirantes[];
  enlaces_oficiales: EnlaceOficial[];
  ultima_actualizacion: string;
  pruebas: PruebaExamen[];
};

function mapConvocatoria(fila: FilaConvocatoria): Convocatoria {
  return {
    oposicionSlug: fila.oposicion_slug,
    numero: fila.numero,
    organismo: fila.organismo,
    plaza: fila.plaza,
    fechaDecreto: fila.fecha_decreto,
    sistemaSeleccion: fila.sistema_seleccion,
    requisitoTitulacion: fila.requisito_titulacion,
    plazoInstancias: fila.plazo_instancias,
    duracionMaximaProceso: fila.duracion_maxima_proceso,
    ordenActuacion: fila.orden_actuacion,
    plazasTotal: fila.plazas_total,
    desglosePlazas: fila.desglose_plazas,
    aspirantesQuePasanFase: fila.aspirantes_que_pasan_fase,
    enlacesOficiales: fila.enlaces_oficiales,
    ultimaActualizacion: fila.ultima_actualizacion,
    pruebas: fila.pruebas,
  };
}

export async function getConvocatoria(oposicionSlug: string): Promise<Convocatoria | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("convocatorias")
    .select("*")
    .eq("oposicion_slug", oposicionSlug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapConvocatoria(data) : undefined;
}

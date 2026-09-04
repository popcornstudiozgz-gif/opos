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

/**
 * Estado real del plazo de instancias, fijado a mano en cada script de
 * convocatoria (no calculado a partir de fechas: la fecha de publicación
 * en el BOE, de la que depende el cierre real del plazo, no siempre está
 * en la propia base de datos). "pendiente_publicacion" es el caso de una
 * plaza prevista en la oferta de empleo público cuyas bases específicas
 * todavía no se han publicado (ver Oficial Fontanero).
 */
export type EstadoConvocatoria = "abierta" | "cerrada" | "pendiente_publicacion";

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
  estado: EstadoConvocatoria;
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
  estado: EstadoConvocatoria;
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
    estado: fila.estado,
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

export interface ConvocatoriaAbierta {
  oposicionSlug: string;
  organismoSlug: string;
  puestoSlug: string;
  nombre: string;
  organismo: string;
  plazasTotal: number;
  plazoInstancias: string;
}

/**
 * Convocatorias con `estado = 'abierta'` ahora mismo, para el bloque de
 * la home. Al ser contenido opcional (la home debe seguir funcionando
 * igual si esto falla o si hoy no hay ninguna abierta) sigue el mismo
 * criterio "nunca se rechaza" que `lib/blog.ts`: `[]` ante cualquier
 * fallo, nunca tumba el resto de la página.
 */
export async function getConvocatoriasAbiertas(): Promise<ConvocatoriaAbierta[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("convocatorias")
      .select("oposicion_slug, plazas_total, plazo_instancias, oposiciones!inner(nombre, organismo, organismo_slug, puesto_slug, activa)")
      .eq("estado", "abierta")
      .eq("oposiciones.activa", true)
      .returns<
        {
          oposicion_slug: string;
          plazas_total: number;
          plazo_instancias: string;
          oposiciones: { nombre: string; organismo: string; organismo_slug: string; puesto_slug: string } | { nombre: string; organismo: string; organismo_slug: string; puesto_slug: string }[] | null;
        }[]
      >();
    if (error) throw error;
    return (data ?? []).flatMap((fila) => {
      const oposicion = Array.isArray(fila.oposiciones) ? fila.oposiciones[0] : fila.oposiciones;
      if (!oposicion) return [];
      return [
        {
          oposicionSlug: fila.oposicion_slug,
          organismoSlug: oposicion.organismo_slug,
          puestoSlug: oposicion.puesto_slug,
          nombre: oposicion.nombre,
          organismo: oposicion.organismo,
          plazasTotal: fila.plazas_total,
          plazoInstancias: fila.plazo_instancias,
        },
      ];
    });
  } catch (error) {
    console.warn("No se pudieron cargar las convocatorias abiertas:", error);
    return [];
  }
}

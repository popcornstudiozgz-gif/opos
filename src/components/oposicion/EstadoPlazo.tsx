"use client";

import { useSyncExternalStore } from "react";
import { plazoVencido } from "@/lib/plazos";
import type { Convocatoria } from "@/data/convocatorias";

const ETIQUETA: Record<Convocatoria["estado"], string> = {
  abierta: "Abierto",
  cerrada: "Cerrado",
  pendiente_publicacion: "Aún no abierto",
};

const sinSuscripcion = () => () => {};

/**
 * Estado del plazo de instancias en la ficha. Las fichas son estáticas (se
 * generan al desplegar y no se regeneran solas, ver CLAUDE.md), así que el
 * estado calculado en el servidor se queda congelado hasta el siguiente
 * despliegue. Aquí se vuelve a comprobar `plazoFin` en el navegador con la
 * fecha del día: una convocatoria abierta pasa a "Cerrado" en cuanto vence,
 * sin desplegar ni lanzar ningún script. En el servidor (y en la
 * hidratación) se usa el valor guardado; en el navegador, el de hoy.
 */
export function EstadoPlazo({ estado, plazoFin }: { estado: Convocatoria["estado"]; plazoFin: string | null }) {
  const vencido = useSyncExternalStore(sinSuscripcion, () => plazoVencido(plazoFin), () => false);
  return <>{ETIQUETA[estado === "abierta" && vencido ? "cerrada" : estado]}</>;
}

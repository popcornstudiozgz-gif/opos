import { createClient } from "@/lib/supabase/public";

/**
 * Formulario de contacto: usa el mismo cliente `anon` que el resto del
 * sitio para leer contenido, pero aquí solo para INSERTAR — la política
 * RLS de `contactos` permite escribir a cualquiera y no permite leer a
 * nadie que no sea `service_role` (ver migración 0006).
 */

export type TipoContacto = "duda" | "error_contenido" | "fallo_web" | "otro";

export const TIPOS_CONTACTO: { id: TipoContacto; label: string }[] = [
  { id: "duda", label: "Tengo una duda" },
  { id: "error_contenido", label: "He visto una pregunta o caso práctico con un error" },
  { id: "fallo_web", label: "He encontrado un fallo técnico en la web" },
  { id: "otro", label: "Otro" },
];

export interface DatosContacto {
  nombre: string;
  email: string;
  oposicionSlug: string | null;
  tipo: TipoContacto;
  mensaje: string;
  referencia: string;
  newsletterOptin: boolean;
}

export async function enviarContacto(datos: DatosContacto): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("contactos").insert({
    nombre: datos.nombre.trim() || null,
    email: datos.email.trim(),
    oposicion_slug: datos.oposicionSlug,
    tipo: datos.tipo,
    mensaje: datos.mensaje.trim(),
    referencia: datos.referencia.trim() || null,
    newsletter_optin: datos.newsletterOptin,
  });
  if (error) throw error;
}

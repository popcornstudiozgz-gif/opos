import { crearMetadata } from "@/lib/site";

export const metadata = crearMetadata({
  titulo: "Actualizar contraseña",
  descripcion: "Establece una nueva contraseña para tu cuenta.",
  ruta: "/actualizar-password",
  indexable: false, // página de acción (formulario), sin intención de búsqueda propia
});

// `page.tsx` es "use client" y no puede exportar `metadata` — de ahí este
// layout, que solo existe para eso.
export default function ActualizarPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}

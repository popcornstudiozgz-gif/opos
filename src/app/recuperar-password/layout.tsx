import { crearMetadata } from "@/lib/site";

export const metadata = crearMetadata({
  titulo: "Recuperar contraseña",
  descripcion: "Solicita un enlace para restablecer tu contraseña.",
  ruta: "/recuperar-password",
  indexable: false, // página de acción (formulario), sin intención de búsqueda propia
});

// `page.tsx` es "use client" y no puede exportar `metadata` — de ahí este
// layout, que solo existe para eso.
export default function RecuperarPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}

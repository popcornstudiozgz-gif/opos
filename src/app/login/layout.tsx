import { crearMetadata } from "@/lib/site";

export const metadata = crearMetadata({
  titulo: "Iniciar sesión",
  descripcion: "Accede a tu cuenta.",
  ruta: "/login",
  indexable: false, // página de acción (formulario), sin intención de búsqueda propia
});

// `page.tsx` es "use client" y no puede exportar `metadata` — de ahí este
// layout, que solo existe para eso.
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}

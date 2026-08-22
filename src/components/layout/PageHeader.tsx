import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

/**
 * Cabecera "franja" para páginas internas de listado (temario, convocatoria,
 * simulacro, blog, legales...): banda de color que diferencia el título del
 * resto del contenido, en vez de un `<h1>` suelto sobre fondo blanco. Mismo
 * patrón que el proyecto original — páginas de detalle (un tema, un
 * artículo) no la usan, igual que allí.
 */
export function PageHeader({
  titulo,
  descripcion,
  children,
}: {
  titulo: string;
  descripcion?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-brand-100 bg-brand-50">
      <Container className="py-10 sm:py-14">
        <h1 className="text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">{titulo}</h1>
        {descripcion && <p className="mt-3 max-w-2xl text-lg text-slate-600">{descripcion}</p>}
        {children && <div className="mt-6">{children}</div>}
      </Container>
    </div>
  );
}

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Articulo } from "@/lib/types";

function formatearFecha(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}

const ETIQUETA_TIPO: Record<Articulo["tipo"], string> = {
  noticia: "Noticia",
  articulo: "Artículo",
};

/** Tarjeta de artículo, reutilizada en /blog, /[oposicion]/noticias y las secciones "Últimas noticias" de las homes. */
export function ArticuloCard({ articulo }: { articulo: Articulo }) {
  return (
    <Link href={`/blog/${articulo.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
        {articulo.imagenUrl && (
          // eslint-disable-next-line @next/next/no-img-element -- URL externa arbitraria, sin dominios conocidos para next/image
          <img src={articulo.imagenUrl} alt="" className="h-40 w-full object-cover" />
        )}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-500">
            <span className="rounded-full bg-brand-50 px-2 py-0.5 uppercase tracking-wide">
              {ETIQUETA_TIPO[articulo.tipo]}
            </span>
            <span className="text-slate-400">{formatearFecha(articulo.publicadoEn)}</span>
          </div>
          <h3 className="mt-3 text-lg font-bold text-brand-900 group-hover:text-brand-700">{articulo.titulo}</h3>
          <p className="mt-2 flex-1 text-sm text-slate-600">{articulo.resumen}</p>
          <span className="mt-4 inline-block text-sm font-semibold text-brand-600">Leer más →</span>
        </div>
      </Card>
    </Link>
  );
}

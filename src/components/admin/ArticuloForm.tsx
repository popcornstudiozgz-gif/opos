"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { MarkdownContenido } from "@/components/blog/MarkdownContenido";
import { crearArticulo, actualizarArticulo, type ArticuloInput } from "@/app/admin/blog/actions";
import type { Articulo } from "@/lib/types";

const ESTILO_CAMPO =
  "w-full rounded-lg border border-brand-200 bg-white px-3.5 py-2.5 text-sm text-brand-950 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

function slugify(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos (marcas diacriticas tras normalizar NFD)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface Props {
  oposiciones: { slug: string; nombre: string }[];
  /** Presente = editar; ausente = crear. */
  articulo?: Articulo & { oposicionesSlugs: string[] };
}

export function ArticuloForm({ oposiciones, articulo }: Props) {
  const router = useRouter();
  const [titulo, setTitulo] = useState(articulo?.titulo ?? "");
  const [slug, setSlug] = useState(articulo?.slug ?? "");
  const [slugTocado, setSlugTocado] = useState(!!articulo); // al editar, no se autogenera al cambiar el título
  const [resumen, setResumen] = useState(articulo?.resumen ?? "");
  const [contenido, setContenido] = useState(articulo?.contenido ?? "");
  const [imagenUrl, setImagenUrl] = useState(articulo?.imagenUrl ?? "");
  const [tipo, setTipo] = useState<ArticuloInput["tipo"]>(articulo?.tipo ?? "noticia");
  const [publicado, setPublicado] = useState(articulo?.publicado ?? false);
  const [oposicionesSlugs, setOposicionesSlugs] = useState<string[]>(articulo?.oposicionesSlugs ?? []);
  const [mostrarPreview, setMostrarPreview] = useState(false);

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTituloChange(valor: string) {
    setTitulo(valor);
    if (!slugTocado) setSlug(slugify(valor));
  }

  function alternarOposicion(oposicionSlug: string) {
    setOposicionesSlugs((prev) =>
      prev.includes(oposicionSlug) ? prev.filter((s) => s !== oposicionSlug) : [...prev, oposicionSlug]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!titulo.trim() || !slug.trim() || !resumen.trim() || !contenido.trim()) {
      setError("Título, slug, resumen y contenido son obligatorios.");
      return;
    }

    setGuardando(true);
    const input: ArticuloInput = {
      titulo: titulo.trim(),
      slug: slug.trim(),
      resumen: resumen.trim(),
      contenido,
      imagenUrl: imagenUrl.trim(),
      tipo,
      publicado,
      oposicionesSlugs,
    };

    const resultado = articulo ? await actualizarArticulo(articulo.id, input) : await crearArticulo(input);
    // Si tiene éxito, la Server Action redirige a /admin/blog: solo llegamos
    // aquí si hubo un error de validación (p. ej. slug duplicado).
    if (resultado?.error) {
      setError(resultado.error);
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-brand-900">Título</label>
          <input
            value={titulo}
            onChange={(e) => handleTituloChange(e.target.value)}
            className={ESTILO_CAMPO}
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-brand-900">Slug (URL)</label>
          <input
            value={slug}
            onChange={(e) => {
              setSlugTocado(true);
              setSlug(slugify(e.target.value));
            }}
            className={ESTILO_CAMPO}
            required
          />
          <p className="mt-1 text-xs text-slate-400">/blog/{slug || "…"}</p>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-brand-900">
          Resumen <span className="font-normal text-slate-400">(tarjetas de listado y meta description)</span>
        </label>
        <textarea
          value={resumen}
          onChange={(e) => setResumen(e.target.value)}
          rows={2}
          className={ESTILO_CAMPO}
          required
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-sm font-semibold text-brand-900">Contenido (markdown)</label>
          <button
            type="button"
            onClick={() => setMostrarPreview((v) => !v)}
            className="text-xs font-semibold text-brand-600 hover:underline"
          >
            {mostrarPreview ? "Ocultar vista previa" : "Ver vista previa"}
          </button>
        </div>
        <div className={mostrarPreview ? "grid gap-4 sm:grid-cols-2" : ""}>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            rows={16}
            className={`${ESTILO_CAMPO} font-mono text-sm`}
            required
          />
          {mostrarPreview && (
            <div className="rounded-lg border border-brand-100 bg-white p-4">
              <MarkdownContenido contenido={contenido || "*Nada que previsualizar todavía.*"} />
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-brand-900">
            Imagen destacada <span className="font-normal text-slate-400">(URL, opcional)</span>
          </label>
          <input
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
            placeholder="https://…"
            className={ESTILO_CAMPO}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-brand-900">Tipo</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value as ArticuloInput["tipo"])} className={ESTILO_CAMPO}>
            <option value="noticia">Noticia</option>
            <option value="articulo">Artículo</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-brand-900">
          Oposiciones a las que afecta <span className="font-normal text-slate-400">(ninguna = noticia general)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {oposiciones.map((o) => {
            const marcada = oposicionesSlugs.includes(o.slug);
            return (
              <button
                key={o.slug}
                type="button"
                onClick={() => alternarOposicion(o.slug)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  marcada ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-brand-50"
                }`}
              >
                {o.nombre}
              </button>
            );
          })}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-semibold text-brand-900">
        <input type="checkbox" checked={publicado} onChange={(e) => setPublicado(e.target.checked)} className="h-4 w-4" />
        Publicado (visible para todo el mundo)
      </label>

      {error && (
        <p className="rounded-lg border border-rose-100 bg-rose-50 p-3 text-sm font-medium text-rose-600">{error}</p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={guardando}>
          {guardando ? "Guardando…" : articulo ? "Guardar cambios" : "Crear artículo"}
        </Button>
        <Button type="button" variante="contorno" onClick={() => router.push("/admin/blog")}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}

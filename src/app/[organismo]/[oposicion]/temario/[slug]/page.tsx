import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { crearMetadata } from "@/lib/site";
import {
  getOposicionPorRuta,
  getTemaDeOposicion,
  getFlashcardsDeTema,
  getGlosarioDeTema,
  getPreguntasDeTema,
  getCasosPracticosDeTema,
  getParamsTemarioEstatico,
} from "@/lib/oposiciones";
import { MarcarCompletado } from "@/components/temario/MarcarCompletado";

interface PageProps {
  params: Promise<{ organismo: string; oposicion: string; slug: string }>;
}

export async function generateStaticParams() {
  return await getParamsTemarioEstatico();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { organismo, oposicion: puesto, slug } = await params;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) return {};
  const tema = await getTemaDeOposicion(oposicion.slug, slug);
  if (!tema) return {};
  return crearMetadata({
    titulo: `Tema ${tema.numero}. ${tema.titulo}`,
    descripcion: tema.descripcion,
    ruta: `/${organismo}/${puesto}/temario/${slug}`,
    // Ver el comentario de `indexable` en crearMetadata: esta página nunca
    // va a competir por el término legal (gana el BOE) y su contenido
    // (tema.contenido) es idéntico en cada oposición que reutiliza este
    // mismo tema_slug — decisión tomada el 24/08/2026, ver conversación.
    indexable: false,
  });
}

export default async function TemaPage({ params }: PageProps) {
  const { organismo, oposicion: puesto, slug } = await params;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) notFound();
  const oposicionSlug = oposicion.slug; // slug interno (PK) — para queries de contenido y progreso
  const base = `/${organismo}/${puesto}`;

  const tema = await getTemaDeOposicion(oposicionSlug, slug);
  if (!tema) notFound();

  const [flashcards, glosario, preguntas, casos] = await Promise.all([
    getFlashcardsDeTema(oposicionSlug, slug),
    getGlosarioDeTema(oposicionSlug, slug),
    getPreguntasDeTema(oposicionSlug, slug),
    getCasosPracticosDeTema(oposicionSlug, slug),
  ]);

  const RECURSOS = [
    {
      icono: "📝",
      titulo: "Test del tema",
      descripcion: "Preguntas tipo test específicas de esta materia, con corrección inmediata.",
      href: `${base}/test?tema=${slug}`,
      label: "Hacer test",
      disponible: preguntas.length > 0,
      cantidad: preguntas.length,
    },
    {
      icono: "⚡",
      titulo: "Flashcards",
      descripcion: "Tarjetas para memorizar plazos, artículos y conceptos con repaso activo.",
      href: `${base}/flashcards?tema=${slug}`,
      label: "Estudiar tarjetas",
      disponible: flashcards.length > 0,
      cantidad: flashcards.length,
    },
    {
      icono: "📋",
      titulo: "Casos prácticos",
      descripcion: "Supuestos reales resueltos mediante preguntas encadenadas.",
      href: `${base}/casos-practicos?tema=${slug}`,
      label: "Resolver casos",
      disponible: casos.length > 0,
      cantidad: casos.length,
    },
    {
      icono: "🔎",
      titulo: "Glosario",
      descripcion: "Definiciones de los términos técnicos más importantes de esta unidad.",
      href: `/glosario?oposicion=${oposicionSlug}&tema=${slug}`,
      label: "Ver términos",
      disponible: glosario.length > 0,
      cantidad: glosario.length,
    },
  ];

  return (
    <section className="bg-white">
      <Container className="max-w-3xl py-16 sm:py-20">
        <Link href={`${base}/temario`} className="text-sm font-medium text-brand-600 hover:underline">
          ← Volver al temario
        </Link>

        <p className="mt-4 text-xs font-semibold tracking-wide text-brand-600 uppercase">Tema {tema.numero}</p>
        <h1 className="mt-1 text-3xl font-black text-brand-900 sm:text-4xl">{tema.titulo}</h1>
        <p className="mt-4 text-lg text-slate-600">{tema.descripcion}</p>

        <MarcarCompletado oposicionSlug={oposicionSlug} temaSlug={slug} />

        {/* Contenido */}
        <Card className="mt-8 p-6">
          <h2 className="text-lg font-bold text-brand-900">Contenido</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            {tema.contenido ??
              "El contenido detallado de este tema estará disponible próximamente. Mientras tanto, puedes estudiar y practicar con los recursos de este tema."}
          </p>
        </Card>

        {/* Índice de estudio: qué títulos/capítulos entran y enlace al artículo exacto del BOE */}
        {tema.indiceEstudio && tema.indiceEstudio.length > 0 && (
          <Card className="mt-6 border-brand-200 bg-gradient-to-br from-brand-50/60 to-white p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-brand-900">
              <span role="img" aria-label="Índice de estudio">
                📖
              </span>
              Qué estudiar de este tema
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Los títulos y capítulos que entran en el temario, en orden. Cada uno enlaza directo a la
              fuente oficial, sin tener que buscarlo en todo el documento.
            </p>

            <ol className="mt-4 space-y-3">
              {tema.indiceEstudio.map((punto, i) => (
                <li
                  key={punto.seccion}
                  className="flex flex-col gap-2 rounded-lg border border-brand-100 bg-white/60 p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11px] font-bold text-brand-700">
                      {i + 1}
                    </span>
                    <div>
                      <span className="text-sm font-medium text-slate-800">{punto.titulo}</span>
                      {punto.articulos && (
                        <span className="ml-2 text-xs text-slate-500">({punto.articulos})</span>
                      )}
                    </div>
                  </div>
                  <a
                    href={punto.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-brand-300 bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm transition-all hover:border-brand-400 hover:bg-brand-50 hover:shadow-md sm:self-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    {punto.url.includes("boe.es") ? "Ir al BOE" : "Ver fuente"}
                  </a>
                </li>
              ))}
            </ol>
          </Card>
        )}

        {/* Material de estudio: fallback cuando el tema todavía no tiene índice de estudio */}
        {(!tema.indiceEstudio || tema.indiceEstudio.length === 0) && tema.enlacesBoe && tema.enlacesBoe.length > 0 && (
          <Card className="mt-6 border-brand-200 bg-gradient-to-br from-brand-50/60 to-white p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-brand-900">
              <span role="img" aria-label="Legislación">
                📜
              </span>
              Material de estudio
            </h2>
            <p className="mt-1 text-sm text-slate-600">Normativa de referencia de este tema, enlazada al BOE.</p>

            <ul className="mt-4 space-y-3">
              {tema.enlacesBoe.map((ley) => (
                <li
                  key={ley.url}
                  className="flex flex-col gap-2 rounded-lg border border-brand-100 bg-white/60 p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-sm font-medium text-slate-800">{ley.titulo}</span>
                  <a
                    href={ley.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-brand-300 bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm transition-all hover:border-brand-400 hover:bg-brand-50 hover:shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Ver en el BOE
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Recursos de estudio */}
        <div className="mt-10">
          <h2 className="mb-6 border-b border-brand-100 pb-2 text-xl font-bold text-brand-900">
            Recursos de estudio de este tema
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {RECURSOS.map((recurso) => (
              <Card key={recurso.titulo} className="flex flex-col justify-between p-5 transition-all hover:border-brand-300 hover:shadow-md">
                <div>
                  <span className="text-3xl" role="img" aria-label={recurso.titulo}>
                    {recurso.icono}
                  </span>
                  <h3 className="mt-3 text-base font-bold text-brand-900">{recurso.titulo}</h3>
                  <p className="mt-1 text-sm text-slate-500">{recurso.descripcion}</p>
                </div>
                <div className="mt-5">
                  {recurso.disponible ? (
                    <Button href={recurso.href} variante="contorno" tamano="sm" className="w-full">
                      {recurso.label} ({recurso.cantidad})
                    </Button>
                  ) : (
                    <span className="block w-full rounded-lg border border-dashed border-slate-200 py-2 text-center text-sm text-slate-400">
                      Próximamente
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { crearMetadata, organismoAbreviado, anioDeConvocatoria } from "@/lib/site";
import { getOposicionPorRuta, getOposiciones } from "@/lib/oposiciones";
import { getConvocatoria } from "@/data/convocatorias";

interface PageProps {
  params: Promise<{ organismo: string; oposicion: string }>;
}

export async function generateStaticParams() {
  const oposiciones = await getOposiciones();
  const convocatorias = await Promise.all(oposiciones.map((o) => getConvocatoria(o.slug)));
  return oposiciones
    .filter((_, i) => convocatorias[i])
    .map((o) => ({ organismo: o.organismoSlug, oposicion: o.puestoSlug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { organismo, oposicion: puesto } = await params;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) return {};
  const convocatoria = await getConvocatoria(oposicion.slug);
  if (!convocatoria) return {};
  const anio = anioDeConvocatoria(convocatoria.numero);
  return crearMetadata({
    titulo: `Convocatoria${anio ? ` ${anio}` : ""} - ${oposicion.nombre} ${organismoAbreviado(oposicion.organismoSlug, oposicion.organismo)}`,
    descripcion: `Plazas, requisitos, plazos y estructura del examen de ${convocatoria.numero} · ${oposicion.nombre} · ${oposicion.organismo} (${convocatoria.plazasTotal} plazas).`,
    ruta: `/${organismo}/${puesto}/convocatoria`,
  });
}

export default async function ConvocatoriaPage({ params }: PageProps) {
  const { organismo, oposicion: puesto } = await params;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) notFound();
  const convocatoria = await getConvocatoria(oposicion.slug);
  if (!convocatoria) notFound();
  const base = `/${organismo}/${puesto}`;

  const anio = anioDeConvocatoria(convocatoria.numero);

  const datosClave = [
    { etiqueta: "Plazas convocadas", valor: `${convocatoria.plazasTotal}`, detalle: oposicion.nombre },
    { etiqueta: "Sistema de selección", valor: "Oposición", detalle: convocatoria.sistemaSeleccion },
    { etiqueta: "Titulación requerida", valor: "Graduado/a en ESO", detalle: "O equivalente a efectos profesionales" },
    { etiqueta: "Duración máxima del proceso", valor: "6 meses", detalle: "Desde el primer ejercicio" },
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { label: oposicion.organismo, href: `/${organismo}` },
          { label: oposicion.nombre, href: base },
          { label: "Convocatoria", href: `${base}/convocatoria` },
        ]}
      />
      <PageHeader
        titulo={`Convocatoria${anio ? ` (${anio})` : ""}: ${oposicion.nombre} · ${oposicion.organismo}`}
        descripcion={`${convocatoria.numero} · ${convocatoria.plaza} · Decreto de ${convocatoria.fechaDecreto}`}
      >
        <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          Actualizado el {convocatoria.ultimaActualizacion}
        </span>
      </PageHeader>

      <Container className="space-y-12 py-12">
        <section>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {datosClave.map((d) => (
              <Card key={d.etiqueta} className="p-5">
                <p className="text-2xl font-black text-brand-700">{d.valor}</p>
                <p className="mt-1 text-sm font-semibold text-brand-900">{d.etiqueta}</p>
                <p className="mt-1 text-xs text-slate-500">{d.detalle}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-brand-900">Plazo de inscripción</h2>
            <p className="mt-2 text-slate-600">{convocatoria.plazoInstancias}</p>
            <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Requisito de titulación
            </h3>
            <p className="mt-1 text-slate-600">{convocatoria.requisitoTitulacion}</p>
            <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Orden de actuación
            </h3>
            <p className="mt-1 text-slate-600">{convocatoria.ordenActuacion}</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-brand-900">Desglose de las {convocatoria.plazasTotal} plazas</h2>
            <ul className="mt-3 divide-y divide-slate-100">
              {convocatoria.desglosePlazas.map((d) => (
                <li key={d.turno} className="flex items-center justify-between py-2 text-sm">
                  <span className="text-slate-600">{d.turno}</span>
                  <span className="font-semibold text-brand-700">{d.cantidad}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-900">¿Cómo es el examen?</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            El proceso selectivo consta de tres ejercicios eliminatorios, en este orden. Solo se
            avanza al siguiente si se supera el anterior.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {convocatoria.pruebas.map((prueba) => (
              <Card key={prueba.id} className="flex flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-brand-50 text-xl" aria-hidden>
                    {prueba.icono}
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-brand-500">Ejercicio {prueba.numero}</span>
                    <h3 className="text-lg font-bold text-brand-900">{prueba.nombre}</h3>
                  </div>
                </div>

                <dl className="mt-4 space-y-1.5 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-slate-500">Duración</dt>
                    <dd className="font-medium text-slate-700">{prueba.duracion}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-slate-500">Formato</dt>
                    <dd className="text-right font-medium text-slate-700">{prueba.formato}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-slate-500">Opciones</dt>
                    <dd className="text-right font-medium text-slate-700">{prueba.opciones}</dd>
                  </div>
                </dl>

                <p className="mt-3 flex-1 text-sm text-slate-600">{prueba.detalle}</p>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-900">La criba en cada fase</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            El tribunal solo deja pasar a un número máximo de aspirantes en cada corte, con las
            mejores calificaciones:
          </p>
          <Card className="mt-6 divide-y divide-slate-100 p-0">
            {convocatoria.aspirantesQuePasanFase.map((f) => (
              <div key={f.fase} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-slate-700">{f.fase}</span>
                <span className="font-semibold text-brand-700">{f.cantidad}</span>
              </div>
            ))}
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-900">Fuentes oficiales</h2>
          <ul className="mt-4 space-y-2">
            {convocatoria.enlacesOficiales.map((e) => (
              <li key={e.url}>
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-600 hover:underline"
                >
                  {e.titulo} ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-500">
            {convocatoria.organismo}. Esta página resume las bases específicas de la convocatoria
            {" "}({convocatoria.numero}) a título informativo; en caso de duda o discrepancia
            prevalece siempre el texto oficial publicado.
          </p>
        </section>
      </Container>
    </>
  );
}

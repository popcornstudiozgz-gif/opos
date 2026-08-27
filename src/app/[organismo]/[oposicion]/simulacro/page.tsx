import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { crearMetadata, nombreAbreviado, organismoConPreposicion } from "@/lib/site";
import {
  getOposicionPorRuta,
  getOposiciones,
  getBloquesConTemas,
  getPreguntasDeOposicion,
  getCasosPracticosDeOposicion,
} from "@/lib/oposiciones";
import { SimulacroRunner } from "@/components/simulacro/SimulacroRunner";
import type { CasoPractico, Pregunta } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";
import { mezclar } from "@/lib/mezclar";

const NUM_PREGUNTAS_TEST = 50;
const NUM_CASOS = 2;

interface PageProps {
  params: Promise<{ organismo: string; oposicion: string }>;
}

export async function generateStaticParams() {
  const oposiciones = await getOposiciones();
  return oposiciones.map((o) => ({ organismo: o.organismoSlug, oposicion: o.puestoSlug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { organismo, oposicion: puesto } = await params;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) return {};
  return crearMetadata({
    titulo: `Simulacro de examen para ${nombreAbreviado(oposicion.nombre)} ${organismoConPreposicion(oposicion.slug, oposicion.organismo)}`,
    descripcion: `Examen completo de ${oposicion.nombre} · ${oposicion.organismo} en condiciones reales: ${NUM_PREGUNTAS_TEST} preguntas cronometradas y ${NUM_CASOS} casos prácticos, con corrección y puntuación oficial.`,
    ruta: `/${organismo}/${puesto}/simulacro`,
  });
}

export default async function SimulacroPage({ params }: PageProps) {
  const { organismo, oposicion: puesto } = await params;

  const supabase = await createClient();
  const [oposicion, { data: { user } }] = await Promise.all([
    getOposicionPorRuta(organismo, puesto),
    supabase.auth.getUser(),
  ]);
  if (!oposicion) notFound();
  const oposicionSlug = oposicion.slug; // slug interno (PK) — para queries de contenido y progreso
  const [bloques, todasPreguntas, todosCasos] = await Promise.all([
    getBloquesConTemas(oposicionSlug),
    getPreguntasDeOposicion(oposicionSlug),
    getCasosPracticosDeOposicion(oposicionSlug),
  ]);

  // Las preguntas de un caso práctico dan por conocido su supuesto: se
  // excluyen del test suelto para no mostrarlas fuera de contexto.
  const idsEnCasos = new Set<string>(todosCasos.flatMap((c: CasoPractico) => c.preguntas.map((p) => p.id)));
  const preguntas: Pregunta[] = mezclar(todasPreguntas.filter((p) => !idsEnCasos.has(p.id))).slice(0, NUM_PREGUNTAS_TEST);
  const casos: CasoPractico[] = mezclar(todosCasos).slice(0, NUM_CASOS);

  const temaABloque: Record<string, string> = {};
  for (const bloque of bloques) {
    for (const tema of bloque.temas) temaABloque[tema.slug] = bloque.titulo;
  }

  return (
    <>
      <PageHeader
        titulo="Simulacro de examen"
        descripcion={`${oposicion.nombre} · ${oposicion.organismo}. Pon a prueba tus conocimientos con tiempo límite, como en el examen real.`}
      />

      <Container className="py-12">
        {preguntas.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-xl border border-dashed border-brand-200 bg-brand-50/50 p-8 text-center text-slate-600">
            Todavía no hay preguntas suficientes para armar un simulacro de esta oposición.
          </div>
        ) : (
          <SimulacroRunner
            oposicionSlug={oposicionSlug}
            preguntas={preguntas}
            casos={casos}
            temaABloque={temaABloque}
            usuarioId={user?.id ?? null}
          />
        )}
      </Container>
    </>
  );
}

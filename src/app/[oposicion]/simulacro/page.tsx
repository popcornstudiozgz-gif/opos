import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { crearMetadata } from "@/lib/site";
import {
  getOposicion,
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
  params: Promise<{ oposicion: string }>;
}

export async function generateStaticParams() {
  const oposiciones = await getOposiciones();
  return oposiciones.map((o) => ({ oposicion: o.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { oposicion: oposicionSlug } = await params;
  const oposicion = await getOposicion(oposicionSlug);
  if (!oposicion) return {};
  return crearMetadata({
    titulo: "Simulacro de examen",
    descripcion: `Examen completo de ${oposicion.nombre} en condiciones reales: 50 preguntas cronometradas y 2 casos prácticos, con corrección y puntuación oficial.`,
    ruta: `/${oposicionSlug}/simulacro`,
  });
}

export default async function SimulacroPage({ params }: PageProps) {
  const { oposicion: oposicionSlug } = await params;

  const supabase = await createClient();
  const [oposicion, bloques, todasPreguntas, todosCasos, { data: { user } }] = await Promise.all([
    getOposicion(oposicionSlug),
    getBloquesConTemas(oposicionSlug),
    getPreguntasDeOposicion(oposicionSlug),
    getCasosPracticosDeOposicion(oposicionSlug),
    supabase.auth.getUser(),
  ]);
  if (!oposicion) notFound();

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

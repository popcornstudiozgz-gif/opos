import type { Oposicion } from "@/lib/types";

/**
 * Agrupación por tipo de puesto de los organismos con muchas oposiciones, para
 * que la home y la página del organismo no sean una lista plana de decenas de
 * tarjetas. Es un mapa a mano por `puestoSlug` (como `ORGANISMOS` en
 * `site.ts`): el grupo no es un dato de la convocatoria, sino una decisión de
 * presentación. Una oposición nueva que no figure aquí sale en "Otras
 * categorías" en vez de desaparecer; al dar de alta una, añádela a su grupo.
 *
 * SALUD (noviembre de 2026): las 89 fichas de `scripts/seed-fichas-salud.mjs`.
 */
const GRUPOS: Record<string, { titulo: string; puestos: string[] }[]> = {
  "salud-aragon": [
    { titulo: "Enfermería", puestos: ["enfermero", "matrona", "enfermero-familiar-comunitaria", "enfermero-salud-mental"] },
    {
      titulo: "Técnicos sanitarios y otras profesiones sanitarias",
      puestos: [
        "tcae", "fisioterapeuta", "logopeda", "terapeuta-ocupacional", "trabajador-social", "tecnico-auxiliar-farmacia",
        "tecnico-superior-documentacion-sanitaria", "tecnico-superior-dietetica", "tecnico-superior-anatomia-patologica",
        "tecnico-superior-laboratorio", "tecnico-superior-medicina-nuclear", "tecnico-superior-radiodiagnostico",
        "tecnico-superior-radioterapia", "higienista-dental",
      ],
    },
    {
      titulo: "Medicina, farmacia y otras facultativas",
      puestos: [
        "medico-familia", "pediatra-atencion-primaria", "medico-urgencias-emergencias", "medico-urgencia-hospitalaria",
        "medico-admision-documentacion-clinica", "odontoestomatologo", "farmaceutico-atencion-primaria", "tecnico-salud-publica",
        "fea-anatomia-patologica", "fea-anestesiologia-y-reanimacion", "fea-angiologia-y-cirugia-vascular", "fea-analisis-clinicos",
        "fea-cardiologia", "fea-cirugia-general-aparato-digestivo", "fea-cirugia-ortopedica-y-traumatologia", "fea-cirugia-plastica",
        "fea-cirugia-toracica", "fea-dermatologia", "fea-farmacia-hospitalaria", "fea-geriatria", "fea-inmunologia",
        "fea-medicina-fisica-y-rehabilitacion", "fea-medicina-interna", "fea-medicina-nuclear", "fea-microbiologia-y-parasitologia",
        "fea-nefrologia", "fea-neumologia", "fea-neurocirugia", "fea-neurofisiologia-clinica", "fea-obstetricia-y-ginecologia",
        "fea-oftalmologia", "fea-oncologia-medica", "fea-oncologia-radioterapica", "fea-otorrinolaringologia", "fea-pediatria",
        "fea-psicologia-clinica", "fea-psiquiatria", "fea-radiodiagnostico", "fea-radiofisica-hospitalaria", "fea-reumatologia",
        "fea-urologia",
      ],
    },
    {
      titulo: "Gestión, administración y sistemas",
      puestos: [
        "auxiliar-administrativo", "administrativo", "gestion-funcion-administrativa", "tecnico-funcion-administrativa",
        "telefonista", "controlador-suministros", "tecnico-especialista-sistemas", "tecnico-gestion-sistemas",
        "tecnico-superior-sistemas", "ingeniero-tecnico", "ingeniero-superior", "tecnico-prevencion-riesgos-laborales",
        "tecnico-superior-comunicacion",
      ],
    },
    {
      titulo: "Servicios generales y oficios",
      puestos: [
        "celador", "pinche", "cocinero", "gobernante", "limpiador", "lavandero", "planchador", "costurero", "peluquero",
        "conductor", "albanil", "calefactor", "carpintero", "electricista", "fontanero", "mecanico", "pintor",
      ],
    },
  ],
};

export interface GrupoOposiciones {
  titulo: string;
  oposiciones: Oposicion[];
}

/**
 * Reparte las oposiciones de un organismo en sus grupos, en el orden del mapa
 * (dentro de cada grupo, el orden del mapa: primero las de más demanda).
 * Devuelve `null` si el organismo no tiene agrupación.
 */
export function agruparOposiciones(organismoSlug: string, oposiciones: Oposicion[]): GrupoOposiciones[] | null {
  const grupos = GRUPOS[organismoSlug];
  if (!grupos) return null;
  const porPuesto = new Map(oposiciones.map((o) => [o.puestoSlug, o]));
  const usadas = new Set<string>();
  const resultado: GrupoOposiciones[] = [];
  for (const g of grupos) {
    const lista = g.puestos.flatMap((p) => {
      const o = porPuesto.get(p);
      if (!o) return [];
      usadas.add(p);
      return [o];
    });
    if (lista.length) resultado.push({ titulo: g.titulo, oposiciones: lista });
  }
  const resto = oposiciones.filter((o) => !usadas.has(o.puestoSlug));
  if (resto.length) resultado.push({ titulo: "Otras categorías", oposiciones: resto });
  return resultado;
}

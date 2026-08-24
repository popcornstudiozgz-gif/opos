import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // La ruta /flashcards por tema vivió brevemente anidada bajo el tema
      // (una URL por tema); se sustituyó por /[oposicion]/flashcards?tema=
      // con canonical fijo a la general, para no crear URLs casi-duplicadas.
      {
        source: "/:oposicion/temario/:slug/flashcards",
        destination: "/:oposicion/flashcards?tema=:slug",
        permanent: true,
      },
      // El slug de Auxiliar Administrativo pasó de "auxiliar-administrativo"
      // a "auxiliar-administrativo-ayto-zaragoza" (para dejar sitio a otras
      // oposiciones con el mismo nombre de puesto, como la DPZ o la DGA).
      // robots.ts sigue bloqueando la indexación, así que esto es solo por
      // si hay algún enlace guardado a mano.
      //
      // Va ANTES que el redirect de /glosario de abajo a propósito: así, un
      // enlace viejo a /auxiliar-administrativo/glosario pasa primero por
      // este renombrado y llega al de /glosario ya con el slug correcto
      // (dos saltos de redirect en vez de uno, pero sin colar el slug
      // obsoleto en el ?oposicion= final).
      {
        source: "/auxiliar-administrativo",
        destination: "/auxiliar-administrativo-ayto-zaragoza",
        permanent: true,
      },
      {
        source: "/auxiliar-administrativo/:path*",
        destination: "/auxiliar-administrativo-ayto-zaragoza/:path*",
        permanent: true,
      },
      // El glosario dejó de vivir bajo /[oposicion]/glosario y pasó a una
      // única URL de raíz, /glosario?oposicion=..., para no generar una
      // página casi-duplicada por cada oposición (ver src/app/glosario/
      // page.tsx). Next reenvía automáticamente cualquier query param que
      // no esté ya en `destination` (p. ej. ?tema=X sigue funcionando).
      {
        source: "/:oposicion/glosario",
        destination: "/glosario?oposicion=:oposicion",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

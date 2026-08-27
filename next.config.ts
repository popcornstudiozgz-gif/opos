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
      // Con robots.ts ya abierto a la indexación (lanzamiento, 25/08/2026),
      // este redirect es lo que evita un 404 si Google llegó a indexar el
      // slug viejo, además de cubrir cualquier enlace guardado a mano.
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
      //
      // Van ANTES que la reestructuración de /[organismo]/[oposicion]/...
      // de abajo a propósito: si no, un enlace viejo a
      // /auxiliar-administrativo-ayto-zaragoza/glosario caería primero en
      // la regla comodín `/:path*` de esa reestructuración y aterrizaría en
      // un /ayuntamiento-zaragoza/aux-administrativo/glosario que no existe
      // (404), en vez de en /glosario?oposicion=...
      {
        source: "/:oposicion/glosario",
        destination: "/glosario?oposicion=:oposicion",
        permanent: true,
      },
      // Mismo caso que el glosario, pero con /noticias hacia /blog: un
      // artículo puede etiquetarse a varias oposiciones a la vez, así que
      // una ruta separada por oposición podía repetir la misma noticia en
      // dos URLs (ver src/app/blog/page.tsx).
      {
        source: "/:oposicion/noticias",
        destination: "/blog?oposicion=:oposicion",
        permanent: true,
      },
      // Reestructuración de URLs de /[oposicion]/... a
      // /[organismo]/[oposicion]/... (26/08/2026), para escalar a más
      // organismos sin que el slug de cada oposición tenga que cargar con
      // el nombre del organismo dentro. Con la indexación abierta apenas 2
      // días antes de este cambio, esto es la red de seguridad frente a
      // cualquier URL vieja que Google haya llegado a rastrear o alguien
      // guarde a mano. Van DESPUÉS de /glosario y /noticias a propósito
      // (ver comentario de esas reglas) — solo les llega lo que no
      // interceptaron ellas: temario, test, flashcards, casos-practicos,
      // simulacro, convocatoria y la home de cada oposición.
      {
        source: "/auxiliar-administrativo-ayto-zaragoza",
        destination: "/ayuntamiento-zaragoza/aux-administrativo",
        permanent: true,
      },
      {
        source: "/auxiliar-administrativo-ayto-zaragoza/:path*",
        destination: "/ayuntamiento-zaragoza/aux-administrativo/:path*",
        permanent: true,
      },
      {
        source: "/auxiliar-administrativo-dpz",
        destination: "/dpz/aux-administrativo",
        permanent: true,
      },
      {
        source: "/auxiliar-administrativo-dpz/:path*",
        destination: "/dpz/aux-administrativo/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

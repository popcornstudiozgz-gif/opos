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
    ];
  },
};

export default nextConfig;

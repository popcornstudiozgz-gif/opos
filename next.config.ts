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
    ];
  },
};

export default nextConfig;

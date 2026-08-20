import type { ReactNode } from "react";

/** Tarjeta de superficie blanca con borde y sombra suave. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-brand-100 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

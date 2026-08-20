import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variante = "primario" | "secundario" | "contorno" | "fantasma";
type Tamano = "sm" | "md" | "lg";

const ESTILOS_BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTES: Record<Variante, string> = {
  primario: "bg-brand-600 text-white hover:bg-brand-700",
  secundario: "bg-accent-500 text-brand-950 hover:bg-accent-400",
  contorno: "border border-brand-600 text-brand-700 hover:bg-brand-50",
  fantasma: "text-brand-700 hover:bg-brand-50",
};

const TAMANOS: Record<Tamano, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-13 px-7 text-lg",
};

interface PropsComunes {
  variante?: Variante;
  tamano?: Tamano;
  className?: string;
  children: ReactNode;
}

type PropsBoton = PropsComunes & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type PropsEnlace = PropsComunes & { href: string };

/** Botón reutilizable. Si recibe `href`, se renderiza como `<Link>`; si no, como `<button>`. */
export function Button(props: PropsBoton | PropsEnlace) {
  const { variante = "primario", tamano = "md", className = "", children, ...rest } = props;
  const clases = `${ESTILOS_BASE} ${VARIANTES[variante]} ${TAMANOS[tamano]} ${className}`;

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={clases}>
        {children}
      </Link>
    );
  }

  return (
    <button className={clases} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

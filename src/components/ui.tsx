import Link from "next/link";
import type { ReactNode } from "react";
import { companiaPorSlug } from "@/data/companias";

/* --------------------------------------------------------------- Botones */

export function Boton({
  href,
  children,
  variante = "primario",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variante?: "primario" | "secundario" | "texto";
  className?: string;
}) {
  const estilos = {
    primario: "bg-accent",
    secundario: "surface border border-strong text-fg",
    texto: "text-accent hover:bg-accent-soft",
  }[variante];

  return (
    <Link
      href={href}
      className={`pulsable inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.95rem] font-medium ${estilos} ${className}`}
    >
      {children}
    </Link>
  );
}

/* ------------------------------------------------------- Título de sección */

export function TituloSeccion({
  sobretitulo,
  titulo,
  texto,
  className = "",
}: {
  sobretitulo?: string;
  titulo: string;
  texto?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-xl ${className}`}>
      {sobretitulo && <p className="t-rotulo text-accent">{sobretitulo}</p>}
      <h2 className="t-titulo mt-2 text-fg">{titulo}</h2>
      {texto && <p className="t-cuerpo mt-3 text-dim">{texto}</p>}
    </div>
  );
}

/* ------------------------------------------------------- Logo de compañía */

/**
 * Usa el logotipo oficial en cuanto exista `logo` en src/data/companias.ts;
 * hasta entonces, el nombre tipografiado con una marca de su color.
 */
export function LogoCompania({
  slug,
  tamano = "normal",
}: {
  slug: string;
  tamano?: "normal" | "grande";
}) {
  const c = companiaPorSlug(slug);
  if (!c) return null;

  if (c.logo) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={c.logo}
        alt={c.nombreLargo}
        style={{ height: (c.alto ?? 20) * (tamano === "grande" ? 1.3 : 1) }}
        className="logo-marca w-auto object-contain"
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 font-semibold ${tamano === "grande" ? "text-[0.95rem]" : "text-[0.875rem]"}`}
      title={c.nombreLargo}
    >
      <span
        className="inline-block h-3.5 w-3.5 rounded-full"
        style={{ background: c.color }}
        aria-hidden="true"
      />
      <span className="text-fg">{c.nombre}</span>
    </span>
  );
}

/* ---------------------------------------------------------------- Ticks */

export function Tick({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="bg-ok-soft inline-grid h-5 w-5 place-items-center rounded-full">
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="m5 12.5 4.5 4.5L19 6.5" />
      </svg>
      <span className="sr-only">Incluido</span>
    </span>
  ) : (
    <span className="inline-grid h-5 w-5 place-items-center rounded-full border border-hair text-dim">
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
        <path d="M6 12h12" />
      </svg>
      <span className="sr-only">No incluido</span>
    </span>
  );
}

/* ---------------------------------------------------------------- Chips */

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="bg-accent-soft inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.8125rem] font-medium">
      {children}
    </span>
  );
}

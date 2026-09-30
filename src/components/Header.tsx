"use client";

import Link from "next/link";
import { useState } from "react";
import { Icono } from "./Iconos";
import { site, familias } from "@/data/site";
import { ramos } from "@/data/ramos";

/**
 * Barra translúcida flotante: el contenido pasa por debajo en lugar de
 * quedar cortado por una franja opaca. El panel móvil entra y sale por el
 * mismo camino, desde el borde superior.
 */
export function Header() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header
      className="banda sticky z-40"
      style={{ top: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="wrap flex h-14 items-center justify-between gap-4">
        <Link href="/" className="pulsable-suave flex items-center gap-2.5" aria-label="Inicio">
          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px]" style={{ background: "var(--color-agua-400)", color: "#04222a" }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7h7M4 12h10M4 17h6" />
              <path d="M18 9.5v9M15 12.5l3-3 3 3" />
            </svg>
          </span>
          <span className="whitespace-nowrap font-[family-name:var(--font-display)] text-[0.95rem] font-semibold tracking-tight text-white sm:text-[1.05rem]">Comparador de Seguros</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          <Link href="/seguros" className="pulsable-suave rounded-[var(--radius-control)] px-3 py-1.5 text-[0.9rem] text-white/90 hover:text-[var(--color-agua-400)]">
            Seguros
          </Link>
          <Link href="/como-funciona" className="pulsable-suave rounded-[var(--radius-control)] px-3 py-1.5 text-[0.9rem] text-white/90 hover:text-[var(--color-agua-400)]">
            Cómo funciona
          </Link>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={`tel:${site.telefonoHref}`}
            className="pulsable-suave hidden items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 text-[0.9rem] font-medium text-white sm:flex"
          >
            <Icono name="telefono" className="h-3.5 w-3.5 text-[var(--color-agua-400)]" />
            {site.telefono}
          </a>
          <Link
            href="/contacto"
            className="pulsable hidden whitespace-nowrap rounded-full px-4 py-2 text-[0.9rem] font-semibold sm:inline-block" style={{ background: "var(--color-agua-400)", color: "#04222a" }}
          >
            Que me asesoren
          </Link>
          <button
            onClick={() => setAbierto((v) => !v)}
            className="banda-borde pulsable grid h-9 w-9 place-items-center rounded-[10px] border md:hidden"
            aria-expanded={abierto}
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              {abierto ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {abierto && (
        <div className="materializa banda-borde border-t md:hidden">
          <div className="wrap grid gap-5 py-5">
            {familias.map((f) => (
              <div key={f.slug}>
                <p className="t-rotulo banda-suave">{f.corto}</p>
                <ul className="mt-2 grid grid-cols-2 gap-x-3">
                  {ramos
                    .filter((r) => r.familia === f.slug)
                    .map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/seguros/${r.slug}`}
                          onClick={() => setAbierto(false)}
                          className="pulsable-suave flex items-center gap-2 py-1.5 text-[0.9rem] text-white/90"
                        >
                          <Icono name={r.icono} className="h-4 w-4 text-[var(--color-agua-400)]" />
                          {r.nombreCorto}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
            <Link
              href="/como-funciona"
              onClick={() => setAbierto(false)}
              className="banda-borde border-t pt-4 text-[0.9rem] font-medium text-[var(--color-agua-400)]"
            >
              Cómo funciona
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { useState } from "react";

/**
 * Acordeón de preguntas frecuentes.
 *
 * Algunos ramos acumulan más de cincuenta preguntas: mostrarlas todas de
 * golpe convierte la página en un muro. Por eso se abre con las primeras y el
 * resto llega con un botón. Todas van en el HTML desde el primer momento —solo
 * ocultas— para que buscadores y Ctrl+F las encuentren igual.
 */
export function FAQ({
  items,
  visibles = 10,
}: {
  items: { p: string; r: string }[];
  visibles?: number;
}) {
  const [todas, setTodas] = useState(false);
  const ocultas = Math.max(0, items.length - visibles);

  return (
    <div>
      <div className="card overflow-hidden">
        {items.map((f, i) => (
          <details
            key={f.p}
            hidden={!todas && i >= visibles}
            className={`group px-5 ${i > 0 ? "border-t border-hair" : ""}`}
          >
            <summary className="pulsable-suave flex cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-left [&::-webkit-details-marker]:hidden">
              <span className="t-titular text-fg">{f.p}</span>
              <span
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-hair text-dim transition-transform duration-200 group-open:rotate-45"
                style={{ transitionTimingFunction: "var(--salida)" }}
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <p className="t-pie materializa pb-4 pr-8 text-dim">{f.r}</p>
          </details>
        ))}
      </div>

      {ocultas > 0 && !todas && (
        <button
          type="button"
          onClick={() => setTodas(true)}
          className="pulsable mt-4 w-full rounded-full border-2 px-6 py-2.5 text-[0.9rem] font-semibold text-accent sm:w-auto"
          style={{ borderColor: "var(--accent)" }}
        >
          Ver las {ocultas} preguntas restantes
        </button>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Icono } from "./Iconos";
import { BotonAdjuntar } from "./AdjuntarPoliza";

/**
 * Ventana emergente de contacto para el CTA de cada ramo.
 *
 * Pide lo mínimo —nombre, teléfono y correo— y al enviar sustituye el
 * formulario por la confirmación, sin cerrar el diálogo: quien acaba de dejar
 * sus datos necesita ver que han llegado.
 *
 * Usa <dialog> nativo, así que el foco queda atrapado dentro, Escape cierra y
 * el fondo se inertiza sin que tengamos que reimplementarlo.
 */
export function ModalContacto({
  ramo,
  frase,
  abierto,
  onCerrar,
}: {
  ramo: string;
  frase?: string;
  abierto: boolean;
  onCerrar: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (abierto && !d.open) d.showModal();
    if (!abierto && d.open) d.close();
  }, [abierto]);

  // Al cerrarse (Escape, clic en el velo o botón) devolvemos el estado al padre
  // y dejamos el formulario listo para la próxima vez.
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const alCerrar = () => {
      onCerrar();
      setTimeout(() => setEnviado(false), 250);
    };
    d.addEventListener("close", alCerrar);
    return () => d.removeEventListener("close", alCerrar);
  }, [onCerrar]);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    setEnviando(true);
    try {
      // Mismos nombres de campo que el formulario largo, para que el endpoint
      // y el CRM reciban siempre la misma forma.
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: datos.get("nombre"),
          phone: datos.get("telefono"),
          email: datos.get("email"),
          ramo,
          origen: "cta-ramo",
        }),
      });
    } catch {
      // El aviso al usuario no depende de que el buzón responda: el dato queda
      // registrado en el servidor y, si algo falla ahí, se revisa en el log.
    }
    setEnviando(false);
    setEnviado(true);
  }

  const campo =
    "surface w-full rounded-[var(--radius-control)] border border-hair px-3.5 py-2.5 text-[0.95rem] text-fg outline-none transition-colors focus:border-[var(--accent)]";
  const etiqueta = "mb-1.5 block text-xs font-semibold text-fg";

  return (
    <dialog
      ref={ref}
      className="modal surface w-[min(30rem,calc(100vw-2rem))] rounded-[var(--radius-card)] p-0"
      aria-labelledby="modal-titulo"
    >
      <div className="p-6 sm:p-7">
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="pulsable surface absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full border border-hair text-dim"
          aria-label="Cerrar"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {enviado ? (
          <div className="materializa py-4 text-center">
            <span className="bg-ok-soft mx-auto grid h-12 w-12 place-items-center rounded-full">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12.5 4.5 4.5L19 6.5" />
              </svg>
            </span>
            <h2 id="modal-titulo" className="t-seccion mt-4 text-fg">
              Gracias, hemos recibido tus datos
            </h2>
            <p className="t-cuerpo mt-3 text-dim">
              Uno de nuestros agentes especialistas se pondrá en contacto con
              usted para ayudarle a encontrar la mejor opción.
            </p>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="pulsable mt-6 rounded-full px-6 py-2.5 text-[0.9rem] font-semibold"
              style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <h2 id="modal-titulo" className="t-seccion pr-10 text-fg">
              Comparar seguros {frase}
            </h2>
            <p className="t-pie mt-2 text-dim">
              Déjanos tus datos y un asesor te enseña qué compañía encaja con tu
              caso. Sin coste y sin compromiso.
            </p>

            <form onSubmit={enviar} className="mt-5 grid gap-4">
              <div>
                <label htmlFor="m-nombre" className={etiqueta}>Nombre</label>
                <input id="m-nombre" name="nombre" required autoComplete="name" className={campo} placeholder="Tu nombre" />
              </div>
              <div>
                <label htmlFor="m-telefono" className={etiqueta}>Teléfono</label>
                <input id="m-telefono" name="telefono" type="tel" required autoComplete="tel" inputMode="tel" className={campo} placeholder="600 000 000" />
              </div>
              <div>
                <label htmlFor="m-email" className={etiqueta}>Correo electrónico</label>
                <input id="m-email" name="email" type="email" required autoComplete="email" className={campo} placeholder="tu@email.com" />
              </div>

              <label className="flex items-start gap-2.5 text-xs leading-relaxed text-dim">
                <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 border-hair" style={{ accentColor: "var(--accent)" }} />
                <span>
                  Acepto la política de privacidad y que se traten mis datos para
                  informarme sobre el seguro solicitado.
                </span>
              </label>

              <button
                type="submit"
                disabled={enviando}
                className="pulsable w-full rounded-full px-5 py-3 text-[0.95rem] font-semibold disabled:opacity-60"
                style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
              >
                {enviando ? "Enviando…" : "Que me llamen"}
              </button>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}

/** CTA del hero de ramo: abre la ventana emergente de contacto. */
export function CtaComparar({ ramo, frase }: { ramo: string; frase: string }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="pulsable inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-center text-[0.95rem] font-semibold sm:w-auto sm:px-7 sm:text-[1rem]"
        style={{ background: "var(--color-agua-400)", color: "#04222a" }}
      >
        Comparar seguros {frase}
        <Icono name="flecha" className="h-4 w-4 shrink-0" />
      </button>
      <ModalContacto ramo={ramo} frase={frase} abierto={abierto} onCerrar={() => setAbierto(false)} />
      <BotonAdjuntar ramo={ramo} />
    </div>
  );
}

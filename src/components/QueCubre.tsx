import { Icono } from "./Iconos";
import type { Ramo } from "@/data/ramos";
import { coberturasDe } from "@/data/coberturas";

/**
 * Qué cubre y qué no, en dos columnas del mismo peso.
 *
 * Las exclusiones van al lado de las coberturas, no escondidas al final: casi
 * todos los disgustos con un seguro vienen de dar por hecho algo que nunca
 * estuvo dentro. Debajo van los párrafos largos de la introducción del ramo,
 * que hasta ahora no se pintaban en ningún sitio.
 */
export function QueCubre({ ramo }: { ramo: Ramo }) {
  const c = coberturasDe(ramo.slug);
  const parrafos = ramo.intro.slice(1);
  if (!c && parrafos.length === 0) return null;

  return (
    <section className="border-t border-hair">
      <div className="wrap py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-14">
          <div>
            <p className="t-rotulo text-accent">Antes de comparar</p>
            <h2 className="t-titulo mt-2 text-balance text-fg">
              Qué entra y qué se queda fuera
            </h2>
            {parrafos.length > 0 && (
              <div className="mt-4 grid gap-3">
                {parrafos.map((p) => (
                  <p key={p} className="t-pie text-pretty text-dim">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>

          {c && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card p-5 sm:p-6">
                <h3 className="t-titular flex items-center gap-2 text-fg">
                  <span
                    className="bg-ok-soft grid h-7 w-7 shrink-0 place-items-center rounded-full"
                    aria-hidden="true"
                  >
                    <Icono name="check" className="h-4 w-4" strokeWidth={3} />
                  </span>
                  Suele cubrir
                </h3>
                <ul className="mt-4 grid gap-2.5">
                  {c.cubre.map((x) => (
                    <li key={x} className="t-pie flex items-start gap-2.5 text-fg">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "var(--ok)" }}
                        aria-hidden="true"
                      />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-5 sm:p-6">
                <h3 className="t-titular flex items-center gap-2 text-fg">
                  <span
                    className="bg-warn-soft grid h-7 w-7 shrink-0 place-items-center rounded-full"
                    aria-hidden="true"
                  >
                    <Icono name="cross" className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  No suele cubrir
                </h3>
                <ul className="mt-4 grid gap-2.5">
                  {c.noCubre.map((x) => (
                    <li key={x} className="t-pie flex items-start gap-2.5 text-fg">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "var(--warn)" }}
                        aria-hidden="true"
                      />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="t-pie text-dim sm:col-span-2">
                Orientativo: lo que entra y lo que no lo fija siempre el
                condicionado de la póliza que se firme.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

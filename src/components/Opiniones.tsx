import { Icono } from "./Iconos";
import { OPINIONES_REALES, opinionesDe } from "@/data/opiniones";

/**
 * Valoraciones de clientes.
 *
 * Mientras `OPINIONES_REALES` esté en false, la sección se pinta con un aviso
 * bien visible de que el contenido es de ejemplo. No es un descuido: publicar
 * testimonios inventados como si fueran de clientes reales es publicidad
 * engañosa, y en una correduría registrada eso tiene consecuencias. El aviso
 * desaparece solo en cuanto se pongan las valoraciones de verdad.
 */
export function Opiniones({ ramo, titulo }: { ramo?: string; titulo?: string }) {
  const lista = opinionesDe(ramo);
  if (lista.length === 0) return null;

  return (
    <section className="border-t border-hair">
      <div className="wrap py-14 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="t-titulo text-balance text-fg">
            {titulo ?? "Lo que dicen nuestros clientes"}
          </h2>

          {!OPINIONES_REALES && (
            <p className="bg-warn-soft mx-auto mt-4 inline-block rounded-full px-4 py-1.5 text-[0.8125rem] font-medium">
              Contenido de ejemplo · pendiente de sustituir por valoraciones reales
            </p>
          )}
        </div>

        <ul className="mt-9 grid gap-4 md:grid-cols-3">
          {lista.map((o, i) => (
            <li key={i} className="card flex flex-col p-5 sm:p-6">
              <span className="flex gap-0.5" aria-label={`${o.estrellas} de 5 estrellas`}>
                {Array.from({ length: 5 }, (_, n) => (
                  <Icono
                    key={n}
                    name="estrella"
                    className="h-4 w-4"
                    style={{
                      color: n < o.estrellas ? "var(--warn)" : "var(--line-strong)",
                      fill: n < o.estrellas ? "var(--warn)" : "none",
                    }}
                  />
                ))}
              </span>

              <blockquote className="t-cuerpo mt-3.5 flex-1 text-pretty text-fg">
                {o.texto}
              </blockquote>

              <div className="mt-5 border-t border-hair pt-4">
                <p className="t-titular text-fg">{o.nombre}</p>
                <p className="t-pie text-dim">{o.detalle}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

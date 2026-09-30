import Link from "next/link";
import { Icono } from "./Iconos";
import { Foto } from "./Foto";
import { ramos } from "@/data/ramos";
import { familias } from "@/data/site";
import { coberturasDe } from "@/data/coberturas";

/**
 * Los ramos más buscados, con contenido de verdad.
 *
 * El directorio de fichas sirve para elegir rápido; esto es para quien todavía
 * no sabe qué necesita. Cada bloque dice en una frase qué es ese seguro y
 * enseña tres coberturas concretas, que es lo que de verdad distingue a un
 * ramo de otro. Alternamos el lado de la foto para que la lista no se lea como
 * una tabla.
 */

const destacados = ["salud", "hogar", "automovil", "vida"];

export function RamosDestacados() {
  return (
    <section className="border-t border-hair">
      <div className="wrap py-14 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="t-titulo text-balance text-fg">
            Qué cubre cada seguro
          </h2>
          <p className="t-cuerpo mx-auto mt-3 max-w-lg text-dim">
            Lo esencial de los cuatro que más se comparan. En su página tienes
            el detalle, las exclusiones y la tabla compañía a compañía.
          </p>
        </div>

        <div className="mt-12 grid gap-12 sm:gap-14">
          {destacados.map((slug, i) => {
            const r = ramos.find((x) => x.slug === slug)!;
            const f = familias.find((x) => x.slug === r.familia)!;
            const c = coberturasDe(slug);
            const invertido = i % 2 === 1;

            return (
              <article
                key={slug}
                className="grid items-center gap-7 lg:grid-cols-2 lg:gap-12"
              >
                <div
                  className={`relative overflow-hidden rounded-[var(--radius-card)] ${
                    invertido ? "lg:order-2" : ""
                  }`}
                  style={{ boxShadow: "var(--sombra-card)" }}
                >
                  <Foto
                    slug={slug}
                    velo="ninguno"
                    className="aspect-[16/10]"
                    sizes="(max-width: 1024px) 100vw, 520px"
                  />
                </div>

                <div className={invertido ? "lg:order-1" : ""}>
                  <span
                    className="etiqueta-familia"
                    style={{ background: f.color }}
                  >
                    {f.corto}
                  </span>

                  <h3 className="t-seccion mt-3.5 text-balance text-fg">
                    {r.nombre}
                  </h3>
                  <p className="t-cuerpo mt-3 text-pretty text-dim">
                    {r.intro[0]}
                  </p>

                  {c && (
                    <ul className="mt-5 grid gap-2">
                      {c.cubre.slice(0, 3).map((x) => (
                        <li key={x} className="flex items-start gap-2.5">
                          <span
                            className="bg-ok-soft mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                            aria-hidden="true"
                          >
                            <Icono name="check" className="h-3 w-3" strokeWidth={3} />
                          </span>
                          <span className="t-pie text-fg">{x}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href={`/seguros/${slug}`}
                    className="pulsable mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.9rem] font-semibold"
                    style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
                  >
                    Comparar {r.nombreCorto.toLowerCase()}
                    <Icono name="flecha" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

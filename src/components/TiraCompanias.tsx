import Link from "next/link";
import { LogoCompania } from "./ui";
import { companias } from "@/data/companias";
import { ramos } from "@/data/ramos";

/**
 * Las aseguradoras, en fichas. Cada logo vive en su propia caja blanca del
 * mismo tamaño, con el nombre debajo: así pesan lo mismo aunque unas marcas
 * sean apaisadas y otras cuadradas, y la fila se lee como un conjunto en vez
 * de como una tira de logos sueltos.
 */
export function TiraCompanias() {
  return (
    <section className="border-b border-hair surface-2">
      <div className="wrap py-14 text-center">
        <h2 className="t-titulo mx-auto max-w-xl text-balance text-fg">
          Comparamos los seguros de todas las aseguradoras
        </h2>
        <p className="t-cuerpo mx-auto mt-3 max-w-lg text-dim">
          Las mismas pólizas que contratarías directamente con la compañía,
          pero puestas una al lado de la otra y comparadas cobertura a
          cobertura en {ramos.length} ramos.
        </p>

        <ul className="mx-auto mt-9 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
          {companias.map((c) => (
            <li key={c.slug}>
              <span
                className="ficha-marca card grid h-[72px] place-items-center px-3"
              >
                <LogoCompania slug={c.slug} tamano="grande" />
              </span>
              <span className="t-pie mt-2.5 block font-medium text-dim">
                {c.nombre}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href="/seguros"
          className="pulsable mt-9 inline-block rounded-full border-2 px-7 py-3 text-[0.95rem] font-semibold text-accent"
          style={{ borderColor: "var(--accent)" }}
        >
          Ver todo lo que puedes comparar
        </Link>
      </div>
    </section>
  );
}

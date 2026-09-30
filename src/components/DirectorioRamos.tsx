import Link from "next/link";
import { Icono } from "./Iconos";
import { ramos } from "@/data/ramos";
import { familias } from "@/data/site";
import { colorDeRamo } from "@/data/colores";

/**
 * Directorio de ramos en cajas de color.
 *
 * Una sola rejilla en lugar de cinco listas: cada ramo es un objetivo grande
 * con su icono sobre un disco blanco y un «Comparar» explícito. Agrupar en
 * secciones dejaba familias de un solo ramo flotando en una fila vacía; así el
 * bloque se lee de corrido y ocupa la mitad.
 *
 * Cada caja lleva su propio tono, derivado del de su familia: los hermanos se
 * distinguen entre sí sin dejar de parecerse, y la leyenda de arriba sigue
 * siendo cierta.
 *
 * `tono` lo adapta a la banda de marca o al papel.
 */
export function DirectorioRamos({ tono = "claro" }: { tono?: "claro" | "oscuro" }) {
  const oscuro = tono === "oscuro";

  // Las familias marcan el orden; dentro, el orden de `ramos` manda.
  const ordenados = familias.flatMap((f) =>
    ramos.filter((r) => r.familia === f.slug).map((r) => ({ ramo: r, familia: f })),
  );

  return (
    <div>
      {/* Leyenda: qué significa cada color, una sola vez */}
      <ul className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2.5">
        {familias.map((f) => (
          <li key={f.slug} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: f.color }}
              aria-hidden="true"
            />
            <span className={`t-pie font-medium ${oscuro ? "text-white" : "text-fg"}`}>
              {f.corto}
            </span>
            <span className={`t-pie ${oscuro ? "banda-suave" : "text-dim"}`}>{f.nombre}</span>
          </li>
        ))}
      </ul>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {ordenados.map(({ ramo: r }) => {
          const c = colorDeRamo(r.slug);
          return (
            <li key={r.slug}>
              <Link
                href={`/seguros/${r.slug}`}
                className="caja-ramo caja-ramo-ancha"
                style={{ background: c.tenue, color: c.oscuro }}
              >
                <span className="caja-ramo-disco" style={{ color: c.base }} aria-hidden="true">
                  <Icono name={r.icono} className="h-6 w-6" strokeWidth={1.9} />
                </span>

                <span className="caja-ramo-nombre">{r.nombreCorto}</span>

                <span className="caja-ramo-boton">
                  <span style={{ color: c.oscuro }}>Comparar</span>
                  <Icono name="flecha" className="h-3 w-3" style={{ color: c.oscuro }} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

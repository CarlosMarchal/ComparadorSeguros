import { Icono } from "./Iconos";

/**
 * Los tres pasos de «adjunta tu póliza», como banda fija en todas las páginas.
 *
 * Va justo antes del pie porque su trabajo es recoger a quien ha llegado al
 * final sin decidirse: ya ha visto la comparativa, y aquí se le recuerda que
 * hay un camino más corto que leerse él la letra pequeña.
 *
 * La numeración va en el texto y no en un pseudoelemento para que un lector de
 * pantalla la anuncie; la lista es ordenada porque los pasos lo son.
 */

const pasos = [
  {
    icono: "documento",
    titulo: "Sube tu póliza",
    texto:
      "Comparte tu póliza actual en PDF o hazle una foto con el móvil. Solo necesitamos ver las condiciones, no tus datos personales.",
  },
  {
    icono: "chip",
    titulo: "La leemos por ti",
    texto:
      "Revisamos la letra pequeña, los copagos y las carencias automáticamente para entender qué tienes contratado de verdad.",
  },
  {
    icono: "brillo",
    titulo: "Recibes mejoras",
    texto:
      "Te enseñamos las opciones que igualan o mejoran tus coberturas actuales. Si lo que tienes ya es mejor, también te lo decimos.",
  },
];

export function PasosAnalisis() {
  return (
    <section className="border-t border-hair surface-2">
      <div className="wrap py-14 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="t-titulo text-balance text-fg">
            ¿Ya tienes seguro? Súbelo y te decimos si te conviene cambiar
          </h2>
          <p className="t-cuerpo mx-auto mt-3 max-w-lg text-dim">
            Sin registro, sin coste y sin tener que entender tú el condicionado.
          </p>
        </div>

        <ol className="mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-3 sm:gap-6">
          {pasos.map((p, i) => (
            <li key={p.titulo} className="text-center">
              <span
                className="bg-accent-soft mx-auto grid h-14 w-14 place-items-center rounded-full"
                aria-hidden="true"
              >
                <Icono name={p.icono} className="h-7 w-7" />
              </span>
              <h3 className="t-titular mt-4 text-balance text-fg">
                {i + 1}. {p.titulo}
              </h3>
              <p className="t-pie mx-auto mt-2 max-w-xs text-pretty text-dim">
                {p.texto}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

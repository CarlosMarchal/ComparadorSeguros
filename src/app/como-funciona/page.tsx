import type { Metadata } from "next";
import { Boton, TituloSeccion } from "@/components/ui";
import { Icono } from "@/components/Iconos";
import { companias } from "@/data/companias";
import { ramos } from "@/data/ramos";
import { productos } from "@/data/productos";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Cómo funciona el comparador",
  description:
    "De dónde salen los datos, por qué comparar aquí no cuesta nada y qué pasa cuando pides que te asesoren.",
  alternates: { canonical: "/como-funciona" },
};

const pasos = [
  {
    t: "Eliges qué seguro comparar",
    d: `Hay ${ramos.length} tipos de seguro y cada uno se compara por sus propios criterios: en salud manda el copago y la carencia; en coche, la franquicia y desde qué kilómetro entra la asistencia; en un multirriesgo de empresa, la pérdida de beneficios. Nada de plantillas genéricas.`,
  },
  {
    t: "Ves las pólizas enfrentadas",
    d: "Las pólizas de las principales aseguradoras, con sus coberturas fila a fila y un precio orientativo cuando el producto se puede tarificar de forma estándar. Puedes seleccionar hasta cuatro y verlas una al lado de otra.",
  },
  {
    t: "Si quieres, alguien lo revisa contigo",
    d: "Dejas tu teléfono y un asesor te llama, te dice cuál encaja con tu edad, tu provincia y tu uso previsto, y tramita el alta. También te dirá si tu póliza actual ya es mejor que lo que hay ahora en el mercado.",
  },
];

const preguntas = [
  {
    p: "¿Cuánto cuesta usar el comparador?",
    r: "Nada. Ni la comparativa ni el asesoramiento tienen coste para ti. Una correduría cobra una comisión de la aseguradora cuando se contrata una póliza, y esa comisión ya está incluida en la prima que pagarías igualmente si contrataras directamente con la compañía.",
  },
  {
    p: "¿Tengo que registrarme para ver los precios?",
    r: "No. Toda la comparativa es visible sin dejar ningún dato. Solo pedimos tu contacto si eres tú quien quiere que te llamemos.",
  },
  {
    p: "¿De dónde salen los precios?",
    r: "De las tarifas de cada compañía para un perfil tipo, que se indica bajo cada precio. Son orientativos: la prima real depende de tu edad, tu código postal, el detalle del riesgo y los descuentos aplicables en ese momento.",
  },
  {
    p: "¿Están todas las aseguradoras del mercado?",
    r: "Comparamos las compañías con las que se puede contratar a través de este servicio, que son las principales del mercado español. Aun así no es un ranking de todo el mercado, y conviene decirlo claro: siempre puede haber buenas pólizas fuera de esta lista.",
  },
  {
    p: "¿Por qué algunos seguros no tienen precio?",
    r: "Porque no se pueden tarificar sin conocer el riesgo. Un multirriesgo empresarial o una responsabilidad civil dependen de la actividad, la facturación y los capitales, así que ahí la comparativa muestra coberturas y el precio se calcula caso a caso.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <>
      <section className="border-b border-hair surface-2">
        <div className="wrap py-14 sm:py-16">
          <h1 className="t-display max-w-2xl text-fg">
            Cómo funciona este comparador
          </h1>
          <p className="t-cuerpo mt-3 max-w-xl text-dim">
            Sin registro, sin coste y sin letra pequeña sobre cómo se gana
            dinero aquí.
          </p>
        </div>
      </section>

      <section className="wrap py-14">
        <ol className="grid gap-4 md:grid-cols-3">
          {pasos.map((p, i) => (
            <li key={p.t} className="card p-6">
              <span className="bg-accent-soft tabular grid h-8 w-8 place-items-center rounded-[10px] text-sm font-semibold">
                {i + 1}
              </span>
              <h2 className="t-titular mt-4 text-fg">{p.t}</h2>
              <p className="t-pie mt-2 text-dim">{p.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-hair surface-2">
        <div className="wrap py-14">
          <TituloSeccion sobretitulo="Sin rodeos" titulo="Preguntas incómodas, respuestas claras" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {preguntas.map((f) => (
              <div key={f.p} className="card p-5">
                <h3 className="t-titular text-fg">{f.p}</h3>
                <p className="t-pie mt-2 text-dim">{f.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-14">
        <div className="card flex flex-col items-start justify-between gap-5 p-8 md:flex-row md:items-center">
          <div>
            <h2 className="t-seccion text-fg">¿Empezamos?</h2>
            <p className="t-pie mt-2 text-dim">
              Elige el seguro que te interesa o llámanos al {site.telefono}.
            </p>
          </div>
          <Boton href="/seguros">
            Ver los seguros
            <Icono name="flecha" className="h-4 w-4" />
          </Boton>
        </div>
      </section>
    </>
  );
}

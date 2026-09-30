import { Icono } from "./Iconos";

/**
 * Maqueta de móvil para el hero.
 *
 * Es una ilustración, no una captura: enseña de un vistazo qué pasa cuando
 * subes tu póliza —la tienes ordenada y con un ahorro detectado— sin tener que
 * explicarlo en un párrafo. Va marcada como decorativa para que un lector de
 * pantalla no intente leer una interfaz que no existe; todo lo que importa
 * está escrito en el texto del hero.
 *
 * Las cifras son un ejemplo ilustrativo dentro de una interfaz de mentira. No
 * las saques de aquí para usarlas como reclamo en un titular: una promesa de
 * ahorro concreta hay que poder acreditarla.
 */
export function MockupMovil({
  ramo = "Salud",
  ahorro = "148 €",
  compania = "Tu compañía actual",
}: {
  ramo?: string;
  ahorro?: string;
  compania?: string;
}) {
  return (
    <div className="mockup-movil" aria-hidden="true">
      <div className="mockup-marco">
        <span className="mockup-isla" />

        <div className="mockup-pantalla">
          {/* barra de estado */}
          <div className="flex items-center justify-between px-1 pb-3 pt-1 text-[10px] font-semibold text-[#0b1530]">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="block h-2 w-3.5 rounded-[2px] border border-[#0b1530]/60" />
            </span>
          </div>

          <p className="text-[11px] font-medium text-[#5c6d90]">Tu póliza de</p>
          <p className="font-[family-name:var(--font-display)] text-[19px] font-semibold leading-tight text-[#0b1530]">
            {ramo}
          </p>

          {/* tarjeta de ahorro */}
          <div className="mt-3 rounded-[12px] p-3" style={{ background: "#0b1530" }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#35d6e8]">
              Ahorro detectado
            </p>
            <p className="mt-0.5 font-[family-name:var(--font-display)] text-[26px] font-semibold leading-none text-white">
              {ahorro}
              <span className="ml-1 text-[11px] font-normal text-white/70">/ año</span>
            </p>
            <p className="mt-1.5 text-[9.5px] leading-snug text-white/65">
              Con las mismas coberturas que ya tienes
            </p>
          </div>

          {/* comparación */}
          <div className="mt-3 grid gap-1.5">
            <div className="flex items-center justify-between rounded-[9px] border border-[#e2e8f4] px-2.5 py-2">
              <span className="text-[10px] text-[#5c6d90]">{compania}</span>
              <span className="text-[11px] font-semibold text-[#0b1530]">41 €</span>
            </div>
            <div
              className="flex items-center justify-between rounded-[9px] px-2.5 py-2"
              style={{ background: "#eefad2", border: "1px solid #b8f24a" }}
            >
              <span className="flex items-center gap-1 text-[10px] font-medium text-[#3f5a08]">
                <Icono name="check" className="h-2.5 w-2.5" />
                Mejor opción
              </span>
              <span className="text-[11px] font-semibold text-[#3f5a08]">29 €</span>
            </div>
            <div className="flex items-center justify-between rounded-[9px] border border-[#e2e8f4] px-2.5 py-2">
              <span className="text-[10px] text-[#5c6d90]">Otra compañía</span>
              <span className="text-[11px] font-semibold text-[#0b1530]">36 €</span>
            </div>
          </div>

          {/* pie */}
          <div className="mt-3 flex items-center gap-1.5 rounded-[9px] bg-[#f2f5fa] px-2.5 py-2">
            <Icono name="escudo" className="h-3 w-3 text-[#0a7f92]" />
            <span className="text-[9px] leading-tight text-[#5c6d90]">
              Copagos y carencias comparados
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

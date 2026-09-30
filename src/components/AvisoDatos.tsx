import { DATOS_VALIDADOS, VIGENCIA_TARIFAS } from "@/data/productos";

/**
 * Solo visible mientras los datos de producto no se han validado con cada
 * compañía. Poner DATOS_VALIDADOS = true en src/data/productos.ts lo quita.
 */
export function AvisoDatos() {
  if (DATOS_VALIDADOS) return null;

  return (
    <div className="bg-warn-soft">
      <div className="wrap flex items-center gap-2 py-1.5">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v5M12 16h.01" />
        </svg>
        <span className="t-pie">
          Versión de prueba · datos de producto pendientes de validar con cada
          compañía (tarifas de {VIGENCIA_TARIFAS})
        </span>
      </div>
    </div>
  );
}

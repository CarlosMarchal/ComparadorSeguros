/**
 * Valoraciones de clientes.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * IMPORTANTE, LÉELO ANTES DE PUBLICAR
 *
 * Lo que hay aquí abajo es CONTENIDO DE EJEMPLO: son huecos con la forma que
 * tendrá la sección, no opiniones de nadie. Están escritos a propósito para
 * que se note que lo son, y la web pinta un aviso visible mientras
 * `OPINIONES_REALES` siga en false.
 *
 * No los sustituyas por testimonios inventados con nombres inventados. Una
 * correduría inscrita en el registro de la DGSFP que publica valoraciones
 * falsas se expone a dos cosas a la vez: publicidad engañosa según la Ley de
 * Competencia Desleal, y la obligación europea (directiva Ómnibus, traspuesta
 * en el texto refundido de consumidores) de acreditar que las reseñas
 * publicadas proceden de clientes que realmente contrataron.
 *
 * CÓMO PONER LAS REALES
 *   1. Recoge las valoraciones de clientes que sí hayan contratado, con su
 *      permiso para publicarlas y con el nombre tal y como acepten aparecer.
 *   2. Sustituye el array `opiniones` por las suyas.
 *   3. Pon `OPINIONES_REALES = true`. El aviso desaparece solo.
 *
 * Si lo que quieres es enseñar puntuaciones de Google o Trustpilot, mejor
 * enlazar al perfil que copiarlas: así son verificables.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const OPINIONES_REALES = false;

export type Opinion = {
  texto: string;
  nombre: string;
  detalle: string;
  /** de 1 a 5 */
  estrellas: number;
  /** slug del ramo, para poder filtrar por página */
  ramo?: string;
};

export const opiniones: Opinion[] = [
  {
    texto:
      "Aquí irá la valoración de un cliente real: qué buscaba, qué acabó contratando y qué diferencia notó. Dos o tres frases suyas, sin retocar.",
    nombre: "Nombre del cliente",
    detalle: "Perfil · provincia",
    estrellas: 5,
    ramo: "salud",
  },
  {
    texto:
      "Este hueco es para alguien que subió su póliza y comparó. Interesa que cuente qué cobertura le faltaba o le sobraba, más que el precio.",
    nombre: "Nombre del cliente",
    detalle: "Perfil · provincia",
    estrellas: 5,
    ramo: "hogar",
  },
  {
    texto:
      "Y este, para quien valore el asesoramiento: qué le explicaron de la letra pequeña que no había entendido por su cuenta.",
    nombre: "Nombre del cliente",
    detalle: "Perfil · provincia",
    estrellas: 5,
    ramo: "automovil",
  },
];

/** Opiniones para una página de ramo: las suyas primero, y si no, las generales. */
export function opinionesDe(slug?: string) {
  if (!slug) return opiniones;
  const propias = opiniones.filter((o) => o.ramo === slug);
  return propias.length ? propias : opiniones;
}

import { NextResponse } from "next/server";

/**
 * Lectura de una póliza subida por el usuario.
 *
 * Recibe un PDF o una foto, se lo pasa a la API de Anthropic y devuelve los
 * datos de seguro estructurados para poder enfrentarlos con el comparador.
 *
 * PROTECCIÓN DE DATOS
 * -------------------
 * Una póliza lleva nombre, DNI, dirección y, si es de salud, puede llevar
 * datos de categoría especial (art. 9 RGPD). Por eso, aquí:
 *
 *  1. El archivo NO se escribe en disco ni se guarda en ninguna base de datos.
 *     Vive en memoria el tiempo de la petición y se descarta.
 *  2. Se le pide explícitamente al modelo que NO extraiga identificadores
 *     personales, y además se filtran de la respuesta por si acaso.
 *  3. El front pide consentimiento expreso antes de enviar nada.
 *
 * Si algún día decides guardar los documentos, hará falta cambiar esto y
 * revisar el registro de actividades de tratamiento y el contrato de
 * encargado con el proveedor.
 *
 * CONFIGURACIÓN
 * -------------
 *   ANTHROPIC_API_KEY    obligatoria; se lee sólo en el servidor
 *   ANTHROPIC_MODEL      opcional; por defecto el de abajo
 *   ANTHROPIC_BASE_URL   opcional; para apuntar a un proxy propio
 */

export const runtime = "nodejs";
export const maxDuration = 60;

// Alias vigente a fecha de este código. Si algún día devuelve 404 de modelo,
// mira el catálogo en platform.claude.com/docs/en/models/overview y cambia
// ANTHROPIC_MODEL en el entorno; no hace falta tocar este archivo.
const MODELO = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5-5";
// Configurable para poder apuntar a un proxy propio o a un mock en pruebas.
const BASE = process.env.ANTHROPIC_BASE_URL ?? "https://api.anthropic.com";
const LIMITE_BYTES = 10 * 1024 * 1024;

const TIPOS_IMAGEN = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const TIPOS_OK = ["application/pdf", ...TIPOS_IMAGEN];

/** Campos que devuelve el modelo. Nada de datos personales, a propósito. */
const ESQUEMA = {
  type: "object" as const,
  properties: {
    es_poliza: {
      type: "boolean",
      description: "false si el documento no parece una póliza o condicionado de seguro",
    },
    ramo: {
      type: "string",
      description:
        "Ramo del seguro en minúsculas: salud, vida, decesos, hogar, automovil, comunidad, viaje, mascotas, accidentes, ahorro, empresa u otro",
    },
    compania: { type: "string", description: "Aseguradora. Cadena vacía si no consta." },
    producto: { type: "string", description: "Nombre comercial de la póliza o modalidad." },
    prima: {
      type: "string",
      description: "Importe de la prima tal y como aparece, con su periodicidad. Vacío si no consta.",
    },
    datos: {
      type: "array",
      description:
        "Entre 4 y 12 datos de cobertura relevantes para comparar: copago, carencias, franquicia, capitales, límites, cuadro médico, exclusiones destacadas.",
      items: {
        type: "object",
        properties: {
          etiqueta: { type: "string" },
          valor: { type: "string" },
        },
        required: ["etiqueta", "valor"],
      },
    },
    avisos: {
      type: "array",
      description:
        "Advertencias útiles para el usuario: carencias que siguen corriendo, exclusiones importantes, capitales que parecen bajos. Máximo 3.",
      items: { type: "string" },
    },
    confianza: {
      type: "string",
      enum: ["alta", "media", "baja"],
      description: "Lo legible que era el documento y lo seguro que estás de lo extraído.",
    },
  },
  required: ["es_poliza", "ramo", "compania", "producto", "prima", "datos", "avisos", "confianza"],
};

const INSTRUCCIONES = `Eres un corredor de seguros español leyendo la póliza que un cliente acaba de subir para compararla.

Extrae únicamente la información de seguro necesaria para una comparativa: compañía, producto, prima, copagos, carencias, franquicias, capitales, límites y exclusiones destacadas.

REGLA INNEGOCIABLE DE PRIVACIDAD. No extraigas, no copies y no menciones ningún dato personal: nombre, apellidos, DNI o NIE, número de póliza, dirección, teléfono, correo, cuenta bancaria, fecha de nacimiento, matrícula, ni ninguna referencia a enfermedades, diagnósticos o estado de salud de una persona concreta. Si un dato de cobertura sólo puede explicarse citando algo de esa lista, deja el campo vacío.

Usa las palabras del documento; no inventes cifras ni rellenes huecos. Si un dato no aparece, deja la cadena vacía. Si el documento no es una póliza ni un condicionado de seguro, pon es_poliza en false y deja lo demás vacío.

Escribe en español de España, en las etiquetas y en los valores.`;

/** Barrido final: si algo se coló pese a las instrucciones, no sale de aquí. */
const PATRONES_PERSONALES = [
  /\b\d{8}[- ]?[A-HJ-NP-TV-Z]\b/i, // DNI
  /\b[XYZ][- ]?\d{7}[- ]?[A-HJ-NP-TV-Z]\b/i, // NIE
  /\bES\d{2}[ ]?\d{4}[ ]?\d{4}/i, // IBAN
  /\b[\w.+-]+@[\w-]+\.[\w.]+\b/, // email
  /\b(?:\+34[ ]?)?[6-9]\d{2}[ ]?\d{3}[ ]?\d{3}\b/, // teléfono
];

const limpio = (t: string) =>
  PATRONES_PERSONALES.some((re) => re.test(t)) ? "" : t.trim();

export async function GET() {
  // Sirve para comprobar desde el front si el análisis está disponible.
  return NextResponse.json({ disponible: Boolean(process.env.ANTHROPIC_API_KEY) });
}

export async function POST(request: Request) {
  const clave = process.env.ANTHROPIC_API_KEY;
  if (!clave) {
    return NextResponse.json(
      { ok: false, error: "El análisis de pólizas no está configurado en este servidor." },
      { status: 503 },
    );
  }

  let archivo: File | null = null;
  try {
    const form = await request.formData();
    const f = form.get("archivo");
    if (f instanceof File) archivo = f;
  } catch {
    return NextResponse.json({ ok: false, error: "No hemos podido leer el envío." }, { status: 400 });
  }

  if (!archivo) {
    return NextResponse.json({ ok: false, error: "Falta el archivo." }, { status: 400 });
  }
  if (!TIPOS_OK.includes(archivo.type)) {
    return NextResponse.json(
      { ok: false, error: "Solo admitimos PDF o una foto en JPG, PNG o WEBP." },
      { status: 415 },
    );
  }
  if (archivo.size > LIMITE_BYTES) {
    return NextResponse.json(
      { ok: false, error: "El archivo supera los 10 MB. Prueba con menos páginas o una foto más ligera." },
      { status: 413 },
    );
  }

  const datos = Buffer.from(await archivo.arrayBuffer()).toString("base64");

  const documento =
    archivo.type === "application/pdf"
      ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: datos } }
      : { type: "image", source: { type: "base64", media_type: archivo.type, data: datos } };

  let respuesta: Response;
  try {
    respuesta = await fetch(`${BASE}/v1/messages`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": clave,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODELO,
        max_tokens: 2000,
        system: INSTRUCCIONES,
        tools: [
          {
            name: "registrar_poliza",
            description: "Registra los datos de seguro extraídos de la póliza.",
            input_schema: ESQUEMA,
          },
        ],
        tool_choice: { type: "tool", name: "registrar_poliza" },
        messages: [
          {
            role: "user",
            content: [
              documento,
              { type: "text", text: "Extrae los datos de esta póliza para poder compararla." },
            ],
          },
        ],
      }),
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "No hemos podido contactar con el servicio de análisis." },
      { status: 502 },
    );
  }

  if (!respuesta.ok) {
    // El detalle va al log del servidor; al usuario, un mensaje entendible.
    console.error("[analizar-poliza]", respuesta.status, await respuesta.text().catch(() => ""));
    return NextResponse.json(
      { ok: false, error: "El servicio de análisis no ha respondido correctamente." },
      { status: 502 },
    );
  }

  const cuerpo = await respuesta.json();
  const bloque = (cuerpo.content ?? []).find(
    (c: { type: string; name?: string }) => c.type === "tool_use" && c.name === "registrar_poliza",
  );

  if (!bloque?.input) {
    return NextResponse.json(
      { ok: false, error: "No hemos conseguido leer el documento. Prueba con otra copia más nítida." },
      { status: 422 },
    );
  }

  const p = bloque.input as {
    es_poliza: boolean;
    ramo: string;
    compania: string;
    producto: string;
    prima: string;
    datos: { etiqueta: string; valor: string }[];
    avisos: string[];
    confianza: string;
  };

  if (!p.es_poliza) {
    return NextResponse.json(
      { ok: false, error: "Esto no parece una póliza de seguro. Sube el condicionado particular o la última renovación." },
      { status: 422 },
    );
  }

  return NextResponse.json({
    ok: true,
    poliza: {
      ramo: limpio(p.ramo ?? ""),
      compania: limpio(p.compania ?? ""),
      producto: limpio(p.producto ?? ""),
      prima: limpio(p.prima ?? ""),
      datos: (p.datos ?? [])
        .map((d) => ({ etiqueta: limpio(d.etiqueta ?? ""), valor: limpio(d.valor ?? "") }))
        .filter((d) => d.etiqueta && d.valor)
        .slice(0, 12),
      avisos: (p.avisos ?? []).map(limpio).filter(Boolean).slice(0, 3),
      confianza: ["alta", "media", "baja"].includes(p.confianza) ? p.confianza : "media",
    },
  });
}

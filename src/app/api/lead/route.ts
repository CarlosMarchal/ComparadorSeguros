import { NextResponse } from "next/server";

/**
 * Endpoint de respaldo para el formulario de captación.
 *
 * Si defines NEXT_PUBLIC_HUBSPOT_PORTAL_ID y NEXT_PUBLIC_HUBSPOT_FORM_ID,
 * el formulario envía directamente al Forms API de HubSpot y esta ruta no
 * llega a usarse.
 *
 * Aquí tienes el punto donde conectar lo que necesites: la API privada de
 * HubSpot con un token de acceso, un envío por email, una hoja de cálculo
 * o tu propio CRM. De momento registra el lead en el log del servidor para
 * que nada se pierda mientras se termina la integración.
 */
export async function POST(request: Request) {
  try {
    const datos = await request.json();

    if (!datos?.firstname || !datos?.phone || !datos?.email) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos obligatorios" },
        { status: 400 },
      );
    }

    console.info("[lead]", {
      recibido: new Date().toISOString(),
      ...datos,
    });

    // TODO: enviar a HubSpot con HUBSPOT_PRIVATE_APP_TOKEN
    // await fetch("https://api.hubapi.com/crm/v3/objects/contacts", { ... })

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Solicitud no válida" },
      { status: 400 },
    );
  }
}

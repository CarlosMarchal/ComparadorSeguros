# Adjuntar póliza y leerla con IA

El botón **«Adjunta tu seguro y compara»** del hero abre un diálogo donde el
usuario sube su póliza (PDF o foto). El archivo se envía a
`/api/analizar-poliza`, que se lo pasa a la API de Anthropic, y el usuario ve
en pantalla lo que hemos entendido: compañía, producto, prima, copagos,
carencias y coberturas. Debajo se le pide el teléfono para que un asesor le
llame.

## Para que funcione

Crea un archivo `.env.local` en la raíz del proyecto (no lo subas a git):

```
ANTHROPIC_API_KEY=sk-ant-...
```

La clave se saca en <https://console.anthropic.com> → API Keys. Se lee **solo
en el servidor**: nunca llega al navegador.

Opcionales:

```
ANTHROPIC_MODEL=claude-sonnet-5-5      # el que usa por defecto
ANTHROPIC_BASE_URL=https://api.anthropic.com   # solo si usas un proxy propio
```

Si algún día la API responde que el modelo no existe, mira el catálogo en
<https://platform.claude.com/docs/en/models/overview> y cambia
`ANTHROPIC_MODEL`. No hace falta tocar el código.

Para comprobar que está configurado, abre `/api/analizar-poliza` en el
navegador: responde `{"disponible":true}` o `false`.

Sin clave, el botón sigue apareciendo pero devuelve un aviso de que el
análisis no está disponible. No rompe nada.

## Coste

Cada análisis es una llamada con el documento dentro. Una póliza de 2-3
páginas ronda los 0,01-0,03 €. Con 1.000 análisis al mes hablamos de unos
20 € mensuales. Conviene poner un límite de gasto en la consola de Anthropic
antes de abrirlo al público.

## Protección de datos — léelo antes de publicar

Una póliza lleva nombre, DNI, dirección y número de cuenta. Si es de salud,
además puede llevar datos de categoría especial (art. 9 RGPD). Lo que hace el
código hoy:

- **El archivo no se guarda.** Ni en disco, ni en base de datos, ni en logs.
  Vive en memoria el tiempo de la petición y se descarta.
- **Se le prohíbe al modelo extraer identificadores personales**, y además la
  respuesta pasa por un filtro que borra cualquier campo donde se cuele un
  DNI, un NIE, un IBAN, un correo o un teléfono. Está probado.
- **Consentimiento antes de enviar**: el usuario ve qué pasa con su documento
  antes de soltarlo, y marca la casilla de privacidad antes de dejar sus datos.

Lo que **te queda a ti** antes de abrirlo al público:

1. **Contrato de encargado del tratamiento con Anthropic.** El documento sale
   de España para ser procesado. Necesitas el DPA firmado y reflejarlo en tu
   registro de actividades de tratamiento.
2. **Actualizar la política de privacidad**: qué se sube, para qué, cuánto se
   conserva (aquí: nada) y quién lo procesa.
3. **Decidir si quieres tratar datos de salud.** Una póliza médica puede
   revelar patologías. Hoy el código pide al modelo que no los extraiga, pero
   el documento en sí se envía entero. Si prefieres no tocar categoría
   especial, lo razonable es limitar el botón a los ramos que no son de salud,
   o pedir un consentimiento explícito específico para ello.
4. **Límite de peticiones por IP**, para que nadie use tu clave de API como
   OCR gratuito.

No soy abogado y esto no es asesoramiento legal: antes de publicarlo, que lo
revise quien lleve el cumplimiento en la correduría.

## Dónde está cada cosa

| Archivo | Qué hace |
| --- | --- |
| `src/components/AdjuntarPoliza.tsx` | El diálogo completo: subir, analizar, resultado y contacto. También exporta `BotonAdjuntar`, el botón del hero. |
| `src/app/api/analizar-poliza/route.ts` | Recibe el archivo, llama a la API y filtra los datos personales. |
| `src/app/api/lead/route.ts` | Recibe el contacto cuando el usuario pide que le llamen. Aquí es donde toca enganchar HubSpot. |

## Qué falta

- Enganchar `/api/lead` a HubSpot con `HUBSPOT_PRIVATE_APP_TOKEN`. Ahora mismo
  registra el lead en el log del servidor.
- Si quieres que las coberturas leídas entren como una columna más en la tabla
  comparativa (como en la app de Replit), se puede: el endpoint ya devuelve los
  datos con la forma adecuada.

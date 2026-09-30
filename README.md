# Comparador de seguros · Marchal Consultores

Web comparadora de los 17 ramos con los que trabaja Marchal Consultores.
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4.

---

## Arrancar el proyecto

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run start    # sirve el build
```

---

## ⚠️ Antes de publicar: validar los datos

Los valores de coberturas y los precios orientativos de
`src/data/productos.ts` son una **plantilla realista, no condiciones
contractuales verificadas**. Mientras `DATOS_VALIDADOS` sea `false`, la web
muestra un banner amarillo avisándolo.

Pasos:

1. Sustituye cada valor por el de la nota técnica vigente de cada compañía.
2. Actualiza `VIGENCIA_TARIFAS` con la fecha de tarifas.
3. Pon `DATOS_VALIDADOS = true` y el banner desaparece.

---

## Estructura

```
src/
  app/
    page.tsx                 Home
    seguros/page.tsx         Índice de los 17 ramos por familia
    seguros/[slug]/page.tsx  Ficha de ramo + comparador + FAQ (SSG)
    contacto/ nosotros/      Páginas estáticas
    api/lead/route.ts        Endpoint de respaldo del formulario
    sitemap.ts robots.ts     SEO técnico
  components/
    Comparador.tsx           Filtros, tarjetas y tabla comparativa (cliente)
    FormularioLead.tsx       Captación, preparado para HubSpot
    Header / Footer / FAQ / GridRamos / ui / Iconos
  data/
    site.ts        Datos de la correduría y familias del menú
    companias.ts   Las 6 aseguradoras
    ramos.ts       Los 17 ramos: textos, criterios de comparación, FAQ
    productos.ts   Productos comparables ⚠️ pendientes de validar
```

### Añadir un producto a la comparativa

En `src/data/productos.ts`, añade un objeto al array. Las claves de
`valores` deben coincidir con los `id` de los criterios del ramo, definidos
en `src/data/ramos.ts`. Todo lo demás (tarjetas, tabla, orden por precio) se
genera solo.

### Añadir un ramo

Añade un objeto a `ramos` en `src/data/ramos.ts` con sus `criterios`, sus
`consejos` y sus `faqs`. La ruta `/seguros/<slug>`, el menú, el footer y el
sitemap se generan automáticamente.

---

## Integración con HubSpot

El formulario funciona de dos maneras:

**A. Forms API (recomendada).** Crea `.env.local`:

```
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=xxxxxxx
NEXT_PUBLIC_HUBSPOT_FORM_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Los campos ya se llaman `firstname`, `email`, `phone`, así que el mapeo con
las propiedades del CRM es automático.

**B. Endpoint propio.** Sin esas variables, el formulario envía a
`/api/lead`, donde está marcado el punto exacto para conectar la API privada
de HubSpot con un token, un email o lo que prefieras.

---

## Logotipos de las compañías

El repositorio no incluye material gráfico de terceros: cada compañía se
muestra con un monograma de su color corporativo. Cuando tengas los archivos
autorizados por cada aseguradora, déjalos en `public/logos/<slug>.svg` y
adapta `LogoCompania` en `src/components/ui.tsx` para usarlos.

---

## SEO

- Metadata por página y canonical en todas las rutas.
- JSON-LD de `BreadcrumbList` y `FAQPage` en cada ficha de ramo.
- `sitemap.xml` y `robots.txt` generados desde los datos.
- Las 17 fichas se prerrenderizan como HTML estático (SSG).

Antes de desplegar, cambia `site.url` en `src/data/site.ts` por el dominio
definitivo.

---

## Aviso legal

Las comparativas son orientativas y no constituyen oferta contractual. Las
coberturas, límites, carencias y primas definitivas son las que figuren en
las condiciones particulares y generales de cada póliza.

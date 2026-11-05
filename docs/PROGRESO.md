# Progreso de la web final

Rama: `web-final`. Trabajo por fases, con commits pequeños.

## Fase 1 — Datos reales

- `src/data/site.ts` como fuente única: dirección, teléfono, valoración,
  servicios, reseñas enlaces y horario confirmado.
- `business.ts` se mantiene solo como reexportación de compatibilidad.
- `src/data/menu.json` con la carta completa transcrita.
- `src/data/copy.ts` con textos, FAQ y metadatos reales.
- Horario confirmado: lunes cerrado; martes a domingo, de 12:30 a 24:00.
- Desayunos y brunch retirados de la carta y de la web.

## Fase 2 — Fotos

- Fotos reales enviadas por el titular el 2 de noviembre de 2026, documentadas
  en `docs/FOTOS.md`.
- `npm run photos` genera variantes AVIF/WebP/JPG y el manifiesto, incluyendo
  el ancho nativo de cada original.
- Foto de portada, comedor, tajín, pescado, marisco y seis fotos de galería.
- Foto de cuscús pendiente: el bloque usa un panel de marca para no etiquetar
  otro plato como cuscús.
- Logo real integrado en el nav, el pie y la portada; `npm run brand` genera
  favicon, ICO e iconos de iOS/PWA desde el original.

## Fase 3 — Sistema visual

- Negro cálido `#100f0c`, crema `#f5efe3` y dorado del logotipo `#c8a35a`
  (ver `DESIGN.md`). Sin amarillo puro.
- Anton (display) e Inter (texto), autohospedadas. Kaushan Script y
  `BrushLabel` eliminados.
- `StarPattern`, `StarMotif`, `HalalSeal`, `Leaf`, `DottedRule` y `PhotoFrame`.
- Componentes de navegación, carta, galería, mapa y FAQ adaptados.

## Mejora visual (rama `mejora-visual`)

Tres fases, un commit por fase. Sin tocar contenido, rutas ni datos reales.

- **Fase A — sistema:** tokens de color y tipografía, dorado del logo, dos
  familias, eliminación de pastillas manuscritas, marcos girados y fondos
  amarillos. `DESIGN.md` documenta la dirección.
- **Fase B — páginas:** portada, carta, reseñas, información, legales y 404
  rehechos; hero a pantalla completa, carta con barra sticky y precios con
  puntos, reseñas en capitalización normal, comillas `« »`, pie sin enlaces
  duplicados y NIF oculto en `business.ts`.
- **Fase C — QA:** capturas a 390/768/1440, scroll real, fallback sin JS,
  movimiento reducido, contraste AA, Lighthouse móvil y auditoría de directrices.

### Rendimiento (Lighthouse móvil, build de producción)

| Ruta | LCP antes | LCP ahora | CLS | Rendimiento |
| --- | --- | --- | --- | --- |
| `/` | 5,0 s | **2,3 s** | 0 | 98 |
| `/carta` | 3,3 s | **2,4 s** | 0 | 98 |
| `/el-local` | 2,5 s | **2,1 s** | 0 | 99 |
| `/resenas` | 2,4 s | **2,3 s** | 0 | 99 |

Accesibilidad, buenas prácticas y SEO: 100 en las cuatro. Cómo se consigue:

- El hero de la portada se sirve **ya pintado** en `index.html`, fuera de
  `#root`, y su foto vive en un `<template>`: solo se descarga en `/`.
- `src/useListoTrasPintar.js` retrasa al segundo pintado las secciones de
  portada, carta y local, con la altura reservada (de ahí el CLS 0).
- Sin `fetchpriority="high"` en la foto del hero (adelantaba la imagen al JS y
  a las fuentes) y logo del nav en WebP (32 KB → 7 KB).
- Sin fondos de reserva en `Photo.jsx`: eran ocho fotos fuera de pantalla.
- El elemento LCP de la portada es el titular en Anton (llega después que la
  foto), no la foto: por eso las dos fuentes van precargadas.

Comprobado con `.audit/checks.mjs`: sin scroll horizontal ni bloques
invisibles a 390/768/1440, la portada se lee sin JavaScript y
`prefers-reduced-motion` desactiva todas las transiciones.

### Pendiente de confirmar con el dueño

Terraza, Wi-Fi gratis, menú infantil y horario `12:30–24:00` se mantienen tal
como estaban. Faltan datos que solo puede dar él: NIF/CIF y razón social,
política de reservas, WhatsApp, precios de croquetas, fingers y nuggets, IVA y
alérgenos, horario de festivos y la carta escaneada.

### Instagram

La portada tiene un bloque «Lo último, en vídeo» con los tres vídeos más
recientes. Las URL de cada reel se pegan en `src/data/instagram.ts`: en cuanto
una tarjeta tiene `reelUrl`, se reproduce con el reproductor oficial de
Instagram **al pulsarla** (nada de Meta se carga antes, igual que el mapa).
Mientras no haya URL, la tarjeta muestra una foto real y enlaza al perfil.

## Fase 4 — Páginas

- `/` portada completa.
- `/carta` con categorías, buscador y ficha por plato.
- `/el-local` con horario, cómo llegar, servicios y FAQ.
- `/resenas` con reseñas reales y frases destacadas.
- `/aviso-legal` y `/politica-de-cookies`.
- 404 con el nuevo diseño.
- Redirecciones desde `/informacion`, `/contacto` y `/cookies`.

## Fase 5 — SEO y publicación

- `index.html` con metadatos, Open Graph, manifest y JSON-LD estático sin
  `aggregateRating`.
- `Seo.jsx` actualiza título, descripción, canonical y JSON-LD por ruta.
- `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, favicon real y `og.png`.
- Build de producción correcto.

## Fase 6 — QA

- Capturas en 375, 768 y 1440 px de todas las rutas.
- Revisión de enlaces, buscador, pestañas de la carta y acordeón de FAQ.
- Comprobación de que no hay peticiones a terceros al cargar (el mapa solo se
  carga al pulsar «Cargar mapa»).
- Búsqueda de restos del prototipo.

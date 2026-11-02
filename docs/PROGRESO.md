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

- Negro `#070706`, ámbar `#F4C816`, crema cálida y verde hoja.
- Anton (display), Kaushan Script (pinceladas) e Inter (cuerpo), autohospedadas.
- `StarPattern`, `StarMotif`, `HalalSeal`, `Leaf`, `DottedRule`, `BrushLabel`
  y `PhotoFrame`.
- Componentes de navegación, carta, galería, mapa y FAQ adaptados.

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

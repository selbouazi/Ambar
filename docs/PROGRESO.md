# Progreso de la web final

Rama: `web-final`. Trabajo por fases, con commits pequeños.

## Fase 1 — Datos reales

- `src/data/site.ts` como fuente única: dirección, teléfono, valoración,
  servicios, reseñas enlaces y horario confirmado.
- `business.ts` se mantiene solo como reexportación de compatibilidad.
- `src/data/menu.json` con la carta completa transcrita.
- `src/data/copy.ts` con textos, FAQ y metadatos reales.

## Fase 2 — Fotos

- Fotos descargadas de la ficha de Google y del perfil de Instagram del
  negocio, documentadas en `docs/FOTOS.md`.
- `npm run photos` genera variantes AVIF/WebP/JPG y el manifiesto.
- Recortes del comedor para portada, historia, galería y mapa.

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
- `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, favicon y `og.png`.
- Build de producción correcto.

## Fase 6 — QA

- Capturas en 375, 768 y 1440 px de todas las rutas.
- Revisión de enlaces, buscador, pestañas de la carta y acordeón de FAQ.
- Comprobación de que no hay peticiones a terceros al cargar (el mapa solo se
  carga al pulsar «Cargar mapa»).
- Búsqueda de restos del prototipo.

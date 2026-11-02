# Fotos pendientes de Ambar

Generado automáticamente por `npm run photos`. No editar a mano.

## Cómo funciona

1. Coloca los originales en `public/photos/` con **exactamente** estos nombres
   (la extensión puede ser `.jpg`, `.jpeg`, `.png`, `.webp` o `.avif`).
2. Ejecuta `npm run photos`.
3. El script genera las variantes optimizadas en `public/photos/gen/` y
   actualiza `src/data/photo-manifest.json`. La web las usa sola: no hay que
   tocar ningún componente.
4. Vuelve a ejecutar `npm run photos` cada vez que cambies una foto.

Mientras una foto no exista, la web muestra un panel de marca con el nombre del
plato y la proporción exacta de la foto final: la maquetación nunca deja una
caja vacía.

**Derechos:** las fotos son del propietario del restaurante y se usan con su
permiso. No se enlazan ni se descargan imágenes de Google Maps desde el código.

## Huecos por rellenar (1)

| Archivo | Proporción ideal | Etiqueta | Dónde va |
|---|---|---|---|
| `public/photos/cuscus.jpg` | 4/3 | Cuscús con verduras y garbanzos, el plato de los viernes. | Portada y carta, bloque de cuscús (foto pendiente) |

## Fotos ya colocadas (11)

- `hero-interior` — Portada (fondo a pantalla completa)
- `comedor` — Portada, bloque «Un rincón marroquí»
- `tajine` — Carta, categoría Platos
- `lubina` — Carta, categoría Pescado
- `marisco` — Carta, categoría Entrantes
- `galeria-01` — Galería
- `galeria-02` — Galería
- `galeria-03` — Galería
- `galeria-04` — Galería y mapa
- `galeria-05` — Galería
- `galeria-06` — Galería

## Recomendaciones de captura

- Luz natural o la luz cálida del local; evitar el flash directo.
- Horizontal 16:9 para el hero y las bandas; vertical 4:5 para el retrato del local.
- Que el plato ocupe el centro del encuadre y dejar aire alrededor.
- Mínimo 1600 px en el lado largo. El script se encarga del resto.
- Para la galería, mezclar sala, platos y detalle de la decoración.

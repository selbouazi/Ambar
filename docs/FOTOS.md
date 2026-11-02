# Fotos y marca

Estado del material gráfico a **2 de noviembre de 2026**.

## Fotos publicadas

Las fotos nuevas las aportó el titular por WhatsApp el 2 de noviembre de 2026.
Son imágenes propias del restaurante: no se ha usado ningún banco de imágenes
ni material de terceros.

| Archivo final | Origen | Uso | Resolución |
|---|---|---|---|
| `public/photos/hero-interior.jpg` | WhatsApp · `15.25.27.jpeg` | Fondo de la portada | 1179 × 874 |
| `public/photos/comedor.jpg` | WhatsApp · `15.25.27 (1).jpeg` | Bloque «Un rincón marroquí» | 1179 × 1551 |
| `public/photos/tajine.jpg` | WhatsApp · `15.25.26 (3).jpeg` | Carta, categoría Platos | 1179 × 1557 |
| `public/photos/lubina.jpg` | WhatsApp · `15.25.25 (1).jpeg` | Carta, categoría Pescado | 1179 × 1539 |
| `public/photos/marisco.jpg` | WhatsApp · `15.25.25 (3).jpeg` | Carta, entrantes y portada | 1179 × 1557 |
| `public/photos/galeria-01.jpg` | WhatsApp · `15.25.25.jpeg` | Galería: té con hierbabuena | 1179 × 1560 |
| `public/photos/galeria-02.jpg` | WhatsApp · `15.25.25 (2).jpeg` | Galería: pan, aceitunas y té | 1008 × 1365 |
| `public/photos/galeria-03.jpg` | WhatsApp · `15.25.27 (2).jpeg` | Galería: pollo con arroz | 1179 × 1546 |
| `public/photos/galeria-04.jpg` | WhatsApp · `15.25.26 (2).jpeg` | Galería y fondo del mapa | 1179 × 661 |
| `public/photos/galeria-05.jpg` | WhatsApp · `15.25.27 (4).jpeg` | Galería: tajín de pollo | 1179 × 996 |
| `public/photos/galeria-06.jpg` | WhatsApp · `15.25.27 (3).jpeg` | Galería: batidos | 1179 × 1449 |

Los originales completos se conservan en
`src/assets/photos/raw/propietario-2026-11/` como prueba de procedencia. No se
publican.

### Foto de cuscús pendiente

Entre las fotos nuevas no hay ninguna de cuscús. Las que muestran arroz, tajín o
pollo no se han etiquetado como cuscús para no dar información falsa. El bloque
de cuscús usa un panel de marca con el texto del plato; se sustituirá cuando el
titular envíe una foto real de cuscús.

La antigua captura de Instagram con el texto árabe y las burbujas se ha retirado
de la web y se conserva solo como original en la carpeta raw.

### Material no utilizado

- `foto1.png`: la foto del marisco lleva superpuestos los controles de Google
  Maps. No se puede publicar así.
- `foto2.png`: los bocadillos se ven bien, pero el fondo de cocina y la bolsa
  verde restan calidad. Se conserva por si se quiere usar en el futuro.

## Logo y favicon

El logotipo real está en `public/brand/ambar-logo.png` y sus variantes de 160 y
320 px. Se usa en la cabecera, el pie y la portada. Los iconos de navegador,
iOS y PWA se generan desde el mismo archivo con:

```bash
npm run brand
```

El original es un PNG de 572 × 436. Falta el vector (SVG, AI o EPS) para que
escale sin pérdida en tamaños grandes.

## Limitaciones conocidas

- Las fotos de WhatsApp tienen 1179 px de ancho como máximo. Las variantes
  generadas incluyen ese tamaño nativo para no ampliar de más; en pantallas muy
  grandes la portada puede verse algo blanda. Conviene pedir el original de la
  foto de portada en 16:9 y al menos 1920 px.
- No hay fotos de la terraza ni de la fachada.
- La foto de cuscús sigue pendiente y el bloque usa un panel de marca.

## Cómo sustituirlas

1. Guarda los originales en `public/photos/` con el mismo nombre (`hero-interior.jpg`,
   `tajine.jpg`, etc.). La extensión puede ser `.jpg`, `.jpeg`, `.png`, `.webp`
   o `.avif`.
2. Ejecuta `npm run photos`. El script genera las variantes optimizadas en
   `public/photos/gen/` y actualiza `src/data/photo-manifest.json`.
3. Comprueba `docs/FOTOS-PENDIENTES.md`, que se regenera en cada ejecución.
4. Si cambias el logo, sustituye el original en la carpeta raw y ejecuta
   `npm run brand`.

Recomendaciones para la sesión definitiva:

- Horizontal 16:9 para la portada; vertical 4:5 para el retrato del comedor.
- Luz natural o la luz cálida del local, sin flash directo.
- Mínimo 1600 px en el lado largo; 1920 px para la portada.
- Platos centrados y con aire alrededor.
- Mezclar sala, platos, terraza y fachada.

## Derechos

Las fotos se publican porque son del restaurante. Antes de cerrar la web, el
titular debe confirmar por escrito que autoriza su uso en la web y en redes.

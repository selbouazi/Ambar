# Diseño de Restaurante Halal Ambar

Guía visual del sitio. Sirve para revisar cambios y para que cualquier
modificación futura mantenga la misma dirección. El contenido, las rutas y los
datos reales no se tocan aquí: eso vive en `src/data/`.

- Dirección: **Minimalismo y estilo suizo** (`ui-ux-pro-max-skill`,
  estilo `minimalism-and-swiss-style`), con el dorado del logotipo como único
  acento.
- Todos los valores viven como tokens en `src/index.css`, bloque `@theme`.
  En los componentes se usan las utilidades que generan esos tokens
  (`text-h2`, `py-section`, `max-w-page`, `rounded-ui`…), no valores sueltos.
- Fuentes de verdad de datos: `src/data/site.ts`, `src/data/menu.json`,
  `src/data/copy.ts`.

## 1. Dirección

Claridad, retícula y tipografía. Lo esencial, sin adornos.

1. **Una familia grotesca.** Inter variable en negrita para titulares e Inter
   regular para todo lo demás. El nombre **Ambar** es el monumento de la
   portada (`text-hero`).
2. **Monocromo.** Secciones alternas de negro neutro (`night-950`,
   `night-900`) y papel blanco roto (`cream-50`). Sin tintes cálidos en los
   neutros.
3. **Un solo acento.** El dorado del logotipo (`gold-*`). Nada más compite con
   él: ni amarillo puro, ni segundos acentos, ni degradados de marca.
4. **Sin decoración.** Sin tramas, sin hojas, sin sombras, sin desenfoques,
   sin esquinas redondeadas (`--radius-ui: 0`). Las líneas finas
   (`border-*/15`) son la única estructura visible.
5. **Retícula de 12 columnas**, alineación a la izquierda, mucho aire entre
   bloques (`--spacing-section`).

## 2. Color

| Token | Valor | Uso | Contraste |
|---|---|---|---|
| `night-950` | `#0d0d0d` | Fondo principal, pie, barras | — |
| `night-900` | `#161616` | Superficie elevada sobre oscuro | — |
| `night-800` | `#232323` | Paneles y huecos de foto | — |
| `cream-50` | `#fafaf8` | Papel; texto principal sobre oscuro | 18.60 con `night-950` |
| `cream-100` | `#ececea` | Panel sobre papel; texto sobre oscuro | 15.30 con `night-900` |
| `cream-200` | `#b8b8b3` | Texto secundario sobre oscuro | 9.76 con `night-950` · 7.89 con `night-800` |
| `ink` | `#0d0d0d` | Texto sobre papel | 18.60 con `cream-50` |
| `ink-soft` | `#3b3b38` | Texto largo sobre papel | 10.75 con `cream-50` |
| `ink-mute` | `#5a5a56` | Notas sobre papel | 6.63 con `cream-50` · 5.86 con `cream-100` |
| `gold-500` | `#c8a35a` | CTA principal, iconos sobre oscuro | 8.18 con `night-950` |
| `gold-400` | `#d6b46c` | Acento sobre oscuro | 9.81 con `night-950` |
| `gold-300` | `#e5cf9c` | Enlaces sobre oscuro | 12.71 con `night-950` |
| `gold-700` | `#7c5a23` | Acento sobre papel | 6.01 con `cream-50` · 5.31 con `cream-100` |
| `focus-on-dark` | `= gold-500` | Anillo de foco sobre negro | 8.18 |
| `focus-on-light` | `= ink` | Anillo de foco sobre papel | 18.60 |
| `scrim` / `scrim-soft` | negro al 88 % / 38 % | Velo sobre la foto del hero | — |

Reglas:

- Sobre papel, el acento es **siempre `gold-700`**. `gold-500` sobre papel da
  2.27 y no se usa ni para texto ni para el foco.
- Todo el texto cumple AA (≥ 4.5); casi todo, AAA.
- `open` (verde) solo marca el estado «Abierto ahora», siempre con texto.

## 3. Tipografía

Inter variable (pesos 400–800), servida desde el propio dominio.

| Token | Tamaño | Uso |
|---|---|---|
| `text-hero` | `clamp(5rem, 24vw, 13rem)` · 700 · −0.055em | El nombre en portada, el 404 |
| `text-h1` | `clamp(3rem, 7.5vw, 6.5rem)` · 700 | Titular de página |
| `text-h2` | `clamp(2.4rem, 5.4vw, 4.75rem)` · 700 | Titulares de sección grandes, precios destacados |
| `text-h3` | `clamp(1.9rem, 3.6vw, 3.1rem)` · 700 | `SectionHeading`, categorías de la carta, cierres |
| `text-h4` | `clamp(1.5rem, 2.6vw, 2.25rem)` · 600 | Dirección, teléfono grande |
| `text-title` | 22 px | Reseña destacada, titulares pequeños |
| `text-lead` | 19 px | Entradillas |
| `text-body` | 17 px | Texto largo |
| `text-body-sm` | 15 px | Texto secundario |
| `text-meta` | 14 px | Pies y datos |
| `text-label` | 13 px | Etiquetas y notas |

Cada token de titular ya lleva su interlineado, interletraje y peso: no se
añaden `leading-[…]` ni `tracking-[…]` encima.

Prohibido: segunda familia, cursiva decorativa, `uppercase` en reseñas o
titulares. La única versalita es la etiqueta pequeña con `tracking-label`.

## 4. Espaciado, retícula y forma

| Token | Valor | Utilidad |
|---|---|---|
| `--spacing-gutter` | `clamp(1.25rem, 3.2vw + 0.5rem, 3rem)` | `px-gutter` |
| `--spacing-section` | `clamp(5rem, 8vw, 8rem)` | `py-section`, `pb-section` |
| `--spacing-section-sm` | `clamp(5rem, 7vw, 7rem)` | `py-section-sm` (páginas interiores) |
| `--spacing-section-compact` | `clamp(4rem, 6vw, 6rem)` | `py-section-compact` (cierres) |
| `--container-page` | `86rem` | `max-w-page` |
| `--container-menu` | `74rem` | `max-w-menu` (carta) |
| `--radius-ui` | `0` | `rounded-ui` |

Sin sombras en todo el sitio.

## 5. Composición

### Portada

- Hero a `100svh`, foto real a sangre con `.photo-scrim` (un solo velo
  vertical negro). Orden: nombre → entradilla → CTA → barra de datos.
- Una sola CTA primaria por pantalla; el resto, secundaria (`onDark`/`onCream`).
- La copia estática del hero vive en `index.html` y usa los mismos tokens.

### Secciones

- Alternan `night-950` → `cream-50` → `night-950`.
- Rejilla de 12 columnas en escritorio, `max-w-page` y `px-gutter`.
- Los datos en fila (4,9 · 154 · Viernes) van en `flex-wrap`, no en
  columnas fijas: Inter en negrita es más ancha que una condensada.

### Carta

- Cabecera oscura → barra de categorías `sticky` (fondo sólido) → buscador →
  categorías en papel → cierre oscuro → pie.
- Precio a la derecha, `tnum`, con puntos guía (`.menu-leader`) alineados con
  la última línea del plato. Precio pendiente: «Consultar».

### Reseñas

- Texto en Inter, comillas `« »`, tarjetas de esquina recta con línea fina.
- No se pintan estrellas por reseña individual (no está verificado).

### Fotos

- `Photo` sirve avif/webp/jpg con `srcset`, `width`/`height` y
  `loading="lazy"` salvo el hero. Proporciones fijas. Sin ampliar.

## 6. Movimiento e interacción

- Solo `transform` y `opacity`, 150–250 ms, `--ease-premium`.
- Hover: cambio de color o desplazamiento de 1–2 px; foto a escala 1.01.
- Foco: `outline: 2px` con `offset 3px` en `var(--focus-ring)`, que cada
  superficie fija (`bg-night-*` → dorado, `bg-cream-*` → tinta). Toda
  superficie nueva debe usar una de esas clases de fondo para heredar el foco
  correcto.
- Todo lo pulsable lleva `cursor: pointer` y `touch-action: manipulation`.
- `prefers-reduced-motion: reduce` desactiva reveal, transiciones y Lenis.

## 7. Accesibilidad y rendimiento

- Contraste AA en todos los textos; foco ≥ 3:1 en ambas superficies.
- Objetivos táctiles ≥ 44 px. Sin scroll horizontal a 390, 768 y 1440 px.
- Menú móvil con foco atrapado y `Escape`; FAQ con `aria-expanded`; galería
  como `role="dialog"`; mapa sin cargar hasta que se pulsa.

## 8. Prohibido

- Segundo acento, amarillo puro, degradados, sombras, desenfoques, esquinas
  redondeadas, tramas u ornamentos decorativos.
- Valores sueltos en componentes cuando existe un token.
- Más de una CTA primaria por pantalla.
- Datos nuevos: precios, horarios, servicios o reseñas que no estén en
  `src/data/`.

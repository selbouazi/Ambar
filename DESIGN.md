---
version: 1.0
name: Ambar — Restaurante Halal
description: Sistema de diseño del restaurante halal Ambar (El Vendrell). Verde oscuro casi negro, dorado contenido, crema cálido, serif editorial y zellige geométrico. Extraído de los tokens reales de src/index.css y elevado para que la web parezca un restaurante premium y no una plantilla.

colors:
  # Bases oscuras (sala, portada, pie)
  maroc-950: "#171a11"
  maroc-900: "#1f2417"
  maroc-800: "#2a2e1f"
  maroc-700: "#3b4130"
  # Crema (secciones claras)
  cream-50: "#faf6ec"
  cream-100: "#f7f1e3"
  cream-200: "#efe6d2"
  cream-300: "#e4d7bc"
  # Dorado (acento único)
  gold-700: "#7d5a1c"
  gold-600: "#a97b2d"
  gold-500: "#c9973b"
  gold-400: "#e0b45c"
  gold-300: "#eac98a"
  # Tinta cálida
  ink: "#262319"
  ink-soft: "#57544a"
  ink-mute: "#6b675c"
  # Tierra (solo ilustración y detalles, nunca acciones)
  terra-600: "#6b4226"
  terra-400: "#a9774f"

typography:
  display:
    fontFamily: Fraunces, Georgia, "Times New Roman", serif
    fontSize: clamp(3.5rem, 9vw, 8.5rem)
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: -0.03em
  h1:
    fontFamily: Fraunces, Georgia, serif
    fontSize: clamp(2.75rem, 6vw, 5rem)
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.025em
  h2:
    fontFamily: Fraunces, Georgia, serif
    fontSize: clamp(2rem, 3.6vw, 3.25rem)
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: -0.02em
  h3:
    fontFamily: Fraunces, Georgia, serif
    fontSize: clamp(1.375rem, 2vw, 1.75rem)
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -0.01em
  body:
    fontFamily: Inter, ui-sans-serif, system-ui, sans-serif
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0
  body-lg:
    fontFamily: Inter, ui-sans-serif, system-ui, sans-serif
    fontSize: 1.1875rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  small:
    fontFamily: Inter, ui-sans-serif, system-ui, sans-serif
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  button:
    fontFamily: Inter, ui-sans-serif, system-ui, sans-serif
    fontSize: 0.9375rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0

rounded:
  media: 0px
  panel: 0px
  control: 2px
  pill: 9999px

spacing:
  xs: 8px
  sm: 12px
  md: 20px
  lg: 32px
  xl: 48px
  section-mobile: 80px
  section-desktop: 160px

components:
  nav-bar:
    backgroundColor: transparent / maroc-950
    textColor: cream-100
    rounded: 0px
  button-primary:
    backgroundColor: gold-500
    textColor: maroc-950
    rounded: pill
  button-secondary-on-dark:
    backgroundColor: transparent
    borderColor: cream-100 (45%)
    textColor: cream-100
    rounded: pill
  button-secondary-on-cream:
    backgroundColor: transparent
    borderColor: ink (25%)
    textColor: ink
    rounded: pill
  menu-row:
    backgroundColor: transparent
    textColor: ink
    divider: 1px dotted ink (20%)
  photo-frame:
    backgroundColor: maroc-800
    rounded: 0px
  placeholder-panel:
    backgroundColor: maroc-800
    textColor: gold-400
    rounded: 0px
  live-status:
    backgroundColor: transparent
    textColor: gold-400
    dot: emerald / gold
---

# Sistema de diseño de Ambar

## 1. Tema y atmósfera

Ambar es una casa marroquí de barrio en El Vendrell: cocina halal, tajines a fuego lento, cuscús solo los viernes, marisco fresco y desayunos de msemmen y harxa. La web no debe parecer un restaurante genérico con fotos de stock: debe parecer **la carta impresa de esta casa, puesta en pantalla**.

La atmósfera se construye con tres materiales reales del local:

1. **El verde oscuro de la sala.** Casi negro (`#171a11`), cálido, no neutro. Es el campo de la portada, las cabeceras y el pie. Ocupa el 45 % de la página.
2. **La crema del mantel y del papel.** (`#faf6ec` / `#f7f1e3`). Es el campo de la carta y de los textos largos. Nunca blanco puro: el blanco frío rompe la calidez.
3. **El dorado del latón y de la lámpara.** (`#c9973b`). Aparece **solo** en la acción principal, en el estado en vivo y en el sello halal. Nunca como fondo grande, nunca en texto corrido.

El cuarto material es el **zellige**: la retícula geométrica de estrellas de ocho puntas. No es decoración de relleno; es la retícula de la página. Se usa a tres escalas:

- **Textura de fondo** (opacidad 5–8 %, trazo de 1 px) en las secciones oscuras.
- **Panel estructural** a sangre en la portada, detrás del logotipo, cuando no hay fotografía disponible.
- **Filete divisor** de 1 px en la carta, entre categorías.

Tipografía: **Fraunces** para todo lo que se lee como titular (serif editorial, con itálica para los nombres propios y los platos). **Inter** para lo que se lee como información (precios, direcciones, horarios, textos). Dos familias, nunca una tercera.

El tono es cálido y cuidado, en español de España, sin emojis y sin coloquialismos. Se dice "Reserva opcional", nunca "reserva obligatoria"; se dice "Puedes venir sin reserva o llamarnos para asegurar mesa".

## 2. Paleta con roles

### Roles, no colores sueltos

| Rol | Token | Hex | Dónde |
|---|---|---|---|
| Campo oscuro | `maroc-950` | `#171a11` | Portada, cabeceras de página, pie, sección de cierre |
| Campo oscuro elevado | `maroc-900` | `#1f2417` | Secciones oscuras alternas, paneles |
| Panel sobre oscuro | `maroc-800` | `#2a2e1f` | Marcos de foto, panel de zellige, tarjetas oscuras |
| Campo claro | `cream-50` | `#faf6ec` | Carta, textos largos, fondo base del documento |
| Campo claro alterno | `cream-100` | `#f7f1e3` | Sección de reseñas, comodidades |
| Tinta | `ink` | `#262319` | Todo el texto corrido sobre crema |
| Tinta secundaria | `ink-soft` | `#57544a` | Descripciones, notas de plato (contraste 7:1) |
| Tinta terciaria | `ink-mute` | `#6b675c` | Metadatos, pies (contraste 5,2:1) |
| Acento | `gold-500` | `#c9973b` | Botón primario, estado en vivo, sello halal |
| Acento texto sobre crema | `gold-700` | `#7d5a1c` | Precios y enlaces pequeños sobre crema (contraste 5,8:1) |
| Acento texto sobre oscuro | `gold-400` | `#e0b45c` | Texto dorado sobre verde (contraste 6,7:1) |
| Tierra | `terra-600` | `#6b4226` | Solo ilustración y detalles del zellige |

### Reglas de color

- **Un solo acento.** El dorado no se reparte: o es el botón primario, o es el estado en vivo, o es el precio. Nunca dos de esos en el mismo bloque visual.
- **Contraste AA mínimo.** El dorado `gold-500` sobre crema no llega a 4,5:1: para texto pequeño sobre crema se usa `gold-700`. Sobre verde, `gold-400` cumple.
- **Nada de degradados** salvo el velo neutro sobre fotografía para garantizar legibilidad (portada y fotos con texto encima).
- **Nada de sombras en reposo.** La profundidad se consigue con un escalón de tono (`maroc-950` → `maroc-900` → `maroc-800`), no con `box-shadow`.
- **Superficies separadas por tono, no por líneas.** La única línea admitida es el punteado de la carta (convención de menú impreso) y el filete de 1 px del zellige.

## 3. Tipografía

### Familias

- **Fraunces** (`--font-display`): titulares, nombres de plato, cifras grandes (valoración), logotipo. Itálica para "Ambar" y para los nombres propios de platos cuando aparecen dentro de una frase.
- **Inter** (`--font-sans`): párrafos, precios, direcciones, horarios, botones, formularios.

Carga: `font-display: swap`, `preconnect` a `fonts.gstatic.com`, subconjunto latino, y `preload` del woff2 de Fraunces que usa la portada.

### Escala (cinco pasos, no más)

| Paso | Uso | Tamaño | Interlineado | Tracking |
|---|---|---|---|---|
| Display | Logotipo de portada, cifra de valoración | `clamp(3.5rem, 9vw, 8.5rem)` | 0.92 | −0.03em |
| H1 | Título de página | `clamp(2.75rem, 6vw, 5rem)` | 1 | −0.025em |
| H2 | Título de sección | `clamp(2rem, 3.6vw, 3.25rem)` | 1.05 | −0.02em |
| H3 | Nombre de plato, subtítulo | `clamp(1.375rem, 2vw, 1.75rem)` | 1.2 | −0.01em |
| Cuerpo | Texto corrido | 17 px / 19 px | 1.6–1.65 | 0 |

### Reglas

- **Titulares de dos líneas como máximo** a cualquier ancho. Si no cabe, se recorta el texto; no se baja el tamaño.
- **Sin etiquetas pequeñas en mayúsculas sobre los titulares** (los antiguos "kicker": *Especialidades*, *Nuestra historia*). La información va en el titular o en la primera frase. Es el tic número uno de las webs generadas.
- **Sin numeración decorativa** (01 / 02 / 03) en la carta ni en las secciones.
- **Cifras tabulares** en precios y horarios (`font-variant-numeric: tabular-nums`).
- **Medida de lectura** 60–72 caracteres; párrafos de 3 líneas como máximo en los bloques editoriales.
- La itálica de Fraunces se usa con intención (nombre del restaurante, nombres de plato dentro de una frase), nunca como adorno en cada titular.

## 4. Componentes con estados

### Botones

Dos estilos y solo dos. Forma: píldora completa (`9999px`), altura mínima 48 px, objetivo táctil ≥ 44 px.

**Primario (`gold`)**
- Reposo: fondo `gold-500`, texto `maroc-950`, 15 px / 600.
- Hover: fondo `gold-400`, sin cambio de tamaño (solo color, 200 ms).
- Foco: contorno `2px` `gold-400`, offset `3px`.
- Activo: `translateY(1px)`.
- Deshabilitado: fondo `cream-300`, texto `ink-mute`, cursor `not-allowed`.
- Uso: una sola vez por pantalla visible. "Ver la carta", "Llamar", "Abrir en Google Maps".

**Secundario**
- Sobre oscuro: borde `1px` `cream-100/45`, texto `cream-100`; hover borde `gold-400`, texto `gold-300`.
- Sobre crema: borde `1px` `ink/25`, texto `ink`; hover borde `gold-600`, texto `gold-700`.
- Foco: contorno `2px` `gold-500`.

**Enlace de texto**: subrayado dorado que crece de 0 a 100 % en 300 ms (`background-size`), sin cambiar el color del texto.

### Navegación

- Barra superior fija, 72 px de alto (64 px en móvil), fondo transparente sobre la portada y `maroc-950/95` con `backdrop-blur` al hacer scroll. Sin sombra.
- Izquierda: logotipo "Ambar" en Fraunces itálica + "Restaurante halal · El Vendrell" en Inter 11 px.
- Centro: cuatro enlaces en Inter 13 px, sentence case, subrayado dorado en el activo. **Nunca** cinco o más.
- Derecha: botón "Llamar" (primario, compacto) y, en móvil, botón de menú de 44×44 px.
- Menú móvil: panel a pantalla completa bajo la barra, enlaces en Fraunces 32 px, cierre con `Esc`, foco atrapado y devuelto al botón.

### Barra inferior móvil

Solo en `< 768px`. Fija al pie, 64 px + `env(safe-area-inset-bottom)`, fondo `maroc-950`, tres acciones de igual peso: **Llamar**, **Cómo llegar**, **Carta**. Icono 20 px + etiqueta 11 px. La página reserva `padding-bottom` para no tapar contenido.

### Estado en vivo (horario)

- Punto de 8 px + texto en Inter 13 px.
- Abierto: punto verde (`#5f9e6a`) y texto `gold-300` sobre oscuro / `gold-700` sobre crema: "Abierto ahora · hasta las 24:00".
- Cerrado: punto `cream-300/50`: "Cerrado · abre hoy a las 9:00" o "abre mañana a las 9:00".
- Calculado en `Europe/Madrid`, no en la zona del visitante.

### Fila de carta

- Nombre en Fraunces 20 px + descripción en Inter 15 px `ink-soft`.
- Precio alineado a la derecha con cifras tabulares y línea punteada entre nombre y precio (`border-bottom: 1px dotted` sobre un `flex-1`).
- Etiquetas: "Solo viernes", "Menú +2 €", "2 personas" en píldora de 1 px de borde, 12 px, sin mayúsculas forzadas.
- Hover: el punteado pasa a `gold-600`. Sin desplazamiento.

### Panel de foto / hueco de foto

- Marco cuadrado (radio 0), `aspect-ratio` fijo, fondo `maroc-800`.
- Si hay foto: `object-fit: cover`, `object-position` configurable, `srcset` avif/webp, `width`/`height` reales para CLS 0.
- Si no hay foto: panel de zellige al 8 % con el nombre del plato en Fraunces itálica y una línea en Inter 12 px "Fotografía del restaurante". **Nunca** el texto "FOTO PENDIENTE".

### Acordeón FAQ

- Fila de 1 px de borde inferior, pregunta en Fraunces 20 px, botón de 44 px con `+`/`−`.
- `aria-expanded`, `aria-controls`, región con `role="region"`.
- Abre con altura animada de 220 ms; respeta `prefers-reduced-motion`.

### Sello halal

- Círculo de 1 px con texto curvo "HALAL FOOD · REST. AMBAR" y estrella de ocho puntas en el centro.
- Solo en tinta `gold-500` sobre oscuro o `maroc-800` sobre crema. Nunca relleno.

## 5. Layout y retícula

- **Ancho de contenido**: 1200 px (`max-w-[75rem]`), con márgenes exteriores iguales de 20 px (móvil), 32 px (tablet) y 48 px (escritorio). El fondo y las bandas de color van a sangre; el texto nunca.
- **Retícula**: 12 columnas en escritorio, 8 en tablet, 4 en móvil. Las composiciones asimétricas viven dentro de la retícula; los márgenes exteriores siempre son iguales.
- **Ritmo vertical**: 80 px entre secciones en móvil, 160 px en escritorio. Ningún hueco interno supera esa distancia.
- **Alternancia de campo**: oscuro → crema → oscuro → crema. Cada cambio de campo es un cambio de capítulo, no un adorno.
- **Cada sección tiene su propio titular** y su propia composición; dos secciones seguidas nunca comparten forma (lista, dos columnas, panel a sangre, rejilla de tres).
- **La portada** ocupa `100svh`: logotipo a la izquierda, panel de zellige a la derecha (50/50 en escritorio, apilado en móvil), estado en vivo y dos acciones. Sin foto, el panel de zellige es el material; con foto (`hero-interior.jpg`), la foto ocupa el panel y el zellige queda como filete.
- **La carta** es una sola columna de 720 px centrada, con navegación de categorías sticky. Se lee como un menú impreso, no como una tabla.
- **El pie** cierra con el nombre a tamaño display, la dirección y el horario. No es un mapa del sitio.

## 6. Elevación y profundidad

No hay sombras en elementos en reposo. La jerarquía se construye así:

| Nivel | Tratamiento | Uso |
|---|---|---|
| 0 — Campo | `maroc-950` plano | Fondo de página y secciones oscuras |
| 1 — Panel | `maroc-900` | Sección oscura alterna, panel de cierre |
| 2 — Marco | `maroc-800` | Marco de foto, hueco de foto, tarjeta oscura |
| 3 — Papel | `cream-50` / `cream-100` | Campo claro y su alterno |
| 4 — Flotante | Sombra suave solo si flota de verdad | Menú móvil desplegado, lightbox, barra inferior |

El único elemento con sombra legítima es lo que se superpone a la página: el lightbox de la galería y la barra inferior móvil (para separarse del contenido que pasa por debajo).

## 7. Do / Don't

### Do

- Usar el verde casi negro como campo principal y la crema como campo de lectura.
- Reservar el dorado para la acción principal, el estado en vivo y el precio.
- Usar el zellige como retícula y textura, a tres escalas, con trazo fino.
- Componer con titulares grandes, mucho aire y pocos elementos por pantalla.
- Escribir en español de España, cálido y cuidado, sin emojis.
- Mantener el contraste AA y los objetivos táctiles de 44 px.
- Usar fotos reales del restaurante en cuanto existan; hasta entonces, paneles de zellige intencionales.

### Don't

- No usar fotos de archivo, stock ni de Google Maps enlazadas desde el código.
- No usar degradados morados, azules ni "glassmorphism".
- No repetir tarjetas idénticas con icono arriba y texto debajo.
- No poner etiquetas pequeñas en mayúsculas sobre los titulares.
- No numerar las secciones (01, 02, 03).
- No usar más de dos familias tipográficas ni más de cinco tamaños.
- No usar sombras duras, brillos ni bordes de 1 px como decoración (salvo el punteado de la carta).
- No inventar platos, precios, horarios, servicios ni reseñas.
- No usar el dorado como color de texto corrido sobre crema (usar `gold-700`).
- No mostrar "FOTO PENDIENTE" en ninguna build.

## 8. Responsive

| Breakpoint | Ancho | Cambios |
|---|---|---|
| Móvil | < 640 px | Una columna; portada apilada (logotipo arriba, zellige abajo); barra inferior fija con Llamar / Cómo llegar / Carta; tipografía display a 3.5 rem; secciones a 80 px |
| Tablet | 640–1023 px | Dos columnas en carta y galería; navegación de categorías en scroll horizontal; portada 60/40 |
| Escritorio | 1024–1439 px | Portada 50/50; tres columnas en galería; barra superior completa; secciones a 160 px |
| Ancho | ≥ 1440 px | Contenido centrado a 1200 px; márgenes exteriores de 48 px |

- **Móvil es su propia composición**, no la de escritorio encogida: la portada se apila, la carta pierde la columna de índice y el precio queda a la derecha del nombre.
- **Sin scroll horizontal** en ningún ancho. `overflow-x: hidden` solo como red de seguridad, nunca como solución.
- **Imágenes**: `aspect-ratio` fijo por hueco, `srcset` con 640/960/1440/1920, `sizes` explícito.
- **Movimiento**: `prefers-reduced-motion: reduce` desactiva Lenis, parallax, contadores y reveals; el contenido queda visible.

## 9. Guía de prompts para agentes

Cuando generes o modifiques una pantalla de Ambar:

1. **Lee este archivo primero.** Los tokens de `src/index.css` son la fuente de verdad; este documento explica su uso.
2. **Toda la copia sale de `src/data/business.ts` y `src/data/menu.ts`.** No escribas precios, horarios ni reseñas a mano en un componente.
3. **No inventes contenido.** Si falta un dato, deja `TODO(confirmar)` en el código y añádelo al informe. Nunca rellenes con un dato plausible.
4. **Estructura de una sección**: titular (H2) + una frase de apoyo + contenido completo. Sin kicker, sin numeración, sin iconos de relleno.
5. **Un solo botón primario por pantalla.** El resto son secundarios o enlaces.
6. **Verifica en navegador real** a 390, 768 y 1440 px antes de dar nada por terminado.
7. **Comprueba**: contraste AA, foco visible, `alt` descriptivo, teclado completo, 44 px táctil, CLS < 0,1, LCP < 2,5 s en móvil.
8. **Prohibido**: stock, hotlinks de Maps, "FOTO PENDIENTE", degradados morados, tarjetas repetidas, emojis, Just Eat o enlaces a la competencia.

### Prompts de ejemplo

- "Crea la portada de Ambar: campo `maroc-950` a `100svh`, logotipo 'Ambar' en Fraunces itálica a `clamp(3.5rem, 9vw, 8.5rem)`, panel de zellige a la derecha, estado en vivo en `gold-400` calculado en Europe/Madrid y dos acciones: 'Ver la carta' (primario) y 'Llamar' (secundario). Sin foto disponible: el panel de zellige es el material."
- "Crea una fila de la carta: nombre en Fraunces 20 px, descripción en Inter 15 px `ink-soft`, precio en `gold-700` con cifras tabulares, línea punteada `ink/20` entre ambos, etiqueta 'Solo viernes' en píldora de 1 px. Hover: el punteado pasa a `gold-600`."
- "Crea el bloque de horario: tabla de siete días con el día actual resaltado en `maroc-900` sobre crema y el estado en vivo arriba. El lunes figura como cerrado con una nota `TODO(confirmar)`."
- "Crea el hueco de foto del tajín: marco cuadrado `maroc-800`, zellige al 8 %, 'Tajín' en Fraunces itálica y 'Fotografía del restaurante' en Inter 12 px. Si existe `public/photos/tajin.jpg`, muestra la foto con `srcset` y `object-position: center`."

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * Cabecera neutra del prototipo: sustituye al bloque SEO real de index.html
 * (título, descripción, Open Graph y datos estructurados).
 */
const PROTOTIPO_HEAD = `<!-- SEO:PROTOTIPO -->
    <meta name="robots" content="noindex, nofollow" />
    <title>Ambar · Prototipo de diseño</title>
    <meta name="description" content="Prototipo de diseño de la web del restaurante Ambar. Contenido de ejemplo." />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Ambar" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:title" content="Ambar · Prototipo de diseño" />
    <meta property="og:description" content="Prototipo de diseño de la web del restaurante Ambar. Contenido de ejemplo." />
    <!-- /SEO:PROTOTIPO -->`

/**
 * En modo prototipo:
 * - cambia la cabecera SEO de index.html por una neutra con `noindex`;
 * - escribe robots.txt y un sitemap vacío en dist/.
 *
 * Con `VITE_PROTOTIPO=false` no toca nada.
 */
function seoPlugin(prototipo) {
  let isBuild = false

  return {
    name: 'ambar-seo',
    configResolved(config) {
      isBuild = config.command === 'build'
    },
    transformIndexHtml(html) {
      if (!prototipo) return html
      return html.replace(
        /<!-- SEO:REAL -->[\s\S]*?<!-- \/SEO:REAL -->/,
        PROTOTIPO_HEAD,
      )
    },
    closeBundle() {
      if (!prototipo || !isBuild) return

      const dist = resolve(process.cwd(), 'dist')
      mkdirSync(dist, { recursive: true })
      writeFileSync(resolve(dist, 'robots.txt'), 'User-agent: *\nDisallow: /\n')
      writeFileSync(
        resolve(dist, 'sitemap.xml'),
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n',
      )
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const prototipo = env.VITE_PROTOTIPO !== 'false'

  return {
    plugins: [react(), tailwindcss(), seoPlugin(prototipo)],
    // Constante de compilación: permite eliminar del bundle la variante que no
    // se usa (datos y textos reales en modo prototipo, y viceversa).
    define: {
      __PROTOTIPO__: JSON.stringify(prototipo),
    },
    build: {
      target: 'es2018',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
  }
})
